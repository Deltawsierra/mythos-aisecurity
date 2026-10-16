import { Bot, Database, User, Wrench, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type WorkflowKind = "person" | "ai" | "data" | "tool" | "effect";

export interface WorkflowStep {
  kind: WorkflowKind;
  name: string;
  detail: string;
}

const KIND: Record<WorkflowKind, { label: string; Icon: LucideIcon }> = {
  person: { label: "Person", Icon: User },
  ai: { label: "AI system", Icon: Bot },
  data: { label: "Data", Icon: Database },
  tool: { label: "Tool or action", Icon: Wrench },
  effect: { label: "Effect", Icon: Zap },
};

/**
 * The scenario diagram for a use case: who asks, what the AI reaches, what it
 * can do, and where the authority boundary sits. Native DOM — an ordered list
 * that reads in sequence; on phones it stacks vertically.
 */
export function WorkflowPath({
  steps,
  boundaryBefore,
  boundaryLabel = "Authority boundary",
  className,
}: {
  steps: WorkflowStep[];
  /** Index of the step the authority boundary sits in front of. */
  boundaryBefore?: number;
  boundaryLabel?: string;
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-3 lg:grid-flow-col lg:auto-cols-fr lg:gap-0", className)} data-reveal-group>
      {steps.map((step, i) => {
        const { label, Icon } = KIND[step.kind];
        const boundary = boundaryBefore === i;
        return (
          <li key={step.name} className="relative flex lg:flex-col">
            {boundary && (
              <span
                aria-hidden="true"
                className="absolute -top-2 left-0 right-0 h-px border-t border-dashed border-antique-gold lg:-left-px lg:bottom-0 lg:right-auto lg:top-0 lg:h-auto lg:w-px lg:border-l lg:border-t-0"
              />
            )}
            {boundary && (
              <span className="absolute -top-5 left-0 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent lg:-top-6 lg:left-3">
                {boundaryLabel}
              </span>
            )}
            <div className={cn("relative flex flex-1 flex-col border border-rule bg-panel p-5 lg:mx-2", boundary && "mt-4 lg:mt-0")}>
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-bronze/40 text-accent">
                  <Icon size={14} aria-hidden="true" />
                </span>
                {label}
              </span>
              <p className="mt-3 font-display text-xl leading-snug text-fg">{step.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.detail}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute -right-1.5 top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-bronze/60 bg-transparent lg:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
