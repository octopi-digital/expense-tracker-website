import Image from 'next/image';
import { app } from '@/lib/brand';

export function Footer() {
  return (
    <footer id="download" className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="mb-4 flex items-center gap-2">
            <Image src="/islamic-expense-tracker-icon.png" alt={app.name} width={28} height={28} className="rounded-lg" />
            <span className="text-lg font-semibold text-[var(--text-primary)]">{app.name}</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{app.tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            Get the app
          </p>
          {/* Play Store link pending — app is Android-only, iOS not planned. */}
          <span className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-secondary)]">
            Coming soon on Play Store
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-[var(--border)] px-6 py-6 text-xs text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {app.name}. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-[var(--text-primary)]">Privacy Policy</a>
          <a href="/terms" className="hover:text-[var(--text-primary)]">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}
