"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface MatrixRun {
  label: string;
  /** Counts on one synthetic fixture: harmful blocked, harmful allowed, benign blocked, benign allowed. */
  stopped: number;
  missed: number;
  falseBlocks: number;
  allowed: number;
  verdict: string;
}

/**
 * The false-block and utility ledger (Launch Guide M05): blocking benign use
 * is counted next to stopping harmful use, so a mitigation cannot look safer
 * simply by refusing more. Two synthetic runs, switchable.
 */
export function OutcomeMatrix({ runs }: { runs: MatrixRun[] }) {
  const [i, setI] = useState(0);
  const run = runs[i];
  const cells = [
    { row: "Harmful request", col: "Blocked", name: "Exploit stopped", value: run.stopped, tone: "good" },
    { row: "Harmful request", col: "Allowed", name: "Missed exploit", value: run.missed, tone: "bad" },
    { row: "Benign request", col: "Blocked", name: "False block", value: run.falseBlocks, tone: "bad" },
    { row: "Benign request", col: "Allowed", name: "Legitimate use served", value: run.allowed, tone: "good" },
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose a run">
        {runs.map((r, k) => (
          <button
            key={r.label}
            type="button"
            aria-pressed={i === k}
            onClick={() => setI(k)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              i === k ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
            )}
          >
            {r.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Synthetic fixture</span>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <table className="w-full border border-rule bg-panel text-left text-sm shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
          <caption className="sr-only">Outcomes for {run.label}: requests by whether they were blocked or allowed</caption>
          <thead>
            <tr className="border-b border-rule">
              <td className="px-4 py-3" />
              <th scope="col" className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Blocked</th>
              <th scope="col" className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Allowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule" aria-live="polite">
            {["Harmful request", "Benign request"].map((row) => (
              <tr key={row}>
                <th scope="row" className="px-4 py-4 font-display text-lg font-normal text-fg">{row}</th>
                {cells
                  .filter((c) => c.row === row)
                  .map((c) => (
                    <td key={c.name} className={cn("px-4 py-4", c.tone === "bad" && c.value > 0 && "bg-state-contradicted/10")}>
                      <span className={cn("block font-display text-3xl tabular-nums", c.tone === "bad" && c.value > 0 ? "text-state-contradicted-ink" : "text-fg")}>{c.value}</span>
                      <span className="text-xs text-fg-muted">{c.name}</span>
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p key={run.label} className="lc-fade border-l-2 border-accent bg-panel px-5 py-4 font-display text-xl leading-snug text-fg" aria-live="polite">
          {run.verdict}
        </p>
      </div>
    </div>
  );
}
