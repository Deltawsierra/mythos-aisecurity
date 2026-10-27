import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Check, Hourglass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { OrbitFigure } from "@/components/scenic/OrbitFigure";
import { ChangeTraversal } from "@/components/platform/ChangeTraversal";
import { ChangeFlow } from "@/components/platform/ChangeFlow";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import { CA_CHANGES, CA_CLAIMS, CA_COPY, CA_EVENTS, CA_LEDGER } from "@/content/continuousAssurance";
import { OLYMPUS_MEDIA, SCENES } from "@/content/media";

export const metadata: Metadata = {
  title: "Continuous AI Assurance & Revalidation",
  description:
    "When an AI system's data, identity, model route, tools or policies change, Mythos finds the claims affected and targets the retest. No live monitoring.",
  alternates: { canonical: "/platform/continuous-assurance/" },
  ...socialImage("platform-continuous-assurance", "When AI Changes, Your Evidence Should Respond — Mythos AI Security"),
};

const NEXT: NextLink[] = [
  { eyebrow: "SPINE", title: "Change intelligence in the system of record", href: "/platform/spine" },
  { eyebrow: "Evidence & Receipts", title: "What a claim's evidence looks like", href: "/platform/evidence" },
  { eyebrow: "Pricing", title: "Scoped assessments and continuing assurance", href: "/pricing" },
];

const LEDGER_TICKER = ["09 Oct · tool manifest v8 · 2 claims stale", "11 Oct · retest · 1 contradicted", "11 Oct · decision · Needs remediation"];

const c = CA_COPY;

/** Continuous Assurance — Launch Guide /platform/continuous-assurance. */
export default function ContinuousAssurancePage() {
  return (
    <PageMotion>
      {/* A slow bronze orbit with a ledger passing through it. */}
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
        current="Continuous Assurance"
        secondaryCta={{ label: "Explore the Platform", href: "/platform" }}
        planes={[{ src: SCENES.continuousAssurance.src, mobileSrc: SCENES.continuousAssurance.phone, className: "-inset-[3%]", position: "55% 50%", depth: 6, priority: true }]}
        figure={<OrbitFigure entries={LEDGER_TICKER} className="absolute right-[6%] top-[14%] w-[min(36vw,33rem)]" />}
        mobileFigure={<OrbitFigure entries={LEDGER_TICKER} className="relative mx-auto w-72" />}
        into="ivory"
      />

      {/* 01 Problem */}
      <section data-surface="ivory" aria-labelledby="problem-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="problem-title" eyebrow={c.problem.eyebrow} title={<Accent text={c.problem.title} />} lede={c.problem.lede} caps />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
            {CA_CHANGES.map((ch) => (
              <li key={ch.name} className="border border-rule bg-panel p-5 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-bronze/40 bg-ivory text-bronze-deep">
                  <BrandIcon src={ch.icon} className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-2xl text-fg">{ch.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{ch.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 02 Mechanism */}
      <section data-surface="parchment" aria-labelledby="mechanism-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="mechanism-title" eyebrow={c.mechanism.eyebrow} title={<Accent text={c.mechanism.title} />} lede={c.mechanism.lede} caps />
          <div className="mt-12">
            <ChangeTraversal claims={CA_CLAIMS} events={CA_EVENTS} />
          </div>
          <p className="mt-4 text-sm text-fg-muted">Synthetic changes and claims.</p>
          <div className="mt-12 grid gap-3 md:grid-cols-2" data-reveal-group>
            {[
              { group: c.status.inPlace, Icon: Check, tone: "border-state-verified" },
              { group: c.status.inDevelopment, Icon: Hourglass, tone: "border-state-stale" },
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

      {/* One claim, end to end */}
      <Scene
        surface="charcoal"
        labelledBy="flow-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "!object-contain object-[90%_100%] opacity-55", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.75) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="flow-title" align="center" eyebrow={c.flow.eyebrow} title={<Accent text={c.flow.title} />} lede={c.flow.lede} caps />
          <div className="mt-14">
            <ChangeFlow />
          </div>
        </Container>
      </Scene>

      {/* 03 Proof — the change ledger */}
      <section data-surface="ivory" aria-labelledby="ledger-title" className="pb-24 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="ledger-title" eyebrow={c.ledger.eyebrow} title={<Accent text={c.ledger.title} />} lede={c.ledger.lede} caps />
          <EvidenceTimeline events={CA_LEDGER} caption="Change ledger · synthetic" />
        </Container>
      </section>

      {/* 04 Related links */}
      <section data-surface="parchment" aria-labelledby="next-title" className="pb-16 pt-24">
        <Container>
          <SectionIntro id="next-title" eyebrow={c.next.eyebrow} title={<Accent text={c.next.title} />} caps />
          <NextLinks items={NEXT} />
        </Container>
      </section>

      {/* 05 Action */}
      <ClosingVista
        from="parchment"
        title="Keep your evidence *as current as your AI.*"
        secondary={{ label: "Explore the Platform", href: "/platform" }}
        vista="a"
      />
    </PageMotion>
  );
}
