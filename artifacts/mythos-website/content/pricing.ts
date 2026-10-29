/**
 * Pricing page content, rebuilt 27 Oct 2026 around the one approved starting
 * offer: the AI Workflow Assessment and Repair Retest, from USD 15,000.
 *
 * Sources: Mythos Pricing and Market Validation (27 Oct 2026) and the AI
 * Workflow Assessment Offer Specification v0.2 (27 Oct 2026). The USD 15,000
 * minimum is approved; quotes rise with scope (claim pricing.starting-offer).
 *
 * Held until approved (owner ruling, 27 Oct 2026), so not on this page: the
 * ten-business-day delivery target, the 96 / 36 episode allowances and case
 * counts, the numeric scope limits (services, operations, profiles, routes),
 * the retest request and completion windows, payment milestones, data
 * retention defaults and notification targets. They stay in the statement of
 * work until a delivery rehearsal confirms them.
 *
 * The three engagement offers stay distinct (pricing.three-offers): only the
 * assessment carries a public price; release assurance and runtime
 * enforcement are quoted separately. The Systems Under Assurance tiers were
 * retired with this rebuild: the validation report advises against a
 * recurring fee until ongoing work and repeat demand are defined.
 */

export const PRICING_HERO = {
  eyebrow: "Pricing",
  headline: "Start With *One AI Workflow.*",
  lede: "The AI Workflow Assessment and Repair Retest starts at USD 15,000. Your fixed price is agreed from the scope before any testing begins.",
};

/** The approved starting offer. */
export const STARTING_OFFER = {
  name: "AI Workflow Assessment and Repair Retest",
  price: "USD 15,000",
  priceNote: "Starting price per engagement. A higher fixed quote applies when your scope goes beyond the starting scope.",
  statement:
    "Before an AI workflow goes live, gets more access or takes on more authority, find out what it can reach, which actions it can take and what needs fixing. Mythos assesses one agreed deployment, explains the failures the evidence supports, sets out what a repair must achieve, and retests the agreed fixes, so your release owner decides with better evidence.",
  scope: [
    "One named workflow: one business purpose, with its branches listed",
    "One frozen configuration and one primary model route",
    "One authorized test environment, outside live production",
    "The connected services, tool operations and test profiles named in writing",
    "One repair retest of the agreed fixes, with its scope and timing set in your statement of work",
  ],
  outputs: [
    { name: "Scope and boundary map", body: "What the workflow can reach: its data sources, tools, declared access and consequential paths." },
    { name: "Test and coverage record", body: "What was planned, attempted and completed, and what could not be measured." },
    { name: "Findings and repair requirements", body: "Every supported finding, in priority order, with what a fix must achieve and a review session with your owners." },
    { name: "Evidence index", body: "The records behind each finding, with integrity hashes, and signed receipts where the platform path produces them." },
    { name: "Executive decision brief", body: "Restrictions, open findings, remaining uncertainty and a scoped recommendation. Your release owner decides." },
    { name: "Retest addendum", body: "Results for the agreed fixes once you submit an eligible repair, or a record that the retest was not performed." },
  ],
  fit: "The strongest fit is a workflow with a named owner, a pending deployment or access decision, and a test environment, such as a bank or insurer connecting an assistant or agent to governed records and business tools.",
};

/** What "one workflow" means, with the specification's example. */
export const ONE_WORKFLOW = {
  title: "What *one workflow* means.",
  body: "One business purpose, with a named starting role, approved inputs, allowed operations, prohibited effects and a clear finish. Its branches are listed up front.",
  example: {
    label: "For example (illustrative)",
    is: "Summarize an approved vendor document and prepare a payment recommendation for a person to review.",
    excluded: "Changing a beneficiary, exporting unrelated records and submitting the payment are explicitly out of bounds.",
    separate: "A second task that actually submits payments is a different authority boundary, so it needs its own scope.",
  },
  not: ["A whole customer-service platform", "Every department that uses a model", "All agents in a tenant"],
};

