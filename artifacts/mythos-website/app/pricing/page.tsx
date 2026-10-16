import type { Metadata } from "next";
import { ArrowRight, Check, Hourglass, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { Faq } from "@/components/platform/Faq";
import { ASSESSMENTS, CONSULT_ASSESSMENTS, EXPAND, INCLUDED, MOTIONS, PRICING_FAQ, PRICING_HERO, QUOTE_FACTORS, SUA, TIERS } from "@/content/pricing";
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Pricing — Assurance That Scales With Your AI Estate",
  description:
    "Assess, assure, expand: scoped assessments, annual assurance priced by Systems Under Assurance, and what changes a quote. Prices are quoted after scoping.",
  alternates: { canonical: "/pricing/" },
};

/*
 * Pricing (Launch Guide §13) with the structure of the internal Pricing
 * Strategy. No figures until the price book is signed (D03) — see
 * content/pricing.ts. Names and the SUA definition are pending sign-off
 * (claim pricing.offer-structure).
 */

const ASSESSMENT = { label: "Request Assessment", href: "/contact?intent=assessment" };
const ANNUAL = { label: "Discuss Annual Assurance", href: "/contact?intent=assessment" };
const QUOTED = "Quoted after scoping";

const PROOF: NextLink[] = [
  { eyebrow: "Example Report", title: "A synthetic report, section by section", href: "/example-report" },
  { eyebrow: "What Mythos Produces", title: "Nine outputs and their maturity", href: "/outputs" },
  { eyebrow: "How Engagement Starts", title: "From inquiry to evidence", href: "/engagement" },
];

