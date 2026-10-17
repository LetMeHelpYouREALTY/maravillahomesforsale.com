import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import {
  generateMetadata as genMetadata,
  generateWebPageSchema,
} from '@/lib/metadata';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';

export const metadata: Metadata = {
  ...genMetadata({
    title: 'Search Homes in Maravilla | Dr. Jan Duffy',
    description:
      'Search Maravilla homes and explore real estate listings, market data, and neighborhood information in Maravilla, Las Vegas, Nevada.',
    keywords:
      'Maravilla search, Maravilla homes search, Maravilla real estate search, Las Vegas homes',
    path: '/search',
  }),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

// Mark as dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = (params.q ?? '').trim();

  return (
    <PageLayout>
      <section className='py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#0A2540] mb-4'>
            Maravilla: Search Homes
          </h1>
          <SectionHeadingMedia heading='Maravilla: Search Homes' />
          <p className='text-lg text-gray-600 mb-8'>
            {query
              ? `You searched for "${query}". Use the links below to browse listings and market insights in Maravilla, Las Vegas.`
              : 'Use the links below to browse listings and market insights in Maravilla, Las Vegas.'}
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild className='bg-[#3A8DDE] hover:bg-[#2A7DCE] text-white'>
              <Link href='/homes'>Browse Maravilla Homes for Sale</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/market-data'>View Maravilla Market Data</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        id='search-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema({
              name: 'Maravilla | Search Homes',
              description:
                'Search Maravilla homes and explore real estate listings, market data, and neighborhood information in Maravilla, Las Vegas, Nevada.',
              url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maravillahomesforsale.com'}/search`,
            }),
          ]),
        }}
      />
    </PageLayout>
  );
}


