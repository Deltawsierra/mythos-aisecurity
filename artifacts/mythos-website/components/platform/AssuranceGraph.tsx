"use client";

import { useEffect, useRef, useState } from "react";
import { GRAPH_NODES, GRAPH_TRACES, type GraphNodeId } from "@/content/spine";
import { SPINE_CORE_MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

const W = 1000;
const H = 600;
const CX = W / 2;
const CY = H / 2;

// Nodes sit on an ellipse around the SPINE core.
const POS = Object.fromEntries(
  GRAPH_NODES.map((node, i) => {
    const angle = -Math.PI / 2 + (i / GRAPH_NODES.length) * Math.PI * 2;
    return [node.id, { x: CX + Math.cos(angle) * 400, y: CY + Math.sin(angle) * 235 }];
  }),
) as Record<GraphNodeId, { x: number; y: number }>;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const CYCLE_MS = 6500;

/**
 * The assurance graph around the SPINE core. Choosing a question lights the
 * path SPINE follows through the graph to answer it. The traces cycle on
 * their own while in view until the visitor picks one.
 */
export function AssuranceGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const [trace, setTrace] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => setVisible(entries.some((e) => e.isIntersecting)), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!auto || !visible || !motionOk) return;
    const id = window.setInterval(() => setTrace((t) => (t + 1) % GRAPH_TRACES.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [auto, visible]);

  const current = GRAPH_TRACES[trace];
  const onPath = new Set(current.path);
  const d = current.path.map((id, i) => `${i ? "L" : "M"}${POS[id].x.toFixed(1)} ${POS[id].y.toFixed(1)}`).join(" ");

  const choose = (i: number) => {
    setAuto(false);
    setTrace(i);
  };

  return (
    <div ref={ref}>
      <div role="group" aria-label="Choose a question" className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
        {GRAPH_TRACES.map((t, i) => (
          <button
            key={t.question}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={trace === i}
            className={cn(
              "border px-4 py-2 text-left text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold",
              trace === i
                ? "border-antique-gold bg-antique-gold/10 text-ivory"
                : "border-rule text-fg-muted hover:border-antique-gold/50 hover:text-fg",
            )}
          >
            {t.question}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-10 hidden max-w-5xl lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          {GRAPH_NODES.map((n) => (
            <line
              key={n.id}
              x1={CX}
              y1={CY}
              x2={POS[n.id].x}
              y2={POS[n.id].y}
              stroke="#b8823f"
              strokeWidth={1}
              strokeDasharray="2 7"
              className={cn("transition-opacity duration-700", onPath.has(n.id) ? "opacity-50" : "opacity-20")}
            />
          ))}
          <path key={`base-${trace}`} d={d} pathLength={1} fill="none" stroke="#d6a14a" strokeWidth={2.2} className="graph-draw" />
          <path key={`flow-${trace}`} d={d} fill="none" stroke="#ffe2a8" strokeWidth={2.2} className="arch-flow" />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SPINE_CORE_MEDIA.cutout.src}
          loading="lazy"
          alt=""
          aria-hidden="true"
          className="core-sway absolute left-1/2 top-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        />

        {GRAPH_NODES.map((n) => {
          const lit = onPath.has(n.id);
          const step = current.path.indexOf(n.id);
          return (
            <span
              key={n.id}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-700",
                lit
                  ? "border-antique-gold bg-navy text-antique-gold shadow-[0_0_28px_-4px_rgba(214,161,74,0.55)]"
                  : "border-rule bg-navy/80 text-fg-muted",
              )}
              style={{ left: pct(POS[n.id].x, W), top: pct(POS[n.id].y, H) }}
            >
              {lit && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-antique-gold text-[9px] tracking-normal text-navy">
                  {step + 1}
                </span>
              )}
              {n.name}
            </span>
          );
        })}
      </div>

      {/* Phones and tablets: the selected path as a sequence. */}
      <ol className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-2 lg:hidden">
        {current.path.map((id, i) => (
          <li key={id} className="flex items-center gap-2">
            <span className="border border-antique-gold/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold">
              {GRAPH_NODES.find((n) => n.id === id)?.name}
            </span>
            {i < current.path.length - 1 && <span aria-hidden="true" className="text-bronze">→</span>}
          </li>
        ))}
      </ol>

      <p key={trace} className="lc-fade mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-fg-muted" aria-live="polite">
        <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Illustrative</span>
        {current.caption}
      </p>
    </div>
  );
}
