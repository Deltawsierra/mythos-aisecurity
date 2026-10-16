/**
 * SPINE Economic Exposure page copy (Launch Guide R08), checked against the
 * Economic Exposure Master Specification (7 Oct 2026). EE is specified, not
 * built: the page says "is designed to" throughout and every figure is a
 * labelled synthetic fixture (the spec's own worked examples and the guide's
 * $12M–$48M plate are not reused). Vocabulary mirrors the spec: loss events,
 * loss families, expected annual exposure, P10/P50/P90, current vs residual,
 * confidence grades A–D, source types, Financial Exposure Receipt. Never:
 * exact loss, guaranteed ROI, materiality decisions, live finance feeds.
 */
import type { ChainScenario } from "@/components/platform/ExposureChain";
import type { BandSet } from "@/components/platform/ExposureBands";
import type { Factor, SensitivityResult } from "@/components/platform/SensitivityGrid";
import type { RecordRow } from "@/components/platform/RecordCard";

export const EE_COPY = {
  hero: {
    eyebrow: "SPINE · Economic Exposure",
    headline: "Evidence-Backed Economic Exposure. *Better Business Decisions.*",
    lede: "SPINE Economic Exposure is designed to connect observed AI behavior and validated technical findings to scenario-based business exposure — with the assumptions, model uncertainty, mitigation cost and remaining risk in view before anyone decides what to do next.",
    scope: "In design: specified, not yet in production. Every figure on this page is a synthetic example.",
  },
  chain: {
    eyebrow: "From evidence to consequence",
    title: "A verified effect, *followed to the business.*",
    lede: "Exposure starts from something Mythos actually observed — never from a severity score with a dollar sign attached. Each step names where it comes from. A scenario, not a forecast: Mythos never knows the actual loss.",
  },
  inputs: {
    eyebrow: "Inputs, sources and validity",
    title: "Every number *shows its sources.*",
    lede: "Each input is designed to carry its source type and a confidence grade, so a reader can see how much of a range rests on customer data, on observation, or on estimate.",
  },
  bands: {
    eyebrow: "Modeled exposure ranges",
    title: "Ranges, *never a single number.*",
    lede: "Loss for a single event and loss over a year are kept apart, and each is shown as a range. Switch between them; the table carries the same values.",
  },
  remediation: {
    eyebrow: "Remediation economics",
    title: "What a fix *could remove.*",
    lede: "Current and residual expected annual exposure, the investment a fix needs, and what it keeps working for legitimate users — as decision support, not a promised return.",
  },
  sensitivity: {
    eyebrow: "Sensitivity and limits",
    title: "See what the range *rests on.*",
    lede: "Move an assumption and watch the range respond. Sensitivity is shown apart from probability and from the confidence in the evidence — three different things.",
  },
  receipt: {
    eyebrow: "Financial validity and receipt",
    title: "A record a reviewer *can take apart.*",
    lede: "Each result is designed to leave a Financial Exposure Receipt and a Financial Validity Card: what went in, which model produced it, how much was estimated, and who approved it. A reviewer must approve before anything leaves the building.",
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
      { name: "Loss pathway", value: "Fraud loss through unauthorized refunds, plus operational recovery cost.", source: "Loss family and loss components from the scenario model" },
      { name: "Exposure drivers", value: "How often it’s attempted, how many refunds pass, and their size.", source: "Mythos-observed rate · customer-provided volume · expert estimate" },
      { name: "Possible response", value: "Bind approvals to amount and destination, then retest.", source: "Remediation scenario · residual exposure modeled" },
    ],
  },
  {
    id: "data",
    label: "Customer data exposure",
    steps: [
      { name: "Verified effect", value: "Retrieval surfaced another tenant’s documents.", source: "Athena differential evidence · Confirmed" },
      { name: "Loss pathway", value: "Notification, response and customer-remediation costs after an exposure.", source: "Loss family and loss components from the scenario model" },
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
] as const;

export const EE_DICTIONARY = [
  { term: "Valuation date", meaning: "The date the result was true of." },
  { term: "Horizon", meaning: "Annualized, with single-event loss kept separate." },
  { term: "Reporting currency", meaning: "The currency results are shown in; native amounts are never overwritten." },
  { term: "Model version", meaning: "The model build that produced the result, so it can be reproduced." },
  { term: "Reviewer", meaning: "The named person who approved the result for use." },
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
    { metric: "Utility retained", values: ["100%", "98%", "81%"] },
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
  { field: "Reporting currency", value: "USD · native amounts retained" },
  { field: "Confidence", value: "B — Supported", tone: "verified" },
  { field: "Model build", value: "ee-model 0.3 (illustrative)" },
  { field: "Source snapshots", value: "4 inputs · hashed at generation" },
  { field: "Scenario hash", value: "sha256:9c41…e07a" },
  { field: "Approval", value: "Pending — reviewer required before external use", tone: "stale" },
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
  { field: "Last calibrated", value: "Not yet — synthetic" },
  { field: "Reproduction", value: "seed 4417 · result hash recorded" },
];

export const EE_FAQ = [
  {
    q: "Does Mythos know what we would actually lose?",
    a: "No. Economic Exposure is designed to model ranges under stated assumptions. It never predicts an exact loss, and it keeps single-event loss and annual exposure apart.",
  },
  {
    q: "Is this a guaranteed return on a fix?",
    a: "No. Remediation economics compare current and residual exposure against the investment a fix needs. They are decision support — not a promised return.",
  },
  {
    q: "Does it decide whether something is material?",
    a: "No. It is designed to support management and counsel with evidence. Materiality, disclosure and every business decision stay with you.",
  },
  {
    q: "Where do the inputs come from?",
    a: "From your data, from what Mythos observed, from public sources and benchmarks, and from named expert estimates — each labelled, graded and shown. It does not run on live market feeds.",
  },
  {
    q: "Can we trust a range that rests on estimates?",
    a: "Only as far as its confidence grade says. Each result is designed to show how much is customer-specific, benchmark-derived or estimated, and which variables move it most.",
  },
] as const;
