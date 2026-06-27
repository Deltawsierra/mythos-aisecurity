import { Fragment } from "react";
import type { Metadata } from "next";
import { Users, Landmark, Radar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  SolutionCard,
  type SolutionMotif,
} from "@/components/sections/SolutionCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "See how Mythos supports enterprise teams reviewing AI assistants, agents, copilots, data integrations, regulated workflows, and strategic horizon scenarios.",
};

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

/** Hero supporting points — three buyer environments, not product mechanics. */
const ENV_POINTS = [
  {
    icon: Users,
    label: "Customer-facing AI",
    desc: "Copilots and agents your customers and prospects interact with directly.",
  },
  {
    icon: Landmark,
    label: "Regulated records",
    desc: "AI inside finance, healthcare, and audited records.",
  },
  {
    icon: Radar,
    label: "Mission-sensitive systems",
    desc: "Sensitive environments where scope and approval come first.",
  },
];

const BUYER_PROBLEMS = [
  {
    title: "Hidden access",
    description:
      "AI may retrieve documents, metadata, logs, permissions, or user context teams did not intend to expose.",
  },
  {
    title: "Action paths",
    description:
      "Agents and copilots may call tools, move data, trigger actions, or bypass expected approval steps.",
  },
  {
    title: "Review gaps",
    description:
      "Security, compliance, and leadership teams need findings they can evaluate, not vague scanner output.",
  },
  {
    title: "Change drift",
    description:
      "Prompts, models, tools, permissions, and routes can change after launch.",
  },
];

const SOLUTIONS: {
  title: string;
  motif: SolutionMotif;
  buyerRisk: string;
  examines: string;
  delivers: string;
  startingPoint: string;
}[] = [
  {
    title: "AI-heavy SaaS",
    motif: "saas",
    buyerRisk:
      "Customer security teams want confidence that customer-facing agents and copilots will not cross tenant boundaries, misuse tools, or behave unpredictably.",
    examines:
      "Tenant boundaries, RAG leakage, agent tool use, prompt injection exposure, and the actions a customer security review will ask about.",
    delivers:
      "Boundary test results, reproduction context, finding summaries, retest notes, and a customer-review packet.",
    startingPoint: "Agent Safety Assessment",
  },
  {
    title: "Finance and Insurance",
    motif: "finance",
    buyerRisk:
      "AI assistants can touch customer records, policy documents, claims systems, and the approval paths behind regulated decisions.",
    examines:
      "Data exposure, retrieval paths, permission boundaries, approval bypass risk, and logging exposure across sensitive routes.",
    delivers:
      "Data exposure findings, route review, permission test results, remediation notes, and control mapping.",
    startingPoint: "AI Data Exposure Assessment",
  },
  {
    title: "Healthcare and Life Sciences",
    motif: "healthcare",
    buyerRisk:
      "AI may touch protected health information, research data, clinical notes, lab systems, or sensitive operational records.",
    examines:
      "Context exposure, retrieval leakage, role boundaries, data handling, and the AI-assisted record paths privacy teams review.",
    delivers:
      "Exposure findings, data-flow notes, test results, remediation guidance, and review-ready reporting.",
    startingPoint: "AI Readiness or AI Data Exposure Assessment",
  },
  {
    title: "Regulated Enterprise",
    motif: "regulated",
    buyerRisk:
      "Large organizations need confidence that AI controls hold across cloud, identity, data, applications, and regulated records.",
    examines:
      "System exposure, identity paths, cloud configuration, AI behavior, tool boundaries, and the findings behind each one.",
    delivers:
      "A compliance review pack with finding summaries, control mapping, remediation tracking, and retest status.",
    startingPoint: "AI Compliance Evidence Package",
  },
  {
    title: "Defense-Adjacent and Mission-Sensitive Teams",
    motif: "defense",
    buyerRisk:
      "Sensitive AI workflows require defined scope, authorization-first testing, human review, and careful handling of findings.",
    examines:
      "Access boundaries, route control, agent behavior, data handling, and the approval paths a mission-sensitive review depends on.",
    delivers:
      "Custom finding packages, control mapping, retest notes, executive summaries, and reporting for mission-sensitive review.",
    startingPoint: "Custom High-Risk AI Assessment",
  },
  {
    title: "Systems Integrators and Consultancies",
    motif: "integrators",
    buyerRisk:
      "Partners delivering AI for clients need repeatable checks before client handoff, procurement review, or production launch.",
    examines:
      "Client AI systems, RAG pipelines, agent tool use, route boundaries, and what a client review will expect.",
    delivers:
      "Partner-ready findings, assessment outputs, remediation tracking, client handoff documentation, and repeatable test artifacts.",
    startingPoint: "Partner Pilot or Scoped Assessment",
  },
];

