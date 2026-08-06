'use client';

import { Canvas } from '@react-three/fiber';

import { PhoneStage } from './PhoneStage';

/**
 * The WebGL canvas, split into its own module so `PhoneShowcase` can pull it in
 * with `next/dynamic({ ssr: false })`.
 *
 * three.js and R3F both reach for browser globals at import time, so this
 * subtree must never run during the server render. Next 16 only honours
 * `ssr: false` when the dynamic import is written inside a Client Component,
 * which is why the boundary sits here rather than in `page.tsx`.
 */
export function StageCanvas({
  active,
  reducedMotion,
  theme,
}: {
  active: boolean;
  reducedMotion: boolean;
  theme: 'dark' | 'light';
}) {
  return (
    <Canvas
      // Parked entirely when the section is off-screen — an idle WebGL loop
      // otherwise burns GPU for the whole length of the page.
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      shadows
      // Transparent so the CSS gradient behind the canvas shows through. A
      // gradient is both cheaper and easier to art-direct in CSS than as scene
      // geometry, and it gives the phone's dark chassis something other than
      // flat black to sit against.
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.2], fov: 30 }}
    >
      <PhoneStage reducedMotion={reducedMotion} theme={theme} />
    </Canvas>
  );
}
