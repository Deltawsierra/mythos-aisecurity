"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface LoopStage {
  name: string;
  uncertainty: string;
  consequence: string;
  question: string;
}

/**
 * From digital output to physical consequence (Launch Guide HE02): sense,
 * decide, act, monitor as a loop the visitor steps through. Each stage says
 * where uncertainty enters and what it could lead to in the world.
 */
export function PhysicalLoop({ stages }: { stages: LoopStage[] }) {
  const [i, setI] = useState(0);
  const s = stages[i];
  const R = 120;
  const pos = (k: number) => {
    const a = (-90 + (k * 360) / stages.length) * (Math.PI / 180);
    return { x: 160 + R * Math.cos(a), y: 160 + R * Math.sin(a) };
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative mx-auto w-full max-w-[22rem]">
        <svg viewBox="0 0 320 320" className="w-full" aria-hidden="true">
          <circle cx="160" cy="160" r={R} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" className="text-fg" />
          <circle
            cx="160"
            cy="160"
            r={R}
            fill="none"
            stroke="#d0a45a"
            strokeWidth="3"
            pathLength={stages.length}
            strokeDasharray={`${i + 1} ${stages.length}`}
            transform="rotate(-90 160 160)"
            className="labyrinth-trace"
          />
          <text x="160" y="155" textAnchor="middle" className="fill-current font-display text-[15px] text-fg-muted">
            The physical
          </text>
          <text x="160" y="175" textAnchor="middle" className="fill-current font-display text-[15px] text-fg-muted">
            world
          </text>
        </svg>
        {stages.map((st, k) => {
          const p = pos(k);
          return (
            <button
              key={st.name}
              type="button"
              aria-pressed={i === k}
              aria-controls="loop-detail"
              onClick={() => setI(k)}
              className={cn(
                "absolute flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
                i === k ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-rule bg-panel text-fg hover:border-accent",
              )}
              style={{ left: `${(p.x / 320) * 100}%`, top: `${(p.y / 320) * 100}%` }}
            >
              {st.name}
            </button>
          );
        })}
      </div>
      <div id="loop-detail" aria-live="polite">
        <div key={s.name} className="lc-fade border border-rule bg-panel p-6 shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Stage {i + 1} of {stages.length} · {s.name}
          </p>
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Where uncertainty enters</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-fg">{s.uncertainty}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">What it could lead to</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-fg">{s.consequence}</dd>
            </div>
          </dl>
          <p className="mt-5 border-t border-rule pt-4 font-display text-xl leading-snug text-fg">{s.question}</p>
        </div>
      </div>
    </div>
  );
}
