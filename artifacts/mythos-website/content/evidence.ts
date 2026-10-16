/**
 * Evidence & Receipts page copy (Launch Guide /platform/evidence), checked
 * against the SPINE Technical Foundation Spec and Athena build log (16 Oct
 * fact-check). Built: Assurance Receipts hashed over canonical JSON with an
 * evidence root (not signed — signing is planned), JSON copy/download, a
 * read-only Evidence API, Incident Evidence Packs, and signed Achilles
 * engine evidence packs with offline verification. Partial or planned:
 * vendor packets, claims engine, reviewer approvals, push integrations, a
 * published verifier, CSV export. All sample data is synthetic.
 */
import type { ExplorerClaim } from "@/components/platform/ReceiptExplorer";
import type { TimelineEvent } from "@/components/platform/EvidenceTimeline";

export const EVIDENCE_COPY = {
  hero: {
    eyebrow: "Evidence & Receipts",
    headline: "Proof You *Can Inspect.*",
    lede: "A finding is useful when its scope, source, observed effect, version and decision context can be inspected. Mythos connects claims to the evidence needed to support or challenge them.",
  },
  problem: {
    eyebrow: "What you cannot safely assume",
    title: "A report is not *the same as proof.*",
    lede: "Most assurance arrives as a document you are asked to trust. These are the assumptions that quietly break.",
  },
  explorer: {
    eyebrow: "Receipt explorer",
    title: "Pick a claim. *See what holds it up.*",
    lede: "Every claim carries a receipt and a provenance chain: the evidence, what was observed, the configuration it was true of, and who reviewed it.",
  },
  integrity: {
    eyebrow: "Integrity, plainly stated",
    title: "Tamper-evident — *and honest about it.*",
    lede: "An Assurance Receipt is hashed over its evidence, so any later change can be detected. It proves where a result came from — not that the conclusion is true.",
  },
  outputs: {
    eyebrow: "Exports and evidence packs",
  },
  artifact: {
    eyebrow: "Inspect the artifact",
    title: "The receipt, *as data.*",
    lede: "This is a synthetic receipt in the format the dashboard exports. Copy it and read every field.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where the *evidence comes from.*",
  },
} as const;

export const EVIDENCE_ASSUMPTIONS = [
  { name: "That a pass is still current", body: "Models, tools and permissions change after the test. A result is true of a configuration, not forever." },
  { name: "That the report covered everything", body: "Scope has edges. Unless the gaps are listed, you cannot tell untested from safe." },
  { name: "That a vendor’s claim was checked", body: "What a vendor declares and what was observed are different evidence — and should never share a label." },
  { name: "That the fix worked", body: "A cleared alert is not a repair. Only a retest against the original failure shows that." },
] as const;

