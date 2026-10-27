import type { HeroPlane } from "@/components/scenic/ScenicHero";
import type { RecordRow } from "@/components/platform/RecordCard";
import type { PillState } from "@/components/platform/StatePill";
import type { WorkflowStep } from "@/components/use-cases/WorkflowPath";

/** One use-case page (Launch Guide §10): question → workflow → what can go
 * wrong → test and authority boundaries → evidence → limits → industries. */
export interface UseCaseContent {
  slug: string;
  number: number;
  title: string;
  /** Search title (without the site suffix), written for how buyers search; falls back to the title. */
  seoTitle?: string;
  metaDescription: string;
  /** H1: the buyer's question; *starred* words take the gold accent. */
  question: string;
  lede: string;
  /** Strategic-horizon pages carry a visible guardrail under the hero. */
  horizon?: { label: string; guardrail: string };
  /** Card medallion / emblem. */
  image: string;
  planes: HeroPlane[];
  facets: { industry: string[]; product: string[]; risk: string[] };
  workflow: { title: string; lede: string; steps: WorkflowStep[]; boundaryBefore?: number; boundaryLabel?: string };
  wrong: { title: string; lede: string; items: { name: string; body: string }[] };
  approach: { title: string; lede: string; athena: string[]; achilles: string[]; spine: string[] };
  evidence: {
    title: string;
    lede: string;
    receipt: { kind: string; title: string; rows: RecordRow[]; footer: string };
    claims: { claim: string; state: PillState; label?: string; note: string }[];
  };
  limits: { title: string; items: string[] };
  industries: string[];
}
