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
import { ReceiptExplorer } from "@/components/platform/ReceiptExplorer";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import { JsonArtifact } from "@/components/platform/JsonArtifact";
import { EvidenceStates } from "@/components/platform/EvidenceStates";
import { ReportPreview } from "@/components/platform/ReportPreview";
import {
  EVIDENCE_ASSUMPTIONS,
  EVIDENCE_CLAIMS,
  EVIDENCE_COPY,
  EVIDENCE_JSON,
  EVIDENCE_OUTPUTS,
  EVIDENCE_SIGNOFF,
} from "@/content/evidence";
import { OLYMPUS_MEDIA, SCENES, scenePlanes } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Signed AI Evidence & Assurance Receipts",
  description:
    "Every claim tied to its evidence: Assurance Receipts that verify offline, and a provenance chain from observation to review. Integrity, stated plainly.",
  alternates: { canonical: "/platform/evidence/" },
  ...socialImage("platform-evidence", "Proof You Can Inspect — Mythos AI Security"),
};

const NEXT: NextLink[] = [
  { eyebrow: "SPINE", title: "The system of record behind every receipt", href: "/platform/spine" },
  { eyebrow: "Example report", title: "A full evidence pack, page by page", href: "/example-report" },
  { eyebrow: "Continuous Assurance", title: "How evidence responds when the system changes", href: "/platform/continuous-assurance" },
];

const STATUS_TONE: Record<string, string> = {
  Available: "border-state-verified text-state-verified-ink",
  "In development": "border-state-stale text-state-stale-ink",
  Planned: "border-rule text-fg-muted",
};

const c = EVIDENCE_COPY;

/** Evidence & Receipts — Launch Guide /platform/evidence (problem → mechanism → proof → links → action). */
export default function EvidencePage() {
  return (
    <PageMotion>
      {/* Book-and-receipt motif: native report pages, not screenshots. */}
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
        ]}
        current="Evidence & Receipts"
        secondaryCta={{ label: "Explore the Platform", href: "/platform" }}
        planes={scenePlanes(SCENES.evidence, "50% 50%")}
        figure={
          <div data-surface="parchment" className="absolute right-[6%] top-[24%] w-[min(40vw,36rem)] bg-transparent" data-depth="16">
            <ReportPreview />
          </div>
        }
        into="ivory"
      />

      {/* 01 Problem */}
      <section data-surface="ivory" aria-labelledby="problem-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="problem-title" eyebrow={c.problem.eyebrow} title={<Accent text={c.problem.title} />} lede={c.problem.lede} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {EVIDENCE_ASSUMPTIONS.map((a) => (
              <li key={a.name} className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]">
                <p className="font-display text-2xl leading-tight text-fg">{a.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{a.body}</p>
              </li>
            ))}
          </ul>
          <EvidenceStates className="mt-12" />
        </Container>
      </section>

      {/* 02 Mechanism — receipt explorer */}
      <section data-surface="parchment" aria-labelledby="explorer-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="explorer-title" eyebrow={c.explorer.eyebrow} title={<Accent text={c.explorer.title} />} lede={c.explorer.lede} caps />
          <div className="mt-12">
            <ReceiptExplorer claims={EVIDENCE_CLAIMS} />
          </div>
        </Container>
      </section>

      {/* Integrity + exports + sign-off */}
      <Scene
        surface="charcoal"
        labelledBy="integrity-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.cliffTemple.src, className: "!object-contain object-[92%_100%] opacity-50", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.78) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="integrity-title" eyebrow={c.integrity.eyebrow} title={<Accent text={c.integrity.title} />} lede={c.integrity.lede} caps />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">{c.outputs.eyebrow}</p>
              <ul className="mt-4 grid gap-2" data-reveal-group>
                {EVIDENCE_OUTPUTS.map((o) => (
                  <li key={o.name} className="flex items-start justify-between gap-4 border border-rule bg-panel px-4 py-3">
                    <span>
                      <span className="block font-semibold text-fg">{o.name}</span>
                      <span className="mt-0.5 block text-sm text-fg-muted">{o.body}</span>
                    </span>
                    <span className={cn("shrink-0 border bg-cream px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]", STATUS_TONE[o.status])}>{o.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            <EvidenceTimeline events={EVIDENCE_SIGNOFF} caption="From capture to export" />
          </div>
        </Container>
      </Scene>

      {/* 03 Proof — the artifact as data */}
      <section data-surface="ivory" aria-labelledby="artifact-title" className="pb-24 pt-8">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="artifact-title" eyebrow={c.artifact.eyebrow} title={<Accent text={c.artifact.title} />} lede={c.artifact.lede} caps />
          <JsonArtifact title="Assurance Receipt · synthetic" data={EVIDENCE_JSON} />
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
        title="See the evidence *behind your AI.*"
        secondary={{ label: "Explore the Platform", href: "/platform" }}
        vista="a"
      />
    </PageMotion>
  );
}
