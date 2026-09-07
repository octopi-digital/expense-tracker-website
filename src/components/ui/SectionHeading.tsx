import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

/**
 * Heading left, supporting line right, on one row.
 *
 * The centred stack of eyebrow + headline + lede is the default every
 * template ships, and it reads as one because it wastes the horizontal axis:
 * a centred paragraph under a centred heading gives the eye no fixed left
 * margin to return to. Setting the heading against a right-hand lede uses the
 * full measure, gives the section a hard left edge shared with everything
 * below it, and reads as editorial rather than as a slide.
 *
 * `align="center"` remains for the closing call to action, which is the one
 * place on the page with nothing to sit beside.
 */
interface SectionHeadingProps {
  title: ReactNode;
  lede?: ReactNode;
  align?: 'split' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  lede,
  align = 'split',
  className = '',
}: SectionHeadingProps) {
  if (align === 'center') {
    return (
      <div className={`mx-auto max-w-2xl text-center ${className}`}>
        <Reveal>
          <h2 className="text-balance">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={70}>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-[var(--ink-secondary)]">{lede}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16 ${className}`}
    >
      <Reveal className="md:max-w-xl">
        <h2 className="text-balance">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={70} className="md:max-w-xs md:shrink-0">
          <p className="text-pretty text-[15px] text-[var(--ink-secondary)] md:text-right">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
