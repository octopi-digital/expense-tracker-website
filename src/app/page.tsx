// import { PhoneShowcase } from '@/components/showcase/PhoneShowcase';
import { Nav } from '@/components/Nav';
import { StickyStack } from '@/components/StickyStack';
import { Hero } from '@/components/sections/Hero';
import { AICoach } from '@/components/sections/AICoach';
import { SmsCapture } from '@/components/sections/SmsCapture';
import { FinancialHealthSpotlight } from '@/components/sections/FinancialHealthSpotlight';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { IslamicGuidance } from '@/components/sections/IslamicGuidance';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
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
        {/* Auto-capture sits right after the AI coach: both are "the app does
            the work for you" claims, and this one is the concrete proof of
            the other's premise — it's how the app has real numbers to coach
            from without the user typing every entry. */}
        <SmsCapture />
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
        {/* Everything between the two StickyStacks has to live inside this
            one opaque, z-raised sheet. The spotlight above stays pinned for
            the whole height of its containing block, so any sibling after it
            without its own background paints *over nothing* and lets the
            pinned phone show straight through. Adding a section here means
            adding it inside this div, not after it. */}
        <div className="relative z-10 rounded-t-[3rem] bg-[var(--surface)] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]">
          <HowItWorks />
          {/* Guidance before the feature grid, not after: it's the strongest
              reason to choose this app specifically, so it gets a clean
              section of its own before the page drops into "and here's
              everything else" mode. */}
          <IslamicGuidance />
          <FeatureGrid />
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
