import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { UseCaseDeepDive } from "@/data/useCaseDeepDives";

/**
 * Deep-dive scenario hero. Opens each full use-case briefing with a keyboard
 * accessible back link, scenario identity (number, category, project, status),
 * the title and summary, and the buyer question framed as a pull quote. Static
 * server component — no client JS, safe for the export build.
 */
export function UseCaseDeepDiveHero({ deepDive }: { deepDive: UseCaseDeepDive }) {
  const number = String(deepDive.number).padStart(2, "0");

  return (
    <section
      aria-label="Scenario overview"
      className="relative isolate overflow-hidden border-b border-ivory/5 bg-obsidian"
    >
      {/* Bronze floor glow — purely decorative. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[60%] w-[90%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(166,106,50,0.16), transparent 70%)",
        }}
      />

      <Container className="relative z-10 pt-10 pb-14 lg:pt-12 lg:pb-20">
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-stone transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
        >
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          Back to Use Cases
        </Link>

        <div className="mt-8 max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <span className="font-display text-2xl font-normal leading-none text-bronze/60">
              {number}
            </span>
            <span className="border border-ivory/12 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-stone">
              {deepDive.category}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-antique-gold/30 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-antique-gold">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-antique-gold/80"
              />
              {deepDive.project}
            </span>
            {deepDive.status && (
              <span
                className={cn(
                  "border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]",
                  deepDive.isStrategicHorizon
                    ? "border-ember/40 text-ember"
                    : "border-bronze/30 text-muted-stone",
                )}
              >
                {deepDive.status}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-normal leading-[1.12] text-ivory sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {deepDive.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-stone lg:text-lg">
            {deepDive.summary}
          </p>

          <div className="mt-8 border-l-2 border-l-bronze/60 bg-charcoal/40 px-5 py-4">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze/80">
              Buyer question
            </p>
            <p className="text-base leading-relaxed text-ivory/90">
              {deepDive.buyerQuestion}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
