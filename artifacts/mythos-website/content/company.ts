/**
 * Company, Investors, Careers and Partnerships copy (Launch Guide §12),
 * checked 16 Oct against the Session Work Summary, Master Blueprint, Market
 * Landscape, Weekly Synthesis, Roadmap, Red/Gray/Green guide and the services
 * agreement template.
 *
 * - People: only what the owner approved on 27 Oct (claim company.author-named):
 *   David Smith's name, title and focus, plus the portrait he supplied on 28 Oct
 *   and his bio (Co-founder and COO, 28 Oct).
 *   Brendan Flanigan (Co-founder and CEO, claim company.ceo-named) and
 *   Shaquille Lyew (CMO, not a founder, claim company.cmo-named): portraits
 *   and bios supplied by the owner on 28 Oct, shortened, never extended.
 *   No dates, location, legal entity ("Corporation" waits on the contracting
 *   entity) or veteran-owned business status (decision D08 otherwise open).
 * - No customers, partners, open roles or milestones exist — pages say so
 *   plainly instead of implying them.
 * - Investors: thesis only. No round size, valuation, runway or use of funds.
 * - Product maturity notes re-checked 26 Oct against the Mythos Master Inventory.
 */

export type Maturity = "Built" | "In development" | "Internal" | "Specified" | "Exploratory";

/** Honest maturity per product, matching what each product page states. */
export const PRODUCT_MATURITY: { name: string; href: string; maturity: Maturity; note: string }[] = [
  { name: "Athena", href: "/platform/athena", maturity: "Built", note: "27 scanners, each finding decided against a benign control; Ed25519-signed evidence packs." },
  { name: "Achilles", href: "/platform/achilles", maturity: "Built", note: "Attacks LLMs and agents over HTTP across 32 scenarios; scan results not yet signed into the record." },
  { name: "SPINE", href: "/platform/spine", maturity: "In development", note: "Claims, DSSE-signed receipts, coverage and retest-gated closure in place; a customer-run identity collector is planned." },
  { name: "Minotaur", href: "/platform/validation", maturity: "Internal", note: "Measures Athena and Achilles on planted benchmarks and governs their release. Never sold." },
  { name: "Economic Exposure", href: "/platform/economic-exposure", maturity: "In development", note: "Prices scenarios as ranges on fixture feeds, not yet calibrated; every example on the site is synthetic." },
  { name: "Hermes", href: "/platform/hermes", maturity: "Exploratory", note: "A scaffold for physical AI: every domain reads inconclusive today; no customer work." },
];

type Person = {
  name: string;
  role: string;
  focus: string;
  bio?: string;
  quote?: string;
  portrait: { src: string; src2x: string; width: number; height: number };
  writing?: { label: string; href: string };
};

