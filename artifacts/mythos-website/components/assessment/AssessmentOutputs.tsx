"use client";

import { useState } from "react";
import {
  FileText,
  ClipboardList,
  FolderArchive,
  Network,
  ListChecks,
  ShieldCheck,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DELIVERABLES, type DeliverableIcon } from "@/data/assessmentOutputs";

const ICONS: Record<DeliverableIcon, LucideIcon> = {
  report: FileText,
  findings: ClipboardList,
  evidence: FolderArchive,
  riskmap: Network,
  backlog: ListChecks,
  retest: ShieldCheck,
};

/**
 * Premium "evidence-vault" deliverable cards. Core information (icon, title,
 * body, "Useful for") is always visible — no interaction required, including on
 * mobile. The detailed "Includes" list expands on click/tap (never hover-only).
 */
export function AssessmentOutputs() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ul
      role="list"
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {DELIVERABLES.map((d) => {
        const Icon = ICONS[d.icon];
        const isOpen = !!open[d.id];
        const panelId = `deliverable-${d.id}`;
        return (
          <li
            key={d.id}
            className="group relative flex flex-col border border-bronze/20 bg-charcoal/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-bronze/45"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent"
            />
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-bronze/30 bg-obsidian/60 text-bronze">
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-normal leading-tight text-ivory">
                {d.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-muted-stone">{d.body}</p>

            <p className="mt-4 text-xs leading-relaxed text-muted-stone/80">
              <span className="font-semibold uppercase tracking-[0.18em] text-bronze/80">
                Useful for{" "}
              </span>
              {d.usefulFor}
            </p>

            <button
              id={`${panelId}-trigger`}
              type="button"
              onClick={() => toggle(d.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="mt-5 inline-flex items-center gap-1.5 self-start text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
            >
              <Plus
                size={13}
                strokeWidth={2.25}
                aria-hidden="true"
                className={cn(
                  "transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              />
              {isOpen ? "Hide details" : "What's included"}
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "mt-4 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <ul className="flex flex-wrap gap-1.5 border-t border-bronze/15 pt-4">
                  {d.includes.map((it) => (
                    <li
                      key={it}
                      className="border border-ivory/10 bg-obsidian/40 px-2.5 py-1 text-[11px] leading-none text-muted-stone"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
