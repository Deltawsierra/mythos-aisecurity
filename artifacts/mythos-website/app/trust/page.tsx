import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Trust & Security",
  description:
    "Learn how Mythos AI Security approaches authorized testing, sensitive information, responsible disclosure, product claim boundaries, and evidence-first AI deployment assurance.",
};

/* ── Shared style tokens ──────────────────────────────────── */
const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

const SECURITY_EMAIL = "info@mythosaisecurity.com";

/* ── Section 2 · Trust posture ────────────────────────────── */
const POSTURE = [
  {
    title: "Authorized",
    description:
      "Testing should only happen with customer approval and a defined scope.",
  },
  {
    title: "Scoped",
    description:
      "Systems, data, roles, tools, environments, and limits should be clear before review begins.",
  },
  {
    title: "Evidence-first",
    description:
      "Findings should connect to proof, remediation guidance, and retest requirements.",
  },
];

/* ── Section 3 · Sensitive conversations ──────────────────── */
const PUBLIC_OK = [
  "General system type",
  "Deployment stage",
  "Primary concern",
  "Company contact information",
  "High-level description of the AI workflow",
  "Preferred next step",
];

const SCOPED_WAIT = [
  "Production architecture details",
  "Sensitive security findings",
  "Proprietary source code",
  "Customer data",
  "Regulated records",
  "Credentials, secrets, keys, or tokens",
  "Sensitive incident details",
];

/* ── Section 4 · Authorized and scoped testing ────────────── */
const SCOPE_CHECKLIST = [
  "Systems in scope",
  "Systems out of scope",
  "Test environment",
  "Data boundaries",
  "Approved user roles",
  "Approved tools and actions",
  "Safety limits",
  "Retest expectations",
  "Reporting requirements",
];

/* ── Section 6 · Data handling principles ─────────────────── */
const DATA_PRINCIPLES = [
  {
    title: "Minimize what is shared",
    description: "Only request information needed for the assessment path.",
  },
  {
    title: "Separate public forms from scoped review",
    description:
      "Sensitive details should not be submitted through general website forms.",
  },
  {
    title: "Use evidence carefully",
    description:
      "Assessment evidence should support findings, remediation, and retest decisions.",
  },
  {
    title: "Avoid unnecessary retention",
    description:
      "Information should not be kept longer than needed for the approved business purpose.",
  },
  {
    title: "Keep humans accountable",
    description:
      "Mythos supports human-reviewed security, product, compliance, and deployment decisions.",
  },
];

/* ── Section 7 · Responsible disclosure ───────────────────── */
const DISCLOSURE_INCLUDE = [
  "A clear description of the issue",
  "Steps to reproduce, if safe",
  "Affected URL or system",
  "Potential impact",
  "Your contact information",
];

/* ── Section 8 · Product claim boundaries ─────────────────── */
const PRODUCT_BOUNDARIES: {
  name: string;
  label: string | null;
  description: string;
}[] = [
  {
    name: "Athena",
    label: null,
    description:
      "Athena helps map systems, access, data flows, model routes, permissions, findings, remediation guidance, and evidence.",
  },
  {
    name: "Achilles",
    label: null,
    description:
      "Achilles helps test AI behavior, RAG, prompt injection, tool use, approval boundaries, release readiness, and retest behavior.",
  },
  {
    name: "Minotaur",
    label: "Internal only",
    description:
      "Minotaur is internal-only adversarial validation support and is not presented as a customer-facing product.",
  },
  {
    name: "Hermes",
    label: "Strategic horizon",
    description:
      "Project Hermes is a strategic horizon direction for AI-driven vehicle, fleet, autonomy, telematics, OTA/model update, and cyber-physical mobility assurance. It is not a vehicle safety certification or crash-prevention guarantee.",
  },
  {
    name: "Quantum-adjacent AI",
    label: "Strategic R&D",
    description:
      "Quantum-adjacent AI is a strategic R&D scenario. It is not a claim of current quantum-safe certification, quantum hardware validation, or production quantum integration capability.",
  },
];

/* ── Section 9 · Contact security ─────────────────────────── */
const CONTACT_SUBJECTS = [
  "Security Report — Mythos Website",
  "Assessment Scope Question",
  "Sensitive Information Handling Question",
];

const DISCLOSURE_BODY =
  "If you believe you have found a security issue affecting Mythos AI Security\u2019s public website or systems, please report it responsibly. Do not access, modify, delete, exfiltrate, or disrupt data. Do not test third-party systems, customer systems, or non-public Mythos environments without written authorization.";

