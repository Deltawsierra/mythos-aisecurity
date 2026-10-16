import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { LostPath } from "@/components/layout/LostPath";
import { PageFinder } from "@/components/layout/PageFinder";
import { SITE_INDEX } from "@/content/siteIndex";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/** 404 — Launch Guide §04: world-styled, with search and return paths, no redirect trap. */
export default function NotFound() {
  return (
    <LostPath code="404 · Not on the map" title="This path *leads nowhere.*" body="The page you were looking for doesn’t exist or has moved. Find it below, or start again from a familiar place.">
      <PageFinder pages={SITE_INDEX} />
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/" variant="primary" size="lg" arrow>
          Back to Home
        </Button>
        <Button href="/contact" variant="secondary" size="lg">
          Contact Mythos
        </Button>
      </div>
    </LostPath>
  );
}
