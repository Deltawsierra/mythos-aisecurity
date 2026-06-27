import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function PricingCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-36"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(26,23,19,0.85) 0%, #050505 55%)",
      }}
      aria-labelledby="pricing-cta-heading"
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
            id="pricing-cta-heading"
            className="mb-6 text-4xl font-normal leading-tight text-ivory lg:text-5xl"
          >
            Not sure which package fits your AI deployment?
          </h2>
          <p className="mb-10 text-base leading-relaxed text-muted-stone">
            Tell Mythos what you are building, connecting, or preparing to
            release. We will help identify the right assessment path.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
        </ScrollReveal>
      </Container>
    </section>
  );
}
