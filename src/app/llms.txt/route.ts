/**
 * llms.txt — AI discoverability endpoint for maravillahomesforsale.com
 * Helps AI models (ChatGPT, Claude, Perplexity, etc.) understand this site
 * @see https://llmstxt.org
 */

import { BUSINESS_INFO, GBP_DESCRIPTION } from '@/lib/config/business-info';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.maravillahomesforsale.com';

  const content = `# ${BUSINESS_INFO.name}

> ${GBP_DESCRIPTION}

## About

Dr. Jan Duffy is a licensed Nevada real estate agent (${BUSINESS_INFO.license}) and the leading specialist for Maravilla community homes in North Las Vegas. In business since September 20, 2009.

- **Business name:** ${BUSINESS_INFO.name}
- **Categories:** ${BUSINESS_INFO.categories.primary}; ${BUSINESS_INFO.categories.additional.join('; ')}
- **Brokerage:** ${BUSINESS_INFO.brokerage}
- **License:** Nevada ${BUSINESS_INFO.license}
- **Office:** ${BUSINESS_INFO.address.full}
- **Service area:** ${BUSINESS_INFO.serviceArea}
- **Phone:** ${BUSINESS_INFO.phone.display}
- **Text/Chat:** ${BUSINESS_INFO.sms.href}
- **Email:** ${BUSINESS_INFO.email}
- **Hours:** ${BUSINESS_INFO.hours.display}
- **Website:** ${baseUrl}
- **Women-owned:** Yes
- **LGBTQ+ friendly:** Yes
- **Online appointments:** Yes

## Social

- YouTube: ${BUSINESS_INFO.social.youtube}
- LinkedIn: ${BUSINESS_INFO.social.linkedin}
- Facebook: ${BUSINESS_INFO.social.facebook}

## Services

- **Maravilla Home Sales** — List and sell homes in the Maravilla community at top market value
- **Maravilla Home Buying** — Find the perfect home in Maravilla with neighborhood expertise
- **Market Analysis** — Current pricing trends and comparable sales in Maravilla
- **Home Valuation** — Free home value estimates for Maravilla homeowners
- **New Construction Guide** — Information on new builds and available floor plans
- **Community Information** — Schools, amenities, HOA details, and lifestyle guide
- **First-Time Buyer Programs** — Down payment assistance and financing options
- **Investment Analysis** — Rental potential and ROI for Maravilla properties

## Community Details

**Maravilla** is a master-planned community in North Las Vegas, NV 89031. It features:
- Family-friendly neighborhood with parks and walking trails
- Close proximity to schools and shopping (including Aliante)
- Modern floor plans from top builders
- Community amenities including pools and recreation areas
- Easy access to I-215 and I-15 freeways
- Competitive pricing for Las Vegas Valley families

## Coverage Area

${BUSINESS_INFO.serviceArea}

## Key Pages

- [Home](${baseUrl}/)
- [Homes for Sale](${baseUrl}/homes)
- [About](${baseUrl}/about)
- [Community Guide](${baseUrl}/community)
- [Contact](${baseUrl}/contact)
- [Home Valuation](${baseUrl}/home-valuation)

## Contact

For Maravilla and North Las Vegas real estate questions:
- **Call:** ${BUSINESS_INFO.phone.display}
- **Text:** ${BUSINESS_INFO.sms.href}
- **Email:** ${BUSINESS_INFO.email}
- **Google Business:** ${BUSINESS_INFO.googleBusinessProfile}
- **Leave a review:** ${BUSINESS_INFO.googleReviewUrl}
- **Website:** ${baseUrl}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
