/**
 * Hermes page copy (Launch Guide R07), checked against the Platform Roadmap
 * (17 Sep), Session Work Summary, SPINE R&D Plan §10.5, Self-Protection Spec
 * §4 and the Threat Atlas; status follows the 26 Oct Master Inventory.
 * Hermes is the vehicle and fleet assurance engine, a scaffold today: four
 * questions across twelve domains; the job API, readiness report and
 * failsafe are built and tested; every domain returns INCONCLUSIVE, so a full
 * scan reads "requires additional evidence". Standards are mapped, never
 * certified. No customers, no pilots, no crash-prevention claims. The six
 * layers here group the twelve domains. V-model, safety-case and timeline
 * content is labelled illustrative. Claims: content/claims.ts (hermes.*).
 */
import type { LoopStage } from "@/components/platform/PhysicalLoop";
import type { OperatingLayer } from "@/components/platform/LayerSelector";
import type { VStage } from "@/components/platform/VModel";
import type { ScopeRow } from "@/components/platform/ComponentVsSystem";
import type { TimelineEvent } from "@/components/platform/EvidenceTimeline";

export const HERMES_COPY = {
  hero: {
    eyebrow: "Hermes · physical AI assurance",
    headline: "Physical AI Deserves *Better Evidence.*",
    lede: "As AI moves beyond the screen, assurance must consider sensing, perception, planning, control, human interaction and system behavior in the physical world. Hermes extends the Mythos evidence philosophy toward these environments.",
    scope: "Physical AI horizon · a scaffold today. Every domain returns inconclusive. Hermes never certifies a vehicle.",
  },
  status: {
    eyebrow: "Where Hermes stands",
    title: "An honest *starting point.*",
    lede: "Hermes is the newest part of Mythos: the vehicle and fleet assurance engine, a scaffold today.",
    today: [
      "Four questions — can it perceive, decide, fail and change safely — across twelve domains",
      "The job API, readiness report and failsafe are built and tested; a stand-down revokes the vehicle connector credential",
      "Every domain returns inconclusive, so a full scan reads “requires additional evidence”",
      "No customer deployments or pilots yet",
    ],
    never: [
      "Certify a vehicle or system as safe",
      "Claim to prevent crashes or incidents",
      "Take control of a real vehicle or machine",
      "Replace your safety team’s authority",
      "Treat a standards mapping as certification",
    ],
  },
  loop: {
    eyebrow: "From digital output to physical consequence",
    title: "Sense. Decide. Act. *Monitor.*",
    lede: "On a screen, a wrong answer is a wrong answer. In the physical world, uncertainty at any stage can carry through to motion, force or harm. Step through the loop.",
  },
  layers: {
    eyebrow: "Operating layers",
    title: "Where a physical AI *can go wrong.*",
    lede: "The layers an assessment would examine, grouped from Hermes’s twelve domains. Illustrative — no domain logic is built yet, and every domain reads inconclusive.",
  },
  vmodel: {
    eyebrow: "Lifecycle gates",
    title: "Evidence at *every checkpoint.*",
    lede: "Physical systems are built against a V: requirements and design down one side, verification and validation up the other. This is where assurance evidence would fit — and why it continues after release.",
  },
  scope: {
    eyebrow: "Component and integrated system",
    title: "Testing a model *is not assuring a vehicle.*",
    lede: "A component check can show a part behaves within its limits. Only an end-to-end scenario shows what the whole system does. Hermes keeps the two apart — and never presents one as the other.",
  },
  domains: {
    eyebrow: "Where it is headed",
    title: "Vehicles and fleets *first.*",
    lede: "Hermes is a vehicle and fleet engine. The other areas are outside its scope today — none of these is a list of customers or completed assessments.",
  },
  trail: {
    eyebrow: "After deployment",
    title: "When the software changes, *so does the evidence.*",
    lede: "An over-the-air update can change what a vehicle perceives and decides. SPINE supersedes the claims a change touches and names the minimal re-run. Hermes’s update domain has no logic yet; replay would run in simulation and on the bench before the road.",
  },
  outline: {
    eyebrow: "Safety-case support",
    title: "Evidence your *safety team can use.*",
    lede: "Mythos does not write or certify safety cases. An assessment would hand your safety and engineering teams structured evidence — scope, conditions, gaps and findings — to use in their own.",
  },
} as const;

