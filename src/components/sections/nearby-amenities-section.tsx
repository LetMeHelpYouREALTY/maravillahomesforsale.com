import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';
import { MARAVILLA_COMMUNITY } from '@/lib/config/community-map';
import AmenityMap from '@/components/maps/amenity-map';

type NearbyAmenitiesSectionProps = {
  /** e.g. "What's Nearby" or "Life Near Maravilla" */
  title?: string;
  compactMap?: boolean;
};

export default function NearbyAmenitiesSection({
  title = `Life Near ${MARAVILLA_COMMUNITY.name}`,
  compactMap = true,
}: NearbyAmenitiesSectionProps) {
  return (
    <section
      className='py-16 bg-white'
      aria-labelledby='nearby-amenities-section-heading'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8'>
          <div>
            <h2
              id='nearby-amenities-section-heading'
              className='text-3xl font-bold text-[#0A2540]'
            >
              {title}
            </h2>
            <SectionHeadingMedia heading={title} />
            <p className='text-lg text-gray-700 mt-3 max-w-3xl'>
              Explore grocery, parks, schools, healthcare, and dining around{' '}
              {MARAVILLA_COMMUNITY.name} in {MARAVILLA_COMMUNITY.city}. Use the map filters,
              then open the full guide for drive times and FAQs.
            </p>
          </div>
          <Button asChild variant='outline' className='shrink-0 border-[#3A8DDE] text-[#3A8DDE]'>
            <Link href='/nearby-amenities'>Nearby amenities guide</Link>
          </Button>
        </div>
        <AmenityMap height='420px' compact={compactMap} showStaticList={false} />
      </div>
    </section>
  );
}
