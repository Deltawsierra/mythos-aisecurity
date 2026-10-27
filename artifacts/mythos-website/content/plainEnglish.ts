/**
 * "Is Mythos Right for Us?" — the plain-English page (/ai-risk-explained/).
 *
 * Written for readers with no technical background, board members first.
 * Source: the owner's Plain English Page Template (27 Oct 2026) and brief.
 * Every capability line draws on the claims ledger or capability sections of
 * the Master Inventory (26 Oct 2026); limits come from its do-not-claim list.
 * Examples are invented to explain a risk and are labelled that way on the
 * page. No prices, no offer names (pricing.offer-structure is still open).
 * The board questions live in boardSheet.json, shared with the PDF script.
 */
import BOARD_SHEET from "./boardSheet.json";

export { BOARD_SHEET };

export const PLAIN_ENGLISH_PDF = "/assets/downloads/mythos-board-ai-risk-questions.pdf";

/** The three ways into the page, by time available. */
export const READING_LEVELS = [
  { time: "1 minute", title: "The short version", body: "What Mythos does and why it matters, in five points.", href: "#overview" },
  { time: "5 minutes", title: "Find your situation", body: "Nine common situations, each answered the same way.", href: "#situations" },
  { time: "For the board", title: "Questions to ask", body: "Twelve questions and one sentence to take into the meeting.", href: "#board" },
] as const;

/** The one-minute overview. */
export const OVERVIEW = [
  {
    title: "AI can now act, not just answer.",
    body: "Many businesses let AI answer customers, search documents, send messages or update records. That is useful. It also means the AI holds real access to real systems.",
  },
  {
    title: "The risk sits in its access.",
    body: "The question is not how clever the AI is. It is what the AI can reach and do, and whether someone could talk it into doing the wrong thing.",
  },
  {
    title: "Attackers use AI too.",
    body: "Attackers may use AI against your existing systems, even if your company does not use AI itself. It helps them find and exploit familiar weaknesses faster.",
  },
  {
    title: "Mythos tests, with permission, and shows the evidence.",
    body: "We agree in writing what to test, test it in an authorized environment, and explain what happened in plain language, with the records behind it and a list of what we did not check.",
  },
  {
    title: "Your team stays in charge.",
    body: "Your people decide what to fix and make the changes. We test the agreed fixes again and record what is still open.",
  },
] as const;

export const WHO_WE_ARE =
  "Mythos AI Security helps businesses understand and test security risks involving AI: what your own AI can reach and do, and how attackers using AI could affect your websites and software. We turn testing with clear, agreed limits into plain findings, recommended changes and evidence that leaders can rely on. We confirm what we can support before any work begins.";

export interface Situation {
  id: string;
  /** Short label above the question. */
  tag: string;
  question: string;
  /** One-line answer shown before the reader opens the detail. */
  short: string;
  meaning: string;
  example: string;
  examine: string;
  evidence: string;
  board: string;
  /** A line for readers who answered "no", where it changes the advice. */
  ifNot?: string;
  source?: { label: string; href: string };
}

