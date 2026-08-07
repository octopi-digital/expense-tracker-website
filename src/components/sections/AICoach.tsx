import { PhoneWindow } from '@/components/PhoneWindow';
import { Reveal } from '@/components/Reveal';

/**
 * The AI coach.
 *
 * The previous version was two equal cards, each an eyebrow over a screenshot
 * over a caption — which showed that a chat screen exists but never showed
 * what you'd actually *say* to it. The questions are the product here, so
 * they're set as real chat bubbles in HTML rather than left inside a
 * screenshot where they're too small to read.
 *
 * Voice gets a full-width banner underneath rather than an equal half. It's
 * a second way into the same coach, not a second feature, and giving it half
 * the section implied a parity that flattened both.
 */

/** Real questions, phrased the way someone would actually type them. */
const ASKS = [
  'How much did I spend on food this month?',
  'Can I afford a $1,200 laptop right now?',
  'Why did my health score drop?',
];

const REPLY =
  'You’re at $312 on food — about 18% above your usual. Most of it is delivery on weekdays.';

export function AICoach() {
  return (
    <section id="ai-coach" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            AI Coach
          </p>
          <Reveal variant="zoom">
            <h2 className="max-w-lg text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Your money, coached — not just tracked
            </h2>
          </Reveal>
        </div>
        <p className="max-w-sm text-[var(--text-secondary)]">
          It already knows your numbers, so you can skip the setup and just ask. No menus, no
          reports to build, no spreadsheet.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Reveal className="surface-card rounded-3xl p-6 sm:p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Things people actually ask it
            </p>

            <div className="flex flex-col gap-3">
              {ASKS.map((ask, index) => (
                <Reveal key={ask} delay={index * 90} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white">
                    {ask}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={320} className="flex justify-start pt-2">
                <div className="flex max-w-[90%] gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                    </svg>
                  </span>
                  <p className="rounded-2xl rounded-bl-md bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)] px-4 py-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {REPLY}
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-1.5 text-base font-semibold text-[var(--text-primary)]">
                Answers from your books
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Not general advice — it reads your own income, spending and goals before it
                replies.
              </p>
            </div>
            <div>
              <h3 className="mb-1.5 text-base font-semibold text-[var(--text-primary)]">
                It speaks up first
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                When a category starts creeping up or a goal falls behind, you hear about it
                before month end.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <PhoneWindow
            src="/screens/secondary/ai-chat.webp"
            alt="Chatting with the AI coach about this month's spending"
            className="mx-auto max-w-[290px]"
          />
        </Reveal>
      </div>

      {/* Voice as a banner, not a twin card — same shape the feature banners
          use further down the page, so the two read as one system. */}
      <Reveal delay={80} className="mt-6">
        <article className="surface-card group flex flex-col overflow-hidden rounded-3xl sm:flex-row">
          <div className="flex flex-1 flex-col justify-center p-8 sm:py-14 sm:pl-12 sm:pr-8">
            <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Voice call
            </p>
            <h3 className="mb-3 max-w-md text-2xl font-semibold leading-snug text-[var(--text-primary)]">
              Or don’t type at all — just call it
            </h3>
            <p className="max-w-md leading-relaxed text-[var(--text-secondary)]">
              Ring the coach like you would a person and talk it through out loud. It listens,
              answers back, and can log the expense for you while you’re still on the call — useful
              when your hands are full and a receipt is about to be forgotten.
            </p>
          </div>

          <div className="flex w-full shrink-0 items-end px-8 pt-10 sm:w-[32%] sm:px-0 sm:pr-12 sm:pt-14">
            <PhoneWindow
              src="/screens/secondary/ai-voice-call.webp"
              alt="A live voice call with the AI coach"
              className="mx-auto max-w-[210px] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5"
            />
          </div>
        </article>
      </Reveal>
    </section>
  );
}
