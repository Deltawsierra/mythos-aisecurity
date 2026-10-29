/**
 * Use-case library (Launch Guide §10), rewritten 16 Oct against the use-case
 * fact-check (factcheck3/use-cases.md). Rules applied on every page:
 *
 * - Every finding, claim and receipt is synthetic and labelled so; no
 *   customer, pilot or design partner exists.
 * - An assessment tests the customer's controls; runtime enforcement through
 *   the Achilles Action Gate is a separate engagement on supported paths.
 *   No answer-quality, bias or code-quality testing.
 * - Effective access is computed from the access configuration supplied; no
 *   live collection, and no identity-provider or end-user entitlement testing.
 * - No live monitoring: a changed fingerprint supersedes claims and opens a
 *   retest. Assurance Receipts are DSSE-signed and verify offline (26 Oct
 *   inventory). Gaps go to the coverage manifest as Not measured.
 * - UC11 (Hermes) is a strategic-horizon page that follows the inventory: a
 *   scaffold, every domain INCONCLUSIVE (published on the owner's ruling).
 * - UC12 (quantum) is held from launch: nothing in the inventory supports it.
 *   Its source stays below so it can return; HELD keeps it out of the build.
 */
import type { UseCaseContent } from "@/components/use-cases/types";
import { OLYMPUS_MEDIA, USE_CASE_ART, scenePlanes } from "@/content/media";

const LEDE =
  "Mythos AI Security evaluates the authorized scope, actual pathways and relevant behaviors of this AI workflow, then records what was observed, what remains uncertain and what should be retested when the system changes.";

