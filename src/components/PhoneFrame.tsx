import Image from 'next/image';

/**
 * A static phone bezel around a screenshot, for sections that don't need the
 * live 3D model — feature grid, how-it-works, etc. Always crops from the
 * image's top, since every source here is either a single screen or a scroll
 * capture whose top is the meaningful part.
 */
export function PhoneFrame({
  src,
  alt,
  className = '',
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] border-[6px] border-[var(--text-primary)]/90 bg-[var(--surface)] shadow-xl ${className}`}
      style={style}
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
