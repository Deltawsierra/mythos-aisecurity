"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardVersion {
  label: string;
  date: string;
  fields: Record<string, string>;
}

/**
 * A text-first Benchmark Validity Card (Launch Guide M04) with compare mode:
 * switching to the earlier version marks every field that changed, so a
 * reader can see what a score depended on and what moved between runs.
 */
export function ValidityCard({ fields, versions, title }: { fields: string[]; versions: [CardVersion, CardVersion]; title: string }) {
  const [compare, setCompare] = useState(false);
  const [current, previous] = versions;

  return (
    <figure className="border border-rule bg-cream shadow-[0_30px_60px_-40px_rgba(22,26,28,0.55)]">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-6 py-4">
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Benchmark Validity Card · synthetic</span>
          <span className="mt-1 block font-display text-2xl text-fg">{title}</span>
        </span>
        <button
          type="button"
          aria-pressed={compare}
          onClick={() => setCompare((v) => !v)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            compare ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
          )}
        >
          {compare ? `Comparing with ${previous.label}` : `Compare with ${previous.label}`}
        </button>
      </figcaption>
      <dl className="divide-y divide-rule" aria-live="polite">
        <div className="grid grid-cols-[10rem_1fr] gap-4 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted sm:grid-cols-[12rem_1fr_1fr]">
          <span>Field</span>
          <span>
            {current.label} · {current.date}
          </span>
          {compare && (
            <span className="hidden sm:block">
              {previous.label} · {previous.date}
            </span>
          )}
        </div>
        {fields.map((field) => {
          const changed = compare && current.fields[field] !== previous.fields[field];
          return (
            <div key={field} className={cn("grid grid-cols-[10rem_1fr] gap-4 px-6 py-3 text-sm sm:grid-cols-[12rem_1fr_1fr]", changed && "bg-state-stale/10")}>
              <dt className="text-fg-muted">{field}</dt>
              <dd className="text-fg">
                {current.fields[field]}
                {changed && <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-state-stale-ink">Changed</span>}
              </dd>
              {compare && (
                <dd className="col-span-2 text-fg-muted sm:col-span-1">
                  <span className="sm:hidden">Was: </span>
                  {previous.fields[field]}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </figure>
  );
}
