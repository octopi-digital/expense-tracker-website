import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhoneShot } from '@/components/ui/PhoneShot';
import { Plinth } from '@/components/ui/Plinth';
import { SMS } from '@/content/sms';

/**
 * Auto-capture from bank SMS.
 *
 * The three steps are also the privacy answer, which is why they are steps
 * and not a bullet list: "let an app read my texts" is this product's biggest
 * objection, and each step narrows what is actually being asked for — one
 * sender allowlist, one on-device parse, one confirmation. Compressing them
 * into "reads your SMS automatically" loses the whole argument.
 *
 * The caveats are stated plainly under them rather than buried in the FAQ. A
 * reader who finds a limitation themselves trusts the page less than one who
 * was told.
 */
export function AutoCapture() {
  return (
    <Section id="auto-capture" divider>
      <SectionHeading title={SMS.title} lede={SMS.lede} />

      <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <ol>
          {SMS.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 80}
              className="flex gap-5 border-t border-[var(--border)] py-6"
            >
              <span
                aria-hidden
                className="mt-0.5 shrink-0 font-mono text-[13px] text-[var(--ink-tertiary)]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[var(--ink)]">{step.title}</h3>
                <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={240} className="border-t border-[var(--border)] pt-6">
            <p className="max-w-md text-[13px] leading-relaxed text-[var(--ink-tertiary)]">
              {SMS.note}
            </p>
          </Reveal>
        </ol>

        <Reveal delay={140}>
          <Plinth bleed className="max-h-[440px]">
            <PhoneShot
              shot={SMS.shot}
              sizes="(max-width: 1024px) 65vw, 250px"
              className="mx-auto max-w-[240px] rounded-b-none"
            />
          </Plinth>
        </Reveal>
      </div>
    </Section>
  );
}