export const EVIDENCE_CLAIMS: ExplorerClaim[] = [
  {
    id: "refund-destination",
    claim: "Refunds go only to the original payment method.",
    state: "verified",
    receipt: [
      { field: "Subject", value: "Support agent · refund path" },
      { field: "Configuration", value: "fingerprint 7f3a…c91e" },
      { field: "Policy", value: "refunds-policy v12" },
      { field: "Evaluator", value: "Achilles · approval-boundary tests" },
      { field: "Result", value: "Verified", tone: "verified" },
      { field: "Computed at", value: "16 Oct 2026, 09:12 UTC" },
      { field: "Evidence root", value: "sha256:41be…77d2 (14 artifacts)" },
      { field: "Validity", value: "Until configuration or policy changes" },
      { field: "Invalidators", value: "New tool · policy edit · model change" },
      { field: "Approval", value: "Security lead" },
    ],
    chain: [
      { step: "Claim", detail: "Refunds go only to the original payment method." },
      { step: "Evidence", detail: "Retest R-14: refund to a new card was blocked." },
      { step: "Observation", detail: "No refund reached an unbound destination in the ledger." },
      { step: "Configuration", detail: "True of fingerprint 7f3a…c91e and policy v12." },
      { step: "Review", detail: "Approved by the security lead." },
    ],
  },
  {
    id: "crm-least-privilege",
    claim: "The assistant reads only the requesting customer’s record.",
    state: "stale",
    receipt: [
      { field: "Subject", value: "Support agent · CRM read" },
      { field: "Configuration", value: "fingerprint 2d90…a1f4 (superseded)" },
      { field: "Policy", value: "crm-access v7" },
      { field: "Evaluator", value: "Athena · effective access" },
      { field: "Result", value: "Stale — revalidation required", tone: "stale" },
      { field: "Computed at", value: "2 Sep 2026, 14:40 UTC" },
      { field: "Evidence root", value: "sha256:c0a2…19e5 (6 artifacts)" },
      { field: "Validity", value: "Ended when the CRM role was broadened" },
      { field: "Invalidators", value: "Role change on 9 Oct" },
      { field: "Approval", value: "Platform owner" },
    ],
    chain: [
      { step: "Claim", detail: "The assistant reads only the requesting customer’s record." },
      { step: "Evidence", detail: "Two exchanges: own record returned, another customer’s denied." },
      { step: "Observation", detail: "The CRM returned 403 for the other customer." },
      { step: "Configuration", detail: "True of the September configuration — since superseded." },
      { step: "Review", detail: "Approved then; reopened when the role changed." },
    ],
  },
  {
    id: "approval-binding",
    claim: "Refunds above $1,000 wait for human approval.",
    state: "contradicted",
    receipt: [
      { field: "Subject", value: "Support agent · refund approval" },
      { field: "Configuration", value: "fingerprint 7f3a…c91e" },
      { field: "Policy", value: "refunds-policy v12" },
      { field: "Evaluator", value: "Achilles · approval-boundary tests" },
      { field: "Result", value: "Contradicted", tone: "contradicted" },
      { field: "Computed at", value: "16 Oct 2026, 09:31 UTC" },
      { field: "Evidence root", value: "sha256:8be0…44c1 (9 artifacts)" },
      { field: "Validity", value: "Until a fix is retested" },
      { field: "Invalidators", value: "Fix deployed · policy edit" },
      { field: "Approval", value: "Pending review" },
    ],
    chain: [
      { step: "Claim", detail: "Refunds above $1,000 wait for human approval." },
      { step: "Evidence", detail: "Trace T-0412: a $4,800 refund executed with no approval on record." },
      { step: "Observation", detail: "The ledger shows the refund issued." },
      { step: "Configuration", detail: "True of fingerprint 7f3a…c91e and policy v12." },
      { step: "Review", detail: "Held for review; your team decides the response." },
    ],
  },
];

export const EVIDENCE_OUTPUTS = [
  { name: "Assurance Receipt (JSON)", status: "Available", body: "Copy or download from the dashboard, for any claim." },
  { name: "Evidence API", status: "Available", body: "Read findings, evidence, unknowns and receipts from your own tools." },
  { name: "Incident Evidence Pack", status: "Available", body: "What happened, under which authority, preserved for review." },
  { name: "Signed engine evidence packs", status: "Available", body: "Achilles evidence packs are signed and can be verified offline." },
  { name: "Vendor Assurance Packet", status: "In development", body: "Declared versus verified evidence for procurement review." },
  { name: "Receipt signing and a public verifier", status: "Planned", body: "So anyone can check a receipt without asking Mythos." },
] as const;

export const EVIDENCE_SIGNOFF: TimelineEvent[] = [
  { label: "Evidence captured", meta: "engine run · versions recorded", detail: "Tests produce artifacts tied to the configuration and policy they ran against.", state: "observed" },
  { label: "Claim updated", meta: "evidence state recalculated", detail: "The claim takes the state its evidence supports — never stronger.", state: "verified" },
  { label: "Technical review", meta: "assigned owner", detail: "A named owner reviews findings and remediation.", state: "observed", stateLabel: "Reviewed" },
  { label: "Approval recorded", meta: "human owner", detail: "Designed: a named approver signs off on high-risk decisions before export.", state: "unknown", stateLabel: "Designed" },
  { label: "Exported", meta: "receipt JSON · API · report", detail: "The receipt leaves with its hash, so the recipient can detect any change.", state: "verified", stateLabel: "Available" },
];

/** A synthetic receipt in the shape the dashboard exports. */
export const EVIDENCE_JSON = {
  receipt_version: "1.0",
  synthetic: true,
  system: { name: "support-agent", fingerprint: "7f3a…c91e" },
  claim: "Refunds go only to the original payment method.",
  result: "verified",
  policy: { id: "refunds-policy", version: 12 },
  evaluator: "achilles/approval-boundary",
  evidence: { root: "sha256:41be…77d2", artifacts: 14 },
  validity: { until: "configuration or policy change", invalidators: ["new_tool", "policy_edit", "model_change"] },
  approval: { role: "security_lead" },
  algorithm: "sha256",
  digest: "sha256:e19c…0b3f",
  computed_at: "2026-10-16T09:12:00Z",
};
