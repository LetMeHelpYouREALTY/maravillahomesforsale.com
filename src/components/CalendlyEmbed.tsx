'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';

interface CalendlyEmbedProps {
  /**
   * Calendly event URL (e.g., 'https://calendly.com/drjanduffy/listing-consultation')
   */
  url: string;
  /**
   * Height of the embed (default: '900px' for better visibility)
   */
  height?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /** utm_content value for attribution (e.g. contact-page) */
  utmContent?: string;
  /** utm_source override (defaults to maravillahomesforsale.com) */
  utmSource?: string;
}

function withUtmParams(
  rawUrl: string,
  utmSource: string,
  utmContent: string
): string {
  try {
    const parsed = new URL(rawUrl);
    if (!parsed.searchParams.has('utm_source')) {
      parsed.searchParams.set('utm_source', utmSource);
    }
    if (!parsed.searchParams.has('utm_medium')) {
      parsed.searchParams.set('utm_medium', 'website');
    }
    if (!parsed.searchParams.has('utm_content') && utmContent) {
      parsed.searchParams.set('utm_content', utmContent);
    }
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * CalendlyEmbed component - Embeds a Calendly scheduling widget
 */
export default function CalendlyEmbed({
  url,
  height = '900px',
  className = '',
  utmContent = 'embed',
  utmSource = 'maravillahomesforsale.com',
}: CalendlyEmbedProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);

  const bookingUrl = useMemo(
    () => withUtmParams(url, utmSource, utmContent),
    [url, utmSource, utmContent]
  );

  useEffect(() => {
    if (!isScriptReady || !calendlyRef.current) return;

    let retryCount = 0;
    const maxRetries = 10;

    const initWidget = () => {
      const w = window as Window & {
        Calendly?: {
          initInlineWidget: (options: {
            url: string;
            parentElement: HTMLElement;
          }) => void;
        };
      };

      if (!calendlyRef.current) {
        console.error('Calendly container not found');
        return;
      }

      if (w.Calendly && typeof w.Calendly.initInlineWidget === 'function') {
        try {
          w.Calendly.initInlineWidget({
            url: bookingUrl,
            parentElement: calendlyRef.current,
          });
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      } else {
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(initWidget, 300);
        } else {
          console.error('Calendly widget failed to load after multiple retries');
        }
      }
    };

    const timer = setTimeout(initWidget, 200);
    return () => clearTimeout(timer);
  }, [isScriptReady, bookingUrl]);

  return (
    <>
      <Script
        src='https://assets.calendly.com/assets/external/widget.js'
        strategy='afterInteractive'
        onLoad={() => {
          setIsScriptReady(true);
        }}
        onError={(e) => {
          console.error('Failed to load Calendly script:', e);
        }}
      />

      <div
        ref={calendlyRef}
        className={`calendly-inline-widget ${className}`}
        style={{
          minWidth: '320px',
          height: height,
          width: '100%',
        }}
        data-auto-load='false'
      />
    </>
  );
}
