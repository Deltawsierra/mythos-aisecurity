import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import { Ban, Check } from "lucide-react";
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
import { ADDITIONAL_WORK, MOTIONS, NOT_INCLUDED, ONE_WORKFLOW, PRICING_FAQ, PRICING_HERO, QUOTE_FACTORS, QUOTE_RULES, STARTING_OFFER } from "@/content/pricing";
import { BACKDROPS, SCENES, scenePlanes } from "@/content/media";

export const metadata: Metadata = {
  title: "Pricing: AI Workflow Assessment from USD 15,000",
  description:
    "The AI Workflow Assessment and Repair Retest starts at USD 15,000: one workflow, evidence-backed findings and a retest of the agreed fixes, at a fixed price agreed before testing.",
  alternates: { canonical: "/pricing/" },
  ...socialImage("pricing", "Start With One AI Workflow — Mythos AI Security"),
};

/*
 * Pricing, rebuilt 27 Oct 2026 around the approved starting offer — see the
 * header of content/pricing.ts for what is held back until approved.
 */

const QUOTE = { label: "Request a Scoped Quote", href: "/contact?intent=assessment" };

const PROOF: NextLink[] = [
  { eyebrow: "Example Report", title: "A synthetic report, section by section", href: "/example-report" },
  { eyebrow: "How Engagement Starts", title: "From inquiry to evidence", href: "/engagement" },
  { eyebrow: "AI Risk in Plain English", title: "Is Mythos AI Security right for us?", href: "/ai-risk-explained" },
];

