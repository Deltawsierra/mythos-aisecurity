/**
 * Minotaur page copy (Launch Guide R06), checked against the Platform Roadmap
 * (17 Sep), SPINE R&D Plan (21 Sep), Achilles Handbook, Launch Research and
 * the Red/Gray/Green teaming guide. Built today: an internal proving ground —
 * a target range with a sealed answer key and tiered difficulty; held-out
 * cases are reported. Validity Cards, safe twins, independent reproduction,
 * regression tracking and contamination checks are drafted or planned, so
 * they use "designed to". Minotaur is internal: never a product, a sold
 * service, or independent third-party validation. No counts, corpora,
 * thresholds or answer keys are published. Claims: content/claims.ts.
 */
import type { Criterion } from "@/components/platform/LabyrinthCriteria";
import type { TwinCase } from "@/components/platform/SafeTwinCards";
import type { CardVersion } from "@/components/platform/ValidityCard";
import type { MatrixRun } from "@/components/platform/OutcomeMatrix";
import type { TimelineEvent } from "@/components/platform/EvidenceTimeline";
import type { GateScenario } from "@/components/platform/ReleaseGate";

export const MINOTAUR_COPY = {
  /**
   * The guide's candidate H1 ("Detect What Others Miss") is comparative and
   * unsupported (R&D plan §1.3); this keeps its rhythm but points inward.
   */
  hero: {
    eyebrow: "Minotaur · how Mythos validates itself",
    headline: "Find What We Missed. *Prove What We Test.*",
    lede: "Minotaur is Mythos’ internal proving ground for testing methods, benchmark validity, regression behavior and the risk of false confidence. It challenges the assurance machinery itself.",
    scope: "Internal to Mythos — not a product, and not independent third-party validation.",
  },
  why: {
    eyebrow: "Why assurance needs assurance",
    title: "A test can be wrong *in quiet ways.*",
    lede: "A security result is only as good as the harness that produced it. These are the ways a harness fails without anyone noticing — and what Minotaur is there to catch.",
  },
  today: {
    inPlace: {
      label: "In place today",
      items: [
        "An internal target range with a sealed answer key",
        "Cases at several levels of difficulty",
        "Cases held back from the engines being tested",
      ],
    },
    inDevelopment: {
      label: "In development",
      items: [
        "Benchmark Validity Cards",
        "Benign twins and negative controls for every case",
        "Independent reproduction and regression tracking",
        "Contamination and scorer-validity checks",
      ],
    },
  },
  labyrinth: {
    eyebrow: "The labyrinth",
    title: "Every result has to *find its way out.*",
    lede: "Each ring is a question a result must answer before anyone relies on it. Choose a ring to trace the path to it.",
  },
  twins: {
    eyebrow: "Known answers and negative controls",
    title: "Expected versus *observed.*",
    lede: "The range plants issues whose answers are sealed in advance. Each case is designed to travel with a benign twin that should pass — so a harness that flags everything is caught as quickly as one that flags nothing.",
  },
  card: {
    eyebrow: "Benchmark Validity Card",
    title: "What a score *depended on.*",
    lede: "Validity Cards are in draft. This is what one is designed to record — who owns the harness, what it could see, how it was scored, and how often it blocked benign work — so a result can be read in its context.",
  },
  ledger: {
    eyebrow: "False blocks and utility",
    title: "Refusing more is *not the same as safer.*",
    lede: "Blocking legitimate use is counted beside stopping attacks. Neither number is allowed to hide the other, and nothing here claims zero false positives.",
  },
  reproduction: {
    eyebrow: "Reproduction and regression",
    title: "Run it again. *Get the same answer.*",
    lede: "Results are designed to be tied to fixed versions and fixtures, so they can be rerun by someone else and checked again after every fix. Nobody outside Mythos has reproduced our results yet; when they do, it will be documented.",
  },
  release: {
    eyebrow: "Release support",
    title: "Hold on evidence, *not on averages.*",
    lede: "A strong average cannot buy back a single unauthorized effect, and missing evidence is never a pass. Minotaur is designed to advise hold, review or release on the quality of the evidence — the people accountable make the call.",
  },
  bridge: {
    eyebrow: "Keep going",
    title: "Where the method *shows up.*",
    lede: "Minotaur’s work surfaces in the evidence other parts of Mythos produce — and in what we choose to publish about how we test.",
  },
} as const;

