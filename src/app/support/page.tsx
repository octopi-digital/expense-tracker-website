import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { CtaBand } from '@/components/CtaBand';
import { FaqAccordion } from '@/components/FaqAccordion';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { faqs, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with Deenomics — frequently asked questions, in-app live chat and tickets, and a direct line to the team.',
};

const channels = [
  {
    t: 'In-app live chat',
    d: 'The fastest route. Profile → Help & Support → Live Chat. Premium messages are answered first.',
    i: 'M12 3c5 0 9 3.4 9 7.6 0 4.2-4 7.6-9 7.6-.9 0-1.7-.1-2.5-.3L4 21l1.3-3.6C3.9 16 3 13.4 3 10.6 3 6.4 7 3 12 3Z',
  },
  {
    t: 'Submit a ticket',
    d: 'For anything that needs a look at your account. Track the reply under Profile → My Tickets.',
    i: 'M4 4h16a1 1 0 0 1 1 1v5a2.5 2.5 0 0 0 0 5v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a2.5 2.5 0 0 0 0-5V5a1 1 0 0 1 1-1Z',
  },
  {
    t: 'Email us',
    d: `Write to ${site.email} and we reply within one business day.`,
    i: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.6V18h16V7.6l-8 5.3-8-5.3Z',
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title={
          <>
            We are{' '}
            <span className="text-gradient-gold">here</span> when you need us
          </>
        }
        lede="Most answers are below. If yours is not, three ways to reach a person who can help."
      />

      <section className="overflow-hidden pane py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.t} delay={i * 90}>
                {/* Chip and heading share a row: the icon used to float alone
                    above a gap, and a solid saturated tile was the only opaque
                    thing on an otherwise translucent card. */}
                <div className="glass glass-hover h-full rounded-3xl p-7">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-green-bright/[0.18] text-green-bright ring-1 ring-inset ring-green-bright/35">
                      <svg viewBox="0 0 24 24" className="h-[1.35rem] w-[1.35rem]" fill="currentColor">
                        <path d={c.i} />
                      </svg>
                    </span>
                    <h3 className="text-[1.12rem] font-extrabold leading-tight tracking-tight text-ink">
                      {c.t}
                    </h3>
                  </div>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-slate-body">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- FAQ */}
      <section id="faq" className="scroll-mt-24 overflow-hidden pane-tint py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <Reveal delay={100} className="mt-12">
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- Contact */}
      <section id="contact" className="scroll-mt-24 overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Send us a message"
              lede="Tell us what you are running into and we will get back to you within one business day."
            />
            <Reveal delay={120}>
              <dl className="mt-9 space-y-5 text-[0.95rem]">
                <div>
                  <dt className="font-bold text-ink">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Response time</dt>
                  <dd className="mt-1 text-slate-body">Within one business day. Premium tickets are prioritised.</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Account deletion</dt>
                  <dd className="mt-1 text-slate-body">
                    See{' '}
                    <Link href="/data-deletion" className="text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright">
                      how to delete your data
                    </Link>
                    .
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Or just try the app"
        lede="Most questions answer themselves in the first two minutes of using it."
      />
    </>
  );
}
