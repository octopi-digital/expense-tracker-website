import Image from 'next/image';
import type { Shot } from '@/content/shots';

/**
 * A screenshot presented as a device, without a device. There is no bezel or
 * notch drawn around it — the capture already contains the app's own status
 * bar and rounded corners, so a painted frame on top reads as a picture of a
 * phone rather than as the product.
 *
 * It does carry a shadow, and it is the only thing on the page that carries a
 * real one. Cards separate by tone alone, because a page of shadowed
 * rectangles is the look this design avoids — but a screenshot with only a
 * hairline sits in the same plane as the slab under it and reads as a decal
 * printed on the grey. The device is the object; the plinth is the surface.
 *
 * `bleed` crops the bottom of the screen against its container, so the device
 * runs off the edge of whatever it sits in rather than floating complete in
 * the middle of it. That is what stops product imagery reading as a sticker.
 */
interface PhoneShotProps {
  shot: Shot;
  sizes?: string;
  /** Only the hero's screenshot should set this. */
  priority?: boolean;
  className?: string;
}

export function PhoneShot({
  shot,
  sizes = '(max-width: 640px) 70vw, 320px',
  priority = false,
  className = '',
}: PhoneShotProps) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full rounded-[22px] border border-[var(--border)] bg-white shadow-[var(--shadow-device)] ${className}`}
    />
  );
}
