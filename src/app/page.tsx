// import { PhoneShowcase } from '@/components/showcase/PhoneShowcase';
import { Nav } from '@/components/Nav';
import { StickyStack } from '@/components/StickyStack';
import { Hero } from '@/components/sections/Hero';
import { AICoach } from '@/components/sections/AICoach';
import { FinancialHealthSpotlight } from '@/components/sections/FinancialHealthSpotlight';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--surface)] text-[var(--text-primary)]">
        <Hero />
        <AICoach />
        {/* Scroll tour is commented out, not removed — the pinned multi-beat
            system in components/showcase still works, just isn't mounted.
            This static spotlight replaces it as the single "big feature"
            moment on the page. */}
        {/* <PhoneShowcase /> */}
        {/* How It Works slides up over the spotlight the same way FAQ slides
            up over Pricing below — see the comment on that StickyStack for
            why this needs to be JS-driven rather than plain `sticky top-0`. */}
        <StickyStack>
          <FinancialHealthSpotlight />
        </StickyStack>
        <div className="relative z-10 rounded-t-[3rem] bg-[var(--surface)] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]">
          <HowItWorks />
        </div>

        {/* The page's one sticky-stack moment: Pricing holds once it has been
            scrolled through, then FAQ slides up over it like a card being
            dealt — the rounded top edge and upward shadow below sell the
            overlap. See StickyStack for why this can't be a CSS-only
            `sticky top-0`. */}
        <StickyStack>
          <Pricing />
        </StickyStack>
        <div className="relative z-10 rounded-t-[3rem] bg-[var(--surface)] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
