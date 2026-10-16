"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Factor {
  id: string;
  label: string;
  levels: string[];
}

export interface SensitivityResult {
  low: number;
  central: number;
  high: number;
}

/**
 * Sensitivity and limitations (Launch Guide E06): each assumption has a few
 * fixed levels, and every combination maps to a precomputed synthetic
 * result. This shows how assumptions move a range — it is a lookup into a
 * fixture, not a model running in the browser.
 */
export function SensitivityGrid({
  factors,
  lookup,
  unit,
  initial,
  axisMax,
}: {
  factors: Factor[];
  /** Keyed by level indexes joined with "-", e.g. "1-1-0". */
  lookup: Record<string, SensitivityResult>;
  unit: string;
  initial: number[];
  /** Right end of the range bar, in millions. */
  axisMax: number;
}) {
  const [levels, setLevels] = useState(initial);
  const key = levels.join("-");
  const base = lookup[initial.join("-")];
  const r = lookup[key];
  const fmt = (v: number) => `${unit}${v.toFixed(1)}M`;
  const moved = factors.filter((_, i) => levels[i] !== initial[i]).map((f) => f.label);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="grid gap-5 border border-rule bg-panel p-6">
        {factors.map((f, i) => (
          <fieldset key={f.id}>
            <legend className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">{f.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {f.levels.map((lv, k) => (
                <button
                  key={lv}
                  type="button"
                  aria-pressed={levels[i] === k}
                  onClick={() => setLevels((ls) => ls.map((v, j) => (j === i ? k : v)))}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                    levels[i] === k ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
                  )}
                >
                  {lv}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() => setLevels(initial)}
          disabled={key === initial.join("-")}
          className="justify-self-start text-sm font-semibold text-accent underline-offset-4 hover:underline disabled:opacity-40"
        >
          Reset assumptions
        </button>
      </div>

      <div aria-live="polite" className="flex flex-col border border-rule bg-cream p-6 shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-state-stale-ink">Synthetic example</p>
        <p className="mt-3 text-sm text-stone">Modeled annual exposure, central estimate</p>
        <p className="font-display text-5xl tabular-nums text-charcoal">{fmt(r.central)}</p>
        <p className="mt-1 text-sm text-stone">
          Range {fmt(r.low)} – {fmt(r.high)}
        </p>
        <div className="relative mt-5 h-3 bg-marble" aria-hidden="true">
          <div className="absolute inset-y-0 bg-bronze/70 transition-[left,width] duration-500 motion-reduce:transition-none" style={{ left: `${(r.low / axisMax) * 100}%`, width: `${((r.high - r.low) / axisMax) * 100}%` }} />
          <div className="absolute -inset-y-1 w-0.5 bg-charcoal transition-[left] duration-500 motion-reduce:transition-none" style={{ left: `${(r.central / axisMax) * 100}%` }} />
        </div>
        <p className="mt-5 border-t border-[rgba(184,130,63,0.3)] pt-4 text-[15px] leading-relaxed text-charcoal">
          {moved.length === 0
            ? "These are the scenario’s stated assumptions. Change one to see how much of the range rests on it."
            : `Changing ${moved.join(" and ").toLowerCase()} moves the central estimate from ${fmt(base.central)} to ${fmt(r.central)}. The assumptions travel with the number — always.`}
        </p>
      </div>
    </div>
  );
}
