import Image from 'next/image';

/**
 * A cropped phone window — top bezel only, no bottom edge — that fogs its
 * screenshot into the surrounding surface near the bottom instead of showing
 * a full phone outline. For feature cards where the screenshot should feel
 * like it trails off the card rather than being a complete device shot.
 */
/**
 * Two properties this gradient has to satisfy at once.
 *
 * It must be effectively invisible well before the element's bottom edge.
 * Several of the cards that use this component size themselves to the
 * device and clip it, so the element's bottom edge is also a card's bottom
 * edge. A ramp still carrying 6% alpha when it arrives there paints a faint
 * grey band ending in a dead-straight line — the exact artefact this mask
 * exists to prevent. By 93% the tail is at 4% and by 96% it is 1%, which on
 * any surface is under one perceptible step.
 *
 * And it must ease rather than ramp linearly. A straight two-stop fade has a
 * first-derivative kink where it flattens out, and the eye reads that as a
 * horizontal edge (Mach banding) even though the alpha is continuous through
 * it. Hence the long tail of closely-spaced stops approximating an ease-out
 * curve rather than three or four evenly spread ones — each earlier attempt
 * with fewer stops left a visible line exactly where the slope changed.
 */
const FADE =
  'linear-gradient(to bottom, black 38%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.72) 63%, rgba(0,0,0,0.58) 69%, rgba(0,0,0,0.42) 75%, rgba(0,0,0,0.28) 80%, rgba(0,0,0,0.17) 85%, rgba(0,0,0,0.09) 89%, rgba(0,0,0,0.04) 93%, rgba(0,0,0,0.012) 96%, rgba(0,0,0,0) 99%)';

export function PhoneWindow({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/17] w-full overflow-hidden rounded-t-[1.75rem] border-x-[6px] border-t-[6px] border-[var(--text-primary)]/90 ${className}`}
      /* `mask-size: 100% 100%` (with `no-repeat`, since a stretched mask
         must not tile) pins the gradient to the full border box. Without it
         the mask isn't laid out over a guaranteed height and the stop
         percentages in FADE don't mean what they read as — the original
         `transparent 98%` version was still around half-opaque by the time
         the element ended. */
      style={{
        maskImage: FADE,
        WebkitMaskImage: FADE,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 320px, 60vw"
        className="object-cover object-top"
      />
    </div>
  );
}
