import Link from 'next/link';
import { site } from '@/lib/site';

function Badge({
  href,
  kicker,
  store,
  children,
}: {
  href: string;
  kicker: string;
  store: string;
  children: React.ReactNode;
}) {
  const unavailable = href === '#';
  return (
    <Link
      href={href}
      aria-disabled={unavailable}
      className={`group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur transition-all duration-300 hover:border-gold/50 hover:bg-white/10 ${
        unavailable ? 'cursor-default' : 'hover:-translate-y-0.5'
      }`}
    >
      <span className="text-white/90 transition-colors group-hover:text-gold-light">{children}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.68rem] font-medium uppercase tracking-widest text-white/50">{kicker}</span>
        <span className="text-[0.98rem] font-bold text-white">{store}</span>
      </span>
    </Link>
  );
}

export function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge href={site.playStoreUrl} kicker="Get it on" store="Google Play">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M3.6 1.8a1 1 0 0 0-.5.9v18.6a1 1 0 0 0 .5.9l10-10.2-10-10.2Zm11.1 9.1 2.7-2.8-9.6-5.5 6.9 8.3Zm0 2.2-6.9 8.3 9.6-5.5-2.7-2.8Zm4.2-1.1L21.4 11c.7-.4.7-1.5 0-1.9l-2.3-1.3-3 3.1 3 3.1Z" />
        </svg>
      </Badge>
      <Badge href={site.appStoreUrl} kicker="Coming soon to" store="App Store">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.6.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.5-1-2.6-3.9v-.2ZM14.1 5.9c.7-.8 1.1-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4Z" />
        </svg>
      </Badge>
    </div>
  );
}
