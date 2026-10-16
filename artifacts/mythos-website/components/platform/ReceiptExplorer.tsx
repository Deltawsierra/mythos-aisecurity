"use client";

import { useState } from "react";
import { RecordCard, type RecordRow } from "@/components/platform/RecordCard";
import { StatePill, type PillState } from "@/components/platform/StatePill";
import { cn } from "@/lib/utils";

export interface ExplorerClaim {
  id: string;
  claim: string;
  state: PillState;
  stateLabel?: string;
  receipt: RecordRow[];
  chain: { step: string; detail: string }[];
}

/**
 * Evidence receipt explorer (Launch Guide /platform/evidence mechanism):
 * choose a claim and inspect its receipt and the provenance chain behind
 * it — claim, evidence, observation, configuration, reviewer. Synthetic.
 */
export function ReceiptExplorer({ claims }: { claims: ExplorerClaim[] }) {
  const [i, setI] = useState(0);
  const c = claims[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Claims · synthetic</p>
        <div className="mt-3 grid gap-2" role="group" aria-label="Choose a claim">
          {claims.map((cl, k) => (
            <button
              key={cl.id}
              type="button"
              aria-pressed={i === k}
              aria-controls="receipt-detail"
              onClick={() => setI(k)}
              className={cn(
                "flex items-start justify-between gap-4 border px-4 py-3 text-left transition-colors",
                i === k ? "border-accent bg-panel" : "border-rule hover:border-accent/60",
              )}
            >
              <span className="font-display text-lg leading-snug text-fg">{cl.claim}</span>
              <StatePill state={cl.state} label={cl.stateLabel} className="shrink-0" />
            </button>
          ))}
        </div>
        <ol key={c.id} className="lc-fade mt-6 border-l border-rule pl-6" aria-label="Provenance chain">
          {c.chain.map((step) => (
            <li key={step.step} className="relative pb-4 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-panel" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{step.step}</p>
              <p className="mt-0.5 text-[15px] leading-relaxed text-fg">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <div id="receipt-detail" aria-live="polite">
        <RecordCard key={c.id} kind="Assurance Receipt · synthetic" title={c.claim} rows={c.receipt} visible={6} className="lc-fade" />
      </div>
    </div>
  );
}
