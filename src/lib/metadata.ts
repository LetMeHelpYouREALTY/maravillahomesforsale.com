import type { Metadata } from 'next';
import { BUSINESS_INFO, GBP_DESCRIPTION } from './config/business-info';
import { SITE_URL } from './config/nap-copy';

const siteUrl = SITE_URL;

const businessAddress = {
  streetAddress: BUSINESS_INFO.address.streetAddress,
  addressLocality: BUSINESS_INFO.address.addressLocality,
  addressRegion: BUSINESS_INFO.address.addressRegion,
  postalCode: BUSINESS_INFO.address.postalCode,
  addressCountry: BUSINESS_INFO.address.addressCountry,
} as const;

// Office coordinates from BUSINESS_INFO.geo (aligned with GBP location pin).
const businessGeo = {
  latitude: BUSINESS_INFO.geo.latitude,
  longitude: BUSINESS_INFO.geo.longitude,
} as const;

const businessName = BUSINESS_INFO.name;
const businessShortName = 'North Las Vegas Family Homes';
const businessPhone = BUSINESS_INFO.phone.schema;
const businessEmail = BUSINESS_INFO.email;

/** Optional AggregateRating from GBP – set NEXT_PUBLIC_GBP_RATING and NEXT_PUBLIC_GBP_REVIEW_COUNT to show stars in search */
function getAggregateRatingForSchema():
  | { '@type': 'AggregateRating'; ratingValue: number; reviewCount: number; bestRating: number }
  | undefined {
  const rating = process.env.NEXT_PUBLIC_GBP_RATING;
  const count = process.env.NEXT_PUBLIC_GBP_REVIEW_COUNT;
  if (!rating || !count) return undefined;
  const ratingValue = Number.parseFloat(rating);
  const reviewCount = Number.parseInt(count, 10);
  if (
    Number.isNaN(ratingValue) ||
    Number.isNaN(reviewCount) ||
    ratingValue < 1 ||
    ratingValue > 5 ||
    reviewCount < 1
  )
    return undefined;
  return {
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating: 5,
  };
}

export const MARAVILLA_FAQS = [
  {
    question: 'What makes Maravilla a desirable community?',
    answer:
      'Maravilla is a premier master-planned community offering exceptional living experiences. The community features beautiful homes, excellent schools, parks, and convenient access to shopping, dining, and major highways. Residents enjoy a tight-knit community atmosphere with numerous amenities and events throughout the year.',
  },
  {
    question: 'What is the average price range for homes in Maravilla?',
    answer:
      'Home prices in Maravilla vary depending on property type, size, and location. We offer a range of homes to suit different budgets and lifestyles. Contact us for current market information and pricing details specific to your preferences.',
  },
  {
    question: 'How long do properties typically stay on the market?',
    answer:
      'Properties in Maravilla typically sell within a competitive timeframe, reflecting the area&apos;s strong demand and desirable location. Market conditions can vary, and we can provide current market data specific to the community.',
  },
  {
    question: 'What types of properties are available?',
    answer:
      'We offer a diverse selection including single-family homes, luxury estates, and new construction properties. Each category features different amenities and price points to suit various buyer needs and preferences.',
  },
  {
    question: 'Do you help with financing and mortgage options?',
    answer:
      'Yes, we work with trusted mortgage partners to help you find the best financing options. We can connect you with lenders who specialize in luxury home financing and offer competitive rates.',
  },
  {
    question: 'Can I schedule a property tour?',
    answer:
      'Absolutely! You can schedule a tour through our website or by contacting us directly. We offer both in-person and virtual tours to accommodate your preferences and schedule.',
  },
] as const;

// Keep CRAIG_RANCH_FAQS for backward compatibility during migration
export const CRAIG_RANCH_FAQS = MARAVILLA_FAQS;

const schemaAttributeNote = [
  BUSINESS_INFO.attributes.womenOwned ? 'Women-owned business' : null,
  BUSINESS_INFO.attributes.lgbtqFriendly ? 'LGBTQ+ friendly' : null,
  BUSINESS_INFO.attributes.offersOnlineAppointments ? 'Offers online appointments' : null,
]
  .filter(Boolean)
  .join('. ');

