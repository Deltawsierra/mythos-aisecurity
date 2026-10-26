/**
 * Achilles page copy (blueprint Section 7), checked against the Master
 * Inventory (26 Oct 2026). Present tense: eight capabilities across 32
 * scenarios, six cross-channel chains with canaries and benign counterparts,
 * evidence tiers, the canary comparison and the reference Action Gate. The
 * page shows what an assessment TESTS; runtime enforcement is a separate
 * engagement. Limits stated: scan results are not yet signed into the record
 * (planned); the verified-effect tier needs a witness. No "utility retained"
 * scoring. Exact payloads stay internal.
 */
import type { Group } from "@/components/platform/GroupList";
import type { GateTest } from "@/components/platform/ActionGate";
import type { HandoffStep } from "@/components/platform/HandoffFlow";
import { EVIDENCE_STATE_ICONS } from "@/content/media";

export const ACHILLES_COPY = {
  /** Launch Guide R05 — leads with effects, scope and authority, not only jailbreaks. */
  hero: {
    eyebrow: "Achilles · test the AI",
    headline: "Constantly Tested AI *Never Fights Alone.*",
    lede: "Achilles challenges the behavior of AI systems and agents against declared permissions, tool boundaries, approvals and expected effects — before unchecked authority becomes a business problem.",
  },
  families: {
    eyebrow: "Capability families",
    title: "Eight ways an AI deployment *goes wrong.*",
    lede: "Eight capabilities across 32 scenarios, multi-turn, scored on signals in the response — never the model’s narration. Exact payloads stay internal.",
  },
  chains: {
    eyebrow: "Cross-channel and multi-step",
    title: "One message rarely breaks an agent. *A sequence might.*",
    lede: "Achilles tests across turns, where pressure builds over a conversation, and runs six cross-channel chains — web, email, document, MCP, agent and gate — each with two inert canaries and a benign counterpart.",
  },
  gate: {
    eyebrow: "Action Gate states",
    title: "Did the agent make *the call it should have?*",
    lede: "For each consequential request, Achilles compares the decision your controls should make — permit, escalate, hold or deny — with what the agent actually did.",
    footnote: "This assessment tests your stack; it is not a runtime control. Achilles is also the reference enforcement stack, whose Action Gate permits only the exact action approved — runtime enforcement is a separate engagement.",
  },
  questions: {
    eyebrow: "Effect-bound approvals",
    title: "An approval is for *one exact action.*",
    lede: "The commercial risk is rarely a clever prompt. It is an action that quietly went further than anyone allowed.",
  },
  effects: {
    eyebrow: "Observed effect",
    title: "What happened — *not what the agent said.*",
    lede: "Every result is scored on signals in the response and tiered: judgment compromise, authority violation, verified unauthorized effect. Only a witness of external state assigns that last tier, never Achilles alone. An untested boundary reads INCONCLUSIVE.",
  },
  retest: {
    eyebrow: "Canary comparison and retest",
    title: "A fix that blocks real work *is its own finding.*",
    lede: "A retest reports whether the failure recurs and, separately, which benign counterparts and legitimate requests the fix now refuses — against negative controls that must keep holding.",
  },
  handoff: {
    eyebrow: "SPINE and Minotaur handoff",
    title: "Achilles tests. SPINE remembers. *Minotaur checks the tester.*",
    lede: "Signed chain outcomes and observed effects update the claims they bear on, and the decision is recalculated. Scan results join the record once they are signed — that is next. Minotaur measures the tester.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where Achilles *leads.*",
  },
} as const;

