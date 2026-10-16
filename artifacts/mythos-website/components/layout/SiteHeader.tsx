"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { CTA_LINKS, PRIMARY_NAV, type NavNode } from "@/content/navigation";
import { CTA, SITE_NAME } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { announceIntent } from "@/lib/intent";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";

function matchesPath(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function isNodeActive(pathname: string, node: NavNode): boolean {
  return (node.match ?? []).some((m) => matchesPath(pathname, m));
}

/** The most specific menu wins, so /platform/athena marks Products, not Platform. */
function activeNodeLabel(pathname: string): string | null {
  let best: { label: string; length: number } | null = null;
  for (const node of PRIMARY_NAV) {
    for (const m of node.match ?? []) {
      if (matchesPath(pathname, m) && (!best || m.length > best.length)) best = { label: node.label, length: m.length };
    }
  }
  return best?.label ?? null;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const UTILITY_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Trust & Security", href: "/trust" },
  { label: "Contact", href: "/contact" },
];

/** One open mega menu at a time, with a short grace period on mouse-out. */
function useMenuState() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const cancel = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const open = useCallback((label: string) => {
    cancel();
    setOpenLabel(label);
  }, []);

  const close = useCallback(() => {
    cancel();
    setOpenLabel(null);
  }, []);

  const scheduleClose = useCallback((label: string) => {
    cancel();
    timer.current = window.setTimeout(() => {
      setOpenLabel((current) => (current === label ? null : current));
    }, 140);
  }, []);

  useEffect(() => cancel, []);
  return { openLabel, open, close, scheduleClose };
}

