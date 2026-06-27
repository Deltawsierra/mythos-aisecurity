import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { ReactNode } from "react";

interface PageHeroProps {
  badge?: string;
  headline: string | ReactNode;
  subline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryLink?: { label: string; href: string };
  visual?: ReactNode;
  centered?: boolean;
  className?: string;
  minHeight?: string;
  sectionId?: string;
  backgroundSlot?: ReactNode;
}

export function PageHero({
  badge,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  tertiaryLink,
  visual,
  centered = false,
  className,
  minHeight = "min-h-[65vh]",
  sectionId,
  backgroundSlot,
}: PageHeroProps) {
  const hasVisual = !!visual;

  return (
    <section
      data-section={sectionId}
      className={cn(
        "relative flex items-center border-b border-ivory/5 overflow-hidden",
        minHeight,
        className,
      )}
      aria-label="Page hero"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #1A1713 0%, #12100E 40%, #050505 100%)",
        }}
        aria-hidden="true"
      />

      {/* Cinematic background layer (e.g. forge video) — opt-in per page. */}
      {backgroundSlot}

      {/* Bottom divider glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(166,106,50,0.25) 30%, rgba(166,106,50,0.25) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <Container
        className={cn(
          "relative z-10 py-16 lg:py-20",
          hasVisual ? "grid lg:grid-cols-2 lg:gap-16 items-center" : "",
        )}
      >
        {/* Text column */}
        <div className={cn(centered && !hasVisual ? "mx-auto text-center max-w-3xl" : "")}>
          {badge && (
            <p
              data-animate="hero-badge"
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze"
            >
              {badge}
            </p>
          )}

          <h1
            data-animate="hero-headline"
            className="mb-6 max-w-2xl text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]"
          >
            {headline}
          </h1>

          {subline && (
            <p
              data-animate="hero-subline"
              className={cn(
                "mb-10 text-base leading-relaxed text-muted-stone sm:text-lg",
                centered && !hasVisual ? "mx-auto" : "",
                "max-w-xl",
              )}
            >
              {subline}
            </p>
          )}

          {(primaryCta || secondaryCta || tertiaryLink) && (
            <div
              data-animate="hero-actions"
              className={cn(
                "flex flex-wrap gap-4 items-center",
                centered && !hasVisual ? "justify-center" : "",
              )}
            >
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary" size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
              {tertiaryLink && (
                <Link
                  href={tertiaryLink.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-stone hover:text-antique-gold transition-colors duration-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                >
                  {tertiaryLink.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Visual column */}
        {hasVisual && (
          <div
            data-animate="hero-visual"
            className="hidden lg:flex items-center justify-center"
          >
            {visual}
          </div>
        )}
      </Container>
    </section>
  );
}
