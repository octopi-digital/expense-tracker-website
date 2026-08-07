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

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter,transform] duration-300 ease-[var(--ease-out-soft)] ${
        scrolled
          ? 'border-[var(--border)] bg-[var(--surface)]/80 shadow-[0_1px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/islamic-expense-tracker-icon.png" alt={app.name} width={32} height={32} className="rounded-xl" />
          <span className="text-lg font-semibold text-[var(--text-primary)]">{app.name}</span>
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

        <div className="flex items-center gap-3">
          <a
            href="#download"
            className="lift rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_18px_-8px_var(--accent)] hover:shadow-[0_10px_22px_-8px_var(--accent)]"
          >
            Get the app
          </a>
        </div>
      </div>
    </header>
  );
}
