"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Portrait } from "@/components/platform/Portrait";
import {
  ARCHITECTURE_LINKS,
  MYTHOS_CORE,
  PROJECTS,
  type ArchitectureNodeId,
} from "@/content/platform";
import type { ProjectId } from "@/content/media";
import { cn } from "@/lib/utils";

// Layout in a 1100 × 750 coordinate space shared by the SVG and the nodes.
const W = 1100;
const H = 750;
const POS: Record<ProjectId, { x: number; y: number }> = {
  minotaur: { x: 550, y: 70 },
  athena: { x: 170, y: 340 },
  spine: { x: 550, y: 340 },
  achilles: { x: 930, y: 340 },
  hermes: { x: 930, y: 545 },
};
const R = 58; // node radius
const LABEL_H = 76; // name + tagline under each portrait
const CORE_Y = 712;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** Path for each link, keyed by `from>to`. */
function linkPath(from: ArchitectureNodeId, to: ArchitectureNodeId): string {
  if (from === "core" || to === "core") return "";
  const a = POS[from];
  const b = POS[to];
  if (from === "minotaur") {
    // Arc down from under Minotaur's name into the top of each engine.
    const startY = a.y + R + LABEL_H;
    if (b.x === a.x) return `M ${a.x} ${startY} L ${b.x} ${b.y - R - 10}`;
    return `M ${a.x} ${startY} C ${a.x} ${startY + 50}, ${b.x} ${b.y - R - 90}, ${b.x} ${b.y - R - 10}`;
  }
  if (from === "spine" && to === "hermes") {
    return `M ${a.x + R * 0.7} ${a.y + R * 0.7} C ${a.x + 120} ${a.y + 190}, ${b.x - 220} ${b.y}, ${b.x - R - 6} ${b.y}`;
  }
  // Horizontal engine links; the SPINE ↔ Achilles pair runs on two tracks.
  const offset = from === "spine" && to === "achilles" ? -14 : from === "achilles" ? 14 : 0;
  const dir = b.x > a.x ? 1 : -1;
  return `M ${a.x + dir * (R + 6)} ${a.y + offset} L ${b.x - dir * (R + 10)} ${b.y + offset}`;
}

function labelPos(from: ArchitectureNodeId, to: ArchitectureNodeId) {
  if (from === "core" || to === "core") return { x: 0, y: 0 };
  const a = POS[from];
  const b = POS[to];
  if (from === "minotaur") return { x: (a.x + b.x) / 2 + (b.x > a.x ? 40 : -40), y: a.y + R + LABEL_H + 34 };
  if (to === "hermes") return { x: a.x + 150, y: b.y + 30 };
  const offset = from === "spine" && to === "achilles" ? -26 : from === "achilles" ? 34 : -16;
  return { x: (a.x + b.x) / 2, y: a.y + offset };
}

/**
 * The Mythos architecture as one system. Hover, focus or tap a project to
 * light its paths and read its role; links flow toward SPINE, the system of
 * record. Phones get the same information as a stacked list.
 */
