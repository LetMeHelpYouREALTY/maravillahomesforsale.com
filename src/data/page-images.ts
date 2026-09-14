import { resolveSiteImage } from '@/lib/config/cloudflare-images';

export type PageImage = {
  src: string;
  alt: string;
};

export type PageMedia = {
  hero: PageImage;
  sections?: Record<string, PageImage>;
};

const PAGES: Record<string, PageMedia> = {
  '/neighborhoods': {
    hero: {
      src: '/images/pages/neighborhoods-hero.jpg',
      alt: 'North Las Vegas Family Homes: Neighborhoods & Communities — stucco homes and desert streets in North Las Vegas',
    },
    sections: {
      'Key Neighborhoods & Communities': {
        src: '/images/pages/neighborhoods-hero.jpg',
        alt: 'North Las Vegas Family Homes: Key Neighborhoods & Communities along a desert suburban street',
      },
      'Jasmine Ranch': {
        src: '/images/pages/jasmine-ranch-hero.jpg',
        alt: 'Jasmine Ranch condos and shared courtyard in Maravilla, North Las Vegas',
      },
      'Centennial Crossing': {
        src: '/images/pages/centennial-crossing-hero.jpg',
        alt: 'Centennial Crossing townhomes and larger floor plans in Maravilla, North Las Vegas',
      },
      Seabreeze: {
        src: '/images/pages/seabreeze-hero.jpg',
        alt: 'Seabreeze larger-lot home with three-car garage in Maravilla, North Las Vegas',
      },
    },
  },
  '/neighborhoods/aliante': {
    hero: {
      src: '/images/pages/aliante-hero.jpg',
      alt: 'Homes for Sale in Aliante, North Las Vegas — desert park paths and tile-roof homes',
    },
  },
  '/neighborhoods/jasmine-ranch': {
    hero: {
      src: '/images/pages/jasmine-ranch-hero.jpg',
      alt: 'Homes for Sale in Jasmine Ranch, Maravilla — condo buildings and courtyard',
    },
  },
  '/neighborhoods/centennial-crossing': {
    hero: {
      src: '/images/pages/centennial-crossing-hero.jpg',
      alt: 'Homes for Sale in Centennial Crossing, Maravilla — attached townhome elevations',
    },
  },
  '/neighborhoods/seabreeze': {
    hero: {
      src: '/images/pages/seabreeze-hero.jpg',
      alt: 'Homes for Sale in Seabreeze, Maravilla — half-acre desert lot and wide garage',
    },
  },
  '/neighborhoods/eldorado': {
    hero: {
      src: '/images/pages/eldorado-hero.jpg',
      alt: 'Homes for Sale in Eldorado, North Las Vegas — mature desert street with tile-roof homes',
    },
  },
  '/neighborhood': {
    hero: {
      src: '/images/pages/neighborhood-hero.jpg',
      alt: 'North Las Vegas Family Homes: Welcome to Maravilla — boulevard and desert landscaping in North Las Vegas',
    },
  },
  '/homes': {
    hero: {
      src: '/images/pages/homes-hero.jpg',
      alt: 'Homes for Sale in Maravilla — two-story stucco home with desert landscaping in North Las Vegas',
    },
  },
  '/sell': {
    hero: {
      src: '/images/pages/sell-hero.jpg',
      alt: 'North Las Vegas Family Homes: Sell Your Home — listing-ready Maravilla-style house at golden hour',
    },
  },
  '/home-valuation': {
    hero: {
      src: '/images/pages/home-valuation-hero.jpg',
      alt: 'North Las Vegas Family Homes: Home Valuation — comparable-sales review desk overlooking desert rooftops',
    },
  },
  '/buyers-guide': {
    hero: {
      src: '/images/pages/buyers-guide-hero.jpg',
      alt: "North Las Vegas Family Homes: Buyer's Guide — house keys and a North Las Vegas front door",
    },
  },
  '/first-time-buyers': {
    hero: {
      src: '/images/pages/first-time-buyers-hero.jpg',
      alt: 'North Las Vegas Family Homes: First-Time Home Buyers — keys at a Maravilla entry door',
    },
  },
  '/guides': {
    hero: {
      src: '/images/pages/guides-hero.jpg',
      alt: 'North Las Vegas Family Homes: Guides for Clients — buyer checklist, map, and home keys',
    },
  },
  '/amenities': {
    hero: {
      src: '/images/pages/amenities-community-hero.jpg',
      alt: 'North Las Vegas Family Homes: Amenities — community pool and clubhouse in North Las Vegas',
    },
  },
  '/community': {
    hero: {
      src: '/images/pages/community-hero.jpg',
      alt: 'North Las Vegas Family Homes: Community Guide — park ramada, walking path, and Maravilla homes',
    },
  },
  '/schools': {
    hero: {
      src: '/images/pages/schools-hero.jpg',
      alt: 'North Las Vegas Family Homes: Schools — Clark County campus exterior in North Las Vegas',
    },
  },
  '/real-estate-services': {
    hero: {
      src: '/images/pages/services-hero.jpg',
      alt: 'North Las Vegas Family Homes: Real Estate Services — consultation table with listing photos',
    },
  },
  '/contact': {
    hero: {
      src: '/images/pages/contact-hero.jpg',
      alt: 'North Las Vegas Family Homes: Contact — Dr. Jan Duffy office reception in North Las Vegas',
    },
  },
  '/about': {
    hero: {
      src: '/images/pages/about-hero.jpg',
      alt: 'About Dr. Jan Duffy — REALTOR® office in North Las Vegas',
    },
  },
  '/market-data': {
    hero: {
      src: '/images/pages/market-data-hero.jpg',
      alt: 'North Las Vegas Family Homes: Market Data — aerial view of North Las Vegas housing',
    },
  },
  '/market-insights': {
    hero: {
      src: '/images/pages/market-insights-hero.jpg',
      alt: 'North Las Vegas Family Homes: Market Insights — North Las Vegas valley rooftops at late afternoon',
    },
  },
  '/map-and-nearby-places': {
    hero: {
      src: '/images/pages/map-hero.jpg',
      alt: 'North Las Vegas Family Homes: Map & Nearby Places — streets and highway access near Maravilla',
    },
  },
  '/55-plus-communities': {
    hero: {
      src: '/images/pages/fifty-five-plus-hero.jpg',
      alt: 'North Las Vegas Family Homes: 55+ Communities — single-story ranch home with desert yard',
    },
  },
  '/home-descriptions': {
    hero: {
      src: '/images/pages/home-descriptions-hero.jpg',
      alt: 'North Las Vegas Family Homes: Detailed Property Descriptions — open kitchen and great room',
    },
  },
  '/privacy': {
    hero: {
      src: '/images/pages/privacy-hero.jpg',
      alt: 'North Las Vegas Family Homes: Privacy Policy — Dr. Jan Duffy office desk and policy folder',
    },
  },
  '/blog': {
    hero: {
      src: '/images/pages/blog-hero.jpg',
      alt: 'North Las Vegas Family Homes: Blog & Market Updates — market report desk overlooking desert homes',
    },
  },
  '/resources': {
    hero: {
      src: '/images/pages/resources-hero.jpg',
      alt: 'North Las Vegas Family Homes: Resources — buyer tools, floor plans, and Maravilla home keys',
    },
  },
  '/search': {
    hero: {
      src: '/images/pages/search-hero.jpg',
      alt: 'North Las Vegas Family Homes: Search Homes — listing-style home exterior in North Las Vegas',
    },
  },
};

