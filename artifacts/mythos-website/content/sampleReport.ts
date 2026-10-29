/**
 * The synthetic sample report (Launch Guide §14, /example-report), built
 * 16 Oct as a native fixture to replace the v1 image pack (which carried a
 * scalar score, contradictory counts, invented staff and real vendor names).
 *
 * "Sample Organization" and everything about it is fictional. Every value is
 * synthetic; vocabulary follows the Master Inventory (26 Oct 2026): evidence
 * states, six decision states plus Paused, retest verdicts closed / still
 * open / inconclusive, DSSE-signed receipts, Not measured. This sample
 * engagement shows no Economic Exposure figures.
 */
import type { RecordRow } from "@/components/platform/RecordCard";
import type { PillState } from "@/components/platform/StatePill";
import type { TimelineEvent } from "@/components/platform/EvidenceTimeline";

export const REPORT_SECTIONS = [
  { id: "cover", label: "Cover and scope" },
  { id: "summary", label: "Executive summary" },
  { id: "system", label: "System map" },
  { id: "findings", label: "Findings and evidence" },
  { id: "claims", label: "Claim matrix" },
  { id: "retest", label: "Remediation and retest" },
  { id: "changes", label: "Change history" },
  { id: "exposure", label: "Economic scenario" },
  { id: "decision", label: "Deployment decision" },
  { id: "appendix", label: "Appendix" },
] as const;

export const COVER: RecordRow[] = [
  { field: "Report", value: "SAMPLE-RPT-01 · version 1.0" },
  { field: "Organization", value: "Sample Organization (fictional)" },
  { field: "System", value: "Customer servicing copilot" },
  { field: "Environment", value: "Staging tenant with synthetic records" },
  { field: "In scope", value: "Copilot, retrieval over customer notes, credit tool up to its limit" },
  { field: "Excluded", value: "Production systems, payment rails, the model provider’s own infrastructure" },
  { field: "Report owner", value: "Mythos AI Security assessment lead (role)" },
  { field: "Synthetic", value: "Yes — no customer information is represented", tone: "verified" },
];

export const SUMMARY = {
  tested: "Whether the servicing copilot reaches only the requesting customer’s records, and whether its credit tool stays within the authority the business intended.",
  findings: [
    "Retrieval returned another customer’s notes for one query pattern (fixed; closed on retest).",
    "Split credit requests could exceed the single-credit limit in aggregate (fixed; closed on retest).",
    "A legacy search index was reachable but not documented (not measured).",
  ],
  unknowns: ["Escalation timing for account-takeover conversations", "Whether the legacy index follows the same permissions"],
  recommendation: "Needs more evidence",
};

export const SYSTEM_MAP: { component: string; kind: string; reaches: string; evidence: string }[] = [
  { component: "Servicing copilot", kind: "AI system", reaches: "Customer notes, credit tool", evidence: "Observed" },
  { component: "Model provider A (fictional)", kind: "Model route", reaches: "Prompts and retrieved text", evidence: "Declared" },
  { component: "Customer notes index", kind: "Data source", reaches: "All customer notes", evidence: "Observed" },
  { component: "Legacy search index", kind: "Data source", reaches: "Unknown", evidence: "Unknown" },
  { component: "Credit tool", kind: "Tool", reaches: "Account credits up to a limit", evidence: "Verified" },
  { component: "svc-copilot (fictional)", kind: "Service identity", reaches: "Notes read, credits write", evidence: "Observed" },
];

export const FINDINGS: { id: string; title: string; severity: "High" | "Medium" | "Low"; effect: string; conditions: string; confidence: string; status: string; state: PillState }[] = [
  {
    id: "F-01",
    title: "Cross-customer notes in retrieval",
    severity: "High",
    effect: "Notes belonging to a second synthetic customer appeared in a drafted reply.",
    conditions: "Staging tenant; one query pattern; retrieval ranked results before filtering by customer.",
    confidence: "Reproduced against a benign control",
    status: "Closed on retest",
    state: "verified",
  },
  {
    id: "F-02",
    title: "Credits split under the limit",
    severity: "Medium",
    effect: "Three credits, each under the single-credit limit, exceeded it together within one conversation.",
    conditions: "Staging tenant; synthetic account; no aggregate limit configured.",
    confidence: "Reproduced against a benign control",
    status: "Closed on retest",
    state: "verified",
  },
  {
    id: "F-03",
    title: "Undocumented legacy index",
    severity: "Low",
    effect: "The copilot’s identity can read a legacy search index absent from the design documents.",
    conditions: "Found during mapping from the access configuration supplied; not tested.",
    confidence: "Null — not tested, so unknown",
    status: "Open — not measured",
    state: "unknown",
  },
];

