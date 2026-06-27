import { cn } from "@/lib/utils";

export type SolutionMotif =
  | "saas"
  | "finance"
  | "healthcare"
  | "regulated"
  | "defense"
  | "integrators";

interface SolutionCardProps {
  title: string;
  motif: SolutionMotif;
  buyerRisk: string;
  examines: string;
  delivers: string;
  startingPoint: string;
  className?: string;
}

/**
 * A buyer use-case card for the /solutions page. Each card carries a small,
 * distinct line motif (decorative, aria-hidden) plus four labeled blocks:
 * environment risk, what Mythos examines, what the team receives, and a
 * recommended starting point. Presentational only — reveal motion is applied
 * by the StaggerReveal wrapper on the parent grid.
 */
export function SolutionCard({
  title,
  motif,
  buyerRisk,
  examines,
  delivers,
  startingPoint,
  className,
}: SolutionCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border border-ivory/8 bg-charcoal p-7 transition-colors duration-300 hover:border-bronze/30 lg:p-8",
        className,
      )}
    >
      {/* Header: motif + title */}
      <div className="flex items-center gap-4 border-b border-ivory/5 pb-5">
        <span className="shrink-0 text-bronze" aria-hidden="true">
          {MOTIFS[motif]}
        </span>
        <h3 className="font-display text-xl font-normal leading-tight text-ivory">
          {title}
        </h3>
      </div>

      {/* Detail blocks */}
      <dl className="mt-5 flex flex-col gap-4">
        <div>
          <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-stone/60">
            Environment risk
          </dt>
          <dd className="text-sm leading-relaxed text-muted-stone">{buyerRisk}</dd>
        </div>
        <div className="border-t border-ivory/5 pt-4">
          <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-stone/60">
            What Mythos examines
          </dt>
          <dd className="text-sm leading-relaxed text-muted-stone">{examines}</dd>
        </div>
        <div className="border-t border-ivory/5 pt-4">
          <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/70">
            What your team receives
          </dt>
          <dd className="text-sm leading-relaxed text-muted-stone">{delivers}</dd>
        </div>
      </dl>

      {/* Starting point footer */}
      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-bronze/15 pt-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-stone/60">
          Start with
        </span>
        <span className="text-sm font-medium text-antique-gold">{startingPoint}</span>
      </div>
    </div>
  );
}

const iconBase = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Distinct line motifs per buyer. Decorative only (parent marks aria-hidden). */
const MOTIFS: Record<SolutionMotif, React.ReactNode> = {
  // Tenant boundary / workflow node
  saas: (
    <svg {...iconBase}>
      <rect x="5" y="9" width="30" height="22" rx="2" opacity="0.5" />
      <rect x="11" y="15" width="18" height="10" rx="1.5" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Route ledger / guarded data path
  finance: (
    <svg {...iconBase}>
      <line x1="8" y1="13" x2="32" y2="13" opacity="0.45" />
      <line x1="8" y1="20" x2="24" y2="20" opacity="0.45" />
      <line x1="8" y1="27" x2="28" y2="27" opacity="0.45" />
      <rect x="26" y="16" width="8" height="8" rx="1.5" />
      <path d="M28 16v-1.5a2 2 0 0 1 4 0V16" />
    </svg>
  ),
  // Privacy boundary / protected context
  healthcare: (
    <svg {...iconBase}>
      <path d="M20 5l12 4v8c0 7-5 12-12 14-7-2-12-7-12-14V9l12-4z" opacity="0.5" />
      <circle cx="20" cy="18" r="4" />
      <circle cx="20" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Control map / audit trail
  regulated: (
    <svg {...iconBase}>
      <circle cx="10" cy="11" r="2.4" />
      <circle cx="30" cy="11" r="2.4" />
      <circle cx="20" cy="29" r="2.4" />
      <path d="M12 12.5l16 0M11 13l8 14M29 13l-8 14" opacity="0.5" />
    </svg>
  ),
  // Controlled environment / mission review
  defense: (
    <svg {...iconBase}>
      <path d="M8 8h5M8 8v5M32 8h-5M32 8v5M8 32h5M8 32v-5M32 32h-5M32 32v-5" />
      <circle cx="20" cy="20" r="6" opacity="0.55" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Repeatable validation path
  integrators: (
    <svg {...iconBase}>
      <path d="M11 16a10 10 0 0 1 18-3" />
      <path d="M29 24a10 10 0 0 1-18 3" opacity="0.7" />
      <path d="M29 9v4h-4" />
      <path d="M11 31v-4h4" />
    </svg>
  ),
};