const siteConfig = {
  name: businessName,
  url: siteUrl,
  description: GBP_DESCRIPTION,
  ogImage: '/photos/01-1 (2).jpg',
  twitterHandle: '@maravillahomes',
  locale: 'en_US',
  type: 'website',
};

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata({
  title,
  description,
  keywords,
  path = '/',
  image,
  type = 'website',
}: {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const fullImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${siteConfig.url}${ogImage}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'US-NV',
      'geo.placename': 'North Las Vegas, Las Vegas',
      'geo.position': `${businessGeo.latitude};${businessGeo.longitude}`,
      ICBM: `${businessGeo.latitude}, ${businessGeo.longitude}`,
    },
  };
}

/**
 * Generate LocalBusiness schema for contact pages
 */
function generateSpecialOpeningHoursSchema() {
  return BUSINESS_INFO.specialHours.map((holiday) => ({
    '@type': 'OpeningHoursSpecification' as const,
    validFrom: holiday.date,
    validThrough: holiday.date,
    description: `Closed — ${holiday.label}`,
  }));
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    '@id': `${siteUrl}#localbusiness`,
    name: businessName,
    description: `${GBP_DESCRIPTION} ${schemaAttributeNote}.`,
    url: siteUrl,
    telephone: businessPhone,
    email: businessEmail,
    knowsAbout: [
      BUSINESS_INFO.categories.primary,
      ...BUSINESS_INFO.categories.additional,
      BUSINESS_INFO.serviceArea,
    ],
    image: `${siteUrl}/photos/01-1 (2).jpg`,
    logo: `${siteUrl}/globe.svg`,
    address: {
      '@type': 'PostalAddress',
      ...businessAddress,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...businessGeo,
    },
    hasMap: BUSINESS_INFO.maps.business,
    sameAs: [
      BUSINESS_INFO.googleBusinessProfile,
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.linkedin,
      BUSINESS_INFO.social.youtube,
    ],
    areaServed: [
      { '@type': 'Place', name: BUSINESS_INFO.serviceArea },
      { '@type': 'City', name: 'North Las Vegas', addressRegion: 'NV' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS_INFO.hours.schema.dayOfWeek,
        opens: BUSINESS_INFO.hours.schema.opens,
        closes: BUSINESS_INFO.hours.schema.closes,
      },
    ],
    specialOpeningHoursSpecification: generateSpecialOpeningHoursSchema(),
    ...(BUSINESS_INFO.foundingDate && { foundingDate: BUSINESS_INFO.foundingDate }),
    priceRange: '$$$',
    currenciesAccepted: 'USD',
    ...(getAggregateRatingForSchema() && { aggregateRating: getAggregateRatingForSchema() }),
  };
}

