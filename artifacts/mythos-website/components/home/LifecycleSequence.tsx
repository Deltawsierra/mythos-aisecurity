"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  name: string;
  summary: string;
  medallionSrc: string;
  medallionSvg: string;
}

interface LifecycleSequenceProps {
  stages: Stage[];
  connectorSvg: string;
  copy: {
    eyebrow: string;
    headline: string;
    executiveLayer: { label: string; body: string; href: string };
  };
}

// Medallion centres, matching the five sockets in the Batch 5 connector art
// (x = 260…1540 of a 1800-wide viewBox).
const STOPS = [260, 580, 900, 1220, 1540].map((x) => (x / 1800) * 100);

/**
 * The homepage's one pinned sequence (blueprint: lifecycle + SPINE team loop
 * are the only semi-sticky sections). Native scroll drives it — no hijacking:
 * a tall track with a sticky stage, progress mapped to the active medallion
 * and a gold trace along the connector. Stages are buttons that scroll to
 * their point in the sequence. Reduced motion and small screens get a static
 * layout via CSS (see .lifecycle-* in globals.css).
 */
export function LifecycleSequence({ stages, connectorSvg, copy }: LifecycleSequenceProps) {
  const trackRef = useRef<HTMLElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const n = stages.length;
  const first = STOPS[0];
  const span = STOPS[n - 1] - first;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const setTrace = gsap.quickSetter(traceRef.current, "width", "%");
        const setOrb = gsap.quickSetter(orbRef.current, "left", "%");
        triggerRef.current = ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const p = self.progress;
            setActive(Math.min(n - 1, Math.floor(p * n)));
            // The trace reaches stage i exactly as stage i activates.
            const t = Math.min(1, (p * n) / (n - 1));
            setTrace(span * t);
            setOrb(first + span * t);
          },
        });
        return () => {
          triggerRef.current?.kill();
          triggerRef.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: trackRef },
  );

  const goTo = (index: number) => {
    const st = triggerRef.current;
    if (!st) {
      setActive(index);
      return;
    }
    window.scrollTo({
      top: st.start + (st.end - st.start) * ((index + 0.5) / n),
      behavior: "smooth",
    });
  };

  const state = (index: number) =>
    index < active ? "complete" : index === active ? "active" : "upcoming";
  const current = stages[active];

  return (
    <section
      ref={trackRef}
      data-surface="navy"
      aria-labelledby="lifecycle-title"
      className="lifecycle-track relative lg:h-[360vh]"
    >
      <div className="lifecycle-sticky relative overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 52%, rgba(21,48,74,0.95) 0%, rgba(11,31,51,0) 70%), linear-gradient(180deg, #0b1f33 0%, #08121c 100%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/transitions/transition-bronze-particles.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen"
        />

        <Container className="relative z-10 py-24 lg:py-0 lg:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              {copy.eyebrow}
            </p>
            <h2 id="lifecycle-title" className="font-display text-4xl leading-tight text-fg lg:text-[3.4rem]">
              {copy.headline}
            </h2>
          </div>

          {/* Desktop: the pinned sequence. */}
          <div className="lc-row relative mx-auto mt-14 hidden max-w-6xl lg:block">
            <div
              aria-hidden="true"
              className="lc-connector absolute inset-x-0 -translate-y-1/2"
              style={{ top: "calc(var(--lc-size) / 2)" }}
              dangerouslySetInnerHTML={{ __html: connectorSvg }}
            />
            <div
              ref={traceRef}
              aria-hidden="true"
              className="lc-trace absolute h-[3px] -translate-y-1/2"
              style={{ top: "calc(var(--lc-size) / 2)", left: `${first}%`, width: 0 }}
            />
            <div
              ref={orbRef}
              aria-hidden="true"
              className="lc-orb absolute"
              style={{ top: "calc(var(--lc-size) / 2)", left: `${first}%` }}
            />
            <ol className="relative" style={{ height: "calc(var(--lc-size) + 4.5rem)" }}>
              {stages.map((stage, index) => (
                <li
                  key={stage.id}
                  className="absolute top-0 -translate-x-1/2"
                  style={{ left: `${STOPS[index]}%` }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    data-state={state(index)}
                    aria-current={index === active ? "step" : undefined}
                    className="lc-stage group flex flex-col items-center focus-visible:outline-none"
                  >
                    <span
                      className="lc-medallion block rounded-full group-focus-visible:ring-2 group-focus-visible:ring-bronze/70"
                      style={{ width: "var(--lc-size)", height: "var(--lc-size)" }}
                      dangerouslySetInnerHTML={{ __html: stage.medallionSvg }}
                    />
                    <span className="lc-name mt-4 text-[11px] font-semibold uppercase tracking-[0.26em]">
                      {stage.name}
                    </span>
                    <span className="lc-summary mt-3 hidden w-44 text-center text-xs leading-relaxed text-fg-muted">
                      {stage.summary}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="lc-live mx-auto mt-6 hidden max-w-2xl text-center lg:block" aria-live="polite">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze-bright">
              Stage {active + 1} of {n}
            </p>
            <p key={`${current.id}-name`} className="lc-fade mt-2 font-display text-3xl text-fg">
              {current.name}
            </p>
            <p key={`${current.id}-summary`} className="lc-fade mt-2 min-h-[3.25rem] text-base leading-relaxed text-fg-muted">
              {current.summary}
            </p>
          </div>

          {/* Phones and tablets: a vertical timeline. */}
          <ol className="relative mx-auto mt-14 max-w-md lg:hidden">
            <span
              aria-hidden="true"
              className="absolute bottom-10 left-[2.7rem] top-10 w-px bg-gradient-to-b from-bronze/0 via-bronze/70 to-bronze/0"
            />
            {stages.map((stage) => (
              <li key={stage.id} className="relative flex gap-5 pb-9 last:pb-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stage.medallionSrc}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="relative z-10 h-[5.4rem] w-[5.4rem] shrink-0"
                />
                <div className="pt-3">
                  <p className="font-display text-2xl text-fg">{stage.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{stage.summary}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-3 border-t border-rule pt-8 text-center lg:mt-8 lg:pt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
              {copy.executiveLayer.label}
            </p>
            <p className="font-display text-xl italic leading-snug text-fg/90">{copy.executiveLayer.body}</p>
            <Link
              href={copy.executiveLayer.href}
              className={cn(
                "group mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-ivory",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
              )}
            >
              Explore Economic Exposure
              <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
