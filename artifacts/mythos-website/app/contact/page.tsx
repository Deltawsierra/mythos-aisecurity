import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mythos AI Security to request an assessment, demo, investor conversation, partnership discussion, or general inquiry.",
};

/* ── Shared style tokens ──────────────────────────────────── */
const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

/* ── Section · What happens after you reach out ───────────── */
const STEPS = [
  {
    title: "Mythos reviews the inquiry.",
    description:
      "Your request is reviewed for relevance, request type, and the appropriate next step.",
  },
  {
    title: "The right conversation path is selected.",
    description:
      "Assessment, demo, investor, partnership, or general; routed to the right team.",
  },
  {
    title: "Scope, goals, and constraints are clarified.",
    description:
      "Mythos confirms the system, deployment stage, and concerns that matter most.",
  },
  {
    title: "An assessment or demo next step is prepared.",
    description:
      "If appropriate, Mythos prepares a scoped assessment or a private walkthrough.",
  },
];

/* ── Section · Common starting points ─────────────────────── */
const STARTING_POINTS = [
  "AI agent preparing for pilot",
  "Internal RAG assistant before rollout",
  "Vendor AI integration review",
  "Cloud/data AI integration",
  "Regulated workflow assistant",
  "Use case or investor discussion",
];

export default function ContactPage() {
  return (
    <>
      {/* 1 · Contact Hero ─────────────────────────────────── */}
      <section
        className="relative flex min-h-[58vh] items-center overflow-hidden border-b border-ivory/5 bg-obsidian"
        aria-label="Contact hero"
      >
        {/* Restrained background texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian bg-cover bg-center"
          style={{ backgroundImage: "url(/images/contact/contact-hero.webp)" }}
        />
        {/* Lighter readability scrim — lets the cinematic background show through
            while keeping a darker pocket behind the centered copy. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.36) 45%, rgba(5,5,5,0.72) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 58% at 50% 50%, rgba(5,5,5,0.5) 0%, transparent 72%)",
          }}
        />
        {/* Bottom divider glow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.3) 30%, rgba(166,106,50,0.3) 70%, transparent)",
          }}
        />

        <Container className="relative z-10 py-20 lg:py-24">
          <ScrollReveal y={20}>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>Contact Mythos</p>
              <h1 className="mb-6 text-4xl font-normal leading-tight text-ivory sm:text-5xl">
                Start the right assessment conversation.
              </h1>
              <p className={`${BODY} mx-auto mb-8 max-w-xl sm:text-lg`}>
                Tell Mythos what you are building, connecting, preparing to
                deploy, or evaluating. We will route the inquiry to the right
                next step: assessment, demo, investor conversation, partnership
                discussion, or general contact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="#contact-form" variant="primary" size="lg">
                  Request Assessment
                </Button>
                <Button href="/demo" variant="secondary" size="lg">
                  Request Demo
                </Button>
              </div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze/70">
                All inquiries are reviewed confidentially
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 2 · Inquiry form (selector + conditional fields) ──── */}
      <section
        id="contact-form"
        className="relative scroll-mt-24 overflow-hidden border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="form-heading"
      >
        {/* Background plate — glowing altar reads on the left, dark smoke behind the form on the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian bg-cover bg-center"
          style={{ backgroundImage: "url(/images/contact/contact-form-bg.webp)" }}
        />
        {/* Horizontal readability gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.55) 42%, rgba(5,5,5,0.5) 66%, rgba(5,5,5,0.62) 100%)",
          }}
        />
        {/* Vertical blend to soften the section seams */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.22) 24%, rgba(5,5,5,0.3) 74%, rgba(5,5,5,0.7) 100%)",
          }}
        />
        <Container className="relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <ScrollReveal>
              <div>
                <p className={EYEBROW}>Inquiry routing</p>
                <h2 id="form-heading" className={HEADING}>
                  Tell Mythos what you need.
                </h2>
                <p className={`${BODY} max-w-sm`}>
                  Choose the inquiry type, share a little context, and Mythos will
                  route your message to the right next step.
                </p>
                <ul className="mt-8 flex flex-col gap-5">
                  <li className="border-l-2 border-bronze/30 pl-5">
                    <p className="mb-1 text-sm font-semibold text-ivory">
                      Request Assessment
                    </p>
                    <p className="text-sm leading-relaxed text-muted-stone">
                      Start a scoped Mythos review of a real AI system, workflow,
                      or strategic scenario.
                    </p>
                  </li>
                  <li className="border-l-2 border-ivory/15 pl-5">
                    <p className="mb-1 text-sm font-semibold text-ivory">
                      Demo, investor, partnership, or general
                    </p>
                    <p className="text-sm leading-relaxed text-muted-stone">
                      Switch the inquiry type above the form and the right fields
                      appear automatically.
                    </p>
                  </li>
                  <li className="border-l-2 border-ivory/15 pl-5">
                    <p className="mb-1 text-sm font-semibold text-ivory">
                      Confidential by default
                    </p>
                    <p className="text-sm leading-relaxed text-muted-stone">
                      Messages are reviewed for business follow-up and handled
                      with care.
                    </p>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="border border-ivory/8 bg-charcoal/70 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 3 · What happens after you reach out ─────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="next-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-xl">
              <p className={EYEBROW}>Next steps</p>
              <h2 id="next-heading" className={HEADING}>
                What happens after you reach out.
              </h2>
            </div>
          </ScrollReveal>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col border-t-2 border-t-bronze/40 bg-charcoal p-7"
              >
                <span className="mb-4 font-display text-2xl font-normal text-bronze/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-base font-semibold text-ivory">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-stone">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 4 · What not to submit ───────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="care-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl border border-bronze/25 bg-charcoal p-8 lg:p-10">
              <p className={EYEBROW}>What not to submit</p>
              <h2
                id="care-heading"
                className="mb-4 text-2xl font-normal leading-tight text-ivory lg:text-3xl"
              >
                Keep sensitive material out of the form.
              </h2>
              <p className={`${BODY} mb-4`}>
                Please do not submit secrets, credentials, private keys, regulated
                records, sensitive customer data, proprietary source code, or
                production incident material through this form.
              </p>
              <p className="text-sm leading-relaxed text-muted-stone/70">
                Sensitive details should be shared only through an approved,
                scoped process.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5 · Common starting points ───────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="starting-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-xl">
              <p className={EYEBROW}>Common starting points</p>
              <h2 id="starting-heading" className={HEADING}>
                Where most conversations begin.
              </h2>
              <p className={BODY}>
                A few of the most common reasons teams reach out to Mythos.
              </p>
            </div>
          </ScrollReveal>
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STARTING_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 border border-ivory/8 bg-charcoal p-6"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze"
                />
                <span className="text-sm font-medium text-ivory">{point}</span>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </section>
    </>
  );
}
