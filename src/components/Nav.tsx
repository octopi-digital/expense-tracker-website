'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS, SITE, STORE } from '@/content/site';

export function Nav() {
  // The bar sits transparent over the top of the hero, then gains a surface
  // and a hairline once the page moves. A bar that reads the same at the top
  // and 4000px down is chrome; one that responds is design.
  const [scrolled, setScrolled] = useState(false);
  // Six links have nowhere to go below `md`. Rather than cramming them into
  // the bar, they open in a full-screen sheet.
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the sheet is open — otherwise the page behind it
  // keeps moving under a touch swipe, which reads as broken.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    // A Fragment, not a single root. The mobile sheet must be a *sibling* of
    // <header>, not a child: `backdrop-filter` establishes a containing block
    // for `position: fixed` descendants (the same way `transform` and `filter`
    // do), so a sheet nested inside the blurred header stops resolving
    // `top-16 bottom-0` against the viewport and collapses to the header's own
    // auto height. Hoisting it out removes the shared containing block.
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out-soft)] ${
          scrolled
            ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6"
        >
          <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={closeMenu}>
            <Image
              src="/deenomics-icon.png"
              alt=""
              width={30}
              height={30}
              className="rounded-lg"
            />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)]">
              {SITE.name}
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="lift text-[14px] text-[var(--ink-secondary)] hover:text-[var(--ink)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              href={STORE.url ?? '#download'}
              display={false}
              className="hidden sm:inline-flex"
            >
              Get the app
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lift -mr-2 flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] md:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M3 7h18" />
                    <path d="M3 12h18" />
                    <path d="M3 17h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col gap-1 bg-[var(--surface)] px-6 py-8 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-[var(--border)] py-4 text-lg text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
          <Button
            href={STORE.url ?? '#download'}
            size="lg"
            onClick={closeMenu}
            className="mt-6 w-full"
          >
            Get the app
          </Button>
        </div>
      )}
    </>
  );
}
