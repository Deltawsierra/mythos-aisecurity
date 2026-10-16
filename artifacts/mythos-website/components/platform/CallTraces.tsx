import { StatePill, type PillState } from "@/components/platform/StatePill";

export interface CallTrace {
  kind: string;
  call: string;
  actingFor: string;
  expected: string;
  observed: string;
  state: PillState;
  rationale: string;
}

/**
 * Agent and tool permission boundaries (Launch Guide A05): native call-trace
 * cards comparing expected and observed behaviour. They describe what Athena
 * observed at each boundary — Athena does not enforce runtime actions.
 */
export function CallTraces({ traces }: { traces: CallTrace[] }) {
  return (
    <ul className="grid gap-4 lg:grid-cols-3" data-reveal-group>
      {traces.map((t) => (
        <li key={t.kind} className="flex flex-col border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]">
          <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{t.kind}</p>
            <StatePill state={t.state} />
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words bg-charcoal px-5 py-4 font-mono text-[12.5px] leading-relaxed text-champagne">
            <span className="text-ivory/50">$ </span>
            {t.call}
          </pre>
          <dl className="grid gap-3 p-5 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Acting for</dt>
              <dd className="mt-0.5 text-fg">{t.actingFor}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Expected</dt>
              <dd className="mt-0.5 text-fg">{t.expected}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Observed</dt>
              <dd className="mt-0.5 font-semibold text-fg">{t.observed}</dd>
            </div>
          </dl>
          <p className="mt-auto border-t border-rule px-5 py-3 text-sm italic text-fg-muted">{t.rationale}</p>
        </li>
      ))}
    </ul>
  );
}
