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
 * Length of the scroll "track" in step-units — how far `track` (see `tick`
 * below) travels from 0 to this value over the pinned section's full
 * height. Every step but the last still gets a full unit (matching
 * `VIEWPORTS_PER_STEP` of physical scroll each, so their entry/hold/exit
 * timing is completely unaffected); the last step gets only `HOLD_END` of
 * one, since it never uses the trailing `(1 - HOLD_END)` share a normal
 * step spends on its exit animation.
 *
 * Before this, the pinned section was `STEP_COUNT * VIEWPORTS_PER_STEP`
 * viewports tall — a full unit for the last step too — so once its `t`
 * clamped at `HOLD_END` (see below), the remaining `(1 - HOLD_END) *
 * VIEWPORTS_PER_STEP` (~0.29 viewports) of that allocation was scroll where
 * literally nothing on screen changes. Scrolled through with any velocity
 * (a trackpad flick, a fast wheel), that dead stretch let momentum build up
 * uninterrupted, and the instant the pin released into the section below,
 * all of it dumped in at once — reported as the page "flying" a good
 * fraction of the next section on release. Ending the track here instead
 * removes that dead scroll outright: the last step's `t` still walks up to
 * `HOLD_END` at exactly the same physical scroll pace as before, it just
 * runs out of pinned section to consume right as it gets there, rather than
 * continuing on into an idle tail.
 */
const TRACK_LENGTH = STEP_COUNT - 1 + HOLD_END;

/**
 * A pinned scrollytelling tour through the 5 onboarding steps.
 *
 * The section is `TRACK_LENGTH * VIEWPORTS_PER_STEP` viewports tall (see
 * `TRACK_LENGTH` above — a step short of `STEP_COUNT`, since the last step's
 * scroll budget is trimmed) with a `sticky` inner stage (same trick as the
 * commented-out `PhoneShowcase`, see that component for the fuller
 * explanation) — scroll is spent driving the tour instead of moving the
 * page, and releases back to normal scrolling once the last step has held
 * for its share of the section's height.
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

      const track = progress * TRACK_LENGTH;
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
        style={{ height: `${TRACK_LENGTH * VIEWPORTS_PER_STEP * 100}vh` }}
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

          {/* `px-10`: without it, `max-w-sm` (384px) is wider than a small
              phone's own viewport (e.g. 390px), so this had no room to
              shrink into and the 3D phone rendered flush against both
              screen edges.

              The rest of this wrapper's classes are mobile-only additions
              (`max-sm:`-scoped) that confine the phone to a band below the
              step copy and above the progress dots, so the two don't
              overlap. `sm:` and up still resolve to exactly the original
              `inset-0`/`items-center`/`h-[76vh]` layout the desktop version
              has always used.

              This band is vertically *centered* (`items-center`), not
              bottom-anchored. An earlier version ran the band from `top-
              [38%]` all the way to the screen bottom with `items-end`, which
              pins the phone to the band's bottom edge — on a real device
              taller than the one this was tuned against, the band itself
              grows, but a bottom-pinned phone doesn't grow with it, so every
              extra pixel of height piled up as dead space between the copy
              and the phone instead of shrinking. Centering the phone in a
              band bounded on both ends (`top-44` below the text, `bottom-16`
              above the dots) means any extra vertical room on a taller
              screen splits evenly above and below instead of collecting in
              one gap. */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 max-sm:inset-x-0 max-sm:inset-y-auto max-sm:top-44 max-sm:bottom-16 max-sm:items-center">
            <div className="relative h-[76vh] max-h-[700px] w-full max-w-sm max-sm:h-full max-sm:max-h-[420px]">
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
              /*
               * Mobile default here is a stacked layout: the copy sits in a
               * centered band near the top of the pinned stage (`top-10`,
               * full width, `text-center`) instead of overlapping the
               * phone. It used to be `top-1/2 max-w-sm left-0/right-0` at
               * every width — on a phone-sized viewport that box is nearly
               * the full screen width and lands directly on top of the
               * device instead of beside it, which is the "text renders
               * above the phone" overlap.
               *
               * Every `sm:` class below reproduces the original unprefixed
               * ruleset verbatim, so desktop's layout is untouched: same
               * `top-1/2`/`-translate-y-1/2` vertical centering, same
               * `max-w-sm`, same `px-12`, same per-side `left-0`/`right-0`
               * and `text-left`/`text-right`.
               */
              className={`pointer-events-none absolute inset-x-0 top-10 mx-auto max-w-xs px-6 text-center will-change-[opacity,transform] sm:inset-x-auto sm:top-1/2 sm:mx-0 sm:max-w-sm sm:-translate-y-1/2 sm:px-12 sm:text-left ${
                step.side === 'left' ? 'sm:left-0' : 'sm:right-0 sm:text-right'
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
