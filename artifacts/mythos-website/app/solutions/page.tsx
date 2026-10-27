import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import { IndustrySwitcher, type SwitcherIndustry } from "@/components/solutions/IndustrySwitcher";
import { INDUSTRIES, SOLUTIONS_BRIDGE, SOLUTIONS_HUB, SOLUTIONS_SWITCHER } from "@/content/industries";
import { PROJECTS } from "@/content/platform";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions — AI Assurance for Real-World Impact",
  description:
    "How Mythos applies evidence-backed AI assurance across financial services, healthcare, SaaS, regulated enterprise, public sector, operations and delivery partners — without one-size-fits-all promises.",
  alternates: { canonical: "/solutions/" },
  ...socialImage("solutions", "AI Assurance for Real-World Impact — Mythos AI Security"),
};

const h = SOLUTIONS_HUB;

const SWITCHER: SwitcherIndustry[] = INDUSTRIES.map((i) => ({
  slug: i.slug,
  name: i.name,
  headline: i.hero.headline.replaceAll("*", ""),
  risks: i.risks.items.slice(0, 3).map((r) => r.name),
  ...SOLUTIONS_SWITCHER[i.slug],
}));

const SHORT_NAME: Record<string, string> = {
  "financial-services-insurance": "Financial",
  "healthcare-life-sciences": "Healthcare",
  "ai-saas": "SaaS",
  "regulated-enterprise": "Regulated",
  "public-sector-mission": "Public sector",
  "manufacturing-critical-infrastructure": "Operations",
  "integrators-vendors": "Integrators",
};

/** Frameworks named on the industry pages, grouped; customer-specific rows are left to each page. */
const STANDARDS = (() => {
  const rows = new Map<string, { status: "mapped" | "reference"; sectors: string[] }>();
  for (const ind of INDUSTRIES) {
    for (const item of ind.controls.items) {
      if (item.name.startsWith("Your ") || item.name.startsWith("Sector ")) continue;
      const row = rows.get(item.name) ?? { status: item.status, sectors: [] };
      row.sectors.push(ind.slug);
      rows.set(item.name, row);
    }
  }
  return [...rows.entries()]
    .map(([name, row]) => ({ name, ...row }))
    .sort((a, b) => (a.status === b.status ? b.sectors.length - a.sectors.length : a.status === "mapped" ? -1 : 1));
})();

const PRODUCT_HREF = Object.fromEntries(PROJECTS.map((p) => [p.name, p.href]));
const FEATURED = INDUSTRIES[0];

