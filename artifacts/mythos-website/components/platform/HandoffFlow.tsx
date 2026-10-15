import { cn } from "@/lib/utils";

export interface HandoffStep {
  name: string;
  detail: string;
  icon: string;
  /** Which part of the system owns this step. */
  owner: string;
}

/** A left-to-right handoff, e.g. Athena finding → SPINE claim → decision. */
export function HandoffFlow({ steps }: { steps: HandoffStep[] }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-flow-col lg:grid-cols-none" data-reveal-group>
      {steps.map((step, i) => (
        <li key={step.name} className="relative flex flex-col border border-rule bg-panel p-5">
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-accent lg:block">
              →
            </span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={step.icon} alt="" aria-hidden="true" className="h-12 w-12" />
          <p className={cn("mt-4 text-[10px] font-semibold uppercase tracking-[0.22em]", "text-accent")}>{step.owner}</p>
          <p className="mt-1 font-display text-xl leading-tight text-fg">{step.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
