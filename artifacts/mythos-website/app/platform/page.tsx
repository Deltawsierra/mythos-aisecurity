import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { EnginePanel } from "@/components/sections/EnginePanel";
import { SixQuestionsRing } from "@/components/sections/SixQuestionsRing";
import { AssurancePath } from "@/components/sections/AssurancePath";
import { DeploymentAssuranceComparison } from "@/components/platform/DeploymentAssuranceComparison";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { PlatformHero } from "@/components/sections/PlatformHero";
import { PlatformFloatingArtifact3D } from "@/components/three/PlatformFloatingArtifact3D";
import { PlatformModelPreloader } from "@/components/three/PlatformModelPreloader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore how Mythos uses Athena and Achilles to map AI system exposure, test behavior, support remediation, and produce evidence for deployment decisions.",
};

const RISKS = [
  {
    title: "Context exposure",
    description:
      "What the AI can see, retrieve, infer, or expose across connected data and systems.",
  },
  {
    title: "Route uncertainty",
    description:
      "Where prompts, data, model calls, logs, tools, and fallback paths actually travel.",
  },
  {
    title: "Agentic action",
    description:
      "Which files, APIs, tools, approvals, or workflows the AI is able to trigger on its own.",
  },
];

const ATHENA_CAPABILITIES = [
  "App and API security checks",
  "Cloud and identity exposure",
  "Repository and pipeline review",
  "Finding management",
  "Compliance mapping",
  "Evidence and remediation proof",
];

const ACHILLES_CAPABILITIES = [
  "Prompt and RAG testing",
  "Agent behavior validation",
  "AI route assurance",
  "Permission boundary testing",
  "Approval bypass testing",
  "AI execution receipts",
];

const EVIDENCE_ITEMS = [
  "Finding summary",
  "Affected systems or workflows",
  "Proof and reproduction context",
  "Severity and business impact",
  "Remediation guidance",
  "Control or policy mapping",
  "Retest status",
  "Executive summary",
];

const GATE_OUTCOMES = [
  {
    label: "Ready to proceed",
    description: "Key controls passed within the defined scope.",
    accent: "rgba(166,106,50,0.6)",
    tone: "text-bronze",
  },
  {
    label: "Needs remediation",
    description: "Findings require fixes before the workflow moves forward.",
    accent: "rgba(214,161,74,0.7)",
    tone: "text-antique-gold",
  },
  {
    label: "Requires revalidation",
    description:
      "Changes in data, tools, routes, prompts, permissions, or models call for another review.",
    accent: "rgba(255,157,59,0.7)",
    tone: "text-ember",
  },
];

const REVALIDATION_NOW = [
  { label: "Change-triggered review", desc: "Re-test when something that affects risk moves." },
  { label: "Recurring testing", desc: "Validation that runs on a defined cadence, not once." },
  { label: "Updated evidence", desc: "Fresh proof that reflects the system as it stands today." },
  { label: "Retest proof", desc: "A clear record of what was fixed and re-verified." },
];

const DEPLOYMENT_ITEMS = [
  { label: "Defined scope", desc: "Work is bounded to systems the customer names." },
  { label: "Customer authorization", desc: "Testing proceeds only with explicit approval." },
  { label: "Controlled test environments", desc: "Designed for isolated, auditable contexts." },
  { label: "Sensitive data handling", desc: "Built for organizations with strict data requirements." },
  { label: "Enterprise review process", desc: "Findings flow into your existing review and sign-off." },
  { label: "Private deployment paths", desc: "On-prem and isolated paths are part of the roadmap." },
];

const EYEBROW = "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING = "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

/**
 * Decorative Mythos "M" emblem used as the connector between the Athena and
 * Achilles engine cards. Transparent, no spin, reduced-motion safe.
 */
function MEmblem({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[-65%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,106,50,0.4), transparent 70%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/platform/mythos-m-emblem.webp"
        alt=""
        className="relative h-full w-full object-contain"
        style={{ filter: "drop-shadow(0 0 16px rgba(166,106,50,0.45))" }}
      />
    </span>
  );
}

