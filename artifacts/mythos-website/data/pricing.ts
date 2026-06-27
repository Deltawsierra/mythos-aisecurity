/**
 * Content model for the /pricing page (Phase 12A).
 * Prices are published starting points only — final scope is always
 * determined per engagement. Keep claim posture cautious: no "certify",
 * "guarantee", "quantum-safe", or vehicle-safety language.
 */

export interface AssessmentOffer {
  name: string;
  startingAt: string;
  bestFor: string;
  includes: string[];
}

export const ASSESSMENT: AssessmentOffer = {
  name: "Scoped AI Deployment Assessment",
  startingAt: "$15,000",
  bestFor:
    "Teams preparing a pilot, production rollout, vendor review, or expansion decision.",
  includes: [
    "One defined AI system or workflow",
    "Scope lock",
    "Access and data-flow review",
    "AI behavior testing",
    "Technical findings",
    "Evidence pack",
    "Executive readiness summary",
    "Remediation guidance",
    "Retest recommendation",
  ],
};

export interface PricingTier {
  name: string;
  price: string;
  /** Small unit shown next to the price, e.g. "/month" or "pricing". */
  cadence?: string;
  /** Whether to render the "Starting at" qualifier above the price. */
  startingAt: boolean;
  bestFor: string;
  includes: string[];
  goodFor: string[];
  cta: { label: string; href: string };
}

export const TIERS: PricingTier[] = [
  {
    name: "Launch",
    price: "$7,500",
    cadence: "/month",
    startingAt: true,
    bestFor: "One AI system or early deployment team.",
    includes: [
      "1 primary AI system or workflow",
      "Limited monthly assessment runs",
      "Athena system/access mapping",
      "Achilles behavior validation",
      "Prompt, RAG, or tool testing where applicable",
      "Basic evidence pack",
      "Findings and remediation backlog",
      "Monthly readiness review",
      "Retest support for included findings",
    ],
    goodFor: [
      "Internal RAG assistant",
      "Customer support AI pilot",
      "Small agent workflow",
      "Vendor AI pilot",
      "Early cloud/data AI integration",
    ],
    cta: { label: "Request Assessment", href: "/contact?intent=assessment" },
  },
  {
    name: "Growth",
    price: "$15,000",
    cadence: "/month",
    startingAt: true,
    bestFor: "Companies expanding AI across multiple workflows.",
    includes: [
      "Multiple AI systems or workflows",
      "Higher monthly test volume",
      "Athena exposure and control mapping",
      "Achilles behavior validation",
      "RAG, prompt injection, tool-use, and model-route testing",
      "Use case-specific findings",
      "Evidence packs",
      "Remediation backlog",
      "Retest proof",
      "Monthly or biweekly review cadence",
      "Deployment readiness recommendations",
    ],
    goodFor: [
      "Multiple copilots",
      "Agentic workflows",
      "Vendor integrations",
      "Developer AI rollout",
      "Regulated workflow pilots",
      "Cloud/data platform AI expansion",
    ],
    cta: { label: "Request Assessment", href: "/contact?intent=assessment" },
  },
  {
    name: "Enterprise",
    price: "$35,000",
    cadence: "/month",
    startingAt: true,
    bestFor: "Larger organizations with complex AI deployments.",
    includes: [
      "Multiple departments or business units",
      "Expanded workflow coverage",
      "Higher run/test volume",
      "Advanced tool and agent validation",
      "Data platform and cloud AI integration review",
      "Vendor AI integration review",
      "Role and permission boundary testing",
      "Executive reporting",
      "Evidence pack exports",
      "Retest and release-gate support",
      "Custom assessment cadence",
      "Priority review scheduling",
    ],
    goodFor: [
      "Enterprise AI platforms",
      "Multi-agent systems",
      "Regulated departments",
      "Large RAG deployments",
      "Cloud/data AI integrations",
      "AI governance programs",
    ],
    cta: { label: "Request Assessment", href: "/contact?intent=assessment" },
  },
  {
    name: "Mission",
    price: "Custom",
    cadence: "pricing",
    startingAt: false,
    bestFor:
      "High-assurance, public-sector, defense-adjacent, critical infrastructure, private deployment, or strategic horizon work.",
    includes: [
      "Custom scope",
      "Private deployment considerations",
      "On-prem, VPC, or air-gapped discussion where applicable",
      "High-assurance evidence requirements",
      "Mission workflow review",
      "Expanded security and governance controls",
      "Custom reporting needs",
      "Strategic horizon scenario review where appropriate",
      "Dedicated assessment planning",
      "Custom retest cadence",
    ],
    goodFor: [
      "Public sector / mission workflows",
      "Defense-adjacent AI systems",
      "Highly sensitive enterprise environments",
      "Private deployment needs",
      "Hermes-related strategic horizon discussions",
      "Quantum-adjacent strategic R&D discussions",
    ],
    cta: { label: "Contact Mythos", href: "/contact" },
  },
];

