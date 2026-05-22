import { BUSINESS_INFO, GBP_NAP } from '@/lib/config/business-info';

/** Canonical site URL (no trailing slash) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || GBP_NAP.website
).replace(/\/$/, '');

export const NAP = GBP_NAP;

/** Short brand for nav / compact UI */
export const NAP_SHORT_NAME = 'North Las Vegas Family Homes';

/** One-line contact for FAQs and body copy */
export function napContactLine(includeOffice = false): string {
  const base = `Call ${BUSINESS_INFO.phone.display}, text ${BUSINESS_INFO.sms.href}, email ${BUSINESS_INFO.email}`;
  return includeOffice ? `${base}. Office: ${BUSINESS_INFO.address.full}.` : `${base}.`;
}

/** Meta description suffix when phone is not already present */
export function withMetaPhone(description: string): string {
  const phone = BUSINESS_INFO.phone.display;
  if (description.includes(phone)) return description;
  const trimmed = description.trimEnd().replace(/\.\s*$/, '');
  return `${trimmed}. Call ${phone}.`;
}
