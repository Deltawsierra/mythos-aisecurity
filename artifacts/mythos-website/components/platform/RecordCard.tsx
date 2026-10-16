import { cn } from "@/lib/utils";

export interface RecordRow {
  field: string;
  value: string;
  tone?: "verified" | "stale" | "contradicted";
}

const TONE: Record<NonNullable<RecordRow["tone"]>, string> = {
  verified: "font-semibold text-state-verified-ink",
  stale: "font-semibold text-state-stale-ink",
  contradicted: "font-semibold text-state-contradicted-ink",
};

/**
 * A structured record — receipt, exposure record, export — as native DOM on
 * paper. The first `visible` rows show; the rest sit in a native disclosure
 * so the card stays short but every field remains in the page.
 */
export function RecordCard({
  kind,
  title,
  rows,
  footer,
  visible = rows.length,
  icon = "/assets/evidence/assurance-receipt.svg",
  className,
}: {
  kind: string;
  title: string;
  rows: RecordRow[];
  footer?: string;
  visible?: number;
  icon?: string;
  className?: string;
}) {
  const shown = rows.slice(0, visible);
  const more = rows.slice(visible);
  const row = (r: RecordRow) => (
    <div key={r.field} className="grid grid-cols-[9rem_1fr] gap-4 py-2.5 text-sm">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">{r.field}</dt>
      <dd className={cn("text-charcoal", r.tone && TONE[r.tone])}>{r.value}</dd>
    </div>
  );
  return (
    <figure className={cn("overflow-hidden border border-antique-gold/40 bg-cream shadow-[0_40px_80px_-40px_rgba(22,26,28,0.55)]", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-rule bg-charcoal px-6 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne">{kind}</p>
          <p className="mt-0.5 font-display text-lg text-ivory">{title}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" aria-hidden="true" className="h-11 w-11" />
      </div>
      <dl className="divide-y divide-[rgba(184,130,63,0.3)] px-6">{shown.map(row)}</dl>
      {more.length > 0 && (
        <details className="group border-t border-[rgba(184,130,63,0.3)] px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-bronze-deep [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show all {rows.length} fields</span>
            <span className="hidden group-open:inline">Show fewer fields</span>
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <dl className="divide-y divide-[rgba(184,130,63,0.3)] pb-2">{more.map(row)}</dl>
        </details>
      )}
      {footer && <figcaption className="border-t border-[rgba(184,130,63,0.3)] bg-marble/60 px-6 py-3.5 text-xs leading-relaxed text-charcoal">{footer}</figcaption>}
    </figure>
  );
}
