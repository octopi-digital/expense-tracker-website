'use client';

import { useEffect, useRef } from 'react';

/**
 * Ambient glow behind the hero copy: drifts on its own in a slow loop by
 * default (the `.is-idle` class drives a CSS keyframe animation), and
 * hands control to the pointer the moment the mouse moves inside the
 * hero section — removing `.is-idle` stops the animation dead and lets
 * the inline `--glow-x`/`--glow-y` vars set below pin it to the cursor.
 * If the pointer sits still for a beat, or leaves the section, the idle
 * drift takes back over.
 *
 * Only wired up on devices with a real mouse (`hover: hover` and
 * `pointer: fine`) — touch has no meaningful "pointer position" to chase,
 * so those devices just get the idle drift, and reduced-motion disables
 * the drift too (see globals.css).
 */
const IDLE_RESUME_DELAY_MS = 1400;

export function HeroMouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const section = glow?.parentElement;
    if (!glow || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const goIdle = () => {
      glow.classList.add('is-idle');
    };

    const handleMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.classList.remove('is-idle');
      glow.style.setProperty('--glow-x', `${x}%`);
      glow.style.setProperty('--glow-y', `${y}%`);

      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(goIdle, IDLE_RESUME_DELAY_MS);
    };

    const handleLeave = () => {
      clearTimeout(resumeTimer);
      goIdle();
    };

    section.addEventListener('pointermove', handleMove);
    section.addEventListener('pointerleave', handleLeave);
    return () => {
      clearTimeout(resumeTimer);
      section.removeEventListener('pointermove', handleMove);
      section.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  // No `inset-0`: `.hero-mouse-glow` owns its own position and size, because
  // an element the size of the section would clip the circle against the
  // section's edges. See globals.css.
  return <div ref={glowRef} aria-hidden className="hero-mouse-glow is-idle pointer-events-none z-0" />;
}
