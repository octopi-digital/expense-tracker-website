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
           * `max-sm:!w-[76%]`: on mobile, this is the only visible phone
           * (the other two are `hidden` below `sm`), and `PhoneFrame`'s own
           * base classes bake in `w-full`, which wins the cascade over the
           * plain `w-[58%]` below regardless of source order — this frame's
           * rendered width is empirically 100% of its container, not 58%.
           * At rest that just reads as a slightly bigger phone, but as
           * `--scroll` grows the frame's `scale()` up to 1.10, a
           * 100%-wide box scales past its `overflow-hidden` mask and its
           * left/right edges get clipped flat.
           *
           * `!` forces `!important` so it reliably beats `w-full` despite
           * the cascade ambiguity, and `max-sm:` confines the whole rule to
           * below the `sm` breakpoint — desktop keeps today's `w-[58%]`
           * vs `w-full` cascade outcome exactly as it already renders,
           * whatever that resolves to. Not "fixing" that fight generally,
           * since doing so would also change how the three phones share
           * width on desktop.
           */
          className="z-10 max-sm:!w-[76%] sm:w-[58%]"
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
