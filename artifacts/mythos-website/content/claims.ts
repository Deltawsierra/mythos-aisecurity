/**
 * Launch-gate claim register.
 *
 * Every specific, checkable capability claim (counts, named mechanisms, "Mythos
 * does X today") is written here once and referenced by id from page copy.
 * Before site-v2 merges to main, each entry must be checked against the Mythos
 * Master Inventory: verified claims keep present tense; anything still
 * unfinished is reworded with forward verbs ("is designed to…", "extends into…").
 */
export type ClaimStatus =
  | "unverified" // not yet checked against the Master Inventory
  | "verified" // confirmed shipped — present tense allowed
  | "forward"; // confirmed unfinished — must use forward-looking wording

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  /** Where the wording came from, for the reviewer. */
  source: string;
  /** Pages whose copy relies on this claim. */
  usedIn?: string[];
  /** What the internal documents say about its status, for the reviewer. */
  note?: string;
}

export const CLAIMS: Claim[] = [
  // ── SPINE and platform (Phase 3). Status notes summarise the Sep–Oct 2026
  //    internal docs: SPINE Technical Foundation Spec v0.1 (Spec), SPINE R&D
  //    Plan (R&D), Athena overnight build log (Athena), Economic Exposure
  //    Master Specification (EE). The Master Inventory decides each one.
  {
    id: "spine.claims-and-invalidation",
    text: "SPINE binds each claim to the configuration and policy version it was true of, and closes it when a change INVALIDATES it",
    status: "unverified",
    source: "Spec §claims; blueprint SPINE page",
    usedIn: ["/platform", "/platform/spine"],
    note: "Conflict: Spec lists the claims engine as 'Gap 1. No module'; R&D says 'reported built and merged through Stage 3'.",
  },
  {
    id: "spine.bitemporal",
    text: "two clocks: when a fact was observed, and when SPINE held it current — nothing overwritten",
    status: "unverified",
    source: "Spec time model",
    usedIn: ["/platform/spine"],
    note: "Unclear: Spec marks valid_from/valid_to net-new but also says they exist on the models; R&D calls the time model ambiguous.",
  },
  {
    id: "spine.decision-states",
    text: "six deployment decision states (Ready … Paused); a missing decision is never Ready",
    status: "unverified",
    source: "Spec decision model",
    usedIn: ["/platform", "/platform/spine"],
    note: "Spec: shipped (six states; a seventh only proposed).",
  },
  {
    id: "spine.evidence-strength",
    text: "evidence strength ladder; a claim is only as strong as its weakest evidence; vendor-asserted is not verified",
    status: "unverified",
    source: "Spec evidence classes",
    usedIn: ["/platform/spine"],
    note: "Spec: shipped.",
  },
  {
    id: "spine.unknowns-register",
    text: "unknowns are tracked with the question, why it matters and the evidence needed",
    status: "unverified",
    source: "Spec Unknowns Register",
    usedIn: ["/platform", "/platform/spine"],
    note: "Spec: shipped.",
  },
  {
    id: "spine.policy-effects",
    text: "policy effects Deny / Escalate / Allow with approval / Allow; any deny wins; unknown input escalates",
    status: "unverified",
    source: "Spec Policy IR",
    usedIn: ["/platform/spine"],
    note: "Spec: PolicyEffect lattice shipped; Cedar/Rego adapters spec-level only.",
  },
  {
    id: "spine.change-intelligence",
    text: "change intelligence: detect, assess impact, invalidate, plan the minimal retest, revalidate, restore",
    status: "unverified",
    source: "Spec change pipeline",
    usedIn: ["/platform", "/platform/spine"],
    note: "Spec: change basics shipped, INVALIDATES wiring 'not yet driven'; R&D: reported built.",
  },
  {
    id: "spine.access-vs-observed",
    text: "the assurance graph keeps permitted access separate from access actually observed",
    status: "unverified",
    source: "Spec assurance graph (CAN_ACCESS vs OBSERVED_ACCESS)",
    usedIn: ["/platform/spine"],
  },
  {
    id: "spine.facts-not-raw-data",
    text: "connectors bring in facts with provenance, not raw data",
    status: "unverified",
    source: "Spec ingestion",
    usedIn: ["/platform/spine"],
    note: "Athena: connectors merged; live wiring deferred pending real credentials.",
  },
  {
    id: "receipts.signed",
    text: "signed, tamper-evident Assurance Receipts whose integrity and provenance can be checked",
    status: "unverified",
    source: "Spec receipt; Athena log",
    usedIn: ["/platform", "/platform/spine"],
    note: "Conflict: Athena 'MERGED'; Spec marks signature field net-new; R&D: anchoring inert until configured, verifier still to do.",
  },
  {
    id: "outputs.vendor-incident-packs",
    text: "vendor assurance packets and incident evidence packs",
    status: "unverified",
    source: "Athena log; blueprint",
    usedIn: ["/platform/spine"],
    note: "Conflict: Athena 'merged'; Spec lists Vendor/Procurement Assurance as future roadmap.",
  },
  {
    id: "outputs.evidence-api",
    text: "an Evidence API for exporting evidence into your own systems",
    status: "unverified",
    source: "Athena log",
    usedIn: ["/platform/spine"],
    note: "Athena: 'DONE (pre-existing)'.",
  },
  {
    id: "outputs.coverage",
    text: "coverage: what was expected, observed, assessed, and not checked",
    status: "unverified",
    source: "Blueprint (Athena coverage manifests)",
    usedIn: ["/platform", "/platform/spine"],
    note: "Not found in the Sep docs; R&D lists a capability evidence manifest / coverage denominators as future. Blueprint says it exists.",
  },
  {
    id: "economic-exposure.quantifies",
    text: "quantifies the business exposure",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — homepage hero body",
    usedIn: ["/ (hero, lifecycle executive layer)", "/platform", "/platform/spine"],
    note: "EE spec (7 Oct): specified only — 'no production scoring yet'. Platform pages use forward wording; the homepage hero likely needs it too.",
  },
  {
    id: "spine.keeps-evidence-current",
    text: "keeps the evidence current as the system changes",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — homepage hero body",
    usedIn: ["/ (hero, lifecycle Revalidate stage, final CTA)"],
  },
  {
    id: "athena.scanner-count",
    text: "27 scanners",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Athena page",
  },
  {
    id: "achilles.capability-families",
    text: "8 capability families",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
  },
  {
    id: "achilles.scenario-count",
    text: "32 scenarios",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
  },
  {
    id: "achilles.cross-channel-chains",
    text: "six cross-channel chains",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
  },
];

export function getClaim(id: string): Claim {
  const claim = CLAIMS.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}

/** Claims that still block a merge to main. */
export const UNVERIFIED_CLAIMS = CLAIMS.filter((c) => c.status === "unverified");
