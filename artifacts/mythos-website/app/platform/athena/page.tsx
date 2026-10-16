import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { SystemMap } from "@/components/platform/SystemMap";
import { GroupList } from "@/components/platform/GroupList";
import { CoveragePanel } from "@/components/platform/CoveragePanel";
import { CallTraces } from "@/components/platform/CallTraces";
import { DifferentialEvidence } from "@/components/platform/DifferentialEvidence";
import { HandoffFlow } from "@/components/platform/HandoffFlow";
import {
  ATHENA_CHECKS,
  ATHENA_CONFIDENCE,
  ATHENA_COPY,
  ATHENA_COVERAGE,
  ATHENA_EXCHANGES,
  ATHENA_HANDOFF,
  ATHENA_OUTPUTS,
  ATHENA_REPLAY,
  ATHENA_RETEST,
  ATHENA_TRACES,
} from "@/content/athena";
import { OLYMPUS_MEDIA } from "@/content/media";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Athena — See Every Risk, Understand Every Exposure",
  description:
    "Athena reveals how systems, identities, data, tools and models connect within an agreed scope — what is exposed, what is controlled, what was not checked, and where remediation is needed.",
  alternates: { canonical: "/platform/athena/" },
  ...socialImage("platform-athena", "See Every Risk. Understand Every Exposure. Prove Every Decision — Mythos AI Security"),
};

const NEXT: NextLink[] = [
  { eyebrow: "SPINE", title: "Where Athena's findings become claims", href: "/platform/spine" },
  { eyebrow: "Use case", title: "AI agents with tools and actions", href: "/use-cases/ai-agent-tools-actions" },
  { eyebrow: "Example report", title: "What an assessment hands back", href: "/example-report" },
];

const CONFIDENCE_TONE: Record<string, string> = {
  Confirmed: "border-state-contradicted text-state-contradicted-ink",
  Likely: "border-state-stale text-state-stale-ink",
  Suspicious: "border-rule text-fg-muted",
};

const c = ATHENA_COPY;

