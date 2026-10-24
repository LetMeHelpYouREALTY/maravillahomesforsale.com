import type { Metadata } from 'next';
import Script from 'next/script';
import { Source_Sans_3, Open_Sans } from 'next/font/google';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateRealEstateAgentSchema,
  generateSiteServiceSchema,
  SITE_AUTHOR_NAME,
  SITE_SEO_TITLE,
} from '@/lib/metadata';
import { BUSINESS_INFO, GBP_DESCRIPTION } from '@/lib/config/business-info';
import { AGENT_PHOTO, HOMEPAGE_OG_IMAGE } from '@/lib/config/agent';
import {
  gitBackupFromCloudflareSrc,
  isCloudflareImagesEnabled,
  toAbsoluteImageUrl,
} from '@/lib/config/cloudflare-images';
import './globals.css';

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  process.env.GOOGLE_SITE_VERIFICATION;

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maravillahomesforsale.com'
).replace(/\/$/, '');

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-ZG0VF199TR';
const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

function isNonPlaceholderId(value: string | undefined): value is string {
  if (!value) return false;
  const normalized = value.trim();
  if (!normalized) return false;
  if (normalized.includes('XXXX')) return false;
  if (normalized.includes('YOUR_')) return false;
  return true;
}

function isValidGtmId(value: string | undefined): value is string {
  if (!isNonPlaceholderId(value)) return false;
  return /^GTM-[A-Z0-9]+$/i.test(value);
}

function isValidGaId(value: string | undefined): value is string {
  if (!isNonPlaceholderId(value)) return false;
  // GA4 measurement ID format (most common): G-XXXXXXXXXX
  return /^G-[A-Z0-9]+$/i.test(value);
}

function isValidFacebookPixelId(value: string | undefined): value is string {
  if (!isNonPlaceholderId(value)) return false;
  // Pixel IDs are numeric.
  return /^\d{8,20}$/.test(value.trim());
}

// Ensure these assets exist in /public to avoid 404s for crawlers.
const ogImageUrl = toAbsoluteImageUrl(HOMEPAGE_OG_IMAGE.src, siteUrl);

// Optimize fonts with next/font
const sourceSansPro = Source_Sans_3({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans-pro',
});

const openSans = Open_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const defaultDescription =
  'Maravilla homes for sale in North Las Vegas. Parks, trails, and floor plans near I-215. Dr. Jan Duffy, REALTOR®. Call (702) 500-1953.';

