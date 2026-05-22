import { BUSINESS_INFO, GBP_DESCRIPTION } from '@/lib/config/business-info';

export default function AgentSchema() {
  const siteUrl = 'https://www.maravillahomesforsale.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': `${siteUrl}#organization`,
    name: BUSINESS_INFO.name,
    image: `${siteUrl}/photos/Dr. Duffy Blue_Headshot.jpg`,
    description: `${GBP_DESCRIPTION} Women-owned business. LGBTQ+ friendly. Offers online appointments.`,
    url: siteUrl,
    telephone: BUSINESS_INFO.phone.schema,
    email: BUSINESS_INFO.email,
    foundingDate: BUSINESS_INFO.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    areaServed: {
      '@type': 'Place',
      name: BUSINESS_INFO.serviceArea,
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS_INFO.hours.schema.dayOfWeek,
        opens: BUSINESS_INFO.hours.schema.opens,
        closes: BUSINESS_INFO.hours.schema.closes,
      },
    ],
    sameAs: [
      BUSINESS_INFO.social.linkedin,
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.youtube,
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Real Estate License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Nevada Real Estate Division',
      },
      identifier: BUSINESS_INFO.license,
    },
    memberOf: {
      '@type': 'Organization',
      name: BUSINESS_INFO.brokerage,
    },
    knowsAbout: [
      'North Las Vegas Real Estate',
      'Maravilla Homes',
      'First-time Homebuyers',
      'Home Selling',
      'Property Valuation',
      'VA Loans',
      'FHA Loans',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
