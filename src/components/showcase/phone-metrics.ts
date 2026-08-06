/**
 * Measurements of the phone model, in the model's own units.
 *
 * These are not guesses. They come from `scripts/find-screen-rect.mjs`, which
 * groups the model's screen mesh into planar clusters and reports the largest
 * front-facing one in world space. If the .glb is ever replaced, re-run that
 * script and paste the new numbers here rather than eyeballing them.
 *
 *   normal [0, 0, 1]   min [-0.034987, -0.072487, 0.003608]
 *                      max [ 0.034987,  0.072487, 0.003608]
 */
export const PHONE_SCREEN = {
  width: 0.069975,
  height: 0.144975,
  aspect: 0.069975 / 0.144975,
  /** Z of the model's front glass. */
  z: 0.003608,
  /** Nudge forward so the screenshot never z-fights with the glass beneath. */
  lift: 0.00004,
  /** Corner radius as a fraction of screen width, matched to the model's bezel. */
  cornerRadius: 0.085,
} as const;

/**
 * The model ships at roughly 0.145 units tall, which is awkward to light and
 * frame. Scaling the whole rig up front means camera distance, light positions
 * and offsets can all be reasoned about in units of "about one phone height".
 */
export const PHONE_SCALE = 18;
