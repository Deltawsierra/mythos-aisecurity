import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

export const metadata: Metadata = {
  title: "Request Demo",
  description:
    "Request a private Mythos walkthrough to see how AI deployment assurance can support assessment, evidence, remediation, retest, and deployment decisions.",
};

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

/* ── Section 1 · What the demo covers ─────────────────────── */
const COVERAGE = [
  {
    title: "System and access mapping",
    description:
      "How Mythos thinks about connected systems, users, data sources, tools, model routes, and permissions.",
  },
  {
    title: "AI behavior validation",
    description:
      "How AI systems can be tested under normal, edge-case, adversarial, and permission-boundary conditions.",
  },
  {
    title: "Use case walkthroughs",
    description:
      "How different AI deployments create different risk surfaces across agents, copilots, RAG systems, decision support, data platforms, and strategic horizon scenarios.",
  },
  {
    title: "Findings and severity",
    description:
      "How assessment results can be organized into severity, business impact, root cause, remediation, and retest criteria.",
  },
  {
    title: "Evidence packs",
    description:
      "How prompts, traces, logs, screenshots, source maps, tool calls, and retest evidence can support decisions.",
  },
  {
    title: "Deployment recommendations",
    description:
      "How Mythos frames outcomes such as sandbox, limited pilot, draft-only use, human-reviewed rollout, retest required, or blocked deployment.",
  },
];

/* ── Section 2 · Who the demo is for ──────────────────────── */
const AUDIENCE = [
  {
    title: "Security leaders",
    description:
      "For teams reviewing AI access, data exposure, model routes, prompt injection, tool use, and control gaps.",
  },
  {
    title: "AI and product leaders",
    description:
      "For teams preparing assistants, agents, copilots, or integrations for pilot, production, or expanded access.",
  },
  {
    title: "Engineering and platform teams",
    description:
      "For teams connecting AI to cloud systems, data platforms, repositories, APIs, tools, and deployment workflows.",
  },
  {
    title: "Compliance, risk, and legal teams",
    description:
      "For teams that need evidence, review points, human approval, and audit-ready decision material.",
  },
  {
    title: "Investors and strategic partners",
    description:
      "For people evaluating the Mythos thesis, product direction, and strategic horizon.",
  },
];

/* ── Section 3 · Demo vs assessment ───────────────────────── */
const DEMO_BEST_FOR = [
  "Seeing how Mythos works",
  "Understanding deliverables",
  "Exploring use cases",
  "Investor or partner overview",
  "Early product evaluation",
  "Internal education",
];

const ASSESSMENT_BEST_FOR = [
  "Reviewing a real AI system",
  "Preparing for pilot",
  "Preparing for production",
  "Expanding AI access",
  "Reviewing a vendor integration",
  "Retesting after remediation",
];

/* ── Section 4 · What happens after ───────────────────────── */
const NEXT_STEPS = [
  {
    title: "Mythos reviews the request",
    description:
      "We look at the organization, role, interest area, and requested walkthrough type.",
  },
  {
    title: "The right walkthrough path is selected",
    description:
      "The demo may focus on platform flow, use cases, evidence outputs, assessment process, or investor/product overview.",
  },
  {
    title: "A controlled conversation is scheduled",
    description:
      "The walkthrough is designed to explain the Mythos approach without requiring sensitive production information.",
  },
  {
    title: "The next step is recommended",
    description:
      "After the demo, the next step may be an assessment conversation, investor discussion, partnership discussion, or follow-up product walkthrough.",
  },
];

/* ── Section 6 · Use case preview paths ───────────────────── */
const USE_CASE_PATHS = [
  {
    title: "AI Agent With Tools and Actions",
    href: "/use-cases/ai-agent-tools-actions",
  },
  {
    title: "Internal Knowledge / RAG Assistant",
    href: "/use-cases/internal-knowledge-rag-assistant",
  },
  {
    title: "Data Platform / Cloud AI Integration",
    href: "/use-cases/data-platform-cloud-ai-integration",
  },
  {
    title: "Partner / Vendor AI Integration",
    href: "/use-cases/partner-vendor-ai-integration",
  },
  {
    title: "Regulated Workflow Assistant",
    href: "/use-cases/regulated-workflow-assistant",
  },
  {
    title: "Strategic Horizon Scenarios",
    href: "/use-cases",
    description:
      "Explore Hermes and quantum-adjacent R&D scenarios with the appropriate strategic horizon guardrails.",
  },
];

