/**
 * Market insight cards for the homepage.
 * Uses on-site guides — KCM RSS is stopped.
 */

import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SiteImage from '@/components/ui/site-image';
import { getMarketInsightPosts } from '@/data/market-insight-posts';

const BlogPosts = () => {
  const latestPosts = getMarketInsightPosts(3);

  return (
    <section
      className='bg-[#F8F9FA] py-20'
      aria-labelledby='blog-posts-heading'
    >
      <div className='max-w-[1200px] mx-auto px-5'>
        <div className='text-center mb-12'>
          <h2
            id='blog-posts-heading'
            className='text-[32px] font-primary font-regular text-[#333333] mb-3'
          >
            Maravilla Las Vegas Homes Market Insights
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Buyer and seller guides for Maravilla and North Las Vegas from Dr. Jan Duffy
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]'>
          {latestPosts.map((post) => (
            <Card
              key={post.href}
              className='group overflow-hidden h-full hover:shadow-xl transition-all duration-300'
              role='article'
              aria-label={`Guide: ${post.title}`}
            >
              <Link
                href={post.href}
                className='block relative w-full h-[190px] overflow-hidden'
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
                  <Link
                    href={post.categoryHref}
                    className='hover:underline'
                    aria-label={`View ${post.category}`}
                  >
                    {post.category}
                  </Link>
                </Badge>
                <CardTitle className='group-hover:text-[#3A8DDE] transition-colors duration-300'>
                  <Link href={post.href} className='line-clamp-2'>
                    {post.title}
                  </Link>
                </CardTitle>
                {post.description && (
                  <CardDescription className='line-clamp-2 mt-2'>
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
        <div className='text-center mt-12'>
          <Link
            href='/market-insights'
            className='inline-block bg-[#3A8DDE] text-white font-primary font-medium text-sm py-[10px] px-6 rounded-lg hover:bg-[#2A7DCE] transition-colors duration-300'
            aria-label='View all Maravilla Las Vegas market insights'
          >
            View All Market Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
