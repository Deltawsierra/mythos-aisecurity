"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface OperatingLayer {
  id: string;
  name: string;
  summary: string;
  risks: string[];
  evidence: string[];
  controls: string[];
}

/**
 * The operating layers of a physical AI system (Launch Guide HE03) as
 * accessible tabs: arrow keys move between layers, and every panel is in the
 * page (hidden, not removed) so the text is there without script.
 */
export function LayerSelector({ layers }: { layers: OperatingLayer[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = active;
    if (e.key in step) next = (active + step[e.key] + layers.length) % layers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = layers.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <div role="tablist" aria-label="Operating layers" aria-orientation="vertical" className="grid content-start gap-2" onKeyDown={onKeyDown}>
        {layers.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`layer-tab-${l.id}`}
            aria-selected={active === i}
            aria-controls={`layer-panel-${l.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-4 border px-4 py-3 text-left transition-colors",
              active === i ? "border-accent bg-panel" : "border-rule hover:border-accent/60",
            )}
          >
            <span className="font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-xl leading-tight text-fg">{l.name}</span>
          </button>
        ))}
      </div>
      {layers.map((l, i) => (
        <div
          key={l.id}
          role="tabpanel"
          id={`layer-panel-${l.id}`}
          aria-labelledby={`layer-tab-${l.id}`}
          hidden={active !== i}
          className="border border-rule bg-panel p-6 shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]"
        >
          <p className="font-display text-2xl leading-snug text-fg">{l.summary}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {(
              [
                ["What can go wrong", l.risks],
                ["Evidence to gather", l.evidence],
                ["Controls to test", l.controls],
              ] as const
            ).map(([heading, items]) => (
              <div key={heading}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{heading}</p>
                <ul className="mt-2 grid gap-1.5 text-sm text-fg">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
