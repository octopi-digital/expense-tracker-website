'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { PHONE_SCALE } from '@/components/showcase/phone-metrics';
import { SpotlightScreen } from './SpotlightScreen';

const MODEL_URL = '/models/phone.glb';

/**
 * The phone model at a single resting pose — face-on, no rotation, perfectly
 * still. No scroll dependency at all: this is for a static spotlight
 * section, not the pinned tour.
 */
export function SpotlightPhoneModel({
  src,
  aspect,
  scale = 1,
}: {
  src: string;
  aspect: number;
  /** Extra multiplier on top of the shared PHONE_SCALE, for this section only. */
  scale?: number;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const material = child.material as THREE.MeshStandardMaterial;
      if (!material) return;

      if (material.emissive) {
        material.emissive = new THREE.Color(0x000000);
        material.emissiveIntensity = 0;
        material.emissiveMap = null;
        material.needsUpdate = true;
      }

      if ('roughness' in material) {
        material.roughness = Math.min(material.roughness ?? 1, 0.25);
        material.metalness = Math.max(material.metalness ?? 0, 0.8);
        material.envMapIntensity = 1.7;
      }
    });
  }, [model]);

  return (
    <group ref={groupRef} scale={PHONE_SCALE * scale}>
      <primitive object={model} />
      <SpotlightScreen src={src} aspect={aspect} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
