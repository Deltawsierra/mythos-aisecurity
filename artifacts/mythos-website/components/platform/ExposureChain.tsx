"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChainStepView {
  name: string;
  value: string;
  source: string;
}

export interface ChainScenario {
  id: string;
  label: string;
  steps: ChainStepView[];
}

/**
 * From technical evidence to business consequence (Launch Guide E02): a
 * verified effect, the loss pathway it opens, the drivers of a modeled range
 * and a possible response — each step with where it comes from. A scenario,
 * not a forecast; Mythos never knows the actual loss.
 */
export function ExposureChain({ scenarios }: { scenarios: ChainScenario[] }) {
  const [i, setI] = useState(0);
  const s = scenarios[i];
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a scenario">
        {scenarios.map((sc, k) => (
          <button
            key={sc.id}
            type="button"
            aria-pressed={i === k}
            onClick={() => setI(k)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              i === k ? "border-antique-gold bg-gradient-to-b from-champagne to-antique-gold text-charcoal" : "border-fg/30 text-fg hover:border-fg/60",
            )}
          >
            {sc.label}
          </button>
        ))}
        <span className="ml-auto self-center text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Synthetic scenario</span>
      </div>
      <ol key={s.id} aria-live="polite" className="lc-fade mt-6 grid gap-3 lg:grid-cols-4">
        {s.steps.map((step, k) => (
          <li key={step.name} className="relative flex flex-col border border-rule bg-panel p-5">
            {k < s.steps.length - 1 && (
              <ChevronRight size={18} aria-hidden="true" className="absolute -right-[0.95rem] top-1/2 z-10 hidden -translate-y-1/2 text-accent lg:block" />
            )}
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              {String(k + 1).padStart(2, "0")} · {step.name}
            </p>
            <p className="mt-2 font-display text-xl leading-snug text-fg">{step.value}</p>
            <p className="mt-auto border-t border-rule pt-3 text-xs leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Source · </span>
              {step.source}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
