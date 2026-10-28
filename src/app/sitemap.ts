import { MetadataRoute } from 'next';
import { NEIGHBORHOOD_SLUGS } from '@/data/neighborhoods';
import { GUIDE_SLUGS } from '@/data/guides';

/**
 * Sitemap with tiered lastModified dates (avoids uniform lastmod on every URL).
 */
function lastModifiedFor(
  tier: 'daily' | 'weekly' | 'monthly' | 'yearly',
  index = 0
): Date {
  const base = new Date('2026-10-17T12:00:00.000Z');
  const dayMs = 24 * 60 * 60 * 1000;
  const offsets: Record<typeof tier, number> = {
    daily: 0,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };
  return new Date(base.getTime() - (offsets[tier] + index) * dayMs);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maravillahomesforsale.com'
  ).replace(/\/$/, '');

  const neighborhoodUrls: MetadataRoute.Sitemap = NEIGHBORHOOD_SLUGS.map(
    (slug, index) => ({
      url: `${baseUrl}/neighborhoods/${slug}`,
      lastModified: lastModifiedFor('weekly', index),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  );

  const guideUrls: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug, index) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: lastModifiedFor('monthly', index),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages: Array<{
    path: string;
    tier: 'daily' | 'weekly' | 'monthly' | 'yearly';
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '', tier: 'daily', changeFrequency: 'daily', priority: 1 },
    { path: '/homes', tier: 'daily', changeFrequency: 'daily', priority: 0.9 },
    { path: '/neighborhood', tier: 'weekly', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/neighborhoods', tier: 'weekly', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/community', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/market-data', tier: 'daily', changeFrequency: 'daily', priority: 0.8 },
    { path: '/market-insights', tier: 'daily', changeFrequency: 'daily', priority: 0.8 },
    { path: '/contact', tier: 'monthly', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/home-valuation', tier: 'weekly', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/sell', tier: 'weekly', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/home-descriptions', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/amenities', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/real-estate-services', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/map-and-nearby-places', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/about', tier: 'monthly', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/buyers-guide', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/schools', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/resources', tier: 'weekly', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/blog', tier: 'daily', changeFrequency: 'daily', priority: 0.7 },
    { path: '/55-plus-communities', tier: 'monthly', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/first-time-buyers', tier: 'monthly', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/guides', tier: 'weekly', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/privacy', tier: 'yearly', changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...staticPages.map((page, index) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: lastModifiedFor(page.tier, index),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...neighborhoodUrls,
    ...guideUrls,
  ];
}

export const revalidate = 86400;
