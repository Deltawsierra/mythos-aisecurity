import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
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
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Pricing — Assurance That Scales With Your AI Estate",
  description:
    "Two ways to work with Mythos — a scoped assessment or continuing assurance — what determines price, what is included and the questions procurement asks. Prices are quoted after scoping.",
  alternates: { canonical: "/pricing/" },
};

/*
 * Pricing (Launch Guide §13). The price book is not signed (decision D03), so
 * no figure, tier name or engagement name is published — only pathways,
 * scoping dimensions, inclusions and the guide's non-numeric FAQ.
 */

const ASSESSMENT = { label: "Request Assessment", href: "/contact?intent=assessment" };
const ANNUAL = { label: "Discuss Annual Assurance", href: "/contact?intent=assessment" };

const PATHWAYS = [
  {
    name: "Scoped assessment",
    lede: "One defined AI system or workflow, one decision to support.",
    points: ["A written scope and authorization", "Mapping, testing and recorded evidence", "Findings, a remediation plan and one retest", "Decision support for your release owner"],
    cta: ASSESSMENT,
  },
  {
    name: "Continuing assurance",
    lede: "For systems that keep changing after the first assessment.",
    points: ["Priced by systems under assurance", "Reassessment when agreed changes happen", "Targeted retests rather than starting over", "Evidence kept current between reviews"],
    cta: ANNUAL,
  },
];

const DIMENSIONS = [
  { name: "Systems and workflows", body: "How many AI systems, and how many workflows within them." },
  { name: "People, roles and tools", body: "Users, roles, tools and the actions those tools can take." },
  { name: "Model routes", body: "Providers, models and fallbacks behind each workflow." },
  { name: "Data sources and sensitivity", body: "What the AI can read, and how sensitive it is." },
  { name: "Evidence required", body: "What your reviewers need to see, including any regulatory controls in scope." },
  { name: "Testing and retest cadence", body: "Test volume, retests and — for continuing assurance — how often changes are reassessed." },
];

const INCLUDED: { name: string; assessment: boolean; continuing: boolean }[] = [
  { name: "Written scope and authorization", assessment: true, continuing: true },
  { name: "System and access mapping", assessment: true, continuing: true },
  { name: "Behavior and permission testing", assessment: true, continuing: true },
  { name: "Evidence pack and receipts", assessment: true, continuing: true },
  { name: "Remediation guidance", assessment: true, continuing: true },
  { name: "Retest", assessment: true, continuing: true },
  { name: "Evidence states kept current after changes", assessment: false, continuing: true },
];

const EXPANSIONS = [
  "An additional system or workflow",
  "Another vendor route or toolset",
  "A further test or retest sprint",
  "An executive briefing",
  "Regulated-review evidence packaging",
  "Physical AI horizon work — only if separately scoped and technically reviewed",
];

const FAQ = [
  { q: "Why aren’t prices listed?", a: "Because every engagement is scoped first. You get a quote after a scoping conversation, based on the factors on this page." },
  { q: "Can we start with one assessment?", a: "Yes. A scoped assessment defines the systems, workflows, evidence needs and authorization boundaries for a specific review decision." },
  { q: "What changes under ongoing assurance?", a: "Recurring work revisits significant changes in models, prompts, data sources, tools, permissions and business workflows, with targeted retesting where relevant." },
  { q: "Do you certify AI as safe?", a: "No. Mythos provides evidence, testing, findings and decision support within an agreed scope. It does not guarantee safety or issue an independent regulatory certification." },
  { q: "What determines price?", a: "System count, workflow complexity, role and tool access, data sensitivity, deployment conditions, required evidence, test volume and retest cadence." },
  { q: "Can you support a regulated or high-consequence environment?", a: "The scope can include high-assurance needs, additional review and evidence requirements; applicable deployment constraints are decided during scoping." },
  { q: "Is Hermes physical AI certification included?", a: "No. Physical AI scope must be defined and technically reviewed; Mythos does not promise vehicle safety certification." },
];

const PROOF: NextLink[] = [
  { eyebrow: "Example Report", title: "A synthetic report, section by section", href: "/example-report" },
  { eyebrow: "What Mythos Produces", title: "Nine outputs and their maturity", href: "/outputs" },
  { eyebrow: "How Engagement Starts", title: "From inquiry to evidence", href: "/engagement" },
];

/** Pricing — Launch Guide §13, without figures until the price book is signed. */
export default function PricingPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Pricing"
        headline="Assurance That Scales With *Your AI Estate.*"
        lede="Start with one defined system or workflow. Expand assurance as models, tools, permissions and business consequence grow. Every engagement begins with a scoped review and a clear evidence plan."
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

      {/* Pathways */}
      <section data-surface="ivory" aria-labelledby="paths-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="paths-title" eyebrow="Two ways to start" title={<Accent text="An assessment, *or assurance that continues.*" />} lede="Prices are quoted after a scoping conversation." caps />
          <ul className="mt-12 grid gap-4 lg:grid-cols-2" data-reveal-group>
            {PATHWAYS.map((p) => (
              <li key={p.name} className="flex flex-col border border-antique-gold/40 bg-panel p-8 shadow-[0_30px_60px_-44px_rgba(22,26,28,0.55)]">
                <p className="display-caps font-display text-3xl text-fg">{p.name}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-fg-muted">{p.lede}</p>
                <ul className="mt-6 grid gap-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[15px] text-fg">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-state-verified-ink" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <p className="mb-4 text-sm font-semibold text-fg">Quoted after scoping</p>
                  <Button href={p.cta.href} variant="primary" size="lg" arrow>
                    {p.cta.label}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What determines price */}
      <section data-surface="parchment" aria-labelledby="dimensions-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="dimensions-title" eyebrow="What determines price" title={<Accent text="Scope, *not scan counts.*" />} caps />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {DIMENSIONS.map((d) => (
              <li key={d.name} className="border border-rule bg-panel p-6">
                <p className="font-display text-2xl text-fg">{d.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{d.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Included */}
      <Scene
        surface="navy"
        labelledBy="included-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="included-title" eyebrow="What is included" title={<Accent text="The same evidence, *kept current.*" />} caps />
            <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">Optional scope can be added to either pathway:</p>
            <ul className="mt-3 grid gap-1.5 text-[15px] text-fg">
              {EXPANSIONS.map((e) => (
                <li key={e} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">What each pathway includes</caption>
            <thead>
              <tr className="border-b border-rule text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                <th scope="col" className="py-3 pr-4 font-semibold">Included</th>
                <th scope="col" className="w-28 py-3 text-center font-semibold">Assessment</th>
                <th scope="col" className="w-28 py-3 text-center font-semibold">Continuing</th>
              </tr>
            </thead>
            <tbody>
              {INCLUDED.map((row) => (
                <tr key={row.name} className="border-b border-rule">
                  <th scope="row" className="py-3.5 pr-4 text-[15px] font-normal text-fg">
                    {row.name}
                  </th>
                  {[row.assessment, row.continuing].map((on, i) => (
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
          <Faq items={FAQ} />
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Tell us your systems, *scope and evidence needs.*"
        body="Ask for a scoped assessment or for continuing-assurance scoping."
        primary={ASSESSMENT}
        secondary={ANNUAL}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
