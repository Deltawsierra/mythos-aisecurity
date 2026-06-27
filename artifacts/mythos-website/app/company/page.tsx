import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about Mythos AI Security's mission, operating principles, and evidence-first approach to AI deployment assurance.",
};

/* ── Shared style tokens ──────────────────────────────────── */
const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

/* ── Section 2 · Why Mythos exists ────────────────────────── */
const WHY_POINTS = [
  {
    title: "AI is no longer isolated.",
    description:
      "Modern AI systems connect to data, tools, users, identities, and business processes.",
  },
  {
    title: "Traditional review is not enough.",
    description:
      "Security and governance teams need testing and reporting that reflect how AI actually operates.",
  },
  {
    title: "Human decision-makers need better material.",
    description:
      "Mythos is built to support review, not replace judgment.",
  },
];

/* ── Section 4 · Operating principles ─────────────────────── */
const PRINCIPLES = [
  {
    title: "Authorized and scoped",
    description:
      "Testing should happen under customer-approved scope, with clear boundaries and non-destructive methods.",
  },
  {
    title: "Evidence-first",
    description:
      "Findings should connect to proof, not vague concern. Reports should show what was tested, what happened, and what supports the recommendation.",
  },
  {
    title: "Human-controlled",
    description:
      "Mythos supports human decision-making. It does not remove accountability from security, engineering, product, compliance, legal, or leadership teams.",
  },
  {
    title: "Product boundaries matter",
    description:
      "Athena, Achilles, Hermes, and internal Minotaur support different roles. Mythos should not blur product claims or overstate current capabilities.",
  },
  {
    title: "Remediation must be testable",
    description:
      "A fix is not complete just because it was described. Deployment confidence should improve only after retest evidence supports the change.",
  },
  {
    title: "Strategic honesty",
    description:
      "Future-facing work, such as Hermes and quantum-adjacent AI, should be labeled carefully and not presented as current public capability unless formally launched.",
  },
];

/* ── Section 5 · Responsible AI deployment ────────────────── */
const RESPONSIBLE = [
  {
    title: "Technical review.",
    description:
      "Look at access paths, routes, tools, permissions, and system exposure.",
  },
  {
    title: "Behavior review.",
    description:
      "Evaluate how AI responds across prompts, retrieval, agents, approvals, and boundaries.",
  },
  {
    title: "Decision support.",
    description:
      "Organize findings so customer teams can decide what needs fixing, retesting, or escalation.",
  },
];

/* ── Section 6 · Founder & team credibility ───────────────── */
const CREDIBILITY = [
  {
    title: "Software engineering foundation.",
    description:
      "Product thinking shaped by real systems, integration needs, and deployment constraints.",
  },
  {
    title: "Cybersecurity orientation.",
    description:
      "Focused on exposure, misuse paths, controls, testing, and reviewable findings.",
  },
  {
    title: "AI security focus.",
    description:
      "Built around emerging risks in agents, RAG systems, copilots, internal AI tools, and AI-enabled workflows.",
  },
  {
    title: "Commercial discipline.",
    description:
      "Designed for buyers who need clear outcomes, not abstract AI theory.",
  },
];

/* ── Section 8 · How Mythos works with customers ──────────── */
const HOW_WE_WORK = [
  {
    title: "Start with scope.",
    description:
      "Define the AI system, agent, data path, or concern the customer wants reviewed.",
  },
  {
    title: "Test what matters.",
    description:
      "Focus on the access, behavior, tools, routes, and boundaries that create practical risk.",
  },
  {
    title: "Report clearly.",
    description:
      "Organize findings for security, AI, compliance, and leadership review.",
  },
  {
    title: "Support next steps.",
    description:
      "Help teams understand what needs fixing, retesting, or deeper assessment.",
  },
];

const LONG_TERM_BODY =
  "Mythos is focused first on enterprise AI deployment assurance. Over time, the company\u2019s direction is to keep adapting as AI moves into more complex systems, more regulated environments, and more consequential decisions.";