export default function DemoPage() {
  return (
    <>
      {/* Hero ─────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-ivory/5"
        aria-label="Demo hero"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/demo/demo-vault-hero-bg.png)",
          }}
        />
        {/* Desktop: dark on the left, clearing by mid-hero so the vault door
            on the right stays visible. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.9) 20%, rgba(5,5,5,0.72) 38%, rgba(5,5,5,0.42) 52%, rgba(5,5,5,0.14) 62%, rgba(5,5,5,0) 70%)",
          }}
        />
        {/* Mobile/tablet: all-over scrim so stacked copy stays readable. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.82) 45%, rgba(5,5,5,0.92) 100%)",
          }}
        />
        {/* Bottom divider glow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.25) 30%, rgba(166,106,50,0.25) 70%, transparent)",
          }}
        />
        <Container className="relative z-10 py-20 lg:py-28">
          <ScrollReveal className="max-w-2xl">
            <p className={EYEBROW}>Request Demo</p>
            <h1 className="mb-6 max-w-xl text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]">
              See how Mythos turns AI risk into reviewable evidence.
            </h1>
            <p className="mb-8 max-w-[33rem] text-base leading-relaxed text-muted-stone sm:text-lg">
              Request a private Mythos walkthrough to see how AI deployment
              assurance can help teams map access, test behavior, review findings,
              plan remediation, and support deployment decisions before trust
              expands.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact?intent=demo" variant="primary" size="lg">
                Request Demo
              </Button>
              <Button
                href="/contact?intent=assessment"
                variant="secondary"
                size="lg"
              >
                Request Assessment
              </Button>
            </div>
            <p className="mt-8 flex max-w-md items-start gap-2.5 text-xs leading-relaxed text-muted-stone/70">
              <Lock
                className="mt-0.5 h-4 w-4 shrink-0 text-bronze"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              The demo is a controlled walkthrough. Do not submit secrets,
              credentials, regulated records, or sensitive production data through
              public forms.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 1 · What the demo covers ─────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="cover-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Demo Walkthrough</p>
            <h2 id="cover-heading" className={HEADING}>
              What the walkthrough can cover.
            </h2>
            <p className={BODY}>
              A Mythos demo is designed to show how an AI assessment can move from
              system scope to findings, evidence, remediation, retest, and
              deployment recommendation.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COVERAGE.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* 2 · Who the demo is for ──────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="audience-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Who Should Request It</p>
            <h2 id="audience-heading" className={HEADING}>
              Built for teams deciding whether AI is ready for more trust.
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* 3 · Demo vs assessment ───────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="compare-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Demo or Assessment?</p>
            <h2 id="compare-heading" className={HEADING}>
              Demo or assessment?
            </h2>
            <p className={BODY}>
              A demo helps you understand the Mythos workflow. An assessment
              starts a scoped review conversation around a real system.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Request Demo column */}
            <ScrollReveal>
              <div className="flex h-full flex-col border border-ivory/8 bg-charcoal p-7 lg:p-8">
                <h3 className="mb-1 font-display text-2xl font-normal text-ivory">
                  Request Demo
                </h3>
                <p className="mb-6 text-sm text-muted-stone/70">
                  Understand how Mythos works.
                </p>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                  Best for
                </p>
                <ul className="mb-6 flex flex-col gap-2.5">
                  {DEMO_BEST_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-stone/50"
                      />
                      <span className="text-sm leading-relaxed text-muted-stone">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mb-6 border-l-2 border-ivory/15 pl-4 text-sm leading-relaxed text-muted-stone">
                  <span className="font-semibold text-ivory">Output:</span> a
                  walkthrough conversation and next-step recommendation.
                </p>
                <div className="mt-auto">
                  <Button
                    href="/contact?intent=demo"
                    variant="secondary"
                    size="md"
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Request Assessment column */}
            <ScrollReveal delay={0.05}>
              <div className="flex h-full flex-col border border-bronze/30 bg-graphite p-7 lg:p-8">
                <h3 className="mb-1 font-display text-2xl font-normal text-ivory">
                  Request Assessment
                </h3>
                <p className="mb-6 text-sm text-muted-stone/70">
                  Review a real AI system.
                </p>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                  Best for
                </p>
                <ul className="mb-6 flex flex-col gap-2.5">
                  {ASSESSMENT_BEST_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze"
                      />
                      <span className="text-sm leading-relaxed text-ivory/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mb-6 border-l-2 border-bronze/40 pl-4 text-sm leading-relaxed text-muted-stone">
                  <span className="font-semibold text-ivory">Output:</span> a
                  scoped assessment path that can lead to findings, evidence,
                  remediation guidance, and retest proof.
                </p>
                <div className="mt-auto">
                  <Button
                    href="/contact?intent=assessment"
                    variant="primary"
                    size="md"
                  >
                    Request Assessment
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 4 · What happens after requesting a demo ─────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="after-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Next Step</p>
            <h2 id="after-heading" className={HEADING}>
              What happens after you request a demo.
            </h2>
          </ScrollReveal>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEXT_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col border-t-2 border-t-bronze/40 bg-charcoal p-7"
              >
                <span className="mb-4 font-display text-2xl font-normal text-bronze/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-base font-semibold text-ivory">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-stone">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          <ScrollReveal y={16}>
            <p className="mt-10 max-w-2xl border-l-2 border-bronze/30 pl-4 text-sm leading-relaxed text-muted-stone/80">
              Do not submit secrets, credentials, regulated records, private
              customer data, or sensitive production material through public
              forms.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5 · Private walkthrough note ─────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="private-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mx-auto flex max-w-3xl gap-5 border border-bronze/30 bg-obsidian/50 p-8 backdrop-blur-sm lg:p-10">
              <Lock
                className="mt-1 h-6 w-6 shrink-0 text-antique-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className={EYEBROW}>Controlled Access</p>
                <h2
                  id="private-heading"
                  className="mb-4 text-xl font-normal leading-tight text-ivory lg:text-2xl"
                >
                  Controlled access, not public self-service.
                </h2>
                <p className="text-sm leading-relaxed text-muted-stone">
                  The Mythos demo experience is intended to be a private
                  walkthrough or controlled conversation. It should not be
                  interpreted as unrestricted public platform access, production
                  testing authorization, or an automatic assessment.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 6 · Demo use case preview ────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="paths-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Example Walkthrough Paths</p>
            <h2 id="paths-heading" className={HEADING}>
              Choose the scenario that matters most.
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASE_PATHS.map((path) => (
              <a
                key={path.title}
                href={path.href}
                className="group flex flex-col border border-ivory/8 bg-charcoal p-6 transition-colors duration-300 hover:border-bronze/40"
              >
                <h3 className="mb-2 font-display text-lg font-normal leading-snug text-ivory">
                  {path.title}
                </h3>
                {path.description && (
                  <p className="mb-4 text-sm leading-relaxed text-muted-stone">
                    {path.description}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze transition-colors group-hover:text-antique-gold">
                  View scenario
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </a>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* 7 · Final CTA ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 lg:py-36"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(26,23,19,0.85) 0%, #050505 55%)",
        }}
        aria-labelledby="final-cta-heading"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/vault-cta-bg.webp)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.45) 62%, rgba(5,5,5,0.86) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.35) 25%, rgba(166,106,50,0.35) 75%, transparent)",
          }}
        />
        <Container className="relative z-10">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2
              id="final-cta-heading"
              className="mb-6 text-4xl font-normal leading-tight text-ivory lg:text-5xl"
            >
              Ready to see the Mythos workflow?
            </h2>
            <p className="mb-10 text-base leading-relaxed text-muted-stone">
              Request a private walkthrough or start an assessment conversation
              around a specific AI system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact?intent=demo" variant="primary" size="lg">
                Request Demo
              </Button>
              <Button
                href="/contact?intent=assessment"
                variant="secondary"
                size="lg"
              >
                Request Assessment
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
