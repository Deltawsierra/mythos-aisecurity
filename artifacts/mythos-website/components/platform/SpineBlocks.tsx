import { DECISION_STATES, EVIDENCE_STRENGTH, POLICY_EFFECTS } from "@/content/platform";
import { SAMPLE_RECEIPT, SPINE_COPY } from "@/content/spine";
import { EVIDENCE_STATE_ICONS } from "@/content/media";
import { cn } from "@/lib/utils";

const TONE = {
  go: "border-state-verified/60 text-state-verified-ink",
  caution: "border-state-stale/70 text-state-stale-ink",
  stop: "border-state-contradicted/60 text-state-contradicted-ink",
} as const;

/** The six deployment decision states. */
export function DecisionStates() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
      {DECISION_STATES.map((state) => (
        <li key={state.name} className="border border-rule bg-panel p-5 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)]">
          <span className={cn("inline-block border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]", TONE[state.tone])}>
            {state.name}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{state.meaning}</p>
        </li>
      ))}
    </ol>
  );
}

/** Evidence strength, strongest to weakest. */
export function EvidenceLadder() {
  const last = EVIDENCE_STRENGTH.length - 1;
  return (
    <figure className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)]" data-reveal>
      <figcaption className="flex items-baseline justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
        <span>Evidence strength</span>
        <span className="text-fg-muted">Strongest → weakest</span>
      </figcaption>
      <ol className="mt-5 grid gap-1.5">
        {EVIDENCE_STRENGTH.map((level, i) => (
          <li key={level} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-40 shrink-0 rounded-full bg-marble">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${100 - (i / last) * 80}%`,
                  background: `color-mix(in oklab, #5e9e72 ${100 - (i / last) * 100}%, #b9b4ab)`,
                }}
              />
            </span>
            <span className={cn("text-sm", level === "Vendor asserted" ? "font-semibold text-fg" : "text-fg-muted")}>
              {level}
              {level === "Vendor asserted" && <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-accent">≠ verified</span>}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-rule pt-4 text-sm leading-relaxed text-fg">
        A claim is only as strong as its weakest evidence.
      </p>
    </figure>
  );
}

/** How an open question is tracked instead of being guessed. */
export function UnknownCard() {
  const u = SPINE_COPY.claims.unknown;
  return (
    <figure className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)]" data-reveal>
      <figcaption className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EVIDENCE_STATE_ICONS.unknown} loading="lazy" alt="" aria-hidden="true" className="h-11 w-11" />
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Unknowns register · illustrative</span>
          <span className="mt-1 block font-display text-xl leading-snug text-fg">{u.question}</span>
        </span>
      </figcaption>
      <dl className="mt-5 grid gap-3 text-sm">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Why it matters</dt>
          <dd className="mt-1 text-fg">{u.why}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Evidence needed</dt>
          <dd className="mt-1 text-fg">{u.needed}</dd>
        </div>
      </dl>
    </figure>
  );
}

/** The four policy effects, most restrictive first. */
export function PolicyEffects() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
      {POLICY_EFFECTS.map((effect, i) => (
        <li key={effect.name} className="relative border border-rule bg-panel p-5">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-accent">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-1 font-display text-2xl leading-tight text-fg">{effect.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{effect.meaning}</p>
        </li>
      ))}
    </ol>
  );
}

/** A sample Assurance Receipt with fictional data. */
export function ReceiptCard() {
  return (
    <figure
      className="relative overflow-hidden border border-antique-gold/40 bg-[#fffdf8] shadow-[0_40px_80px_-40px_rgba(21,35,51,0.55)]"
      data-reveal
    >
      <div className="flex items-center justify-between gap-4 border-b border-rule bg-navy px-6 py-4 text-ivory">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-antique-gold">Assurance Receipt</p>
          <p className="mt-0.5 text-xs text-ivory/70">Sample · fictional data</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/evidence/assurance-receipt.svg" loading="lazy" alt="" aria-hidden="true" className="h-12 w-12" />
      </div>
      <dl className="divide-y divide-rule px-6">
        {SAMPLE_RECEIPT.map((row) => (
          <div key={row.field} className="grid grid-cols-[8.5rem_1fr] gap-4 py-2.5 text-sm">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">{row.field}</dt>
            <dd className={cn("text-fg", row.field === "Result" && "font-semibold text-state-verified-ink")}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="flex items-center gap-3 border-t border-rule bg-marble/60 px-6 py-3.5 text-xs text-fg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/status/status-evidence-current.svg" loading="lazy" alt="" aria-hidden="true" className="h-8 w-8" />
        Tamper-evident: hashed over its evidence, so any change can be detected. It proves provenance — not that the conclusion is true.
      </figcaption>
    </figure>
  );
}
