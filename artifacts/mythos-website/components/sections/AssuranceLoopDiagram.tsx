"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, SCROLL_START, REDUCED_DURATION } from "@/lib/motion";

interface Stage {
  label: string;
  sub: string;
}

const STAGES: Stage[] = [
  { label: "Exposure", sub: "Athena" },
  { label: "Evidence", sub: "Documented" },
  { label: "Behavior", sub: "Achilles" },
  { label: "Release", sub: "Gated" },
  { label: "Revalidate", sub: "Ongoing" },
];

const CENTER_INDEX = 2;

/**
 * The Assurance Loop — an engraved bronze command rail with five glowing stage
 * nodes. Horizontal on desktop, vertical on mobile.
 *
 * Motion (GSAP/ScrollTrigger, scoped, once): the rail draws in, nodes activate
 * in sequence, and the center node where the two engines meet keeps a subtle
 * breathing pulse. Uses gsap.from so every node/label stays visible if JS never
 * runs; prefers-reduced-motion renders the final state with no animation.
 */
export function AssuranceLoopDiagram() {
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
      const glows = q("[data-center-glow]");

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;

          // Reduced motion: render the final state with no animation.
          if (reduced) {
            gsap.set([railH, railV, markers, labels], { clearProps: "all" });
            gsap.set(glows, { autoAlpha: 0.45 });
            return;
          }

          const st = { trigger: root, start: SCROLL_START, once: true };

          // Rails draw in (decorative).
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

          // Nodes activate in sequence.
          gsap.from(markers, {
            autoAlpha: 0,
            scale: 0.4,
            transformOrigin: "center center",
            duration: 0.5,
            ease: EASE.out,
            stagger: 0.1,
            delay: 0.35,
            clearProps: "transform",
            scrollTrigger: st,
          });

          // Stage labels rise in just behind their nodes.
          gsap.from(labels, {
            autoAlpha: 0,
            y: 8,
            duration: 0.5,
            ease: EASE.out,
            stagger: 0.08,
            delay: 0.5,
            clearProps: "transform",
            scrollTrigger: st,
          });

          // Center node glow settles in, then keeps a subtle breathing pulse.
          gsap.fromTo(
            glows,
            { autoAlpha: 0, scale: 0.6 },
            {
              autoAlpha: 0.45,
              scale: 1,
              duration: 0.6,
              ease: EASE.out,
              delay: 0.75,
              scrollTrigger: st,
            },
          );
          gsap.to(glows, {
            autoAlpha: 0.16,
            scale: 1.4,
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.5,
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
      className="relative mt-10 overflow-hidden border border-bronze/18 bg-graphite/40 px-6 py-10 lg:mt-12 lg:px-12 lg:py-12"
    >
      {/* Corner accents */}
      <CornerAccents />

      {/* Faint radial command mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(166,106,50,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mb-9 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze/70">
          The Assurance Loop
        </p>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-stone/80">
          Athena and Achilles feed one continuous cycle — not two separate products.
        </p>
      </div>

      {/* ── Desktop: horizontal rail ───────────────────────── */}
      <div data-layout="desktop" className="relative hidden lg:block">
        <div
          data-rail-h
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-[22px] h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(166,106,50,0.15), rgba(166,106,50,0.55) 50%, rgba(166,106,50,0.15))",
          }}
        />
        <ol className="relative grid grid-cols-5">
          {STAGES.map((stage, i) => (
            <li key={stage.label} className="flex flex-col items-center px-3 text-center">
              <span className="relative flex h-11 items-center justify-center">
                {i === CENTER_INDEX && (
                  <span
                    data-center-glow
                    aria-hidden="true"
                    className="pointer-events-none absolute h-10 w-10 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(214,161,74,0.4) 0%, transparent 70%)",
                    }}
                  />
                )}
                <span
                  data-node-marker
                  aria-hidden="true"
                  className="loop-node relative"
                />
              </span>
              <p
                data-node-label
                className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ivory"
              >
                {stage.label}
              </p>
              <p
                data-node-label
                className="mt-1 text-[10px] uppercase tracking-[0.2em] text-bronze/60"
              >
                {stage.sub}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Mobile / tablet: vertical rail ─────────────────── */}
      <div data-layout="mobile" className="relative lg:hidden">
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
        {STAGES.map((stage, i) => (
          <li key={stage.label} className="relative flex items-center gap-4">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              {i === CENTER_INDEX && (
                <span
                  data-center-glow
                  aria-hidden="true"
                  className="pointer-events-none absolute h-10 w-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(214,161,74,0.4) 0%, transparent 70%)",
                  }}
                />
              )}
              <span
                data-node-marker
                aria-hidden="true"
                className="loop-node relative"
              />
            </span>
            <div>
              <p
                data-node-label
                className="text-xs font-semibold uppercase tracking-[0.14em] text-ivory"
              >
                {stage.label}
              </p>
              <p
                data-node-label
                className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-bronze/60"
              >
                {stage.sub}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </div>
  );
}

function CornerAccents() {
  const base =
    "pointer-events-none absolute h-3 w-3 border-bronze/45";
  return (
    <>
      <span aria-hidden="true" className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden="true" className={`${base} right-0 top-0 border-r border-t`} />
      <span aria-hidden="true" className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
