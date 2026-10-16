"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type NodeKind = "entry" | "endpoint" | "agent" | "provider" | "shadow" | "tool" | "identity" | "secret" | "data" | "ops";

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
  { id: "portal", label: "Support portal", x: 280, y: 280, kind: "endpoint", wave: 1 },
  { id: "gateway", label: "API gateway", x: 470, y: 280, kind: "endpoint", wave: 2 },
  { id: "logs", label: "Gateway logs", x: 470, y: 110, kind: "ops", wave: 3 },
  { id: "agent", label: "Agent service", x: 660, y: 280, kind: "agent", wave: 3 },
  { id: "identity", label: "Service identity", x: 660, y: 110, kind: "identity", wave: 4 },
  { id: "repo", label: "Repo & pipeline", x: 470, y: 455, kind: "ops", wave: 4 },
  { id: "secret", label: "Pipeline secret", x: 280, y: 455, kind: "secret", wave: 5 },
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
  { from: "agent", to: "identity" },
  { from: "repo", to: "agent" },
  { from: "secret", to: "repo" },
  { from: "agent", to: "providerA", kind: "attested" },
  { from: "agent", to: "payments" },
  { from: "agent", to: "vectors" },
  { from: "agent", to: "providerB", kind: "shadow" },
];

const TYPE: Record<NodeKind, string> = {
  entry: "Entry point",
  endpoint: "Endpoint",
  agent: "Agent",
  provider: "Model route",
  shadow: "Model route",
  tool: "Tool",
  identity: "Identity",
  secret: "Secret",
  data: "Data",
  ops: "Logs & delivery",
};

const STATUS: Partial<Record<NodeKind, string>> = { provider: "Declared · attested", shadow: "Undeclared" };

const FILTERS: { id: string; label: string; kinds: NodeKind[] | null }[] = [
  { id: "all", label: "Everything", kinds: null },
  { id: "routes", label: "Models & routes", kinds: ["provider", "shadow"] },
  { id: "agents", label: "Agents & tools", kinds: ["agent", "tool"] },
  { id: "identity", label: "Identities & secrets", kinds: ["identity", "secret", "entry"] },
  { id: "data", label: "Data & logs", kinds: ["data", "ops"] },
  { id: "endpoints", label: "Endpoints", kinds: ["endpoint", "entry"] },
];

const W = 1100;
const H = 560;
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Exposure and route graph (Launch Guide A04): an illustrative AI system
 * discovered wave by wave — endpoints, agent, identity, secret, tools, data
 * and model routes — ending on an attested route and an undeclared one.
 * Filters dim everything outside a category (keyboard buttons, never colour
 * alone); the same map is available as a table. Reduced motion shows the
 * finished map; phones get the nodes as a list.
 */
export function SystemMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const active = FILTERS.find((f) => f.id === filter)!;
  const lit = (kind: NodeKind) => !active.kinds || active.kinds.includes(kind);

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
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter the map">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors",
              filter === f.id ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-ivory/25 text-ivory/85 hover:border-ivory/60",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto hidden max-w-6xl lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="sweep" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#d0a45a" stopOpacity="0.18" />
              <stop offset="1" stopColor="#d0a45a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle data-sweep cx={90} cy={280} r={520} fill="url(#sweep)" />
          {EDGES.map((e) => {
            const a = byId[e.from];
            const b = byId[e.to];
            const on = lit(a.kind) || lit(b.kind);
            return (
              <g key={`${e.from}-${e.to}`} style={{ opacity: on ? 1 : 0.15, transition: "opacity 0.4s ease" }}>
                <line
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
                  strokeOpacity={e.kind ? 1 : 0.75}
                  className={e.kind === "shadow" ? "map-shadow-route" : undefined}
                />
              </g>
            );
          })}
        </svg>

        {NODES.map((n) => (
          <span
            key={n.id}
            data-wave={n.wave}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(n.x, W), top: pct(n.y, H) }}
          >
            <span
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border bg-navy px-3 py-2 text-xs font-medium transition-opacity duration-300",
                n.kind === "shadow"
                  ? "border-state-contradicted/80 text-ivory shadow-[0_0_24px_-4px_rgba(192,87,63,0.6)]"
                  : n.kind === "entry"
                    ? "border-antique-gold/70 text-ivory"
                    : "border-rule text-ivory/90",
                !lit(n.kind) && "opacity-25",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-2 w-2 rounded-full",
                  n.kind === "shadow" ? "bg-state-contradicted" : n.kind === "provider" ? "bg-state-verified" : n.kind === "secret" || n.kind === "identity" ? "bg-champagne" : "bg-antique-gold",
                )}
              />
              {n.label}
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ivory/50">{TYPE[n.kind]}</span>
            </span>
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

      {/* Legend */}
      <ul className="mx-auto mt-8 hidden max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ivory/80 lg:flex" aria-label="Legend">
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-px w-6 bg-bronze" />Discovered link</li>
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-0.5 w-6 bg-state-verified" />✓ Declared route, attested</li>
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-0.5 w-6 border-t-2 border-dashed border-state-contradicted" />! Undeclared route</li>
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-champagne" />Identity or secret</li>
      </ul>

      {/* Phones: the nodes as a list (filter applies). */}
      <ul className="mx-auto grid max-w-md gap-2 text-sm lg:hidden">
        {NODES.filter((n) => lit(n.kind)).map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex items-center gap-3 border bg-panel px-3 py-2",
              n.kind === "shadow" ? "border-state-contradicted/70 text-fg" : "border-rule text-fg",
            )}
          >
            <span className={cn("h-2 w-2 shrink-0 rounded-full", n.kind === "shadow" ? "bg-state-contradicted" : "bg-antique-gold")} />
            {n.label}
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
              {n.kind === "shadow" ? <span className="text-[#e08a76]">Undeclared route</span> : n.kind === "provider" ? <span className="text-state-verified">Attested</span> : TYPE[n.kind]}
            </span>
          </li>
        ))}
      </ul>

      {/* Desktop: the same map as a table. */}
      <details className="mx-auto mt-6 hidden max-w-3xl text-sm lg:block">
        <summary className="cursor-pointer text-center text-[13px] font-semibold text-champagne">View the map as a table</summary>
        <table className="mt-4 w-full border border-rule text-left">
          <caption className="sr-only">Illustrative system: nodes, types and route status</caption>
          <thead>
            <tr className="border-b border-rule text-[10px] uppercase tracking-[0.2em] text-fg-muted">
              <th scope="col" className="px-4 py-2 font-semibold">Node</th>
              <th scope="col" className="px-4 py-2 font-semibold">Type</th>
              <th scope="col" className="px-4 py-2 font-semibold">Connects to</th>
              <th scope="col" className="px-4 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {NODES.map((n) => (
              <tr key={n.id}>
                <th scope="row" className="px-4 py-2 font-normal text-fg">{n.label}</th>
                <td className="px-4 py-2 text-fg-muted">{TYPE[n.kind]}</td>
                <td className="px-4 py-2 text-fg-muted">
                  {EDGES.filter((e) => e.from === n.id).map((e) => byId[e.to].label).join(", ") || "—"}
                </td>
                <td className="px-4 py-2 text-fg">{STATUS[n.kind] ?? "Discovered"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Illustrative system · synthetic data</p>
    </div>
  );
}
