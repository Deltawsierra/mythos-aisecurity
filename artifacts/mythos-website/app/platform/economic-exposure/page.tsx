import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { ExposureChain } from "@/components/platform/ExposureChain";
import { ExposureBands } from "@/components/platform/ExposureBands";
import { ExposurePreview } from "@/components/platform/ExposurePreview";
import { SensitivityGrid } from "@/components/platform/SensitivityGrid";
import { RecordCard } from "@/components/platform/RecordCard";
import { Faq } from "@/components/platform/Faq";
import {
  EE_BANDS,
  EE_COPY,
  EE_DICTIONARY,
  EE_FACTORS,
  EE_FAQ,
  EE_GRADES,
  EE_LOOKUP,
  EE_OPTIONS,
  EE_RECEIPT,
  EE_SCENARIOS,
  EE_SOURCE_TYPES,
  EE_VALIDITY,
} from "@/content/economicExposure";
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "SPINE Economic Exposure — Evidence-Backed Business Decisions",
  description:
    "SPINE Economic Exposure is designed to connect verified AI findings to scenario-based exposure ranges, remediation economics and reviewer-approved receipts — never an exact loss or a guaranteed return.",
  alternates: { canonical: "/platform/economic-exposure/" },
  ...socialImage("platform-economic-exposure", "Evidence-Backed Economic Exposure. Better Business Decisions — Mythos AI Security"),
};

const INQUIRY = "/contact?intent=general";
const c = EE_COPY;

