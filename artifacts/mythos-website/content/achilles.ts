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
  hero: {
    eyebrow: "Achilles · behavior and authority testing",
    headline: "Test the AI.",
    lede: "The question is not whether an AI can be jailbroken. It is whether it can cause an effect it was not authorized to cause — and whether your controls stop it when it tries.",
  },
  families: {
    eyebrow: "Capability families",
    title: "Eight ways an AI deployment goes wrong.",
    lede: "Multi-turn adversarial testing across the failures that matter in production. Exact payloads and our scenario corpus stay internal.",
  },
  chains: {
    eyebrow: "Attacks that unfold",
    title: "One message rarely breaks an agent. A sequence might.",
    lede: "Achilles tests across turns, where pressure builds over a conversation. It is designed to follow chains across channels too — content arriving one way and acting another.",
  },
  gate: {
    eyebrow: "Authority under test",
    title: "Did the agent make the call it should have?",
    lede: "For each consequential request, Achilles compares the decision your controls should make — permit, escalate, hold or deny — with what the agent actually did.",
    footnote: "The Mythos architecture also includes a reference Action Gate, designed to make these decisions before an action runs.",
  },
  questions: {
    eyebrow: "Where authority leaks",
    title: "Recommendation is not execution.",
    lede: "The commercial risk is rarely a clever prompt. It is an action that quietly went further than anyone allowed.",
  },
  effects: {
    eyebrow: "Effects and repairs",
    title: "What happened — and whether the fix holds.",
  },
  handoff: {
    eyebrow: "Into the system",
    title: "Achilles tests. SPINE remembers. Minotaur checks the tester.",
    lede: "Observed effects update the claims they bear on; the decision is recalculated; and Minotaur validates the methodology that produced them.",
  },
  next: {
    eyebrow: "Keep going",
    title: "Where Achilles leads.",
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

export const ACHILLES_EFFECTS = [
  {
    name: "Observed effect",
    body: "Achilles records what actually happened in a hash-chained effect ledger — so a result rests on the effect itself, not on the agent’s account of it.",
    icon: "/assets/evidence/change-event.svg",
  },
  {
    name: "Security and utility retained",
    body: "Every fix is scored for both. A repair that stops the attack but blocks legitimate work is not a repair.",
    icon: "/assets/evidence/retest-proof.svg",
  },
  {
    name: "Release comparison",
    body: "Achilles is designed to compare releases — unauthorized effects, utility, leakage and cost — and recommend release, restrict or hold.",
    icon: "/assets/evidence/deployment-decision-gate.svg",
  },
];

export const ACHILLES_HANDOFF: HandoffStep[] = [
  { owner: "Achilles", name: "Observed effect", detail: "What the agent actually caused, from the ledger.", icon: "/assets/evidence/change-event.svg" },
  { owner: "SPINE", name: "Claim updated", detail: "Verified, or Contradicted when the effect exceeds authority.", icon: EVIDENCE_STATE_ICONS.contradicted },
  { owner: "SPINE", name: "Decision recalculated", detail: "Held until the fix is retested. Your team decides.", icon: "/assets/evidence/deployment-decision-gate.svg" },
  { owner: "Minotaur", name: "Method validated", detail: "The tests themselves are checked for validity.", icon: "/assets/ornaments/mythos-seal.svg" },
];
