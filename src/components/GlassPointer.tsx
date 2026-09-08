'use client';

import { useEffect } from 'react';

const PANES = '.glass, .glass-dark, .glass-emerald';

/**
 * Gives every glass pane a pool of light that follows the pointer.
 *
 * It writes `--gx` / `--gy` on the pane under the cursor; the gradients in
 * globals.css read them, and because both are registered with `@property`
 * they can be transitioned — the 0.5s ease on the pane is what makes the
 * highlight lag behind the cursor and settle after it stops, which is the
 * part that reads as liquid rather than as a spotlight.
 *
 * One delegated listener for the whole document rather than a handler per
 * card, coalesced to one write per frame: only the pane being hovered
 * repaints, so this costs nothing when the pointer is anywhere else.
 */
export function GlassPointer() {
  useEffect(() => {
    // Coarse pointers have no hover, and the effect would only ever fire on
    // tap. Reduced-motion users get the pinned highlight from the stylesheet.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let current: HTMLElement | null = null;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const clear = (el: HTMLElement | null) => {
      el?.style.removeProperty('--gx');
      el?.style.removeProperty('--gy');
    };

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      el.style.setProperty('--gx', `${(((x - rect.left) / rect.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(((y - rect.top) / rect.height) * 100).toFixed(1)}%`);
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const pane = target?.closest?.(PANES) as HTMLElement | null;

      if (pane !== current) {
        // Let the old pane transition back to its resting highlight rather
        // than snapping, so leaving a card looks like the light draining off.
        clear(current);
        current = pane;
      }
      if (!pane) return;

      pending = { el: pane, x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
      clear(current);
    };
  }, []);

  return null;
}
