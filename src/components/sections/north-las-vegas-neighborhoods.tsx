import Link from 'next/link';
import Image from 'next/image';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';


type Neighborhood = {
  name: string;
  description: string;
  avgPrice: string;
  homesAvailable: number;
  amenities: string[];
  image: string;
};

const neighborhoods: Neighborhood[] = [
  {
    name: 'Aliante',
    description: 'Parks, trails, shopping, and CCSD campuses nearby',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: ['CCSD campuses nearby', 'Parks', 'Shopping Center', 'Golf Course'],
    image: '/images/pages/aliante-hero.jpg',
  },
  {
    name: 'Ardiente',
    description: 'Clubhouse, pool, and mountain views in North Las Vegas',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: ['Pool', 'Fitness Center', 'Mountain Views', 'Clubhouse'],
    image: '/photos/05-1 (5).jpg',
  },
  {
    name: 'Maravilla',
    description:
      'Master-planned North Las Vegas community with 1,519–2,947 sq ft floor plans, parks, and trails',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: ['Parks', 'CCSD campuses nearby', 'I-215 access', 'Desert-modern homes'],
    image: '/images/pages/neighborhood-hero.jpg',
  },
  {
    name: 'Del Webb at North Ranch',
    description: '55+ community with single-story plans, pool, and clubhouse',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: [
      '55+ Community',
      'Pool',
      'Fitness Center',
      'Clubhouse',
    ],
    image: '/images/pages/fifty-five-plus-hero.jpg',
  },
  {
    name: 'Eldorado',
    description: 'Completed street grid with mature desert landscaping',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: [
      'Mature Trees',
      'Completed street grid',
      'I-15 / I-215 access',
      'Parks',
    ],
    image: '/images/pages/eldorado-hero.jpg',
  },
  {
    name: 'Heartland at Tule Springs',
    description: 'Newer North Las Vegas construction with community pool',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: [
      'New Construction',
      'Community Pool',
      'Parks nearby',
      'Highway access',
    ],
    image: '/images/pages/section-new-construction.jpg',
  },
  {
    name: 'Sun City Aliante',
    description:
      '55+ community near Aliante with golf and clubhouse amenities',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: [
      '55+ Community',
      'Golf',
      'Clubhouse',
      'Pool',
    ],
    image: '/images/pages/section-golf.jpg',
  },
  {
    name: 'Valley Vista',
    description: 'North Las Vegas streets with parks and highway access',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: ['Parks nearby', 'CCSD campuses nearby', 'Highway access', 'Shopping nearby'],
    image: '/photos/10-1 (10).jpg',
  },
  {
    name: 'The Villages at Tule Springs',
    description: 'Master-planned North Las Vegas community with trails and recreation',
    avgPrice: 'Call for comps',
    homesAvailable: 0,
    amenities: [
      'Master Planned',
      'Nature Trails',
      'Community recreation',
      'Newer construction',
    ],
    image: '/photos/11-1 (11).jpg',
  },
];

const NeighborhoodCard = ({ neighborhood }: { neighborhood: Neighborhood }) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2'>
      {/* Neighborhood image */}
      <div className='relative h-48 w-full overflow-hidden bg-gray-100'>
        <Image
          src={neighborhood.image}
          alt={`${neighborhood.name} neighborhood in North Las Vegas`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <div className='p-6'>
        <h3 className='text-2xl font-semibold text-[#0A2540] mb-3'>
          {neighborhood.name}
        </h3>
        <p className='text-gray-600 mb-4 leading-relaxed'>
          {neighborhood.description}
        </p>

        <div className='space-y-3 mb-4'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600'>Current pricing:</span>
            <span className='text-[#16B286] font-semibold text-lg'>
              {neighborhood.avgPrice}
            </span>
          </div>
          <Link
            href='/homes'
            className='block text-[#3A8DDE] font-semibold hover:underline'
          >
            Browse current listings
          </Link>
        </div>

        <div className='mb-6'>
          <h3 className='text-sm font-semibold text-[#0A2540] mb-2'>
            Key Amenities:
          </h3>
          <div className='flex flex-wrap gap-2'>
            {neighborhood.amenities.map((amenity, index) => (
              <span
                key={index}
                className='bg-[#F7F9FC] px-3 py-1 rounded-full text-sm text-[#0A2540] border border-gray-200'
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <Link
          href='http://drjanduffy.realscout.com/onboarding'
          target='_blank'
          rel='noopener noreferrer'
          prefetch={false}
          className='w-full bg-[#3A8DDE] text-white py-3 rounded-lg font-semibold hover:bg-[#2A7DCE] transition-colors duration-200 block text-center'
        >
          View {neighborhood.name} Homes
        </Link>
      </div>
    </div>
  );
};

const NorthLasVegasNeighborhoods = () => {
  return (
    <section className='py-20 bg-[#F7F9FC]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-[#0A2540] mb-4'>
            North Las Vegas Family Homes: Neighborhoods
          </h2>
          <SectionHeadingMedia heading='North Las Vegas Family Homes: Neighborhoods' />
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Discover the diverse communities of North Las Vegas, each offering
            unique amenities and lifestyle options
          </p>
        </div>

        {/* Neighborhoods Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {neighborhoods.map((neighborhood, index) => (
            <NeighborhoodCard key={index} neighborhood={neighborhood} />
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <div className='bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto'>
            <h3 className='text-2xl font-bold text-[#0A2540] mb-4'>
              Find Your Perfect North Las Vegas Home
            </h3>
            <SectionHeadingMedia heading='Find Your Perfect North Las Vegas Home' size='card' />
            <p className='text-gray-600 mb-6 leading-relaxed'>
              Whether you&apos;re looking for a 1,519–2,947 sq ft floor plan, a
              single-story ranch, or a 55+ community, North Las Vegas has
              inventory to tour. Let us help you compare listings.
            </p>
            <Link
              href='http://drjanduffy.realscout.com/onboarding'
              target='_blank'
              rel='noopener noreferrer'
              prefetch={false}
              className='bg-[#16B286] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#15A276] transition-colors duration-200 inline-block'
            >
              Start Your Home Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NorthLasVegasNeighborhoods;
