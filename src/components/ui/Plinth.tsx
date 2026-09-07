import type { ReactNode } from 'react';

/**
 * The grey slab product imagery sits on.
 *
 * Every screenshot on this page is mounted rather than floated. A screen
 * dropped straight onto the page background has to carry its own shadow to
 * separate, and a page full of shadowed rectangles is the look this design is
 * specifically avoiding. A plinth separates by tone instead, costs nothing,
 * and gives the device somewhere to be cropped against.
 *
 * It does two things beyond being grey, and both matter more than they sound:
 *
 * **It is lit.** A soft highlight falls from the top, so the slab reads as a
 * surface rather than a flat rectangle of #e7e7e5.
 *
 * **`bleed` drops the bottom padding**, so a device taller than the plinth is
 * cut by its edge and reads as continuing below the slab.
 *
 * That cut is deliberately *hard*. An earlier version faded it out with a
 * scrim in the plinth's colour, on the theory that a soft edge makes any crop
 * point look intentional. On a photographic screen it does the opposite: the
 * home screenshot's landscape and the white card beneath it turn to a grey
 * smear with a ghost of the card floating in it, which looks like a rendering
 * fault rather than a design.
 *
 * A hard edge is only ugly when it bisects a distinct element — half a card,
 * a clipped button row. The fix is therefore not to soften the cut but to
 * *put it somewhere*: every screenshot on this page is 9:19.5, so at a shared
 * render width they all crop at the same rendered y, and there are two bands
 * where both hero screens cut through plain background. See the heights in
 * Hero.tsx and Features.tsx — those numbers are chosen, not arbitrary.
 */
interface PlinthProps {
  /** Crops the mounted content against the bottom edge, fading it out. */
  bleed?: boolean;
  className?: string;
  children: ReactNode;
}

export function Plinth({ bleed = false, className = '', children }: PlinthProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] bg-[var(--surface-plinth)] ring-1 ring-inset ring-[rgba(17,18,17,0.04)] ${
        bleed ? 'px-8 pt-10 sm:px-10 sm:pt-12' : 'p-8 sm:p-10'
      } ${className}`}
    >
      {/* Behind everything: texture, then the light, then the floor. */}
      <div aria-hidden className="plinth-motif pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_55%_70%_at_50%_0%,rgba(255,255,255,0.85),transparent_75%)]"
      />
      {/* And a floor. The highlight alone lights the top and leaves the slab
          reading as flat below it; a faint darkening toward the bottom gives
          the surface somewhere to recede to, and gives the device's shadow
          something to fall onto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(to_top,rgba(17,18,17,0.05),transparent)]"
      />

      <div className="relative">{children}</div>
    </div>
  );
}
