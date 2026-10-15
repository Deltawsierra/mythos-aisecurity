import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href: string;
}

interface InnerHeroProps {
  eyebrow: string;
  headline: ReactNode;
  lede: ReactNode;
  /** Ancestors only; the current page is `current`. */
  breadcrumbs: Crumb[];
  current: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Right-hand art. */
  art?: ReactNode;
  /** Full-bleed image behind the copy (e.g. an industry scene). */
  sceneSrc?: string;
  /** Extra content under the CTAs. */
  children?: ReactNode;
  className?: string;
}

/**
 * Cinematic hero for inner pages: the fused obsidian → navy night field with
 * a warm low glow and gold dust, breadcrumbs, and an optional art column or
 * full-bleed scene. Ends on abyss so a SectionBlend can carry it into the
 * next surface.
 */
export function InnerHero({
  eyebrow,
  headline,
  lede,
  breadcrumbs,
  current,
  primaryCta = { label: CTA.PRIMARY, href: CTA_LINKS.assessment },
  secondaryCta,
  art,
  sceneSrc,
  children,
  className,
}: InnerHeroProps) {
  return (
    <section
      data-surface="obsidian"
      aria-labelledby="page-title"
      className={cn("relative isolate overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 80% 18%, rgba(21,48,74,0.85) 0%, rgba(11,31,51,0.4) 45%, transparent 75%), radial-gradient(ellipse 55% 45% at 8% 100%, rgba(166,106,50,0.14) 0%, transparent 70%), linear-gradient(180deg, #050505 0%, #08121c 100%)",
        }}
      />
      {sceneSrc && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sceneSrc}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, #08121c 100%), linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(8,18,28,0.86) 38%, rgba(8,18,28,0.35) 68%, rgba(8,18,28,0.15) 100%)",
            }}
          />
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/overlays/gold-dust.webp"
        alt=""
        aria-hidden="true"
        data-depth="24"
        className="pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] object-cover opacity-50 mix-blend-screen"
      />

      <Container className="relative z-10 grid min-h-[78vh] items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="max-w-2xl">
          <nav aria-label="Breadcrumb" className="hero-rise mb-8" style={{ animationDelay: "80ms" }}>
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-stone">
              {breadcrumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="transition-colors hover:text-ivory">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-bronze/60">
                    /
                  </span>
                </li>
              ))}
              <li aria-current="page" className="text-antique-gold">
                {current}
              </li>
            </ol>
          </nav>
          <p
            className="hero-rise mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-bronze-bright"
            style={{ animationDelay: "160ms" }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-bronze/70" />
            {eyebrow}
          </p>
          <h1
            id="page-title"
            className="hero-rise font-display text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "240ms" }}
          >
            {headline}
          </h1>
          <div
            className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-ivory/75"
            style={{ animationDelay: "380ms" }}
          >
            {lede}
          </div>
          <div className="hero-rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "500ms" }}>
            <Button href={primaryCta.href} variant="primary" size="lg" className="bronze-glow">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
          {children}
        </div>

        {art && (
          <div className="hero-rise" style={{ animationDelay: "420ms" }}>
            {art}
          </div>
        )}
      </Container>
    </section>
  );
}
