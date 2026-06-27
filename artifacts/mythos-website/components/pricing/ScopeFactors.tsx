import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { SCOPE_FACTORS, SCOPE_CLOSING } from "@/data/pricing";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function ScopeFactors() {
  return (
    <section
      className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
      aria-labelledby="scope-heading"
    >
      <Container>
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className={EYEBROW}>Scope Factors</p>
          <h2 id="scope-heading" className={HEADING}>
            Pricing depends on the risk surface being reviewed.
          </h2>
          <p className={BODY}>
            Published prices are starting points, not guarantees of final scope.
            Final pricing depends on the size, complexity, sensitivity, and
            evidence needs of the AI deployment.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.04}
        >
          {SCOPE_FACTORS.map((factor) => (
            <div
              key={factor}
              className="flex items-center gap-3 border border-ivory/6 bg-charcoal/50 px-5 py-4 transition-colors duration-200 hover:border-bronze/30 hover:bg-charcoal"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze/70"
              />
              <span className="text-sm font-medium text-ivory/90">
                {factor}
              </span>
            </div>
          ))}
        </StaggerReveal>

        <ScrollReveal y={16}>
          <p className="mt-10 max-w-3xl border-l-2 border-bronze/30 pl-4 text-sm leading-relaxed text-muted-stone/80">
            {SCOPE_CLOSING}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
