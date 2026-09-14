import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const FILES = [
  'src/app/page.tsx',
  'src/app/homes/page.tsx',
  'src/app/sell/page.tsx',
  'src/app/home-valuation/page.tsx',
  'src/app/about/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/schools/page.tsx',
  'src/app/community/page.tsx',
  'src/app/amenities/page.tsx',
  'src/app/buyers-guide/page.tsx',
  'src/app/first-time-buyers/page.tsx',
  'src/app/guides/page.tsx',
  'src/app/guides/[slug]/page.tsx',
  'src/app/55-plus-communities/page.tsx',
  'src/app/market-data/page.tsx',
  'src/app/market-insights/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/resources/page.tsx',
  'src/app/search/page.tsx',
  'src/app/map-and-nearby-places/page.tsx',
  'src/app/home-descriptions/page.tsx',
  'src/app/neighborhood/page.tsx',
  'src/app/neighborhoods/page.tsx',
  'src/app/neighborhoods/[slug]/page.tsx',
  'src/app/real-estate-services/page.tsx',
  'src/components/sections/property-categories.tsx',
  'src/components/sections/featured-communities.tsx',
  'src/components/sections/home-evaluation.tsx',
  'src/components/sections/recent-sales.tsx',
  'src/components/sections/just-sold-gallery.tsx',
  'src/components/sections/blog-posts.tsx',
  'src/components/sections/kcm-videos-section.tsx',
  'src/components/sections/north-las-vegas-neighborhoods.tsx',
  'src/components/sections/market-data.tsx',
  'src/components/sections/about-content.tsx',
  'src/components/sections/real-estate-listings.tsx',
  'src/components/GbpLocalProof.tsx',
];

const SKIP_TEXT =
  /frequently asked|privacy policy|information we collect|how we use|your rights|cookies|third.party|site navigation|page not found|^menu$|popular pages/i;

function headingText(inner) {
  return inner
    .replace(/\{\s*'([^']*)'\s*\}/g, '$1')
    .replace(/\{\s*"([^"]*)"\s*\}/g, '$1')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensureImport(source) {
  if (source.includes("from '@/components/SectionHeadingMedia'")) return source;
  if (source.includes('from "@/components/SectionHeadingMedia"')) return source;
  const importLine =
    "import SectionHeadingMedia from '@/components/SectionHeadingMedia';\n";
  const lastImport = [
    ...source.matchAll(/^import[\s\S]*?from ['"][^'"]+['"];?\s*$/gm),
  ].pop();
  if (!lastImport || lastImport.index === undefined) return importLine + source;
  const insertAt = lastImport.index + lastImport[0].length;
  return `${source.slice(0, insertAt)}\n${importLine}${source.slice(insertAt)}`;
}

function indentAt(source, offset) {
  const lineStart = source.lastIndexOf('\n', offset - 1) + 1;
  const match = source.slice(lineStart, offset).match(/^(\s*)/);
  return match ? match[1] : '            ';
}

function injectAfterHeadings(source) {
  let count = 0;
  const next = source.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g,
    (full, tag, attrs, inner, offset) => {
      if (/\bsr-only\b/.test(attrs)) return full;
      if (tag === 'h3' && !/text-(?:2xl|3xl|4xl)/.test(attrs)) return full;
      if (tag === 'h3' && !/font-(?:bold|semibold)/.test(attrs)) return full;
      const after = source.slice(offset + full.length, offset + full.length + 280);
      if (/SectionHeadingMedia/.test(after)) return full;
      const text = headingText(inner);
      if (!text || text.length < 8) return full;
      if (/^\$?\d/.test(text)) return full;
      if (SKIP_TEXT.test(text)) return full;
      count += 1;
      const indent = indentAt(source, offset);
      const sizeAttr = tag === 'h3' ? " size='card'" : '';
      return `${full}\n${indent}<SectionHeadingMedia heading={${JSON.stringify(text)}}${sizeAttr} />`;
    }
  );
  return { next, count };
}

let total = 0;
for (const rel of FILES) {
  const path = join(root, rel);
  const original = readFileSync(path, 'utf8');
  const { next, count } = injectAfterHeadings(original);
  if (count === 0) continue;
  writeFileSync(path, ensureImport(next));
  total += count;
  console.log(`${rel}: +${count}`);
}
console.log(`injected ${total} heading photos`);
