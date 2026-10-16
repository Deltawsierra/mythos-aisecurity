"use client";

import { useEffect, useRef, useState } from "react";
import { TEAM_MEDIA, CHARACTER_MEDIA } from "@/content/media";
import { HOME_TEAMS } from "@/content/home";
import { cn } from "@/lib/utils";

const LANES_X = [100, 300, 500, 700, 900];

/**
 * H07 — the five assurance teams (Launch Guide S06). One team at a time, as
 * accessible tabs: the selected lane carries light up to SPINE and, on
 * desktop with motion allowed, that team's loop plays. Team colours stay
 * inside their own lanes and cards; the surrounding world stays warm.
 */
export function AssuranceTeams() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const teams = HOME_TEAMS.teams;
  const team = teams[active];

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 1024px)");
    const update = () => setMotion(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next = active;
    if (e.key in keys) next = (active + keys[e.key] + teams.length) % teams.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = teams.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* Lanes converge on SPINE (decorative). */}
      <div aria-hidden="true" className="relative mx-auto hidden h-44 max-w-5xl lg:block">
        <svg viewBox="0 0 1000 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {teams.map((t, i) => (
            <path
              key={t.id}
              d={`M${LANES_X[i]} 176 C ${LANES_X[i]} 90, 500 120, 500 34`}
              fill="none"
              stroke={t.color}
              strokeWidth={i === active ? 3 : 1.5}
              strokeOpacity={i === active ? 1 : 0.35}
              className={cn(i === active && "team-lane-active")}
              style={i === active ? { filter: `drop-shadow(0 0 6px ${t.color})` } : undefined}
            />
          ))}
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHARACTER_MEDIA.spine.emblem}
          alt=""
          className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 drop-shadow-[0_0_18px_rgba(229,197,143,0.6)]"
        />
      </div>

      <div role="tablist" aria-label="Assurance teams" className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0" onKeyDown={onKeyDown}>
        {teams.map((t, i) => {
          const media = TEAM_MEDIA[t.id];
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`team-tab-${t.id}`}
              aria-selected={selected}
              aria-controls="team-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className="group w-[42vw] max-w-[13rem] shrink-0 snap-center text-left sm:w-[13rem] lg:w-auto lg:max-w-none"
            >
              <span
                className={cn(
                  "relative block aspect-[9/14] overflow-hidden border transition-[border-color,box-shadow,transform] duration-500",
                  selected ? "-translate-y-1" : "border-ivory/15 opacity-80 group-hover:opacity-100",
                )}
                style={selected ? { borderColor: t.color, boxShadow: `0 0 0 1px ${t.color}, 0 26px 60px -24px ${t.color}` } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.poster.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                {selected && motion && (
                  <video key={t.id} className="lc-fade absolute inset-0 h-full w-full object-cover object-top" src={media.idle} autoPlay muted loop playsInline aria-hidden="true" />
                )}
                <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(18,21,23,0.9) 100%)" }} />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media.emblem} alt="" aria-hidden="true" className="h-6 w-6" />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory">{t.name}</span>
                </span>
              </span>
              <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: selected ? t.color : undefined }}>
                <span className={cn(!selected && "text-fg-muted")}>{t.role}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="team-panel"
        role="tabpanel"
        aria-labelledby={`team-tab-${team.id}`}
        className="mt-8 grid gap-6 border-l-2 bg-panel p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-[1.2fr_1fr_1fr]"
        style={{ borderColor: team.color }}
      >
        <div key={team.id} className="lc-fade">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: team.color }}>
            {team.name} · {team.role}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug text-fg">{team.body}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Delivers</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-fg">{team.delivers}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted">Boundary</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-fg">{team.boundary}</p>
        </div>
      </div>
    </div>
  );
}
