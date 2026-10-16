export interface CoverageRow {
  label: string;
  meaning: string;
  value: number;
  /** "gap" rows are what was not assessed: shown in the stale tone. */
  tone?: "base" | "gap";
}

/**
 * Coverage as a nested funnel: what was expected, what was actually observed,
 * what was assessed — and, stated just as plainly, what was not checked.
 */
export function CoveragePanel({ rows, unit, note }: { rows: CoverageRow[]; unit: string; note: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <figure className="border border-rule bg-panel p-6 shadow-[0_24px_50px_-36px_rgba(21,35,51,0.5)] lg:p-8" data-reveal>
      <figcaption className="flex items-baseline justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.22em]">
        <span className="text-accent">Coverage · {unit}</span>
        <span className="text-fg-muted">Illustrative</span>
      </figcaption>
      <dl className="mt-6 grid gap-5">
        {rows.map((row) => {
          const last = row.tone === "gap";
          return (
            <div key={row.label}>
              <dt className="flex items-baseline justify-between gap-4">
                <span className="font-display text-xl text-fg">{row.label}</span>
                <span className={last ? "font-semibold text-state-stale-ink" : "font-semibold text-fg"}>{row.value}</span>
              </dt>
              <dd>
                <span className="mt-1 block text-sm text-fg-muted">{row.meaning}</span>
                <span className="mt-2 block h-2 bg-marble">
                  <span
                    className={last ? "block h-full bg-state-stale" : "block h-full bg-gradient-to-r from-bronze to-antique-gold"}
                    style={{ width: `${(row.value / max) * 100}%` }}
                  />
                </span>
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-6 border-t border-rule pt-4 text-sm leading-relaxed text-fg">{note}</p>
    </figure>
  );
}
