import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ_CONTENT, FAQ_ITEMS } from '@/content/faq';

/**
 * Built on <details>/<summary> rather than React state.
 *
 * Three things follow from that and all of them matter here: it opens with
 * JavaScript disabled, every answer is in the DOM for a crawler whether or
 * not it is expanded, and browser find-in-page reveals the section a match
 * is inside. The old version kept answers behind `useState`, so a search for
 * "SMS" found nothing.
 *
 * The chevron rotation lives in globals.css under `.faq-item[open]`, since
 * there is no React state to drive it from.
 */
export function FAQ() {
  return (
    <Section id="faq" divider>
      <SectionHeading title={FAQ_CONTENT.title} lede={FAQ_CONTENT.lede} />

      <div className="mt-12 flex flex-col">
        {FAQ_ITEMS.map((item, index) => (
          <Reveal key={item.q} delay={index * 35}>
            <details
              className="faq-item border-t border-[var(--border)]"
              // The first answer is open so the pattern is obvious without a
              // click, and so the section is never a wall of closed rows.
              open={index === 0}
            >
              <summary className="flex items-start justify-between gap-6 py-5 text-left">
                <h3 className="text-[var(--ink)]">{item.q}</h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--ink-tertiary)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="faq-chevron mt-1 shrink-0"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                {item.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
