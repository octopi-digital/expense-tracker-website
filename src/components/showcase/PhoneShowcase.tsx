'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { SCREENS } from '@/lib/screens';
import { useTheme } from '@/lib/theme';
import {
  STOP_COUNT,
  ScrollProgressContext,
  VIEWPORTS_PER_STOP,
  clamp,
  segmentAt,
  toPosition,
} from './scroll-progress';


/**
 * The tour's own pace, in stops per second.
 *
 * This is a hard ceiling on how fast the phone will advance, *however* fast the
 * page is scrolled. Flick the whole section past in one gesture and the phone
 * still stands up, turns its full circle and settles at this rate — the
 * scrollbar arrives early and the performance finishes on its own time.
 *
 * The point is that a signature move is choreography, not a readout. Pinning it
 * rigidly to scroll velocity means the faster someone moves, the less of it
 * they see, so the animation is least visible exactly when it is most likely to
 * be someone's first impression.
 */
const STOPS_PER_SECOND = 0.7;

/** Ceiling on progress-units per second (progress spans all stops as 0..1). */
const MAX_RATE = STOPS_PER_SECOND / (STOP_COUNT - 1);

/**
 * How sharply progress closes a small gap, per second.
 *
 * High enough that ordinary scrolling still feels directly connected — at
 * reading pace the gap stays small and this term dominates, so the phone tracks
 * the scrollbar. `MAX_RATE` only takes over once the gap is large, which is
 * precisely when someone has flicked.
 */
const APPROACH = 7;

// Client-side only: three.js touches browser globals at import time. Declaring
// this from inside a Client Component is what makes `ssr: false` take effect in
// Next 16.
const StageCanvas = dynamic(() => import('./StageCanvas').then((m) => m.StageCanvas), {
  ssr: false,
});

/**
 * Hero and product tour as one pinned stage.
 *
 * They are deliberately a single section rather than two: the phone has to
 * travel continuously from its floating 3/4 hero pose into the upright tour
 * poses, and that is only possible if one WebGL scene spans both. The copy
 * swaps between a centred hero block and a left-hand beat rail as the phone
 * straightens.
 *
 * The section is `STOP_COUNT` viewports tall, giving each stop one screen of
 * scroll, and the stage inside is `sticky` so that scroll is spent turning the
 * phone instead of moving the page.
 */