export const COMPANY = {
  hero: {
    eyebrow: "Company",
    headline: "Built to Put *Evidence Behind Ambition.*",
    lede: "Mythos AI Security exists to help people build, operate and govern AI with greater clarity about the authority and consequences those systems carry.",
  },
  mission: {
    eyebrow: "Why Mythos exists",
    title: "Accountable AI, *through evidence.*",
    body: [
      "AI is moving from experimentation into operations. Assistants read records, agents call tools, and models change underneath the workflows that depend on them.",
      "We build assurance systems that make access, behavior, evidence and change understandable enough for accountable human decisions — and that say plainly what is still unknown.",
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "Unknown over *false certainty.*",
    lede: "The rules our products and our reports follow. They are why every page on this site separates what is built from what is planned.",
    items: [
      { name: "Declared is not verified", body: "What a system, operator or vendor says, what we observed and what we verified stay separate." },
      { name: "Unknown stays visible", body: "Where evidence is missing, the answer is “unknown” — never a quiet pass." },
      { name: "Every claim carries its source", body: "A conclusion points to the evidence, version and time it came from." },
      { name: "Weakest evidence sets the strength", body: "A claim is only as strong as the weakest evidence it rests on." },
      { name: "People make high-risk decisions", body: "Mythos supplies evidence and decision support; accountable humans decide." },
      { name: "Validate the validator", body: "Our own methods are tested too — that is what Minotaur is for." },
    ],
  },
  products: {
    eyebrow: "What we are building",
    title: "Each part, *at its real maturity.*",
    lede: "One system for mapping, testing and keeping evidence current. Here is where each part stands today.",
  },
  people: {
    eyebrow: "Who is building Mythos",
    title: "The people *behind the evidence.*",
    people: [
      {
        name: "Brendan Flanigan",
        role: "Co-founder and Chief Executive Officer",
        focus: "Leadership and company direction.",
        bio: "Served in the US Army as an Infantryman, then a Military Working Dog Handler. Has worked in business development and contract negotiations, and built, ran and sold a previous business. Studied software engineering, with independent study in AI architecture and business management, and was an early contributor to the beta system that became Mythos.",
        quote: "The mission to protect does not end when the battlefield changes.",
        portrait: { src: "/assets/people/brendan-flanigan-480.webp", src2x: "/assets/people/brendan-flanigan-960.webp", width: 480, height: 600 },
      },
      {
        name: "David Smith",
        role: "Co-founder and Chief Operating Officer",
        focus: "Product direction, software architecture, development and AI research.",
        bio: "Full-stack engineer who has built enterprise applications for insurance organizations, municipal government and growing businesses, including role-based access, audit trails and data-governance workflows. Co-founded Mythos after seeing, through contract work, AI adoption outpace testing. Has shaped the architecture and product direction of Athena and Achilles, and built the assessment dashboards and reports that turn findings into remediation priorities. Holds a degree in Computer Science and is a disabled US Army veteran.",
        portrait: { src: "/assets/people/david-smith-480.webp", src2x: "/assets/people/david-smith-960.webp", width: 480, height: 600 },
        writing: { label: "How to Red-Team an AI Agent", href: "/resources/how-to-red-team-ai-agents" },
      },
      {
        name: "Shaquille Lyew",
        role: "Chief Marketing Officer",
        focus: "Market presence, customer relationships and business development.",
        bio: "Over 12 years in sales, customer service and business development, including work with startups.",
        portrait: { src: "/assets/people/shaquille-lyew-480.webp", src2x: "/assets/people/shaquille-lyew-960.webp", width: 480, height: 600 },
      },
    ] as Person[],
  },
  work: {
    eyebrow: "How we work",
    title: "Authorization *comes first.*",
    items: [
      { name: "Written scope", body: "Testing starts only after the systems, environments and exclusions are agreed in writing." },
      { name: "No destructive testing without approval", body: "Anything that could change or disrupt a system needs explicit, specific authorization." },
      { name: "Evidence, not guarantees", body: "We report what was tested, observed and left unknown within the agreed scope. We do not certify AI as safe." },
      { name: "Independence stated up front", body: "If Mythos helped build a control, we say so before anyone relies on our test of it." },
    ],
  },
  relationships: {
    eyebrow: "Work with Mythos",
    title: "Other ways *to connect.*",
    items: [
      { name: "Investors", body: "The thesis behind Mythos, and how to start a conversation.", href: "/investors" },
      { name: "Partnerships", body: "How integrators, consultancies and researchers could work with us.", href: "/partnerships" },
      { name: "Careers", body: "What we are building and how roles will be posted.", href: "/careers" },
      { name: "Contact", body: "Start with a defined scope.", href: "/contact" },
    ],
  },
} as const;

export const INVESTORS = {
  hero: {
    eyebrow: "Investors",
    headline: "Building the Assurance Layer for *Operational AI.*",
    lede: "As AI gains access to data, tools, processes and physical systems, organizations need independent proof that remains meaningful after change. Mythos AI Security is focused on making that assurance repeatable and commercially useful.",
  },
  category: {
    eyebrow: "The category",
    title: "Not AI for security. *Assurance for AI.*",
    lede: "Three markets are often blurred together. Mythos sits in the third.",
    items: [
      { name: "AI for cyber", body: "AI used to defend networks and run security operations." },
      { name: "Security of AI", body: "Protecting models and AI applications from attack and misuse." },
      { name: "Deployment assurance", body: "Evidence that an AI system with real access and authority does only what it is allowed to — and still does after it changes.", ours: true },
    ],
  },
  thesis: {
    eyebrow: "The thesis",
    title: "From one workflow *to an assurance layer.*",
    items: [
      { name: "Start with one consequential workflow", body: "A paid, scoped assessment of an AI workflow a buyer must decide about — first in financial services, insurance and regulated enterprise, and with AI vendors whose customers ask for proof." },
      { name: "Leave evidence that survives change", body: "SPINE ties every conclusion to the configuration it was true of, and reopens only what a change affects. That record is what customers keep — and what makes retesting cheaper than starting over." },
      { name: "Bridge to business consequence", body: "Economic Exposure prices observed effects as ranges, with their sources, for a risk owner to use. Its feeds are fixtures and it is not yet calibrated — decision support, never underwriting or legal advice." },
      { name: "Grow into continuing assurance", body: "Assessment, then evidence and retest proof, then annual or change-triggered assurance as models, tools and permissions keep moving." },
    ],
  },
  moat: {
    eyebrow: "What could compound",
    title: "Advantages we are *testing, not claiming.*",
    lede: "Competitors are moving toward the same space. These are hypotheses about what could become hard to copy, stated as hypotheses.",
    items: [
      "Deep specialization in a few consequential workflows",
      "Evidence adapters with documented limits",
      "A history of findings, fixes and retests",
      "A permissioned record of how AI systems failed and were repaired",
    ],
  },
  share: {
    eyebrow: "What we can share",
    title: "Start with *a conversation.*",
    body: "We do not publish fundraising details on this site. Introductory conversations come first; any materials are shared after review. Please don’t send diligence files through the public form.",
  },
} as const;

export const CAREERS = {
  hero: {
    eyebrow: "Careers",
    headline: "Build the Systems That *Test AI.*",
    lede: "Help create tools and evidence infrastructure that make AI deployments easier to understand, challenge and trust.",
  },
  roles: {
    eyebrow: "Open roles",
    title: "No open roles *right now.*",
    body: "When a role opens, it will be listed here with its team, location, eligibility and how to apply.",
  },
  work: {
    eyebrow: "The work",
    title: "What building Mythos *involves.*",
    items: [
      { name: "Mapping", body: "Working out what an AI system can actually reach — identities, data, tools and routes." },
      { name: "Adversarial testing", body: "Pushing AI workflows past their stated limits, safely and within scope." },
      { name: "Evidence infrastructure", body: "Claims, receipts and change tracking that stay honest as systems move." },
      { name: "Testing ourselves", body: "Building the ranges and checks that tell us when our own methods are wrong." },
    ],
  },
  interest: {
    eyebrow: "Staying in touch",
    title: "Interested *before a role opens?*",
    body: "Send a short note through the contact form and choose “Careers”. Please don’t include a resume, ID documents or clearance details — when roles open, applications will go through a proper process.",
  },
} as const;

export const PARTNERSHIPS = {
  hero: {
    eyebrow: "Partnerships",
    headline: "Build Trust *Together.*",
    lede: "Mythos AI Security works toward relationships that improve AI release quality, technical assurance, customer evidence and responsible deployment.",
  },
  types: {
    eyebrow: "Kinds of partnership",
    title: "Where working together *could help.*",
    lede: "No partners are listed here yet. Named partners will appear only with their permission.",
    items: [
      { name: "Systems integrators & consultancies", body: "Evidence that travels with what you deliver, with roles and independence agreed up front.", status: "Open to conversations" },
      { name: "Managed security & governance firms", body: "A channel for customers who need recurring assurance. Referral and delivery terms are not yet defined.", status: "Planned" },
      { name: "Platform & identity vendors", body: "Technical interfaces that let assessments read the systems customers actually run.", status: "Open to conversations" },
      { name: "Research & standards work", body: "Contributing to shared methods and threat taxonomies. Participation is not endorsement.", status: "Open to conversations" },
      { name: "Insurers & brokers", body: "Evidence that can inform underwriting conversations. Mythos is an evidence channel — never a certifier or an insurer.", status: "Open to conversations" },
    ],
  },
  rules: {
    eyebrow: "Independence",
    title: "Rules that keep *evidence honest.*",
    items: [
      "Implementing a control, verifying it and evaluating the verifier are separate roles.",
      "If Mythos built or fixed something, we disclose that before testing it — and we keep negative results.",
      "The team that wrote a fix cannot mark it independently verified.",
      "A partner can never turn a failed test into a pass.",
      "No fee depends on what the findings say.",
      "Names, results and logos are shared only with explicit permission.",
    ],
  },
  start: {
    eyebrow: "How it starts",
    title: "A conversation, *then terms in writing.*",
    steps: [
      { name: "Talk", body: "What you deliver, to whom, and what your customers ask for." },
      { name: "Define roles", body: "Referral or resale, who delivers, who owns the evidence and how results may be used — written down." },
      { name: "One scoped engagement", body: "Prove the arrangement on a single workflow before anything broader." },
    ],
  },
} as const;
