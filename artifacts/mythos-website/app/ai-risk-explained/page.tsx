import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Ban, Check, Download, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { Scene } from "@/components/scenic/Scene";
import { ClosingVista } from "@/components/scenic/ClosingVista";
import { Portrait } from "@/components/platform/Portrait";
import { SituationGuide } from "@/components/plain/SituationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo";
import { BACKDROPS, OLYMPUS_MEDIA } from "@/content/media";
import {
  BOARD_SHEET,
  BUYER_QUESTIONS,
  DELIVERABLES,
  NOT_INCLUDED,
  OPENERS,
  OVERVIEW,
  PLAIN_ENGLISH_PDF,
  READING_LEVELS,
  SITUATIONS,
  SOURCES,
  STEPS,
  TERMS,
  TOOLS,
  WHO_WE_ARE,
} from "@/content/plainEnglish";

export const metadata: Metadata = {
  title: "AI Risk Explained in Plain English",
  description:
    "What Mythos AI Security does, in plain English: the AI risks that matter to a business, how attackers use AI against ordinary systems, what testing shows, and questions for the board.",
  alternates: { canonical: "/ai-risk-explained/" },
  ...socialImage("ai-risk-explained", "AI Risk, Explained in Plain English — Mythos AI Security"),
};

const TALK = { label: "Talk to Mythos AI Security", href: "/contact?intent=general" };

