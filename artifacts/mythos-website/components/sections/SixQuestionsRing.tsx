"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, SCROLL_START } from "@/lib/motion";

interface Question {
  title: string;
  description: string;
}

const QUESTIONS: Question[] = [
  {
    title: "What can the AI see?",
    description:
      "Data, documents, metadata, permissions, and sensitive context available to the workflow.",
  },
  {
    title: "Where does the request go?",
    description:
      "Apps, gateways, model providers, logs, tools, regions, and fallback routes a request touches.",
  },
  {
    title: "What can the AI do?",
    description:
      "Tools, APIs, files, approvals, business actions, and workflow steps the AI can trigger.",
  },
  {
    title: "Can it be tricked?",
    description:
      "Prompt injection, poisoned retrieval, goal hijacking, memory manipulation, or approval bypass.",
  },
  {
    title: "Can we prove the result?",
    description:
      "Evidence for security teams, compliance reviewers, executives, auditors, and trust reviews.",
  },
  {
    title: "Will it stay safe?",
    description:
      "Revalidation when models, prompts, tools, permissions, routes, or data sources change.",
  },
];

// Six nodes evenly spaced around a circle, numbered clockwise from the top.
const RING_CENTER = 100;
const RING_RADIUS = 76;
const NODE_POINTS = QUESTIONS.map((_, i) => {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  return {
    x: RING_CENTER + RING_RADIUS * Math.cos(angle),
    y: RING_CENTER + RING_RADIUS * Math.sin(angle),
  };
});

function QuestionCard({ q, n }: { q: Question; n: number }) {
  return (
    <div
      data-q-card
      className="relative border border-ivory/8 bg-charcoal/70 p-5 transition-colors duration-300 hover:border-bronze/35"
    >
      <div className="mb-2 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center border border-bronze/40 font-display text-xs leading-none text-bronze"
        >
          {n}
        </span>
        <h3 className="font-display text-base font-normal leading-snug text-ivory">
          {q.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-stone">{q.description}</p>
    </div>
  );
}

/**
 * The six assurance questions, shown as a bronze "release-gate wheel".
 *
 * Desktop (lg+): a central SVG ring with six numbered nodes, flanked by the six
 * question cards (1–3 left, 4–6 right). Below lg: the ring is hidden and the
 * cards stack vertically as a numbered list.
 *
 * Motion (GSAP/ScrollTrigger, scoped, once): the ring draws in, nodes activate
 * in sequence, the center mark settles with a faint breathing glow, and the
 * cards fade up. All text is real and always visible (gsap.from), so the section
 * reads fully if JS never runs; prefers-reduced-motion renders the final state.
 */
export function SixQuestionsRing() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      const ring = q("[data-ring-circle]");
      const nodes = q("[data-ring-node]");
      const centerGlow = q("[data-ring-center-glow]");
      const cards = q("[data-q-card]");

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;

          if (reduced) {
            gsap.set(ring, { strokeDashoffset: 0 });
            gsap.set([nodes, cards], { clearProps: "all" });
            gsap.set(centerGlow, { autoAlpha: 0.4 });
            return;
          }

          const st = { trigger: root, start: SCROLL_START, once: true };

          gsap.from(ring, {
            strokeDashoffset: 1,
            duration: DURATION.connector,
            ease: EASE.expo,
            scrollTrigger: st,
          });
          gsap.from(nodes, {
            autoAlpha: 0,
            scale: 0.4,
            transformOrigin: "center center",
            duration: 0.5,
            ease: EASE.out,
            stagger: 0.1,
            delay: 0.35,
            scrollTrigger: st,
          });
          gsap.fromTo(
            centerGlow,
            { autoAlpha: 0, scale: 0.6 },
            {
              autoAlpha: 0.4,
              scale: 1,
              duration: 0.7,
              ease: EASE.out,
              delay: 0.7,
              scrollTrigger: st,
            },
          );
          gsap.to(centerGlow, {
            autoAlpha: 0.15,
            scale: 1.35,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.5,
            scrollTrigger: st,
          });
          gsap.from(cards, {
            autoAlpha: 0,
            y: 16,
            duration: DURATION.ui,
            ease: EASE.out,
            stagger: 0.08,
            scrollTrigger: st,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      {/* ── Desktop: cards flanking the gate wheel ───────────── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
        <div className="flex flex-col gap-5">
          {QUESTIONS.slice(0, 3).map((qq, i) => (
            <QuestionCard key={qq.title} q={qq} n={i + 1} />
          ))}
        </div>

        <RingGraphic />

        <div className="flex flex-col gap-5">
          {QUESTIONS.slice(3, 6).map((qq, i) => (
            <QuestionCard key={qq.title} q={qq} n={i + 4} />
          ))}
        </div>
      </div>

      {/* ── Mobile / tablet: vertical numbered cards ─────────── */}
      <div className="flex flex-col gap-4 lg:hidden">
        {QUESTIONS.map((qq, i) => (
          <QuestionCard key={qq.title} q={qq} n={i + 1} />
        ))}
      </div>
    </div>
  );
}

function RingGraphic() {
  return (
    <div className="relative mx-auto h-[268px] w-[268px] shrink-0">
      {/* Center breathing glow */}
      <div
        data-ring-center-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(214,161,74,0.4) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="relative h-full w-full"
      >
        <circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(166,106,50,0.18)"
          strokeWidth="1"
        />
        <circle
          data-ring-circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(166,106,50,0.6)"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          transform={`rotate(-90 ${RING_CENTER} ${RING_CENTER})`}
        />
        {NODE_POINTS.map((p, i) => (
          <g key={i} data-ring-node>
            <circle cx={p.x} cy={p.y} r="11" fill="#1a1713" stroke="rgba(166,106,50,0.5)" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r="3" fill="#d6a14a" />
            <text
              x={p.x}
              y={p.y + 0.5}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display"
              fontSize="9"
              fill="#f3e8d0"
              dy="-9"
            >
              {i + 1}
            </text>
          </g>
        ))}
        <text
          x={RING_CENTER}
          y={RING_CENTER - 6}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="1.5"
          fill="#a66a32"
          className="font-semibold uppercase"
        >
          RELEASE
        </text>
        <text
          x={RING_CENTER}
          y={RING_CENTER + 8}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="1.5"
          fill="#a66a32"
          className="font-semibold uppercase"
        >
          GATE
        </text>
      </svg>
    </div>
  );
}
