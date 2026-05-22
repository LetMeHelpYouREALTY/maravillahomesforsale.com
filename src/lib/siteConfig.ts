import { BUSINESS_INFO } from '@/lib/config/business-info';

export const siteConfig = {
  name: BUSINESS_INFO.name,
  shortName: 'North Las Vegas Family Homes',
  url: 'https://www.maravillahomesforsale.com',
  phone: BUSINESS_INFO.phone.display,
  phoneRaw: BUSINESS_INFO.phone.schema,
  phoneTel: BUSINESS_INFO.phone.href,
  phoneSms: BUSINESS_INFO.sms.href,
  email: BUSINESS_INFO.email,
  address: {
    street: BUSINESS_INFO.address.streetAddress,
    city: BUSINESS_INFO.address.addressLocality,
    state: BUSINESS_INFO.address.addressRegion,
    zip: BUSINESS_INFO.address.postalCode,
    full: BUSINESS_INFO.address.full,
  },
  social: BUSINESS_INFO.social,
  license: BUSINESS_INFO.license,
  brokerage: BUSINESS_INFO.brokerage,
  realscout: 'http://drjanduffy.realscout.com/onboarding',
  googleBusiness: BUSINESS_INFO.googleBusinessProfile,
  googleReview: BUSINESS_INFO.googleReviewUrl,
  hours: {
    open: '6:00 AM',
    close: '9:00 PM',
    days: 'Sunday – Saturday',
  },
  description: BUSINESS_INFO.description,
  serviceArea: BUSINESS_INFO.serviceArea,
  foundingDate: BUSINESS_INFO.foundingDate,
};
