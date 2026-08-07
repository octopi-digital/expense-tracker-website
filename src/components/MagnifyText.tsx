'use client';

import { useEffect, useRef } from 'react';

const MAGNIFY_RADIUS_PX = 140;
const MAGNIFY_MAX_SCALE = 1.35;

/**
 * Dock-style magnify: characters near the cursor scale up, falling off
 * smoothly with distance — the same idea as macOS Dock icon magnification,
 * applied to text. Splits `text` into per-word, per-character spans (words
 * stay `nowrap` so a word never splits mid-magnify across a line break) and
 * drives each character's `transform` directly off pointer position (both
 * x and y — y matters once the headline wraps, otherwise a line directly
 * above/below the cursor would magnify too) via a single rAF-throttled
 * listener on the container.
 *
 * Cheap enough for a short headline; would need virtualization for a
 * paragraph of body copy.
 */
export function MagnifyText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;

    let frame: number | null = null;

    const applyScale = (pointer: { x: number; y: number } | null) => {
      charRefs.current.forEach((el) => {
        if (!el) return;
        if (pointer === null) {
          el.style.transform = '';
          return;
        }
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(pointer.x - centerX, pointer.y - centerY);
        const falloff = Math.max(0, 1 - distance / MAGNIFY_RADIUS_PX);
        const eased = falloff * falloff;
        const scale = 1 + eased * (MAGNIFY_MAX_SCALE - 1);
        el.style.transform = scale > 1.01 ? `scale(${scale.toFixed(3)})` : '';
      });
    };

    const handleMove = (e: PointerEvent) => {
      if (frame !== null) return;
      const x = e.clientX;
      const y = e.clientY;
      frame = requestAnimationFrame(() => {
        applyScale({ x, y });
        frame = null;
      });
    };

    const handleLeave = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      applyScale(null);
    };

    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerleave', handleLeave);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      container.removeEventListener('pointermove', handleMove);
      container.removeEventListener('pointerleave', handleLeave);
    };
  }, [text]);

  let charIndex = 0;
  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`select-none ${className}`} style={{ cursor: 'default' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char) => {
            const i = charIndex++;
            return (
              <span
                key={i}
                ref={(el) => {
                  charRefs.current[i] = el;
                }}
                className="magnify-char inline-block"
              >
                {char}
              </span>
            );
          })}
        </span>
      )).reduce((acc: React.ReactNode[], node, i) => {
        if (i > 0) acc.push(' ');
        acc.push(node);
        return acc;
      }, [])}
    </span>
  );
}
