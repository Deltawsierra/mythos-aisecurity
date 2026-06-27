import { cn } from "@/lib/utils";

interface EnginePanelProps {
  engineLabel: string;
  name: string;
  positioning: string;
  description: string;
  capabilities: string[];
  variant: "athena" | "achilles";
  className?: string;
  /**
   * Optional cinematic card background image (opt-in; used only on /platform).
   * When omitted the card renders exactly as before — the homepage
   * PlatformPairSection passes nothing and is visually unchanged.
   */
  backgroundImage?: string;
  /** Background image opacity (0..1). Defaults to a restrained 0.42. */
  imageOpacity?: number;
}

/**
 * Platform-engine product card for Athena / Achilles.
 *
 * Presentational (server) component — entrance reveal is provided by the
 * surrounding <ScrollReveal>. The card is a clean frosted panel designed to sit
 * ABOVE the section's cinematic background video: a translucent graphite fill
 * with a backdrop blur keeps the video atmosphere faintly visible while the copy
 * stays fully readable. The only decoration is a single brand-toned top accent
 * hairline; a subtle bronze (Athena) / ember (Achilles) edge glow rises on
 * hover/focus via the `.engine-panel` rules in globals.css. No content is ever
 * hidden by CSS, so the panel reads fully even if JS never runs.
 */
export function EnginePanel({
  engineLabel,
  name,
  positioning,
  description,
  capabilities,
  variant,
  className,
  backgroundImage,
  imageOpacity = 0.42,
}: EnginePanelProps) {
  const isAthena = variant === "athena";
  const index = isAthena ? "I" : "II";

  return (
    <article
      data-variant={variant}
      className={cn(
        "engine-panel group relative flex h-full flex-col overflow-hidden border border-bronze/25 bg-graphite/75 p-8 backdrop-blur-md hover:border-bronze/45 hover:bg-graphite/85 lg:p-9",
        className,
      )}
    >
      {/* Opt-in cinematic card background (used only on /platform). Image sits
          above the graphite fill but below a left-weighted dark overlay so the
          copy stays fully readable while the imagery reads on the right. */}
      {backgroundImage && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})`, opacity: imageOpacity }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(18,16,14,0.94) 0%, rgba(18,16,14,0.82) 42%, rgba(18,16,14,0.5) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(10,9,8,0.65) 100%)",
            }}
          />
        </>
      )}

      {/* Top accent hairline — the single brand cue on the card. */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: isAthena
            ? "linear-gradient(90deg, rgba(166,106,50,0.6), rgba(166,106,50,0.1))"
            : "linear-gradient(270deg, rgba(214,161,74,0.65), rgba(166,106,50,0.1))",
        }}
      />

      <div className="relative">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center border border-bronze/40 font-display text-sm leading-none text-bronze"
            >
              {index}
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze/80">
              {engineLabel}
            </p>
          </div>
          <p className="text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-muted-stone/70 sm:max-w-[46%] sm:text-right">
            {positioning}
          </p>
        </div>

        <h3 className="mb-3 font-display text-3xl font-normal text-ivory lg:text-4xl">
          {name}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-muted-stone">{description}</p>

        <div aria-hidden="true" className="mb-5 h-px w-full bg-bronze/12" />

        <ul className="flex flex-col gap-2.5">
          {capabilities.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-muted-stone"
            >
              {isAthena ? (
                <span
                  aria-hidden="true"
                  className="h-px w-3 shrink-0 bg-bronze/70"
                />
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="h-2.5 w-2.5 shrink-0 text-antique-gold"
                >
                  <path
                    d="M2 1 L6 5 L2 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
