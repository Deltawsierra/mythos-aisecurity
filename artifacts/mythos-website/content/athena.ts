/**
 * Athena page copy (blueprint Section 7), checked against the Athena + Mythos
 * Platform Roadmap and the Athena build log. No scanner family names exist in
 * the sources, so checks are grouped here by the question they answer, built
 * from the merged modules. Claims are registered in content/claims.ts.
 */
import type { Group } from "@/components/platform/GroupList";
import type { Exchange } from "@/components/platform/DifferentialEvidence";
import type { CoverageRow } from "@/components/platform/CoveragePanel";
import type { HandoffStep } from "@/components/platform/HandoffFlow";
import { ATHENA_ICONS, EVIDENCE_STATE_ICONS } from "@/content/media";

export const ATHENA_COPY = {
  hero: {
    eyebrow: "Athena · system discovery and exposure",
    headline: "See the System.",
    lede: "Athena answers what exists, what is exposed, where requests travel, and what evidence proves the system state — the foundation every AI workflow runs on.",
  },
  map: {
    eyebrow: "Discovery",
    title: "Start with what is actually there.",
    lede: "AI rarely runs alone. Athena maps the services, identities, routes, data and tools around it — including the ones nobody declared.",
  },
  checks: {
    eyebrow: "What Athena tests",
    title: "Checks grouped by the question they answer.",
    lede: "A broad scanner suite across web, API and LLM surfaces and the foundation beneath them. Grouped here by outcome — the specific techniques stay internal.",
  },
  proof: {
    eyebrow: "Proof, not alerts",
    title: "Confirmed, likely or suspicious — and why.",
    lede: "Every finding carries its confidence and the evidence behind it. Here the same request, for a record that belongs to someone else, returns that record — which is what makes the finding confirmed rather than suspected.",
  },
  coverage: {
    eyebrow: "Coverage and unknowns",
    title: "What was assessed — and what was not.",
    lede: "Athena reports gaps as plainly as findings. Anything inconclusive, unmeasured or excluded goes to the Unknowns register, with the evidence needed to close it.",
  },
  evidence: {
    eyebrow: "Evidence and retest",
    title: "Evidence that survives scrutiny.",
    lede: "Findings ship as signed, hash-chained evidence packs that can be verified offline. Retests compare against the original — and a cleared alert is never counted as a fix.",
  },
  handoff: {
    eyebrow: "From finding to decision",
    title: "Athena finds. SPINE remembers.",
    lede: "Every confirmed finding becomes evidence behind a claim in SPINE, bound to the configuration it was true of — so a deployment decision always knows what it rests on.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where Athena's evidence goes next.",
  },
} as const;

export const ATHENA_CHECKS: Group[] = [
  {
    name: "Web, API and LLM surfaces",
    question: "What is exposed, and can it be abused?",
    icon: ATHENA_ICONS.surfaces,
    items: [
      "Offensive testing of web applications and APIs",
      "LLM-facing endpoints and the prompts that reach them",
      "Risk scoring with a stated confidence on every finding",
    ],
  },
  {
    name: "AI routes and providers",
    question: "Where do prompts and data actually travel?",
    icon: ATHENA_ICONS.routes,
    items: [
      "Route and model-provider mapping",
      "An AI bill of materials (AI-BOM) for the system",
      "Provider-declared facts recorded alongside what was observed",
    ],
  },
  {
    name: "Identity and effective access",
    question: "Who — and what — can reach what?",
    icon: ATHENA_ICONS.identity,
    items: [
      "Identity assurance across users and service identities",
      "Effective access, not just the roles on paper",
    ],
  },
  {
    name: "Cloud and secrets posture",
    question: "Where could the foundation leak?",
    icon: ATHENA_ICONS.cloudPosture,
    items: ["Cloud configuration posture", "Exposed and over-scoped secrets"],
  },
  {
    name: "Repositories and delivery",
    question: "Could the system be altered before it ships?",
    icon: ATHENA_ICONS.pipeline,
    items: ["Repository posture", "Build and delivery pipeline posture"],
  },
  {
    name: "Data lifecycle and reuse",
    question: "What can the AI keep, reuse or leak?",
    icon: ATHENA_ICONS.dataLifecycle,
    items: ["Data lifecycle review", "Training and reuse review", "Metadata and logging risk"],
  },
  {
    name: "Personal context exposure",
    question: "What personal context is within the AI’s reach?",
    icon: ATHENA_ICONS.personalContext,
    items: ["Email, chat, documents and calendars an assistant can see", "Exposure of that context beyond its owner"],
  },
  {
    name: "Impact, mapping and remediation",
    question: "What does a finding affect, and is it really fixed?",
    icon: ATHENA_ICONS.remediation,
    items: [
      "Business impact and blast radius",
      "Mapped to tests and evidence for NIST 800-53 / RMF, OWASP web and LLM, and DoD Zero Trust",
      "Remediation workflow and retest",
    ],
  },
];

