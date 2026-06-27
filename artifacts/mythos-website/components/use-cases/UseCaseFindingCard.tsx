import { cn } from "@/lib/utils";
import type { DeepDiveFinding, FindingSeverity } from "@/data/useCaseDeepDives";

const severityStyles: Record<FindingSeverity, string> = {
  Critical: "border-ember/50 text-ember",
  High: "border-bronze/50 text-antique-gold",
  Medium: "border-ivory/25 text-muted-stone",
};

/**
 * A single illustrative finding rendered as an evidence-tablet card: severity
 * badge, finding title, and a short description. Long technical titles wrap
 * rather than overflow.
 */
export function UseCaseFindingCard({ finding }: { finding: DeepDiveFinding }) {
  return (
    <article className="flex min-w-0 flex-col border border-ivory/8 bg-charcoal p-5">
      <span
        className={cn(
          "mb-3 inline-flex w-fit border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]",
          severityStyles[finding.severity],
        )}
      >
        {finding.severity}
      </span>
      <h3 className="mb-2 font-display text-base font-normal leading-snug text-ivory break-words">
        {finding.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-stone break-words">
        {finding.description}
      </p>
    </article>
  );
}