export const HERMES_LOOP: LoopStage[] = [
  {
    name: "Sense",
    uncertainty: "Sensors drift, degrade, disagree or are spoofed. The system can be confident about a world that isn’t there.",
    consequence: "An obstacle missed, or one that doesn’t exist acted on.",
    question: "What does the system believe — and how would we know it was wrong?",
  },
  {
    name: "Decide",
    uncertainty: "Perception and prediction feed a planner that must choose under uncertainty, often with little time.",
    consequence: "A plan that is reasonable for the model and wrong for the road.",
    question: "Does the plan stay inside its safe envelope when inputs are uncertain?",
  },
  {
    name: "Act",
    uncertainty: "Commands reach actuators through software, networks and updates that can change underneath them.",
    consequence: "Motion, force or a missed stop — effects that can’t be rolled back.",
    question: "Is every action within the authority and limits it was given?",
  },
  {
    name: "Monitor",
    uncertainty: "Fallbacks, logs and human hand-offs are only useful if they fire and are recorded when needed.",
    consequence: "An incident nobody can reconstruct — and a fix nobody can verify.",
    question: "When something goes wrong, is there evidence of what happened and why?",
  },
];

export const HERMES_LAYERS: OperatingLayer[] = [
  {
    id: "sensing",
    name: "Sensing and sensor trust",
    summary: "Whether what the sensors report can be trusted — and what happens when it can’t.",
    risks: ["Degraded or miscalibrated sensors", "Spoofed or injected signals", "Silent disagreement between sensors"],
    evidence: ["Calibration and health state at test time", "Behavior under degraded inputs", "Logs of sensor disagreement"],
    controls: ["Plausibility and cross-checks", "Degraded-mode triggers", "Tamper detection"],
  },
  {
    id: "perception",
    name: "Perception and prediction",
    summary: "How the system understands the scene and anticipates what others will do.",
    risks: ["Misclassified objects", "Missed rare cases", "Overconfident predictions"],
    evidence: ["Scenario coverage, including rare cases", "Confidence versus correctness", "Known gaps stated as unknown"],
    controls: ["Uncertainty thresholds", "Conservative defaults", "Coverage reviews"],
  },
  {
    id: "planning",
    name: "Planning and fallback",
    summary: "How the system chooses what to do — and what it falls back to when it can’t decide safely.",
    risks: ["Plans outside the safe envelope", "Fallbacks that never trigger", "Unsafe behavior at hand-over"],
    evidence: ["Envelope checks across scenarios", "Fallback activation records", "Hand-over timing"],
    controls: ["Envelope enforcement", "Minimal-risk manoeuvre", "Human take-over paths"],
  },
  {
    id: "connectivity",
    name: "Vehicle cyber and connectivity",
    summary: "The networks and interfaces that let the system talk to the world — and let the world talk back.",
    risks: ["Exposed interfaces", "Credential misuse", "Untrusted messages acted on"],
    evidence: ["Interface and access map", "Authentication of inbound commands", "Isolation between systems"],
    controls: ["Least privilege", "Message authentication", "Segmentation"],
  },
  {
    id: "updates",
    name: "Software and model updates",
    summary: "How software and models change after release — and what each change invalidates.",
    risks: ["Unvalidated updates", "Rollbacks that don’t roll back", "Behavior changes nobody tested"],
    evidence: ["Version and change history", "What each update touched", "Retest results per update"],
    controls: ["Signed, staged rollout", "Targeted revalidation", "Tested rollback"],
  },
  {
    id: "fleet",
    name: "Fleet monitoring and incident evidence",
    summary: "What the system records in service, and whether an incident can be reconstructed afterwards.",
    risks: ["Gaps in recorded events", "Drift nobody notices", "Incidents that can’t be replayed"],
    evidence: ["Event logs with versions", "Replay in simulation", "Trend reviews across the fleet"],
    controls: ["Retention and integrity of logs", "Replay before field changes", "Escalation to safety owners"],
  },
];