export default function PlatformPage() {
  return (
    <>
      {/* Route-local: warm the shield + spear GLBs for the lower sections
          (desktop + motion + WebGL only). */}
      <PlatformModelPreloader />

      {/* 1 · Hero ─────────────────────────────────────────── */}
      <PlatformHero />

      {/* 2 · Why this matters now ─────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="why-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Why Now</p>
            <h2 id="why-heading" className={HEADING}>
              AI is no longer just generating text.
            </h2>
            <p className={BODY}>
              Enterprise AI now touches internal data, routes requests through outside providers,
              retrieves context, calls tools, and triggers workflows. A traditional security
              review looks at parts in isolation — it rarely shows how those pieces behave
              together at the moment of deployment.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RISKS.map((r) => (
              <FeatureCard
                key={r.title}
                variant="problem"
                title={r.title}
                description={r.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* Deployment assurance vs a normal scan ────────────── */}
      <DeploymentAssuranceComparison />

      {/* 3 · Six assurance questions ──────────────────────── */}
      <section
        id="assurance-model"
        className="scroll-mt-24 border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="questions-heading"
      >
        <Container>
          <ScrollReveal className="mb-4 max-w-2xl">
            <p className={EYEBROW}>The Assurance Model</p>
            <h2 id="questions-heading" className={HEADING}>
              Six questions every AI deployment must answer.
            </h2>
            <p className={BODY}>
              Deployment risk comes down to six questions. Athena and Achilles are built to
              answer each one with tested results, not assumptions.
            </p>
          </ScrollReveal>
          <SixQuestionsRing />
        </Container>
      </section>

      {/* 4 · The Forge: Athena + Achilles ─────────────────── */}
      <section
        className="border-b border-ivory/5 bg-charcoal py-20 lg:py-28"
        aria-labelledby="forge-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>The Forge</p>
            <h2 id="forge-heading" className={HEADING}>
              System risk and AI behavior, validated together.
            </h2>
            <p className={BODY}>
              Athena validates the system foundation. Achilles tests the AI execution layer.
              Mythos connects both into one repeatable process that turns testing into
              structured evidence.
            </p>
          </ScrollReveal>
          <div className="relative">
            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-14">
              <ScrollReveal x={-32} y={0}>
                <EnginePanel
                  variant="athena"
                  engineLabel="Offensive security and evidence engine"
                  name="Athena"
                  positioning="System risk & proof"
                  description="Athena maps exposure, routes, permissions, findings, and proof so teams can understand the system risk beneath an AI workflow."
                  capabilities={ATHENA_CAPABILITIES}
                  backgroundImage="/images/platform/athena-engine-card-bg.webp"
                />
              </ScrollReveal>

              {/* Connector — stacked between the cards on mobile. */}
              <div className="flex justify-center lg:hidden" aria-hidden="true">
                <MEmblem className="h-16 w-16" />
              </div>

              <ScrollReveal x={32} y={0}>
                <EnginePanel
                  variant="achilles"
                  engineLabel="AI assurance and validation engine"
                  name="Achilles"
                  positioning="AI behavior & boundaries"
                  description="Achilles tests prompts, retrieval, agents, tools, approvals, permissions, routes, and lifecycle gates to determine whether AI behaves within defined boundaries."
                  capabilities={ACHILLES_CAPABILITIES}
                  backgroundImage="/images/platform/achilles-engine-card-bg.webp"
                />
              </ScrollReveal>
            </div>

            {/* Connector — centered over the seam on desktop. */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
              aria-hidden="true"
            >
              <MEmblem className="h-24 w-24" />
            </div>
          </div>
        </Container>
      </section>

      {/* 5 · The Assurance Path ───────────────────────────── */}
      <section
        className="relative isolate overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="path-heading"
      >
        {/* Floating Athena shield accent — decorative, desktop only */}
        <PlatformFloatingArtifact3D
          kind="shield"
          className="absolute right-[1%] top-6 z-0 hidden h-[300px] w-[300px] lg:block xl:right-[3%]"
        />
        <Container className="relative z-10">
          <ScrollReveal className="max-w-2xl">
            <p className={EYEBROW}>The Assurance Path</p>
            <h2 id="path-heading" className={HEADING}>
              From scope to release readiness.
            </h2>
            <p className={BODY}>
              Mythos starts from a defined, customer-controlled scope, tests the AI workflow and
              the system around it, records evidence, supports remediation review, and retests
              before any release decision is made.
            </p>
          </ScrollReveal>
          <ScrollReveal y={20}>
            <AssurancePath />
          </ScrollReveal>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-stone/70">
            Customer teams keep approval authority at every step. Mythos produces the evidence —
            it does not approve production or remediate on its own.
          </p>
        </Container>
      </section>

      {/* 6 · Evidence Pack ────────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="evidence-heading"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <p className={EYEBROW}>Evidence Pack</p>
              <h2 id="evidence-heading" className={HEADING}>
                Evidence teams can actually use.
              </h2>
              <p className={`${BODY} mb-5`}>
                Mythos turns testing into reviewable outputs for security, compliance,
                remediation, and executive decisions.
              </p>
              <p className="text-sm leading-relaxed text-muted-stone/70">
                An Evidence Pack supports customer review. It is not legal certification,
                compliance approval, or a guarantee.
              </p>
            </ScrollReveal>
            <ScrollReveal x={32} y={0}>
              <div className="border border-bronze/20 bg-charcoal/60 p-6 lg:p-8">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
                  A pack may include
                </p>
                <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {EVIDENCE_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-stone">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-bronze/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 7 · Release Gate ─────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="gate-heading"
      >
        {/* Floating Achilles spear accent — decorative, desktop only */}
        <PlatformFloatingArtifact3D
          kind="spear"
          className="absolute right-[1%] top-6 z-0 hidden h-[320px] w-[300px] lg:block xl:right-[3%]"
        />
        <Container className="relative z-10">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Release Gate</p>
            <h2 id="gate-heading" className={HEADING}>
              The release gate is evidence, not blind trust.
            </h2>
            <p className={BODY}>
              Before an AI workflow moves forward, Mythos helps teams see what passed, what
              failed, what changed, and what still needs review.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 md:grid-cols-3">
            {GATE_OUTCOMES.map((o) => (
              <div
                key={o.label}
                className="relative overflow-hidden border border-ivory/8 bg-charcoal p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px"
                  style={{ background: o.accent }}
                />
                <p className={`mb-2 font-display text-lg font-normal ${o.tone}`}>{o.label}</p>
                <p className="text-sm leading-relaxed text-muted-stone">{o.description}</p>
              </div>
            ))}
          </StaggerReveal>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-stone/70">
            Mythos calls this a release-readiness review. It informs the customer&apos;s decision —
            it does not certify a system as safe.
          </p>
        </Container>
      </section>

      {/* 8 · Continuous Revalidation ──────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="revalidation-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Continuous Revalidation</p>
            <h2 id="revalidation-heading" className={HEADING}>
              AI systems change. Assurance has to repeat.
            </h2>
            <p className={BODY}>
              Models, prompts, data sources, permissions, tools, and routes shift over time.
              Mythos is designed to support recurring validation so new risk does not stay hidden
              after launch.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REVALIDATION_NOW.map((item) => (
              <div key={item.label} className="border border-ivory/8 bg-charcoal p-5">
                <p className="mb-1.5 text-sm font-semibold text-ivory">{item.label}</p>
                <p className="text-sm leading-relaxed text-muted-stone">{item.desc}</p>
              </div>
            ))}
          </StaggerReveal>
          <ScrollReveal y={16}>
            <p className="mt-6 text-sm leading-relaxed text-muted-stone/70">
              The platform roadmap includes continuous monitoring and change-risk alerting so
              recurring validation can run with less manual effort over time.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 9 · Deployment Model ─────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="deploy-heading"
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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <p className={EYEBROW}>Deployment</p>
              <h2 id="deploy-heading" className={HEADING}>
                Built for controlled enterprise environments.
              </h2>
              <p className={BODY}>
                Mythos is designed for scoped, authorization-first work with organizations that
                need validation, evidence, and clear control over sensitive AI systems.
              </p>
            </ScrollReveal>
            <StaggerReveal className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {DEPLOYMENT_ITEMS.map((item) => (
                <div key={item.label} className="border border-ivory/8 bg-charcoal p-5">
                  <p className="mb-1.5 text-sm font-semibold text-ivory">{item.label}</p>
                  <p className="text-sm leading-relaxed text-muted-stone">{item.desc}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

    </>
  );
}
