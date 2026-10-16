import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { NextLinks, type NextLink } from "@/components/sections/NextLinks";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { RecordCard } from "@/components/platform/RecordCard";
import { OLYMPUS_MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What Mythos Produces — From Finding to Evidence to Decision",
  description:
    "The nine outputs of a Mythos engagement — scope record, system map, findings, receipts, remediation, retest, decision support, exposure scenarios and exports — with how far along each one is.",
  alternates: { canonical: "/outputs/" },
};

type Status = "Built" | "Partly built" | "Planned";

/* Launch Guide §14 output table, statuses per the 16 Oct resources fact-check. */
const OUTPUTS: { name: string; what: string; today: string; status: Status }[] = [
  { name: "Scope & Authorization Record", what: "What the review may touch and what was excluded.", today: "A written, agreed scope that the engine enforces when testing starts.", status: "Partly built" },
  { name: "AI System & Authority Map", what: "Which identities, models, tools, routes and data connect.", today: "Maps what is declared and observed in scope; effective access is computed from the configuration supplied.", status: "Partly built" },
  { name: "Observed Finding", what: "What was tested and observed, how confident we are, and what remains uncertain.", today: "Findings with evidence, confidence and the conditions they were found under.", status: "Built" },
  { name: "Assurance Receipt", what: "Links a claim to its evidence, version and time.", today: "Machine-readable and hashed so changes are detectable; signing is planned.", status: "Built" },
  { name: "Remediation Plan", what: "What to fix, who owns it and how it will be checked.", today: "Owners, assignments and review states; fixes stay human-approved.", status: "Built" },
  { name: "Retest Record", what: "Whether the original failure still happens after a change.", today: "Retest results read unchanged, review, blocked or unmeasured; false-block tracking is in development.", status: "Partly built" },
  { name: "Deployment Decision Support", what: "What the evidence supports, under which restrictions, with which unknowns.", today: "Six recommendation states; never defaults to Ready. Recording the human approver is designed.", status: "Built" },
  { name: "Economic Exposure Scenario", what: "What an observed effect could mean financially, under stated assumptions.", today: "Specified only. Every example on this site is synthetic.", status: "Planned" },
  { name: "Executive & Audit Export", what: "A readable summary backed by inspectable proof.", today: "Receipts as JSON, an evidence API and incident evidence packs. Other formats are planned.", status: "Partly built" },
];

const TONE: Record<Status, string> = {
  Built: "border-state-verified text-state-verified-ink",
  "Partly built": "border-state-stale text-state-stale-ink",
  Planned: "border-rule text-fg-muted",
};

const DECISIONS = ["Ready", "Ready with restrictions", "Requires additional evidence", "Requires remediation", "Not recommended", "Paused"];

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
        eyebrow="What Mythos Produces"
        headline="From Finding to Evidence *to Decision.*"
        lede="Every output an engagement is designed to deliver, what each one is for, and how far along it is today."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="What Mythos Produces"
        secondaryCta={{ label: "See the Example Report", href: "/example-report" }}
        planes={[
          { src: OLYMPUS_MEDIA.marbleCity.src, className: "-inset-[3%]", position: "75% 40%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
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
        layers={[{ src: OLYMPUS_MEDIA.cloudSea.src, className: "object-[50%_70%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro id="decision-title" eyebrow="One output up close" title={<Accent text="Decision support, *not a verdict.*" />} lede="Six recommendation states. A missing decision never reads as Ready, and your release owner makes the call." caps />
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
              { field: "Evidence", value: "4 verified · 1 observed · 2 unknown" },
              { field: "Open unknowns", value: "Escalation timing; legacy index access" },
              { field: "Reopens when", value: "Model version, CRM roles or refund policy change" },
              { field: "Decision owner", value: "Your release owner (role)" },
              { field: "Synthetic", value: "Yes" },
            ]}
            visible={5}
            icon="/assets/evidence/deployment-decision-gate.svg"
            footer="Synthetic example. Mythos recommends; accountable people decide."
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
        layers={[
          { src: OLYMPUS_MEDIA.panorama.src, className: "object-[55%_45%]", parallax: 4 },
          { src: OLYMPUS_MEDIA.sunrays, blend: "screen", opacity: 0.6, className: "object-[55%_45%]" },
        ]}
      />
    </PageMotion>
  );
}
