'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/Reveal';
import { useTheme } from '@/lib/theme';
import { PhoneProgressContext, clamp } from './onboarding-tour/progress-context';
import { ONBOARDING_STEPS } from './onboarding-tour/onboarding-steps';

// Client-side only: three.js touches browser globals at import time.
const StaticPhone = dynamic(
  () => import('./onboarding-tour/StaticPhone').then((m) => m.StaticPhone),
  { ssr: false }
);

const STEP_COUNT = ONBOARDING_STEPS.length;
/** How many viewports of scroll each step gets while the section is pinned. */
const VIEWPORTS_PER_STEP = 1.3;
/**
 * Fraction of a step's local progress spent rising in / held / rising out.
 * Entry is a full third of the step's scroll budget — slow enough that the
 * rise reads as continuous motion tied to the scroll gesture rather than a
 * near-instant cut that just looks like the next step "rendering" in.
 */
const ENTRY_END = 0.34;
const HOLD_END = 0.78;
/** How far below/above rest each step's copy starts/ends, in pixels. */
const RISE_DISTANCE = 110;

/**
 * A pinned scrollytelling tour through the 5 onboarding steps.
 *
 * The section is `STEP_COUNT * VIEWPORTS_PER_STEP` viewports tall with a
 * `sticky` inner stage (same trick as the commented-out `PhoneShowcase`, see
 * that component for the fuller explanation) — scroll is spent driving the
 * tour instead of moving the page, and releases back to normal scrolling
 * once the last step has held for its share of the section's height.
 *
 * Each step's copy rises up from the bottom, holds, then keeps rising and
 * fades out as the next step's copy rises in from the opposite side — except
 * the last step, which just holds through the end rather than vanishing
 * right before the section releases.
 */
export function HowItWorks() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phoneProgressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let lastActiveStep = -1;

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const distance = section.offsetHeight - window.innerHeight;
      const travelled = -section.getBoundingClientRect().top;
      const progress = distance <= 0 ? 0 : clamp(travelled / distance, 0, 1);

      const track = progress * STEP_COUNT;
      const rawIndex = Math.min(Math.floor(track), STEP_COUNT - 1);
      const localT = clamp(track - rawIndex, 0, 1);
      const isLast = rawIndex === STEP_COUNT - 1;
      // The last step never enters its exit phase — it holds instead of
      // vanishing right before the section releases.
      const t = isLast ? Math.min(localT, HOLD_END) : localT;

      if (rawIndex !== lastActiveStep) {
        lastActiveStep = rawIndex;
        setActiveStep(rawIndex);
      }

      // Screen crossfade: blend from the previous step into this one only
      // across the entry window, then hold — see StaticScreenSurface.
      if (rawIndex === 0) {
        phoneProgressRef.current = 0;
      } else {
        const localMix = clamp(t / ENTRY_END, 0, 1);
        phoneProgressRef.current = rawIndex - 1 + localMix;
      }

      for (let i = 0; i < STEP_COUNT; i++) {
        const el = textRefs.current[i];
        if (!el) continue;

        let y: number;
        let opacity: number;

        if (reducedMotion) {
          y = 0;
          opacity = i === rawIndex ? 1 : 0;
        } else if (i < rawIndex) {
          y = -RISE_DISTANCE;
          opacity = 0;
        } else if (i > rawIndex) {
          y = RISE_DISTANCE;
          opacity = 0;
        } else if (t <= ENTRY_END) {
          const it = t / ENTRY_END;
          y = RISE_DISTANCE * (1 - it);
          opacity = it;
        } else if (t <= HOLD_END) {
          y = 0;
          opacity = 1;
        } else {
          const et = (t - HOLD_END) / (1 - HOLD_END);
          y = -RISE_DISTANCE * et;
          opacity = 1 - et;
        }

        el.style.opacity = opacity.toString();
        el.style.transform = reducedMotion ? 'none' : `translateY(${y}px)`;
      }
    };

    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '200px',
    });
    observer.observe(section);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div id="how-it-works" className="w-full pt-24">
      <Reveal className="mx-auto max-w-6xl px-6 pb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
          How it works
        </p>
        <Reveal variant="zoom">
          <h2 className="max-w-lg text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Get started in a couple of minutes
          </h2>
        </Reveal>
      </Reveal>

      <section
        ref={sectionRef}
        aria-label="Onboarding walkthrough"
        style={{ height: `${STEP_COUNT * VIEWPORTS_PER_STEP * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--surface)]">
          {/* Same bloom technique as the hero and the health spotlight, so
              this pinned stage's phone is lit like every other device moment
              on the page rather than sitting on flat colour. */}
          <div
            aria-hidden
            className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-60"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-[76vh] max-h-[700px] w-full max-w-sm">
              <PhoneProgressContext.Provider value={phoneProgressRef}>
                <StaticPhone
                  screens={ONBOARDING_STEPS}
                  active={inView}
                  reducedMotion={reducedMotion}
                  theme={theme}
                />
              </PhoneProgressContext.Provider>
            </div>
          </div>

          {ONBOARDING_STEPS.map((step, index) => (
            <div
              key={step.src}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              aria-hidden={index !== activeStep}
              className={`pointer-events-none absolute top-1/2 max-w-sm -translate-y-1/2 px-6 will-change-[opacity,transform] sm:px-12 ${
                step.side === 'left' ? 'left-0 text-left' : 'right-0 text-right'
              }`}
              style={{ opacity: 0, transition: reducedMotion ? 'opacity 0.3s ease-out' : undefined }}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
                Step {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] sm:text-base">{step.body}</p>
            </div>
          ))}

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
            {ONBOARDING_STEPS.map((step, index) => (
              <span
                key={step.src}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeStep ? 'w-8 bg-[var(--accent)]' : 'w-4 bg-[var(--border)]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