export const HERMES_VMODEL: { left: VStage[]; bottom: VStage; right: VStage[]; after: VStage } = {
  left: [
    { name: "Requirements", detail: "What the system must and must not do, including its operating domain." },
    { name: "System design", detail: "How sensing, planning and control fit together, with their limits." },
    { name: "Component design", detail: "What each part must guarantee to the rest." },
  ],
  bottom: { name: "Implementation", detail: "Software, models and hardware are built and versioned." },
  right: [
    { name: "Validation", detail: "Checked against the requirements, in the conditions that matter." },
    { name: "System verification", detail: "Checked end to end, in simulation and on the bench." },
    { name: "Component verification", detail: "Each part checked against its own guarantees." },
  ],
  after: { name: "Change & in-service", detail: "After release, every update and incident reopens the evidence it affects." },
};

export const HERMES_SCOPE: ScopeRow[] = [
  {
    path: "Perception",
    component: "The detector meets its accuracy targets on a labeled test set.",
    system: "The vehicle responds safely when the detector is wrong in the scene that matters.",
  },
  {
    path: "Decision",
    component: "The planner stays within its envelope for given inputs.",
    system: "The whole stack holds the envelope as inputs degrade and timing varies.",
  },
  {
    path: "Actuation",
    component: "Commands are within limits at the interface.",
    system: "The physical response matches the command under real load and latency.",
  },
  {
    path: "Communications",
    component: "Messages are authenticated at each interface.",
    system: "A compromised or delayed message cannot push the system outside its limits.",
  },
  {
    path: "Fail-safe",
    component: "The fallback triggers when its condition is met in isolation.",
    system: "The fallback triggers in time, from the states the system actually reaches.",
  },
  {
    path: "Incident analysis",
    component: "Each part logs its own events.",
    system: "The incident can be reconstructed across parts, versions and time.",
  },
];

export const HERMES_DOMAINS = [
  {
    name: "Vehicles and fleets",
    status: "First focus",
    body: "The vehicle AI stack, fleet monitoring and over-the-air model updates — Hermes’s scope.",
    href: "/use-cases/ai-driven-vehicle-systems-hermes",
    link: "See the vehicle use case",
  },
  {
    name: "Industrial and manufacturing AI",
    status: "Outside scope today",
    body: "Operational AI where equipment, processes and suppliers meet real-world effects — not part of Hermes.",
    href: "/solutions/manufacturing-critical-infrastructure",
    link: "See manufacturing and infrastructure",
  },
  {
    name: "Robotics and logistics",
    status: "Outside scope today",
    body: "Machines that move goods and work alongside people — not part of Hermes today.",
    href: "/contact?intent=general",
    link: "Talk to us about scope",
  },
] as const;

export const HERMES_TRAIL: TimelineEvent[] = [
  {
    label: "Update published",
    meta: "perception model 4.2 · OTA",
    detail: "A new perception model is staged for part of the fleet.",
    state: "observed",
  },
  {
    label: "Evidence marked stale",
    meta: "claims tied to model 4.1",
    detail: "Every conclusion that rested on the previous model is reopened — not the whole system.",
    state: "stale",
  },
  {
    label: "Targeted replay",
    meta: "simulation · bench",
    detail: "Recorded scenarios are replayed against 4.2 offline, before any field exposure.",
    state: "unknown",
    stateLabel: "Designed",
  },
  {
    label: "Decision recorded",
    meta: "safety owner",
    detail: "The accountable safety owner decides whether to widen the rollout, restrict it or hold.",
    state: "held",
    stateLabel: "Human decision",
  },
  {
    label: "In-service monitoring",
    meta: "fleet events · versioned",
    detail: "Events are logged with the versions that produced them, so any incident can be traced to a change.",
    state: "unknown",
    stateLabel: "Designed",
  },
];

export const HERMES_OUTLINE = [
  { name: "Assurance scope", body: "Systems, versions and operating conditions covered — and what was excluded." },
  { name: "Test conditions", body: "Simulation, bench or recorded data; environments, seeds and configurations." },
  { name: "Coverage and gaps", body: "What was assessed, what was not, and what remains unknown." },
  { name: "Findings", body: "Observed behavior, with severity, reproduction conditions and limits." },
  { name: "Evidence provenance", body: "Where every result came from, and the versions it was true of." },
  { name: "Human review", body: "Who reviewed the evidence, and the decisions that remain theirs." },
] as const;
