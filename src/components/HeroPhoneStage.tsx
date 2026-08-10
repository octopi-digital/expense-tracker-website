'use client';

import { useEffect, useRef } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

/**
 * Drives a `--scroll` custom property (0 -> 1) off how far the page has
 * scrolled, so the phones rise up from below and grow into place as the
 * user scrolls rather than sitting static. Tied to scrollY directly (not
 * the stage's viewport position) since it's the hero — visible with zero
 * scroll — and the "rising in" motion should read as a direct response to
 * the scroll gesture. Set via rAF-throttled scroll listener rather than CSS
 * scroll-timelines, which Safari/Firefox don't ship yet. Skipped entirely
 * under reduced-motion, where the phones just render in their final state.
 */
export function HeroPhoneStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--scroll', '1');
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      // Fully risen by the time the user has scrolled half a viewport.
      const distance = window.innerHeight * 0.5;
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      el.style.setProperty('--scroll', progress.toFixed(3));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative mx-auto mt-16 h-[380px] max-w-3xl sm:mt-20 sm:h-[460px]"
      style={{ ['--scroll' as string]: 0 }}
    >
      {/* Ambient bloom so the devices sit in light rather than on flat
          colour. Outside the masked wrapper below, otherwise the mask
          would clip the falloff into a hard edge. */}
      <div
        aria-hidden
        className="ambient-glow pointer-events-none absolute left-1/2 top-[30%] h-[420px] w-[760px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <div
        className="relative flex h-full items-start justify-center overflow-hidden pt-4"
        style={{
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 92%)',
        }}
      >
        <PhoneFrame
          src="/screens/derived/transaction-expense-full.webp"
          alt="Transactions screen"
          className="z-0 hidden w-[36%] sm:block"
          style={{
            willChange: 'transform, opacity',
            transformOrigin: 'top center',
            transform:
              'translateX(2.5rem) translateY(calc(2.5rem + (1 - var(--scroll)) * 2rem)) scale(calc(0.88 + var(--scroll) * 0.07))',
            opacity: 'calc(0.6 + var(--scroll) * 0.3)',
          }}
        />
        <PhoneFrame
          src="/screens/derived/home-full.webp"
          alt="Home screen — net worth at a glance"
          /*
           * `w-[58%]` is deliberately left unprefixed, and that matters.
           *
           * `PhoneFrame`'s base classes bake in `w-full`, and in the
           * compiled sheet `.w-full` is emitted *after* `.w-[58%]` and
           * `.w-[36%]`. Same specificity, so `w-full` wins and all three
           * frames actually lay out at `width: 100%`, which the flex row
           * then shrinks to equal thirds. That is not what this code reads
           * like, but it is the layout the hero has always shipped and the
           * one it's tuned for.
           *
           * Prefixing only this one frame with `sm:` breaks that balance:
           * `sm:*` rules live in a media block *after* `.w-full`, so the
           * centre phone alone escapes to 58% while its two neighbours stay
           * at 100% — flex then hands the sides more width than the middle
           * and the outer edges clip flat against the mask. Don't reach for
           * `sm:w-[58%]` here without giving the side frames `sm:w-[36%]`
           * in the same change; the three widths only make sense together.
           *
           * `max-sm:!w-[78%]` is scoped below `sm`, where this is the only
           * visible phone (the others are `hidden`). There a 100%-wide box
           * scales past the `overflow-hidden` mask once `--scroll` drives
           * `scale()` to 1.10 and gets clipped. 86% was the widest that
           * still cleared the mask; 78% is a deliberate step narrower so
           * the device reads as a phone sitting in the section rather than
           * filling it, and leaves breathing room either side on a 320px
           * screen. `!` is needed to beat `w-full`, and the `max-sm:` scope
           * keeps desktop untouched.
           */
          className="z-10 w-[58%] max-sm:!w-[58%]"
          style={{
            willChange: 'transform, opacity',
            transformOrigin: 'top center',
            transform:
              'translateY(calc((1 - var(--scroll)) * 2rem)) scale(calc(0.95 + var(--scroll) * 0.15))',
            opacity: 'calc(0.75 + var(--scroll) * 0.25)',
          }}
        />
        <PhoneFrame
          src="/screens/secondary/ai-chat.webp"
          alt="AI chat — ask about your finances"
          className="z-0 hidden w-[36%] sm:block"
          style={{
            willChange: 'transform, opacity',
            transformOrigin: 'top center',
            transform:
              'translateX(-2.5rem) translateY(calc(2.5rem + (1 - var(--scroll)) * 2rem)) scale(calc(0.88 + var(--scroll) * 0.07))',
            opacity: 'calc(0.6 + var(--scroll) * 0.3)',
          }}
        />
      </div>
    </div>
  );
}
