import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { AssuranceGraph } from "@/components/platform/AssuranceGraph";
import { EvidenceStates } from "@/components/platform/EvidenceStates";
import { AuthorityChain } from "@/components/platform/AuthorityChain";
import { ChangeFlow } from "@/components/platform/ChangeFlow";
import { ExposurePreview } from "@/components/platform/ExposurePreview";
import { DecisionStates, EvidenceLadder, PolicyEffects, ReceiptCard, UnknownCard } from "@/components/platform/SpineBlocks";
import { ClaimInvalidation } from "@/components/home/ClaimInvalidation";
import { AssuranceTeams } from "@/components/home/AssuranceTeams";
import { SPINE_COPY } from "@/content/spine";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES, SPINE_CORE_MEDIA, scenePlanes } from "@/content/media";
import { CTA_LINKS } from "@/content/navigation";
import { CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SPINE: AI Assurance System of Record",
  description:
    "SPINE links an AI system's claims, controls, authority and evidence, recommends a release decision and flags what to retest when something changes.",
  alternates: { canonical: "/platform/spine/" },
  ...socialImage("platform-spine", "Continuous Assurance. Evidence That Holds Together — Mythos AI Security"),
};

const NEXT: NextLink[] = [
  { eyebrow: "Economic Exposure", title: "What a validated failure could mean financially", href: "/platform/economic-exposure" },
  { eyebrow: "Evidence & Receipts", title: "Claims, receipts and decisions you can verify", href: "/platform/evidence" },
  { eyebrow: "Continuous Assurance", title: "Keeping conclusions current as the system changes", href: "/platform/continuous-assurance" },
];

const c = SPINE_COPY;

/** The armillary core above the waterfall cliffs, swaying a few degrees after load. */
function CoreFigure({ className }: { className: string }) {
  return (
    <div className={className} data-depth="18">
      <div
        aria-hidden="true"
        className="absolute -inset-[18%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(229,197,143,0.42) 0%, rgba(208,164,90,0.16) 45%, transparent 70%)" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SPINE_CORE_MEDIA.cutout.src} alt="" className="core-sway relative w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]" />
    </div>
  );
}