/** SPINE Economic Exposure — Launch Guide R08 (E01–E08). */
export default function EconomicExposurePage() {
  return (
    <PageMotion>
      {/* E01 — the treasury in warm light; no dollar headline. */}
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
        current="Economic Exposure"
        primaryCta={{ label: "Explore a Modeled Example", href: "#bands-title" }}
        secondaryCta={{ label: "Speak to Mythos", href: INQUIRY }}
        planes={[
          { src: "/assets/industries/financial-services-hero.webp", className: "-inset-[3%]", position: "75% 40%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
        into="parchment"
      />

      {/* E02 */}
      <section data-surface="parchment" aria-labelledby="chain-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="chain-title" eyebrow={c.chain.eyebrow} title={<Accent text={c.chain.title} />} lede={c.chain.lede} caps />
          <div className="mt-12">
            <ExposureChain scenarios={EE_SCENARIOS} />
          </div>
        </Container>
      </section>

      {/* E03 */}
      <section data-surface="ivory" aria-labelledby="inputs-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="inputs-title" eyebrow={c.inputs.eyebrow} title={<Accent text={c.inputs.title} />} lede={c.inputs.lede} caps />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Source types</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2" data-reveal-group>
                {EE_SOURCE_TYPES.map((s) => (
                  <li key={s.name} className="border border-rule bg-panel px-4 py-3">
                    <p className="font-semibold text-fg">{s.name}</p>
                    <p className="mt-0.5 text-sm text-fg-muted">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Confidence grades</p>
                <ol className="mt-3 grid gap-2">
                  {EE_GRADES.map((g) => (
                    <li key={g.grade} className="flex items-start gap-4 border border-rule bg-panel px-4 py-3">
                      <span className="font-display text-3xl leading-none text-accent">{g.grade}</span>
                      <span>
                        <span className="block font-semibold text-fg">{g.name}</span>
                        <span className="block text-sm text-fg-muted">{g.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <details className="group border border-rule bg-panel">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-fg [&::-webkit-details-marker]:hidden">
                  Data dictionary
                  <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <dl className="divide-y divide-rule border-t border-rule">
                  {EE_DICTIONARY.map((d) => (
                    <div key={d.term} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-2.5 text-sm">
                      <dt className="font-semibold text-fg">{d.term}</dt>
                      <dd className="text-fg-muted">{d.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {/* E04 */}
      <section data-surface="parchment" aria-labelledby="bands-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="bands-title" eyebrow={c.bands.eyebrow} title={<Accent text={c.bands.title} />} lede={c.bands.lede} caps />
          <div className="mt-12" data-reveal>
            <ExposureBands sets={EE_BANDS} unit="$" axisMax={10} caption="Refunds beyond approval · modeled loss range" />
          </div>
        </Container>
      </section>

      {/* E05 */}
      <section data-surface="ivory" aria-labelledby="remediation-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="remediation-title" eyebrow={c.remediation.eyebrow} title={<Accent text={c.remediation.title} />} lede={c.remediation.lede} caps />
          <div className="mt-12" data-reveal>
            <ExposurePreview compact />
          </div>
          <div className="mt-6 overflow-x-auto border border-rule bg-panel" data-reveal>
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="border-b border-rule px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                Two remediation options · synthetic example
              </caption>
              <thead>
                <tr className="border-b border-rule">
                  <th scope="col" className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Measure</th>
                  {EE_OPTIONS.columns.map((col) => (
                    <th key={col} scope="col" className="px-5 py-3 font-display text-lg font-medium text-fg">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {EE_OPTIONS.rows.map((r) => (
                  <tr key={r.metric}>
                    <th scope="row" className="px-5 py-3 font-normal text-fg">{r.metric}</th>
                    {r.values.map((v, k) => (
                      <td key={k} className="px-5 py-3 font-semibold tabular-nums text-fg">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">{EE_OPTIONS.note}</p>
        </Container>
      </section>

      {/* E06 */}
      <Scene
        surface="navy"
        labelledBy="sensitivity-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="sensitivity-title" eyebrow={c.sensitivity.eyebrow} title={<Accent text={c.sensitivity.title} />} lede={c.sensitivity.lede} caps />
          <div className="mt-12">
            <SensitivityGrid factors={EE_FACTORS} lookup={EE_LOOKUP} unit="$" initial={[1, 1, 0]} axisMax={12} />
          </div>
          <p className="mt-4 text-sm text-fg-muted">A lookup into fixed synthetic results — not a model running in your browser.</p>
        </Container>
      </Scene>

      {/* E07 */}
      <section data-surface="parchment" aria-labelledby="receipt-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="receipt-title" eyebrow={c.receipt.eyebrow} title={<Accent text={c.receipt.title} />} lede={c.receipt.lede} caps />
          <div className="mt-12 grid gap-6 lg:grid-cols-2" data-reveal-group>
            <RecordCard
              kind="Financial Exposure Receipt · synthetic"
              title="Refunds beyond approval"
              rows={EE_RECEIPT}
              visible={6}
              footer="Not a certification, a materiality finding or an actuarial estimate. Signing is planned."
            />
            <RecordCard
              kind="Financial Validity Card · synthetic"
              title="What this range rests on"
              rows={EE_VALIDITY}
              visible={6}
              icon="/assets/evidence/evidence-pack.svg"
              footer="A range is only as strong as its grade and the shares above it."
            />
          </div>
        </Container>
      </section>

      {/* E08 */}
      <section data-surface="ivory" aria-labelledby="board-title" className="pb-16 pt-24">
        <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionIntro id="board-title" eyebrow={c.board.eyebrow} title={<Accent text={c.board.title} />} caps />
          <Faq items={EE_FAQ} />
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Discuss exposure *on one of your systems.*"
        body="A scoped conversation about one AI system: what was observed, what it could mean financially, and what we would need to say it with confidence."
        primary={{ label: "Speak to Mythos", href: INQUIRY }}
        secondary={{ label: "See Financial Services", href: "/solutions/financial-services-insurance" }}
        layers={[
          { src: OLYMPUS_MEDIA.marbleCity.src, className: "object-[70%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunbeams, blend: "screen", opacity: 0.5, className: "object-[85%_0%]" },
        ]}
      />
    </PageMotion>
  );
}
