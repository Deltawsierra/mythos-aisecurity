/**
 * SPINE page copy (blueprint Section 7, checked against the Master Inventory,
 * 26 Oct 2026). Every specific capability is registered in content/claims.ts.
 * Receipts are DSSE-signed and verify offline. Avoid: "AI knowledge graph",
 * "unbreakable", "tamper-proof", "continuous compliance guaranteed"; controls
 * are "touched", never "satisfied"; cleared is never "fixed".
 */
export const SPINE_COPY = {
  /** Launch Guide R04 — leads with the system of record, never "unified defense against everything". */
  hero: {
    eyebrow: "SPINE · the assurance system of record",
    headline: "Continuous Assurance. *Evidence That Holds Together.*",
    lede: "SPINE links claims, controls, authority, observations and decisions. When something material changes, dependent conclusions can be flagged for review, targeted revalidation, or contradiction.",
  },
  why: {
    eyebrow: "Why SPINE",
    title: "Findings fade. *Claims are kept honest.*",
    lede: "A report is a snapshot. SPINE records what was approved, notices when the evidence behind it changes, directs the retests that change requires, and shows whether the repair justifies release.",
    pillars: [
      {
        name: "Bound to a configuration",
        body: "Every claim is tied to a system fingerprint, a policy version and an environment — never to a vague “the system.”",
      },
      {
        name: "Gaps are named",
        body: "What was not measured is recorded as not measured — never turned into a green result.",
      },
      {
        name: "Change-aware",
        body: "When the system moves, SPINE works out which conclusions moved with it — and only those are retested.",
      },
    ],
  },
  graph: {
    eyebrow: "The assurance graph",
    title: "Everything a claim depends on, *connected.*",
    lede: "Systems, identities, tools, evidence, findings, claims, actions, effects and business context — in one graph that remembers what changed and when. What an AI is permitted to reach and what it was actually seen reaching are kept apart.",
  },
  claims: {
    eyebrow: "The claim state machine",
    title: "Declared, observed and verified *are never merged.*",
    lede: "What a team or vendor says, what Mythos sees running, and what testing proves stay separate truths. Confidence is the strength of the weakest evidence — never a probability.",
    clocks: {
      title: "Two clocks, nothing overwritten",
      body: "SPINE keeps when a source saw a fact apart from when that fact was held current — so you can ask what was true on any date, and what was known at the time.",
    },
    unknown: {
      question: "Does the model provider retain prompts sent by the assistant?",
      why: "Customer data could persist outside your boundary.",
      needed: "The provider’s data-processing terms, or an observed retention test.",
      outcome: "Recorded as not measured in the coverage manifest. If coverage falls short, the decision reads Audit incomplete — never Ready.",
    },
  },
  authority: {
    eyebrow: "Authority and action lineage",
    title: "Who allowed this, *and did the effect match?*",
    lede: "The Achilles Action Gate turns policy into a permit, deny, hold or escalate — deny by default. Each hop of the chain reads proven, unproven or broken.",
  },
  change: {
    eyebrow: "Change intelligence",
    title: "The loop that keeps *evidence current.*",
    lede: "When a fingerprint moves, SPINE opens a retest: detect the change, assess its impact, invalidate what it touched, plan the minimal re-run, revalidate, restore.",
    supersedes: {
      name: "SUPERSEDES",
      body: "A fresher observation of the same fact replaces the old one. Nothing breaks, and the history is kept.",
    },
    invalidates: {
      name: "INVALIDATES",
      body: "A contradiction or expiry closes the claim and recalculates the decision. Cleared is not fixed: the claim stays closed until a retest restores it.",
    },
    drivers: [
      "System fingerprints",
      "Per-claim input fingerprints",
      "Pinned policy versions",
      "A revalidation planner",
      "Legal staleness set by a person",
    ],
  },
  decisions: {
    eyebrow: "Deployment decisions",
    title: "A recommendation backed by evidence. *Your team decides.*",
    lede: "Six states plus Paused, worst-of-N: the weakest claim sets the decision. Short coverage reads Audit incomplete, and a missing decision is never Ready.",
  },
  evidence: {
    eyebrow: "Receipts and dispatch",
    title: "Evidence you can hand *to someone else.*",
    lede: "An Assurance Receipt records where a result came from — subject, configuration, policy, evaluator, evidence and validity — and is DSSE-signed by the engine with its issue time inside the signature. It verifies offline, and every past version still reads back. A receipt proves provenance, never that the conclusion is true.",
    packets: [
      {
        name: "Signed engine evidence packs",
        body: "Athena evidence packs are signed with Ed25519 and carry Merkle inclusion proofs, checked offline by a standalone tool.",
        icon: "/assets/evidence/evidence-pack.svg",
      },
      {
        name: "Vendor-asserted claims",
        body: "What a vendor declares about a third-party AI caps at supported. Verified needs non-vendor technical evidence.",
        icon: "/assets/evidence/change-event.svg",
      },
      {
        name: "Findings dispatch",
        body: "Findings go to Jira, GitHub, ServiceNow and Splunk. A lost answer is looked for, not re-pushed, and a stop never waits on a connector.",
        icon: "/assets/evidence/policy-authority-chain.svg",
      },
    ],
  },
  economics: {
    eyebrow: "SPINE Economic Exposure",
    title: "A verified effect, *in business terms.*",
    lede: "Economic Exposure is a layer inside SPINE. It links observed effects to the business processes they touch and prices the loss as a range — P10, P50, P90 — with the cost of a fix, the exposure it could remove, and every source and assumption shown.",
  },
  teams: {
    eyebrow: "Assurance teams and validity",
    title: "Four roles, *one evidence loop.*",
    lede: "Red, blue, purple and evaluator are separate credentials, working inside defined, authorized scopes and feeding the same claims. Minotaur stands apart from all four, checking that the tests themselves are valid.",
    minotaur: "Minotaur holds out scenarios, replays results and can hold a release on evidence quality. It is Mythos’ internal proving ground — not a fifth role and not a separate product.",
  },
  revalidate: {
    eyebrow: "Revalidation",
    title: "Changed condition, stale claim, *targeted retest.*",
    lede: "Run the loop yourself: introduce a change, watch the claim go stale, then retest. Every state is a synthetic fixture you can reset.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where SPINE leads.",
  },
} as const;