/** The five-minute guide: each situation opens the same five-part answer. */
export const SITUATIONS: Situation[] = [
  {
    id: "planning",
    tag: "Before you start",
    question: "Are you planning to introduce AI?",
    short: "Decide what it needs before you connect it.",
    meaning:
      "Before an AI system is connected to real information or real actions, decide what it needs to read and what it is allowed to do. Problems are cheaper to prevent at this stage than to fix after launch.",
    example:
      "A company plans a customer-service assistant. It needs to read customer enquiries. It does not need to change account details or issue refunds, so it should not be given that power.",
    examine:
      "We review the proposed workflow and test the agreed limits in an authorized test environment, with test data and test accounts, before it touches live systems.",
    evidence:
      "A plain summary of what the planned AI could reach and do, findings backed by test records, and a list of what was not tested.",
    board: "What evidence do we need before we approve its access?",
  },
  {
    id: "recent",
    tag: "Just launched",
    question: "Have you recently added AI to your systems?",
    short: "A good demonstration is not the same as a test.",
    meaning:
      "A demonstration shows that the AI can do useful work. It does not show how it behaves when someone gives it misleading instructions or asks for something unusual.",
    example:
      "A new assistant summarizes supplier documents well. One document contains hidden text telling it to send the summary to an outside address. Does it follow the hidden instruction?",
    examine:
      "We test the workflow you built against misuse scenarios agreed with you in advance, such as hidden instructions, attempts to step outside its job and requests for information it should not share, and record what it actually did.",
    evidence:
      "Findings explained in business terms, the records behind each one, and a clear list of what was tested and what could not be measured.",
    board: "Have we tested what it must never do, as well as what we want it to do?",
  },
  {
    id: "actions",
    tag: "AI that acts",
    question: "Can your AI send messages, change records or make payments?",
    short: "An AI that acts carries more risk than one that only writes.",
    meaning:
      "An AI that only drafts text can be wrong. An AI that sends, changes or pays can cause real events. A suggested refund and an issued refund are different business events.",
    example:
      "An assistant drafts refund suggestions for a person to approve. Could someone persuade it to issue the refund itself, or to change the amount after a person approved it?",
    examine:
      "We look at what the AI is permitted to do and which actions need a person's approval, then test whether those actions stay inside the limits, including attempts to skip, reuse or fake an approval.",
    evidence:
      "We separate what the AI said it did from what the records show happened. An AI replying “done” is never treated as proof. Where an outcome could not be observed, the report says so.",
    board: "Which actions need approval, and can that approval be bypassed?",
  },
  {
    id: "confidential",
    tag: "Private information",
    question: "Does your AI handle confidential or customer information?",
    short: "The question is who can get it out.",
    meaning:
      "What matters is which information the AI can reach, who is entitled to receive it, and where the AI can send it.",
    example:
      "A staff help-desk assistant can search HR documents. A test user with no payroll access asks it about a colleague's salary. Does it answer?",
    examine:
      "We test agreed data-access and disclosure scenarios with approved test data and test accounts, under written limits on what is tested. We do not test your sign-in system or every user's individual permissions.",
    evidence:
      "For each finding: the request, the test user's permissions and the information that came back, so your team can see exactly what happened.",
    board: "Could someone obtain information they should not be able to see?",
  },
  {
    id: "where",
    tag: "Visibility",
    question: "Do you know where AI is used across the business?",
    short: "If not, start with a simple list.",
    meaning:
      "Teams often adopt AI tools on their own, and each tool may connect to company documents, email or systems. Unknown use can mean unknown access to company information.",
    example:
      "A marketing team uses a document assistant connected to the shared drive. The security lead has never reviewed it, and nobody is named as its owner.",
    examine:
      "Ask each team which AI tools they use, what those tools connect to and who owns them. Bring the list to us and we will help choose the most useful place to start. During an assessment, we record the AI components, tools and connections we find in the agreed workflow.",
    evidence: "A record of the AI parts, tools and connections in the assessed workflow, and what each one can reach.",
    board: "Where do we use AI, and who owns each use?",
  },
  {
    id: "supplier",
    tag: "Bought-in AI",
    question: "Do you use AI supplied by another company?",
    short: "Check your own setup, not just the supplier's promises.",
    meaning:
      "A supplier's assurances are useful, but they describe the product in general. Your own settings, connections and permissions decide what it can do inside your business.",
    example:
      "Your team connects a purchased assistant to internal documents. That connection gives it access the supplier never assessed.",
    examine:
      "We assess the workflow you actually run, where the supplier and the system owner authorize testing. A supplier's statement is recorded as the supplier's statement, and counts as verified only when our own testing supports it.",
    evidence: "A report that shows which conclusions come from our testing and which rest only on supplier statements.",
    board: "What have we verified about our own setup, rather than the supplier's product in general?",
  },
  {
    id: "attackers",
    tag: "Even if you do not use AI",
    question: "Are your websites and software ready for attackers using AI?",
    short: "This applies even if your company does not use AI.",
    meaning:
      "Attackers may use AI against your existing systems, even if your company does not use AI itself. AI helps them search for weaknesses and write attack tools faster, but the weaknesses they look for are mostly familiar ones: unpatched software, default passwords, websites that reveal more than they should. Patching, access controls and your existing security team matter as much as ever.",
    example:
      "In a 2026 advisory, the US Cybersecurity and Infrastructure Security Agency (CISA) described attackers using AI to write attack scripts against industrial equipment that was reachable from the internet with default or weak passwords. The tool was new. The weakness was old.",
    examine:
      "Within an agreed scope, we test websites, web applications and the connections behind them for well-known weaknesses attackers look for first, such as tricking a site into revealing data or running commands it should not. We say which kinds of weakness our testing does not yet cover, and where the work belongs with your existing team. This is testing, not a shield: it does not block bots or attacks.",
    evidence:
      "Each finding is checked against a harmless version of the same request, so you are not handed a pile of false alarms. Every test request we send is logged, and the report lists what was out of scope.",
    board: "Have our defenses been tested against realistic attack methods, whatever tools attackers use?",
    source: { label: "Read the CISA advisory", href: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-231a" },
  },
  {
    id: "existing-team",
    tag: "Working alongside",
    question: "Do you already have a security team or testing provider?",
    short: "Keep them. Ask where their testing stops.",
    meaning:
      "Existing security still matters. The useful question is whether their testing covers the AI's instructions, connected tools, access and approvals, which is where AI risk sits.",
    example:
      "Your annual security test covers the website. It does not cover the assistant that reads incoming email and can create support tickets.",
    examine:
      "We help close a defined gap without repeating work already covered, alongside the people who know your systems. Findings can go straight into the tools your team already uses to track work, such as Jira, GitHub, ServiceNow or Splunk.",
    evidence: "Findings your technical team can review, in priority order, with a clear line between our scope and theirs.",
    board: "Who owns this risk, and where does our current testing stop?",
    ifNot: "No security team? Tell us who runs your technology. We agree the right people and scope before any testing.",
  },
  {
    id: "changes",
    tag: "After a change",
    question: "Have you changed the AI model, its tools or its permissions?",
    short: "Earlier results may no longer apply.",
    meaning:
      "A new AI model, a new connection or wider permissions can change the risk. Evidence about the old setup may not answer questions about the new one.",
    example:
      "An assistant that could only read customer records is updated so it can edit them. The earlier test never covered editing.",
    examine:
      "We compare the change against the recorded starting point, identify which checks need repeating, and run them again, with agreed examples of normal work alongside. We do not watch your systems around the clock: a review is triggered by the changes you agree with us.",
    evidence: "A comparison with the earlier results: what still holds, what has changed, and what needs a fresh look.",
    board: "Which changes trigger another review?",
  },
];

/** The engagement in six plain steps. */
export const STEPS = [
  { title: "Agree on one workflow", body: "Choose the AI workflow or system that matters most, and agree in writing what may be tested, how and when." },
  { title: "Test it", body: "We test within those limits in an authorized environment. Testing can be paused or stopped at any point, and nothing in our system can block a stop." },
  { title: "Explain the findings", body: "In plain English for leaders, with the technical detail and records for your team." },
  { title: "Your team makes changes", body: "You decide what to fix and how. Mythos does not change your systems." },
  { title: "Retest the agreed fixes", body: "We repeat the checks. A finding closes only when the retest shows the failure no longer happens under the tested conditions." },
  { title: "Record what remains open", body: "Anything not fixed, not tested or not measurable is written down, so management can assign an owner." },
] as const;

export const DELIVERABLES = [
  "A plain-English summary for leaders",
  "What was tested, and what was outside the scope",
  "Findings supported by evidence",
  "Recommended changes, in priority order",
  "Retest results, where a retest is included and performed",
  "Remaining limitations, and the decisions left for management",
] as const;

export const NOT_INCLUDED = [
  "Automatic repairs to your systems",
  "Live blocking of attacks or bots",
  "Round-the-clock monitoring",
  "Emergency incident response",
  "Compliance certification",
] as const;

/** Introduced only after the reader understands the service. */
export const TOOLS = [
  {
    project: "athena" as const,
    name: "Athena",
    role: "Tests websites and applications",
    body: "Athena runs well-known attack techniques, with permission, against your websites and the connections behind them, and keeps a record of every test request it sends. It answers the “attackers using AI” question.",
    href: "/platform/athena",
  },
  {
    project: "achilles" as const,
    name: "Achilles",
    role: "Tests AI assistants and agents",
    body: "Achilles tries to push an AI past its job: following hidden instructions, leaking information or acting without approval. It records what the AI actually did, not what it said it did.",
    href: "/platform/achilles",
  },
] as const;

export interface PlainFaq {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

/** Questions buyers may hesitate to ask. The last answers state the limits plainly. */
export const BUYER_QUESTIONS: PlainFaq[] = [
  {
    q: "Do we need to understand AI to start?",
    a: "No. Tell us what the system does for your business and who looks after it. We handle the technical detail and explain the results in plain language.",
  },
  {
    q: "Will testing disrupt our operations?",
    a: "Testing follows written limits agreed in advance: which systems, which times, and what is never allowed. A workflow assessment uses an authorized test environment, not your live systems. Testing can be paused or stopped at any point.",
  },
  {
    q: "What access or information would we need to provide?",
    a: "A description of the workflow, the people who own it, and access to an agreed test environment with test accounts. Never send passwords, keys, customer data or source code through the website or in a first email. Anything sensitive is exchanged only after the agreement, through the agreed channel.",
    link: { label: "How engagement starts", href: "/engagement" },
  },
  {
    q: "Who can see our information, and how is it handled?",
    a: "How your information is handled is set out in the written agreement before anything is shared. The Trust Center explains how we handle authorization, scope, data and evidence.",
    link: { label: "Trust Center", href: "/trust" },
  },
  {
    q: "What happens if you find a problem?",
    a: "We explain it in plain terms, show the evidence and recommend changes in priority order. The agreement names an escalation contact, so anything urgent found during testing reaches the right person without waiting for the report.",
  },
  {
    q: "Who performs the fixes?",
    a: "Your team, or a supplier you choose. Mythos does not change your systems. We retest the agreed fixes and record whether the failure still happens.",
  },
  {
    q: "If the tests find nothing, does that mean we are completely safe?",
    a: "No. A scoped assessment gives you evidence about what was tested, under the conditions tested. It does not guarantee future safety, and no test finds every weakness. Systems change and new attack methods appear. That is why every report states what was not tested, and why changes should trigger a fresh look. NIST's guide to security testing describes the same scoped approach.",
    link: { label: "NIST SP 800-115", href: "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf" },
  },
  {
    q: "Does this replace our security provider, or certify that we comply?",
    a: "No to both. Keep your access controls, software updates, backups and incident plans, and keep your existing provider. Mythos adds focused testing. Findings can be mapped to recognized frameworks, such as NIST SP 800-53 and the OWASP Top 10, which gives your auditors evidence. It is not a certificate and does not establish compliance on its own.",
    link: { label: "Standards & mapping", href: "/standards" },
  },
  {
    q: "What if an incident is happening right now?",
    a: "Contact your incident-response team or provider straight away. A planned assessment is not emergency response.",
  },
];

/** Plain definitions. The full glossary covers Mythos's own terms. */
export const TERMS = [
  { term: "AI agent", def: "Software that uses AI to perform tasks with connected tools, such as reading email, searching files or updating records." },
  { term: "Workflow", def: "The steps from a request to a business result, including every tool and person involved." },
  { term: "Permissions", def: "What a person or a system is allowed to see or do." },
  { term: "Hidden instructions", def: "Text placed in an email, document or web page that tries to make an AI do something its owner did not intend. Specialists call this prompt injection." },
  { term: "Red team", def: "People or tools that play the attacker, with permission, to find weaknesses before real attackers do." },
  { term: "Scope", def: "The written agreement about what will be tested, how and when, and what will not." },
  { term: "Evidence", def: "The records that show what happened during a test, so others can check the conclusion." },
  { term: "Retest", def: "Repeating checks after a change to see whether the repair worked." },
] as const;

/** Public sources. They explain general risks; none endorses Mythos. */
export const SOURCES = [
  {
    name: "OWASP Top 10 for LLM Applications (2025)",
    body: "Risks from hidden instructions, and from giving AI too much access or freedom to act.",
    href: "https://genai.owasp.org/llm-top-10/",
  },
  {
    name: "NIST AI Risk Management Framework",
    body: "How organizations can govern and manage AI risk.",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
  },
  {
    name: "NIST SP 800-115",
    body: "Technical guide to security testing: scoped tests, and what they can and cannot show.",
    href: "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf",
  },
  {
    name: "CISA advisory AA26-231A",
    body: "Attackers using AI-written scripts against exposed equipment with default or weak passwords.",
    href: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-231a",
  },
] as const;

/** The three opening questions under the hero, each linked to its answer. */
export const OPENERS = [
  { q: "Do you use AI?", a: "Know what it can reach and do.", href: "#situation-recent" },
  { q: "Can your AI change records, send messages or make payments?", a: "Yes or unsure? Have Mythos test those limits.", href: "#situation-actions" },
  { q: "Are your systems ready for attackers using AI?", a: "If you do not know, start here, even without AI of your own.", href: "#situation-attackers" },
] as const;
