'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { ENTER_TRACK, POSE_TRACK, POSE_TRACK_LIGHT } from '@/lib/screens';
import { PHONE_SCALE, PHONE_SCREEN } from './phone-metrics';
import { ScreenSurface } from './ScreenSurface';
import { TRANSITIONS, flattened, type StagePose } from './transitions';
import { clamp, stopSegmentAt, toPosition, useScrollProgressRef } from './scroll-progress';

const MODEL_URL = '/models/phone.glb';
const DEG = Math.PI / 180;

/** How fast the phone chases its target pose. Higher settles quicker. */
const FOLLOW = 0.12;

export function PhoneModel({
  reducedMotion,
  theme,
}: {
  reducedMotion: boolean;
  theme: 'dark' | 'light';
}) {
  const { scene } = useGLTF(MODEL_URL);
  const progressRef = useScrollProgressRef();
  const groupRef = useRef<THREE.Group>(null);
  /** Eased lens shift, in fractions of a half-width. See the note in useFrame. */
  const shiftRef = useRef(0);

  // The loader caches one scene per URL; cloning keeps this component from
  // mutating the shared copy (and lets the model appear more than once later).
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const material = child.material as THREE.MeshStandardMaterial;
      if (!material) return;

      // The stock wallpaper is baked into this material's emissive map. We
      // draw our own screenshot on top, so black it out — otherwise the
      // wallpaper glows through wherever the screenshot is transparent.
      if (material.emissive) {
        material.emissive = new THREE.Color(0x000000);
        material.emissiveIntensity = 0;
        material.emissiveMap = null;
        material.needsUpdate = true;
      }

      // Sketchfab exports tend to ship flat, over-rough, under-metallic
      // surfaces. Pushing metalness up and roughness down is what lets the
      // environment actually register as reflections along the phone's edges
      // — at the export's defaults the chassis renders as a dark silhouette
      // and the phone reads as a floating screenshot.
      if ('roughness' in material) {
        material.roughness = Math.min(material.roughness ?? 1, 0.25);
        material.metalness = Math.max(material.metalness ?? 0, 0.8);
        material.envMapIntensity = 1.7;
      }
    });
  }, [model]);

  // The lens shift lives on the shared camera, so it has to be undone if this
  // component ever goes away — otherwise the frustum stays skewed for whatever
  // renders next.
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    return () => {
      const perspective = camera as THREE.PerspectiveCamera;
      if (perspective.isPerspectiveCamera) perspective.clearViewOffset();
    };
  }, [camera]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const position = toPosition(progressRef.current);
    const target = stagePoseAt(position, reducedMotion, theme);

    // Rotation is driven straight from scroll rather than chased with `lerp`.
    //
    // The transition curves are already eased, and a per-frame follow on top of
    // them is not a smoother — it is a lag. On a 360° barrel roll it is
    // actively destructive: the target sweeps a full turn in the time the
    // follow covers a fraction of it, so the phone under-rotates and the spin
    // that was authored never actually happens on screen. Worse, the amount
    // lost depends on frame rate, so the move would differ between a 120 Hz
    // laptop and a slow phone. Scroll position is already continuous and
    // rAF-throttled, so reading it directly is both smooth and honest.
    group.rotation.x = target.rotateX * DEG;
    group.rotation.y = target.rotateY * DEG;
    group.rotation.z = target.rotateZ * DEG;

    // Horizontal composition is done with a lens shift rather than by moving
    // the phone, and the phone stays put on the optical axis at x = 0.
    //
    // Moving it instead — the obvious approach — is what made the tour feel
    // like reading the screen from off to one side. Under a 30 degree lens,
    // parking the phone half a half-width to the right puts it about 12
    // degrees off-axis, and perspective alone turns it away from the viewer by
    // that much no matter what its rotation says. Shifting the frustum keeps
    // the phone dead on-axis, so it renders perfectly face-on wherever it is
    // composed.
    //
    // On portrait/narrow viewports there is no room for a side-by-side layout,
    // so the shift collapses and the phone centres itself; the copy moves
    // below it in CSS.
    const phoneHeight = PHONE_SCREEN.height * PHONE_SCALE;
    const sideBySide = state.viewport.aspect > 1.1;
    group.position.x = 0;

    const camera = state.camera as THREE.PerspectiveCamera;
    if (camera.isPerspectiveCamera) {
      // Same reasoning as rotation: the lens shift carries the hand-off, which
      // is *entirely* lateral travel, so damping it would mute the one effect
      // that has nothing else to show.
      shiftRef.current = sideBySide ? target.offsetX : 0;
      const { width, height } = state.size;
      // A negative frustum origin slides the rendered window left, which moves
      // the on-axis subject right in the final image.
      camera.setViewOffset(width, height, (-shiftRef.current * width) / 2, 0, width, height);
    }

    // Depth is authored only by transitions (the push-back), in units of phone
    // heights, so it costs nothing at a resting stop.
    group.position.z = target.offsetZ * phoneHeight;

    // A slow bob while the phone is still in its hero pose, so it reads as
    // floating rather than parked. Faded out by the time the tour starts, where
    // the authored per-beat drift takes over as the source of movement.
    const floating = clamp(1 - position, 0, 1);
    const bob = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.9) * 0.045 * floating;
    const drift = target.offsetY * (state.viewport.height / 2);
    group.position.y = drift + bob * phoneHeight;

    // Scale is scroll-driven too: it is the push-back's entire vocabulary, and
    // a follow would turn that move's recede-and-return into a soft drift.
    group.scale.setScalar(target.scale * PHONE_SCALE);
  });

  return (
    <group ref={groupRef} scale={PHONE_SCALE}>
      <primitive object={model} />
      <ScreenSurface />
    </group>
  );
}

/**
 * The phone's pose at the current track position, routed through whichever
 * signature move owns this boundary.
 *
 * The transition for segment i is the move *into* stop i + 1, so it is indexed
 * by `from`.
 */
export function stagePoseAt(
  position: number,
  reducedMotion: boolean,
  theme: 'dark' | 'light'
): StagePose {
  const track = theme === 'light' ? POSE_TRACK_LIGHT : POSE_TRACK;
  const { from, to, t } = stopSegmentAt(position);
  const a = track[from];
  const b = track[to];

  const kind = ENTER_TRACK[from] ?? 'straight';
  // Reduced motion keeps the screen scrolling — that is what carries the
  // content — but drops the signature move entirely rather than damping it. A
  // scaled-down barrel roll is still a spin, just a worse one; the honest
  // answer to "no motion, please" is not to perform it.
  const transition = reducedMotion ? flattened(TRANSITIONS[kind]) : TRANSITIONS[kind];

  return transition.at(a, b, t).pose;
}

useGLTF.preload(MODEL_URL);
