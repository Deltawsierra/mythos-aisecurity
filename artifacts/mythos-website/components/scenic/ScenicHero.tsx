import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent, plain } from "@/components/ui/Headline";
import { CloudBank } from "@/components/scenic/Scene";
import type { Surface } from "@/components/sections/SectionBlend";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** One painted plane of a hero scene, positioned freely (cut-outs) or full-bleed. */
export interface HeroPlane {
  src: string;
  /** Position and size of the plane, e.g. "inset-0" or "right-0 bottom-[12%] w-[58%]". */
  className: string;
  fit?: "cover" | "contain";
  /** object-position for the image. */
  position?: string;
  opacity?: number;
  blend?: CSSProperties["mixBlendMode"];
  /** Pointer parallax depth, px. */
  depth?: number;
  /** Scroll drift, px. */
  drift?: number;
  /** Only from lg up (planes that crowd phones). */
  desktopOnly?: boolean;
  priority?: boolean;
}

export interface Crumb {
  label: string;
  href: string;
}

interface ScenicHeroProps {
  eyebrow: string;
  /** Headline; *starred* words take the gold accent. */
  headline: string;
  lede: ReactNode;
  breadcrumbs: Crumb[];
  current: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  planes: HeroPlane[];
  /** The guardian or emblem, placed by its own classes (desktop). */
  figure?: ReactNode;
  /** Phones: shown under the copy. */
  mobileFigure?: ReactNode;
  /** Which side the copy sits on; the figure takes the other. */
  copySide?: "left" | "right";
  /** Surface of the first section below: the cloud bank resolves into it. */
  into: Surface;
  /** Extra readability shade (CSS background) over the scene. */
  scrim?: string;
  children?: ReactNode;
}

/**
 * Inner-page hero for the Luminous Olympus world (Launch Guide SplitHero).
 * Poster planes paint first and move only through PageMotion hooks; a storm
 * shade carries the header and copy; a sunlit cloud bank dissolves the scene
 * into the first section. Copy, breadcrumbs and CTAs are all DOM.
 */
export function ScenicHero({
  eyebrow,
  headline,
  lede,
  breadcrumbs,
  current,
  primaryCta = { label: CTA.PRIMARY, href: CTA_LINKS.assessment },
  secondaryCta,
  planes,
  figure,
  mobileFigure,
  copySide = "left",
  into,
  scrim,
  children,
}: ScenicHeroProps) {
  const copyRight = copySide === "right";
  const sideShade = copyRight
    ? "linear-gradient(270deg, rgba(18,21,23,0.78) 0%, rgba(18,21,23,0.55) 34%, rgba(18,21,23,0) 62%)"
    : "linear-gradient(90deg, rgba(18,21,23,0.8) 0%, rgba(18,21,23,0.55) 34%, rgba(18,21,23,0) 62%)";

  return (
    <section
      data-surface="charcoal"
      aria-labelledby="page-title"
      className="relative isolate -mt-16 flex min-h-[92svh] flex-col overflow-hidden lg:-mt-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {planes.map((plane) => (
          <div
            key={plane.src + plane.className}
            className={cn("absolute", plane.className, plane.desktopOnly && "hidden lg:block")}
            data-depth={plane.depth}
            data-drift={plane.drift}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={plane.src}
              alt=""
              loading={plane.priority ? "eager" : "lazy"}
              fetchPriority={plane.priority ? "high" : undefined}
              className={cn("h-full w-full max-w-none", plane.fit === "contain" ? "object-contain" : "object-cover")}
              style={{ objectPosition: plane.position, opacity: plane.opacity ?? 1, mixBlendMode: plane.blend }}
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,21,23,0.88) 0%, rgba(18,21,23,0.5) 22%, rgba(18,21,23,0.12) 48%, rgba(18,21,23,0) 60%)",
          }}
        />
        <div className="absolute inset-0 hidden lg:block" style={{ background: sideShade }} />
        {/* A pool of shade under the copy column: bright scenery never sits behind text. */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `radial-gradient(ellipse 40% 56% at ${copyRight ? "72%" : "28%"} 46%, rgba(18,21,23,0.78) 0%, rgba(18,21,23,0.48) 55%, rgba(18,21,23,0) 85%)`,
          }}
        />
        <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(180deg, rgba(18,21,23,0.4) 0%, rgba(18,21,23,0.76) 35%, rgba(18,21,23,0.62) 70%, rgba(18,21,23,0.15) 92%)" }} />
        {scrim && <div className="absolute inset-0" style={{ background: scrim }} />}
        {figure && <div className="hidden lg:block">{figure}</div>}
        <CloudBank edge={{ into, height: "clamp(8rem,17vw,15rem)" }} at="bottom" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/overlays/gold-dust.webp"
          alt=""
          data-depth="28"
          className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] max-w-none object-cover opacity-50 mix-blend-screen"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col pt-28 lg:justify-center lg:pb-[clamp(9rem,16vw,14rem)] lg:pt-32">
        <div className={cn("max-w-[38rem] xl:max-w-[42rem]", copyRight && "lg:ml-auto lg:mr-[2%]")}>
          <nav aria-label="Breadcrumb" className="hero-rise mb-7" style={{ animationDelay: "80ms" }}>
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory/70">
              {breadcrumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="transition-colors hover:text-ivory">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-champagne/60">
                    /
                  </span>
                </li>
              ))}
              <li aria-current="page" className="text-champagne">
                {current}
              </li>
            </ol>
          </nav>
          <p
            className="hero-rise mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne"
            style={{ animationDelay: "160ms" }}
          >
            <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
            {eyebrow}
          </p>
          <h1
            id="page-title"
            aria-label={plain(headline)}
            className="hero-rise display-caps font-display text-[2.5rem] text-ivory drop-shadow-[0_4px_24px_rgba(18,21,23,0.6)] sm:text-[3.2rem] lg:text-[clamp(2.9rem,min(4.3vw,7vh),4.2rem)]"
            style={{ animationDelay: "240ms" }}
          >
            <Accent text={headline} />
          </h1>
          <div className="hero-rise mt-6 max-w-xl text-[17px] leading-relaxed text-ivory/85" style={{ animationDelay: "380ms" }}>
            {lede}
          </div>
          <div className="hero-rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: "500ms" }}>
            <Button href={primaryCta.href} variant="primary" size="lg" arrow>
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
        {mobileFigure && (
          <div aria-hidden="true" className="relative -mx-6 mt-8 lg:hidden">
            {mobileFigure}
          </div>
        )}
      </Container>
    </section>
  );
}
