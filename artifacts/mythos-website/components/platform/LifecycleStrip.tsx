import { LIFECYCLE } from "@/content/platform";
import { LIFECYCLE_MEDALLIONS } from "@/content/media";

/** The assurance lifecycle as a still row: medallion, stage and summary. */
export function LifecycleStrip() {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6" data-reveal-group>
      <span
        aria-hidden="true"
        className="absolute left-[10%] right-[10%] top-[3.6rem] hidden h-px bg-gradient-to-r from-bronze/0 via-antique-gold/70 to-bronze/0 lg:block"
      />
      {LIFECYCLE.map((stage, index) => (
        <li key={stage.id} className="relative flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LIFECYCLE_MEDALLIONS[stage.id]} alt="" aria-hidden="true" loading="lazy" className="relative h-[7.2rem] w-[7.2rem]" />
          <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-bronze-bright">{String(index + 1).padStart(2, "0")}</p>
          <p className="mt-1 font-display text-2xl text-fg">{stage.name}</p>
          <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-fg-muted">{stage.summary}</p>
        </li>
      ))}
    </ol>
  );
}
