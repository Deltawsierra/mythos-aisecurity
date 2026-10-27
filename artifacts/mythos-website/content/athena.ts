/**
 * Athena page copy (blueprint Section 7), checked against the 26 Oct Mythos
 * Master Inventory: 27 scanners (19 defender-style, 8 attacker-style), every
 * finding decided by a differential against a benign control, retest verdicts
 * closed / still open / inconclusive. Check groups list only scanner classes the
 * inventory names; the named detection gaps are stated where coverage is
 * described. Claims are registered in content/claims.ts.
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
    lede: "Athena maps how an AI system’s identities, data, tools and models connect — what is exposed, what it can access, what is controlled, and where investigation or remediation is needed.",
    scope: "Within an agreed, authorized scope — and what falls outside it is reported, not assumed.",
  },
  map: {
    eyebrow: "Exposure and route graph",
    title: "Start with what is *actually there.*",
    lede: "AI rarely runs alone. Athena discovers the endpoints and services around it, and SPINE's route map sets declared routes against inferred ones — including the ones nobody declared. Filter the map by what you care about; the same map is listed as a table below.",
  },
  checks: {
    eyebrow: "Discovery capability families",
    title: "Checks grouped by *the question they answer.*",
    lede: "27 scanners — 19 defender-style, 8 attacker-style — across web, API and AI-facing endpoints. Every finding is decided against a benign control: no baseline, no finding.",
  },
  proof: {
    eyebrow: "Differential evidence and replay",
    title: "No baseline, *no finding.*",
    lede: "Every finding is decided by a differential against a benign control. Here the same request, for a record that belongs to someone else, returns that record — and the difference from the control is the finding.",
  },
  coverage: {
    eyebrow: "Coverage manifest",
    title: "What was expected, observed, assessed — *and what was not.*",
    lede: "Athena reports gaps as plainly as findings: what did not run reads not measured. Named gaps today are blind, stored, out-of-band and CRLF classes. Coverage is a statement of scope, never a compliance verdict.",
  },
  evidence: {
    eyebrow: "Remediation and report outputs",
    title: "Evidence that *survives scrutiny.*",
    lede: "Findings ship in Ed25519-signed evidence packs with Merkle proofs, verifiable offline — proof of origin, not of correctness. Retests run against the original, and a cached pass is never counted as a fix.",
  },
  handoff: {
    eyebrow: "From finding to SPINE claim",
    title: "Athena finds. *SPINE remembers.*",
    lede: "Every finding becomes evidence behind a claim in SPINE, bound to the configuration it was true of — so a deployment decision always knows what it rests on.",
  },
  traces: {
    eyebrow: "Every effect, with its authority",
    title: "Three calls, *three boundaries.*",
    lede: "Every outbound effect is recorded with the authority it ran under and whether policy allowed it; an effect with no authority reads unattributed. Testing records these boundaries — it does not enforce them at runtime.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where Athena's evidence *goes next.*",
  },
} as const;

export const ATHENA_CHECKS: Group[] = [
  {
    name: "Web injection",
    question: "Can input reach something it should not?",
    icon: ATHENA_ICONS.surfaces,
    items: [
      "Reflected XSS, error-based SQL injection, command injection and template RCE",
      "SSRF, in-band XXE, header injection, directory traversal and open redirect",
      "Named gaps: blind, stored, out-of-band and CRLF classes",
    ],
  },
  {
    name: "Discovery and routes",
    question: "What is actually there?",
    icon: ATHENA_ICONS.routes,
    items: [
      "A crawl of up to 150 pages at depth 4, within a probe budget",
      "Port, subdomain and endpoint discovery, and WAF detection",
      "Informational results that describe the target and are never scored",
    ],
  },
  {
    name: "Access and identity",
    question: "Who — and what — can reach what?",
    icon: ATHENA_ICONS.identity,
    items: [
      "IDOR checks with a second identity in authenticated scans",
      "CSRF and CORS checks, and a brute-force simulator",
    ],
  },
  {
    name: "Transport and configuration",
    question: "What do the connection and headers give away?",
    icon: ATHENA_ICONS.cloudPosture,
    items: ["TLS checks", "Security-header and hygiene checks"],
  },
  {
    name: "Secrets and software composition",
    question: "What leaks, and what ships with it?",
    icon: ATHENA_ICONS.pipeline,
    items: ["Secret-leak detection", "Software-composition checks against a small, stated table"],
  },
  {
    name: "APIs under abuse",
    question: "What happens when an API is pushed?",
    icon: ATHENA_ICONS.dataLifecycle,
    items: ["API fuzzing", "Rate-limit testing", "JSON and NoSQL operator injection"],
  },
  {
    name: "AI-facing endpoints",
    question: "Can a prompt turn the endpoint against its owner?",
    icon: ATHENA_ICONS.personalContext,
    items: ["A prompt-injection scanner for AI-facing endpoints", "Deeper agent and tool testing is Achilles’s job"],
  },
  {
    name: "Retest and mapping",
    question: "Is it really fixed, and what does it touch?",
    icon: ATHENA_ICONS.remediation,
    items: [
      "Remediation retest: closed, still open or inconclusive",
      "Findings mapped to NIST 800-53, OWASP 2021, OWASP LLM 2025 and DoD Zero Trust — gaps, never a certificate",
      "A cached pass is not a retest",
    ],
  },
];

export const ATHENA_CONFIDENCE = [
  { name: "Finding", meaning: "The test differs from its benign control — the evidence shows it." },
  { name: "Inconclusive", meaning: "Tested, but the evidence does not settle it. Never a pass." },
  { name: "Informational", meaning: "Describes the target — an open port, an endpoint. Never scored." },
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
  verdict: "Finding — the access boundary between customers is broken. Both exchanges are kept as evidence for the fix and the retest.",
};

export const ATHENA_COVERAGE: { rows: CoverageRow[]; note: string } = {
  rows: [
    { label: "Expected", meaning: "Declared in the agreed scope.", value: 46 },
    { label: "Observed", meaning: "Found by discovery — including 2 nobody declared.", value: 48 },
    { label: "Assessed", meaning: "Tested with a result and evidence.", value: 41 },
    { label: "Inconclusive", meaning: "Tested, but the evidence does not settle it.", value: 3, tone: "gap" },
    { label: "Not measured", meaning: "Not reached in this run, or out of reach.", value: 4, tone: "gap" },
  ],
  note: "Seven observed assets end this run without a result — and the report says so. Coverage fell short, so the audit reads incomplete, never passed.",
};

export const ATHENA_RETEST = [
  { name: "Closed", meaning: "The original failure is absent on retest." },
  { name: "Still open", meaning: "The original failure still reproduces." },
  { name: "Inconclusive", meaning: "The retest ran, but the evidence does not settle it." },
  { name: "Not a retest", meaning: "A cached pass, or a scanner switched off, cannot record a fix." },
] as const;

export const ATHENA_HANDOFF: HandoffStep[] = [
  { owner: "Athena", name: "Finding", detail: "Decided against a benign control, with both exchanges.", icon: "/assets/evidence/evidence-pack.svg" },
  { owner: "SPINE", name: "Claim", detail: "Bound to the configuration and policy it was true of.", icon: EVIDENCE_STATE_ICONS.contradicted },
  { owner: "SPINE", name: "Coverage", detail: "Expected, observed and assessed — and what was not.", icon: EVIDENCE_STATE_ICONS.unknown },
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
    body: "The same request for the customer's own invoice returns their own record. No baseline, no finding: without this control, Athena reports nothing.",
  },
  {
    name: "Replay",
    body: "Both exchanges are re-run from the evidence pack to show the result reproduces under the recorded conditions, and again after the fix.",
  },
  {
    name: "Evidence pack",
    body: "Request, response, identity, configuration fingerprint and timestamps, signed with Ed25519 and kept with the limits of the test.",
  },
] as const;

/** A08 — the outputs a finding leaves behind. */
export const ATHENA_OUTPUTS = [
  {
    name: "Evidence pack",
    items: ["Both exchanges and the negative control", "Configuration fingerprint and timestamps", "Signed, with stated limitations"],
    icon: "/assets/evidence/evidence-pack.svg",
  },
  {
    name: "Mapped finding",
    items: ["Mapped to the controls it bears on", "Dispatched to Jira, GitHub, ServiceNow or Splunk", "Evidence of a gap, never a certificate"],
    icon: "/assets/evidence/assurance-receipt.svg",
  },
  {
    name: "Remediation checklist",
    items: ["Enforce ownership on invoice lookups", "Add an authorization test to the pipeline", "Retest against the original exchange"],
    icon: "/assets/evidence/retest-proof.svg",
  },
] as const;
