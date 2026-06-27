import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

const CARDS = [
  {
    title: "Access creates risk",
    description:
      "AI systems often connect to documents, data platforms, tools, APIs, tickets, repositories, cloud systems, and business workflows. Mythos helps map what becomes reachable before access expands.",
  },
  {
    title: "Behavior must be tested",
    description:
      "AI can behave differently under edge cases, prompt injection, stale sources, conflicting instructions, overbroad permissions, or tool-use pressure. Mythos helps test the behavior that matters before release.",
  },
  {
    title: "Evidence drives decisions",
    description:
      "A deployment decision should not depend on vague confidence. Mythos focuses on findings, proof, remediation guidance, and retest evidence that humans can review.",
  },
];

/**
 * Homepage "Why Mythos exists" trust section. Cinematic dark panel with glass
 * cards and a bronze/gold evidence-line motif. No metrics, customers, or claims.
 */
export function WhyMythos() {
  return (
    <section
      data-section="why-mythos"
      className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
      aria-labelledby="why-mythos-heading"
    >
      <Container>
        <ScrollReveal className="mb-12 max-w-2xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
            Why Mythos
          </p>
          <h2
            id="why-mythos-heading"
            className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl"
          >
            AI is moving from answers to actions.
          </h2>
          <p className="text-base leading-relaxed text-muted-stone">
            Enterprises are no longer only asking whether AI can generate useful
            text. They are asking what the system can access, which tools it can
            use, where requests go, what evidence exists, and whether humans can
            trust the next deployment step. Mythos exists to help organizations
            review AI systems before trust expands.
          </p>
        </ScrollReveal>
        <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden border border-ivory/8 bg-charcoal/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-bronze/30"
            >
              {/* Evidence-line motif — bronze/gold top divider. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(166,106,50,0.6), rgba(214,161,74,0.35) 45%, transparent)",
                }}
              />
              <h3 className="mb-3 text-lg font-normal text-ivory">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-stone">
                {card.description}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
