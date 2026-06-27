import { ENGAGEMENT_STEPS, ENGAGEMENT_NOTE } from "@/data/engagementSteps";

/**
 * Four-step buyer-facing engagement path. Each step shows what the customer
 * provides or receives as a compact chip list — readable on mobile without
 * interaction. Closes with the authorization/scope note.
 */
export function EngagementPath() {
  return (
    <>
      <ol role="list" className="grid gap-5 lg:grid-cols-2">
        {ENGAGEMENT_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col border border-ivory/8 bg-charcoal/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-bronze/35"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-normal leading-none text-bronze/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-ivory">
                {step.title}
              </h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-stone">
              {step.body}
            </p>

            <div className="mt-4 border-t border-bronze/15 pt-4">
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
                {step.listLabel}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {step.items.map((it) => (
                  <li
                    key={it}
                    className="border border-ivory/10 bg-obsidian/40 px-2.5 py-1 text-[11px] leading-none text-muted-stone"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-stone/70">
        {ENGAGEMENT_NOTE} Mythos produces evidence and recommendations — the
        customer keeps every decision.
      </p>
    </>
  );
}
