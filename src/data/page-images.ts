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
        src: '/images/pages/homes-hero.jpg',
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
      src: '/images/pages/homes-hero.jpg',
      alt: 'Homes for Sale in Centennial Crossing, Maravilla — larger townhome elevations',
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
      src: '/images/pages/neighborhoods-hero.jpg',
      alt: 'Homes for Sale in Eldorado, North Las Vegas — residential street with tile roofs',
    },
  },
  '/neighborhood': {
    hero: {
      src: '/images/pages/neighborhoods-hero.jpg',
      alt: 'North Las Vegas Family Homes: Welcome to Maravilla — community streetscape in North Las Vegas',
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
      src: '/images/pages/homes-hero.jpg',
      alt: 'North Las Vegas Family Homes: Sell Your Home — Maravilla-style house prepared for listing photos',
    },
  },
  '/home-valuation': {
    hero: {
      src: '/images/pages/services-contact-hero.jpg',
      alt: 'North Las Vegas Family Homes: Home Valuation — market charts and floor plan review desk',
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
      src: '/images/pages/buyers-guide-hero.jpg',
      alt: 'North Las Vegas Family Homes: First-Time Home Buyers — keys at a Maravilla entry door',
    },
  },
  '/guides': {
    hero: {
      src: '/images/pages/buyers-guide-hero.jpg',
      alt: 'North Las Vegas Family Homes: Guides for Clients — buyer checklist and home keys',
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
      src: '/images/pages/amenities-community-hero.jpg',
      alt: 'North Las Vegas Family Homes: Community Guide — recreation ramada and desert landscaping',
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
      src: '/images/pages/services-contact-hero.jpg',
      alt: 'North Las Vegas Family Homes: Real Estate Services — consultation desk with market materials',
    },
  },
  '/contact': {
    hero: {
      src: '/images/pages/services-contact-hero.jpg',
      alt: 'North Las Vegas Family Homes: Contact — Dr. Jan Duffy office consultation setting',
    },
  },
  '/about': {
    hero: {
      src: '/images/pages/services-contact-hero.jpg',
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
      src: '/images/pages/market-data-hero.jpg',
      alt: 'North Las Vegas Family Homes: Market Insights — North Las Vegas valley rooftops',
    },
  },
  '/map-and-nearby-places': {
    hero: {
      src: '/images/pages/neighborhoods-hero.jpg',
      alt: 'North Las Vegas Family Homes: Map & Nearby Places — streets near Maravilla and I-215',
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
      src: '/images/pages/market-data-hero.jpg',
      alt: 'North Las Vegas Family Homes: Blog & Market Updates — North Las Vegas housing overview',
    },
  },
  '/resources': {
    hero: {
      src: '/images/pages/buyers-guide-hero.jpg',
      alt: 'North Las Vegas Family Homes: Resources — buyer tools and Maravilla home keys',
    },
  },
  '/search': {
    hero: {
      src: '/images/pages/homes-hero.jpg',
      alt: 'North Las Vegas Family Homes: Search Homes — Maravilla listing-style home exterior',
    },
  },
};

const FALLBACK: PageMedia = {
  hero: {
    src: '/images/pages/neighborhoods-hero.jpg',
    alt: 'North Las Vegas Family Homes by Dr. Jan Duffy — Maravilla and North Las Vegas real estate',
  },
};

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
  return PAGES[normalized] ?? FALLBACK;
}

export function getPageHeroImage(pathname: string): PageImage {
  return getPageMedia(pathname).hero;
}
