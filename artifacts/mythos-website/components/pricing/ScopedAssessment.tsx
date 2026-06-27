import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ASSESSMENT } from "@/data/pricing";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function ScopedAssessment() {
  return (
    <section
      className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
      aria-labelledby="assessment-heading"
    >
      <Container>
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className={EYEBROW}>Starting Point</p>
          <h2 id="assessment-heading" className={HEADING}>
            Start with a scoped AI Deployment Assessment.
          </h2>
          <p className={BODY}>
            For teams that are not ready for a recurring subscription, Mythos can
            begin with a scoped assessment focused on one defined AI system,
            workflow, vendor integration, agent, copilot, RAG assistant,
            cloud/data integration, or strategic scenario.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-10 border border-bronze/30 bg-obsidian/60 p-8 backdrop-blur-sm lg:grid-cols-[1fr_1.15fr] lg:p-10">
            {/* Offer + price */}
            <div className="flex flex-col">
              <h3 className="mb-3 font-display text-2xl font-normal leading-snug text-ivory lg:text-3xl">
                {ASSESSMENT.name}
              </h3>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
                Starting at
              </p>
              <p className="mt-1 font-display text-4xl font-normal text-antique-gold lg:text-5xl">
                {ASSESSMENT.startingAt}
              </p>
              <p className="mt-5 border-l-2 border-bronze/40 pl-4 text-sm leading-relaxed text-muted-stone">
                <span className="font-semibold text-ivory">Best for:</span>{" "}
                {ASSESSMENT.bestFor}
              </p>
              <div className="mt-8">
                <Button
                  href="/contact?intent=assessment"
                  variant="primary"
                  size="lg"
                >
                  Request Assessment
                </Button>
              </div>
            </div>

            {/* Includes */}
            <div className="lg:border-l lg:border-ivory/10 lg:pl-10">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
                Includes
              </p>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {ASSESSMENT.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-stone"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 shrink-0 bg-bronze/70"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
