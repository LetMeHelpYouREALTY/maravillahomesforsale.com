import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/config/business-info';

/**
 * Visible GBP-matching NAP block — rendered on every page via PageLayout.
 */
export default function BusinessNapStrip() {
  return (
    <section
      className='border-t border-gray-200 bg-white py-10'
      aria-labelledby='business-nap-heading'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2
          id='business-nap-heading'
          className='text-2xl font-bold text-[#0A2540] mb-6 text-center'
        >
          {BUSINESS_INFO.name}
        </h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-gray-700'>
          <div className='flex gap-3'>
            <MapPin className='h-5 w-5 shrink-0 text-[#3A8DDE]' aria-hidden />
            <div>
              <p className='font-semibold text-[#0A2540]'>Office</p>
              <p className='text-sm mt-1'>{BUSINESS_INFO.address.streetAddress}</p>
              <p className='text-sm'>
                {BUSINESS_INFO.address.addressLocality}, {BUSINESS_INFO.address.addressRegion}{' '}
                {BUSINESS_INFO.address.postalCode}
              </p>
              <Link
                href={BUSINESS_INFO.maps.directions}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-[#3A8DDE] hover:underline mt-2 inline-block'
              >
                Get directions
              </Link>
            </div>
          </div>
          <div className='flex gap-3'>
            <Phone className='h-5 w-5 shrink-0 text-[#3A8DDE]' aria-hidden />
            <div>
              <p className='font-semibold text-[#0A2540]'>Phone</p>
              <a
                href={BUSINESS_INFO.phone.href}
                className='text-lg font-semibold text-[#0A2540] hover:text-[#3A8DDE] mt-1 inline-block'
              >
                {BUSINESS_INFO.phone.display}
              </a>
            </div>
          </div>
          <div className='flex gap-3'>
            <MessageSquare className='h-5 w-5 shrink-0 text-[#3A8DDE]' aria-hidden />
            <div>
              <p className='font-semibold text-[#0A2540]'>Text / Chat</p>
              <a
                href={BUSINESS_INFO.sms.href}
                className='text-sm text-[#3A8DDE] hover:underline mt-1 inline-block'
              >
                {BUSINESS_INFO.sms.display}
              </a>
            </div>
          </div>
          <div className='flex gap-3'>
            <Mail className='h-5 w-5 shrink-0 text-[#3A8DDE]' aria-hidden />
            <div>
              <p className='font-semibold text-[#0A2540]'>Email</p>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className='text-sm text-[#3A8DDE] hover:underline mt-1 inline-block break-all'
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
        </div>
        <p className='mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 text-center'>
          <Clock className='h-4 w-4 shrink-0' aria-hidden />
          <span>{BUSINESS_INFO.hours.display}</span>
          <span className='hidden sm:inline'>· Service area: {BUSINESS_INFO.serviceArea}</span>
        </p>
        <div className='mt-4 flex flex-wrap justify-center gap-4 text-sm'>
          <Link
            href={BUSINESS_INFO.googleBusinessProfile}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#3A8DDE] hover:underline font-medium'
          >
            View Google Business Profile
          </Link>
          <Link href='/contact' className='text-[#3A8DDE] hover:underline font-medium'>
            Contact page
          </Link>
        </div>
      </div>
    </section>
  );
}
