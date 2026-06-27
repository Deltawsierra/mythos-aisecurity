export interface PageContent {
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubline: string;
  heroBadge?: string;
  heroCta?: { label: string; href: string };
}

export const PAGE_CONTENT = {
  home: {
    metaTitle: "Mythos AI Security — AI Deployment Assurance",
    metaDescription:
      "Mythos is an AI Deployment Assurance company. We validate high-risk AI workflows across data, routing, agents, controls, and evidence — and produce proof teams can use.",
    heroHeadline: "Mythos",
    heroSubline:
      "AI Deployment Assurance for high-risk AI systems — independent validation and evidence, before deployment and as systems change.",
    heroBadge: "AI Deployment Assurance",
    heroCta: { label: "Request Assessment", href: "/contact" },
  },
  platform: {
    metaTitle: "Platform",
    metaDescription:
      "How AI Deployment Assurance works: Athena finds risk and produces evidence, Achilles validates safe AI operation, and Mythos delivers an evidence pack and continuous assurance.",
    heroHeadline: "Athena + Achilles",
    heroSubline:
      "Two engines for AI Deployment Assurance — one finds risk and produces evidence, the other validates whether AI can operate safely.",
    heroBadge: "The Platform",
    heroCta: { label: "Explore the Platform", href: "/contact" },
  },
  solutions: {
    metaTitle: "Solutions",
    metaDescription:
      "AI Deployment Assurance by use case — AI-heavy SaaS, finance and insurance, healthcare, and regulated or defense-adjacent enterprises.",
    heroHeadline: "Solutions",
    heroSubline:
      "Where high-risk AI runs, Mythos validates it — and gives buyers the evidence to deploy with confidence.",
    heroBadge: "Who We Serve",
    heroCta: { label: "Contact Mythos", href: "/contact" },
  },
  demo: {
    metaTitle: "Request a Demo",
    metaDescription:
      "See AI Deployment Assurance on one AI system — a scoped assessment, an evidence pack, and an executive readout.",
    heroHeadline: "See It in Action",
    heroSubline:
      "Request the full-length Mythos platform demonstration, or scope an assessment on one AI workflow.",
    heroBadge: "Platform Demo",
    heroCta: { label: "Request Full Demo Video", href: "/contact" },
  },
  investors: {
    metaTitle: "Investors & Partners",
    metaDescription:
      "Mythos is building the AI Deployment Assurance category — independent validation for AI agents that access data, tools, workflows, and approvals.",
    heroHeadline: "Investors & Partners",
    heroSubline:
      "The category, the market timing, and the business model behind AI Deployment Assurance.",
    heroBadge: "Strategic Partnership",
    heroCta: { label: "Request Investor Materials", href: "/contact" },
  },
  company: {
    metaTitle: "Company",
    metaDescription:
      "Mythos turns AI and cyber risk from guesswork into measurable, repeatable assurance — authorization-first, evidence-driven, and human-accountable.",
    heroHeadline: "Mythos AI Security",
    heroSubline:
      "We turn AI and cyber risk from guesswork into measurable, repeatable assurance.",
    heroBadge: "Our Mission",
    heroCta: { label: "Contact Mythos", href: "/contact" },
  },
  contact: {
    metaTitle: "Contact Mythos",
    metaDescription:
      "Route your inquiry to the right team at Mythos — platform access, assessments, demos, investor and partner inquiries, and general contact.",
    heroHeadline: "Contact Mythos",
    heroSubline:
      "Platform access, assessments, demo requests, investor and partner inquiries, and general contact.",
    heroBadge: "Get in Touch",
  },
} satisfies Record<string, PageContent>;
