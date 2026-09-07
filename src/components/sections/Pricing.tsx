'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { FALLBACK_TIERS, PRICING, type Tier } from '@/content/pricing';
import { tiersFromCatalogue, USD_DISPLAY_RATE, type PlanCatalogueEntry } from '@/lib/plans';
import { STORE } from '@/content/site';

/**
 * Two tiers, priced from the live catalogue when it answers and from
 * `FALLBACK_TIERS` when it does not.
 *
 * The fetch is deliberately non-blocking and non-critical: the section
 * renders the fallback immediately, and a failed or absent API just leaves
 * that showing. A pricing section that renders nothing until a request
 * resolves is worse than one showing numbers a week stale.
 */
export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [tiers, setTiers] = useState<Tier[]>(FALLBACK_TIERS);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    const controller = new AbortController();
    fetch(`${apiUrl}/plans`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((body: { data: PlanCatalogueEntry[] }) => {
        const next = tiersFromCatalogue(body.data);
        if (next) setTiers(next);
      })
      .catch(() => {
        // Non-critical — keep the fallback tiers already showing.
      });

    return () => controller.abort();
  }, []);

  const savings = tiers.find((tier) => tier.id === 'premium')?.savingsPct ?? 16;

  return (
    <Section id="pricing" divider>
      <SectionHeading title={PRICING.title} lede={PRICING.lede} />

      <Reveal delay={80} className="mt-12 flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex rounded-full border border-[var(--border)] p-1"
        >
          <button
            type="button"
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
            className={`lift rounded-full px-5 py-2 text-sm font-medium ${
              !yearly
                ? 'bg-[var(--ink)] text-[var(--surface)]'
                : 'text-[var(--ink-secondary)]'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
            className={`lift flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium ${
              yearly
                ? 'bg-[var(--ink)] text-[var(--surface)]'
                : 'text-[var(--ink-secondary)]'
            }`}
          >
            Yearly
            <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]">
              Save {savings}%
            </span>
          </button>
        </div>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        {tiers.map((tier, index) => {
          const price = yearly ? tier.yearly : tier.monthly;

          return (
            <Reveal key={tier.id} delay={index * 100} className="h-full">
              <div
                // The recommended tier separates by tonal step (white panel on
                // the grey ground) plus a stronger hairline — not by a shadow.
                // Depth on this page comes from tone, and a drop shadow here
                // would be a second, competing system; see globals.css.
                className={`flex h-full flex-col rounded-[20px] border p-8 ${
                  tier.highlighted
                    ? 'border-[var(--border-strong)] bg-[var(--surface-card)]'
                    : 'border-[var(--border)] bg-transparent'
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--ink)]">{tier.name}</p>
                  {tier.highlighted && (
                    <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]">
                      Most popular
                    </span>
                  )}
                </div>

                {/* BDT is the headline figure because BDT is what is actually
                    charged: the catalogue currency is fixed to BDT in v1 and the
                    charge is created and settled in BDT (server `config/plans.ts`,
                    `sslcommerz.gateway.ts`, IMPLEMENTATION-PLAN decision D6).
                    Leading in USD — as this did — quotes a number no card
                    statement will ever match. The USD line stays as a secondary
                    approximation, explicitly marked ≈, for the international
                    reader who needs a sense of scale. */}
                <p className="text-[2.5rem] font-normal leading-none tracking-[-0.03em] text-[var(--ink)]">
                  &#2547;{price.toLocaleString('en-US')}
                  {price > 0 && (
                    <span className="text-base font-normal text-[var(--ink-tertiary)]">
                      {yearly ? '/yr' : '/mo'}
                    </span>
                  )}
                </p>

                {/* Rendered even when empty so both cards' body copy sits on the
                    same baseline — a conditional line here makes the Free card's
                    text ride up and the two cards stop reading as a pair. */}
                <p className="mt-2 min-h-[1.25rem] text-[13px] text-[var(--ink-tertiary)]">
                  {price > 0 ? `\u2248 $${(price * USD_DISPLAY_RATE).toFixed(2)}` : ''}
                </p>

                <p className="mb-7 mt-4 text-sm text-[var(--ink-secondary)]">
                  {tier.body}
                  {yearly && tier.monthly > 0 ? ' Billed yearly.' : ''}
                </p>

                <Button
                  href={STORE.url ?? '#download'}
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  className="mb-7 w-full"
                >
                  Get started
                </Button>

                <ul className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--ink-secondary)]">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                        className="mt-0.5 shrink-0"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
