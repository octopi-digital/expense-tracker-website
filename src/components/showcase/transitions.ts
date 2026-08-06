/**
 * How the phone travels between two stops.
 *
 * Every boundary in the tour gets its own signature move, and each one uses a
 * *different degree of freedom* — yaw, lateral travel, depth, roll — so they
 * read as genuinely different kinds of motion rather than different amounts of
 * the same one.
 *
 * Two rules hold across all of them, and they are not stylistic:
 *
 * 1. **Every effect starts and ends face-on.** Rotation is something that
 *    happens *between* stops, never something a reader can sit inside. An
 *    earlier version of this tour left a few degrees of yaw on the resting
 *    poses and it read as being made to look at the screen from off to one
 *    side — the wrong feeling for the section whose whole job is showing the
 *    app.
 *
 * 2. **A move gets a runway, and travels it at an even rate.** Each segment of
 *    scroll is spent reading first and moving second (`READ_UNTIL`), and each
 *    stop is worth more than one viewport (`VIEWPORTS_PER_STOP`), so a move has
 *    room to be *watched* rather than merely completed.
 *
 *    An earlier version did the opposite — it rushed the centre of every curve,
 *    to stop a slow scroller parking the phone edge-on. That defence cost more
 *    than it saved: at any real scrolling pace the 360° roll stopped reading as
 *    a rotation at all and became a jump to a new position. Room, not speed, is
 *    the answer.
 *
 * Concealment is reported alongside the pose because it decides *when the
 * screenshot swaps*. When a move hides the glass — the back or the edge turned
 * to camera — the swap is a hard cut at the hidden moment, and the phone comes
 * back around already showing the next screen. When the glass stays readable,
 * the swap falls back to the slide (content pushes up), which is what the
 * screen surface already does and what was chosen over cross-fading.
 */
import type { PhonePose } from '@/lib/screens';

/** A pose plus the depth offset only transitions use. */
export interface StagePose extends PhonePose {
  /**
   * Depth along the view axis, in phone-heights. Negative recedes from camera.
   *
   * Keep these small. One phone-height is ~2.6 world units against a camera
   * only 7.2 out, so a value of 1 already moves the phone a third of the way to
   * the lens and shrinks it by a quarter on perspective alone — *before* any
   * `scale` change compounds it. Depth and scale are two dials on the same
   * apparent size, and a move that spends both hard leaves the phone a speck.
   */
  offsetZ: number;
}

export interface TransitionState {
  pose: StagePose;
  /**
   * How much of the screen is unreadable right now: 0 fully face-on, 1 not
   * visible at all (back or pure edge to camera).
   */
  conceal: number;
}

/**
 * How the next screenshot replaces the current one.
 *
 * - `conceal` the move hides the glass, so the swap is a hard cut behind it.
 * - `slide`   the glass stays readable, so the next shot stacks beneath the
 *             current one and both push up.
 */
export type SwapMode = 'conceal' | 'slide';

export interface Transition {
  id: string;
  swap: SwapMode;
  at(a: PhonePose, b: PhonePose, t: number): TransitionState;
}

/* ---------------------------------------------------------------- easing -- */

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

/** Classic slow-fast-slow. Used where the move should feel unhurried. */
function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/**
 * Near-constant velocity through the middle, with the ends eased off.
 *
 * Rotation wants this rather than a smoothstep family curve. A steep centre
 * makes the turn *quick* but not smooth: angular velocity spikes and drops
 * inside a single move, which the eye reads as a snap rather than a spin, and
 * on a 360° roll it destroys the effect entirely — the phone appears to simply
 * arrive somewhere new.
 *
 * An earlier version deliberately used a steeper-than-smoothstep curve, on the
 * theory that hurrying through the unreadable part of a rotation was worth it.
 * That was the wrong trade: it bought a defence against parking mid-spin at the
 * cost of the move being perceptible at all. The runway from
 * `VIEWPORTS_PER_STOP` is the better answer to parking — give the move room
 * instead of rushing it.
 */
