import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`glass-btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-full py-1.5 pl-3 pr-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] ${
        tone === 'light' ? 'text-gold-light' : 'glass-btn-light text-green-bright'
      }`}
    >
      {/* Light crossing the pill, then a long rest. */}
      <span aria-hidden="true" className="pill-sweep" />
      {/* A lit marker rather than a flat dot: the halo is what stops it
          reading as a bullet point, and the ring makes it read as live. */}
      <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-current shadow-[0_0_7px_currentColor,0_0_2px_currentColor] after:absolute after:inset-0 after:rounded-full after:bg-current after:animate-pulse-ring" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'dark',
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: 'dark' | 'light';
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <Reveal
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-5 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.85rem] ${
          tone === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-pretty text-[1.05rem] leading-relaxed ${
            tone === 'light' ? 'text-white/65' : 'text-slate-body'
          }`}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
