import Link from 'next/link';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Eyebrow } from '@/components/SectionHeading';
import { features, type Feature } from '@/lib/site';

/**
 * The six pillars as an editorial index rather than a card grid: a sticky
 * section heading beside a numbered list, with hairlines instead of boxes.
 * Typography and the accent rule carry the structure, so the section stays
 * scannable without competing with the phone mockups further down the page.
 */

const accents: Record<Feature['accent'], { hex: string; tint: string; icon: string }> = {
  /* Bright variants: these sit on the dark world, where the original
     light-background hexes fell to ~3:1. */
  green: { hex: '#3FE07E', tint: 'rgba(25,204,80,0.10)', icon: 'from-emerald-brand to-green-bright' },
  gold: { hex: '#F2C660', tint: 'rgba(215,162,37,0.12)', icon: 'from-gold-deep to-gold' },
  blue: { hex: '#7FB4FF', tint: 'rgba(46,125,247,0.10)', icon: 'from-[#1E5FC4] to-savings' },
  lavender: { hex: '#A9A4FF', tint: 'rgba(101,95,238,0.10)', icon: 'from-[#3C2FA8] to-lavender' },
  orange: { hex: '#FFB74D', tint: 'rgba(240,157,5,0.11)', icon: 'from-[#B87503] to-expense' },
};

const icons: Record<string, React.ReactNode> = {
  capture: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.6V18h16V7.6l-8 5.3-8-5.3Z" />,
  zakat: <path d="M12 2 3 6v6c0 5 3.8 8.9 9 10 5.2-1.1 9-5 9-10V6l-9-4Zm0 5.4 1.4 3.1 3.4.4-2.5 2.3.7 3.3-3-1.7-3 1.7.7-3.3-2.5-2.3 3.4-.4L12 7.4Z" />,
  'ai-coach': <path d="M12 2.5 13.9 8.1 19.5 10 13.9 11.9 12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5ZM18.7 15.4l.9 2.6 2.4.9-2.4.9-.9 2.7-1-2.7-2.3-.9 2.3-.9 1-2.6ZM5 14.5l.7 2 1.8.7-1.8.7-.7 2-.7-2-1.8-.7 1.8-.7.7-2Z" />,
  goals: <path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Zm0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6Zm9.3-3.3-3.6.5-.5 3.6-2.6 2.6a2 2 0 1 0 1.4 1.4l2.6-2.6 3.6-.5.5-3.6-1.4-1.4Z" />,
  wealth: <path d="M4 20h16v2H4v-2Zm1-9h3v8H5v-8Zm5.5-5h3v13h-3V6ZM16 9h3v10h-3V9ZM3.4 6.6 9 3.4l4.5 2.6L21 2v2.5l-7.4 3.9L9 5.8 3.4 9V6.6Z" />,
  guide: <path d="M6 2h11a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v14.2c.3-.1.7-.2 1-.2h10V4H6Zm3 3h8v2H9V7Zm0 4h8v2H9v-2Z" />,
};

function Row({
  feature,
  index,
  linked,
}: {
  feature: Feature;
  index: number;
  linked: boolean;
}) {
  const accent = accents[feature.accent];

  const inner = (
    <div
      className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-t border-divider py-8 transition-colors duration-300 sm:gap-x-8 sm:py-9 lg:grid-cols-[auto_1fr_auto] lg:items-center"
      style={{ ['--accent' as string]: accent.hex, ['--tint' as string]: accent.tint }}
    >
      {/* Accent wash and left rule, both revealed on hover. The wash is a
          pane of glass rather than a flat tint, so a row lights up in the
          same material as the cards elsewhere on the page — the index keeps
          its hairline layout at rest and only becomes a surface under the
          cursor. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-1.25rem] inset-y-0 -z-10 rounded-2xl bg-[color:var(--tint)] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_16px_36px_-18px_rgba(2,18,10,0.5)] ring-1 ring-inset ring-white/20 transition-opacity group-hover:backdrop-blur-md duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-5 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-[color:var(--accent)] transition-all duration-300 group-hover:h-[60%]"
      />

      {/* The index number is the anchor of the whole layout. */}
      <span className="select-none self-start text-[2.4rem] font-extrabold leading-none tracking-tight text-ink/38 tabular-nums transition-colors duration-300 group-hover:text-[color:var(--accent)] sm:text-[3rem] lg:self-center">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0 pr-16 lg:pr-0">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
          {feature.eyebrow}
        </p>
        <h3 className="mt-2.5 text-pretty text-[1.4rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.6rem]">
          {feature.title}
        </h3>
        <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-slate-body">{feature.blurb}</p>
        <ul className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          {feature.tags.map((tag, t) => (
            <li key={tag} className="flex items-center gap-2.5 text-[0.82rem] font-semibold text-ink/60">
              {t > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/20" /> : null}
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Icon tile, and the affordance when the row is a link. */}
      {/* On narrow screens the tile is pinned to the row's top-right rather
          than flowing after the tags, where it read as a stray square. */}
      <div className="absolute right-0 top-8 flex items-center gap-4 sm:top-9 lg:static lg:col-start-3 lg:flex-col-reverse lg:gap-3">
        <span
          className={`btn-gloss grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${accent.icon} shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-12px_rgba(15,23,42,0.55)] transition-transform duration-300 group-hover:scale-105`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
            {icons[feature.slug]}
          </svg>
        </span>
        {linked ? (
          <span className="hidden items-center gap-1.5 text-[0.78rem] font-bold text-[color:var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex">
            Read more
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13m-5-6 6 6-6 6" />
            </svg>
          </span>
        ) : null}
      </div>
    </div>
  );

  return (
    <Reveal as="li" delay={index * 70} className="list-none">
      {linked ? (
        <Link href={`/features#${feature.slug}`} className="block">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </Reveal>
  );
}

export function FeatureIndex({
  withIntro = true,
  linked = true,
}: {
  withIntro?: boolean;
  /** Rows link to /features#slug — on the features page itself that anchor
      is on the same page, making the index a jump list. */
  linked?: boolean;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      {/* A masthead across the full measure rather than a column beside the
          list: six rows are far taller than an eyebrow, a heading and a
          button, so a side column could only ever leave dead space under it. */}
      {withIntro ? (
        <Reveal className="mb-4 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <Eyebrow>Everything in one app</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.5rem]">
              Six things most finance apps{' '}
              <span className="text-gradient-green">leave out</span>
            </h2>
            <p className="mt-5 text-pretty text-[1.02rem] leading-relaxed text-slate-body">
              Deenomics was built for people who need their money tracked and their obligations
              met — not one or the other.
            </p>
          </div>

          <Button href="/features" variant="primary" size="md" className="shrink-0 self-start lg:self-end">
            Explore every feature
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13m-5-6 6 6-6 6" />
            </svg>
          </Button>
        </Reveal>
      ) : null}

      <ol className="border-b border-divider">
        {features.map((feature, i) => (
          <Row key={feature.slug} feature={feature} index={i} linked={linked} />
        ))}
      </ol>
    </div>
  );
}
