import Link from "next/link";
import { ArrowRight, Compass, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { RecordCard } from "@/components/platform/RecordCard";
import { StatePill } from "@/components/platform/StatePill";
import { WorkflowPath } from "@/components/use-cases/WorkflowPath";
import type { UseCaseContent } from "@/components/use-cases/types";
import { INDUSTRIES } from "@/content/industries";
import { PROJECTS } from "@/content/platform";
import { BACKDROPS, OLYMPUS_MEDIA } from "@/content/media";

const PRODUCT_HREF = Object.fromEntries(PROJECTS.map((p) => [p.name, p.href]));

const APPROACH = [
  { key: "athena", product: "Athena", heading: "Maps what it can reach" },
  { key: "achilles", product: "Achilles", heading: "Tests what it does" },
  { key: "spine", product: "SPINE", heading: "Keeps the evidence current" },
] as const;

/**
 * Shared use-case page (Launch Guide §10). Every example on it is synthetic
 * and labelled as such; strategic-horizon pages carry a visible guardrail.
 */
export function UseCasePage({ c, prev, next }: { c: UseCaseContent; prev?: UseCaseContent; next?: UseCaseContent }) {
  const industries = c.industries.map((s) => INDUSTRIES.find((i) => i.slug === s)).filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <PageMotion>
      <ScenicHero
        eyebrow={`Use case ${String(c.number).padStart(2, "0")} · ${c.title}`}
        headline={c.question}
        lede={c.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Use Cases", href: "/use-cases" },
        ]}
        current={c.title}
        secondaryCta={{ label: "All Use Cases", href: "/use-cases" }}
        planes={c.planes}
        longHeadline
        into="ivory"
      />

      {c.horizon && (
        <section data-surface="ivory" aria-label={c.horizon.label} className="pt-4">
          <Container>
            <p className="flex items-start gap-3 border-l-2 border-state-stale bg-panel px-5 py-4 text-[15px] leading-relaxed text-fg">
              <Compass size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-state-stale-ink" />
              <span>
                <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-state-stale-ink">{c.horizon.label}</span>
                {c.horizon.guardrail}
              </span>
            </p>
          </Container>
        </section>
      )}

      {/* The workflow */}
      <section data-surface="ivory" aria-labelledby="workflow-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="workflow-title" eyebrow="The workflow" title={<Accent text={c.workflow.title} />} lede={c.workflow.lede} caps />
          <WorkflowPath steps={c.workflow.steps} boundaryBefore={c.workflow.boundaryBefore} boundaryLabel={c.workflow.boundaryLabel} className="mt-16" />
        </Container>
      </section>

      {/* What can go wrong */}
      <section data-surface="parchment" aria-labelledby="wrong-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro id="wrong-title" eyebrow="What can go wrong" title={<Accent text={c.wrong.title} />} lede={c.wrong.lede} caps />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {c.wrong.items.map((w) => (
              <li key={w.name} className="border border-rule bg-panel p-6">
                <TriangleAlert size={18} aria-hidden="true" className="text-state-contradicted-ink" />
                <p className="mt-3 font-display text-2xl leading-tight text-fg">{w.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Test and authority boundaries */}
      <Scene
        surface="navy"
        labelledBy="approach-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "parchment", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "ivory", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container>
          <SectionIntro id="approach-title" eyebrow="How Mythos AI Security tests it" title={<Accent text={c.approach.title} />} lede={c.approach.lede} caps />
          <ol className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal-group>
            {APPROACH.map((a) => (
              <li key={a.key} className="flex flex-col border border-rule bg-panel p-6">
                <Link href={PRODUCT_HREF[a.product] ?? "/platform"} className="group inline-flex items-center gap-2 self-start">
                  <span className="display-caps font-display text-2xl text-champagne">{a.product}</span>
                  <ArrowRight size={15} aria-hidden="true" className="text-champagne transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-muted">{a.heading}</p>
                <ul className="mt-4 grid gap-2.5 text-[15px] leading-relaxed text-fg">
                  {c.approach[a.key].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Scene>

      {/* Evidence and outcomes */}
      <section data-surface="ivory" aria-labelledby="evidence-title" className="pb-24 pt-8">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionIntro id="evidence-title" eyebrow="Evidence and outcomes" title={<Accent text={c.evidence.title} />} lede={c.evidence.lede} caps />
            <ul className="mt-10 divide-y divide-rule border-y border-rule" data-reveal-group>
              {c.evidence.claims.map((cl) => (
                <li key={cl.claim} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-x-6">
                  <span className="font-display text-xl leading-snug text-fg">{cl.claim}</span>
                  <StatePill state={cl.state} label={cl.label} className="justify-self-start sm:justify-self-end" />
                  <span className="text-sm text-fg-muted sm:col-span-2">{cl.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-fg-muted">Illustrative claims · synthetic data</p>
          </div>
          <div className="lg:pt-24">
            <RecordCard kind={c.evidence.receipt.kind} title={c.evidence.receipt.title} rows={c.evidence.receipt.rows} footer={c.evidence.receipt.footer} visible={6} />
          </div>
        </Container>
      </section>

      {/* Scope limits and related industries */}
      <section data-surface="parchment" aria-labelledby="limits-title" className="pb-16 pt-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionIntro id="limits-title" eyebrow="Scope limits" title={<Accent text={c.limits.title} />} caps />
            <ul className="mt-8 grid gap-2.5 text-[15px] leading-relaxed text-fg" data-reveal-group>
              {c.limits.items.map((l) => (
                <li key={l} className="flex gap-3 border-l-2 border-rule pl-4">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Related industries</p>
            <ul className="mt-4 grid gap-3" data-reveal-group>
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/solutions/${ind.slug}`} className="group flex items-center justify-between gap-4 border border-rule bg-panel px-5 py-4 hover:border-antique-gold/60">
                    <span>
                      <span className="block font-display text-xl text-fg">{ind.name}</span>
                      <span className="block text-sm text-fg-muted">{ind.hero.headline.replaceAll("*", "")}</span>
                    </span>
                    <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            {(prev || next) && (
              <nav aria-label="More use cases" className="mt-10 grid gap-3 sm:grid-cols-2">
                {prev && (
                  <Link href={`/use-cases/${prev.slug}`} className="border border-rule px-4 py-3 text-sm text-fg-muted hover:border-accent hover:text-fg">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Previous</span>
                    {prev.title}
                  </Link>
                )}
                {next && (
                  <Link href={`/use-cases/${next.slug}`} className="border border-rule px-4 py-3 text-sm text-fg-muted hover:border-accent hover:text-fg sm:col-start-2 sm:text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Next</span>
                    {next.title}
                  </Link>
                )}
              </nav>
            )}
          </div>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Scope this workflow *with evidence.*"
        body="A scoped assessment of one workflow: what it can reach, what it does under pressure, and what to retest when it changes."
        secondary={{ label: "All Use Cases", href: "/use-cases" }}
        vista="b"
      />
    </PageMotion>
  );
}
