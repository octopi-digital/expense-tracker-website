import { Button } from '@/components/Button';
import { GeometricPattern, Ornament } from '@/components/Pattern';
import { Reveal } from '@/components/Reveal';

export function CtaBand({
  title = 'Start managing your wealth the halal way',
  lede = 'Free to download. No bank credentials, no ads in the way, no spreadsheets. Just a clear view of your money and your obligations.',
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-emerald-ink pt-24 pb-16 sm:pt-32 sm:pb-20">
      <GeometricPattern
        className="mask-fade-bottom pointer-events-none absolute inset-0 h-full w-full"
        opacity={0.09}
        stroke="#FADB8A"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(25,204,80,0.18), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Ornament />
          <h2 className="mt-8 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-white/60">{lede}</p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/download" variant="gold" size="lg">
              Download Deenomics
            </Button>
            <Button href="/features" variant="outline" size="lg">
              Explore the features
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
