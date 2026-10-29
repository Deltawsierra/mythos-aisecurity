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
import { RecordCard } from "@/components/platform/RecordCard";
import { BACKDROPS, OLYMPUS_MEDIA, SCENES, scenePlanes } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Assessment Deliverables & Outputs",
  description:
    "The nine outputs of a Mythos AI Security engagement, from scope record and system map to receipts, retests and decision support, with how far along each one is.",
  alternates: { canonical: "/outputs/" },
  ...socialImage("outputs", "From Finding to Evidence to Decision — Mythos AI Security"),
};

type Status = "Built" | "Partly built" | "Planned";

/* Launch Guide §14 output table, statuses per the Master Inventory (26 Oct 2026). */
const OUTPUTS: { name: string; what: string; today: string; status: Status }[] = [
  { name: "Scope & Authorization Record", what: "What the review may touch and what was excluded.", today: "One gate checks target bounds, consent, authority and the testing window before any scan launches.", status: "Built" },
  { name: "AI System & Authority Map", what: "Which identities, models, tools, routes and data connect.", today: "Capability map, effective access and a route map of declared against inferred edges; authority chains hop by hop.", status: "Built" },
  { name: "Observed Finding", what: "What was tested and observed, how strong the evidence is, and what was not measured.", today: "Each finding decided by a differential against a benign control: no baseline, no finding.", status: "Built" },
  { name: "Assurance Receipt", what: "Links a claim to its evidence, version and time.", today: "DSSE-signed with the issue time inside the signature; verifies offline, every version readable.", status: "Built" },
  { name: "Remediation Plan", what: "What to fix, who owns it and how it will be checked.", today: "A repair contract names the prohibited effect and what a fix must preserve; findings dispatch to Jira, GitHub, ServiceNow and Splunk.", status: "Built" },
  { name: "Retest Record", what: "Whether the original failure is absent after a change.", today: "Verdicts read closed, still open or inconclusive; a cached pass is not a retest. Inline verdicts in the dashboard are planned.", status: "Partly built" },
  { name: "Deployment Decision Support", what: "What the evidence supports, under which restrictions, and what was not measured.", today: "Six states plus Paused, worst-of-N; never defaults to Ready. Evidence for a human decision, not the decision.", status: "Built" },
  { name: "Economic Exposure Scenario", what: "What an observed effect could mean financially, under stated assumptions.", today: "P10/P50/P90 with a signed receipt. Feeds are fixtures until licensed; no calibration yet. Examples here are synthetic.", status: "Partly built" },
  { name: "Executive & Audit Export", what: "A readable summary backed by inspectable proof.", today: "Signed receipts download and verify offline; a compliance map shows evidence of gaps, never a certificate.", status: "Partly built" },
];

const TONE: Record<Status, string> = {
  Built: "border-state-verified text-state-verified-ink",
  "Partly built": "border-state-stale text-state-stale-ink",
  Planned: "border-rule text-fg-muted",
};

const DECISIONS = ["Ready", "Ready with restrictions", "Needs more evidence", "Audit incomplete", "Needs remediation", "Not recommended", "Paused"];

const NEXT: NextLink[] = [
  { eyebrow: "Example Report", title: "A synthetic report, section by section", href: "/example-report" },
  { eyebrow: "Evidence & Receipts", title: "Inspect a synthetic receipt", href: "/platform/evidence" },
  { eyebrow: "Standards", title: "How findings map to frameworks", href: "/standards" },
];

/** What Mythos Produces — Launch Guide §14. */
export default function OutputsPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="What Mythos AI Security Produces"
        headline="From Finding to Evidence *to Decision.*"
        lede="Every deliverable an AI assessment produces, what each one is for, and how far along it is today."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="What Mythos AI Security Produces"
        secondaryCta={{ label: "See the Example Report", href: "/example-report" }}
        planes={scenePlanes(SCENES.outputs, "55% 50%")}
        into="ivory"
      />

      <section data-surface="ivory" aria-labelledby="outputs-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="outputs-title" eyebrow="Nine outputs" title={<Accent text="What you would *receive.*" />} lede="Labelled built, partly built or planned — the same honesty the outputs themselves follow." caps />
          <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {OUTPUTS.map((o, i) => (
              <li key={o.name} className="flex flex-col border border-rule bg-panel p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-2xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]", TONE[o.status])}>{o.status}</span>
                </div>
                <p className="mt-3 font-display text-2xl leading-tight text-fg">{o.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">{o.what}</p>
                <p className="mt-auto border-t border-rule pt-3 text-sm leading-relaxed text-fg-muted">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg">Today · </span>
                  {o.today}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Scene
        surface="navy"
        labelledBy="decision-title"
        layers={[{ src: BACKDROPS.c.src, mobileSrc: BACKDROPS.c.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro id="decision-title" eyebrow="One output up close" title={<Accent text="Decision support, *not a verdict.*" />} lede="Six states plus Paused, worst-of-N. A missing decision never reads as Ready, and your release owner makes the call." caps />
            <ul className="mt-8 flex flex-wrap gap-2">
              {DECISIONS.map((d) => (
                <li key={d} className="border border-rule bg-panel px-3 py-1.5 text-[13px] text-fg">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <RecordCard
            kind="Deployment decision · synthetic"
            title="Servicing copilot — pilot release"
            rows={[
              { field: "Recommendation", value: "Ready with restrictions", tone: "verified" },
              { field: "Restriction", value: "One region; credits above limit go to a person" },
              { field: "Evidence", value: "4 verified · 1 observed" },
              { field: "Coverage", value: "Expected, observed and assessed match; legacy index out of scope" },
              { field: "Reopens when", value: "Model version, CRM roles or refund policy change" },
              { field: "Decision owner", value: "Your release owner (role)" },
              { field: "Synthetic", value: "Yes" },
            ]}
            visible={5}
            icon="/assets/evidence/deployment-decision-gate.svg"
            footer="Synthetic example. Mythos AI Security recommends; accountable people decide."
          />
        </Container>
      </Scene>

      <section data-surface="parchment" aria-labelledby="next-title" className="pb-16 pt-8">
        <Container>
          <SectionIntro id="next-title" eyebrow="See it in practice" title={<Accent text="Inspect the *examples.*" />} caps />
          <NextLinks items={NEXT} />
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Get evidence *you can act on.*"
        secondary={{ label: "See the Example Report", href: "/example-report" }}
        vista="c"
      />
    </PageMotion>
  );
}
