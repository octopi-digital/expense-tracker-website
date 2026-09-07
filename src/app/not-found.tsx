import { Button } from '@/components/Button';
import { GeometricPattern, Ornament } from '@/components/Pattern';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-emerald-deep via-emerald-ink to-emerald-night py-32">
      <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} stroke="#FADB8A" />
      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="text-[5rem] font-extrabold leading-none tracking-tight text-gradient-gold sm:text-[7rem]">404</p>
        <Ornament className="mt-4" />
        <h1 className="mt-8 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          This page is not where you left it
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/60">
          The link may be out of date, or the page may have moved. Everything else is still where it
          should be.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/" variant="gold" size="lg">
            Back to home
          </Button>
          <Button href="/support" variant="outline" size="lg">
            Get help
          </Button>
        </div>
      </div>
    </section>
  );
}
