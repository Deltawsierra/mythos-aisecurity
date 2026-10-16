import { cn } from "@/lib/utils";

export interface Exchange {
  label: string;
  lines: { key: string; value: string; changed?: boolean }[];
}

interface DifferentialEvidenceProps {
  control: Exchange;
  test: Exchange;
  verdict: string;
}

/**
 * Differential evidence: the same request made two ways, side by side, with
 * only what changed highlighted. The verdict rests on the difference, not on
 * the test alone.
 */
export function DifferentialEvidence({ control, test, verdict }: DifferentialEvidenceProps) {
  return (
    <figure className="border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(21,35,51,0.5)]" data-reveal>
      <div className="grid md:grid-cols-2">
        {[control, test].map((ex, i) => (
          <div key={ex.label} className={cn("p-6", i === 1 && "border-t border-rule md:border-l md:border-t-0")}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{ex.label}</p>
            <dl className="mt-4 grid gap-1.5 font-mono text-[13px]">
              {ex.lines.map((line) => (
                <div
                  key={line.key}
                  className={cn(
                    "grid grid-cols-[6.5rem_1fr] gap-3 px-2 py-1",
                    line.changed ? "bg-state-contradicted/10 text-state-contradicted-ink" : "text-fg",
                  )}
                >
                  <dt className="text-fg-muted">{line.key}</dt>
                  <dd>
                    {line.changed && <span className="sr-only">Changed: </span>}
                    {line.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <figcaption className="flex items-start gap-3 border-t border-rule bg-marble/50 px-6 py-4 text-sm leading-relaxed text-fg">
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Verdict</span>
        {verdict}
      </figcaption>
    </figure>
  );
}
