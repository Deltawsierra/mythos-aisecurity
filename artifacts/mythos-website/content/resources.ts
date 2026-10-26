/**
 * New standalone v2 routes outside Platform and Solutions (blueprint Sections
 * 11–13). All are built (16 Oct); the scaffold fields remain for navigation
 * and the release gate only.
 */
import type { ScaffoldPage } from "@/content/platform";

export const RESOURCE_PAGES = {
  outputs: {
    slug: "outputs",
    href: "/outputs",
    navLabel: "What Mythos Produces",
    navDescription: "Claims, receipts, evidence packs and decisions.",
    eyebrow: "What Mythos Produces",
    headline: "From finding to evidence to decision.",
    lede: "Every output a buyer receives — and who it is useful for: security, engineering, audit, the board, procurement and the release owner.",
    built: true,
    plannedSections: [
      "Assurance claims and evidence states",
      "Assurance Receipt",
      "Evidence Pack",
      "Retest Proof",
      "Deployment Decision",
      "Coverage Manifest and audit incomplete",
      "Observed effects",
      "Validity Cards",
      "Financial Exposure outputs",
      "Findings dispatch and offline verification",
    ],
  },
  standards: {
    slug: "standards",
    href: "/standards",
    navLabel: "Standards & Control Mapping",
    navDescription: "How tests and evidence map to frameworks.",
    eyebrow: "Standards & Control Mapping",
    headline: "Mapped to tests and evidence — never “certified by Mythos.”",
    lede: "How Mythos tests and evidence map to AI, security and industry frameworks, and where mapping ends and audit responsibility begins.",
    built: true,
    plannedSections: [
      "Mapping, evidence support and certification",
      "AI and secure-development frameworks",
      "Industry and compliance overlays",
      "Filter by capability, evidence type and role",
    ],
  },
  glossary: {
    slug: "glossary",
    href: "/glossary",
    navLabel: "AI Assurance Glossary",
    navDescription: "Plain-English definitions of Mythos terms.",
    eyebrow: "AI Assurance Glossary",
    headline: "The language of AI assurance, in plain English.",
    lede: "Searchable A–Z definitions — technical and plain-English — for the terms buyers meet on the way to an assessment.",
    built: true,
    plannedSections: ["A–Z terms", "Plain-English and technical definitions", "Related pages"],
  },
  engagement: {
    slug: "engagement",
    href: "/engagement",
    navLabel: "How Engagement Starts",
    navDescription: "What happens after you request an assessment.",
    eyebrow: "How Engagement Starts",
    headline: "What happens after you click Request Assessment.",
    lede: "From scope lock and authorization to evidence, remediation, retest and annual assurance — what you provide, what Mythos does and what you receive.",
    built: true,
    plannedSections: [
      "Choose the system and business question",
      "Scope lock and authorization",
      "Baseline and discovery",
      "Behavioral and action testing",
      "Evidence review and Economic Exposure",
      "Remediation, retest and decision",
      "Annual assurance and revalidation",
      "What you provide",
    ],
  },
  partnerships: {
    slug: "partnerships",
    href: "/partnerships",
    navLabel: "Partnerships",
    navDescription: "Integrators, research and channel partners.",
    eyebrow: "Partnerships",
    headline: "Build assurance into what you deliver.",
    lede: "For systems integrators, AI vendors, research collaborators and channel partners who want Mythos evidence alongside their work.",
    built: true,
    plannedSections: [
      "Partnership types",
      "Integrators and AI vendors",
      "Research collaboration",
      "Start a partnership conversation",
    ],
  },
} satisfies Record<string, ScaffoldPage>;