export const ACHILLES_FAMILIES: Group[] = [
  {
    name: "Goal hijack",
    question: "Can someone redirect what the AI is trying to do?",
    items: ["Direct instructions, and instructions hidden in content it reads", "A web-retrieval chain that carries the hijack in"],
  },
  {
    name: "RAG leakage",
    question: "Can retrieval surface data the user should never see?",
    items: ["Context exfiltration, including planted secrets", "Context leaking across sessions or tenants"],
  },
  {
    name: "Agent and tool misuse",
    question: "Can the AI be steered into calling tools it shouldn’t?",
    items: ["Confused-deputy calls and scope escalation", "An email-memory chain that steers a later tool call"],
  },
  {
    name: "Permission boundary",
    question: "Does the AI stay inside the access it was granted?",
    items: ["Privilege escalation beyond the requester’s rights", "Authorization checks bypassed"],
  },
  {
    name: "Jailbreak resistance",
    question: "Do safety instructions hold under sustained pressure?",
    items: ["Crescendo: multi-turn pressure, not one-shot tricks", "Persona adoption under sustained role-play"],
  },
  {
    name: "Insecure output",
    question: "Can the AI’s output become someone else’s exploit?",
    items: ["Output that executes downstream", "Injection payloads passed to other systems"],
  },
  {
    name: "MCP and tool integrity",
    question: "Are the tools and skills it trusts what they claim to be?",
    items: ["Poisoned tool descriptions and shadow tools", "Skill chains, RAG-to-MCP and server relay · ten scenarios"],
  },
  {
    name: "Action and approval authority",
    question: "Can it act beyond the authority it was given?",
    items: ["Approval bypass and claimed human approval", "Multi-agent escalation, delegated authority, agent relay · eight scenarios"],
  },
];

/** One illustrative chain; Achilles runs six (web, email, document, MCP, agent, gate). */
export const ACHILLES_CHAIN = [
  { step: "Inbound email", detail: "Carries hidden instructions" },
  { step: "Retrieval", detail: "Pulls the email into context" },
  { step: "Plan", detail: "The agent adopts the instruction" },
  { step: "Tool call", detail: "A tool is invoked" },
  { step: "Canary", detail: "An inert canary shows how far it got" },
];

export const ACHILLES_GATE_TESTS: GateTest[] = [
  {
    request: "Refund $120 to the original card",
    expected: "permit",
    observed: "Refund issued to the original card.",
    pass: true,
    verdict: "Within policy, to the original destination.",
  },
  {
    request: "Refund $4,800",
    expected: "escalate",
    observed: "Refund issued without approval.",
    pass: false,
    verdict: "An authority violation: the action outran its approval.",
  },
  {
    request: "Refund to a new card after approval",
    expected: "deny",
    observed: "Blocked — the destination changed after approval.",
    pass: true,
    verdict: "The approval stayed bound to the action it authorized.",
  },
  {
    request: "Forty small refunds in ten minutes",
    expected: "hold",
    observed: "All forty executed.",
    pass: false,
    verdict: "Small actions added up to one it was never allowed to take.",
  },
];

export const ACHILLES_AUTHORITY_QUESTIONS = [
  { name: "Approval binding", question: "Does an approval still hold if the amount or destination changes?" },
  { name: "Check at the moment of action", question: "Is permission re-checked when the action runs, not only when it was planned?" },
  { name: "Cumulative limits", question: "Can many small actions add up to one the agent was never allowed to take?" },
  { name: "Revocation", question: "When access is withdrawn, how quickly does the agent actually stop?" },
  { name: "Override", question: "Can an urgent request push past a hold it should respect?" },
  { name: "Refusal memory", question: "Does the agent remember a refusal — or keep retrying until it hears yes?" },
];

export const ACHILLES_HANDOFF: HandoffStep[] = [
  { owner: "Achilles", name: "Signed outcome", detail: "Chain outcomes and observed effects, each signed.", icon: "/assets/evidence/change-event.svg" },
  { owner: "SPINE", name: "Claim updated", detail: "Evidence can hold the claim back, never lift it.", icon: EVIDENCE_STATE_ICONS.contradicted },
  { owner: "SPINE", name: "Decision recalculated", detail: "Worst-of-N, held until a retest. Your team decides.", icon: "/assets/evidence/deployment-decision-gate.svg" },
  { owner: "Minotaur", name: "Method measured", detail: "Achilles is scored on planted cases with known answers.", icon: "/assets/ornaments/mythos-seal.svg" },
];

