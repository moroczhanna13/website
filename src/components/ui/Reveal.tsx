import { createElement, useEffect, useRef, useState, type CSSProperties, type HTMLAttributes } from 'react';

type RevealTag = 'div' | 'li' | 'article' | 'header' | 'p' | 'figure';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  /** Extra delay in ms, for staggering items in a list. */
  delay?: number;
}

/**
 * Fades and slides its content in once it scrolls into view.
 * The CSS lives in global.css ([data-reveal]); with prefers-reduced-motion
 * the content is shown right away.
 */
export function Reveal({ as = 'div', delay = 0, className, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ...rest,
      ref,
      'data-reveal': '',
      className: [className, visible ? 'is-visible' : ''].filter(Boolean).join(' ') || undefined,
      style: { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
