import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fallback = 'https://via.placeholder.com/1080x720/e2e8f0/64748b?text=Image+Not+Available'
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      onError={() => setImageSrc(fallback)}
      priority
    />
  );
}
