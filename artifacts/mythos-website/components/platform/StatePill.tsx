import { Ban, Check, CircleHelp, Clock3, Hand, ShieldAlert, TriangleAlert, Eye, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PillState =
  | "verified"
  | "allowed"
  | "observed"
  | "stale"
  | "held"
  | "escalated"
  | "denied"
  | "contradicted"
  | "unknown";

const STYLE: Record<PillState, { label: string; icon: typeof Check; ring: string; ink: string }> = {
  verified: { label: "Verified", icon: Check, ring: "border-state-verified", ink: "text-state-verified-ink" },
  allowed: { label: "Allowed", icon: Check, ring: "border-state-verified", ink: "text-state-verified-ink" },
  observed: { label: "Observed", icon: Eye, ring: "border-state-observed", ink: "text-state-observed-ink" },
  stale: { label: "Stale", icon: Clock3, ring: "border-state-stale", ink: "text-state-stale-ink" },
  held: { label: "Held", icon: Hand, ring: "border-state-stale", ink: "text-state-stale-ink" },
  escalated: { label: "Escalated", icon: ArrowUpRight, ring: "border-state-stale", ink: "text-state-stale-ink" },
  denied: { label: "Denied", icon: Ban, ring: "border-state-contradicted", ink: "text-state-contradicted-ink" },
  contradicted: { label: "Contradicted", icon: TriangleAlert, ring: "border-state-contradicted", ink: "text-state-contradicted-ink" },
  unknown: { label: "Unknown", icon: CircleHelp, ring: "border-fg/40", ink: "text-fg-muted" },
};

/**
 * Status pill (Launch Guide component contract): a glyph and a word, never
 * colour alone. Ink colours are for light surfaces; on dark surfaces pass
 * `onDark` to use the brighter state colours.
 */
export function StatePill({ state, label, onDark, className }: { state: PillState; label?: string; onDark?: boolean; className?: string }) {
  const s = STYLE[state];
  const Icon = state === "contradicted" && label === "Finding" ? ShieldAlert : s.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
        s.ring,
        onDark ? "bg-transparent text-fg" : cn("bg-cream", s.ink),
        className,
      )}
    >
      <Icon size={12} strokeWidth={2.4} aria-hidden="true" />
      {label ?? s.label}
    </span>
  );
}
