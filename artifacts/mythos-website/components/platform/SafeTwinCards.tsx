import { StatePill } from "@/components/platform/StatePill";

export interface TwinCase {
  kind: string;
  case: string;
  expected: string;
  observed: string;
  pass: boolean;
  note: string;
}

/**
 * Known-answer and negative-control cases (Launch Guide M03): each card
 * states what the harness should do, what it did, and why that matters. The
 * inputs are described, never reproduced — no payloads or corpus items.
 */
export function SafeTwinCards({ cases }: { cases: TwinCase[] }) {
  return (
    <ul className="grid gap-4 lg:grid-cols-3" data-reveal-group>
      {cases.map((c) => (
        <li key={c.kind} className="flex flex-col border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
          <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{c.kind}</p>
            <StatePill state={c.pass ? "verified" : "contradicted"} label={c.pass ? "As expected" : "Mismatch"} />
          </div>
          <p className="px-5 pt-4 font-display text-xl leading-snug text-fg">{c.case}</p>
          <dl className="grid grid-cols-2 gap-3 px-5 py-4 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Expected</dt>
              <dd className="mt-0.5 font-semibold text-fg">{c.expected}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Observed</dt>
              <dd className={c.pass ? "mt-0.5 font-semibold text-fg" : "mt-0.5 font-semibold text-state-contradicted-ink"}>{c.observed}</dd>
            </div>
          </dl>
          <p className="mt-auto border-t border-rule px-5 py-3 text-sm italic leading-relaxed text-fg-muted">{c.note}</p>
        </li>
      ))}
    </ul>
  );
}
