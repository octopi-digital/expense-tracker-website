import type { ReactNode } from 'react';
import { GeometricPattern } from '@/components/Pattern';
import { Eyebrow } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

/**
 * The dark emerald band every inner page opens with. It exists as much for
 * the layout as the look: the header floats transparently over the top of
 * each page, so every page needs a dark first screenful to sit under it.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-deep via-emerald-ink to-emerald-night pb-20 pt-36 sm:pb-24 sm:pt-44">
      <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} stroke="#FADB8A" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(25,204,80,0.22), transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {lede ? (
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-relaxed text-white/60">
              {lede}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
