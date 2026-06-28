import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { PageHero } from "@/components/sections/PageHero";
import { HeroCrestStage } from "@/components/sections/HeroCrestStage";
import { HeroBackgroundVideo } from "@/components/hero/HeroBackgroundVideo";
import { VideoPanelPlaceholder } from "@/components/sections/VideoPanelPlaceholder";
import { CinematicPageMotion } from "@/components/motion/CinematicPageMotion";
import { HeroPreloadProvider } from "@/components/motion/HeroPreloadProvider";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { PlatformPairSection } from "@/components/sections/PlatformPairSection";
import { WhyMythos } from "@/components/home/WhyMythos";

export const metadata: Metadata = {
  description:
    "Mythos helps organizations review AI systems before trust expands through evidence-first assessment, behavior validation, remediation guidance, and retest proof.",
};

const PROBLEMS = [
  {
    title: "AI now has access most teams can't see.",
    description:
      "Agents and RAG pipelines reach into data, tools, and other systems. Without a clear map of what AI can see and do, exposure stays invisible until something goes wrong.",
  },
  {
    title: "One-time testing goes stale fast.",
    description:
      "Models, prompts, permissions, and data sources change constantly. A single assessment can't prove a system is still safe a release later.",
  },
  {
    title: "Executives need proof, not assurances.",
    description:
      "Security, compliance, and audit teams need evidence a system was validated, not a claim that someone believes it is fine.",
  },
];

const MARKETS = [
  { title: "AI-Heavy SaaS", description: "Products shipping AI features and agents to customers at speed." },
  { title: "Finance & Insurance", description: "Regulated decisioning, claims, and fraud workflows under audit." },
  { title: "Healthcare & Life Sciences", description: "Patient and research data inside AI-assisted workflows." },
  { title: "Regulated & Defense", description: "Mission-critical systems that demand controlled validation." },
];

export default function HomePage() {
  return (
    <HeroPreloadProvider>
    <CinematicPageMotion>
      {/* 1 · Hero ─────────────────────────────────────────── */}
      <HeroMotion>
        <PageHero
          sectionId="hero"
          badge="AI Deployment Assurance"
          headline="AI Deployment Assurance for Systems That Cannot Fail."
          subline="Mythos gives validation to AI workflows across data, routing, agents, controls, and evidence: before deployment, during testing, and as systems change."
          backgroundSlot={<HeroBackgroundVideo />}
          visual={<HeroCrestStage fallbackSrc="/images/mythos-crest-main.png" />}
          minHeight="min-h-[76vh]"
        />
      </HeroMotion>

      {/* 2 · Validation Gap ───────────────────────────────── */}
      <section
        data-section="validation-gap"
        className="py-20 lg:py-28 border-b border-ivory/5 bg-graphite"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
              The Validation Gap
            </p>
            <h2 className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl">
              AI is shipping faster than teams can validate it.
            </h2>
            <p className="text-base leading-relaxed text-muted-stone">
              Enterprise AI is becoming an execution layer. It reads data, routes requests,
              calls tools, and acts. Most teams put these systems into production before they
              can prove how they behave. Mythos closes the gap between how fast AI ships and
              how well it is validated.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROBLEMS.map((p) => (
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

      {/* 3 · Athena + Achilles ────────────────────────────── */}
      <PlatformPairSection />

      {/* Why Mythos exists ────────────────────────────────── */}
      <WhyMythos />

      {/* 5 · Demo Preview ─────────────────────────────────── */}
      <section
        data-section="demo"
        className="py-20 lg:py-28 border-b border-ivory/5 bg-graphite"
      >
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy + CTAs */}
            <ScrollReveal>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
                Platform Demo
              </p>
              <h2 className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl">
                See the assurance forge.
              </h2>
              <p className="text-base leading-relaxed text-muted-stone">
                Watch one AI workflow move from assessment to validation to evidence —
                the loop Mythos runs before release and as systems change.
              </p>
            </ScrollReveal>

            {/* Video panel */}
            <ScrollReveal x={32} y={0} duration={1}>
              <VideoPanelPlaceholder
                className="command-frame"
                src="/video/assurance-forge-loop.mp4"
                poster="/images/assurance-forge-poster.png"
                label="Assurance Forge · Mythos Chamber Preview"
                description="Cinematic preview of the Mythos assurance forge: Athena and Achilles operating as a paired validation system inside the Mythos chamber."
                controls={false}
                autoPlay
              />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 6 · Markets Preview ──────────────────────────────── */}
      <section
        data-section="markets"
        className="py-20 lg:py-28 border-b border-ivory/5 bg-obsidian"
      >
        <Container>
          <ScrollReveal className="mb-10">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
              Markets
            </p>
            <h2 className="mb-3 text-3xl font-normal leading-tight text-ivory lg:text-4xl">
              Built for high-trust markets.
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {MARKETS.map((m) => (
              <FeatureCard
                key={m.title}
                variant="market"
                title={m.title}
                description={m.description}
              />
            ))}
          </StaggerReveal>
          <ScrollReveal y={16}>
            <Button href="/solutions" variant="secondary" size="md">
              View Solutions
            </Button>
          </ScrollReveal>
        </Container>
      </section>

      {/* 8 · Final CTA ────────────────────────────────────── */}
      <section
        data-section="final-cta"
        className="relative py-24 lg:py-40 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(26,23,19,0.85) 0%, #050505 55%)",
        }}
      >
        {/* Vault background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/vault-cta-bg.webp)",
          }}
        />
        {/* Readability overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.45) 62%, rgba(5,5,5,0.86) 100%)",
          }}
        />
        {/* Top divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.35) 25%, rgba(166,106,50,0.35) 75%, transparent)",
          }}
          aria-hidden="true"
        />
        {/* Bottom ember glow */}
        <div
          className="ember-soft-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(166,106,50,0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-4xl font-normal leading-tight text-ivory lg:text-5xl">
              See whether your AI
              <br />
              is ready to deploy.
            </h2>
            <p className="mb-10 text-base leading-relaxed text-muted-stone">
              Start with one AI system. Get independent validation and an evidence pack your
              security, compliance, and executive teams can use.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Request Assessment
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                Request Demo Video
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </CinematicPageMotion>
    </HeroPreloadProvider>
  );
}
