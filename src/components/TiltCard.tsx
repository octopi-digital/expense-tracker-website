'use client';

import { useRef } from 'react';

const MAX_TILT_DEG = 8;

/**
 * Wraps a phone mockup with a pointer-follow 3D tilt. Reads the cursor
 * position off the wrapper's own bounding rect on each pointermove and
 * writes it straight to CSS vars (no React state) so the tilt tracks at
 * pointer-move frequency without triggering re-renders. Mouse only —
 * touch has no hover concept and would just leave the card stuck mid-tilt
 * after the last tap position.
 */
export function TiltCard({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * MAX_TILT_DEG * 2;
    const ry = (px - 0.5) * MAX_TILT_DEG * 2;
    e.currentTarget.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-rx', '0deg');
    e.currentTarget.style.setProperty('--tilt-ry', '0deg');
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
