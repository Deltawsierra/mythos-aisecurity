import Link from "next/link";
import { ArrowRight, BookOpenCheck, FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import type { IndustryContent } from "@/components/solutions/types";
import { USE_CASE_DEEP_DIVES } from "@/data/useCaseDeepDives";
import { PROJECTS } from "@/content/platform";
import { OLYMPUS_MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

const PRODUCT_HREF: Record<string, string> = {
  ...Object.fromEntries(PROJECTS.map((p) => [p.name, p.href])),
  "Economic Exposure": "/platform/economic-exposure",
};

/**
 * The shared industry page (Launch Guide Section 09): hero → risk context →
 * capability mapping → business impact as hypotheses → key use cases →
 * control alignment (mapping, never certification) → an explicitly synthetic
 * walkthrough → questions for a first conversation → closing vista.
 */
export function IndustryPage({ c }: { c: IndustryContent }) {
  const useCases = c.useCases.slugs
    .map((slug) => USE_CASE_DEEP_DIVES.find((u) => u.slug === slug))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  return (
    <PageMotion>
      {/* 01 Hero */}
      <ScenicHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        lede={c.hero.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
        current={c.name}
        primaryCta={c.hero.primaryCta}
        secondaryCta={{ label: "View Related Use Cases", href: "#usecases-title" }}
        planes={c.hero.planes}
        into="ivory"
      />

      {/* 02 Risk context */}
      <section data-surface="ivory" aria-labelledby="risks-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="risks-title" eyebrow="Where the risk sits" title={<Accent text={c.risks.title} />} lede={c.risks.lede} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {c.risks.items.map((r, i) => (
              <li key={r.name} className="border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)]">
                <span className="font-display text-3xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-2xl leading-tight text-fg">{r.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 03 Capability mapping */}
      <Scene
        surface="navy"
        labelledBy="capabilities-title"
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="capabilities-title" eyebrow="What Mythos does here" title={<Accent text={c.capabilities.title} />} lede={c.capabilities.lede} caps />
          <ul className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal-group>
            {c.capabilities.items.map((cap) => (
              <li key={cap.product} className="flex flex-col border border-rule bg-panel p-6">
                <Link href={PRODUCT_HREF[cap.product] ?? "/platform"} className="group inline-flex items-center gap-2 self-start">
                  <span className="display-caps font-display text-2xl text-champagne">{cap.product}</span>
                  <ArrowRight size={15} aria-hidden="true" className="text-champagne transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="mt-3 text-[15px] leading-relaxed text-fg">{cap.does}</p>
                <p className="mt-auto border-t border-rule pt-4 text-sm text-fg-muted">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg">Example output · </span>
                  {cap.output}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {/* 04 Business impact — hypotheses */}
      <section data-surface="parchment" aria-labelledby="impact-title" className="pb-24 pt-8">
        <Container>
          <SectionIntro id="impact-title" eyebrow="Business impact" title={<Accent text={c.impact.title} />} lede={c.impact.lede} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {c.impact.items.map((item) => (
              <li key={item.name} className="flex flex-col border border-rule bg-panel p-5">
                <span className="inline-flex items-center gap-1.5 self-start border border-state-stale px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-state-stale-ink">
                  <FlaskConical size={11} aria-hidden="true" />
                  Hypothesis
                </span>
                <p className="mt-3 font-display text-xl leading-snug text-fg">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-fg-muted">Expressed as hypotheses to measure in an engagement — not results from customers.</p>
        </Container>
      </section>

      {/* 05 Key use cases */}
      <section data-surface="ivory" aria-labelledby="usecases-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="usecases-title" eyebrow="Key use cases" title={<Accent text={c.useCases.title} />} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {useCases.map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/use-cases/${u.slug}`}
                  className="group flex h-full flex-col border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)] transition-[border-color,box-shadow] duration-500 hover:border-antique-gold/60"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Use case {String(u.number).padStart(2, "0")}</span>
                  <span className="mt-2 font-display text-2xl leading-tight text-fg">{u.title}</span>
                  <span className="mt-2 text-sm italic leading-relaxed text-fg-muted">“{u.buyerQuestion}”</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-accent">
                    Read the scenario
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 06 Control alignment */}
      <section data-surface="parchment" aria-labelledby="controls-title" className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="controls-title" eyebrow="Control alignment" title={<Accent text={c.controls.title} />} lede={c.controls.lede} caps />
          <div>
            <ul className="divide-y divide-rule border-y border-rule" data-reveal-group>
              {c.controls.items.map((item) => (
                <li key={item.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span className="font-display text-xl text-fg">{item.name}</span>
                  <span
                    className={cn(
                      "border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
                      item.status === "mapped" ? "border-state-verified text-state-verified-ink" : "border-rule text-fg-muted",
                    )}
                  >
                    {item.status === "mapped" ? "Mapping built" : "Referenced in scoping"}
                  </span>
                  <span className="w-full text-sm text-fg-muted">{item.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-sm text-fg-muted">
              <BookOpenCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
              Evidence supports your reviews against these frameworks. Mythos does not certify compliance or issue attestations.
            </p>
          </div>
        </Container>
      </section>

      {/* 07 Proof — synthetic walkthrough */}
      <Scene
        surface="charcoal"
        labelledBy="proof-title"
        layers={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_40%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "!object-contain object-[50%_100%] opacity-45", parallax: 6 },
        ]}
        scrim="linear-gradient(180deg, rgba(22,26,28,0.4) 0, rgba(22,26,28,0.88) clamp(14rem,22vw,22rem), rgba(22,26,28,0.93) 75%, rgba(22,26,28,0.78) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="proof-title" eyebrow="A walkthrough" title={<Accent text={c.proof.title} />} lede={c.proof.lede} caps />
            <p className="mt-6 border-l-2 border-champagne/60 pl-4 text-[15px] leading-relaxed text-fg">{c.proof.scenario}</p>
          </div>
          <EvidenceTimeline events={c.proof.events} caption="Illustrative scenario · synthetic data" />
        </Container>
      </Scene>

      {/* 08 First conversation */}
      <section data-surface="ivory" aria-labelledby="questions-title" className="pb-16 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="questions-title" eyebrow="A first conversation" title={<Accent text={c.questions.title} />} caps />
            <p className="mt-6 text-sm text-fg-muted">
              Typical starting point: <span className="font-semibold text-fg">{c.startingPoint}</span>
            </p>
          </div>
          <ol className="grid gap-3" data-reveal-group>
            {c.questions.items.map((q, i) => (
              <li key={q} className="flex gap-4 border border-rule bg-panel px-5 py-4">
                <span className="font-display text-xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16px] leading-relaxed text-fg">{q}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title={c.closing.title}
        body={c.closing.body}
        primary={c.hero.primaryCta}
        secondary={{ label: "All industries", href: "/solutions" }}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}

