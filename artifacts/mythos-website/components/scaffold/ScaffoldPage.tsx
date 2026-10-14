import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionBlend } from "@/components/sections/SectionBlend";
import { CHARACTER_MEDIA, type ProjectId } from "@/content/media";
import { CANONICAL, type ScaffoldPage as ScaffoldPageData } from "@/content/platform";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";
import { cropStyle } from "@/lib/media";

export type ScaffoldArt =
  /** A project character poster, cropped of its baked frame. */
  | { kind: "character"; project: ProjectId }
  /** Cut-out art floating on the hero (e.g. the SPINE core). */
  | { kind: "cutout"; src: string }
  /** A vector emblem or medallion. */
  | { kind: "emblem"; src: string }
  /** A full-bleed scene behind the copy (e.g. an industry hero). */
  | { kind: "scene"; src: string };

interface ScaffoldPageProps {
  page: ScaffoldPageData;
  breadcrumbs: { label: string; href: string }[];
  art?: ScaffoldArt;
  secondaryCta?: { label: string; href: string };
}

/** Draft routes stay out of search until their full build replaces them. */
export function scaffoldMetadata(page: ScaffoldPageData): Metadata {
  return {
    title: page.navLabel,
    description: page.lede,
    robots: { index: false, follow: true },
  };
}

/**
 * Reviewable v2 scaffold for a route whose full build lands in a later phase:
 * cinematic hero in the fused obsidian/navy field, a cloud blend into bone
 * listing what the finished page will contain, and a navy CTA band. Marked with
 * data-scaffold so a pre-merge check can confirm none ship.
 */
export function ScaffoldPage({ page, breadcrumbs, art, secondaryCta }: ScaffoldPageProps) {
  const scene = art?.kind === "scene";

  return (
    <div data-scaffold={page.slug}>
      <section
        data-surface="obsidian"
        aria-labelledby="page-title"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 80% 18%, rgba(21,48,74,0.85) 0%, rgba(11,31,51,0.4) 45%, transparent 75%), radial-gradient(ellipse 55% 45% at 8% 100%, rgba(166,106,50,0.14) 0%, transparent 70%), linear-gradient(180deg, #050505 0%, #08121c 100%)",
          }}
        />
        {scene && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={art.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(8,18,28,0.86) 38%, rgba(8,18,28,0.35) 68%, rgba(8,18,28,0.15) 100%), linear-gradient(180deg, transparent 60%, #08121c 100%)",
              }}
            />
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/overlays/gold-dust.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-screen"
        />

        <Container className="relative z-10 grid min-h-[78vh] items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-8">
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
                  {page.navLabel}
                </li>
              </ol>
            </nav>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-bronze">
              <span aria-hidden="true" className="h-px w-8 bg-bronze/70" />
              {page.eyebrow}
            </p>
            <h1
              id="page-title"
              className="font-display text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl"
            >
              {page.headline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/75">
              {page.lede}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={CTA_LINKS.assessment} variant="primary" size="lg" className="bronze-glow">
                {CTA.PRIMARY}
              </Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>

          {art && !scene && <HeroArt art={art} />}
        </Container>
      </section>

      <SectionBlend from="abyss" to="bone" art="ivory-clouds" artOpacity={0.9} />

      <section data-surface="bone" className="pb-24 pt-8 lg:pb-32">
        <Container>
          <p className="inline-flex items-center gap-2 border border-rule px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Draft scaffold
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-fg lg:text-5xl">
            What this page will cover
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
            This route is part of the v2 rebuild. The finished page follows the
            outline below.
          </p>
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.plannedSections.map((section, index) => (
              <li
                key={section}
                className="flex gap-5 border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(11,31,51,0.45)] lg:p-7"
              >
                <span className="font-display text-3xl leading-none text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-[15px] leading-snug text-fg">{section}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <SectionBlend from="bone" to="navy" art="dark-clouds" artOpacity={0.55} />

      <section data-surface="navy" className="relative overflow-hidden pb-28 pt-10 text-center">
        <Container className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-fg lg:text-5xl">
            Start with one AI system.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted">
            {CANONICAL.decisionAuthority}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={CTA_LINKS.assessment} variant="primary" size="lg">
              {CTA.PRIMARY}
            </Button>
            <Button href={CTA_LINKS.demo} variant="secondary" size="lg">
              {CTA.DEMO}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

function HeroArt({ art }: { art: Exclude<ScaffoldArt, { kind: "scene" }> }) {
  if (art.kind === "character") {
    const media = CHARACTER_MEDIA[art.project];
    const { left = 0, top = 0 } = media.crop;
    const aspect = (media.poster.width * (100 - left)) / (media.poster.height * (100 - top));
    return (
      <div className="relative mx-auto w-full max-w-[24rem]" aria-hidden="true">
        <div
          className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(214,161,74,0.22) 0%, rgba(11,31,51,0.4) 50%, transparent 72%)",
          }}
        />
        <div
          className="relative overflow-hidden border border-bronze/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          style={{ aspectRatio: aspect }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.poster.src} alt="" style={cropStyle(media.crop)} />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.55) 100%)" }}
          />
        </div>
        <div className="mythos-rule mt-5" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(214,161,74,0.2) 0%, rgba(21,48,74,0.35) 50%, transparent 72%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.src}
        alt=""
        className={
          art.kind === "cutout"
            ? "relative w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
            : "relative mx-auto w-3/4"
        }
      />
    </div>
  );
}
