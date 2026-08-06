'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { StarField } from '@/components/StarField';

/**
 * Placeholder tiers — names, prices and feature lists are not final. Swap in
 * real values once pricing is decided; the layout below doesn't need to
 * change. `monthly` is the base number; yearly is computed as a 20% discount
 * for display only.
 */
const TIERS = [
  {
    name: 'Free',
    monthly: 0,
    body: 'Everything you need to start tracking.',
    features: ['Net worth tracking', 'Transaction logging', 'Financial health score', 'One goal'],
    highlighted: false,
  },
  {
    name: 'Plus',
    monthly: 5,
    body: 'For anyone serious about staying on top of it.',
    features: [
      'Everything in Free',
      'Unlimited goals',
      'Zakat & Sadaqah tracking',
      'Secret Vault',
      'Analysis reports',
    ],
    highlighted: true,
  },
  {
    name: 'Family',
    monthly: 9,
    body: 'Shared visibility across a household.',
    features: ['Everything in Plus', 'Shared accounts', 'Priority support'],
    highlighted: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="dot-grid relative w-full overflow-hidden bg-black py-24 text-white">
      <StarField />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
              Pricing
            </p>
            <h2 className="max-w-lg text-3xl font-semibold sm:text-4xl">
              Simple plans, whatever stage you're at
            </h2>
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
                SAVE 20%
              </span>
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TIERS.map((tier, index) => {
            const price = yearly ? Math.round((tier.monthly * 0.8) / 1) : tier.monthly;
            return (
              <Reveal
                key={tier.name}
                delay={index * 110}
                className={`flex flex-col rounded-3xl border p-8 ${
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
                  ${price}
                  <span
                    className={`text-base font-normal ${
                      tier.highlighted ? 'text-black/50' : 'text-white/50'
                    }`}
                  >
                    /mo
                  </span>
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
