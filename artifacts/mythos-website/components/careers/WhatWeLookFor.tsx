import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { TRAITS } from "@/data/careers";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

export function WhatWeLookFor() {
  return (
    <section
      className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
      aria-labelledby="traits-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="mb-12 max-w-xl">
            <p className={EYEBROW}>What we look for</p>
            <h2 id="traits-heading" className={HEADING}>
              The traits that thrive here.
            </h2>
            <p className={BODY}>
              Titles and pedigree matter less than how you think and what you
              ship. These are the qualities that do well at Mythos.
            </p>
          </div>
        </ScrollReveal>
        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRAITS.map((trait) => (
            <FeatureCard
              key={trait.title}
              title={trait.title}
              description={trait.body}
              variant="problem"
            />
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
