/**
 * Platform registry — the single source for project names, roles, canonical
 * lines and platform routes. Navigation, page scaffolds and (later) feature
 * cards read from here so product wording cannot drift page to page.
 *
 * Wording follows the October 2026 blueprint (Section 14, canonical product
 * lines). Any specific capability claim belongs in content/claims.ts, where it
 * carries a verification flag for the launch gate.
 */
import type { ProjectId } from "@/content/media";

export const CANONICAL = {
  category: "AI Deployment Assurance",
  masterDescription:
    "Mythos independently verifies what an AI system can access, what authority it has, how it behaves, what effects it can produce, what those effects could mean to the business, and whether the evidence supporting deployment is still valid.",
  lifecycle: "Discover → Understand → Test → Prove → Revalidate",
  commercialUnit: "AI systems under assurance",
  evidencePhilosophy: "Unknown is better than false certainty.",
  remediationPhilosophy:
    "A fix is not complete until the original failure is retested.",
  decisionAuthority:
    "Mythos provides evidence and decision support; customers retain final approval.",
} as const;

export interface Project {
  id: ProjectId;
  name: string;
  /** Canonical two-to-four word role line. */
  tagline: string;
  /** One-sentence public role. */
  role: string;
  href: string;
}

export const PROJECTS: Project[] = [
  {
    id: "athena",
    name: "Athena",
    tagline: "See the System",
    role: "Maps what exists, what is exposed, where requests travel, and what evidence proves the system state.",
    href: "/platform/athena",
  },
  {
    id: "spine",
    name: "SPINE",
    tagline: "Maintain the Truth",
    role: "Keeps claims, authority, evidence and deployment decisions current as the system changes.",
    href: "/platform/spine",
  },
  {
    id: "achilles",
    name: "Achilles",
    tagline: "Test the AI",
    role: "Tests whether the AI can cause an effect it was not authorized to cause.",
    href: "/platform/achilles",
  },
  {
    id: "minotaur",
    name: "Minotaur",
    tagline: "Test Mythos",
    role: "Validates Mythos' own methodology and release quality — the answer to who tests the tester.",
    href: "/platform/validation",
  },
  {
    id: "hermes",
    name: "Hermes",
    tagline: "Assure Physical AI",
    role: "Extends the Mythos assurance model into vehicles, fleets and other cyber-physical AI.",
    href: "/platform/hermes",
  },
];

export type LifecycleStageId =
  | "discover"
  | "understand"
  | "test"
  | "prove"
  | "revalidate";

export const LIFECYCLE: { id: LifecycleStageId; name: string; summary: string }[] = [
  {
    id: "discover",
    name: "Discover",
    summary: "Map what exists — AI systems, routes, identities, data and the tools they can reach.",
  },
  {
    id: "understand",
    name: "Understand",
    summary: "Establish what each system is authorized to do, and what evidence supports it.",
  },
  {
    id: "test",
    name: "Test",
    summary: "Challenge behavior and authority: can the AI cause an effect it was not authorized to cause?",
  },
  {
    id: "prove",
    name: "Prove",
    summary: "Turn results into claims, receipts and a deployment decision a human can verify.",
  },
  {
    id: "revalidate",
    name: "Revalidate",
    summary: "When the system changes, retest what the change invalidated — and keep the evidence current.",
  },
];

export type EvidenceStateId =
  | "declared"
  | "observed"
  | "verified"
  | "unknown"
  | "stale"
  | "contradicted";

export const EVIDENCE_STATES: {
  id: EvidenceStateId;
  name: string;
  meaning: string;
}[] = [
  { id: "declared", name: "Declared", meaning: "Stated by the customer or a vendor; not yet observed." },
  { id: "observed", name: "Observed", meaning: "Seen by Mythos in the running system." },
  { id: "verified", name: "Verified", meaning: "Confirmed by testing, with evidence behind it." },
  { id: "unknown", name: "Unknown", meaning: "Not enough evidence yet — never shown as a pass." },
  { id: "stale", name: "Stale", meaning: "Was verified, but a change means it must be revalidated." },
  { id: "contradicted", name: "Contradicted", meaning: "The evidence conflicts with the claim." },
];

/** A v2 route that exists as a reviewable scaffold until its full build lands. */
export interface ScaffoldPage {
  slug: string;
  href: string;
  /** Short name used in navigation and breadcrumbs. */
  navLabel: string;
  /** One line under the nav label in menus. */
  navDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  /** Blueprint section order — what the finished page will contain. */
  plannedSections: string[];
  /**
   * Set once the page's full build replaces its scaffold. Dynamic [slug]
   * routes stop generating it and it no longer blocks the release gate.
   */
  built?: boolean;
}

