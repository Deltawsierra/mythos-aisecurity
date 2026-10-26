/**
 * Industry page copy (Launch Guide Section 09), checked against the Banking
 * Incident and Customer Needs Dossier, US AI Regulation and Visibility
 * Strategy, Market Landscape, Customer Requirements Review, Deployment Fabric
 * and the Athena build log (16 Oct fact-check).
 *
 * - No customers, pilots, partners or case studies exist: every proof section
 *   is an explicitly synthetic walkthrough, and impact is framed as hypotheses.
 * - Built mappings (ledger.maps-to-standards, 26 Oct inventory): NIST SP
 *   800-53, OWASP 2021 and LLM 2025, DoD Zero Trust — evidence of gaps, never
 *   a certificate. Everything else is referenced in scoping only.
 * - Vendor-asserted claims cap at supported; verified needs non-vendor
 *   technical evidence.
 * - Healthcare and manufacturing have little research behind them, so their
 *   pages stay general and make no sector-rule or safety claims.
 * - Starting-point names come from the research and still need commercial
 *   approval (register: solutions.offer-names). Prices are never shown.
 */
import type { IndustryContent } from "@/components/solutions/types";
import { INTERIM_SCENES, OLYMPUS_MEDIA } from "@/content/media";

const ASSESSMENT = "/contact?intent=assessment";
const sun = (position = "100% 0%") => ({ src: OLYMPUS_MEDIA.sunbeams, className: "-inset-[3%]", blend: "screen" as const, opacity: 0.45, position, depth: 10 });

const MAPPED_CORE = [
  { name: "NIST SP 800-53", status: "mapped" as const, note: "Findings are tagged to the controls they touch — never marked as satisfied." },
  { name: "OWASP Top 10 for LLM applications", status: "mapped" as const, note: "Used as threat coverage for testing, not as a certificate." },
];

