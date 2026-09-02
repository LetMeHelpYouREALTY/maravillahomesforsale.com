/**
 * On-site market insight cards. KCM RSS is stopped (2026-09-02);
 * these replace the Simplifying the Market feed on `/`, `/blog`, and `/market-insights`.
 */
import { GUIDES, type GuideSlug } from '@/data/guides';

export type MarketInsightPost = {
  title: string;
  description: string;
  href: string;
  category: string;
  categoryHref: string;
  author: string;
  date: string;
  dateISO: string;
  imageUrl: string;
};

const GUIDE_CARD_META: Record<
  GuideSlug,
  { category: string; imageUrl: string }
> = {
  'buying-home-winter-2026': {
    category: 'Buyer Guide',
    imageUrl: '/images/pages/buyers-guide-hero.jpg',
  },
  'selling-house-winter-2026': {
    category: 'Seller Guide',
    imageUrl: '/images/pages/homes-hero.jpg',
  },
  'first-time-homebuyer': {
    category: 'Buyer Guide',
    imageUrl: '/images/pages/neighborhoods-hero.jpg',
  },
};

function formatDisplayDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

const GUIDE_POSTS: MarketInsightPost[] = (
  Object.keys(GUIDE_CARD_META) as GuideSlug[]
).map((slug) => {
  const guide = GUIDES[slug];
  const meta = GUIDE_CARD_META[slug];
  return {
    title: guide.title,
    description: guide.description,
    href: `/guides/${slug}`,
    category: meta.category,
    categoryHref: '/guides',
    author: 'Dr. Jan Duffy',
    date: formatDisplayDate(guide.datePublished),
    dateISO: `${guide.datePublished}T12:00:00.000Z`,
    imageUrl: meta.imageUrl,
  };
});

const SITE_POSTS: MarketInsightPost[] = [
  {
    title: 'North Las Vegas Market Data',
    description:
      'Current prices, inventory, and days on market for Maravilla and North Las Vegas.',
    href: '/market-data',
    category: 'Market Data',
    categoryHref: '/market-data',
    author: 'Dr. Jan Duffy',
    date: 'September 2, 2026',
    dateISO: '2026-09-02T12:00:00.000Z',
    imageUrl: '/images/pages/market-data-hero.jpg',
  },
  {
    title: 'Get a Home Valuation',
    description:
      'Request a pricing opinion for your North Las Vegas or Maravilla property.',
    href: '/home-valuation',
    category: 'Sellers',
    categoryHref: '/sell',
    author: 'Dr. Jan Duffy',
    date: 'September 2, 2026',
    dateISO: '2026-09-02T12:00:00.000Z',
    imageUrl: '/images/pages/homes-hero.jpg',
  },
];

export const MARKET_INSIGHT_POSTS: MarketInsightPost[] = [
  ...GUIDE_POSTS,
  ...SITE_POSTS,
];

export function getMarketInsightPosts(limit?: number): MarketInsightPost[] {
  if (limit === undefined) return MARKET_INSIGHT_POSTS;
  return MARKET_INSIGHT_POSTS.slice(0, limit);
}
