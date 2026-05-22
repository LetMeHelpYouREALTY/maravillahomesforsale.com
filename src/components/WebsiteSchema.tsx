import { BUSINESS_INFO, GBP_DESCRIPTION } from '@/lib/config/business-info';

export default function WebsiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.maravillahomesforsale.com/#website',
    name: BUSINESS_INFO.name,
    url: 'https://www.maravillahomesforsale.com',
    description: GBP_DESCRIPTION,
    publisher: {
      '@id': 'https://www.maravillahomesforsale.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.maravillahomesforsale.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
