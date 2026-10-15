"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type NodeKind = "entry" | "service" | "provider" | "data" | "tool" | "ops" | "shadow";

interface MapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: NodeKind;
  /** Discovery order. */
  wave: number;
}

// An illustrative AI support system, in a 1100 × 560 space.
const NODES: MapNode[] = [
  { id: "users", label: "Customers", x: 90, y: 280, kind: "entry", wave: 0 },
  { id: "portal", label: "Support portal", x: 280, y: 280, kind: "service", wave: 1 },
  { id: "gateway", label: "API gateway", x: 470, y: 280, kind: "service", wave: 2 },
  { id: "logs", label: "Gateway logs", x: 470, y: 110, kind: "ops", wave: 3 },
  { id: "agent", label: "Agent service", x: 660, y: 280, kind: "service", wave: 3 },
  { id: "repo", label: "Repo & pipeline", x: 470, y: 455, kind: "ops", wave: 4 },
  { id: "providerA", label: "Model provider", x: 890, y: 140, kind: "provider", wave: 4 },
  { id: "payments", label: "Payments API", x: 890, y: 280, kind: "tool", wave: 4 },
  { id: "vectors", label: "Vector store", x: 660, y: 455, kind: "data", wave: 4 },
  { id: "providerB", label: "Second provider", x: 890, y: 430, kind: "shadow", wave: 5 },
];

const EDGES: { from: string; to: string; kind?: "attested" | "shadow" }[] = [
  { from: "users", to: "portal" },
  { from: "portal", to: "gateway" },
  { from: "gateway", to: "logs" },
  { from: "gateway", to: "agent" },
  { from: "repo", to: "agent" },
  { from: "agent", to: "providerA", kind: "attested" },
  { from: "agent", to: "payments" },
  { from: "agent", to: "vectors" },
  { from: "agent", to: "providerB", kind: "shadow" },
];

const W = 1100;
const H = 560;
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * What Athena sees: an illustrative AI system discovered wave by wave — routes,
 * identities, tools and data — ending on an attested model route and an
 * undeclared one. Draws once on entering the view; reduced motion shows the
 * finished map. Phones get the findings as a list.
 */
export function SystemMap() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.from(root.querySelector("[data-sweep]"), { autoAlpha: 0, duration: 0.4 });
        // Not every wave has edges of each kind; skip empty selections.
        const from = (selector: string, vars: gsap.TweenVars, at: number) => {
          const targets = root.querySelectorAll(selector);
          if (targets.length) tl.from(targets, vars, at);
        };
        const waves = Math.max(...NODES.map((n) => n.wave));
        for (let w = 0; w <= waves; w++) {
          const at = 0.2 + w * 0.42;
          from(`[data-wave="${w}"]`, { autoAlpha: 0, scale: 0.8, duration: 0.55, stagger: 0.08 }, at);
          from(`[data-edge-wave="${w}"]`, { strokeDashoffset: 1, duration: 0.5, ease: "power2.out" }, at - 0.12);
          from(`[data-edge-fade="${w}"]`, { autoAlpha: 0, duration: 0.6 }, at - 0.12);
        }
        tl.from(root.querySelectorAll("[data-badge]"), { autoAlpha: 0, y: 8, duration: 0.6, stagger: 0.3 }, ">-0.1");
        tl.to(root.querySelector("[data-sweep]"), { autoAlpha: 0, duration: 0.8 }, "<");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div className="relative mx-auto hidden max-w-6xl lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="sweep" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#d6a14a" stopOpacity="0.18" />
              <stop offset="1" stopColor="#d6a14a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle data-sweep cx={90} cy={280} r={520} fill="url(#sweep)" />
          {EDGES.map((e) => {
            const a = byId[e.from];
            const b = byId[e.to];
            return (
              <line
                key={`${e.from}-${e.to}`}
                // The warning route animates its dash in CSS, so it fades in on
                // its wave instead of drawing on.
                data-edge-wave={e.kind === "shadow" ? undefined : b.wave}
                data-edge-fade={e.kind === "shadow" ? b.wave : undefined}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                // Draw-on edges use a unit path; the warning route keeps real
                // units so its CSS dash pattern repeats along the line.
                pathLength={e.kind === "shadow" ? undefined : 1}
                strokeDasharray={e.kind === "shadow" ? undefined : 1}
                stroke={e.kind === "shadow" ? "#c0573f" : e.kind === "attested" ? "#5e9e72" : "#b8823f"}
                strokeWidth={e.kind ? 2.4 : 1.6}
                strokeOpacity={e.kind ? 1 : 0.7}
                className={e.kind === "shadow" ? "map-shadow-route" : undefined}
              />
            );
          })}
        </svg>

        {NODES.map((n) => (
          <span
            key={n.id}
            data-wave={n.wave}
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap border bg-navy px-3 py-2 text-xs font-medium",
              n.kind === "shadow"
                ? "border-state-contradicted/80 text-ivory shadow-[0_0_24px_-4px_rgba(192,87,63,0.6)]"
                : n.kind === "entry"
                  ? "border-antique-gold/70 text-ivory"
                  : "border-rule text-ivory/90",
            )}
            style={{ left: pct(n.x, W), top: pct(n.y, H) }}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-2 w-2 rounded-full",
                n.kind === "shadow" ? "bg-state-contradicted" : n.kind === "provider" ? "bg-state-verified" : "bg-antique-gold",
              )}
            />
            {n.label}
          </span>
        ))}

        <span
          data-badge
          className="absolute -translate-x-1/2 border border-state-verified/70 bg-navy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-state-verified"
          style={{ left: pct(775, W), top: pct(168, H) }}
        >
          ✓ Declared route attested
        </span>
        <span
          data-badge
          className="absolute -translate-x-1/2 border border-state-contradicted/80 bg-navy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e08a76]"
          style={{ left: pct(775, W), top: pct(372, H) }}
        >
          ! Undeclared route found
        </span>
      </div>

      <ul className="mx-auto grid max-w-md gap-2 text-sm lg:hidden">
        {NODES.map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex items-center gap-3 border bg-panel px-3 py-2",
              n.kind === "shadow" ? "border-state-contradicted/70 text-fg" : "border-rule text-fg",
            )}
          >
            <span className={cn("h-2 w-2 shrink-0 rounded-full", n.kind === "shadow" ? "bg-state-contradicted" : "bg-antique-gold")} />
            {n.label}
            {n.kind === "shadow" && <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e08a76]">Undeclared route</span>}
            {n.kind === "provider" && <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.16em] text-state-verified">Attested</span>}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Illustrative system</p>
    </div>
  );
}