/**
 * Generate Organization schema for Google Knowledge Panel
 * This is required for Google to display your logo and business information in search results
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: businessName,
    legalName: businessName,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/globe.svg`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/photos/01-1 (2).jpg`,
    description: GBP_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      ...businessAddress,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: BUSINESS_INFO.hours.schema.dayOfWeek,
          opens: BUSINESS_INFO.hours.schema.opens,
          closes: BUSINESS_INFO.hours.schema.closes,
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'sales',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'chat',
        url: BUSINESS_INFO.sms.href,
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        email: businessEmail,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      BUSINESS_INFO.googleBusinessProfile,
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.linkedin,
      BUSINESS_INFO.social.youtube,
    ],
    ...(BUSINESS_INFO.foundingDate && { foundingDate: BUSINESS_INFO.foundingDate }),
    ...(getAggregateRatingForSchema() && { aggregateRating: getAggregateRatingForSchema() }),
  };
}

/**
 * Generate Person schema for E-E-A-T (2025 Best Practice)
 * Showcases expertise, experience, authoritativeness, and trustworthiness
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: 'Dr. Jan Duffy',
    alternateName: ['Jan Duffy', 'Dr. Duffy'],
    jobTitle: 'REALTOR®',
    description:
      'Dr. Jan Duffy is a highly experienced REALTOR® with Berkshire Hathaway HomeServices® Nevada. North Las Vegas Family Homes specialist—Maravilla, Las Vegas, North Las Vegas, and Henderson. Expert, data-driven advice and personalized consultations.',
    image: `${siteUrl}/photos/Dr. Duffy Blue_Headshot.jpg`,
    url: siteUrl,
    email: businessEmail,
    telephone: businessPhone,
    address: {
      '@type': 'PostalAddress',
      ...businessAddress,
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
      url: 'https://www.berkshirehathawayhs.com',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Real Estate License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Nevada Real Estate Division',
      },
      identifier: 'S.0197614',
    },
    knowsAbout: [
      'North Las Vegas Family Homes',
      'North Las Vegas Real Estate',
      'Maravilla Homes',
      'Luxury Real Estate',
      'First-time Homebuyers',
      'Home Selling',
      'Property Valuation',
      'VA Loans',
      'FHA Loans',
      'Real Estate Market Analysis',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Real Estate Education',
    },
    sameAs: [
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.youtube,
      BUSINESS_INFO.social.linkedin,
    ],
  };
}

/**
 * Generate RealEstateAgent schema (Enhanced for 2025)
 */
export function generateRealEstateAgentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}#realestateagent`,
    name: 'Dr. Jan Duffy',
    description: `REALTOR® with Berkshire Hathaway HomeServices® Nevada. North Las Vegas Family Homes specialist—Maravilla and ${BUSINESS_INFO.serviceArea}. ${schemaAttributeNote}.`,
    jobTitle: 'REALTOR®',
    ...(BUSINESS_INFO.foundingDate && { foundingDate: BUSINESS_INFO.foundingDate }),
    worksFor: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
      url: 'https://www.berkshirehathawayhs.com',
    },
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/globe.svg`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/photos/Dr. Duffy Blue_Headshot.jpg`,
    address: {
      '@type': 'PostalAddress',
      ...businessAddress,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...businessGeo,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'North Las Vegas',
        addressRegion: 'NV',
        addressCountry: 'US',
      },
      {
        '@type': 'City',
        name: 'Las Vegas',
        addressRegion: 'NV',
        addressCountry: 'US',
      },
      {
        '@type': 'City',
        name: 'Henderson',
        addressRegion: 'NV',
        addressCountry: 'US',
      },
    ],
    serviceArea: {
      '@type': 'Place',
      name: 'Maravilla',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        addressCountry: 'US',
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: BUSINESS_INFO.hours.schema.dayOfWeek,
          opens: BUSINESS_INFO.hours.schema.opens,
          closes: BUSINESS_INFO.hours.schema.closes,
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'chat',
        url: BUSINESS_INFO.sms.href,
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        email: businessEmail,
        contactType: 'customer service',
        areaServed: 'US',
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Real Estate License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Nevada Real Estate Division',
      },
      identifier: 'S.0197614',
    },
    sameAs: [
      BUSINESS_INFO.googleBusinessProfile,
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.linkedin,
      BUSINESS_INFO.social.youtube,
    ],
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate CollectionPage schema for listings pages
 */
export function generateCollectionPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      name,
      description,
    },
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  breadcrumb,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    ...(breadcrumb && {
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    }),
  };
}

