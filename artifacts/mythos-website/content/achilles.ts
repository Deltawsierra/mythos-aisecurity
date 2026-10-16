/**
 * Achilles page copy (blueprint Section 7), checked against the Platform
 * Roadmap, the Achilles Adversarial Learning Handbook and the Agent
 * Containment research. Six capability families are built; MCP/tool integrity
 * and action/approval authority are newer and use forward wording. The Action
 * Gate is not built: the page shows what Achilles TESTS, never runtime
 * enforcement. Exact payloads and the scenario corpus stay internal.
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
    lede: "Multi-turn adversarial testing across the failures that matter in production. Exact payloads and our scenario corpus stay internal.",
  },
  chains: {
    eyebrow: "Cross-channel and multi-step",
    title: "One message rarely breaks an agent. *A sequence might.*",
    lede: "Achilles tests across turns, where pressure builds over a conversation. It is designed to follow chains across channels too — content arriving one way and acting another.",
  },
  gate: {
    eyebrow: "Action Gate states",
    title: "Did the agent make *the call it should have?*",
    lede: "For each consequential request, Achilles compares the decision your controls should make — allowed, escalated, held or denied — with what the agent actually did.",
    footnote: "This is a test of your stack, not a runtime control. The Mythos architecture also includes a reference Action Gate, designed to make these decisions before an action runs.",
  },
  questions: {
    eyebrow: "Effect-bound approvals",
    title: "An approval is for *one exact action.*",
    lede: "The commercial risk is rarely a clever prompt. It is an action that quietly went further than anyone allowed.",
  },
  effects: {
    eyebrow: "Observed effect",
    title: "What happened — *not what the agent said.*",
    lede: "Every result rests on the observed effect: the attempted action, the decision policy made, what was actually invoked and what was recorded. A refusal in the transcript proves nothing on its own; an action the agent claims but never took is not a success.",
  },
  retest: {
    eyebrow: "Canary, utility and retest",
    title: "A fix that blocks real work *is not a repair.*",
    lede: "Every repair is scored for security and for the legitimate work it still allows, against negative controls that must keep passing — then watched for regression.",
  },
  handoff: {
    eyebrow: "SPINE and Minotaur handoff",
    title: "Achilles tests. SPINE remembers. *Minotaur checks the tester.*",
    lede: "Observed effects update the claims they bear on; the decision is recalculated; and Minotaur validates the methodology that produced them.",
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
    items: ["Instructions smuggled through content the AI reads", "Gradual drift away from the user’s actual goal"],
  },
  {
    name: "RAG leakage",
    question: "Can retrieval surface data the user should never see?",
    items: ["Documents outside the user’s access", "Context leaking between sessions or tenants"],
  },
  {
    name: "Agent and tool misuse",
    question: "Can the AI be steered into calling tools it shouldn’t?",
    items: ["Tools invoked outside their intended purpose", "Arguments altered on the way to the tool"],
  },
  {
    name: "Permission boundary",
    question: "Does the AI stay inside the access it was granted?",
    items: ["Actions beyond the requesting user’s rights", "Borrowed or over-broad service identities"],
  },
  {
    name: "Jailbreak resistance",
    question: "Do safety instructions hold under sustained pressure?",
    items: ["Multi-turn pressure, not one-shot tricks", "Policy that holds without blocking legitimate use"],
  },
  {
    name: "Insecure output",
    question: "Can the AI’s output become someone else’s exploit?",
    items: ["Output that executes downstream", "Unsafe content passed to other systems"],
  },
  {
    name: "MCP and tool integrity",
    question: "Are the tools and skills it trusts what they claim to be?",
    items: ["Designed to validate MCP servers, tools and skills an agent relies on", "Designed to catch tool definitions that change after review"],
  },
  {
    name: "Action and approval authority",
    question: "Can it act beyond the authority it was given?",
    items: ["Designed to test approvals, permissions and multi-agent hand-offs", "Designed to check that every action matches the authority behind it"],
  },
];

/** An illustrative cross-channel chain (forward capability). */
export const ACHILLES_CHAIN = [
  { step: "Inbound email", detail: "Carries hidden instructions" },
  { step: "Retrieval", detail: "Pulls the email into context" },
  { step: "Plan", detail: "The agent adopts the instruction" },
  { step: "Tool call", detail: "A real system is invoked" },
  { step: "Effect", detail: "Something actually changes" },
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
    verdict: "The effect exceeded the authority behind it.",
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
  { owner: "Achilles", name: "Observed effect", detail: "What the agent actually caused, from the ledger.", icon: "/assets/evidence/change-event.svg" },
  { owner: "SPINE", name: "Claim updated", detail: "Verified, or Contradicted when the effect exceeds authority.", icon: EVIDENCE_STATE_ICONS.contradicted },
  { owner: "SPINE", name: "Decision recalculated", detail: "Held until the fix is retested. Your team decides.", icon: "/assets/evidence/deployment-decision-gate.svg" },
  { owner: "Minotaur", name: "Method validated", detail: "The tests themselves are checked for validity.", icon: "/assets/ornaments/mythos-seal.svg" },
];

/** AC05 — the approved action and the fields its approval is bound to (Launch Guide F02). */
export const ACHILLES_APPROVAL = {
  lede: "Change any field the approval was bound to and the permit should no longer apply. Achilles is designed to test whether your stack notices.",
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
  footnote: "Illustrative and synthetic. Testing approval binding belongs to the newer action-and-approval-authority family, so it is described as designed, not shipped; the Mythos reference Action Gate is designed to bind approvals this way.",
} as const;

/** AC06 — attempted action, policy decision, actual invocation and recorded outcome. */
export const ACHILLES_LEDGER = [
  {
    attempt: "Refund $120 to the original card",
    decision: "Allowed",
    invocation: "refund.create(120, card 4471)",
    outcome: "Refund issued — matches the decision",
    state: "verified" as const,
  },
  {
    attempt: "Refund $4,800",
    decision: "Escalate",
    invocation: "refund.create(4800) — no approval on record",
    outcome: "Refund issued — exceeded the authority behind it",
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
    { metric: "Unauthorized effects", group: "security", values: ["6", "0", "0"], better: "lower" },
    { metric: "Negative controls passed", group: "controls", values: ["12 / 12", "12 / 12", "12 / 12"], better: "same" },
    { metric: "Legitimate requests refused", group: "utility", values: ["1", "9", "1"], better: "lower" },
    { metric: "Utility retained", group: "utility", values: ["100%", "78%", "98%"], better: "higher" },
  ],
  verdicts: [
    "The starting point.",
    "Stops the attack and blocks real work. Not a repair.",
    "Stops the attack, keeps the work. Repair verified; regression watch on.",
  ],
  release: "Achilles is designed to make the same comparison between releases — unauthorized effects, utility, leakage and cost — and recommend release, restrict or hold.",
} as const;
