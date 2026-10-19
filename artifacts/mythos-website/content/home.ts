/**
 * Homepage copy — Launch Guide (16 Oct 2026) Section 07, H01–H12, "ready for
 * editorial approval". Headlines mark accent words with *asterisks* (rendered
 * in gold). Capability statements are registered in content/claims.ts; where
 * the guide's draft wording outruns the sources, the wording here follows the
 * sources and the difference is noted inline.
 */
import type { LifecycleStageId } from "@/content/platform";
import { INTERIM_SCENES, type ProjectId, type TeamId } from "@/content/media";

export const HOME_HERO = {
  eyebrow: "AI security for a braver tomorrow",
  headline: "Human *Ambition* Deserves a *Stronger* Guardian.",
  category: "AI Deployment Assurance",
  proofline: "See what AI can access. Test what it can do. Maintain the evidence behind every decision.",
  body: "AI can expand what people create, discover and deliver. Mythos helps organizations move forward with evidence about access, authority, behavior, business consequence and change — so bold AI initiatives rest on stronger decisions.",
  ladder: ["People", "Ideas", "Industries", "A safer tomorrow"],
} as const;

export const HOME_CHALLENGE = {
  eyebrow: "The challenge",
  headline: "AI Opens Extraordinary Possibilities. *And Extraordinary Risks.*",
  body: "Organizations are moving faster than traditional testing and governance can follow. The risk is not only what an AI model says — it is what it can reach, decide and do.",
  concerns: [
    {
      id: "reach",
      title: "Reach",
      question: "What can it reach?",
      body: "Data, tools, identities and systems an AI can touch — including the ones nobody declared.",
      icon: "/assets/icons/discovery-eye.svg",
    },
    {
      id: "authority",
      title: "Authority",
      question: "What is it allowed to do?",
      body: "Who granted the authority, and whether each action still matches it.",
      icon: "/assets/icons/approval-gate.svg",
    },
    {
      id: "effect",
      title: "Effect",
      question: "What actually happened?",
      body: "The difference between what an agent says and what it changes.",
      icon: "/assets/icons/observed-effect.svg",
    },
    {
      id: "proof",
      title: "Proof",
      question: "What still holds?",
      body: "Evidence that stays meaningful as models, tools and permissions change.",
      icon: "/assets/icons/evidence-seal.svg",
    },
  ],
} as const;

export type JourneyStageId = "discover" | "understand" | "protect" | "respond" | "strengthen";

/**
 * H03 — the marketing journey across the causeway. Deliberately distinct from
 * the technical cycle in H04 (Launch Guide conflict resolution: never relabel
 * one as the other). "Protect" and "Respond" describe testing and evidence,
 * not runtime enforcement.
 */
export const HOME_JOURNEY = {
  eyebrow: "The path",
  headline: "From Risk to *Resilience.*",
  lede: "Discover the surface. Understand authority. Protect critical workflows. Respond with evidence. Strengthen continuously.",
  stages: [
    {
      id: "discover" as JourneyStageId,
      name: "Discover",
      line: "Discover the surface.",
      body: "Map the AI systems in scope — models, routes, identities, tools and data — including what nobody declared.",
      produces: "System and authority map",
      led: "Athena",
    },
    {
      id: "understand" as JourneyStageId,
      name: "Understand",
      line: "Understand authority.",
      body: "Establish what each system is allowed to do, who granted that authority, and what evidence supports it.",
      produces: "Authority chain and evidence states",
      led: "Athena · SPINE",
    },
    {
      id: "protect" as JourneyStageId,
      name: "Protect",
      line: "Protect critical workflows.",
      body: "Test the boundaries that matter — permissions, tools, approvals and effects — before an agent is trusted with them.",
      produces: "Observed findings",
      led: "Achilles",
    },
    {
      id: "respond" as JourneyStageId,
      name: "Respond",
      line: "Respond with evidence.",
      body: "Turn findings into remediation, retests and receipts a reviewer can verify for themselves.",
      produces: "Remediation plan and receipts",
      led: "SPINE",
    },
    {
      id: "strengthen" as JourneyStageId,
      name: "Strengthen",
      line: "Strengthen continuously.",
      body: "When models, tools or permissions change, retest what the change affected and keep the decision current.",
      produces: "Revalidated claims",
      led: "SPINE",
    },
  ],
  footnote: "The journey is the story. Beneath it runs the technical assurance cycle that governs every report.",
} as const;

