'use client';

import { useEffect, useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import {
  gitBackupFromCloudflareSrc,
  isCloudflareDeliveryUrl,
} from '@/lib/config/cloudflare-images';

/**
 * next/image wrapper that skips Vercel re-optimization for Cloudflare Images
 * URLs so the edge can serve WebP/AVIF from the named variant.
 * If a hosted URL is missing (403/404 before upload), swap to the Git backup.
 */
export default function SiteImage(props: ImageProps) {
  const originalSrc = typeof props.src === 'string' ? props.src : '';
  const [src, setSrc] = useState(originalSrc);

  useEffect(() => {
    if (originalSrc) setSrc(originalSrc);
  }, [originalSrc]);

  const activeSrc = src || originalSrc;
  const gitBackup = gitBackupFromCloudflareSrc(originalSrc);

  return (
    <Image
      {...props}
      alt={props.alt ?? ''}
      src={activeSrc || props.src}
      unoptimized={props.unoptimized ?? isCloudflareDeliveryUrl(activeSrc)}
      onError={(event) => {
        if (gitBackup && activeSrc !== gitBackup) {
          setSrc(gitBackup);
        }
        props.onError?.(event);
      }}
    />
  );
}
