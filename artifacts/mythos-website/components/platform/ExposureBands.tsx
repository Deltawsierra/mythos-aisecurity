"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Band {
  name: string;
  low: number;
  high: number;
  note: string;
}

export interface BandSet {
  id: string;
  label: string;
  bands: Band[];
}

/**
 * Exposure bands by scenario (Launch Guide E04): one range per band on a
 * shared axis — never a single point — with the same values as a table.
 * Horizons switch between fixed synthetic fixtures; nothing is computed live.
 */
export function ExposureBands({ sets, unit, axisMax, caption }: { sets: BandSet[]; unit: string; axisMax: number; caption: string }) {
  const [i, setI] = useState(0);
  const set = sets[i];
  const fmt = (v: number) => `${unit}${v.toFixed(v < 10 ? 1 : 0)}M`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * axisMax);

  return (
    <div className="border border-rule bg-panel p-6 shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)] lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{caption}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Scenario horizon">
          {sets.map((s, k) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === k}
              onClick={() => setI(k)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                i === k ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8" aria-hidden="true">
        {set.bands.map((b, k) => (
          <div key={b.name} className="grid grid-cols-[6.5rem_1fr] items-center gap-4 py-2.5 sm:grid-cols-[8rem_1fr]">
            <span className="font-display text-lg text-fg">{b.name}</span>
            <div className="relative h-7 border-l border-rule">
              <div className="absolute inset-y-[45%] left-0 right-0 bg-rule/60" />
              <div
                className={cn(
                  "absolute inset-y-0 transition-[left,width] duration-700 ease-out motion-reduce:transition-none",
                  k === 0 ? "bg-antique-gold/45" : k === 1 ? "bg-bronze/75" : "bg-bronze-deep/85",
                )}
                style={{ left: `${(b.low / axisMax) * 100}%`, width: `${((b.high - b.low) / axisMax) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-[6.5rem_1fr] gap-4 sm:grid-cols-[8rem_1fr]">
          <span />
          <div className="relative h-5 text-[10px] text-fg-muted">
            {ticks.map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: `${(t / axisMax) * 100}%` }}>
                {fmt(t)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <caption className="sr-only">
          {caption}, {set.label}: modeled ranges by band
        </caption>
        <thead>
          <tr className="border-b border-rule text-[10px] uppercase tracking-[0.2em] text-fg-muted">
            <th scope="col" className="py-2 pr-4 font-semibold">Band</th>
            <th scope="col" className="py-2 pr-4 font-semibold">Modeled range</th>
            <th scope="col" className="py-2 font-semibold">What drives it</th>
          </tr>
        </thead>
        <tbody aria-live="polite" className="divide-y divide-rule">
          {set.bands.map((b) => (
            <tr key={b.name}>
              <th scope="row" className="py-2.5 pr-4 font-semibold text-fg">{b.name}</th>
              <td className="py-2.5 pr-4 tabular-nums text-fg">
                {fmt(b.low)} – {fmt(b.high)}
              </td>
              <td className="py-2.5 text-fg-muted">{b.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-state-stale-ink">Synthetic example · not a forecast</p>
    </div>
  );
}
