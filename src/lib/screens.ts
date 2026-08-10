/**
 * The scroll showcase's script.
 *
 * The phone is pinned for the whole section. Scroll drives two things at once:
 * the phone's pose, and how far the app content has scrolled on its screen.
 *
 * Stops run `[HERO, ...SCREENS]`. The hero stop is the phone floating at a 3/4
 * angle with the copy centred; from there it straightens up and the per-beat
 * copy rail takes over.
 *
 * To swap in a real screenshot, drop the file in `public/screens/` and point
 * `src` at it. Nothing else needs to change.
 */
import { app } from '@/lib/brand';
import type { TransitionKind } from '@/components/showcase/transitions';

/**
 * How a source image maps onto the phone's screen quad.
 *
 * - `frame`  a normal single-viewport capture. Scaled to cover the screen and
 *            held still — there is nothing to scroll.
 * - `scroll` a long scroll-capture, taller than one viewport. Covers the
 *            screen's width and pans down across its beats, so the app's
 *            content scrolls inside the phone as the page scrolls.
 */
export type ScreenFit = 'frame' | 'scroll';

export interface PhonePose {
  /** Degrees. Positive turns the phone's right edge away from the viewer. */
  rotateY: number;
  /**
   * Degrees of recline. Negative lays the phone back with its screen facing
   * up, like a handset resting on a table; positive tips it forward so the
   * screen faces down and away.
   */
  rotateX: number;
  /** Degrees of in-plane tilt. */
  rotateZ: number;
  /** Multiplier on the phone's resting size. */
  scale: number;
  /**
   * Horizontal placement as a fraction of the visible half-width: 0 is centred,
   * 1 sits on the right edge of the canvas.
   *
   * Applied as a *lens shift*, not as world movement — see `LENS_SHIFT` in
   * `PhoneModel`. The phone never leaves the camera's optical axis, so it stays
   * face-on however far right it is composed.
   *
   * Relative rather than absolute so the phone keeps the same relationship to
   * the copy at any viewport width.
   */
  offsetX: number;
  /**
   * Vertical placement as a fraction of the visible half-height: 0 is centred,
   * positive rises.
   *
   * This is the tour's main source of movement. Drifting the phone is
   * comfortable in a way that yawing it is not — the screen stays square to
   * the viewer the whole time instead of turning away to be read at an angle.
   */
  offsetY: number;
}

/**
 * Which side of the viewport the phone occupies at this beat — and therefore
 * which side the copy takes.
 *
 * `center` is the odd one out: the phone owns the middle and the copy splits
 * into two columns flanking it, so that beat needs `flank` content to fill
 * them.
 */
export type ScreenSide = 'left' | 'right' | 'center';

export interface AppScreen {
  id: string;
  /** Path under `public/`. */
  src: string;
  fit: ScreenFit;
  /** Intrinsic aspect (width / height) of the source image. */
  aspect: number;
  eyebrow: string;
  title: string;
  body: string;
  pose: PhonePose;
  side: ScreenSide;
  /**
   * The signature move that brings the phone *into* this beat. Every boundary
   * gets a different one — see `transitions.ts` for what each does and why they
   * all resolve face-on.
   */
  enter: TransitionKind;
  /**
   * Small supporting items for a `center` beat, laid out down both sides of the
   * phone. Ignored for left/right beats, which have a single copy column.
   */
  flank?: { label: string; value: string }[];
}

/**
 * The phone at rest before the tour starts: floating and reclined, as if lying
 * back in mid-air, turned into a 3/4 perspective view away from the copy.
 *
 * `rotateX` does the laying-down, and is negative so the phone lies on its
 * back with the screen facing up rather than tipping forward. It stops short
 * of fully flat because the screen has to stay legible — the scale bump
 * compensates for how much the reclined angle foreshortens it. Every later
 * stop is closer to upright, so scrolling reads as the phone standing up to
 * be looked at.
 */
export const HERO_POSE: PhonePose = {
  rotateY: -27,
  rotateX: -62,
  // Rolls the handset around so its bottom edge — charging port and speaker
  // grille — points to the left of the viewport, toward the copy.
  rotateZ: -85,
  scale: 1.3,
  offsetX: 0.46,
  offsetY: 0,
};

