import { StatePill, type PillState } from "@/components/platform/StatePill";

export interface TimelineEvent {
  label: string;
  detail: string;
  /** Version, hash or timestamp shown in mono. */
  meta: string;
  state?: PillState;
  stateLabel?: string;
}

/**
 * A version-linked evidence trail (Launch Guide M06, HE07): each step names
 * the version or fixture it was true of, so reproduction and regression can
 * be checked against the same inputs. All values are synthetic.
 */
export function EvidenceTimeline({ events, caption }: { events: TimelineEvent[]; caption: string }) {
  return (
    <figure>
      <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{caption}</figcaption>
      <ol className="relative mt-6 border-l border-rule pl-8" data-reveal-group>
        {events.map((e) => (
          <li key={e.label} className="relative pb-8 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-accent bg-panel" />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="font-display text-xl leading-tight text-fg">{e.label}</p>
              <code className="font-mono text-[12px] text-fg-muted">{e.meta}</code>
              {e.state && <StatePill state={e.state} label={e.stateLabel} />}
            </div>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{e.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
