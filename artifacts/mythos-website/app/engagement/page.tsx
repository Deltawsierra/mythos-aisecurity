import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, Ban } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { BACKDROPS, OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "How an AI Assessment Engagement Works",
  description:
    "After you request an assessment: one scoped workflow, written authorization before testing, the assessment, remediation, one retest and decision support.",
  alternates: { canonical: "/engagement/" },
  ...socialImage("engagement", "What Happens After You Request an Assessment — Mythos AI Security"),
};

/* Sequence per the 16 Oct resources fact-check (services agreement template,
   Market Landscape §8, Evidence Causality §7). No durations or prices. */

const PHASES = [
  {
    name: "Before any testing",
    steps: [
      { name: "You get in touch", body: "Share the kind of AI system and the decision you face — no secrets, no architecture details." },
      { name: "We route it", body: "Assessment, demo or partnership — to the people who can answer." },
      { name: "Scope one workflow", body: "One named workflow: environment, data and tool boundaries, legitimate tasks, and the effects that matter." },
      { name: "Agree acceptance first", body: "Which decision the evidence should support, what counts as usable evidence and the thresholds — before results exist." },
      { name: "Sign and authorize", body: "Agreement, statement of work and the written Authorized Scope with rules of engagement." },
      { name: "Share the evidence package", body: "Architecture and owners, deployed versions, identities, permitted actions, known failures, logs and recent changes — through the agreed channel." },
    ],
  },
  {
    name: "The assessment",
    steps: [{ name: "Map, test, record", body: "Every scan passes one gate that checks scope, consent, authority and the testing window. Athena maps what the workflow can reach, Achilles tests what it does, and each claim and receipt is recorded with what was not measured. Operators can pause, stand down or terminate, and nothing may block a stop." }],
  },
  {
    name: "After the assessment",
    steps: [
      { name: "Findings and a remediation plan", body: "With a human-approved plan, the evidence package and what risk remains." },
      { name: "One retest", body: "After your fix: the original failure and six incomplete-repair checks, against a repair contract agreed before the fix. A finding closes only on that retest." },
      { name: "Decision support", body: "A recommendation with restrictions and open unknowns. Your release owner decides." },
      { name: "Optional: change-triggered reassessment", body: "Reopened when agreed changes happen — model, tool, policy, permission, data source or route. There is no live monitoring." },
    ],
  },
];

const AGREEMENT = [
  "A written Authorized Scope: in- and out-of-scope targets, prohibited actions, windows, contacts, testing mode and constraints",
  "Your confirmation that you own or control the systems, plus any third-party consents",
  "Backups and an escalation contact during testing windows",
  "Explicit written approval for anything destructive",
];

const NEVER = ["Credentials or keys", "Customer datasets", "Source code", "Raw logs or incident files", "Network diagrams"];

/** How Engagement Starts — Launch Guide §04 /engagement. */
export default function EngagementPage() {
  let n = 0;
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="How Engagement Starts"
        headline="What Happens After You *Request an Assessment.*"
        lede="From the first note to a scoped assessment, a retest and a decision your team makes — and what we need from you along the way."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="How Engagement Starts"
        secondaryCta={{ label: "Trust Center", href: "/trust" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 60%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.viaduct.src, className: "inset-x-[-6%] bottom-[14%] h-[30%]", fit: "contain", position: "50% 100%", depth: 12 },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
        into="ivory"
      />

      {/* Sequence */}
      <section data-surface="ivory" aria-labelledby="sequence-title" className="pb-24 pt-10">
        <Container>
          <SectionIntro id="sequence-title" eyebrow="The sequence" title={<Accent text="Eleven steps, *one workflow.*" />} lede="Timing depends on scope and access; you get a plan during scoping." caps />
          <div className="mt-12 grid gap-10">
            {PHASES.map((phase) => (
              <div key={phase.name} className="grid gap-4 lg:grid-cols-[12rem_1fr]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent lg:pt-5">{phase.name}</p>
                <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
                  {phase.steps.map((s) => {
                    n += 1;
                    return (
                      <li key={s.name} className="border border-rule bg-panel p-5">
                        <span className="font-display text-2xl leading-none text-accent">{String(n).padStart(2, "0")}</span>
                        <p className="mt-2 font-display text-xl leading-snug text-fg">{s.name}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Agreement */}
      <Scene
        surface="navy"
        labelledBy="agreement-title"
        layers={[{ src: BACKDROPS.a.src, mobileSrc: BACKDROPS.a.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro id="agreement-title" eyebrow="Before testing" title={<Accent text="What the agreement *puts in writing.*" />} caps />
          <ul className="grid gap-3" data-reveal-group>
            {AGREEMENT.map((a) => (
              <li key={a} className="border-l-2 border-champagne/60 bg-panel px-5 py-4 text-[15px] leading-relaxed text-fg">
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {/* Never via the website */}
      <section data-surface="parchment" aria-labelledby="never-title" className="pb-16 pt-8">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro id="never-title" eyebrow="Through the right channel" title={<Accent text="Never through *the website.*" />} lede="These are exchanged only after the agreement, through the scoped process." caps />
            <ul className="mt-8 flex flex-wrap gap-2">
              {NEVER.map((x) => (
                <li key={x} className="inline-flex items-center gap-1.5 border border-rule bg-panel px-3 py-1.5 text-[13px] text-fg">
                  <Ban size={12} aria-hidden="true" className="text-state-contradicted-ink" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-3 lg:pt-[4.5rem]">
            {[
              { label: "What you receive", body: "Nine outputs, and how far along each is.", href: "/outputs" },
              { label: "A synthetic report", body: "What the evidence looks like, section by section.", href: "/example-report" },
              { label: "Pricing", body: "How scope is priced — figures on request.", href: "/pricing" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group flex items-center justify-between gap-4 border border-rule bg-panel px-5 py-4 hover:border-antique-gold/60">
                <span>
                  <span className="block font-display text-xl text-fg">{l.label}</span>
                  <span className="block text-sm text-fg-muted">{l.body}</span>
                </span>
                <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ClosingVista
        from="parchment"
        title="Define the system. *Start with evidence.*"
        secondary={{ label: "Trust Center", href: "/trust" }}
        vista="c"
      />
    </PageMotion>
  );
}
