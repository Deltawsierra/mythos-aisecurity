/**
 * Athena page copy (blueprint Section 7), checked against the Athena + Mythos
 * Platform Roadmap and the Athena build log. No scanner family names exist in
 * the sources, so checks are grouped here by the question they answer, built
 * from the merged modules. Claims are registered in content/claims.ts.
 */
import type { Group } from "@/components/platform/GroupList";
import type { Exchange } from "@/components/platform/DifferentialEvidence";
import type { CoverageRow } from "@/components/platform/CoveragePanel";
import type { CallTrace } from "@/components/platform/CallTraces";
import type { HandoffStep } from "@/components/platform/HandoffFlow";
import { ATHENA_ICONS, EVIDENCE_STATE_ICONS } from "@/content/media";

export const ATHENA_COPY = {
  /** Launch Guide R03 candidate H1; the scope line keeps it from implying a complete inventory. */
  hero: {
    eyebrow: "Athena · see the system",
    headline: "See Every Risk. Understand Every Exposure. *Prove Every Decision.*",
    lede: "Athena reveals how systems, identities, data, tools and models connect — what is exposed, what is controlled, and where investigation or remediation is needed.",
    scope: "Within an agreed, authorized scope — and what falls outside it is reported, not assumed.",
  },
  map: {
    eyebrow: "Exposure and route graph",
    title: "Start with what is *actually there.*",
    lede: "AI rarely runs alone. Athena maps the services, identities, routes, data and tools around it — including the ones nobody declared. Filter the map by what you care about; the same map is listed as a table below.",
  },
  checks: {
    eyebrow: "Discovery capability families",
    title: "Checks grouped by *the question they answer.*",
    lede: "A broad scanner suite across web, API and LLM surfaces and the foundation beneath them. Grouped here by outcome — the specific techniques stay internal.",
  },
  proof: {
    eyebrow: "Differential evidence and replay",
    title: "Confirmed, likely or suspicious — *and why.*",
    lede: "Every finding carries its confidence and the evidence behind it. Here the same request, for a record that belongs to someone else, returns that record — which is what makes the finding confirmed rather than suspected.",
  },
  coverage: {
    eyebrow: "Coverage manifest",
    title: "What was expected, observed, assessed — *and what was not.*",
    lede: "Athena reports gaps as plainly as findings. Anything unchecked goes to the Unknowns register with the evidence needed to close it. Coverage is a statement of scope, never a compliance verdict.",
  },
  evidence: {
    eyebrow: "Remediation and report outputs",
    title: "Evidence that *survives scrutiny.*",
    lede: "Findings ship as signed, hash-chained evidence packs that can be verified offline. Retests compare against the original — and a cleared alert is never counted as a fix.",
  },
  handoff: {
    eyebrow: "From finding to SPINE claim",
    title: "Athena finds. *SPINE remembers.*",
    lede: "Every confirmed finding becomes evidence behind a claim in SPINE, bound to the configuration it was true of — so a deployment decision always knows what it rests on.",
  },
  traces: {
    eyebrow: "Agent and tool boundaries",
    title: "Three calls, *three boundaries.*",
    lede: "What the agent asked for, who it acted for, what should have happened and what did. Athena observes and tests these boundaries — it does not enforce them at runtime.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where Athena's evidence *goes next.*",
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
    { label: "Expected", meaning: "Declared in the agreed scope.", value: 46 },
    { label: "Observed", meaning: "Found by discovery — including 2 nobody declared.", value: 48 },
    { label: "Assessed", meaning: "Tested with a result and evidence.", value: 41 },
    { label: "Inconclusive", meaning: "Tested, but the evidence does not settle it.", value: 3, tone: "gap" },
    { label: "Unchecked", meaning: "Unmeasured in this run, or out of reach.", value: 4, tone: "gap" },
  ],
  note: "Seven observed assets end this run without a result — and the report says so, each with the evidence needed to close it.",
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

/** A05 — three illustrative call traces: what Athena observed at each boundary. */
export const ATHENA_TRACES: CallTrace[] = [
  {
    kind: "Allowed read",
    call: "support-agent → crm.read(customer: C-1042)",
    actingFor: "Customer C-1042",
    expected: "Allowed — the requester's own record",
    observed: "Allowed · one record returned",
    state: "verified",
    rationale: "Within the requesting customer's scope.",
  },
  {
    kind: "Denied data access",
    call: "support-agent → crm.read(customer: C-2213)",
    actingFor: "Customer C-1042",
    expected: "Denied — another customer's record",
    observed: "Denied · 403 at the CRM",
    state: "verified",
    rationale: "The tenant boundary held for this route.",
  },
  {
    kind: "Held high-risk action",
    call: "support-agent → payments.refund(amount: $4,800)",
    actingFor: "Customer C-1042",
    expected: "Held — above the approval threshold",
    observed: "Held · routed to a human approver",
    state: "held",
    rationale: "The approval threshold was respected.",
  },
];

/** A06 — what sits behind the differential evidence. */
export const ATHENA_REPLAY = [
  {
    name: "Negative control",
    body: "The same request for the customer's own invoice returns their own record. Without a benign baseline, Athena would not call the finding confirmed.",
  },
  {
    name: "Replay",
    body: "Both exchanges are re-run from the evidence pack to show the result reproduces under the recorded conditions, and again after the fix.",
  },
  {
    name: "Evidence pack",
    body: "Request, response, identity, configuration fingerprint and timestamps, kept together with the confidence and the limits of the test.",
  },
] as const;

/** A08 — the outputs a finding leaves behind. */
export const ATHENA_OUTPUTS = [
  {
    name: "Evidence pack",
    items: ["Both exchanges and the negative control", "Configuration fingerprint and timestamps", "Confidence and stated limitations"],
    icon: "/assets/evidence/evidence-pack.svg",
  },
  {
    name: "Audit export",
    items: ["Finding mapped to the controls it bears on", "Readable summary for reviewers", "Underlying evidence for anyone who checks"],
    icon: "/assets/evidence/assurance-receipt.svg",
  },
  {
    name: "Remediation checklist",
    items: ["Enforce ownership on invoice lookups", "Add an authorization test to the pipeline", "Retest against the original exchange"],
    icon: "/assets/evidence/retest-proof.svg",
  },
] as const;
