import type { ReactNode } from 'react';

/**
 * A full-bleed band with a centred container.
 *
 * Sections mostly do *not* change colour. The page holds one ground tone and
 * separates its parts with hairline rules and whitespace instead — an
 * alternating light/dark stripe down a long page reads as a series of
 * unrelated pages stapled together, where a continuous ground with rules
 * reads as one document. `plinth` and `dark` are for the two or three moments
 * that genuinely want to sit apart.
 *
 * `tone` also locally redefines the ink, border and accent tokens, so every
 * child can keep using `var(--ink)` and land the right colour without knowing
 * which band it is in. That is why nothing below takes an `inverted` prop.
 *
 * `--accent-on` is the text colour that goes *on top of* `--accent`. It has to
 * travel with the accent, because the pairing is what carries contrast: white
 * on emerald passes AA, white on the bright green does not.
 */
export type Tone = 'default' | 'plinth' | 'white' | 'dark';

const TONES: Record<Tone, string> = {
  default: 'bg-[var(--surface)]',
  plinth: 'bg-[var(--surface-plinth)]',
  white: 'bg-[var(--surface-card)]',
  // Near-black. The bright green becomes the accent here — the deep emerald
  // is nearly invisible on it — and takes dark text in return.
  dark:
    'bg-[var(--surface-dark)] [--ink:#ffffff] [--ink-secondary:rgba(255,255,255,0.62)] ' +
    '[--ink-tertiary:rgba(255,255,255,0.42)] [--border:rgba(255,255,255,0.14)] ' +
    '[--border-strong:rgba(255,255,255,0.24)] [--surface-card:rgba(255,255,255,0.055)] ' +
    '[--surface-plinth:rgba(255,255,255,0.055)] [--accent:#19cc50] ' +
    '[--accent-hover:#3ad96b] [--accent-on:#06210f] [--shadow-card:none]',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  /** Draws a hairline along the top edge — the page's main section divider. */
  divider?: boolean;
  /** Extra classes on the band itself. */
  className?: string;
  /** Extra classes on the inner container. */
  innerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  tone = 'default',
  divider = false,
  className = '',
  innerClassName = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${TONES[tone]} text-[var(--ink-secondary)] py-20 sm:py-28 ${
        divider ? 'border-t border-[var(--border)]' : ''
      } ${className}`}
    >
      <div className={`mx-auto w-full max-w-6xl px-6 ${innerClassName}`}>{children}</div>
    </section>
  );
}
