'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades and lifts its children into place the first time they enter the
 * viewport, then disconnects — reveals never replay on scroll-back, which
 * would read as a page that can't hold still.
 *
 * Renders as a single element and forwards `className`, so it can *be* the
 * grid/flex container it wraps rather than inserting a div that would break
 * the parent's layout. The visual states live in globals.css under
 * `[data-reveal]`.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms, for siblings that should arrive in sequence. */
  delay?: number;
  as?: 'div' | 'section' | 'header';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Without IntersectionObserver nothing would ever flip the state and the
    // content would sit at opacity 0 forever, so show it immediately. Set on
    // the node rather than through state — this runs synchronously in the
    // effect body, where a setState would cascade a second render.
    //
    // Reduced motion needs no branch here: the media query in globals.css
    // already neutralises both reveal states.
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.reveal = 'in';
      return;
    }

    // Already on screen at mount (above the fold): reveal on the next frame so
    // the transition still runs from the SSR'd "out" state.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // Hold the reveal until the element is a little way past the bottom
      // edge, so it animates in view rather than the instant it clips in.
      { rootMargin: '0px 0px -12% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      data-reveal={shown ? 'in' : 'out'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
