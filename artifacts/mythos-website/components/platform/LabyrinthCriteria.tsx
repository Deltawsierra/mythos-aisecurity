"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Criterion {
  name: string;
  question: string;
  body: string;
}

const C = 220;
const GAP = 16;
const RADII = [200, 168, 136, 104, 72, 40];

type Pt = [number, number];

/** Wall of ring i with its gap at the top (even rings) or bottom (odd rings). */
function wall(i: number): string {
  const r = RADII[i];
  const top = i % 2 === 0;
  const pts: Pt[] = top
    ? [[C + GAP, C - r], [C + r, C - r], [C + r, C + r], [C - r, C + r], [C - r, C - r], [C - GAP, C - r]]
    : [[C - GAP, C + r], [C - r, C + r], [C - r, C - r], [C + r, C - r], [C + r, C + r], [C + GAP, C + r]];
  return "M" + pts.map((p) => p.join(" ")).join(" L");
}

/**
 * The walk: in through the outer gap, round each corridor to the next gap,
 * and on to the centre. `marks[i]` is the distance at which corridor i
 * (criterion i) has been fully walked.
 */
function walk() {
  const pts: Pt[] = [[C, C - RADII[0] - 26]];
  const marks: number[] = [];
  for (let i = 0; i < RADII.length - 1; i++) {
    const m = (RADII[i] + RADII[i + 1]) / 2;
    const fromTop = i % 2 === 0;
    const sx = i % 4 < 2 ? 1 : -1; // alternate the side walked, so the trace sweeps the whole maze
    if (fromTop) pts.push([C, C - m], [C + sx * m, C - m], [C + sx * m, C + m], [C, C + m]);
    else pts.push([C, C + m], [C + sx * m, C + m], [C + sx * m, C - m], [C, C - m]);
    let len = 0;
    for (let k = 1; k < pts.length; k++) len += Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1]);
    marks.push(len);
  }
  pts.push([C, C]);
  let total = 0;
  for (let k = 1; k < pts.length; k++) total += Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1]);
  return { d: "M" + pts.map((p) => p.join(" ")).join(" L"), marks, total };
}

const PATH = walk();

/**
 * Minotaur's labyrinth (Launch Guide M01–M03 signature): each ring is one
 * validity criterion, outermost first. Choosing a ring traces the gold path
 * to it and reveals what that criterion checks; the centre is the human
 * release decision, which Minotaur informs but never makes.
 */
export function LabyrinthCriteria({ criteria, centre }: { criteria: Criterion[]; centre: Criterion }) {
  const [active, setActive] = useState(0);
  const items = [...criteria, centre];
  const current = items[active];
  const reached = active < criteria.length ? PATH.marks[active] : PATH.total;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative mx-auto w-full max-w-[30rem]" aria-hidden="true">
        <div className="absolute inset-[12%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(229,197,143,0.28), transparent 70%)" }} />
        <svg viewBox="0 0 440 440" className="relative w-full">
          <defs>
            <linearGradient id="lab-gold" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#80511d" />
              <stop offset="0.5" stopColor="#d0a45a" />
              <stop offset="1" stopColor="#e5c58f" />
            </linearGradient>
            <filter id="lab-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          {RADII.map((_, i) => (
            <path
              key={i}
              d={wall(i)}
              fill="none"
              stroke={i === active ? "#d0a45a" : "currentColor"}
              strokeOpacity={i === active ? 1 : 0.35}
              strokeWidth={i === active ? 3 : 2}
              strokeLinecap="square"
              className="text-fg transition-[stroke,stroke-opacity] duration-500"
            />
          ))}
          <path
            d={PATH.d}
            fill="none"
            stroke="#e5c58f"
            strokeWidth="10"
            strokeLinejoin="round"
            strokeDasharray={PATH.total}
            strokeDashoffset={PATH.total - reached}
            filter="url(#lab-glow)"
            opacity="0.7"
            className="labyrinth-trace"
          />
          <path
            d={PATH.d}
            fill="none"
            stroke="url(#lab-gold)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={PATH.total}
            strokeDashoffset={PATH.total - reached}
            className="labyrinth-trace"
          />
          <circle cx={C} cy={C} r="14" fill={active === criteria.length ? "#e5c58f" : "none"} stroke="#d0a45a" strokeWidth="2" className="transition-[fill] duration-500" />
        </svg>
      </div>

      <div>
        <ol className="grid gap-2" aria-label="Validity criteria, outer ring first">
          {items.map((item, i) => (
            <li key={item.name}>
              <button
                type="button"
                aria-pressed={active === i}
                aria-controls="labyrinth-detail"
                onClick={() => setActive(i)}
                className={cn(
                  "flex w-full items-baseline gap-4 border px-4 py-3 text-left transition-colors",
                  active === i ? "border-accent bg-panel" : "border-rule hover:border-accent/60",
                )}
              >
                <span className="font-display text-lg text-accent">{i < criteria.length ? String(i + 1).padStart(2, "0") : "◎"}</span>
                <span className="flex-1">
                  <span className="block font-display text-xl leading-tight text-fg">{item.name}</span>
                  <span className="mt-0.5 block text-sm text-fg-muted">{item.question}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div id="labyrinth-detail" aria-live="polite" className="mt-4">
          <p key={current.name} className="lc-fade border-l-2 border-accent bg-panel px-5 py-4 text-[15px] leading-relaxed text-fg">
            {current.body}
          </p>
        </div>
      </div>
    </div>
  );
}