/** H04 — the technical cycle crosswalk: stage → artifact → owner → journey stage it serves. */
export const HOME_CYCLE = {
  eyebrow: "Beneath the journey",
  headline: "Assurance Is a Cycle, *Not a Checkbox.*",
  lede: "Discover → Understand → Test → Prove → Revalidate is the operational proof workflow beneath every stage of the broader resilience journey.",
  rows: {
    discover: { produces: "System map and coverage", owner: "Athena", journey: "Discover" },
    understand: { produces: "Authority chain", owner: "Athena · SPINE", journey: "Understand" },
    test: { produces: "Observed findings", owner: "Achilles", journey: "Protect" },
    prove: { produces: "Claims, receipts, decision", owner: "SPINE", journey: "Respond" },
    revalidate: { produces: "Revalidated evidence", owner: "SPINE", journey: "Strengthen" },
  } satisfies Record<LifecycleStageId, { produces: string; owner: string; journey: string }>,
} as const;

/** H05 — locked product meanings (Launch Guide Section 03). */
export const HOME_FAMILY = {
  eyebrow: "The Mythos product family",
  headline: "Specialized Capabilities. *One Connected Platform.*",
  lede: "Athena maps. SPINE maintains evidence. Achilles tests behavior. Minotaur challenges the test methods. Hermes extends the mission toward physical AI.",
  products: [
    { id: "athena", line: "See the system.", body: "Map access, exposure, relationships, policies and proof." },
    { id: "spine", line: "Maintain the truth.", body: "Link claims to evidence, authority, changes and decisions." },
    { id: "achilles", line: "Test the AI.", body: "Challenge behavior, permission boundaries, tool use and approval gates." },
    {
      id: "minotaur",
      line: "Test Mythos.",
      body: "Challenge validity, false blocks, regressions and release quality.",
      badge: "Internal proving ground",
    },
    {
      id: "hermes",
      line: "Assure physical AI.",
      body: "Extend evidence-based methods toward autonomy and operational systems.",
      badge: "Physical AI horizon",
    },
  ] as { id: ProjectId; line: string; body: string; badge?: string }[],
  core: {
    name: "Mythos Core",
    body: "The shared scope, authorization, safety, security, logging and governance foundation beneath every product.",
  },
} as const;

/** H06 — SPINE truth, with the synthetic claim-invalidation fixture (Launch Guide F01). */
export const HOME_TRUTH = {
  eyebrow: "SPINE",
  headline: "A Passing Test Has an *Expiration Date.*",
  lede: "When tools, policies, models, routes or data change, a once-supported claim may no longer hold. SPINE makes that change visible and supports targeted revalidation.",
} as const;

/**
 * H07 — the five assurance teams. Definitions follow the Mythos Red, Gray and
 * Green Teaming guide (28 Sep 2026); the Launch Guide's draft called green
 * "operational utility", which the source assigns to the gray user role.
 */
