'use client';

import { createContext, useContext, type RefObject } from 'react';

import { SCREENS, SCREEN_RUNS } from '@/lib/screens';

/**
 * Scroll progress through the showcase section, 0 at the moment the section
 * pins and 1 when it releases.
 *
 * Deliberately a ref rather than state: the 3D scene reads it every frame from
 * inside `useFrame`, and routing that through React state would re-render the
 * whole subtree ~60x/sec. The only thing that *does* re-render is the copy,
 * and only when the active beat changes.
 */
export const ScrollProgressContext = createContext<RefObject<number> | null>(null);

export function useScrollProgressRef(): RefObject<number> {
  const ref = useContext(ScrollProgressContext);
  if (!ref) {
    throw new Error('useScrollProgressRef must be used inside <ScrollProgressContext.Provider>');
  }
  return ref;
}

/**
 * Number of stops on the pose track: the hero, then one per beat.
 *
 * Position 0 is the hero pose, position 1 is the first beat, and so on. The
 * section is sized to give each stop one viewport of scroll.
 */
export const STOP_COUNT = SCREENS.length + 1;

/** Maps 0..1 scroll progress onto the pose track's 0..STOP_COUNT-1 positions. */
export function toPosition(progress: number) {
  return clamp(progress, 0, 1) * (STOP_COUNT - 1);
}

/**
 * Splits a track position into the stop being left, the stop being entered,
 * and how far between them we are.
 *
 * The raw fraction is eased with a smoothstep that has flat shoulders, which
 * buys each stop a stretch of scroll where the phone holds still and the copy
 * is readable, instead of the whole section being one continuous slide.
 */
export function segmentAt(position: number, stopCount: number) {
  const clamped = clamp(position, 0, stopCount - 1);
  const from = Math.min(Math.floor(clamped), stopCount - 1);
  const to = Math.min(from + 1, stopCount - 1);
  return { from, to, blend: smoothstep(0.3, 0.85, clamped - from) };
}

/**
 * How each segment of scroll is divided between the two things that can move.
 *
 * A segment runs from one stop to the next, and it is spent in that order:
 *
 * ```
 *  0 ────────────── READ_UNTIL ───────────────── 1
 *  │  phone parked, content pans │  phone moves  │
 * ```
 *
 * The two never overlap, and that is the point. When they did, the phone
 * started its move while the screenshot was still scrolling — so a screen was
 * yanked away before it had finished showing itself, and the transition read
 * as an interruption rather than a hand-over.
 */
const READ_UNTIL = 0.5;

/**
 * How many viewports of scroll each stop is worth.
 *
 * More than one, because a signature move needs a runway. A full 360° roll
 * crammed into half a viewport does not read as a spin at all — scroll at any
 * pace and the phone appears to simply jump to its next position, which is
 * precisely the complaint that produced this constant. Giving the move its own
 * ~0.8 of a viewport is what lets it be *seen*.
 */
export const VIEWPORTS_PER_STOP = 1.6;

/**
 * Like `segmentAt`, but hands back an *un-eased* 0..1 across the moving half
 * of the segment.
 *
 * Transitions author their own easing — the whole point of a signature move is
 * the shape of its curve — so easing here as well would smear every effect
 * through the same filter and flatten what distinguishes them.
 */
export function rawSegmentAt(position: number, stopCount: number, read = READ_UNTIL) {
  const clamped = clamp(position, 0, stopCount - 1);
  const from = Math.min(Math.floor(clamped), stopCount - 1);
  const to = Math.min(from + 1, stopCount - 1);
  const t = clamp((clamped - from - read) / (1 - read), 0, 1);
  return { from, to, t };
}

/**
 * Segment lookup in *stop* space, where stop 0 is the hero.
 *
 * The hero segment gets no reading phase, and so hands its whole 1.6 viewports
 * to the move. Nothing is being read there: the hero's screenshot never pans
 * (its beat position is pinned at 0) and the hero copy is static, so a reading
 * half would be dead scroll. Spending it on the move instead is what lets the
 * barrel roll stand the phone up *and* turn it a full circle without either
 * half feeling hurried — which matters, because that segment has by far the
 * most rotation to get through.
 */
export function stopSegmentAt(position: number) {
  const isHeroSegment = position < 1;
  return rawSegmentAt(position, STOP_COUNT, isHeroSegment ? 0 : READ_UNTIL);
}

/** Exposed so `panForBeat` and `rawSegmentAt` cannot drift out of step. */
export function readFraction() {
  return READ_UNTIL;
}

/** Track position expressed in beat space, where 0 is the first beat. */
export function toBeatPosition(position: number) {
  return clamp(position - 1, 0, SCREENS.length - 1);
}

/**
 * How far beat `index`'s image has scrolled: 0 shows its top, 1 its bottom.
 *
 * Pan is measured across the beat's whole *run* — the stretch of adjacent
 * beats sharing one source image — so a single capture scrolls smoothly from
 * top to bottom across several beats rather than restarting at each one.
 *
 * A run of one starts at the *top* of its image on arrival and pans down as
 * the reader carries on. That matters for more than tidiness: each beat's
 * headline describes what is at the top of its screen — "Net worth, live"
 * against the home capture, for instance — and an earlier version that centred
 * the window on arrival left the phone resting on the middle of the capture,
 * with the very figure the copy named scrolled out of frame.
 *
 * The pan is deliberately **finished before the phone starts moving**: it
 * completes at `READ_UNTIL` through the segment, and the transition owns
 * everything after that. Letting the two overlap meant a screen was pulled away
 * mid-scroll, which read as the next effect interrupting the current one rather
 * than following it.
 */
export function panForBeat(beatPosition: number, index: number) {
  // `frame` images are cover-fit and held still, so they centre rather than
  // pinning to an edge.
  if (SCREENS[index].fit !== 'scroll') return 0.5;

  const run = SCREEN_RUNS[index];
  const span = run.end - run.start;
  const reading = readFraction();
  if (span === 0) return clamp((beatPosition - index) / reading, 0, 1);
  return clamp((beatPosition - run.start) / (span + reading), 0, 1);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
