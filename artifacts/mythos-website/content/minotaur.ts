/**
 * Minotaur page copy (Launch Guide R06), checked against the Master Inventory
 * (26 Oct 2026). Present tense: planted benchmarks with keyed answers (15
 * families), recall and precision with precision deciding, decoys and safe
 * twins, partitions, Validity Cards, external reproduction, the cheat matrix,
 * the standards map, the nine-gate release authority over Mythos' own engines
 * and the security veto. Limits stated: no pass marks, no audited Validity
 * Card, no sealed holdout, a self-authored benchmark (public targets planned).
 * Minotaur is internal: never sold, never independent third-party validation.
 * Recall/precision figures and answer keys are not published. Claims:
 * content/claims.ts.
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
    eyebrow: "Minotaur · how Mythos AI Security validates itself",
    headline: "Find What We Missed. *Prove What We Test.*",
    lede: "Minotaur is Mythos AI Security’ internal proving ground. It measures Athena and Achilles against planted benchmarks whose answers are known in advance — and it is the release authority for every engine.",
    scope: "Internal to Mythos AI Security — never sold, and not independent third-party validation.",
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
        "Fifteen benchmark families, answers keyed in advance",
        "Decoys and safe twins; precision decides",
        "Validity Cards, partitions and external reproduction",
        "Nine release gates and a security veto",
      ],
    },
    inDevelopment: {
      label: "Not yet in place",
      items: [
        "A pass mark — no family has one",
        "An audited Validity Card — none has been audited",
        "A sealed holdout — none is sealed yet",
        "Runs against public targets such as Juice Shop or DVWA",
      ],
    },
  },
  labyrinth: {
    eyebrow: "The labyrinth",
    title: "Every result has to *find its way out.*",
    lede: "Each ring is a question a result must answer before anyone relies on it. Choose a ring to trace the path to it.",
  },
  twins: {
    eyebrow: "Known answers and safe twins",
    title: "Expected versus *observed.*",
    lede: "The benchmarks plant issues whose answers are keyed in advance, with decoys and safe twins beside them — so a harness that flags everything is punished as surely as one that flags nothing.",
  },
  card: {
    eyebrow: "Benchmark Validity Card",
    title: "What a score *depended on.*",
    lede: "No score is published without its Validity Card: a per-family record of what the score means and does not mean. None has been audited yet. This synthetic card shows what one records, so a result is read in context.",
  },
  ledger: {
    eyebrow: "False blocks and precision",
    title: "Refusing more is *not the same as better.*",
    lede: "Attacks caught are counted beside legitimate cases let through. Precision decides, so a build cannot score better by refusing more, and nothing here claims zero false positives.",
  },
  reproduction: {
    eyebrow: "Reproduction and regression",
    title: "Run it again. *Get the same answer.*",
    lede: "Every score is tied to its benchmark, answer key and engine commit. An external reproduction package reproduced a row byte for byte in CI, and sealed scorecards are re-verified on read; a mismatch is flagged tampered.",
  },
  release: {
    eyebrow: "Release authority",
    title: "Hold on evidence, *not on averages.*",
    lede: "Nine gates govern each engine’s release branch: Detection, Precision, Policy, Action Gate, SPINE, Evidence, Performance, Coverage and Regression. Unmeasured is never green, and a security veto sits outside the score.",
  },
  bridge: {
    eyebrow: "Keep going",
    title: "Where the method *shows up.*",
    lede: "Minotaur’s work surfaces in the evidence other parts of Mythos AI Security produce — and in what we choose to publish about how we test.",
  },
} as const;

export const MINOTAUR_FAILURE_MODES = [
  {
    name: "Contamination",
    question: "Could the system have seen the test?",
    body: "If test cases leak into training or tuning data, a score measures memory, not behavior.",
  },
  {
    name: "Invalid scorers",
    question: "Does the scorer measure what it claims?",
    body: "A grader that rewards the wrong signal turns a failure into a pass — and nobody looks twice at a pass.",
  },
  {
    name: "False blocks",
    question: "Is it catching, or just refusing?",
    body: "A control that blocks benign work can look perfect on attacks alone. Safe twins make precision count.",
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
    body: "Fifteen benchmark families plant issues on purpose, with answers keyed in advance, and no runner holds the key. If a test misses a known issue, the test is what’s wrong.",
  },
  {
    name: "Safe twins",
    question: "Does it leave the harmless twin alone?",
    body: "Decoys and safe twins sit beside the planted cases; the planted website alone carries 51 cases with safe twins. A harness that flags both is measuring noise.",
  },
  {
    name: "Held-out cases",
    question: "Could the engines have learned the exam?",
    body: "A holdout arena is one of four partitions, kept apart from the training lab. No holdout is sealed yet, so this ring is not yet closed.",
  },
  {
    name: "Reproduction",
    question: "Does the result hold when someone else reruns it?",
    body: "An external reproduction package reproduced a row byte for byte in CI, and sealed scorecards are re-verified every time they are read.",
  },
  {
    name: "Regression",
    question: "Did a fix break something else?",
    body: "Regression is one of nine release gates, and every defender build is kept against every attacker key, so a gain in one place can’t quietly cost another.",
  },
];

export const MINOTAUR_CENTRE: Criterion = {
  name: "The release decision",
  question: "Who decides?",
  body: "For Mythos AI Security’ own engines, a signed nine-gate decision and a veto outside the score. For your deployment, named people decide, with the evidence and its limits in view.",
};

export const MINOTAUR_TWINS: TwinCase[] = [
  {
    kind: "Known-answer case",
    case: "A planted access flaw in the target range",
    expected: "Found",
    observed: "Found",
    pass: true,
    note: "The answer was keyed before the run and no runner holds it, so the harness can’t be graded on a moving target.",
  },
  {
    kind: "Safe twin",
    case: "The same request, with the access it’s entitled to",
    expected: "Allowed",
    observed: "Allowed",
    pass: true,
    note: "The harness told the two apart — the result above is evidence, not a reflex.",
  },
  {
    kind: "Counterexample",
    case: "A second safe twin, phrased differently",
    expected: "Allowed",
    observed: "Blocked",
    pass: false,
    note: "A false block. It counts against precision, and precision decides.",
  },
];

export const MINOTAUR_CARD_FIELDS = [
  "Harness owner",
  "Harness version",
  "Scenario set",
  "Partition",
  "Context boundary",
  "Tool visibility",
  "Seed",
  "Scorer",
  "Safe twins flagged",
  "Known gaps",
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
      Partition: "holdout arena · not sealed",
      "Context boundary": "single session; no shared memory",
      "Tool visibility": "refund, CRM read, email",
      Seed: "4417 (fixed)",
      Scorer: "signal-based; narration ignored",
      "Safe twins flagged": "2 of 40",
      "Known gaps": "1, counted apart from misses",
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
      Partition: "training lab",
      "Context boundary": "single session; no shared memory",
      "Tool visibility": "refund, CRM read",
      Seed: "4417 (fixed)",
      Scorer: "transcript-based",
      "Safe twins flagged": "not measured",
      "Known gaps": "not counted",
      Reviewer: "Author",
    },
  },
];

export const MINOTAUR_RUNS: MatrixRun[] = [
  {
    label: "Defender build A",
    stopped: 20,
    missed: 0,
    falseBlocks: 9,
    allowed: 31,
    verdict: "Catches every planted attack — and blocks nine legitimate cases. Precision decides, so this build does not count as better.",
  },
  {
    label: "Defender build B",
    stopped: 19,
    missed: 1,
    falseBlocks: 1,
    allowed: 39,
    verdict: "Misses one planted attack — a finding to fix — while letting legitimate cases through. Both numbers are reported; neither hides the other.",
  },
];

export const MINOTAUR_TRAIL: TimelineEvent[] = [
  {
    label: "Answers keyed",
    meta: "fixture 7d1e…c04",
    detail: "Cases and answers are fixed before any engine runs; no runner holds the key.",
    state: "verified",
    stateLabel: "Keyed",
  },
  {
    label: "Baseline run",
    meta: "harness 3.2 · seed 4417",
    detail: "The engine runs in a separated child; the sealed scorecard records the versions it came from.",
    state: "observed",
  },
  {
    label: "External reproduction",
    meta: "same fixture · reproduction package",
    detail: "The package reruns the row in CI and must match it byte for byte.",
    state: "verified",
    stateLabel: "Reproduced",
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
    detail: "The earlier cases run again for the Regression gate, which reads unmeasured, never green, until they do.",
    state: "observed",
  },
];

export const MINOTAUR_GATE: GateScenario[] = [
  {
    label: "High average, one regression",
    facts: ["49 of 50 planted cases caught", "One case caught last release is now missed", "Precision unchanged on safe twins"],
    outcome: "hold",
    reason: "One regression is not averaged away. The weakest gate sets the outcome.",
  },
  {
    label: "A gate has no evidence",
    facts: ["Coverage gate not measured", "The other eight gates measured", "No benchmark or key change"],
    outcome: "hold",
    reason: "Unmeasured is never green. The release waits for the evidence, not for an average.",
  },
  {
    label: "The change turns off TLS verification",
    facts: ["Every score improved", "TLS verification disabled in one module", "No other gate objects"],
    outcome: "hold",
    reason: "The security veto sits outside the score. This change is rejected whatever it scored.",
  },
  {
    label: "All nine gates measured",
    facts: ["No regression against the last release", "Precision holds on decoys and safe twins", "No veto condition in the change"],
    outcome: "support",
    reason: "The decision is signed by a key only the hosted backend holds — a floor measured on planted targets, limits stated.",
  },
];
