/**
 * Solutions registry — industry verticals from the October 2026 blueprint
 * (Section 9). Financial Services & Insurance is the flagship entry vertical.
 */
import type { IndustryId } from "@/content/media";
import type { ScaffoldPage } from "@/content/platform";

export interface SolutionPage extends ScaffoldPage {
  /** Staged card/hero art, where approved art exists. */
  media?: IndustryId;
  /** Recommended starting engagement for this vertical. */
  startingPoint: string;
}

export const SOLUTION_PAGES: SolutionPage[] = [
  {
    slug: "financial-services-insurance",
    href: "/solutions/financial-services-insurance",
    navLabel: "Financial Services & Insurance",
    navDescription: "Payments, lending, fraud, claims and employee AI.",
    eyebrow: "Financial Services & Insurance",
    headline: "Assurance for AI that touches money, customers and approvals.",
    lede: "Payment, lending, fraud, claims and employee AI — with customer data, approval authority, third-party AI and financial exposure in scope.",
    media: "financial-services",
    startingPoint: "Regulated / High-Risk Assessment",
    plannedSections: [
      "Where AI meets money and customers",
      "Approval authority and service identities",
      "Third-party AI and operational resilience",
      "Economic Exposure for finance",
      "Audit-ready evidence",
      "Where to start",
    ],
  },
  {
    slug: "healthcare-life-sciences",
    href: "/solutions/healthcare-life-sciences",
    navLabel: "Healthcare & Life Sciences",
    navDescription: "Sensitive records, research data and AI-assisted operations.",
    eyebrow: "Healthcare & Life Sciences",
    headline: "Evidence for AI that works with sensitive records.",
    lede: "Sensitive records, research data, AI-assisted operations and vendor AI — with evidence and change control for regulated review.",
    media: "healthcare-life-sciences",
    startingPoint: "High-Risk / Compliance Evidence Assessment",
    plannedSections: [
      "Sensitive data and AI-assisted workflows",
      "Vendor and third-party AI",
      "Evidence and change control",
      "Regulated overlays",
      "Where to start",
    ],
  },
  {
    slug: "ai-saas",
    href: "/solutions/ai-saas",
    navLabel: "AI-Heavy SaaS",
    navDescription: "Tenant boundaries, agents and customer security reviews.",
    eyebrow: "AI-Heavy SaaS",
    headline: "Ship AI features your enterprise customers can trust.",
    lede: "Tenant boundaries, RAG leakage, agent actions and customer security reviews — with assurance packets your buyers can use.",
    media: "technology-ai-saas",
    startingPoint: "Agent Safety or Growth Assurance",
    plannedSections: [
      "Tenant boundaries and RAG leakage",
      "Agents, tools and actions",
      "Customer security reviews and vendor packets",
      "Continuous assurance as you ship",
      "Where to start",
    ],
  },
  {
    slug: "regulated-enterprise",
    href: "/solutions/regulated-enterprise",
    navLabel: "Regulated Enterprise",
    navDescription: "Copilots, decision support and internal workflows.",
    eyebrow: "Regulated Enterprise",
    headline: "Assurance for enterprise copilots and decision support.",
    lede: "Enterprise copilots, decision support, procurement and internal workflows — with audit, access and change drift in view.",
    startingPoint: "Deployment Assurance / Enterprise",
    plannedSections: [
      "Copilots and decision support",
      "Access and effective authority",
      "Audit and change drift",
      "Where to start",
    ],
  },
  {
    slug: "public-sector-mission",
    href: "/solutions/public-sector-mission",
    navLabel: "Public Sector & Mission",
    navDescription: "Sensitive workflows, authorization and high-assurance evidence.",
    eyebrow: "Public Sector & Mission",
    headline: "High-assurance evidence for mission workflows.",
    lede: "Sensitive workflows, authorization, restricted records and private deployment considerations — with human control kept explicit.",
    startingPoint: "Mission / High Assurance",
    plannedSections: [
      "Authorization and restricted records",
      "Private deployment considerations",
      "High-assurance evidence",
      "Where to start",
    ],
  },
  {
    slug: "manufacturing-critical-infrastructure",
    href: "/solutions/manufacturing-critical-infrastructure",
    navLabel: "Manufacturing & Critical Infrastructure",
    navDescription: "Operational AI, industrial workflows and downtime risk.",
    eyebrow: "Manufacturing & Critical Infrastructure",
    headline: "Assurance where AI meets operations.",
    lede: "Operational AI, industrial workflows, vendor systems and cyber-physical dependencies — with downtime and economic consequence in view.",
    media: "manufacturing-critical-infrastructure",
    startingPoint: "High-Risk / Mission",
    plannedSections: [
      "Operational and industrial AI",
      "Vendor systems and cyber-physical dependencies",
      "Downtime and economic consequence",
      "Where to start",
    ],
  },
  {
    slug: "integrators-vendors",
    href: "/solutions/integrators-vendors",
    navLabel: "Systems Integrators & AI Vendors",
    navDescription: "Evidence that supports your customers' releases.",
    eyebrow: "Systems Integrators & AI Vendors",
    headline: "Evidence that travels with what you deliver.",
    lede: "Use Mythos evidence to support customer releases, vendor assurance, implementation validation and recurring customer assurance.",
    startingPoint: "Partnership / Enterprise Portfolio",
    plannedSections: [
      "Release and implementation validation",
      "Vendor assurance packets",
      "Recurring customer assurance",
      "Partnering with Mythos",
    ],
  },
];

export function getSolutionPage(slug: string): SolutionPage | undefined {
  return SOLUTION_PAGES.find((page) => page.slug === slug);
}
