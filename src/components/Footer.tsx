import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { StoreBadges } from '@/components/StoreBadges';
import { GeometricPattern } from '@/components/Pattern';
import { site } from '@/lib/site';

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/zakat', label: 'Zakat & Sadaqah' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/download', label: 'Download' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/support', label: 'Support' },
      { href: '/support#contact', label: 'Contact us' },
      { href: '/support#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/data-deletion', label: 'Delete your data' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pane-night text-white">
      {/* The footer usually follows a section painted emerald-ink. Starting on
          that exact colour and easing down to emerald-night removes the hard
          step where the two met, and is invisible on the pages whose last
          section is light. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-ink to-transparent"
      />
      <GeometricPattern
        className="mask-fade-top pointer-events-none absolute inset-0 h-full w-full"
        opacity={0.07}
        stroke="#FADB8A"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        {/* A deliberate divider. The sections now share a colour at the join,
            so without this the two dark blocks ran together into one
            featureless expanse — this marks where the footer begins without
            reinstating a full-bleed edge. */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

        <div className="grid gap-12 pt-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-white/55">
              Manage your wealth the way your deen asks you to — with your Zakat calculated,
              your spending understood, and guidance whenever you need it.
            </p>
            <StoreBadges className="mt-7" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-light/80">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* One row, three parts. The credit used to sit on its own line below
            the legal row, which left the middle of that row empty and the
            credit orphaned under it — with two hairline stubs either side that
            read as debris rather than ornament. A three-column grid centres it
            properly regardless of how wide the outer two run. */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4 text-sm text-white/45 sm:grid sm:grid-cols-3 sm:gap-6">
            <p className="sm:justify-self-start">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>

            <p className="sm:justify-self-center">
              Developed by{' '}
              {site.builderUrl ? (
                <a
                  href={site.builderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold-light hover:decoration-gold-light/50"
                >
                  {site.builder}
                </a>
              ) : (
                <span className="font-semibold text-white/75">{site.builder}</span>
              )}
            </p>

            <p className="sm:justify-self-end">
              Questions?{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-gold-light transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
