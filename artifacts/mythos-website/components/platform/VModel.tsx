export interface VStage {
  name: string;
  detail: string;
}

/**
 * The V-model with lifecycle checkpoints (Launch Guide HE04): definition down
 * the left arm, verification up the right, each paired with the stage it
 * checks, then change and in-service monitoring after release. A static SVG
 * with every label also listed as text — no scroll trap.
 */
export function VModel({ left, bottom, right, after }: { left: VStage[]; bottom: VStage; right: VStage[]; after: VStage }) {
  const rows = left.length;
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <svg viewBox="0 0 620 360" className="w-full" role="img" aria-label="V-model: definition stages on the left, verification stages on the right, joined at implementation">
        <defs>
          <linearGradient id="v-gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e5c58f" />
            <stop offset="1" stopColor="#80511d" />
          </linearGradient>
        </defs>
        <path d="M60 40 L310 310 L560 40" fill="none" stroke="url(#v-gold)" strokeWidth="4" strokeLinejoin="round" />
        {left.map((s, i) => {
          const t = (i + 0.5) / (rows + 0.5);
          const y = 40 + t * 270;
          const xl = 60 + t * 250;
          const xr = 560 - t * 250;
          return (
            <g key={s.name}>
              <line x1={xl + 14} y1={y} x2={xr - 14} y2={y} stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4 6" className="text-fg" />
              <circle cx={xl} cy={y} r="8" fill="#ede4d5" stroke="#b8823f" strokeWidth="2.5" />
              <circle cx={xr} cy={y} r="8" fill="#ede4d5" stroke="#b8823f" strokeWidth="2.5" />
              <text x={xl - 16} y={y + 5} textAnchor="end" className="fill-current text-[14px] text-fg">
                {s.name}
              </text>
              <text x={xr + 16} y={y + 5} className="fill-current text-[14px] text-fg">
                {right[i]?.name}
              </text>
            </g>
          );
        })}
        <circle cx="310" cy="310" r="10" fill="#d0a45a" />
        <text x="310" y="345" textAnchor="middle" className="fill-current text-[14px] font-semibold text-fg">
          {bottom.name}
        </text>
        <path d="M560 40 C 600 20, 610 70, 590 90" fill="none" stroke="#d0a45a" strokeWidth="2" strokeDasharray="4 5" />
        <text x="600" y="24" textAnchor="end" className="fill-current text-[12px] italic text-fg-muted">
          {after.name}
        </text>
      </svg>
      <ol className="grid gap-3 text-sm">
        {left.map((s, i) => (
          <li key={s.name} className="border-l-2 border-accent bg-panel px-4 py-3">
            <p className="font-semibold text-fg">
              {s.name} <span className="font-normal text-fg-muted">↔</span> {right[i]?.name}
            </p>
            <p className="mt-1 text-fg-muted">
              {s.detail} {right[i]?.detail}
            </p>
          </li>
        ))}
        <li className="border-l-2 border-accent bg-panel px-4 py-3">
          <p className="font-semibold text-fg">{bottom.name}</p>
          <p className="mt-1 text-fg-muted">{bottom.detail}</p>
        </li>
        <li className="border-l-2 border-state-stale bg-panel px-4 py-3">
          <p className="font-semibold text-fg">{after.name}</p>
          <p className="mt-1 text-fg-muted">{after.detail}</p>
        </li>
      </ol>
    </div>
  );
}
