import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";

export function PricingHero() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-ivory/5"
      aria-label="Pricing hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/heroes/Pricing-Hero-Background.png)",
        }}
      />
      {/* Desktop: dark on the left, clearing toward the treasury chamber. */}
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
          <p className={EYEBROW}>Pricing</p>
          <h1 className="mb-6 max-w-xl text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]">
            Pricing built around scope, evidence, and deployment decisions.
          </h1>
          <p className="mb-8 max-w-[34rem] text-base leading-relaxed text-muted-stone sm:text-lg">
            Mythos pricing is designed for organizations reviewing real AI
            systems before trust expands. Packages are scoped by system
            complexity, workflows, data sources, tools, model routes, reporting
            needs, and retest requirements.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href="/contact?intent=assessment"
              variant="primary"
              size="lg"
            >
              Request Assessment
            </Button>
            <Button href="/use-cases" variant="secondary" size="lg">
              Explore Use Cases
            </Button>
          </div>
          <p className="mt-8 max-w-md border-l-2 border-bronze/30 pl-4 text-xs leading-relaxed text-muted-stone/70">
            Published prices are starting points. Final scope depends on the AI
            systems, environments, workflows, and evidence requirements
            involved.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
