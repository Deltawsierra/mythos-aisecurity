"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

/** Same crest art as the hero, so the reveal into the 3D crest is seamless. */
const CREST_SRC = "/images/mythos-crest-main.png";
const FADE_MS = 700;

interface BlackVaultPreloaderProps {
  /** When true, the overlay fades out. */
  exiting: boolean;
  /** Fired once the fade-out has completed and the overlay can unmount. */
  onExited: () => void;
}

/** Faint concentric bronze rings (outermost → innermost). */
const RINGS = [98, 80, 62, 46] as const;

/**
 * "Opening the Black Vault" — a cinematic obsidian preloader shown only on the
 * desktop 3D path while the crest GLB streams in. Pure CSS/transform animation
 * (no canvas/WebGL): rotating ticked interface rings, faint concentric bronze
 * rings, a softly pulsing center crest, and a bronze loading indicator.
 *
 * Rendered opaque from the very first (pre-hydration) frame so it covers the
 * hero with no PNG flash; it only animates on the way out (when `exiting`),
 * then reports completion via `onExited`.
 *
 * Decorative + non-interactive: no focusable elements (never traps focus), and
 * the underlying homepage stays in the DOM behind it.
 */
export function BlackVaultPreloader({
  exiting,
  onExited,
}: BlackVaultPreloaderProps) {
  // Once exiting, finish after the fade-out transition (timer-backed).
  useEffect(() => {
    if (!exiting) return;
    const id = window.setTimeout(onExited, FADE_MS);
    return () => window.clearTimeout(id);
  }, [exiting, onExited]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Opening the vault. Initializing secure validation chamber."
      className={cn(
        "vault-overlay fixed inset-0 z-[120] flex items-center justify-center overflow-hidden",
        "transition-opacity ease-out",
        exiting ? "opacity-0" : "opacity-100",
      )}
      style={{
        transitionDuration: `${FADE_MS}ms`,
        background:
          "radial-gradient(ellipse 65% 60% at 50% 44%, #15110c 0%, #0b0907 46%, #050505 82%)",
      }}
    >
      {/* Atmospheric haze + warm seam glow. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 38% at 50% 42%, rgba(166,106,50,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% 118%, rgba(122,63,29,0.20), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* ── Vault assembly ─────────────────────────────── */}
        <div
          className="relative"
          style={{ width: "min(62vmin, 420px)", aspectRatio: "1" }}
        >
          {/* Rotating ticked outer interface ring. */}
          <div
            className="vault-spin-slow absolute inset-0 rounded-full"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(166,106,50,0.55) 0deg 0.5deg, transparent 0.5deg 5deg)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 47.5%, #000 48.5%, #000 50%, transparent 50.5%)",
              maskImage:
                "radial-gradient(circle, transparent 47.5%, #000 48.5%, #000 50%, transparent 50.5%)",
            }}
          />

          {/* Faint concentric bronze rings. */}
          {RINGS.map((pct, i) => (
            <div
              key={pct}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${pct}%`,
                aspectRatio: "1",
                border: `1px solid rgba(166, 106, 50, ${0.24 - i * 0.045})`,
              }}
            />
          ))}

          {/* Counter-rotating inner ticked ring. */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: "70%", aspectRatio: "1" }}
          >
            <div
              className="vault-spin-med-rev absolute inset-0 rounded-full"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, rgba(166,106,50,0.42) 0deg 0.8deg, transparent 0.8deg 9deg)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 45.5%, #000 47%, #000 50%, transparent 51%)",
                maskImage:
                  "radial-gradient(circle, transparent 45.5%, #000 47%, #000 50%, transparent 51%)",
              }}
            />
          </div>

          {/* Center crest + soft glow pulse. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="vault-glow-pulse absolute rounded-full"
              style={{
                width: "40%",
                aspectRatio: "1",
                background:
                  "radial-gradient(circle, rgba(214,161,74,0.5) 0%, rgba(166,106,50,0.14) 52%, transparent 72%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CREST_SRC}
              alt=""
              width={150}
              height={150}
              className="relative"
              style={{
                filter:
                  "drop-shadow(0 0 26px rgba(166,106,50,0.5)) drop-shadow(0 0 8px rgba(166,106,50,0.3))",
              }}
            />
          </div>
        </div>

        {/* ── Loader copy + indicator ────────────────────── */}
        <div className="mt-9 flex flex-col items-center text-center">
          <p className="font-display text-2xl uppercase tracking-[0.16em] text-ivory sm:text-3xl">
            Opening the Vault.
          </p>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-stone sm:text-xs">
            Initializing secure validation chamber.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span
              className="h-px w-14 sm:w-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(166,106,50,0.6))",
              }}
            />
            <div
              className="vault-progress-track h-px w-28 sm:w-40"
              style={{ background: "rgba(166,106,50,0.18)" }}
            />
            <span
              className="h-px w-14 sm:w-20"
              style={{
                background:
                  "linear-gradient(270deg, transparent, rgba(166,106,50,0.6))",
              }}
            />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.42em] text-bronze/70">
            Mythos
          </p>
        </div>
      </div>
    </div>
  );
}
