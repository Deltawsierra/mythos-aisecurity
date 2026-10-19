"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { CHANGE_PIPELINE } from "@/content/platform";
import { EVIDENCE_STATE_ICONS } from "@/content/media";
import { cn } from "@/lib/utils";

const STEP_ICON = [
  EVIDENCE_STATE_ICONS.verified,
  "/assets/evidence/change-event.svg",
  EVIDENCE_STATE_ICONS.observed,
  "/assets/evidence/invalidates-link.svg",
  "/assets/evidence/retest-proof.svg",
  EVIDENCE_STATE_ICONS.verified,
];

/** The claim's state and the deployment decision at each step. */
const CLAIM_AT = [
  { state: "Verified", tone: "text-state-verified border-state-verified/60", decision: "Ready" },
  { state: "Verified", tone: "text-state-verified border-state-verified/60", decision: "Ready" },
  { state: "Verified · under review", tone: "text-state-stale border-state-stale/60", decision: "Ready" },
  { state: "Stale", tone: "text-state-stale border-state-stale/60", decision: "Needs more evidence" },
  { state: "Revalidating", tone: "text-state-observed border-state-observed/60", decision: "Needs more evidence" },
  { state: "Verified · fresh evidence", tone: "text-state-verified border-state-verified/60", decision: "Ready" },
];

const STEP_MS = 1900;

/**
 * Change intelligence as a sequence: one claim moves from verified, through a
 * change that invalidates it, to a minimal retest and restored trust — with
 * the deployment decision recalculated along the way. Plays once on entering
 * the view; reduced motion shows the finished flow.
 */
export function ChangeFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(CHANGE_PIPELINE.length - 1);
  const [run, setRun] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionOk || !ref.current) return;
    setAnimate(true);
    setStep(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun((r) => r + 1);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    setStep(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= CHANGE_PIPELINE.length - 1) window.clearInterval(id);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [run]);

  const claim = CLAIM_AT[step];

  return (
    <div ref={ref}>
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-4 border border-rule bg-panel px-6 py-5 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Assurance claim · illustrative</p>
          <p className="mt-1.5 font-display text-xl leading-snug text-fg">
            The support assistant cannot move funds without approval.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end" aria-live="polite">
          <span key={claim.state} className={cn("lc-fade border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]", claim.tone)}>
            {claim.state}
          </span>
          <span className="text-xs text-fg-muted">
            Decision: <span key={claim.decision} className="lc-fade inline-block font-semibold text-fg">{claim.decision}</span>
          </span>
        </div>
      </div>

      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
        <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-9 hidden h-px bg-rule lg:block" />
        <span
          aria-hidden="true"
          className="absolute left-[8%] top-9 hidden h-px bg-gradient-to-r from-bronze to-antique-gold transition-[width] duration-[1600ms] ease-out lg:block"
          style={{ width: `${(step / (CHANGE_PIPELINE.length - 1)) * 84}%` }}
        />
        {CHANGE_PIPELINE.map((item, index) => {
          const reached = index <= step;
          return (
            <li
              key={item.name}
              className={cn(
                "relative flex flex-col items-center text-center transition-opacity duration-700",
                reached ? "opacity-100" : "opacity-35",
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-navy transition-[box-shadow,transform] duration-700",
                  index === step && animate && "scale-110 shadow-[0_0_0_1px_rgba(214,161,74,0.7),0_0_34px_4px_rgba(214,161,74,0.3)]",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STEP_ICON[index]} loading="lazy" alt="" aria-hidden="true" className="h-16 w-16" />
              </span>
              <p className={cn("mt-4 text-[11px] font-semibold uppercase tracking-[0.2em]", index === step ? "text-antique-gold" : "text-fg")}>
                {item.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
            </li>
          );
        })}
      </ol>

      {animate && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-2 border border-rule px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted transition-colors hover:border-antique-gold/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Replay the change
          </button>
        </div>
      )}
    </div>
  );
}
