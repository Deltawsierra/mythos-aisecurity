import { PLATFORM_PAGES, PROJECTS } from "@/content/platform";
import { SOLUTION_PAGES } from "@/content/solutions";
import { RESOURCE_PAGES } from "@/content/resources";
import { INDUSTRY_MEDIA, SPINE_CORE_MEDIA } from "@/content/media";

export interface NavItem {
  label: string;
  href: string;
}

/** A single link inside a mega-menu column. */
export interface NavLeaf {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  items: NavLeaf[];
}

/** Optional image tile at the end of a mega menu. */
export interface NavFeature {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  /** "contain" for cut-out art on the panel; "cover" for full-bleed scenes. */
  fit: "contain" | "cover";
}

/**
 * A top-level navigation node: either a direct link (`href`) or a mega menu
 * (`columns`). `match` lists the route prefixes that mark it active.
 */
export interface NavNode {
  label: string;
  href?: string;
  columns?: NavColumn[];
  feature?: NavFeature;
  match?: string[];
}

const platformPage = (slug: string): NavLeaf => {
  const page = PLATFORM_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown platform page: ${slug}`);
  return { label: page.navLabel, href: page.href, description: page.navDescription };
};

const resource = (key: keyof typeof RESOURCE_PAGES, label?: string): NavLeaf => ({
  label: label ?? RESOURCE_PAGES[key].navLabel,
  href: RESOURCE_PAGES[key].href,
  description: RESOURCE_PAGES[key].navDescription,
});

/**
 * Launch Guide IA (Section 04): Platform | Products | Solutions | Resources |
 * Company, with Get a Demo as the global CTA. Pricing stays a prominent
 * secondary destination (Resources menu, drawer and footer). Only routes that
 * exist are linked: Resources and Company sub-pages without real content are
 * left out rather than shipped as empty libraries.
 */
export const PRIMARY_NAV: NavNode[] = [
  {
    label: "Platform",
    match: ["/platform"],
    columns: [
      {
        heading: "How assurance works",
        items: [
          {
            label: "Platform Overview",
            href: "/platform",
            description: "One assurance system for AI deployment.",
          },
          {
            label: "The Assurance Lifecycle",
            href: "/platform#lifecycle-title",
            description: "Discover, Understand, Test, Prove, Revalidate.",
          },
          platformPage("evidence"),
          platformPage("continuous-assurance"),
          platformPage("economic-exposure"),
        ],
      },
    ],
    feature: {
      eyebrow: "System of record",
      title: "SPINE",
      description: "Keeps every claim, receipt and decision current as your AI changes.",
      href: "/platform/spine",
      image: SPINE_CORE_MEDIA.cutout.src,
      fit: "contain",
    },
  },
  {
    label: "Products",
    match: ["/platform/athena", "/platform/spine", "/platform/achilles", "/platform/validation", "/platform/hermes"],
    columns: [
      {
        heading: "The Mythos family",
        items: [
          ...PROJECTS.map((p) => ({
            label: p.id === "minotaur" ? "Minotaur · How Mythos Validates Itself" : p.name,
            href: p.href,
            description: p.id === "minotaur" ? "Test Mythos — our internal proving ground." : `${p.tagline}.`,
          })),
          {
            label: "Mythos Core",
            href: "/platform#architecture-title",
            description: "The shared scope, authorization and governance foundation.",
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    match: ["/solutions"],
    columns: [
      {
        heading: "By industry",
        items: [
          {
            label: "All Solutions",
            href: "/solutions",
            description: "Find your starting point by environment.",
          },
          ...SOLUTION_PAGES.slice(0, 3).map((s) => ({
            label: s.navLabel,
            href: s.href,
            description: s.navDescription,
          })),
        ],
      },
      {
        heading: "More industries",
        items: SOLUTION_PAGES.slice(3).map((s) => ({
          label: s.navLabel,
          href: s.href,
          description: s.navDescription,
        })),
      },
    ],
    feature: {
      eyebrow: "Where to start",
      title: "Financial Services & Insurance",
      description: "Servicing copilots, customer data and AI suppliers — one workflow at a time.",
      href: "/solutions/financial-services-insurance",
      image: INDUSTRY_MEDIA["financial-services"].card.src,
      fit: "cover",
    },
  },
  {
    label: "Resources",
    match: ["/resources", "/ai-risk-explained", "/use-cases", "/outputs", "/example-report", "/standards", "/glossary", "/engagement", "/trust", "/pricing"],
    columns: [
      {
        heading: "Proof",
        items: [
          {
            label: "All Resources",
            href: "/resources",
            description: "The knowledge archive — only pages that exist.",
          },
          {
            label: "Example Assurance Report",
            href: "/example-report",
            description: "A synthetic sample report, section by section.",
          },
          resource("outputs"),
          {
            label: "Trust & Security",
            href: "/trust",
            description: "Authorization, scope, data handling and disclosure.",
          },
          resource("standards"),
        ],
      },
      {
        heading: "Learn and buy",
        items: [
          {
            label: "Is Mythos Right for Us?",
            href: "/ai-risk-explained",
            description: "AI risk in plain English, with questions for the board.",
          },
          {
            label: "Guide: Red-Teaming AI Agents",
            href: "/resources/how-to-red-team-ai-agents",
            description: "What to test before an agent touches real systems.",
          },
          {
            label: "Use Cases",
            href: "/use-cases",
            description: "Where AI deployment risk shows up, scenario by scenario.",
          },
          resource("glossary"),
          resource("engagement"),
          {
            label: "Pricing",
            href: "/pricing",
            description: "Workflow assessments from USD 15,000.",
          },
        ],
      },
    ],
  },
  {
    label: "Company",
    match: ["/company", "/investors", "/careers", "/partnerships", "/contact"],
    columns: [
      {
        heading: "Mythos",
        items: [
          {
            label: "About Mythos",
            href: "/company",
            description: "Mission, principles and how we work.",
          },
          {
            label: "Investors",
            href: "/investors",
            description: "The thesis and how to request materials.",
          },
          {
            label: "Careers",
            href: "/careers",
            description: "What we build, and how roles will be posted.",
          },
          resource("partnerships"),
          {
            label: "Contact",
            href: "/contact",
            description: "Start with a defined scope.",
          },
        ],
      },
    ],
  },
];

export const CTA_LINKS = {
  assessment: "/contact",
  demo: "/contact?intent=demo",
} as const;

export interface FooterGroup {
  label: string;
  items: NavItem[];
}

/** Footer clusters (Launch Guide Section 04). Legal and trust links sit in the base row. */
export const FOOTER_NAV: FooterGroup[] = [
  {
    label: "Platform",
    items: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Evidence & Receipts", href: "/platform/evidence" },
      { label: "Continuous Assurance", href: "/platform/continuous-assurance" },
      { label: "Economic Exposure", href: "/platform/economic-exposure" },
    ],
  },
  {
    label: "Products",
    items: PROJECTS.map((p) => ({
      label: p.id === "minotaur" ? "Minotaur" : p.name,
      href: p.href,
    })),
  },
  {
    label: "Industries",
    items: [
      { label: "All Solutions", href: "/solutions" },
      ...SOLUTION_PAGES.map((s) => ({ label: s.navLabel, href: s.href })),
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "All Resources", href: "/resources" },
      { label: "AI Risk in Plain English", href: "/ai-risk-explained" },
      { label: "Red-Teaming AI Agents", href: "/resources/how-to-red-team-ai-agents" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Example Report", href: "/example-report" },
      { label: "What Mythos Produces", href: "/outputs" },
      { label: "Standards & Control Mapping", href: "/standards" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Mythos", href: "/company" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Commercial",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "How Engagement Starts", href: "/engagement" },
      { label: "Request an Assessment", href: "/contact" },
      { label: "Get a Demo", href: "/contact?intent=demo" },
    ],
  },
];
