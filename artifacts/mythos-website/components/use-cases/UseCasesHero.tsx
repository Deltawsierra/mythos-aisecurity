import { ShieldCheck, FileSearch, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTA } from "@/lib/constants";

const BADGES = [
  { label: "AI Deployment Assurance", Icon: ShieldCheck },
  { label: "Evidence-Driven Review", Icon: FileSearch },
  { label: "Human-Controlled Decisions", Icon: UserCheck },
];

// Decorative ember motes drifting over the arena. Pure CSS (ember-soft-glow),
// reduced-motion safe via the global prefers-reduced-motion rule.
const EMBERS = [
  { left: "12%", top: "62%", size: 5, delay: "0s" },
  { left: "26%", top: "78%", size: 3, delay: "1.4s" },
  { left: "44%", top: "70%", size: 4, delay: "0.6s" },
  { left: "61%", top: "82%", size: 3, delay: "2.1s" },
  { left: "74%", top: "66%", size: 5, delay: "1s" },
  { left: "88%", top: "74%", size: 3, delay: "2.8s" },
];

/**
 * /use-cases hero — a cinematic "Olympian judgment arena" section. The selected
 * arena image is the full-bleed background; a left-weighted scrim keeps the copy
 * readable, a bronze radial glow lifts the arena floor, and faint ember motes
 * drift across it. Left-aligned copy: eyebrow, headline, body, support line,
 * two CTAs, and three assurance badges.
 */
export function UseCasesHero() {
  return (
    <section
      data-section="use-cases-hero"
      aria-label="Page hero"
      className="relative isolate -mt-16 overflow-hidden border-b border-ivory/5 bg-obsidian lg:-mt-20"
    >
      {/* Full-bleed arena background. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/images/use-cases/Use-Case-Hero-Background.png)",
        }}
      />

      {/* Desktop: dark on the left, clearing toward the right so the arena reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.82) 26%, rgba(5,5,5,0.5) 46%, rgba(5,5,5,0.16) 64%, rgba(5,5,5,0) 80%)",
        }}
      />
      {/* Mobile/tablet: gentle all-over scrim so stacked copy stays readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.84) 0%, rgba(5,5,5,0.6) 42%, rgba(5,5,5,0.78) 100%)",
        }}
      />
      {/* Top + bottom cinematic vignette (blends under header, into next section). */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 22%, transparent 68%, rgba(5,5,5,0.92) 100%)",
        }}
      />
      {/* Bronze radial glow near the arena floor. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[55%] w-[80%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(166,106,50,0.32), transparent 70%)",
        }}
      />
      {/* Ember motes. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember-soft-glow absolute rounded-full"
            style={{
              left: e.left,
              top: e.top,
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              background:
                "radial-gradient(circle, rgba(255,200,120,0.95), rgba(166,106,50,0.4) 60%, transparent 75%)",
              boxShadow: "0 0 8px rgba(214,161,74,0.6)",
            }}
          />
        ))}
      </div>
      {/* Bottom divider glow. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(166,106,50,0.3) 30%, rgba(166,106,50,0.3) 70%, transparent)",
        }}
      />

      <Container className="relative z-10 flex min-h-[82svh] items-center pt-28 pb-20 lg:min-h-[86vh] lg:pt-32 lg:pb-28">
        <ScrollReveal x={-24} y={0} className="w-full max-w-xl lg:max-w-[38rem]">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-bronze">
            Use Cases
          </p>

          <h1 className="font-display text-4xl font-normal leading-[1.1] text-ivory sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Where AI systems are{" "}
            <span className="text-antique-gold">tested</span> before they are{" "}
            <span className="text-antique-gold">trusted.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-stone sm:text-lg">
            Explore the deployment scenarios where AI risk appears — from
            customer agents and copilots to cloud integrations, decision
            support, mission workflows, AI vehicles, and future-facing R&amp;D.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted-stone/75">
            Illustrative scenarios. Practical review points. Evidence-first
            deployment decisions.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" className="bronze-glow">
              {CTA.PRIMARY}
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Request Demo
            </Button>
          </div>

          <ul
            role="list"
            className="mt-10 flex flex-wrap gap-x-3 gap-y-3"
            aria-label="Assurance principles"
          >
            {BADGES.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 border border-bronze/30 bg-obsidian/50 px-3 py-1.5 backdrop-blur-sm"
              >
                <Icon
                  size={14}
                  strokeWidth={1.5}
                  className="text-bronze"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/90">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
