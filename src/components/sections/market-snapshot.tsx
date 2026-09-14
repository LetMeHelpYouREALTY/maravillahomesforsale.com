import Link from 'next/link';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MarketSnapshot() {
  return (
    <section className='py-20 bg-gradient-to-br from-amber-50 via-white to-amber-50' style={{
      backgroundImage: 'url(/images/backgrounds/retina-wood.png)',
      backgroundRepeat: 'repeat',
    }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-[#0A2540] mb-4'>
            North Las Vegas Family Homes: Market Snapshot
          </h2>
          <SectionHeadingMedia heading='North Las Vegas Family Homes: Market Snapshot' />
          <h3 className='text-2xl text-gray-600 mb-8'>
            Current North Las Vegas Real Estate Trends
          </h3>
        </div>
        
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200'>
            <div className='prose prose-lg max-w-none'>
              <p className='text-gray-700 leading-relaxed mb-4'>
                Maravilla homes typically run <Link href='/homes' className='text-[#3A8DDE] hover:underline font-medium'>1,519–2,947 square feet</Link> in North Las Vegas ZIP 89031.
                Public ZIP-level medians as of September 2026 sit in the mid-$400s; individual Maravilla comps depend on floor plan, condition, and lot. Call for current MLS numbers. Explore the <Link href='/neighborhood' className='text-[#3A8DDE] hover:underline font-medium'>Maravilla neighborhood</Link> and <Link href='/market-data' className='text-[#3A8DDE] hover:underline font-medium'>market data</Link> pages.
              </p>
              
              <p className='text-gray-700 font-semibold mb-3'>What buyers ask about:</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-6'>
                <li>17 floor plans across six Maravilla neighborhoods</li>
                <li>7 parks and miles of walking trails</li>
                <li>I-15 and I-215 access from North Las Vegas</li>
                <li>Clark County School District zones by address</li>
                <li><Link href='/homes' className='text-[#3A8DDE] hover:underline'>Current listings</Link> update daily</li>
                <li>Desert-modern elevations and energy-efficient features</li>
              </ul>
              
              <div className='flex flex-wrap gap-3 mt-6'>
                <Button asChild variant='outline' size='sm'>
                  <Link href='/market-data'>View Full Market Report</Link>
                </Button>
                <Button asChild variant='outline' size='sm'>
                  <Link href='/homes'>Browse Maravilla Homes</Link>
                </Button>
                <Button asChild variant='outline' size='sm'>
                  <Link href='/home-valuation'>Get Home Valuation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

