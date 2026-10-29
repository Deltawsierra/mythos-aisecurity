import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Check, Hourglass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { GuardianFigure } from "@/components/scenic/GuardianFigure";
import { LabyrinthCriteria } from "@/components/platform/LabyrinthCriteria";
import { SafeTwinCards } from "@/components/platform/SafeTwinCards";
import { ValidityCard } from "@/components/platform/ValidityCard";
import { OutcomeMatrix } from "@/components/platform/OutcomeMatrix";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import { ReleaseGate } from "@/components/platform/ReleaseGate";
import {
  MINOTAUR_CARD_FIELDS,
  MINOTAUR_CARD_VERSIONS,
  MINOTAUR_CENTRE,
  MINOTAUR_COPY,
  MINOTAUR_CRITERIA,
  MINOTAUR_FAILURE_MODES,
  MINOTAUR_GATE,
  MINOTAUR_RUNS,
  MINOTAUR_TRAIL,
  MINOTAUR_TWINS,
} from "@/content/minotaur";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES, scenePlanes } from "@/content/media";

export const metadata: Metadata = {
  title: "Minotaur: Validating AI Security Tests",
  description:
    "Minotaur is Mythos' internal proving ground: benchmarks with planted answers, decoys, Validity Cards and nine release gates. Every score is a floor.",
  alternates: { canonical: "/platform/validation/" },
  ...socialImage("platform-validation", "Find What We Missed. Prove What We Test — Mythos AI Security"),
};

const NEXT: NextLink[] = [
  { eyebrow: "SPINE", title: "Where validated results become claims", href: "/platform/spine" },
  { eyebrow: "Achilles", title: "The tests Minotaur checks", href: "/platform/achilles" },
  { eyebrow: "Trust & Security", title: "How we handle scope, data and disclosure", href: "/trust" },
];

const EMBER = "radial-gradient(ellipse 45% 55% at 50% 60%, rgba(208,164,90,0.45), transparent 70%)";
const c = MINOTAUR_COPY;

/** Minotaur — How Mythos Validates Itself. Launch Guide R06 (M01–M08). */
export default function ValidationPage() {
  return (
    <PageMotion>
      {/* M01 — Minotaur on a raised cliff to the right; copy left. */}
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
        current="How Mythos Validates Itself"
        primaryCta={{ label: "Read the Methodology", href: "#labyrinth-title" }}
        secondaryCta={{ label: "Explore SPINE", href: "/platform/spine" }}
        planes={scenePlanes(SCENES.minotaur, "60% 50%")}
        figure={<GuardianFigure id="minotaur" glow={EMBER} className="absolute bottom-[10%] right-[9%] h-[78%]" />}
        mobileFigure={<GuardianFigure id="minotaur" glow={EMBER} small className="relative mx-auto h-[46svh]" />}
        into="ivory"
      />

      {/* M02 */}
      <section data-surface="ivory" aria-labelledby="why-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="why-title" eyebrow={c.why.eyebrow} title={<Accent text={c.why.title} />} lede={c.why.lede} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5" data-reveal-group>
            {MINOTAUR_FAILURE_MODES.map((m) => (
              <li key={m.name} className="flex flex-col border border-rule bg-panel p-5 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{m.name}</p>
                <p className="mt-2 font-display text-xl leading-snug text-fg">{m.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{m.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-3 md:grid-cols-2" data-reveal-group>
            {[
              { group: c.today.inPlace, Icon: Check, tone: "border-state-verified" },
              { group: c.today.inDevelopment, Icon: Hourglass, tone: "border-state-stale" },
            ].map(({ group, Icon, tone }) => (
              <div key={group.label} className={`border-l-2 ${tone} bg-panel px-5 py-4`}>
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg">
                  <Icon size={13} aria-hidden="true" />
                  {group.label}
                </p>
                <ul className="mt-2 grid gap-1 text-sm text-fg-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Signature: the labyrinth of validity criteria. */}
      <Scene
        surface="navy"
        labelledBy="labyrinth-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="labyrinth-title" align="center" eyebrow={c.labyrinth.eyebrow} title={<Accent text={c.labyrinth.title} />} lede={c.labyrinth.lede} caps />
          <div className="mt-12">
            <LabyrinthCriteria criteria={MINOTAUR_CRITERIA} centre={MINOTAUR_CENTRE} />
          </div>
        </Container>
      </Scene>

      {/* M03 */}
      <section data-surface="parchment" aria-labelledby="twins-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="twins-title" eyebrow={c.twins.eyebrow} title={<Accent text={c.twins.title} />} lede={c.twins.lede} caps />
          <div className="mt-12">
            <SafeTwinCards cases={MINOTAUR_TWINS} />
          </div>
          <p className="mt-4 text-sm text-fg-muted">Illustrative cases. Inputs are described, never reproduced — corpora and answer keys stay internal.</p>
        </Container>
      </section>

      {/* M04 */}
      <section data-surface="ivory" aria-labelledby="card-title" className="py-24 lg:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="card-title" eyebrow={c.card.eyebrow} title={<Accent text={c.card.title} />} lede={c.card.lede} caps />
          <ValidityCard title="Approval-boundary scenarios" fields={MINOTAUR_CARD_FIELDS} versions={MINOTAUR_CARD_VERSIONS} />
        </Container>
      </section>

      {/* M05 */}
      <section data-surface="parchment" aria-labelledby="ledger-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="ledger-title" eyebrow={c.ledger.eyebrow} title={<Accent text={c.ledger.title} />} lede={c.ledger.lede} caps />
          <div className="mt-12">
            <OutcomeMatrix runs={MINOTAUR_RUNS} />
          </div>
        </Container>
      </section>

      {/* M06 */}
      <section data-surface="ivory" aria-labelledby="reproduction-title" className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="reproduction-title" eyebrow={c.reproduction.eyebrow} title={<Accent text={c.reproduction.title} />} lede={c.reproduction.lede} caps />
          <EvidenceTimeline events={MINOTAUR_TRAIL} caption="Version-linked trail · synthetic" />
        </Container>
      </section>

      {/* M07 */}
      <Scene
        surface="charcoal"
        labelledBy="release-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "!object-contain object-[8%_100%] opacity-55", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.75) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="release-title" eyebrow={c.release.eyebrow} title={<Accent text={c.release.title} />} lede={c.release.lede} caps />
          <div className="mt-12">
            <ReleaseGate scenarios={MINOTAUR_GATE} />
          </div>
        </Container>
      </Scene>

      {/* M08 */}
      <section data-surface="parchment" aria-labelledby="bridge-title" className="pb-16 pt-8">
        <Container>
          <SectionIntro id="bridge-title" eyebrow={c.bridge.eyebrow} title={<Accent text={c.bridge.title} />} lede={c.bridge.lede} caps />
          <NextLinks items={NEXT} />
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Ask us *how we test.*"
        body="We will walk through the method behind a result — what was checked, what was held back, and where the evidence stops."
        primary={{ label: "Talk to the team", href: "/contact?intent=general" }}
        secondary={{ label: "Explore the Platform", href: "/platform" }}
        vista="a"
      />
    </PageMotion>
  );
}
