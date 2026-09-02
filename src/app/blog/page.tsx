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
import { Button } from '@/components/ui/button';
import {
  generateMetadata as genMetadata,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateBlogSchema,
} from '@/lib/metadata';
import SiteImage from '@/components/ui/site-image';
import { getMarketInsightPosts } from '@/data/market-insight-posts';

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maravillahomesforsale.com'
).replace(/\/$/, '');

export const metadata = genMetadata({
  title: 'North Las Vegas Family Homes | Blog & Market Updates | Dr. Jan Duffy',
  description:
    'Real estate guides and market updates for Maravilla and North Las Vegas. Buying, selling, and first-time buyer next steps. Dr. Jan Duffy, REALTOR® (702) 500-1953.',
  keywords:
    'Maravilla blog, North Las Vegas real estate news, Maravilla market updates, Las Vegas real estate trends',
  path: '/blog',
});

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getMarketInsightPosts();

  return (
    <PageLayout>
      <div className='bg-gradient-to-r from-[#0A2540] to-[#3A8DDE] text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            North Las Vegas Family Homes: Blog & Market Updates
          </h1>
          <p className='text-xl text-gray-200 max-w-3xl'>
            Buyer and seller guides for Maravilla and North Las Vegas from Dr. Jan Duffy.
          </p>
        </div>
      </div>

      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
            <p className='text-gray-600'>
              On-site guides and tools. For the full set, visit Market Insights.
            </p>
            <Button asChild variant='outline' className='shrink-0'>
              <Link href='/market-insights'>View all Market Insights</Link>
            </Button>
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
                  <CardTitle className='group-hover:text-[#3A8DDE] transition-colors'>
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

          {posts.length > 0 && (
            <div className='mt-12 text-center'>
              <Button asChild className='bg-[#3A8DDE] hover:bg-[#2A7DCE] text-white'>
                <Link href='/market-insights'>View all Market Insights</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Script
        id='blog-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema({
              name: 'North Las Vegas Family Homes | Blog & Market Updates',
              description:
                'North Las Vegas Family Homes: blog and market updates for North Las Vegas and Maravilla.',
              url: `${baseUrl}/blog`,
              breadcrumb: [
                { name: 'Home', url: baseUrl },
                { name: 'Blog', url: `${baseUrl}/blog` },
              ],
            }),
            generateBlogSchema({
              name: 'Blog & Market Updates',
              description:
                'North Las Vegas Family Homes: real estate guides and local insights for North Las Vegas and Maravilla.',
              url: `${baseUrl}/blog`,
              author: 'North Las Vegas Family Homes | Homes by Dr. Jan Duffy',
              publisher: 'North Las Vegas Family Homes | Homes by Dr. Jan Duffy',
            }),
            generateBreadcrumbSchema([
              { name: 'Home', url: baseUrl },
              { name: 'Blog', url: `${baseUrl}/blog` },
            ]),
          ]),
        }}
      />
    </PageLayout>
  );
}
