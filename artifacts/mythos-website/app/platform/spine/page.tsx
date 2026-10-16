import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { InnerHero } from "@/components/sections/InnerHero";
import { HeroArt } from "@/components/sections/HeroArt";
import { SectionBlend } from "@/components/sections/SectionBlend";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { AssuranceGraph } from "@/components/platform/AssuranceGraph";
import { EvidenceStates } from "@/components/platform/EvidenceStates";
import { AuthorityChain } from "@/components/platform/AuthorityChain";
import { ChangeFlow } from "@/components/platform/ChangeFlow";
import { ExposurePreview } from "@/components/platform/ExposurePreview";
import {
  DecisionStates,
  EvidenceLadder,
  PolicyEffects,
  ReceiptCard,
  UnknownCard,
} from "@/components/platform/SpineBlocks";
import { SPINE_COPY } from "@/content/spine";
import { SPINE_CORE_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "SPINE — The AI Assurance System of Record",
  description:
    "SPINE keeps AI assurance claims tied to the configuration they were true of, tracks authority from person to effect, and reopens conclusions when a change invalidates them — with signed, tamper-evident receipts.",
  alternates: { canonical: "/platform/spine/" },
};

const NEXT: NextLink[] = [
  {
    eyebrow: "Economic Exposure",
    title: "What a validated failure could mean financially",
    href: "/platform/economic-exposure",
  },
  {
    eyebrow: "Evidence & Receipts",
    title: "Claims, receipts and decisions you can verify",
    href: "/platform/evidence",
  },
  {
    eyebrow: "Continuous Assurance",
    title: "Keeping conclusions current as the system changes",
    href: "/platform/continuous-assurance",
  },
];

/** SPINE — Maintain the Truth (blueprint Section 7, highest-priority page). */
export default function SpinePage() {
  const c = SPINE_COPY;
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
        current="SPINE"
        secondaryCta={{ label: "Explore Economic Exposure", href: "/platform/economic-exposure" }}
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

      <section data-surface="bone" aria-labelledby="why-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="why-title" eyebrow={c.why.eyebrow} title={c.why.title} lede={c.why.lede} />
          <ul className="mt-12 grid gap-3 lg:grid-cols-3" data-reveal-group>
            {c.why.pillars.map((pillar, i) => (
              <li key={pillar.name} className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)]">
                <span className="font-display text-4xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-display text-2xl leading-tight text-fg">{pillar.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{pillar.body}</p>
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

      <section data-surface="navy" aria-labelledby="graph-title" className="relative overflow-hidden pb-24 pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/transitions/transition-bronze-particles.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
        />
        <Container className="relative">
          <SectionIntro id="graph-title" align="center" eyebrow={c.graph.eyebrow} title={c.graph.title} lede={c.graph.lede} />
          <div className="mt-12">
            <AssuranceGraph />
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

      <section data-surface="bone" aria-labelledby="claims-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="claims-title" eyebrow={c.claims.eyebrow} title={c.claims.title} lede={c.claims.lede} />
          <EvidenceStates className="mt-12" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <EvidenceLadder />
            <div className="grid gap-6">
              <div className="border-l-2 border-accent bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)]" data-reveal>
                <p className="font-display text-2xl leading-tight text-fg">{c.claims.clocks.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{c.claims.clocks.body}</p>
              </div>
              <UnknownCard />
            </div>
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="authority-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="authority-title" eyebrow={c.authority.eyebrow} title={c.authority.title} lede={c.authority.lede} />
          <div className="mt-12">
            <PolicyEffects />
          </div>
          <div className="mt-16">
            <AuthorityChain />
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

      <section data-surface="navy" aria-labelledby="change-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="change-title" align="center" eyebrow={c.change.eyebrow} title={c.change.title} lede={c.change.lede} />
          <div className="mx-auto mt-12 grid max-w-4xl gap-3 md:grid-cols-2" data-reveal-group>
            {[c.change.supersedes, c.change.invalidates].map((rel) => (
              <div key={rel.name} className="border border-rule bg-panel p-6">
                <p className="font-mono text-sm font-semibold tracking-[0.12em] text-antique-gold">{rel.name}</p>
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
      </section>

      <SectionBlend
        from="navy"
        to="bone"
        layers={[
          { art: "dark-clouds", opacity: 0.6, drift: 50 },
          { art: "ivory-clouds", opacity: 0.85, drift: -70 },
        ]}
      />

      <section data-surface="bone" aria-labelledby="decisions-title" className="pb-24 pt-6">
        <Container>
          <SectionIntro id="decisions-title" eyebrow={c.decisions.eyebrow} title={c.decisions.title} lede={c.decisions.lede} />
          <div className="mt-12">
            <DecisionStates />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="receipts-title" className="border-t border-rule py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionIntro id="receipts-title" eyebrow={c.evidence.eyebrow} title={c.evidence.title} lede={c.evidence.lede} />
            <ul className="mt-10 grid gap-3" data-reveal-group>
              {c.evidence.packets.map((packet) => (
                <li key={packet.name} className="flex gap-4 border border-rule bg-panel p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={packet.icon} alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
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

      <section data-surface="bone" aria-labelledby="economics-title" className="border-t border-rule py-24">
        <Container>
          <SectionIntro id="economics-title" eyebrow={c.economics.eyebrow} title={c.economics.title} lede={c.economics.lede} />
          <div className="mt-12" data-reveal>
            <ExposurePreview />
          </div>
        </Container>
      </section>

      <section data-surface="bone" aria-labelledby="next-title" className="border-t border-rule pb-24 pt-24">
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
        title="See what SPINE keeps true about your AI."
        secondary={{ label: "See Evidence & Receipts", href: "/platform/evidence" }}
      />
    </PageMotion>
  );
}
