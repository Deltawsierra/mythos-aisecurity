"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GateOutcome = "permit" | "escalate" | "hold" | "deny";

export interface GateTest {
  request: string;
  /** The decision the agent's controls should make. */
  expected: GateOutcome;
  /** What the agent actually did. */
  observed: string;
  pass: boolean;
  /** One line on why it passed or failed. */
  verdict: string;
}

const LABEL: Record<GateOutcome, string> = {
  permit: "Permit",
  escalate: "Escalate",
  hold: "Hold",
  deny: "Deny",
};

const BAR_COLOR: Record<GateOutcome, string> = {
  permit: "#5e9e72",
  escalate: "#d6a14a",
  hold: "#c99a3c",
  deny: "#c0573f",
};

// How far the gate bar lowers for each decision (0 = open, 1 = shut).
const BAR: Record<GateOutcome, number> = { permit: 0, escalate: 0.55, hold: 0.75, deny: 1 };
const CYCLE_MS = 5600;

/**
 * Authority under test: for each illustrative request, the gate shows the
 * decision the agent's controls should make, and the card compares it with
 * what the agent actually did. Cycles while in view until the visitor picks a
 * request; reduced motion shows each state without animation.
 */
export function ActionGate({ tests, title }: { tests: GateTest[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!auto || !visible || !motionOk) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % tests.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [auto, visible, tests.length]);

  const current = tests[active];
  const color = BAR_COLOR[current.expected];

  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1.1fr]">
      <div role="group" aria-label={title} className="grid gap-2">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Requests · illustrative</p>
        {tests.map((t, i) => (
          <button
            key={t.request}
            type="button"
            aria-pressed={active === i}
            onClick={() => {
              setAuto(false);
              setActive(i);
            }}
            className={cn(
              "flex items-center justify-between gap-3 border px-4 py-3 text-left transition-[border-color,background-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold",
              active === i ? "border-antique-gold bg-antique-gold/10 text-ivory" : "border-rule text-fg-muted hover:border-antique-gold/50 hover:text-fg",
            )}
          >
            <span className="font-mono text-[13px]">{t.request}</span>
            <span
              className={cn(
                "shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em]",
                t.pass ? "text-state-verified" : "text-[#e08a76]",
              )}
            >
              {t.pass ? "Held" : "Failed"}
            </span>
          </button>
        ))}
      </div>

      <figure className="mx-auto w-44 text-center" aria-hidden="true">
        <svg viewBox="0 0 200 220" className="w-full">
          <defs>
            <linearGradient id="gate-col" x1="0" x2="1">
              <stop offset="0" stopColor="#6f4d22" />
              <stop offset="0.5" stopColor="#d6a14a" />
              <stop offset="1" stopColor="#6f4d22" />
            </linearGradient>
          </defs>
          <rect x="18" y="20" width="22" height="190" fill="url(#gate-col)" rx="2" />
          <rect x="160" y="20" width="22" height="190" fill="url(#gate-col)" rx="2" />
          <rect x="10" y="10" width="180" height="14" fill="url(#gate-col)" rx="2" />
          <g className="gate-bar" style={{ transform: `translateY(${BAR[current.expected] * 150}px)` }}>
            <rect x="40" y="34" width="120" height="10" fill={color} rx="2" />
          </g>
          <circle cx="100" cy="17" r="5" fill={color} className="gate-beacon" />
        </svg>
        <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">
          Should: <span style={{ color }}>{LABEL[current.expected]}</span>
        </figcaption>
      </figure>

      <div
        key={active}
        className={cn("lc-fade border-l-2 bg-panel p-6", current.pass ? "border-state-verified" : "border-state-contradicted")}
        aria-live="polite"
      >
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Should</dt>
            <dd className="mt-1 font-semibold text-fg">{LABEL[current.expected]}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Observed</dt>
            <dd className="mt-1 text-fg">{current.observed}</dd>
          </div>
        </dl>
        <p
          className={cn(
            "mt-4 border-t border-rule pt-4 font-display text-xl leading-snug",
            current.pass ? "text-state-verified" : "text-[#e08a76]",
          )}
        >
          {current.pass ? "Control held. " : "Finding. "}
          <span className="text-fg">{current.verdict}</span>
        </p>
      </div>
    </div>
  );
}