/** Pricing — Launch Guide §13. */
export default function PricingPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow={PRICING_HERO.eyebrow}
        headline={PRICING_HERO.headline}
        lede={PRICING_HERO.lede}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Pricing"
        primaryCta={ASSESSMENT}
        secondaryCta={ANNUAL}
        planes={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "-inset-[3%]", position: "60% 40%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.sunrays, className: "-inset-[3%]", blend: "screen", opacity: 0.6, position: "60% 40%", depth: 10 },
        ]}
        into="ivory"
      />

      {/* Assess → Assure → Expand */}
      <section data-surface="ivory" aria-labelledby="motions-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="motions-title" eyebrow="How pricing works" title={<Accent text="Assess. Assure. *Expand.*" />} lede="Three ways to buy, in the order most organizations use them." caps />
          <ol className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal-group>
            {MOTIONS.map((m, i) => (
              <li key={m.id} className="relative flex flex-col border border-rule bg-panel p-7">
                <span className="font-display text-3xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="display-caps mt-4 font-display text-3xl text-fg">{m.name}</p>
                <p className="mt-1 text-[15px] font-semibold text-fg">{m.lede}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{m.body}</p>
                <p className="mt-auto flex items-start gap-2 border-t border-rule pt-4 text-sm text-fg-muted">
                  <ArrowRight size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  {m.next}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* System Under Assurance */}
      <section data-surface="parchment" aria-labelledby="sua-title" className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro id="sua-title" eyebrow="The unit of assurance" title={<Accent text={SUA.title} />} caps />
            <p className="mt-6 text-[17px] leading-relaxed text-fg">{SUA.body}</p>
          </div>
          <div className="lg:pt-10">
            <ul className="grid gap-3" data-reveal-group>
              {SUA.points.map((p) => (
                <li key={p} className="border-l-2 border-accent/60 bg-panel px-5 py-4 text-[15px] leading-relaxed text-fg">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-fg-muted">{SUA.note}</p>
          </div>
        </Container>
      </section>

      {/* Assess */}
      <section data-surface="ivory" aria-labelledby="assess-title" className="py-24">
        <Container>
          <SectionIntro id="assess-title" eyebrow="Assess" title={<Accent text="Four ways *to start.*" />} lede="One defined system, one decision. Pricing is per scoped engagement." caps />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal-group>
            {ASSESSMENTS.map((a) => (
              <li key={a.name} className="flex flex-col border border-antique-gold/40 bg-panel p-6 shadow-[0_30px_60px_-46px_rgba(22,26,28,0.55)]">
                <p className="display-caps font-display text-2xl text-fg">{a.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">{a.fit}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg">You receive · </span>
                  {a.outputs}
                </p>
                <div className="mt-auto pt-6">
                  <p className="mb-3 text-sm font-semibold text-fg">{a.price ?? QUOTED}</p>
                  <Button href={ASSESSMENT.href} variant="secondary" size="sm" arrow>
                    {a.cta}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {CONSULT_ASSESSMENTS.map((c) => (
              <div key={c.name} className="border border-rule px-5 py-4">
                <p className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-xl text-fg">{c.name}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">By consultation</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Assure: annual tiers */}
      <Scene
        surface="navy"
        labelledBy="assure-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro
            id="assure-title"
            eyebrow="Assure"
            title={<Accent text="Annual assurance, *by Systems Under Assurance.*" />}
            lede="Each tier lists what is available today and what is planned. Planned items are not part of a tier until they ship."
            caps
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {TIERS.map((t) => (
              <li key={t.name} className="flex flex-col border border-rule bg-panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="display-caps font-display text-2xl text-champagne">{t.name}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">{t.scope}</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">{t.fit}</p>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg">Available today</p>
                <ul className="mt-2 grid gap-1.5 text-sm text-fg">
                  {t.available.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <Check size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-state-verified" />
                      {x}
                    </li>
                  ))}
                </ul>
                {t.planned.length > 0 && (
                  <>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">Planned</p>
                    <ul className="mt-2 grid gap-1.5 text-sm text-fg-muted">
                      {t.planned.map((x) => (
                        <li key={x} className="flex items-start gap-2">
                          <Hourglass size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-state-stale" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="mt-auto border-t border-rule pt-4 text-sm font-semibold text-fg">{t.price ?? (t.scope === "Custom" ? "Custom proposal" : QUOTED)}</p>
              </li>
            ))}
            <li className="flex flex-col justify-center border border-dashed border-champagne/40 p-6">
              <p className="font-display text-2xl text-fg">Not sure which tier?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">Start with one assessment, or tell us how many systems matter and how often they change.</p>
              <div className="mt-5">
                <Button href={ANNUAL.href} variant="primary" size="sm" arrow>
                  Talk to an Assurance Specialist
                </Button>
              </div>
            </li>
          </ul>
        </Container>
      </Scene>

      {/* Expand */}
      <section data-surface="parchment" aria-labelledby="expand-title" className="pb-24 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionIntro id="expand-title" eyebrow="Expand" title={<Accent text={EXPAND.title} />} lede={EXPAND.lede} caps />
            <ul className="mt-8 flex flex-wrap gap-2">
              {EXPAND.items.map((x) => (
                <li key={x} className="border border-rule bg-panel px-3 py-1.5 text-[14px] text-fg">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-antique-gold/50 bg-panel p-8 lg:mt-[4.5rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Design partners</p>
            <p className="mt-3 font-display text-2xl leading-snug text-fg">{EXPAND.partners}</p>
            <div className="mt-6">
              <Button href={ANNUAL.href} variant="secondary" size="sm" arrow>
                Start a Conversation
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What changes a quote */}
      <section data-surface="ivory" aria-labelledby="factors-title" className="py-24">
        <Container>
          <SectionIntro id="factors-title" eyebrow="What changes your quote" title={<Accent text="Scope, *not scan counts.*" />} lede="Every quote begins with an authorized scope and a documented evidence plan." caps />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {QUOTE_FACTORS.map((f) => (
              <li key={f.name} className="border border-rule bg-panel p-6">
                <p className="font-display text-2xl text-fg">{f.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What is included */}
      <Scene
        surface="charcoal"
        labelledBy="included-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "!object-contain object-[50%_100%] opacity-45", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.78) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="included-title" eyebrow="What is included" title={<Accent text="The same evidence, *kept current.*" />} lede="Methodology and evidence integrity are never premium extras — they come with every engagement." caps />
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">What assessments and annual assurance include</caption>
            <thead>
              <tr className="border-b border-rule text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                <th scope="col" className="py-3 pr-4 font-semibold">Included</th>
                <th scope="col" className="w-24 py-3 text-center font-semibold sm:w-28">Assess</th>
                <th scope="col" className="w-24 py-3 text-center font-semibold sm:w-28">Assure</th>
              </tr>
            </thead>
            <tbody>
              {INCLUDED.map((row) => (
                <tr key={row.name} className="border-b border-rule">
                  <th scope="row" className="py-3.5 pr-4 text-[15px] font-normal text-fg">
                    {row.name}
                  </th>
                  {[row.assess, row.assure].map((on, i) => (
                    <td key={i} className="py-3.5 text-center">
                      {on ? <Check size={17} aria-label="Included" className="mx-auto text-state-verified" /> : <Minus size={17} aria-label="Not included" className="mx-auto text-fg-muted" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Scene>

      {/* Proof + FAQ */}
      <section data-surface="ivory" aria-labelledby="proof-title" className="pb-8 pt-8">
        <Container>
          <SectionIntro id="proof-title" eyebrow="Before you buy" title={<Accent text="Inspect *what you would get.*" />} lede="Every example is a labelled synthetic fixture." caps />
          <NextLinks items={PROOF} />
        </Container>
      </section>
      <section data-surface="ivory" aria-labelledby="faq-title" className="pb-16 pt-16">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="faq-title" eyebrow="Procurement questions" title={<Accent text="Asked *before every engagement.*" />} caps />
          <Faq items={PRICING_FAQ} />
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Make your next AI decision *with evidence.*"
        body="Tell us the system you need reviewed, what it can reach or do, and the decision your team is preparing to make. We will propose an assessment or an assurance path."
        primary={ASSESSMENT}
        secondary={{ label: "Talk to an Expert", href: "/contact?intent=general" }}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
