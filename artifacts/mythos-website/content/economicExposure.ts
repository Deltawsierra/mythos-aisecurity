/**
 * SPINE Economic Exposure page copy (Launch Guide R08), checked against the
 * Master Inventory (26 Oct 2026). The mechanism is described in the present
 * tense: 100,000 seeded Monte Carlo draws, P10/P50/P90, 15 loss families, a
 * Validity Card and a signed Financial Exposure Receipt, separation of
 * duties. Stated limits: feeds are fixtures until keys and a licence review;
 * no calibration or back-testing yet; the portfolio is not signed; harm to a
 * person is never priced; decision support only. Every figure is a labelled
 * synthetic fixture. Never: exact loss, guaranteed ROI, materiality decisions.
 */
import type { ChainScenario } from "@/components/platform/ExposureChain";
import type { BandSet } from "@/components/platform/ExposureBands";
import type { Factor, SensitivityResult } from "@/components/platform/SensitivityGrid";
import type { RecordRow } from "@/components/platform/RecordCard";

export const EE_COPY = {
  hero: {
    eyebrow: "SPINE · Economic Exposure",
    headline: "Evidence-Backed Economic Exposure. *Better Business Decisions.*",
    lede: "AI risk quantification you can take apart: SPINE Economic Exposure connects observed AI behavior and validated technical findings to the business processes they touch, and prices the loss as a range with its sources — assumptions, uncertainty, mitigation cost and remaining risk in view before anyone decides.",
    scope: "Decision support only. External feeds are fixtures until keys and a licence review, with no calibration or back-testing yet. Every figure here is a synthetic example.",
  },
  chain: {
    eyebrow: "From evidence to consequence",
    title: "A verified effect, *followed to the business.*",
    lede: "Exposure starts from something Mythos actually observed — never from a severity score with a dollar sign attached. Findings that enable the same loss cluster into one scenario, so nothing is counted twice. A scenario, not a forecast.",
  },
  inputs: {
    eyebrow: "Inputs, sources and validity",
    title: "Every number *shows its sources.*",
    lede: "Thirty customer variables in nine domains each carry a source type, and every result a grade from A to D or Unknown — so a reader can see how much rests on customer data, observation or estimate.",
  },
  bands: {
    eyebrow: "Modeled exposure ranges",
    title: "Ranges, *never a single number.*",
    lede: "100,000 seeded Monte Carlo draws give P10, P50, P90, the mean and a severe-but-plausible tail. Single-event and annual loss are kept apart; switch between them.",
  },
  remediation: {
    eyebrow: "Remediation economics",
    title: "What a fix *could remove.*",
    lede: "Current and residual expected annual exposure, the investment a fix needs, its payback and the tail it removes — decision support that never overrides a security veto.",
  },
  sensitivity: {
    eyebrow: "Sensitivity and limits",
    title: "See what the range *rests on.*",
    lede: "Move an assumption and watch the range respond. Sensitivity is shown apart from probability and from the confidence in the evidence — three different things.",
  },
  receipt: {
    eyebrow: "Financial validity and receipt",
    title: "A record a reviewer *can take apart.*",
    lede: "Each result leaves a signed Financial Exposure Receipt and a Validity Card: model version, sources, assumptions, unknowns, grade and valuation date. A non-author reviews it before it issues; an author never reviews their own scenario.",
  },
  board: {
    eyebrow: "For the board and CFO",
    title: "The questions *a board will ask.*",
  },
} as const;

