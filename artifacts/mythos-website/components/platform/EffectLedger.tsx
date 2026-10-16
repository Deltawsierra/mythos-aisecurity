import { StatePill, type PillState } from "@/components/platform/StatePill";

interface LedgerRow {
  attempt: string;
  decision: string;
  invocation: string;
  outcome: string;
  state: PillState;
}

const LABEL: Partial<Record<PillState, string>> = { verified: "Matches", contradicted: "Finding", unknown: "Unobserved" };

/**
 * Observed effect and denial ledger (Launch Guide AC06): what was attempted,
 * what policy decided, what was actually invoked and what was recorded. A
 * result rests on the observed effect — never on a refusal in the transcript
 * or on the agent's own account of what it did.
 */
export function EffectLedger({ rows }: { rows: readonly LedgerRow[] }) {
  return (
    <div className="overflow-x-auto border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]" data-reveal>
      <table className="w-full min-w-[46rem] text-left text-sm">
        <caption className="border-b border-rule px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
          Effect ledger · synthetic fixture
        </caption>
        <thead>
          <tr className="border-b border-rule text-[10px] uppercase tracking-[0.2em] text-fg-muted">
            <th scope="col" className="px-5 py-3 font-semibold">Attempted</th>
            <th scope="col" className="px-5 py-3 font-semibold">Policy decision</th>
            <th scope="col" className="px-5 py-3 font-semibold">Actual invocation</th>
            <th scope="col" className="px-5 py-3 font-semibold">Recorded outcome</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map((r) => (
            <tr key={r.attempt} className="align-top">
              <th scope="row" className="px-5 py-4 font-normal text-fg">{r.attempt}</th>
              <td className="px-5 py-4 font-semibold text-fg">{r.decision}</td>
              <td className="px-5 py-4 font-mono text-[12.5px] text-fg-muted">{r.invocation}</td>
              <td className="px-5 py-4">
                <span className="block text-fg">{r.outcome}</span>
                <StatePill state={r.state} label={LABEL[r.state]} className="mt-2" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
