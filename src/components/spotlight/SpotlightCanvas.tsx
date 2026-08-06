'use client';

import { Canvas } from '@react-three/fiber';

import { SpotlightStage } from './SpotlightStage';

/**
 * Split into its own module for the same reason as the tour's `StageCanvas`:
 * three.js/R3F touch browser globals at import time, so this subtree must
 * only ever mount client-side via `dynamic(..., { ssr: false })`.
 */
export function SpotlightCanvas({
  src,
  aspect,
  active,
  scale,
}: {
  src: string;
  aspect: number;
  active: boolean;
  scale?: number;
}) {
  return (
    <Canvas
      // Nothing animates per frame here — the phone is perfectly still — so
      // 'demand' renders once and stops, rather than looping forever like the
      // scroll tour's canvas has to.
      frameloop={active ? 'demand' : 'never'}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.2], fov: 30 }}
    >
      <SpotlightStage src={src} aspect={aspect} scale={scale} />
    </Canvas>
  );
}
