import Link from 'next/link';
import PageLayout from '@/components/layout/page-layout';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  generateMetadata as genMetadata,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateBlogSchema,
  generateArticleSchema,
  generateVideoGallerySchema,
} from '@/lib/metadata';
import { KCM_VIDEOS_URL } from '@/data/guides';
import { KCM_VIDEO_ENTRIES } from '@/data/kcm-videos';
import KcmVideosSection from '@/components/sections/kcm-videos-section';
import SiteImage from '@/components/ui/site-image';
import { getMarketInsightPosts } from '@/data/market-insight-posts';

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maravillahomesforsale.com'
).replace(/\/$/, '');

export const metadata = genMetadata({
  title: 'North Las Vegas Family Homes | Maravilla Market Insights | Dr. Jan Duffy',
  description:
    'Market insights for Maravilla and North Las Vegas: buyer and seller guides, prices, and next steps. Dr. Jan Duffy, REALTOR®. Call (702) 500-1953.',
  keywords:
    'Maravilla market insights, Maravilla real estate news, Las Vegas market insights, Las Vegas real estate trends',
  path: '/market-insights',
});

export const revalidate = 3600;

export default function MarketInsightsPage() {
  const posts = getMarketInsightPosts();

  return (
    <PageLayout>
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-[#0A2540] mb-4'>
              North Las Vegas Family Homes: Market Insights
            </h1>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Buyer and seller guides for Maravilla and North Las Vegas from Dr. Jan Duffy.
              Also see our{' '}
              <Link href='/blog' className='text-[#3A8DDE] hover:underline'>
                Blog & Market Updates
              </Link>
              .
            </p>
            <p className='mt-3 text-gray-600'>
              <a
                href={KCM_VIDEOS_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-[#3A8DDE] hover:underline font-medium'
              >
                Watch: Home Sales Picked Up Coming into 2026
              </a>
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
              <Card
                key={post.href}
                className='group overflow-hidden h-full hover:shadow-xl transition-all duration-300'
              >
                <Link
                  href={post.href}
                  className='block relative w-full h-[200px] overflow-hidden'
                  aria-label={`Read: ${post.title}`}
                >
                  <SiteImage
                    src={post.imageUrl}
                    alt={`${post.title} — North Las Vegas and Maravilla`}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                  />
                </Link>

                <CardHeader>
                  <Badge
                    variant='outline'
                    className='w-fit mb-2 text-[#3A8DDE] border-[#3A8DDE]/30'
                  >
                    <Link href={post.categoryHref} className='hover:underline'>
                      {post.category}
                    </Link>
                  </Badge>

                  <CardTitle className='group-hover:text-[#3A8DDE] transition-colors duration-300'>
                    <Link href={post.href} className='line-clamp-2'>
                      {post.title}
                    </Link>
                  </CardTitle>

                  {post.description && (
                    <CardDescription className='line-clamp-3 mt-2'>
                      {post.description}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardFooter className='flex-col items-start gap-2 pt-0'>
                  <CardDescription className='text-xs uppercase'>
                    {post.author}
                  </CardDescription>
                  <CardDescription className='text-xs'>{post.date}</CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <KcmVideosSection
        limit={5}
        heading='North Las Vegas Family Homes: Market Videos'
        description='Watch short market updates and tips from Dr. Jan Duffy’s partner, Simplifying the Market.'
      />

      <Script
        id='market-insights-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema({
              name: 'North Las Vegas Family Homes | Market Insights',
              description:
                'Read market insights and guides for Maravilla, North Las Vegas and Las Vegas, Nevada.',
              url: `${baseUrl}/market-insights`,
              breadcrumb: [
                { name: 'Home', url: baseUrl },
                { name: 'Market Insights', url: `${baseUrl}/market-insights` },
              ],
            }),
            generateBlogSchema({
              name: 'North Las Vegas Family Homes | Market Insights',
              description:
                'Real estate market insights and guides for Maravilla, North Las Vegas and Las Vegas, Nevada.',
              url: `${baseUrl}/market-insights`,
              author: 'Dr. Jan Duffy',
              publisher: 'North Las Vegas Family Homes | Homes by Dr. Jan Duffy',
            }),
            ...posts.slice(0, 5).map((post) =>
              generateArticleSchema({
                headline: post.title,
                description:
                  post.description ||
                  `North Las Vegas Family Homes: ${post.title} for North Las Vegas and Maravilla.`,
                url: `${baseUrl}${post.href}`,
                image: post.imageUrl,
                datePublished: post.dateISO,
                author: {
                  name: post.author,
                },
                publisher: {
                  name: 'North Las Vegas Family Homes | Homes by Dr. Jan Duffy',
                  logo: '/images/dr-jan-duffy-512.png',
                },
              })
            ),
            generateBreadcrumbSchema([
              { name: 'Home', url: baseUrl },
              { name: 'Market Insights', url: `${baseUrl}/market-insights` },
            ]),
            generateVideoGallerySchema(
              KCM_VIDEO_ENTRIES.map((v) => ({
                id: v.id,
                title: v.title,
                description: v.description,
                url: v.url,
              })),
              'North Las Vegas Family Homes: Market Videos'
            ),
          ]),
        }}
      />
    </PageLayout>
  );
}
