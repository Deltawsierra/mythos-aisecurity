"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavNode } from "@/content/navigation";

interface NavDropdownProps {
  node: NavNode;
  pathname: string;
}

/**
 * Desktop navigation dropdown (Platform / Company). Opens on mouse hover, on
 * keyboard focus, and on click/tap. Closes on Escape (returning focus to the
 * trigger), outside pointerdown, and when focus leaves the group. ArrowDown on
 * the trigger opens the panel and focuses the first item. Premium dark-glass
 * panel with a bronze border, where each item shows a title + one-line
 * description.
 */
export function NavDropdown({ node, pathname }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  // True between pointerdown and click so a mouse press doesn't also trigger
  // focus-open (which would fight the click toggle).
  const pointerPressRef = useRef(false);
  const items = node.items ?? [];

  const isActive = (node.match ?? []).some(
    (m) => pathname === m || pathname === `${m}/`,
  );

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 130);
  };

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Outside pointerdown + Escape while open.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const focusInside = containerRef.current?.contains(
          document.activeElement,
        );
        setOpen(false);
        if (focusInside) triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

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
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          clearCloseTimer();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") scheduleClose();
      }}
      onFocus={() => {
        // Keyboard focus opens; a mouse press is handled by the click toggle.
        if (!pointerPressRef.current) {
          clearCloseTimer();
          setOpen(true);
        }
      }}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
          isActive ? "text-antique-gold" : "text-muted-stone hover:text-ivory",
        )}
        aria-haspopup="true"
        aria-expanded={open}
        onPointerDown={() => {
          pointerPressRef.current = true;
        }}
        onClick={() => {
          setOpen((v) => !v);
          pointerPressRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            focusFirstItem();
          }
        }}
      >
        {node.label}
        <ChevronDown
          size={12}
          strokeWidth={2}
          aria-hidden="true"
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Panel — the pt-3 bridge keeps the hover area contiguous (no gap). */}
      <div
        className={cn(
          "absolute left-0 top-full z-50 pt-3",
          open ? "block" : "hidden",
        )}
      >
        <div className="w-72 border border-bronze/30 bg-obsidian/95 p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.85),0_0_28px_-10px_rgba(166,106,50,0.4)] backdrop-blur-md">
          <ul role="list" className="flex flex-col">
            {items.map((it) => {
              const active =
                pathname === it.href || pathname === `${it.href}/`;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    data-nav-item
                    className="group block px-3 py-2.5 transition-colors duration-150 hover:bg-ivory/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                  >
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]",
                        active
                          ? "text-antique-gold"
                          : "text-ivory group-hover:text-antique-gold",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px w-2.5 shrink-0 transition-all duration-200",
                          active
                            ? "bg-antique-gold"
                            : "bg-bronze/50 group-hover:w-3.5 group-hover:bg-bronze",
                        )}
                      />
                      {it.label}
                    </span>
                    {it.description && (
                      <span className="mt-1 block pl-4 text-xs leading-snug text-muted-stone">
                        {it.description}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}
