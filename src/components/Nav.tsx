'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { app } from '@/lib/brand';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#sms', label: 'Auto-capture' },
  { href: '#guidance', label: 'Guides' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  // The bar sits borderless and transparent over the hero, then condenses
  // once the page moves — a static bar reads the same at the top and 3000px
  // down, which is what makes a header feel like chrome instead of design.
  const [scrolled, setScrolled] = useState(false);
  // Hidden while scrolling down past the hero, shown again the moment the
  // user scrolls back up — so the bar doesn't eat screen space while reading
  // down the page, but is never more than one upward flick away.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  // The six section links had nowhere to go below `md` — they were simply
  // `hidden`, so a phone visitor had no way to jump to Pricing or FAQ short
  // of scrolling past everything. This opens them in a full-screen sheet
  // instead of trying to fit them in the bar.
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Closing on route-hash navigation: each link is an in-page `#anchor`, and
  // without this the sheet would still be covering the section it just
  // jumped to.
  const closeMenu = () => setMenuOpen(false);

  // Lock page scroll while the sheet is open — otherwise the page behind it
  // keeps scrolling under a touch swipe, which reads as broken.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    // A Fragment, not a single root: the mobile sheet below used to be a
    // child of `<header>`, and when the menu opened the header picked up
    // `backdrop-blur-xl`. A `backdrop-filter` establishes a new containing
    // block for `position: fixed` descendants — the same way `transform` or
    // `filter` do — so the sheet's `top-16 bottom-0` stopped resolving
    // against the viewport and started resolving against the header's own
    // auto-height box instead, collapsing it to one link's height. Hoisting
    // the sheet out to be a sibling of `<header>` removes the shared
    // containing block entirely.
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter,transform] duration-300 ease-[var(--ease-out-soft)] ${
          scrolled || menuOpen
            ? 'border-[var(--border)] bg-[var(--surface)]/80 shadow-[0_1px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        } ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={closeMenu}>
          <Image
            src="/islamic-expense-tracker-icon.png"
            alt={app.name}
            width={32}
            height={32}
            className="shrink-0 rounded-xl"
          />
          {/* `whitespace-nowrap` + `truncate`: at narrow widths this used to
              wrap onto a second line and push the header taller than the
              CTA button next to it. It shrinking to an ellipsis instead of
              wrapping is the right trade — the icon alone is still a
              recognisable mark. */}
          <span className="truncate whitespace-nowrap text-base font-semibold text-[var(--text-primary)] sm:text-lg">
            {app.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#download"
            onClick={closeMenu}
            className="lift whitespace-nowrap rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-[0_6px_18px_-8px_var(--accent)] hover:shadow-[0_10px_22px_-8px_var(--accent)] sm:px-5 sm:text-sm"
          >
            Get the app
          </a>

          {/* Burger / close toggle, `md` and below only. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      </header>

      {/* Full-screen sheet rather than a short dropdown: six links plus the
          CTA is more than a small anchored panel comfortably holds, and a
          sheet gives each link a large, thumb-friendly tap target. A sibling
          of `<header>`, not a child of it — see the containing-block note
          above. */}
      <nav
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col gap-1 overflow-y-auto bg-[var(--surface)] px-6 pt-4 pb-10 transition-opacity duration-200 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="rounded-2xl px-4 py-4 text-base font-medium text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
