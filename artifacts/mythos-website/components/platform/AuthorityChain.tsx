"use client";

import { useRef } from "react";
import { AUTHORITY_CHAIN, AUTHORITY_VERDICT } from "@/content/platform";
import { EVIDENCE_STATE_ICONS } from "@/content/media";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Person → effect. The chain draws left to right as it enters the view, then
 * resolves on SPINE's verdict for the illustrative example. Reduced motion
 * shows the finished chain.
 */
export function AuthorityChain() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.from(root.querySelectorAll("[data-chain-line]"), {
          scaleX: 0,
          scaleY: 0,
          duration: 1.8,
          ease: "power2.inOut",
        })
          .from(root.querySelectorAll("[data-chain-node]"), { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.16 }, 0.1)
          .from(root.querySelector("[data-chain-verdict]"), { autoAlpha: 0, y: 16, duration: 0.9 }, "-=0.2");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const last = AUTHORITY_CHAIN.length - 1;

  return (
    <div ref={ref}>
      <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-fg-muted">
        Illustrative example · a support assistant issues a refund
      </p>
      <ol className="relative grid gap-y-6 lg:grid-cols-8 lg:gap-x-3">
        {/* The chain itself: horizontal on desktop, vertical on phones. */}
        <span
          data-chain-line
          aria-hidden="true"
          className="absolute left-[1.15rem] top-3 h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-bronze via-antique-gold to-state-contradicted lg:left-[6.25%] lg:right-[6.25%] lg:top-[1.15rem] lg:h-px lg:w-auto lg:origin-left lg:bg-gradient-to-r"
        />
        {AUTHORITY_CHAIN.map((link, index) => (
          <li key={link.name} data-chain-node className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <span
              className={
                index === last
                  ? "relative z-10 flex h-[2.3rem] w-[2.3rem] shrink-0 items-center justify-center rounded-full border border-state-contradicted bg-bone text-xs font-semibold text-state-contradicted-ink"
                  : "relative z-10 flex h-[2.3rem] w-[2.3rem] shrink-0 items-center justify-center rounded-full border border-bronze bg-bone text-xs font-semibold text-accent"
              }
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="lg:mt-4">
              <span className="block font-display text-2xl leading-none text-fg">{link.name}</span>
              <span className="mt-1.5 block text-sm leading-snug text-fg-muted">{link.question}</span>
              <span
                className={
                  index === last
                    ? "mt-2.5 inline-block border border-state-contradicted/50 bg-state-contradicted/10 px-2 py-1 font-mono text-[11px] text-state-contradicted-ink"
                    : "mt-2.5 inline-block border border-rule bg-panel px-2 py-1 font-mono text-[11px] text-fg"
                }
              >
                {link.example}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div
        data-chain-verdict
        className="mt-10 flex max-w-3xl items-start gap-4 border-l-2 border-state-contradicted bg-panel p-5 shadow-[0_18px_40px_-34px_rgba(21,35,51,0.45)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EVIDENCE_STATE_ICONS[AUTHORITY_VERDICT.state]} loading="lazy" alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
        <p className="text-base leading-relaxed text-fg">
          <span className="font-semibold">SPINE verdict: Contradicted. </span>
          {AUTHORITY_VERDICT.text}
        </p>
      </div>
    </div>
  );
}
