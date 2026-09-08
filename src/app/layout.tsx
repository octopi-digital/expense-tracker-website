import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Amiri } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { GeometricPattern } from '@/components/Pattern';
import { GlassPointer } from '@/components/GlassPointer';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Islamic Wealth & Expense Tracker`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'Islamic expense tracker',
    'Zakat calculator app',
    'halal budgeting app',
    'Muslim finance app',
    'Sadaqah tracker',
    'Nisab calculator',
    'Islamic financial planning',
  ],
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Islamic Wealth & Expense Tracker`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Islamic Wealth & Expense Tracker`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#106C31',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${amiri.variable}`}>
      <body>
        {/* The fixed backdrop every section is layered over. It carries the
            colour and the ornament; the sections themselves are translucent. */}
        <div className="world" aria-hidden="true">
          <div className="world-streak" />
          <div className="world-streak world-streak-2" />
          <GeometricPattern className="absolute inset-0 h-full w-full" opacity={0.07} stroke="#8FE9AE" />
        </div>

        {/*
          Real refraction. `backdrop-filter` can take an SVG filter, so the
          backdrop is genuinely displaced rather than only blurred — that is
          the difference between frosted glass and a lens with thickness.

          Deliberately only two primitives. The first version ran three
          displacement passes plus three colour matrices plus two blends —
          nine primitives, re-evaluated over the backdrop of every glass
          element on the page (26 of them on the home page), and it was the
          single most expensive thing on the site. The prismatic fringing it
          bought is already carried by the CSS rim gradient on `.glass::after`,
          so the filter now does one job: bend the backdrop. numOctaves is 1
          for the same reason — the second octave cost real time and was
          invisible under a 10px blur.

          Only Chromium applies url() in backdrop-filter, so every rule using
          it sits behind an @supports test.
        */}
        <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0" focusable="false">
          <defs>
            <filter id="lg-refract" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.010" numOctaves="1" seed="7" result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale="18" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald-brand focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <GlassPointer />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
