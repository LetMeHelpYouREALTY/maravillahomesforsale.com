'use client';

import Link from 'next/link';
import SiteImage from '@/components/ui/site-image';
import { AGENT_NAME, AGENT_PHOTO } from '@/lib/config/agent';

export default function Hero() {
  // Best area photo for hero background - highest quality community/area shot
  const backgroundImage = '/photos/01-1 (2).jpg';

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 w-full h-full'>
        {/* Fallback gradient background */}
        <div className='absolute inset-0 bg-linear-to-r from-[#0A2540] to-[#3A8DDE]'></div>

        {/* Hero Background Image - No fade-in for immediate LCP visibility */}
        <div className='absolute inset-0 w-full h-full'>
          <SiteImage
            src={backgroundImage}
            alt='Maravilla community and neighborhood area view, North Las Vegas'
            fill
            priority
            fetchPriority='high'
            className='object-cover'
            sizes='100vw'
            quality={60}
            aria-hidden='true'
          />
        </div>

        {/* Video Embed Option - Uncomment if you want to use a video background */}
        {/* 
        <iframe
          src='https://www.homes.com/local-guide/north-las-vegas-nv/maravilla-neighborhood/video/.../?autoplay=1&mute=1&loop=1&controls=0&playsinline=1'
          className='absolute inset-0 w-full h-full object-contain'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='Maravilla Neighborhood Video Background'
          aria-hidden='true'
        />
        */}
      </div>

      {/* Background Overlay - Darkens image for text readability */}
      <div className='absolute inset-0 bg-linear-to-r from-[#0A2540]/80 to-[#3A8DDE]/60 z-1'></div>

      {/* Hero Content */}
      <div className='relative z-10 text-center text-white max-w-4xl mx-auto px-4'>
        <h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight'>
          <span className='block animate-fade-in hero-gold-text'>
            North Las Vegas Family Homes
          </span>
          <span className='block mt-2 animate-fade-in-delay hero-green-text'>
            in Maravilla
          </span>
        </h1>

        <p className='speakable text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>
          Homes from 1,519 to 2,947 square feet, parks, trails, and I-215 access.
          Call (702) 500-1953.
        </p>

        <div className='flex justify-center mb-8 animate-fade-in-delay-2'>
          <SiteImage
            src={AGENT_PHOTO.src}
            alt={AGENT_PHOTO.alt}
            width={160}
            height={160}
            className='h-28 w-28 md:h-40 md:w-40 rounded-full bg-white/95 object-contain shadow-2xl ring-4 ring-white/70'
            priority
          />
        </div>
        <p className='text-sm md:text-base text-white/90 mb-6'>
          {AGENT_NAME}, REALTOR® · Berkshire Hathaway HomeServices Nevada Properties
        </p>

        {/* Hero CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2'>
          <Link
            href='/homes'
            className='bg-[#16B286] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#15A276] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105'
            aria-label='View available homes in Maravilla'
          >
            View Available Homes
          </Link>
          <Link
            href='/contact'
            className='bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30 hover:border-white/50 hover:scale-105'
            aria-label='Schedule a property tour with Dr. Jan Duffy'
          >
            Schedule a Tour
          </Link>
        </div>
      </div>
    </section>
  );
}