const ASSESSMENTS = [
  {
    title: "AI Readiness Assessment",
    description:
      "For teams preparing to launch or expand customer-facing AI that want exposure, behavior, and finding gaps surfaced first.",
  },
  {
    title: "Agent Safety Assessment",
    description:
      "For copilots, agents, and tool-using systems — focused on action boundaries and tool behavior under realistic conditions.",
  },
  {
    title: "AI Data Exposure Assessment",
    description:
      "For teams concerned about sensitive context, retrieval, and the access paths an AI system can reach.",
  },
  {
    title: "AI Compliance Evidence Package",
    description:
      "For organizations that need reviewable findings, control mapping, and retest records the compliance team can use.",
  },
  {
    title: "Custom High-Risk AI Assessment",
    description:
      "For sensitive, regulated, or mission-critical environments with unique constraints and custom reporting needs.",
  },
];

/** Compact engagement flow for Solutions — the full path lives on Platform. */
const FLOW = [
  {
    label: "Scope",
    desc: "Define the environment, data paths, and boundaries to test.",
  },
  {
    label: "Test",
    desc: "Check the paths, agents, and access that matter in your environment.",
  },
  {
    label: "Report",
    desc: "Deliver organized findings your teams can review and act on.",
  },
  {
    label: "Retest",
    desc: "Re-check after fixes and when the system changes.",
  },
];

