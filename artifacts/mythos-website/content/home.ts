/**
 * Homepage copy (blueprint Section 6). Capability statements here are also
 * entered in content/claims.ts so the launch gate covers them.
 */
import { EXECUTIVE_QUESTIONS } from "@/content/platform";

export const HOME_HERO = {
  eyebrow: "AI Deployment Assurance",
  headline: "Prove Your AI Is Ready to Operate.",
  body: "Mythos independently maps what AI can reach, tests what it can do, verifies what actually happens, quantifies the business exposure, and keeps the evidence current as the system changes.",
  /** The buyer briefing's five plain-English questions — the bridge out of the hero. */
  questions: EXECUTIVE_QUESTIONS,
} as const;

export const HOME_CHALLENGE = {
  eyebrow: "The challenge",
  headline: "AI has become an execution layer.",
  body: "It reads data, routes requests, calls tools and takes action. The uncertainty no longer sits in the model alone — it runs across everything the system can touch.",
  dimensions: ["Access", "Authority", "Behavior", "Effects", "Evidence"],
  risks: [
    {
      id: "rapid-adoption",
      title: "Rapid adoption",
      body: "AI ships faster than teams can validate what it is allowed to do.",
    },
    {
      id: "attack-surfaces",
      title: "Expanding reach",
      body: "Agents and retrieval pipelines reach into data, tools and other systems.",
    },
    {
      id: "higher-stakes",
      title: "Higher stakes",
      body: "AI now approves, moves and changes things — effects with real consequences.",
    },
    {
      id: "growing-uncertainty",
      title: "Evidence goes stale",
      body: "Models, prompts and permissions change. Passing once does not mean passing forever.",
    },
  ],
} as const;

export const HOME_LIFECYCLE = {
  eyebrow: "The assurance lifecycle",
  headline: "One continuous loop, from first map to fresh evidence.",
  executiveLayer: {
    label: "Executive layer · Economic Exposure",
    body: "What could a validated failure cost, what drives that range, and how much exposure could a proposed fix remove?",
    href: "/platform/economic-exposure",
  },
} as const;

export const HOME_FINAL_CTA = {
  headline: "Start with one AI system.",
  body: "Get independent evidence your security, engineering, risk and executive teams can act on — and keep it current as the system changes.",
} as const;

/** Homepage sections the blueprint calls for that later phases still build. */
export const HOME_PENDING_SECTIONS = [
  "Platform architecture — Athena, SPINE, Achilles, Minotaur and Hermes",
  "SPINE and the Red / Blue / Purple / Green / White assurance teams",
  "What Mythos produces — claims, receipts, evidence and decisions",
  "Industries — from financial services to critical infrastructure",
];