function glide(t: number) {
  const x = clamp01(t);
  // Cosine ease-in-out flattened toward linear: 65% constant-rate, 35% eased,
  // so it leaves and arrives softly without coasting through the middle.
  const eased = 0.5 - Math.cos(x * Math.PI) / 2;
  return x * 0.65 + eased * 0.35;
}

/** 0 at both ends, 1 in the middle — the shape of a move that comes back. */
function bump(t: number) {
  return Math.sin(clamp01(t) * Math.PI);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Blends every field of two poses with one ease, as the baseline each effect
 * then deviates from.
 */
function blendPose(a: PhonePose, b: PhonePose, e: number): StagePose {
  return {
    rotateX: mix(a.rotateX, b.rotateX, e),
    rotateY: mix(a.rotateY, b.rotateY, e),
    rotateZ: mix(a.rotateZ, b.rotateZ, e),
    scale: mix(a.scale, b.scale, e),
    offsetX: mix(a.offsetX, b.offsetX, e),
    offsetY: mix(a.offsetY, b.offsetY, e),
    offsetZ: 0,
  };
}

/**
 * How much of the screen is readable, from yaw alone.
 *
 * A plane's apparent width falls off as the cosine of its yaw, and it shows its
 * back once that goes negative — so `max(0, cos)` is both the foreshortening
 * and the facing test in one number. Face-on reads 0 concealment, edge-on and
 * fully-reversed both read 1.
 */
function concealFromYaw(rotateYDeg: number) {
  return 1 - Math.max(0, Math.cos(rotateYDeg * (Math.PI / 180)));
}

/* ------------------------------------------------------------- effects -- */

/**
 * Barrel roll — a full 360° turn on the way out of the hero.
 *
 * The one move that shows the phone's back. Because the sweep is monotonic
 * rather than a there-and-back, the phone arrives having turned all the way
 * around rather than rewinding.
 *
 * This is the move that most needs its runway: a full turn is 360° of travel
 * against every other effect's few tens of degrees, so it is the first thing to
 * stop reading as rotation if the segment is short or the curve is steep.
 */
const STAND_UP = 0.42;

const barrelRoll: Transition = {
  id: 'barrel-roll',
  swap: 'conceal',
  at(a, b, t) {
    // Two phases, not one blend. Running the turn at the same time as the
    // un-reclining meant yaw, recline and roll all resolved together and the
    // phone tumbled through a diagonal — a turn about no particular axis.
    // Standing it up *first* leaves a clean vertical to spin about, so the
    // second phase reads as a turntable rather than a stumble.
    const stand = glide(clamp01(t / STAND_UP));
    const spin = glide(clamp01((t - STAND_UP) / (1 - STAND_UP)));

    // Phase one resolves everything: recline, roll, scale, placement — and
    // squares the phone to camera.
    const pose = blendPose(a, b, stand);
    // Phase two adds a full turn on top of the now-upright, face-on pose.
    pose.rotateY = mix(a.rotateY, b.rotateY, stand) + 360 * spin;
    // Draws in slightly mid-turn, so the spin reads as the phone pivoting in
    // place rather than swinging on a fixed radius.
    pose.scale = mix(a.scale, b.scale, stand) * (1 - bump(spin) * 0.08);
    return { pose, conceal: concealFromYaw(pose.rotateY) };
  },
};

/**
 * Hand-off — the phone crosses the viewport without rotating at all.
 *
 * This is the move that carries the layout from one side to the other, and it
 * deliberately spends *no* rotation: sitting between the barrel roll and the
 * push-back, a pure translation is the strongest possible contrast. The screen
 * stays square and readable the whole way across, so the content keeps scrolling
 * through the move.
 */
const handOff: Transition = {
  id: 'hand-off',
  swap: 'slide',
  at(a, b, t) {
    const e = glide(t);
    const pose = blendPose(a, b, e);
    // A shallow arc rather than a straight line — travel along a rail reads as
    // mechanical, travel along an arc reads as carried.
    pose.offsetY = mix(a.offsetY, b.offsetY, e) + bump(t) * 0.06;
    // Just enough depth to bend the arc away from the viewer. Any more and a
    // move whose whole point is lateral starts reading as a dolly.
    pose.offsetZ = -bump(t) * 0.14;
    return { pose, conceal: 0 };
  },
};

/**
 * Push-back — recedes into depth, swaps while far, and returns large.
 *
 * The only effect with no rotation *and* no lateral travel, which is what makes
 * it the right move into the centre-stage beat: coming toward the viewer out of
 * depth is the strongest way to claim the middle of the frame when there is
 * content down both sides of it.
 */
const pushBack: Transition = {
  id: 'push-back',
  swap: 'conceal',
  at(a, b, t) {
    const e = smoothstep(t);
    const pose = blendPose(a, b, e);
    const away = bump(t);
    // Split between real depth and scale rather than spending either hard —
    // perspective does the convincing, `scale` only deepens it. Together these
    // land the phone at roughly 70% at the far point: unmistakably receded,
    // still clearly a phone.
    pose.offsetZ = -away * 0.45;
    pose.scale = mix(a.scale, b.scale, e) * (1 - away * 0.18);
    return {
      pose,
      // Never fully hidden — distance makes the screen unreadable rather than
      // invisible, which is enough cover for a cut at the far point.
      conceal: away * 0.9,
    };
  },
};

/**
 * Pendulum — swings across on its in-plane axis.
 *
 * `rotateZ` rotates the phone *within* the picture plane, so unlike yaw it
 * costs no legibility at all: the screen never turns away from the viewer. That
 * makes this the one large, showy rotation that can happen with the content
 * still being read.
 */
const pendulum: Transition = {
  id: 'pendulum',
  swap: 'slide',
  at(a, b, t) {
    const e = glide(t);
    const pose = blendPose(a, b, e);
    // Sign follows the direction of travel, so the phone leans into its swing
    // the way a hanging object would.
    const direction = Math.sign(b.offsetX - a.offsetX) || 1;
    pose.rotateZ = mix(a.rotateZ, b.rotateZ, e) - direction * bump(t) * 15;
    pose.offsetY = mix(a.offsetY, b.offsetY, e) - bump(t) * 0.05;
    return { pose, conceal: 0 };
  },
};

/**
 * Card turn — turns to a pure edge, swaps unseen, and turns back.
 *
 * Unlike the barrel roll this is a there-and-back on yaw: it reaches 90°, where
 * the phone is a sliver and the glass is completely hidden, then returns to the
 * same face. The screenshot is replaced at that moment, so the phone appears to
 * come back around already showing the next screen.
 */
const cardTurn: Transition = {
  id: 'card-turn',
  swap: 'conceal',
  at(a, b, t) {
    const e = glide(t);
    const pose = blendPose(a, b, e);
    const direction = Math.sign(b.offsetX - a.offsetX) || 1;
    pose.rotateY = mix(a.rotateY, b.rotateY, e) + direction * bump(t) * 90;
    return { pose, conceal: concealFromYaw(pose.rotateY) };
  },
};

/** Fallback for any boundary without an explicit effect. */
const straightCut: Transition = {
  id: 'straight',
  swap: 'slide',
  at(a, b, t) {
    return { pose: blendPose(a, b, smoothstep(t)), conceal: 0 };
  },
};

export const TRANSITIONS = {
  'barrel-roll': barrelRoll,
  'hand-off': handOff,
  'push-back': pushBack,
  pendulum,
  'card-turn': cardTurn,
  straight: straightCut,
} as const;

export type TransitionKind = keyof typeof TRANSITIONS;

/**
 * Reduced-motion variant: keeps the stop-to-stop pose change and the content
 * scrolling, but drops the signature move entirely. The screen never turns
 * away, so the swap always falls back to the slide.
 */
export function flattened(transition: Transition): Transition {
  return { ...transition, swap: 'slide', at: straightCut.at };
}
