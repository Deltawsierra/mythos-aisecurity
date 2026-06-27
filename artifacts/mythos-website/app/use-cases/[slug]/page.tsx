import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { CTA } from "@/lib/constants";
import {
  USE_CASE_DEEP_DIVES,
  getDeepDiveBySlug,
} from "@/data/useCaseDeepDives";
import { UseCaseDeepDiveHero } from "@/components/use-cases/UseCaseDeepDiveHero";
import { UseCaseDeepDiveSection } from "@/components/use-cases/UseCaseDeepDiveSection";
import { UseCaseFindingCard } from "@/components/use-cases/UseCaseFindingCard";
import { UseCaseDeliverableList } from "@/components/use-cases/UseCaseDeliverableList";
import { MythosScenarioSignature } from "@/components/use-cases/MythosScenarioSignature";
import { StrategicHorizonNotice } from "@/components/shared/StrategicHorizonNotice";

// Static export: pre-render exactly the 12 known slugs and reject anything else.
export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASE_DEEP_DIVES.map((deepDive) => ({ slug: deepDive.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deepDive = getDeepDiveBySlug(slug);
  if (!deepDive) return {};

  // Strategic Horizon / R&D pages name their status in the description so the
  // metadata never implies a current public product.
  const horizonNote = deepDive.isStrategicHorizon
    ? deepDive.status?.toLowerCase().includes("r&d")
      ? " This is a strategic R&D scenario, not a current public product."
      : " Project Hermes is a strategic horizon direction, not a current public product."
    : "";

  return {
    title: deepDive.title,
    description: `Explore how Mythos helps review, test, and produce evidence for ${deepDive.title} before AI deployment expands.${horizonNote}`,
  };
}

export default async function UseCaseDeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deepDive = getDeepDiveBySlug(slug);
  if (!deepDive) notFound();

  return (
    <>
      <UseCaseDeepDiveHero deepDive={deepDive} />

      {deepDive.isStrategicHorizon && (
        <section
          id="scope-labeling"
          aria-label="Scope and labeling"
          className="scroll-mt-24 border-b border-ivory/5 bg-graphite py-10 lg:py-12"
        >
          <Container>
            <StrategicHorizonNotice
              variant={slug.includes("hermes") ? "hermes" : "quantum"}
              className="mx-auto max-w-3xl"
            />
          </Container>
        </section>
      )}

      <UseCaseDeepDiveSection
        eyebrow="Scenario"
        title="Scenario overview"
        variant="obsidian"
        narrow
      >
        <p className="text-base leading-relaxed text-muted-stone">
          {deepDive.scenario}
        </p>
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Why it matters"
        title="Why this matters"
        variant="graphite"
        narrow
      >
        <p className="text-base leading-relaxed text-muted-stone">
          {deepDive.whyItMatters}
        </p>
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Risk surface"
        title="What can go wrong"
        variant="obsidian"
      >
        <UseCaseDeliverableList items={deepDive.whatCanGoWrong} tone="risk" />
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Assessment scope"
        title="What Mythos reviews"
        variant="graphite"
      >
        <ul className="flex flex-wrap gap-2" role="list">
          {deepDive.whatMythosReviews.map((item) => (
            <li
              key={item}
              className="border border-ivory/10 bg-obsidian/40 px-2.5 py-1 text-[11px] text-muted-stone"
            >
              {item}
            </li>
          ))}
        </ul>
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Mythos projects"
        title="Projects assigned"
        variant="obsidian"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {deepDive.projectsAssigned.map((project) => (
            <div
              key={project.name}
              className="min-w-0 border border-ivory/8 bg-charcoal p-5"
            >
              <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-antique-gold/80"
                />
                {project.name}
              </p>
              <p className="text-sm leading-relaxed text-muted-stone break-words">
                {project.role}
              </p>
            </div>
          ))}
        </div>
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Illustrative findings"
        title="Example findings"
        variant="graphite"
      >
        <p className="mb-7 max-w-2xl text-sm leading-relaxed text-muted-stone/70">
          Illustrative examples of what a Mythos assessment may surface. They are
          representative patterns, not findings from a specific customer.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deepDive.exampleFindings.map((finding) => (
            <UseCaseFindingCard key={finding.title} finding={finding} />
          ))}
        </div>
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Deliverables"
        title="What the customer receives"
        variant="obsidian"
      >
        <UseCaseDeliverableList
          items={deepDive.customerReceives}
          tone="positive"
        />
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Decision"
        title="Decision supported"
        variant="graphite"
        narrow
      >
        <p className="text-base leading-relaxed text-muted-stone">
          {deepDive.decisionSupported}
        </p>
      </UseCaseDeepDiveSection>

      <UseCaseDeepDiveSection
        eyebrow="Recommendation"
        title="Final recommendation"
        variant="obsidian"
        narrow
      >
        <p className="text-base leading-relaxed text-ivory/90">
          {deepDive.finalRecommendation}
        </p>
      </UseCaseDeepDiveSection>

      <MythosScenarioSignature />

      <CTASection
        variant="bordered"
        badge="Start the Assessment"
        headline="Ready to review a system like this?"
        subline="Tell Mythos what you are building, connecting, or preparing to release. We will help identify the right assessment path."
        primaryCta={{ label: CTA.PRIMARY, href: "/contact" }}
        secondaryCta={{ label: "Back to Use Cases", href: "/use-cases" }}
      />
    </>
  );
}
