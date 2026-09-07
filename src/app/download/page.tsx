import type { Metadata } from 'next';
import { GeometricPattern } from '@/components/Pattern';
import { PageHero } from '@/components/PageHero';
import { HomeScreen, PhoneFrame } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { StoreBadges } from '@/components/StoreBadges';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Get Deenomics on Android — free, with automatic transaction capture, a Zakat engine, and an AI finance coach. iOS coming soon.',
};

const requirements = [
  { k: 'Android', v: '8.0 (Oreo) and above' },
  { k: 'iOS', v: 'Coming soon' },
  { k: 'Size', v: 'Around 40 MB' },
  { k: 'Price', v: 'Free, with optional Premium' },
];

const permissions = [
  {
    t: 'Notification access',
    d: 'So Deenomics can read the bank and payment alerts that arrive on your phone and turn them into draft transactions. Optional — you can log everything by hand instead.',
  },
  {
    t: 'SMS read access',
    d: 'The same job for banks that still send plain SMS. Messages are parsed on your device and never uploaded.',
  },
  {
    t: 'Microphone',
    d: 'Only while you are speaking to the AI coach or dictating a transaction. Nothing is recorded in the background.',
  },
  {
    t: 'Camera & photos',
    d: 'For attaching a receipt to a transaction or setting your profile picture. Access is requested at the moment you use it.',
  },
];

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="Download"
        title={
          <>
            Get Deenomics on{' '}
            <span className="text-gradient-gold">your phone</span>
          </>
        }
        lede="Free to download, free to use. No card, no trial countdown, and no bank credentials — ever."
      >
        <div className="mt-10 flex justify-center">
          <StoreBadges />
        </div>
      </PageHero>

      {/* ---------------------------------------------- QR + device */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal className="flex justify-center lg:justify-start">
            <PhoneFrame glow={false}>
              <HomeScreen />
            </PhoneFrame>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="What you get"
              title="Everything, from the first launch"
              lede="No feature is locked behind a waiting period. Set your baseline and the app starts working the same day."
            />
            <Reveal delay={120}>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-divider bg-divider sm:grid-cols-2">
                {requirements.map((r) => (
                  <div key={r.k} className="bg-white px-6 py-5">
                    <dt className="text-[0.72rem] font-bold uppercase tracking-widest text-slate-body">{r.k}</dt>
                    <dd className="mt-1.5 text-[1.02rem] font-bold text-ink">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-7 text-[0.95rem] leading-relaxed text-slate-body">
                Not seeing the app in your region yet? Email{' '}
                <a href={`mailto:${site.email}`} className="font-bold text-emerald-brand underline decoration-emerald-brand/30 underline-offset-4 hover:decoration-emerald-brand">
                  {site.email}
                </a>{' '}
                and we will tell you the moment it lands.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Permissions */}
      <section className="relative overflow-hidden bg-emerald-ink py-24 sm:py-28">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Before you install"
            title="Every permission, and exactly why"
            lede="Deenomics asks for four things. Each is optional, each is requested at the moment it is needed, and none of them send your messages anywhere."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {permissions.map((p, i) => (
              <Reveal key={p.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-[1.08rem] font-extrabold text-white">{p.t}</h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-white/55">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <p className="mt-12 text-center text-[0.92rem] text-white/45">
              Read the full{' '}
              <a href="/privacy" className="font-bold text-gold-light underline decoration-gold/40 underline-offset-4 hover:text-white">
                Privacy Policy
              </a>{' '}
              for how each of these is handled.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
