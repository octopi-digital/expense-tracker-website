import Image from 'next/image';

/**
 * A cropped phone window — top bezel only, no bottom edge — that fogs its
 * screenshot into the surrounding surface near the bottom instead of showing
 * a full phone outline. For feature cards where the screenshot should feel
 * like it trails off the card rather than being a complete device shot.
 */
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
      style={{
        maskImage: 'linear-gradient(to bottom, black 78%, transparent 98%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 98%)',
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
