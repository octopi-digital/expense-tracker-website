import { PhoneWindow } from '@/components/PhoneWindow';
import { Reveal } from '@/components/Reveal';

/**
 * The "everything else" section — a bento rather than a uniform grid.
 *
 * The first version of this was six identical cards in a 3-column grid, each
 * with a full `PhoneFrame` shrunk to 200px. Three problems, all of which this
 * layout is built to avoid:
 *
 *  1. Six equal cards read as a spec sheet, not a product page — nothing in
 *     the composition says which of these features actually matters.
 *  2. `PhoneFrame` draws a hard 6px `--text-primary` outline. One of those is
 *     a device; six of them tiled is a grid of black rectangles, and in the
 *     light theme it's the heaviest thing on the page by a wide margin.
 *  3. It used a bare `border + bg` instead of `.surface-card`, so it was the
 *     one flat section on a page where every other panel is lit, and it had
 *     no `Reveal`, so it was also the one section that didn't animate in.
 *
 * So: two tile sizes instead of one, `PhoneWindow` (top bezel only, fogged
 * into the card at the bottom) instead of a full outline — the same treatment
 * the AI Coach cards already use — and the small tiles carry an icon instead
 * of a screenshot, so the screenshots that *are* here stay special.
 */

/**
 * The two features worth a screenshot. Each takes a full-width banner tile
 * with the device anchored to the bottom edge and bleeding past it.
 *
 * Deliberately only two: a screenshot is the most expensive thing on the page
 * for a reader to parse, so spending four of them here would flatten the
 * hierarchy again — and the remaining features (analysis, currency rates)
 * read perfectly well as text. `side` alternates so the two banners don't
 * mirror each other.
 */
const SHOWCASE = [
  {
    eyebrow: 'Goals',
    title: 'Save toward what actually matters',
    body: 'Set a goal — a wedding, a laptop, an emergency fund — and every dollar you put aside counts toward it automatically, with the progress and the shortfall both in plain sight.',
    src: '/screens/secondary/goals-overview.webp',
    alt: 'Goals overview showing progress toward each savings goal',
    side: 'right' as const,
  },
  {
    eyebrow: 'Secret Vault',
    title: 'Keep sensitive accounts private',
    body: 'A PIN-locked space for the assets and liabilities you don’t want visible at a glance — still counted in your net worth, never on display when someone’s looking over your shoulder.',
    src: '/screens/secondary/secret-vault.webp',
    alt: 'The PIN-locked Secret Vault screen',
    side: 'left' as const,
  },
];

/**
 * Everything that's worth stating but doesn't need a screenshot to land.
 * Icons are inline SVG — the site has no icon dependency and one 24px glyph
 * isn't worth adding one.
 */
const COMPACT = [
  {
    title: 'Spending analysis',
    body: 'A breakdown of where the money actually went, month over month — so a bad habit shows up before it becomes a bad year.',
    icon: (
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M7 15l3.5-4 3 2.5L20 7" />
      </>
    ),
  },
  {
    title: 'Live currency rates',
    body: 'Holding money or assets abroad? Current exchange rates feed straight into your net worth, with no separate lookup.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9.5A3.5 3.5 0 0 0 9.8 11c-.6 1.9 1.3 2.4 2.7 2.9s2.3 1.4 1.6 2.9A3.5 3.5 0 0 1 9 16" />
        <path d="M12 5.5v13" />
      </>
    ),
  },
  {
    title: 'Assets & liabilities',
    body: 'Track what you own and what you owe — property, gold, loans, cards — and log payments against a debt as you clear it.',
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    title: 'Biometric & PIN lock',
    body: 'Open the app with a fingerprint or a PIN, and keep Zakat and vault data behind a second one of their own.',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: 'Notifications that earn it',
    body: 'Budget warnings, goal milestones and Zakat reminders — each one switchable, so you decide what’s worth a buzz.',
    icon: (
      <>
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
  },
  {
    title: 'Real people, when you need them',
    body: 'Live chat, support tickets and a searchable help centre — plus guides that walk through each part of the app.',
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  },
  {
    title: 'Four languages',
    body: 'English, Bangla, Arabic and Urdu across the whole app — not just the menus, the guidance too.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
      </>
    ),
  },
  {
    title: 'Your data stays yours',
    body: 'Export it whenever you like, reset it back to zero, or delete the account outright — no email required to do any of it.',
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            Features
          </p>
          <Reveal variant="zoom">
            <h2 className="max-w-lg text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Everything else it does for you, day to day
            </h2>
          </Reveal>
        </div>
        <p className="max-w-sm text-[var(--text-secondary)]">
          Beyond net worth and spending, Islamic Expense Tracker covers the details of everyday
          financial life that most apps leave out.
        </p>
      </Reveal>

      {/* Full-width banners, device flush with the card's bottom edge.
          `PhoneWindow` fogs its screenshot out between 78% and 98% of its own
          height, so the card has to be tall enough to contain that whole
          gradient — an earlier version pulled the device past the edge with a
          negative margin, which cropped the fade while it was still mostly
          opaque and left the bezel's two side rails ending in a hard line.
          Bottom-aligned with no bleed, the fade instead resolves exactly at
          the card's edge and the device reads as trailing off it. */}
      <div className="flex flex-col gap-6">
        {SHOWCASE.map((feature, index) => (
          <Reveal key={feature.eyebrow} delay={index * 90}>
            <article
              className={`surface-card group flex flex-col overflow-hidden rounded-3xl ${
                feature.side === 'right' ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              <div className="flex flex-1 flex-col justify-center p-8 sm:py-14 sm:pl-12 sm:pr-8">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {feature.eyebrow}
                </p>
                <h3 className="mb-3 max-w-md text-2xl font-semibold leading-snug text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="max-w-md leading-relaxed text-[var(--text-secondary)]">
                  {feature.body}
                </p>
              </div>

              {/* The top padding is load-bearing: the card's height is set by
                  this column, so without it the device is exactly as tall as
                  the card and `overflow-hidden` + `rounded-3xl` shave the
                  corners off its top bezel. The padding is what gives the
                  rounded top edge room to sit inside the card. */}
              <div className="flex w-full shrink-0 items-end px-8 pt-10 sm:w-[32%] sm:px-0 sm:pr-12 sm:pt-14">
                <PhoneWindow
                  src={feature.src}
                  alt={feature.alt}
                  className="mx-auto max-w-[210px] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5"
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COMPACT.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="surface-card flex h-full flex-col gap-4 rounded-3xl p-7">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]"
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
                  {item.icon}
                </svg>
              </span>
              <div>
                <h3 className="mb-1.5 text-base font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
