export interface EngagementStep {
  title: string;
  body: string;
  /** Label for the step's detail list (e.g. "Customer provides"). */
  listLabel: string;
  items: string[];
}

export const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    title: "Define the AI system",
    body: "Select the AI workflow, assistant, agent, model, copilot, integration, or vehicle/strategic-horizon scenario that needs review.",
    listLabel: "Customer provides",
    items: [
      "Basic system description",
      "Intended use",
      "Deployment stage",
      "Known concerns",
      "Business owner",
    ],
  },
  {
    title: "Lock the scope",
    body: "Confirm what systems, data sources, users, tools, environments, and limits are included before testing begins.",
    listLabel: "Scope includes",
    items: [
      "Systems in scope",
      "Systems excluded",
      "Test environment",
      "User roles",
      "Data boundaries",
      "Authorization limits",
      "Safety limits",
    ],
  },
  {
    title: "Run the assessment",
    body: "Mythos maps exposure, tests behavior, reviews controls, identifies weaknesses, and gathers evidence under the approved scope.",
    listLabel: "Assessment may include",
    items: [
      "Access mapping",
      "Prompt/RAG/tool testing",
      "Permission-boundary testing",
      "Adversarial testing",
      "Evidence review",
      "Control mapping",
    ],
  },
  {
    title: "Review the decision",
    body: "The customer receives findings, remediation guidance, retest requirements, and a deployment recommendation.",
    listLabel: "Possible outcomes",
    items: [
      "Continue sandbox",
      "Limited pilot",
      "Draft-only use",
      "Human-reviewed use",
      "Restricted rollout",
      "Retest required",
      "Deployment blocked",
    ],
  },
];

export const ENGAGEMENT_NOTE =
  "Mythos testing should be authorized, scoped, non-destructive, and controlled by the customer.";

export interface EngagementType {
  title: string;
  body: string;
  bestFor: string;
}

export const ENGAGEMENT_TYPES: EngagementType[] = [
  {
    title: "Pre-Deployment Review",
    body: "For teams preparing to launch an AI assistant, agent, copilot, integration, or workflow.",
    bestFor: "Before pilot, before production, before expanding access.",
  },
  {
    title: "Pilot Readiness Assessment",
    body: "For teams that already have an AI system in staging or limited use and need evidence before broader rollout.",
    bestFor: "Controlled pilot, limited beta, department rollout.",
  },
  {
    title: "Vendor / Integration Review",
    body: "For teams connecting third-party AI products, SaaS AI features, model APIs, or partner workflows.",
    bestFor: "Procurement, SaaS AI enablement, model provider review, vendor risk.",
  },
  {
    title: "Retest and Release Gate",
    body: "For teams that have already fixed findings and need proof before deployment expands.",
    bestFor: "After remediation, before release, before executive signoff.",
  },
];