export const EE_SCENARIOS: ChainScenario[] = [
  {
    id: "refunds",
    label: "Refunds beyond approval",
    steps: [
      { name: "Verified effect", value: "An agent issued refunds above its approval limit.", source: "Achilles effect ledger · Verified, reproduced twice" },
      { name: "Loss pathway", value: "Fraud loss through unauthorized refunds, plus operational recovery cost.", source: "One of 15 loss families, with its loss components" },
      { name: "Exposure drivers", value: "How often it’s attempted, how many refunds pass, and their size.", source: "Mythos-observed rate · customer-provided volume · expert estimate" },
      { name: "Possible response", value: "Bind approvals to amount and destination, then retest.", source: "Remediation scenario · residual exposure modeled" },
    ],
  },
  {
    id: "data",
    label: "Customer data exposure",
    steps: [
      { name: "Verified effect", value: "Retrieval surfaced another tenant’s documents.", source: "Athena differential against a benign control" },
      { name: "Loss pathway", value: "Notification, response and customer-remediation costs after an exposure.", source: "One of 15 loss families, with its loss components" },
      { name: "Exposure drivers", value: "Records reachable, likelihood of discovery, and response cost per record.", source: "Mythos-observed reach · customer-provided records · industry benchmark" },
      { name: "Possible response", value: "Enforce document permissions at retrieval, then retest.", source: "Remediation scenario · residual exposure modeled" },
    ],
  },
];

export const EE_SOURCE_TYPES = [
  { name: "Customer provided", body: "Volumes, values and process facts you supply." },
  { name: "Mythos observed", body: "Behavior and effects seen during testing." },
  { name: "Calculated", body: "Derived from other inputs, with the method recorded." },
  { name: "Official public", body: "Published public statistics." },
  { name: "Industry benchmark", body: "Sector reference figures, used with care." },
  { name: "Expert estimate", body: "Judgement, named and dated." },
  { name: "Unknown", body: "Missing — shown as missing, never filled in quietly." },
] as const;

export const EE_GRADES = [
  { grade: "A", name: "Evidence rich", body: "Mostly customer data and observation." },
  { grade: "B", name: "Supported", body: "Good evidence with some estimation." },
  { grade: "C", name: "Indicative", body: "Leans on benchmarks and estimates." },
  { grade: "D", name: "Exploratory", body: "Mostly assumption; for discussion only." },
  { grade: "—", name: "Unknown", body: "Carries a banner and is excluded from totals." },
] as const;

export const EE_DICTIONARY = [
  { term: "Valuation date", meaning: "The date the result was true of." },
  { term: "Horizon", meaning: "Annualized, with single-event loss kept separate." },
  { term: "Reporting currency", meaning: "ISO 4217, with rate provenance; native amounts are never overwritten." },
  { term: "Model version", meaning: "The model build that produced the result, so it can be reproduced." },
  { term: "Reviewer", meaning: "A named non-author who reviewed the result before it issued." },
  { term: "Override", meaning: "Applies only while in force; a sensitive one needs two other approvers." },
] as const;

/** Synthetic fixture, USD millions. Single event vs annualized. */
export const EE_BANDS: BandSet[] = [
  {
    id: "event",
    label: "Single event",
    bands: [
      { name: "Low", low: 0.1, high: 0.4, note: "Refunds caught within a day; small batch." },
      { name: "Base", low: 0.3, high: 1.2, note: "Typical volume before detection." },
      { name: "High", low: 0.9, high: 3.1, note: "Slow detection and large refunds." },
    ],
  },
  {
    id: "annual",
    label: "Annualized",
    bands: [
      { name: "Low", low: 0.4, high: 1.6, note: "Rare attempts; most stopped by review." },
      { name: "Base", low: 1.2, high: 4.8, note: "Observed attempt rate at current volume." },
      { name: "High", low: 3.5, high: 9.2, note: "Severe but plausible: attempts scale with volume." },
    ],
  },
];

export const EE_OPTIONS = {
  columns: ["Today", "Option A · bind approvals", "Option B · lower refund limit"],
  rows: [
    { metric: "Expected annual exposure", values: ["$3.2M", "$0.9M", "$1.4M"] },
    { metric: "Expected exposure reduction", values: ["—", "$2.3M", "$1.8M"] },
    { metric: "First-year investment", values: ["—", "$0.4M", "$0.1M"] },
    { metric: "Payback", values: ["—", "≈2 months", "<1 month"] },
    { metric: "Confidence grade", values: ["B", "B", "C"] },
  ],
  note: "Option B costs less but refuses many legitimate refunds and rests on more estimation. Neither is a promised return; both are decision support.",
} as const;