const sun = { src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen" as const, opacity: 0.45, position: "100% 0%", depth: 10 };
/** G6 use-case plate n (0-based), with its phone composition; the headline sits on the quiet left wall. */
const useCasePlates = (n: number) => scenePlanes(USE_CASE_ART[n], "60% 50%");

const RECEIPT_FOOTER =
  "Synthetic receipt for illustration. Receipts are signed and verify offline, so later changes are detectable. A receipt shows where a result came from — not that the conclusion is true.";

const LIBRARY: UseCaseContent[] = [
  {
    slug: "customer-support-ai-agent",
    number: 1,
    title: "Customer Support AI Agent",
    seoTitle: "Testing a Customer Support AI Agent",
    metaDescription:
      "Can a support agent reach only the customer records and actions it is authorized to use? How Mythos AI Security maps, tests and keeps evidence for support AI.",
    question: "Can a support agent reach only the customer records and *actions it is authorized to use?*",
    lede: LEDE,
    image: "/assets/athena/athena-identity.webp",
    planes: useCasePlates(0),
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
      lede: "Run in a test tenant with synthetic records. An assessment tests your controls; runtime enforcement is a separate engagement.",
      athena: ["Which records, notes and tools the agent can reach, computed from the access configuration you supply", "Where ticket content travels, including logs", "Findings mapped to OWASP Top 10 for LLM applications"],
      achilles: ["Cross-customer access attempts against the retrieval path", "Instructions hidden in ticket content", "Tool misuse and permission boundaries around credits"],
      spine: ["Each conclusion tied to the configuration it was true of", "Reopened when a role widens, a tool is added or the refund policy changes", "Gaps listed as Not measured, never counted as passes"],
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
    seoTitle: "RAG Assistant Permission Testing",
    metaDescription:
      "Will an internal RAG assistant respect source permissions when retrieval and prompts combine? How Mythos AI Security tests retrieval boundaries and keeps evidence.",
    question: "Will an internal assistant respect source permissions when *retrieval and prompts combine?*",
    lede: LEDE,
    image: "/assets/athena/athena-data-lifecycle.webp",
    planes: useCasePlates(1),
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
      spine: ["Claims tied to the source list and permission data they were tested against", "A new retrieval source reopens the access claims", "Stale-policy questions listed as Not measured until tested"],
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
    seoTitle: "AI Agent Tool & Action Testing",
    metaDescription:
      "Can an AI agent perform a harmful action despite apparently approved tool permissions? How Mythos AI Security tests tool authority, approvals and observed effects.",
    question: "Can an AI agent cause a harmful action despite *apparently approved permissions?*",
    lede: LEDE,
    image: "/assets/athena/athena-routes.webp",
    planes: useCasePlates(2),
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
      lede: "In a test environment. An assessment tests your authorization, approval and execution controls; runtime enforcement is a separate engagement.",
      athena: ["Tools, skills and routes the agent can reach", "The capability map and the identities behind each tool", "Effective access computed from the configuration supplied"],
      achilles: ["Tool misuse and permission-boundary scenarios", "Untrusted content steering tool choice", "Approval binding: eight Action and Approval Authority scenarios"],
      spine: ["Authority chains read hop by hop: proven, unproven or broken", "A changed tool contract reopens exactly the claims bound to it", "Authority violations kept apart from witnessed effects"],
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
          { field: "Evidence pack", value: "sha256:7f02…bb31 (synthetic)" },
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
        "Assessment is not enforcement: the Action Gate (policy-as-code, deny by default) is a separate engagement on supported paths.",
        "A scenario that held is evidence for that scenario, not for every action.",
        "Unknown outcomes are reported as unknown — never as contained.",
      ],
    },
    industries: ["ai-saas", "financial-services-insurance", "integrators-vendors"],
  },
  {
    slug: "regulated-workflow-assistant",
    number: 4,
    title: "Regulated Workflow Assistant",
    seoTitle: "Evidence for Regulated AI Workflows",
    metaDescription:
      "Can evidence support a controlled, human-reviewed AI workflow? Mythos AI Security records what was tested, what is vendor-asserted and what was not measured.",
    question: "Can evidence support a controlled, *human-reviewed AI workflow?*",
    lede: LEDE,
    image: "/assets/evidence/policy-authority-chain.svg",
    planes: useCasePlates(3),
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
      spine: ["Vendor-asserted, observed and verified kept apart — vendor claims cap at supported", "A coverage manifest of what was not measured", "Six decision states plus paused; missing evidence is never Ready"],
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
          { field: "Vendor claim", value: "Provider retention — vendor-asserted, capped" },
          { field: "Reopens when", value: "Policy version or reviewer roles change" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "No recommendation skips the reviewer", state: "verified", note: "Held for the routes tested." },
        { claim: "The provider does not retain case data", state: "observed", label: "Vendor-asserted", note: "Vendor statement recorded; capped at supported, not verified." },
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
    seoTitle: "Third-Party AI Vendor Risk Testing",
    metaDescription:
      "What can a third-party AI tool reach once connected? How Mythos AI Security separates vendor claims from observed evidence and retests after vendor changes.",
    question: "What is the effective exposure of a third-party AI tool *once it is connected?*",
    lede: LEDE,
    image: "/assets/athena/athena-surfaces.webp",
    planes: useCasePlates(4),
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
      title: "Asserted versus *observed.*",
      lede: "Vendor statements cap at supported until technical evidence in scope shows more.",
      athena: ["A provider profile with the evidence class for each field", "Routes, models and the AI-BOM behind the integration", "Token scopes from the configuration supplied"],
      achilles: ["Untrusted content handled by the vendor’s AI", "Permission boundaries around the connector"],
      spine: ["Vendor-asserted claims cap at supported — never verified on assertion", "A route change reopens claims such as data residency", "Verified needs non-vendor technical evidence"],
    },
    evidence: {
      title: "What the evidence *looks like.*",
      lede: "A synthetic example.",
      receipt: {
        kind: "Provider profile · synthetic",
        title: "Vendor AI connector",
        rows: [
          { field: "Data retention", value: "Vendor-asserted (supported)", tone: "stale" },
          { field: "Token scopes", value: "Observed: read + write on all objects", tone: "contradicted" },
          { field: "Model route", value: "Observed: primary + one fallback" },
          { field: "Subprocessors", value: "Vendor-asserted; not verified" },
          { field: "Reopens when", value: "Vendor route or model changes" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: RECEIPT_FOOTER,
      },
      claims: [
        { claim: "The connector is read-only", state: "contradicted", label: "Finding", note: "Observed write scope; narrowed and retested." },
        { claim: "The vendor does not train on your data", state: "observed", label: "Vendor-asserted", note: "Vendor statement — not independently verifiable in scope." },
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
    seoTitle: "Enterprise Copilot Access Testing",
    metaDescription:
      "What private context or delegated authority could an enterprise copilot expose? How Mythos AI Security assesses copilot reach through permissions and test accounts.",
    question: "What private context or delegated authority could *an enterprise copilot expose?*",
    lede: LEDE,
    image: "/assets/athena/athena-personal-context.webp",
    planes: useCasePlates(5),
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
      athena: ["Routes, models and the AI-BOM behind the copilot", "Effective access for the test identities", "Where prompt history is kept"],
      achilles: ["Retrieval leakage through shared content", "Instructions arriving in incoming messages", "Delegated approval: an approved draft versus a different send"],
      spine: ["Claims tied to the permission data they were tested against", "A permission change reopens them", "Authority chains from person to effect, each hop proven or not"],
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
        "Mythos AI Security does not read anyone’s mail or meetings.",
        "It does not find all oversharing — only what the scope and test accounts reach.",
        "It works from permissions and test accounts, not message content.",
      ],
    },
    industries: ["regulated-enterprise", "financial-services-insurance"],
  },
  {
    slug: "developer-ai-assistant",
    number: 7,
    title: "Developer AI Assistant",
    seoTitle: "Coding Agent & AI Assistant Testing",
    metaDescription:
      "Can generated code or an agentic commit weaken production controls? How Mythos AI Security tests coding agents' boundaries in disposable repositories and pipelines.",
    question: "Can generated code or an agentic commit *weaken production controls?*",
    lede: LEDE,
    image: "/assets/athena/athena-pipeline.webp",
    planes: useCasePlates(6),
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
      lede: "A throwaway repository and pipeline with no production secrets. Mythos AI Security does not replace code review or code scanners.",
      athena: ["Routes and the AI-BOM behind the assistant", "Secret-leak and software-composition checks on services in scope", "Where code and secrets can travel"],
      achilles: ["Output reaching a parser, query or command", "Instructions planted in repository content", "Tool misuse around commits and pipeline steps"],
      spine: ["Claims tied to the pipeline configuration tested", "A changed workflow file reopens them", "Findings dispatch to GitHub or Jira"],
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
        { claim: "No secrets reach build logs", state: "unknown", note: "Not measured — build logs were outside the scope tested." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "Code quality and secure-coding review are not part of it.",
        "Mythos AI Security does not collect repository or pipeline posture; it tests what is in scope.",
        "It complements code scanners and review — it does not replace them.",
      ],
    },
    industries: ["ai-saas", "integrators-vendors"],
  },
  {
    slug: "ai-powered-decision-support",
    number: 8,
    title: "AI-Powered Decision Support",
    seoTitle: "AI Decision Support Boundary Testing",
    metaDescription:
      "Can an AI recommendation cross into unauthorized execution? How Mythos AI Security tests where recommendation becomes action and keeps human decisions on record.",
    question: "Can an AI recommendation cross the boundary *into unauthorized execution?*",
    lede: LEDE,
    image: "/assets/athena/athena-remediation.webp",
    planes: useCasePlates(7),
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
      spine: ["Humans own the decision; a missing decision is never Ready", "A policy or threshold change reopens the claims", "Economic Exposure prices a validated failure as a range with sources — never an exact loss"],
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
          { field: "Not measured", value: "2 (in the coverage manifest)" },
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
        "Mythos AI Security is not an independent auditor.",
        "Business-impact figures are never presented as realized losses.",
      ],
    },
    industries: ["regulated-enterprise", "financial-services-insurance", "healthcare-life-sciences"],
  },
  {
    slug: "public-sector-mission-workflow",
    number: 9,
    title: "Public Sector / Mission AI Workflow",
    seoTitle: "Public Sector Mission AI Evidence",
    metaDescription:
      "Can a mission agent stay within restricted records and authorization limits? Acceptance and change evidence for mission AI, with no authorization claims.",
    question: "Can a mission-facing agent stay within restricted records and *authorization constraints?*",
    lede: LEDE,
    image: "/assets/evidence/deployment-decision-gate.svg",
    planes: useCasePlates(8),
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
      lede: "Usually alongside your integrator. Mythos AI Security is not an authorizing official and grants no authorization.",
      athena: ["Effective access per role, from the configuration supplied", "Findings mapped to DoD Zero Trust and NIST SP 800-53"],
      achilles: ["Restricted-record access by the wrong role", "Retrieval leakage across case boundaries"],
      spine: ["Acceptance evidence bound to an exact configuration", "Changes after acceptance reopen the affected claims", "Private and air-gapped deployment are not offered"],
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
        { claim: "Contractor access ends with the assignment", state: "unknown", note: "Not measured — identity-provider testing is out of scope." },
        { claim: "Accepted configuration is still running", state: "stale", note: "An index refresh after acceptance reopened the claim." },
      ],
    },
    limits: {
      title: "What this *does not cover.*",
      items: [
        "No authority to operate, accreditation or government approval.",
        "No work requiring a clearance Mythos AI Security does not hold.",
        "Today: a hosted control plane with remote assessment of approved targets.",
      ],
    },
    industries: ["public-sector-mission"],
  },
  {
    slug: "data-platform-cloud-ai-integration",
    number: 10,
    title: "Data Platform / Cloud AI Integration",
    seoTitle: "Cloud & Data Platform AI Access Mapping",
    metaDescription:
      "Which service routes and credentials can AI workflows reach on a cloud data platform? How Mythos AI Security maps service identities and data boundaries.",
    question: "Which service routes and credentials can *model-and-data workflows reach?*",
    lede: LEDE,
    image: "/assets/athena/athena-cloud-posture.webp",
    planes: useCasePlates(9),
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
      lede: "Mythos AI Security works from the identities and grants you supply; it does not collect them live.",
      athena: ["Effective access over the identities and grants supplied", "Data boundaries, routes and the AI-BOM", "Where logs and metadata enter model context"],
      achilles: ["Permission boundaries for the service identity", "Retrieval leakage across datasets"],
      spine: ["A new grant or data source reopens the claims", "What was not assessed reads Not measured, never green"],
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
        "No identity-provider or end-user entitlement testing.",
        "Query lineage is not the same as tracing what influenced a model.",
      ],
    },
    industries: ["ai-saas", "public-sector-mission", "manufacturing-critical-infrastructure"],
  },
  {
    slug: "ai-driven-vehicle-systems-hermes",
    number: 11,
    title: "AI Vehicle / Physical Systems",
    seoTitle: "AI Vehicle & Physical Systems (Hermes)",
    metaDescription:
      "What would need to be proven across sensing, planning, control and incident response? A strategic-horizon view of Hermes, a vehicle assurance scaffold.",
    question: "What would need to be proven across sensing, planning, *control and incident response?*",
    lede: "A strategic-horizon page. Hermes is a scaffold today: every domain returns inconclusive, so it is not a service available yet.",
    horizon: {
      label: "Strategic horizon",
      guardrail: "Hermes is a scaffold with no customers, pilots or vehicle assessments. It never certifies a vehicle, and Mythos AI Security does not test live vehicles.",
    },
    image: "/assets/characters/emblems/hermes-emblem.svg",
    planes: useCasePlates(10),
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
      title: "How Hermes is *built today.*",
      lede: "Four questions — can it perceive, decide, fail and change safely — across twelve domains. Every domain returns inconclusive today.",
      athena: ["Twelve domains, from sensor trust to over-the-air model updates", "Standards mapping (ISO/SAE 21434, ISO 26262, UL 4600) — not certification"],
      achilles: ["Built: the job API, readiness report and failsafe — no domain logic yet"],
      spine: ["An update would set aside the evidence for the version it replaces", "A full scan reads “requires additional evidence” today"],
    },
    evidence: {
      title: "What evidence *would need to show.*",
      lede: "Illustrative only — Hermes does not produce these results today.",
      receipt: {
        kind: "Hermes job · synthetic",
        title: "Readiness report shell",
        rows: [
          { field: "Result", value: "Inconclusive · all twelve domains", tone: "stale" },
          { field: "Decision", value: "Requires additional evidence" },
          { field: "Scope", value: "Simulation fixture only" },
          { field: "Domain logic", value: "Not implemented" },
          { field: "Synthetic", value: "Yes" },
        ],
        footer: "Synthetic illustration of the current scaffold. Hermes makes no present claims about vehicle behavior.",
      },
      claims: [
        { claim: "Release evidence names its operating conditions", state: "unknown", note: "A design requirement, not a tested result." },
        { claim: "An update invalidates its predecessor’s evidence", state: "unknown", note: "SPINE supersedes changed claims; Hermes has no domain logic to feed it yet." },
      ],
    },
    limits: {
      title: "What this *is not.*",
      items: [
        "Not a safety certification, and not a substitute for manufacturers’ safety teams.",
        "Standards are mapped, never certified — no compliance claims.",
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
      lede: "General Mythos AI Security concepts — none of them assess quantum readiness.",
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

/** Held from launch (owner ruling, 26 Oct 2026). */
const HELD = new Set(["quantum-adjacent-ai-integration"]);

export const USE_CASES = LIBRARY.filter((u) => !HELD.has(u.slug));

export function getUseCase(slug: string) {
  return USE_CASES.find((u) => u.slug === slug);
}

export const RISK_THEMES = ["Data exposure", "Untrusted content", "Tool & action authority", "Identity & delegation", "Change & stale evidence", "Evidence & audit"] as const;
