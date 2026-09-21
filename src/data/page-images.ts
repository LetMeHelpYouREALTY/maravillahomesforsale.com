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

const KEYWORD_IMAGES: { test: RegExp; src: string; alt: string }[] = [
  {
    test: /gated|security|community gate/i,
    src: '/images/pages/section-gated.jpg',
    alt: 'Gated community entry in North Las Vegas',
  },
  {
    test: /driveway|paver/i,
    src: '/images/pages/section-driveway.jpg',
    alt: 'Paver driveway and garage in a North Las Vegas home',
  },
  {
    test: /why work|working with dr|north las vegas expert|get in touch/i,
    src: '/images/pages/section-why-work.jpg',
    alt: 'Listing consultation table in a North Las Vegas real estate office',
  },
  {
    test: /why buy|housing style|home collection|mohave collection|essence collection|serenity collection|olympic collection|monarch collection/i,
    src: '/images/pages/section-collections.jpg',
    alt: 'New-construction home street in Maravilla, North Las Vegas',
  },
  {
    test: /commercial/i,
    src: '/images/pages/section-commercial.jpg',
    alt: 'Commercial plaza near Maravilla in North Las Vegas',
  },
  {
    test: /land and lots|vacant lot/i,
    src: '/images/pages/section-land.jpg',
    alt: 'Vacant desert lot in North Las Vegas ready for a custom home',
  },
  {
    test: /luxury propert|luxury home/i,
    src: '/images/pages/section-luxury.jpg',
    alt: 'Luxury two-story stucco home in North Las Vegas',
  },
  {
    test: /contract|title service|escrow|insurance|tax planning|zoning|transaction service/i,
    src: '/images/pages/section-documents.jpg',
    alt: 'Purchase contract and keys on a North Las Vegas closing table',
  },
  {
    test: /relocation/i,
    src: '/images/pages/section-relocation.jpg',
    alt: 'Moving truck at a North Las Vegas home during relocation',
  },
  {
    test: /virtual tour|3d home|3d tour/i,
    src: '/images/pages/section-virtual-tour.jpg',
    alt: 'Tablet showing a 3D virtual tour of a North Las Vegas home',
  },
  {
    test: /investment|portfolio|roi assessment/i,
    src: '/images/pages/section-investment.jpg',
    alt: 'Investment comps desk overlooking North Las Vegas rooftops',
  },
  {
    test: /seller strategy|preparing your home|buyer objection|feature highlighting|short.?term rental|foreclosure|days matter|maravilla offer|buyers compare|preparation beats/i,
    src: '/images/pages/section-seller-prep.jpg',
    alt: 'Staged living room prepared for listing photos in North Las Vegas',
  },
  {
    test: /climate|weather/i,
    src: '/images/pages/section-climate.jpg',
    alt: 'Desert climate and sunlight on North Las Vegas homes',
  },
  {
    test: /public transportation|transit|bus stop|bus shelter/i,
    src: '/images/pages/section-transit.jpg',
    alt: 'Street and transit stop in North Las Vegas near Maravilla',
  },
  {
    test: /government|public safety|civic/i,
    src: '/images/pages/section-government.jpg',
    alt: 'Civic services building in North Las Vegas',
  },
  {
    test: /bank|financial service/i,
    src: '/images/pages/section-banking.jpg',
    alt: 'Neighborhood bank branch in a North Las Vegas plaza',
  },
  {
    test: /pantry/i,
    src: '/images/pages/section-pantry.jpg',
    alt: 'Walk-in pantry in a North Las Vegas kitchen',
  },
  {
    test: /window/i,
    src: '/images/pages/section-windows.jpg',
    alt: 'Large windows and desert light in a North Las Vegas great room',
  },
  {
    test: /closet|primary suite/i,
    src: '/images/pages/section-closet.jpg',
    alt: 'Primary-suite walk-in closet in a North Las Vegas home',
  },
  {
    test: /home office|bonus room/i,
    src: '/images/pages/section-home-office.jpg',
    alt: 'Dedicated home office in a North Las Vegas house',
  },
  {
    test: /pet/i,
    src: '/images/pages/section-pets.jpg',
    alt: 'Fenced desert backyard with patio and pet door in North Las Vegas',
  },
  {
    test: /paseo/i,
    src: '/images/pages/section-paseo.jpg',
    alt: 'Nearby North Las Vegas neighborhood street near Maravilla',
  },
  {
    test: /private tour|open.?house|showing/i,
    src: '/images/pages/section-tours.jpg',
    alt: 'Open-house interior of a North Las Vegas home ready for a tour',
  },
  {
    test: /architectural style/i,
    src: '/images/pages/section-architecture.jpg',
    alt: 'Mixed single-story and two-story home elevations in North Las Vegas',
  },
  {
    test: /about maravilla|what makes maravilla|community stats|community features/i,
    src: '/images/pages/section-about-community.jpg',
    alt: 'Maravilla community boulevard with parks and homes in North Las Vegas',
  },
  {
    test: /video|kcm|simplifying the market/i,
    src: '/images/pages/section-video.jpg',
    alt: 'Market video playing on a North Las Vegas real estate desk',
  },
  {
    test: /golf/i,
    src: '/images/pages/section-golf.jpg',
    alt: 'Desert golf course near North Las Vegas homes',
  },
  {
    test: /casino|aliante|strip|downtown|entertainment|venue/i,
    src: '/images/pages/section-entertainment.jpg',
    alt: 'Entertainment and dining plaza near Maravilla in North Las Vegas',
  },
  {
    test: /new construction|builder|century/i,
    src: '/images/pages/section-new-construction.jpg',
    alt: 'New-construction stucco home in North Las Vegas',
  },
  {
    test: /landscap|xeriscape|irrigation|mature tree/i,
    src: '/images/pages/section-desert-landscaping.jpg',
    alt: 'Desert landscaping and drip irrigation in North Las Vegas',
  },
  {
    test: /mountain view|mountain/i,
    src: '/images/pages/section-mountain-views.jpg',
    alt: 'Desert mountain views from a North Las Vegas backyard',
  },
  {
    test: /bath|tub|jetted/i,
    src: '/images/pages/section-bath.jpg',
    alt: 'Primary bathroom with jetted tub in a North Las Vegas home',
  },
  {
    test: /laundry|washer|dryer/i,
    src: '/images/pages/section-laundry.jpg',
    alt: 'Dedicated laundry room in a North Las Vegas home',
  },
  {
    test: /flooring|laminate|hardwood/i,
    src: '/images/pages/section-flooring.jpg',
    alt: 'Laminate flooring in an open North Las Vegas living area',
  },
  {
    test: /cable|smart home|technolog|wifi|air condition|hvac|thermostat|energy.?efficient|solar/i,
    src: '/images/pages/section-smart-home.jpg',
    alt: 'Smart thermostat and cable-ready wiring in a North Las Vegas home',
  },
  {
    test: /school|ccsd|campus|education|elementary|middle school|high school/i,
    src: '/images/pages/section-schools.jpg',
    alt: 'Clark County School District campus near Maravilla, North Las Vegas',
  },
  {
    test: /park|trail|ramada|playground|recreation/i,
    src: '/images/pages/section-parks-trails.jpg',
    alt: 'Walking trail and ramada in a North Las Vegas community park',
  },
  {
    test: /pool|clubhouse|spa|fitness|gym/i,
    src: '/images/pages/section-pool-clubhouse.jpg',
    alt: 'Community pool and clubhouse in North Las Vegas',
  },
  {
    test: /kitchen|interior|bedroom|great room|floor plan|description|open concept/i,
    src: '/images/pages/section-kitchen.jpg',
    alt: 'Open kitchen and great room in a North Las Vegas home',
  },
  {
    test: /backyard|patio|yard|courtyard|outdoor/i,
    src: '/images/pages/section-backyard.jpg',
    alt: 'Covered patio and desert backyard in North Las Vegas',
  },
  {
    test: /garage|parking/i,
    src: '/images/pages/section-garage.jpg',
    alt: 'Attached garage in a North Las Vegas home',
  },
  {
    test: /shop|retail|aliante station/i,
    src: '/images/pages/section-shopping.jpg',
    alt: 'Shopping plaza near Maravilla in North Las Vegas',
  },
  {
    test: /dining|restaurant|food/i,
    src: '/images/pages/section-dining.jpg',
    alt: 'Patio dining near Maravilla in North Las Vegas',
  },
  {
    test: /photo|staging|marketing|list your/i,
    src: '/images/pages/section-photography.jpg',
    alt: 'Listing photography setup in a North Las Vegas living room',
  },
  {
    test: /market|trend|price|valuation|cma|data|insight|snapshot|overview/i,
    src: '/images/pages/section-market.jpg',
    alt: 'North Las Vegas housing market overview across desert rooftops',
  },
  {
    test: /map|nearby|location|highway|i-15|i-215|direction|place|commute/i,
    src: '/images/pages/section-highway.jpg',
    alt: 'Highway access from North Las Vegas toward the Las Vegas Valley',
  },
  {
    test: /sell|listing from|office listing/i,
    src: '/images/pages/section-listings.jpg',
    alt: 'Printed listing photos and keys on a review table',
  },
  {
    test: /buy|buyer|key|clos|guide|first-time|pre-approv/i,
    src: '/images/pages/section-keys.jpg',
    alt: 'House keys on a closing table in North Las Vegas',
  },
  {
    test: /essential service|healthcare|hospital|health|medical|va /i,
    src: '/images/pages/section-healthcare.jpg',
    alt: 'Medical campus in North Las Vegas near Maravilla',
  },
  {
    test: /visit|google review|google business|call, or review/i,
    src: '/images/pages/section-office.jpg',
    alt: 'North Las Vegas Family Homes office for Google Maps visits and reviews',
  },
  {
    test: /contact|consult|schedule|office|hour|about dr|ready to|experience amenities/i,
    src: '/images/pages/section-office.jpg',
    alt: 'North Las Vegas real estate office at dusk',
  },
  {
    test: /55|ranch|single-story|active.?adult/i,
    src: '/images/pages/section-ranch.jpg',
    alt: 'Single-story ranch home with desert yard in North Las Vegas',
  },
  {
    test: /frequently asked|common questions/i,
    src: '/images/pages/community-hero.jpg',
    alt: 'Maravilla community in North Las Vegas — parks, trails, and homes',
  },
  {
    test: /amenit|lifestyle|community guide/i,
    src: '/images/pages/community-hero.jpg',
    alt: 'Maravilla community park ramada and homes in North Las Vegas',
  },
  {
    test: /explore more|neighborhood|aliante|eldorado|seabreeze|jasmine|centennial/i,
    src: '/images/pages/neighborhoods-hero.jpg',
    alt: 'North Las Vegas neighborhood street with tile-roof homes',
  },
  {
    test: /home|propert|search|category/i,
    src: '/images/pages/homes-hero.jpg',
    alt: 'Maravilla-style home for sale in North Las Vegas',
  },
];

