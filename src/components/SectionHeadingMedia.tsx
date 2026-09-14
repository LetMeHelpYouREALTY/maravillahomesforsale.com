import SiteImage from '@/components/ui/site-image';
import { getSectionImage } from '@/data/page-images';

type SectionHeadingMediaProps = {
  heading: string;
  className?: string;
};

/**
 * Heading-matched photo for H2/H3 sections. Returns null when no image is mapped.
 */
export default function SectionHeadingMedia({
  heading,
  className = 'relative h-48 md:h-64 w-full overflow-hidden rounded-xl mb-8',
}: SectionHeadingMediaProps) {
  const image = getSectionImage(heading);

  if (!image) return null;

  return (
    <figure className={className}>
      <SiteImage
        src={image.src}
        alt={image.alt}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, 960px'
      />
      <figcaption className='sr-only'>{image.alt}</figcaption>
    </figure>
  );
}