export const ATHENA_CONFIDENCE = [
  { name: "Confirmed", meaning: "The evidence shows it happening." },
  { name: "Likely", meaning: "Strong signals; confirmation is still pending." },
  { name: "Suspicious", meaning: "Worth review — not yet a finding to act on." },
] as const;

export const ATHENA_EXCHANGES: { control: Exchange; test: Exchange; verdict: string } = {
  control: {
    label: "Control · the customer’s own invoice",
    lines: [
      { key: "Signed in as", value: "Customer A" },
      { key: "Requested", value: "Invoice 1042 (A’s)" },
      { key: "Status", value: "200 OK" },
      { key: "Returned", value: "Customer A’s invoice" },
    ],
  },
  test: {
    label: "Test · someone else’s invoice",
    lines: [
      { key: "Signed in as", value: "Customer A" },
      { key: "Requested", value: "Invoice 2213 (B’s)", changed: true },
      { key: "Status", value: "200 OK — expected 403", changed: true },
      { key: "Returned", value: "Customer B’s invoice", changed: true },
    ],
  },
  verdict: "Confirmed — the access boundary between customers is broken. Both exchanges are kept as evidence for the fix and the retest.",
};

export const ATHENA_COVERAGE: { rows: CoverageRow[]; note: string } = {
  rows: [
    { label: "In scope", meaning: "Assets the engagement covers.", value: 48 },
    { label: "Assessed", meaning: "Tested with a result and evidence.", value: 41 },
    { label: "Inconclusive", meaning: "Tested, but the evidence does not settle it.", value: 3, tone: "gap" },
    { label: "Unmeasured", meaning: "Could not be measured in this run.", value: 2, tone: "gap" },
    { label: "Excluded", meaning: "Out of reach or deliberately left out.", value: 2, tone: "gap" },
  ],
  note: "Seven assets end this run without a result — and the report says so, each with the evidence needed to close it.",
};

export const ATHENA_RETEST = [
  { name: "Unchanged", meaning: "The original failure no longer reproduces." },
  { name: "Review", meaning: "Something moved; a person should look." },
  { name: "Blocked", meaning: "The retest could not run as planned." },
  { name: "Unmeasured", meaning: "No evidence either way yet." },
] as const;

export const ATHENA_HANDOFF: HandoffStep[] = [
  { owner: "Athena", name: "Finding", detail: "Confirmed, with the exchange that proves it.", icon: "/assets/evidence/evidence-pack.svg" },
  { owner: "SPINE", name: "Claim", detail: "Bound to the configuration and policy it was true of.", icon: EVIDENCE_STATE_ICONS.contradicted },
  { owner: "SPINE", name: "Unknowns", detail: "Gaps tracked with the evidence needed to close them.", icon: EVIDENCE_STATE_ICONS.unknown },
  { owner: "SPINE", name: "Decision", detail: "Recalculated when the evidence moves. Your team decides.", icon: "/assets/evidence/deployment-decision-gate.svg" },
];
