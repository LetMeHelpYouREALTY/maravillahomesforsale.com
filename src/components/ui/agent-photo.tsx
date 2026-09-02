import Image from 'next/image';
import { AGENT_PHOTO } from '@/lib/config/agent';

type AgentPhotoVariant = 'card' | 'portrait';

interface AgentPhotoProps {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  variant?: AgentPhotoVariant;
}

export default function AgentPhoto({
  src = AGENT_PHOTO.src,
  alt = AGENT_PHOTO.alt,
  className = '',
  priority = false,
  sizes,
  variant = 'portrait',
}: AgentPhotoProps) {
  if (variant === 'portrait') {
    return (
      <div className={`relative mx-auto ${className}`.trim()}>
        <Image
          src={src}
          alt={alt}
          width={AGENT_PHOTO.width}
          height={AGENT_PHOTO.height}
          className='h-auto w-full max-w-md rounded-full bg-white object-contain shadow-xl'
          sizes={sizes || '(max-width: 768px) 80vw, 400px'}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#0A2540] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className='object-contain'
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        priority={priority}
      />
    </div>
  );
}
