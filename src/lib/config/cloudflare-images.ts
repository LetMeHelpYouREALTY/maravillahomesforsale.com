/**
 * Cloudflare Images (hosted vault) with Git as the backup copy.
 *
 * Hosted delivery (2026 docs):
 *   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT>
 * Git backup: files under public/images/ (committed to the repo).
 *
 * The Vercel hostname stays DNS-only. Do not orange-cloud this app.
 * Images are stored in Cloudflare Images and delivered from imagedelivery.net.
 *
 * NEXT_PUBLIC_CF_IMAGES_HASH overrides the known public account hash.
 * SiteImage falls back to the Git file if a hosted URL 403s/404s before upload.
 */
import catalog from '@/data/cloudflare-image-catalog.json';

export type CloudflareImageVariantId =
  | 'thumbnail'
  | 'nav'
  | 'portrait'
  | 'schema'
  | 'hero'
  | 'og'
  | 'public';

export const CLOUDFLARE_IMAGES_HOST = 'imagedelivery.net';

/** Public Images account hash from Developer Resources. Safe to expose in URLs. */
export const CLOUDFLARE_IMAGES_ACCOUNT_HASH = 'byE6BTe9lNqo21V57n4aPQ';

export function getCloudflareImagesHash(): string | undefined {
  const hash =
    process.env.NEXT_PUBLIC_CF_IMAGES_HASH?.trim() ||
    CLOUDFLARE_IMAGES_ACCOUNT_HASH;
  return hash ? hash : undefined;
}

export function isCloudflareImagesEnabled(): boolean {
  return Boolean(getCloudflareImagesHash());
}

export function cloudflareImageUrl(
  imageId: string,
  variant: CloudflareImageVariantId = 'public'
): string | null {
  const hash = getCloudflareImagesHash();
  if (!hash) return null;
  const encodedId = imageId
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `https://${CLOUDFLARE_IMAGES_HOST}/${hash}/${encodedId}/${variant}`;
}

/** Prefer Cloudflare Images; fall back to the Git-backed public path. */
export function withGitImageBackup(
  imageId: string,
  variant: CloudflareImageVariantId,
  gitPath: string
): string {
  return cloudflareImageUrl(imageId, variant) ?? gitPath;
}

export function toAbsoluteImageUrl(src: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const origin = siteUrl.replace(/\/$/, '');
  return `${origin}${src.startsWith('/') ? src : `/${src}`}`;
}

export function isCloudflareDeliveryUrl(src: string): boolean {
  return /^https:\/\/imagedelivery\.net\//i.test(src);
}

/**
 * Prefer a named Cloudflare variant. Git paths resolve through the vault;
 * existing imagedelivery.net URLs swap only the last path segment (the variant).
 */
export function withCloudflareVariant(
  src: string,
  variant: CloudflareImageVariantId
): string {
  if (isCloudflareDeliveryUrl(src)) {
    try {
      const url = new URL(src);
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length >= 3) {
        segments[segments.length - 1] = variant;
        url.pathname = `/${segments.join('/')}`;
        return url.toString();
      }
    } catch {
      return src;
    }
    return src;
  }
  return resolveSiteImage(src, variant);
}

export function gitPathToCloudflareId(gitPath: string): string {
  const fileName = gitPath.split('/').pop() ?? gitPath;
  const stem = fileName.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
  const match = catalog.images.find((image) => image.file.endsWith(`/${fileName}`));
  if (match) return match.id;
  return `maravilla/${stem}`;
}

/** Map a hosted Images URL back to the committed Git backup path. */
export function gitBackupFromCloudflareSrc(src: string): string | undefined {
  if (!isCloudflareDeliveryUrl(src)) return undefined;
  try {
    const url = new URL(src);
    const segments = url.pathname.split('/').filter(Boolean);
    if (segments.length < 3) return undefined;
    const imageId = segments
      .slice(1, -1)
      .map((segment) => decodeURIComponent(segment))
      .join('/');
    const match = catalog.images.find((image) => image.id === imageId);
    if (match) {
      return `/${match.file.replace(/^public\//, '')}`;
    }
    const stem = imageId.split('/').pop();
    return stem ? `/images/pages/${stem}.jpg` : undefined;
  } catch {
    return undefined;
  }
}

export function resolveSiteImage(
  gitPath: string,
  variant: CloudflareImageVariantId = 'hero'
): string {
  if (!gitPath.startsWith('/images/')) return gitPath;
  return withGitImageBackup(gitPathToCloudflareId(gitPath), variant, gitPath);
}

export const AGENT_CLOUDFLARE_IMAGE_ID = 'maravilla/dr-jan-duffy';
export const CLOUDFLARE_IMAGE_CATALOG = catalog;
