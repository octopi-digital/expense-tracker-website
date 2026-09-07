import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GUIDANCE } from '@/content/guidance';

/**
 * The Islamic guides library. Topic names are the app's own strings, so a
 * reader who installs finds the same words inside.
 *
 * No screenshot. The eight topic names *are* the picture — a device showing a
 * list of eight rows next to the same eight rows set as text is the same
 * information twice, at the cost of a full column.
 *
 * Set as an index rather than as a grid of cells. Two reasons, and the second
 * is the load-bearing one:
 *
 * 1. It is what the content actually is. These eight are a library's contents,
 *    and a contents page is the oldest and clearest way to say "there is a
 *    body of material here" — which is the claim. Four columns of short
 *    fragments said "here are eight small things" instead.
 * 2. Rhythm. Every neighbouring section on this page is a ruled grid of
 *    title-over-body cells, and by the sixth one none of them registers as
 *    its own section. Full-bleed rows break that run without leaving the
 *    page's one ground or introducing a second accent — the form changes,
 *    the system does not.
 *
 * Deliberately *not* given the gold accent, tempting as it is for the Deen
 * half of the name. Gold is Zakat's, and Zakat is the differentiator; a second
 * gold section costs the first one its signal for no gain here.
 */
export function Guidance() {
  return (
    <Section id="guidance" divider>
      <SectionHeading title={GUIDANCE.title} lede={GUIDANCE.lede} />

      <ul className="mt-14 border-t border-[var(--border)]">
        {GUIDANCE.topics.map((topic, index) => (
          <Reveal
            as="li"
            key={topic.title}
            delay={index * 40}
            className="grid grid-cols-1 gap-x-10 gap-y-1 border-b border-[var(--border)] py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-baseline sm:py-[1.375rem]"
          >
            <h3 className="text-[16px] text-[var(--ink)]">{topic.title}</h3>
            <p className="text-[15px] text-[var(--ink-secondary)]">{topic.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
