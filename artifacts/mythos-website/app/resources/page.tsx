import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { OLYMPUS_MEDIA, SCENES } from "@/content/media";

export const metadata: Metadata = {
  title: "Resources: AI Assurance Library",
  description:
    "A synthetic example report, deliverables, standards mapping, a glossary, use cases and how engagements work: the evidence and methods behind Mythos.",
  alternates: { canonical: "/resources/" },
  ...socialImage("resources", "The Mythos Knowledge Archive — Mythos AI Security"),
};

/*
 * Resources hub (Launch Guide §11). The hub curates only real pages: the
 * first guide (27 Oct) and its checklist, then the site's own reference
 * pages. No empty category tiles; guides live under /resources/<slug>.
 */

const SHELVES: { name: string; lede: string; items: { title: string; body: string; href: string; tag?: string }[] }[] = [
  {
    name: "Guides and checklists",
    lede: "Practical guidance, written and reviewed by the people building Mythos.",
    items: [
      { title: "How to Red-Team an AI Agent", body: "What to test before an agent touches real systems: eight failure families, scoping, judging results and retesting.", href: "/resources/how-to-red-team-ai-agents", tag: "Guide" },
      { title: "Agent Red-Teaming Checklist", body: "The guide's eight steps on one printable page. Free, no form.", href: "/assets/downloads/mythos-ai-agent-red-teaming-checklist.pdf", tag: "PDF" },
    ],
  },
  {
    name: "Proof you can inspect",
    lede: "Synthetic fixtures, clearly labelled.",
    items: [
      { title: "Example Report", body: "A complete synthetic report for a fictional organization, section by section.", href: "/example-report", tag: "Synthetic" },
      { title: "Evidence & Receipts", body: "Inspect a synthetic receipt and the evidence behind a claim.", href: "/platform/evidence", tag: "Synthetic" },
      { title: "Continuous Assurance", body: "Watch a change set synthetic claims aside and plan a retest.", href: "/platform/continuous-assurance", tag: "Synthetic" },
      { title: "What Mythos Produces", body: "Nine outputs, and how far along each one is.", href: "/outputs" },
    ],
  },
  {
    name: "Methods and language",
    lede: "How the work is done and how we talk about it.",
    items: [
      { title: "Standards & Control Mapping", body: "What is mapped, what is referenced and what is never certified.", href: "/standards" },
      { title: "AI Assurance Glossary", body: "Plain-English definitions, with planned things marked as planned.", href: "/glossary" },
      { title: "Minotaur Methodology", body: "How Mythos tests its own methods.", href: "/platform/validation" },
      { title: "Trust Center", body: "Authorization, scope, evidence integrity and what is not built yet.", href: "/trust" },
    ],
  },
  {
    name: "Scenarios and buying",
    lede: "Where risk shows up and how to start.",
    items: [
      { title: "Use Cases", body: "Eleven scenarios, from support agents to decision support.", href: "/use-cases" },
      { title: "Solutions by Industry", body: "Seven environments, one method.", href: "/solutions" },
      { title: "How Engagement Starts", body: "From the first note to a scoped assessment and a retest.", href: "/engagement" },
      { title: "Pricing", body: "What determines price, and what is included.", href: "/pricing" },
    ],
  },
];

/** Resources hub — Launch Guide §11 /resources. */
export default function ResourcesPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Resources"
        headline="The Mythos *Knowledge Archive.*"
        lede="Explore the evidence, methods and ideas behind assurance for operational AI."
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Resources"
        primaryCta={{ label: "Explore the Library", href: "#library" }}
        secondaryCta={{ label: "Request an Expert Conversation", href: "/contact?intent=general" }}
        planes={[{ src: SCENES.resources.src, mobileSrc: SCENES.resources.phone, className: "-inset-[3%]", position: "60% 50%", depth: 6, priority: true }]}
        into="ivory"
      />

      <section id="library" data-surface="ivory" aria-label="Library" className="scroll-mt-24 pb-16 pt-10">
        <Container>
          <p className="flex items-start gap-2.5 border-l-2 border-state-stale bg-panel px-4 py-3 text-sm leading-relaxed text-fg">
            <FlaskConical size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-state-stale-ink" />
            The first guide is below. More guides, reports and events will appear as they are written and reviewed; this library lists only pages that exist.
          </p>
          <div className="mt-14 grid gap-20">
            {SHELVES.map((shelf, s) => (
              <section key={shelf.name} aria-labelledby={`shelf-${s}`}>
                <SectionIntro id={`shelf-${s}`} eyebrow={`Shelf ${String(s + 1).padStart(2, "0")}`} title={<Accent text={`${shelf.name.split(" ").slice(0, -2).join(" ")} *${shelf.name.split(" ").slice(-2).join(" ")}.*`} />} lede={shelf.lede} caps />
                <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
                  {shelf.items.map((it) => {
                    const file = it.href.endsWith(".pdf");
                    const inner = (
                      <>
                        {it.tag && (
                          <span className={`self-start border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${it.tag === "Synthetic" ? "border-state-stale text-state-stale-ink" : "border-antique-gold/70 text-accent"}`}>{it.tag}</span>
                        )}
                        <span className={`font-display text-2xl leading-tight text-fg ${it.tag ? "mt-3" : ""}`}>{it.title}</span>
                        <span className="mt-2 text-[15px] leading-relaxed text-fg-muted">{it.body}</span>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-accent">
                          {file ? "Download" : "Open"}
                          <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </>
                    );
                    const card = "group flex h-full flex-col border border-rule bg-panel p-6 shadow-[0_18px_40px_-34px_rgba(22,26,28,0.45)] transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-antique-gold/60";
                    return (
                      <li key={it.href}>
                        {/* Files are plain downloads; pages use client navigation. */}
                        {file ? (
                          <a href={it.href} download className={card}>
                            {inner}
                          </a>
                        ) : (
                          <Link href={it.href} className={card}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Have a question *the library doesn’t answer?*"
        primary={{ label: "Request an Expert Conversation", href: "/contact?intent=general" }}
        secondary={{ label: "How Engagement Starts", href: "/engagement" }}
        vista="c"
      />
    </PageMotion>
  );
}