export default function CompanyPage() {
  return (
    <>
      {/* 1 · Company Hero ─────────────────────────────────── */}
      <section
        className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-ivory/5 bg-obsidian"
        aria-label="Company hero"
      >
        {/* Cinematic command-vault plate */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/heroes/Company-Hero-Background.png)",
          }}
        />
        {/* Desktop left-weighted readability scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.86) 32%, rgba(5,5,5,0.5) 62%, rgba(5,5,5,0.24) 100%)",
          }}
        />
        {/* Mobile vertical scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.74) 0%, rgba(5,5,5,0.6) 42%, rgba(5,5,5,0.9) 100%)",
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
          <ScrollReveal y={20}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>The Company</p>
              <h1 className="mb-6 text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]">
                Built for the moment AI needs accountability.
              </h1>
              <p className={`${BODY} mb-8 max-w-xl sm:text-lg`}>
                Mythos exists to help organizations move from AI experimentation
                to responsible deployment with clearer review, stronger testing,
                and better decision material before high-impact systems move
                forward.
              </p>
              <div className="mb-9 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Contact Mythos
                </Button>
                <Button href="/platform" variant="secondary" size="lg">
                  Explore the Platform
                </Button>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze/70">
                Security discipline
                <span className="mx-2.5 text-muted-stone/40">/</span>
                AI assurance
                <span className="mx-2.5 text-muted-stone/40">/</span>
                Human accountability
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 2 · Why Mythos exists ────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="why-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Why Mythos exists</p>
              <h2 id="why-heading" className={HEADING}>
                AI is moving into systems that were never designed for blind
                trust.
              </h2>
              <p className={BODY}>
                AI is being placed inside decisions and systems that were built
                to assume human judgment. But many teams still lack a clear way
                to understand what the AI can access, how it behaves, what
                changed, and what deserves review before they rely on it.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {WHY_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="border border-ivory/8 bg-charcoal p-6 transition-colors duration-300 hover:border-bronze/30"
                >
                  <p className="mb-2 text-sm font-semibold text-ivory">
                    {point.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 3 · Our Mission ──────────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="mission-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className={EYEBROW}>Our mission</p>
                <h2 id="mission-heading" className={HEADING}>
                  Make AI deployment more accountable.
                </h2>
                <p className={BODY}>
                  Mythos is building for teams that cannot treat AI risk as a
                  guess. The goal is to give security, AI, compliance, and
                  leadership teams a clearer view of system exposure, behavior,
                  findings, and next steps before important AI systems move
                  forward.
                </p>
              </div>
              <div className="border-l-2 border-bronze/30 py-4 pl-8">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
                  Mission statement
                </p>
                <blockquote className="text-xl font-normal leading-relaxed text-ivory/85 lg:text-2xl">
                  To make AI deployment more accountable by helping organizations
                  test, review, and understand the systems they are preparing to
                  trust.
                </blockquote>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 4 · Operating Principles ─────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-charcoal py-20 lg:py-28"
        aria-labelledby="principles-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className={EYEBROW}>How Mythos builds trust</p>
              <h2 id="principles-heading" className={HEADING}>
                Trust is earned through evidence, not slogans.
              </h2>
              <p className={BODY}>
                Mythos is built around the idea that AI systems should be
                reviewed before they are trusted with more access, more autonomy,
                or more operational influence.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-ivory/8 bg-ivory/8 sm:grid-cols-2 lg:grid-cols-3">
              {PRINCIPLES.map((principle, i) => (
                <div
                  key={principle.title}
                  className="flex flex-col bg-graphite p-7 transition-colors duration-300 hover:bg-charcoal"
                >
                  <span className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-bronze/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 text-lg font-normal text-ivory">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5 · Built for Responsible AI Deployment ──────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="responsible-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Responsible AI deployment</p>
              <h2 id="responsible-heading" className={HEADING}>
                Responsible AI deployment requires more than policy.
              </h2>
              <p className={BODY}>
                Policies matter, but they are not enough on their own. Teams need
                a way to examine the systems around AI, test behavior under
                realistic conditions, and organize results for review.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {RESPONSIBLE.map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-l-bronze/50 border-y border-r border-ivory/8 bg-charcoal p-7 transition-colors duration-300 hover:border-l-bronze"
                >
                  <h3 className="mb-2 text-lg font-normal text-ivory">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-9">
              <Button href="/platform" variant="secondary" size="lg">
                See the Platform
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 6 · Founder & Team Credibility ───────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="credibility-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Founder &amp; team credibility</p>
              <h2 id="credibility-heading" className={HEADING}>
                Built close to the problem.
              </h2>
              <p className={BODY}>
                Mythos is being built by a team with software engineering,
                cybersecurity, AI red-team and blue-team thinking, and
                go-to-market experience focused on the gap between AI adoption
                and trustworthy deployment review.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CREDIBILITY.map((item) => (
                <div
                  key={item.title}
                  className="border border-ivory/8 bg-charcoal p-7 transition-colors duration-300 hover:border-bronze/30"
                >
                  <h3 className="mb-2 text-lg font-normal text-ivory">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 7 · Veteran-Founded Perspective ──────────────────── */}
      <section
        className="border-b border-ivory/5 bg-charcoal py-20 lg:py-28"
        aria-labelledby="veteran-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className={EYEBROW}>Veteran-founded perspective</p>
              <h2 id="veteran-heading" className={HEADING}>
                Veteran-founded. Mission-oriented.
              </h2>
              <p className={`${BODY} mx-auto max-w-2xl`}>
                Mythos carries a mission-first mindset: define the objective,
                understand the risk, build with discipline, and keep
                accountability clear.
              </p>
              <div className="mx-auto mt-10 max-w-2xl border-t border-bronze/20 pt-8">
                <p className="text-lg font-normal leading-relaxed text-ivory/80">
                  That perspective shapes how Mythos approaches AI assurance:
                  scoped work, careful handling, clear reporting, and respect for
                  human decision-making.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 8 · How Mythos Works With Customers ──────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="how-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-xl">
              <p className={EYEBROW}>How we work</p>
              <h2 id="how-heading" className={HEADING}>
                How we work with customers.
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_WE_WORK.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col border-t-2 border-t-bronze/40 bg-charcoal p-6"
                >
                  <span className="mb-4 text-2xl font-normal text-bronze/80">
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
          </ScrollReveal>
        </Container>
      </section>

      {/* 9 · Long-Term Company Direction ──────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="longterm-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className={EYEBROW}>Long-term company direction</p>
              <h2 id="longterm-heading" className={HEADING}>
                Built to last beyond the first wave of AI adoption.
              </h2>
              <p className={`${BODY} mx-auto max-w-2xl`}>{LONG_TERM_BODY}</p>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-stone/70">
                Long-term research directions may include adjacent assurance
                needs where AI behavior, cybersecurity, operational risk, and
                human oversight converge.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 10 · Final CTA ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-obsidian py-24 lg:py-32"
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
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>Build with more accountability</p>
              <h2
                id="final-cta-heading"
                className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl"
              >
                Build with more accountability.
              </h2>
              <p className={`${BODY} mb-10`}>
                If your team is preparing AI for real users, real data, or real
                decisions, Mythos can help you understand what needs to be
                reviewed before it moves forward.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Contact Mythos
                </Button>
                <Button href="/platform" variant="secondary" size="lg">
                  Explore the Platform
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
