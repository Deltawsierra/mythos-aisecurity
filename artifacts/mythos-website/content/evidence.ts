/**
 * Evidence & Receipts page copy (Launch Guide /platform/evidence), checked
 * against the Master Inventory (26 Oct 2026). Assurance Receipts are DSSE-
 * signed by the engine with the issue time inside the signature, verifiable
 * offline, every past version readable; the dashboard downloads them and
 * checks the bytes against their hash. Athena evidence packs are Ed25519-
 * signed with Merkle inclusion proofs (standalone verifier); Achilles packs
 * are HMAC-anchored, and Achilles scan results are not yet signed into the
 * record (planned). Findings dispatch to Jira, GitHub, ServiceNow and
 * Splunk. No Evidence API, Incident Pack or Vendor Packet. Synthetic data.
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
    lede: "An Assurance Receipt is DSSE-signed by the engine and verifies offline, so any later change can be detected. It proves where a result came from — not that the conclusion is true.",
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
  { name: "That the fix worked", body: "A cleared alert is not a repair. A retest shows only whether the original failure is absent." },
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
      { field: "Issued (signed)", value: "16 Oct 2026, 09:12 UTC" },
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
      { field: "Issued (signed)", value: "2 Sep 2026, 14:40 UTC" },
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
      { field: "Issued (signed)", value: "16 Oct 2026, 09:31 UTC" },
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
  { name: "Assurance Receipt (signed)", status: "Available", body: "DSSE-signed; download it and verify offline, without asking Mythos." },
  { name: "Signed engine evidence packs", status: "Available", body: "Athena packs: Ed25519 with Merkle inclusion proofs, standalone verifier." },
  { name: "Findings dispatch", status: "Available", body: "To Jira, GitHub, ServiceNow and Splunk; a stop never waits on one." },
  { name: "Achilles evidence packs", status: "Available", body: "HMAC-anchored and redacted to content hashes in storage." },
  { name: "Signed Achilles scan results", status: "Planned", body: "So Achilles results enter the platform record alongside receipts." },
] as const;

export const EVIDENCE_SIGNOFF: TimelineEvent[] = [
  { label: "Evidence captured", meta: "engine run · versions recorded", detail: "Tests produce artifacts tied to the configuration and policy they ran against.", state: "observed" },
  { label: "Claim updated", meta: "evidence state recalculated", detail: "The claim takes the state its evidence supports — never stronger.", state: "verified" },
  { label: "Technical review", meta: "assigned owner", detail: "A named owner reviews findings and remediation.", state: "observed", stateLabel: "Reviewed" },
  { label: "Receipt signed", meta: "DSSE · issue time inside", detail: "The engine signs the receipt; every past version still reads back.", state: "verified", stateLabel: "Signed" },
  { label: "Exported", meta: "receipt download · dispatch", detail: "The recipient verifies the signature offline and can detect any change.", state: "verified", stateLabel: "Available" },
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
  digest: "sha256:e19c…0b3f",
  issued_at: "2026-10-16T09:12:00Z",
  signature: { envelope: "dsse", covers_issue_time: true, verifies_offline: true, sig: "synthetic…a4c0" },
};
