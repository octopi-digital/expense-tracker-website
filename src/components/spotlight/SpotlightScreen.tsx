'use client';

import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { PHONE_SCREEN } from '@/components/showcase/phone-metrics';

/**
 * A single static screenshot on the phone's glass — the spotlight's
 * equivalent of the tour's `ScreenSurface`, minus everything scroll-driven
 * (no pan, no slide, no second texture). Just cover-fit plus the rounded
 * corner mask that keeps the image inside the model's bezel.
 */
export function SpotlightScreen({ src, aspect }: { src: string; aspect: number }) {
  const texture = useLoader(THREE.TextureLoader, src);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  const scale = useMemo(() => {
    const screenAspect = PHONE_SCREEN.aspect;
    return aspect > screenAspect
      ? new THREE.Vector2(screenAspect / aspect, 1)
      : new THREE.Vector2(1, aspect / screenAspect);
  }, [aspect]);

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uScale: { value: scale },
      uAspect: { value: PHONE_SCREEN.aspect },
      uRadius: { value: PHONE_SCREEN.cornerRadius },
    }),
    [texture, scale]
  );

  return (
    <mesh position={[0, 0, PHONE_SCREEN.z + PHONE_SCREEN.lift]} renderOrder={2}>
      <planeGeometry args={[PHONE_SCREEN.width, PHONE_SCREEN.height]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
      />
    </mesh>
  );
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec2 vUv;

  uniform sampler2D uTex;
  uniform vec2 uScale;
  uniform float uAspect;
  uniform float uRadius;

  float roundedRectDistance(vec2 p, vec2 halfSize, float radius) {
    vec2 d = abs(p) - (halfSize - radius);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
  }

  void main() {
    vec2 uv = vec2((vUv.x - 0.5) * uScale.x + 0.5, (vUv.y - 0.5) * uScale.y + 0.5);
    vec3 color = texture2D(uTex, uv).rgb;

    vec2 p = (vUv - 0.5) * vec2(1.0, 1.0 / uAspect);
    vec2 halfSize = vec2(0.5, 0.5 / uAspect);
    float dist = roundedRectDistance(p, halfSize, uRadius);
    float edge = fwidth(dist);
    float mask = 1.0 - smoothstep(-edge, edge, dist);

    gl_FragColor = vec4(color, mask);

    #include <colorspace_fragment>
  }
`;