function isStatHeading(heading: string): boolean {
  const trimmed = heading.trim();
  return /^\$?\d/.test(trimmed) || trimmed.length < 8;
}

function isNonVisualHeading(heading: string): boolean {
  return /privacy policy|information we collect|how we use|your rights|cookies|third.party|site navigation|^menu$|popular pages|key features|pro forma|calculator|income statement|information sharing|data security|updates to this policy/i.test(
    heading
  );
}

export function getSectionImage(heading: string): PageImage | undefined {
  const normalized = heading.replace(/\s+/g, ' ').trim();
  if (!normalized || isStatHeading(normalized) || isNonVisualHeading(normalized)) {
    return undefined;
  }

  const exact = SECTION_IMAGES[normalized];
  if (exact) return withCloudflareSrc(exact);

  for (const media of Object.values(PAGES)) {
    const match = media.sections?.[normalized];
    if (match) return withCloudflareSrc(match);
  }

  for (const rule of KEYWORD_IMAGES) {
    if (rule.test.test(normalized)) {
      return withCloudflareSrc({ src: rule.src, alt: `${normalized} — ${rule.alt}` });
    }
  }

  return withCloudflareSrc({
    src: '/images/pages/neighborhoods-hero.jpg',
    alt: `${normalized} — North Las Vegas Family Homes in Maravilla`,
  });
}
