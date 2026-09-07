/**
 * The app's financial-health gauge: a 240° arc on a gray track, filled by the
 * same red→orange→green progression the product uses, with the score in the
 * middle. `value` is 0–100.
 */
export function HealthGauge({
  value = 78,
  size = 132,
  label = 'Growing',
  showLabel = true,
}: {
  value?: number;
  size?: number;
  label?: string;
  /** Below roughly 70px the band name is too small to read — set false and
      put the word in real text beside the gauge instead. */
  showLabel?: boolean;
}) {
  const stroke = size * 0.093;
  const r = (size - stroke) / 2;
  const c = size / 2;
  const sweep = 240;
  const start = 150;
  const arcLength = (sweep / 360) * 2 * Math.PI * r;
  const full = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={`Financial health ${clamped} out of 100, ${label}`}>
      <defs>
        <linearGradient id="dnm-gauge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#DB5252" />
          <stop offset="45%" stopColor="#F09D05" />
          <stop offset="100%" stopColor="#19CC50" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${start} ${c} ${c})`}>
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="#E8ECEF"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${full}`}
        />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="url(#dnm-gauge)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(arcLength * clamped) / 100} ${full}`}
        />
      </g>
      <text
        x={c}
        y={c + (showLabel ? size * 0.03 : size * 0.1)}
        textAnchor="middle"
        fontSize={size * 0.26}
        fontWeight="800"
        fill="#0F172A"
      >
        {clamped}
      </text>
      {showLabel ? (
        <text
          x={c}
          y={c + size * 0.2}
          textAnchor="middle"
          fontSize={size * 0.088}
          fontWeight="700"
          fill="#19CC50"
          letterSpacing="0.5"
        >
          {label.toUpperCase()}
        </text>
      ) : null}
    </svg>
  );
}
