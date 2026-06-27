import type { Metadata } from "next";
import {
  FileCheck2,
  Gavel,
  Presentation,
  Wrench,
  RefreshCw,
  ShieldAlert,
  Download,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { ReportTheater } from "@/components/example-report/ReportTheater";
import { DEMONSTRATES, type DemonstratesCard } from "@/data/exampleReport";
import { CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Example Report",
  description:
    "See an illustrative Mythos AI Deployment Assurance Evidence Pack — a 12-page sample deliverable covering scope, methodology, findings, scenario testing, remediation, and a release readiness decision. Fictional data, for demonstration only.",
};

const EYEBROW =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze";
const HEADING =
  "mb-5 text-3xl font-normal leading-tight text-ivory lg:text-4xl";
const BODY = "text-base leading-relaxed text-muted-stone";

const REPORT_PDF = "/example-report/ai-deployment-assurance-evidence-pack.pdf";

const DEMONSTRATES_ICONS: Record<DemonstratesCard["icon"], LucideIcon> = {
  evidence: FileCheck2,
  decision: Gavel,
  leadership: Presentation,
  engineering: Wrench,
  ongoing: RefreshCw,
};

export default function ExampleReportPage() {
  return (
    <>
      {/* 1 · Hero ──────────────────────────────────────────── */}
      <section
        className="relative isolate -mt-16 overflow-hidden border-b border-ivory/5 bg-obsidian lg:-mt-20"
        aria-label="Example report hero"
      >
        {/* Bronze radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 8%, rgba(166,106,50,0.22), transparent 70%)",
          }}
        />
        {/* Bottom vignette into next section */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.4) 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.9) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,106,50,0.3) 30%, rgba(166,106,50,0.3) 70%, transparent)",
          }}
        />

        <Container className="relative z-10 flex min-h-[70svh] items-center pt-28 pb-20 lg:min-h-[74vh] lg:pt-36 lg:pb-28">
          <ScrollReveal y={0} className="mx-auto max-w-3xl text-center">
            <p className={EYEBROW}>Example Report</p>
            <h1 className="font-display text-4xl font-normal leading-[1.1] text-ivory sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              See what a Mythos{" "}
              <span className="text-antique-gold">assurance deliverable</span>{" "}
              looks like.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-stone sm:text-lg">
              This is an illustrative, 12-page AI Deployment Assurance Evidence
              Pack — the kind of report a Mythos assessment produces. Walk through
              the scope, methodology, findings, scenario testing, remediation, and
              the final release decision, each explained in plain language.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-stone/75">
              Fictional data. No real customer engagement. For demonstration only.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                href="#report-viewer"
                variant="primary"
                size="lg"
                className="bronze-glow"
              >
                Review the Report
              </Button>
              <Button
                href={REPORT_PDF}
                download
                variant="secondary"
                size="lg"
                className="gap-2"
              >
                <Download size={15} strokeWidth={1.75} aria-hidden="true" />
                Download PDF
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 2 · Illustrative-only disclaimer ──────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-14 lg:py-16"
        aria-labelledby="disclaimer-heading"
      >
        <Container>
          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl border border-bronze/25 bg-obsidian/50 p-7 backdrop-blur-sm lg:p-9">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent"
              />
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-bronze/30 bg-charcoal/60 text-bronze">
                  <ShieldAlert size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h2
                    id="disclaimer-heading"
                    className="font-display text-xl font-normal leading-tight text-ivory"
                  >
                    Illustrative example only
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-stone">
                    This sample report uses entirely fictional data and a
                    made-up scenario. It is not based on a real customer
                    engagement, and it is not a certification, audit result, or
                    statement of compliance. Its only purpose is to show the
                    structure, depth, and clarity of a Mythos assessment
                    deliverable. Real engagements are scoped, tested, and
                    reported against your actual AI system.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 3 · Report viewer ─────────────────────────────────── */}
      <section
        id="report-viewer"
        className="scroll-mt-24 border-b border-ivory/5 bg-obsidian py-20 lg:py-28"
        aria-labelledby="viewer-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>The Deliverable</p>
            <h2 id="viewer-heading" className={HEADING}>
              The evidence pack, page by page
            </h2>
            <p className={BODY}>
              Scroll through all twelve pages. The panel keeps pace with the page
              you are viewing, explaining what each one shows and why it matters.
              Open any page larger to read it in full detail.
            </p>
            <div className="mt-7">
              <Button href={REPORT_PDF} download variant="secondary" className="gap-2">
                <Download size={14} strokeWidth={1.75} aria-hidden="true" />
                Download all 12 pages (PDF)
              </Button>
            </div>
          </ScrollReveal>

          <ReportTheater />
        </Container>
      </section>

      {/* 4 · What this example demonstrates ────────────────── */}
      <section
        className="border-b border-ivory/5 bg-graphite py-20 lg:py-28"
        aria-labelledby="demonstrates-heading"
      >
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className={EYEBROW}>Why It Matters</p>
            <h2 id="demonstrates-heading" className={HEADING}>
              What this example demonstrates
            </h2>
            <p className={BODY}>
              A Mythos deliverable is built to do one job: make the next
              deployment decision easier and more defensible. Here is what a
              report like this gives each part of your organization.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEMONSTRATES.map((card) => {
              const Icon = DEMONSTRATES_ICONS[card.icon];
              return (
                <div
                  key={card.title}
                  className="group relative flex h-full flex-col border border-bronze/20 bg-charcoal/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-bronze/45"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent"
                  />
                  <span className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center border border-bronze/30 bg-obsidian/60 text-bronze">
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-normal leading-tight text-ivory">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-stone">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      {/* 5 · Final CTA ─────────────────────────────────────── */}
      <section
        className="bg-obsidian py-20 lg:py-28"
        aria-labelledby="cta-heading"
      >
        <Container>
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className={EYEBROW}>Your AI System</p>
            <h2 id="cta-heading" className={HEADING}>
              See this kind of evidence for your own deployment.
            </h2>
            <p className={`${BODY} mx-auto max-w-xl`}>
              A scoped Mythos assessment produces a report like this for your
              actual AI system — mapped, tested, and reported against your
              deployment, with a clear release recommendation at the end.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact?intent=assessment"
                variant="primary"
                size="lg"
                className="bronze-glow"
              >
                {CTA.PRIMARY}
              </Button>
              <Button href="/use-cases" variant="secondary" size="lg">
                Explore Use Cases
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
