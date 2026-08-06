'use client';

import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { brand } from '@/lib/brand';
import { usePhoneProgressRef } from './progress-context';

const MODEL_URL = '/models/phone.glb';
const DEG = Math.PI / 180;

/**
 * Measurements of the phone model's screen quad, in the model's own units —
 * copied from `components/showcase/phone-metrics.ts` rather than imported,
 * since that file is part of the rotating tour's module graph and this
 * component is deliberately independent of it.
 */
const PHONE_SCREEN = {
  width: 0.069975,
  height: 0.144975,
  aspect: 0.069975 / 0.144975,
  z: 0.003608,
  lift: 0.00004,
  cornerRadius: 0.085,
} as const;
const PHONE_SCALE = 18;

/**
 * The phone's resting pose: flat and centred, facing the viewer straight on.
 * Unlike the rotating tour (`components/showcase`), this pose never changes —
 * the whole point of this section is that the phone holds still while the
 * screen and the copy around it do the moving.
 */
const STATIC_POSE = { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.3 };

export interface OnboardingScreen {
  src: string;
  aspect: number;
}

/**
 * A still 3D phone whose screen crossfades between a fixed sequence of flat
 * screenshots, driven by `PhoneProgressContext` (see `progress-context.tsx`).
 *
 * Deliberately not a re-export of `components/showcase/StageCanvas` — that
 * pipeline exists to rotate the phone through a scroll-driven pose track tied
 * to one global `SCREENS` list, which this section doesn't want (see the
 * plan this was built from). This is a smaller, self-contained sibling that
 * borrows only the lighting/model-loading technique.
 */
export function StaticPhone({
  screens,
  active,
  reducedMotion,
  theme,
}: {
  screens: OnboardingScreen[];
  active: boolean;
  reducedMotion: boolean;
  theme: 'dark' | 'light';
}) {
  const isLight = theme === 'light';
  // On a white backdrop the pale rim colors that separate the chassis from a
  // *dark* background instead wash straight into it, so this needs the same
  // darker-and-saturated swap `PhoneStage` makes for its light theme.
  const rimColorA = isLight ? '#0B5A33' : '#BFF5D2';
  const rimColorB = isLight ? '#0B3550' : '#8FD6FF';

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.2], fov: 30 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-4, 6, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[7, 2, -4]} intensity={5} color={rimColorA} />
      <directionalLight position={[-7, -1, -4]} intensity={4} color={rimColorB} />
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
        <StaticPhoneModel screens={screens} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

function StaticPhoneModel({
  screens,
  reducedMotion,
}: {
  screens: OnboardingScreen[];
  reducedMotion: boolean;
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

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.x = STATIC_POSE.rotateX * DEG;
    group.rotation.y = STATIC_POSE.rotateY * DEG;
    group.rotation.z = STATIC_POSE.rotateZ * DEG;
    group.scale.setScalar(STATIC_POSE.scale * PHONE_SCALE);
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={model} />
      <StaticScreenSurface screens={screens} reducedMotion={reducedMotion} />
    </group>
  );
}

/**
 * The app screenshot, floating a hair in front of the model's own screen
 * quad — same technique as `components/showcase/ScreenSurface.tsx`, but a
 * plain crossfade (`uMix`) between adjacent steps rather than that
 * component's pan/slide machinery, since these are flat single-viewport
 * captures with nothing to scroll.
 */
function StaticScreenSurface({
  screens,
  reducedMotion,
}: {
  screens: OnboardingScreen[];
  reducedMotion: boolean;
}) {
  const progressRef = usePhoneProgressRef();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const textures = useLoader(
    THREE.TextureLoader,
    screens.map((s) => s.src)
  );

  useMemo(() => {
    for (const texture of textures) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    }
  }, [textures]);

  const uniforms = useMemo(
    () => ({
      uTexA: { value: textures[0] },
      uTexB: { value: textures[0] },
      uScaleA: { value: new THREE.Vector2(1, 1) },
      uScaleB: { value: new THREE.Vector2(1, 1) },
      uMix: { value: 0 },
      uAspect: { value: PHONE_SCREEN.aspect },
      uRadius: { value: PHONE_SCREEN.cornerRadius },
    }),
    [textures]
  );

  useFrame(() => {
    const material = materialRef.current;
    if (!material) return;

    const raw = progressRef.current;
    const lastIndex = screens.length - 1;
    const clamped = Math.min(Math.max(raw, 0), lastIndex);
    const from = Math.min(Math.floor(clamped), lastIndex);
    const to = Math.min(from + 1, lastIndex);
    const mix = reducedMotion ? 0 : clamped - from;

    const u = material.uniforms;
    u.uTexA.value = textures[from];
    u.uTexB.value = textures[to];
    applyFit(u.uScaleA.value as THREE.Vector2, screens[from].aspect);
    applyFit(u.uScaleB.value as THREE.Vector2, screens[to].aspect);
    u.uMix.value = mix;
  });

  return (
    <mesh position={[0, 0, PHONE_SCREEN.z + PHONE_SCREEN.lift]} renderOrder={2}>
      <planeGeometry args={[PHONE_SCREEN.width, PHONE_SCREEN.height]} />
      <shaderMaterial
        ref={materialRef}
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

/** Cover-fit: fills the screen quad without distorting the source. */
function applyFit(target: THREE.Vector2, imageAspect: number) {
  const screenAspect = PHONE_SCREEN.aspect;
  if (imageAspect > screenAspect) {
    target.set(screenAspect / imageAspect, 1);
  } else {
    target.set(1, imageAspect / screenAspect);
  }
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

  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform vec2 uScaleA;
  uniform vec2 uScaleB;
  uniform float uMix;
  uniform float uAspect;
  uniform float uRadius;

  vec3 sampleScreen(sampler2D tex, vec2 scale) {
    vec2 uv = vec2((vUv.x - 0.5) * scale.x + 0.5, (vUv.y - 0.5) * scale.y + 0.5);
    return texture2D(tex, uv).rgb;
  }

  float roundedRectDistance(vec2 p, vec2 halfSize, float radius) {
    vec2 d = abs(p) - (halfSize - radius);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
  }

  void main() {
    vec3 color = mix(sampleScreen(uTexA, uScaleA), sampleScreen(uTexB, uScaleB), uMix);

    vec2 p = (vUv - 0.5) * vec2(1.0, 1.0 / uAspect);
    vec2 halfSize = vec2(0.5, 0.5 / uAspect);
    float dist = roundedRectDistance(p, halfSize, uRadius);
    float edge = fwidth(dist);
    float mask = 1.0 - smoothstep(-edge, edge, dist);

    gl_FragColor = vec4(color, mask);

    #include <colorspace_fragment>
  }
`;

useGLTF.preload(MODEL_URL);
