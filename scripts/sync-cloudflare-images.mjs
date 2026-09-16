#!/usr/bin/env node
/**
 * Create Cloudflare Images variants and upload Git backups from public/images/.
 *
 * Dashboard (one-time):
 *   1. Cloudflare Dashboard → Images → subscribe to Images (storage + delivery).
 *   2. Create an API token with Account → Cloudflare Images → Edit.
 *
 * Then:
 *   CLOUDFLARE_ACCOUNT_ID=2cc579c1ec9e426ed585e933ebf4753b \
 *   CLOUDFLARE_API_TOKEN=... npm run cf:images
 *
 * Delivery: https://imagedelivery.net/byE6BTe9lNqo21V57n4aPQ/<id>/<variant>
 * Git copies stay in public/images/ as the backup.
 *
 * Flags: --force (replace existing custom IDs)  --dry-run
 */
import { readFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = join(root, 'src/data/cloudflare-image-catalog.json');
const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

/** @typedef {{ id: string, fit: string, width: number, height: number, metadata: string }} CatalogVariant */
/** @typedef {{ id: string, file: string, role: string }} CatalogImage */
/** @typedef {{ variants: CatalogVariant[], images: CatalogImage[] }} Catalog */

function mimeFor(fileName) {
  if (fileName.endsWith('.png')) return 'image/png';
  if (fileName.endsWith('.webp')) return 'image/webp';
  if (fileName.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
}

function extractAccountHash(variantUrls) {
  for (const variantUrl of variantUrls) {
    const match = String(variantUrl).match(
      /^https:\/\/imagedelivery\.net\/([^/]+)\//
    );
    if (match?.[1]) return match[1];
  }
  return undefined;
}

async function cfFetch(path, init = {}) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}${path}`;
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    ...(init.headers ?? {}),
  };
  const response = await fetch(url, { ...init, headers });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, body };
}

function variantPayload(variant) {
  return {
    id: variant.id,
    options: {
      fit: variant.fit,
      width: variant.width,
      height: variant.height,
      metadata: variant.metadata,
    },
    neverRequireSignedURLs: true,
  };
}

async function ensureVariant(variant) {
  const payload = variantPayload(variant);
  if (dryRun) {
    console.log(`  [dry-run] variant ${variant.id}`, payload.options);
    return;
  }

  const created = await cfFetch('/images/v1/variants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (created.ok) {
    console.log(`  created variant ${variant.id}`);
    return;
  }

  const patched = await cfFetch(
    `/images/v1/variants/${encodeURIComponent(variant.id)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        options: payload.options,
        neverRequireSignedURLs: true,
      }),
    }
  );
  if (patched.ok) {
    console.log(`  updated variant ${variant.id}`);
    return;
  }

  throw new Error(
    `Variant ${variant.id} failed (${created.status}/${patched.status}): ${JSON.stringify(
      patched.body.errors ?? created.body.errors ?? patched.body
    )}`
  );
}

async function imageExists(imageId) {
  const encodedId = encodeURIComponent(imageId);
  const result = await cfFetch(`/images/v1/${encodedId}`);
  return result.ok;
}

async function deleteImage(imageId) {
  const encodedId = encodeURIComponent(imageId);
  const result = await cfFetch(`/images/v1/${encodedId}`, { method: 'DELETE' });
  if (!result.ok) {
    throw new Error(
      `Delete ${imageId} failed (${result.status}): ${JSON.stringify(result.body.errors ?? result.body)}`
    );
  }
}

async function uploadImage(image) {
  const filePath = join(root, image.file);
  const fileName = basename(image.file);
  if (dryRun) {
    console.log(`  [dry-run] upload ${image.id} from ${image.file}`);
    return [];
  }

  const exists = await imageExists(image.id);
  if (exists && !force) {
    console.log(`  skip ${image.id} (already uploaded; pass --force to replace)`);
    const details = await cfFetch(`/images/v1/${encodeURIComponent(image.id)}`);
    return details.body?.result?.variants ?? [];
  }
  if (exists && force) {
    await deleteImage(image.id);
    console.log(`  replaced ${image.id}`);
  }

  const bytes = await readFile(filePath);
  const form = new FormData();
  form.append('file', new Blob([bytes], { type: mimeFor(fileName) }), fileName);
  form.append('id', image.id);
  form.append('requireSignedURLs', 'false');
  form.append(
    'metadata',
    JSON.stringify({ gitBackup: image.file, role: image.role })
  );

  const uploaded = await cfFetch('/images/v1', { method: 'POST', body: form });
  if (!uploaded.ok) {
    throw new Error(
      `Upload ${image.id} failed (${uploaded.status}): ${JSON.stringify(
        uploaded.body.errors ?? uploaded.body
      )}`
    );
  }
  console.log(`  uploaded ${image.id}`);
  return uploaded.body?.result?.variants ?? [];
}

async function discoverHash(variantUrls) {
  const fromUpload = extractAccountHash(variantUrls);
  if (fromUpload) return fromUpload;

  const listed = await cfFetch('/images/v1?per_page=10');
  const images = listed.body?.result?.images ?? [];
  for (const image of images) {
    const hash = extractAccountHash(image.variants ?? []);
    if (hash) return hash;
  }
  return undefined;
}

async function main() {
  if (!accountId || !apiToken) {
    console.error(`
Missing credentials. Enable Cloudflare Images in the dashboard, then set:

  CLOUDFLARE_ACCOUNT_ID   Account ID from the Images dashboard
  CLOUDFLARE_API_TOKEN    Token with Account → Cloudflare Images → Edit

Example:
  CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... npm run cf:images
`);
    process.exit(1);
  }

  /** @type {Catalog} */
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  const allVariantUrls = [];

  console.log(`Creating ${catalog.variants.length} delivery variants…`);
  for (const variant of catalog.variants) {
    await ensureVariant(variant);
  }

  console.log(`Uploading ${catalog.images.length} Git backups…`);
  for (const image of catalog.images) {
    const variants = await uploadImage(image);
    allVariantUrls.push(...variants);
  }

  const hash = dryRun ? undefined : await discoverHash(allVariantUrls);
  console.log('\nDone.');
  if (hash) {
    console.log(`NEXT_PUBLIC_CF_IMAGES_HASH=${hash}`);
    console.log(
      `Set that env var on Vercel. Example URL: https://imagedelivery.net/${hash}/maravilla/dr-jan-duffy/portrait`
    );
  } else if (!dryRun) {
    console.log(
      'Could not read the account hash. Find it in Images → Developer Resources and set NEXT_PUBLIC_CF_IMAGES_HASH.'
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
