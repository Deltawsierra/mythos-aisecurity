"use client";

import { useState } from "react";
import { ACHILLES_RETEST } from "@/content/achilles";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All outcomes" },
  { id: "security", label: "Security" },
  { id: "utility", label: "Legitimate use" },
  { id: "controls", label: "Controls" },
] as const;

/**
 * Canary comparison and retest (Launch Guide AC07): one synthetic fixture run
 * three times. Absent on retest is reported apart from legitimate requests
 * refused and benign counterparts; the filter narrows the rows in place.
 */
export function RetestComparison() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const rows = ACHILLES_RETEST.rows.filter((r) => filter === "all" || r.group === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter outcomes">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === f.id ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Synthetic fixture</span>
      </div>

      <div className="mt-5 overflow-x-auto border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="sr-only">Baseline, first fix and second fix compared on the same synthetic scenarios</caption>
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Outcome</th>
              {ACHILLES_RETEST.runs.map((run, i) => (
                <th key={run} scope="col" className={cn("px-5 py-3 font-display text-xl font-medium text-fg", i === 2 && "text-accent")}>
                  {run}
                </th>
              ))}
            </tr>
          </thead>
          <tbody aria-live="polite" className="divide-y divide-rule">
            {rows.map((r) => (
              <tr key={r.metric}>
                <th scope="row" className="px-5 py-3.5 font-normal text-fg">{r.metric}</th>
                {r.values.map((v, i) => (
                  <td key={i} className={cn("px-5 py-3.5 font-semibold tabular-nums", i === 1 && r.group === "utility" ? "text-state-contradicted-ink" : "text-fg")}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-cream/60 align-top">
              <th scope="row" className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Verdict</th>
              {ACHILLES_RETEST.verdicts.map((v, i) => (
                <td key={i} className={cn("px-5 py-4 text-[13.5px] leading-snug", i === 1 ? "text-state-contradicted-ink" : i === 2 ? "font-semibold text-state-verified-ink" : "text-fg-muted")}>
                  {v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">{ACHILLES_RETEST.release}</p>
    </div>
  );
}
