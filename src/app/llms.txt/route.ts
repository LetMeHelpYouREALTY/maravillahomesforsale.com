/**
 * llms.txt — AI discoverability endpoint for maravillahomesforsale.com
 * Helps AI models (ChatGPT, Claude, Perplexity, etc.) understand this site
 * @see https://llmstxt.org
 */

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.maravillahomesforsale.com';

  const content = `# Maravilla Homes for Sale — Dr. Jan Duffy

> North Las Vegas family homes in the Maravilla community.
> Expert neighborhood guide and real estate services by Dr. Jan Duffy.

## About

Dr. Jan Duffy is a licensed Nevada real estate agent (S.0197614) and the leading specialist for Maravilla community homes in North Las Vegas. With 30+ years of Las Vegas real estate experience, she provides expert guidance for buyers and sellers in this popular family-friendly community.

- **Brokerage:** Berkshire Hathaway HomeServices Nevada Properties
- **License:** Nevada S.0197614.LLC
- **Office:** 4380 W Ann Rd Suite 201, North Las Vegas, NV 89031
- **Phone:** (702) 500-1953
- **Email:** DrDuffy@MaravillaHomesForSale.com
- **Hours:** 6AM-9PM Daily
- **Website:** ${baseUrl}

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
- Close proximity to schools and shopping
- Modern floor plans from top builders
- Community amenities including pools and recreation areas
- Easy access to I-15 and US-95 freeways
- Competitive pricing for Las Vegas Valley families

## Coverage Area

North Las Vegas, Las Vegas, Henderson, Aliante, Craig Ranch, Tule Springs, El Dorado, Centennial Hills, Skye Canyon

## Key Pages

- [Home](${baseUrl}/)
- [Homes for Sale](${baseUrl}/homes-for-sale)
- [About Maravilla](${baseUrl}/about)
- [Community Guide](${baseUrl}/community)
- [Contact](${baseUrl}/contact)
- [Home Values](${baseUrl}/home-values)

## Contact

For Maravilla real estate questions:
- **Call/Text:** (702) 500-1953
- **Email:** DrDuffy@MaravillaHomesForSale.com
- **Google Business:** https://share.google/jwKcbkiXP5lxFx8Kf
- **Website:** ${baseUrl}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