export const MINOTAUR_FAILURE_MODES = [
  {
    name: "Contamination",
    question: "Could the system have seen the test?",
    body: "If test cases leak into training or tuning data, a pass measures memory, not behavior.",
  },
  {
    name: "Invalid scorers",
    question: "Does the scorer measure what it claims?",
    body: "A grader that rewards the wrong signal turns a failure into a pass — and nobody looks twice at a pass.",
  },
  {
    name: "False blocks",
    question: "Is it safe, or just refusing?",
    body: "A control that blocks benign work can look perfect on attacks alone. Utility has to be measured too.",
  },
  {
    name: "Distribution shift",
    question: "Does the test still look like production?",
    body: "Models, prompts, tools and users change. A benchmark frozen in the past slowly stops describing the system.",
  },
  {
    name: "Unwatched exits",
    question: "Did the test see every way out?",
    body: "An effect can leave through a channel the harness never observed. A clean result there means unknown, not safe.",
  },
] as const;

/** Labyrinth rings, outermost first. Exactly five; the centre is the decision. */
export const MINOTAUR_CRITERIA: Criterion[] = [
  {
    name: "Known answers",
    question: "Does the test find what we know is there?",
    body: "Minotaur keeps an internal target range with issues planted on purpose and an answer key sealed in advance. If a test misses a known issue, the test is what’s wrong.",
  },
  {
    name: "Benign twins",
    question: "Does it leave the harmless twin alone?",
    body: "Each attack case is designed to pair with a benign counterpart that should pass. A harness that flags both is measuring noise, not risk.",
  },
  {
    name: "Held-out cases",
    question: "Could the engines have learned the exam?",
    body: "Some cases are kept back from the engines entirely, so a strong score can’t come from having seen the questions before.",
  },
  {
    name: "Reproduction",
    question: "Does the result hold when someone else reruns it?",
    body: "Results are designed to be rerun from recorded versions and fixtures by someone other than the person who produced them.",
  },
  {
    name: "Regression",
    question: "Did a fix break something else?",
    body: "After every mitigation, earlier cases are designed to run again, so an improvement in one place can’t quietly cost another.",
  },
];

export const MINOTAUR_CENTRE: Criterion = {
  name: "The release decision",
  question: "Who decides?",
  body: "Minotaur’s work ends at advice. Named people decide whether to release, restrict or hold — with the evidence and its limits in front of them.",
};

export const MINOTAUR_TWINS: TwinCase[] = [
  {
    kind: "Known-answer case",
    case: "A planted access flaw in the target range",
    expected: "Found",
    observed: "Found",
    pass: true,
    note: "The answer key was sealed before the run, so the harness can’t be graded on a moving target.",
  },
  {
    kind: "Benign twin",
    case: "The same request, with the access it’s entitled to",
    expected: "Allowed",
    observed: "Allowed",
    pass: true,
    note: "The harness told the two apart — the result above is evidence, not a reflex.",
  },
  {
    kind: "Counterexample",
    case: "A second benign twin, phrased differently",
    expected: "Allowed",
    observed: "Blocked",
    pass: false,
    note: "A false block. The harness is corrected and rerun before any of its results are relied on.",
  },
];

export const MINOTAUR_CARD_FIELDS = [
  "Harness owner",
  "Harness version",
  "Scenario set",
  "Monitors",
  "Context boundary",
  "Tool visibility",
  "Seed",
  "Scorer",
  "False blocks",
  "Tail risk",
  "Reviewer",
];