/** Scope drivers from the specification's client scope and pricing policy. */
export const QUOTE_FACTORS = [
  { name: "Workflows and software", body: "Distinct business purposes and branches, application boundaries, supported interfaces and technical complexity." },
  { name: "AI applications and agents", body: "Distinct configurations, identities, permissions, memory and delegated tasks. Identical copies do not each add a full fee." },
  { name: "Models and environments", body: "Additional model providers, routes, staging environments, regions or tenants that need their own evidence." },
  { name: "Systems, data and tools", body: "Connected services, operations, retrieval collections, sensitive data, approval paths and consequential actions." },
  { name: "Evidence and integration", body: "Which logs and records already show what happened, where observation gaps exist and whether custom instrumentation is needed." },
  { name: "Depth and delivery", body: "Case combinations, chains between agents, additional repair groups, reporting needs, access constraints and scheduling." },
];

export const QUOTE_RULES = [
  "Every quote names the scope drivers, included assets, observation limits, retest allowance, schedule and assumptions.",
  "Shared setup is counted once. A raw count of agents or systems is not a price formula.",
  "No surprise overages: anything added needs a written change order for the work, fee and timing.",
  "A higher quote does not remove technical limits. Missing evidence still needs a plan or a stated exclusion.",
];

/** The three engagement offers (Master Inventory), kept distinct. Only the first has a public price. */
export const MOTIONS = [
  { id: "assessment", name: "Assessment", lede: "Tests and reports.", body: "The AI Workflow Assessment and Repair Retest: one workflow, one decision, with evidence and a retest of the agreed fixes.", price: "From USD 15,000" },
  { id: "release", name: "Release Assurance", lede: "A recommendation bound to an exact deployment.", body: "The deployment decision tied to the fingerprint, policy and environment it was made on, reopened when agreed changes happen.", price: "Quoted separately" },
  { id: "runtime", name: "Runtime Enforcement", lede: "Mediates supported paths.", body: "The Action Gate: policy as code, deny by default, permitting only the exact action approved, on supported paths.", price: "Quoted separately" },
] as const;

/** Additional work, each scoped and quoted on its own (specification change control). */
export const ADDITIONAL_WORK = [
  "Another model or route",
  "Custom telemetry or a connector",
  "Broader web and API security testing",
  "Further repair rounds or groups",
  "Economic Exposure analysis",
  "Recurring assurance",
];

/** Outside the base engagement. */
export const NOT_INCLUDED = [
  "Production protection or live blocking",
  "Round-the-clock monitoring",
  "Incident containment",
  "Identity-provider audit or every employee's permissions",
  "Implementing the repairs",
  "Legal opinions or insurance decisions",
  "Certification of any kind",
];

export const PRICING_FAQ = [
  {
    q: "What does USD 15,000 cover?",
    a: "The starting scope: one named workflow in one authorized test environment, with one frozen configuration and model route, the outputs listed on this page, and one repair retest of the agreed fixes. A larger scope gets a higher fixed quote, agreed before testing.",
  },
  {
    q: "Is the retest included?",
    a: "Yes, one repair retest of the agreed fixes is included for the starting scope. Its scope and timing are set in your statement of work. Every finding stays in the report, and any finding not retested stays open. Further repair rounds are quoted separately.",
  },
  {
    q: "Are there overages?",
    a: "No automatic overages. Anything added after the quote needs a written change order covering the work, the fee and the timing.",
  },
  {
    q: "Is there a subscription?",
    a: "No. The assessment is a single engagement. Release assurance, runtime enforcement and recurring work are separate, scoped offers.",
  },
  {
    q: "What if only the AI's replies can be observed?",
    a: "Then we say so and scope the work as a behavior assessment. Actions are reported as verified only when a record outside the AI shows what actually happened.",
  },
  {
    q: "Is Economic Exposure included?",
    a: "No. Economic Exposure has its own objectives and inputs and is scoped separately. It is decision support only: its feeds are fixtures until keys and a licence review, and it is not yet calibrated.",
  },
  {
    q: "Do you certify AI as safe?",
    a: "No. Mythos provides evidence, testing, findings and decision support within an agreed scope. It does not guarantee safety, guarantee a favorable finding, or issue a regulatory certification.",
  },
  {
    q: "What about private networks or physical AI?",
    a: "Those need a feasibility and authorization discussion first. Private and air-gapped deployment are planned, not available. Physical AI work is exploratory, is not part of this offer, and Mythos does not promise vehicle safety certification.",
  },
];
