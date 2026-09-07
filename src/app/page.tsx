import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Zakat } from '@/components/sections/Zakat';
import { AutoCapture } from '@/components/sections/AutoCapture';
import { AICoach } from '@/components/sections/AICoach';
import { Guidance } from '@/components/sections/Guidance';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Setup } from '@/components/sections/Setup';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { DownloadCta } from '@/components/sections/DownloadCta';

/**
 * A flat list of sections, in argument order.
 *
 * Sections are separated by a hairline rule and whitespace, not by a colour
 * change. Only two of them leave the common ground: Zakat, which is the
 * differentiator, and the AI coach, which is the one dark band. Everything
 * else shares the same #f3f3f3 page — an alternating stripe down a long page
 * reads as unrelated pages stapled together.
 *
 * The sequence, and what each is for:
 *
 *   Hero          what it is, and four checkable facts
 *   Features      the two core screens                    (2 screenshots)
 *   Zakat         the one thing no other tracker does     (1) · white
 *   AutoCapture   why keeping it current costs nothing    (1)
 *   AICoach       the part that reads your books for you  (1 video) · dark
 *   Guidance      why this app rather than a generic one  (0)
 *   FeatureGrid   everything else                         (0)
 *   Setup         it takes two minutes                    (0)
 *   Pricing       what it costs
 *   FAQ           the objections, answered
 *   DownloadCta   where every button on the page leads
 *
 * Six pieces of product imagery on the whole page, down from eighteen. The
 * count is the point: when every section carries a device, none of them mean
 * anything, and the page becomes a scroll through a photo album of one app.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Zakat />
        <AutoCapture />
        <AICoach />
        <Guidance />
        <FeatureGrid />
        <Setup />
        <Pricing />
        <FAQ />
        <DownloadCta />
      </main>
      <Footer />
    </>
  );
}
