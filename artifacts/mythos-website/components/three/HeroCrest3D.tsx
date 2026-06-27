"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { HeroCrestFallback } from "./HeroCrestFallback";
import { CREST_DRAG_SENSITIVITY, createCrestPointerState } from "@/lib/three";
import { useHeroPreload } from "@/components/motion/HeroPreloadProvider";

// Three/R3F bundle is loaded client-side only, and only when we actually
// decide to render 3D (desktop + motion + WebGL). Never preloaded globally.
const ThreeCanvasShell = dynamic(() => import("./ThreeCanvasShell"), {
  ssr: false,
});

/** Catches any runtime error inside the canvas and falls back to the PNG. */
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

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

interface HeroCrest3DProps {
  fallbackSrc: string;
}

/**
 * Free-floating, interactive homepage hero crest. Renders the static PNG by
 * default (SSR / no-JS safe) and upgrades to the 3D crest only on desktop, with
 * motion allowed and WebGL present. The PNG stays visible until the GLB has
 * loaded, then cross-fades. Any error or a too-slow load reverts to the PNG.
 *
 * Interaction (desktop, motion-allowed only): cursor-facing parallax, a warm
 * cursor-proximity light, and a limited click-drag inspect that eases back to
 * the composed pose. Scroll progress through the hero is fed to the scene for
 * subtle scroll-linked motion. All interaction state lives in a mutable ref so
 * it never causes React re-renders; the render loop pauses when offscreen.
 */
export function HeroCrest3D({ fallbackSrc }: HeroCrest3DProps) {
  const { shouldUse3D, timedOut, markReady, markFailed } = useHeroPreload();
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [active, setActive] = useState(true);

  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef(createCrestPointerState());
  const dragOrigin = useRef({ x: 0, y: 0, dragX: 0, dragY: 0 });
  const lastMove = useRef({ t: 0, rotX: 0, rotY: 0 });

  // Once the safety timeout has fired we stay on the PNG for the rest of this
  // page load, so a late GLB load can never re-introduce the PNG → 3D swap.
  const show3D = shouldUse3D && !errored && !timedOut;

  // Pause the render loop whenever the hero panel is scrolled out of view.
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

  // Safety net: if the (≈13MB) GLB hasn't loaded in time, drop the canvas and
  // keep the PNG so the hero is never stuck waiting.
  useEffect(() => {
    if (!show3D || loaded) return;
    const id = window.setTimeout(() => setErrored(true), 12000);
    return () => window.clearTimeout(id);
  }, [show3D, loaded]);

  // Scroll-linked motion: feed hero scroll progress into the scene via the
  // existing GSAP/ScrollTrigger system. No pin, no scrub-jack — read-only.
  useGSAP(
    () => {
      if (!show3D) return;
      const el = wrapRef.current;
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          pointerRef.current.scroll = self.progress;
        },
      });
      return () => st.kill();
    },
    { dependencies: [show3D] },
  );

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    const p = pointerRef.current;
    p.x = clamp(nx, -1, 1);
    p.y = clamp(ny, -1, 1);
    p.inside = true;
    p.proximity = Math.max(0, 1 - Math.min(1, Math.hypot(nx, ny)));

    if (p.dragging) {
      // Free, unclamped spin: rotation tracks the pointer 1:1 so the crest can
      // be turned fully around in any direction.
      const dx = (e.clientX - dragOrigin.current.x) / rect.width;
      const dy = (e.clientY - dragOrigin.current.y) / rect.height;
      p.dragY = dragOrigin.current.dragY + dx * CREST_DRAG_SENSITIVITY.y;
      p.dragX = dragOrigin.current.dragX + dy * CREST_DRAG_SENSITIVITY.x;

      // Measure angular velocity in event-time (not render-frame time) so a
      // quick flick-and-release reliably carries momentum. Smoothed + capped.
      const moveDt = Math.max((e.timeStamp - lastMove.current.t) / 1000, 1 / 240);
      p.velY = clamp(
        lerp(p.velY, (p.dragY - lastMove.current.rotY) / moveDt, 0.6),
        -50,
        50,
      );
      p.velX = clamp(
        lerp(p.velX, (p.dragX - lastMove.current.rotX) / moveDt, 0.6),
        -50,
        50,
      );
      lastMove.current = { t: e.timeStamp, rotX: p.dragX, rotY: p.dragY };
    }
  };

  const onPointerLeave = () => {
    const p = pointerRef.current;
    p.inside = false;
    p.proximity = 0;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = pointerRef.current;
    // Grabbing the crest interrupts any in-flight momentum / spring-return.
    p.dragging = true;
    p.velX = 0;
    p.velY = 0;
    dragOrigin.current = {
      x: e.clientX,
      y: e.clientY,
      dragX: p.dragX,
      dragY: p.dragY,
    };
    lastMove.current = { t: e.timeStamp, rotX: p.dragX, rotY: p.dragY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Release into momentum: dragging stops but the angular velocity measured
    // while dragging is retained so the crest coasts, slows, and returns home.
    // If the crest was held still just before release, don't fling it.
    const p = pointerRef.current;
    if (e.timeStamp - lastMove.current.t > 100) {
      p.velX = 0;
      p.velY = 0;
    }
    p.dragging = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "absolute inset-0",
        show3D && "cursor-grab active:cursor-grabbing",
      )}
      style={show3D ? { touchAction: "pan-y" } : undefined}
      onPointerMove={show3D ? onPointerMove : undefined}
      onPointerLeave={show3D ? onPointerLeave : undefined}
      onPointerDown={show3D ? onPointerDown : undefined}
      onPointerUp={show3D ? endDrag : undefined}
      onPointerCancel={show3D ? endDrag : undefined}
    >
      <HeroCrestFallback
        src={fallbackSrc}
        className={cn(
          "transition-opacity duration-500 ease-out",
          show3D && loaded ? "opacity-0" : "opacity-100",
        )}
      />
      {show3D && (
        <CanvasErrorBoundary
          onError={() => {
            setErrored(true);
            markFailed();
          }}
        >
          <ThreeCanvasShell
            active={active}
            pointer={pointerRef.current}
            onModelLoaded={() => {
              setLoaded(true);
              markReady();
            }}
          />
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
