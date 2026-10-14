import { LifecycleSequence } from "@/components/home/LifecycleSequence";
import { LIFECYCLE } from "@/content/platform";
import { HOME_LIFECYCLE } from "@/content/home";
import { LIFECYCLE_MEDALLIONS } from "@/content/media";
import { inlineSvg } from "@/lib/inlineSvg";

/**
 * Server half of the lifecycle: inlines the Batch 5 medallions (ids prefixed
 * per stage so their gradients don't collide) so motion can reach their
 * data-motion-part hooks, then hands them to the client sequence.
 */
export function LifecycleSection() {
  const stages = LIFECYCLE.map((stage) => ({
    ...stage,
    medallionSrc: LIFECYCLE_MEDALLIONS[stage.id],
    medallionSvg: inlineSvg(LIFECYCLE_MEDALLIONS[stage.id], `lc-${stage.id}`),
  }));
  const connectorSvg = inlineSvg("/assets/lifecycle/lifecycle-connector-base.svg", "lc-connector");

  return <LifecycleSequence stages={stages} connectorSvg={connectorSvg} copy={HOME_LIFECYCLE} />;
}
