import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SETUP, SETUP_STEPS } from '@/content/onboarding';

/**
 * The real sign-up flow, as five steps on a track.
 *
 * Two designs ago this was a pinned, scroll-driven tour. One design ago it was
 * five device screenshots in a scrolling strip. Both spent a great deal of the
 * page saying "signing up is easy" — and five near-identical form screenshots
 * is the least interesting thing a phone can show. The claim is that it takes
 * two minutes; five short lines prove that better than five pictures of
 * fields.
 *
 * Why a track rather than the ruled columns this used to be: by the time the
 * reader arrives here they have passed Zakat's points, AutoCapture's steps,
 * the coach's points, Guidance and the feature grid — every one of them a
 * hairline rule above a title above grey body copy. Correct individually, but
 * six of them in a row means no section looks like anything except the last
 * one, and the page stops having a shape. A step *sequence* is also the one
 * thing here that genuinely is ordered, so drawing the order is information
 * rather than ornament: the rule connects the markers instead of capping each
 * column, and the eye reads five stops on a short path — which is the claim
 * the section is making.
 *
 * The track is masked to fade at both ends. It spans the full width because
 * running it exactly between the first and last marker centres means knowing
 * the column width, which is a media query's business, not a component's; a
 * fade reads as deliberate where two dangling stubs read as a mistake.
 */
export function Setup() {
  return (
    <Section id="setup" divider>
      <SectionHeading title={SETUP.title} lede={SETUP.lede} />

      <div className="relative mt-14">
        {/* Sits behind the markers, which carry the ground colour and so cut
            it. Outside the <ol> on purpose — an ol may only contain li. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[15px] hidden h-px bg-[var(--border)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:block"
        />

        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {SETUP_STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 70} className="relative">
              <span
                aria-hidden
                className="relative z-10 flex h-[31px] w-[31px] items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] font-mono text-[11px] text-[var(--ink-secondary)]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[15px] text-[var(--ink)]">{step.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
