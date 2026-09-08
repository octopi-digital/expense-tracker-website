/**
 * The Deenomics mark: an eight-point khatim star (the geometric figure that
 * recurs across Islamic ornament) holding a rising column chart — deen and
 * economics in one glyph.
 */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dnm-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#19CC50" />
          <stop offset="55%" stopColor="#106C31" />
          <stop offset="100%" stopColor="#0A4A21" />
        </linearGradient>
        <linearGradient id="dnm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FADB8A" />
          <stop offset="100%" stopColor="#D7A225" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#dnm-mark)" />
      {/* Eight-point star: two squares, one rotated 45°. */}
      <g stroke="url(#dnm-gold)" strokeWidth="1.5" opacity="0.85">
        <rect x="12" y="12" width="24" height="24" rx="2.5" />
        <rect x="12" y="12" width="24" height="24" rx="2.5" transform="rotate(45 24 24)" />
      </g>
      {/* Rising columns. */}
      <g fill="#FFFFFF">
        <rect x="18" y="26" width="3.6" height="7" rx="1.4" opacity="0.75" />
        <rect x="22.2" y="22" width="3.6" height="11" rx="1.4" opacity="0.9" />
        <rect x="26.4" y="17.5" width="3.6" height="15.5" rx="1.4" />
      </g>
    </svg>
  );
}

export function Logo({
  className = '',
  tone = 'dark',
}: {
  className?: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.32rem] font-extrabold tracking-tight ${
            tone === 'light' ? 'text-white' : 'text-ink'
          }`}
        >
          Deenomics
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
            tone === 'light' ? 'text-gold-light/80' : 'text-gold-light'
          }`}
        >
          Deen + Economics
        </span>
      </span>
    </span>
  );
}
