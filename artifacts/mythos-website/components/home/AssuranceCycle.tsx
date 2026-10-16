import { RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { LIFECYCLE } from "@/content/platform";
import { LIFECYCLE_MEDALLIONS } from "@/content/media";
import { HOME_CYCLE } from "@/content/home";

/**
 * H04 — the technical assurance cycle as a calm stone strip (Launch Guide
 * conflict resolution: the journey and the cycle are two models,
 * cross-referenced but never relabelled). Each stage names the artifact it
 * produces, who leads it, and which journey stage it serves.
 */
export function AssuranceCycle() {
  return (
    <section data-surface="ivory" aria-labelledby="cycle-title" className="relative pb-24 pt-4 lg:pb-28">
      <Container>
        <div className="mythos-rule mb-16" aria-hidden="true" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end" data-reveal-group>
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              {HOME_CYCLE.eyebrow}
            </p>
            <h2 id="cycle-title" className="display-caps scroll-mt-28 font-display text-[2.15rem] text-fg sm:text-5xl lg:text-[3.2rem]">
              <Accent text={HOME_CYCLE.headline} />
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-fg-muted lg:pb-2">{HOME_CYCLE.lede}</p>
        </div>

        <ol className="relative mt-16 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
          {LIFECYCLE.map((stage, i) => {
            const row = HOME_CYCLE.rows[stage.id];
            return (
              <li key={stage.id} className="flex flex-col bg-cream p-6">
                <div className="flex items-center justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LIFECYCLE_MEDALLIONS[stage.id]} alt="" aria-hidden="true" loading="lazy" className="h-20 w-20" />
                  <span className="font-display text-3xl text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-fg">{stage.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{stage.summary}</p>
                <dl className="mt-auto grid gap-3 border-t border-rule pt-4 text-sm">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Produces</dt>
                    <dd className="mt-0.5 font-semibold text-fg">{row.produces}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Led by</dt>
                      <dd className="mt-0.5 text-accent">{row.owner}</dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Serves</dt>
                      <dd className="mt-0.5 italic text-fg">{row.journey}</dd>
                    </div>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
        <p className="mt-5 flex items-center gap-2 text-sm text-fg-muted">
          <RotateCcw size={15} aria-hidden="true" className="text-accent" />
          Revalidate feeds the next Discover: when the system changes, the cycle runs again on what changed.
        </p>
      </Container>
    </section>
  );
}
