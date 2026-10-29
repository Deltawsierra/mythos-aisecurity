import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, Compass, FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { UseCaseFilter, type Facet, type FilterCard } from "@/components/use-cases/UseCaseFilter";
import { HashRedirect } from "@/components/layout/HashRedirect";
import { RISK_THEMES, USE_CASES } from "@/content/useCaseLibrary";
import { INDUSTRIES } from "@/content/industries";
import { BACKDROPS, CHALLENGE_MEDIA, OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "AI Use Cases: Deployment Risk Scenarios",
  description:
    "Eleven AI workflows, from support agents to decision support: the question each raises, what can go wrong, how Mythos AI Security tests it. Every example is synthetic.",
  alternates: { canonical: "/use-cases/" },
  ...socialImage("use-cases", "Where AI Deployment Risk Shows Up — Mythos AI Security"),
};

const plain = (s: string) => s.replaceAll("*", "");

const CORE = USE_CASES.filter((u) => !u.horizon);
const HORIZON = USE_CASES.filter((u) => u.horizon);

const CARDS: FilterCard[] = CORE.map((u) => ({
  slug: u.slug,
  number: u.number,
  title: u.title,
  question: plain(u.question),
  image: u.image,
  facets: u.facets,
}));

const FACETS: Facet[] = [
  { key: "industry", label: "Industry", options: INDUSTRIES.map((i) => ({ value: i.slug, label: i.name })) },
  { key: "product", label: "Product", options: ["Athena", "Achilles", "SPINE"].map((p) => ({ value: p, label: p })) },
  { key: "risk", label: "Risk theme", options: RISK_THEMES.map((r) => ({ value: r, label: r })) },
];

const FLOW = ["The question", "The workflow", "What can go wrong", "How Mythos AI Security tests it", "The evidence", "Scope limits"];

/** Use-case library — Launch Guide §10. */
export default function UseCasesPage() {
  return (
    <PageMotion>
      {/* v1 anchors that moved to their own pages */}
      <HashRedirect map={{ "#what-mythos-produces": "/outputs/", "#how-engagement-starts": "/engagement/" }} />
      <ScenicHero
        eyebrow="Use Cases"
        headline="Where AI Deployment Risk *Shows Up.*"
        lede="Eleven scenarios, each starting from the question a buyer has to answer about one AI workflow — and ending with what the evidence can and cannot show."
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Use Cases"
        secondaryCta={{ label: "Browse the Scenarios", href: "#library-title" }}
        planes={[
          { src: CHALLENGE_MEDIA.desktopTextSafe.src, className: "-inset-[3%]", position: "70% 40%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.35, position: "100% 0%", depth: 10 },
        ]}
        into="ivory"
      />

      {/* Library */}
      <section data-surface="ivory" aria-labelledby="library-title" className="scroll-mt-24 pb-24 pt-10">
        <Container>
          <SectionIntro
            id="library-title"
            eyebrow="The library"
            title={<Accent text="Ten workflows, *one honest method.*" />}
            lede="Filter by industry, product or risk theme. Filters update the address, so a view can be shared."
            caps
          />
          <p className="mt-6 flex items-start gap-2.5 border-l-2 border-state-stale bg-panel px-4 py-3 text-sm leading-relaxed text-fg">
            <FlaskConical size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-state-stale-ink" />
            Every finding, claim and receipt in these scenarios is synthetic. No customer, pilot or design-partner results are shown.
          </p>
          <div className="mt-10">
            <UseCaseFilter cards={CARDS} facets={FACETS} />
          </div>
        </Container>
      </section>

      {/* How each scenario reads */}
      <Scene
        surface="navy"
        labelledBy="flow-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="flow-title" align="center" eyebrow="How each scenario reads" title={<Accent text="From question *to evidence.*" />} caps />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-6" data-reveal-group>
            {FLOW.map((f, i) => (
              <li key={f} className="border border-rule bg-panel px-4 py-5 text-center">
                <span className="font-display text-2xl text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-semibold leading-snug text-fg">{f}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Scene>

      {/* Strategic horizon */}
      <section data-surface="parchment" aria-labelledby="horizon-title" className="pb-16 pt-8">
        <Container>
          <SectionIntro
            id="horizon-title"
            eyebrow="Strategic horizon"
            title={<Accent text="Questions we are *exploring, not selling.*" />}
            lede="One page describes a direction under research. It is not a service available today."
            caps
          />
          <ul className="mt-12 grid max-w-3xl gap-4" data-reveal-group>
            {HORIZON.map((u) => (
              <li key={u.slug}>
                <Link href={`/use-cases/${u.slug}`} className="group flex h-full gap-5 border border-rule bg-panel p-6 hover:border-antique-gold/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.image} alt="" aria-hidden="true" loading="lazy" className="h-16 w-16 shrink-0 object-contain" />
                  <span className="flex flex-col">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-state-stale-ink">
                      <Compass size={12} aria-hidden="true" />
                      {u.horizon!.label} · Use case {u.number}
                    </span>
                    <span className="mt-2 font-display text-2xl leading-tight text-fg">{u.title}</span>
                    <span className="mt-2 text-sm leading-relaxed text-fg-muted">{u.horizon!.guardrail}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-accent">
                      Read the page
                      <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Bring us *the workflow you are deciding about.*"
        body="A scoped assessment starts from one workflow and the decision you need to make about it."
        secondary={{ label: "How Engagement Starts", href: "/engagement" }}
        vista="b"
      />
    </PageMotion>
  );
}
