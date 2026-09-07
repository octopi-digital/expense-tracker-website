import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPACT_FEATURES, GRID, type IconKey } from '@/content/grid';

/**
 * Inline SVG rather than an icon package — eleven 18px glyphs are not worth a
 * dependency. Keyed so the content files stay pure data and can be translated
 * without touching markup.
 *
 * All of them share a 24px viewBox, `fill: none` and a single stroke weight,
 * applied once by the <svg> below. Drawing them at different weights is what
 * makes a hand-rolled icon set look hand-rolled.
 */
const ICONS: Record<IconKey, React.ReactNode> = {
  goal: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  vault: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  spending: (
    <>
      <path d="M3 7h18v12H3z" />
      <path d="M3 11h18" />
    </>
  ),
  analysis: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 15l3.5-4 3 2.5L20 7" />
    </>
  ),
  currency: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5A3.5 3.5 0 0 0 9.8 11c-.6 1.9 1.3 2.4 2.7 2.9s2.3 1.4 1.6 2.9A3.5 3.5 0 0 1 9 16" />
      <path d="M12 5.5v13" />
    </>
  ),
  balance: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 4v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

/**
 * Eleven features, no cards and no screenshots.
 *
 * The previous version boxed each of these in a bordered, shadowed panel and
 * gave two of them a device. Eleven panels read as a component gallery, and
 * the two screenshots did nothing their sentence had not already done — while
 * making the four screenshots that *are* load-bearing count for less. What is
 * left is the icon, the title on one line with it, and two lines of body.
 */
export function FeatureGrid() {
  return (
    <Section id="more" divider>
      <SectionHeading title={GRID.title} lede={GRID.lede} />

      <ul className="mt-14 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {COMPACT_FEATURES.map((feature, index) => (
          <Reveal
            as="li"
            key={feature.title}
            delay={(index % 3) * 60}
            className="border-t border-[var(--border)] py-7"
          >
            <div className="flex items-center gap-2.5">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="shrink-0"
              >
                {ICONS[feature.icon]}
              </svg>
              <h3 className="text-[15px] text-[var(--ink)]">{feature.title}</h3>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
              {feature.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
