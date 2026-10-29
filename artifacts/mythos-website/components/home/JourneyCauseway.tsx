"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Headline";
import { CAUSEWAY_MEDIA } from "@/content/media";
import { HOME_JOURNEY } from "@/content/home";
import { cn } from "@/lib/utils";

const { size, layers, medallions, centers, centerY, path, halo } = CAUSEWAY_MEDIA;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * H03 — the marketing journey across the causeway (Launch Guide S04). The
 * Batch 06 layers share one 2048×1152 canvas, so the stage keeps that aspect
 * and the Batch 07 medallions sit on their registered centres. Scrolling past
 * the bridge walks the five stages in normal document flow (no pinning); a
 * click or key press takes over. The gold path traces to the active stage.
 * Phones get the art as a band and the medallions as a scrollable rail.
 */
export function JourneyCauseway() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const manual = useRef(false);
  const stages = HOME_JOURNEY.stages;
  const current = stages[active];

  useEffect(() => {
    const el = stageRef.current;
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!el || !motionOk) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 40%",
      onUpdate: (self) => {
        if (manual.current) return;
        setActive(Math.min(stages.length - 1, Math.floor(self.progress * stages.length)));
      },
    });
    return () => st.kill();
  }, [stages.length]);

  const choose = (i: number) => {
    manual.current = true;
    setActive(i);
  };

  const traced = 1 - active / (stages.length - 1);

  const buttons = (variant: "stage" | "rail") =>
    stages.map((stage, i) => (
      <button
        key={stage.id}
        type="button"
        aria-pressed={active === i}
        aria-controls="journey-detail"
        onClick={() => choose(i)}
        className={cn(
          "journey-stage group flex flex-col items-center",
          variant === "stage"
            ? "absolute -translate-x-1/2 -translate-y-1/2"
            : "w-[5.5rem] shrink-0 snap-center",
        )}
        style={variant === "stage" ? { left: pct(centers[i], size.width), top: pct(centerY, size.height) } : undefined}
      >
        <span className={cn("relative block", variant === "stage" ? "h-[clamp(4.5rem,8.4vw,9.5rem)] w-[clamp(4.5rem,8.4vw,9.5rem)]" : "h-[4.5rem] w-[4.5rem]")}>
          {active === i && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={halo} loading="lazy" alt="" aria-hidden="true" className="journey-halo absolute -inset-[22%] h-[144%] w-[144%] max-w-none" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={medallions[stage.id]} loading="lazy" alt="" aria-hidden="true" className="journey-medallion relative h-full w-full" />
        </span>
        <span
          className={cn(
            "mt-2 whitespace-nowrap px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors",
            variant === "stage" ? "bg-charcoal/75 text-ivory backdrop-blur-sm" : "text-fg",
            active === i && (variant === "stage" ? "bg-charcoal/90 text-champagne" : "text-accent"),
          )}
        >
          <span className="sr-only">Stage {i + 1}: </span>
          {stage.name}
        </span>
      </button>
    ));

  return (
    <section data-surface="ivory" aria-labelledby="journey-title" className="relative isolate overflow-hidden pt-20 lg:pt-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center" data-reveal-group>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">{HOME_JOURNEY.eyebrow}</p>
          <h2 id="journey-title" className="display-caps font-display text-[2.3rem] text-fg sm:text-5xl lg:text-[3.6rem]">
            <Accent text={HOME_JOURNEY.headline} />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">{HOME_JOURNEY.lede}</p>
        </div>
      </Container>

      {/* The causeway. */}
      <div
        ref={stageRef}
        className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-[1920px] overflow-hidden lg:mt-4"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%)",
        }}
        role="group"
        aria-label="The five stages of the journey"
      >
        <div aria-hidden="true" className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.sky} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" data-drift="30" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.mountains} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" data-drift="16" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.gorge} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.bridge} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.sunbeams} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.mist} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" data-drift="-40" />
          {/* Ivory veils top and bottom: the bridge emerges from, and returns to, stone. */}
          <div className="absolute inset-x-0 top-0 h-[18%]" style={{ background: "linear-gradient(180deg, #ede4d5 0%, rgba(237,228,213,0) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[20%]" style={{ background: "linear-gradient(0deg, #ede4d5 0%, rgba(237,228,213,0.6) 45%, rgba(237,228,213,0) 100%)" }} />

          <svg viewBox={`0 0 ${size.width} ${size.height}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="journey-flow" x1="0" x2="1">
                <stop offset="0" stopColor="#a26533" />
                <stop offset="0.2" stopColor="#ffde9d" />
                <stop offset="0.55" stopColor="#ffeabe" />
                <stop offset="0.85" stopColor="#ffcc70" />
                <stop offset="1" stopColor="#a26533" />
              </linearGradient>
              <filter id="journey-glow" x="-10%" y="-50%" width="120%" height="200%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <path d={path} fill="none" stroke="#ffe7b8" strokeOpacity="0.28" strokeWidth="5" />
            <path
              d={path}
              pathLength={1}
              fill="none"
              stroke="#ffd98a"
              strokeWidth="22"
              strokeLinecap="round"
              strokeDasharray="1 1"
              strokeDashoffset={traced}
              filter="url(#journey-glow)"
              className="journey-trace"
              opacity="0.8"
            />
            <path
              d={path}
              pathLength={1}
              fill="none"
              stroke="url(#journey-flow)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="1 1"
              strokeDashoffset={traced}
              className="journey-trace"
            />
          </svg>
        </div>

        <div className="hidden md:block">{buttons("stage")}</div>
      </div>

      {/* Phones: the medallions as a rail. */}
      <div className="-mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 md:hidden" role="group" aria-label="The five stages of the journey">
        {buttons("rail")}
      </div>

      {/* From md up the stage card rides up onto the bridge arches (~63% down the scene), so it is
          in view while the stages advance rather than arriving after them. */}
      <Container className="relative z-10 pb-12 md:-mt-[min(20.5vw,394px)] lg:pb-14">
        <div id="journey-detail" aria-live="polite" className="mx-auto max-w-4xl">
          <div key={current.id} className="lc-fade grid gap-6 border border-rule bg-cream/90 p-6 shadow-[0_24px_50px_-36px_rgba(22,26,28,0.45)] sm:p-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                Stage {active + 1} of {stages.length} · {current.name}
              </p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-fg">{current.line}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{current.body}</p>
            </div>
            <dl className="grid content-start gap-4 border-t border-rule pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Evidence produced</dt>
                <dd className="mt-1 font-display text-xl text-fg">{current.produces}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Led by</dt>
                <dd className="mt-1 text-[15px] font-semibold text-accent">{current.led}</dd>
              </div>
            </dl>
          </div>
          {/* Backed in ivory: on wide screens this line lands on the mist and waterfalls. */}
          <p className="mx-auto mt-6 flex w-fit max-w-full flex-wrap items-center justify-center gap-2 bg-cream/85 px-4 py-2 text-center text-sm text-fg-muted backdrop-blur-sm">
            {HOME_JOURNEY.footnote}
            <Link href="#cycle-title" className="inline-flex items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline">
              See the cycle
              <ArrowDown size={14} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
