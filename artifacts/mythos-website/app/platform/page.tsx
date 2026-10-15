import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { InnerHero } from "@/components/sections/InnerHero";
import { HeroArt } from "@/components/sections/HeroArt";
import { SectionBlend } from "@/components/sections/SectionBlend";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ArchitectureMap } from "@/components/platform/ArchitectureMap";
import { LifecycleStrip } from "@/components/platform/LifecycleStrip";
import { AuthorityChain } from "@/components/platform/AuthorityChain";
import { EvidenceStates } from "@/components/platform/EvidenceStates";
import { ExposurePreview } from "@/components/platform/ExposurePreview";
import { OutputsGrid } from "@/components/platform/OutputsGrid";
import { ChangeFlow } from "@/components/platform/ChangeFlow";
import { ProjectGrid } from "@/components/platform/ProjectGrid";
import { ASSURANCE_DIMENSIONS, EXECUTIVE_QUESTIONS } from "@/content/platform";
import { OVERVIEW } from "@/content/platformOverview";
import { SPINE_CORE_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Platform — One Assurance System for AI Deployment",
  description:
    "How Athena, SPINE, Achilles, Minotaur and Hermes work as one AI deployment assurance system: authority, evidence states, change-driven revalidation and evidence a human can decide on.",
  alternates: { canonical: "/platform/" },
};

/**
 * Platform Overview (blueprint Section 7): an ivory long-form page with dark
 * bands for the architecture and continuous-assurance sequences.
 */
export default function PlatformPage() {
  return (
    <PageMotion>
      <InnerHero
        eyebrow={OVERVIEW.hero.eyebrow}
        headline={OVERVIEW.hero.headline}
        lede={OVERVIEW.hero.lede}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Platform"
        secondaryCta={{ label: "Explore SPINE", href: "/platform/spine" }}
        art={<HeroArt art={{ kind: "cutout", src: SPINE_CORE_MEDIA.cutout.src, spin: true }} />}
      />

      <SectionBlend
        from="abyss"
        to="bone"
        layers={[
          { art: "dark-clouds", opacity: 0.8, drift: 60 },
          { art: "ivory-clouds", opacity: 0.85, drift: -80 },
        ]}
      />

      {/* Executive questions + assurance dimensions */}
      <section data-surface="bone" aria-labelledby="questions-title" className="pb-24 pt-6 lg:pb-28">
        <Container>
          <SectionIntro id="questions-title" {...OVERVIEW.questions} />
          <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-5" data-reveal-group>
            {EXECUTIVE_QUESTIONS.map((q, i) => (
              <li key={q} className="bg-bone p-5 lg:p-6">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-2xl italic leading-tight text-fg">{q}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {ASSURANCE_DIMENSIONS.map((d) => (
              <li key={d.name} className="border border-rule bg-panel p-5 shadow-[0_18px_40px_-34px_rgba(11,31,51,0.45)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{d.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">{d.question}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SectionBlend
        from="bone"
        to="navy"
        layers={[
          { art: "ivory-clouds-alt", opacity: 0.5, drift: 50 },
          { art: "dark-clouds-alt", opacity: 0.7, drift: -60 },
        ]}
      />

      {/* Architecture + lifecycle: the dark band */}
      <section data-surface="navy" aria-labelledby="architecture-title" className="relative overflow-hidden pb-24 pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/transitions/transition-bronze-particles.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
        />
        <Container className="relative">
          <SectionIntro id="architecture-title" align="center" {...OVERVIEW.architecture} />
          <div className="mt-14">
            <ArchitectureMap />
          </div>

          <div className="mythos-rule my-20" aria-hidden="true" />

          <SectionIntro id="lifecycle-title" align="center" eyebrow={OVERVIEW.lifecycle.eyebrow} title={OVERVIEW.lifecycle.title} />
          <div className="mt-14">
            <LifecycleStrip />
          </div>
        </Container>
      </section>

      <SectionBlend
        from="navy"
        to="bone"
        layers={[
          { art: "dark-clouds", opacity: 0.6, drift: 50 },
          { art: "ivory-clouds", opacity: 0.85, drift: -70 },
        ]}
      />

      <section data-surface="bone" aria-labelledby="authority-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="authority-title" {...OVERVIEW.authority} />
          <div className="mt-14">
            <AuthorityChain />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="evidence-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="evidence-title" {...OVERVIEW.evidence} />
          <EvidenceStates className="mt-12" />
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="economics-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="economics-title" {...OVERVIEW.economics} />
          <div className="mt-12" data-reveal>
            <ExposurePreview />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="outputs-title" className="border-t border-rule pb-24 pt-24">
        <Container>
          <SectionIntro id="outputs-title" {...OVERVIEW.outputs} />
          <div className="mt-12">
            <OutputsGrid />
          </div>
        </Container>
      </section>

      <SectionBlend
        from="bone"
        to="navy"
        layers={[
          { art: "ivory-clouds-alt", opacity: 0.5, drift: 50 },
          { art: "dark-clouds-alt", opacity: 0.7, drift: -60 },
        ]}
      />

      <section data-surface="navy" aria-labelledby="continuous-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="continuous-title" align="center" {...OVERVIEW.continuous} />
          <div className="mt-14">
            <ChangeFlow />
          </div>

          <div className="mythos-rule my-20" aria-hidden="true" />

          <SectionIntro id="projects-title" align="center" eyebrow={OVERVIEW.projects.eyebrow} title={OVERVIEW.projects.title} />
          <div className="mt-12">
            <ProjectGrid />
          </div>
        </Container>
      </section>

      <ClosingCta
        title="See the whole system on one of yours."
        secondary={{ label: "View Example Report", href: "/example-report" }}
      />
    </PageMotion>
  );
}
