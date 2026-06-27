import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const BODY = "text-base leading-relaxed text-muted-stone";

export function CareersHero() {
  return (
    <section
      className="relative flex min-h-[58vh] items-center overflow-hidden border-b border-ivory/5 bg-obsidian"
      aria-label="Careers hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-obsidian bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/heroes/Careers-Hero-Background.png)",
        }}
      />
      {/* Dark left-side wash: keeps the hall cinematic and the copy readable
          while leaving the golden oath hall on the right exposed. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.5) 26%, rgba(5,5,5,0.12) 52%, transparent 70%)",
        }}
      />
      {/* Vertical wash: settle the nav at the top and fade into the page below. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.28) 42%, rgba(5,5,5,0.72) 100%)",
        }}
      />
      {/* Soft centered scrim: keep the headline legible over the tablet glow
          without hiding the central tablet. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 54% at 50% 52%, rgba(5,5,5,0.5) 0%, transparent 72%)",
        }}
      />
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
          <div className="mx-auto max-w-2xl text-center">
            <p className={EYEBROW}>Careers at Mythos</p>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-ivory sm:text-5xl">
              Help hold AI accountable before it ships.
            </h1>
            <p className={`${BODY} mx-auto mb-8 max-w-xl sm:text-lg`}>
              Mythos builds the proving ground for AI systems — testing agents,
              copilots, and integrations before they reach production. If that
              mission resonates, introduce yourself through Open Talent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#open-talent" variant="primary" size="lg">
                Apply to Open Talent
              </Button>
              <Button href="#current-openings" variant="secondary" size="lg">
                See Open Roles
              </Button>
            </div>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze/70">
              Open Talent is always open
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
