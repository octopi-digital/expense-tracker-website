'use client';

import { useTheme } from '@/lib/theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to white theme' : 'Switch to dark theme'}
      className="rounded-full border border-[var(--text-dim)] bg-[var(--surface)]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] backdrop-blur transition-colors hover:border-[var(--accent)]"
    >
      {theme === 'dark' ? 'White theme' : 'Dark theme'}
    </button>
  );
}
