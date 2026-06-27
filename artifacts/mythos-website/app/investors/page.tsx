import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StrategicHorizonNotice } from "@/components/shared/StrategicHorizonNotice";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Review the Mythos AI Security investment thesis, enterprise AI deployment assurance wedge, product direction, and strategic horizon roadmap.",
};

/* ── Shared style tokens ──────────────────────────────────── */
const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

/* ── Section 2 · Core thesis cards ────────────────────────── */
const THESIS_CARDS = [
  {
    title: "AI is becoming operational",
    description:
      "AI is moving into workflows where it can retrieve, summarize, recommend, draft, route, and act.",
  },
  {
    title: "Trust requires evidence",
    description:
      "Buyers need proof of what was tested, what failed, what changed, and what remains blocked.",
  },
  {
    title: "Assurance becomes recurring",
    description:
      "AI systems change as models, prompts, data, tools, vendors, and permissions change. Review should not be a one-time event.",
  },
];

/* ── Section 3 · Why now comparison ───────────────────────── */
const TRADITIONAL_ASKS = [
  "Are known vulnerabilities present?",
  "Are secrets exposed?",
  "Are permissions configured correctly?",
  "Are logs available?",
  "Are controls mapped?",
];

const AI_ASKS = [
  "What can the AI retrieve?",
  "What can the AI do?",
  "Can retrieved content manipulate the system?",
  "Does the AI respect user permissions?",
  "Where do prompts and outputs go?",
  "Which model/provider handles the request?",
  "Can humans verify the output?",
  "What evidence supports rollout?",
];

/* ── Section 4 · Current wedge cards ──────────────────────── */
const WEDGE_CARDS = [
  {
    title: "Customer-facing AI",
    description:
      "Support agents, customer workflows, and external-facing AI behavior.",
  },
  {
    title: "Internal AI",
    description:
      "RAG assistants, copilots, productivity tools, and employee knowledge systems.",
  },
  {
    title: "Agentic AI",
    description:
      "Tool-using systems that can call APIs, update records, send messages, or trigger workflows.",
  },
  {
    title: "Regulated workflows",
    description:
      "AI used around formal review, sensitive records, policy, compliance, or audit-heavy processes.",
  },
  {
    title: "Developer and data platforms",
    description:
      "AI connected to code, repositories, CI/CD, cloud systems, data platforms, and model routes.",
  },
  {
    title: "Vendor AI integrations",
    description:
      "Third-party AI products, SaaS AI features, model providers, and partner workflows.",
  },
];

/* ── Section 6 · Strategic horizon cards ──────────────────── */
const HORIZON_CARDS = [
  {
    eyebrow: "Project Hermes",
    title: "AI Vehicle Assurance",
    description:
      "Project Hermes is the strategic horizon direction for AI-driven vehicle, fleet, telematics, OTA/model update, sensor, perception, autonomy, and cyber-physical mobility assurance.",
    ctaLabel: "Read Hermes Use Case",
    ctaHref: "/use-cases/ai-driven-vehicle-systems-hermes",
    notice: "hermes" as const,
  },
  {
    eyebrow: "Quantum-Adjacent AI",
    title: "Quantum-Adjacent AI Integration",
    description:
      "Quantum-adjacent AI is a strategic R&D scenario involving future-facing assurance considerations around post-quantum readiness, cryptographic inventory, vendor evidence, advanced simulation, optimization, research, and specialized compute workflows.",
    ctaLabel: "Read Quantum Scenario",
    ctaHref: "/use-cases/quantum-adjacent-ai-integration",
    notice: "quantum" as const,
  },
];

/* ── Section 7 · Business model cards ─────────────────────── */
const BUSINESS_CARDS = [
  {
    title: "Scoped assessments",
    description:
      "Defined AI system, defined scope, controlled testing, findings, evidence, remediation, and executive readout.",
  },
  {
    title: "Retest and release gates",
    description:
      "After remediation, Mythos can help validate whether the issue changed before deployment expands.",
  },
  {
    title: "Recurring assurance",
    description:
      "As AI systems evolve, recurring reviews may support ongoing confidence across model updates, tool changes, data-source changes, and workflow expansion.",
  },
];

/* ── Section 8 · Investor materials ───────────────────────── */
const MATERIALS = [
  "Investor packet",
  "Product overview",
  "Use case library",
  "Roadmap overview",
  "Founder conversation",
  "Strategic partnership discussion",
];

