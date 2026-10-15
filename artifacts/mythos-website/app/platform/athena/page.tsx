import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { InnerHero } from "@/components/sections/InnerHero";
import { SectionBlend } from "@/components/sections/SectionBlend";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { CharacterPanel } from "@/components/platform/CharacterPanel";
import { SystemMap } from "@/components/platform/SystemMap";
import { GroupList } from "@/components/platform/GroupList";
import { DifferentialEvidence } from "@/components/platform/DifferentialEvidence";
import { CoveragePanel } from "@/components/platform/CoveragePanel";
import { HandoffFlow } from "@/components/platform/HandoffFlow";
import {
  ATHENA_CHECKS,
  ATHENA_CONFIDENCE,
  ATHENA_COPY,
  ATHENA_COVERAGE,
  ATHENA_EXCHANGES,
  ATHENA_HANDOFF,
  ATHENA_RETEST,
} from "@/content/athena";

export const metadata: Metadata = {
  title: "Athena — See the System",
  description:
    "Athena maps what exists around an AI system, what is exposed, where requests travel and what evidence proves it — with confidence on every finding and gaps reported as plainly as results.",
  alternates: { canonical: "/platform/athena/" },
};

const NEXT: NextLink[] = [
  { eyebrow: "SPINE", title: "Where Athena's findings become claims", href: "/platform/spine" },
  { eyebrow: "Example report", title: "What an assessment hands back", href: "/example-report" },
  { eyebrow: "Use cases", title: "Where teams start with Athena", href: "/use-cases" },
];

const CONFIDENCE_TONE: Record<string, string> = {
  Confirmed: "border-state-contradicted text-state-contradicted-ink",
  Likely: "border-state-stale text-state-stale-ink",
  Suspicious: "border-rule text-fg-muted",
};

/** Athena — See the System (blueprint Section 7). */
export default function AthenaPage() {
  const c = ATHENA_COPY;
  return (
    <PageMotion>
      <InnerHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="Athena"
        secondaryCta={{ label: "See SPINE", href: "/platform/spine" }}
        art={<CharacterPanel project="athena" />}
      />

      <SectionBlend
        from="abyss"
        to="navy"
        layers={[
          { art: "mountain-fog", opacity: 0.35, drift: 40, blend: "screen" },
          { art: "dark-clouds-alt", opacity: 0.7, drift: -60 },
        ]}
      />

      <section data-surface="navy" aria-labelledby="map-title" className="relative overflow-hidden pb-24 pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/transitions/transition-bronze-particles.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        <Container className="relative">
          <SectionIntro id="map-title" align="center" eyebrow={c.map.eyebrow} title={c.map.title} lede={c.map.lede} />
          <div className="mt-12">
            <SystemMap />
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

      <section data-surface="bone" aria-labelledby="checks-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="checks-title" eyebrow={c.checks.eyebrow} title={c.checks.title} lede={c.checks.lede} />
          <div className="mt-12">
            <GroupList groups={ATHENA_CHECKS} columns={2} />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="proof-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="proof-title" eyebrow={c.proof.eyebrow} title={c.proof.title} lede={c.proof.lede} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Finding confidence" data-reveal-group>
            {ATHENA_CONFIDENCE.map((level) => (
              <li key={level.name} className={`border-l-2 bg-panel px-5 py-4 ${CONFIDENCE_TONE[level.name]}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em]">{level.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg">{level.meaning}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <DifferentialEvidence {...ATHENA_EXCHANGES} />
          </div>
          <p className="mt-3 text-xs text-fg-muted">Illustrative exchange. Customers, records and identifiers are fictional.</p>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="coverage-title" className="border-t border-rule py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionIntro id="coverage-title" eyebrow={c.coverage.eyebrow} title={c.coverage.title} lede={c.coverage.lede} />
          <CoveragePanel rows={ATHENA_COVERAGE.rows} unit="assets" note={ATHENA_COVERAGE.note} />
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

      <section data-surface="navy" aria-labelledby="evidence-title" className="pb-24 pt-6">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionIntro id="evidence-title" eyebrow={c.evidence.eyebrow} title={c.evidence.title} lede={c.evidence.lede} />
            <div className="mt-8 flex items-center gap-4" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/evidence/evidence-pack.svg" alt="" aria-hidden="true" className="h-14 w-14" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/evidence/retest-proof.svg" alt="" aria-hidden="true" className="h-14 w-14" />
            </div>
          </div>
          <div data-reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Retest outcomes</p>
            <dl className="mt-4 grid border-l border-t border-rule sm:grid-cols-2">
              {ATHENA_RETEST.map((outcome) => (
                <div key={outcome.name} className="border-b border-r border-rule bg-panel p-5">
                  <dt className="font-display text-2xl leading-tight text-fg">{outcome.name}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{outcome.meaning}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              None of these is &ldquo;fixed&rdquo; on its own say-so: a remediation counts only when the retest evidence shows it.
            </p>
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

      <section data-surface="bone" aria-labelledby="handoff-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="handoff-title" eyebrow={c.handoff.eyebrow} title={c.handoff.title} lede={c.handoff.lede} />
          <div className="mt-12">
            <HandoffFlow steps={ATHENA_HANDOFF} />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="next-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="next-title" eyebrow={c.next.eyebrow} title={c.next.title} />
          <NextLinks items={NEXT} />
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

      <ClosingCta
        title="See your system the way Athena does."
        secondary={{ label: "View Example Report", href: "/example-report" }}
      />
    </PageMotion>
  );
}
