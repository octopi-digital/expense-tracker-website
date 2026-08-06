'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { Suspense } from 'react';

import { brand } from '@/lib/brand';
import { SpotlightPhoneModel } from './SpotlightPhoneModel';

/**
 * Lighting rig for the static spotlight phone. Deliberately a copy of the
 * tour's `PhoneStage` rather than a shared import — the tour's version is
 * wired to its own theme/reduced-motion branches and is treated as fragile,
 * load-bearing code (see HANDOFF.md); duplicating ~30 lines here keeps this
 * section from ever being a reason to touch that file.
 */
export function SpotlightStage({
  src,
  aspect,
  scale,
}: {
  src: string;
  aspect: number;
  scale?: number;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-4, 6, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[7, 2, -4]} intensity={5} color="#0B5A33" />
      <directionalLight position={[-7, -1, -4]} intensity={4} color="#0B3550" />
      <pointLight position={[2, -4, 3]} intensity={14} distance={18} color={brand.primaryGreen} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={1.8} position={[0, 5, 3]} scale={[12, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={14} position={[-4.5, 0, 1.5]} scale={[0.6, 10, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={12} position={[4.5, 0, 1.5]} scale={[0.6, 10, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={8} position={[0, 1, -5]} scale={[8, 8, 1]} target={[0, 0, 0]} />
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
        <SpotlightPhoneModel src={src} aspect={aspect} scale={scale} />
      </Suspense>
    </>
  );
}