export default function InvestorsPage() {
  return (
    <>
      {/* 1 · Investor Hero ─────────────────────────────────── */}
      <section
        className="relative flex min-h-[82vh] items-center overflow-hidden border-b border-ivory/5"
        aria-label="Investor hero"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/heroes/Investors-Hero-Background.png)",
          }}
        />
        {/* Desktop left-weighted scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.86) 32%, rgba(5,5,5,0.5) 60%, rgba(5,5,5,0.22) 100%)",
          }}
        />
        {/* Mobile top-to-bottom scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.6) 42%, rgba(5,5,5,0.88) 100%)",
          }}
        />
        {/* Bottom divider glow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.3) 30%, rgba(166,106,50,0.3) 70%, transparent)",
          }}
        />

        <Container className="relative z-10 py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className={EYEBROW}>Investors</p>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]">
              Building the assurance layer for enterprise AI deployment.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-stone sm:text-lg">
              AI is moving from passive assistance into systems that retrieve
              data, use tools, trigger workflows, support decisions, and connect
              to critical infrastructure. Mythos AI Security is building an
              evidence-first assurance layer to help organizations review these
              systems before trust expands.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                href="/contact?intent=investor"
                variant="primary"
                size="lg"
              >
                Request Investor Materials
              </Button>
              <Button href="/use-cases" variant="secondary" size="lg">
                Explore Use Cases
              </Button>
            </div>

            <p className="mt-10 max-w-lg border-l-2 border-bronze/30 pl-4 text-xs leading-relaxed text-muted-stone/70">
              Investor materials, roadmap context, and forward-looking
              information are available by request and reviewed before sharing.
            </p>
          </div>
        </Container>
      </section>

      {/* 2 · Core Thesis ───────────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="thesis-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Core Thesis</p>
            <h2 id="thesis-heading" className={HEADING}>
              AI deployment risk is becoming an operating problem.
            </h2>
            <div className="flex flex-col gap-4">
              <p className={BODY}>
                Enterprises are moving beyond simple chat interfaces. AI systems
                are being connected to company documents, customer records,
                engineering repositories, cloud platforms, data warehouses, APIs,
                tools, vendor systems, and decision workflows.
              </p>
              <p className={BODY}>
                The question is no longer only whether the model can answer. The
                question is what the AI can access, what it can do, where requests
                go, whether it can be manipulated, and what evidence supports the
                next deployment decision.
              </p>
              <p className={BODY}>
                Mythos is focused on AI deployment assurance: mapping access,
                testing behavior, producing evidence, guiding remediation, and
                supporting retest before deployment expands.
              </p>
            </div>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 md:grid-cols-3">
            {THESIS_CARDS.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* 3 · Why Now ───────────────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="why-now-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Why Now</p>
            <h2 id="why-now-heading" className={HEADING}>
              The AI adoption curve is outpacing deployment assurance.
            </h2>
            <p className={BODY}>
              Organizations are adopting copilots, RAG assistants, agents, AI
              coding tools, decision-support systems, and cloud/data integrations
              quickly. Traditional security review remains important, but AI
              introduces additional deployment questions around retrieval, prompt
              injection, tool use, model routing, human approval, and evidence.
            </p>
          </ScrollReveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <ScrollReveal>
              <div className="h-full border border-ivory/8 bg-charcoal p-7 lg:p-8">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-stone/70">
                  Traditional review asks
                </p>
                <ul className="flex flex-col gap-3">
                  {TRADITIONAL_ASKS.map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-stone/50"
                      />
                      <span className="text-sm leading-relaxed text-muted-stone">
                        {q}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="h-full border border-bronze/25 bg-graphite p-7 lg:p-8">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
                  AI deployment assurance also asks
                </p>
                <ul className="flex flex-col gap-3">
                  {AI_ASKS.map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze"
                      />
                      <span className="text-sm leading-relaxed text-ivory/90">
                        {q}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal y={16}>
            <p className="mt-10 max-w-2xl border-l-2 border-bronze/40 pl-4 text-base leading-relaxed text-ivory/90">
              Mythos is designed for this gap between AI adoption and deployment
              evidence.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 4 · Current Wedge ─────────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="wedge-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Current Wedge</p>
            <h2 id="wedge-heading" className={HEADING}>
              Enterprise AI deployment assurance.
            </h2>
            <div className="flex flex-col gap-4">
              <p className={BODY}>
                Mythos&rsquo; current wedge is enterprise AI assurance for
                organizations deploying AI assistants, agents, copilots, RAG
                systems, vendor AI integrations, developer AI tools, regulated
                workflow assistants, decision-support systems, and cloud/data AI
                integrations.
              </p>
              <p className={BODY}>
                This wedge is practical because enterprise teams already need to
                answer deployment questions before expanding AI access, autonomy,
                or production use.
              </p>
            </div>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WEDGE_CARDS.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </StaggerReveal>
          <ScrollReveal y={16}>
            <div className="mt-10">
              <Button href="/use-cases" variant="secondary" size="md">
                View Use Cases
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5 · Platform Overview ─────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="platform-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Platform</p>
            <h2 id="platform-heading" className={HEADING}>
              Athena maps the system. Achilles tests the behavior.
            </h2>
            <p className={BODY}>
              Mythos is built around a product structure that separates exposure
              mapping from behavior validation.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 lg:grid-cols-2">
            <ScrollReveal>
              <FeatureCard
                variant="engine"
                tag="Athena"
                title="Enterprise assessment and evidence engine"
                description="Athena helps map systems, access, data flows, model/provider routes, permissions, control gaps, findings, remediation guidance, and evidence."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <FeatureCard
                variant="engine"
                tag="Achilles"
                title="AI behavior and deployment validation engine"
                description="Achilles helps test prompts, RAG behavior, tool use, model routes, permissions, escalation, decision boundaries, adversarial inputs, release readiness, and retest behavior."
              />
            </ScrollReveal>
          </div>

          <ScrollReveal y={16}>
            <div className="mt-6 flex items-start gap-3 border border-ivory/8 bg-charcoal/50 px-5 py-4">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-stone/60"
              />
              <p className="text-sm leading-relaxed text-muted-stone/80">
                <span className="font-semibold text-muted-stone">
                  Minotaur (internal only):
                </span>{" "}
                internal-only adversarial validation support. It is not a
                customer-facing product or a purchasable offering.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal y={16}>
            <div className="mt-10">
              <Button href="/platform" variant="secondary" size="md">
                Explore Platform
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 6 · Strategic Horizon ─────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="horizon-heading"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian bg-cover bg-center"
          style={{ backgroundImage: "url(/images/investors/hermes-bg.png)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.8) 40%, rgba(5,5,5,0.93) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.28) 30%, rgba(166,106,50,0.28) 70%, transparent)",
          }}
        />

        <Container className="relative z-10">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Strategic Horizon</p>
            <h2 id="horizon-heading" className={HEADING}>
              A broader assurance category beyond the first wedge.
            </h2>
            <p className={BODY}>
              The immediate Mythos focus is enterprise AI deployment assurance.
              Over time, the same evidence-first category may expand into more
              complex assurance problems where AI touches physical systems,
              advanced computing, and high-assurance environments.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {HORIZON_CARDS.map((card) => (
              <ScrollReveal key={card.title}>
                <div className="flex h-full flex-col border border-bronze/25 bg-obsidian/75 p-7 backdrop-blur-md lg:p-8">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/80">
                    {card.eyebrow}
                  </p>
                  <h3 className="mb-3 font-display text-xl font-normal leading-snug text-ivory">
                    {card.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-stone">
                    {card.description}
                  </p>
                  <StrategicHorizonNotice
                    variant={card.notice}
                    className="mb-6 mt-auto"
                  />
                  <Button href={card.ctaHref} variant="secondary" size="sm">
                    {card.ctaLabel}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 7 · Business Model Direction ──────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="model-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Business Model</p>
            <h2 id="model-heading" className={HEADING}>
              Assessment-led entry, recurring assurance potential.
            </h2>
            <p className={BODY}>
              Mythos can be positioned around scoped assessments that produce
              evidence, findings, remediation guidance, and retest requirements.
              Over time, recurring assurance may become important as AI systems
              change through new models, prompts, data sources, tools, vendors,
              and permissions.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid gap-5 md:grid-cols-3">
            {BUSINESS_CARDS.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* 8 · What Investors Can Request ────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="materials-heading"
      >
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <p className={EYEBROW}>Investor Materials</p>
              <h2 id="materials-heading" className={HEADING}>
                Request the investor packet.
              </h2>
              <p className={`${BODY} mb-8 max-w-md`}>
                Investors can request materials covering the Mythos thesis,
                current product wedge, roadmap, use cases, strategic horizon, and
                planned commercialization path.
              </p>
              <Button
                href="/contact?intent=investor"
                variant="primary"
                size="lg"
              >
                Request Investor Materials
              </Button>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {MATERIALS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border border-ivory/8 bg-charcoal p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze"
                    />
                    <span className="text-sm font-medium text-ivory">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 9 · Guardrail Note ────────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="guardrail-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl border border-bronze/25 bg-obsidian/50 p-8 backdrop-blur-sm lg:p-10">
              <p className={EYEBROW}>Disclosure</p>
              <h2
                id="guardrail-heading"
                className="mb-4 text-xl font-normal leading-tight text-ivory lg:text-2xl"
              >
                Planning-stage and forward-looking information.
              </h2>
              <p className="text-sm leading-relaxed text-muted-stone">
                Some investor-facing materials may include planning-stage,
                roadmap, or forward-looking information. Product direction,
                strategic horizon scenarios, partnerships, pricing, funding plans,
                and commercialization paths may change. Mythos should not be
                understood as claiming guaranteed outcomes, current public
                availability of strategic horizon products, or completed customer
                traction unless explicitly stated.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 10 · Final Investor CTA ───────────────────────────── */}
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
              Interested in the Mythos thesis?
            </h2>
            <p className="mb-10 text-base leading-relaxed text-muted-stone">
              Request investor materials or start a conversation about the AI
              deployment assurance category, product roadmap, and strategic
              direction.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="/contact?intent=investor"
                variant="primary"
                size="lg"
              >
                Request Investor Materials
              </Button>
              <Button href="/use-cases" variant="secondary" size="lg">
                Explore Use Cases
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
