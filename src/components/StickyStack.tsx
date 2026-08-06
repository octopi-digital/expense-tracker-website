'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Pins its child once the child's *bottom* edge reaches the bottom of the
 * viewport, so the next section can slide up over it — the "card stack"
 * scroll effect.
 *
 * Plain `sticky top-0` can't do this for content taller than the viewport:
 * it pins the moment the top edge hits 0, leaving everything below the fold
 * unreachable. And `sticky bottom-0` is worse — it drags the element *up*
 * into view early, covering whatever precedes it.
 *
 * The trick is a negative top offset of (viewportHeight - elementHeight):
 * the element scrolls normally until its bottom lands on the viewport
 * bottom, then holds. Needs the measured height, hence the JS. Clamped at 0
 * so a child shorter than the viewport just pins to the top as usual.
 */
export function StickyStack({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));

    measure();

    // Height changes with the Pricing monthly/yearly toggle and on resize,
    // so track the element itself rather than just the window.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      ref={ref}
      // Stays static until measured — an unmeasured sticky element would pin
      // at the wrong offset on the first frame.
      className={top === null ? className : `sticky ${className}`}
      style={top === null ? undefined : { top }}
    >
      {children}
    </div>
  );
}
