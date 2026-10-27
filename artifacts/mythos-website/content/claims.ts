/**
 * Launch-gate claim register.
 *
 * Every specific, checkable capability claim (counts, named mechanisms, "Mythos
 * does X today") is written here once and referenced by id from page copy.
 * The source of truth is the Mythos Master Inventory (26 Oct 2026), which
 * replaces the 13 Oct inventory and the Sep–Oct internal docs. Its claims
 * ledger lists the external claims the site may make; capability sections
 * describe how they work; "Planned additions", the work queue and "Limits and
 * known gaps" mark what is not built. Verified claims keep present tense;
 * forward ones use forward verbs; rejected ones must not appear in copy.
 */
export type ClaimStatus =
  | "unverified" // still needs an owner or commercial decision before launch
  | "verified" // in the Master Inventory as a current capability — present tense allowed
  | "forward" // in the inventory as planned or not yet built — forward wording only
  | "approved" // not a capability claim: an owner or commercial ruling, recorded with its date
  | "rejected"; // not supported by the inventory — must not appear in copy

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

const INV = "Master Inventory, 26 Oct 2026";
const RULING = "Owner ruling, 26 Oct 2026";

export const CLAIMS: Claim[] = [
  // ── Claims ledger (Master Inventory p.18–19): the external claims the site may make.
  {
    id: "ledger.agent-exceeds-task",
    text: "tests whether an AI agent can exceed its approved task, scoped to one agent workflow",
    status: "verified",
    source: `${INV} — claims ledger; Achilles`,
    usedIn: ["/platform/achilles", "/use-cases/*"],
    note: "Evidence: Achilles decision, evidence tiers, coverage manifest. Goes stale when the agent's route, tools, policy or model change.",
  },
  {
    id: "ledger.signed-trail",
    text: "records a tamper-evident, signed, offline-verifiable trail per scan and per deployment",
    status: "verified",
    source: `${INV} — claims ledger; Athena engine record; Mythos-Core`,
    usedIn: ["/platform/evidence", "/platform/spine", "/trust"],
    note: "Row chains, DSSE receipts, Merkle proofs, a standalone verifier. A signed receipt proves integrity and provenance, never correctness.",
  },
  {
    id: "ledger.says-what-was-not-measured",
    text: "says what was not measured, per scan and per decision",
    status: "verified",
    source: `${INV} — claims ledger; coverage manifest, AUDIT_INCOMPLETE`,
    usedIn: ["/platform", "/platform/spine", "/platform/athena", "/outputs"],
  },
  {
    id: "ledger.fixed-answer-scoring",
    text: "scores the engines on fixed-answer corpora: recall and precision floors on planted targets, each with a Validity Card",
    status: "verified",
    source: `${INV} — claims ledger; Minotaur`,
    usedIn: ["/platform/validation"],
    note: "Planted targets only. No family has a pass mark, no Validity Card is audited, no holdout is sealed. Do not publish the 1.0 figures.",
  },
  {
    id: "ledger.release-nine-gates",
    text: "governs each engine's release through nine gates (Detection, Precision, Policy, Action Gate, SPINE, Evidence, Performance, Coverage, Regression); unmeasured is never green",
    status: "verified",
    source: `${INV} — claims ledger; Minotaur release authority`,
    usedIn: ["/platform/validation"],
    note: "Signed, append-only decisions; the signing key is held only by the hosted backend.",
  },
  {
    id: "ledger.prices-range",
    text: "prices a validated failure as a range for one business process: P10/P50/P90, a confidence grade, a Validity Card and a signed Financial Exposure Receipt",
    status: "verified",
    source: `${INV} — claims ledger; Economic Exposure`,
    usedIn: ["/platform/economic-exposure", "/", "/platform/spine"],
    note: "Limits: every external feed is a fixture until keys and a licence review; no calibration or back-testing yet; the portfolio total is not signed; decision support only.",
  },
  {
    id: "ledger.closure-on-retest",
    text: "closes a finding only on independent retest: a repair contract, then retest-gated closure with six incomplete-repair negative controls",
    status: "verified",
    source: `${INV} — claims ledger; SPINE closure`,
    usedIn: ["/platform/spine", "/platform/evidence", "/outputs"],
    note: "Remediation verified means absent on retest, not that legitimate use still works.",
  },
  {
    id: "ledger.maps-to-standards",
    text: "maps findings to NIST 800-53, OWASP 2021, OWASP LLM 2025 and DoD Zero Trust, with vertical packs for healthcare, financial services, federal and general AI — evidence of gaps, never a certificate",
    status: "verified",
    source: `${INV} — claims ledger; SPINE compliance map`,
    usedIn: ["/standards", "/platform/athena", "/solutions/*"],
  },
  {
    id: "ledger.unblockable-stop",
    text: "stops on operator command, unblockable: no control, read failure, flood or kill switch may block, delay or drop a stop",
    status: "verified",
    source: `${INV} — claims ledger; absolute stop rule; operator failsafe`,
    usedIn: ["/trust", "/platform"],
    note: "Signed failsafe, fault matrices, a 1 s stop bound; pause, stand-down and terminate, with two operators for the most serious.",
  },
  {
    id: "ledger.runs-on-windows",
    text: "runs on Windows: every repository has a Windows CI run, with stop paths checked first",
    status: "verified",
    source: `${INV} — claims ledger; Windows support`,
    usedIn: ["/trust"],
  },

  // ── SPINE and platform.
  {
    id: "spine.claims-and-invalidation",
    text: "SPINE binds each claim to the system state it was true of; a changed fingerprint supersedes it and opens a retest",
    status: "verified",
    source: `${INV} — change, coverage and authority`,
    usedIn: ["/platform", "/platform/spine"],
  },
  {
    id: "spine.bitemporal",
    text: "bitemporal versioning, with an attributed event for every move — nothing overwritten",
    status: "verified",
    source: `${INV} — claims, decisions and confidence`,
    usedIn: ["/platform/spine"],
  },
  {
    id: "spine.decision-states",
    text: "the deployment decision: Ready, Ready with restrictions, Needs more evidence, Audit incomplete, Needs remediation, Not recommended, plus Paused — worst-of-N",
    status: "verified",
    source: `${INV} — claims, decisions and confidence`,
    usedIn: ["/platform", "/platform/spine", "/outputs"],
    note: "Evidence for a human release decision, not the decision itself. An inconclusive or never-reached scan is never Ready.",
  },
  {
    id: "spine.evidence-strength",
    text: "confidence is the ordinal strength of the weakest evidence class, never a probability, null when unknown; vendor-asserted caps at supported",
    status: "verified",
    source: `${INV} — claims, decisions and confidence`,
    usedIn: ["/platform/spine", "/platform/athena"],
  },
  {
    id: "spine.unknowns-register",
    text: "an Unknowns register with the question, why it matters and the evidence needed",
    status: "rejected",
    source: "Superseded",
    note: "Not in the 26 Oct inventory. Copy uses the coverage manifest, INCONCLUSIVE, Not measured and AUDIT_INCOMPLETE instead.",
  },
  {
    id: "spine.policy-effects",
    text: "policy-as-code, deny by default: the Achilles Action Gate turns the operator's policy into a permit, deny, hold for approval or escalate",
    status: "verified",
    source: `${INV} — Achilles decision cores; glossary (Action Gate)`,
    usedIn: ["/platform/spine", "/platform/achilles"],
    note: "Re-attributed from SPINE to the Achilles Action Gate. 'Unknown input escalates' is not in the inventory.",
  },
  {
    id: "spine.change-intelligence",
    text: "change handling: a fingerprint change supersedes the claim, opens a retest, and a revalidation planner names the minimal re-run",
    status: "verified",
    source: `${INV} — change, coverage and authority`,
    usedIn: ["/platform", "/platform/spine"],
    note: "Legal staleness is set only by a person with a written rationale. No live runtime monitoring: monitor coverage is planned.",
  },
  {
    id: "spine.access-vs-observed",
    text: "graph views computed on read keep declared routes and access apart from what was inferred or observed",
    status: "verified",
    source: `${INV} — graph views (effective access, route map with shadow nodes)`,
    usedIn: ["/platform/spine"],
  },
  {
    id: "spine.signed-intake",
    text: "SPINE ingests signed records from the engines, each under its own credential: chain outcomes, observed effects, sign-in and delegation records",
    status: "verified",
    source: `${INV} — identity and signed evidence intake`,
    usedIn: ["/platform/spine"],
    note: "Today the backend is the identity provider of record; a customer-run collector is planned.",
  },
  {
    id: "spine.facts-not-raw-data",
    text: "connectors bring in facts with provenance, not raw data",
    status: "rejected",
    source: "Superseded",
    note: "Inbound customer-system connectors are not in the inventory. The connectors that exist dispatch findings out (outputs.dispatch).",
  },
  {
    id: "receipts.signed",
    text: "Assurance Receipts are DSSE-signed by the engine with the issue time inside the signature, verifiable offline; every past version still reads back",
    status: "verified",
    source: `${INV} — closure and receipts`,
    usedIn: ["/platform/evidence", "/platform/spine", "/outputs", "/trust", "/use-cases/*"],
    note: "Reverses the 16 Oct 'hashed, not signed' finding. Integrity and provenance, never correctness.",
  },
  {
    id: "outputs.dispatch",
    text: "findings dispatch to Jira, GitHub, ServiceNow and Splunk; a stop never waits on a connector",
    status: "verified",
    source: `${INV} — connectors and compliance`,
    usedIn: ["/platform/evidence", "/outputs"],
  },
  {
    id: "outputs.vendor-incident-packs",
    text: "vendor assurance packets and incident evidence packs",
    status: "rejected",
    source: "Superseded",
    note: "Not in the inventory. Vendor-asserted claims capping at supported is real and may be described.",
  },
  {
    id: "outputs.evidence-api",
    text: "an Evidence API for exporting evidence into your own systems",
    status: "rejected",
    source: "Superseded",
    note: "Not in the inventory; use outputs.dispatch and offline-verifiable receipts.",
  },
  {
    id: "outputs.coverage",
    text: "coverage manifest: what was expected, observed and assessed, and which checks ran; AUDIT_INCOMPLETE is a real outcome",
    status: "verified",
    source: `${INV} — change, coverage and authority; glossary`,
    usedIn: ["/platform", "/platform/spine"],
  },
  {
    id: "economic-exposure.quantifies",
    text: "quantifies the business exposure",
    status: "rejected",
    source: "Website blueprint, Oct 2026 — homepage hero body",
    note: "Implies an exact figure. Use ledger.prices-range: ranges with sources, never an exact future loss.",
  },
  {
    id: "spine.keeps-evidence-current",
    text: "keeps the evidence current as the system changes: changes supersede the claims they touch and open retests",
    status: "verified",
    source: `${INV} — change, coverage and authority`,
    usedIn: ["/ (H03 Strengthen, H06 SPINE truth)"],
  },
  {
    id: "outputs.statuses",
    text: "output maturity on /outputs matches the 26 Oct inventory",
    status: "verified",
    source: INV,
    usedIn: ["/outputs", "/company", "/investors"],
  },

  // ── Athena.
  {
    id: "athena.scanner-count",
    text: "27 scanners: 19 defender-style and 8 attacker-style",
    status: "verified",
    source: `${INV} — Athena engine, scanning; documentation drift (27 is correct)`,
    usedIn: ["/platform/athena", "/platform"],
  },
  {
    id: "athena.differential",
    text: "every finding is decided by a differential against a benign control — no baseline, no finding; informational classes are never scored",
    status: "verified",
    source: `${INV} — Athena engine, scanning; honesty invariants`,
    usedIn: ["/platform/athena"],
  },
  {
    id: "athena.check-groups",
    text: "check groups limited to the inventory's scanner classes and SPINE graph views",
    status: "verified",
    source: `${INV} — Athena engine; graph views`,
    usedIn: ["/platform/athena"],
    note: "Cloud posture, CI/CD pipeline, data lifecycle and personal-context checks are not in the inventory and were removed.",
  },
  {
    id: "athena.discovery-routes",
    text: "surface discovery (up to 150 pages at depth 4; ports, subdomains, endpoints), route map and AI bill of materials",
    status: "verified",
    source: `${INV} — Athena scanning; SPINE graph views`,
    usedIn: ["/platform/athena", "/use-cases/*"],
  },
  {
    id: "athena.confidence-unknowns",
    text: "confirmed / likely / suspicious confidence",
    status: "rejected",
    source: "Superseded",
    note: "Not in the inventory. Use athena.differential and spine.evidence-strength.",
  },
  {
    id: "athena.evidence-packs-retest",
    text: "evidence packs signed with Ed25519 and Merkle inclusion proofs; a retest runs a decision twin and files closed, still open or inconclusive",
    status: "verified",
    source: `${INV} — the record; retests, twins and attestation`,
    usedIn: ["/platform/athena", "/outputs"],
    note: "A cached pass is not a retest; a scanner switched off cannot record a fix.",
  },
  {
    id: "athena.boundary-traces",
    text: "every outbound effect is recorded with the authority it ran under and whether policy allowed it; authority chains show each hop proven, unproven or broken",
    status: "verified",
    source: `${INV} — the record; change, coverage and authority`,
    usedIn: ["/platform/athena"],
  },
  {
    id: "athena.compliance-mapping",
    text: "mapped to NIST 800-53, OWASP 2021, OWASP LLM 2025 and DoD Zero Trust",
    status: "verified",
    source: `${INV} — connectors and compliance`,
    usedIn: ["/platform/athena", "/solutions", "/solutions/*"],
    note: "Never 'certified' or 'compliant'. 'RMF' is not in the inventory.",
  },
  {
    id: "athena.detection-gaps",
    text: "named detection gaps: reflected XSS only, error-based SQL injection only, in-band XXE only; blind, stored, out-of-band and CRLF classes are not yet covered",
    status: "verified",
    source: `${INV} — limits and known gaps`,
    usedIn: ["/platform/athena"],
  },

  // ── Achilles.
  {
    id: "achilles.capability-families",
    text: "eight capabilities across 32 scenarios",
    status: "verified",
    source: `${INV} — Achilles capabilities and scenarios`,
    usedIn: ["/platform/achilles"],
  },
  {
    id: "achilles.scenario-count",
    text: "32 scenarios",
    status: "verified",
    source: `${INV} — Achilles capabilities and scenarios`,
    usedIn: ["/platform/achilles"],
    note: "Reverses the earlier rejection (the Handbook's 32 training lessons were a different list).",
  },
  {
    id: "achilles.cross-channel-chains",
    text: "six cross-channel chains (web, email, document, MCP, agent, gate), each with two inert canaries and a benign counterpart",
    status: "verified",
    source: `${INV} — Achilles; attack coverage map`,
    usedIn: ["/platform/achilles"],
  },
  {
    id: "achilles.cross-channel",
    text: "chains that cross channels",
    status: "verified",
    source: `${INV} — Achilles`,
    usedIn: ["/platform/achilles"],
  },
  {
    id: "achilles.multi-turn",
    text: "multi-turn adversarial testing, including crescendo",
    status: "verified",
    source: `${INV} — Achilles capabilities`,
    usedIn: ["/platform/achilles"],
  },
  {
    id: "achilles.approval-binding",
    text: "testing that an approval stays bound to the eight canonical action fields, and that forged, claimed, replayed or delegated approvals are refused",
    status: "verified",
    source: `${INV} — Action and Approval Authority (eight scenarios); attacks on authority and actions`,
    usedIn: ["/platform/achilles", "/use-cases/*"],
  },
  {
    id: "achilles.effect-ledger",
    text: "an observed effect is a signed record that a provider answered 2xx to exactly the permitted action; a verified unauthorised effect needs a witness of external state",
    status: "verified",
    source: `${INV} — roles, campaigns and effects; evidence tiers`,
    usedIn: ["/platform/achilles"],
    note: "An independent effect witness is on the work queue.",
  },
  {
    id: "achilles.action-gate",
    text: "the reference enforcement stack: an Action Gate issues a permit bound to the action digest, policy digest and authority epoch, re-checked at dispatch",
    status: "verified",
    source: `${INV} — Achilles decision cores`,
    usedIn: ["/platform/achilles", "/use-cases/*"],
    note: "Runtime enforcement is a distinct engagement that mediates supported paths; never present an assessment as enforcement.",
  },
  {
    id: "achilles.release-comparison",
    text: "a canary comparison decides whether a candidate release is worse than the baseline, weakest wins",
    status: "verified",
    source: `${INV} — Achilles decision cores`,
    usedIn: ["/platform/achilles"],
  },
  {
    id: "achilles.limits",
    text: "Achilles sees only the target's reply text, and its scan results are not yet signed into the platform record",
    status: "verified",
    source: `${INV} — limits and known gaps`,
    usedIn: ["/platform/achilles"],
    note: "Signed scan results are on the work queue (banking demonstration).",
  },
  {
    id: "achilles.utility-retained",
    text: "every fix scored for security retained and utility retained",
    status: "rejected",
    source: "Superseded",
    note: "Conflicts with the do-not-claim line: remediation verified means absent on retest, not that legitimate use still works.",
  },

  // ── Minotaur.
  {
    id: "minotaur.proving-ground",
    text: "an internal proving ground: planted targets whose answers are known in advance, scored in a separated child under sealed rules",
    status: "verified",
    source: `${INV} — Minotaur`,
    usedIn: ["/platform/validation"],
    note: "Minotaur is internal; never a product or a sold service.",
  },
  {
    id: "minotaur.holdouts",
    text: "partitions: a training lab, a vault, a holdout arena and external reproduction",
    status: "verified",
    source: `${INV} — Minotaur honesty rules and governance`,
    usedIn: ["/platform/validation"],
    note: "No holdout is sealed yet; copy must say so.",
  },
  {
    id: "minotaur.validity-card",
    text: "no score is published without its Validity Card",
    status: "verified",
    source: `${INV} — Minotaur; glossary`,
    usedIn: ["/platform/validation"],
    note: "No Validity Card has been audited yet.",
  },
  {
    id: "minotaur.benign-twins",
    text: "decoys and safe twins, so a harness that reports everything is punished; precision decides",
    status: "verified",
    source: `${INV} — Minotaur what it measures; planted website`,
    usedIn: ["/platform/validation"],
  },
  {
    id: "minotaur.reproduction-regression",
    text: "an external reproduction package reproduced a row byte for byte in CI; Regression is one of the nine release gates",
    status: "verified",
    source: `${INV} — standards, reproduction and cheat testing`,
    usedIn: ["/platform/validation"],
  },
  {
    id: "minotaur.weakest-result",
    text: "a security veto outside the score rejects a change that turns off TLS verification, loosens a pin, bypasses the egress proxy or removes a stop route, whatever the score",
    status: "verified",
    source: `${INV} — release authority and the veto`,
    usedIn: ["/platform/validation"],
  },
  {
    id: "minotaur.standards-map",
    text: "a standards map of 15 standards and 86 clauses, with no badges",
    status: "verified",
    source: `${INV} — standards, reproduction and cheat testing`,
    usedIn: ["/platform/validation", "/standards"],
  },

  // ── Hermes.
  {
    id: "hermes.foundation",
    text: "a scaffold: four questions across twelve domains; the job API, readiness report and failsafe are built; every domain returns INCONCLUSIVE today",
    status: "verified",
    source: `${INV} — Hermes`,
    usedIn: ["/platform/hermes"],
    note: "Never certifies a vehicle; does not replace an OEM safety team. Standards are mapped, not certified.",
  },
  {
    id: "hermes.publication-scope",
    text: "the Hermes page is published, describing a scaffold whose every domain returns inconclusive",
    status: "approved",
    source: `${RULING}; ${INV} — Hermes`,
    usedIn: ["/platform/hermes", "/use-cases/ai-driven-vehicle-systems-hermes"],
    note: "Published as a scaffold. Never certifies a vehicle; does not replace an OEM safety team.",
  },
  {
    id: "hermes.update-evidence",
    text: "treating each over-the-air update as a change that stales dependent evidence",
    status: "forward",
    source: `${INV} — Hermes (OTA model updates is one of twelve scaffold domains)`,
    usedIn: ["/platform/hermes"],
  },

  // ── Economic Exposure, evidence, continuous assurance.
  {
    id: "ee.designed",
    text: "Economic Exposure connects observed effects to business processes and prices causal loss scenarios as ranges: 100,000 seeded Monte Carlo draws, P10/P50/P90, a Validity Card and a signed Financial Exposure Receipt",
    status: "verified",
    source: `${INV} — Economic Exposure`,
    usedIn: ["/platform/economic-exposure"],
    note: "Feeds are fixtures until keys and a licence review; no calibration, back-testing, news layer, PDF report or schedule yet. Every figure on the page is a labelled synthetic example.",
  },
  {
    id: "evidence.receipt-hashed",
    text: "Assurance Receipts are DSSE-signed, verifiable offline and downloadable",
    status: "verified",
    source: `${INV} — closure and receipts; dashboard (receipt download, bytes checked against hash)`,
    usedIn: ["/platform/evidence", "/platform/spine"],
  },
  {
    id: "evidence.engine-packs-signed",
    text: "Athena engine evidence packs are Ed25519-signed with Merkle inclusion proofs, verifiable offline by a standalone tool; Achilles packs are HMAC-anchored",
    status: "verified",
    source: `${INV} — Athena engine, the record; Achilles roles, campaigns and effects`,
    usedIn: ["/platform/evidence", "/trust", "/glossary"],
    note: "Corrected: the earlier register credited signing to Achilles packs.",
  },
  {
    id: "evidence.incident-pack",
    text: "Incident Evidence Packs",
    status: "rejected",
    source: "Superseded",
    note: "Not in the inventory.",
  },
  {
    id: "ca.staleness-and-recalc",
    text: "a run goes stale when a route, fingerprint, claim, finding, parameter, feed or engine release moves; decisions recompose when evidence moves",
    status: "verified",
    source: `${INV} — Economic Exposure (continuous assurance); SPINE change handling`,
    usedIn: ["/platform/continuous-assurance"],
  },
  {
    id: "ca.drift-triggers",
    text: "AI bill of materials drift, fingerprint changes and changes to an approved workflow's contract trigger revalidation",
    status: "verified",
    source: `${INV} — graph views; identity and signed evidence intake`,
    usedIn: ["/platform/continuous-assurance"],
    note: "No live runtime monitoring: monitor coverage is planned and the request gateway ships monitor-only.",
  },

  // ── Homepage.
  {
    id: "home.ee-informs",
    text: "evidence informs priced loss ranges, remediation economics and business response",
    status: "verified",
    source: `${INV} — Economic Exposure; claims ledger`,
    usedIn: ["/ (H08)"],
  },
  {
    id: "home.five-teams",
    text: "red, blue, purple and evaluator as separate credentials, working inside authorized test scopes",
    status: "verified",
    source: `${INV} — roles, campaigns and effects; ${RULING}`,
    usedIn: ["/ (H07)", "/platform/spine"],
    note: "Green and white teams were cut: they are not in the inventory. The evaluator uses the white-team figure until it has its own art.",
  },
  {
    id: "home.targeted-revalidation",
    text: "SPINE makes a change visible and names the minimal re-run for the claims it affects",
    status: "verified",
    source: `${INV} — change, coverage and authority`,
    usedIn: ["/ (H06 demo)"],
  },

  // ── Commercial and owner decisions.
  {
    id: "solutions.offer-names",
    text: "solution pages name their starting point as one of the three engagement offers",
    status: "verified",
    source: `${INV} — the three engagement offers; ${RULING}`,
    usedIn: ["/solutions/*"],
    note: "Assessment, release assurance and runtime enforcement, kept distinct.",
  },
  {
    id: "solutions.framework-references",
    text: "solution pages list only the inventory's compliance map (NIST SP 800-53, OWASP 2021, OWASP LLM 2025, DoD Zero Trust) and its vertical packs",
    status: "verified",
    source: `${INV} — connectors and compliance; ${RULING}`,
    usedIn: ["/solutions/*"],
    note: "Sector frameworks outside the map (Treasury, NYDFS, AI RMF, ISO 42001, OMB, NIST AI 100-2) were cut from solution pages. /standards still names them as referenced only.",
  },
  {
    id: "pricing.offer-structure",
    text: "assessment and tier names; the System Under Assurance definition",
    status: "unverified",
    source: "Pricing Strategy: Public vs Consultation (internal, 16 Oct 2026)",
    usedIn: ["/pricing"],
    note: "Release blocker until the price book is signed (D03). The framing above them is the inventory's three offers (pricing.three-offers).",
  },
  {
    id: "pricing.three-offers",
    text: "three engagement offers, kept distinct: assessment, release assurance and runtime enforcement",
    status: "verified",
    source: `${INV} — the three engagement offers; ${RULING}`,
    usedIn: ["/pricing", "/solutions/*"],
  },
  {
    id: "pricing.planned-deployments",
    text: "private cloud and air-gapped deployment, and exploratory physical AI scope, listed as planned",
    status: "approved",
    source: RULING,
    usedIn: ["/pricing"],
    note: "Not in the inventory. Kept on the owner's ruling as public roadmap items; always worded as planned, never available.",
  },
  {
    id: "usecases.effective-access-declared",
    text: "effective access is computed from the configuration supplied; Mythos does not test identity providers or end-user entitlements",
    status: "verified",
    source: `${INV} — graph views; hard do-not-claim lines`,
    usedIn: ["/use-cases/*", "/outputs"],
  },
  {
    id: "article.protections-in-progress",
    text: "protection capabilities being added: action-bound permits; credential brokers; data, recipient and visible-exit controls; document and download intake; whole-agent containment; workflow and record authorization; cumulative work and spending budgets; connector admission and change control; verified-agent access lanes; persistent-memory and multi-agent provenance; verified revocation; continuous authorized adversarial validation",
    status: "approved",
    source: "Owner ruling, 27 Oct 2026 (work in progress now)",
    usedIn: ["/resources/how-to-red-team-ai-agents"],
    note: "Beyond the 26 Oct inventory's planned list. Forward wording only: in progress, not available or validated today; availability depends on the integration.",
  },
  {
    id: "company.author-named",
    text: "David Smith, Co-founder and Principal Software Engineer, named as article author and on the Company page",
    status: "approved",
    source: "Owner ruling, 27 Oct 2026",
    usedIn: ["/company", "/resources/how-to-red-team-ai-agents"],
    note: "Only the name, title and focus the owner supplied. No other founders, biographies or credentials.",
  },
  {
    id: "usecases.quantum-horizon",
    text: "use case 12 (quantum-adjacent AI R&D)",
    status: "rejected",
    source: `Launch Guide UC12; ${RULING}`,
    note: "Held from launch: nothing in the inventory mentions quantum work. Source kept in content/useCaseLibrary.ts (HELD).",
  },
  {
    id: "trust.controls-in-place",
    text: "scope, consent and authority checked at a single scan gate; safe HTTP with an egress allowlist and pinned DNS; a three-tier signed operator failsafe with a two-person rule; evidence redacted to content hashes",
    status: "verified",
    source: `${INV} — governance gate; Mythos-Core; operator failsafe; safety rules`,
    usedIn: ["/trust", "/platform (Mythos Core)"],
    note: "Internal build records only; no external audit and no certification (no FedRAMP or CMMC).",
  },
  {
    id: "company.no-people-published",
    text: "no founder names, biographies, dates, location, legal entity or veteran status are published",
    status: "verified",
    source: "16 Oct company fact-check; decision D08 open",
    usedIn: ["/company", "/investors", "/careers"],
    note: "Add people only with their approval. Never claim SDVOSB/VOSB.",
  },
];

export function getClaim(id: string): Claim {
  const claim = CLAIMS.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}

/** Claims that still block a merge to main. */
export const UNVERIFIED_CLAIMS = CLAIMS.filter((c) => c.status === "unverified");
