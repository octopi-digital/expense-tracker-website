'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Shot } from '@/content/shots';

/**
 * A video that costs nothing until someone asks for it.
 *
 * The two clips this site can show are 2.1 MB and 4.0 MB. Autoplaying either
 * — or even letting the browser preload metadata for both — would multiply
 * the weight of the whole page several times over for something most readers
 * will never press. So: a `next/image` poster and a play button, and the
 * `<video>` element is not mounted at all until the button is pressed.
 *
 * Mounting on click rather than calling `.play()` on a hidden element is
 * deliberate. `preload="none"` is only a hint, and browsers ignore it often
 * enough that the file gets fetched anyway; an element that does not exist
 * cannot fetch anything. `autoPlay` on the freshly-mounted element is what
 * makes the click still start playback in one gesture.
 */
interface VideoPlayerProps {
  src: string;
  poster: Shot;
  /** Describes the clip for people who cannot see it play. */
  label: string;
  className?: string;
  sizes?: string;
}

export function VideoPlayer({
  src,
  poster,
  label,
  className = '',
  sizes = '(max-width: 640px) 70vw, 260px',
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`relative overflow-hidden rounded-[26px] border border-[var(--border)] bg-black shadow-[var(--shadow-device)] ${className}`}
    >
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          aria-label={label}
          className="block h-auto w-full"
          width={poster.width}
          height={poster.height}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group block w-full cursor-pointer"
          aria-label={`Play video: ${label}`}
        >
          <Image
            src={poster.src}
            alt=""
            width={poster.width}
            height={poster.height}
            sizes={sizes}
            className="block h-auto w-full"
          />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-[rgba(6,17,10,0.28)] transition-colors duration-200 group-hover:bg-[rgba(6,17,10,0.14)]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:scale-105">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="#0e1a13" aria-hidden>
                <path d="M21 10.27a2 2 0 0 1 0 3.46L3 24V0z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
