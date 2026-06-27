import { Fragment } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { OUTPUT_FLOW, OUTPUT_FLOW_LABEL } from "@/data/assessmentOutputs";

/**
 * "From finding to release decision" — a five-node flow connecting technical
 * evidence to a deployment decision. Horizontal on desktop, stacked on mobile.
 */
export function OutputFlow() {
  return (
    <div className="mt-16 border-t border-bronze/15 pt-12">
      <div className="mb-8 max-w-2xl">
        <h3 className="font-display text-2xl font-normal leading-tight text-ivory">
          From finding to release decision
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-stone">
          Mythos connects technical evidence to deployment decisions. A finding
          is not the end of the process. Each issue connects to a remediation
          path, a retest requirement, and a clear recommendation about whether
          the AI system should remain in sandbox, enter pilot, expand access, or
          stay blocked.
        </p>
        <p className="mt-5 inline-flex max-w-full flex-wrap items-center gap-x-1 border border-bronze/30 bg-obsidian/50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold">
          {OUTPUT_FLOW_LABEL}
        </p>
      </div>

      <div
        role="list"
        className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
      >
        {OUTPUT_FLOW.map((step, i) => (
          <Fragment key={step.title}>
            <div
              role="listitem"
              className="relative flex-1 border border-ivory/8 bg-charcoal/60 p-5 backdrop-blur-sm"
            >
              <span className="font-display text-2xl font-normal leading-none text-bronze/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory">
                {step.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-stone">
                {step.description}
              </p>
            </div>
            {i < OUTPUT_FLOW.length - 1 && (
              <div
                aria-hidden="true"
                className="flex items-center justify-center text-bronze/50"
              >
                <ArrowDown size={18} className="lg:hidden" />
                <ArrowRight size={18} className="hidden lg:block" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
