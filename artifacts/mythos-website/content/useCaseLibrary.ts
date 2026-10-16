/**
 * Use-case library (Launch Guide §10), rewritten 16 Oct against the use-case
 * fact-check (factcheck3/use-cases.md). Rules applied on every page:
 *
 * - Every finding, claim and receipt is synthetic and labelled so; no
 *   customer, pilot or design partner exists.
 * - Mythos tests the customer's controls; it never enforces them (the Action
 *   Gate is not built). No answer-quality, bias or code-quality testing.
 * - Effective access is computed from the access configuration supplied;
 *   cloud, identity and repository connectors need customer credentials.
 * - No live monitoring: change-triggered reassessment works on supplied
 *   changes and scans. Receipts are hashed, not signed.
 * - UC11 (Hermes) and UC12 (quantum) are strategic-horizon pages: research
 *   framing only, gated by hermes.publication-scope / usecases.quantum-horizon.
 */
import type { UseCaseContent } from "@/components/use-cases/types";
import { OLYMPUS_MEDIA } from "@/content/media";

const LEDE =
  "Mythos evaluates the authorized scope, actual pathways and relevant behaviors of this AI workflow, then records what was observed, what remains uncertain and what should be retested when the system changes.";

const sun = { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen" as const, opacity: 0.45, position: "100% 0%", depth: 10 };
const scene = (src: string, position: string) => [{ src, className: "-inset-[3%]", position, depth: 6, priority: true }, sun];

const RECEIPT_FOOTER =
  "Synthetic receipt for illustration. Receipts are hashed so later changes are detectable; signing is planned. A receipt shows where a result came from — not that the conclusion is true.";

export const USE_CASES: UseCaseContent[] = [
  {
    slug: "customer-support-ai-agent",
    number: 1,
    title: "Customer Support AI Agent",
    metaDescription:
      "Can a support agent reach only the customer records and actions it is authorized to use? How Mythos maps, tests and keeps evidence for customer-facing support AI.",
    question: "Can a support agent reach only the customer records and *actions it is authorized to use?*",
    lede: LEDE,
    image: "/assets/athena/athena-identity.webp",
    planes: scene("/assets/industries/technology-ai-saas-hero.webp", "65% 40%"),
    facets: { industry: ["financial-services-insurance", "ai-saas"], product: ["Athena", "Achilles", "SPINE"], risk: ["Data exposure", "Untrusted content", "Tool & action authority"] },
    workflow: {
      title: "A support agent with *a refund button.*",
      lede: "The agent reads tickets and account history, drafts replies and can issue small credits — the point where a conversation becomes an effect.",
      steps: [
        { kind: "person", name: "Customer", detail: "Opens a ticket, sometimes with attachments." },
        { kind: "ai", name: "Support agent", detail: "Reads the ticket, retrieves history, drafts a reply." },
        { kind: "data", name: "Customer records", detail: "Account history, prior tickets, internal notes." },
        { kind: "tool", name: "Credits & escalation", detail: "Issue a small credit, or hand off to a person." },
        { kind: "effect", name: "Money and promises", detail: "A credit lands; a commitment is made in the company’s name." },
      ],
      boundaryBefore: 3,
      boundaryLabel: "Where authority must hold",
    },
    wrong: {
      title: "Where support AI *goes wrong.*",
      lede: "Failure classes from public incidents and research — described generally, never as a recipe.",
      items: [
        { name: "Another customer’s record", body: "Retrieval returns a ticket or account detail without checking who owns it." },
        { name: "Ticket text as instructions", body: "Words inside a ticket or attachment steer the agent away from policy." },
        { name: "Credits that add up", body: "Many small credits, each under the limit, exceed it together." },
        { name: "Approval not tied to the action", body: "A person approves one amount or recipient; something different executes." },
        { name: "Retries and duplicates", body: "An uncertain outcome is retried and the effect happens twice." },
        { name: "Transcripts in the wrong place", body: "Ticket content and identifiers end up in logs and telemetry." },
      ],
    },
    approach: {
      title: "Map it, push it, *keep it current.*",
      lede: "Run in a test tenant with synthetic records. Mythos tests your controls — it does not enforce them.",
      athena: ["Which records, notes and tools the agent can reach, computed from the access configuration you supply", "Where ticket content travels, including logs", "Findings mapped to OWASP Top 10 for LLM applications"],
      achilles: ["Cross-customer access attempts against the retrieval path", "Instructions hidden in ticket content", "Tool misuse and permission boundaries around credits"],
      spine: ["Each conclusion tied to the configuration it was true of", "Reopened when a role widens, a tool is added or the refund policy changes", "Unknowns recorded, never counted as passes"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example of the claims an engagement would record.",
      receipt: {
        kind: "Assurance Receipt · synthetic",
        title: "Agent reads only the requesting customer’s records",
        rows: [
          { field: "Result", value: "Contradicted, then verified after fix", tone: "verified" },
          { field: "Subject", value: "Support agent · test tenant" },
          { field: "Evaluator", value: "Achilles · permission boundary" },
          { field: "Configuration", value: "sha256:4b1e…09c2 (synthetic)" },
          { field: "Policy version", value: "support-policy v12" },
          { field: "Reopens when", value: "CRM role or retrieval filter changes" },
          { field: "Evidence root", value: "sha256:a77d…5f10 (synthetic)" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "Retrieval is filtered by customer before ranking", state: "contradicted", label: "Finding", note: "A second customer’s note was returned in testing; fixed and retested." },
        { claim: "Credits above the limit go to a person", state: "verified", note: "Held under the scenarios tested, including split requests." },
        { claim: "Ticket attachments cannot change the refund rule", state: "observed", note: "Observed for the attachment types in scope; others untested." },
        { claim: "Escalation happens before account changes", state: "unknown", note: "No test in scope covered it — recorded as an open question." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Answer quality and tone are not certified.",
        "Effective access reflects the access configuration supplied, not live crawling of your CRM.",
        "Testing runs on test tenants and synthetic records.",
        "A chatbot with no material actions may not need this depth — start where money or data moves.",
      ],
    },
    industries: ["financial-services-insurance", "ai-saas"],
  },
  {
    slug: "internal-knowledge-rag-assistant",
    number: 2,
    title: "Internal Knowledge / RAG Assistant",
    metaDescription:
      "Will an internal assistant respect source permissions when retrieval results and prompts are combined? How Mythos tests retrieval boundaries and keeps the evidence current.",
    question: "Will an internal assistant respect source permissions when *retrieval and prompts combine?*",
    lede: LEDE,
    image: "/assets/athena/athena-data-lifecycle.webp",
    planes: scene(OLYMPUS_MEDIA.marbleCity.src, "75% 40%"),
    facets: { industry: ["regulated-enterprise", "healthcare-life-sciences", "public-sector-mission"], product: ["Athena", "Achilles", "SPINE"], risk: ["Data exposure", "Untrusted content", "Change & stale evidence"] },
    workflow: {
      title: "One question, *many sources.*",
      lede: "The assistant searches documents an employee may or may not be entitled to, and writes an answer that blends them.",
      steps: [
        { kind: "person", name: "Employee", detail: "Asks a question in plain language." },
        { kind: "ai", name: "Assistant", detail: "Retrieves passages and writes an answer." },
        { kind: "data", name: "Document sources", detail: "Policies, wikis, shared folders, search indexes." },
        { kind: "effect", name: "An answer", detail: "Sometimes quoting material the asker should never see." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Source permissions",
    },
    wrong: {
      title: "Where retrieval *leaks.*",
      lede: "Failure classes from research and public incidents.",
      items: [
        { name: "Outside the asker’s access", body: "Retrieval returns passages from documents the user cannot open." },
        { name: "Retrieved text as authority", body: "Instructions inside a document change what the assistant does." },
        { name: "Harmless parts, sensitive whole", body: "Answers combine details that are sensitive only together." },
        { name: "Deleted, but still there", body: "Removed content survives in summaries, caches or indexes." },
        { name: "Yesterday’s policy", body: "An answer quotes a superseded version as if it were current." },
        { name: "A new source, quietly", body: "Adding an index changes who can learn what — without review." },
      ],
    },
    approach: {
      title: "Test the boundary *where it matters.*",
      lede: "Against the sources, identities and permission data in scope.",
      athena: ["Which indexes and stores the assistant reads, including unmanaged ones", "Data boundaries and where retrieved text is logged", "Lineage at the level of data categories and components"],
      achilles: ["Whether retrieval honors source permissions for different users", "Instructions planted in retrieved documents", "Answers that assemble restricted facts"],
      spine: ["Claims tied to the source list and permission data they were tested against", "A new retrieval source reopens the access claims", "Stale-policy questions recorded as unknowns until tested"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Assurance Receipt · synthetic",
        title: "Answers honor the asker’s document permissions",
        rows: [
          { field: "Result", value: "Verified for sources in scope", tone: "verified" },
          { field: "Subject", value: "Internal assistant · staging" },
          { field: "Evaluator", value: "Achilles · RAG leakage" },
          { field: "Sources", value: "3 indexes (synthetic)" },
          { field: "Configuration", value: "sha256:c03a…7e18 (synthetic)" },
          { field: "Reopens when", value: "A source is added or permissions sync changes" },
          { field: "Evidence root", value: "sha256:19be…d4a0 (synthetic)" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "Restricted documents stay out of answers", state: "verified", note: "Held across the three test identities and sources in scope." },
        { claim: "Planted instructions cannot redirect the assistant", state: "contradicted", label: "Finding", note: "A synthetic policy page changed an answer; fixed and retested." },
        { claim: "A legacy search index follows the same rules", state: "unknown", note: "Discovered during mapping, not yet tested." },
        { claim: "Deleted pages no longer appear", state: "stale", note: "Index rebuilt after testing — needs a retest." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Opaque third-party retrieval is a declared coverage gap, not a pass.",
        "Deletion is checked by testing what comes back — never as “verified forgetting”.",
        "Answer accuracy and citation quality are not certified.",
      ],
    },
    industries: ["regulated-enterprise", "healthcare-life-sciences", "public-sector-mission"],
  },
  {
    slug: "ai-agent-tools-actions",
    number: 3,
    title: "AI Agent With Tools and Actions",
    metaDescription:
      "Can an AI agent perform a harmful action despite apparently approved tool permissions? How Mythos tests tool authority, approvals and observed effects.",
    question: "Can an AI agent cause a harmful action despite *apparently approved permissions?*",
    lede: LEDE,
    image: "/assets/athena/athena-routes.webp",
    planes: [
      { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
      { src: OLYMPUS_MEDIA.mountains.src, className: "inset-x-0 top-[38%] h-[20%]", fit: "contain", position: "60% 100%", opacity: 0.75, depth: 8 },
      { src: OLYMPUS_MEDIA.viaduct.src, className: "inset-x-[-6%] bottom-[14%] h-[30%]", fit: "contain", position: "50% 100%", depth: 12 },
      sun,
    ],
    facets: { industry: ["ai-saas", "financial-services-insurance", "integrators-vendors"], product: ["Athena", "Achilles", "SPINE"], risk: ["Tool & action authority", "Identity & delegation", "Untrusted content"] },
    workflow: {
      title: "From a request *to an effect.*",
      lede: "The agent plans, calls tools under a service identity and changes things in other systems.",
      steps: [
        { kind: "person", name: "Requester", detail: "Asks the agent to get something done." },
        { kind: "ai", name: "Agent", detail: "Plans steps and chooses tools." },
        { kind: "tool", name: "Tools & APIs", detail: "Called under a service account, sometimes after approval." },
        { kind: "effect", name: "Changes elsewhere", detail: "Records updated, messages sent, access granted." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Tool authority",
    },
    wrong: {
      title: "Where agent authority *slips.*",
      lede: "Research supports this use case more than any other.",
      items: [
        { name: "Permission never exercised", body: "A broad grant looks harmless because clean runs never use it." },
        { name: "Approval drift", body: "What was approved is edited before it runs." },
        { name: "Safe tools, unsafe chain", body: "Low-risk tools combine into a high-risk path." },
        { name: "Tool changes after review", body: "A tool’s description or behavior changes once approved." },
        { name: "Unknown outcomes", body: "Timeouts and retries leave nobody sure what happened." },
        { name: "Credentials found along the way", body: "The agent discovers and uses access it was never given." },
      ],
    },
    approach: {
      title: "Test the controls *you rely on.*",
      lede: "In a test environment. Mythos tests your authorization, approval and execution controls — it does not enforce them at runtime.",
      athena: ["Tools, skills and routes the agent can reach", "The capability map and the identities behind each tool", "Effective access computed from the configuration supplied"],
      achilles: ["Tool misuse and permission-boundary scenarios", "Untrusted content steering tool choice", "Attempted versus observed effects in a hash-chained ledger"],
      spine: ["Deny wins, unknown escalates — never a silent allow", "A changed tool manifest reopens the claims built on it", "Approval-binding tests are designed, not yet built"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Effect record · synthetic",
        title: "Agent cannot widen a user’s access",
        rows: [
          { field: "Result", value: "Contradicted", tone: "contradicted" },
          { field: "Attempted effect", value: "Grant admin role to a test user" },
          { field: "Observed effect", value: "Role granted in staging" },
          { field: "Evaluator", value: "Achilles · tool misuse" },
          { field: "Identity", value: "svc-agent-staging (synthetic)" },
          { field: "Ledger entry", value: "sha256:7f02…bb31 (synthetic)" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "The agent’s identity cannot change roles", state: "contradicted", label: "Finding", note: "A staging role change succeeded; scope narrowed and retested." },
        { claim: "Outbound messages need a person’s approval", state: "verified", note: "Held across the scenarios tested." },
        { claim: "A timed-out call is not retried blindly", state: "unknown", note: "Not covered in scope — recorded with what would close it." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "No runtime enforcement: the Action Gate is planned, not built.",
        "A passed scenario is evidence for that scenario, not for every action.",
        "Unknown outcomes are reported as unknown — never as contained.",
      ],
    },
    industries: ["ai-saas", "financial-services-insurance", "integrators-vendors"],
  },
  {
    slug: "regulated-workflow-assistant",
    number: 4,
    title: "Regulated Workflow Assistant",
    metaDescription:
      "Can evidence support a controlled, human-reviewed AI workflow? How Mythos records what was tested, what is declared and what remains unknown for regulated work.",
    question: "Can evidence support a controlled, *human-reviewed AI workflow?*",
    lede: LEDE,
    image: "/assets/evidence/policy-authority-chain.svg",
    planes: scene("/assets/industries/insurance-hero.webp", "70% 40%"),
    facets: { industry: ["regulated-enterprise", "healthcare-life-sciences"], product: ["Athena", "Achilles", "SPINE"], risk: ["Evidence & audit", "Untrusted content", "Change & stale evidence"] },
    workflow: {
      title: "AI drafts, *a person decides.*",
      lede: "An assistant summarizes cases and drafts recommendations; a reviewer signs off. The record has to show both.",
      steps: [
        { kind: "data", name: "Case documents", detail: "Uploaded files and policy references." },
        { kind: "ai", name: "Assistant", detail: "Summarizes and drafts a recommendation." },
        { kind: "person", name: "Reviewer", detail: "Accepts, edits or rejects." },
        { kind: "effect", name: "A recorded decision", detail: "With the evidence and versions behind it." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Human review",
    },
    wrong: {
      title: "Where the record *breaks.*",
      lede: "Failure classes from research.",
      items: [
        { name: "Documents that steer", body: "Uploaded content changes the summary in ways the reviewer cannot see." },
        { name: "Superseded policy", body: "The draft cites a policy version that no longer applies." },
        { name: "Too wide an audience", body: "Sensitive details reach a broader reviewer group than intended." },
        { name: "A failure that reads as a pass", body: "A failed check turns into an approval or a green result." },
        { name: "Vendor word as proof", body: "A supplier’s statement is treated as verified evidence." },
      ],
    },
    approach: {
      title: "Evidence your reviewers *can use.*",
      lede: "Mapping supports your reviews; it is not compliance, and sector rules are referenced, never mapped.",
      athena: ["Findings mapped to NIST SP 800-53, OWASP and DoD Zero Trust — controls touched, never satisfied", "Where case data flows and who can read it", "Business impact described qualitatively"],
      achilles: ["Manipulation through uploaded documents", "Access by the wrong reviewer group", "Outputs that bypass the review step"],
      spine: ["Declared, observed and verified kept apart — vendor statements capped as declared", "Unknowns register for what the evidence cannot answer", "Six decision states; a missing decision is never Ready"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Assurance Receipt · synthetic",
        title: "Every recommendation waits for a recorded review",
        rows: [
          { field: "Result", value: "Verified for the paths tested", tone: "verified" },
          { field: "Subject", value: "Case assistant · staging" },
          { field: "Evaluator", value: "Achilles · permission boundary" },
          { field: "Mapped to", value: "NIST SP 800-53 (controls touched)" },
          { field: "Vendor claim", value: "Model provider retention — declared only" },
          { field: "Reopens when", value: "Policy version or reviewer roles change" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "No recommendation skips the reviewer", state: "verified", note: "Held for the routes tested." },
        { claim: "The provider does not retain case data", state: "observed", label: "Declared", note: "Vendor statement recorded, not independently verified." },
        { claim: "Drafts cite the current policy version", state: "stale", note: "Policy updated after testing — needs a retest." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Not legal or compliance advice; mapping is not certification.",
        "Sector rules are referenced in scoping, never mapped.",
        "The human reviewer stays accountable for the decision.",
      ],
    },
    industries: ["regulated-enterprise", "healthcare-life-sciences"],
  },
  {
    slug: "partner-vendor-ai-integration",
    number: 5,
    title: "Partner / Vendor AI Integration",
    metaDescription:
      "What is the effective exposure of a third-party AI tool once connected? How Mythos separates vendor claims from observed evidence and retests after vendor changes.",
    question: "What is the effective exposure of a third-party AI tool *once it is connected?*",
    lede: LEDE,
    image: "/assets/athena/athena-surfaces.webp",
    planes: [{ src: OLYMPUS_MEDIA.panorama.src, className: "-inset-[3%]", position: "60% 40%", depth: 6, priority: true }, { src: OLYMPUS_MEDIA.sunrays, className: "-inset-[3%]", blend: "screen", opacity: 0.6, position: "60% 40%", depth: 10 }],
    facets: { industry: ["integrators-vendors", "financial-services-insurance", "manufacturing-critical-infrastructure"], product: ["Athena", "Achilles", "SPINE"], risk: ["Data exposure", "Identity & delegation", "Change & stale evidence"] },
    workflow: {
      title: "Their AI, *your data.*",
      lede: "A vendor’s AI connects through tokens and connectors, and sends your data along routes you do not control.",
      steps: [
        { kind: "data", name: "Your systems", detail: "Records the integration can read or write." },
        { kind: "tool", name: "Connector & tokens", detail: "Scopes granted at setup." },
        { kind: "ai", name: "Vendor AI", detail: "Models and providers behind the vendor’s service." },
        { kind: "effect", name: "Data elsewhere", detail: "Copies, logs and subprocessors outside your boundary." },
      ],
      boundaryBefore: 1,
      boundaryLabel: "Trust boundary",
    },
    wrong: {
      title: "Where vendor AI *surprises you.*",
      lede: "Failure classes from research and public incidents.",
      items: [
        { name: "Scopes wider than needed", body: "A connector asks for — and keeps — more access than the use case requires." },
        { name: "Tokens outlive the relationship", body: "Access survives a reset or offboarding." },
        { name: "Same name, different model", body: "The model behind a route changes and old evidence no longer applies." },
        { name: "Documentation ≠ configuration", body: "What the vendor says does not match what is set up." },
        { name: "A new subprocessor", body: "Your data reaches a party your review never covered." },
      ],
    },
    approach: {
      title: "Declared versus *observed.*",
      lede: "Vendor statements stay declared until something in scope shows them.",
      athena: ["A provider profile with the evidence class for each field", "Routes, models and the AI-BOM behind the integration", "Token scopes from the configuration supplied"],
      achilles: ["Untrusted content handled by the vendor’s AI", "Permission boundaries around the connector"],
      spine: ["Vendor claims recorded as declared — never verified on assertion", "A route change reopens claims such as data residency", "Vendor assurance packets are in development"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Provider profile · synthetic",
        title: "Vendor AI connector",
        rows: [
          { field: "Data retention", value: "Declared by vendor", tone: "stale" },
          { field: "Token scopes", value: "Observed: read + write on all objects", tone: "contradicted" },
          { field: "Model route", value: "Observed: primary + one fallback" },
          { field: "Subprocessors", value: "Declared; not verified" },
          { field: "Reopens when", value: "Vendor route or model changes" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "The connector is read-only", state: "contradicted", label: "Finding", note: "Observed write scope; narrowed and retested." },
        { claim: "The vendor does not train on your data", state: "observed", label: "Declared", note: "Vendor statement — not independently verifiable in scope." },
        { claim: "Data stays in-region", state: "stale", note: "A route change after testing reopened the claim." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "The vendor’s own internals are an assurance limit to negotiate, not a pass.",
        "A vendor’s general assessment may not describe your specific integration.",
        "Vendor statements stay vendor-asserted until observed.",
      ],
    },
    industries: ["integrators-vendors", "financial-services-insurance", "manufacturing-critical-infrastructure"],
  },
  {
    slug: "executive-employee-copilot",
    number: 6,
    title: "Executive / Employee Copilot",
    metaDescription:
      "What private context or delegated authority could an enterprise copilot expose? How Mythos assesses copilot reach through permissions and test accounts.",
    question: "What private context or delegated authority could *an enterprise copilot expose?*",
    lede: LEDE,
    image: "/assets/athena/athena-personal-context.webp",
    planes: [
      { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 55%", depth: 6, priority: true },
      { src: OLYMPUS_MEDIA.cliffTemple.src, className: "-right-[3%] bottom-[10%] h-[58%] w-[56%]", fit: "contain", position: "100% 100%", depth: 12, desktopOnly: true },
      sun,
    ],
    facets: { industry: ["regulated-enterprise", "financial-services-insurance"], product: ["Athena", "Achilles", "SPINE"], risk: ["Data exposure", "Identity & delegation", "Untrusted content"] },
    workflow: {
      title: "A copilot that *acts as you.*",
      lede: "It reads what an employee can read, drafts in their name and sometimes sends.",
      steps: [
        { kind: "person", name: "Employee", detail: "Delegates a task." },
        { kind: "ai", name: "Copilot", detail: "Works under the employee’s identity." },
        { kind: "data", name: "Shared content", detail: "Documents and messages the employee can reach." },
        { kind: "effect", name: "Messages out", detail: "Drafts and sends that speak for the company." },
      ],
      boundaryBefore: 3,
      boundaryLabel: "Delegated authority",
    },
    wrong: {
      title: "Where copilots *overshare.*",
      lede: "Failure classes from research.",
      items: [
        { name: "Broad groups", body: "Documents shared to wide groups become answers for anyone." },
        { name: "Approved draft, different send", body: "Approving a draft is not permission to send a different message." },
        { name: "Instructions in incoming mail", body: "A received message steers what the copilot drafts." },
        { name: "Constraints lost in hand-off", body: "A “do not contact” note does not survive delegation." },
        { name: "Shadow agents", body: "Employee-built agents with access nobody reviewed." },
      ],
    },
    approach: {
      title: "Through permissions, *not inboxes.*",
      lede: "Assessed through permissions and test accounts in scope. No collection of private communications.",
      athena: ["Personal-context exposure computed from the signals supplied", "Effective access for the test identities", "Where prompt history is kept"],
      achilles: ["Retrieval leakage through shared content", "Instructions arriving in incoming messages", "Permission boundaries for drafts and sends"],
      spine: ["Claims tied to the permission data they were tested against", "A permission change reopens them", "Delegated-approval tests are designed, not yet built"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Assurance Receipt · synthetic",
        title: "Copilot answers stay within the asker’s access",
        rows: [
          { field: "Result", value: "Observed for test accounts", tone: "verified" },
          { field: "Subject", value: "Employee copilot · test accounts" },
          { field: "Evaluator", value: "Achilles · RAG leakage" },
          { field: "Identities", value: "4 test accounts (synthetic)" },
          { field: "Reopens when", value: "Group membership or sharing policy changes" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "Board materials stay out of general answers", state: "contradicted", label: "Finding", note: "A broadly shared folder exposed them; sharing fixed and retested." },
        { claim: "Sends need the employee’s confirmation", state: "verified", note: "Held for the scenarios tested." },
        { claim: "Employee-built agents follow the same rules", state: "unknown", note: "Out of scope — listed as an open question." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Mythos does not read anyone’s mail or meetings.",
        "It does not find all oversharing — only what the scope and test accounts reach.",
        "Content capture is opt-in; metadata comes first.",
      ],
    },
    industries: ["regulated-enterprise", "financial-services-insurance"],
  },
  {
    slug: "developer-ai-assistant",
    number: 7,
    title: "Developer AI Assistant",
    metaDescription:
      "Can generated code or an agentic commit weaken production controls? How Mythos tests coding agents' boundaries in disposable repositories and pipelines.",
    question: "Can generated code or an agentic commit *weaken production controls?*",
    lede: LEDE,
    image: "/assets/athena/athena-pipeline.webp",
    planes: [
      { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 60%", depth: 6, priority: true },
      { src: OLYMPUS_MEDIA.mountains.src, className: "inset-x-0 top-[38%] h-[20%]", fit: "contain", position: "60% 100%", opacity: 0.75, depth: 8 },
      { src: OLYMPUS_MEDIA.evergreenCliff.src, className: "-right-[4%] bottom-[8%] h-[64%] w-[44%] -scale-x-100", fit: "contain", position: "100% 100%", depth: 12, desktopOnly: true },
      sun,
    ],
    facets: { industry: ["ai-saas", "integrators-vendors"], product: ["Athena", "Achilles", "SPINE"], risk: ["Tool & action authority", "Untrusted content", "Change & stale evidence"] },
    workflow: {
      title: "From a prompt *to a release.*",
      lede: "A coding agent reads the repository, writes changes and can touch the pipeline that ships them.",
      steps: [
        { kind: "person", name: "Developer", detail: "Asks for a change." },
        { kind: "ai", name: "Coding agent", detail: "Reads code, issues and docs; writes a change." },
        { kind: "tool", name: "Repository & pipeline", detail: "Commits, pull requests, build steps." },
        { kind: "effect", name: "Production", detail: "What actually ships." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Release controls",
    },
    wrong: {
      title: "Where coding agents *cut corners.*",
      lede: "Failure classes from public incidents and research.",
      items: [
        { name: "Instructions in the repo", body: "Issues, comments or docs steer the agent." },
        { name: "Secrets in logs", body: "Masking is not a repair — exposed secrets need rotating." },
        { name: "Unreviewed changes", body: "Edits and hand-offs that monitoring never sees." },
        { name: "Low trust, protected release", body: "A low-trust contribution influences what ships." },
        { name: "The test, not the bug", body: "A patch that silences a failing check instead of fixing it." },
      ],
    },
    approach: {
      title: "In a disposable *environment.*",
      lede: "A throwaway repository and pipeline with no production secrets. Mythos does not replace code review or code scanners.",
      athena: ["Routes and the AI-BOM behind the assistant", "Repository and pipeline posture — once you connect credentials", "Where code and secrets can travel"],
      achilles: ["Output reaching a parser, query or command", "Instructions planted in repository content", "Tool misuse around commits and pipeline steps"],
      spine: ["Claims tied to the pipeline configuration tested", "A changed workflow file reopens them", "Two-way CI sync is planned"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Assurance Receipt · synthetic",
        title: "Agent changes cannot skip required review",
        rows: [
          { field: "Result", value: "Contradicted", tone: "contradicted" },
          { field: "Subject", value: "Coding agent · disposable repo" },
          { field: "Evaluator", value: "Achilles · tool misuse" },
          { field: "Pipeline", value: "ci-workflow v4 (synthetic)" },
          { field: "Reopens when", value: "Branch rules or workflow files change" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "Agent commits need human review", state: "contradicted", label: "Finding", note: "A bot path merged without review; rule fixed and retested." },
        { claim: "Repository text cannot change pipeline steps", state: "observed", note: "Observed for the content types tested." },
        { claim: "No secrets reach build logs", state: "unknown", note: "Not covered — needs pipeline credentials in scope." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Code quality and secure-coding review are not part of it.",
        "Repository and pipeline connectors need your credentials and are not live by default.",
        "It complements code scanners and review — it does not replace them.",
      ],
    },
    industries: ["ai-saas", "integrators-vendors"],
  },
  {
    slug: "ai-powered-decision-support",
    number: 8,
    title: "AI-Powered Decision Support",
    metaDescription:
      "Can an AI recommendation cross the boundary into unauthorized execution? How Mythos tests where recommendation becomes action and keeps human decisions on the record.",
    question: "Can an AI recommendation cross the boundary *into unauthorized execution?*",
    lede: LEDE,
    image: "/assets/athena/athena-remediation.webp",
    planes: scene("/assets/industries/financial-services-hero.webp", "75% 40%"),
    facets: { industry: ["regulated-enterprise", "financial-services-insurance", "healthcare-life-sciences"], product: ["Athena", "Achilles", "SPINE"], risk: ["Tool & action authority", "Untrusted content", "Evidence & audit"] },
    workflow: {
      title: "Advice that *should stay advice.*",
      lede: "The model scores and recommends; a person is meant to decide. The risk sits where a recommendation starts to execute.",
      steps: [
        { kind: "data", name: "Case inputs", detail: "Applications, notes and history." },
        { kind: "ai", name: "Model", detail: "Scores and recommends." },
        { kind: "person", name: "Decision owner", detail: "Accepts or overrides." },
        { kind: "effect", name: "Execution", detail: "Routing, approval or denial in another system." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Human sign-off",
    },
    wrong: {
      title: "Where advice *becomes action.*",
      lede: "Failure classes from research.",
      items: [
        { name: "Score triggers routing", body: "A recommendation executes without anyone confirming it." },
        { name: "Notes that steer", body: "Crafted case notes change the recommendation." },
        { name: "Nobody can say why", body: "The record lacks the model, inputs or reviewer behind a decision." },
        { name: "Fluent, uncertain", body: "A confident rationale hides how little evidence there was." },
        { name: "Thresholds moved quietly", body: "A policy change that nobody retested." },
      ],
    },
    approach: {
      title: "Keep the person *in the record.*",
      lede: "Security testing — not a fairness, bias or lawfulness evaluation.",
      athena: ["Where recommendations flow and what they can trigger", "Business impact described qualitatively"],
      achilles: ["Recommendations reaching execution without sign-off", "Manipulation through case content", "Outputs reaching downstream systems"],
      spine: ["Humans own the decision; a missing decision is never Ready", "A policy or threshold change reopens the claims", "Expected business effect is designed through Economic Exposure — synthetic ranges only"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Deployment decision · synthetic",
        title: "Triage assistant",
        rows: [
          { field: "Recommendation", value: "Ready with restrictions", tone: "verified" },
          { field: "Restriction", value: "Denials always need a reviewer" },
          { field: "Open unknowns", value: "2 (listed in the record)" },
          { field: "Decision owner", value: "Your release owner (role)" },
          { field: "Reopens when", value: "Model version or threshold changes" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "No recommendation executes without sign-off", state: "contradicted", label: "Finding", note: "Auto-routing bypassed review for one path; fixed and retested." },
        { claim: "Case notes cannot change the score band", state: "observed", note: "Observed for the note formats tested." },
        { claim: "Threshold changes are reviewed", state: "unknown", note: "No change occurred during testing." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Not a bias, fairness or lawfulness audit — partner with specialists for that.",
        "Mythos is not an independent auditor.",
        "Business-impact figures are never presented as realized losses.",
      ],
    },
    industries: ["regulated-enterprise", "financial-services-insurance", "healthcare-life-sciences"],
  },
  {
    slug: "public-sector-mission-workflow",
    number: 9,
    title: "Public Sector / Mission AI Workflow",
    metaDescription:
      "Can a mission-facing agent operate within restricted records and authorization constraints? Acceptance and change evidence for mission AI — with no authorization claims.",
    question: "Can a mission-facing agent stay within restricted records and *authorization constraints?*",
    lede: LEDE,
    image: "/assets/evidence/deployment-decision-gate.svg",
    planes: [
      { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 50%", depth: 6, priority: true },
      { src: OLYMPUS_MEDIA.mountains.src, className: "inset-x-0 top-[36%] h-[20%]", fit: "contain", position: "60% 100%", opacity: 0.8, depth: 8 },
      { src: OLYMPUS_MEDIA.cliffTemple.src, className: "-right-[3%] bottom-[12%] h-[56%] w-[58%]", fit: "contain", position: "100% 100%", depth: 12, desktopOnly: true },
      sun,
    ],
    facets: { industry: ["public-sector-mission"], product: ["Athena", "Achilles", "SPINE"], risk: ["Data exposure", "Identity & delegation", "Evidence & audit"] },
    workflow: {
      title: "Restricted records, *explicit authority.*",
      lede: "An assistant helps staff and contractors with records that carry different authorizations.",
      steps: [
        { kind: "person", name: "Staff & contractors", detail: "Different roles, different entitlements." },
        { kind: "ai", name: "Mission assistant", detail: "Searches, summarizes and routes." },
        { kind: "data", name: "Restricted records", detail: "Case files and notes with access rules." },
        { kind: "effect", name: "Accepted system", detail: "Evaluated for one exact version." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Authorization",
    },
    wrong: {
      title: "What acceptance *has to show.*",
      lede: "Failure classes from research.",
      items: [
        { name: "Which version was tested", body: "Evaluations that cannot say which model, data and permissions they covered." },
        { name: "Wrong role, right record", body: "A user without the role reaches a restricted summary." },
        { name: "Permits that do not expire", body: "Access not bound to scope, expiry and revocation." },
        { name: "Revocation lost on restore", body: "A recovery brings back access that was removed." },
        { name: "Public input steering routing", body: "Submitted text changes where a case goes." },
      ],
    },
    approach: {
      title: "Acceptance and *change evidence.*",
      lede: "Usually alongside your integrator. Mythos is not an authorizing official and grants no authorization.",
      athena: ["Effective access per role, from the configuration supplied", "Findings mapped to DoD Zero Trust and NIST SP 800-53"],
      achilles: ["Restricted-record access by the wrong role", "Retrieval leakage across case boundaries"],
      spine: ["Acceptance evidence bound to an exact configuration", "Changes after acceptance reopen the affected claims", "Private and air-gapped deployment are planned, not available"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Acceptance record · synthetic",
        title: "Mission assistant v2.3",
        rows: [
          { field: "Evaluated version", value: "assistant v2.3 · index 2026-10 (synthetic)" },
          { field: "Roles tested", value: "5 (synthetic)" },
          { field: "Result", value: "Verified after one fix", tone: "verified" },
          { field: "Mapped to", value: "DoD Zero Trust (capabilities touched)" },
          { field: "Reopens when", value: "Version, data or role mapping changes" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "Restricted summaries reach only cleared roles", state: "verified", note: "After a scoping fix, held for the five roles tested." },
        { claim: "Contractor access ends with the assignment", state: "unknown", note: "Requires the identity system in scope." },
        { claim: "Accepted configuration is still running", state: "stale", note: "An index refresh after acceptance reopened the claim." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "No authority to operate, accreditation or government approval.",
        "No work requiring a clearance Mythos does not hold.",
        "Today: a hosted control plane with remote assessment of approved targets.",
      ],
    },
    industries: ["public-sector-mission"],
  },
  {
    slug: "data-platform-cloud-ai-integration",
    number: 10,
    title: "Data Platform / Cloud AI Integration",
    metaDescription:
      "Which service routes and credentials can model-and-data workflows reach? How Mythos maps service identities and data boundaries for AI on cloud data platforms.",
    question: "Which service routes and credentials can *model-and-data workflows reach?*",
    lede: LEDE,
    image: "/assets/athena/athena-cloud-posture.webp",
    planes: scene("/assets/industries/manufacturing-critical-infrastructure-hero.webp", "70% 40%"),
    facets: { industry: ["ai-saas", "public-sector-mission", "manufacturing-critical-infrastructure"], product: ["Athena", "Achilles", "SPINE"], risk: ["Identity & delegation", "Data exposure", "Change & stale evidence"] },
    workflow: {
      title: "Service identities *all the way down.*",
      lede: "Models query data through service accounts that rarely match any one user’s rights.",
      steps: [
        { kind: "person", name: "Analyst", detail: "Asks a question of the data." },
        { kind: "ai", name: "AI workflow", detail: "Plans queries and summarizes results." },
        { kind: "tool", name: "Service identity", detail: "The account the workflow runs as." },
        { kind: "data", name: "Data platform", detail: "Datasets, logs and notebooks it can reach." },
      ],
      boundaryBefore: 2,
      boundaryLabel: "Service authority",
    },
    wrong: {
      title: "Where service access *spreads.*",
      lede: "Failure classes from public incidents and research.",
      items: [
        { name: "The service sees everything", body: "A service account bypasses the user’s own restrictions." },
        { name: "Over-privileged by default", body: "Provisioning hands back more access than asked for." },
        { name: "Credentials after the job", body: "Access that outlives the assignment or the person." },
        { name: "Logs in the context", body: "Sensitive logs flow into model context." },
        { name: "A failed call is not proof", body: "One denied request does not show the boundary holds." },
      ],
    },
    approach: {
      title: "Map the identities, *test the edges.*",
      lede: "Live cloud and identity collection needs your credentials and is not wired by default.",
      athena: ["Effective access over the identities and grants supplied", "Data boundaries, routes and the AI-BOM", "Where logs and metadata enter model context"],
      achilles: ["Permission boundaries for the service identity", "Retrieval leakage across datasets"],
      spine: ["A new grant or data source reopens the claims", "Unconfigured collection is never reported as green"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Assurance Receipt · synthetic",
        title: "Workflow reads only the analytics datasets",
        rows: [
          { field: "Result", value: "Contradicted", tone: "contradicted" },
          { field: "Identity", value: "svc-analytics-ai (synthetic)" },
          { field: "Evaluator", value: "Achilles · permission boundary" },
          { field: "Grants supplied", value: "From the access export provided" },
          { field: "Reopens when", value: "Service grants or data sources change" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "The service identity cannot read HR datasets", state: "contradicted", label: "Finding", note: "An inherited grant allowed it; removed and retested." },
        { claim: "Model context excludes raw logs", state: "observed", note: "Observed for the pipelines in scope." },
        { claim: "Notebook environments follow the same grants", state: "unknown", note: "Not in scope." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Not cloud posture management.",
        "Cloud and identity connectors need your credentials and are not live by default.",
        "Query lineage is not the same as tracing what influenced a model.",
      ],
    },
    industries: ["ai-saas", "public-sector-mission", "manufacturing-critical-infrastructure"],
  },
  {
    slug: "ai-driven-vehicle-systems-hermes",
    number: 11,
    title: "AI Vehicle / Physical Systems",
    metaDescription:
      "What would need to be proven across sensing, prediction, planning, control and incident response? A strategic-horizon view of how Hermes is designed to approach physical AI.",
    question: "What would need to be proven across sensing, planning, *control and incident response?*",
    lede: "A strategic-horizon page. Hermes is a research scaffold: it describes how Mythos is designed to approach physical AI, not a service available today.",
    horizon: {
      label: "Strategic horizon",
      guardrail: "Hermes is a research scaffold with no customers, pilots or vehicle assessments. Nothing here is a safety certification, and Mythos does not test live vehicles.",
    },
    image: "/assets/characters/emblems/hermes-emblem.svg",
    planes: [
      { src: OLYMPUS_MEDIA.cloudSea.src, className: "-inset-[3%]", position: "50% 60%", depth: 6, priority: true },
      { src: OLYMPUS_MEDIA.waterfallCliffs.src, className: "-right-[2%] bottom-[10%] h-[58%] w-[50%]", fit: "contain", position: "100% 100%", depth: 12, desktopOnly: true },
      sun,
    ],
    facets: { industry: ["manufacturing-critical-infrastructure"], product: ["Hermes"], risk: ["Change & stale evidence", "Evidence & audit"] },
    workflow: {
      title: "From component *to system.*",
      lede: "A physical AI system chains sensing, prediction, planning and control. A result about one part says little about the whole.",
      steps: [
        { kind: "data", name: "Sensing", detail: "What the system perceives, and under which conditions." },
        { kind: "ai", name: "Prediction & planning", detail: "What it expects and decides to do." },
        { kind: "tool", name: "Control", detail: "How decisions reach actuators." },
        { kind: "effect", name: "Physical effect", detail: "Where consequences stop being digital." },
      ],
      boundaryBefore: 3,
      boundaryLabel: "Physical boundary",
    },
    wrong: {
      title: "The questions *that matter.*",
      lede: "Research questions, drawn from general failure classes — not vehicle-specific findings.",
      items: [
        { name: "Which conditions were covered", body: "Evidence has to state the operating conditions, versions and scenarios it describes." },
        { name: "Updates at fleet scale", body: "A content or configuration update can fail everywhere at once." },
        { name: "Partial rollouts", body: "Part of a fleet on one version, part on another." },
        { name: "Independent barriers", body: "Safeguards that share an assumption fail together." },
      ],
    },
    approach: {
      title: "How Hermes is *designed to work.*",
      lede: "Today Hermes returns “inconclusive” by design. These are planned directions, in order.",
      athena: ["Model and over-the-air release evidence (planned first)", "Version and configuration inventory for each release"],
      achilles: ["Scenario testing in simulation or on a bench — never a live vehicle"],
      spine: ["An update would set aside the evidence for the version it replaces", "Incident evidence and replay (planned)"],
    },
    evidence: {
      title: "What evidence *would need to show.*",
      lede: "Illustrative only — Hermes does not produce these results today.",
      receipt: {
        kind: "Hermes job · synthetic",
        title: "Readiness report shell",
        rows: [
          { field: "Result", value: "Inconclusive (by design)", tone: "stale" },
          { field: "Scope", value: "Simulation fixture only" },
          { field: "Domain logic", value: "Not implemented" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: "Synthetic illustration of the current scaffold. Hermes makes no present claims about vehicle behavior.",
      },
      claims: [
        { claim: "Release evidence names its operating conditions", state: "unknown", note: "A design requirement, not a tested result." },
        { claim: "An update invalidates its predecessor’s evidence", state: "unknown", note: "Designed in SPINE’s taxonomy; not built." },
      ],
    },
    limits: {
      title: "What this *is not.*",
      items: [
        "Not a safety certification, and not a substitute for manufacturers’ safety teams.",
        "No standards-compliance claims.",
        "An enterprise authorization is not a vehicle safety case.",
      ],
    },
    industries: ["manufacturing-critical-infrastructure"],
  },
  {
    slug: "quantum-adjacent-ai-integration",
    number: 12,
    title: "Quantum-Adjacent AI R&D",
    metaDescription:
      "How could emerging computing and AI infrastructure alter assurance needs? Research questions only — no quantum-safe certification, assessment or integration offer.",
    question: "How could emerging computing and AI infrastructure *alter assurance needs?*",
    lede: "Research questions and strategic exploration only. There is no quantum-related service, assessment or deliverable.",
    horizon: {
      label: "Strategic R&D",
      guardrail: "No quantum-safe certification, post-quantum readiness assessment, production quantum integration or hardware validation is offered or implied.",
    },
    image: "/assets/lifecycle/lifecycle-medallion-discover.svg",
    planes: [{ src: "/assets/spine/spine-core-hero.webp", className: "-inset-[3%] lg:left-[26%]", position: "100% 50%", depth: 6, priority: true }, sun],
    facets: { industry: ["regulated-enterprise"], product: [], risk: ["Change & stale evidence"] },
    workflow: {
      title: "The question, *not an offer.*",
      lede: "If the cryptography and computing beneath AI systems change, which assurance claims would need to be revisited?",
      steps: [
        { kind: "data", name: "Assumptions", detail: "What today’s evidence takes for granted about its foundations." },
        { kind: "ai", name: "AI systems", detail: "Models, routes and the services they depend on." },
        { kind: "effect", name: "Claims to revisit", detail: "Which conclusions would no longer hold." },
      ],
    },
    wrong: {
      title: "Open *research questions.*",
      lede: "General principles only.",
      items: [
        { name: "Evidence of what is loaded", body: "Recording what an implementation actually runs, not just what a manifest declares." },
        { name: "Changes underneath", body: "When a foundation changes, which claims should be set aside?" },
        { name: "Signatures and truth", body: "A signature shows who signed — not that a statement is true." },
      ],
    },
    approach: {
      title: "The machinery *that would apply.*",
      lede: "General Mythos concepts — none of them assess quantum readiness.",
      athena: ["Routes and provider profiles: where sensitive data travels"],
      achilles: ["No quantum-related testing exists"],
      spine: ["Declared versus verified evidence", "Unknowns recorded rather than assumed", "Change-triggered revalidation"],
    },
    evidence: {
      title: "What we *would record.*",
      lede: "Illustrative only.",
      receipt: {
        kind: "Research note · synthetic",
        title: "Foundation-change question",
        rows: [
          { field: "Status", value: "Research question", tone: "stale" },
          { field: "Offering", value: "None" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: "An illustration of how an open question is recorded — not a deliverable.",
      },
      claims: [{ claim: "Which claims depend on today’s cryptographic assumptions", state: "unknown", note: "Open research question." }],
    },
    limits: {
      title: "What this *is not.*",
      items: ["No quantum-safe certification or readiness score.", "No algorithm recommendations.", "No timeline or offering."],
    },
    industries: ["regulated-enterprise"],
  },
];

export function getUseCase(slug: string) {
  return USE_CASES.find((u) => u.slug === slug);
}

export const RISK_THEMES = ["Data exposure", "Untrusted content", "Tool & action authority", "Identity & delegation", "Change & stale evidence", "Evidence & audit"] as const;
