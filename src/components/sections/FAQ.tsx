'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';

const QUESTIONS = [
  {
    q: 'Does Jrfin work offline?',
    a: 'Yes. Jrfin is offline-first — your data lives on your device and syncs when you have a connection, so logging a transaction never has to wait on signal.',
  },
  {
    q: 'How is the financial health score calculated?',
    a: 'From your actual income and spending history — savings rate, spending consistency, debt load and income stability — not a questionnaire. It updates as your real numbers change.',
  },
  {
    q: 'How does the Zakat calculation work?',
    a: 'Jrfin tracks your gold, bank balances, investments and real estate against the Nisab threshold and Hawl period, so your obligation is calculated from what you actually own rather than a manual estimate.',
  },
  {
    q: 'Is my financial data private?',
    a: 'Yes. Sensitive accounts can be moved into the PIN-locked Secret Vault, separate from the rest of the app, and Zakat data sits behind its own PIN too.',
  },
  {
    q: 'What languages does Jrfin support?',
    a: 'Jrfin supports English and Bangla throughout the app today, with more languages on the way.',
  },
  {
    q: 'Is Jrfin available on iOS?',
    a: 'Jrfin is currently Android-only. An iOS version is not available yet.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-sm text-[var(--text-secondary)]">
            See how Jrfin handles the things people ask about most before they start using it.
          </p>
        </Reveal>

        <Reveal delay={120} className="surface-card overflow-hidden rounded-3xl">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={index > 0 ? 'border-t border-[var(--border)]' : ''}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 px-8 py-6 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--text-primary)_3%,transparent)]"
                >
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{item.q}</p>
                    {/* Answers expand rather than pop in. grid-template-rows
                        0fr→1fr is the one way to transition to auto height
                        without measuring the content. */}
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-soft)]"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface)] shadow-sm"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`text-[var(--accent)] transition-transform duration-300 ease-[var(--ease-out-soft)] ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
