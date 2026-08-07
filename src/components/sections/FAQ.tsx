'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';

const QUESTIONS = [
  {
    q: 'Does Islamic Expense Tracker work offline?',
    a: 'Core logging does. Adding a transaction, updating a goal, or recording a Zakat payment is queued on your device and syncs the moment you\'re back online, so a weak signal never blocks an entry. Things like the AI coach and live dashboards still need a connection.',
  },
  {
    q: 'How is the financial health score calculated?',
    a: 'From your actual income and spending history — savings rate, spending consistency, debt load and income stability — not a questionnaire. It updates as your real numbers change.',
  },
  {
    q: 'How does the Zakat calculation work?',
    a: 'Islamic Expense Tracker tracks your gold, bank balances, investments and real estate against the Nisab threshold and Hawl period, so your obligation is calculated from what you actually own rather than a manual estimate.',
  },
  {
    q: 'Why does the app want to read my SMS?',
    a: 'Only to turn your bank and mobile-wallet alerts into transactions for you — most banks offer no open API to a finance app, but they all send a confirmation text. It is off until you switch it on, only messages from allowlisted bank and wallet senders are ever read, and nothing is written to your books until you confirm the draft. Turn it off and everything still works by manual entry. Android only; iOS gives no app access to SMS at all.',
  },
  {
    q: 'Is my financial data private?',
    a: 'Yes. Sensitive accounts can be moved into the PIN-locked Secret Vault, and Zakat data sits behind that same PIN — both kept separate from the rest of the app. You can also lock the whole app behind a fingerprint or PIN.',
  },
  {
    q: 'Can I get my data out, or delete it?',
    a: 'Both. Premium plans can export your data, and any account can be reset back to empty or deleted outright from inside the app — no email to support, no waiting period.',
  },
  {
    q: 'Do I have to pay to use it?',
    a: 'No. The free plan covers net worth tracking, the financial health score, Zakat, up to 3 goals and 5 AI messages a month, with no time limit. Premium lifts the AI and goal caps and adds advanced reports, export and priority support.',
  },
  {
    q: 'What languages does Islamic Expense Tracker support?',
    a: 'Islamic Expense Tracker supports English, Bangla, Arabic and Urdu throughout the app today, with the AI coach\'s voice features rolling out to the newer languages.',
  },
  {
    q: 'Is Islamic Expense Tracker available on iOS?',
    a: 'Islamic Expense Tracker is currently Android-only. An iOS version is not available yet.',
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
          <Reveal variant="zoom">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <p className="mt-4 max-w-sm text-[var(--text-secondary)]">
            See how Islamic Expense Tracker handles the things people ask about most before they start using it.
          </p>
        </Reveal>

        <div className="surface-card overflow-hidden rounded-3xl">
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
                  <Reveal delay={index * 70}>
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
                  </Reveal>
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
        </div>
      </div>
    </section>
  );
}
