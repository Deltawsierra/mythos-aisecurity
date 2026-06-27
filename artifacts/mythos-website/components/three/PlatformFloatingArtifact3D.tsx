"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DESKTOP_MIN_WIDTH, isWebGLAvailable } from "@/lib/three";
import type { PlatformArtifactKind } from "./PlatformArtifactCanvas";

// The Three/R3F bundle loads client-side only, and only when we actually decide
// to render 3D (desktop + motion + WebGL). Never preloaded globally.
const PlatformArtifactCanvas = dynamic(() => import("./PlatformArtifactCanvas"), {
  ssr: false,
});

/** Catches any runtime error inside the canvas and falls back to the glow. */
class CanvasErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

interface PlatformFloatingArtifact3DProps {
  kind: PlatformArtifactKind;
  className?: string;
}

/**
 * A small, purely-decorative floating 3D accent (Athena shield or Achilles
 * spear) for the lower /platform sections. Renders a soft bronze-glow fallback
 * by default and upgrades to the live 3D object only on desktop, with motion
 * allowed and WebGL present. Any error or a too-slow GLB load reverts to the
 * glow.
 *
 * Motion (desktop, motion-allowed only): a gentle idle hover, a very slow idle
 * yaw, and a scroll-linked yaw fed from the PARENT SECTION's scroll progress
 * via GSAP/ScrollTrigger (read-only — no pin, no scrub-jack). There is no drag
 * or click interaction, and the whole element is pointer-events-none so it can
 * never block the content it sits behind. The render loop pauses offscreen.
 */
export function PlatformFloatingArtifact3D({
  kind,
  className,
}: PlatformFloatingArtifact3DProps) {
  const [mounted, setMounted] = useState(false);
  const [canUse3D, setCanUse3D] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [active, setActive] = useState(true);

  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  // Decide on the client whether to render 3D: desktop width, motion allowed,
  // and WebGL present. Re-evaluates if the width/motion conditions change.
  useEffect(() => {
    setMounted(true);
    if (typeof window.matchMedia !== "function") return;
    const webglOk = isWebGLAvailable();
    const desktopMql = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setCanUse3D(desktopMql.matches && !reduceMql.matches && webglOk);
    update();
    desktopMql.addEventListener("change", update);
    reduceMql.addEventListener("change", update);
    return () => {
      desktopMql.removeEventListener("change", update);
      reduceMql.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!canUse3D) {
      setLoaded(false);
      setErrored(false);
    }
  }, [canUse3D]);

  const show3D = mounted && canUse3D && !errored;

  // Pause the render loop whenever the artifact is scrolled out of view.
  useEffect(() => {
    if (!show3D) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [show3D]);

  // Safety net: if the GLB hasn't loaded in time, drop the canvas and keep the
  // glow so the section is never stuck waiting.
  useEffect(() => {
    if (!show3D || loaded) return;
    const id = window.setTimeout(() => setErrored(true), 12000);
    return () => window.clearTimeout(id);
  }, [show3D, loaded]);

  // Scroll-linked rotation: track the PARENT SECTION's progress (not this small,
  // absolutely-positioned wrapper, which would give poor "section progress").
  useGSAP(
    () => {
      if (!show3D) return;
      const trigger = wrapRef.current?.closest("section") ?? wrapRef.current;
      if (!trigger) return;
      const st = ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });
      return () => st.kill();
    },
    { dependencies: [show3D] },
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none relative", className)}
    >
      {/* Bronze-glow fallback — always present until the GLB cross-fades in. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out",
          show3D && loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <div
          className="aspect-square w-[70%]"
          style={{
            background:
              "radial-gradient(circle, rgba(166,106,50,0.22) 0%, rgba(122,63,29,0.1) 42%, rgba(10,9,8,0) 70%)",
          }}
        />
      </div>

      {show3D && (
        <CanvasErrorBoundary onError={() => setErrored(true)}>
          <PlatformArtifactCanvas
            kind={kind}
            active={active}
            scrollRef={scrollRef}
            onReady={() => setLoaded(true)}
          />
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