export interface AddOnItem {
  name: string;
  /** Cautious-claim note rendered beneath sensitive add-ons. */
  note?: string;
}

export interface AddOnGroup {
  label: string;
  items: AddOnItem[];
}

export const ADDON_PRICING_NOTE =
  "Add-ons typically start at $3,500+ depending on complexity, data sources, systems, workflows, and evidence requirements.";

export const ADDON_GROUPS: AddOnGroup[] = [
  {
    label: "Core add-ons",
    items: [
      { name: "Additional AI System Review" },
      { name: "Additional Workflow Review" },
      { name: "Additional RAG / Knowledge Source Review" },
      { name: "Additional Agent Toolset Review" },
      { name: "Additional Model Route Review" },
      { name: "Retest Sprint" },
    ],
  },
  {
    label: "Specialized add-ons",
    items: [
      { name: "Vendor AI Integration Review" },
      { name: "Developer AI / Repository Review" },
      { name: "Cloud / Data Platform Integration Review" },
      { name: "Regulated Workflow Evidence Pack" },
      { name: "Executive Readiness Briefing" },
      { name: "Custom Evidence Export" },
    ],
  },
  {
    label: "Strategic add-ons",
    items: [
      { name: "Private Deployment Planning" },
      { name: "Strategic Horizon Workshop" },
      {
        name: "Hermes Readiness Workshop",
        note: "Strategic Horizon / Project Hermes discussion. Not a vehicle safety certification or crash-prevention guarantee.",
      },
      {
        name: "Quantum-Adjacent R&D Workshop",
        note: "Strategic R&D discussion. Not a quantum-safe certification or production quantum integration claim.",
      },
    ],
  },
];

export const SCOPE_FACTORS: string[] = [
  "Number of AI systems",
  "Number of workflows",
  "Number of users or roles",
  "Number of tools/actions",
  "Number of data sources",
  "RAG/vector index complexity",
  "Model/provider routes",
  "Cloud/data platform complexity",
  "Regulated or sensitive data",
  "Deployment environment",
  "Evidence/reporting requirements",
  "Retest needs",
  "Strategic horizon scope",
];

export const SCOPE_CLOSING =
  "The goal is to price the actual assurance work required, not force every AI deployment into the same package.";

export interface FaqItem {
  question: string;
  answer: string;
}

export const PRICING_FAQ: FaqItem[] = [
  {
    question: "Are these fixed prices?",
    answer:
      "No. Published prices are starting points. Final scope depends on the AI systems, workflows, data sources, tools, environments, evidence needs, and retest requirements involved.",
  },
  {
    question: "Can we start with a one-time assessment?",
    answer:
      "Yes. The Scoped AI Deployment Assessment is designed for teams that want a defined review before committing to recurring assurance.",
  },
  {
    question: "What is the difference between an assessment and a subscription?",
    answer:
      "A scoped assessment reviews a defined system or workflow for a specific decision. A subscription supports recurring review as AI systems, models, prompts, tools, data sources, vendors, and permissions change.",
  },
  {
    question: "Are add-ons required?",
    answer:
      "Only when the requested scope extends beyond the selected package. Add-ons help cover additional systems, workflows, integrations, evidence needs, or retest cycles.",
  },
  {
    question: "Does Mythos certify AI systems?",
    answer:
      "No. Mythos helps produce evidence, findings, remediation guidance, and retest proof to support human-reviewed deployment decisions. It does not guarantee safety or certify compliance.",
  },
  {
    question: "Is Hermes included?",
    answer:
      "Hermes-related work should be treated as a strategic horizon discussion unless formally launched. It is not a vehicle safety certification or crash-prevention guarantee.",
  },
  {
    question: "Is quantum-adjacent AI included?",
    answer:
      "Quantum-adjacent work should be treated as a strategic R&D discussion. It is not a claim of current quantum-safe certification, quantum hardware validation, or production quantum integration capability.",
  },
];
