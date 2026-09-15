/**
 * Centralized business information configuration
 * Mirrors Google Business Profile — update here to change NAP across the site
 */

/** GBP business description (About your business) */
export const GBP_DESCRIPTION =
  'Looking to buy or sell a home in North Las Vegas? Homes by Dr. Jan Duffy serves Maravilla and nearby North Las Vegas neighborhoods. The area has modern floor plans from 1,519 to 2,947 square feet, parks, trails, Aliante shopping, Clark County School District campuses, and access to I-215 and I-15. Dr. Duffy lists, prices, and tours homes, and supports sellers with marketing and comparable sales. Call (702) 500-1953 to schedule a showing or a listing consult.';

export const BUSINESS_INFO = {
  // Business Name
  name: 'North Las Vegas Family Homes | Homes by Dr. Jan Duffy',
  legalName: 'North Las Vegas Family Homes | Homes by Dr. Jan Duffy',

  // GBP categories
  categories: {
    primary: 'Real estate agent',
    additional: ['Real estate agency', 'Real estate consultant'] as const,
  },

  description: GBP_DESCRIPTION,

  // Phone Number (use consistent format)
  phone: {
    display: '(702) 500-1953',
    href: 'tel:7025001953',
    schema: '+1-702-500-1953', // For structured data
  },

  // Business Address (GBP office location)
  address: {
    streetAddress: '5135 W Washburn Rd, Suite 201',
    addressLocality: 'North Las Vegas',
    addressRegion: 'NV',
    postalCode: '89031',
    addressCountry: 'US',
    full: '5135 W Washburn Rd, Suite 201, North Las Vegas, NV 89031',
  },

  // Community Address (Maravilla Community)
  community: {
    name: 'Maravilla',
    address: 'Maravilla, North Las Vegas, NV 89031',
    locality: 'North Las Vegas',
    region: 'NV',
    postalCode: '89031',
    country: 'US',
  },

  // Business Coordinates (office — 5135 W Washburn Rd)
  geo: {
    latitude: 36.2542,
    longitude: -115.132,
  },

  // Community Coordinates (Maravilla Location)
  communityGeo: {
    latitude: 36.26276,
    longitude: -115.17182,
  },

  // Email
  email: 'DrDuffy@MaravillaHomesForSale.com',

  // Business Hours (GBP: 6:00 AM–9:00 PM, seven days)
  hours: {
    display: '6:00 AM – 9:00 PM, Sunday – Saturday',
    shortDisplay: '6AM–9PM Daily',
    schema: {
      dayOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '06:00',
      closes: '21:00',
    },
  },

  // GBP special hours (closed)
  specialHours: [
    { date: '2026-04-05', label: 'Easter' },
    { date: '2026-05-25', label: 'Memorial Day' },
    { date: '2026-07-03', label: '4th of July (Observed)' },
  ] as const,

  // Google Maps Links
  maps: {
    business:
      'https://www.google.com/maps/search/?api=1&query=5135+W+Washburn+Rd+Suite+201+North+Las+Vegas+NV+89031',
    community:
      'https://www.google.com/maps/search/?api=1&query=Maravilla+North+Las+Vegas+NV+89031',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=5135+W+Washburn+Rd+Suite+201+North+Las+Vegas+NV+89031',
  },

  // Google Business Profile
  googleBusinessProfile: 'https://share.google/jwKcbkiXP5lxFx8Kf',

  // Direct link for customers to leave a Google review
  googleReviewUrl: 'https://g.page/r/CZcA4mC9AUJeEBI/review',

  // Opening date (GBP: September 20, 2009)
  foundingDate: '2009-09-20',

  // Contact: SMS/Chat (GBP)
  sms: {
    display: 'Text (702) 500-1953',
    href: 'sms:+17025001953',
  },

  // Social profiles (GBP)
  social: {
    youtube: 'https://www.youtube.com/@DrDuffy',
    linkedin: 'https://www.linkedin.com/company/maravilla-homes-for-sale/',
    facebook: 'https://www.facebook.com/maravillahomesforsale',
  },

  // GBP attributes (for schema and visible content)
  attributes: {
    womenOwned: true,
    lgbtqFriendly: true,
    offersOnlineAppointments: true,
  },

  // Service area (GBP)
  serviceArea: 'North Las Vegas, NV, USA',

  license: 'S.0197614',
  brokerage: 'Berkshire Hathaway HomeServices Nevada Properties',
} as const;