export const MINOTAUR_CARD_VERSIONS: [CardVersion, CardVersion] = [
  {
    label: "Run v3",
    date: "illustrative",
    fields: {
      "Harness owner": "Validation lead",
      "Harness version": "harness 3.2",
      "Scenario set": "approval-boundary set · fixture 7d1e…",
      Monitors: "tool calls, outbound messages, ledger writes",
      "Context boundary": "single session; no shared memory",
      "Tool visibility": "refund, CRM read, email",
      Seed: "4417 (fixed)",
      Scorer: "effect-based; transcript ignored",
      "False blocks": "2 of 40 benign twins",
      "Tail risk": "1 high-severity case unresolved",
      Reviewer: "Second analyst, not the author",
    },
  },
  {
    label: "Run v2",
    date: "illustrative",
    fields: {
      "Harness owner": "Validation lead",
      "Harness version": "harness 3.1",
      "Scenario set": "approval-boundary set · fixture 7d1e…",
      Monitors: "tool calls, outbound messages",
      "Context boundary": "single session; no shared memory",
      "Tool visibility": "refund, CRM read",
      Seed: "4417 (fixed)",
      Scorer: "transcript-based",
      "False blocks": "not measured",
      "Tail risk": "not assessed",
      Reviewer: "Author",
    },
  },
];

export const MINOTAUR_RUNS: MatrixRun[] = [
  {
    label: "Mitigation A",
    stopped: 20,
    missed: 0,
    falseBlocks: 9,
    allowed: 31,
    verdict: "Stops every attack — and blocks nine legitimate requests. Not counted as an improvement until the false blocks are fixed.",
  },
  {
    label: "Mitigation B",
    stopped: 19,
    missed: 1,
    falseBlocks: 1,
    allowed: 39,
    verdict: "Misses one attack — a finding to fix — while serving legitimate use. Both numbers are reported; neither hides the other.",
  },
];

export const MINOTAUR_TRAIL: TimelineEvent[] = [
  {
    label: "Fixtures sealed",
    meta: "fixture 7d1e…c04",
    detail: "Cases and answer key are fixed and hashed before any engine sees them.",
    state: "verified",
    stateLabel: "Sealed",
  },
  {
    label: "Baseline run",
    meta: "harness 3.2 · seed 4417",
    detail: "The engine is run against the sealed set; every result records the versions it came from.",
    state: "observed",
  },
  {
    label: "Independent rerun",
    meta: "same fixture · different analyst",
    detail: "Designed: a second person reruns from the record and must get the same result.",
    state: "unknown",
    stateLabel: "Designed",
  },
  {
    label: "Mitigation applied",
    meta: "engine change 1.14",
    detail: "A fix lands. Every result that depended on the old behavior is now stale.",
    state: "stale",
  },
  {
    label: "Regression run",
    meta: "harness 3.2 · seed 4417",
    detail: "Designed: the earlier cases run again, so the fix is checked for what it broke as well as what it repaired.",
    state: "unknown",
    stateLabel: "Designed",
  },
];

export const MINOTAUR_GATE: GateScenario[] = [
  {
    label: "High average, one unauthorized effect",
    facts: ["49 of 50 scenarios pass", "One refund executed beyond its approval", "Held-out cases reproduce"],
    outcome: "hold",
    reason: "One unauthorized effect is not averaged away. The weakest result sets the outcome.",
  },
  {
    label: "A capability family has no evidence",
    facts: ["Tool-integrity cases did not run", "All other families pass", "No harness change since last run"],
    outcome: "review",
    reason: "Missing evidence is Unknown, never a pass. A person decides whether to proceed without it.",
  },
  {
    label: "The harness changed since the last run",
    facts: ["Scores improved across the board", "Scorer moved from transcript to effect-based", "Validity Card not yet updated"],
    outcome: "review",
    reason: "A new harness needs its own validity evidence before its scores can be compared with the old ones.",
  },
  {
    label: "Evidence holds up",
    facts: ["No unauthorized effects", "False blocks within the agreed scope", "Held-out cases and rerun agree"],
    outcome: "support",
    reason: "The evidence supports release — with its limits stated, for the accountable reviewers to approve.",
  },
];