export function ArchitectureMap() {
  const [active, setActive] = useState<ArchitectureNodeId>("spine");

  const connected = (id: ArchitectureNodeId) =>
    active === "core"
      ? id !== "minotaur"
      : id === active ||
        ARCHITECTURE_LINKS.some((l) => (l.from === active && l.to === id) || (l.to === active && l.from === id));
  const linkLit = (from: ArchitectureNodeId, to: ArchitectureNodeId) =>
    active === "core" ? false : from === active || to === active;

  const detail =
    active === "core"
      ? { name: MYTHOS_CORE.name, tagline: MYTHOS_CORE.tagline, role: MYTHOS_CORE.role, href: "/trust" }
      : PROJECTS.find((p) => p.id === active)!;

  return (
    <div>
      {/* Desktop map */}
      <div className="relative mx-auto hidden max-w-6xl lg:block">
        <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
              </marker>
              <linearGradient id="arch-core" x1="0" x2="1">
                <stop offset="0" stopColor="#a66a32" stopOpacity="0" />
                <stop offset="0.2" stopColor="#d6a14a" />
                <stop offset="0.8" stopColor="#d6a14a" />
                <stop offset="1" stopColor="#a66a32" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Mythos Core roots */}
            {(["athena", "spine", "achilles"] as ProjectId[]).map((id) => (
              <line
                key={id}
                x1={POS[id].x}
                y1={POS[id].y + R + LABEL_H}
                x2={POS[id].x}
                y2={CORE_Y - 14}
                strokeDasharray="2 6"
                className={cn("transition-[opacity,stroke] duration-500", active === "core" ? "stroke-antique-gold opacity-100" : "stroke-bronze/60 opacity-60")}
                strokeWidth={1.5}
              />
            ))}

            {ARCHITECTURE_LINKS.map((link) => {
              const lit = linkLit(link.from, link.to);
              const d = linkPath(link.from, link.to);
              const lp = labelPos(link.from, link.to);
              return (
                <g
                  key={`${link.from}>${link.to}`}
                  className={cn("transition-opacity duration-500", lit ? "opacity-100" : "opacity-30")}
                  style={{ color: lit ? "#d6a14a" : "#a66a32" }}
                >
                  <path
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={lit ? 2 : 1.5}
                    strokeDasharray={link.kind === "validation" ? "5 7" : link.kind === "extension" ? "2 6" : undefined}
                    markerEnd="url(#arch-arrow)"
                  />
                  {lit && link.kind === "evidence" && (
                    <path d={d} fill="none" stroke="#ffe2a8" strokeWidth={2} className="arch-flow" />
                  )}
                  {/* The straight Minotaur → SPINE drop is self-explanatory. */}
                  {!(link.from === "minotaur" && link.to === "spine") && (
                  <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor="middle"
                    className="fill-current font-sans text-[13px] tracking-wide"
                    style={{ fill: lit ? "#f3e8d0" : "#9a8c78" }}
                  >
                    {link.label}
                  </text>
                  )}
                </g>
              );
            })}

            <rect x={110} y={CORE_Y - 14} width={W - 220} height={2} fill="url(#arch-core)" opacity={active === "core" ? 1 : 0.6} />
          </svg>

          {PROJECTS.map((p) => {
            const pos = POS[p.id];
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onPointerEnter={() => setActive(p.id)}
                onFocus={() => setActive(p.id)}
                onClick={() => setActive(p.id)}
                aria-pressed={isActive}
                className={cn(
                  "group absolute flex -translate-x-1/2 flex-col items-center text-center transition-opacity duration-500 focus-visible:outline-none",
                  connected(p.id) ? "opacity-100" : "opacity-45",
                )}
                // Anchored by the portrait's top edge so its centre lands exactly on
                // (x, y), where the links meet it.
                style={{ left: pct(pos.x, W), top: pct(pos.y - R, H), width: pct(R * 2 + 90, W) }}
              >
                <Portrait
                  project={p.id}
                  className={cn(
                    "w-[56%] transition-[transform,box-shadow] duration-500 group-focus-visible:ring-2 group-focus-visible:ring-antique-gold",
                    isActive && "scale-110 shadow-[0_0_0_4px_rgba(5,5,5,0.85),0_0_0_5px_rgba(214,161,74,0.9),0_0_40px_6px_rgba(214,161,74,0.35)]",
                  )}
                />
                <span className="mt-3 font-display text-2xl leading-none text-ivory">{p.name}</span>
                <span className={cn("mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]", isActive ? "text-antique-gold" : "text-muted-stone")}>
                  {p.tagline}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onPointerEnter={() => setActive("core")}
            onFocus={() => setActive("core")}
            onClick={() => setActive("core")}
            aria-pressed={active === "core"}
            className="group absolute left-1/2 flex -translate-x-1/2 items-center gap-3 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
            style={{ top: pct(CORE_Y - 4, H) }}
          >
            <span className={cn("font-display text-xl", active === "core" ? "text-antique-gold" : "text-ivory")}>{MYTHOS_CORE.name}</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-stone">{MYTHOS_CORE.tagline}</span>
          </button>
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl items-start gap-6 border-t border-rule pt-7 sm:grid-cols-[1fr_auto]" aria-live="polite">
          <div key={detail.name} className="lc-fade">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">{detail.tagline}</p>
            <p className="mt-1.5 font-display text-3xl text-fg">{detail.name}</p>
            <p className="mt-2 text-base leading-relaxed text-fg-muted">{detail.role}</p>
          </div>
          <Link
            href={detail.href}
            className="group inline-flex items-center gap-1.5 self-end text-[10px] font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
          >
            {active === "core" ? "See Trust & Security" : `Explore ${detail.name}`}
            <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Phones and tablets */}
      <ul className="mx-auto grid max-w-xl gap-4 lg:hidden">
        {PROJECTS.map((p) => {
          const out = ARCHITECTURE_LINKS.filter((l) => l.from === p.id && l.kind !== "validation");
          return (
            <li key={p.id}>
              <Link
                href={p.href}
                className="flex gap-4 border border-rule bg-panel p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              >
                <Portrait project={p.id} className="h-16 w-16 shrink-0" />
                <span>
                  <span className="block font-display text-2xl leading-none text-fg">{p.name}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{p.tagline}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-fg-muted">{p.role}</span>
                  {out.length > 0 && (
                    <span className="mt-2 block text-xs text-fg-muted/80">
                      {out.map((l) => `${l.label} → ${l.to === "spine" ? "SPINE" : PROJECTS.find((x) => x.id === l.to)?.name}`).join(" · ")}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
        <li className="border border-dashed border-rule p-4">
          <span className="block font-display text-2xl text-fg">{MYTHOS_CORE.name}</span>
          <span className="mt-2 block text-sm leading-relaxed text-fg-muted">{MYTHOS_CORE.role}</span>
        </li>
      </ul>
    </div>
  );
}
