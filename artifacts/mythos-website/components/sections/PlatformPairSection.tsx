import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { EnginePanel } from "@/components/sections/EnginePanel";
import { AssuranceLoopDiagram } from "@/components/sections/AssuranceLoopDiagram";
import { SectionBackgroundVideo } from "@/components/sections/SectionBackgroundVideo";

const ATHENA_CAPABILITIES = [
  "Exposure mapping",
  "Attack-path discovery",
  "Finding management",
  "Compliance mapping",
  "Evidence export",
];

const ACHILLES_CAPABILITIES = [
  "RAG leakage testing",
  "Goal hijack testing",
  "Agent behavior testing",
  "Permission boundary testing",
  "Release-readiness gates",
];

const WHY_MYTHOS = [
  {
    title: "Independent validation",
    body: "Tests are scoped to your environment and designed to produce reviewable evidence.",
  },
  {
    title: "Evidence-first output",
    body: "Findings are organized for security, compliance, remediation, and executive review.",
  },
  {
    title: "Built for AI execution paths",
    body: "Mythos looks at what the AI can see, where requests go, what tools are used, and what actions can occur.",
  },
];

/**
 * Homepage platform-story section — the paired Mythos product reveal.
 *
 * Answers, in one scroll: the problem (AI now acts on data, routes, tools, and
 * approvals), what Mythos sells (paired system + AI-behavior validation), what
 * Athena and Achilles each do, how they connect (the assurance loop), and why
 * Mythos is credible. All motion is DOM/CSS/GSAP — no 3D,
 * no new media, no new dependencies — and every block stays visible without JS.
 */
export function PlatformPairSection() {
  return (
    <section
      data-section="platform"
      className="relative overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
    >
      <SectionBackgroundVideo src="/video/AthenaAchillesContainerBackgroundVideo.mp4" />
      <Container className="relative z-10">
        {/* Section intro — problem first, then the Mythos approach */}
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
            The Platform Pair
          </p>
          <h2 className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-[2.6rem]">
            Athena finds the risk.
            <br className="hidden sm:block" /> Achilles tests the AI.
          </h2>
          <p className="text-base leading-relaxed text-muted-stone">
            Enterprise AI now touches data, routes, tools, and approvals. Mythos pairs
            system validation with AI behavior testing so teams can review risk, evidence,
            and release readiness before deployment.
          </p>
        </ScrollReveal>

        {/* Engine chambers — Athena reveals from the left, Achilles from the right */}
        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal className="h-full" x={-44} y={0} duration={0.9}>
            <EnginePanel
              variant="athena"
              engineLabel="System Layer"
              name="Athena"
              positioning="Offensive security & evidence engine"
              description="Athena maps the system foundation: exposure, routes, permissions, findings, and the evidence teams need for review."
              capabilities={ATHENA_CAPABILITIES}
            />
          </ScrollReveal>

          {/* Mobile connector — keeps the paired, connected read when the
              chambers stack (intro → Athena → connection → Achilles). Removed
              from flow at lg, where the gap route line takes over. */}
          <div
            aria-hidden="true"
            className="pointer-events-none mx-auto flex h-9 w-px items-center justify-center lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(166,106,50,0.12), rgba(166,106,50,0.55) 50%, rgba(166,106,50,0.12))",
            }}
          >
            <span
              className="engine-connect-pulse h-2.5 w-2.5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(214,161,74,0.95) 0%, rgba(166,106,50,0.25) 60%, transparent 100%)",
              }}
            />
          </div>

          <ScrollReveal className="h-full" x={44} y={0} duration={0.9}>
            <EnginePanel
              variant="achilles"
              engineLabel="AI Execution Layer"
              name="Achilles"
              positioning="AI assurance & validation engine"
              description="Achilles tests the AI execution layer: prompts, retrieval, agents, tools, permissions, approvals, and release gates."
              capabilities={ACHILLES_CAPABILITIES}
            />
          </ScrollReveal>

          {/* Desktop route line — an engraved bronze path across the gap so the
              two chambers read as one connected system, not two cards. Docks
              into each chamber's inner edge; the pulse sits on top at center. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-10 -translate-x-1/2 lg:block"
          >
            <span
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(90deg, rgba(166,106,50,0.15), rgba(214,161,74,0.6) 50%, rgba(166,106,50,0.15))",
              }}
            />
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/70" />
            <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-bronze/70" />
          </div>

          {/* Center connection pulse (desktop, on top of the route line) */}
          <span
            aria-hidden="true"
            className="engine-connect-pulse pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-3 w-3 rounded-full lg:block"
            style={{
              background:
                "radial-gradient(circle, rgba(214,161,74,0.95) 0%, rgba(166,106,50,0.25) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Assurance loop — shows the two engines feed one connected cycle */}
        <AssuranceLoopDiagram />

        {/* Why Mythos — three concise proof points */}
        <div className="mt-12 lg:mt-16">
          <ScrollReveal className="mb-7 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze/80">
              Why Mythos
            </p>
          </ScrollReveal>
          <StaggerReveal
            className="grid gap-px overflow-hidden border border-bronze/15 bg-bronze/15 sm:grid-cols-3"
            stagger={0.1}
          >
            {WHY_MYTHOS.map((item) => (
              <div key={item.title} className="bg-graphite p-6 lg:p-7">
                <span aria-hidden="true" className="mb-4 block h-px w-6 bg-bronze/70" />
                <p className="mb-2 text-sm font-semibold text-ivory">{item.title}</p>
                <p className="text-sm leading-relaxed text-muted-stone">{item.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