/** Pricing — the AI Workflow Assessment and Repair Retest. */
export default function PricingPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow={PRICING_HERO.eyebrow}
        headline={PRICING_HERO.headline}
        lede={PRICING_HERO.lede}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Pricing"
        primaryCta={QUOTE}
        secondaryCta={{ label: "What Changes the Quote", href: "#factors" }}
        planes={scenePlanes(SCENES.pricing, "60% 50%")}
        into="ivory"
      />

      {/* The starting offer */}
      <section data-surface="ivory" aria-labelledby="offer-title" className="pb-24 pt-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col border border-antique-gold/50 bg-panel p-7 shadow-[0_30px_60px_-46px_rgba(22,26,28,0.55)] sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">The starting offer</p>
              <h2 id="offer-title" className="mt-3 font-display text-[2.1rem] leading-tight text-fg sm:text-[2.6rem]">
                {STARTING_OFFER.name}
              </h2>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
                <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-fg-muted">From</span>
                <span className="font-display text-[3.4rem] leading-none text-fg lining-nums">{STARTING_OFFER.price}</span>
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted">{STARTING_OFFER.priceNote}</p>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-fg">{STARTING_OFFER.statement}</p>
              <div className="mt-8">
                <Button href={QUOTE.href} variant="primary" arrow>
                  {QUOTE.label}
                </Button>
              </div>
            </div>
            <div className="border border-rule p-7 sm:p-9">
              <h3 className="font-display text-[1.9rem] leading-tight text-fg">The starting scope</h3>
              <ul className="mt-6 grid gap-3" data-reveal-group>
                {STARTING_OFFER.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[16px] leading-relaxed text-fg">
                    <Check size={17} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-rule pt-5 text-[15px] leading-relaxed text-fg-muted">{STARTING_OFFER.fit}</p>
            </div>
          </div>

          <div className="mt-20">
            <SectionIntro id="outputs-title" eyebrow="What you receive" title={<Accent text="Six outputs, *one decision.*" />} lede="Mythos AI Security recommends; your release owner decides. The engagement never depends on a favorable finding." caps />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
              {STARTING_OFFER.outputs.map((o, i) => (
                <li key={o.name} className="border border-rule bg-panel p-6">
                  <span className="font-display text-2xl leading-none text-accent lining-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-display text-[1.5rem] leading-snug text-fg">{o.name}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* One workflow */}
      <section data-surface="parchment" aria-labelledby="workflow-title" className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionIntro id="workflow-title" eyebrow="The unit of work" title={<Accent text={ONE_WORKFLOW.title} />} lede={ONE_WORKFLOW.body} caps />
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Not one workflow</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ONE_WORKFLOW.not.map((x) => (
                <li key={x} className="border border-rule bg-panel px-3 py-1.5 text-[14px] text-fg">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 border-antique-gold bg-panel p-7 lg:mt-[4.5rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{ONE_WORKFLOW.example.label}</p>
            <p className="mt-3 font-display text-[1.6rem] leading-snug text-fg">{ONE_WORKFLOW.example.is}</p>
            <p className="mt-4 text-[16px] leading-relaxed text-fg-muted">{ONE_WORKFLOW.example.excluded}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-fg-muted">{ONE_WORKFLOW.example.separate}</p>
          </div>
        </Container>
      </section>

      {/* What changes a quote */}
      <section id="factors" data-surface="ivory" aria-labelledby="factors-title" className="scroll-mt-20 py-24">
        <Container>
          <SectionIntro
            id="factors-title"
            eyebrow="What changes your quote"
            title={<Accent text="Scope, *not scan counts.*" />}
            lede="Final pricing depends on what is in scope, how it connects, and the evidence and testing it needs. Each engagement gets a fixed scope, deliverables, retest allowance and price before testing begins."
            caps
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {QUOTE_FACTORS.map((f) => (
              <li key={f.name} className="border border-rule bg-panel p-6">
                <p className="font-display text-2xl text-fg">{f.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{f.body}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {QUOTE_RULES.map((r) => (
              <li key={r} className="flex items-start gap-3 text-[15px] leading-relaxed text-fg">
                <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                {r}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The three offers */}
      <Scene
        surface="navy"
        labelledBy="motions-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro
            id="motions-title"
            eyebrow="Beyond the first assessment"
            title={<Accent text="Three offers, *kept distinct.*" />}
            lede="Testing, a release decision and runtime enforcement are different promises. Each is scoped on its own, and only the assessment has a published starting price."
            caps
          />
          <ol className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal-group>
            {MOTIONS.map((m, i) => (
              <li key={m.id} className="flex flex-col border border-rule bg-panel p-7">
                <span className="font-display text-3xl leading-none text-champagne lining-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="display-caps mt-4 font-display text-3xl text-fg">{m.name}</p>
                <p className="mt-1 text-[15px] font-semibold text-fg">{m.lede}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{m.body}</p>
                <p className="mt-auto border-t border-rule pt-4 text-sm font-semibold text-champagne">{m.price}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">Scoped and quoted separately</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ADDITIONAL_WORK.map((x) => (
              <li key={x} className="border border-rule bg-panel px-3 py-1.5 text-[14px] text-fg">
                {x}
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {/* Not included + proof */}
      <section data-surface="parchment" aria-labelledby="excluded-title" className="pb-24 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro id="excluded-title" eyebrow="Know the limits" title={<Accent text="Outside the *base engagement.*" />} lede="A scoped assessment gives evidence about what was tested. It does not find every weakness or guarantee future results." caps />
          </div>
          <ul className="grid content-start gap-2.5 sm:grid-cols-2 lg:pt-[4.5rem]" data-reveal-group>
            {NOT_INCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-3 border border-rule bg-panel px-4 py-3 text-[15px] leading-relaxed text-fg">
                <Ban size={15} aria-hidden="true" className="mt-1 shrink-0 text-state-contradicted-ink" />
                {x}
              </li>
            ))}
          </ul>
        </Container>
        <Container className="mt-20">
          <SectionIntro id="proof-title" eyebrow="Before you buy" title={<Accent text="Inspect *what you would get.*" />} lede="Every example is a labelled synthetic fixture." caps />
          <NextLinks items={PROOF} />
        </Container>
      </section>

      <section data-surface="ivory" aria-labelledby="faq-title" className="pb-16 pt-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="faq-title" eyebrow="Procurement questions" title={<Accent text="Asked *before every engagement.*" />} caps />
          <Faq items={PRICING_FAQ} />
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Make your next AI decision *with evidence.*"
        body="Tell us the workflow, what it can reach or do, and the decision your team is preparing to make. We will confirm the fit and send a fixed quote."
        primary={QUOTE}
        secondary={{ label: "Talk to an Expert", href: "/contact?intent=general" }}
        vista="c"
      />
    </PageMotion>
  );
}
