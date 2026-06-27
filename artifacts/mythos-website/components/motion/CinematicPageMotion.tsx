"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Homepage-level orchestration wrapper. It does not animate content itself —
 * the section/hero/connector components own their reveals. Its job is to keep
 * ScrollTrigger positions accurate once fonts, images, and the hero video have
 * settled (which otherwise shifts trigger start points after first paint).
 */
export function CinematicPageMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const refresh = () => ScrollTrigger.refresh();
      const timeout = window.setTimeout(refresh, 400);
      window.addEventListener("load", refresh);
      return () => {
        window.clearTimeout(timeout);
        window.removeEventListener("load", refresh);
      };
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
