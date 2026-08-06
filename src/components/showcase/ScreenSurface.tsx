'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { ENTER_TRACK, SCREENS, SOURCE_INDEX, UNIQUE_SOURCES } from '@/lib/screens';
import { PHONE_SCREEN } from './phone-metrics';
import { TRANSITIONS } from './transitions';
import {
  lerp,
  panForBeat,
  rawSegmentAt,
  toBeatPosition,
  toPosition,
  useScrollProgressRef,
} from './scroll-progress';

/**
 * The app screenshot, floating a hair in front of the model's own screen quad.
 *
 * Why an overlay plane rather than restyling the model's screen material: the
 * model's screen UVs are laid out for its stock wallpaper and share an atlas
 * with the body, so we have no clean 0..1 rectangle to map a screenshot into.
 * A plane we author ourselves gives exact control over aspect handling, and
 * lets us draw two screenshots in a single draw call.
 *
 * Motion on the glass is *scrolling*, never cross-fading. Two things combine:
 *
 * - **Pan** moves the visible window down a single long capture, so the app's
 *   own content scrolls as the page scrolls.
 * - **Slide** stacks the next screenshot directly beneath the current one and
 *   pushes both upward, so a change of screenshot reads as more scrolling
 *   rather than a dissolve.
 *
 * When adjacent beats share one source image the slide stays at zero and the
 * pan simply continues, giving one unbroken scroll with no seam.
 */
export function ScreenSurface() {
  const progressRef = useScrollProgressRef();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Load each distinct image once; several beats commonly share one capture.
  const textures = useLoader(THREE.TextureLoader, UNIQUE_SOURCES);

  useMemo(() => {
    for (const texture of textures) {
      texture.colorSpace = THREE.SRGBColorSpace;
      // The screenshot is sampled well below its native resolution when the
      // phone is small or angled; without mipmaps the UI text shimmers badly
      // as the phone rotates.
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
      uPanA: { value: 0 },
      uPanB: { value: 0 },
      uSlide: { value: 0 },
      uAspect: { value: PHONE_SCREEN.aspect },
      uRadius: { value: PHONE_SCREEN.cornerRadius },
      uGlare: { value: 0 },
    }),
    [textures]
  );

  useFrame(() => {
    const material = materialRef.current;
    if (!material) return;

    const beatPosition = toBeatPosition(toPosition(progressRef.current));
    const { from, to, t } = rawSegmentAt(beatPosition, SCREENS.length);
    const u = material.uniforms;

    u.uTexA.value = textures[SOURCE_INDEX[from]];
    u.uTexB.value = textures[SOURCE_INDEX[to]];

    applyFit(u.uScaleA.value as THREE.Vector2, SCREENS[from].aspect);
    applyFit(u.uScaleB.value as THREE.Vector2, SCREENS[to].aspect);

    u.uPanA.value = panForBeat(beatPosition, from);
    u.uPanB.value = panForBeat(beatPosition, to);

    // How the next screenshot arrives depends on what the phone is doing.
    //
    // `to` is a beat index, but the transition track is indexed by *stop*, and
    // beat b is stop b + 1 — so the move that lands on beat `to` is the one
    // recorded against it.
    const transition = TRANSITIONS[ENTER_TRACK[to] ?? 'straight'];

    if (SCREENS[from].src === SCREENS[to].src) {
      // Same image either side of the boundary: nothing to swap to. Hold still
      // and let the pan carry the motion, so the run reads as one continuous
      // surface rather than restarting.
      u.uSlide.value = 0;
    } else if (transition.swap === 'conceal') {
      // The move hides the glass — back or edge to camera — so the swap is a
      // hard cut taken at the hidden moment. Sliding underneath a screen nobody
      // can see would only risk the join becoming visible on the way out.
      u.uSlide.value = t < 0.5 ? 0 : 1;
    } else {
      u.uSlide.value = smoothstep(0.3, 0.85, t);
    }

    // A soft sheen that slides across the glass as the phone turns, so the
    // screen reads as something behind glass rather than a decal.
    const target = Math.sin(beatPosition * 1.7) * 0.5 + 0.5;
    u.uGlare.value = lerp(u.uGlare.value as number, target, 0.08);
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

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/**
 * Cover-fit: pick the UV window that fills the screen quad without distorting
 * the source, cropping on whichever axis has slack.
 */
function applyFit(target: THREE.Vector2, imageAspect: number) {
  const screenAspect = PHONE_SCREEN.aspect;
  if (imageAspect > screenAspect) {
    target.set(screenAspect / imageAspect, 1); // wider than the screen: crop sides
  } else {
    target.set(1, imageAspect / screenAspect); // taller than the screen: crop top/bottom
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
  uniform float uPanA;
  uniform float uPanB;
  uniform float uSlide;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uGlare;

  /**
   * Samples a screenshot through its cover-fit window.
   *
   * \`y\` is a coordinate on the image in screen-heights, 0 at its bottom edge
   * and 1 at its top. \`pan\` slides the visible window down the source: 0 pins
   * it to the top, 1 to the bottom. Textures arrive flipped (three's default
   * flipY), so v = 1 is the top of the image.
   */
  vec3 sampleScreen(sampler2D tex, vec2 scale, float pan, float y) {
    float centerV = mix(1.0 - scale.y * 0.5, scale.y * 0.5, pan);
    vec2 uv = vec2((vUv.x - 0.5) * scale.x + 0.5, (y - 0.5) * scale.y + centerV);
    return texture2D(tex, uv).rgb;
  }

  /** Signed distance to a rounded rectangle, in units of the quad's width. */
  float roundedRectDistance(vec2 p, vec2 halfSize, float radius) {
    vec2 d = abs(p) - (halfSize - radius);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
  }

  void main() {
    // Screenshot A is pushed up the screen by uSlide; B is stacked directly
    // beneath it and rides up with it. At uSlide = 1, A has fully exited past
    // the top and B exactly fills the screen.
    float yA = vUv.y - uSlide;
    float yB = yA + 1.0;

    vec3 color = mix(
      sampleScreen(uTexB, uScaleB, uPanB, yB),
      sampleScreen(uTexA, uScaleA, uPanA, yA),
      // Feathered rather than a hard step, so the join between the two
      // screenshots doesn't crawl as a jagged edge while it travels.
      smoothstep(-0.0015, 0.0015, yA)
    );

    // Normalise to width-units so the corner radius stays circular on a
    // non-square quad.
    vec2 p = (vUv - 0.5) * vec2(1.0, 1.0 / uAspect);
    vec2 halfSize = vec2(0.5, 0.5 / uAspect);
    float dist = roundedRectDistance(p, halfSize, uRadius);
    float edge = fwidth(dist);
    float mask = 1.0 - smoothstep(-edge, edge, dist);

    // Diagonal sheen, driven by scroll rather than time so it tracks the
    // phone's rotation instead of animating on its own.
    float band = vUv.x * 0.65 + vUv.y * 0.35;
    color += smoothstep(0.35, 0.0, abs(band - uGlare)) * 0.06;

    gl_FragColor = vec4(color, mask);

    #include <colorspace_fragment>
  }
`;
