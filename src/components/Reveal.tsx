'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades and lifts its children into place the first time they enter the
 * viewport, then disconnects — reveals never replay on scroll-back, which
 * would read as a page that cannot hold still.
 *
 * Renders as a single element and forwards `className`, so it can *be* the
 * grid or flex container it wraps rather than inserting a div that would
 * break the parent's layout. The visual states live in globals.css under
 * `[data-reveal]`.
 *
 * This is the only scroll-driven effect on the site. It replaced a pinned
 * WebGL tour, sticky-stacked section overlaps, a pointer-following glow and
 * a per-character magnify — all of which are gone.
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
  as?: 'div' | 'section' | 'header' | 'li' | 'article' | 'ul' | 'ol';
}) {
  const ref = useRef<HTMLElement>(null);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` means the element is already above the viewport. That is
        // not an intersection, but it must still reveal: on a reload where
        // the browser restores a mid-page scroll position, everything above
        // that point mounts already passed, and waiting for an intersection
        // would leave it blank until the reader scrolled back up to it.
        if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
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

  // Widened to ElementType so the single ref types against every tag `as`
  // accepts. Naming a union of concrete elements instead makes the ref an
  // intersection of them — HTMLDivElement & HTMLLIElement, which nothing
  // satisfies — and the component stops compiling the moment a second tag is
  // allowed.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      data-reveal={shown ? 'in' : 'out'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Component>
  );
}
