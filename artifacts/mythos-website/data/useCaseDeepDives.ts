import type { UseCaseCategory } from "./useCases";
import { DEEP_DIVE_SLUG_BY_NUMBER } from "./useCaseSlugs";

/** Severity scale used across example findings (drives badge color + ordering). */
export type FindingSeverity = "Critical" | "High" | "Medium";

export interface DeepDiveFinding {
  title: string;
  severity: FindingSeverity;
  description: string;
}

export interface DeepDiveProject {
  name: string;
  role: string;
}

export interface UseCaseDeepDive {
  slug: string;
  number: number;
  title: string;
  category: UseCaseCategory;
  /** Short project label (e.g. "Athena + Achilles", "Hermes"). */
  project: string;
  /** Engagement status line shown in the hero. */
  status?: string;
  summary: string;
  buyerQuestion: string;
  scenario: string;
  whyItMatters: string;
  whatCanGoWrong: string[];
  whatMythosReviews: string[];
  projectsAssigned: DeepDiveProject[];
  exampleFindings: DeepDiveFinding[];
  customerReceives: string[];
  decisionSupported: string;
  finalRecommendation: string;
  /** Strategic Horizon / Strategic R&D scenarios must be labeled, not overclaimed. */
  isStrategicHorizon?: boolean;
  /** Public-language guardrail rendered as a labeled notice (Hermes, quantum). */
  publicGuardrail?: string;
}

