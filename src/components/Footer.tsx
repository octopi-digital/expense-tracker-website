import Image from 'next/image';
import { NAV_LINKS, SITE } from '@/content/site';
import { app } from '@/lib/brand';

/**
 * Chrome only. The download call to action is its own section immediately
 * above this one — the footer used to carry `id="download"` and absorb every
 * CTA on the page, which is how "Get the app" came to mean "scroll to the
 * copyright line".
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <div className="mb-4 flex items-center gap-2.5">
            <Image
              src="/deenomics-icon.png"
              alt=""
              width={30}
              height={30}
              className="rounded-lg"
            />
            <span className="font-medium tracking-[-0.01em] text-[var(--ink)]">{SITE.name}</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)]">{SITE.tagline}</p>
          {/* The name decoded a second time, for anyone who arrived partway
              down the page and never saw the hero. */}
          <p className="mt-3 text-[13px] text-[var(--ink-tertiary)]">{app.meaning}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-[13px] text-[var(--ink-tertiary)]">
            On this page
          </p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[14px] text-[var(--ink-secondary)] hover:text-[var(--ink)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-[var(--border)] px-6 py-6 text-xs text-[var(--ink-tertiary)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <div className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-[var(--ink)]">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-[var(--ink)]">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