export const metadata: Metadata = {
  title: SITE_SEO_TITLE,
  description: defaultDescription,
  keywords:
    'Maravilla homes for sale, North Las Vegas real estate, Maravilla Las Vegas, Dr. Jan Duffy REALTOR, first-time home buyer North Las Vegas, Maravilla community, North Las Vegas neighborhoods, homes for sale Maravilla, Nevada real estate',
  authors: [{ name: SITE_AUTHOR_NAME, url: siteUrl }],
  creator: SITE_AUTHOR_NAME,
  publisher: SITE_AUTHOR_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_SEO_TITLE,
    description: defaultDescription,
    url: siteUrl,
    siteName: SITE_SEO_TITLE,
    locale: 'en_US',
    type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: HOMEPAGE_OG_IMAGE.width,
          height: HOMEPAGE_OG_IMAGE.height,
          alt: HOMEPAGE_OG_IMAGE.alt,
          secureUrl: ogImageUrl,
        },
      ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_SEO_TITLE,
    description: defaultDescription,
    images: [ogImageUrl],
    // 2025 Best Practice: Add Twitter site handle if available
    creator: '@maravillahomes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      // 2025 Best Practice: Allow large image previews for Google Images
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  category: 'Real Estate',
  classification: 'Real Estate',
  other: {
    'geo.region': 'US-NV',
    'geo.placename': 'North Las Vegas, Las Vegas',
    'geo.position': `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`,
    ICBM: `${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`,
    'DC.title': SITE_SEO_TITLE,
    'DC.creator': SITE_AUTHOR_NAME,
    'DC.subject': 'Maravilla homes for sale, North Las Vegas real estate',
    'DC.description': 'Maravilla homes for sale in North Las Vegas, Nevada',
    'DC.publisher': SITE_AUTHOR_NAME,
    'DC.contributor': SITE_AUTHOR_NAME,
    'DC.date': '2026',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': siteUrl,
    'DC.language': 'en',
    'DC.coverage': 'North Las Vegas, Nevada',
    'DC.rights': `Copyright 2026 ${BUSINESS_INFO.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${sourceSansPro.variable} ${openSans.variable}`}>
      <head>
        {/* 2025 Best Practice: Mobile-first viewport for Google's mobile-first indexing */}
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=5' />
        {/* 2025 Best Practice: Theme color for better mobile experience */}
        <meta name='theme-color' content='#0A2540' />
        {/* 2025 Best Practice: Color scheme for dark mode support */}
        <meta name='color-scheme' content='light dark' />
        {/* Preconnect to critical third-party origins for faster resource loading */}
        {/* RealScout: Preconnect for widget (310ms LCP savings per Lighthouse) */}
        <link rel='preconnect' href='https://em.realscout.com' crossOrigin='anonymous' />
        {/* Google Analytics: Preconnect for tracking */}
        <link rel='preconnect' href='https://www.googletagmanager.com' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://www.google-analytics.com' crossOrigin='anonymous' />
        <link rel='dns-prefetch' href='https://www.google-analytics.com' />
        {/* Facebook Pixel: DNS prefetch only (loaded lazily) */}
        <link rel='dns-prefetch' href='https://connect.facebook.net' />
        {isCloudflareImagesEnabled() ? (
          <link rel='preconnect' href='https://imagedelivery.net' />
        ) : null}
        {/* Preload critical hero image for LCP optimization */}
        <link
          rel='preload'
          href={gitBackupFromCloudflareSrc(AGENT_PHOTO.src) ?? AGENT_PHOTO.src}
          as='image'
          fetchPriority='high'
        />

        <style>{`
          realscout-office-listings {
            --rs-listing-divider-color: rgb(101, 141, 172);
            width: 100%;
          }
        `}</style>

        {/* Google Analytics (GA4) - Defer to lazyOnload to improve LCP/FCP */}
        {/* Analytics doesn't need to block initial render */}
        {isValidGaId(gaMeasurementId) ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
                gaMeasurementId
              )}`}
              strategy='lazyOnload'
            />
            <Script id='google-analytics' strategy='lazyOnload'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}

        {/* Google Tag Manager - only load when configured (prevents gtm.js 404) */}
        {isValidGtmId(gtmId) ? (
          <Script id='google-tag-manager' strategy='afterInteractive'>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}

        {/* Facebook Pixel - only load when configured
            Note: Meta's script currently triggers a browser deprecation warning (unload listeners).
            The only way to remove that warning is to not load the script.
            Using lazyOnload to defer loading and reduce impact on initial page load. */}
        {isValidFacebookPixelId(facebookPixelId) ? (
          <Script id='facebook-pixel' strategy='lazyOnload'>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}

        {/* Structured Data: single canonical RealEstateAgent (Dr. Jan Duffy) */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateRealEstateAgentSchema()),
          }}
        />

        {/* Structured Data for Organization - Required for Google Knowledge Panel */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />

        {/* Structured Data for Website - Site Name for Google Search */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />

        {/* Structured Data for Service - 2025 Best Practice */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSiteServiceSchema()),
          }}
        />
      </head>
      <body className='antialiased'>
        {/* Google Tag Manager (noscript) */}
        {isValidGtmId(gtmId) ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(
                gtmId
              )}`}
              height='0'
              width='0'
              className='hidden'
            />
          </noscript>
        ) : null}

        {/* RealScout Web Components Script - Defer to lazyOnload since widget uses intersection observer */}
        {/* Widget only loads when in viewport, so script can load lazily too */}
        <Script
          id='realscout-script'
          src='https://em.realscout.com/widgets/realscout-web-components.umd.js'
          type='module'
          strategy='lazyOnload'
        />
        {children}
        <Script src='/ads-conversions.js' strategy='afterInteractive' />
      </body>
    </html>
  );
}
