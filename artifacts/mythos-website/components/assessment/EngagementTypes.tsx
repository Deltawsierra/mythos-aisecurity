import { ENGAGEMENT_TYPES } from "@/data/engagementSteps";

/**
 * "Common starting points" — four engagement types that map a buyer's current
 * situation to the right assessment entry point.
 */
export function EngagementTypes() {
  return (
    <div className="mt-16 border-t border-bronze/15 pt-12">
      <h3 className="mb-8 font-display text-2xl font-normal leading-tight text-ivory">
        Common starting points
      </h3>
      <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ENGAGEMENT_TYPES.map((t) => (
          <li
            key={t.title}
            className="flex flex-col border border-ivory/8 bg-charcoal/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-bronze/35"
          >
            <h4 className="font-display text-lg font-normal leading-tight text-ivory">
              {t.title}
            </h4>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-stone">
              {t.body}
            </p>
            <p className="mt-4 border-t border-bronze/15 pt-3 text-xs leading-relaxed text-muted-stone/80">
              <span className="font-semibold uppercase tracking-[0.18em] text-bronze/80">
                Best for{" "}
              </span>
              {t.bestFor}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