/** Athena — Launch Guide R03 (A01–A09). */
export default function AthenaPage() {
  return (
    <PageMotion>
      {/* A01 — Athena left, copy right (Launch Guide framing). */}
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={
          <>
            {c.hero.lede}
            <span className="mt-3 block border-l border-champagne/50 pl-3 text-[15px] text-champagne/90">{c.hero.scope}</span>
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="Athena"
        primaryCta={{ label: "Explore an Example Assessment", href: "/example-report" }}
        secondaryCta={{ label: CTA.DEMO, href: CTA_LINKS.demo }}
        copySide="right"
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 60%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.mountains.src, className: "inset-x-0 top-[40%] h-[18%]", fit: "contain", position: "60% 100%", opacity: 0.75, depth: 8 },
          { src: OLYMPUS_MEDIA.cliffTemple.src, className: "-right-[3%] bottom-[14%] h-[54%] w-[56%]", fit: "contain", position: "100% 100%", depth: 12 },
          { src: OLYMPUS_MEDIA.evergreenCliff.src, className: "-left-[3%] bottom-0 h-[62%] w-[34%]", fit: "contain", position: "0% 100%", depth: 16, desktopOnly: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.55, position: "100% 0%", depth: 10 },
        ]}
        figure={
          <div className="absolute bottom-[6%] left-[4%] h-[86%] xl:left-[7%]" data-depth="22">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={OLYMPUS_MEDIA.athena.src}
              alt=""
              className="hero-rise h-full w-auto max-w-none drop-shadow-[0_30px_50px_rgba(18,21,23,0.55)]"
              style={{ animationDelay: "160ms" }}
            />
          </div>
        }
        mobileFigure={
          <div className="relative h-[52svh] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={OLYMPUS_MEDIA.athena.src} alt="" className="absolute left-1/2 top-0 h-[124%] w-auto max-w-none -translate-x-1/2" />
            <div
              className="absolute inset-x-0 bottom-0 h-[40%]"
              style={{ background: "linear-gradient(0deg, #ede4d5 0%, rgba(232,220,200,0.92) 30%, rgba(232,220,200,0.45) 65%, rgba(232,220,200,0) 100%)" }}
            />
          </div>
        }
        into="ivory"
      />

      {/* A02 */}
      <section data-surface="ivory" aria-labelledby="checks-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="checks-title" eyebrow={c.checks.eyebrow} title={<Accent text={c.checks.title} />} lede={c.checks.lede} caps />
          <div className="mt-12">
            <GroupList groups={ATHENA_CHECKS} columns={2} />
          </div>
        </Container>
      </section>

      {/* A04 */}
      <Scene
        surface="navy"
        labelledBy="map-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="map-title" align="center" eyebrow={c.map.eyebrow} title={<Accent text={c.map.title} />} lede={c.map.lede} caps />
          <div className="mt-10">
            <SystemMap />
          </div>
        </Container>
      </Scene>

      {/* A03 */}
      <section data-surface="parchment" aria-labelledby="coverage-title" className="pb-24 pt-8">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionIntro id="coverage-title" eyebrow={c.coverage.eyebrow} title={<Accent text={c.coverage.title} />} lede={c.coverage.lede} caps />
          <CoveragePanel rows={ATHENA_COVERAGE.rows} unit="assets" note={ATHENA_COVERAGE.note} />
        </Container>
      </section>

      {/* A05 */}
      <section data-surface="ivory" aria-labelledby="traces-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="traces-title" eyebrow={c.traces.eyebrow} title={<Accent text={c.traces.title} />} lede={c.traces.lede} caps />
          <div className="mt-12">
            <CallTraces traces={ATHENA_TRACES} />
          </div>
          <p className="mt-4 text-sm text-fg-muted">Illustrative call traces — synthetic data.</p>
        </Container>
      </section>

      {/* A06 */}
      <section data-surface="ivory" aria-labelledby="proof-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="proof-title" eyebrow={c.proof.eyebrow} title={<Accent text={c.proof.title} />} lede={c.proof.lede} caps />
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
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {ATHENA_REPLAY.map((item) => (
              <details key={item.name} className="group border border-rule bg-panel open:border-accent/60">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-fg [&::-webkit-details-marker]:hidden">
                  {item.name}
                  <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-rule px-5 py-4 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-xs text-fg-muted">Illustrative exchange. Customers, records and identifiers are fictional.</p>
        </Container>
      </section>

      {/* A07 */}
      <section data-surface="parchment" aria-labelledby="handoff-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="handoff-title" eyebrow={c.handoff.eyebrow} title={<Accent text={c.handoff.title} />} lede={c.handoff.lede} caps />
          <div className="mt-12">
            <HandoffFlow steps={ATHENA_HANDOFF} />
          </div>
        </Container>
      </section>

      {/* A08 — sober paper panels on a dusk band. */}
      <Scene
        surface="charcoal"
        labelledBy="evidence-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "!object-contain object-[90%_100%] opacity-60", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.75) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="evidence-title" eyebrow={c.evidence.eyebrow} title={<Accent text={c.evidence.title} />} lede={c.evidence.lede} caps />
          <ul className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal-group>
            {ATHENA_OUTPUTS.map((out) => (
              <li key={out.name} data-surface="ivory" className="flex flex-col border border-rule bg-cream p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-3 border-b border-rule pb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={out.icon} alt="" aria-hidden="true" className="h-10 w-10" />
                  <p className="font-display text-2xl text-fg">{out.name}</p>
                </div>
                <ul className="mt-4 grid gap-2 text-sm text-fg">
                  {out.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Synthetic example</p>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">Retest outcomes</p>
            <dl className="mt-4 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
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
      </Scene>

      {/* A09 */}
      <section data-surface="ivory" aria-labelledby="next-title" className="pb-16 pt-8">
        <Container>
          <SectionIntro id="next-title" eyebrow={c.next.eyebrow} title={<Accent text={c.next.title} />} caps />
          <NextLinks items={NEXT} />
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="See your system *the way Athena does.*"
        secondary={{ label: CTA.SAMPLE_REPORT, href: "/example-report" }}
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.cliffTemple.src, className: "!object-contain object-[50%_92%]", parallax: 6 },
          { src: OLYMPUS_MEDIA.sunbeams, blend: "screen", opacity: 0.55, className: "object-[80%_0%]" },
        ]}
      />
    </PageMotion>
  );
}