const SECTION_IMAGES: Record<string, PageImage> = {
  'North Las Vegas Family Homes: Market Overview': {
    src: '/images/pages/section-market.jpg',
    alt: 'North Las Vegas Family Homes: Market Overview — rooftops and market charts for ZIP 89031',
  },
  'North Las Vegas Family Homes: Market Snapshot': {
    src: '/images/pages/section-market.jpg',
    alt: 'North Las Vegas Family Homes: Market Snapshot — North Las Vegas housing grid from a market desk',
  },
  'Current North Las Vegas Real Estate Trends': {
    src: '/images/pages/section-market.jpg',
    alt: 'Current North Las Vegas real estate trends — desert suburban rooftops',
  },
  'North Las Vegas Family Homes: Property Categories': {
    src: '/images/pages/homes-hero.jpg',
    alt: 'North Las Vegas Family Homes: Property Categories — Maravilla-style two-story home',
  },
  'North Las Vegas Family Homes: Listings from Dr. Jan Duffy': {
    src: '/images/pages/section-listings.jpg',
    alt: 'Listings from Dr. Jan Duffy — printed listing photos and keys on a review table',
  },
  'North Las Vegas Family Homes: Schedule a Consultation': {
    src: '/images/pages/section-office.jpg',
    alt: 'Schedule a consultation — North Las Vegas real estate office at dusk',
  },
  'Find Us on the Map': {
    src: '/images/pages/map-hero.jpg',
    alt: 'Find us on the map — North Las Vegas streets near I-215',
  },
  'North Las Vegas Family Homes: Top-Rated Schools': {
    src: '/images/pages/section-schools.jpg',
    alt: 'Clark County School District campus near Maravilla in North Las Vegas',
  },
  'Clark County School District Campuses Near Maravilla': {
    src: '/images/pages/section-schools.jpg',
    alt: 'Clark County School District campus exterior in North Las Vegas',
  },
  'Parks, Trails & Recreation': {
    src: '/images/pages/section-parks-trails.jpg',
    alt: 'Maravilla parks and walking trails with desert landscaping in North Las Vegas',
  },
  'Community Pool & Clubhouse': {
    src: '/images/pages/section-pool-clubhouse.jpg',
    alt: 'Maravilla community pool and clubhouse in North Las Vegas',
  },
  'Open Kitchen & Great Room': {
    src: '/images/pages/section-kitchen.jpg',
    alt: 'Open kitchen and great room in a North Las Vegas home',
  },
  'I-15 and I-215 Access': {
    src: '/images/pages/section-highway.jpg',
    alt: 'Highway access from North Las Vegas toward the Las Vegas Valley',
  },
  'Closing & Keys': {
    src: '/images/pages/section-keys.jpg',
    alt: 'House keys on a closing table with a North Las Vegas home in the window',
  },
  'Single-Story Ranch Homes': {
    src: '/images/pages/section-ranch.jpg',
    alt: 'Single-story ranch home with desert yard in North Las Vegas',
  },
};

