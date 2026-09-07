import type { Metadata } from 'next';
import { CtaBand } from '@/components/CtaBand';
import { FeatureIndex } from '@/components/FeatureIndex';
import { PageHero } from '@/components/PageHero';
import { AiScreen, HomeScreen, InboxScreen, PhoneFrame, ZakatScreen } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { Eyebrow } from '@/components/SectionHeading';
import { features } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Automatic transaction capture, a Zakat engine, an AI coach that knows your numbers, goals from Hajj to your first home, and the Islamic finance guide — everything Deenomics does, in detail.',
};

/** Each deep-dive section is paired with the screen it best illustrates. */
const screenFor: Record<string, React.ReactNode> = {
  capture: <InboxScreen />,
  zakat: <ZakatScreen />,
  'ai-coach': <AiScreen />,
  goals: <HomeScreen />,
  wealth: <HomeScreen />,
  guide: <AiScreen />,
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Every part of your money,{' '}
            <span className="text-gradient-gold">accounted for</span>
          </>
        }
        lede="Six pillars, one app. Tracking that runs itself, obligations that calculate themselves, and guidance you can actually ask questions of."
      />

      <section className="bg-[#FAFBFB] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FeatureIndex withIntro={false} />
        </div>
      </section>

      {features.map((feature, i) => {
        const flipped = i % 2 === 1;
        const dark = i % 2 === 1;
        return (
          <section
            key={feature.slug}
            id={feature.slug}
            className={`scroll-mt-24 overflow-hidden py-24 sm:py-28 ${
              dark ? 'bg-emerald-ink' : 'bg-white'
            }`}
          >
            <div
              className={`mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 ${
                flipped ? '' : ''
              }`}
            >
              <div className={flipped ? 'lg:order-2' : ''}>
                <Reveal>
                  <Eyebrow tone={dark ? 'light' : 'dark'}>{feature.eyebrow}</Eyebrow>
                  <h2
                    className={`mt-5 text-balance text-3xl font-extrabold leading-[1.14] tracking-tight sm:text-4xl ${
                      dark ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {feature.title}
                  </h2>
                  <p
                    className={`mt-5 text-pretty text-[1.05rem] leading-relaxed ${
                      dark ? 'text-white/60' : 'text-slate-body'
                    }`}
                  >
                    {feature.detail}
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <ul className="mt-8 space-y-4">
                    {feature.points.map((point) => (
                      <li key={point} className="flex gap-3.5">
                        <span
                          className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            dark ? 'bg-gold/20 text-gold-light' : 'bg-green-tint text-emerald-brand'
                          }`}
                        >
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12.5 9.5 18 20 6.5" />
                          </svg>
                        </span>
                        <span className={`text-[0.98rem] leading-relaxed ${dark ? 'text-white/80' : 'text-ink/85'}`}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal
                delay={100}
                className={`flex justify-center ${flipped ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}
              >
                <PhoneFrame glow={dark}>{screenFor[feature.slug]}</PhoneFrame>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CtaBand
        title="See it working on your own numbers"
        lede="Download Deenomics, connect nothing, and watch your first week of spending organise itself."
      />
    </>
  );
}
