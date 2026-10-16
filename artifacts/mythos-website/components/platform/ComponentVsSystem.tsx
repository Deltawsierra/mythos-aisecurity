export interface ScopeRow {
  path: string;
  component: string;
  system: string;
}

/**
 * Component and integrated-system assurance side by side (Launch Guide
 * HE05): testing a model is not assuring a vehicle, so each path says what a
 * component check can show and what only an end-to-end scenario can.
 */
export function ComponentVsSystem({ rows }: { rows: ScopeRow[] }) {
  return (
    <div className="overflow-x-auto border border-rule bg-panel shadow-[0_24px_50px_-36px_rgba(22,26,28,0.5)]" data-reveal>
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="border-b border-rule px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
          Illustrative audit paths
        </caption>
        <thead>
          <tr className="border-b border-rule">
            <th scope="col" className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Path</th>
            <th scope="col" className="px-5 py-3 font-display text-xl font-medium text-fg">Component check</th>
            <th scope="col" className="px-5 py-3 font-display text-xl font-medium text-accent">Integrated system</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map((r) => (
            <tr key={r.path} className="align-top">
              <th scope="row" className="px-5 py-4 font-semibold text-fg">{r.path}</th>
              <td className="px-5 py-4 text-fg-muted">{r.component}</td>
              <td className="px-5 py-4 text-fg">{r.system}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