/** Is Mythos Right for Us? — the plain-English page for non-technical readers. */
export default function AiRiskExplainedPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Is Mythos AI Security Right for Us?"
        headline="AI Risk, *Explained in Plain English.*"
        lede="What Mythos AI Security does, why it matters and what to ask, written for anyone, including board members who do not work in technology."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
        current="AI Risk Explained"
        primaryCta={TALK}
        secondaryCta={{ label: "Find Your Situation", href: "#situations" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.cliffTemple.src, className: "inset-x-[24%] bottom-[16%] h-[46%] max-lg:inset-x-[-10%]", fit: "contain", position: "100% 100%", depth: 12 },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.5, position: "100% 0%", depth: 10 },
        ]}
        into="ivory"
      >
        <ul className="mt-10 grid max-w-2xl gap-2.5 text-[15px] leading-snug text-ivory/90">
          {OPENERS.map((o) => (
            <li key={o.href}>
              <a href={o.href} className="group inline-flex items-start gap-2.5 hover:text-ivory">
                <ArrowRight size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-champagne transition-transform group-hover:translate-x-0.5" />
                <span>
                  <span className="font-semibold text-ivory">{o.q}</span> {o.a}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </ScenicHero>

      {/* Reading levels + the one-minute overview */}
      <section data-surface="ivory" aria-labelledby="overview-title" className="pb-24 pt-10">
        <Container>
          <nav aria-label="Choose how much to read" className="grid gap-3 md:grid-cols-3" data-reveal-group>
            {READING_LEVELS.map((l) => (
              <a key={l.href} href={l.href} className="group flex items-start justify-between gap-4 border border-rule bg-panel p-5 transition-colors hover:border-antique-gold/70">
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{l.time}</span>
                  <span className="mt-1.5 block font-display text-2xl text-fg">{l.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-fg-muted">{l.body}</span>
                </span>
                <ArrowRight size={16} aria-hidden="true" className="mt-7 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </nav>

          <div id="overview" className="mt-20 grid scroll-mt-28 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionIntro id="overview-title" eyebrow="The one-minute version" title={<Accent text="Five things *worth knowing.*" />} caps />
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-fg-muted">{WHO_WE_ARE}</p>
            </div>
            <ol className="grid gap-3" data-reveal-group>
              {OVERVIEW.map((o, i) => (
                <li key={o.title} className="flex gap-5 border border-rule bg-panel p-5">
                  <span className="font-display text-3xl leading-none text-accent lining-nums">{i + 1}</span>
                  <span>
                    <span className="block font-display text-[1.45rem] leading-snug text-fg">{o.title}</span>
                    <span className="mt-1 block text-[16px] leading-relaxed text-fg-muted">{o.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <a
            href="#situation-attackers"
            className="group mt-12 flex flex-col gap-3 border-l-4 border-antique-gold bg-charcoal px-6 py-6 text-ivory sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">No AI in your business?</span>
              <span className="mt-2 block font-display text-[1.6rem] leading-snug">
                Attackers may use AI against your existing systems, even if your company does not use AI itself.
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-[14px] font-semibold text-champagne">
              Why this applies to you
              <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </Container>
      </section>

      {/* The five-minute guide */}
      <section id="situations" data-surface="parchment" aria-labelledby="situations-title" className="scroll-mt-20 py-24 lg:py-28">
        <Container className="max-w-5xl">
          <SectionIntro
            id="situations-title"
            eyebrow="The five-minute guide"
            title={<Accent text="Start with the question *closest to you.*" />}
            lede="Each answer covers the same five things: what it means, an example, what Mythos AI Security would examine, what you receive and one question for the board. The examples are made up to explain the risk. They are not customer stories."
            caps
          />
          <div className="mt-12">
            <SituationGuide items={SITUATIONS} />
          </div>
        </Container>
      </section>

      {/* How it works, what you receive, the tools */}
      <section data-surface="ivory" aria-labelledby="how-title" className="py-24 lg:py-28">
        <Container>
          <SectionIntro
            id="how-title"
            eyebrow="How it works"
            title={<Accent text="Six steps, *in business terms.*" />}
            lede="Assessments start at USD 15,000. The exact price, timeline, your team's responsibilities and the retest terms are set out in a written proposal for your scope."
            caps
          />
          <ol className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
            {STEPS.map((s, i) => (
              <li key={s.title} className="border border-rule bg-panel p-5">
                <span className="font-display text-2xl leading-none text-accent lining-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-[1.45rem] leading-snug text-fg">{s.title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-[2rem] leading-tight text-fg">What you receive</h3>
              <ul className="mt-6 grid gap-2.5" data-reveal-group>
                {DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[17px] leading-relaxed text-fg">
                    <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fg-muted">
                Evidence records are signed, so anyone can later check they have not been altered. A signature proves where a record came from, not that a
                conclusion is right.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold">
                <Link href="/example-report" className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline">
                  See a synthetic example report <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline">
                  How pricing works <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="border border-rule bg-panel p-6 sm:p-8">
              <h3 className="font-display text-[2rem] leading-tight text-fg">What an assessment does not include</h3>
              <ul className="mt-6 grid gap-2.5">
                {NOT_INCLUDED.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[17px] leading-relaxed text-fg">
                    <Ban size={16} aria-hidden="true" className="mt-1.5 shrink-0 text-state-contradicted-ink" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
                Testing cannot prove that every risk is gone. Your team owns the changes and the decision to go live. Wider testing of other software or
                systems needs its own agreed scope.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <SectionIntro
              id="tools-title"
              eyebrow="Behind the service"
              title={<Accent text="The two tools *doing the testing.*" />}
              lede="Mythos AI Security names its tools after figures from Greek myth. You do not need to remember them; they are here so the names make sense when you see them elsewhere."
              caps
            />
            <ul className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-group>
              {TOOLS.map((t) => (
                <li key={t.name}>
                  <Link href={t.href} className="group flex h-full gap-6 border border-rule bg-panel p-6 transition-colors hover:border-antique-gold/70">
                    <Portrait project={t.project} className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" />
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">{t.role}</span>
                      <span className="mt-1.5 block font-display text-[2rem] leading-none text-fg">{t.name}</span>
                      <span className="mt-3 block text-[16px] leading-relaxed text-fg-muted">{t.body}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
                        More about {t.name}
                        <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Board takeaway */}
      <Scene
        id="board"
        surface="navy"
        labelledBy="board-title"
        layers={[{ src: BACKDROPS.b.src, mobileSrc: BACKDROPS.b.phone, className: "object-[50%_50%]", parallax: 4 }]}
        scrim="linear-gradient(180deg, rgba(21,35,51,0.5) 0, rgba(21,35,51,0.9) clamp(14rem,22vw,22rem), rgba(21,35,51,0.94) 72%, rgba(21,35,51,0.72) 100%)"
        top={{ into: "ivory", height: "clamp(8rem,14vw,14rem)" }}
        bottom={{ into: "parchment", height: "clamp(7rem,12vw,12rem)" }}
        className="scroll-mt-0 pb-[clamp(10rem,15vw,15rem)] pt-[clamp(10rem,17vw,17rem)]"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro id="board-title" eyebrow="For the board" title={<Accent text="Take this into *the meeting.*" />} lede={BOARD_SHEET.intro} caps />
            <figure className="mt-10 border-l-2 border-champagne bg-panel px-6 py-5">
              <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">One sentence to reuse</figcaption>
              <blockquote className="mt-3 font-display text-[1.55rem] leading-snug text-fg">&ldquo;{BOARD_SHEET.sentence}&rdquo;</blockquote>
            </figure>
            <a
              href={PLAIN_ENGLISH_PDF}
              download
              className="mt-8 inline-flex items-center gap-2.5 bg-champagne px-6 py-3.5 text-[14px] font-semibold tracking-[0.04em] text-charcoal transition-colors hover:bg-ivory"
            >
              <Download size={16} aria-hidden="true" />
              Download the one-page sheet (PDF)
            </a>
            <p className="mt-3 text-[13px] text-fg-muted">Free, no form. The same questions, ready to print.</p>
          </div>
          <ol className="grid content-start gap-2.5 sm:grid-cols-2" data-reveal-group>
            {BOARD_SHEET.questions.map((q, i) => (
              <li key={q} className="flex gap-4 bg-panel px-5 py-4">
                <span className="font-display text-2xl leading-none text-champagne lining-nums">{i + 1}</span>
                <span className="text-[15px] leading-relaxed text-fg">{q}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Scene>

      {/* Buying questions */}
      <section data-surface="parchment" aria-labelledby="questions-title" className="pb-24 pt-8">
        <Container className="max-w-5xl">
          <SectionIntro id="questions-title" eyebrow="Before you decide" title={<Accent text="Questions people *hesitate to ask.*" />} caps />
          <JsonLd data={faqLd(BUYER_QUESTIONS)} />
          <ul className="mt-12 divide-y divide-rule border-y border-rule" data-reveal-group>
            {BUYER_QUESTIONS.map((item) => (
              <li key={item.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[1.6rem] leading-snug text-fg">{item.q}</span>
                    <Plus size={20} aria-hidden="true" className="mt-1.5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <div className="max-w-3xl pb-6">
                    <p className="text-[17px] leading-relaxed text-fg-muted">{item.a}</p>
                    {item.link &&
                      (item.link.href.startsWith("http") ? (
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline-offset-4 hover:underline">
                          {item.link.label}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link href={item.link.href} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent underline-offset-4 hover:underline">
                          {item.link.label}
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Terms and sources */}
      <section data-surface="ivory" aria-labelledby="terms-title" className="pb-16 pt-24">
        <Container className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionIntro id="terms-title" eyebrow="A few useful terms" title={<Accent text="Words you *may hear.*" />} caps />
            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {TERMS.map((t) => (
                <div key={t.term} className="border-t border-rule pt-4">
                  <dt className="font-display text-[1.45rem] text-fg">{t.term}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-fg-muted">{t.def}</dd>
                </div>
              ))}
            </dl>
            <Link href="/glossary" className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent underline-offset-4 hover:underline">
              The full glossary <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div>
            <h2 className="font-display text-[2rem] leading-tight text-fg">Why these questions matter</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
              These public sources explain general risks and testing principles. They do not endorse Mythos AI Security or prove its capabilities.
            </p>
            <ul className="mt-6 grid gap-3">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block border border-rule bg-panel px-5 py-4 hover:border-antique-gold/60">
                    <span className="flex items-center justify-between gap-3 font-semibold text-fg">
                      {s.name}
                      <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-accent" />
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-fg-muted">{s.body}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ClosingVista
        from="ivory"
        title="Start with the question *you cannot answer.*"
        body="Tell us what you use, what it can reach or what concerns you, and we will help you find the next step. Please do not send passwords or private records in your first message."
        primary={TALK}
        secondary={{ label: "How Engagement Starts", href: "/engagement" }}
        vista="a"
      />
    </PageMotion>
  );
}
