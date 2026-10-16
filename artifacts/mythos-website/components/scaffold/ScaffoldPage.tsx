import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { InnerHero, type Crumb } from "@/components/sections/InnerHero";
import { HeroArt, type HeroArtSpec } from "@/components/sections/HeroArt";
import { SectionBlend } from "@/components/sections/SectionBlend";
import { ClosingCta } from "@/components/sections/ClosingCta";
import type { ScaffoldPage as ScaffoldPageData } from "@/content/platform";

export type ScaffoldArt =
  | HeroArtSpec
  /** A full-bleed scene behind the copy (e.g. an industry hero). */
  | { kind: "scene"; src: string };

interface ScaffoldPageProps {
  page: ScaffoldPageData;
  breadcrumbs: Crumb[];
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
 * the shared inner hero, a cloud blend into bone listing what the finished
 * page will contain, and the navy closing band. Marked with data-scaffold so a
 * pre-merge check can confirm none ship.
 */
export function ScaffoldPage({ page, breadcrumbs, art, secondaryCta }: ScaffoldPageProps) {
  return (
    <div data-scaffold={page.slug}>
      <InnerHero
        eyebrow={page.eyebrow}
        headline={page.headline}
        lede={page.lede}
        breadcrumbs={breadcrumbs}
        current={page.navLabel}
        secondaryCta={secondaryCta}
        sceneSrc={art?.kind === "scene" ? art.src : undefined}
        art={art && art.kind !== "scene" ? <HeroArt art={art} /> : undefined}
      />

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
                className="flex gap-5 border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)] lg:p-7"
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

      <ClosingCta />
    </div>
  );
}