/** SPINE — Launch Guide R04 (S01–S09). */
export default function SpinePage() {
  return (
    <PageMotion>
      {/* S01 */}
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="SPINE"
        primaryCta={{ label: "Explore the Evidence Model", href: "#claims-title" }}
        secondaryCta={{ label: CTA.DEMO, href: CTA_LINKS.demo }}
        planes={scenePlanes(SCENES.spine, "40% 50%")}
        figure={<CoreFigure className="absolute right-[8%] top-[16%] w-[min(34vw,32rem)]" />}
        mobileFigure={<CoreFigure className="relative mx-auto w-64" />}
        into="ivory"
      />

      {/* Why SPINE — system of record, accuracy over time, human decisions */}
      <section data-surface="ivory" aria-labelledby="why-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="why-title" eyebrow={c.why.eyebrow} title={<Accent text={c.why.title} />} lede={c.why.lede} caps />
          <ul className="mt-12 grid gap-3 lg:grid-cols-3" data-reveal-group>
            {c.why.pillars.map((pillar, i) => (
              <li key={pillar.name} className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]">
                <span className="font-display text-4xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-display text-2xl leading-tight text-fg">{pillar.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* S02 */}
      <Scene
        surface="navy"
        labelledBy="graph-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="graph-title" align="center" eyebrow={c.graph.eyebrow} title={<Accent text={c.graph.title} />} lede={c.graph.lede} caps />
          <div className="mt-12">
            <AssuranceGraph />
          </div>
        </Container>
      </Scene>

      {/* S03 */}
      <section data-surface="parchment" aria-labelledby="claims-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="claims-title" eyebrow={c.claims.eyebrow} title={<Accent text={c.claims.title} />} lede={c.claims.lede} caps />
          <EvidenceStates className="mt-12" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <EvidenceLadder />
            <div className="grid gap-6">
              <div className="border-l-2 border-accent bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]" data-reveal>
                <p className="font-display text-2xl leading-tight text-fg">{c.claims.clocks.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{c.claims.clocks.body}</p>
              </div>
              <UnknownCard />
            </div>
          </div>
        </Container>
      </section>

      {/* S04 */}
      <section data-surface="ivory" aria-labelledby="authority-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="authority-title" eyebrow={c.authority.eyebrow} title={<Accent text={c.authority.title} />} lede={c.authority.lede} caps />
          <div className="mt-12">
            <PolicyEffects />
          </div>
          <div className="mt-16">
            <AuthorityChain />
          </div>
        </Container>
      </section>

      {/* S05 */}
      <Scene
        surface="charcoal"
        labelledBy="change-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "!object-contain object-[10%_100%] opacity-60", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.75) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="change-title" align="center" eyebrow={c.change.eyebrow} title={<Accent text={c.change.title} />} lede={c.change.lede} caps />
          <div className="mx-auto mt-12 grid max-w-4xl gap-3 md:grid-cols-2" data-reveal-group>
            {[c.change.supersedes, c.change.invalidates].map((rel) => (
              <div key={rel.name} className="border border-rule bg-panel p-6">
                <p className="font-mono text-sm font-semibold tracking-[0.12em] text-champagne">{rel.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">{rel.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <ChangeFlow />
          </div>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2" aria-label="What change intelligence works from">
            {c.change.drivers.map((driver) => (
              <li key={driver} className="border border-rule px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
                {driver}
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {/* S06 */}
      <section data-surface="ivory" aria-labelledby="decisions-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="decisions-title" eyebrow={c.decisions.eyebrow} title={<Accent text={c.decisions.title} />} lede={c.decisions.lede} caps />
          <div className="mt-12">
            <DecisionStates />
          </div>
        </Container>
      </section>

      <section data-surface="ivory" aria-labelledby="receipts-title" className="border-t border-rule py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionIntro id="receipts-title" eyebrow={c.evidence.eyebrow} title={<Accent text={c.evidence.title} />} lede={c.evidence.lede} caps />
            <ul className="mt-10 grid gap-3" data-reveal-group>
              {c.evidence.packets.map((packet) => (
                <li key={packet.name} className="flex gap-4 border border-rule bg-panel p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={packet.icon} loading="lazy" alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
                  <div>
                    <p className="font-display text-xl leading-tight text-fg">{packet.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{packet.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-28">
            <ReceiptCard />
          </div>
        </Container>
      </section>

      {/* S07 */}
      <section data-surface="parchment" aria-labelledby="economics-title" className="pb-16 pt-24">
        <Container>
          <SectionIntro id="economics-title" eyebrow={c.economics.eyebrow} title={<Accent text={c.economics.title} />} lede={c.economics.lede} caps />
          <div className="mt-12" data-reveal>
            <ExposurePreview />
          </div>
          <p className="mt-4 text-sm text-fg-muted">
            Illustrative scenario — synthetic data. Sensitivity is shown apart from probability and evidence confidence; the business decision stays yours.
          </p>
        </Container>
      </section>

      {/* S08 */}
      <Scene
        surface="charcoal"
        labelledBy="teams-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.3) 0, rgba(22,26,28,0.86) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 70%, rgba(22,26,28,0.8) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(12rem,18vw,18rem)] pt-[clamp(10rem,18vw,18rem)]"
      >
        <Container>
          <SectionIntro id="teams-title" align="center" eyebrow={c.teams.eyebrow} title={<Accent text={c.teams.title} />} lede={c.teams.lede} caps />
          <div className="mt-12">
            <AssuranceTeams />
          </div>
          <Link
            href="/platform/validation"
            className="group mx-auto mt-10 flex max-w-3xl items-start gap-4 border border-champagne/30 bg-panel p-5 transition-colors hover:border-champagne/70"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ornaments/mythos-seal.svg" loading="lazy" alt="" aria-hidden="true" className="h-10 w-10 shrink-0" />
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">Minotaur · validity</span>
              <span className="mt-1 block text-[15px] leading-relaxed text-fg">{c.teams.minotaur}</span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-champagne">
                How Mythos validates itself
                <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        </Container>
      </Scene>

      {/* S09 */}
      <section data-surface="parchment" aria-labelledby="revalidate-title" className="pb-16 pt-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <SectionIntro id="revalidate-title" eyebrow={c.revalidate.eyebrow} title={<Accent text={c.revalidate.title} />} lede={c.revalidate.lede} caps />
            <div data-reveal>
              <ClaimInvalidation />
            </div>
          </div>
          <div className="mt-24">
            <SectionIntro id="next-title" eyebrow={c.next.eyebrow} title={c.next.title} />
            <NextLinks items={NEXT} />
          </div>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="See what SPINE *keeps true about your AI.*"
        secondary={{ label: "See Evidence & Receipts", href: "/platform/evidence" }}
        vista="a"
      />
    </PageMotion>
  );
}
