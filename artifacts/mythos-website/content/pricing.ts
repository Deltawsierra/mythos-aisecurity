/**
 * Pricing page content (Launch Guide §13). Framed by the Master Inventory's
 * three engagement offers, kept distinct (owner ruling, 26 Oct 2026):
 * Assessment, Release Assurance and Runtime Enforcement. Assessments and the
 * annual Systems Under Assurance tiers come from the internal Pricing
 * Strategy (Public vs Consultation, 16 Oct 2026).
 *
 * - No price is shown until the price book is signed (decision D03). Each
 *   offer has a `price` field; while it is null the page says "Quoted after
 *   scoping". Publishing a signed "from" price is a one-line change here —
 *   plus retiring the `pricing.offer-structure` claim.
 * - Assessment and tier names, the System Under Assurance definition and the
 *   design-partner line are proposals pending the price book
 *   (claim `pricing.offer-structure`). The three offers are `pricing.three-offers`.
 * - The strategy's tier inclusions describe the completed platform. Here each
 *   capability is split into "available today" and "planned", matching the
 *   26 Oct Master Inventory (Action Gate is runtime enforcement, a separate
 *   offer; Economic Exposure runs on fixture feeds, uncalibrated; monitor
 *   coverage, signed Achilles results and an identity collector are planned).
 * - Private items stay off the page: specialist catalog, additional-system
 *   rates, retest percentages, design-partner terms and credits.
 */

export type PriceDisplay = string | null;

export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: "Assurance That Scales With *Your AI Estate.*",
  lede: "Start with one defined system or workflow. Expand assurance as models, tools, permissions and business consequence grow. Every engagement begins with a scoped review and a clear evidence plan.",
};

/** The three engagement offers (Master Inventory), kept distinct in every description. */
export const MOTIONS = [
  { id: "assessment", name: "Assessment", lede: "Tests and reports.", body: "One defined system, one decision: findings, evidence, what was not measured, remediation guidance and an agreed retest.", next: "Move to release assurance when a deployment decision is due." },
  { id: "release", name: "Release Assurance", lede: "A recommendation bound to an exact deployment.", body: "The deployment decision tied to the fingerprint, policy and environment it was made on — and kept current for agreed Systems Under Assurance as they change.", next: "Add systems as your estate grows." },
  { id: "runtime", name: "Runtime Enforcement", lede: "Mediates supported paths.", body: "The Action Gate: policy as code, deny by default, permitting only the exact action approved, on supported paths. Scoped separately from testing.", next: "Supported paths are confirmed during scoping." },
] as const;

export const SUA = {
  title: "What is a *System Under Assurance?*",
  body: "A customer-approved AI deployment — or a bounded group of workflows — with a named business owner, an authorized scope, identifiable model routes, connected data, tools and identities, and an agreed policy for when it is retested.",
  points: [
    "One agent with many connected tools can be one system — tool calls are not billed one by one.",
    "Two independently governed applications usually count as two, even on the same model provider.",
    "Development, staging and production are usually environments of one system, not three.",
  ],
  note: "The exact counting rules are agreed in your proposal.",
};

export interface AssessmentOffer {
  name: string;
  fit: string;
  outputs: string;
  price: PriceDisplay;
  cta: string;
}

/** The four flagship assessments the strategy proposes to show publicly. */
export const ASSESSMENTS: AssessmentOffer[] = [
  {
    name: "AI Readiness",
    fit: "A first AI initiative, or discovery before launch or expansion.",
    outputs: "An inventory of risks and unknowns, the key control gaps and a next-step plan.",
    price: null,
    cta: "Request Readiness Scope",
  },
  {
    name: "AI Data Exposure",
    fit: "Sensitive information, retrieval and access-boundary concerns.",
    outputs: "Data routes, effective access from the configuration you supply, exposure paths, findings and evidence.",
    price: null,
    cta: "Discuss Data Exposure",
  },
  {
    name: "Agent Authority",
    fit: "Tool-using agents and workflows that take actions.",
    outputs: "Permission boundaries, tool-misuse tests, how your approval controls hold up, and evidence.",
    price: null,
    cta: "Scope an Agent Assessment",
  },
  {
    name: "Go / No-Go Review",
    fit: "A pilot or production go / no-go decision.",
    outputs: "Discovery, authority mapping, adversarial tests, evidence, remediation and a decision recommendation.",
    price: null,
    cta: "Plan a Deployment Review",
  },
];

/** Assessments quoted only after a consultation. */
export const CONSULT_ASSESSMENTS = [
  { name: "High-Risk / Regulated Assessment", body: "Banking, insurance, healthcare and other high-consequence systems: expanded controls, evidence depth and reporting." },
  { name: "Incident Evidence", body: "After an AI-related incident: preserve evidence, reconstruct what happened, verify the fix. Engine records are hash-chained and signed; scope follows triage." },
];

export interface Tier {
  name: string;
  scope: string;
  fit: string;
  available: string[];
  planned: string[];
  price: PriceDisplay;
}

