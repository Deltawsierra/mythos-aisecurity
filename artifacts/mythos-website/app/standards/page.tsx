import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Check, Hourglass, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Standards & Control Mapping — Mapped, Never Certified",
  description:
    "Which frameworks Mythos findings are mapped to today (NIST SP 800-53, OWASP Top 10 and LLM Top 10, DoD Zero Trust), which are referenced in scoping, and where mapping ends and audit begins.",
  alternates: { canonical: "/standards/" },
  ...socialImage("standards", "Mapped to Tests and Evidence — Never Certified — Mythos AI Security"),
};

/* Per the 16 Oct resources fact-check: four mappings built (self-reported);
   everything else referenced; interoperability formats are designed. */

const LADDER = [
  { name: "Mapped", body: "Findings are tagged to the controls they touch, in four frameworks. Self-reported, not audited.", Icon: Check, tone: "border-state-verified text-state-verified-ink" },
  { name: "Referenced", body: "Frameworks scoping draws on so evidence can support your own reviews. No mapping is claimed.", Icon: Minus, tone: "border-rule text-fg-muted" },
  { name: "Certified", body: "Not offered. Mythos does not certify, attest or declare compliance with any framework.", Icon: Minus, tone: "border-state-contradicted text-state-contradicted-ink" },
];

const MAPPED = [
  { name: "NIST SP 800-53", note: "Security and privacy controls, in the sense of its risk management framework — not the NIST AI RMF." },
  { name: "OWASP Top 10", note: "Web application risks." },
  { name: "OWASP Top 10 for LLM Applications", note: "Risks specific to applications built on language models." },
  { name: "DoD Zero Trust", note: "Zero-trust reference architecture and strategy capabilities." },
];

const REFERENCED = [
  { group: "AI risk and management", items: ["NIST AI Risk Management Framework and its Generative AI Profile", "ISO/IEC 42001"] },
  { group: "Adversarial and agent threats", items: ["NIST AI 100-2 adversarial ML taxonomy", "OWASP guidance for agentic applications", "MITRE ATLAS"] },
  { group: "Secure development and response", items: ["NIST SP 800-218 / 218A (SSDF)", "NIST SP 800-61r3 (incident response)"] },
  { group: "Sector and public sector", items: ["US Treasury financial-services AI risk framework", "NYDFS Insurance Circular Letter No. 7", "OMB M-25-21 and M-25-22", "NIST critical-infrastructure AI profile", "EU Cyber Resilience Act"] },
];

const INTEROP = ["OSCAL", "W3C PROV", "CycloneDX / SPDX", "OpenTelemetry GenAI", "SCITT", "Cedar", "SPIFFE"];

/** Standards & Control Mapping — Launch Guide §04 /standards. */
export default function StandardsPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Standards & Control Mapping"
        headline="Mapped to Tests and Evidence — *Never Certified.*"
        lede="How Mythos findings relate to security and AI frameworks, and exactly where mapping ends and audit responsibility begins."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="Standards"
        secondaryCta={{ label: "What Mythos Produces", href: "/outputs" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.cliffTemple.src, className: "-right-[3%] bottom-[10%] h-[58%] w-[56%]", fit: "contain", position: "100% 100%", depth: 12, desktopOnly: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
        into="ivory"
      />

      {/* Ladder */}
      <section data-surface="ivory" aria-labelledby="ladder-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="ladder-title" eyebrow="Three different things" title={<Accent text="Mapping, reference, *certification.*" />} lede="Only the first is something Mythos does." caps />
          <ol className="mt-12 grid gap-3 md:grid-cols-3" data-reveal-group>
            {LADDER.map(({ name, body, Icon, tone }) => (
              <li key={name} className="border border-rule bg-panel p-6">
                <span className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${tone}`}>
                  <Icon size={12} aria-hidden="true" />
                  {name}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-fg">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Mapped */}
      <section data-surface="parchment" aria-labelledby="mapped-title" className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="mapped-title" eyebrow="Mapping built" title={<Accent text="Four frameworks, *touched not satisfied.*" />} caps />
            <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
              A mapped control is one a finding touches — never one Mythos marks as satisfied. Findings that fit no control are listed as unmapped rather than forced in, and
              they keep their original CWE and MITRE references.
            </p>
          </div>
          <ul className="divide-y divide-rule border-y border-rule" data-reveal-group>
            {MAPPED.map((m) => (
              <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <span className="font-display text-2xl text-fg">{m.name}</span>
                <span className="border border-state-verified px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-state-verified-ink">Mapping built</span>
                <span className="w-full text-sm text-fg-muted">{m.note}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Referenced */}
      <Scene
        surface="navy"
        labelledBy="referenced-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="referenced-title" eyebrow="Referenced in scoping" title={<Accent text="Frameworks we *draw on.*" />} lede="Named so evidence can be organized for your reviews. Not mapped, aligned or certified." caps />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {REFERENCED.map((g) => (
              <div key={g.group} className="border border-rule bg-panel p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">{g.group}</p>
                <ul className="mt-4 grid gap-2.5 text-[15px] leading-relaxed text-fg">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Scene>

      {/* Interop + not listed */}
      <section data-surface="ivory" aria-labelledby="interop-title" className="pb-16 pt-8">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro id="interop-title" eyebrow="Designed to interoperate" title={<Accent text="Open formats, *by design.*" />} lede="Evidence is designed to travel in these formats. Interoperability is specified, not yet built." caps />
            <ul className="mt-8 flex flex-wrap gap-2">
              {INTEROP.map((f) => (
                <li key={f} className="inline-flex items-center gap-1.5 border border-rule bg-panel px-3 py-1.5 text-[13px] text-fg">
                  <Hourglass size={12} aria-hidden="true" className="text-state-stale-ink" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-rule bg-panel p-8 lg:mt-[4.5rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Not listed, on purpose</p>
            <p className="mt-3 text-[15px] leading-relaxed text-fg">
              SOC 2, ISO/IEC 27001, PCI DSS, HIPAA, HITRUST, GDPR, CMMC and FedRAMP are not mapped. A supplier’s SOC 2 report can be recorded as declared evidence about that
              supplier — never as a Mythos result.
            </p>
          </div>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Evidence *your reviewers can map.*"
        secondary={{ label: "Read the Glossary", href: "/glossary" }}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
