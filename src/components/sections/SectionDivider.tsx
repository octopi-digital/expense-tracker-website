import { StarField } from '@/components/StarField';

/**
 * Purely decorative connector between two adjacent dark sections — echoes
 * the template's arrow-and-line flourish marking a transition. No semantic
 * meaning, so everything here is aria-hidden.
 */
export function SectionDivider() {
  return (
    <div aria-hidden className="dot-grid relative w-full bg-black py-10">
      <StarField density={40} />
      <div className="relative mx-auto flex max-w-6xl items-center justify-center px-6">
        <span className="text-white/30">‹</span>
        <span className="mx-4 h-px flex-1 bg-white/15" />
        <span className="flex flex-col items-center gap-1 text-white/25">
          <span className="text-xs leading-none">▲</span>
          <span className="text-xs leading-none">▼</span>
        </span>
        <span className="mx-4 h-px flex-1 bg-white/15" />
        <span className="text-white/30">›</span>
      </div>
    </div>
  );
}