export function generateFAQPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step guides (e.g. buyer's guide)
 * 2025 Best Practice: HowTo can show rich results in search
 */
export function generateHowToSchema({
  name,
  description,
  url,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  url: string;
  steps: ReadonlyArray<{ name: string; text: string }>;
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate WebSite schema with site name for Google Search
 * This is required for Google to display your site name in search results
 * Must be placed on the homepage only
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: businessShortName,
    alternateName: [
      BUSINESS_INFO.name,
      'Maravilla Homes',
      'www.maravillahomesforsale.com',
      'maravillahomesforsale.com',
    ],
    url: siteUrl,
    description: GBP_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Blog schema for blog/insights pages
 */
export function generateBlogSchema({
  name,
  description,
  url,
  author,
  publisher,
}: {
  name: string;
  description: string;
  url: string;
  author?: string;
  publisher?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name,
    description,
    url,
    ...(author && {
      author: {
        '@type': 'Person',
        name: author,
      },
    }),
    ...(publisher && {
      publisher: {
        '@type': 'Organization',
        name: publisher,
      },
    }),
  };
}

/**
 * Generate Article schema for individual blog posts/articles
 * 2025 Best Practice: Article schema helps Google understand content structure and improves rich results
 */
export function generateArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${siteUrl}${image}`,
      },
    }),
    datePublished,
    dateModified: dateModified || datePublished,
    ...(author && {
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
      },
    }),
    ...(publisher && {
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        ...(publisher.logo && {
          logo: {
            '@type': 'ImageObject',
            url: publisher.logo.startsWith('http') ? publisher.logo : `${siteUrl}${publisher.logo}`,
            width: 512,
            height: 512,
          },
        }),
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate Dataset schema for market data pages
 */
export function generateDatasetSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    license: `${siteUrl}`,
    creator: {
      '@type': 'Organization',
      name: businessName,
    },
  };
}

/**
 * Generate Service schema for real estate services
 * 2025 Best Practice: Service schema helps Google understand what services you offer
 */
export function generateServiceSchema({
  name,
  description,
  serviceType,
  areaServed,
  provider,
}: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
  provider?: {
    name: string;
    url: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: provider || {
      '@type': 'LocalBusiness',
      name: businessName,
      url: siteUrl,
      telephone: businessPhone,
    },
    areaServed: areaServed || {
      '@type': 'City',
      name: 'North Las Vegas',
      addressRegion: 'NV',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: siteUrl,
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: businessPhone,
        contactType: 'customer service',
      },
    },
  };
}

/**
 * Generate AggregateRating schema for Google Business Profile integration
 * 2025 Best Practice: Ratings schema improves visibility in search results
 */
export function generateAggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating,
    worstRating,
  };
}

/**
 * Generate Review schema for individual reviews
 * 2025 Best Practice: Review schema can show star ratings in search results
 */
export function generateReviewSchema({
  author,
  datePublished,
  reviewBody,
  ratingValue,
  bestRating = 5,
}: {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating,
    },
  };
}

/**
 * Generate VideoObject schema for a single video
 * 2025 Best Practice: VideoObject helps Google show video rich results
 */
export function generateVideoObjectSchema({
  name,
  description,
  url,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl,
  publisher,
}: {
  name: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
  embedUrl?: string;
  publisher?: { name: string; logo?: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    ...(description && { description }),
    url,
    ...(thumbnailUrl && {
      thumbnailUrl: thumbnailUrl.startsWith('http') ? thumbnailUrl : `${siteUrl}${thumbnailUrl}`,
    }),
    ...(uploadDate && { uploadDate }),
    ...(duration && { duration }),
    ...(embedUrl && { embedUrl }),
    ...(publisher && {
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        ...(publisher.logo && {
          logo: {
            '@type': 'ImageObject',
            url: publisher.logo.startsWith('http') ? publisher.logo : `${siteUrl}${publisher.logo}`,
          },
        }),
      },
    }),
    isFamilyFriendly: true,
  };
}

/**
 * Generate ItemList of VideoObject schemas for a video gallery/section
 */
export function generateVideoGallerySchema(
  videos: Array<{
    id: string;
    title: string;
    description?: string;
    url: string;
    thumbnailUrl?: string;
    uploadDate?: string;
  }>,
  listName = 'North Las Vegas Family Homes: Market Videos'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    description: 'Real estate market videos and buyer/seller tips from Dr. Jan Duffy and North Las Vegas Family Homes.',
    numberOfItems: videos.length,
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name: video.title,
        ...(video.description && { description: video.description }),
        url: video.url,
        ...(video.thumbnailUrl && { thumbnailUrl: video.thumbnailUrl }),
        ...(video.uploadDate && { uploadDate: video.uploadDate }),
        isFamilyFriendly: true,
      },
    })),
  };
}

