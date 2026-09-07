/**
 * Tiling Islamic geometric ornament, drawn as an SVG <pattern> so it stays
 * crisp at any size and costs nothing to load. Used as a low-opacity wash
 * behind dark sections rather than as a foreground element.
 */
export function GeometricPattern({
  className = '',
  opacity = 0.14,
  stroke = '#19CC50',
  size = 90,
}: {
  className?: string;
  opacity?: number;
  stroke?: string;
  size?: number;
}) {
  const id = `dnm-geo-${size}-${stroke.replace('#', '')}`;
  return (
    <svg className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1">
            {/* Interlocking eight-point stars on a square lattice. */}
            <rect x={size * 0.22} y={size * 0.22} width={size * 0.56} height={size * 0.56} />
            <rect
              x={size * 0.22}
              y={size * 0.22}
              width={size * 0.56}
              height={size * 0.56}
              transform={`rotate(45 ${size / 2} ${size / 2})`}
            />
            <circle cx={size / 2} cy={size / 2} r={size * 0.06} />
            <path d={`M0 0 L${size * 0.22} ${size * 0.22} M${size} 0 L${size * 0.78} ${size * 0.22}
                      M0 ${size} L${size * 0.22} ${size * 0.78} M${size} ${size} L${size * 0.78} ${size * 0.78}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A single ornamental divider — a star flanked by tapering rules. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50 sm:w-28" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="5" y="5" width="14" height="14" />
        <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50 sm:w-28" />
    </div>
  );
}
