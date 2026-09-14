import SiteImage from '@/components/ui/site-image';
import { getSectionImage } from '@/data/page-images';

type SectionHeadingMediaSize = 'section' | 'card';

type SectionHeadingMediaProps = {
  heading: string;
  size?: SectionHeadingMediaSize;
  className?: string;
};

function sizeClassName(size: SectionHeadingMediaSize): string {
  switch (size) {
    case 'section':
      return 'relative h-48 md:h-64 w-full overflow-hidden rounded-xl mb-8';
    case 'card':
      return 'relative h-32 w-full overflow-hidden rounded-lg mb-4';
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

/**
 * Heading-matched photo for H2/H3 sections. Returns null for numeric/stat headings.
 */
export default function SectionHeadingMedia({
  heading,
  size = 'section',
  className,
}: SectionHeadingMediaProps) {
  const image = getSectionImage(heading);

  if (!image) return null;

  return (
    <figure className={className ?? sizeClassName(size)}>
      <SiteImage
        src={image.src}
        alt={image.alt}
        fill
        className='object-cover'
        sizes={
          size === 'card'
            ? '(max-width: 768px) 100vw, 33vw'
            : '(max-width: 768px) 100vw, 960px'
        }
      />
      <figcaption className='sr-only'>{image.alt}</figcaption>
    </figure>
  );
}