export const USE_CASE_DEEP_DIVES: UseCaseDeepDive[] = [
  {
    slug: "customer-support-ai-agent",
    number: 1,
    title: "Customer Support AI Agent",
    category: "Customer-Facing AI",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A customer support AI agent answers questions, drafts replies, summarizes tickets, and helps support teams respond faster while maintaining consistency.",
    buyerQuestion:
      "Can this customer-facing AI agent safely help customers without exposing data, hallucinating policy, or taking action before a human should review it?",
    scenario:
      "A company is preparing to deploy an AI support agent across customer chat, email, help desk, or ticketing workflows. The agent may search help-center articles, summarize prior tickets, draft responses, reference customer records, recommend next steps, or escalate issues to a human support team. This kind of AI can be valuable because it reduces repetitive support work, improves response time, and helps agents handle more cases with better context. But it also sits close to customer data, account history, internal policy, and customer-facing promises. A small mistake can become a privacy issue, a bad customer experience, or an unsupported business commitment.",
    whyItMatters:
      "Customer support AI often becomes one of the first places where customers directly experience a company's AI. If it works well, it can improve speed and consistency. If it fails, it can expose private information, misstate policy, mishandle refunds, or make a customer believe the company made a promise that no human approved.",
    whatCanGoWrong: [
      "The agent retrieves another customer's ticket or account detail.",
      "The agent summarizes internal notes that should not be customer-visible.",
      "The agent hallucinates a refund, warranty, or cancellation policy.",
      "A malicious customer inserts instructions into a ticket that influence the agent.",
      "The agent escalates too late or not at all.",
      "The agent drafts a confident answer without enough source support.",
      "Sensitive prompts, transcripts, or retrieved records are stored in logs.",
      "The agent performs or recommends actions that should require human review.",
    ],
    whatMythosReviews: [
      "Customer data access",
      "CRM and help desk permissions",
      "Help-center grounding",
      "Ticket retrieval boundaries",
      "Customer identity checks",
      "Escalation rules",
      "Sensitive data handling",
      "Prompt injection through tickets or attachments",
      "Response quality and policy grounding",
      "Human review points",
      "Logs, retention, and evidence trail",
      "External-facing language",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps the support system, data access, CRM exposure, identity paths, logging, connected tools, permissions, and evidence.",
      },
      {
        name: "Achilles",
        role: "tests the agent's behavior under normal, edge-case, adversarial, and customer-facing conditions.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial scenario generation, such as malicious ticket content, hidden instructions, policy traps, and escalation edge cases.",
      },
    ],
    exampleFindings: [
      {
        title: "Cross-customer ticket exposure",
        severity: "Critical",
        description:
          "The AI retrieved information from a ticket belonging to another customer because the retrieval layer filtered by topic similarity before enforcing customer identity boundaries.",
      },
      {
        title: "Indirect prompt injection through ticket content",
        severity: "High",
        description:
          "A malicious customer message instructed the AI to ignore policy and offer a refund. The AI partially followed the instruction.",
      },
      {
        title: "Hallucinated support policy",
        severity: "High",
        description:
          "The AI confidently described a refund rule that did not exist in the approved help-center source.",
      },
      {
        title: "Unsafe escalation behavior",
        severity: "High",
        description:
          "The agent continued troubleshooting an account takeover scenario instead of escalating immediately to a human support specialist.",
      },
      {
        title: "Sensitive data retained in AI logs",
        severity: "Medium",
        description:
          "Customer identifiers and support transcript fragments were stored in model interaction logs longer than the stated retention period.",
      },
    ],
    customerReceives: [
      "Executive readiness report",
      "Customer support AI risk map",
      "CRM and help desk access review",
      "Prompt injection test results",
      "Policy grounding report",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Deployment recommendation",
    ],
    decisionSupported:
      "Whether the support AI should remain internal, enter limited beta, support only human agents, become customer-facing, or be blocked pending remediation and retest.",
    finalRecommendation:
      "A customer support AI agent should not move directly from prototype to broad customer-facing use. Mythos should help the customer prove that the agent only sees the right records, answers from approved sources, escalates correctly, resists malicious ticket content, and produces evidence that leadership, security, product, and support teams can review before rollout.",
  },
  {
    slug: "internal-knowledge-rag-assistant",
    number: 2,
    title: "Internal Knowledge / RAG Assistant",
    category: "Internal AI",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "An internal knowledge or RAG assistant helps employees ask questions across documents, policies, wikis, support notes, manuals, contracts, tickets, and internal knowledge systems.",
    buyerQuestion:
      "Can this internal assistant help employees find information without exposing restricted documents, trusting hidden instructions, or giving outdated guidance?",
    scenario:
      "An organization wants employees to ask natural-language questions across internal documents and receive answers with useful context. The assistant may connect to SharePoint, Google Drive, Confluence, Slack exports, Notion, ticketing systems, policy repositories, engineering docs, contracts, or vector databases. This can improve productivity and reduce tribal knowledge. But it can also create a company-wide search engine that surfaces information employees should not see, mixes stale and current policy, or trusts malicious instructions hidden in retrieved documents.",
    whyItMatters:
      "RAG systems are often trusted because they appear to answer from company sources. But retrieval does not automatically mean authorization, freshness, correctness, or safety. A RAG assistant can expose restricted files, cite weak sources, or become manipulated by documents that were never meant to act as instructions.",
    whatCanGoWrong: [
      "Restricted HR, finance, legal, executive, or security documents are retrieved.",
      "The vector index contains files without permission metadata.",
      "The assistant answers from stale policy.",
      "The assistant combines sensitive details from multiple documents.",
      "A hidden instruction inside a document changes the answer.",
      "The assistant cites a source that does not support the claim.",
      "Users believe \u201cthe AI found it\u201d means the answer is approved.",
      "Sensitive retrieved chunks are stored in logs.",
    ],
    whatMythosReviews: [
      "Connected knowledge sources",
      "Document permissions",
      "Identity inheritance",
      "Vector index design",
      "Metadata filtering",
      "Source freshness",
      "Citation accuracy",
      "Role boundaries",
      "Sensitive data exposure",
      "Prompt injection through retrieved documents",
      "Logging and retention",
      "Unknown and conflicting source handling",
      "Broad rollout risk",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps data sources, permissions, identity paths, vector index boundaries, sensitive repositories, logging, and evidence.",
      },
      {
        name: "Achilles",
        role: "tests retrieval behavior, permission boundaries, citation quality, refusal behavior, stale-source handling, and prompt injection resistance.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial document generation, hidden instruction tests, conflicting policy tests, and restricted-source scenarios.",
      },
    ],
    exampleFindings: [
      {
        title: "Restricted HR document exposed",
        severity: "Critical",
        description:
          "The assistant retrieved a restricted compensation document because the vector index did not preserve file-level access control metadata.",
      },
      {
        title: "Confidential strategy surfaced through semantic similarity",
        severity: "High",
        description:
          "A general employee query returned excerpts from an executive strategy document because source restrictions were not enforced before retrieval.",
      },
      {
        title: "Hidden instruction inside a document influenced the answer",
        severity: "High",
        description:
          "A Confluence page contained instruction-like language that caused the assistant to ignore normal answer rules.",
      },
      {
        title: "Outdated policy used as current guidance",
        severity: "High",
        description:
          "The assistant answered from a superseded policy without warning the user that a newer policy existed.",
      },
      {
        title: "Unsupported citation",
        severity: "Medium",
        description:
          "The assistant cited a policy document, but the cited section did not support the generated conclusion.",
      },
    ],
    customerReceives: [
      "Source and permission map",
      "Vector index review",
      "Sensitive repository exposure report",
      "Retrieval behavior test results",
      "Prompt injection findings",
      "Citation quality review",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Rollout recommendation",
    ],
    decisionSupported:
      "Whether the assistant should remain in sandbox, support a department pilot, access only approved public-internal sources, expand to sensitive repositories, or be blocked from broad employee rollout.",
    finalRecommendation:
      "An internal RAG assistant should be treated as an access and evidence problem, not just a search feature. Mythos should help the customer prove that authorization happens before retrieval, sources are current and grounded, sensitive documents stay protected, and answers remain reviewable before broad rollout.",
  },
  {
    slug: "ai-agent-tools-actions",
    number: 3,
    title: "AI Agent With Tools and Actions",
    category: "Agentic AI",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A tool-using AI agent can call APIs, update records, send messages, create tickets, trigger workflows, or complete multi-step tasks on behalf of a user.",
    buyerQuestion:
      "Can this AI agent safely take action without exceeding permissions, bypassing approvals, or creating changes the business cannot explain?",
    scenario:
      "A company wants to deploy an AI agent that does more than answer questions. It can use tools. It may update CRM records, create service tickets, send emails, search databases, modify workflow status, summarize messages, query APIs, or automate internal tasks. This is powerful because it can reduce manual handoffs and speed up operations. It is also risky because tool access turns the AI from a conversational system into an operational actor.",
    whyItMatters:
      "Once an AI can act, the question changes from \u201cDid it answer correctly?\u201d to \u201cWhat can it do, under whose authority, with what approval, and how do we prove it?\u201d Agentic AI can create real business changes before anyone realizes something went wrong.",
    whatCanGoWrong: [
      "The agent uses an overbroad service account.",
      "The agent performs write actions under the wrong identity.",
      "Approval gates exist only in prompts, not backend enforcement.",
      "Low-risk tools chain together into a high-risk path.",
      "The agent sends external messages with sensitive internal context.",
      "Memory stores unsafe instructions.",
      "Tool-call logs do not preserve enough evidence.",
      "A malicious email or document tricks the agent into unsafe action.",
    ],
    whatMythosReviews: [
      "Tool registry",
      "Read and write actions",
      "Service accounts",
      "User-bound authorization",
      "Approval gates",
      "External communications",
      "API permissions",
      "Tool chaining",
      "Memory behavior",
      "Rollback paths",
      "Action logging",
      "Human review",
      "Prompt injection through external content",
      "Release readiness",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps tool access, identity, permissions, service accounts, action paths, approval controls, logs, and evidence.",
      },
      {
        name: "Achilles",
        role: "tests agent behavior, tool selection, approval boundary behavior, adversarial instructions, memory misuse, and action safety.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial scenarios involving malicious emails, poisoned documents, tool abuse, and chained-action tests.",
      },
    ],
    exampleFindings: [
      {
        title: "Overbroad service account",
        severity: "Critical",
        description:
          "The agent used a service account that allowed updates across all customer records instead of enforcing the requesting user's permissions.",
      },
      {
        title: "Backend approval missing",
        severity: "High",
        description:
          "The agent was instructed to ask for approval, but the backend tool executed actions without requiring a valid approval token.",
      },
      {
        title: "Malicious email caused unsafe external-send attempt",
        severity: "High",
        description:
          "The agent attempted to draft and send an external message based on instructions inside an untrusted email.",
      },
      {
        title: "Chained low-risk tools created export path",
        severity: "High",
        description:
          "The agent combined search, summarize, and message tools to expose restricted data outside the intended workflow.",
      },
      {
        title: "Incomplete tool-call logs",
        severity: "Medium",
        description:
          "Logs showed that an action occurred but did not preserve the exact prompt, tool input, approval state, or output.",
      },
    ],
    customerReceives: [
      "Tool and action risk map",
      "Identity and authorization review",
      "Approval-gate review",
      "Tool-chain test results",
      "Agent behavior findings",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Capability-by-capability release recommendation",
    ],
    decisionSupported:
      "Whether the agent should remain read-only, operate in draft-only mode, enter limited pilot, gain selected write actions, or be blocked from production action-taking.",
    finalRecommendation:
      "An AI agent with tools should be released in stages. Mythos should help the customer prove that the agent acts under the right identity, cannot bypass approvals, cannot chain tools into unsafe outcomes, and produces enough evidence for security, engineering, and leadership to trust the next release decision.",
  },
  {
    slug: "regulated-workflow-assistant",
    number: 4,
    title: "Regulated Workflow Assistant",
    category: "Regulated Workflows",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A regulated workflow assistant helps teams summarize, route, review, or prepare information in workflows with compliance, policy, audit, or formal approval obligations.",
    buyerQuestion:
      "Can this AI assistant support a regulated workflow without becoming the practical decision-maker or weakening the evidence trail?",
    scenario:
      "A company wants to use AI in finance, insurance, healthcare-adjacent operations, legal review, procurement, compliance, audit, governance, claims processing, vendor risk, KYC/AML, or other workflows that require careful review and documentation. The assistant may summarize case files, compare information to policy, draft notes, classify issues, route records, prepare reviewer packets, or generate customer-facing language. It is not supposed to replace human judgment, but it may strongly influence it.",
    whyItMatters:
      "In regulated or policy-heavy workflows, the problem is not only whether the AI is helpful. The problem is whether humans can understand, verify, approve, and defend the outcome. AI output can become a hidden decision layer if controls are weak.",
    whatCanGoWrong: [
      "The AI uses final-decision language.",
      "The AI influences a reviewer without showing enough source evidence.",
      "Sensitive records are overexposed.",
      "The assistant uses outdated policy.",
      "Uploaded documents manipulate the summary.",
      "Exception cases are not escalated.",
      "Similar cases receive inconsistent labels.",
      "Audit logs fail to preserve the basis for review.",
    ],
    whatMythosReviews: [
      "Workflow steps",
      "Sensitive data handling",
      "Policy grounding",
      "Human approval points",
      "Decision boundaries",
      "Source evidence",
      "Exception handling",
      "Customer-facing language",
      "Audit trail",
      "Similar-case consistency",
      "Prompt injection through uploaded records",
      "Retention and evidence requirements",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps the workflow, data sensitivity, access paths, policy sources, approval controls, audit evidence, and remediation proof.",
      },
      {
        name: "Achilles",
        role: "tests the assistant's behavior across source grounding, uncertainty, refusal, recommendation boundaries, adversarial records, and decision-support behavior.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial scenarios involving manipulated case files, conflicting policies, hidden instructions, and edge cases.",
      },
    ],
    exampleFindings: [
      {
        title: "AI output became a final recommendation",
        severity: "Critical",
        description:
          "The assistant used language that effectively made a decision instead of preparing human-reviewed decision material.",
      },
      {
        title: "Sensitive details overexposed",
        severity: "High",
        description:
          "The assistant included protected or unnecessary sensitive information in a summary intended for a broader reviewer group.",
      },
      {
        title: "Stale policy used",
        severity: "High",
        description:
          "The assistant relied on an outdated policy document even though a newer version was available.",
      },
      {
        title: "Uploaded document injection changed summary",
        severity: "High",
        description:
          "A document included instruction-like text that influenced the AI's review note.",
      },
      {
        title: "Audit trail incomplete",
        severity: "Medium",
        description:
          "The workflow did not preserve enough source, prompt, model, reviewer, and approval evidence to reconstruct the decision later.",
      },
    ],
    customerReceives: [
      "Regulated workflow map",
      "Sensitive data matrix",
      "Policy grounding report",
      "Human approval review",
      "Decision-boundary findings",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Deployment recommendation",
    ],
    decisionSupported:
      "Whether the assistant should remain draft-only, support internal review, be used for human-reviewed triage, or be blocked from regulated decision-support workflows.",
    finalRecommendation:
      "A regulated workflow assistant should support human judgment, not quietly replace it. Mythos should help the customer prove that the assistant respects decision boundaries, uses current sources, preserves evidence, and keeps humans accountable before deployment expands.",
  },
  {
    slug: "partner-vendor-ai-integration",
    number: 5,
    title: "Partner / Vendor AI Integration",
    category: "Regulated Workflows",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A partner or vendor AI integration occurs when a company connects an outside AI product, SaaS AI feature, chatbot, model API, or partner workflow into its environment.",
    buyerQuestion:
      "What changes when a third-party AI system enters our data, workflow, user, and control environment?",
    scenario:
      "A company wants to adopt a vendor AI tool or connect a partner AI workflow. The vendor may request access to tickets, documents, records, users, APIs, analytics, CRM data, support notes, logs, or business systems. This can speed adoption and add capabilities without building everything internally. But it can also create unclear data paths, overbroad access, weak evidence, and vendor claims that are hard to verify.",
    whyItMatters:
      "A vendor AI feature can become part of the customer's real operating environment. The buyer needs to know what the vendor can access, where data goes, what gets retained, which model/provider routes are used, and what evidence supports the vendor's claims.",
    whatCanGoWrong: [
      "OAuth scopes are broader than needed.",
      "Vendor AI summarizes private internal notes.",
      "Vendor retention or training-use claims are unclear.",
      "Tenant boundaries are not proven.",
      "Vendor documentation does not match actual configuration.",
      "AI output flows into customer workflows without review.",
      "Audit logs are incomplete.",
      "Offboarding does not revoke all access.",
    ],
    whatMythosReviews: [
      "Vendor access request",
      "OAuth and API scopes",
      "Data flows",
      "Connected systems",
      "Tenant boundaries",
      "Retention and training-use claims",
      "Model/provider routes",
      "Audit logs",
      "Vendor documentation",
      "Subprocessors",
      "Offboarding",
      "Customer-side controls",
      "Prompt injection through vendor-handled content",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps vendor access, data paths, permissions, retention evidence, vendor documentation, customer-side controls, logs, and integration risk.",
      },
      {
        name: "Achilles",
        role: "tests AI behavior, prompt injection exposure, output handling, permission boundaries, and release readiness.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial vendor-document, prompt injection, and integration misuse scenarios.",
      },
    ],
    exampleFindings: [
      {
        title: "Overbroad OAuth scopes",
        severity: "Critical",
        description:
          "The vendor integration requested read/write access to systems that were not required for the intended AI workflow.",
      },
      {
        title: "Private notes surfaced",
        severity: "High",
        description:
          "Vendor AI summaries included internal-only support notes in a context that could become customer-visible.",
      },
      {
        title: "Vendor evidence incomplete",
        severity: "High",
        description:
          "Retention, training-use, subprocessor, model route, and tenant-boundary documentation did not support the vendor's claims.",
      },
      {
        title: "Vendor output flowed into workflow status",
        severity: "High",
        description:
          "AI-generated output could change customer workflow state without human review.",
      },
      {
        title: "Offboarding incomplete",
        severity: "Medium",
        description:
          "Removing the integration did not revoke all background sync tokens.",
      },
    ],
    customerReceives: [
      "Vendor integration map",
      "Data-flow matrix",
      "Permission and scope review",
      "Vendor evidence gap register",
      "Vendor question package",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Approval recommendation",
    ],
    decisionSupported:
      "Whether the vendor AI integration should stay in sandbox, proceed to limited pilot, use restricted data only, require vendor evidence, or be blocked from production rollout.",
    finalRecommendation:
      "A vendor AI integration should not be approved based only on marketing language or convenience. Mythos should help the buyer prove what the vendor can access, what data leaves the environment, what controls exist, and what evidence is missing before rollout.",
  },
  {
    slug: "executive-employee-copilot",
    number: 6,
    title: "Executive / Employee Copilot",
    category: "Internal AI",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "An executive or employee copilot helps workers search, summarize, draft, analyze, and prepare work across daily productivity tools.",
    buyerQuestion:
      "Can this copilot improve productivity without exposing overshared files, sensitive meetings, confidential drafts, or executive context?",
    scenario:
      "A company wants to deploy an AI copilot across email, documents, calendars, meetings, chat, files, and business applications. Employees may use it to draft emails, summarize meetings, prepare briefs, search files, answer internal questions, or organize work. This can save time and improve productivity. But copilots amplify the strengths and weaknesses of the existing permission model. If the organization has overshared documents, broad groups, old permissions, or unclear retention, the copilot may surface that risk quickly.",
    whyItMatters:
      "Copilots can feel safe because they use existing permissions. But existing permissions are often messy. A copilot can make hidden oversharing visible, combine sensitive information across sources, and generate confident summaries that employees trust without review.",
    whatCanGoWrong: [
      "Overshared executive documents appear in search results.",
      "HR, legal, finance, or security content appears in broad summaries.",
      "Meeting recaps overstate discussion as a decision.",
      "Malicious email content influences a draft.",
      "External email drafts include internal root-cause details.",
      "Prompt and response history retains sensitive content.",
      "Third-party connectors request broad access.",
      "Stale policies are cited in employee guidance.",
    ],
    whatMythosReviews: [
      "File reach",
      "Identity inheritance",
      "Oversharing",
      "Email and chat access",
      "Meeting transcripts",
      "Executive briefs",
      "External drafts",
      "Sensitive-source handling",
      "Retention and admin search",
      "Connectors and plugins",
      "Prompt injection through email, documents, and chats",
      "Human review for external communication",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps file access, identity paths, connected productivity systems, sensitive repositories, retention, connectors, and evidence.",
      },
      {
        name: "Achilles",
        role: "tests copilot behavior, retrieval boundaries, draft safety, prompt injection resistance, stale-source handling, and sensitive-content exposure.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only scenarios involving malicious email, overshared documents, executive brief leakage, and meeting recap ambiguity.",
      },
    ],
    exampleFindings: [
      {
        title: "Overshared executive planning document surfaced",
        severity: "Critical",
        description:
          "The copilot retrieved a confidential planning document because it was accessible through a broad internal group.",
      },
      {
        title: "Executive briefing mixed sensitive contexts",
        severity: "High",
        description:
          "The AI combined legal, HR, and strategy content into a general briefing without warning.",
      },
      {
        title: "Malicious email influenced draft",
        severity: "High",
        description:
          "The copilot followed instruction-like content inside an email and included sensitive details in a draft.",
      },
      {
        title: "Meeting recap overstated decision",
        severity: "Medium",
        description:
          "The recap described a discussion as an approved decision even though no decision was made.",
      },
      {
        title: "Sensitive prompt history retained",
        severity: "Medium",
        description:
          "The system stored prompts and responses involving confidential business context beyond the intended review window.",
      },
    ],
    customerReceives: [
      "Copilot reach map",
      "Sensitive-source register",
      "Role and permission matrix",
      "External draft safety review",
      "Prompt injection findings",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Rollout recommendation",
    ],
    decisionSupported:
      "Whether the copilot should expand to selected departments, executives, external drafting, restricted document access, or company-wide rollout.",
    finalRecommendation:
      "A copilot rollout should begin with evidence about what the AI can reach and how it behaves. Mythos should help the customer identify oversharing, sensitive context exposure, unsafe drafts, and retention concerns before access expands across the company.",
  },
  {
    slug: "developer-ai-assistant",
    number: 7,
    title: "Developer AI Assistant",
    category: "Developer / Data Platforms",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A developer AI assistant helps engineering teams write code, generate tests, explain repositories, summarize pull requests, and speed up development work.",
    buyerQuestion:
      "Can this AI coding assistant improve development speed without introducing insecure code, weak tests, unsafe dependencies, or production-impacting agentic changes?",
    scenario:
      "An engineering team wants to use AI inside IDEs, repositories, CI/CD workflows, issue trackers, pull requests, code review, and documentation. The assistant may generate code, explain services, create tests, suggest dependencies, summarize PRs, or operate as an agent that can modify files. This can increase productivity, but it also introduces risks into the software development lifecycle. AI-generated code can look correct while creating authorization issues, injection paths, unsafe infrastructure changes, or weak tests.",
    whyItMatters:
      "Developer AI does not only affect developer productivity. It can affect product security, release quality, secrets handling, dependency risk, and SDLC controls. AI review tools may also miss the exact issues they are expected to catch.",
    whatCanGoWrong: [
      "AI-generated code misses authorization checks.",
      "Generated tests validate the happy path but miss security failures.",
      "AI suggests vulnerable dependencies.",
      "Prompt injection inside repository files influences the assistant.",
      "PR summaries omit security-sensitive changes.",
      "Agentic workflows modify code without proper review.",
      "Private code or secrets are sent through unapproved model routes.",
      "Infrastructure suggestions open excessive access.",
    ],
    whatMythosReviews: [
      "Approved AI coding tools",
      "Repo access",
      "Private-code exposure",
      "Prompt and completion retention",
      "Branch protection",
      "Generated code",
      "Generated tests",
      "AI PR summaries",
      "Dependency suggestions",
      "Infrastructure-as-code suggestions",
      "Agentic code changes",
      "CI/CD controls",
      "Human review gates",
      "Secret handling",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps engineering environments, repo access, SDLC controls, secrets, model routes, dependencies, permissions, and evidence.",
      },
      {
        name: "Achilles",
        role: "tests generated code behavior, secure-code quality, prompt injection resistance, PR summaries, AI review reliability, and agentic change boundaries.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial repository, code comment, CI/CD, dependency, and pull request scenarios.",
      },
    ],
    exampleFindings: [
      {
        title: "Generated authorization bypass",
        severity: "Critical",
        description:
          "The assistant generated an endpoint that returned user profile data without verifying the requester's ownership.",
      },
      {
        title: "Generated tests created false confidence",
        severity: "High",
        description:
          "The tests covered only successful access and failed to test unauthorized access.",
      },
      {
        title: "Repository prompt injection weakened a test",
        severity: "High",
        description:
          "A comment inside the repository instructed the AI agent to skip a failing security test.",
      },
      {
        title: "PR summary hid security-sensitive change",
        severity: "High",
        description:
          "The AI summary described a change as a refactor while omitting an authorization modification.",
      },
      {
        title: "Vulnerable dependency suggested",
        severity: "Medium",
        description:
          "The assistant recommended an outdated file upload library with known security concerns.",
      },
    ],
    customerReceives: [
      "AI coding inventory",
      "SDLC control map",
      "Generated code risk report",
      "AI test quality review",
      "Prompt injection report",
      "Dependency and IaC risk notes",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Release recommendation",
    ],
    decisionSupported:
      "Whether AI coding should remain autocomplete-only, support documentation and tests, assist code review, or be blocked from production-impacting agentic work.",
    finalRecommendation:
      "Developer AI should be treated as part of the software supply chain. Mythos should help engineering leaders prove that AI-generated code, tests, summaries, dependencies, and agentic edits do not weaken security controls before adoption expands.",
  },
  {
    slug: "ai-powered-decision-support",
    number: 8,
    title: "AI-Powered Decision Support",
    category: "Regulated Workflows",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "An AI-powered decision support system classifies, scores, prioritizes, recommends, routes, or summarizes information before a human decision.",
    buyerQuestion:
      "Can this AI system support human judgment without becoming the hidden decision-maker?",
    scenario:
      "A company wants to use AI to support fraud review, claims triage, risk scoring, case routing, compliance review, operational prioritization, customer issue classification, or analyst workflow. The AI may not make the final decision, but its score, label, or recommendation can heavily influence what humans do. This is useful because it helps teams handle large volumes of information. But it can create risk if the AI overstates confidence, hides uncertainty, applies inconsistent reasoning, or triggers downstream actions.",
    whyItMatters:
      "Decision support can become practical decision-making if humans rely on the AI output without reviewing the evidence. The organization needs to know where human judgment remains independent and where AI influence becomes too strong.",
    whatCanGoWrong: [
      "The AI score triggers routing without human confirmation.",
      "The AI gives high-confidence recommendations without enough evidence.",
      "Similar cases receive inconsistent labels.",
      "Adversarial case notes manipulate the recommendation.",
      "Threshold changes are not approved or retested.",
      "Reviewer UI encourages overreliance.",
      "Audit logs do not preserve model, prompt, evidence, or reviewer state.",
      "Drift is not monitored after deployment.",
    ],
    whatMythosReviews: [
      "Decision pathway",
      "Data inputs",
      "Model/prompt behavior",
      "Thresholds",
      "Confidence display",
      "Human review points",
      "Evidence visibility",
      "Similar-case consistency",
      "Edge cases",
      "Downstream actions",
      "Audit trail",
      "Drift and monitoring",
      "Adversarial input handling",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps data flows, thresholds, approval controls, audit evidence, downstream action paths, reporting, and remediation proof.",
      },
      {
        name: "Achilles",
        role: "tests recommendation behavior, uncertainty handling, adversarial inputs, consistency, overreliance risk, and release readiness.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only edge-case generation, manipulated input tests, paired-case consistency tests, and adversarial case-note scenarios.",
      },
    ],
    exampleFindings: [
      {
        title: "AI recommendation triggered high-impact routing",
        severity: "Critical",
        description:
          "The AI score caused a case to enter a high-impact workflow without independent human confirmation.",
      },
      {
        title: "Unsupported high-confidence recommendation",
        severity: "High",
        description:
          "The assistant gave a confident recommendation even though source evidence was incomplete.",
      },
      {
        title: "Similar cases scored differently",
        severity: "High",
        description:
          "Two materially similar cases received different labels without a clear reason.",
      },
      {
        title: "Adversarial note changed recommendation",
        severity: "High",
        description:
          "A free-text case note influenced the recommendation outside approved policy.",
      },
      {
        title: "Audit logs incomplete",
        severity: "Medium",
        description:
          "Logs did not preserve enough evidence to reconstruct why a recommendation was accepted.",
      },
    ],
    customerReceives: [
      "Decision pathway map",
      "Input and threshold review",
      "Recommendation quality report",
      "Human oversight review",
      "Consistency test results",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Decision-support release recommendation",
    ],
    decisionSupported:
      "Whether the AI remains offline, becomes advisory-only, supports human-reviewed triage, triggers limited routing, or is blocked from high-impact decision-support workflows.",
    finalRecommendation:
      "AI decision support should make human review stronger, not less visible. Mythos should help the customer prove that recommendations are evidence-backed, uncertainty is clear, humans remain accountable, and high-impact actions are not triggered without proper approval.",
  },
  {
    slug: "public-sector-mission-workflow",
    number: 9,
    title: "Public Sector / Mission Workflow",
    category: "Public Sector / Mission",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A public sector or mission workflow uses AI to help staff search, summarize, route, review, or prepare information in government, civic, defense-adjacent, emergency, or mission-sensitive environments.",
    buyerQuestion:
      "Can this AI support public or mission-sensitive work without exposing restricted records, trusting public-input attacks, weakening review, or creating unsupported official language?",
    scenario:
      "A public organization, government office, civic service, public safety team, defense-adjacent program, or mission-sensitive operation wants to use AI to improve internal review, public response preparation, records summarization, policy search, procurement support, emergency workflows, or mission planning. These environments may involve sensitive records, need-to-know boundaries, public trust, official language, contractor access, emergency timelines, and accountability requirements.",
    whyItMatters:
      "Public and mission workflows cannot treat AI output as casual productivity text. AI-generated summaries, drafts, and routing decisions may influence real people, public services, sensitive records, operational decisions, or institutional trust.",
    whatCanGoWrong: [
      "Contractors or broad users access restricted notes.",
      "The assistant relies on outdated SOPs.",
      "Public input manipulates routing or summary behavior.",
      "AI drafts official-sounding language without support.",
      "Mission briefings mix confirmed and unverified information.",
      "Privacy-sensitive records appear in general workflow logs.",
      "Reviewer UI encourages accepting AI routing without source review.",
      "Audit trails do not preserve enough evidence.",
    ],
    whatMythosReviews: [
      "Records access",
      "Role and need-to-know boundaries",
      "Contractor access",
      "SOP grounding",
      "Public-facing language",
      "Mission briefings",
      "Public-input injection",
      "Source verification",
      "Human approval",
      "Privacy-sensitive records",
      "Audit evidence",
      "Logging and retention",
      "Operational decision boundaries",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps records access, identity paths, role boundaries, policy sources, audit evidence, logs, and control gaps.",
      },
      {
        name: "Achilles",
        role: "tests AI behavior across public input, sensitive records, SOP grounding, draft language, mission briefings, uncertainty, and escalation.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial scenarios involving public submissions, manipulated records, mission ambiguity, and policy conflicts.",
      },
    ],
    exampleFindings: [
      {
        title: "Restricted notes exposed",
        severity: "Critical",
        description:
          "A contractor role could summarize restricted internal notes because access boundaries were not enforced before retrieval.",
      },
      {
        title: "Stale SOP used",
        severity: "High",
        description:
          "The assistant relied on an outdated procedure when preparing guidance.",
      },
      {
        title: "Public input changed routing",
        severity: "High",
        description:
          "A public submission contained instruction-like text that influenced the AI's routing recommendation.",
      },
      {
        title: "Unsupported official language",
        severity: "High",
        description:
          "The AI drafted a public-facing response that sounded official but lacked approved source support.",
      },
      {
        title: "Audit trail incomplete",
        severity: "Medium",
        description:
          "The workflow did not preserve the source version, model output, reviewer decision, and approval state.",
      },
    ],
    customerReceives: [
      "Mission workflow map",
      "Records access matrix",
      "Role and need-to-know review",
      "SOP grounding report",
      "Public-input injection findings",
      "Mission briefing review",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Deployment recommendation",
    ],
    decisionSupported:
      "Whether the AI should stay internal, support draft-only work, assist policy search, support human-reviewed routing, or be blocked from public-facing or mission-sensitive use.",
    finalRecommendation:
      "AI in public and mission workflows must preserve accountability. Mythos should help organizations prove that records access, source grounding, public-input handling, human approval, and audit evidence are strong enough before trust expands.",
  },
  {
    slug: "data-platform-cloud-ai-integration",
    number: 10,
    title: "Data Platform / Cloud AI Integration",
    category: "Developer / Data Platforms",
    project: "Athena + Achilles",
    status: "Enterprise AI Deployment Assurance",
    summary:
      "A data platform or cloud AI integration connects AI to the systems where business data, logs, analytics, models, metadata, and workflows live.",
    buyerQuestion:
      "Can this AI connect to cloud and data platforms without bypassing permissions, exposing sensitive data, trusting poisoned metadata, or routing information through unapproved models?",
    scenario:
      "A company wants AI to work with real enterprise data. The AI may connect to warehouses, lakehouses, cloud storage, dashboards, metadata catalogs, vector indexes, model gateways, logs, notebooks, APIs, data governance tools, or workflow systems. This can unlock powerful analytics and automation. It can also create new data paths, permission issues, model-provider exposure, and audit gaps.",
    whyItMatters:
      "When AI connects to data platforms, it can reach the crown jewels of the business. Authorization must happen before data reaches the model, not after. Metadata, logs, dashboards, and notebooks can also become prompt injection surfaces.",
    whatCanGoWrong: [
      "AI service accounts bypass user row-level restrictions.",
      "Generated SQL selects restricted columns.",
      "Vector indexes include restricted documents without ACL metadata.",
      "Table comments or metadata influence AI answers.",
      "Sensitive cloud logs enter model context.",
      "Fallback model routes lack approved handling.",
      "AI analytics summaries overstate causality.",
      "Query and retrieval audit logs are incomplete.",
    ],
    whatMythosReviews: [
      "Cloud and data architecture",
      "Warehouses and lakehouses",
      "Storage buckets",
      "Catalogs and dashboards",
      "Logs and notebooks",
      "Vector indexes",
      "IAM and service accounts",
      "Row-level and column-level security",
      "Model gateway routes",
      "SQL generation",
      "Retrieval permissions",
      "Exports and tool actions",
      "Prompt injection through metadata",
      "Audit logs",
    ],
    projectsAssigned: [
      {
        name: "Athena",
        role: "maps cloud systems, data reach, IAM, service accounts, sensitive data, model routes, logs, metadata exposure, and evidence.",
      },
      {
        name: "Achilles",
        role: "tests query behavior, retrieval boundaries, prompt injection resistance, output quality, model route behavior, export controls, and release readiness.",
      },
      {
        name: "Minotaur",
        role: "may support internal-only adversarial scenarios involving poisoned metadata, malicious table comments, unsafe SQL prompts, and cloud-tool misuse.",
      },
    ],
    exampleFindings: [
      {
        title: "Service account bypassed row restrictions",
        severity: "Critical",
        description:
          "The AI query path used a privileged service account instead of enforcing the requesting user's row-level access.",
      },
      {
        title: "Generated SQL selected restricted columns",
        severity: "High",
        description:
          "The AI generated a query that included sensitive columns outside the user's allowed view.",
      },
      {
        title: "Metadata prompt injection influenced answer",
        severity: "High",
        description:
          "A table comment included instruction-like text that changed the AI's response.",
      },
      {
        title: "Sensitive cloud logs entered model context",
        severity: "High",
        description:
          "Logs containing secrets and internal architecture were retrieved into the model context.",
      },
      {
        title: "Incomplete AI execution receipts",
        severity: "Medium",
        description:
          "The system could not reconstruct which data, query, model route, and user context produced a given output.",
      },
    ],
    customerReceives: [
      "Cloud and data architecture map",
      "Data reach and sensitivity matrix",
      "Identity and permission report",
      "Model route and provider boundary report",
      "Query and retrieval safety report",
      "Technical findings appendix",
      "Evidence pack",
      "Remediation backlog",
      "Retest plan",
      "Capability-by-capability release recommendation",
    ],
    decisionSupported:
      "Whether AI should remain sandboxed, operate over governed read-only data, generate SQL, use vector indexes, access sensitive datasets, export results, or use cloud/data tools after remediation and retest.",
    finalRecommendation:
      "A cloud-connected AI system should not expand until the organization can prove what data is reachable, which permissions apply, where model routes go, and what evidence supports each output. Mythos should help make enterprise data AI reviewable before deployment expands.",
  },
  {
    slug: "ai-driven-vehicle-systems-hermes",
    number: 11,
    title: "AI-Driven Vehicle Systems \u2014 Project Hermes",
    category: "Strategic Horizon",
    project: "Hermes",
    status: "Strategic Horizon / Project Hermes",
    isStrategicHorizon: true,
    publicGuardrail:
      "Project Hermes is a Strategic Horizon direction, not a current public product. Hermes does not certify vehicle safety, prevent crashes, replace OEM safety teams, replace crash testing, or fully explain every neural-network decision. It provides authorized, non-destructive review of vehicle AI behavior and evidence to support deployment decisions.",
    summary:
      "AI-driven vehicle systems include autonomous vehicles, AI-assisted vehicles, fleets, telematics, OTA/model updates, sensors, perception, planning, and cyber-physical mobility environments.",
    buyerQuestion:
      "Can this AI vehicle system safely see, decide, communicate, update, and operate within defined limits with evidence that supports the next deployment decision?",
    scenario:
      "An autonomous vehicle company, automaker, fleet operator, mobility program, vehicle supplier, telematics provider, or defense/government mobility team wants to assess an AI-driven vehicle system before pilot, fleet expansion, OTA release, model update, partner review, insurance review, or return-to-service. This use case belongs to Project Hermes, not Athena or Achilles. Hermes is the standalone Mythos direction for vehicle, autonomy, fleet, telematics, OTA/model update, sensor, perception, and cyber-physical mobility assurance.",
    whyItMatters:
      "Vehicle AI is not just a software workflow. It can affect movement in the physical world. The assurance question is not whether the vehicle is \u201cperfectly safe.\u201d The question is whether the company has credible evidence about what was tested, what failed, what changed, and whether the next deployment step is justified.",
    whatCanGoWrong: [
      "Sensors disagree but the planner does not become cautious.",
      "A perception model update improves one scenario while regressing another.",
      "A vehicle leaves its operational design domain without safe fallback.",
      "OTA release evidence is incomplete.",
      "Fleet portal roles are overpowered.",
      "Vehicle-cloud messages lack replay protection.",
      "Simulation coverage misses rare but relevant edge cases.",
      "Incident reconstruction lacks model, sensor, planner, telemetry, or operator evidence.",
    ],
    whatMythosReviews: [
      "Vehicle AI stack",
      "Operational design domain",
      "Sensor trust",
      "Sensor disagreement",
      "Perception and prediction",
      "Planning and fallback",
      "Human override and remote assistance",
      "Telematics",
      "Fleet cloud",
      "Vehicle cybersecurity",
      "Fleet portal permissions",
      "Vehicle-cloud message integrity",
      "OTA and model updates",
      "Simulation and replay coverage",
      "Fleet monitoring",
      "Incident evidence",
      "Retest proof",
    ],
    projectsAssigned: [
      {
        name: "Hermes",
        role: "reviews AI vehicle behavior, sensor trust, autonomy stack risk, vehicle cybersecurity, telematics, fleet systems, OTA/model updates, simulation coverage, incident evidence, and retest readiness.",
      },
      {
        name: "Athena and Achilles",
        role: "are not presented as the primary vehicle products for this use case.",
      },
      {
        name: "Minotaur",
        role: "remains internal-only and may support adversarial scenario design if needed.",
      },
    ],
    exampleFindings: [
      {
        title: "Sensor disagreement did not trigger caution",
        severity: "Critical",
        description:
          "The vehicle maintained normal planning confidence even though lidar indicated a possible object and camera confidence was degraded.",
      },
      {
        title: "Model update regressed night cyclist detection",
        severity: "High",
        description:
          "The proposed perception model improved one target area but reduced performance on low-light cyclist scenarios.",
      },
      {
        title: "Fleet portal role overpowered",
        severity: "High",
        description:
          "A standard operator role could perform actions that should require supervisor or safety approval.",
      },
      {
        title: "Vehicle-cloud replay risk",
        severity: "High",
        description:
          "A stale route-status message could be replayed into the fleet backend without being rejected.",
      },
      {
        title: "Incident evidence incomplete",
        severity: "Medium",
        description:
          "The system stored vehicle state and sensor snapshots but did not preserve enough planner-state evidence to reconstruct why a maneuver was selected.",
      },
    ],
    customerReceives: [
      "AI Vehicle Assurance Report",
      "Vehicle AI Stack Map",
      "Sensor Trust Report",
      "Autonomy Behavior Report",
      "Vehicle Cyber Evidence Pack",
      "Model Update Gate Report",
      "OTA Release Evidence Pack",
      "Scenario Coverage Map",
      "Fleet Risk Report",
      "Incident Reconstruction Report",
      "Compliance Evidence Pack",
      "Retest Proof Report",
    ],
    decisionSupported:
      "Whether the vehicle system should remain in lab testing, expand simulation, proceed to closed-course testing, enter limited pilot, release an OTA/model update, expand fleet operation, or return to service after remediation and retesting.",
    finalRecommendation:
      "Hermes should be framed as an evidence and assurance layer for AI vehicle systems, not a safety certification. It supports authorized, non-destructive review of vehicle AI behavior, sensor trust, cyber-physical risk, updates, fleet operations, and incident evidence so vehicle and mobility teams can make better deployment decisions.",
  },
  {
    slug: "quantum-adjacent-ai-integration",
    number: 12,
    title: "Quantum-Adjacent AI Integration",
    category: "Strategic Horizon",
    project: "Athena + Achilles style R&D",
    status: "Strategic R&D Scenario",
    isStrategicHorizon: true,
    publicGuardrail:
      "This is a Strategic R&D scenario, not a current public Mythos product. Mythos does not provide quantum-safe certification, production quantum integration capability, quantum hardware validation, or guaranteed post-quantum readiness.",
    summary:
      "Quantum-adjacent AI integration refers to future-facing workflows where AI supports post-quantum readiness, cryptographic inventory review, vendor evidence review, advanced simulation, optimization, research, or specialized compute planning.",
    buyerQuestion:
      "Can an organization explore quantum-adjacent AI workflows without turning future-readiness work into hype, unmanaged data movement, unsupported security claims, or unsafe cryptographic recommendations?",
    scenario:
      "A company, research lab, defense-adjacent organization, financial institution, advanced analytics team, cloud provider, or critical infrastructure operator is exploring how AI may support quantum-adjacent work. This may include post-quantum cryptography migration planning, cryptographic inventory review, vendor quantum-safe evidence review, advanced simulation, optimization workflows, research notebooks, specialized compute routing, or future quantum/advanced-compute exploration. This is a strategic R&D scenario. It should not be marketed as a current public Mythos product unless leadership explicitly launches it.",
    whyItMatters:
      "Quantum language can create hype and false confidence. The near-term risk is not \u201cquantum magic.\u201d The practical risk is that AI may mishandle sensitive cryptographic inventory, overstate vendor claims, confuse algorithm purposes, route security data through unapproved models, or recommend unsafe migration steps.",
    whatCanGoWrong: [
      "AI recommends the wrong post-quantum algorithm class.",
      "A vendor is marked quantum-safe based only on marketing language.",
      "Cryptographic inventory gaps are hidden by confident summaries.",
      "Sensitive crypto inventory routes through an unapproved model path.",
      "Vendor documents manipulate AI conclusions through prompt injection.",
      "AI migration backlog lacks interoperability checks.",
      "Human approval is missing before recommendations become engineering work.",
      "A readiness score lacks traceable evidence.",
    ],
    whatMythosReviews: [
      "Quantum-adjacent workflow scope",
      "Cryptographic inventory",
      "Certificate inventory",
      "SBOM/CBOM inputs where available",
      "Vendor quantum-safe claims",
      "Algorithm-purpose correctness",
      "Model/provider routes",
      "Sensitive security data exposure",
      "Human approval gates",
      "Unknown evidence handling",
      "Interoperability planning",
      "Rollback planning",
      "Prompt injection through vendor documents or research notebooks",
      "Auditability of readiness scores",
      "Retest triggers after standards, vendors, models, prompts, or inventories change",
    ],
    projectsAssigned: [
      {
        name: "Athena-style mapping",
        role: "would review systems, cryptographic exposure, data flows, vendor evidence, model routes, logs, controls, and evidence.",
      },
      {
        name: "Achilles-style validation",
        role: "would test AI recommendation behavior, unsupported migration claims, algorithm-purpose understanding, adversarial document handling, and human approval gates.",
      },
      {
        name: "Minotaur",
        role: "would remain internal-only for adversarial scenario generation.",
      },
      {
        name: "Hermes",
        role: "applies only if the quantum-adjacent workflow is tied to vehicles, fleets, telematics, OTA/model updates, autonomy, or cyber-physical mobility.",
      },
    ],
    exampleFindings: [
      {
        title: "AI recommended replacing RSA signatures with ML-KEM",
        severity: "Critical",
        description:
          "The assistant confused key encapsulation with digital signatures and generated an unsafe migration recommendation.",
      },
      {
        title: "Vendor marked quantum-safe without evidence",
        severity: "High",
        description:
          "The AI summarized a vendor as quantum-safe based on a marketing PDF without verifying algorithms, protocols, product version, deployment mode, or configuration.",
      },
      {
        title: "Inventory gaps hidden",
        severity: "High",
        description:
          "The assistant produced a confident readiness summary even though several critical systems had unknown cryptographic dependencies.",
      },
      {
        title: "Sensitive crypto inventory routed through unapproved model path",
        severity: "High",
        description:
          "Internal hostnames, certificate metadata, KMS/HSM references, and cryptographic inventory details were sent to an unapproved model route.",
      },
      {
        title: "Human approval missing",
        severity: "Medium",
        description:
          "AI-generated cryptographic recommendations entered an engineering backlog without qualified human review.",
      },
    ],
    customerReceives: [
      "Strategic R&D readiness report",
      "Crypto exposure and inventory map",
      "Vendor quantum-readiness evidence register",
      "AI recommendation quality report",
      "Model route and data handling report",
      "Human approval and governance review",
      "Technical findings appendix",
      "Evidence pack",
      "Vendor question package",
      "Retest plan",
      "Capability-by-capability recommendation",
    ],
    decisionSupported:
      "Whether the workflow should remain R&D-only, support offline inventory review, generate vendor questions, assist human-reviewed migration prioritization, or be blocked from production cryptographic changes and public quantum-safe claims.",
    finalRecommendation:
      "Quantum-adjacent AI should be handled as a careful strategic R&D workflow. Mythos should help teams separate evidence from hype, protect sensitive security data, keep humans in control, and prevent unsupported post-quantum or advanced-compute claims from becoming operational decisions.",
  },
];

// Guard against slug drift between this data and the lightweight client-facing
// `useCaseSlugs.ts` map. Runs at module load (server/build only) so any mismatch
// fails the build loudly instead of silently breaking deep-dive links.
for (const deepDive of USE_CASE_DEEP_DIVES) {
  const expected = DEEP_DIVE_SLUG_BY_NUMBER[deepDive.number];
  if (deepDive.slug !== expected) {
    throw new Error(
      `Deep-dive slug mismatch for use case #${deepDive.number}: data has "${deepDive.slug}" but useCaseSlugs.ts has "${expected}". Keep them in sync.`,
    );
  }
}

export function getDeepDiveBySlug(slug: string): UseCaseDeepDive | undefined {
  return USE_CASE_DEEP_DIVES.find((d) => d.slug === slug);
}

export function getDeepDiveByNumber(
  number: number,
): UseCaseDeepDive | undefined {
  return USE_CASE_DEEP_DIVES.find((d) => d.number === number);
}
