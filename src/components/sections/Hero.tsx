import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';
import { PhoneShot } from '@/components/ui/PhoneShot';
import { Plinth } from '@/components/ui/Plinth';
import { HERO, PROOF_POINTS } from '@/content/hero';
import { STORE } from '@/content/site';

/**
 * Copy left, product right — not a centred stack.
 *
 * A centred hero gives the eye no left margin to return to, and that centred
 * axis then has to be abandoned by every section below it that has two
 * columns. Setting the copy against the product establishes the page's left
 * edge in the first screen and keeps it for the rest of the page.
 */
export function Hero() {
  return (
    <section id="top" className="bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-20 lg:pt-14">
        <div>
          {/* The name is a portmanteau, so it gets decoded once, immediately.
              A coined word above the fold that the reader cannot unpack is
              just an unfamiliar noun; unpacked, it is the whole positioning
              in three words. */}
          <Reveal>
            <p className="mb-6 text-[13px] tracking-[0.02em] text-[var(--ink-tertiary)]">
              <span className="font-medium text-[var(--accent)]">Deen</span>
              <span className="mx-1.5">+</span>
              <span>Economics</span>
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-balance">{HERO.title}</h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-md text-pretty text-[var(--ink-secondary)]">{HERO.body}</p>
          </Reveal>

          <Reveal delay={180} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={STORE.url ?? '#download'} size="lg">
              {HERO.primaryCta}
            </Button>
            <Button href="#features" variant="ghost" size="lg">
              {HERO.secondaryCta}
            </Button>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 text-[13px] text-[var(--ink-tertiary)]">
              Free plan, no card required &middot; {STORE.platform}
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          {/* 508 = 48px of top padding + 460px of device.
              460 is a chosen number, not a cap. Every screenshot here is
              9:19.5, so at this render width the home screen crops at 460
              just below the "Income received" card and above the health
              gauge — clean photo, no bisected element. The other clean band is
              ~345 (below the action row), which is what Features uses. Moving
              this by fifty pixels either way slices a card in half. */}
          <Plinth bleed className="max-h-[508px]">
            <PhoneShot
              shot={HERO.shot}
              sizes="(max-width: 1024px) 72vw, 320px"
              priority
              className="mx-auto max-w-[300px] rounded-b-none"
            />
          </Plinth>

          {/* A UI echo, not a decoration: these are the same figures the Zakat
              screen shows further down the page. It puts the differentiator in
              the first viewport without spending a second screenshot on it.
              Hidden below `lg`, where the columns stack and it would have
              nowhere to hang without pushing the page sideways.

              Straddling the plinth's bottom-left corner, not parked over the
              device's middle — where it was, it cut the "Income received" card
              in half and read as an overlap bug rather than as layering. Out
              here it breaks the slab's edge, which is the point. */}
          <div className="absolute -bottom-6 -left-16 hidden w-[200px] rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-4 shadow-[var(--shadow-float)] lg:block">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--accent-gold)]">
                Zakat 2026
              </p>
              <p className="text-[11px] text-[var(--ink-tertiary)]">38% paid</p>
            </div>
            <p className="mt-1.5 text-[22px] leading-none tracking-[-0.02em] text-[var(--ink)]">
              &#2547;64,625
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_8%,transparent)]">
              <div className="h-full w-[38%] rounded-full bg-[var(--accent-gold)]" />
            </div>
            <p className="mt-2.5 text-[11px] text-[var(--ink-tertiary)]">
              Calculated against Nisab, automatically
            </p>
          </div>
        </Reveal>
      </div>

      {/* Product facts, not social proof — there are no download counts, star
          ratings or testimonials anywhere on this site, because none of them
          would be true yet. Set in a ruled strip so it reads as a spec line
          rather than as four more claims. */}
      <div className="mx-auto max-w-6xl px-6">
        <ul className="grid grid-cols-2 border-t border-[var(--border)] lg:grid-cols-4">
          {PROOF_POINTS.map((point, index) => (
            <Reveal
              as="li"
              key={point.label}
              delay={index * 60}
              className="border-b border-[var(--border)] py-6 pr-6 sm:border-b-0 lg:border-r lg:last:border-r-0 lg:pl-6 lg:first:pl-0"
            >
              <p className="text-[15px] font-medium text-[var(--ink)]">{point.label}</p>
              <p className="mt-1 text-[13px] text-[var(--ink-tertiary)]">{point.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
