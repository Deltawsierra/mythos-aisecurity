"use client";

import { useState } from "react";
import { StatePill } from "@/components/platform/StatePill";
import { ACHILLES_APPROVAL } from "@/content/achilles";
import { cn } from "@/lib/utils";

const BOUND = [
  { field: "Destination", value: "Card ending 4471" },
  { field: "Amount", value: "$1,200" },
  { field: "Acting for", value: "Customer C-1042" },
  { field: "Order", value: "#88213" },
  { field: "Expected effect", value: "One refund" },
];

/**
 * Effect-bound approvals (Launch Guide AC05, fixture F02). The visitor picks
 * a field to change; the permit bound to the original action no longer
 * applies and the result says why. Offline and synthetic — nothing executes.
 */
export function ApprovalBinding() {
  const [choice, setChoice] = useState<string>("none");
  const current = ACHILLES_APPROVAL.fields.find((f) => f.id === choice)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div className="border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
        <div className="border-b border-rule px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Approved action · synthetic</p>
          <p className="mt-1 font-display text-2xl text-fg">{ACHILLES_APPROVAL.approved.action}</p>
          <p className="mt-0.5 text-sm text-fg-muted">{ACHILLES_APPROVAL.approved.by}</p>
        </div>
        <dl className="divide-y divide-rule">
          {BOUND.map((b) => {
            const changed = current.field === b.field;
            return (
              <div key={b.field} className={cn("grid grid-cols-[8.5rem_1fr] gap-3 px-5 py-3 text-sm", changed && "bg-state-contradicted/10")}>
                <dt className="text-fg-muted">{b.field}</dt>
                <dd className="text-fg">
                  {changed ? (
                    <>
                      <span className="text-fg-muted line-through">{current.was}</span>{" "}
                      <span className="font-semibold text-state-contradicted-ink">
                        <span className="sr-only">changed to </span>
                        {current.now}
                      </span>
                    </>
                  ) : (
                    b.value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Change one bound field</p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{ACHILLES_APPROVAL.lede}</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Change one bound field">
          {ACHILLES_APPROVAL.fields.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={choice === f.id}
              onClick={() => setChoice(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                choice === f.id ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div key={current.id} aria-live="polite" className="lc-fade mt-6 border-l-2 border-accent bg-panel p-6">
          <StatePill state={current.outcome} />
          <p className="mt-3 font-display text-2xl leading-snug text-fg">{current.reason}</p>
        </div>
        <p className="mt-4 text-sm text-fg-muted">{ACHILLES_APPROVAL.footnote}</p>
      </div>
    </div>
  );
}