/** Annual Systems Under Assurance tiers, split into today and planned. */
export const TIERS: Tier[] = [
  {
    name: "Launch",
    scope: "1 primary system",
    fit: "One critical production system kept under evidence-backed assurance — not a scan subscription.",
    available: ["Mapping of data, tools and access", "Scheduled Achilles testing", "Claims and signed receipts", "Evidence, remediation and retest"],
    planned: ["Exposure ranges on live feeds"],
    price: null,
  },
  {
    name: "Growth",
    scope: "2–4 systems",
    fit: "Several connected systems or agents, with enough context to prioritize remediation.",
    available: ["Broader Achilles campaigns and cross-channel chains", "Vendor and provider profiles (declared vs verified)", "Reassessment and release canary comparison", "Executive summaries"],
    planned: ["Exposure ranges on live feeds", "Monitor coverage disclosure", "New agent-attack carriers (image, OCR, renderer)"],
    price: null,
  },
  {
    name: "Enterprise",
    scope: "5–10 systems",
    fit: "Complex or regulated AI estates that need formal deployment decisions at scale.",
    available: ["Full mapping, testing and claims across systems", "Deployment decision support", "Findings mapped to NIST SP 800-53, OWASP, OWASP LLM and DoD Zero Trust"],
    planned: ["Runtime monitor coverage", "Customer-run identity collector", "Economic Exposure on live feeds", "Signed Achilles scan results"],
    price: null,
  },
  {
    name: "Enterprise Portfolio",
    scope: "10–25+ systems",
    fit: "Shared dependencies and cumulative exposure across business units — not just more volume.",
    available: ["The Enterprise method across business units and environments"],
    planned: ["Portfolio assurance graphs", "Cross-system exposure correlation", "Central dashboards"],
    price: null,
  },
  {
    name: "Mission / High Assurance",
    scope: "Custom",
    fit: "Highly constrained, critical or physical AI environments — feasibility first, explicit delivery boundaries.",
    available: ["Custom authorized scope and evidence requirements"],
    planned: ["Private cloud deployment", "Air-gapped deployment", "Physical AI scope (exploratory)"],
    price: null,
  },
];

export const EXPAND = {
  title: "Expand as *your estate grows.*",
  lede: "Coverage can be added after a scope review. Rates are set in your proposal.",
  items: ["Additional AI systems", "Additional business units", "Vendor claim review (declared vs verified)", "Advanced Achilles campaigns", "Deeper regulated evidence", "Additional retest campaigns", "Incident assurance sprints"],
  partners: "Design-partner opportunities for qualified enterprises — discuss scope with Mythos.",
};

export const QUOTE_FACTORS = [
  { name: "Systems and complexity", body: "How many AI systems, and how complex each one is." },
  { name: "Workflows, identities and tools", body: "Connected workflows, the identities they run as and the tools they can use." },
  { name: "Data and criticality", body: "What the AI can reach, how sensitive it is and what a failure would cost." },
  { name: "Testing and evidence depth", body: "How deep testing goes and what your reviewers need to see." },
  { name: "Deployment environment", body: "Where the system runs and what constraints apply to testing it." },
  { name: "Cadence and service", body: "How often changes are reassessed, the integrations involved and service commitments." },
];

export const INCLUDED: { name: string; assess: boolean; assure: boolean }[] = [
  { name: "Written scope and authorization", assess: true, assure: true },
  { name: "System and access mapping", assess: true, assure: true },
  { name: "Behavior and permission testing", assess: true, assure: true },
  { name: "Evidence pack and receipts", assess: true, assure: true },
  { name: "Remediation guidance", assess: true, assure: true },
  { name: "Retest (scope stated in your statement of work)", assess: true, assure: true },
  { name: "Evidence kept current after agreed changes", assess: false, assure: true },
  { name: "Scheduled testing through the year", assess: false, assure: true },
];

export const PRICING_FAQ = [
  { q: "Why aren’t prices listed?", a: "Because every engagement is scoped first. You get a quote after a scoping conversation, based on the factors on this page." },
  { q: "Can we start without an annual commitment?", a: "Yes. A scoped assessment can address one defined system or decision before you choose whether to move into recurring assurance." },
  { q: "What are we paying for?", a: "Coverage of important AI systems, depth of adversarial testing, evidence and remediation quality, revalidation cadence, and the business consequence of failure — not arbitrary scan counts." },
  { q: "How is recurring assurance different?", a: "An assessment answers a defined question at a point in time. Annual assurance revisits the evidence as systems, permissions, models, tools and vendors change — reassessing on the changes you share and on scheduled scans. There is no live monitoring." },
  { q: "Is Economic Exposure included?", a: "Economic Exposure prices a validated failure as a range with its sources, at increasing depth by tier — decision support only. Its feeds are fixtures until keys and a licence review, and it is not yet calibrated." },
  { q: "Does an assessment include a retest?", a: "Many substantive assessments are planned with one remediation retest. The included retest scope and timing are stated in your statement of work." },
  { q: "Do you certify AI as safe?", a: "No. Mythos provides evidence, testing, findings and decision support within an agreed scope. It does not guarantee safety or issue an independent regulatory certification." },
  { q: "What about private networks or physical AI?", a: "Those need a feasibility and authorization discussion first. Private and air-gapped deployment are planned, not available; physical AI work is exploratory and Mythos does not promise vehicle safety certification." },
];