export const HOME_TEAMS = {
  eyebrow: "Red · Blue · Purple · Green · White",
  headline: "Stronger Together, *Tested From Every Angle.*",
  lede: "Adversarial challenge, defense, shared learning, a safe test range and independent governance reinforce one another — inside defined, authorized test scopes.",
  teams: [
    {
      id: "red",
      name: "Red Team",
      role: "Adversarial challenge",
      body: "Authorized adversarial testing of an agreed objective and its technical paths.",
      delivers: "Reproducible failure evidence, attempted paths and observed effects.",
      boundary: "Cannot expand scope or waive stop conditions.",
      color: "#c0573f",
    },
    {
      id: "blue",
      name: "Blue Team",
      role: "Defense",
      body: "Prevention, detection, containment, recovery and repair.",
      delivers: "Proposed fixes, operational controls and recovery evidence.",
      boundary: "Cannot mark its own fix as independently verified.",
      color: "#5b8fc7",
    },
    {
      id: "purple",
      name: "Purple Team",
      role: "Shared learning",
      body: "Joint analysis that turns adversarial findings into defensive change.",
      delivers: "Causal explanation, repair contract and retest plan.",
      boundary: "Does not replace independent judgement of the outcome.",
      color: "#9b7cc9",
    },
    {
      id: "green",
      name: "Green Team",
      role: "Safe test range",
      body: "Test infrastructure, safety controls, resets, observability and recovery.",
      delivers: "A trustworthy test environment and continuity evidence.",
      boundary: "The agent under test cannot control the safety controller.",
      color: "#5e9e72",
    },
    {
      id: "white",
      name: "White Team",
      role: "Governance",
      body: "Scope, rules of engagement, adjudication, approvals and stop authority.",
      delivers: "Rules of engagement and the final acceptance decision.",
      boundary: "Stays outside adversarial reward optimisation.",
      color: "#e5c58f",
    },
  ] as {
    id: TeamId;
    name: string;
    role: string;
    body: string;
    delivers: string;
    boundary: string;
    color: string;
  }[],
} as const;

/** H08 — Economic Exposure is specified, not in production scoring: forward framing. */
export const HOME_CONSEQUENCE = {
  eyebrow: "Business consequence",
  headline: "A Technical Finding Should Lead to a *Better Decision.*",
  lede: "Evidence can inform modeled financial exposure, remediation economics and business response — without pretending that uncertainty has disappeared.",
  chain: ["Verified effect", "Loss pathway", "Modeled range", "Remediation scenario", "Human decision"],
  note: "Economic Exposure is designed to show ranges with their assumptions and sources — never a guaranteed loss or ROI. The customer keeps every business and materiality decision.",
} as const;

/** H09 — six sectors with their own art (Government/Capitol art stays withheld). */
export const HOME_SECTORS = {
  eyebrow: "Built for what matters",
  headline: "Secure AI Across the *Environments That Matter.*",
  lede: "From financial services and healthcare to enterprise platforms, the mission is the same: understand what an AI system can reach, prove how it behaves, and keep evidence current.",
  cards: [
    { slug: "financial-services-insurance", image: "/assets/industries/financial-services-card.webp", position: "50% 40%" },
    { slug: "healthcare-life-sciences", image: "/assets/industries/healthcare-life-sciences-card.webp", position: "50% 35%" },
    { slug: "ai-saas", image: "/assets/industries/technology-ai-saas-card.webp", position: "50% 40%" },
    { slug: "regulated-enterprise", image: "/assets/olympus/marble-city.webp", position: "82% 18%" },
    { slug: "public-sector-mission", image: INTERIM_SCENES.publicSectorCard.src, position: "50% 40%" },
    { slug: "manufacturing-critical-infrastructure", image: "/assets/industries/manufacturing-critical-infrastructure-card.webp", position: "50% 40%" },
  ],
} as const;

/** H10 — native synthetic report pages; the full sample lives on /example-report. */
export const HOME_PROOF = {
  eyebrow: "Buyer proof",
  headline: "Inspect the Evidence, *Not Just the Claim.*",
  lede: "See what a Mythos review can produce: scope, findings, effect traces, claim status, remediation paths and decision support.",
} as const;

/** H11 — the engagement path, from data/engagementSteps (titles shortened). */
export const HOME_ENGAGE = {
  eyebrow: "How engagement starts",
  headline: "Start With One System. *Expand Assurance as Your Estate Grows.*",
  lede: "A scoped engagement establishes the risk surface, review boundaries and evidence needs. Continuing assurance can then follow the systems and decisions that matter.",
} as const;

export const HOME_FINAL = {
  headline: "Secure Today. *Empower Tomorrow.*",
  body: "The goal is not to slow human ambition. It is to give teams better proof before they trust AI with meaningful actions.",
} as const;