/** Solutions hub — Launch Guide Section 09. */
export default function SolutionsPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow={h.hero.eyebrow}
        headline={h.hero.headline}
        lede={h.hero.lede}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Solutions"
        secondaryCta={{ label: "Find Your Environment", href: "#switcher-title" }}
        planes={[{ src: SCENES.solutionsHub.src, mobileSrc: SCENES.solutionsHub.phone, className: "-inset-[3%]", position: "60% 50%", depth: 6, priority: true }]}
        into="ivory"
      />

      {/* Switch destination by industry */}
      <section data-surface="ivory" aria-labelledby="switcher-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="switcher-title" eyebrow={h.switcher.eyebrow} title={<Accent text={h.switcher.title} />} lede={h.switcher.lede} caps />
          <div className="mt-12">
            <IndustrySwitcher industries={SWITCHER} />
          </div>
        </Container>
      </section>

      {/* Four questions, every sector */}
      <Scene
        surface="navy"
        labelledBy="pillars-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="pillars-title" align="center" eyebrow={h.pillars.eyebrow} title={<Accent text={h.pillars.title} />} caps />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {h.pillars.items.map((p, i) => (
              <li key={p.name} className="flex flex-col border border-rule bg-panel p-6">
                <span className="font-display text-3xl leading-none text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <p className="display-caps mt-4 font-display text-2xl text-fg">{p.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
                <p className="mt-auto border-t border-rule pt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                  {PRODUCT_HREF[p.product] ? (
                    <Link href={PRODUCT_HREF[p.product]} className="inline-flex items-center gap-1.5 hover:text-ivory">
                      {p.product}
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  ) : (
                    p.product
                  )}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Scene>

      {/* Architecture-to-sector bridge */}
      <section data-surface="parchment" aria-labelledby="bridge-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="bridge-title" eyebrow={h.bridge.eyebrow} title={<Accent text={h.bridge.title} />} lede={h.bridge.lede} caps />
          <div className="mt-12 border-y border-rule">
            <div aria-hidden="true" className="hidden grid-cols-[1.1fr_1fr_1fr_1fr] gap-6 border-b border-rule py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent lg:grid">
              <span>Sector</span>
              <span>Athena</span>
              <span>Achilles</span>
              <span>SPINE</span>
            </div>
            <ul className="divide-y divide-rule" data-reveal-group>
              {SOLUTIONS_BRIDGE.map((row) => {
                const ind = INDUSTRIES.find((i) => i.slug === row.slug)!;
                return (
                  <li key={row.slug} className="grid gap-x-6 gap-y-2 py-5 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:py-4">
                    <Link href={`/solutions/${row.slug}`} className="group self-start font-display text-xl leading-snug text-fg hover:text-accent">
                      {ind.name}
                      <ArrowRight size={13} aria-hidden="true" className="ml-1.5 inline align-baseline text-accent transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    {(["athena", "achilles", "spine"] as const).map((k) => (
                      <p key={k} className="text-[15px] leading-relaxed text-fg-muted">
                        <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg lg:sr-only">
                          {k === "spine" ? "SPINE" : k[0].toUpperCase() + k.slice(1)}
                        </span>
                        {row[k]}
                      </p>
                    ))}
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-4 text-sm text-fg-muted">Where each part tends to carry the most weight — not a record of results.</p>
        </Container>
      </section>

      {/* Featured walkthrough — synthetic */}
      <Scene
        surface="charcoal"
        labelledBy="featured-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "!object-contain object-[50%_100%] opacity-45", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.78) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="featured-title" eyebrow={h.featured.eyebrow} title={<Accent text={h.featured.title} />} lede={h.featured.lede} caps />
            <p className="mt-6 border-l-2 border-champagne/60 pl-4 text-[15px] leading-relaxed text-fg">{FEATURED.proof.scenario}</p>
            <Link href={`/solutions/${FEATURED.slug}`} className="group mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-champagne">
              More on {FEATURED.name}
              <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <EvidenceTimeline events={FEATURED.proof.events} caption="Illustrative scenario · synthetic data" />
        </Container>
      </Scene>

      {/* Frameworks by sector */}
      <section data-surface="ivory" aria-labelledby="standards-title" className="pb-16 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="standards-title" eyebrow={h.standards.eyebrow} title={<Accent text={h.standards.title} />} lede={h.standards.lede} caps />
          <div>
            <ul className="divide-y divide-rule border-y border-rule" data-reveal-group>
              {STANDARDS.map((row) => (
                <li key={row.name} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6">
                  <span className="font-display text-xl text-fg">{row.name}</span>
                  <span
                    className={cn(
                      "self-start justify-self-start border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] sm:justify-self-end",
                      row.status === "mapped" ? "border-state-verified text-state-verified-ink" : "border-rule text-fg-muted",
                    )}
                  >
                    {row.status === "mapped" ? "Mapping built" : "Referenced in scoping"}
                  </span>
                  <span className="flex flex-wrap gap-1.5 sm:col-span-2">
                    <span className="sr-only">Comes up in: </span>
                    {row.sectors.map((s) => (
                      <span key={s} className="bg-panel px-2 py-0.5 text-xs text-fg-muted">
                        {SHORT_NAME[s]}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-sm text-fg-muted">
              <BookOpenCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
              Mapped findings tag the controls they touch; nothing is marked as satisfied. Mythos does not certify compliance or issue attestations.
            </p>
          </div>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Start with *the workflow that matters most.*"
        body="Tell us your environment and the AI system you are most concerned about. We will suggest a scoped first engagement."
        secondary={{ label: "Explore the Platform", href: "/platform" }}
        vista="b"
      />
    </PageMotion>
  );
}