/**
 * Global header (Launch Guide: Group 08/09 behaviour on the repo's own nav
 * data). Transparent over the hero, charcoal once the page scrolls. The
 * mobile drawer is a modal dialog: focus moves in and is trapped, Escape and
 * the backdrop close it, focus returns to the toggle, and while closed it is
 * `inert` so none of its links can be reached.
 */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const menu = useMenuState();
  const activeLabel = activeNodeLabel(pathname);

  useGSAP(
    () => {
      const el = navRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, { autoAlpha: 0, y: -12, duration: 0.7, ease: "power3.out", clearProps: "transform" });
      });
      return () => mm.revert();
    },
    { scope: navRef },
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = menu.close;
  useEffect(() => {
    setMobileOpen(false);
    closeMenu();
  }, [pathname, closeMenu]);

  // Auto-expand the mobile accordion group that contains the active route.
  useEffect(() => {
    setOpenGroups(activeLabel ? [activeLabel] : []);
  }, [activeLabel]);

  // Drawer: scroll lock, focus in on open, focus back to the toggle on close.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) closeRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = mobileOpen;
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Drawer: Escape closes; Tab cycles inside; widening to desktop closes.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.closest("[hidden]"),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onWide = () => desktop.matches && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWide);
    };
  }, [mobileOpen]);

  const toggleGroup = (label: string) =>
    setOpenGroups((groups) => (groups.includes(label) ? groups.filter((g) => g !== label) : [...groups, label]));

  const elevated = scrolled || menu.openLabel !== null;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300",
          elevated && "backdrop-blur-xl",
        )}
        style={{
          background: elevated
            ? "rgba(22,26,28,0.92)"
            : "linear-gradient(180deg, rgba(18,21,23,0.78) 0%, rgba(18,21,23,0.35) 65%, rgba(18,21,23,0) 100%)",
          boxShadow: elevated ? "0 18px 40px -30px rgba(0,0,0,0.9)" : "none",
        }}
        role="banner"
      >
        <div
          className={cn("mythos-rule absolute inset-x-0 bottom-0 transition-opacity duration-300", elevated ? "opacity-100" : "opacity-0")}
          aria-hidden="true"
        />
        <Container>
          <nav ref={navRef} className="relative flex h-16 items-center justify-between gap-6 lg:h-20" aria-label="Main navigation">
            <Link href="/" className="group flex items-center gap-2.5" aria-label="Mythos — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-icon-small.png"
                alt=""
                width={32}
                height={32}
                className="block h-8 w-8 shrink-0 opacity-95 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap font-display text-xl font-medium uppercase leading-none tracking-[0.2em] text-ivory transition-colors duration-200 group-hover:text-champagne">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden h-full items-stretch gap-8 lg:flex xl:gap-10" role="list" aria-label="Site sections">
              {PRIMARY_NAV.map((node) => {
                const active = activeLabel === node.label;
                if (node.columns) {
                  return (
                    <MegaMenu
                      key={node.label}
                      node={node}
                      pathname={pathname}
                      active={active}
                      open={menu.openLabel === node.label}
                      onOpen={() => menu.open(node.label)}
                      onScheduleClose={() => menu.scheduleClose(node.label)}
                      onClose={menu.close}
                    />
                  );
                }
                return (
                  <li key={node.label} className="flex h-full items-center">
                    <Link
                      href={node.href ?? "/"}
                      onPointerEnter={menu.close}
                      className={cn(
                        "py-2 text-[13px] font-medium tracking-[0.02em] transition-colors duration-200",
                        active ? "text-champagne" : "text-ivory/85 hover:text-ivory",
                      )}
                      aria-current={isNodeActive(pathname, node) ? "page" : undefined}
                    >
                      {node.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center lg:flex">
              <Button
                href={CTA_LINKS.demo}
                variant="primary"
                size="sm"
                arrow
                onClick={() => {
                  track("cta_request_demo", { location: "header" });
                  announceIntent("demo");
                }}
              >
                {CTA.DEMO}
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory/85 transition-colors duration-150 hover:text-ivory lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </nav>
        </Container>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        inert={!mobileOpen}
      >
        <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden="true" />

        <div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          className={cn(
            "absolute right-0 top-0 flex h-full w-[22rem] max-w-[88vw] flex-col border-l border-bronze/25 shadow-[-30px_0_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out motion-reduce:transition-none",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          style={{ background: "linear-gradient(180deg, #161a1c 0%, #1b1f22 60%, #221f1b 100%)" }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ivory/10 px-5">
            <p id="mobile-nav-title" className="flex items-center gap-2.5 font-display text-lg uppercase tracking-[0.2em] text-ivory">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-icon-small.png" alt="" width={26} height={26} className="block" aria-hidden="true" />
              Menu
            </p>
            <button
              ref={closeRef}
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:text-ivory"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-6 pt-2" aria-label="Mobile navigation">
            <ul className="flex flex-col" role="list">
              <li className="border-b border-ivory/10">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center text-[15px] font-medium",
                    pathname === "/" ? "text-champagne" : "text-ivory/90 hover:text-ivory",
                  )}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              {PRIMARY_NAV.map((node) => {
                const groupActive = activeLabel === node.label;
                if (!node.columns) {
                  return (
                    <li key={node.label} className="border-b border-ivory/10">
                      <Link
                        href={node.href ?? "/"}
                        onClick={() => setMobileOpen(false)}
                        className={cn("flex min-h-12 items-center text-[15px] font-medium", groupActive ? "text-champagne" : "text-ivory/90 hover:text-ivory")}
                      >
                        {node.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = openGroups.includes(node.label);
                const groupId = `mobile-group-${node.label.toLowerCase()}`;
                return (
                  <li key={node.label} className="border-b border-ivory/10">
                    <button
                      type="button"
                      className={cn(
                        "flex min-h-12 w-full items-center justify-between text-[15px] font-medium",
                        groupActive ? "text-champagne" : "text-ivory/90 hover:text-ivory",
                      )}
                      aria-expanded={isOpen}
                      aria-controls={groupId}
                      onClick={() => toggleGroup(node.label)}
                    >
                      {node.label}
                      <ChevronDown size={18} aria-hidden="true" className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
                    </button>
                    <div id={groupId} hidden={!isOpen} className="mb-3 ml-1 border-l border-bronze/35 pl-4">
                      {node.columns.map((column) => (
                        <div key={column.heading} className="mb-1">
                          {node.columns!.length > 1 && (
                            <p className="pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne/80">{column.heading}</p>
                          )}
                          <ul role="list" className="flex flex-col">
                            {column.items.map((it) => {
                              const current = pathname === it.href || pathname === `${it.href}/`;
                              return (
                                <li key={it.href}>
                                  <Link
                                    href={it.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn("flex min-h-11 items-center text-sm", current ? "text-champagne" : "text-ivory/80 hover:text-ivory")}
                                    aria-current={current ? "page" : undefined}
                                  >
                                    {it.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-x-5" role="list" aria-label="More">
              {UTILITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-11 items-center text-sm text-muted-stone hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Button
                href={CTA_LINKS.demo}
                variant="primary"
                size="md"
                arrow
                className="w-full"
                onClick={() => {
                  track("cta_request_demo", { location: "mobile_nav" });
                  announceIntent("demo");
                }}
              >
                {CTA.DEMO}
              </Button>
              <Button
                href={CTA_LINKS.assessment}
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => track("cta_request_assessment", { location: "mobile_nav" })}
              >
                {CTA.PRIMARY}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
