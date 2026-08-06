'use client';

import { createContext, useContext, type RefObject } from 'react';

/**
 * How far through the 5-step onboarding tour the phone's screen should be,
 * as a continuous value: `floor(progress)` is the current step, the
 * fractional part is how far crossfaded into the next step's screenshot.
 *
 * A ref rather than state — `StaticPhone` reads it every frame inside
 * `useFrame`, and routing that through React state would re-render the
 * WebGL subtree on every scroll tick.
 */
export const PhoneProgressContext = createContext<RefObject<number> | null>(null);

export function usePhoneProgressRef(): RefObject<number> {
  const ref = useContext(PhoneProgressContext);
  if (!ref) {
    throw new Error('usePhoneProgressRef must be used inside <PhoneProgressContext.Provider>');
  }
  return ref;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
