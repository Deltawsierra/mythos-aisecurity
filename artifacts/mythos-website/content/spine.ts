/**
 * SPINE page copy (blueprint Section 7, checked against the SPINE Technical
 * Foundation Spec v0.1 and R&D plan). Every specific capability is registered
 * in content/claims.ts. Avoid: "AI knowledge graph", "unbreakable", "tamper-
 * proof", "continuous compliance guaranteed"; controls are "touched", never
 * "satisfied"; cleared is never "fixed".
 */
export const SPINE_COPY = {
  hero: {
    eyebrow: "SPINE · the assurance system of record",
    headline: "Maintain the Truth.",
    lede: "Most security tests tell you what was true when the test ran. SPINE maintains whether the evidence behind that conclusion is still safe to rely on — tied to the exact configuration it was true of, and reopened the moment a change undermines it.",
  },
  why: {
    eyebrow: "Why SPINE",
    title: "Findings fade. Claims are kept honest.",
    lede: "A report is a snapshot. SPINE records what was approved, notices when the evidence behind it changes, directs the retests that change requires, and shows whether the repair justifies release.",
    pillars: [
      {
        name: "Bound to a configuration",
        body: "Every claim is tied to a system fingerprint, a policy version and an environment — never to a vague “the system.”",
      },
      {
        name: "Unknown is first-class",
        body: "We would rather say we do not know yet than turn missing evidence into a green result.",
      },
      {
        name: "Change-aware",
        body: "When the system moves, SPINE works out which conclusions moved with it — and only those are retested.",
      },
    ],
  },
  graph: {
    eyebrow: "The assurance graph",
    title: "Everything a claim depends on, connected.",
    lede: "Systems, identities, tools, evidence, findings, claims, actions, effects and business context — in one graph that remembers what changed and when. What an AI is permitted to reach and what it was actually seen reaching are kept apart.",
  },
  claims: {
    eyebrow: "Claims and evidence",
    title: "Declared, observed and verified are never merged.",
    lede: "What a team or vendor says, what Mythos sees running, and what testing proves stay separate truths. A claim is only as strong as its weakest evidence.",
    clocks: {
      title: "Two clocks, nothing overwritten",
      body: "SPINE keeps when a source saw a fact apart from when that fact was held current — so you can ask what was true on any date, and what was known at the time.",
    },
    unknown: {
      question: "Does the model provider retain prompts sent by the assistant?",
      why: "Customer data could persist outside your boundary.",
      needed: "The provider’s data-processing terms, or an observed retention test.",
    },
  },
  authority: {
    eyebrow: "Authority chain",
    title: "Who allowed this, and did the effect match?",
    lede: "Policy decides with four effects, and the most restrictive wins. An unknown input never defaults to allow — it escalates to a human.",
  },
  change: {
    eyebrow: "Change intelligence",
    title: "The loop that keeps evidence current.",
    lede: "SPINE fires on events or on a schedule: detect the change, assess its impact, invalidate what it touched, plan the minimal retest, revalidate, restore.",
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
      "Pinned policy versions",
      "Event and schedule triggers",
      "Targeted revalidation",
      "Human authorization for high-risk retests",
    ],
  },
  decisions: {
    eyebrow: "Deployment decisions",
    title: "A recommendation backed by evidence. Your team decides.",
    lede: "SPINE recalculates the decision whenever the evidence beneath it moves. A missing decision is never Ready.",
  },
  evidence: {
    eyebrow: "Receipts and packets",
    title: "Evidence you can hand to someone else.",
    lede: "Assurance Receipts are signed and tamper-evident, so anyone can check where a result came from and that it has not been altered. A receipt proves integrity and provenance — never that the conclusion is true. That is what the evidence is for.",
    packets: [
      {
        name: "Vendor Assurance Packet",
        body: "Declared versus verified evidence about a third-party AI, for procurement and vendor review.",
        icon: "/assets/evidence/evidence-pack.svg",
      },
      {
        name: "Incident Evidence Pack",
        body: "What happened, under which authority, with the evidence preserved for review and retest.",
        icon: "/assets/evidence/change-event.svg",
      },
      {
        name: "Evidence API",
        body: "Bring claims, receipts and decisions into your own GRC, ticketing and release tooling.",
        icon: "/assets/evidence/policy-authority-chain.svg",
      },
    ],
  },
  economics: {
    eyebrow: "SPINE Economic Exposure",
    title: "Connecting a verified effect to its business consequence.",
    lede: "Because SPINE knows which effects were verified and which business processes they touch, it is the foundation Economic Exposure is designed to build on: modeled ranges, the cost of a fix, and the exposure that fix could remove — with every source and assumption shown.",
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
  { field: "Time", value: "Observed 14 Oct 2026, 09:12 UTC" },
  { field: "Validity", value: "Until configuration or policy changes" },
  { field: "Invalidators", value: "New tool · policy edit · model change" },
  { field: "Approval", value: "Security lead" },
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
    caption: "Verified effects connect to the business process they touch — the bridge Economic Exposure is designed to build on.",
  },
];
