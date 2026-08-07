'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { StarField } from '@/components/StarField';
import { TiltCard } from '@/components/TiltCard';

/**
 * Fallback values only — used until `/plans` answers, or if it never does
 * (no `NEXT_PUBLIC_API_URL` configured, or the request fails). Kept in sync
 * by hand with `expense-tracker-server/src/config/plans.ts` as a floor, not
 * a source of truth: two tiers (Free, Premium), priced in BDT. There is no
 * "Plus" or "Family" tier and no USD pricing in the product.
 */
const FALLBACK_TIERS = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    yearly: 0,
    savingsPct: undefined as number | undefined,
    body: 'Everything you need to start tracking.',
    features: ['Net worth tracking', 'Financial health score', 'Up to 3 goals', '5 AI messages / month'],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthly: 299,
    yearly: 2999,
    savingsPct: 16 as number | undefined,
    body: 'For anyone serious about staying on top of it.',
    features: [
      'Everything in Free',
      'Unlimited AI messages',
      'Unlimited goals',
      'Advanced analytics & reports',
      'Data export',
      'Priority support',
    ],
    highlighted: true,
  },
];

type Tier = (typeof FALLBACK_TIERS)[number];

/** Rough BDT→USD display rate, hand-updated occasionally — not a live rate
 * (no public FX endpoint exists; `/currency/rates` requires auth). Display
 * only: the actual charge is always created and settled in BDT (see
 * `expense-tracker-server/src/config/plans.ts` and `sslcommerz.gateway.ts`),
 * per IMPLEMENTATION-PLAN.md decision D6 — "catalogue currency fixed to BDT
 * in v1; display conversion is the client's job." Showing $-only here means
 * the amount a card is actually charged (৳299/mo, converted by the card
 * issuer) will not match this figure exactly — a deliberate tradeoff, not an
 * oversight; keep this rate reasonably current to limit the gap. */
const USD_DISPLAY_RATE = 1 / 122;

interface PlanCatalogueEntry {
  id: string;
  name: string;
  features: { aiMessagesPerMonth: number | null; maxGoals: number | null; export: boolean; advancedAnalytics: boolean };
  prices: { cycle: 'monthly' | 'yearly'; price: { amount: string; currency: string }; savingsPct?: number }[];
}

/** Marketing copy the API doesn't track (body text, ordered feature list) —
 * merged onto whatever numbers `/plans` actually returns, same split used by
 * the app's `ComparePlansScreen`. */
function tiersFromCatalogue(catalogue: PlanCatalogueEntry[]): Tier[] | null {
  const free = catalogue.find((p) => p.id === 'free');
  const premium = catalogue.find((p) => p.id === 'premium');
  if (!free || !premium) return null;

  const premiumMonthly = Number(premium.prices.find((p) => p.cycle === 'monthly')?.price.amount ?? NaN);
  const premiumYearly = premium.prices.find((p) => p.cycle === 'yearly');
  const premiumYearlyAmount = Number(premiumYearly?.price.amount ?? NaN);
  if (!isFinite(premiumMonthly) || !isFinite(premiumYearlyAmount)) return null;

  const freeAiLimit = free.features.aiMessagesPerMonth ?? 5;
  const freeGoalsLimit = free.features.maxGoals ?? 3;

  return [
    {
      id: 'free',
      name: free.name,
      monthly: 0,
      yearly: 0,
      savingsPct: undefined,
      body: 'Everything you need to start tracking.',
      features: [
        'Net worth tracking',
        'Financial health score',
        `Up to ${freeGoalsLimit} goals`,
        `${freeAiLimit} AI messages / month`,
      ],
      highlighted: false,
    },
    {
      id: 'premium',
      name: premium.name,
      monthly: premiumMonthly,
      yearly: premiumYearlyAmount,
      savingsPct: premiumYearly?.savingsPct,
      body: 'For anyone serious about staying on top of it.',
      features: [
        'Everything in Free',
        'Unlimited AI messages',
        'Unlimited goals',
        ...(premium.features.advancedAnalytics ? ['Advanced analytics & reports'] : []),
        ...(premium.features.export ? ['Data export'] : []),
        'Priority support',
      ],
      highlighted: true,
    },
  ];
}

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

  return (
    <section id="pricing" className="dot-grid relative w-full overflow-hidden bg-black py-24 text-white">
      <StarField />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
              Pricing
            </p>
            <Reveal variant="zoom">
              <h2 className="max-w-lg text-3xl font-semibold sm:text-4xl">
                Simple plans, whatever stage you're at
              </h2>
            </Reveal>
          </div>
          <p className="max-w-sm text-white/60">
            Choose the plan that fits how you manage money today.
          </p>
        </Reveal>

        <Reveal delay={80} className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                !yearly ? 'bg-white text-black' : 'text-white/70'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                yearly ? 'bg-white text-black' : 'text-white/70'
              }`}
            >
              Yearly
              <span className="rounded-full bg-[var(--accent-gold)] px-2 py-0.5 text-xs font-bold text-black">
                SAVE {tiers.find((t) => t.id === 'premium')?.savingsPct ?? 16}%
              </span>
            </button>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {tiers.map((tier, index) => {
            const price = yearly ? tier.yearly : tier.monthly;
            return (
              <Reveal key={tier.id} delay={index * 110} className="h-full">
                <TiltCard
                  className={`flex h-full flex-col rounded-3xl border p-8 ${
                    tier.highlighted
                      ? 'border-transparent bg-white text-black shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]'
                      : 'border-white/15 bg-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                  }`}
                >
                  <p
                    className={`mb-2 text-sm font-semibold ${tier.highlighted ? 'text-black' : 'text-white'}`}
                  >
                    {tier.name}
                  </p>
                  <p className="mb-1 text-4xl font-semibold">
                    ${price > 0 ? (price * USD_DISPLAY_RATE).toFixed(2) : '0'}
                    {price > 0 && (
                      <span
                        className={`text-base font-normal ${
                          tier.highlighted ? 'text-black/50' : 'text-white/50'
                        }`}
                      >
                        {yearly ? '/yr' : '/mo'}
                      </span>
                    )}
                  </p>
                  <p className={`mb-6 text-sm ${tier.highlighted ? 'text-black/60' : 'text-white/60'}`}>
                    {tier.body}
                    {yearly && tier.monthly > 0 ? ' Billed yearly.' : ''}
                  </p>

                  <a
                    href="#download"
                    className={`lift mb-6 rounded-full px-5 py-2.5 text-center text-sm font-semibold ${
                      tier.highlighted
                        ? 'bg-black text-white hover:bg-black/85'
                        : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    Get started
                  </a>

                  <ul
                    className={`flex flex-col gap-3 border-t pt-6 text-sm ${
                      tier.highlighted ? 'border-black/10 text-black/70' : 'border-white/10 text-white/70'
                    }`}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span aria-hidden className="text-[var(--accent)]">
                          +
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
