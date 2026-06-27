"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, SCROLL_START } from "@/lib/motion";

interface Step {
  label: string;
  sub: string;
}

const STEPS: Step[] = [
  { label: "Scope", sub: "Defined" },
  { label: "Map", sub: "Exposure" },
  { label: "Test", sub: "Behavior" },
  { label: "Evidence", sub: "Recorded" },
  { label: "Remediate", sub: "Review" },
  { label: "Retest", sub: "Proof" },
  { label: "Release Review", sub: "Readiness" },
  { label: "Revalidate", sub: "Ongoing" },
];

/**
 * The Assurance Path — an engraved bronze rail with eight stage nodes that runs
 * from a defined scope through to ongoing revalidation. Horizontal on desktop,
 * vertical on mobile/tablet.
 *
 * Motion (GSAP/ScrollTrigger, scoped, once): the rail draws in and the nodes +
 * labels activate in sequence. Uses gsap.from so every node/label stays visible
 * if JS never runs; prefers-reduced-motion renders the final state.
 */
export function AssurancePath() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      const railH = q("[data-rail-h]");
      const railV = q("[data-rail-v]");
      const markers = q("[data-node-marker]");
      const labels = q("[data-node-label]");

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;

          if (reduced) {
            gsap.set([railH, railV, markers, labels], { clearProps: "all" });
            return;
          }

          const st = { trigger: root, start: SCROLL_START, once: true };

          gsap.from(railH, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: DURATION.connector,
            ease: EASE.expo,
            scrollTrigger: st,
          });
          gsap.from(railV, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: DURATION.connector,
            ease: EASE.expo,
            scrollTrigger: st,
          });
          gsap.from(markers, {
            autoAlpha: 0,
            scale: 0.4,
            transformOrigin: "center center",
            duration: 0.45,
            ease: EASE.out,
            stagger: 0.08,
            delay: 0.3,
            clearProps: "transform",
            scrollTrigger: st,
          });
          gsap.from(labels, {
            autoAlpha: 0,
            y: 8,
            duration: 0.45,
            ease: EASE.out,
            stagger: 0.06,
            delay: 0.45,
            clearProps: "transform",
            scrollTrigger: st,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="relative mt-10 overflow-hidden border border-bronze/18 bg-graphite/40 px-6 py-10 lg:mt-12 lg:px-10 lg:py-12"
    >
      {/* ── Desktop: horizontal rail ───────────────────────── */}
      <div className="relative hidden lg:block">
        <div
          data-rail-h
          aria-hidden="true"
          className="absolute left-[6%] right-[6%] top-[22px] h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(166,106,50,0.15), rgba(166,106,50,0.55) 50%, rgba(166,106,50,0.15))",
          }}
        />
        <ol className="relative grid grid-cols-8">
          {STEPS.map((step, i) => (
            <li key={step.label} className="flex flex-col items-center px-2 text-center">
              <span className="relative flex h-11 items-center justify-center">
                <span data-node-marker aria-hidden="true" className="loop-node relative" />
              </span>
              <p
                data-node-label
                className="mt-4 text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-ivory"
              >
                {step.label}
              </p>
              <p
                data-node-label
                className="mt-1 text-[9px] uppercase tracking-[0.18em] text-bronze/60"
              >
                {step.sub}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Mobile / tablet: vertical rail ─────────────────── */}
      <div className="relative lg:hidden">
        <div
          data-rail-v
          aria-hidden="true"
          className="absolute bottom-[22px] left-[21px] top-[22px] w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(166,106,50,0.15), rgba(166,106,50,0.55) 50%, rgba(166,106,50,0.15))",
          }}
        />
        <ol className="relative flex flex-col gap-7">
          {STEPS.map((step) => (
            <li key={step.label} className="relative flex items-center gap-4">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                <span data-node-marker aria-hidden="true" className="loop-node relative" />
              </span>
              <div>
                <p
                  data-node-label
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-ivory"
                >
                  {step.label}
                </p>
                <p
                  data-node-label
                  className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-bronze/60"
                >
                  {step.sub}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
