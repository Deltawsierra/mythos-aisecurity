import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { BuyerQuestions } from "@/components/platform/BuyerQuestions";
import { ArchitectureMap } from "@/components/platform/ArchitectureMap";
import { CycleStrip } from "@/components/platform/CycleStrip";
import { AuthorityChain } from "@/components/platform/AuthorityChain";
import { EvidenceStates } from "@/components/platform/EvidenceStates";
import { CoveragePanel } from "@/components/platform/CoveragePanel";
import { ExposurePreview } from "@/components/platform/ExposurePreview";
import { ChangeFlow } from "@/components/platform/ChangeFlow";
import { OutputsGrid } from "@/components/platform/OutputsGrid";
import { ReportPreview } from "@/components/platform/ReportPreview";
import { OVERVIEW } from "@/content/platformOverview";
import { ATHENA_COVERAGE } from "@/content/athena";
import { PROJECTS } from "@/content/platform";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES } from "@/content/media";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Platform — AI Assurance from Risk to Resilience",
  description:
    "One approach to understanding an AI system, testing its boundaries, recording proof and keeping critical claims current as its models, data, tools and permissions change.",
  alternates: { canonical: "/platform/" },
  ...socialImage("platform", "AI Assurance from Risk to Resilience — Mythos AI Security"),
};

const o = OVERVIEW;

/**
 * Platform Overview — Launch Guide R02 (P01–P10). The bridge city opens the
 * page; warm stone sections explain; technical diagrams sit in dusk scenes;
 * the page closes on the viaduct horizon.
 */
export default function PlatformPage() {
  return (
    <PageMotion>
      {/* P01 */}
      <ScenicHero
        eyebrow={o.hero.eyebrow}
        headline={o.hero.headline}
        lede={o.hero.lede}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Platform"
        primaryCta={{ label: "Explore SPINE", href: "/platform/spine" }}
        secondaryCta={{ label: CTA.DEMO, href: CTA_LINKS.demo }}
        planes={[{ src: SCENES.platform.src, mobileSrc: SCENES.platform.phone, className: "-inset-[3%]", position: "60% 50%", depth: 6, priority: true }]}
        into="ivory"
      />

      {/* P02 */}
      <section data-surface="ivory" aria-labelledby="questions-title" className="pb-24 pt-10 lg:pb-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="questions-title" eyebrow={o.questions.eyebrow} title={<Accent text={o.questions.title} />} lede={o.questions.lede} caps />
          <BuyerQuestions answers={o.questions.answers} />
        </Container>
      </section>

      {/* P03 */}
      <Scene
        surface="navy"
        labelledBy="architecture-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.55) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 70%, rgba(21,35,51,0.7) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="architecture-title" align="center" eyebrow={o.architecture.eyebrow} title={<Accent text={o.architecture.title} />} lede={o.architecture.lede} caps />
          <div className="mt-14">
            <ArchitectureMap />
          </div>
        </Container>
      </Scene>

      {/* P04 */}
      <section data-surface="ivory" aria-labelledby="lifecycle-title" className="pb-24 pt-6 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <SectionIntro id="lifecycle-title" eyebrow={o.lifecycle.eyebrow} title={<Accent text={o.lifecycle.title} />} caps />
            <p className="text-lg leading-relaxed text-fg-muted lg:pb-2">{o.lifecycle.lede}</p>
          </div>
          <CycleStrip className="mt-14" />
        </Container>
      </section>

      {/* P05 */}
      <section data-surface="parchment" aria-labelledby="authority-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="authority-title" eyebrow={o.authority.eyebrow} title={<Accent text={o.authority.title} />} lede={o.authority.lede} caps />
          <div className="mt-14">
            <AuthorityChain />
          </div>
        </Container>
      </section>

      {/* P06 */}
      <section data-surface="ivory" aria-labelledby="evidence-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="evidence-title" eyebrow={o.evidence.eyebrow} title={<Accent text={o.evidence.title} />} lede={o.evidence.lede} caps />
          <EvidenceStates className="mt-12" />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="max-w-md" data-reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">Coverage manifest</p>
              <p className="mt-3 font-display text-3xl leading-tight text-fg">What was expected, observed and assessed — and what was not checked.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                Coverage that falls short reads AUDIT_INCOMPLETE. It is never a compliance or certification verdict.
              </p>
            </div>
            <CoveragePanel rows={ATHENA_COVERAGE.rows} unit="assets" note={ATHENA_COVERAGE.note} />
          </div>
        </Container>
      </section>

      {/* P07 */}
      <section data-surface="parchment" aria-labelledby="economics-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="economics-title" eyebrow={o.economics.eyebrow} title={<Accent text={o.economics.title} />} lede={o.economics.lede} caps />
          <div className="mt-12" data-reveal>
            <ExposurePreview />
          </div>
          <p className="mt-4 text-sm text-fg-muted">Illustrative scenario — synthetic data. Ranges, never a single exact number.</p>
        </Container>
      </section>

      {/* P08 */}
      <Scene
        surface="charcoal"
        labelledBy="continuous-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "!object-contain object-[85%_100%] opacity-70", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.92) 75%, rgba(22,26,28,0.75) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="continuous-title" align="center" eyebrow={o.continuous.eyebrow} title={<Accent text={o.continuous.title} />} lede={o.continuous.lede} caps />
          <div className="mt-14">
            <ChangeFlow />
          </div>
        </Container>
      </Scene>

      {/* P09 */}
      <section data-surface="ivory" aria-labelledby="outputs-title" className="pb-24 pt-8 lg:pb-28">
        <Container>
          <SectionIntro id="outputs-title" eyebrow={o.outputs.eyebrow} title={<Accent text={o.outputs.title} />} lede={o.outputs.lede} caps />
          <div className="mt-12">
            <OutputsGrid />
          </div>
        </Container>
      </section>

      {/* P10 */}
      <section data-surface="parchment" aria-labelledby="cta-title" className="pb-16 pt-24 lg:pt-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionIntro id="cta-title" eyebrow={o.cta.eyebrow} title={<Accent text={o.cta.title} />} lede={o.cta.lede} caps />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={CTA_LINKS.assessment} variant="primary" size="md" arrow>
                Request an Assessment
              </Button>
              <Button href="/example-report" variant="secondary" size="md">
                {CTA.SAMPLE_REPORT}
              </Button>
            </div>
            <nav aria-label="Explore each product" className="mt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">{o.projects.title}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PROJECTS.map((p) => (
                  <li key={p.id}>
                    <Link href={p.href} className="inline-flex min-h-10 items-center border border-rule bg-cream px-3 text-sm font-semibold text-fg transition-colors hover:border-accent">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ReportPreview />
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="See the whole system *on one of yours.*"
        vista="a"
      />
    </PageMotion>
  );
}
