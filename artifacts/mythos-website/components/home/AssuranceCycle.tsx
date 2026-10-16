import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { CycleStrip } from "@/components/platform/CycleStrip";
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

        <CycleStrip className="mt-16" />
      </Container>
    </section>
  );
}