/**
 * Light-theme-only hero pose. Dark theme keeps `HERO_POSE` untouched — this
 * exists purely because the light "ledger" composition stages the phone as
 * upright product hardware rather than a floating 3/4 hero, so it needs less
 * recline and a touch more scale to fill the same visual weight.
 */
export const HERO_POSE_LIGHT: PhonePose = {
  rotateY: -18,
  rotateX: -38,
  rotateZ: -78,
  scale: 1.18,
  offsetX: 0.46,
  offsetY: 0,
};

/*
 * `title` reads `app.tagline` rather than restating it. The same line is the
 * hero <h1>, the <title> suffix, the OG image and the footer; when it was
 * duplicated here as a literal, the page had two independent copies of its
 * own promise and nothing to stop them diverging.
 *
 * `body` names the three things the app does that a generic expense tracker
 * doesn't — automatic bank/MFS SMS capture, Zakat, and the AI coach — in the
 * order they're most likely to land. It used to lead on "offline-first",
 * which is an implementation detail rather than a reason to install
 * anything, and it left all three differentiators unmentioned.
 */
export const HERO_COPY = {
  eyebrow: app.name,
  title: app.tagline,
  body: 'Income, expenses, assets and Zakat in one place — captured automatically from your bank SMS, explained by an AI coach that speaks your language.',
};

const HOME_CAPTURE = {
  src: '/screens/derived/home-full.webp',
  fit: 'scroll' as const,
  aspect: 585 / 2387,
};

const TRANSACTIONS_CAPTURE = {
  src: '/screens/derived/transaction-expense-full.webp',
  fit: 'scroll' as const,
  aspect: 390 / 1438,
};

const HEALTH_CAPTURE = {
  src: '/screens/derived/health-score-full.webp',
  fit: 'scroll' as const,
  aspect: 390 / 1612,
};

const ZAKAT_CAPTURE = {
  src: '/screens/derived/zakat-full.webp',
  fit: 'scroll' as const,
  aspect: 390 / 1722,
};

const GOLD_CAPTURE = {
  src: '/screens/gold-rate.webp',
  fit: 'frame' as const,
  aspect: 717 / 1415,
};

/** Lateral placement, as a fraction of the visible half-width. */
const RIGHT = 0.52;
const LEFT = -0.52;
const CENTER = 0;

/**
 * Beats rest face-on: `rotateY` and `rotateX` are zero at every stop.
 *
 * An earlier version yawed the phone a few degrees per beat. Even at 9 degrees
 * that reads as the screen being turned away — the viewer feels put to one
 * side of a display they are trying to read, which is exactly the wrong
 * feeling for the section whose whole job is showing the app. So rotation is
 * something that happens strictly *between* stops, never at one; see
 * `transitions.ts`, where every effect is built to resolve face-on.
 *
 * What each beat authors is therefore only its resting composition — which side
 * it sits on, how large it runs, a whisper of in-plane `rotateZ`. How it *got*
 * there is the incoming transition's business.
 *
 * The phone alternates sides down the page (right, left, centre, right, left)
 * so the copy alternates with it and the page never settles into one rhythm.
 * The centre beat is the exception: the phone owns the middle and its copy
 * splits into two flanking columns.
 */