export default function TrustPage() {
  return (
    <>
      {/* 1 · Trust & Security Hero ─────────────────────────── */}
      <section
        className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-ivory/5 bg-obsidian"
        aria-label="Trust and Security hero"
      >
        {/* Archive of Authorized Proof plate */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/heroes/Trust-Hero-Background.png)",
          }}
        />
        {/* Desktop left-weighted readability scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.86) 32%, rgba(5,5,5,0.5) 62%, rgba(5,5,5,0.24) 100%)",
          }}
        />
        {/* Mobile vertical scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.74) 0%, rgba(5,5,5,0.6) 42%, rgba(5,5,5,0.9) 100%)",
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
            <div className="max-w-2xl">
              <p className={EYEBROW}>Trust &amp; Security</p>
              <h1 className="mb-6 text-4xl font-normal leading-tight text-ivory sm:text-5xl lg:text-[3.25rem]">
                Built for careful security conversations before trust expands.
              </h1>
              <p className={`${BODY} max-w-xl sm:text-lg`}>
                Mythos AI Security works around sensitive AI, security, data, and
                deployment questions. This page explains how Mythos approaches
                authorization, scope, sensitive information, responsible
                disclosure, and product claim boundaries.
              </p>
              <p className="mt-9 text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze/70">
                Authorized
                <span className="mx-2.5 text-muted-stone/40">/</span>
                Scoped
                <span className="mx-2.5 text-muted-stone/40">/</span>
                Evidence-first
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 2 · Trust posture statement ───────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="posture-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Trust posture</p>
              <h2 id="posture-heading" className={HEADING}>
                Trust starts with boundaries.
              </h2>
              <p className={BODY}>
                Mythos assessments should be authorized, scoped, non-destructive,
                and controlled by the customer. The goal is to help organizations
                understand AI deployment risk through evidence, not to create
                uncontrolled testing, unapproved access, or unsupported claims.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {POSTURE.map((card) => (
                <div
                  key={card.title}
                  className="border border-ivory/8 bg-charcoal p-7 transition-colors duration-300 hover:border-bronze/30"
                >
                  <h3 className="mb-2 text-lg font-normal text-ivory">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 3 · How Mythos handles sensitive conversations ────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="sensitive-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Sensitive conversations</p>
              <h2 id="sensitive-heading" className={HEADING}>
                How Mythos handles sensitive conversations.
              </h2>
              <p className={BODY}>
                Early conversations should focus on the system type, deployment
                stage, risk concerns, and assessment goals. Sensitive technical
                details should be shared only through an approved, scoped process.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Panel 1 · public-form appropriate */}
              <div className="border border-ivory/8 border-t-2 border-t-bronze/60 bg-charcoal p-7">
                <h3 className="mb-5 text-lg font-normal text-ivory">
                  Appropriate for public forms
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {PUBLIC_OK.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-stone"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-bronze/70"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel 2 · scoped-process only */}
              <div className="border border-ivory/8 border-t-2 border-t-ivory/15 bg-graphite p-7">
                <h3 className="mb-5 text-lg font-normal text-ivory">
                  Should wait for a scoped process
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {SCOPED_WAIT.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-stone"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-muted-stone/40"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 4 · Authorized and scoped testing ─────────────────── */}
      <section
        className="border-b border-ivory/5 bg-charcoal py-20 lg:py-28"
        aria-labelledby="scoped-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Authorized testing</p>
              <h2 id="scoped-heading" className={HEADING}>
                Authorized and scoped testing.
              </h2>
              <p className={BODY}>
                Mythos testing should be conducted only under explicit
                authorization. Scope should define what systems are included,
                what systems are excluded, what environments may be tested, what
                data may be used, what actions are allowed, and what limits apply.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-ivory/8 bg-ivory/8 sm:grid-cols-2 lg:grid-cols-3">
              {SCOPE_CHECKLIST.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-graphite p-6"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 flex-none rotate-45 border border-bronze/70"
                  />
                  <span className="text-sm leading-relaxed text-ivory/85">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl border-l-2 border-bronze/40 pl-5 text-sm leading-relaxed text-muted-stone">
              Mythos does not authorize independent testing of customer systems,
              third-party systems, or Mythos systems outside an approved process.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5 · No secrets in public forms ────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="nosecrets-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <div className="border border-bronze/40 bg-obsidian/60 p-8 backdrop-blur-sm lg:p-10">
                <p className={EYEBROW}>Please note</p>
                <h2 id="nosecrets-heading" className={HEADING}>
                  No secrets in public forms.
                </h2>
                <p className={BODY}>
                  Public website forms are not the right place to submit
                  sensitive production material. Please do not submit secrets,
                  credentials, private keys, regulated records, private customer
                  data, proprietary source code, classified information, or
                  sensitive production incident details through public forms.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ivory/70">
                  If sensitive material is needed for an assessment, Mythos should
                  request it only through an approved, scoped, and controlled
                  process.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 6 · Data handling principles ──────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="data-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Data handling</p>
              <h2 id="data-heading" className={HEADING}>
                Data handling principles.
              </h2>
              <p className={BODY}>
                Mythos is building its process around minimizing unnecessary data
                exposure. Assessment conversations and evidence handling should be
                limited to what is needed for the agreed scope.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-ivory/8 bg-ivory/8 sm:grid-cols-2 lg:grid-cols-3">
              {DATA_PRINCIPLES.map((principle, i) => (
                <div
                  key={principle.title}
                  className="flex flex-col bg-graphite p-7 transition-colors duration-300 hover:bg-charcoal"
                >
                  <span className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-bronze/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 text-lg font-normal text-ivory">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 7 · Responsible disclosure ────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-charcoal py-20 lg:py-28"
        aria-labelledby="disclosure-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className={EYEBROW}>Responsible disclosure</p>
                <h2 id="disclosure-heading" className={HEADING}>
                  Responsible disclosure.
                </h2>
                <p className={BODY}>{DISCLOSURE_BODY}</p>
                <p className="mt-6 mb-4 text-sm font-semibold text-ivory">
                  A report should include:
                </p>
                <ul className="flex flex-col gap-3" role="list">
                  {DISCLOSURE_INCLUDE.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-stone"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-bronze/70"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-ivory/8 bg-graphite p-7 lg:p-8">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze/70">
                  Report a security issue
                </p>
                <a
                  href={`mailto:${SECURITY_EMAIL}`}
                  className="text-lg text-bronze transition-colors duration-200 hover:text-antique-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                >
                  {SECURITY_EMAIL}
                </a>
                <div className="mt-5 border-t border-ivory/8 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-stone/60">
                    Suggested subject
                  </p>
                  <p className="mt-2 text-sm text-ivory/85">
                    Security Report — Mythos Website
                  </p>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-stone/80">
                  Submitting a report does not authorize further testing,
                  exploitation, persistence, data access, service disruption, or
                  public disclosure.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 8 · Product claim boundaries ──────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="boundaries-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className={EYEBROW}>Product claim boundaries</p>
              <h2 id="boundaries-heading" className={HEADING}>
                Product claim boundaries.
              </h2>
              <p className={BODY}>
                Mythos is careful about how it describes its products, strategic
                horizon work, and assessment outcomes. Mythos does not claim
                compliance certification, government authorization, customer
                assurance, vehicle safety certification, quantum-safe
                certification, or guaranteed AI safety unless explicitly stated
                and supported.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRODUCT_BOUNDARIES.map((product) => (
                <div
                  key={product.name}
                  className="flex flex-col border border-ivory/8 border-l-2 border-l-bronze/50 bg-charcoal p-7 transition-colors duration-300 hover:border-l-bronze"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-normal text-ivory">
                      {product.name}
                    </h3>
                    {product.label ? (
                      <span className="border border-bronze/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/80">
                        {product.label}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-stone">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 9 · Contact security ──────────────────────────────── */}
      <section
        className="border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="contact-security-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className={EYEBROW}>Contact security</p>
                <h2 id="contact-security-heading" className={HEADING}>
                  Contact security.
                </h2>
                <p className={BODY}>
                  For security reports, sensitive assessment questions, or
                  concerns about how to share technical information, contact
                  Mythos before submitting sensitive details.
                </p>
              </div>
              <div className="border border-ivory/8 bg-graphite p-7 lg:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-stone/60">
                  General and security inquiries
                </p>
                <a
                  href={`mailto:${SECURITY_EMAIL}`}
                  className="mt-2 inline-block text-lg text-bronze transition-colors duration-200 hover:text-antique-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                >
                  {SECURITY_EMAIL}
                </a>
                <div className="mt-6 border-t border-ivory/8 pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-stone/60">
                    Suggested subject lines
                  </p>
                  <ul className="flex flex-col gap-2.5" role="list">
                    {CONTACT_SUBJECTS.map((subject) => (
                      <li
                        key={subject}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ivory/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-bronze/70"
                        />
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 10 · Final CTA ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-obsidian py-24 lg:py-32"
        aria-labelledby="trust-cta-heading"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/vault-cta-bg.webp)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.45) 62%, rgba(5,5,5,0.86) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.35) 25%, rgba(166,106,50,0.35) 75%, transparent)",
          }}
        />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>Start the right conversation</p>
              <h2
                id="trust-cta-heading"
                className="mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl"
              >
                Have a sensitive AI deployment question?
              </h2>
              <p className={`${BODY} mb-10`}>
                Start with a high-level inquiry. Mythos can help determine the
                right conversation path before sensitive technical details are
                shared.
              </p>
              <div className="flex justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  Contact Mythos
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
