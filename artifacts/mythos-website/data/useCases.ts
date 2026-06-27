export type UseCaseCategory =
  | "Customer-Facing AI"
  | "Internal AI"
  | "Agentic AI"
  | "Regulated Workflows"
  | "Developer / Data Platforms"
  | "Public Sector / Mission"
  | "Strategic Horizon";

export interface UseCase {
  id: string;
  number: number;
  title: string;
  category: UseCaseCategory;
  /** Short badge shown on the card (e.g. "Athena + Achilles", "Hermes"). */
  project: string;
  summary: string;
  risk: string;
  /** Optional status pill for horizon / R&D scenarios (not current products). */
  status?: string;
  /** Caveat shown in the expanded panel for horizon / R&D scenarios. */
  statusNote?: string;
  scenario: string;
  reviews: string[];
  projectsAssigned: string;
  exampleFindings: string[];
  customerReceives: string[];
  decisionSupported: string;
}

/** Filter categories (excluding the leading "All" chip). */
export const USE_CASE_CATEGORIES: readonly UseCaseCategory[] = [
  "Customer-Facing AI",
  "Internal AI",
  "Agentic AI",
  "Regulated Workflows",
  "Developer / Data Platforms",
  "Public Sector / Mission",
  "Strategic Horizon",
];

export const USE_CASE_FILTERS: readonly string[] = [
  "All",
  ...USE_CASE_CATEGORIES,
];

