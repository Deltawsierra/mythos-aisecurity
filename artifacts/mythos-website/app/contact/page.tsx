import type { Metadata } from "next";
import { socialImage } from "@/lib/social";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { PageMotion } from "@/components/motion/PageMotion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScenicHero } from "@/components/scenic/ScenicHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { OLYMPUS_MEDIA } from "@/content/media";

export const metadata: Metadata = {
  title: "Contact Mythos: Request an Assessment",
  description:
    "Request an AI assessment or a demo, or start an investor or partnership conversation, without exposing confidential systems through a public form.",
  alternates: { canonical: "/contact/" },
  ...socialImage("contact", "Start With a Defined Scope — Mythos AI Security"),
};

const STEPS = [
  { name: "We read your note", body: "Someone at Mythos AI Security reviews what kind of request it is and what you are trying to decide." },
  { name: "We suggest the right conversation", body: "Assessment, demo, investor, partnership or general — routed to the people who can answer." },
  { name: "Scope comes later, in writing", body: "Systems, goals and constraints are discussed in a scoping conversation, and anything sensitive is shared under an agreement." },
];

const STARTING_POINTS = [
  { label: "An AI agent before its pilot", href: "/use-cases/ai-agent-tools-actions" },
  { label: "An internal knowledge assistant before rollout", href: "/use-cases/internal-knowledge-rag-assistant" },
  { label: "A vendor’s AI joining your systems", href: "/use-cases/partner-vendor-ai-integration" },
  { label: "AI on your data or cloud platform", href: "/use-cases/data-platform-cloud-ai-integration" },
  { label: "A regulated workflow assistant", href: "/use-cases/regulated-workflow-assistant" },
];

const OTHER = [
  { label: "Investors", body: "The thesis, and how to start a conversation.", href: "/investors" },
  { label: "Partnerships", body: "Relationship types and independence rules.", href: "/partnerships" },
  { label: "Careers", body: "No open roles right now — what to do instead.", href: "/careers" },
  { label: "Trust", body: "Authorization, scope and how evidence is handled.", href: "/trust" },
];

/** Contact — Launch Guide §12 /contact: a calm form on parchment with stable trust copy. */
export default function ContactPage() {
  return (
    <PageMotion>
      <ScenicHero
        eyebrow="Contact Mythos AI Security"
        headline="Start With a *Defined Scope.*"
        lede="Tell us what you are building or reviewing. We will help identify the right next conversation without asking you to expose confidential systems through a public form."
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Contact"
        primaryCta={{ label: "Go to the Form", href: "#contact-form" }}
        secondaryCta={{ label: "How Engagement Starts", href: "/engagement" }}
        planes={[
          { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
          { src: OLYMPUS_MEDIA.cliffTemple.src, className: "-right-[3%] bottom-[8%] h-[62%] w-[52%]", fit: "contain", position: "100% 100%", depth: 12, desktopOnly: true },
          { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen", opacity: 0.45, position: "100% 0%", depth: 10 },
        ]}
        compact
        into="parchment"
      />

      {/* Form */}
      <section id="contact-form" data-surface="parchment" aria-labelledby="form-title" className="scroll-mt-24 pb-24 pt-8">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionIntro id="form-title" eyebrow="Your inquiry" title={<Accent text="Tell us *what you need.*" />} lede="Choose the kind of request and share a sentence or two of context. The right fields appear for each type." caps />
            <ol className="mt-8 grid gap-4">
              {STEPS.map((s, i) => (
                <li key={s.name} className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-fg">{s.name}</span>
                    <span className="block text-[15px] leading-relaxed text-fg-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-start gap-3 border-l-2 border-state-contradicted bg-panel px-5 py-4">
              <ShieldAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-state-contradicted-ink" />
              <p className="text-sm leading-relaxed text-fg">
                <span className="font-semibold">Keep sensitive material out.</span> Please don’t send secrets, credentials, private keys, regulated records, customer
                data, source code or incident material through this form. Those are shared only through an agreed, scoped process.
              </p>
            </div>
          </div>
          <div className="border border-rule bg-panel/60 p-6 shadow-[0_40px_80px_-50px_rgba(22,26,28,0.5)] sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Starting points and other routes */}
      <section data-surface="ivory" aria-labelledby="start-title" className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro id="start-title" eyebrow="Good places to start" title={<Accent text="Not sure *what to ask for?*" />} lede="Each of these scenarios explains what an assessment would look at." caps />
            <ul className="mt-8 grid gap-2" data-reveal-group>
              {STARTING_POINTS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="group flex items-center justify-between gap-4 border border-rule bg-panel px-5 py-3.5 text-[15px] text-fg hover:border-antique-gold/60">
                    {s.label}
                    <ArrowRight size={14} aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-[4.5rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Other routes</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2" data-reveal-group>
              {OTHER.map((o) => (
                <li key={o.href}>
                  <Link href={o.href} className="group flex h-full flex-col border border-rule bg-panel p-5 hover:border-antique-gold/60">
                    <span className="font-display text-xl text-fg">{o.label}</span>
                    <span className="mt-1 text-sm text-fg-muted">{o.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-fg-muted">
              You can also email{" "}
              <a href="mailto:info@mythosaisecurity.com" className="font-semibold text-accent hover:underline">
                info@mythosaisecurity.com
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </PageMotion>
  );
}
