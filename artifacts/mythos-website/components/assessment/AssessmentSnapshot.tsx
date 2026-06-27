import { ASSESSMENT_SNAPSHOT } from "@/data/assessmentOutputs";

/**
 * Stylized, clearly-labelled illustrative report card. No real customer names,
 * no claims of completed work — an "evidence tablet" preview of what a Mythos
 * assessment makes legible before the next deployment decision.
 */
export function AssessmentSnapshot() {
  const { assessment, readiness, rows } = ASSESSMENT_SNAPSHOT;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden border border-bronze/30 bg-gradient-to-b from-charcoal/80 to-obsidian/80 p-7 backdrop-blur-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,0.85)] lg:p-9">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent"
        />

        <div className="mb-6 flex items-start justify-between gap-4 border-b border-bronze/20 pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
              Assessment Snapshot
            </p>
            <h3 className="mt-2 font-display text-xl font-normal leading-tight text-ivory lg:text-2xl">
              {assessment}
            </h3>
          </div>
          <span className="shrink-0 border border-ivory/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-stone">
            Illustrative example
          </span>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-stone">
            Readiness
          </span>
          <span className="inline-flex items-center gap-2 border border-antique-gold/40 bg-antique-gold/10 px-3 py-1 text-xs font-semibold text-antique-gold shadow-[0_0_22px_-6px_rgba(214,161,74,0.7)]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-antique-gold"
            />
            {readiness}
          </span>
        </div>

        <dl>
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-t border-ivory/8 py-3.5 sm:grid-cols-[148px_1fr] sm:gap-4"
            >
              <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze/80">
                {row.label}
                {row.badge && (
                  <span className="border border-ember/40 bg-ember/10 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-ember">
                    {row.badge}
                  </span>
                )}
              </dt>
              <dd className="text-sm leading-relaxed text-ivory/90">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
