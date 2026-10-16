"use client";

import { useState } from "react";
import { StatePill } from "@/components/platform/StatePill";
import { cn } from "@/lib/utils";

export interface TrackedClaim {
  id: string;
  text: string;
}

export interface ChangeEvent {
  id: string;
  label: string;
  detail: string;
  touches: string[];
  retest: string[];
  decision: string;
  open: string;
}

/**
 * Change event → dependency traversal → targeted retest → updated decision
 * (Launch Guide /platform/continuous-assurance mechanism). Choose a change and
 * only the claims that depend on it turn Stale; the rest keep their evidence.
 * Every value is a fixed synthetic fixture.
 */
export function ChangeTraversal({ claims, events }: { claims: TrackedClaim[]; events: ChangeEvent[] }) {
  const [i, setI] = useState(0);
  const e = events[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">01 · Change event</p>
        <div className="mt-3 grid gap-2" role="group" aria-label="Choose a change">
          {events.map((ev, k) => (
            <button
              key={ev.id}
              type="button"
              aria-pressed={i === k}
              aria-controls="traversal-detail"
              onClick={() => setI(k)}
              className={cn(
                "border px-4 py-3 text-left transition-colors",
                i === k ? "border-accent bg-panel" : "border-rule hover:border-accent/60",
              )}
            >
              <span className="block font-display text-lg leading-tight text-fg">{ev.label}</span>
              <span className="mt-0.5 block text-sm text-fg-muted">{ev.detail}</span>
            </button>
          ))}
        </div>
      </div>

      <div id="traversal-detail" aria-live="polite" className="grid gap-4">
        <div className="border border-rule bg-panel p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">02 · Dependent claims</p>
          <ul className="mt-3 grid gap-2">
            {claims.map((cl) => {
              const hit = e.touches.includes(cl.id);
              return (
                <li key={cl.id} className={cn("flex items-center justify-between gap-4 px-3 py-2 text-sm transition-colors", hit ? "bg-state-stale/10" : "")}>
                  <span className={hit ? "text-fg" : "text-fg-muted"}>{cl.text}</span>
                  <StatePill state={hit ? "stale" : "verified"} label={hit ? "Stale" : "Unaffected"} className="shrink-0" />
                </li>
              );
            })}
          </ul>
        </div>
        <div key={e.id} className="lc-fade grid gap-4 md:grid-cols-2">
          <div className="border border-rule bg-panel p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">03 · Targeted retest</p>
            <ul className="mt-3 grid gap-1.5 text-sm text-fg">
              {e.retest.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 border-accent bg-panel p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">04 · Updated decision</p>
            <p className="mt-2 font-display text-xl leading-snug text-fg">{e.decision}</p>
            <p className="mt-3 border-t border-rule pt-3 text-sm text-fg-muted">
              <span className="font-semibold text-fg">Open issue · </span>
              {e.open}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
