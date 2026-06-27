export interface NavItem {
  label: string;
  href: string;
}

/** A single link inside a dropdown panel. */
export interface NavLeaf {
  label: string;
  href: string;
  description?: string;
}

/**
 * A top-level navigation node. A node is either a direct link (`href`) or a
 * dropdown group (`items`). `match` lists the route prefixes that should mark a
 * dropdown node as active.
 */
export interface NavNode {
  label: string;
  href?: string;
  items?: NavLeaf[];
  match?: string[];
}

export const PRIMARY_NAV: NavNode[] = [
  { label: "Home", href: "/" },
  {
    label: "Platform",
    match: ["/platform", "/use-cases", "/pricing"],
    items: [
      {
        label: "Platform Overview",
        href: "/platform",
        description:
          "See how Athena and Achilles review AI systems before deployment.",
      },
      {
        label: "Use Cases",
        href: "/use-cases",
        description:
          "Explore where AI deployment risk appears across agents, copilots, cloud, code, vehicles, and R&D.",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description:
          "Review assessment-led pricing, recurring packages, add-ons, and scope-based pricing logic.",
      },
      {
        label: "What Mythos Produces",
        href: "/use-cases#what-mythos-produces",
        description:
          "Review the reports, findings, evidence packs, remediation backlog, and retest proof Mythos produces.",
      },
      {
        label: "How Engagement Starts",
        href: "/use-cases#how-engagement-starts",
        description:
          "Understand the assessment path from scope lock to release recommendation.",
      },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  {
    label: "Company",
    match: ["/company", "/investors", "/careers", "/trust", "/contact"],
    items: [
      {
        label: "Company",
        href: "/company",
        description:
          "Learn about Mythos' mission, principles, and approach to AI deployment accountability.",
      },
      {
        label: "Investors",
        href: "/investors",
        description:
          "Review the Mythos investment thesis and strategic direction.",
      },
      {
        label: "Careers",
        href: "/careers",
        description:
          "Join the team holding AI accountable — or introduce yourself through Open Talent.",
      },
      {
        label: "Trust & Security",
        href: "/trust",
        description:
          "See how Mythos approaches authorization, scope, sensitive information, and responsible disclosure.",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Start the right conversation with Mythos.",
      },
    ],
  },
];

export interface FooterGroup {
  label: string;
  items: NavItem[];
}

export const FOOTER_NAV: Record<string, FooterGroup> = {
  product: {
    label: "Product",
    items: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "Athena + Achilles", href: "/platform" },
      { label: "Deployment Model", href: "/platform" },
    ],
  },
  solutions: {
    label: "Solutions",
    items: [
      { label: "AI-Heavy SaaS", href: "/solutions" },
      { label: "Finance & Insurance", href: "/solutions" },
      { label: "Regulated & Defense", href: "/solutions" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { label: "About Mythos", href: "/company" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Trust & Security", href: "/trust" },
      { label: "Contact", href: "/contact" },
    ],
  },
};