export const INDUSTRIES: IndustryContent[] = [
  {
    slug: "financial-services-insurance",
    name: "Financial Services & Insurance",
    metaTitle: "AI Assurance for Financial Services & Insurance",
    metaDescription:
      "Evidence for AI that touches customer data, approvals and suppliers in banks and insurers — scoped, tested and kept current, without compliance promises.",
    hero: {
      eyebrow: "Financial Services & Insurance",
      headline: "AI Assurance for a More Resilient *Financial Future.*",
      lede: "From assistants and agentic workflows to regulated decision support, financial AI needs controlled access, trustworthy evidence and a clear view of business consequence.",
      primaryCta: { label: "Request a Financial AI Assessment", href: ASSESSMENT },
      planes: [{ src: "/assets/industries/financial-services-hero.webp", className: "-inset-[3%]", position: "75% 40%", depth: 6, priority: true }, sun()],
    },
    risks: {
      title: "Where financial AI *goes wrong.*",
      lede: "The failure classes banks and insurers already know — now reachable through AI that reads customer data, calls tools and acts on someone’s behalf.",
      items: [
        { name: "Customer data, governed or not", body: "A servicing copilot can reach records, notes and history beyond the customer in front of it." },
        { name: "Cross-customer leakage", body: "Retrieval and context can mix one customer’s information into another’s answer." },
        { name: "Supplier access and revocation", body: "Third-party AI keeps access after it should have ended, or changes behavior with an update." },
        { name: "Stale or wrong sources", body: "An answer built on yesterday’s policy or rate sheet still sounds authoritative." },
        { name: "Uncertain execution", body: "Retries, partial failures and duplicate actions when an agent is unsure what already happened." },
        { name: "Identity-recovery paths", body: "Convincing voices and documents aimed at account-recovery and servicing workflows." },
      ],
    },
    capabilities: {
      title: "Athena, Achilles and SPINE *on a servicing workflow.*",
      lede: "One scoped workflow at a time — what the AI can reach, what it does under pressure, and whether the evidence still holds after the next change.",
      items: [
        { product: "Athena", does: "Maps the data, identities, suppliers and routes a servicing copilot can actually reach.", output: "System and access map, with gaps listed" },
        { product: "Achilles", does: "Tests cross-customer access, unsafe actions and approval boundaries under realistic pressure.", output: "Observed findings with effect evidence" },
        { product: "SPINE", does: "Keeps each conclusion tied to the configuration it was true of, and reopens it when a supplier or model changes.", output: "Claims and receipts for review" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Set as acceptance measures at the start of an engagement and checked against evidence at the end.",
      items: [
        { name: "Fewer unknowns before launch", body: "Access paths and supplier dependencies identified and evidenced, not assumed." },
        { name: "Shorter review cycles", body: "Model-risk and security reviewers work from the same receipts." },
        { name: "Faster, targeted retests", body: "A supplier update reopens only the conclusions it touches." },
        { name: "Clearer decisions", body: "Each go, restrict or hold traced to the evidence behind it." },
      ],
    },
    useCases: { title: "Scenarios for *banks and insurers.*", slugs: ["customer-support-ai-agent", "ai-agent-tools-actions", "partner-vendor-ai-integration", "ai-powered-decision-support"] },
    controls: {
      title: "Mapped where it helps, *never certified.*",
      lede: "Evidence is organized so your security, model-risk and compliance teams can use it in their own reviews.",
      items: [
        ...MAPPED_CORE,
        { name: "US Treasury financial-services AI risk framework", status: "reference", note: "Findings can be mapped to it where relevant during scoping." },
        { name: "NYDFS Insurance Circular Letter No. 7", status: "reference", note: "Evidence can feed an insurer’s own model-risk review of AI suppliers." },
      ],
    },
    proof: {
      title: "A servicing copilot, *start to finish.*",
      lede: "How one scoped engagement would run.",
      scenario: "A retail bank wants to roll out an employee-facing servicing copilot over governed customer data. Before it reaches every branch, it asks what the copilot can reach and whether that will still hold after the vendor’s next update.",
      events: [
        { label: "Scope agreed", meta: "one workflow · one region", detail: "Copilot, data sources, supplier and excluded systems are written down and approved.", state: "verified", stateLabel: "Scoped" },
        { label: "Reach mapped", meta: "Athena", detail: "Two data sources the team hadn’t declared turn up; both are added to scope.", state: "observed" },
        { label: "Boundary tested", meta: "Achilles", detail: "A request for a second customer’s history returns notes it shouldn’t.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "same scenarios", detail: "Retrieval is filtered by customer; the original request no longer returns those notes.", state: "verified" },
        { label: "Decision", meta: "your model-risk owner", detail: "Pilot approved for one region, with retest on the next supplier update.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "Which AI workflow matters most in the next two quarters — and who owns it?",
        "What customer data and which suppliers can it reach today?",
        "What would your model-risk or security reviewers need to see to approve it?",
        "What changes are coming — models, suppliers, permissions — that could reopen that decision?",
      ],
    },
    closing: { title: "Start with *one financial workflow.*", body: "A scoped assessment of one AI workflow, with evidence your reviewers can use and a plan for what to retest when it changes." },
    startingPoint: "Banking AI workflow assurance assessment · insurance AI change evidence",
  },
  {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    metaTitle: "AI Assurance for Healthcare & Life Sciences",
    metaDescription:
      "Scoped evidence for AI working with sensitive records, research data and operational workflows — with no patient-safety or compliance promises.",
    hero: {
      eyebrow: "Healthcare & Life Sciences",
      headline: "AI Assurance for People, *Patients, and Progress.*",
      lede: "Support the safe adoption of AI in sensitive clinical, research and operational settings with measurable boundaries and evidence that stands up to review.",
      primaryCta: { label: "Discuss High-Risk AI Assurance", href: ASSESSMENT },
      planes: [{ src: "/assets/industries/healthcare-life-sciences-hero.webp", className: "-inset-[3%]", position: "70% 40%", depth: 6, priority: true }, sun()],
    },
    risks: {
      title: "Sensitive data, *serious consequences.*",
      lede: "The questions are familiar — who can see what, and what happens when it changes — with higher stakes for the people the data describes.",
      items: [
        { name: "Sensitive records within reach", body: "Assistants and agents that can read records, notes or research data beyond the task." },
        { name: "Vendor AI in the workflow", body: "Third-party tools that see sensitive data and change on their supplier’s schedule." },
        { name: "Research pipelines", body: "Data moving between studies, environments and models without a clear record." },
        { name: "Authorization drift", body: "Roles and service accounts that quietly widen over time." },
        { name: "Support, not decision", body: "Keeping AI output clearly as support for people who make clinical and operational decisions." },
      ],
    },
    capabilities: {
      title: "Boundaries you *can evidence.*",
      lede: "Mythos assesses AI workflows and their access. It does not assess clinical efficacy, medical devices or patient outcomes.",
      items: [
        { product: "Athena", does: "Maps which records, research data and vendors an AI workflow can reach, and through which identities.", output: "Access map with unknowns listed" },
        { product: "Achilles", does: "Tests whether the workflow can be pushed past its permissions or into exposing data it shouldn’t.", output: "Observed findings with evidence" },
        { product: "SPINE", does: "Keeps conclusions tied to the configuration they were true of, and flags them when a vendor or role changes.", output: "Claims and receipts for review" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Agreed at the start, checked against evidence at the end.",
      items: [
        { name: "Known reach", body: "Every data source and identity in scope accounted for, gaps listed." },
        { name: "Vendor evidence", body: "Supplier claims separated from what was actually observed." },
        { name: "Review-ready evidence", body: "Findings and receipts your privacy and security teams can use." },
        { name: "Change awareness", body: "Conclusions reopened when access or vendors change." },
      ],
    },
    useCases: { title: "Scenarios for *healthcare and research.*", slugs: ["internal-knowledge-rag-assistant", "regulated-workflow-assistant", "partner-vendor-ai-integration", "ai-powered-decision-support"] },
    controls: {
      title: "Your frameworks, *your decisions.*",
      lede: "Sector requirements are confirmed with your team during scoping. Mythos evidence supports those reviews; it does not establish compliance.",
      items: [
        ...MAPPED_CORE,
        { name: "Sector and quality frameworks", status: "reference", note: "Privacy, research and quality requirements that apply to you are identified with your team during scoping." },
      ],
    },
    proof: {
      title: "A research assistant, *start to finish.*",
      lede: "How one scoped engagement would run.",
      scenario: "A research organization wants an internal assistant to answer questions across study documents. It asks whether the assistant respects which studies each researcher may see.",
      events: [
        { label: "Scope agreed", meta: "one assistant · test data", detail: "Sources, roles and excluded systems are written down; testing uses non-production data.", state: "verified", stateLabel: "Scoped" },
        { label: "Reach mapped", meta: "Athena", detail: "The assistant’s service account can read every study folder, not just assigned ones.", state: "observed" },
        { label: "Boundary tested", meta: "Achilles", detail: "A researcher’s question surfaces a summary from a study they aren’t assigned to.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "same scenarios", detail: "Retrieval honors study permissions; the original test no longer leaks.", state: "verified" },
        { label: "Decision", meta: "your data owner", detail: "Approved for one department, retest on the next permission change.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "Which AI workflow are you most concerned about, and what data can it reach?",
        "Which vendors are involved, and what have they told you about their controls?",
        "What test environment and data can we use, so nothing sensitive is exposed?",
        "Who decides whether the workflow proceeds — and what do they need to see?",
      ],
    },
    closing: { title: "Start with *one sensitive workflow.*", body: "A scoped assessment on test data, with evidence your privacy and security teams can review." },
    startingPoint: "High-risk AI evidence assessment",
  },
  {
    slug: "ai-saas",
    name: "AI-Heavy SaaS",
    metaTitle: "AI Assurance for AI-Heavy SaaS",
    metaDescription:
      "Evidence for tenant boundaries, agent actions and model routes in AI-heavy SaaS — so enterprise buyers can see how permissions and fixes were verified.",
    hero: {
      eyebrow: "Technology & AI SaaS",
      headline: "Scale AI Innovation *With Confidence.*",
      lede: "Move quickly without overlooking tenant boundaries, agent authority, model routes, customer trust requirements or changing integrations.",
      primaryCta: { label: "Discuss Release Assurance", href: ASSESSMENT },
      planes: [{ src: "/assets/industries/technology-ai-saas-hero.webp", className: "-inset-[3%]", position: "65% 40%", depth: 6, priority: true }, sun()],
    },
    risks: {
      title: "What your *enterprise buyers ask.*",
      lede: "Security reviews now ask how AI permissions, data flows and fixes were verified — not just whether you have a policy.",
      items: [
        { name: "Tenant isolation", body: "Retrieval, caches and memory that can blend one customer’s data into another’s." },
        { name: "Agents with tools", body: "Features that act on a customer’s behalf, with permissions nobody has tested at the edges." },
        { name: "Model and route changes", body: "A provider or model swap that quietly changes what the feature does." },
        { name: "Combined context", body: "Tool servers, retrieval and prompts that meet in one context window." },
        { name: "Proof for buyers", body: "Questionnaires that want evidence of verification, not assertions." },
      ],
    },
    capabilities: {
      title: "Release evidence *your buyers can read.*",
      lede: "Test the feature before it ships, then keep the evidence current as it changes.",
      items: [
        { product: "Athena", does: "Maps model routes, tenant data paths and the tools your AI features can reach.", output: "Route and access map" },
        { product: "Achilles", does: "Tests cross-tenant leakage, agent misuse and prompt injection through customer content.", output: "Findings with effect evidence" },
        { product: "SPINE", does: "Ties each conclusion to a release, and reopens it when a model, route or tool changes.", output: "Receipts you can share in reviews" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Agreed with your team before testing.",
      items: [
        { name: "Faster security reviews", body: "Answers backed by receipts rather than written fresh each time." },
        { name: "Fewer release surprises", body: "Tenant and agent boundaries tested before launch." },
        { name: "Targeted retests", body: "A model or route change reopens only what it touches." },
        { name: "Clear release calls", body: "Ship, restrict or hold, traced to evidence." },
      ],
    },
    useCases: { title: "Scenarios for *SaaS teams.*", slugs: ["customer-support-ai-agent", "ai-agent-tools-actions", "data-platform-cloud-ai-integration", "developer-ai-assistant"] },
    controls: {
      title: "Threat coverage, *stated honestly.*",
      lede: "Testing coverage is described against public threat taxonomies. Supplier attestations cap at supported until technical evidence shows more.",
      items: [
        ...MAPPED_CORE,
        { name: "OWASP guidance for agentic applications", status: "reference", note: "Used as threat coverage for agent features." },
        { name: "NIST AI 100-2 adversarial ML taxonomy", status: "reference", note: "Used to describe attack classes in reports." },
        { name: "Your vendors’ SOC 2 reports", status: "reference", note: "Recorded as vendor-asserted evidence — capped at supported, never verified." },
      ],
    },
    proof: {
      title: "An agent feature, *start to finish.*",
      lede: "How one scoped engagement would run.",
      scenario: "A SaaS company is about to release an in-product agent that can update customer records. Its largest customer’s security team wants evidence that one tenant’s agent cannot touch another tenant’s data.",
      events: [
        { label: "Scope agreed", meta: "one feature · staging", detail: "Agent, tools, tenants and model route are written down; testing runs in staging.", state: "verified", stateLabel: "Scoped" },
        { label: "Routes mapped", meta: "Athena", detail: "A fallback model route was not in the design document; it is added to scope.", state: "observed" },
        { label: "Boundary tested", meta: "Achilles", detail: "Instructions hidden in a shared document make the agent read a second tenant’s record.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "same scenarios", detail: "Tool calls are scoped to the calling tenant; the attack no longer reaches other tenants.", state: "verified" },
        { label: "Decision", meta: "your release owner", detail: "Released, with the receipt shared in the customer’s security review.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "Which AI feature is next to ship, and what can it do on a customer’s behalf?",
        "Which model providers and routes does it use — including fallbacks?",
        "What are your enterprise customers asking for in security reviews?",
        "How often do models, prompts or tools change after release?",
      ],
    },
    closing: { title: "Ship the next AI feature *with evidence.*", body: "A scoped release assessment, with receipts your customers’ security teams can read." },
    startingPoint: "AI workflow release assurance",
  },
  {
    slug: "regulated-enterprise",
    name: "Regulated Enterprise",
    metaTitle: "AI Assurance for Regulated Enterprises",
    metaDescription:
      "Evidence about what enterprise AI systems do, which policies apply and which decisions need human ownership — supporting reviews, never promising compliance.",
    hero: {
      eyebrow: "Regulated Enterprise",
      headline: "Meet Requirements. *Move Faster.*",
      lede: "A changing AI estate requires evidence about what systems do, which policies apply, and which decisions require human ownership.",
      primaryCta: { label: "Request Deployment Assurance", href: ASSESSMENT },
      planes: [{ src: OLYMPUS_MEDIA.marbleCity.src, className: "-inset-[3%]", position: "75% 40%", depth: 6, priority: true }, sun()],
    },
    risks: {
      title: "Evidence that has to *keep up.*",
      lede: "State rules increasingly expect assessments that stay current, human review that is recorded, and fixes that are documented.",
      items: [
        { name: "Living assessments", body: "Privacy and automated-decision assessments that must be revisited when the system materially changes." },
        { name: "Hand-off records", body: "What a developer told the deployer, and what the deployer did with it." },
        { name: "Human review, on the record", body: "Evidence that a person actually reviewed consequential decisions." },
        { name: "Documented cure", body: "Proof that a problem was found, fixed and retested — not just closed." },
        { name: "Copilots across the estate", body: "Enterprise assistants with access nobody has mapped end to end." },
      ],
    },
    capabilities: {
      title: "Evidence for *every review.*",
      lede: "Mythos supplies evidence and decision support. Whether a system meets a rule is a decision for your legal and compliance teams.",
      items: [
        { product: "Athena", does: "Maps what each AI system can reach, and which policies and owners apply to it.", output: "Inventory and access map" },
        { product: "Achilles", does: "Tests behavior around consequential decisions and approval boundaries.", output: "Findings with retest records" },
        { product: "SPINE", does: "Keeps assessments tied to the configuration they describe, and flags material changes.", output: "Claims, receipts and change history" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Agreed with your compliance and security owners.",
      items: [
        { name: "Current assessments", body: "Assessments that show which configuration they describe." },
        { name: "Recorded review", body: "Human decisions captured with the evidence behind them." },
        { name: "Documented fixes", body: "Every remediation tied to a retest." },
        { name: "Less rework", body: "One body of evidence reused across reviews." },
      ],
    },
    useCases: { title: "Scenarios for *regulated teams.*", slugs: ["regulated-workflow-assistant", "internal-knowledge-rag-assistant", "executive-employee-copilot", "ai-powered-decision-support"] },
    controls: {
      title: "Supporting reviews, *not replacing them.*",
      lede: "Frameworks are referenced so evidence can be used in your reviews. None of this is a certification or a legal safe harbor.",
      items: [
        ...MAPPED_CORE,
        { name: "NIST AI Risk Management Framework", status: "reference", note: "A voluntary framework, referenced in scoping; not part of the built mapping." },
        { name: "ISO/IEC 42001", status: "reference", note: "A management-system standard — evidence about a system supports it but does not prove it." },
        { name: "State AI and privacy requirements", status: "reference", note: "Identified with your counsel during scoping." },
      ],
    },
    proof: {
      title: "A decision-support tool, *start to finish.*",
      lede: "How one scoped engagement would run.",
      scenario: "An enterprise uses an AI tool to help staff triage benefit requests. It needs evidence that a person reviews each consequential recommendation, and that the record survives the next model update.",
      events: [
        { label: "Scope agreed", meta: "one workflow", detail: "The tool, its decisions, reviewers and data are written down.", state: "verified", stateLabel: "Scoped" },
        { label: "Process mapped", meta: "Athena", detail: "Some recommendations route straight to a queue without a reviewer.", state: "observed" },
        { label: "Behavior tested", meta: "Achilles", detail: "A crafted note pushes a recommendation through with no human review recorded.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "same scenarios", detail: "Every consequential recommendation now waits for a recorded review.", state: "verified" },
        { label: "Decision", meta: "your compliance owner", detail: "Continued use approved; the assessment reopens on the next material change.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "Which AI systems make or influence consequential decisions?",
        "What assessments have you already done, and what has changed since?",
        "Who reviews decisions today, and how is that recorded?",
        "Which teams — legal, privacy, security — need to rely on the evidence?",
      ],
    },
    closing: { title: "Bring evidence to *your next review.*", body: "A scoped assessment of one consequential workflow, with evidence your compliance and legal teams can use." },
    startingPoint: "Privacy and consequential-decision evidence",
  },
  {
    slug: "public-sector-mission",
    name: "Public Sector & Mission",
    metaTitle: "AI Assurance for Public Sector & Mission",
    metaDescription:
      "Acceptance and change evidence for mission AI workflows — which version, data and permissions an evaluation covered — with no authorization or approval claims.",
    hero: {
      eyebrow: "Public Sector & Mission",
      headline: "Enable Innovation *With Assurance.*",
      lede: "For mission-sensitive work, authorization, scope control, traceability and reliable evidence matter as much as detection.",
      primaryCta: { label: "Discuss Mission Assurance", href: ASSESSMENT },
      planes: [{ src: INTERIM_SCENES.publicSector.src, className: "-inset-[3%]", position: "70% 40%", depth: 6, priority: true }, sun()],
    },
    risks: {
      title: "What an evaluation *has to show.*",
      lede: "Acceptance depends on knowing exactly what was evaluated — and whether it is still what is running.",
      items: [
        { name: "Which version was tested", body: "Evaluations that can’t say which model, data and permissions they covered." },
        { name: "Restricted records", body: "Assistants that can reach records beyond the user’s authorization." },
        { name: "Change after acceptance", body: "Updates after go-live that the acceptance evidence never saw." },
        { name: "Access chains", body: "Service accounts and integrations that widen what an agent can do." },
        { name: "Mission boundaries", body: "Keeping human decision authority explicit where it matters most." },
      ],
    },
    capabilities: {
      title: "Acceptance and *change evidence.*",
      lede: "Usually delivered alongside your integrator, inside an agreed scope.",
      items: [
        { product: "Athena", does: "Maps what the deployed system can reach, and which version, data and permissions are in scope.", output: "Scoped system and access map" },
        { product: "Achilles", does: "Tests access to restricted records and actions beyond the user’s authorization.", output: "Findings with effect evidence" },
        { product: "SPINE", does: "Ties acceptance evidence to the configuration it covered and flags it when that changes.", output: "Acceptance and change records" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Agreed with the program and the integrator.",
      items: [
        { name: "Traceable acceptance", body: "Evidence that names exactly what was evaluated." },
        { name: "Change visibility", body: "Post-acceptance changes tied to what they invalidate." },
        { name: "Bounded access", body: "Restricted-record access tested, not assumed." },
        { name: "Clear authority", body: "Human decisions recorded with their evidence." },
      ],
    },
    useCases: { title: "Scenarios for *mission teams.*", slugs: ["public-sector-mission-workflow", "internal-knowledge-rag-assistant", "data-platform-cloud-ai-integration", "partner-vendor-ai-integration"] },
    controls: {
      title: "Referenced, *never implied.*",
      lede: "Evidence can support the reviews programs already run. It is not an authorization, an approval or an accreditation.",
      items: [
        { name: "NIST SP 800-53", status: "mapped", note: "Findings are tagged to the controls they touch — never marked as satisfied." },
        { name: "DoD Zero Trust", status: "mapped", note: "Findings are tagged to the relevant capabilities." },
        { name: "OMB AI memoranda (M-25-21, M-25-22)", status: "reference", note: "Acceptance and change evidence can support what programs document under them." },
      ],
    },
    proof: {
      title: "A mission assistant, *start to finish.*",
      lede: "How one scoped engagement would run, alongside an integrator.",
      scenario: "An integrator is delivering an AI assistant for a program office. Before acceptance, the program wants evidence of exactly which version, data and permissions were evaluated.",
      events: [
        { label: "Scope agreed", meta: "with program and integrator", detail: "Version, data sources, roles and limits are written down and approved.", state: "verified", stateLabel: "Scoped" },
        { label: "Reach mapped", meta: "Athena", detail: "An integration grants the assistant read access to an archive outside the plan.", state: "observed" },
        { label: "Boundary tested", meta: "Achilles", detail: "A user without the role can retrieve a restricted record summary.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "same scenarios", detail: "The integration is scoped; restricted summaries no longer reach the wrong role.", state: "verified" },
        { label: "Decision", meta: "the program’s authority", detail: "Accepted for the evaluated version; the next update reopens the affected claims.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "Which system is approaching acceptance, and who is the integrator?",
        "What version, data and permissions should the evaluation cover?",
        "What constraints apply to where testing can run and what it can touch?",
        "Who holds decision authority, and what do they need to see?",
      ],
    },
    closing: { title: "Start with *one mission workflow.*", body: "Acceptance and change evidence for one system, delivered within an agreed scope." },
    startingPoint: "AI acceptance and change evidence, through an integrator",
  },
  {
    slug: "manufacturing-critical-infrastructure",
    name: "Manufacturing & Critical Infrastructure",
    metaTitle: "AI Assurance for Manufacturing & Critical Infrastructure",
    metaDescription:
      "Evidence for AI in operational environments — data, vendors and authority — kept separate from physical safety, with no live-system testing or safety claims.",
    hero: {
      eyebrow: "Manufacturing & Critical Infrastructure",
      headline: "Keep the World *Running.*",
      lede: "As AI enters operational environments, evidence must account for equipment, processes, vendors, cyber-physical dependencies and real-world effects.",
      primaryCta: { label: "Explore Operational Assurance", href: ASSESSMENT },
      planes: [{ src: "/assets/industries/manufacturing-critical-infrastructure-hero.webp", className: "-inset-[3%]", position: "70% 40%", depth: 6, priority: true }, sun()],
    },
    risks: {
      title: "Where operational AI *needs evidence.*",
      lede: "AI that plans, schedules or advises in operational settings brings IT-style risk close to physical processes.",
      items: [
        { name: "Operational data and tools", body: "AI with access to maintenance, scheduling or supplier systems." },
        { name: "Vendor AI", body: "Supplier tools inside operations that change on the supplier’s schedule." },
        { name: "Authority versus safety", body: "Having permission to act is not the same as being safe to act — the two need separate evidence." },
        { name: "Hand-offs to people", body: "Recommendations that operators may follow without the context behind them." },
        { name: "Downtime and resilience", body: "The cost of an AI-driven mistake in a process that has to keep running." },
      ],
    },
    capabilities: {
      title: "Evidence for the *IT side of operations.*",
      lede: "Mythos assesses AI workflows, data access and vendors — not live control systems, and not physical safety.",
      items: [
        { product: "Athena", does: "Maps the data, systems and vendors an operational AI workflow can reach.", output: "Access and dependency map" },
        { product: "Achilles", does: "Tests the workflow’s permissions and recommendations in a test environment.", output: "Findings with evidence" },
        { product: "SPINE", does: "Keeps conclusions tied to versions, and reopens them when a vendor or model changes.", output: "Claims and change records" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Agreed with your operations and security owners.",
      items: [
        { name: "Known dependencies", body: "Data, systems and vendors in scope mapped and evidenced." },
        { name: "Bounded authority", body: "What the AI can do, tested in a safe environment." },
        { name: "Vendor visibility", body: "Supplier changes tied to what they affect." },
        { name: "Clear hand-offs", body: "Operator decisions recorded with their evidence." },
      ],
    },
    useCases: { title: "Scenarios for *operations.*", slugs: ["data-platform-cloud-ai-integration", "ai-agent-tools-actions", "partner-vendor-ai-integration", "ai-driven-vehicle-systems-hermes"] },
    controls: {
      title: "Referenced, *never certified.*",
      lede: "Operational and safety standards that apply to you are identified during scoping. Mythos makes no safety certification.",
      items: [
        ...MAPPED_CORE,
        { name: "NIST critical-infrastructure AI profile", status: "reference", note: "Referenced as context for evidence." },
        { name: "Your safety and OT security standards", status: "reference", note: "Identified with your team; physical safety stays with your safety owners." },
      ],
    },
    proof: {
      title: "A maintenance planner, *start to finish.*",
      lede: "How one scoped engagement would run, entirely outside production.",
      scenario: "A manufacturer wants an AI assistant to draft maintenance plans from equipment history and supplier bulletins. It asks what the assistant can reach and whether a bulletin could steer it.",
      events: [
        { label: "Scope agreed", meta: "test environment only", detail: "Data, systems and limits are written down; no live control systems are touched.", state: "verified", stateLabel: "Scoped" },
        { label: "Reach mapped", meta: "Athena", detail: "The assistant can also write to the work-order system — not in the design.", state: "observed" },
        { label: "Behavior tested", meta: "Achilles", detail: "Text inside a supplier bulletin makes the assistant draft an out-of-schedule work order.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "same scenarios", detail: "Write access removed; drafts go to a planner for approval.", state: "verified" },
        { label: "Decision", meta: "your operations owner", detail: "Approved for drafting only, with retest on the next supplier update.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "Which AI workflow touches operations, and in what role?",
        "What systems and vendors can it reach, and can it write to any of them?",
        "What test environment can we use so production is never touched?",
        "Who owns safety decisions, and how should our evidence reach them?",
      ],
    },
    closing: { title: "Start with *one operational workflow.*", body: "A scoped assessment in a test environment, with evidence your operations and security teams can use." },
    startingPoint: "High-risk AI assessment",
  },
  {
    slug: "integrators-vendors",
    name: "Systems Integrators & AI Vendors",
    metaTitle: "AI Assurance for Systems Integrators & AI Vendors",
    metaDescription:
      "Release evidence, vendor-asserted versus verified evidence and change records that travel with what you deliver — with roles and independence made explicit.",
    hero: {
      eyebrow: "Systems Integrators & AI Vendors",
      headline: "Build Customer Trust Into *Every Deployment.*",
      lede: "Give buyers and delivery teams a repeatable way to define scope, validate permissions, produce evidence and retest changes before handoff.",
      primaryCta: { label: "Discuss a Partnership", href: "/contact?intent=partner" },
      planes: [
        { src: OLYMPUS_MEDIA.panorama.src, className: "-inset-[3%]", position: "60% 40%", depth: 6, priority: true },
        { src: OLYMPUS_MEDIA.sunrays, className: "-inset-[3%]", blend: "screen", opacity: 0.6, position: "60% 40%", depth: 10 },
      ],
    },
    risks: {
      title: "What your *customers will ask.*",
      lede: "Delivery is judged at hand-off — and again every time a model, route or vendor changes afterwards.",
      items: [
        { name: "Release evidence", body: "Proof of what was tested before the system changed hands." },
        { name: "Declared versus verified", body: "Vendor controls described in documents, never observed in the running system." },
        { name: "Route and model changes", body: "Providers and models that change after delivery." },
        { name: "Integration permissions", body: "Service accounts and connectors that end up broader than designed." },
        { name: "Recurring assurance", body: "Customers who want evidence kept current, not a one-time report." },
      ],
    },
    capabilities: {
      title: "Evidence that *travels with delivery.*",
      lede: "Roles, customer ownership and independence are agreed up front. Mythos does not attest to fixes it made itself.",
      items: [
        { product: "Athena", does: "Maps what the delivered system can reach, including connectors and model routes.", output: "Hand-off access map" },
        { product: "Achilles", does: "Tests permissions and behavior before hand-off, against the agreed scope.", output: "Release findings and retests" },
        { product: "SPINE", does: "Caps vendor-asserted claims at supported and keeps the evidence current after delivery.", output: "Signed receipts and change records" },
      ],
    },
    impact: {
      title: "What we would *expect to measure.*",
      lede: "Agreed with you and your customer.",
      items: [
        { name: "Smoother hand-offs", body: "Acceptance supported by evidence, not slides." },
        { name: "Fewer post-delivery surprises", body: "Permissions and routes tested before go-live." },
        { name: "Tested vendor claims", body: "Vendor-asserted controls checked against what was observed." },
        { name: "Recurring evidence", body: "Retests after changes, on an agreed cadence." },
      ],
    },
    useCases: { title: "Scenarios for *delivery teams.*", slugs: ["partner-vendor-ai-integration", "ai-agent-tools-actions", "developer-ai-assistant", "data-platform-cloud-ai-integration"] },
    controls: {
      title: "Evidence your customers *can map.*",
      lede: "Findings carry the mappings your customers’ reviewers use. Independence is part of the arrangement, not an afterthought.",
      items: [
        ...MAPPED_CORE,
        { name: "DoD Zero Trust", status: "mapped", note: "Findings are tagged to the relevant capabilities." },
        { name: "Your customer’s frameworks", status: "reference", note: "Identified with the customer during scoping." },
      ],
    },
    proof: {
      title: "A delivery, *start to finish.*",
      lede: "How one engagement alongside a partner would run.",
      scenario: "An integrator is handing over an AI workflow that connects a customer’s CRM to a vendor model. The customer wants evidence of what was tested, by whom, and what happens after the vendor’s next update.",
      events: [
        { label: "Roles agreed", meta: "integrator · customer · Mythos", detail: "Who tests, who fixes and who owns the evidence are written down.", state: "verified", stateLabel: "Scoped" },
        { label: "Reach mapped", meta: "Athena", detail: "The connector’s token can read every CRM object, not just the ones in the design.", state: "observed" },
        { label: "Boundary tested", meta: "Achilles", detail: "A prompt routed through the workflow retrieves records outside its purpose.", state: "contradicted", stateLabel: "Finding" },
        { label: "Fix retested", meta: "fixed by the integrator", detail: "Scopes narrowed; Mythos retests and records the result independently.", state: "verified" },
        { label: "Decision", meta: "the customer", detail: "Accepted at hand-off; retest scheduled for the vendor’s next model update.", state: "held", stateLabel: "Human decision" },
      ],
    },
    questions: {
      title: "What we would *ask first.*",
      items: [
        "What are you delivering, and to which kinds of customers?",
        "What evidence do your customers ask for at hand-off?",
        "Which vendor models and routes do your deliveries depend on?",
        "How should roles and independence work between us and your customer?",
      ],
    },
    closing: { title: "Deliver AI *with evidence attached.*", body: "Talk to us about how Mythos evidence could travel with what you deliver." },
    startingPoint: "Delivery partnership · third-party AI vendor assurance",
  },
];

export function getIndustry(slug: string): IndustryContent | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/** Solutions hub (Launch Guide Section 09). */
export const SOLUTIONS_HUB = {
  hero: {
    eyebrow: "Solutions",
    headline: "AI Assurance for *Real-World Impact.*",
    lede: "Every sector faces a different combination of sensitive data, delegated authority, change, operational consequence and audit obligations. Mythos applies evidence-backed assurance to those environments without promising one-size-fits-all safety.",
  },
  switcher: {
    eyebrow: "Choose your environment",
    title: "Seven environments, *one method.*",
    lede: "Pick the one closest to yours to see where the risk sits and where to start.",
  },
  pillars: {
    eyebrow: "The same four questions everywhere",
    title: "Understand. Validate. *Measure. Assure.*",
    items: [
      { name: "Understand", body: "What the AI system can reach and which authority it carries.", product: "Athena" },
      { name: "Validate", body: "Whether it stays inside that authority when someone pushes.", product: "Achilles" },
      { name: "Measure", body: "Against acceptance measures agreed with you before testing starts.", product: "Agreed in scoping" },
      { name: "Assure", body: "That the evidence still describes the system after it changes.", product: "SPINE" },
    ],
  },
  bridge: {
    eyebrow: "From architecture to sector",
    title: "Where each part *does the most work.*",
    lede: "Every engagement uses the whole system. These are the places each part tends to carry the most weight.",
  },
  featured: {
    eyebrow: "A walkthrough",
    title: "One workflow, *start to finish.*",
    lede: "There are no customer case studies on this site yet. This walkthrough is illustrative, built on synthetic data.",
  },
  standards: {
    eyebrow: "Frameworks by sector",
    title: "Mapped where built, *referenced everywhere else.*",
    lede: "Findings are mapped to a small set of frameworks today. Sector frameworks are referenced so evidence can support your reviews — never as certification.",
  },
} as const;

/** Where each product tends to carry the most weight, by sector (qualitative, not a claim of results). */
export const SOLUTIONS_BRIDGE: { slug: string; athena: string; achilles: string; spine: string }[] = [
  { slug: "financial-services-insurance", athena: "Customer data and supplier reach", achilles: "Cross-customer access, unsafe actions", spine: "Evidence through supplier updates" },
  { slug: "healthcare-life-sciences", athena: "Records, research data and vendors", achilles: "Permission and exposure tests", spine: "Conclusions through role changes" },
  { slug: "ai-saas", athena: "Model routes and tenant paths", achilles: "Cross-tenant and agent misuse", spine: "Receipts per release" },
  { slug: "regulated-enterprise", athena: "Inventory, owners and policy", achilles: "Consequential-decision behavior", spine: "Assessments that stay current" },
  { slug: "public-sector-mission", athena: "Exactly what was evaluated", achilles: "Restricted-record access", spine: "Acceptance and change records" },
  { slug: "manufacturing-critical-infrastructure", athena: "Operational data and vendors", achilles: "Authority in a test environment", spine: "Vendor and version changes" },
  { slug: "integrators-vendors", athena: "Hand-off reach and connectors", achilles: "Release testing", spine: "Vendor-asserted versus verified" },
];

/** Hub switcher art and first risks, per sector. */
export const SOLUTIONS_SWITCHER: Record<string, { image: string; position: string; overlay?: { src: string; className: string } }> = {
  "financial-services-insurance": { image: "/assets/industries/financial-services-hero.webp", position: "75% 40%" },
  "healthcare-life-sciences": { image: "/assets/industries/healthcare-life-sciences-hero.webp", position: "70% 40%" },
  "ai-saas": { image: "/assets/industries/technology-ai-saas-hero.webp", position: "65% 40%" },
  "regulated-enterprise": { image: "/assets/olympus/marble-city.webp", position: "75% 40%" },
  "public-sector-mission": {
    image: "/assets/olympus/cloud-sea.webp",
    position: "50% 55%",
    overlay: { src: "/assets/olympus/cliff-temple.webp", className: "-right-[4%] bottom-[18%] h-[62%] w-[72%] object-[100%_100%]" },
  },
  "manufacturing-critical-infrastructure": { image: "/assets/industries/manufacturing-critical-infrastructure-hero.webp", position: "70% 40%" },
  "integrators-vendors": { image: "/assets/olympus/panorama.webp", position: "60% 40%" },
};
