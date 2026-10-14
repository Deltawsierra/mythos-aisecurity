"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavNode } from "@/content/navigation";

interface MegaMenuProps {
  node: NavNode;
  pathname: string;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
}

/**
 * Desktop mega menu. Opens on mouse hover, keyboard focus and click/tap; closes
 * on Escape (returning focus to the trigger), outside pointerdown, and when
 * focus leaves the group. ArrowDown on the trigger focuses the first link.
 * Open state lives in SiteHeader so only one panel is ever visible.
 *
 * Multi-column menus span the header's nav width (the <li> stays static so the
 * panel positions against the nav); single-column menus drop down from their
 * trigger.
 */
export function MegaMenu({
  node,
  pathname,
  active,
  open,
  onOpen,
  onScheduleClose,
  onClose,
}: MegaMenuProps) {
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // True between pointerdown and click so a mouse press doesn't also trigger
  // focus-open (which would fight the click toggle).
  const pointerPressRef = useRef(false);
  const columns = node.columns ?? [];
  const wide = columns.length > 1 || !!node.feature;
  const panelId = `mega-${node.label.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const focusInside = containerRef.current?.contains(document.activeElement);
        onClose();
        if (focusInside) triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const focusFirstItem = () => {
    requestAnimationFrame(() => {
      containerRef.current
        ?.querySelector<HTMLAnchorElement>("a[data-nav-item]")
        ?.focus();
    });
  };

  return (
    <li
      ref={containerRef}
      // Full nav height so the pointer never leaves the group between the
      // trigger and the panel below.
      className={cn("flex h-full items-center", !wide && "relative")}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onScheduleClose();
      }}
      onFocus={() => {
        if (!pointerPressRef.current) onOpen();
      }}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "relative inline-flex items-center gap-1 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
          active || open ? "text-antique-gold" : "text-muted-stone hover:text-ivory",
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={() => {
          pointerPressRef.current = true;
        }}
        onClick={() => {
          if (open) onClose();
          else onOpen();
          pointerPressRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            onOpen();
            focusFirstItem();
          }
        }}
      >
        {node.label}
        <ChevronDown
          size={12}
          strokeWidth={2}
          aria-hidden="true"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Panel — the pt-3 bridge keeps the hover area contiguous. */}
      <div
        id={panelId}
        className={cn(
          "absolute top-full z-50 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out",
          wide ? "inset-x-0" : "right-0 w-80",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div
          className="relative overflow-hidden border border-bronze/25 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9),0_0_36px_-14px_rgba(166,106,50,0.45)]"
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #08121c 55%, #0b1f33 100%)",
          }}
        >
          <div className="mythos-rule absolute inset-x-0 top-0" aria-hidden="true" />
          <div
            className={cn("grid gap-x-10 p-6", !wide && "p-3")}
            style={
              wide
                ? {
                    gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))${node.feature ? " 17rem" : ""}`,
                  }
                : undefined
            }
          >
            {columns.map((column) => (
              <div key={column.heading}>
                {wide && (
                  <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze">
                    {column.heading}
                  </p>
                )}
                <ul role="list" className="flex flex-col">
                  {column.items.map((item) => {
                    const current = pathname === item.href || pathname === `${item.href}/`;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          data-nav-item
                          aria-current={current ? "page" : undefined}
                          className="group block px-3 py-2.5 transition-colors duration-150 hover:bg-ivory/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                        >
                          <span
                            className={cn(
                              "flex items-center gap-2 text-[13px] font-medium",
                              current ? "text-antique-gold" : "text-ivory group-hover:text-antique-gold",
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "h-px w-2.5 shrink-0 transition-all duration-200",
                                current ? "bg-antique-gold" : "bg-bronze/50 group-hover:w-4 group-hover:bg-bronze",
                              )}
                            />
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="mt-1 block pl-[18px] text-xs leading-snug text-muted-stone">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {node.feature && (
              <Link
                href={node.feature.href}
                data-nav-item
                className="group relative flex min-h-[15rem] flex-col justify-end overflow-hidden border border-bronze/20 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={node.feature.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                    node.feature.fit === "contain"
                      ? "object-contain object-top px-8 pb-36 pt-5"
                      : "object-cover",
                  )}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      node.feature.fit === "contain"
                        ? "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(214,161,74,0.16), transparent 70%), linear-gradient(180deg, transparent 45%, rgba(5,5,5,0.9) 100%)"
                        : "linear-gradient(180deg, rgba(5,5,5,0.05) 20%, rgba(5,5,5,0.92) 100%)",
                  }}
                />
                <div className="relative">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-antique-gold">
                    {node.feature.eyebrow}
                  </p>
                  <p className="mt-1.5 font-display text-2xl leading-tight text-ivory">
                    {node.feature.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-ivory/75">
                    {node.feature.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-antique-gold">
                    Explore
                    <ArrowRight
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
