import PageLayout from '@/components/layout/page-layout';
import AgentIdentityBand from '@/components/AgentIdentityBand';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  generateMetadata as genMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateWebPageSchema,
  generatePlaceSchema,
  generateNearbyPlacesItemListSchema,
  generateAgentAreaServedMaravillaSchema,
} from '@/lib/metadata';
import { MARAVILLA_COMMUNITY } from '@/lib/config/community-map';
import {
  CURATED_NEARBY_PLACES,
  NEARBY_AMENITIES_FAQS,
} from '@/data/maravilla-nearby-amenities';
import AmenityMap from '@/components/maps/amenity-map';

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maravillahomesforsale.com'
).replace(/\/$/, '');

export const revalidate = 604800;

export const metadata = genMetadata({
  title: `Nearby Amenities in ${MARAVILLA_COMMUNITY.name}, North Las Vegas | Dr. Jan Duffy`,
  description:
    'Interactive map of restaurants, grocery, parks, schools, healthcare, and shopping near Maravilla in North Las Vegas. Drive times to the Strip, airport, and Aliante — hyperlocal guide by Dr. Jan Duffy. Call (702) 500-1953.',
  keywords:
    'Maravilla nearby amenities, North Las Vegas grocery parks schools, Maravilla map, things near Maravilla, Dr. Jan Duffy REALTOR',
  path: '/nearby-amenities',
});

const writtenSections = [
  {
    id: 'dining',
    title: 'Dining near Maravilla',
    body: `Restaurant Row along West Craig Road and the Aliante Parkway corridor include national chains and local spots a short drive from Maravilla. Applebee's, Buffalo Wild Wings, and IHOP are among the sit-down options along Craig; hours and menus change, so confirm before you visit.`,
  },
  {
    id: 'parks',
    title: 'Parks & recreation',
    body: `Maravilla's master plan includes community parks, walking paths, and sports fields within the neighborhood. Aliante Nature Discovery Park (2627 Nature Park Dr, North Las Vegas) adds lake paths and play areas about 10 minutes north in typical traffic.`,
  },
  {
    id: 'golf',
    title: 'Golf',
    body: `Aliante Golf Club at 9600 Sovereign St is the closest championship course to Maravilla — roughly a 10-minute drive when Craig and Aliante Parkway are clear.`,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    body: `North Vista Hospital at 1409 E Lake Mead Blvd provides emergency and inpatient care about 10 minutes from Maravilla. CVS on West Craig Rd and Walgreens locations along Craig/Lamb corridors cover routine pharmacy needs within a few miles.`,
  },
  {
    id: 'shopping',
    title: 'Shopping',
    body: `Smith's Marketplace on Decatur, Walmart Supercenter on West Craig Rd, Target at Decatur Commons, and Aliante Casino + Hotel retail give Maravilla residents everyday shopping without crossing the valley.`,
  },
  {
    id: 'schools',
    title: 'Schools (CCSD)',
    body: `Clark County School District assigns campuses by address. Nearby schools include Triggs Elementary (5415 W Craig Rd), Findlay Middle School (333 W Tropical Pkwy), and Legacy High School (150 W Deer Springs Way). Always verify the zone for a specific listing before you buy.`,
  },
  {
    id: 'commute',
    title: 'Commute & regional access',
    body: `I-215 (Northern Beltway) and I-15 are typically 5–10 minutes from Maravilla. Approximate drives: Las Vegas Strip 20–30 minutes; Harry Reid International Airport 25–35 minutes; Downtown Summerlin 25–35 minutes — all traffic-dependent.`,
  },
];