const FALLBACK: PageMedia = {
  hero: {
    src: '/images/pages/neighborhoods-hero.jpg',
    alt: 'North Las Vegas Family Homes by Dr. Jan Duffy — Maravilla and North Las Vegas real estate',
  },
};

function withCloudflareSrc(
  image: PageImage,
  variant: 'hero' | 'og' = 'hero'
): PageImage {
  return { ...image, src: resolveSiteImage(image.src, variant) };
}

export function getPageMedia(pathname: string): PageMedia {
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (normalized === '/') {
    return {
      hero: {
        src: '/photos/01-1 (2).jpg',
        alt: 'North Las Vegas Family Homes in Maravilla — community view, North Las Vegas',
      },
    };
  }
  const media = PAGES[normalized] ?? FALLBACK;
  return {
    hero: withCloudflareSrc(media.hero),
    sections: media.sections
      ? Object.fromEntries(
          Object.entries(media.sections).map(([key, image]) => [
            key,
            withCloudflareSrc(image),
          ])
        )
      : undefined,
  };
}

export function getPageHeroImage(pathname: string): PageImage {
  return getPageMedia(pathname).hero;
}

export function getSectionImage(heading: string): PageImage | undefined {
  const exact = SECTION_IMAGES[heading];
  if (exact) return withCloudflareSrc(exact);

  for (const media of Object.values(PAGES)) {
    const match = media.sections?.[heading];
    if (match) return withCloudflareSrc(match);
  }
  return undefined;
}
