/**
 * Data for the /example-report showcase page.
 *
 * The 12 pages below describe an ILLUSTRATIVE, fictional sample deliverable —
 * the "AI Deployment Assurance Evidence Pack". Nothing here represents a real
 * customer engagement, certification, or compliance approval. Every page has a
 * plain-English description and a "useful because" line so the viewer never
 * relies on image-only text.
 */

export interface ReportPage {
  /** 1-based page number as it appears in the deliverable. */
  page: number;
  /** Stable slug used for ids / anchors. */
  id: string;
  /** Short section label (eyebrow). */
  label: string;
  /** Page title. */
  title: string;
  /** Web path under /public. */
  image: string;
  /** Intrinsic image dimensions (avoids layout shift). */
  width: number;
  height: number;
  /** Accessible description of the image. */
  alt: string;
  /** Plain-language, non-technical summary of the page. */
  description: string;
  /** One line on why this page matters to a buyer/stakeholder. */
  useful: string;
}

const DIR = "/images/example-report";

export const REPORT_PAGES: ReportPage[] = [
  {
    page: 1,
    id: "cover",
    label: "Cover",
    title: "AI Deployment Assurance Evidence Pack",
    image: `${DIR}/01-cover.png`,
    width: 1103,
    height: 1426,
    alt: "Confidential report cover titled AI Deployment Assurance Evidence Pack, branded Mythos AI Security, naming the Athena and Achilles engines.",
    description:
      "The report opens with a confidential cover that frames the whole engagement as one question: is this AI deployment safe enough to release? It names the (fictional) client, the engagement type, the version, and the two Mythos engines behind the work.",
    useful:
      "Sets the framing up front — assurance is about a release decision, not a generic security scan.",
  },
  {
    page: 2,
    id: "executive-summary",
    label: "Executive Summary",
    title: "Executive Summary",
    image: `${DIR}/02-executive-summary.png`,
    width: 1103,
    height: 1426,
    alt: "Executive summary page showing an overall deployment readiness score of 81 out of 100, a proceed-with-conditions verdict, finding counts, top blockers, and next steps.",
    description:
      "A single-page leadership readout: an overall readiness score, a clear verdict, the top blockers, what Mythos proved, and the recommended next steps — all in plain language.",
    useful:
      "Lets a non-technical decision-maker grasp the verdict and the path forward in under a minute.",
  },
  {
    page: 3,
    id: "system-in-scope",
    label: "Scope",
    title: "System in Scope",
    image: `${DIR}/03-system-in-scope.png`,
    width: 1103,
    height: 1426,
    alt: "System-in-scope page describing the assessed AI assistant's business function, users, model, connected tools, data sources, deployment architecture, and what is in and out of scope.",
    description:
      "A precise definition of exactly what was assessed — the AI's business function, its users, the model, the connected tools, the data it can reach, and where human review applies — plus what was explicitly left out of scope.",
    useful:
      "Makes the boundaries of the review unambiguous, so no one over-reads the result.",
  },
  {
    page: 4,
    id: "methodology",
    label: "Methodology",
    title: "Methodology & How Mythos Assessed the System",
    image: `${DIR}/04-methodology.png`,
    width: 1103,
    height: 1426,
    alt: "Methodology page explaining the Athena offensive engine and Achilles validation engine, and the map, test, prove, review, and retest cycle.",
    description:
      "How the assessment was actually performed. Athena maps where risk can exist; Achilles safely validates how the system behaves. Together they follow a repeatable map → test → prove → review → retest cycle.",
    useful:
      "Shows the verdict is backed by a structured, repeatable method — not an opinion.",
  },
  {
    page: 5,
    id: "risk-overview-dashboard",
    label: "Risk Overview",
    title: "Risk Overview Dashboard",
    image: `${DIR}/05-risk-overview-dashboard.png`,
    width: 1103,
    height: 1426,
    alt: "Risk overview dashboard with severity distribution, findings by category and system area, validation pass/fail, and a business-impact-versus-likelihood matrix.",
    description:
      "A visual summary of where risk concentrates — findings by severity, category, and system area, alongside a business-impact-versus-likelihood map that highlights the few areas most likely to cause harm.",
    useful:
      "Points teams straight at the handful of areas where a fix matters most.",
  },
  {
    page: 6,
    id: "priority-findings",
    label: "Priority Findings",
    title: "Priority Findings (Critical & High)",
    image: `${DIR}/06-priority-findings.png`,
    width: 1086,
    height: 1448,
    alt: "Priority findings page listing critical and high issues, each with what was found, why it matters, affected components, recommended action, and whether a retest is required.",
    description:
      "The short list of issues that must be addressed before release. Each one explains what was found, why it matters, the affected components, and a recommended action — with a clear retest flag.",
    useful:
      "Turns a long finding list into a short, ordered action plan for the release.",
  },
  {
    page: 7,
    id: "detailed-finding-register",
    label: "Finding Register",
    title: "Detailed Finding Register",
    image: `${DIR}/07-detailed-finding-register.png`,
    width: 1103,
    height: 1426,
    alt: "Detailed finding register table listing every assessed finding with ID, severity, title, category, affected area, status, remediation priority, and retest needed.",
    description:
      "The full, structured register of every assessed finding — ID, severity, category, affected area, status, remediation priority, and whether a retest is required.",
    useful:
      "Gives engineering and security teams a single source of truth to track remediation.",
  },
  {
    page: 8,
    id: "scenario-testing-results",
    label: "Scenario Testing",
    title: "Scenario Testing Results (Achilles)",
    image: `${DIR}/08-scenario-testing-results.png`,
    width: 1024,
    height: 1536,
    alt: "Scenario testing results page summarizing 42 scenarios run across eight types with a pass/fail rate, scenario type breakdown, and representative results.",
    description:
      "The results of safely running realistic adversarial scenarios against the AI — prompt injection, goal hijacking, unsafe tool use, and more — with pass/fail outcomes and notes on how the system responded.",
    useful:
      "Demonstrates how the system actually behaves under pressure, backed by evidence.",
  },
  {
    page: 9,
    id: "remediation-guidance",
    label: "Remediation",
    title: "Remediation Guidance",
    image: `${DIR}/09-remediation-guidance.png`,
    width: 1024,
    height: 1536,
    alt: "Remediation guidance table pairing each issue with a recommended fix, priority, suggested owner and effort, and the expected outcome.",
    description:
      "Practical, prioritized fixes tied to each finding — the recommended change, a suggested owner and effort, and the expected outcome once the issue is resolved.",
    useful:
      "Hands teams a concrete, prioritized work plan instead of vague advice.",
  },
  {
    page: 10,
    id: "release-readiness-decision",
    label: "Release Decision",
    title: "Release Readiness Decision",
    image: `${DIR}/10-release-readiness-decision.png`,
    width: 1024,
    height: 1536,
    alt: "Release readiness decision page showing a proceed-with-conditions recommendation and columns for what is approved, conditionally acceptable, blocked until fixed, and operational cautions.",
    description:
      "Mythos translates technical validation into a clear release recommendation — what is approved, what is conditionally acceptable, what is blocked until fixed, and what must be revalidated before go-live.",
    useful:
      "Connects the evidence directly to a defensible go / no-go decision.",
  },
  {
    page: 11,
    id: "retest-plan",
    label: "Retest Plan",
    title: "Retest Plan & Next Steps",
    image: `${DIR}/11-retest-plan.png`,
    width: 1103,
    height: 1426,
    alt: "Retest plan page outlining the retest window and scope, what the client should provide, a five-step retest timeline, and recommended longer-term follow-up.",
    description:
      "The path from remediation back to an updated release recommendation — the retest scope, what the client should provide, a step-by-step timeline, and recommended longer-term follow-up.",
    useful:
      "Makes assurance ongoing, not a one-time snapshot.",
  },
  {
    page: 12,
    id: "appendix-evidence-summary",
    label: "Appendix",
    title: "Appendix / Evidence Summary",
    image: `${DIR}/12-appendix-evidence-summary.png`,
    width: 1024,
    height: 1536,
    alt: "Appendix and evidence summary page inventorying evidence-pack components, scenarios executed, artifacts collected, tools reviewed, routes tested, plus assumptions, limitations, and a glossary.",
    description:
      "The supporting inventory behind the report — evidence-pack components, scenarios executed, artifacts collected, tools reviewed, and routes tested — alongside the assumptions, limitations, and a glossary of terms.",
    useful:
      "Shows the depth of proof that stands behind every conclusion.",
  },
];

export interface DemonstratesCard {
  icon: "evidence" | "decision" | "leadership" | "engineering" | "ongoing";
  title: string;
  description: string;
}

export const DEMONSTRATES: DemonstratesCard[] = [
  {
    icon: "evidence",
    title: "Evidence over opinion",
    description:
      "Every conclusion is tied to traceable material — scenarios, logs, and test results — not assertions.",
  },
  {
    icon: "decision",
    title: "A decision, not a scan",
    description:
      "The deliverable ends in a clear release recommendation a leader can actually act on.",
  },
  {
    icon: "leadership",
    title: "Readable for leadership",
    description:
      "An executive summary and readiness score make the verdict legible to non-technical stakeholders.",
  },
  {
    icon: "engineering",
    title: "Depth for engineers",
    description:
      "A structured finding register and remediation guidance give technical teams a concrete plan.",
  },
  {
    icon: "ongoing",
    title: "Assurance that continues",
    description:
      "A retest plan turns a one-time review into an ongoing release gate as the system changes.",
  },
];
