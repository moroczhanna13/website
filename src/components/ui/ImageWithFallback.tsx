import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './ImageWithFallback.module.css';

interface Props {
  src: string;
  alt: string;
  /** Shown until the image loads, and permanently if the file is missing. */
  fallback: ReactNode;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({ src, alt, fallback, className, loading = 'lazy' }: Props) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached image can finish loading before the handlers run.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
  }, [src]);

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      {status !== 'loaded' && <div className={styles.fallback}>{fallback}</div>}
      {status !== 'error' && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={styles.img}
          data-loaded={status === 'loaded'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
}
