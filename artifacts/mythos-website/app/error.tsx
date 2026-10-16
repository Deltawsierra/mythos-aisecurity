"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { LostPath } from "@/components/layout/LostPath";

/** Error boundary — the "500" experience, styled like the rest of the world. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <LostPath code="Something went wrong" title="This page *failed to load.*" body="An error stopped this page from rendering. Try again, or continue from another page — nothing you entered was sent.">
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-full border border-antique-gold bg-gradient-to-b from-champagne to-antique-gold px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
        >
          Try Again
        </button>
        <Button href="/" variant="secondary" size="lg">
          Back to Home
        </Button>
      </div>
    </LostPath>
  );
}
