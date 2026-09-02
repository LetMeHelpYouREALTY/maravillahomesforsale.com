import Image, { type ImageProps } from 'next/image';
import { isCloudflareDeliveryUrl } from '@/lib/config/cloudflare-images';

/**
 * next/image wrapper that skips Vercel re-optimization for Cloudflare Images
 * URLs so the edge can serve WebP/AVIF from the named variant.
 */
export default function SiteImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? props.src : '';
  return (
    <Image
      {...props}
      unoptimized={props.unoptimized ?? isCloudflareDeliveryUrl(src)}
    />
  );
}
