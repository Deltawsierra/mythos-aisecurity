/**
 * Continuous Assurance page copy (Launch Guide /platform/continuous-assurance),
 * checked against the Master Inventory (26 Oct 2026). In place: fingerprint
 * and per-claim input fingerprints supersede a claim and open a retest; a
 * revalidation planner names the minimal re-run; decisions recompose worst-
 * of-N; AI-BOM drift and workflow-contract changes invalidate bound claims;
 * the coverage manifest records what was not measured. Planned: runtime
 * monitor coverage, inline retest verdicts in the dashboard record, a
 * durable-change gate. Not built: live monitoring — the request gateway ships
 * monitor-only. All examples are synthetic.
 */
import type { ChangeEvent, TrackedClaim } from "@/components/platform/ChangeTraversal";
import type { TimelineEvent } from "@/components/platform/EvidenceTimeline";

export const CA_COPY = {
  hero: {
    eyebrow: "Continuous assurance",
    headline: "When AI Changes, *Your Evidence Should Respond.*",
    lede: "Changes to data, identity, model route, tools or policies can alter what a previous test means. Continuous assurance targets the affected claims and asks whether revalidation is required.",
    scope: "Responds to scans and to the changes you supply — it does not watch your systems live.",
  },
  problem: {
    eyebrow: "What changes the meaning of a test",
    title: "The system moved. *Did the evidence?*",
    lede: "A test is true of the system it ran against. These are the changes that quietly make yesterday’s pass describe something that no longer exists.",
  },
  mechanism: {
    eyebrow: "The loop",
    title: "Change, trace, retest, *decide.*",
    lede: "Choose a change. Only the claims that depend on it turn Stale; everything else keeps its evidence. The retest is planned for what moved — not the whole system.",
  },
  status: {
    inPlace: {
      label: "In place today",
      items: [
        "Fingerprint changes supersede claims and open retests",
        "Decisions recomposed, worst-of-N, whenever evidence moves",
        "AI bill of materials drift and workflow changes as triggers",
        "A revalidation planner that names the minimal re-run",
      ],
    },
    inDevelopment: {
      label: "Planned",
      items: [
        "Runtime monitor coverage, disclosing what a monitor never saw",
        "Retest verdicts carried inline into the dashboard record",
        "A durable-change gate for memory, configuration and installs",
        "A customer-run collector for sign-in and delegation records",
      ],
    },
  },
  flow: {
    eyebrow: "One claim, end to end",
    title: "From verified *to verified again.*",
    lede: "Watch a single claim go through a change: invalidated, retested and restored — with the decision recalculated at every step.",
  },
  ledger: {
    eyebrow: "The change ledger",
    title: "Every change, *on the record.*",
    lede: "Each change, the claims it touched and the outcome of the retest are recorded together, so you can see why a decision moved.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where continuous assurance *connects.*",
  },
} as const;

export const CA_CHANGES = [
  { name: "Data", body: "A new source joins retrieval, or an old one changes owner.", icon: "/assets/icons/audit-document.svg" },
  { name: "Identity", body: "A service account or role gains access it didn’t have.", icon: "/assets/icons/key.svg" },
  { name: "Model route", body: "A provider, model or version is swapped behind the same endpoint.", icon: "/assets/icons/compass.svg" },
  { name: "Tools", body: "An agent gains a tool, or a tool’s definition changes after review.", icon: "/assets/icons/tool-action.svg" },
  { name: "Policy", body: "A rule is edited, relaxed or removed.", icon: "/assets/icons/shield-key.svg" },
] as const;

export const CA_CLAIMS: TrackedClaim[] = [
  { id: "refund-dest", text: "Refunds go only to the original payment method" },
  { id: "refund-approval", text: "Refunds above $1,000 wait for approval" },
  { id: "crm-read", text: "The assistant reads only the requester’s record" },
  { id: "no-pii-out", text: "No customer data leaves through email" },
  { id: "provider-retention", text: "The model provider does not retain prompts" },
];

export const CA_EVENTS: ChangeEvent[] = [
  {
    id: "tool",
    label: "A payouts tool is added",
    detail: "Tool manifest v8 gives the agent a new way to move money.",
    touches: ["refund-dest", "refund-approval"],
    retest: ["Approval-boundary scenarios against v8", "Destination binding for payouts", "Negative controls for legitimate refunds"],
    decision: "Needs more evidence until the payouts path is retested.",
    open: "Payout limits are not yet defined in policy — recorded as not measured.",
  },
  {
    id: "route",
    label: "The model provider changes",
    detail: "Traffic moves to a second provider behind the same endpoint.",
    touches: ["provider-retention", "no-pii-out"],
    retest: ["Route attestation for the new provider", "Data-handling evidence from the provider", "Outbound-leakage scenarios"],
    decision: "Needs more evidence before the new route is relied on.",
    open: "Provider retention terms not yet received — the claim stays Unknown until they are.",
  },
  {
    id: "policy",
    label: "The refund policy is relaxed",
    detail: "The approval threshold moves from $1,000 to $2,500.",
    touches: ["refund-approval"],
    retest: ["Approval scenarios at the new threshold", "Cumulative-limit scenarios"],
    decision: "Ready with restrictions, once the new threshold is retested.",
    open: "Three legitimate refunds were blocked in the last retest — a false block to fix.",
  },
  {
    id: "role",
    label: "A CRM role is broadened",
    detail: "The assistant’s service account gains read access to all regions.",
    touches: ["crm-read", "no-pii-out"],
    retest: ["Effective-access mapping for the service account", "Cross-customer retrieval tests"],
    decision: "Needs more evidence: the access-boundary claim is Stale and the decision rests on it.",
    open: "No owner yet for the regional data boundary.",
  },
];

export const CA_LEDGER: TimelineEvent[] = [
  { label: "Tool manifest v8 published", meta: "change · 9 Oct", detail: "A payouts tool is added to the support agent.", state: "observed" },
  { label: "Two claims marked Stale", meta: "refund destination · approvals", detail: "Their evidence was true of v7. The other three claims keep theirs.", state: "stale" },
  { label: "Targeted retest", meta: "approval-boundary set · v8", detail: "Only the scenarios that cover the changed path are rerun.", state: "observed", stateLabel: "Retested" },
  { label: "One claim contradicted", meta: "approvals", detail: "A payout above the threshold went through without approval.", state: "contradicted" },
  { label: "Decision recomposed", meta: "Ready → Needs remediation", detail: "Until a fix closes on retest. Your team decides what happens next.", state: "held" },
];
