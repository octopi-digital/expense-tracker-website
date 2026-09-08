'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/site';

/**
 * The header floats transparently over the dark hero and turns into a pane
 * of glass once the page scrolls, so it stays readable on the light sections
 * further down without needing a per-page variant. The glass is doing real
 * work here rather than decoration: the content scrolling beneath it stays
 * visible as colour and movement, which is what tells you the bar is a layer
 * over the page rather than part of it.
 */
/** The edge that is being dragged away from hangs on this much longer. */
const LEAD_MS = 260;
const TRAIL_MS = 620;
/** Leaves promptly. */
const LEAD_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Holds, then gives way all at once — the "fails to stay" part. */
const TRAIL_EASE = 'cubic-bezier(0.85, 0.02, 0.30, 1)';

/**
 * The brand's eight-point star, reduced to a mark. Same construction as the
 * <GeometricPattern> ornament — two squares, one turned 45° — so the menu is
 * built from the site's own geometry rather than a generic dot or underline.
 */
function StarMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" />
      <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The lens rests on the current page and follows the pointer while it is
  // over the menu. `null` means there is nothing to point at — an inner page
  // like /privacy has no nav entry, so the lens stays hidden until hover.
  const railRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  // Two edges rather than left+width: they are transitioned separately so the
  // lens can stretch. See `measure` for why that matters.
  const [lens, setLens] = useState<
    { left: number; right: number; leftDur: number; rightDur: number } | null
  >(null);
  // Suppresses the slide on the very first placement, so the lens does not
  // fly in from the left edge on load.
  const [settled, setSettled] = useState(false);

  const activeHref = navLinks.some((l) => l.href === pathname) ? pathname : null;
  const lensTarget = hovered ?? activeHref;

  // Direction must only be decided when the target actually changes. The
  // ResizeObserver and the font-ready callback also call measure(), and
  // recomputing direction there compared a position against itself, flipped
  // the durations mid-flight, and collapsed the lens to zero width.
  const lastTarget = useRef<string | null>(null);
  // The item the lens is currently tearing away from, and which way it is
  // being pulled. Cleared once the trailing edge has let go.
  const [tearing, setTearing] = useState<{ href: string; dir: number } | null>(null);
  const tearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measure = useCallback(() => {
    const rail = railRef.current;
    // With no target the lens keeps its last position and fades out there,
    // rather than unmounting and snapping back on the next hover.
    if (!rail || !lensTarget) return;
    const el = rail.querySelector<HTMLElement>(`[data-nav="${lensTarget}"]`);
    if (!el) return;

    const left = el.offsetLeft;
    const right = rail.clientWidth - (el.offsetLeft + el.offsetWidth);
    const prevTarget = lastTarget.current;
    const targetChanged = prevTarget !== lensTarget;
    lastTarget.current = lensTarget;

    const prevEl = prevTarget
      ? rail.querySelector<HTMLElement>(`[data-nav="${prevTarget}"]`)
      : null;
    const movingRight = prevEl ? left > prevEl.offsetLeft : true;

    if (targetChanged && prevEl) {
      const dir = movingRight ? 1 : -1;
      if (tearTimer.current) clearTimeout(tearTimer.current);
      setTearing({ href: prevTarget as string, dir });
      tearTimer.current = setTimeout(() => setTearing(null), TRAIL_MS);
    }

    setLens((prev) => {
      // A re-measure of the same item: reposition, keep the current curves.
      if (!targetChanged && prev) return { ...prev, left, right };

      // The trailing edge is the one being dragged away from. Giving it a
      // longer, back-loaded curve makes it hang on to where it was while the
      // leading edge has already gone — the lens stretches, resists, then
      // loses its grip and snaps back into shape.
      return {
        left,
        right,
        leftDur: movingRight ? TRAIL_MS : LEAD_MS,
        rightDur: movingRight ? LEAD_MS : TRAIL_MS,
      };
    });
  }, [lensTarget]);

  useEffect(() => {
    measure();
    const rail = railRef.current;
    if (!rail) return;
    // Label widths change when the web font swaps in and when the viewport
    // resizes, and the lens is positioned from those widths.
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => () => {
    if (tearTimer.current) clearTimeout(tearTimer.current);
  }, []);

  // Let the first placement land before enabling the travel transition.
  useEffect(() => {
    if (!lens || settled) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [lens, settled]);

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
        solid ? 'glass-rail' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" aria-label="Deenomics home" className="shrink-0">
          <Logo tone={solid ? 'dark' : 'light'} />
        </Link>

        {/* The menu is one capsule of glass with a lens travelling inside it,
            rather than four separate links. */}
        <div
          ref={railRef}
          onMouseLeave={() => setHovered(null)}
          className={`relative hidden items-center rounded-full p-1.5 lg:flex ${
            solid ? 'nav-rail nav-rail-light' : 'nav-rail'
          }`}
        >
          {lens ? (
            <span
              aria-hidden="true"
              className={`nav-lens pointer-events-none absolute inset-y-1.5 rounded-full ${
                solid ? 'nav-lens-light' : ''
              }`}
              style={{
                left: lens.left,
                right: lens.right,
                opacity: lensTarget ? 1 : 0,
                transition: settled
                  ? `left ${lens.leftDur}ms ${
                      lens.leftDur === LEAD_MS ? LEAD_EASE : TRAIL_EASE
                    }, right ${lens.rightDur}ms ${
                      lens.rightDur === LEAD_MS ? LEAD_EASE : TRAIL_EASE
                    }, opacity 420ms ease`
                  : 'none',
              }}
            />
          ) : null}



          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-nav={link.href}
                aria-current={active ? 'page' : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                style={tearing?.href === link.href ? ({ '--tear-x': tearing.dir } as React.CSSProperties) : undefined}
                className={`relative z-10 rounded-full px-5 py-2 text-[0.95rem] font-semibold transition-colors duration-300 ${
                  tearing?.href === link.href ? 'nav-tearing ' : ''
                }${
                  solid
                    ? active
                      ? 'text-green-bright'
                      : 'text-ink/70 hover:text-green-bright'
                    : active
                      ? 'text-gold-light'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                {/* Stays put while the lens is off visiting another item, so
                    you can always see which page you are actually on. */}
                {active ? (
                  <StarMark
                    className={`absolute bottom-0.5 left-1/2 h-2 w-2 -translate-x-1/2 ${
                      solid ? 'text-green-bright/70' : 'text-gold-light/80'
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
            className={`btn-gloss hidden rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
              solid
                ? 'bg-emerald-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_28px_-12px_rgba(16,108,49,0.8)]'
                : 'bg-gradient-to-r from-gold-light to-gold text-emerald-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_28px_-12px_rgba(215,162,37,0.8)]'
            }`}
          >
            Get the app
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`grid h-10 w-10 place-items-center rounded-full transition-all lg:hidden ${
              solid ? 'glass-btn glass-btn-light text-ink' : 'glass-btn text-white'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="glass-rail border-t border-white/12 lg:hidden">
          <div className="space-y-1 px-5 pb-6 pt-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    active
                      ? 'glass-btn glass-btn-light text-green-bright'
                      : 'text-ink hover:bg-white/10 hover:text-green-bright'
                  }`}
                >
                  {link.label}
                  {active ? <StarMark className="h-3 w-3 text-green-bright/70" /> : null}
                </Link>
              );
            })}
            <Link
              href="/download"
              className="btn-gloss mt-3 block rounded-full bg-emerald-brand px-4 py-3.5 text-center text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
            >
              Get the app
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
