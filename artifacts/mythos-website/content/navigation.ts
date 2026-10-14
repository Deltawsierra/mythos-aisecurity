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

export const PRIMARY_NAV: NavNode[] = [
  {
    label: "Platform",
    match: ["/platform"],
    columns: [
      {
        heading: "The assurance system",
        items: PROJECTS.map((p) => ({
          label: p.id === "minotaur" ? "How Mythos Validates Itself" : p.name,
          href: p.href,
          description: p.id === "minotaur" ? "Minotaur — who tests the tester." : `${p.tagline}.`,
        })),
      },
      {
        heading: "How it works",
        items: [
          {
            label: "Platform Overview",
            href: "/platform",
            description: "One assurance system for AI deployment.",
          },
          platformPage("economic-exposure"),
          platformPage("evidence"),
          platformPage("continuous-assurance"),
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
      description: "Approvals, payments and customer data — with financial exposure in scope.",
      href: "/solutions/financial-services-insurance",
      image: INDUSTRY_MEDIA["financial-services"].card.src,
      fit: "cover",
    },
  },
  {
    label: "Resources",
    match: [
      "/use-cases",
      "/outputs",
      "/example-report",
      "/standards",
      "/glossary",
      "/engagement",
      "/trust",
    ],
    columns: [
      {
        heading: "Proof",
        items: [
          {
            label: RESOURCE_PAGES.outputs.navLabel,
            href: RESOURCE_PAGES.outputs.href,
            description: RESOURCE_PAGES.outputs.navDescription,
          },
          {
            label: "Example Assurance Report",
            href: "/example-report",
            description: "A sample deliverable, page by page.",
          },
          {
            label: "Trust & Security",
            href: "/trust",
            description: "Authorization, scope, data handling and disclosure.",
          },
          {
            label: RESOURCE_PAGES.engagement.navLabel,
            href: RESOURCE_PAGES.engagement.href,
            description: RESOURCE_PAGES.engagement.navDescription,
          },
        ],
      },
      {
        heading: "Learn",
        items: [
          {
            label: "Use Cases",
            href: "/use-cases",
            description: "Where AI deployment risk shows up, scenario by scenario.",
          },
          {
            label: RESOURCE_PAGES.standards.navLabel,
            href: RESOURCE_PAGES.standards.href,
            description: RESOURCE_PAGES.standards.navDescription,
          },
          {
            label: RESOURCE_PAGES.glossary.navLabel,
            href: RESOURCE_PAGES.glossary.href,
            description: RESOURCE_PAGES.glossary.navDescription,
          },
        ],
      },
    ],
  },
  { label: "Pricing", href: "/pricing", match: ["/pricing"] },
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
            description: "Help build the proving ground for operational AI.",
          },
          {
            label: RESOURCE_PAGES.partnerships.navLabel,
            href: RESOURCE_PAGES.partnerships.href,
            description: RESOURCE_PAGES.partnerships.navDescription,
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Start the right conversation.",
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

export const FOOTER_NAV: FooterGroup[] = [
  {
    label: "Platform",
    items: [
      { label: "Platform Overview", href: "/platform" },
      ...PROJECTS.map((p) => ({
        label: p.id === "minotaur" ? "How Mythos Validates Itself" : p.name,
        href: p.href,
      })),
      { label: "Economic Exposure", href: "/platform/economic-exposure" },
      { label: "Continuous Assurance", href: "/platform/continuous-assurance" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "All Solutions", href: "/solutions" },
      ...SOLUTION_PAGES.map((s) => ({ label: s.navLabel, href: s.href })),
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Use Cases", href: "/use-cases" },
      { label: "What Mythos Produces", href: "/outputs" },
      { label: "Example Assurance Report", href: "/example-report" },
      { label: "Standards & Control Mapping", href: "/standards" },
      { label: "Glossary", href: "/glossary" },
      { label: "How Engagement Starts", href: "/engagement" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Mythos", href: "/company" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Trust & Security", href: "/trust" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
