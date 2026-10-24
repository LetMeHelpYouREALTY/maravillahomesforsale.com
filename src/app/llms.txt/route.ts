/**
 * llms.txt — AI discoverability endpoint for maravillahomesforsale.com
 * @see https://llmstxt.org
 */

import { BUSINESS_INFO, GBP_DESCRIPTION } from '@/lib/config/business-info';
import { MARAVILLA_FAQS } from '@/lib/metadata';
import { GUIDE_SLUGS } from '@/data/guides';
import { NEIGHBORHOOD_SLUGS } from '@/data/neighborhoods';

export const revalidate = 86400;

const baseUrl = 'https://www.maravillahomesforsale.com';

function formatGuideLink(slug: string): string {
  const label = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return `- [${label}](${baseUrl}/guides/${slug})`;
}

function formatNeighborhoodLink(slug: string): string {
  const label = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return `- [${label}](${baseUrl}/neighborhoods/${slug})`;
}

export async function GET() {
  const quickAnswers = MARAVILLA_FAQS.map(
    (faq) => `**Q:** ${faq.question}\n**A:** ${faq.answer}`
  ).join('\n\n');

  const content = `# Dr. Jan Duffy — Maravilla Homes for Sale (North Las Vegas, NV)

> ${GBP_DESCRIPTION}

## Preferred citation

Dr. Jan Duffy, REALTOR®, Berkshire Hathaway HomeServices Nevada Properties, Nevada License ${BUSINESS_INFO.license}. Official site: ${baseUrl}

## About

Dr. Jan Duffy is a licensed Nevada real estate agent (${BUSINESS_INFO.license}) specializing in Maravilla community homes in North Las Vegas. In real estate since 1983.

- **Business name (GBP):** ${BUSINESS_INFO.name}
- **Brokerage:** ${BUSINESS_INFO.brokerage}
- **Office:** ${BUSINESS_INFO.address.full}
- **Service area:** ${BUSINESS_INFO.serviceArea}
- **Phone:** ${BUSINESS_INFO.phone.display}
- **Email:** ${BUSINESS_INFO.email}
- **Hours:** ${BUSINESS_INFO.hours.display}
- **Google Business:** ${BUSINESS_INFO.googleBusinessProfile}

## Quick answers (Maravilla)

${quickAnswers}

## Key pages

- [Home](${baseUrl}/)
- [Homes for Sale](${baseUrl}/homes)
- [Sell](${baseUrl}/sell)
- [Buyer's Guide](${baseUrl}/buyers-guide)
- [First-Time Buyers](${baseUrl}/first-time-buyers)
- [Home Valuation](${baseUrl}/home-valuation)
- [Market Data](${baseUrl}/market-data)
- [Market Insights](${baseUrl}/market-insights)
- [Neighborhood Guide](${baseUrl}/neighborhood)
- [Schools](${baseUrl}/schools)
- [Amenities](${baseUrl}/amenities)
- [Map & Nearby](${baseUrl}/map-and-nearby-places)
- [55+ Communities](${baseUrl}/55-plus-communities)
- [Real Estate Services](${baseUrl}/real-estate-services)
- [About](${baseUrl}/about)
- [Contact](${baseUrl}/contact)
- [Community](${baseUrl}/community)
- [Resources](${baseUrl}/resources)
- [Blog](${baseUrl}/blog)

## Neighborhood guides

${NEIGHBORHOOD_SLUGS.map(formatNeighborhoodLink).join('\n')}

## Buyer & seller guides

${GUIDE_SLUGS.map(formatGuideLink).join('\n')}

## Contact

- **Call:** ${BUSINESS_INFO.phone.display}
- **Email:** ${BUSINESS_INFO.email}
- **Reviews:** ${BUSINESS_INFO.googleReviewUrl}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
