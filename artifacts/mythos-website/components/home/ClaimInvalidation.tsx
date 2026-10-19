"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { EVIDENCE_STATE_ICONS } from "@/content/media";
import { cn } from "@/lib/utils";

type Phase = "verified" | "changed" | "revalidated" | "contradicted";
type Tone = "verified" | "stale" | "contradicted" | "observed" | "neutral" | "hold";

interface NodeView {
  label: string;
  value: string;
  state: string;
  tone: Tone;
}

const TONE: Record<Tone, { ring: string; ink: string; icon?: string }> = {
  verified: { ring: "border-state-verified", ink: "text-state-verified-ink", icon: EVIDENCE_STATE_ICONS.verified },
  stale: { ring: "border-state-stale", ink: "text-state-stale-ink", icon: EVIDENCE_STATE_ICONS.stale },
  contradicted: { ring: "border-state-contradicted", ink: "text-state-contradicted-ink", icon: EVIDENCE_STATE_ICONS.contradicted },
  observed: { ring: "border-state-observed", ink: "text-state-observed-ink", icon: EVIDENCE_STATE_ICONS.observed },
  hold: { ring: "border-state-contradicted", ink: "text-state-contradicted-ink" },
  neutral: { ring: "border-rule", ink: "text-fg-muted" },
};

const CLAIM = "Refunds go only to the original payment method.";

/** Deterministic fixture (Launch Guide F01): every phase is fixed, synthetic data. */
const VIEW: Record<Phase, { nodes: NodeView[]; narrative: string; invalidated: boolean }> = {
  verified: {
    nodes: [
      { label: "Change", value: "None pending", state: "Steady", tone: "neutral" },
      { label: "Evidence", value: "Retest R-14 against tool manifest v7", state: "Verified", tone: "verified" },
      { label: "Claim", value: CLAIM, state: "Verified", tone: "verified" },
      { label: "Decision", value: "Ready, with restrictions", state: "Ready", tone: "verified" },
    ],
    narrative: "The claim is verified: a retest against the current tool manifest supports it, and the deployment decision rests on that evidence.",
    invalidated: false,
  },
  changed: {
    nodes: [
      { label: "Change", value: "Tool manifest v8 adds a payouts tool", state: "Observed", tone: "observed" },
      { label: "Evidence", value: "R-14 was run against v7, not v8", state: "Stale", tone: "stale" },
      { label: "Claim", value: CLAIM, state: "Stale", tone: "stale" },
      { label: "Decision", value: "Review required before relying on it", state: "Held", tone: "hold" },
    ],
    narrative: "The change invalidates the evidence the claim rested on. The claim turns Stale — not passed, not failed — and only what the change touched is queued for retest.",
    invalidated: true,
  },
  revalidated: {
    nodes: [
      { label: "Change", value: "Tool manifest v8 adds a payouts tool", state: "Observed", tone: "observed" },
      { label: "Evidence", value: "Retest R-15 against v8: refund to a new card blocked", state: "Verified", tone: "verified" },
      { label: "Claim", value: CLAIM, state: "Revalidated", tone: "verified" },
      { label: "Decision", value: "Ready, with restrictions", state: "Ready", tone: "verified" },
    ],
    narrative: "The targeted retest holds against v8. The claim is revalidated under current conditions, with both versions of the evidence kept on record.",
    invalidated: false,
  },
  contradicted: {
    nodes: [
      { label: "Change", value: "Tool manifest v8 adds a payouts tool", state: "Observed", tone: "observed" },
      { label: "Evidence", value: "Retest R-15 against v8: payout to a new card succeeded", state: "Contradicted", tone: "contradicted" },
      { label: "Claim", value: CLAIM, state: "Contradicted", tone: "contradicted" },
      { label: "Decision", value: "Hold until fixed and retested", state: "Held", tone: "hold" },
    ],
    narrative: "The retest contradicts the claim: the new tool can pay out to a new destination. The decision holds until a fix passes its own retest. Your team decides what happens next.",
    invalidated: true,
  },
};

function StatePill({ tone, state }: { tone: Tone; state: string }) {
  const t = TONE[tone];
  return (
    <span className={cn("inline-flex items-center gap-1.5 border bg-cream px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]", t.ring, t.ink)}>
      {t.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.icon} loading="lazy" alt="" aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", tone === "hold" ? "bg-state-contradicted" : "bg-fg-muted/50")} />
      )}
      {state}
    </span>
  );
}

/**
 * H06 — "A passing test has an expiration date." One synthetic claim walked
 * Verified → Stale → Revalidated or Contradicted by the visitor, with a reset.
 * No server calls; every state is a fixed fixture, and the narrative is
 * announced politely so the change is never colour-only.
 */
export function ClaimInvalidation() {
  const [phase, setPhase] = useState<Phase>("verified");
  const view = VIEW[phase];

  return (
    <div className="border border-rule bg-cream shadow-[0_30px_60px_-40px_rgba(22,26,28,0.5)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">Synthetic example · one claim, one change</p>
        <button
          type="button"
          onClick={() => setPhase("verified")}
          disabled={phase === "verified"}
          className="inline-flex min-h-9 items-center gap-1.5 text-[12px] font-semibold text-fg-muted transition-colors hover:text-fg disabled:opacity-40"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Reset
        </button>
      </div>

      <ol className="grid gap-px bg-rule lg:grid-cols-4" aria-label="Evidence chain">
        {view.nodes.map((node, i) => (
          <li key={node.label} className="relative flex flex-col gap-3 bg-cream p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">
              {String(i + 1).padStart(2, "0")} · {node.label}
            </p>
            <p className={cn("min-h-[3.5rem] text-[15px] leading-snug text-fg", node.label === "Claim" && "font-display text-lg italic")}>{node.value}</p>
            <div className="mt-auto">
              <StatePill tone={node.tone} state={node.state} />
            </div>
            {i === 1 && view.invalidated && (
              <span className="absolute right-4 top-4 font-mono text-[10px] font-semibold tracking-[0.14em] text-state-contradicted-ink">INVALIDATES</span>
            )}
          </li>
        ))}
      </ol>

      <div className="grid gap-5 border-t border-rule p-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <p aria-live="polite" className="text-[15px] leading-relaxed text-fg">
          {view.narrative}
        </p>
        <div className="flex flex-wrap gap-2">
          {phase === "verified" && (
            <button type="button" onClick={() => setPhase("changed")} className="rounded-full border border-antique-gold bg-gradient-to-b from-champagne to-antique-gold px-5 py-2.5 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5">
              Introduce a change
            </button>
          )}
          {phase === "changed" && (
            <>
              <button type="button" onClick={() => setPhase("revalidated")} className="rounded-full border border-state-verified bg-cream px-4 py-2.5 text-sm font-semibold text-state-verified-ink transition-colors hover:bg-state-verified/10">
                Retest: control holds
              </button>
              <button type="button" onClick={() => setPhase("contradicted")} className="rounded-full border border-state-contradicted bg-cream px-4 py-2.5 text-sm font-semibold text-state-contradicted-ink transition-colors hover:bg-state-contradicted/10">
                Retest: control fails
              </button>
            </>
          )}
          {(phase === "revalidated" || phase === "contradicted") && (
            <button type="button" onClick={() => setPhase("verified")} className="rounded-full border border-fg/35 px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-fg/70">
              Run it again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
