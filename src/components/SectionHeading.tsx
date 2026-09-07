import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] ${
        tone === 'light'
          ? 'bg-white/10 text-gold-light ring-1 ring-inset ring-white/15'
          : 'bg-green-tint text-emerald-brand ring-1 ring-inset ring-emerald-brand/10'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
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
