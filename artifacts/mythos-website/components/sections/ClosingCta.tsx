import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTA_LINKS } from "@/content/navigation";
import { CANONICAL } from "@/content/platform";
import { CTA } from "@/lib/constants";

interface ClosingCtaProps {
  title?: ReactNode;
  body?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Navy closing band for inner pages; settles into the footer's navy. */
export function ClosingCta({
  title = "Start with one AI system.",
  body = CANONICAL.decisionAuthority,
  primary = { label: CTA.PRIMARY, href: CTA_LINKS.assessment },
  secondary = { label: CTA.DEMO, href: CTA_LINKS.demo },
}: ClosingCtaProps) {
  return (
    <section data-surface="navy" aria-labelledby="closing-cta-title" className="relative overflow-hidden pb-28 pt-12 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(184,130,63,0.16) 0%, transparent 70%)" }}
      />
      <Container className="relative" >
        <div data-reveal-group>
          <h2 id="closing-cta-title" className="mx-auto max-w-2xl font-display text-4xl leading-tight text-fg lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={primary.href} variant="primary" size="lg" className="bronze-glow">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