export function PhoneShowcase() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const sectionRef = useRef<HTMLElement>(null);
  /** What the scrollbar says. */
  const targetRef = useRef(0);
  /** What the phone is actually showing — trails `targetRef`, capped in rate. */
  const progressRef = useRef(0);

  // Only the copy is React state, and it changes once per stop — never per
  // frame. Everything continuous lives in progressRef and is read in useFrame.
  const [activeBeat, setActiveBeat] = useState(0);
  const [showHero, setShowHero] = useState(true);
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
    let last = 0;

    const measure = () => {
      const distance = section.offsetHeight - window.innerHeight;
      const travelled = -section.getBoundingClientRect().top;
      targetRef.current = distance <= 0 ? 0 : clamp(travelled / distance, 0, 1);
    };

    // The copy follows the *damped* progress, not the scrollbar. If it followed
    // the raw scroll it would change beat while the phone was still several
    // hundred degrees into the previous move, and the reader would be given a
    // heading for a screen that is not on the glass yet.
    let lastHero: boolean | null = null;
    let lastBeat = -1;

    const publish = (progress: number) => {
      const position = toPosition(progress);
      // Hand the hero over to the tour partway through the first stop, while
      // the phone is mid-turn — the two copy blocks then cross without either
      // sitting on screen next to a pose it does not belong to.
      const hero = position < 0.55;
      if (hero !== lastHero) {
        lastHero = hero;
        setShowHero(hero);
      }

      const { from, blend } = segmentAt(Math.max(position - 1, 0), SCREENS.length);
      const beat = blend > 0.5 ? Math.min(from + 1, SCREENS.length - 1) : from;
      if (beat !== lastBeat) {
        lastBeat = beat;
        setActiveBeat(beat);
      }
    };

    // Progress trails the scrollbar instead of being pinned to it, so a fast
    // flick cannot fast-forward an effect.
    //
    // It is *progress* that is damped, never the pose. Damping the pose lets a
    // rotation take the short way round — a 360° roll simply never happens,
    // because the phone eases toward a target that has already come back to
    // where it started. Progress is one-dimensional and monotonic, so easing it
    // makes the phone walk every step of the authored path regardless of how
    // violently someone scrolls. It just arrives late, and keeps performing
    // after the scrolling stops.
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Deliberately does not re-`measure()`: that reads `getBoundingClientRect`
      // and would force layout every frame. The scroll and resize listeners are
      // the only things that can change where the section sits, and they keep
      // `targetRef` current on their own.
      const target = targetRef.current;
      const diff = target - progressRef.current;

      if (reducedMotion || Math.abs(diff) < 0.0002) {
        progressRef.current = target;
      } else {
        // Exponential approach for the soft landing, then a hard ceiling on
        // rate — the clamp is what actually enforces "our speed, not yours",
        // since an exponential alone still takes a huge first step when the
        // gap is huge.
        const eased = diff * (1 - Math.exp(-APPROACH * dt));
        const limit = MAX_RATE * dt;
        progressRef.current += clamp(eased, -limit, limit);
      }

      publish(progressRef.current);
    };

    measure();
    progressRef.current = targetRef.current;
    publish(progressRef.current);
    frame = requestAnimationFrame(tick);

    const schedule = () => measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // Pausing the render loop when the section is off-screen matters: a WebGL
    // canvas left on `frameloop="always"` keeps the GPU busy for the entire
    // page, not just this section.
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '200px',
    });
    observer.observe(section);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [reducedMotion]);

  // The phone alternates sides down the tour, and the copy takes whichever side
  // is left over. On a `center` beat the phone owns the middle, so the copy
  // stays left and the beat's `flank` items fill the right.
  const activeScreen = SCREENS[activeBeat];
  const copyOnRight = activeScreen.side === 'left';

  return (
    <ScrollProgressContext.Provider value={progressRef}>
      <section
        ref={sectionRef}
        aria-label="Product tour"
        style={{ height: `${STOP_COUNT * VIEWPORTS_PER_STOP * 100}vh` }}
        className="relative bg-[var(--surface)]"
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
          {isLight ? (
            <>
              {/* Ledger backdrop: paper surface with faint rule lines, and a
                  contained gradient plinth (not a full-bleed pool) so the
                  phone reads as staged on a surface rather than floating in
                  a void. */}
              <div aria-hidden className="ledger-bg absolute inset-0 bg-[var(--surface)]" />
              {/* Grounding glow: sized to cover the phone's whole travel range
                  across the tour (not just the hero position), so the chassis
                  never drifts onto flat paper and loses its edge. Breathes
                  slowly so the light theme isn't static next to the dark
                  theme's floating bob. */}
              <div
                aria-hidden
                className="light-glow-pulse absolute inset-0"
                style={{
                  background:
                    'radial-gradient(95% 80% at 64% 48%, var(--surface-gradient-1) 0%, var(--surface-gradient-2) 42%, transparent 82%)',
                }}
              />
            </>
          ) : (
            // Backdrop for the transparent canvas: a warm green pool behind
            // where the phone sits, falling off to near-black at the edges.
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 90% at 68% 45%, var(--surface-gradient-1) 0%, var(--surface-gradient-2) 38%, var(--surface-gradient-3) 72%)',
              }}
            />
          )}

          <div className="absolute inset-0">
            <StageCanvas active={inView} reducedMotion={reducedMotion} theme={theme} />
          </div>

          {/* Beat rail. Pointer-events off so the canvas keeps the cursor.
              `justify-*` swaps with the phone so the two never overlap. */}
          <div
            aria-hidden={showHero}
            className={`pointer-events-none absolute inset-0 mx-auto flex h-full max-w-7xl items-center px-6 transition-all duration-700 ease-out lg:px-12 ${
              copyOnRight ? 'justify-end' : 'justify-start'
            } ${showHero ? 'translate-y-8 opacity-0 blur-sm' : 'opacity-100 blur-0'}`}
          >
            <div
              className={`relative w-full transition-[max-width] duration-500 ${
                activeScreen.side === 'center' ? 'max-w-sm' : 'max-w-md lg:max-w-lg'
              } ${
                isLight
                  ? 'rounded-3xl border border-[var(--border)] bg-[var(--surface-card)]/90 p-8 shadow-[0_20px_60px_-20px_rgba(20,32,26,0.18)] backdrop-blur'
                  : ''
              }`}
            >
              {isLight && (
                <span className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  {String(activeBeat + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')}
                </span>
              )}

              {SCREENS.map((screen, index) => (
                <div
                  key={screen.id}
                  aria-hidden={index !== activeBeat}
                  className={`transition-all duration-500 ease-out ${
                    index === activeBeat
                      ? 'relative translate-y-0 opacity-100 blur-0'
                      : 'pointer-events-none absolute inset-0 translate-y-4 opacity-0 blur-sm'
                  }`}
                >
                  {isLight ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
                      {screen.eyebrow}
                    </span>
                  ) : (
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                      {screen.eyebrow}
                    </p>
                  )}
                  <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl">
                    {screen.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">{screen.body}</p>
                </div>
              ))}

              <ol className="mt-10 flex gap-2" aria-hidden>
                {SCREENS.map((screen, index) => (
                  <li
                    key={screen.id}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === activeBeat ? 'w-10 bg-[var(--accent)]' : 'w-4 bg-[var(--text-dim)]'
                    }`}
                  />
                ))}
              </ol>
            </div>
          </div>

          {/* Flank column: the centre-stage beat puts the phone in the middle,
              which leaves the right-hand side empty unless the beat brings its
              own supporting detail. Only rendered on wide viewports — below
              that there is no room either side of the phone and the layout
              collapses to a single column. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 mx-auto hidden h-full max-w-7xl items-center justify-end px-6 transition-all duration-700 ease-out lg:flex lg:px-12 ${
              activeScreen.flank && !showHero
                ? 'translate-x-0 opacity-100 blur-0'
                : 'translate-x-6 opacity-0 blur-sm'
            }`}
          >
            <dl className="w-full max-w-[15rem] space-y-5">
              {activeScreen.flank?.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-[var(--text-primary)]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </ScrollProgressContext.Provider>
  );
}