const WHY_MYTHOS = [
  {
    title: "Environment-specific testing",
    description:
      "Checks are scoped to the systems, users, tools, and data paths that matter to each buyer environment.",
  },
  {
    title: "Reviewable output",
    description:
      "Findings are organized so security, AI, compliance, and leadership teams can act on them.",
  },
  {
    title: "Built for AI execution paths",
    description:
      "Mythos focuses on what AI can access, where requests move, and what actions can occur.",
  },
  {
    title: "Human-accountable process",
    description:
      "Customer teams remain in control of approvals, fixes, and deployment decisions.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Section 1 — Buyer hero ──────────────────────────────── */}
      <section
        className="relative isolate flex min-h-[68vh] items-center overflow-hidden border-b border-ivory/5 bg-obsidian"
        aria-label="Page hero"
      >
        {/* Full-bleed background: cinematic looping clip + image fallback. */}
        <HeroVideo
          src="/video/solutions-hero-loop.mp4"
          poster="/images/solutions/solutions-hero-bg.png"
          className="absolute inset-0"
        />

        {/* Readability gradient: darkest on the far left, fully transparent by
            the middle of the hero so the background art reads on the right. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.9) 18%, rgba(5,5,5,0.72) 36%, rgba(5,5,5,0.45) 50%, rgba(5,5,5,0.18) 58%, rgba(5,5,5,0) 64%)",
          }}
        />
        {/* Mobile/tablet: a gentle all-over scrim so the stacked copy stays
            readable over the poster image. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.84) 0%, rgba(5,5,5,0.6) 45%, rgba(5,5,5,0.78) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.25) 30%, rgba(166,106,50,0.25) 70%, transparent)",
          }}
        />
        <Container className="relative z-10 py-20 lg:py-24">
          <ScrollReveal className="max-w-3xl">
            <p className={EYEBROW}>AI Risk by Environment</p>
            <h1 className="mb-6 max-w-2xl text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]">
              <span className="text-antique-gold">Different</span> AI deployments.
              <br />
              <span className="text-antique-gold">Evolving</span> risks.
              <br />
              <span className="text-antique-gold">Continuous</span> need for proof.
            </h1>
            <p className="mb-9 max-w-[30rem] text-base leading-relaxed text-muted-stone sm:text-lg">
              Mythos examines AI where it actually runs: customer facing
              surfaces, regulated records, and approval paths each buyer
              environment puts at stake.
            </p>
            <Button href="#solution-cards" variant="primary" size="lg">
              Find Your Starting Point
            </Button>
          </ScrollReveal>

          <ScrollReveal y={16}>
            <dl className="mt-14 flex flex-col gap-6 border-t border-ivory/8 pt-8 sm:flex-row sm:gap-0">
              {ENV_POINTS.map((point, i) => (
                <div
                  key={point.label}
                  className={cn(
                    "flex items-start gap-3 sm:flex-1 sm:px-7",
                    i === 0 && "sm:pl-0",
                    i > 0 && "sm:border-l sm:border-ivory/10",
                  )}
                >
                  <point.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-bronze"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-semibold text-ivory">
                      {point.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-stone">
                      {point.desc}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </Container>
      </section>

      {/* Section 2 — The buyer problem ───────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="buyer-problem-heading"
      >
        <Container>
          <ScrollReveal className="max-w-3xl">
            <h2 id="buyer-problem-heading" className={HEADING}>
              AI risk changes with the environment around it.
            </h2>
            <p className={BODY}>
              The same AI feature can create different risks depending on the
              data it touches, the users it serves, the tools it can call, and
              the decisions it supports.
            </p>
          </ScrollReveal>

          <StaggerReveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BUYER_PROBLEMS.map((p) => (
              <FeatureCard
                key={p.title}
                variant="problem"
                title={p.title}
                description={p.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* Section 3 — Buyer solution cards ────────────────────── */}
      <section
        id="solution-cards"
        className="scroll-mt-24 border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="solutions-heading"
      >
        <Container>
          <ScrollReveal className="max-w-3xl">
            <p className={EYEBROW}>By Buyer Environment</p>
            <h2 id="solutions-heading" className={HEADING}>
              Find the lens that matches your environment.
            </h2>
            <p className={BODY}>
              Each environment puts different data, users, tools, and approval
              paths at stake. Find the one closest to yours to see what Mythos
              examines and what your teams get back.
            </p>
          </ScrollReveal>

          <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-2">
            {SOLUTIONS.map((s) => (
              <SolutionCard
                key={s.title}
                title={s.title}
                motif={s.motif}
                buyerRisk={s.buyerRisk}
                examines={s.examines}
                delivers={s.delivers}
                startingPoint={s.startingPoint}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* Section 4 — Assessment entry points ─────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="assessments-heading"
      >
        <Container>
          <ScrollReveal className="max-w-3xl">
            <h2 id="assessments-heading" className={HEADING}>
              Start with a scoped assessment.
            </h2>
            <p className={BODY}>
              Assessments give teams a focused way to examine one AI surface,
              agent, data path, or buyer environment before expanding into an
              ongoing engagement.
            </p>
          </ScrollReveal>

          <StaggerReveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {ASSESSMENTS.map((a, i) => (
              <FeatureCard
                key={a.title}
                variant="default"
                tag="Assessment"
                title={a.title}
                description={a.description}
                className={cn("lg:col-span-2", i === 3 && "lg:col-start-2")}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* Section 5 — Common engagement model (compact) ──────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="engagement-model-heading"
      >
        <Container>
          <ScrollReveal className="max-w-3xl">
            <h2 id="engagement-model-heading" className={HEADING}>
              One model, adapted to each environment.
            </h2>
            <p className={BODY}>
              Every engagement starts with scope. Mythos maps the environment,
              tests the paths that matter, records findings, supports
              remediation review, and retests when changes occur.
            </p>
          </ScrollReveal>

          <ScrollReveal y={16}>
            <div
              role="list"
              aria-label="Mythos engagement flow"
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              {FLOW.map((step, i) => (
                <Fragment key={step.label}>
                  <div
                    role="listitem"
                    className="flex-1 border border-ivory/8 bg-charcoal p-5"
                  >
                    <p className="font-display text-lg font-normal text-antique-gold">
                      {step.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-stone">
                      {step.desc}
                    </p>
                  </div>
                  {i < FLOW.length - 1 && (
                    <ArrowRight
                      className="mx-auto h-5 w-5 shrink-0 rotate-90 self-center text-bronze/60 sm:rotate-0"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Section 6 — Why teams choose Mythos ─────────────────── */}
      <section
        className="relative overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="why-mythos-heading"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/platform/deploy-assurance-bg.webp)",
            opacity: 1,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.18) 45%, rgba(5,5,5,0.55) 100%)",
          }}
        />
        <Container className="relative z-10">
          <ScrollReveal className="max-w-3xl">
            <h2 id="why-mythos-heading" className={HEADING}>
              Why teams choose Mythos.
            </h2>
          </ScrollReveal>

          <StaggerReveal className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {WHY_MYTHOS.map((point) => (
              <FeatureCard
                key={point.title}
                variant="principle"
                title={point.title}
                description={point.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>
    </>
  );
}
