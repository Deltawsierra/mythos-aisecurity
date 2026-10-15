import { cn } from "@/lib/utils";

export interface ChainStep {
  step: string;
  detail: string;
}

/**
 * A cross-channel chain: content arrives one way and acts another. A spark
 * travels the rail from first step to effect; reduced motion drops the spark
 * and keeps the static chain. The last step is marked as the effect.
 */
export function ChainFlow({ steps, label }: { steps: ChainStep[]; label: string }) {
  return (
    <figure>
      <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">{label}</figcaption>
      <div className="relative mt-6">
        <div aria-hidden="true" className="absolute inset-x-[10%] top-5 hidden h-px bg-gradient-to-r from-bronze/30 via-antique-gold/70 to-state-contradicted/80 md:block">
          <span className="chain-spark absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-antique-gold shadow-[0_0_12px_3px_rgba(214,161,74,0.7)]" />
        </div>
        <ol className="relative grid gap-4 md:grid-cols-5" data-reveal-group>
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s.step} className="flex gap-4 md:flex-col md:items-center md:text-center">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-lg",
                    last ? "border-state-contradicted bg-state-contradicted/10 text-state-contradicted-ink" : "border-accent bg-panel text-accent",
                  )}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block font-display text-xl leading-tight text-fg md:mt-3">{s.step}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{s.detail}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
