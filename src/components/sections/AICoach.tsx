import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { COACH } from '@/content/coach';

/**
 * The page's one dark band, placed after a long run of grey so it lands as a
 * change of register. `Section tone="dark"` flips the ink, border and accent
 * tokens locally, so nothing below asks for a dark variant.
 *
 * The sample questions carry this section, not a screenshot. An earlier
 * version showed the chat screen, which proved a chat screen exists but never
 * showed what you would actually say to it — and what you can ask is the
 * entire product here. Real text also stays legible at 390px, where a shrunk
 * screenshot of a conversation does not.
 */
export function AICoach() {
  return (
    <Section id="coach" tone="dark">
      <SectionHeading title={COACH.title} lede={COACH.lede} />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <div className="flex flex-col gap-2.5">
            {COACH.asks.map((ask, index) => (
              <Reveal key={ask} delay={index * 80} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[var(--accent)] px-4 py-2.5 text-[15px] text-[var(--accent-on)]">
                  {ask}
                </p>
              </Reveal>
            ))}

            <Reveal delay={300} className="flex justify-start pt-2">
              <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-[color-mix(in_srgb,var(--ink)_12%,transparent)] px-4 py-2.5 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                {COACH.answer}
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {COACH.points.map((point, index) => (
              <Reveal key={point.title} delay={index * 90} className="border-t border-[var(--border)] pt-5">
                <h3 className="text-[var(--ink)]">{point.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="flex flex-col">
          <VideoPlayer
            src={COACH.voice.video}
            poster={COACH.voice.poster}
            label={COACH.voice.title}
            className="mx-auto w-full max-w-[240px]"
          />
          <div className="mt-6 max-w-sm sm:mx-auto sm:text-center lg:mx-0 lg:text-left">
            <h3 className="text-[var(--ink)]">{COACH.voice.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
              {COACH.voice.body}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
