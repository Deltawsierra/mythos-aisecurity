"use client";

import { useState } from "react";
import { StatePill, type PillState } from "@/components/platform/StatePill";
import { cn } from "@/lib/utils";

export interface GateScenario {
  label: string;
  facts: string[];
  outcome: "support" | "hold" | "review";
  reason: string;
}

const OUTCOME: Record<GateScenario["outcome"], { state: PillState; label: string }> = {
  support: { state: "verified", label: "Evidence supports release" },
  hold: { state: "held", label: "Hold" },
  review: { state: "escalated", label: "Manual review" },
};

/**
 * Security veto and release authority (Launch Guide M07): each synthetic
 * engine-release scenario is decided by the weakest of nine gates or by the
 * veto outside the score, not by an average. It governs Mythos' own engines.
 */
export function ReleaseGate({ scenarios }: { scenarios: GateScenario[] }) {
  const [i, setI] = useState(0);
  const s = scenarios[i];
  const o = OUTCOME[s.outcome];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div role="group" aria-label="Release scenarios" className="grid content-start gap-2">
        {scenarios.map((sc, k) => (
          <button
            key={sc.label}
            type="button"
            aria-pressed={i === k}
            onClick={() => setI(k)}
            className={cn(
              "border px-4 py-3 text-left text-[15px] transition-colors",
              i === k ? "border-accent bg-panel font-semibold text-fg" : "border-rule text-fg-muted hover:border-accent/60 hover:text-fg",
            )}
          >
            {sc.label}
          </button>
        ))}
      </div>
      <div key={s.label} aria-live="polite" className="lc-fade border border-rule bg-panel p-6 shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Evidence on record · synthetic</p>
        <ul className="mt-3 grid gap-1.5 text-sm text-fg">
          {s.facts.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-rule pt-5">
          <StatePill state={o.state} label={o.label} />
          <p className="mt-3 font-display text-2xl leading-snug text-fg">{s.reason}</p>
          <p className="mt-3 text-sm text-fg-muted">This governs Mythos’ own engine releases. Your deployment decision stays with your people.</p>
        </div>
      </div>
    </div>
  );
}
