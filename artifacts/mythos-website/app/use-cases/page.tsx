import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { CTASection } from "@/components/sections/CTASection";
import { UseCasesHero } from "@/components/use-cases/UseCasesHero";
import { UseCaseLibrary } from "@/components/use-cases/UseCaseLibrary";
import { AssessmentOutputs } from "@/components/assessment/AssessmentOutputs";
import { OutputFlow } from "@/components/assessment/OutputFlow";
import { AssessmentSnapshot } from "@/components/assessment/AssessmentSnapshot";
import { EngagementPath } from "@/components/assessment/EngagementPath";
import { EngagementTypes } from "@/components/assessment/EngagementTypes";
import { CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Explore illustrative AI deployment scenarios and how Mythos helps review access, behavior, evidence, remediation, and retest before trust expands.",
};

const EYEBROW = "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

const VALUE_CARDS = [
  {
    title: "Map the System",
    description:
      "Understand what the AI can access, where requests go, which systems are connected, and what data becomes reachable.",
  },
  {
    title: "Test the Behavior",
    description:
      "Validate how the AI responds under normal, edge-case, adversarial, and permission-boundary conditions.",
  },
  {
    title: "Review the Evidence",
    description:
      "Receive findings, proof, remediation guidance, and retest material that supports deployment decisions.",
  },
];

export default function UseCasesPage() {
  return (
    <>
      {/* 1 · Hero ─────────────────────────────────────────── */}
      <UseCasesHero />

      {/* 2 · Why use cases matter ─────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="why-use-cases-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Why Use Cases Matter</p>
            <h2 id="why-use-cases-heading" className={HEADING}>
              AI risk does not appear in one place.
            </h2>
            <p className={BODY}>
              Every AI deployment has a different risk surface. A support agent
              can expose customer records. A RAG assistant can retrieve the wrong
              documents. A tool-using agent can exceed permissions. A
              cloud-connected AI system can create new data paths. Mythos helps
              teams examine the specific workflow before trust is expanded.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_CARDS.map((card) => (
              <FeatureCard
                key={card.title}
                variant="problem"
                title={card.title}
                description={card.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* 3 · Filterable use case library ──────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="library-heading"
      >
        <Container>
          <ScrollReveal className="mb-10 max-w-2xl">
            <p className={EYEBROW}>Use Case Library</p>
            <h2 id="library-heading" className={HEADING}>
              Explore where AI risk shows up.
            </h2>
            <p className={BODY}>
              Filter by deployment type to see concrete scenarios — what the
              system does, where it can go wrong, which Mythos project applies,
              and what an assessment produces. Open any scenario to review the
              detail.
            </p>
          </ScrollReveal>
          <ScrollReveal y={16}>
            <div className="mb-10 border-l-2 border-l-bronze bg-charcoal/50 px-5 py-4">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
                Illustrative scenarios, evidence-first review
              </p>
              <p className="text-sm leading-relaxed text-muted-stone">
                These use cases are illustrative examples of AI deployment
                patterns Mythos is designed to help review. They are not claims
                of completed customer work, guaranteed outcomes, compliance
                certification, or automatic approval. Each assessment should be
                authorized, scoped, non-destructive, and controlled by the
                customer.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal y={20}>
            <UseCaseLibrary />
          </ScrollReveal>
        </Container>
      </section>

      {/* 4 · What Mythos produces ─────────────────────────── */}
      <section
        id="what-mythos-produces"
        className="scroll-mt-24 border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="produces-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Assessment Outputs</p>
            <h2 id="produces-heading" className={HEADING}>
              What Mythos produces
            </h2>
            <p className={BODY}>
              Mythos assessments are built to produce decision material, not
              vague AI opinions. Each engagement is designed to help security,
              product, engineering, compliance, leadership, and operations teams
              understand what was tested, what was found, what needs to change,
              and what evidence supports the next deployment decision.
            </p>
          </ScrollReveal>
          <ScrollReveal y={20}>
            <AssessmentOutputs />
          </ScrollReveal>
          <ScrollReveal y={20}>
            <OutputFlow />
          </ScrollReveal>
          <ScrollReveal y={16}>
            <div className="mt-12 flex flex-col gap-5 border-t border-bronze/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-relaxed text-muted-stone">
                Want to see what a finished deliverable looks like? Walk through
                an illustrative 12-page assurance evidence pack — fictional data,
                for demonstration only.
              </p>
              <Button
                href="/example-report"
                variant="secondary"
                size="md"
                className="shrink-0"
              >
                View Example Report
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5 · Example assessment snapshot ──────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="snapshot-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Example Output</p>
            <h2 id="snapshot-heading" className={HEADING}>
              Example assessment snapshot
            </h2>
            <p className={BODY}>
              A Mythos report should make the next decision easier. The customer
              should be able to see what was tested, what failed, what changed,
              and what still requires approval.
            </p>
          </ScrollReveal>
          <ScrollReveal y={20}>
            <AssessmentSnapshot />
          </ScrollReveal>
        </Container>
      </section>

      {/* 6 · How engagement starts ────────────────────────── */}
      <section
        id="how-engagement-starts"
        className="scroll-mt-24 border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="engagement-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Engagement Path</p>
            <h2 id="engagement-heading" className={HEADING}>
              How engagement starts
            </h2>
            <p className={BODY}>
              A Mythos assessment begins with a defined AI system, a controlled
              scope, and a clear deployment question. The goal is to understand
              what is being trusted before trust expands.
            </p>
          </ScrollReveal>
          <ScrollReveal y={20}>
            <EngagementPath />
          </ScrollReveal>
          <ScrollReveal y={20}>
            <EngagementTypes />
          </ScrollReveal>
        </Container>
      </section>

      {/* 7 · Final CTA ────────────────────────────────────── */}
      <CTASection
        variant="bordered"
        backgroundImage="/images/use-cases/lower-cta-bg.png"
        id="start-assessment"
        className="scroll-mt-24"
        badge="Start the Assessment"
        headline="Which AI deployment are you preparing to trust?"
        subline="Tell Mythos what you are building, connecting, or preparing to release. We will help identify the right assessment path."
        primaryCta={{ label: CTA.PRIMARY, href: "/contact" }}
        secondaryCta={{ label: "Request Demo", href: "/demo" }}
      />
    </>
  );
}