export const USE_CASES: UseCase[] = [
  {
    id: "customer-support-agent",
    number: 1,
    title: "Customer Support AI Agent",
    category: "Customer-Facing AI",
    project: "Athena + Achilles",
    summary:
      "A customer support AI agent answers questions, drafts replies, summarizes tickets, and guides customers through common issues.",
    risk: "Can expose customer data, hallucinate policy, mishandle escalation, or follow malicious ticket content.",
    scenario:
      "A customer support AI agent answers questions, drafts replies, summarizes tickets, and helps agents handle common issues.",
    reviews: [
      "Customer data access",
      "CRM permissions",
      "Help-center grounding",
      "Escalation behavior",
      "Sensitive data exposure",
      "Hallucinated policy",
      "Prompt injection through ticket content",
      "Logs and human review",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Cross-customer ticket exposure",
      "Indirect prompt injection",
      "Hallucinated refund policy",
      "Unsafe escalation",
      "Sensitive data in AI logs",
    ],
    customerReceives: [
      "Readiness report",
      "Technical findings",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
    ],
    decisionSupported:
      "Whether the agent remains internal, enters limited beta, or becomes customer-facing.",
  },
  {
    id: "internal-rag-assistant",
    number: 2,
    title: "Internal Knowledge / RAG Assistant",
    category: "Internal AI",
    project: "Athena + Achilles",
    summary:
      "An internal assistant searches company documents, policies, wikis, tickets, and knowledge bases.",
    risk: "Can retrieve restricted documents, trust hidden instructions, cite stale policy, or leak sensitive information.",
    scenario:
      "An internal RAG assistant searches company documents, policies, wikis, tickets, chats, and knowledge bases.",
    reviews: [
      "Connected sources",
      "Document access",
      "Vector index permissions",
      "Stale sources",
      "Conflicting policies",
      "Source citations",
      "Sensitive leakage",
      "Prompt injection through retrieved documents",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Restricted HR document retrieved",
      "Confidential strategy surfaced",
      "Hidden Confluence instruction changed answer",
      "Outdated policy used as current",
    ],
    customerReceives: [
      "Source / permission map",
      "Evidence pack",
      "Technical findings",
      "Remediation backlog",
      "Retest plan",
    ],
    decisionSupported:
      "Whether to allow broad employee rollout, department pilot, or restricted-source access.",
  },
  {
    id: "agent-tools-actions",
    number: 3,
    title: "AI Agent With Tools and Actions",
    category: "Agentic AI",
    project: "Athena + Achilles",
    summary:
      "A tool-using AI agent calls APIs, updates records, sends messages, creates tickets, or triggers workflows.",
    risk: "Can exceed permissions, bypass approval, misuse tools, chain actions, or create changes the business cannot explain.",
    scenario:
      "An AI agent can call APIs, update records, create tickets, send messages, or trigger workflows.",
    reviews: [
      "Tool registry",
      "Read / write actions",
      "Service accounts",
      "User-bound authorization",
      "Approval gates",
      "Memory",
      "External communications",
      "Chained actions",
      "Audit logs",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Overbroad service account",
      "Backend approval missing",
      "Malicious email caused unsafe draft",
      "Low-risk actions chained into export",
    ],
    customerReceives: [
      "Tool / action risk map",
      "Identity map",
      "Findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
    ],
    decisionSupported:
      "Whether the agent stays read-only, draft-only, limited pilot, or approved for selected actions.",
  },
  {
    id: "regulated-workflow-assistant",
    number: 4,
    title: "Regulated Workflow Assistant",
    category: "Regulated Workflows",
    project: "Athena + Achilles",
    summary:
      "An AI assistant supports claims, finance, healthcare-adjacent, legal, compliance, procurement, or audit workflows.",
    risk: "Can influence decisions, mishandle sensitive records, use stale policy, or create weak audit trails.",
    scenario:
      "A regulated workflow assistant summarizes records, compares policy, drafts notes, routes cases, or prepares review material.",
    reviews: [
      "Sensitive data",
      "Policy grounding",
      "Human approval",
      "Decision boundaries",
      "Audit trail",
      "Source support",
      "Exception handling",
      "Customer-facing language",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "AI output uses final decision language",
      "Sensitive details overexposed",
      "Stale policy used",
      "Uploaded document injection changed summary",
    ],
    customerReceives: [
      "Workflow map",
      "Data sensitivity matrix",
      "Policy grounding report",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
    ],
    decisionSupported:
      "Whether AI stays draft-only, supports routine human review, or is blocked from regulated decision support.",
  },
  {
    id: "partner-vendor-integration",
    number: 5,
    title: "Partner / Vendor AI Integration",
    category: "Regulated Workflows",
    project: "Athena + Achilles",
    summary:
      "A company connects a third-party AI product, SaaS feature, chatbot, model API, or partner workflow.",
    risk: "Can create new data-sharing paths, overbroad permissions, unclear retention, weak audit logs, or vendor evidence gaps.",
    scenario:
      "A company connects a vendor AI feature, chatbot, model API, SaaS AI assistant, or partner workflow.",
    reviews: [
      "Vendor permissions",
      "OAuth / API scopes",
      "Data flow",
      "Model / provider handling",
      "Retention",
      "Training-use claims",
      "Tenant boundaries",
      "Audit logs",
      "Offboarding",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Overbroad OAuth scopes",
      "Private notes in summaries",
      "Vendor evidence gaps",
      "Indirect prompt injection",
      "Incomplete AI logs",
    ],
    customerReceives: [
      "Vendor integration map",
      "Data-flow matrix",
      "Evidence gap register",
      "Vendor question package",
      "Findings",
      "Retest plan",
    ],
    decisionSupported:
      "Whether to approve sandbox, limited pilot, restricted-data use, or block production rollout.",
  },
  {
    id: "executive-employee-copilot",
    number: 6,
    title: "Executive / Employee Copilot",
    category: "Internal AI",
    project: "Athena + Achilles",
    summary:
      "A copilot helps employees and executives summarize meetings, draft emails, search files, and prepare work.",
    risk: "Can expose overshared files, sensitive meetings, internal drafts, stale policies, or confidential executive context.",
    scenario:
      "An employee or executive copilot searches, summarizes, drafts, prepares briefs, and works across productivity systems.",
    reviews: [
      "File reach",
      "Oversharing",
      "Email / chat summaries",
      "Meetings",
      "Executive briefs",
      "External drafts",
      "Retention",
      "Connectors",
      "Prompt injection",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Overshared executive document surfaced",
      "Executive brief combined sensitive context",
      "Malicious email influenced draft",
      "Stale policy cited",
    ],
    customerReceives: [
      "Copilot reach map",
      "Role matrix",
      "Sensitive-source register",
      "Findings appendix",
      "Evidence pack",
      "Retest plan",
    ],
    decisionSupported:
      "Whether to expand to selected departments, executives, external drafting, or company-wide rollout.",
  },
  {
    id: "developer-ai-assistant",
    number: 7,
    title: "Developer AI Assistant",
    category: "Developer / Data Platforms",
    project: "Athena + Achilles",
    summary:
      "A developer AI assistant writes code, generates tests, explains repositories, reviews pull requests, and supports engineering work.",
    risk: "Can introduce vulnerabilities, weak tests, unsafe dependencies, misleading PR summaries, or agentic code changes.",
    scenario:
      "Developer AI writes code, tests, documentation, pull request summaries, reviews, and agentic repo changes.",
    reviews: [
      "Approved tools",
      "Repo access",
      "Private-code exposure",
      "Prompt retention",
      "Branch protection",
      "Generated code",
      "Generated tests",
      "Dependencies",
      "AI review",
      "Agentic edits",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Generated endpoint misses auth check",
      "Tests miss access-control failure",
      "Repo prompt injection weakens test",
      "AI PR summary hides auth change",
    ],
    customerReceives: [
      "AI coding inventory",
      "SDLC control map",
      "Generated code risk report",
      "Prompt-injection report",
      "Evidence pack",
      "Retest plan",
    ],
    decisionSupported:
      "Whether AI coding stays autocomplete-only, supports tests / docs, or is blocked from production-impacting agentic work.",
  },
  {
    id: "ai-decision-support",
    number: 8,
    title: "AI-Powered Decision Support",
    category: "Regulated Workflows",
    project: "Athena + Achilles",
    summary:
      "An AI system scores, classifies, prioritizes, recommends, or routes cases before a human decision.",
    risk: "Can become the practical decision-maker, hide uncertainty, treat similar cases inconsistently, or trigger unsupported actions.",
    scenario:
      "AI classifies, scores, prioritizes, routes, or recommends next steps before a human decision.",
    reviews: [
      "Decision pathway",
      "Data inputs",
      "Thresholds",
      "Confidence",
      "Human review",
      "Evidence visibility",
      "Consistency",
      "Edge cases",
      "Downstream actions",
      "Audit trail",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "AI score triggers routing",
      "High-confidence unsupported output",
      "Similar cases scored differently",
      "Case note injection changes recommendation",
    ],
    customerReceives: [
      "Decision pathway map",
      "Feature matrix",
      "Recommendation quality report",
      "Human oversight review",
      "Evidence pack",
      "Retest plan",
    ],
    decisionSupported:
      "Whether the AI remains offline, advisory-only, human-reviewed triage, or blocked from high-impact workflows.",
  },
  {
    id: "public-sector-mission",
    number: 9,
    title: "Public Sector / Mission Workflow",
    category: "Public Sector / Mission",
    project: "Athena + Achilles",
    summary:
      "AI supports public-sector, civic, defense-adjacent, emergency, or mission-sensitive workflows.",
    risk: "Can expose restricted records, trust public-input attacks, weaken review, or create official-looking unsupported outputs.",
    scenario:
      "AI supports public-sector, civic, emergency, defense-adjacent, or mission-sensitive work.",
    reviews: [
      "Records access",
      "Role / need-to-know boundaries",
      "Contractor access",
      "SOP grounding",
      "Public-facing language",
      "Mission briefings",
      "Public-input injection",
      "Audit evidence",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Contractor sees restricted notes",
      "Stale SOP used",
      "Public input changes route",
      "Unsupported official language appears in draft",
    ],
    customerReceives: [
      "Workflow map",
      "Records matrix",
      "Role report",
      "Policy grounding report",
      "Mission briefing review",
      "Evidence pack",
      "Retest plan",
    ],
    decisionSupported:
      "Whether AI stays internal draft support, policy search, human-reviewed routing, or blocked from public / mission use.",
  },
  {
    id: "data-platform-cloud",
    number: 10,
    title: "Data Platform / Cloud AI Integration",
    category: "Developer / Data Platforms",
    project: "Athena + Achilles",
    summary:
      "AI connects to cloud systems, warehouses, lakehouses, catalogs, dashboards, logs, vector indexes, and model gateways.",
    risk: "Can bypass permissions, expose sensitive rows or columns, trust poisoned metadata, route data through unapproved models, or export restricted information.",
    scenario:
      "AI connects to cloud systems, data platforms, warehouses, lakehouses, catalogs, dashboards, logs, vector indexes, and model gateways.",
    reviews: [
      "Cloud / data architecture",
      "IAM",
      "Service accounts",
      "Row / column security",
      "Sensitive data",
      "SQL generation",
      "Model routes",
      "Vector permissions",
      "Exports",
      "Audit logs",
    ],
    projectsAssigned: "Athena + Achilles",
    exampleFindings: [
      "Service account bypasses row restrictions",
      "SQL selects restricted columns",
      "Metadata prompt injection influences answer",
      "Fallback model route unclear",
    ],
    customerReceives: [
      "Architecture map",
      "Data reach matrix",
      "Identity report",
      "Model route report",
      "Query / retrieval safety report",
      "Evidence pack",
      "Retest plan",
    ],
    decisionSupported:
      "Whether AI stays sandbox, governed read-only, SQL-enabled, vector-enabled, or blocked from exports / tool actions.",
  },
  {
    id: "ai-vehicle-systems-hermes",
    number: 11,
    title: "AI-Driven Vehicle Systems — Project Hermes",
    category: "Strategic Horizon",
    project: "Hermes",
    status: "Strategic Horizon",
    statusNote:
      "Strategic Horizon / Project Hermes. Not a current public product, and not a safety certification.",
    summary:
      "AI-driven vehicles, autonomous fleets, telematics, OTA / model updates, sensors, perception, and cyber-physical mobility systems.",
    risk: "Can involve sensor disagreement, unsafe planning, model regressions, OTA risk, fleet portal abuse, or weak incident evidence.",
    scenario:
      "AI-driven vehicle, autonomous fleet, telematics, OTA / model update, sensor, perception, and cyber-physical mobility assurance.",
    reviews: [
      "Vehicle AI stack",
      "ODD",
      "Sensor trust",
      "Perception",
      "Prediction",
      "Planning",
      "Fallback",
      "Fleet portal",
      "Vehicle-cloud messages",
      "OTA / model updates",
      "Simulation coverage",
      "Incident evidence",
    ],
    projectsAssigned: "Hermes",
    exampleFindings: [
      "Sensor disagreement does not trigger caution",
      "Model update regresses night cyclist detection",
      "Fleet portal role overpowered",
      "Vehicle-cloud replay risk",
    ],
    customerReceives: [
      "AI Vehicle Assurance Report",
      "Sensor Trust Report",
      "Autonomy Behavior Report",
      "Vehicle Cyber Evidence Pack",
      "Model Update Gate",
      "Scenario Coverage Map",
      "Retest Proof",
    ],
    decisionSupported:
      "Whether the vehicle system remains lab, simulation, closed-course, limited pilot, OTA release, fleet expansion, or return-to-service.",
  },
  {
    id: "quantum-adjacent-rnd",
    number: 12,
    title: "Quantum-Adjacent AI Integration",
    category: "Strategic Horizon",
    project: "Athena + Achilles",
    status: "Strategic R&D",
    statusNote:
      "Strategic R&D scenario. Not a current public product, and not a quantum-safe certification claim.",
    summary:
      "AI supports post-quantum readiness, cryptographic inventory review, vendor quantum-safe evidence review, advanced simulation, or future specialized compute workflows.",
    risk: "Can overstate quantum-safe claims, mishandle cryptographic inventory, confuse algorithms, trust vendor hype, or recommend unsafe migration steps.",
    scenario:
      "AI supports post-quantum readiness, cryptographic inventory review, vendor quantum-safe evidence review, advanced simulation, optimization, research, or future specialized compute workflows.",
    reviews: [
      "Crypto inventory",
      "Vendor claims",
      "Algorithm-purpose correctness",
      "Model routes",
      "Sensitive security data",
      "Human approval",
      "Unknown evidence handling",
      "Interoperability",
      "Prompt injection through vendor documents",
    ],
    projectsAssigned: "Athena + Achilles style R&D",
    exampleFindings: [
      "AI recommends wrong algorithm class",
      "Vendor marked quantum-safe based on marketing",
      "Crypto inventory gaps hidden",
      "Sensitive inventory routed through unapproved model path",
    ],
    customerReceives: [
      "Strategic R&D readiness report",
      "Crypto exposure map",
      "Vendor evidence register",
      "AI recommendation quality report",
      "Model route report",
      "Evidence pack",
      "Vendor questions",
      "Retest plan",
    ],
    decisionSupported:
      "Whether the workflow remains R&D-only, offline inventory review, vendor-question generation, advisory prioritization, or blocked from production crypto changes.",
  },
];