/** AC05 — the approved action and the fields its approval is bound to (Launch Guide F02). */
export const ACHILLES_APPROVAL = {
  lede: "Change any field the approval was bound to and the permit should no longer apply. Achilles tests whether your stack notices.",
  approved: {
    action: "Refund $1,200 for order #88213",
    by: "Approved by the support lead, 10:42",
  },
  fields: [
    {
      id: "none",
      label: "Nothing changes",
      field: "—",
      was: "",
      now: "",
      outcome: "allowed" as const,
      reason: "Destination, amount, identity, order and effect all match the approval. The action runs once.",
    },
    {
      id: "destination",
      label: "Change the destination",
      field: "Destination",
      was: "Card ending 4471",
      now: "Card ending 9902",
      outcome: "denied" as const,
      reason: "The approval named card 4471. A new destination needs a new approval.",
    },
    {
      id: "amount",
      label: "Raise the amount",
      field: "Amount",
      was: "$1,200",
      now: "$1,900",
      outcome: "held" as const,
      reason: "The amount exceeds what was approved, so the action is held for a fresh approval.",
    },
    {
      id: "identity",
      label: "Swap who it acts for",
      field: "Acting for",
      was: "Customer C-1042",
      now: "Customer C-2213",
      outcome: "denied" as const,
      reason: "The approval was bound to one customer's request. It cannot carry over to another.",
    },
    {
      id: "effect",
      label: "Run it a second time",
      field: "Expected effect",
      was: "One refund",
      now: "A second refund",
      outcome: "denied" as const,
      reason: "The approved effect already happened. A repeat is a new action, not the same one.",
    },
  ],
  footnote: "Illustrative and synthetic. Achilles tests approval binding in its action-and-approval-authority family; its reference Action Gate binds a permit to the action, policy and authority epoch, and blocks edits to any of the eight canonical fields.",
} as const;

/** AC06 — attempted action, policy decision, actual invocation and recorded outcome. */
export const ACHILLES_LEDGER = [
  {
    attempt: "Refund $120 to the original card",
    decision: "Allowed",
    invocation: "refund.create(120, card 4471)",
    outcome: "Observed effect — a 2xx to exactly the permitted action",
    state: "verified" as const,
  },
  {
    attempt: "Refund $4,800",
    decision: "Escalate",
    invocation: "refund.create(4800) — no approval on record",
    outcome: "Authority violation — verifying the effect needs a witness",
    state: "contradicted" as const,
  },
  {
    attempt: "Email the customer list to an outside address",
    decision: "Denied",
    invocation: "None",
    outcome: "No effect observed",
    state: "verified" as const,
  },
  {
    attempt: "“I’ve cancelled the order for you.”",
    decision: "—",
    invocation: "order.cancel never called",
    outcome: "No effect — the agent’s account was wrong",
    state: "unknown" as const,
  },
];

/** AC07 — baseline, first fix and second fix on the same synthetic fixture. */
export const ACHILLES_RETEST = {
  runs: ["Baseline", "Fix 1", "Fix 2"],
  rows: [
    { metric: "Authority violations", group: "security", values: ["6", "0", "0"], better: "lower" },
    { metric: "Negative controls holding", group: "controls", values: ["12 / 12", "12 / 12", "12 / 12"], better: "same" },
    { metric: "Legitimate requests refused", group: "utility", values: ["1", "9", "1"], better: "lower" },
    { metric: "Benign counterparts let through", group: "utility", values: ["6 / 6", "2 / 6", "6 / 6"], better: "higher" },
  ],
  verdicts: [
    "The starting point.",
    "Absent on retest, but it refuses real work. A new finding.",
    "Absent on retest; benign counterparts were let through on this fixture.",
  ],
  release: "Between releases, a canary comparison decides whether a candidate is worse than the baseline; the weakest result wins. Absent on retest means the failure did not recur, not that legitimate use still works.",
} as const;
