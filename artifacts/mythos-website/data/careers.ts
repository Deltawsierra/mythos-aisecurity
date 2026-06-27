/**
 * Static content for the Careers page.
 *
 * `JOB_OPENINGS` is intentionally empty by default — the page renders a
 * permanent "Open Talent" application either way. Add entries here when a role
 * opens; the Current Openings section will render them automatically.
 */

export interface JobOpening {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
}

export const JOB_OPENINGS: JobOpening[] = [];

/* ── Open Talent form select options ──────────────────────── */

export const AREA_OF_INTEREST_OPTIONS = [
  "AI Security Research",
  "Offensive Security / Red Team",
  "Security Engineering",
  "ML / AI Engineering",
  "Platform & Infrastructure",
  "Product & Design",
  "Go-to-Market / Sales",
  "Operations & Business",
  "Internship / Early Career",
  "Other",
];

export const WORK_TYPE_OPTIONS = ["Remote", "Hybrid", "On-site", "No preference"];

export const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Just exploring",
];

export const YEARS_EXPERIENCE_OPTIONS = [
  "Student / New grad",
  "0–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

/* ── Why join Mythos ──────────────────────────────────────── */

export interface WhyJoinCard {
  title: string;
  body: string;
}

export const WHY_JOIN: WhyJoinCard[] = [
  {
    title: "A mission with weight",
    body: "AI is being deployed into work that matters before anyone has proven it safe. Mythos exists to hold those systems accountable before they reach production.",
  },
  {
    title: "Work at the frontier",
    body: "The standards for evaluating AI systems are being written right now. The work you do here helps define how deployment risk is measured across the industry.",
  },
  {
    title: "Depth over theater",
    body: "Mythos runs rigorous, evidence-driven assessments — not security theater. Findings are real, reproducible, and tied to a deployment decision.",
  },
  {
    title: "Build the proving ground",
    body: "Athena and Achilles are a dual-engine platform for testing AI before release. You will help build, sharpen, and scale the system that does the work.",
  },
];

/* ── What we look for ─────────────────────────────────────── */

export interface Trait {
  title: string;
  body: string;
}

export const TRAITS: Trait[] = [
  {
    title: "Rigor",
    body: "You reason from evidence, not vibes, and you can defend how you reached a conclusion.",
  },
  {
    title: "Adversarial curiosity",
    body: "You think like an attacker and a defender, and you enjoy probing how systems break.",
  },
  {
    title: "Clear communication",
    body: "You turn complex technical findings into decisions that non-experts can act on.",
  },
  {
    title: "Ownership",
    body: "You carry problems end to end and follow through without being asked twice.",
  },
  {
    title: "Integrity",
    body: "You handle sensitive systems and information with discretion and good judgment.",
  },
  {
    title: "Builder's bias",
    body: "You ship, measure, and improve — and you would rather prove something than argue about it.",
  },
];

/* ── Hiring process ───────────────────────────────────────── */

export interface HiringStep {
  title: string;
  body: string;
}

export const HIRING_STEPS: HiringStep[] = [
  {
    title: "Application review",
    body: "Every Open Talent application is read by a person. We look for signal in how you think and what you have built.",
  },
  {
    title: "Intro conversation",
    body: "A focused call to learn about your background, interests, and what you are looking for next.",
  },
  {
    title: "Working session",
    body: "A practical, scenario-based discussion that reflects the real work — not a trivia quiz.",
  },
  {
    title: "Decision & offer",
    body: "References, alignment on scope and expectations, and clear next steps either way.",
  },
];