export const SCREENS: AppScreen[] = [
  {
    ...HOME_CAPTURE,
    id: 'home',
    eyebrow: 'Your money, at a glance',
    title: 'Know where you stand, before you decide',
    body: 'Assets minus liabilities, recalculated the moment anything moves — so when someone asks "can you afford it," you already know. Income, expense, sadaqah and the Zakat calculator are one tap away.',
    pose: { rotateY: 0, rotateX: 0, rotateZ: -2, scale: 1.16, offsetX: RIGHT, offsetY: -0.05 },
    side: 'right',
    enter: 'barrel-roll',
  },
  {
    ...TRANSACTIONS_CAPTURE,
    id: 'transactions',
    eyebrow: 'Every purchase, understood',
    title: 'Stop wondering where the money went',
    body: 'Log it once — Islamic Expense Tracker sorts it into need or want, tags the category, and warns you the moment a spending habit starts creeping up. No spreadsheet, no end-of-month surprise.',
    pose: { rotateY: 0, rotateX: 0, rotateZ: 1.5, scale: 1.24, offsetX: LEFT, offsetY: 0.04 },
    side: 'left',
    enter: 'hand-off',
  },
  {
    ...HEALTH_CAPTURE,
    id: 'health',
    eyebrow: 'Financial health',
    title: 'One number that tells you how you\'re really doing',
    body: 'Built from your real income and spending, not a survey — so you can check it the way you\'d check your blood pressure, and see exactly which habit is holding the score back.',
    pose: { rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1.34, offsetX: CENTER, offsetY: 0 },
    side: 'center',
    enter: 'push-back',
    // The four pillars the app itself scores. Real values from the capture on
    // the glass, so the copy and the screenshot agree.
    flank: [
      { label: 'Income stability', value: '88%' },
      { label: 'Savings performance', value: '58%' },
      { label: 'Spending discipline', value: '65%' },
      { label: 'Debt management', value: '75%' },
    ],
  },
  {
    ...ZAKAT_CAPTURE,
    id: 'zakat',
    eyebrow: 'Zakat & Sadaqah',
    title: 'Never guess your Zakat again',
    body: 'Gold, bank balance, investments, real estate — Islamic Expense Tracker tracks it all against Nisab and Hawl automatically, so obligation season isn\'t a scramble, and your sadaqah is logged right alongside it.',
    pose: { rotateY: 0, rotateX: 0, rotateZ: -1.5, scale: 1.27, offsetX: RIGHT, offsetY: -0.04 },
    side: 'right',
    enter: 'pendulum',
  },
  {
    ...GOLD_CAPTURE,
    id: 'gold',
    eyebrow: 'Gold rate',
    title: 'The rate your Zakat actually runs on',
    body: 'Set your jeweller\'s own rate or pull a live spot price — either way, it\'s the same number quietly powering your Nisab calculation, always current.',
    pose: { rotateY: 0, rotateX: 0, rotateZ: 1.5, scale: 1.22, offsetX: LEFT, offsetY: -0.02 },
    side: 'left',
    enter: 'card-turn',
  },
];

/** Stop 0 is the hero; stops 1..N are `SCREENS`. */
export const POSE_TRACK: PhonePose[] = [HERO_POSE, ...SCREENS.map((s) => s.pose)];

/** Same track, with only the hero stop swapped for the light theme's pose. */
export const POSE_TRACK_LIGHT: PhonePose[] = [HERO_POSE_LIGHT, ...SCREENS.map((s) => s.pose)];

/**
 * The effect on each boundary. Index i is the move from stop i to stop i + 1,
 * so it is one shorter than the pose track.
 */
export const ENTER_TRACK: TransitionKind[] = SCREENS.map((s) => s.enter);

/**
 * Runs of adjacent beats that share one source image.
 *
 * A run is scrolled as a single continuous stretch of content: the pan goes
 * from the top of the image at the run's first beat to the bottom at its last,
 * so nothing visibly restarts as the copy changes. Boundaries *between* runs
 * are where the slide transition happens.
 *
 * Index i holds the run containing beat i.
 */
export const SCREEN_RUNS: { start: number; end: number }[] = (() => {
  const runs: { start: number; end: number }[] = [];
  let start = 0;
  for (let i = 0; i < SCREENS.length; i++) {
    const isLast = i === SCREENS.length - 1;
    if (isLast || SCREENS[i + 1].src !== SCREENS[start].src) {
      const run = { start, end: i };
      for (let k = start; k <= i; k++) runs[k] = run;
      start = i + 1;
    }
  }
  return runs;
})();

/** Distinct images to load, and where each beat finds its own. */
export const UNIQUE_SOURCES: string[] = [...new Set(SCREENS.map((s) => s.src))];
export const SOURCE_INDEX: number[] = SCREENS.map((s) => UNIQUE_SOURCES.indexOf(s.src));
