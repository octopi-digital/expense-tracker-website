import { PhoneWindow } from '@/components/PhoneWindow';
import { Reveal } from '@/components/Reveal';

/**
 * Bank/MFS SMS auto-capture — the app's biggest differentiator and, until
 * now, the one major feature the site never mentioned.
 *
 * The mechanism is the pitch here, so the left column draws it rather than
 * describing it: a real-shaped SMS turns into a real-shaped transaction row.
 * That's cheaper than a screenshot, scales to any width, and — unlike a
 * capture — stays truthful if the app's inbox UI is restyled.
 *
 * Copy accuracy matters more than usual in this section. Every claim below is
 * checked against `expense-tracker-app/docs/sms-parsing-implementation.md`:
 * the permission is opt-in, only allowlisted senders are ever read, parsing
 * happens on-device first, and **nothing auto-commits** — every message
 * becomes a draft the user confirms. Don't loosen any of those; they're both
 * the privacy story and what Google Play's restricted-permission review
 * expects to see prominently disclosed.
 */

const STEPS = [
  {
    n: '01',
    title: 'Your bank texts you, like always',
    body: 'Your bank or mobile wallet sends the confirmation SMS it already sends today. Nothing changes on their end.',
  },
  {
    n: '02',
    title: 'The app reads just that message',
    body: 'Only texts from an allowlisted bank or wallet sender are ever looked at, and the first parse happens on your device.',
  },
  {
    n: '03',
    title: 'You confirm, and it’s logged',
    body: 'It arrives as a draft in your inbox with the amount and category already filled in. Nothing is saved to your books until you say so.',
  },
];

export function SmsCapture() {
  return (
    <section id="sms" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            Automatic capture
          </p>
          <Reveal variant="zoom">
            <h2 className="max-w-xl text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
              The expenses log themselves
            </h2>
          </Reveal>
        </div>
        <p className="max-w-sm text-[var(--text-secondary)]">
          Most banks won’t open an API to a finance app — but they all send an SMS. Islamic Expense
          Tracker reads those, so the entry is already waiting for you.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          {/* The mechanism, drawn. A message on top, the entry it becomes
              below, and a connector between them carrying the arrow. */}
          <Reveal className="surface-card rounded-3xl p-6 sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              What it sees
            </p>

            <div className="rounded-2xl rounded-bl-md bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)] p-4">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                HSBC
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-[var(--text-secondary)]">
                Payment USD{' '}
                <span className="font-semibold text-[var(--text-primary)]">42.75</span> to CARREFOUR
                successful. Ref 8A2K19PQ. Balance USD 1,847.20.
              </p>
            </div>

            <div aria-hidden className="flex items-center gap-3 py-4">
              <span className="h-px flex-1 bg-[var(--border)]" />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)]"
              >
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              What you get
            </p>

            <div className="flex items-center gap-4 rounded-2xl border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_7%,transparent)] p-4">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-card)] text-[var(--accent)]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M6 6v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  Carrefour
                </p>
                <p className="text-xs text-[var(--text-secondary)]">Groceries · Need · HSBC</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-[var(--text-primary)]">−$42.75</p>
            </div>
          </Reveal>

          <div className="mt-8 flex flex-col gap-6">
            {STEPS.map((step, index) => (
              <Reveal key={step.n} delay={index * 90} className="flex gap-4">
                <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                  {step.n}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={280}
            className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--border)] p-4"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-[var(--text-tertiary)]"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              Android only, and entirely optional — SMS reading is off until you turn it on, and can
              be switched off again at any time. Messages from anyone who isn’t your bank or wallet
              are never read. Prefer to type things in yourself? Everything works exactly the same
              without it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div
            aria-hidden
            className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-50"
          />
          <PhoneWindow
            src="/screens/transaction-inbox.webp"
            alt="Transaction inbox showing drafts captured from bank SMS, waiting to be confirmed"
            className="relative mx-auto max-w-[300px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
