/**
 * Canonical use-case-number → deep-dive-slug map.
 *
 * Kept in this tiny, data-free module so that client components (e.g. the
 * "use client" UseCaseLibrary) can derive a deep-dive href WITHOUT importing the
 * full long-form scenario data in `useCaseDeepDives.ts` into the browser bundle.
 *
 * This is the single source of truth for deep-dive slugs: `useCaseDeepDives.ts`
 * imports it and asserts every entry matches, so the two can never drift.
 */
export const DEEP_DIVE_SLUG_BY_NUMBER: Record<number, string> = {
  1: "customer-support-ai-agent",
  2: "internal-knowledge-rag-assistant",
  3: "ai-agent-tools-actions",
  4: "regulated-workflow-assistant",
  5: "partner-vendor-ai-integration",
  6: "executive-employee-copilot",
  7: "developer-ai-assistant",
  8: "ai-powered-decision-support",
  9: "public-sector-mission-workflow",
  10: "data-platform-cloud-ai-integration",
  11: "ai-driven-vehicle-systems-hermes",
  12: "quantum-adjacent-ai-integration",
};