export default function NearbyAmenitiesPage() {
  return (
    <PageLayout>
      <article>
        <section className='bg-gradient-to-r from-[#0A2540] to-[#3A8DDE] text-white py-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              Nearby Amenities in {MARAVILLA_COMMUNITY.name}, North Las Vegas
            </h1>
            <p className='text-xl text-gray-200 max-w-3xl speakable'>
              Hyperlocal map and guide to grocery, parks, schools, healthcare, and dining around{' '}
              {MARAVILLA_COMMUNITY.name} (ZIP {MARAVILLA_COMMUNITY.postalCode}). Browse{' '}
              <Link href='/homes' className='text-white underline hover:text-gray-200'>
                homes for sale
              </Link>
              , the{' '}
              <Link href='/neighborhood' className='text-white underline hover:text-gray-200'>
                neighborhood guide
              </Link>
              , or{' '}
              <Link href='/amenities' className='text-white underline hover:text-gray-200'>
                in-home amenities
              </Link>
              .
            </p>
          </div>
        </section>

        <section className='py-16 bg-white' aria-labelledby='amenity-map-heading'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 id='amenity-map-heading' className='text-3xl font-bold text-[#0A2540] mb-4'>
              Interactive amenity map
            </h2>
            <SectionHeadingMedia heading='Interactive amenity map' />
            <p className='text-gray-700 mb-8 max-w-3xl'>
              Filter by category to see places Google Maps reports near the center of{' '}
              {MARAVILLA_COMMUNITY.name}. The blue marker is the community; tap any pin for
              directions.
            </p>
            <AmenityMap height='520px' showStaticList />
          </div>
        </section>

        <section className='py-16 bg-[#F7F9FC]' aria-labelledby='local-guide-heading'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 id='local-guide-heading' className='text-3xl font-bold text-[#0A2540] mb-8'>
              Local guide by category
            </h2>
            <SectionHeadingMedia heading='Local guide by category' />
            <div className='space-y-10'>
              {writtenSections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h3 className='text-2xl font-semibold text-[#0A2540] mb-3'>{section.title}</h3>
                  <SectionHeadingMedia heading={section.title} size='card' />
                  <p className='text-gray-700 leading-relaxed max-w-4xl'>{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-16 bg-white' id='faqs' aria-labelledby='nearby-faq-heading'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 id='nearby-faq-heading' className='text-3xl font-bold text-[#0A2540] mb-8'>
              Frequently asked questions
            </h2>
            <SectionHeadingMedia heading='Frequently asked questions' />
            <dl className='space-y-6 max-w-4xl'>
              {NEARBY_AMENITIES_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className='text-lg font-semibold text-[#0A2540]'>{faq.question}</dt>
                  <dd className='mt-2 text-gray-700 leading-relaxed'>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className='py-16 bg-gradient-to-r from-[#0A2540] to-[#3A8DDE] text-white text-center'>
          <div className='max-w-3xl mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-4'>Tour Maravilla with a local expert</h2>
            <p className='text-lg text-gray-200 mb-8'>
              Dr. Jan Duffy lists and sells in Maravilla daily — get a showing or a seller consult
              on your timeline.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button asChild size='lg' variant='secondary' className='bg-white text-[#0A2540]'>
                <Link href='/contact'>Contact Dr. Jan Duffy</Link>
              </Button>
              <Button asChild size='lg' variant='outline' className='border-white text-white'>
                <Link href='/homes'>View Maravilla homes</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>

      <AgentIdentityBand />

      <Script
        id='nearby-amenities-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema({
              name: `Nearby Amenities in ${MARAVILLA_COMMUNITY.name}, North Las Vegas`,
              description:
                'Interactive map and hyperlocal guide to dining, parks, schools, healthcare, and shopping near Maravilla in North Las Vegas.',
              url: `${baseUrl}/nearby-amenities`,
              breadcrumb: [
                { name: 'Home', url: baseUrl },
                { name: 'Nearby Amenities', url: `${baseUrl}/nearby-amenities` },
              ],
            }),
            generateBreadcrumbSchema([
              { name: 'Home', url: baseUrl },
              { name: 'Nearby Amenities', url: `${baseUrl}/nearby-amenities` },
            ]),
            generateFAQPageSchema(NEARBY_AMENITIES_FAQS),
            generateNearbyPlacesItemListSchema(
              CURATED_NEARBY_PLACES,
              `Featured places near ${MARAVILLA_COMMUNITY.name}`
            ),
            generatePlaceSchema({
              name: MARAVILLA_COMMUNITY.name,
              description:
                'Master-planned residential community in North Las Vegas, Nevada.',
              url: `${baseUrl}/nearby-amenities`,
            }),
            generateAgentAreaServedMaravillaSchema(),
          ]),
        }}
      />
    </PageLayout>
  );
}
