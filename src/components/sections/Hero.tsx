import { HeroMouseGlow } from '@/components/HeroMouseGlow';
import { HeroPhoneStage } from '@/components/HeroPhoneStage';
import { MagnifyText } from '@/components/MagnifyText';
import { Reveal } from '@/components/Reveal';
import { HERO_COPY } from '@/lib/screens';

export function Hero() {
  return (
    // `overflow-x-clip`, not `overflow-hidden`: the mouse glow is a circle
    // wider and taller than this section by design, and clipping the y axis
    // is what put a hard straight edge across it at the section boundary.
    // The x axis still clips so the phone stage's bloom (max-w-[130%]) can't
    // widen the page.
    <section className="relative overflow-x-clip">
      <HeroMouseGlow />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-16 text-center sm:pt-24">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-card)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {HERO_COPY.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={80} variant="zoom">
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] text-[var(--text-primary)] sm:text-6xl">
            <MagnifyText text={HERO_COPY.title} />
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-base text-[var(--text-secondary)] sm:text-lg">
            {HERO_COPY.body}
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#download"
            className="lift rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_var(--accent)] hover:shadow-[0_14px_30px_-10px_var(--accent)]"
          >
            Get the app
          </a>
          <a
            href="#how-it-works"
            className="lift text-sm font-semibold text-[var(--text-primary)] underline decoration-[var(--border)] decoration-2 underline-offset-4 hover:decoration-[var(--accent)]"
          >
            See how it works
          </a>
        </Reveal>

        <HeroPhoneStage />
      </div>
    </section>
  );
}