export const CLAIMS: { claim: string; state: PillState; label?: string; source: string; date: string }[] = [
  { claim: "Copilot reads only the requesting customer’s notes", state: "verified", source: "Retest R-01 · Achilles permission boundary", date: "Day 9 (synthetic)" },
  { claim: "Credits above the limit go to a person", state: "verified", source: "Retest R-02 · Achilles tool misuse", date: "Day 9 (synthetic)" },
  { claim: "Model provider does not retain prompts", state: "observed", label: "Declared", source: "Provider documentation (vendor-asserted)", date: "Day 2 (synthetic)" },
  { claim: "Ticket attachments cannot change credit rules", state: "observed", source: "Test T-14 · attachment types in scope", date: "Day 5 (synthetic)" },
  { claim: "Legacy index follows the same permissions", state: "unknown", source: "Mapping M-03 · not tested", date: "Day 3 (synthetic)" },
  { claim: "Escalation precedes account changes", state: "stale", source: "Test T-20 · prompt template changed on Day 11", date: "Day 6 (synthetic)" },
];

export const RETEST: { finding: string; owner: string; fix: string; result: string; state: PillState }[] = [
  { finding: "F-01", owner: "Customer engineering (role)", fix: "Filter by customer before ranking", result: "Closed: failure absent on retest, with six incomplete-repair controls", state: "verified" },
  { finding: "F-02", owner: "Customer engineering (role)", fix: "Aggregate limit per conversation", result: "Closed: split requests routed to a person on retest", state: "verified" },
  { finding: "F-03", owner: "Customer security (role)", fix: "Document or remove the index", result: "Not retested — no verdict until it is", state: "unknown" },
];

export const CHANGES: TimelineEvent[] = [
  { label: "Assessment complete", meta: "Day 9", detail: "Six claims recorded against configuration sha256:4b1e…09c2 (synthetic).", state: "verified", stateLabel: "Baseline" },
  { label: "Prompt template updated", meta: "Day 11", detail: "The escalation claim depended on it, so it was set aside.", state: "stale" },
  { label: "Targeted retest planned", meta: "Day 11", detail: "Only the escalation scenarios — not the whole assessment.", state: "observed", stateLabel: "Planned" },
];

export const DECISION: RecordRow[] = [
  { field: "Recommendation", value: "Needs more evidence (worst-of-N)", tone: "stale" },
  { field: "Path forward", value: "Retest escalation; then pilot in one region, credits above the limit to a person, legacy index removed" },
  { field: "Not measured", value: "Escalation timing (stale); legacy index permissions" },
  { field: "Evidence", value: "2 verified · 2 observed · 1 unknown · 1 stale · confidence null" },
  { field: "Reopens when", value: "Model version, prompt template, CRM roles or credit policy change" },
  { field: "Decision", value: "Pending — your release owner decides" },
  { field: "Synthetic", value: "Yes" },
];

export const RECEIPT_JSON = {
  schema: "mythos.assurance.receipt/1.0",
  synthetic: true,
  report: "SAMPLE-RPT-01",
  claim: "Copilot reads only the requesting customer’s notes",
  subject: { system: "servicing-copilot", environment: "staging" },
  configuration: { fingerprint: "sha256:4b1e…09c2 (synthetic)" },
  policy: { id: "support-policy", version: "12" },
  evaluator: { engine: "achilles", family: "permission_boundary", run: "R-01" },
  result: { state: "verified", conditions: "staging tenant; query patterns in scope" },
  evidence_root: "sha256:a77d…5f10 (synthetic)",
  issued_at: "Day 9 (synthetic)",
  signature: { envelope: "dsse", covers_issue_time: true, verifies_offline: true, sig: "synthetic…7e21" },
  note: "Proves integrity and provenance, not that the conclusion is true.",
};
