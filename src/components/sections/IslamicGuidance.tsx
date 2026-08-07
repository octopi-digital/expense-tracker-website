import { PhoneWindow } from '@/components/PhoneWindow';
import { Reveal } from '@/components/Reveal';

/**
 * The Islamic guidance library.
 *
 * This is the reason someone picks this app over any other expense tracker,
 * and it previously appeared on the site as a single card in a grid. It gets
 * its own section, and it's the one section keyed to `--accent-gold` rather
 * than the green — the light theme's tokens already reserve gold for
 * "Zakat-flavoured highlights" (see globals.css), so this is spending an
 * accent that exists rather than inventing one.
 *
 * Titles and subtitles are lifted verbatim from the app's own strings —
 * `expense-tracker-app/src/i18n/resources/en/profile.json`, under
 * `islamicGuide.topics` — so the site can't drift from what's actually in
 * the app. If a topic is added or renamed there, mirror it here.
 */
const TOPICS = [
  { title: 'Halal Earnings', body: 'Earn in a lawful and blessed way' },
  { title: 'Riba (Interest)', body: 'Why Riba is forbidden in Islam' },
  { title: 'Zakat & Sadaqah', body: 'Purify your wealth, help others' },
  { title: 'Financial Planning', body: 'Plan your money the Islamic way' },
  { title: 'Islamic Ethics', body: 'Principles for ethical finance' },
  { title: 'Hadith Wisdom', body: 'Wisdom from the Prophet ﷺ' },
  { title: 'Daily Verse', body: 'Quranic guidance for your day' },
  { title: 'Financial Rules', body: 'Simple rules for financial success' },
];

export function IslamicGuidance() {
  return (
    <section id="guidance" className="relative overflow-hidden py-24">
      {/* A warm gold wash instead of the green bloom used elsewhere, so this
          section reads as its own chapter without leaving the palette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] max-w-[140%] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-gold) 14%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent-gold)]">
            Guides
          </p>
          <Reveal variant="zoom">
            <h2 className="text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
              Learn. Understand. Grow with Barakah.
            </h2>
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Most finance apps stop at the numbers. This one also answers the question underneath
            them — whether the way you’re earning, saving and giving sits right.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal delay={100} className="order-2 lg:order-1">
            <PhoneWindow
              src="/screens/secondary/islamic-guides.webp"
              alt="The Islamic guides library inside the app"
              className="mx-auto max-w-[280px]"
            />
          </Reveal>

          <div className="order-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:order-2">
            {TOPICS.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 60}>
                <article className="surface-card flex h-full items-start gap-3.5 rounded-2xl p-5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent-gold)_16%,transparent)] text-[var(--accent-gold)]"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5V6a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 1.5z" />
                      <path d="M8 8h7" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {topic.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {topic.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
