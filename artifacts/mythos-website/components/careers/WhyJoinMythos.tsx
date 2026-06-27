import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { WHY_JOIN } from "@/data/careers";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function WhyJoinMythos() {
  return (
    <section
      className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
      aria-labelledby="why-join-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="mb-12 max-w-xl">
            <p className={EYEBROW}>Why Mythos</p>
            <h2 id="why-join-heading" className={HEADING}>
              Work that holds the line on AI.
            </h2>
            <p className={BODY}>
              Mythos is a small, deliberate team doing serious work at the edge
              of how AI gets deployed. Here is what that means for you.
            </p>
          </div>
        </ScrollReveal>
        <StaggerReveal className="grid gap-4 sm:grid-cols-2">
          {WHY_JOIN.map((card) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.body}
            />
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
