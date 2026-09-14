'use client';

import SiteImage from '@/components/ui/site-image';
import { usePathname } from 'next/navigation';
import { AGENT_PHOTO } from '@/lib/config/agent';
import { getPageHeroImage } from '@/data/page-images';

/**
 * Heading-matched photo + agent portrait on every inner page for SEO image indexation.
 */
export default function PageMediaBanner() {
  const pathname = usePathname() ?? '/';
  if (pathname === '/') return null;

  const hero = getPageHeroImage(pathname);

  return (
    <figure className='relative h-40 md:h-56 w-full overflow-hidden bg-[#0A2540]'>
      <SiteImage
        src={hero.src}
        alt={hero.alt}
        fill
        className='object-cover'
        sizes='100vw'
        priority={false}
      />
      <div className='absolute inset-0 bg-[#0A2540]/35' aria-hidden />
      <div className='absolute right-4 bottom-4 md:right-10 md:bottom-5 flex items-end gap-3'>
        <SiteImage
          src={AGENT_PHOTO.srcNav}
          alt={AGENT_PHOTO.alt}
          width={112}
          height={112}
          className='h-20 w-20 md:h-28 md:w-28 rounded-full bg-white object-contain shadow-xl ring-2 ring-white'
        />
      </div>
      <figcaption className='absolute left-4 bottom-4 md:left-10 md:bottom-5 max-w-xl text-white text-sm md:text-base font-medium drop-shadow'>
        {hero.alt}
      </figcaption>
    </figure>
  );
}
