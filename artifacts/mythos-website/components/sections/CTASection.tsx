import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  badge?: string;
  headline: string;
  subline?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "default" | "bordered" | "dark";
  /** Optional full-bleed background image URL. When set, the section renders a
   *  cinematic cover plate with a center-weighted readability scrim. */
  backgroundImage?: string;
  /** Optional anchor id so the section can be deep-linked (e.g. #start-assessment). */
  id?: string;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-graphite border-t border-ivory/5",
  bordered: "border-t border-bronze/20 bg-charcoal",
  dark: "bg-obsidian border-t border-ivory/5",
};

export function CTASection({
  badge,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  variant = "default",
  backgroundImage,
  id,
  className,
}: CTASectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-28",
        variantStyles[variant],
        backgroundImage && "relative overflow-hidden",
        className,
      )}
      aria-label="Call to action"
    >
      {backgroundImage && (
        <>
          {/* Full-bleed cinematic plate */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-obsidian bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Center-weighted readability scrim: dark behind the centered copy,
              fading to fully transparent toward both edges so the artwork
              breathes on the sides. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.5) 26%, rgba(5,5,5,0.82) 50%, rgba(5,5,5,0.5) 74%, rgba(5,5,5,0) 100%)",
            }}
          />
        </>
      )}
      <Container className={cn(backgroundImage && "relative z-10")}>
        <div className="mx-auto max-w-2xl text-center">
          {badge && (
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
              {badge}
            </p>
          )}
          <h2 className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl">
            {headline}
          </h2>
          {subline && (
            <p className="mb-10 text-base leading-relaxed text-muted-stone">
              {subline}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
