'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { Suspense } from 'react';

import { brand } from '@/lib/brand';
import { PhoneModel } from './PhoneModel';

/**
 * Lighting rig and camera framing for the phone.
 *
 * The environment is built from Lightformers rather than drei's HDRI presets
 * on purpose: the presets fetch a multi-megabyte .hdr from a CDN at runtime,
 * which is both a third-party dependency on the critical path and a visible
 * pop-in when it lands. Hand-placed lightformers cost nothing to load, and
 * because we author them we can shape the reflections deliberately — a long
 * soft strip down each edge is what reads as "premium hardware" when the phone
 * turns, and it is exactly what a generic HDRI would not give us.
 */
export function PhoneStage({
  reducedMotion,
  theme,
}: {
  reducedMotion: boolean;
  theme: 'dark' | 'light';
}) {
  const isLight = theme === 'light';

  // On a white backdrop, the pale rim-light colors that separate the chassis
  // from a *dark* background instead wash straight into it — a highlight
  // reflecting near-white light onto a metallic surface in front of a
  // near-white page is invisible. Deepening the rim colors keeps them dark
  // theme's job (a bright edge against black) but gives the light theme a
  // colored, dark-enough edge to read against paper.
  const rimColorA = isLight ? '#0B5A33' : '#BFF5D2';
  const rimColorB = isLight ? '#0B3550' : '#8FD6FF';

  return (
    <>
      <ambientLight intensity={0.5} />

      {/* Key light, high and to the left, matching the copy side of the layout. */}
      <directionalLight
        position={[-4, 6, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* Rim lights raking the phone from behind on both sides. These are what
          separate the dark chassis from the dark background — without them the
          hardware disappears and the screenshot looks like it is floating. */}
      <directionalLight position={[7, 2, -4]} intensity={5} color={rimColorA} />
      <directionalLight position={[-7, -1, -4]} intensity={4} color={rimColorB} />
      {/* Brand-green bounce from below, so the dark side isn't dead. */}
      <pointLight position={[2, -4, 3]} intensity={14} distance={18} color={brand.primaryGreen} />

      <Environment resolution={256}>
        {/* Broad soft box overhead — the main source of the glass reflection.
            Kept fairly low: when the phone reclines in the hero pose its top
            edge turns to face this light square on, and anything brighter
            blows that edge out to flat white. */}
        <Lightformer form="rect" intensity={1.8} position={[0, 5, 3]} scale={[12, 6, 1]} target={[0, 0, 0]} />
        {/* Narrow, very bright vertical strips placed wide. Because they are
            thin they read as a moving specular line down the phone's metal
            edge as it turns, which is the detail that sells it as a real
            object rather than a flat card. */}
        <Lightformer form="rect" intensity={14} position={[-4.5, 0, 1.5]} scale={[0.6, 10, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={12} position={[4.5, 0, 1.5]} scale={[0.6, 10, 1]} target={[0, 0, 0]} />
        {/* Behind the phone, catching the far edge as it rotates away. */}
        <Lightformer form="rect" intensity={8} position={[0, 1, -5]} scale={[8, 8, 1]} target={[0, 0, 0]} />
        {/* Faint green kicker, tying the hardware to the brand palette. */}
        <Lightformer
          form="circle"
          intensity={4}
          color={brand.primaryGreen}
          position={[2.5, -3.5, 3]}
          scale={[5, 5, 1]}
          target={[0, 0, 0]}
        />
      </Environment>

      <Suspense fallback={null}>
        <PhoneModel reducedMotion={reducedMotion} theme={theme} />
      </Suspense>
    </>
  );
}
