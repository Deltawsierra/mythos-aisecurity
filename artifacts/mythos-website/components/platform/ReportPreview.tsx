/**
 * Three pages of a synthetic sample report, rendered as native, readable DOM
 * (Launch Guide: report thumbnails are real synthetic artifacts, never
 * screenshots). The full sample lives on /example-report.
 */
const REPORT_PAGES = [
  {
    kicker: "01 · Scope and authorization",
    title: "What the review may touch",
    rows: [
      ["System", "Customer support agent"],
      ["In scope", "Refund tool, CRM read, ticket history"],
      ["Excluded", "Production payments ledger"],
      ["Authorized by", "Head of Support Ops"],
    ],
  },
  {
    kicker: "02 · Finding SR-03",
    title: "Refund issued above the approval threshold",
    rows: [
      ["Observed effect", "Refund executed without approval"],
      ["Evidence", "Trace T-0412, ledger diff"],
      ["Basis", "Reproduced twice · benign control"],
      ["Next step", "Fix, then retest"],
    ],
  },
  {
    kicker: "03 · Claim matrix",
    title: "What still holds",
    rows: [
      ["Refunds bound to approval", "Contradicted"],
      ["Refunds to original card only", "Verified"],
      ["CRM read is least-privilege", "Unknown"],
      ["Escalation reaches a human", "Stale"],
    ],
  },
];

export function ReportPreview() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3" aria-label="Sample report pages (synthetic)" data-reveal-group>
      {REPORT_PAGES.map((page, i) => (
        <li
          key={page.kicker}
          className="flex flex-col border border-rule bg-cream p-5 shadow-[0_28px_50px_-34px_rgba(22,26,28,0.55)]"
          style={{ transform: `rotate(${(i - 1) * 1.2}deg) translateY(${i === 1 ? -10 : 0}px)` }}
        >
          <div className="flex items-center justify-between border-b border-rule pb-2">
            <span className="font-display text-sm uppercase tracking-[0.18em] text-fg">Mythos</span>
            <span className="border border-state-stale px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-state-stale-ink">
              Synthetic
            </span>
          </div>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{page.kicker}</p>
          <p className="mt-1 font-display text-lg leading-tight text-fg">{page.title}</p>
          <dl className="mt-3 grid gap-2 text-[12px]">
            {page.rows.map(([k, v]) => (
              <div key={k} className="border-t border-rule/70 pt-1.5">
                <dt className="text-fg-muted">{k}</dt>
                <dd className="font-semibold text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}
