/**
 * Platform Overview copy (blueprint Section 7). Specific capability statements
 * are registered in content/claims.ts for the launch gate.
 */
export const OVERVIEW = {
  /** Launch Guide R02 — Platform hero. No reference-plate metrics (10x, 80%, 100%). */
  hero: {
    eyebrow: "The Mythos platform",
    headline: "AI Assurance from *Risk to Resilience.*",
    lede: "A single approach to understanding an AI system, testing its boundaries, recording proof, and keeping critical claims current as its models, data, tools and permissions change.",
  },
  questions: {
    eyebrow: "Five buyer questions",
    title: "Every deployment has to *answer these.*",
    lede: "Plain enough for a board. Each one opens onto the part of Mythos that does the work.",
    answers: [
      {
        question: "What exists?",
        answer: "Athena maps the systems in scope — models, routes, identities, tools and data — including the ones nobody declared, and reports coverage gaps as plainly as findings.",
        href: "/platform/athena",
        product: "Athena",
      },
      {
        question: "What can it reach?",
        answer: "Effective access, not just the roles on paper: what each identity, agent and tool can actually touch, with the authority chain that allows it.",
        href: "/platform/athena",
        product: "Athena · SPINE",
      },
      {
        question: "What can it do?",
        answer: "Achilles tests tools, approvals and effects: whether the AI can cause an effect it was not authorized to cause, and what actually happened when it tried.",
        href: "/platform/achilles",
        product: "Achilles",
      },
      {
        question: "Can it be manipulated?",
        answer: "Multi-turn adversarial testing across goal hijack, retrieval leakage, tool misuse and permission boundaries — with Minotaur checking that the tests themselves are valid.",
        href: "/platform/achilles",
        product: "Achilles · Minotaur",
      },
      {
        question: "Can we prove the answer?",
        answer: "SPINE keeps every conclusion as a claim with its evidence state, its configuration and its receipt — and reopens it when a change undermines the evidence.",
        href: "/platform/spine",
        product: "SPINE",
      },
    ],
  },
  architecture: {
    eyebrow: "System architecture",
    title: "Not five products. *One system with five roles.*",
    lede: "Athena and Achilles feed SPINE, the system of record. Minotaur validates all three. Hermes carries the model into physical AI. Mythos Core runs underneath every engine.",
  },
  lifecycle: {
    eyebrow: "The assurance lifecycle",
    title: "Discover. Understand. Test. *Prove. Revalidate.*",
    lede: "One sentence and one artifact per stage. Beneath the broader resilience journey, this is the workflow every report follows.",
  },
  authority: {
    eyebrow: "Authority and effect",
    title: "From the person accountable *to the effect that happened.*",
    lede: "The commercial risk in agentic AI is not a clever prompt. It is an action nobody actually authorized. Mythos follows every link of the chain — and keeps the decision to permit apart from the effect that was observed.",
  },
  evidence: {
    eyebrow: "Evidence states and coverage",
    title: "Unknown is better than *false certainty.*",
    lede: "Every claim carries the state of its evidence, and every assessment says what it did not check. A gap stays visibly Unknown — never a green result.",
  },
  economics: {
    eyebrow: "Economic consequence",
    title: "From validated failure *to business decision.*",
    lede: "SPINE Economic Exposure is designed to translate verified technical evidence into financial exposure ranges and remediation economics — scenario, assumptions, currency and horizon shown, and the decision left with your team.",
  },
  outputs: {
    eyebrow: "Outputs",
    title: "Not another *score.*",
    lede: "Outputs are built for the people who act on them — from the engineer fixing a boundary to the executive deciding on release.",
  },
  continuous: {
    eyebrow: "Change-driven assurance",
    title: "Passing once does not mean *passing forever.*",
    lede: "When a model, prompt, tool or permission changes, SPINE works out which conclusions the change touches, closes them, and directs only the retests needed to restore trust.",
  },
  cta: {
    eyebrow: "See it on your system",
    title: "Start with one AI system. *Leave with proof.*",
    lede: "A scoped engagement maps one system, tests its boundaries and hands back evidence your security, engineering and risk teams can act on.",
  },
  projects: {
    eyebrow: "Go deeper",
    title: "Explore each part of the system.",
  },
} as const;
