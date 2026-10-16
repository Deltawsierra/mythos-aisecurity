/**
 * Pricing page content (Launch Guide §13), structured by the internal Pricing
 * Strategy (Public vs Consultation, 16 Oct 2026): Assess → Assure → Expand,
 * priced by Systems Under Assurance.
 *
 * - No price is shown until the price book is signed (decision D03). Each
 *   offer has a `price` field; while it is null the page says "Quoted after
 *   scoping". Publishing a signed "from" price is a one-line change here —
 *   plus retiring the `pricing.offer-structure` claim.
 * - Offer and tier names, the System Under Assurance definition and the
 *   design-partner line are proposals pending commercial sign-off
 *   (claim `pricing.offer-structure`).
 * - The strategy's tier inclusions describe the completed platform. Here each
 *   capability is split into "available today" and "planned", matching the
 *   product pages (Action Gate not built; Policy-as-Code in development;
 *   Economic Exposure specified; Validity Cards planned; no live monitoring).
 * - Private items stay off the page: specialist catalog, additional-system
 *   rates, retest percentages, design-partner terms and credits.
 */

export type PriceDisplay = string | null;

export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: "Assurance That Scales With *Your AI Estate.*",
  lede: "Start with one defined system or workflow. Expand assurance as models, tools, permissions and business consequence grow. Every engagement begins with a scoped review and a clear evidence plan.",
};

export const MOTIONS = [
  { id: "assess", name: "Assess", lede: "One decision about one defined AI system.", body: "A fixed or capped scope: findings, evidence, remediation guidance and an agreed retest.", next: "Move to annual assurance if the system keeps changing." },
  { id: "assure", name: "Assure", lede: "Evidence that stays current.", body: "Annual assurance of agreed Systems Under Assurance — named systems, depth, cadence and business criticality.", next: "Add systems, integrations and assurance depth." },
  { id: "expand", name: "Expand", lede: "From systems to a portfolio.", body: "More systems and business units, deeper campaigns and constrained deployments, under one assurance program.", next: "Enterprise Portfolio or Mission scope." },
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
    name: "Agent Safety",
    fit: "Tool-using agents and workflows that take actions.",
    outputs: "Permission boundaries, tool-misuse tests, how your approval controls hold up, and evidence.",
    price: null,
    cta: "Scope an Agent Assessment",
  },
  {
    name: "Deployment Assurance",
    fit: "A pilot or production go / no-go decision.",
    outputs: "Discovery, authority mapping, adversarial tests, evidence, remediation and a decision recommendation.",
    price: null,
    cta: "Plan a Deployment Review",
  },
];

/** Assessments quoted only after a consultation. */
export const CONSULT_ASSESSMENTS = [
  { name: "High-Risk / Regulated Assessment", body: "Banking, insurance, healthcare and other high-consequence systems: expanded controls, evidence depth and reporting." },
  { name: "Incident Evidence", body: "After an AI-related incident: preserve evidence, reconstruct what happened, verify the fix. Replay tooling is planned; scope follows triage." },
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
    available: ["Mapping of data, tools and access", "Scheduled Achilles testing", "Claims and hashed receipts", "Evidence, remediation and retest"],
    planned: ["Economic Exposure bands"],
    price: null,
  },
  {
    name: "Growth",
    scope: "2–4 systems",
    fit: "Several connected systems or agents, with enough context to prioritize remediation.",
    available: ["Broader Achilles campaigns", "Vendor and provider profiles (declared vs verified)", "Reassessment when agreed changes happen", "Executive summaries"],
    planned: ["Release comparison and gating", "Exposure ranges and remediation economics", "Cross-channel tool-chain testing"],
    price: null,
  },
  {
    name: "Enterprise",
    scope: "5–10 systems",
    fit: "Complex or regulated AI estates that need formal deployment decisions at scale.",
    available: ["Full mapping, testing and claims across systems", "Deployment decision support", "Findings mapped to NIST SP 800-53, OWASP and DoD Zero Trust"],
    planned: ["Runtime Action Gate", "Policy-as-Code (in development)", "Full Economic Exposure", "Validity Cards"],
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
  items: ["Additional AI systems", "Additional business units", "Vendor assurance packets (in development)", "Advanced Achilles campaigns", "Deeper regulated evidence", "Additional retest campaigns", "Incident assurance sprints"],
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
  { q: "Is Economic Exposure included?", a: "Today, business impact is described qualitatively. Economic Exposure is designed to add modeled financial ranges, at increasing depth by tier; it is specified, not yet producing scores." },
  { q: "Does an assessment include a retest?", a: "Many substantive assessments are planned with one remediation retest. The included retest scope and timing are stated in your statement of work." },
  { q: "Do you certify AI as safe?", a: "No. Mythos provides evidence, testing, findings and decision support within an agreed scope. It does not guarantee safety or issue an independent regulatory certification." },
  { q: "What about private networks or physical AI?", a: "Those need a feasibility and authorization discussion first. Private and air-gapped deployment are planned, not available; physical AI work is exploratory and Mythos does not promise vehicle safety certification." },
];
