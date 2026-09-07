'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/site';

/**
 * The header floats transparently over the dark hero and turns into a solid
 * white bar once the page scrolls, so it stays readable on the light sections
 * further down without needing a per-page variant.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Don't let the page scroll behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-divider bg-white/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" aria-label="Deenomics home" className="shrink-0">
          <Logo tone={solid ? 'dark' : 'light'} />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                  solid
                    ? active
                      ? 'text-emerald-brand'
                      : 'text-ink/70 hover:text-emerald-brand'
                    : active
                      ? 'text-gold-light'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                {active ? (
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                      solid ? 'bg-emerald-brand' : 'bg-gold-light'
                    }`}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/download"
            className={`hidden rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
              solid
                ? 'bg-emerald-brand text-white shadow-[0_10px_28px_-12px_rgba(16,108,49,0.8)]'
                : 'bg-gradient-to-r from-gold-light to-gold text-emerald-ink shadow-[0_10px_28px_-12px_rgba(215,162,37,0.8)]'
            }`}
          >
            Get the app
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden ${
              solid ? 'border-divider text-ink' : 'border-white/25 text-white'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-divider bg-white lg:hidden">
          <div className="space-y-1 px-5 pb-6 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-green-tint hover:text-emerald-brand"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/download"
              className="mt-3 block rounded-full bg-emerald-brand px-4 py-3.5 text-center text-base font-bold text-white"
            >
              Get the app
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