/** Sample receipt fields (fictional data). Field names follow the receipt model. */
export const SAMPLE_RECEIPT: { field: string; value: string }[] = [
  { field: "Subject", value: "Support assistant · refund path" },
  { field: "Configuration", value: "fingerprint 7f3a…c91e" },
  { field: "Policy", value: "refunds-policy · v12" },
  { field: "Evaluator", value: "Achilles · approval-boundary tests" },
  { field: "Evidence", value: "14 artifacts · 3 observed effects" },
  { field: "Result", value: "Verified" },
  { field: "Issued", value: "14 Oct 2026, 09:12 UTC · inside the signature" },
  { field: "Validity", value: "Until configuration or policy changes" },
  { field: "Invalidators", value: "New tool · policy edit · model change" },
  { field: "Approval", value: "Security lead" },
  { field: "Signature", value: "DSSE envelope · verifies offline (sample)" },
];

export type GraphNodeId =
  | "systems"
  | "identities"
  | "tools"
  | "evidence"
  | "findings"
  | "claims"
  | "actions"
  | "effects"
  | "business";

export const GRAPH_NODES: { id: GraphNodeId; name: string }[] = [
  { id: "systems", name: "Systems" },
  { id: "identities", name: "Identities" },
  { id: "tools", name: "Tools" },
  { id: "actions", name: "Actions" },
  { id: "effects", name: "Effects" },
  { id: "business", name: "Business context" },
  { id: "claims", name: "Claims" },
  { id: "evidence", name: "Evidence" },
  { id: "findings", name: "Findings" },
];

/** Illustrative questions and the path SPINE follows to answer them. */
export const GRAPH_TRACES: { question: string; path: GraphNodeId[]; caption: string }[] = [
  {
    question: "Can the support assistant move money?",
    path: ["identities", "tools", "actions", "effects", "claims", "evidence"],
    caption: "Who the assistant acts as, what it can call, what it did and what happened — tied to the claim and the evidence behind it.",
  },
  {
    question: "What can retrieval actually reach?",
    path: ["systems", "identities", "findings", "claims", "evidence"],
    caption: "Permitted access and access actually observed are recorded separately. A finding only counts when there is evidence for it.",
  },
  {
    question: "What would a failure mean for the business?",
    path: ["effects", "business", "claims", "evidence"],
    caption: "Verified effects connect to the business process they touch — the bridge Economic Exposure prices as a range.",
  },
];
