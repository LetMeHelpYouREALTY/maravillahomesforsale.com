import SiteImage from '@/components/ui/site-image';
import Link from 'next/link';
import { AGENT_JOB_TITLE, AGENT_LICENSE, AGENT_NAME, AGENT_PHOTO } from '@/lib/config/agent';
import { BUSINESS_INFO } from '@/lib/config/business-info';

/**
 * E-E-A-T / GEO / AEO agent identity on every page: photo, NAP, license, speakable bio.
 */
export default function AgentIdentityBand() {
  return (
    <section
      className='py-12 bg-[#F7F9FC] border-t border-gray-200'
      aria-labelledby='agent-identity-heading'
      itemScope
      itemType='https://schema.org/RealEstateAgent'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-[auto_1fr] gap-8 items-center'>
          <SiteImage
            src={AGENT_PHOTO.src}
            alt={AGENT_PHOTO.alt}
            width={200}
            height={200}
            className='h-40 w-40 md:h-48 md:w-48 rounded-full bg-white object-contain shadow-lg mx-auto md:mx-0'
            itemProp='image'
          />
          <div>
            <p className='text-sm font-semibold tracking-wide text-[#3A8DDE] uppercase mb-1'>
              Your North Las Vegas REALTOR®
            </p>
            <h2
              id='agent-identity-heading'
              className='text-3xl font-bold text-[#0A2540] mb-2'
              itemProp='name'
            >
              {AGENT_NAME}
            </h2>
            <p className='text-[#0A2540] font-medium mb-3'>
              <span itemProp='jobTitle'>{AGENT_JOB_TITLE}</span>
              {' · '}
              <span itemProp='memberOf'>{BUSINESS_INFO.brokerage}</span>
              {' · License '}
              {AGENT_LICENSE}
            </p>
            <p className='speakable text-gray-700 leading-relaxed max-w-3xl mb-4' itemProp='description'>
              {AGENT_NAME} helps buyers and sellers in Maravilla and North Las Vegas
              with listing strategy, pricing, and tour-to-close support. Call{' '}
              <a
                href={BUSINESS_INFO.phone.href}
                className='text-[#3A8DDE] font-semibold hover:underline'
                itemProp='telephone'
              >
                {BUSINESS_INFO.phone.display}
              </a>
              .
            </p>
            <p className='text-sm text-gray-600 mb-4' itemProp='address' itemScope itemType='https://schema.org/PostalAddress'>
              <span itemProp='streetAddress'>{BUSINESS_INFO.address.streetAddress}</span>,{' '}
              <span itemProp='addressLocality'>{BUSINESS_INFO.address.addressLocality}</span>,{' '}
              <span itemProp='addressRegion'>{BUSINESS_INFO.address.addressRegion}</span>{' '}
              <span itemProp='postalCode'>{BUSINESS_INFO.address.postalCode}</span>
            </p>
            <div className='flex flex-wrap gap-3'>
              <a
                href={BUSINESS_INFO.phone.href}
                className='inline-flex items-center rounded-md bg-[#16B286] px-4 py-2 text-white font-medium hover:bg-[#15A276]'
              >
                Call {BUSINESS_INFO.phone.display}
              </a>
              <Link
                href='/about'
                className='inline-flex items-center rounded-md bg-[#3A8DDE] px-4 py-2 text-white font-medium hover:bg-[#2A7DCE]'
              >
                About {AGENT_NAME}
              </Link>
              <Link
                href='/contact'
                className='inline-flex items-center rounded-md border border-[#0A2540] px-4 py-2 text-[#0A2540] font-medium hover:bg-white'
              >
                Schedule a consultation
              </Link>
              <a
                href={BUSINESS_INFO.maps.directions}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-white'
              >
                Directions
              </a>
              <a
                href={BUSINESS_INFO.googleReviewUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-white'
              >
                Leave a Google Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
