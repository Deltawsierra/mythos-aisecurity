import type { Metadata } from "next";
import { FlaskConical, Hourglass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { RecordCard } from "@/components/platform/RecordCard";
import { StatePill } from "@/components/platform/StatePill";
import { EvidenceTimeline } from "@/components/platform/EvidenceTimeline";
import { JsonArtifact } from "@/components/platform/JsonArtifact";
import { CHANGES, CLAIMS, COVER, DECISION, FINDINGS, RECEIPT_JSON, REPORT_SECTIONS, RETEST, SUMMARY, SYSTEM_MAP } from "@/content/sampleReport";
import { OLYMPUS_MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Example Report — The Evidence Behind an AI Deployment Decision",
  description:
    "A fully synthetic sample report for a fictional organization: scope, system map, findings, claim states, remediation and retest, change history and a deployment recommendation.",
  alternates: { canonical: "/example-report/" },
};

const SEVERITY: Record<string, string> = {
  High: "border-state-contradicted text-state-contradicted-ink",
  Medium: "border-state-stale text-state-stale-ink",
  Low: "border-rule text-fg-muted",
};

function Part({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="min-w-0 scroll-mt-28 border-t border-rule pt-10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Section {String(n).padStart(2, "0")}</p>
      <h2 id={`${id}-title`} className="display-caps mt-2 font-display text-3xl text-fg sm:text-4xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Example Report — Launch Guide §14: a synthetic fixture, rendered as native DOM. */
export default function ExampleReportPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Example Report"
        headline="See the Evidence Behind an AI *Deployment Decision.*"
        lede="This synthetic sample shows the kinds of claims, findings, retest records and human-reviewed decisions a scoped Mythos engagement is designed to produce. No customer information is represented."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="Example Report"
        primaryCta={{ label: "Read the Report", href: "#cover" }}
        secondaryCta={{ label: "What Mythos Produces", href: "/outputs" }}
        planes={[
          { src: "/assets/cta/cta-olympus-poster.avif", className: "-inset-[3%]", position: "60% 45%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.4, position: "100% 0%", depth: 10 },
        ]}
        compact
        into="ivory"
      />

      <section data-surface="ivory" aria-label="Sample report" className="pb-24 pt-6">
        <Container>
          <p className="flex items-start gap-2.5 border-l-2 border-state-stale bg-panel px-4 py-3 text-sm leading-relaxed text-fg">
            <FlaskConical size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-state-stale-ink" />
            Synthetic sample. Sample Organization is fictional, and every system, value, hash and date below is invented for illustration.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <nav aria-label="Report sections" className="hidden lg:block">
              <ol className="sticky top-28 grid gap-1 border-l border-rule">
                {REPORT_SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-fg-muted hover:border-accent hover:text-fg">
                      <span className="mr-2 font-display text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="grid min-w-0 gap-16">
              <Part id="cover" n={1} title="Cover and scope">
                <RecordCard kind="Sample report · synthetic" title="AI deployment assurance — servicing copilot" rows={COVER} footer="Scope was agreed in writing before testing; the engine enforced it at launch." />
              </Part>

              <Part id="summary" n={2} title="Executive summary">
                <p className="text-[17px] leading-relaxed text-fg">{SUMMARY.tested}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="border border-rule bg-panel p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Key findings</p>
                    <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed text-fg">
                      {SUMMARY.findings.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-rule bg-panel p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Open unknowns</p>
                    <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed text-fg">
                      {SUMMARY.unknowns.map((u) => (
                        <li key={u} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                          {u}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-rule pt-4 text-sm text-fg-muted">
                      Recommendation: <span className="font-semibold text-fg">{SUMMARY.recommendation}</span> — no score, and the decision stays with your release owner.
                    </p>
                  </div>
                </div>
              </Part>

              <Part id="system" n={3} title="System map">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
                    <caption className="sr-only">Components in scope and what they reach</caption>
                    <thead>
                      <tr className="border-b border-rule text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                        <th scope="col" className="py-3 pr-4 font-semibold">Component</th>
                        <th scope="col" className="py-3 pr-4 font-semibold">Type</th>
                        <th scope="col" className="py-3 pr-4 font-semibold">Reaches</th>
                        <th scope="col" className="py-3 font-semibold">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SYSTEM_MAP.map((r) => (
                        <tr key={r.component} className="border-b border-rule">
                          <th scope="row" className="py-3 pr-4 font-display text-lg font-normal text-fg">{r.component}</th>
                          <td className="py-3 pr-4 text-fg-muted">{r.kind}</td>
                          <td className="py-3 pr-4 text-fg">{r.reaches}</td>
                          <td className="py-3 text-fg-muted">{r.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Part>

              <Part id="findings" n={4} title="Findings and evidence">
                <ul className="grid gap-4">
                  {FINDINGS.map((f) => (
                    <li key={f.id} className="border border-rule bg-panel p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-lg text-accent">{f.id}</span>
                        <span className={cn("border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]", SEVERITY[f.severity])}>{f.severity}</span>
                        <StatePill state={f.state} label={f.status} />
                      </div>
                      <p className="mt-3 font-display text-2xl leading-tight text-fg">{f.title}</p>
                      <dl className="mt-4 grid gap-3 text-[15px] md:grid-cols-3">
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">Observed effect</dt>
                          <dd className="mt-1 leading-relaxed text-fg">{f.effect}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">Conditions</dt>
                          <dd className="mt-1 leading-relaxed text-fg">{f.conditions}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">Confidence</dt>
                          <dd className="mt-1 leading-relaxed text-fg">{f.confidence}</dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ul>
              </Part>

              <Part id="claims" n={5} title="Claim matrix">
                <ul className="divide-y divide-rule border-y border-rule">
                  {CLAIMS.map((c) => (
                    <li key={c.claim} className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-start md:gap-x-6">
                      <span className="font-display text-xl leading-snug text-fg">{c.claim}</span>
                      <StatePill state={c.state} label={c.label} className="justify-self-start md:justify-self-end" />
                      <span className="text-sm text-fg-muted md:col-span-2">
                        {c.source} · {c.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </Part>

              <Part id="retest" n={6} title="Remediation and retest">
                <ul className="grid gap-3">
                  {RETEST.map((r) => (
                    <li key={r.finding} className="grid gap-3 border border-rule bg-panel p-5 md:grid-cols-[4rem_1fr_1fr_auto] md:items-start">
                      <span className="font-display text-lg text-accent">{r.finding}</span>
                      <span className="text-[15px] text-fg">
                        {r.fix}
                        <span className="block text-sm text-fg-muted">Owner: {r.owner}</span>
                      </span>
                      <span className="text-[15px] leading-relaxed text-fg-muted">{r.result}</span>
                      <StatePill state={r.state} className="justify-self-start" />
                    </li>
                  ))}
                </ul>
              </Part>

              <Part id="changes" n={7} title="Change history">
                <EvidenceTimeline events={CHANGES} caption="Change ledger · synthetic" />
              </Part>

              <Part id="exposure" n={8} title="Economic scenario">
                <p className="flex items-start gap-3 border border-rule bg-panel px-5 py-4 text-[15px] leading-relaxed text-fg">
                  <Hourglass size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-state-stale-ink" />
                  Not included. Economic Exposure is specified but not yet producing scores, so this report shows no financial figures. When built, it is designed to express
                  modeled ranges with their assumptions — never realized losses.
                </p>
              </Part>

              <Part id="decision" n={9} title="Deployment decision">
                <RecordCard kind="Deployment decision · synthetic" title="Servicing copilot — pilot release" rows={DECISION} icon="/assets/evidence/deployment-decision-gate.svg" footer="Mythos recommends; accountable people decide. A missing decision never reads as Ready." />
              </Part>

              <Part id="appendix" n={10} title="Appendix">
                <p className="mb-5 text-[15px] leading-relaxed text-fg-muted">A sample receipt for the first claim. Copy JSON copies exactly what is shown.</p>
                <JsonArtifact title="assurance-receipt.sample.json" data={RECEIPT_JSON} />
              </Part>
            </div>
          </div>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Get this evidence *for your own system.*"
        secondary={{ label: "How Engagement Starts", href: "/engagement" }}
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
