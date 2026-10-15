/**
 * Platform Overview copy (blueprint Section 7). Specific capability statements
 * are registered in content/claims.ts for the launch gate.
 */
export const OVERVIEW = {
  hero: {
    eyebrow: "The Mythos platform",
    headline: "One assurance system for AI deployment.",
    lede: "Athena sees the system. SPINE maintains the truth. Achilles tests the AI. Minotaur tests Mythos. Together they turn what an AI can reach, do and affect into evidence a human can decide on — and keep that evidence current as the system changes.",
  },
  questions: {
    eyebrow: "What every deployment must answer",
    title: "Five questions for executives. Six dimensions underneath.",
    lede: "The questions stay plain enough for a board. The dimensions are where Mythos does the work.",
  },
  architecture: {
    eyebrow: "Architecture",
    title: "Not five products. One system with five roles.",
    lede: "Athena and Achilles feed SPINE, the system of record. Minotaur validates all three. Hermes carries the model into physical AI. Mythos Core runs underneath every engine.",
  },
  lifecycle: {
    eyebrow: "The assurance lifecycle",
    title: "Discover. Understand. Test. Prove. Revalidate.",
  },
  authority: {
    eyebrow: "Authority and action integrity",
    title: "From the person accountable to the effect that happened.",
    lede: "The commercial risk in agentic AI is not a clever prompt. It is an action nobody actually authorized. Mythos follows every link of the chain — and checks that the effect matches the authority behind it.",
  },
  evidence: {
    eyebrow: "Evidence states",
    title: "Unknown is better than false certainty.",
    lede: "Every claim carries the state of its evidence. A gap stays visibly Unknown — with the question, why it matters and the evidence needed to close it — instead of turning into a green result.",
  },
  economics: {
    eyebrow: "Economic Exposure",
    title: "From validated failure to business consequence.",
    lede: "SPINE Economic Exposure is designed to translate verified technical evidence into financial exposure ranges and remediation economics: what a validated scenario could cost, what drives that range, and how much a proposed fix could remove. Ranges, never a single exact number.",
  },
  outputs: {
    eyebrow: "What you receive",
    title: "Not another score.",
    lede: "Outputs are built for the people who act on them — from the engineer fixing a boundary to the executive deciding on release.",
  },
  continuous: {
    eyebrow: "Continuous assurance",
    title: "Passing once does not mean passing forever.",
    lede: "When a model, prompt, tool or permission changes, SPINE works out which conclusions the change touches, closes them, and runs only the retests needed to restore trust.",
  },
  projects: {
    eyebrow: "Go deeper",
    title: "Explore each part of the system.",
  },
} as const;