export const PLATFORM_PAGES: ScaffoldPage[] = [
  {
    slug: "athena",
    href: "/platform/athena",
    navLabel: "Athena",
    navDescription: "See the System — discovery, exposure and evidence.",
    eyebrow: "Athena",
    headline: "See the System.",
    lede: "Athena answers what exists, what is exposed, where requests travel, and what evidence proves the system state.",
    plannedSections: [
      "What Athena discovers and tests",
      "The scanner engine, grouped by outcome",
      "Differential evidence",
      "Coverage Manifest",
      "AI route and endpoint attestation",
      "From Athena finding to SPINE claim",
      "Dashboard views",
      "Outputs and use cases",
    ],
  },
  {
    slug: "spine",
    href: "/platform/spine",
    navLabel: "SPINE",
    navDescription: "Maintain the Truth — the assurance system of record.",
    eyebrow: "SPINE",
    headline: "Maintain the Truth.",
    lede: "Most security tests tell you what was true when the test ran. SPINE maintains whether the evidence supporting that conclusion is still safe to rely on.",
    plannedSections: [
      "The Assurance Graph",
      "Claims and evidence states",
      "Authority chain",
      "Change Intelligence",
      "Deployment decisions and coverage",
      "Assurance Receipts, Vendor Packets and Incident Packs",
      "Economic Exposure",
      "The continuous assurance loop",
    ],
  },
  {
    slug: "achilles",
    href: "/platform/achilles",
    navLabel: "Achilles",
    navDescription: "Test the AI — behavior, tools, authority and effects.",
    eyebrow: "Achilles",
    headline: "Test the AI.",
    lede: "The question is not whether an AI can be jailbroken. It is whether it can cause an effect it was not authorized to cause.",
    plannedSections: [
      "Capability families",
      "Cross-channel chains and multi-step accumulation",
      "Authority and the Action Gate",
      "Denial memory, budgets and revocation",
      "Observed effect",
      "Release and canary comparison",
      "Remediation replay and utility retained",
      "SPINE handoff and Minotaur validation",
    ],
  },
  {
    slug: "validation",
    href: "/platform/validation",
    navLabel: "How Mythos Validates Itself",
    navDescription: "Minotaur — who tests the tester.",
    eyebrow: "Minotaur",
    headline: "Who tests the tester?",
    lede: "Athena tests the system. Achilles tests the AI. Minotaur tests Mythos — so our own results stay measurable, replayable and falsifiable.",
    plannedSections: [
      "Independent validation philosophy",
      "Validity Cards",
      "Safe twins and negative controls",
      "Security veto outside the aggregate score",
      "Holdouts and reproduction",
      "Regression league",
      "Validating Economic Exposure",
      "What we publish, and what stays sealed",
    ],
  },
  {
    slug: "hermes",
    href: "/platform/hermes",
    navLabel: "Hermes",
    navDescription: "Assure Physical AI — vehicles, fleets and cyber-physical systems.",
    eyebrow: "Hermes",
    headline: "Assure Physical AI.",
    lede: "Hermes extends the Mythos assurance model into vehicles, fleets and other cyber-physical AI, where a failure has physical consequences.",
    plannedSections: [
      "Why physical AI changes the consequence model",
      "Can it perceive, decide, fail and change safely?",
      "The current assurance foundation",
      "Domain architecture",
      "How the Mythos model extends into Hermes",
      "Physical and economic consequence",
      "Strategic partnerships",
    ],
  },
  {
    slug: "economic-exposure",
    href: "/platform/economic-exposure",
    navLabel: "Economic Exposure",
    navDescription: "What a validated failure could mean financially.",
    eyebrow: "SPINE Economic Exposure",
    headline: "What could this validated failure mean financially?",
    lede: "Economic Exposure translates verified technical evidence into financial exposure ranges, remediation economics and executive-ready decisions.",
    plannedSections: [
      "From finding to loss event",
      "How the model reaches a range",
      "P10 / P50 / P90 and residual exposure",
      "Cost of fix and risk-adjusted return",
      "The Financial Data Fabric",
      "Financial Validity Card and Receipt",
      "Continuous financial assurance",
      "Guardrails",
    ],
  },
  {
    slug: "evidence",
    href: "/platform/evidence",
    navLabel: "Evidence & Receipts",
    navDescription: "Claims, receipts and deployment decisions you can verify.",
    eyebrow: "Evidence, Claims & Decisions",
    headline: "Evidence you can review, verify and act on.",
    lede: "Not another score: the claims, coverage, receipts and deployment decisions a customer can inspect, verify, export and use.",
    plannedSections: [
      "Assurance claims and evidence states",
      "Coverage Manifest and Unknowns",
      "Assurance Receipts",
      "Evidence, Incident and Vendor packs",
      "Observed effect and authority outcome",
      "Retest proof",
      "Deployment decision states",
      "Exports and integrations",
    ],
  },
  {
    slug: "continuous-assurance",
    href: "/platform/continuous-assurance",
    navLabel: "Continuous Assurance",
    navDescription: "Keep conclusions current as the system changes.",
    eyebrow: "Continuous Assurance",
    headline: "Passing once does not mean passing forever.",
    lede: "When models, prompts, tools or permissions change, SPINE identifies which conclusions need revalidation — so retests stay targeted and evidence stays current.",
    plannedSections: [
      "What changes",
      "From verified to revalidated",
      "SUPERSEDES vs INVALIDATES",
      "Retest-gated closure",
      "Continuous financial assurance",
      "Annual systems under assurance",
      "Integrations and alerts",
    ],
  },
];

export function getPlatformPage(slug: string): ScaffoldPage | undefined {
  return PLATFORM_PAGES.find((page) => page.slug === slug);
}
