'use client';

import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';


export default function MarketDataSection() {
  const currentStats = [
    {
      label: 'ZIP 89031 median sold',
      value: 'Mid-$400s',
      change: 'Sep 2026 public range',
      changeType: 'neutral',
      description: '~$415K–$437K — call for Maravilla comps',
    },
    {
      label: 'Days on market',
      value: '38–44',
      change: 'ZIP 89031, Sep 2026',
      changeType: 'neutral',
      description: 'Individual listings can move faster or slower',
    },
    {
      label: 'Maravilla floor plans',
      value: '1,519–2,947',
      change: 'Square feet',
      changeType: 'neutral',
      description: 'Single-story and two-story homes',
    },
    {
      label: 'Current listings',
      value: 'Live MLS',
      change: 'Call (702) 500-1953',
      changeType: 'neutral',
      description: 'Inventory changes daily',
    },
  ];

  const trends = [
    { period: 'ZIP 89031 (Sep 2026)', price: 'Mid-$400s', sales: 'Ask for volume', inventory: 'Live MLS' },
    {
      period: 'Days on market',
      price: '38–44 days',
      sales: 'Varies by plan',
      inventory: 'Condition-driven',
    },
    { period: 'Maravilla comps', price: 'Call for CMA', sales: 'Floor-plan specific', inventory: '(702) 500-1953' },
  ];

  return (
    <section className='py-20 bg-gradient-to-r from-[#0A2540] to-[#3A8DDE]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>
            North Las Vegas Family Homes: Market Data
          </h2>
          <SectionHeadingMedia heading='North Las Vegas Family Homes: Market Data' />
          <p className='text-xl text-white max-w-3xl mx-auto leading-relaxed'>
            Stay informed with the latest real estate market trends and
            statistics
          </p>
        </div>

        <Tabs defaultValue='current' className='w-full'>
          <TabsList className='grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/10 backdrop-blur-sm'>
            <TabsTrigger
              value='current'
              className='data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/90'
            >
              Current Stats
            </TabsTrigger>
            <TabsTrigger
              value='trends'
              className='data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/90'
            >
              Market Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value='current'>
            {/* Market Stats Grid */}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {currentStats.map((stat, index) => (
                <Card
                  key={index}
                  className='bg-white/10 backdrop-blur-sm border-white/20 text-center'
                >
                  <CardHeader>
                    <CardTitle className='text-white text-lg font-medium'>
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-white mb-2'>
                      {stat.value}
                    </div>
                    <Badge
                      variant='secondary'
                      className={`${
                        stat.changeType === 'positive'
                          ? 'bg-[#16B286]/20 text-[#16B286] border-[#16B286]/30'
                          : stat.changeType === 'negative'
                            ? 'bg-red-400/20 text-red-300 border-red-400/30'
                            : 'bg-gray-300/20 text-gray-300 border-gray-300/30'
                      } mb-2`}
                    >
                      {stat.change}
                    </Badge>
                    <CardDescription className='text-white/90 text-sm mt-2'>
                      {stat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='trends'>
            <div className='grid md:grid-cols-3 gap-6'>
              {trends.map((trend, index) => (
                <Card
                  key={index}
                  className='bg-white/10 backdrop-blur-sm border-white/20'
                >
                  <CardHeader>
                    <CardTitle className='text-white'>{trend.period}</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-white/90'>Price Change:</span>
                      <Badge
                        variant='secondary'
                        className='bg-[#16B286]/20 text-[#16B286] border-[#16B286]/30'
                      >
                        {trend.price}
                      </Badge>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-white/90'>Sales Volume:</span>
                      <Badge
                        variant='secondary'
                        className='bg-[#16B286]/20 text-[#16B286] border-[#16B286]/30'
                      >
                        {trend.sales}
                      </Badge>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-white/90'>Inventory:</span>
                      <Badge
                        variant='secondary'
                        className='bg-white/20 text-white border-white/30'
                      >
                        {trend.inventory}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Insights */}
        <div className='mt-16 text-center'>
          <Card className='bg-white/10 backdrop-blur-sm border-white/20'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold text-white'>
                Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='text-white text-lg leading-relaxed max-w-4xl mx-auto'>
                The Maravilla market moves with North Las Vegas inventory and rates.
                Ask for a dated CMA rather than a static average. Parks, trails,
                floor-plan variety, and I-15 / I-215 access keep buyers touring.
              </CardDescription>
              <div className='mt-6'>
                <Button
                  asChild
                  className='bg-[#16B286] hover:bg-[#15A276] text-white'
                >
                  <Link href='/market-data'>
                    View Full Market Report
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
