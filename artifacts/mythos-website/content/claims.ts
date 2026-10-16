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
  | "forward" // confirmed unfinished — must use forward-looking wording
  | "rejected"; // not supported by the sources — must not appear in copy

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
    usedIn: ["/platform", "/platform/spine"],
    note: "EE spec (7 Oct): specified only — 'no production scoring yet'. Platform pages use forward wording. The Luminous Olympus homepage (16 Oct) no longer says 'quantifies'; see home.ee-informs.",
  },
  {
    id: "spine.keeps-evidence-current",
    text: "keeps the evidence current as the system changes",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — homepage hero body",
    usedIn: ["/ (H03 Strengthen, H06 SPINE truth)"],
  },
  // ── Luminous Olympus inner pages (Launch Guide R02–R05, 16 Oct 2026).
  {
    id: "athena.boundary-traces",
    text: "Athena observes allowed, denied and held calls at agent and tool boundaries",
    status: "unverified",
    source: "Launch Guide A05; Athena log (identity and effective access modules)",
    usedIn: ["/platform/athena (A05 call traces)"],
    note: "Shown as illustrative synthetic traces; copy states Athena observes and tests, never enforces.",
  },
  {
    id: "achilles.approval-binding",
    text: "testing that approvals are bound to destination, amount, identity, order and expected effect",
    status: "forward",
    source: "Launch Guide AC05 / F02; Red, Gray and Green Teaming guide §8 (approval-binding lesson)",
    usedIn: ["/platform/achilles (AC05)"],
    note: "Action and approval authority family is BUILD-NEW (Roadmap); the reference Action Gate is deferred. Forward wording on the page.",
  },
  {
    id: "spine.receipt-provenance",
    text: "receipts record provenance and are built to be tamper-evident, with signing where implemented",
    status: "unverified",
    source: "SPINE Technical Foundation Spec; Launch Guide R04 proof requirement",
    usedIn: ["/platform/spine (receipts)"],
    note: "16 Oct fact-check: receipts are SHA-256 hashed over canonical JSON with a Merkle-style evidence root (built); the backend deliberately does not sign (TFS p.36). Only Achilles engine evidence packs are signed. Page says signing is planned.",
  },
  // ── Minotaur and Hermes (Launch Guide R06/R07). Sources: Platform Roadmap
  //    (17 Sep), Session Work Summary, SPINE R&D Plan (21 Sep), Achilles
  //    Handbook, Launch Research, Self-Protection Spec, Threat Atlas.
  {
    id: "minotaur.proving-ground",
    text: "an internal proving ground: a target range with a sealed answer key and cases at several levels of difficulty",
    status: "unverified",
    source: "Roadmap p.11 (BUILT); Session Work Summary p.6",
    usedIn: ["/platform/validation (hero, labyrinth ring 1, known-answer card)"],
    note: "Built per the Roadmap. Counts (difficulty tiers, catalogue cases) deliberately not published.",
  },
  {
    id: "minotaur.holdouts",
    text: "cases held back from the engines being tested",
    status: "unverified",
    source: "R&D Plan p.6 (sealed holdout, reported); Roadmap p.12 (Vault/Holdout Arena BUILD-NEW)",
    usedIn: ["/platform/validation (in place today, labyrinth ring 3)"],
    note: "Conflict: BUILD-NEW on 17 Sep, 'reported' on 21 Sep. Verify against the Master Inventory before launch.",
  },
  {
    id: "minotaur.validity-card",
    text: "Benchmark Validity Cards recording harness owner, versions, monitors, context, tools, seed, scorer, false blocks and tail risk",
    status: "forward",
    source: "Launch Research action 3 (draft); Achilles Handbook §15.4; teaming guide §12.2",
    usedIn: ["/platform/validation (M04, sample labelled synthetic)"],
  },
  {
    id: "minotaur.benign-twins",
    text: "each attack case paired with a benign twin and negative controls",
    status: "forward",
    source: "Achilles Handbook §15.2 (clean counterparts); Beyond the Finding §11.1",
    usedIn: ["/platform/validation (labyrinth ring 2, M03)"],
    note: "'Safe twin' is not a term in the research docs; described as a method with forward wording.",
  },
  {
    id: "minotaur.reproduction-regression",
    text: "independent reproduction from recorded versions and fixtures, and regression runs after every fix",
    status: "forward",
    source: "Roadmap p.12; Achilles Handbook §4.5, §16.1–16.2",
    usedIn: ["/platform/validation (labyrinth rings 4–5, M06)"],
    note: "Page states nobody outside Mythos has reproduced results yet.",
  },
  {
    id: "minotaur.weakest-result",
    text: "the weakest result sets the outcome; a strong average cannot offset an unauthorized effect",
    status: "unverified",
    source: "Achilles Handbook §1.2 (DENY floors, weakest-wins, reported)",
    usedIn: ["/platform/validation (M07 release support)"],
    note: "Blueprint's 'security veto' not found in sources; page uses forward wording ('designed to advise').",
  },
  {
    id: "hermes.foundation",
    text: "an early engine foundation for physical-AI assurance, starting with vehicles, fleets and over-the-air updates",
    status: "unverified",
    source: "Roadmap p.12 (scaffold built; domain logic returns INCONCLUSIVE); Session Work Summary p.1",
    usedIn: ["/platform/hermes (hero scope line, status section)"],
    note: "No customers or pilots. R&D Plan p.6: no basis for present vehicle-assurance efficacy claims.",
  },
  {
    id: "hermes.publication-scope",
    text: "the Hermes page itself is approved for publication",
    status: "unverified",
    source: "Launch Guide R07 ('Launch if scope approved'); Launch Research, Assurance Brief and Weekly Synthesis advise deferring Hermes",
    usedIn: ["/platform/hermes", "/use-cases/ai-driven-vehicle-systems-hermes"],
    note: "Release blocker by design: leadership must approve Hermes scope before this page (and use case 11) ships.",
  },
  {
    id: "hermes.update-evidence",
    text: "treating each over-the-air update as a change that stales dependent evidence, with replay in simulation and on the bench before field use",
    status: "forward",
    source: "SPINE Foundation Spec p.9 (OTA package invalidates prior version); Self-Protection Spec §4",
    usedIn: ["/platform/hermes (HE07 trail, labelled designed)"],
  },
  // ── Economic Exposure, Evidence, Continuous Assurance (16 Oct fact-check:
  //    EE Master Spec, SPINE Technical Foundation Spec, R&D Plan, Roadmap,
  //    Athena build log).
  {
    id: "ee.designed",
    text: "Economic Exposure is designed to connect verified effects to scenario-based exposure ranges, remediation economics, Financial Exposure Receipts and Financial Validity Cards",
    status: "forward",
    source: "EE Master Spec (7 Oct) §5–9, §16, §21, §26",
    usedIn: ["/platform/economic-exposure"],
    note: "Specified only; no EE build record. Every figure on the page is a synthetic fixture.",
  },
  {
    id: "evidence.receipt-hashed",
    text: "Assurance Receipts are hashed over their evidence and exportable as JSON",
    status: "unverified",
    source: "Athena build log PR #27, #34; SPINE Foundation Spec p.33–36",
    usedIn: ["/platform/evidence", "/platform/spine"],
    note: "Built per the log. Not signed (TFS p.36); signing and a public verifier are planned.",
  },
  {
    id: "evidence.engine-packs-signed",
    text: "Achilles engine evidence packs are signed and can be verified offline",
    status: "unverified",
    source: "Roadmap p.9, p.11",
    usedIn: ["/platform/evidence (outputs)"],
  },
  {
    id: "evidence.incident-pack",
    text: "Incident Evidence Packs",
    status: "unverified",
    source: "Session Work Summary p.10 (#36)",
    usedIn: ["/platform/evidence (outputs)", "/platform/spine (packets)"],
    note: "Built; replay deferred.",
  },
  {
    id: "ca.staleness-and-recalc",
    text: "evidence that ages to Stale, and decisions recalculated when evidence moves",
    status: "unverified",
    source: "SPINE Foundation Spec p.28–31; Athena build log #34, #38",
    usedIn: ["/platform/continuous-assurance (in place today)"],
    note: "Staleness interval deliberately not published.",
  },
  {
    id: "ca.drift-triggers",
    text: "policy, inventory (AI-BOM) and fingerprint drift as revalidation triggers",
    status: "unverified",
    source: "R&D Plan p.5 (reported built); Session Work Summary p.12",
    usedIn: ["/platform/continuous-assurance (in place today)"],
    note: "Other change types (prompt, tool, permission, data source, route) are planned. No live monitoring.",
  },
  // ── Luminous Olympus homepage (Launch Guide, 16 Oct 2026).
  {
    id: "home.ee-informs",
    text: "evidence can inform modeled financial exposure, remediation economics and business response",
    status: "forward",
    source: "Launch Guide H08",
    usedIn: ["/ (H08)"],
    note: "Framed as approach, not output: Economic Exposure is 'designed to' show ranges with assumptions. EE spec: specified only.",
  },
  {
    id: "home.five-teams",
    text: "red, blue, purple, green and white assurance teams working inside authorized test scopes",
    status: "unverified",
    source: "Red, Gray and Green Teaming guide (28 Sep 2026) §2; Launch Guide H07",
    usedIn: ["/ (H07)"],
    note: "Definitions follow the teaming guide. Launch Guide draft called green 'operational utility'; the guide assigns utility to the gray user role.",
  },
  {
    id: "home.targeted-revalidation",
    text: "SPINE makes a change visible and supports targeted revalidation of the claims it affects",
    status: "unverified",
    source: "Launch Guide H06; SPINE Technical Foundation Spec (change pipeline)",
    usedIn: ["/ (H06 demo)"],
    note: "Same capability as spine.change-intelligence and spine.claims-and-invalidation; the demo is a labelled synthetic fixture (Launch Guide F01).",
  },
  // ── Athena and Achilles (Phase 3). Sources: Athena + Mythos Platform
  //    Roadmap (Reconciled) (Roadmap), Athena overnight build log (Athena),
  //    Achilles Adversarial Learning Handbook (Handbook), AI Attack Resistance
  //    and Agent Containment Research (Containment).
  {
    id: "athena.scanner-count",
    text: "27 scanners",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Athena page",
    note: "Roadmap: '~27 scanners', BUILT. Not used in copy until confirmed exactly.",
  },
  {
    id: "athena.check-groups",
    text: "web/API/LLM testing, identity and effective access, cloud/secrets/repo posture, data lifecycle and reuse, personal context exposure, impact and compliance mapping",
    status: "unverified",
    source: "Athena log (modules merged 17 Sep)",
    usedIn: ["/platform/athena"],
    note: "Merged per Athena log. Credential-gated integrations are adapters + mocks only.",
  },
  {
    id: "athena.discovery-routes",
    text: "asset discovery, route and provider mapping, AI-BOM",
    status: "unverified",
    source: "Roadmap Phase 1",
    usedIn: ["/platform/athena (system map, routes group)", "/use-cases/*"],
    note: "Roadmap tagged BUILD-NEW on 16 Sep; the Session Work Summary (17 Sep, p.9) lists discovery, route map and AI-BOM as built (computed). Verify against code before launch.",
  },
  {
    id: "athena.confidence-unknowns",
    text: "confirmed / likely / suspicious confidence; Unknowns register (inconclusive, unmeasured, excluded)",
    status: "unverified",
    source: "Roadmap (EXPOSE)",
    usedIn: ["/platform/athena"],
    note: "Roadmap marks these exposed/built.",
  },
  {
    id: "athena.evidence-packs-retest",
    text: "signed, hash-chained evidence packs with an offline verifier; retest results unchanged / review / blocked / unmeasured",
    status: "unverified",
    source: "Roadmap",
    usedIn: ["/platform/athena"],
    note: "Roadmap: evidence packs and retest BUILT.",
  },
  {
    id: "solutions.offer-names",
    text: "starting engagements: banking AI workflow assurance assessment, insurance AI change evidence, high-risk AI evidence assessment, AI workflow release assurance, privacy and consequential-decision evidence, AI acceptance and change evidence through an integrator, delivery partnership, third-party AI vendor assurance",
    status: "unverified",
    source: "Fact-check 16 Oct (Banking Dossier, Regulation Strategy, Market Landscape)",
    usedIn: ["/solutions/*"],
    note: "Offer names come from research documents; the price book is unsigned and no price is shown. Needs commercial sign-off.",
  },
  {
    id: "solutions.framework-references",
    text: "frameworks referenced in scoping: US Treasury FS AI risk framework, NYDFS Circular Letter 7, NIST AI RMF, ISO/IEC 42001, OMB M-25-21/M-25-22, NIST critical-infrastructure AI profile, OWASP agentic guidance, NIST AI 100-2",
    status: "unverified",
    source: "Fact-check 16 Oct",
    usedIn: ["/solutions", "/solutions/*"],
    note: "Referenced only — never mapped, certified or attested. Built mappings stay limited to athena.compliance-mapping.",
  },
  {
    id: "athena.compliance-mapping",
    text: "mapped to tests and evidence for NIST 800-53/RMF, OWASP web and LLM, DoD Zero Trust",
    status: "unverified",
    source: "Athena log",
    usedIn: ["/platform/athena", "/solutions", "/solutions/*"],
    note: "Merged. Never 'certified' or 'compliant'; controls are touched, not satisfied.",
  },
  {
    id: "achilles.capability-families",
    text: "8 capability families",
    status: "unverified",
    source: "Website blueprint, Oct 2026 — Achilles page",
    usedIn: ["/platform/achilles"],
    note: "Roadmap: six built (goal hijack, RAG leakage, tool misuse, permission boundary, jailbreak, insecure output). MCP/tool integrity and action/approval authority BUILD-NEW; Handbook reports decision cores, unaudited. Page uses forward wording for those two.",
  },
  {
    id: "achilles.multi-turn",
    text: "multi-turn adversarial testing",
    status: "unverified",
    source: "Roadmap",
    usedIn: ["/platform/achilles"],
    note: "Roadmap: built.",
  },
  {
    id: "achilles.effect-ledger",
    text: "observed effects recorded in a hash-chained effect ledger",
    status: "unverified",
    source: "Roadmap",
    usedIn: ["/platform/achilles"],
    note: "Ledger BUILT; an independent effect oracle is still proposed.",
  },
  {
    id: "achilles.utility-retained",
    text: "every fix scored for security retained and utility retained",
    status: "unverified",
    source: "Athena log (PR #34, Athena-Engine)",
    usedIn: ["/platform/achilles"],
    note: "Built as a platform metric in the Athena engine, not inside Achilles itself.",
  },
  {
    id: "achilles.action-gate",
    text: "a reference Action Gate that decides consequential actions before they run",
    status: "forward",
    source: "Roadmap 3.6/A7; SPINE spec Phase 12; Handbook",
    usedIn: ["/platform/achilles"],
    note: "Deferred / Phase 12; Handbook reports an unaudited decision core. Docs warn against presenting assessment as runtime enforcement.",
  },
  {
    id: "achilles.release-comparison",
    text: "release and canary comparison ending in release / restrict / hold",
    status: "forward",
    source: "Roadmap A4; Handbook",
    usedIn: ["/platform/achilles"],
    note: "Decision core in an open PR with failing CI; Handbook reports it exists.",
  },
  {
    id: "achilles.cross-channel",
    text: "chains that cross channels (email → retrieval → plan → tool)",
    status: "forward",
    source: "Containment research (20 proposed acceptance cases, six to build first)",
    usedIn: ["/platform/achilles"],
  },
  {
    id: "usecases.effective-access-declared",
    text: "effective access is computed from the access configuration supplied; cloud, identity and repository connectors need customer credentials",
    status: "unverified",
    source: "Athena build log p.11, p.15; Deployment Fabric p.4",
    usedIn: ["/use-cases/*", "/outputs"],
    note: "Stated as a limitation on every scenario page. Live identity edges are planned.",
  },
  {
    id: "usecases.quantum-horizon",
    text: "use case 12 (quantum-adjacent AI R&D) published as research questions only",
    status: "unverified",
    source: "Launch Guide UC12; 16 Oct fact-check found no source mentioning quantum",
    usedIn: ["/use-cases/quantum-adjacent-ai-integration"],
    note: "Release blocker: no internal source supports any quantum work. Leadership must approve publishing the page at all.",
  },
  {
    id: "trust.controls-in-place",
    text: "scope enforced at scan launch; allow-listed scanner egress with size/time limits; three-level failsafe with two keys for the most serious stops; evidence keeps hashes and metadata, not raw secrets",
    status: "unverified",
    source: "Session Work Summary p.4-8; Roadmap p.10-11; SPINE spec p.47-48",
    usedIn: ["/trust"],
    note: "Internal build records only; no external audit. Designed items (isolation, broker, tenant isolation, RBAC/SSO, signing, VPC/air-gapped) are listed as not built.",
  },
  {
    id: "outputs.statuses",
    text: "output maturity: finding, receipt, remediation, decision support built; scope record, system map, retest, export partly built; Economic Exposure planned",
    status: "unverified",
    source: "16 Oct resources fact-check (Session Work Summary, Athena build log, SPINE spec)",
    usedIn: ["/outputs", "/company", "/investors"],
    note: "Conflicts remain on vendor assurance (merged vs planned) and claim invalidation (reported built vs no module).",
  },
  {
    id: "company.no-people-published",
    text: "no founder names, biographies, dates, location, legal entity or veteran status are published",
    status: "verified",
    source: "16 Oct company fact-check; decision D08 open",
    usedIn: ["/company", "/investors", "/careers"],
    note: "Add people only with their approval. Never claim SDVOSB/VOSB.",
  },
  {
    id: "achilles.scenario-count",
    text: "32 scenarios",
    status: "rejected",
    source: "Website blueprint, Oct 2026 — Achilles page",
    note: "Handbook: 32 are training lessons, explicitly not runnable scenarios or real incidents.",
  },
  {
    id: "achilles.cross-channel-chains",
    text: "six cross-channel chains",
    status: "rejected",
    source: "Website blueprint, Oct 2026 — Achilles page",
    note: "Not found. Containment research proposes 20 cases and picks six to build first; outcomes not measured.",
  },
];

export function getClaim(id: string): Claim {
  const claim = CLAIMS.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}

/** Claims that still block a merge to main. */
export const UNVERIFIED_CLAIMS = CLAIMS.filter((c) => c.status === "unverified");
