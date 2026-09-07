'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/** If nothing has revealed an element by this point, show it regardless. */
const FAILSAFE_MS = 1200;

/**
 * Fades and lifts children into view once, the first time they cross the
 * viewport.
 *
 * Content must never be left invisible, so hiding is opt-in and reversible at
 * three points: the hidden class is only applied after mount (no JS, no
 * hiding), elements already on screen are released on the next frame rather
 * than waiting for an observer callback, and a timer releases anything the
 * observer has not reported on by FAILSAFE_MS.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return;
    }

    setArmed(true);

    const failsafe = window.setTimeout(() => setShown(true), FAILSAFE_MS + delay);

    // Already on screen at mount (the hero, or any deep link that lands
    // mid-page): play the entrance immediately instead of waiting to be
    // scrolled into view, which would never happen.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(failsafe);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <Tag
      // @ts-expect-error -- one ref covers every element this renders as.
      ref={ref}
      className={`${armed ? 'reveal' : ''} ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
