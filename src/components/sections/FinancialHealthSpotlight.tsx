'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { SCREENS } from '@/lib/screens';

const SpotlightCanvas = dynamic(
  () => import('@/components/spotlight/SpotlightCanvas').then((m) => m.SpotlightCanvas),
  { ssr: false }
);

const HEALTH = SCREENS.find((s) => s.id === 'health')!;
const SCREEN_SRC = '/screens/derived/health-score-frame.webp';
const SCREEN_ASPECT = 390 / 844;

export function FinancialHealthSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
          {HEALTH.eyebrow}
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
          {HEALTH.title}
        </h2>
        <p className="mt-4 max-w-xl text-[var(--text-secondary)]">{HEALTH.body}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal delay={120} className="flex flex-row justify-center gap-4 lg:flex-col lg:items-end">
          {HEALTH.flank!.slice(0, 2).map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </Reveal>

        <div className="relative h-[480px] w-full max-w-md justify-self-center sm:h-[620px]">
          {/* Same bloom as the hero, so the two device moments are lit alike. */}
          <div
            aria-hidden
            className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-60"
          />
          <div
            className="relative h-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black 68%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 68%, transparent 96%)',
            }}
          >
            <SpotlightCanvas src={SCREEN_SRC} aspect={SCREEN_ASPECT} active={inView} scale={1.35} />
          </div>
        </div>

        <Reveal delay={200} className="flex flex-row justify-center gap-4 lg:flex-col lg:items-start">
          {HEALTH.flank!.slice(2, 4).map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card rounded-2xl px-5 py-4 text-center lg:text-left">
      <p className="text-2xl font-semibold text-[var(--accent)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}
