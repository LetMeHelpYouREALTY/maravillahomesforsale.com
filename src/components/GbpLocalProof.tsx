import Link from 'next/link';
import { Clock, MapPin, Navigation, Phone, Star } from 'lucide-react';
import GoogleMap from '@/components/sections/google-map';
import { BUSINESS_INFO } from '@/lib/config/business-info';
import SectionHeadingMedia from '@/components/SectionHeadingMedia';


/**
 * Visible NAP, hours, map pin, and GBP actions on every page.
 * Mirrors Google Business Profile so Maps/Search can reconcile the site.
 */
export default function GbpLocalProof() {
  return (
    <section
      className='py-12 bg-white border-t border-gray-200'
      aria-labelledby='gbp-local-heading'
      itemScope
      itemType='https://schema.org/LocalBusiness'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <p className='text-sm font-semibold tracking-wide text-[#3A8DDE] uppercase mb-2'>
            Google Business Profile
          </p>
          <h2
            id='gbp-local-heading'
            className='text-3xl font-bold text-[#0A2540] mb-3'
            itemProp='name'
          >
            Visit, Call, or Review North Las Vegas Family Homes
          </h2>
          <SectionHeadingMedia heading='Visit, Call, or Review North Las Vegas Family Homes' size='card' />
          <p className='text-gray-600 max-w-3xl mx-auto'>
            The name, address, phone, and hours below match this office on Google Maps.
            Use them to call, get directions, or leave a Google review after your tour.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-8 items-start'>
          <div>
            <p
              className='text-lg font-semibold text-[#0A2540] mb-1'
              itemProp='address'
              itemScope
              itemType='https://schema.org/PostalAddress'
            >
              <MapPin className='inline h-5 w-5 mr-2 text-[#3A8DDE]' aria-hidden />
              <span itemProp='streetAddress'>
                {BUSINESS_INFO.address.streetAddress}
              </span>
              ,{' '}
              <span itemProp='addressLocality'>
                {BUSINESS_INFO.address.addressLocality}
              </span>
              ,{' '}
              <span itemProp='addressRegion'>{BUSINESS_INFO.address.addressRegion}</span>{' '}
              <span itemProp='postalCode'>{BUSINESS_INFO.address.postalCode}</span>
            </p>
            <p className='text-gray-700 mt-3'>
              <Phone className='inline h-5 w-5 mr-2 text-[#16B286]' aria-hidden />
              <a
                href={BUSINESS_INFO.phone.href}
                className='font-semibold text-[#0A2540] hover:text-[#3A8DDE]'
                itemProp='telephone'
              >
                {BUSINESS_INFO.phone.display}
              </a>
            </p>
            <p className='text-gray-700 mt-2'>
              <Clock className='inline h-5 w-5 mr-2 text-[#0A2540]' aria-hidden />
              <span itemProp='openingHours'>{BUSINESS_INFO.hours.display}</span>
            </p>
            <p className='text-sm text-gray-500 mt-2'>
              Service area: {BUSINESS_INFO.serviceArea}
            </p>

            <div className='mt-6 flex flex-wrap gap-3'>
              <a
                href={BUSINESS_INFO.phone.href}
                className='inline-flex items-center rounded-md bg-[#16B286] px-4 py-2.5 text-white font-semibold hover:bg-[#15A276]'
              >
                <Phone className='h-4 w-4 mr-2' aria-hidden />
                Call
              </a>
              <a
                href={BUSINESS_INFO.maps.directions}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-md bg-[#3A8DDE] px-4 py-2.5 text-white font-semibold hover:bg-[#2A7DCE]'
              >
                <Navigation className='h-4 w-4 mr-2' aria-hidden />
                Directions
              </a>
              <Link
                href={BUSINESS_INFO.googleReviewUrl}
                target='_blank'
                rel='noopener noreferrer'
                prefetch={false}
                className='inline-flex items-center rounded-md border border-[#0A2540] px-4 py-2.5 text-[#0A2540] font-semibold hover:bg-[#F7F9FC]'
              >
                <Star className='h-4 w-4 mr-2' aria-hidden />
                Leave a Google Review
              </Link>
              <Link
                href={BUSINESS_INFO.googleBusinessProfile}
                target='_blank'
                rel='noopener noreferrer'
                prefetch={false}
                className='inline-flex items-center rounded-md border border-gray-300 px-4 py-2.5 text-gray-700 font-medium hover:bg-white'
              >
                View Google Reviews
              </Link>
            </div>
          </div>

          <GoogleMap
            address={BUSINESS_INFO.address.full}
            latitude={BUSINESS_INFO.geo.latitude}
            longitude={BUSINESS_INFO.geo.longitude}
            zoom={15}
            height='320px'
            title={`${BUSINESS_INFO.name} office map pin`}
          />
        </div>
      </div>
    </section>
  );
}
