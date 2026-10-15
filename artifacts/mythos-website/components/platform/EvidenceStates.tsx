import { EVIDENCE_STATES, type EvidenceStateId } from "@/content/platform";
import { EVIDENCE_STATE_ICONS } from "@/content/media";
import { cn } from "@/lib/utils";

const ACCENT: Record<EvidenceStateId, string> = {
  declared: "before:bg-state-declared",
  observed: "before:bg-state-observed",
  verified: "before:bg-state-verified",
  unknown: "before:bg-state-unknown",
  stale: "before:bg-state-stale",
  contradicted: "before:bg-state-contradicted",
};

/** The six evidence states as cards, each with its icon and plain meaning. */
export function EvidenceStates({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)} data-reveal-group>
      {EVIDENCE_STATES.map((state) => (
        <li
          key={state.id}
          className={cn(
            "relative flex items-start gap-4 border border-rule bg-panel p-5 shadow-[0_18px_40px_-34px_rgba(11,31,51,0.45)] before:absolute before:inset-y-0 before:left-0 before:w-[3px]",
            ACCENT[state.id],
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={EVIDENCE_STATE_ICONS[state.id]} alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
          <div>
            <p className="font-display text-2xl leading-none text-fg">{state.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{state.meaning}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