export const EE_FACTORS: Factor[] = [
  { id: "frequency", label: "Attempt frequency", levels: ["Low", "Expected", "High"] },
  { id: "severity", label: "Loss per event", levels: ["Low", "Expected", "High"] },
  { id: "control", label: "Control in place", levels: ["Today", "After the fix"] },
];

/** Precomputed synthetic fixture: frequency × severity × control → range (USD millions). */
function buildLookup(): Record<string, SensitivityResult> {
  const f = [0.5, 1, 1.8];
  const s = [0.55, 1, 1.7];
  const c = [1, 0.28];
  const out: Record<string, SensitivityResult> = {};
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 2; k++) {
        const central = Math.round(3.2 * f[i] * s[j] * c[k] * 10) / 10;
        out[`${i}-${j}-${k}`] = {
          central,
          low: Math.round(central * 0.19 * 10) / 10,
          high: Math.min(Math.round(central * 2.3 * 10) / 10, 11.9),
        };
      }
  return out;
}
export const EE_LOOKUP = buildLookup();

export const EE_RECEIPT: RecordRow[] = [
  { field: "Receipt", value: "fer_2026_10_16_0412 (synthetic)" },
  { field: "Scenario", value: "Refunds beyond approval · support agent" },
  { field: "Result", value: "Expected annual exposure $3.2M · range $0.6M–$7.4M (P10–P90)" },
  { field: "Valuation date", value: "16 Oct 2026" },
  { field: "Confidence", value: "B — Supported", tone: "verified" },
  { field: "Review", value: "Non-author reviewer (role) · before issue", tone: "verified" },
  { field: "Signature", value: "Signed · verifies offline (synthetic)" },
  { field: "Simulation", value: "100,000 seeded Monte Carlo draws" },
  { field: "Reporting currency", value: "USD · native amounts retained" },
  { field: "Model version", value: "ee-model 0.3 (illustrative)" },
  { field: "Sources", value: "4 inputs · bound to the exact rows used" },
  { field: "Scenario hash", value: "sha256:9c41…e07a" },
];

export const EE_VALIDITY: RecordRow[] = [
  { field: "Model version", value: "ee-model 0.3 (illustrative)" },
  { field: "System fingerprint", value: "7f3a…c91e" },
  { field: "Customer-specific share", value: "55% of inputs" },
  { field: "Benchmark-derived share", value: "25% of inputs" },
  { field: "Expert-estimated share", value: "20% of inputs" },
  { field: "Most sensitive variables", value: "Attempt frequency; loss per event" },
  { field: "Unknown variables", value: "Detection time after hours" },
  { field: "Data freshness", value: "Volumes as of September" },
  { field: "Feeds", value: "Fixtures until keys and a licence review" },
  { field: "Calibration", value: "Not calibrated or back-tested yet" },
  { field: "Reproduction", value: "seed 4417 · result hash recorded" },
];

export const EE_FAQ = [
  {
    q: "Does Mythos know what we would actually lose?",
    a: "No. Economic Exposure prices ranges under stated assumptions — P10, P50 and P90 from 100,000 seeded draws. It never predicts an exact loss, and it keeps single-event and annual loss apart.",
  },
  {
    q: "Is this a guaranteed return on a fix?",
    a: "No. Remediation economics compare current and residual exposure against the investment a fix needs. They are decision support — not a promised return.",
  },
  {
    q: "Does it decide whether something is material?",
    a: "No. It makes no legal-materiality determination and uses no unverified penalty figure. Materiality, disclosure and every business decision stay with you.",
  },
  {
    q: "Where do the inputs come from?",
    a: "From your data, what Mythos observed, public sources, benchmarks and named expert estimates — each labelled and graded. Public feeds are fixtures until keys and a licence review; breach figures are priors, never multipliers.",
  },
  {
    q: "Can we trust a range that rests on estimates?",
    a: "Only as far as its grade says. Each result shows how much is customer-specific, benchmark-derived or estimated, and which variables move it most. It is not yet calibrated or back-tested.",
  },
  {
    q: "Is every figure signed and priced?",
    a: "Each scenario’s receipt is signed; the portfolio total is not itself signed yet. Harm to a person is never priced. Decision support only.",
  },
] as const;
