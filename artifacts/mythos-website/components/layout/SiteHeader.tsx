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

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menu = useMenuState();

  useGSAP(
    () => {
      const el = navRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = !!ctx.conditions?.reduced;
          gsap.from(el, {
            autoAlpha: 0,
            y: reduced ? 0 : -14,
            duration: reduced ? 0.4 : 0.7,
            ease: "power3.out",
            clearProps: "transform",
          });
        },
      );
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
    setOpenGroups(
      PRIMARY_NAV.filter((n) => n.columns && isNodeActive(pathname, n)).map(
        (n) => n.label,
      ),
    );
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleGroup = (label: string) =>
    setOpenGroups((groups) =>
      groups.includes(label) ? groups.filter((g) => g !== label) : [...groups, label],
    );

  const elevated = scrolled || menu.openLabel !== null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-300",
          elevated ? "backdrop-blur-xl" : "backdrop-blur-md",
        )}
        style={{
          background: elevated
            ? "linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(8,18,28,0.94) 60%, rgba(11,31,51,0.94) 100%)"
            : "linear-gradient(90deg, rgba(5,5,5,0.72) 0%, rgba(8,18,28,0.62) 60%, rgba(11,31,51,0.55) 100%)",
        }}
        role="banner"
      >
        <div
          className={cn(
            "mythos-rule absolute inset-x-0 bottom-0 transition-opacity duration-300",
            elevated ? "opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        />
        <Container>
          <nav
            ref={navRef}
            className="relative flex h-16 items-center justify-between gap-6 lg:h-20"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              aria-label="Mythos — home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-icon-small.png"
                alt=""
                width={30}
                height={30}
                className="block h-7 w-7 shrink-0 opacity-90 transition-opacity duration-200 group-hover:opacity-100 lg:h-[30px] lg:w-[30px]"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap text-[13px] font-semibold uppercase leading-none tracking-[0.22em] text-ivory transition-colors duration-200 group-hover:text-antique-gold sm:text-sm">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul
              className="hidden h-full items-stretch gap-7 lg:flex xl:gap-9"
              role="list"
              aria-label="Site sections"
            >
              {PRIMARY_NAV.map((node) => {
                const active = isNodeActive(pathname, node);
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
                        "py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                        active ? "text-antique-gold" : "text-muted-stone hover:text-ivory",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {node.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button
                href={CTA_LINKS.demo}
                variant="ghost"
                size="sm"
                className="hidden xl:inline-flex"
                onClick={() => {
                  track("cta_request_demo", { location: "header" });
                  announceIntent("demo");
                }}
              >
                {CTA.DEMO}
              </Button>
              <Button
                href={CTA_LINKS.assessment}
                variant="primary"
                size="sm"
                className="bronze-glow"
                onClick={() => track("cta_request_assessment", { location: "header" })}
              >
                {CTA.PRIMARY}
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-muted-stone transition-colors duration-150 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </Container>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-obsidian/75 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            "absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-l border-bronze/15 transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          style={{ background: "linear-gradient(180deg, #050505 0%, #08121c 55%, #0b1f33 100%)" }}
        >
          <div className="flex h-16 items-center justify-between border-b border-ivory/5 px-6">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-icon-small.png"
                alt=""
                width={22}
                height={22}
                style={{ display: "block" }}
                className="opacity-80"
                aria-hidden="true"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-stone/70">
                Navigation
              </span>
            </div>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-muted-stone transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto p-6" aria-label="Mobile navigation">
            <ul className="flex flex-col" role="list">
              <li className="border-b border-ivory/5">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                    pathname === "/" ? "text-antique-gold" : "text-muted-stone hover:text-ivory",
                  )}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              {PRIMARY_NAV.map((node) => {
                const groupActive = isNodeActive(pathname, node);
                if (!node.columns) {
                  return (
                    <li key={node.label} className="border-b border-ivory/5">
                      <Link
                        href={node.href ?? "/"}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                          groupActive ? "text-antique-gold" : "text-muted-stone hover:text-ivory",
                        )}
                        aria-current={groupActive ? "page" : undefined}
                      >
                        {node.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = openGroups.includes(node.label);
                return (
                  <li key={node.label} className="border-b border-ivory/5">
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                        groupActive ? "text-antique-gold" : "text-muted-stone hover:text-ivory",
                      )}
                      aria-expanded={isOpen}
                      onClick={() => toggleGroup(node.label)}
                    >
                      {node.label}
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>
                    {isOpen && (
                      <div className="mb-3 ml-1 border-l border-bronze/25 pl-4">
                        {node.columns.map((column) => (
                          <div key={column.heading} className="mb-2">
                            {node.columns!.length > 1 && (
                              <p className="pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze-bright">
                                {column.heading}
                              </p>
                            )}
                            <ul role="list" className="flex flex-col">
                              {column.items.map((it) => {
                                const active = pathname === it.href || pathname === `${it.href}/`;
                                return (
                                  <li key={it.href}>
                                    <Link
                                      href={it.href}
                                      onClick={() => setMobileOpen(false)}
                                      className={cn(
                                        "block py-2 text-[13px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                                        active ? "text-antique-gold" : "text-ivory/80 hover:text-ivory",
                                      )}
                                      aria-current={active ? "page" : undefined}
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
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-col gap-3 border-t border-ivory/5 pt-6">
              <Button
                href={CTA_LINKS.assessment}
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => track("cta_request_assessment", { location: "mobile_nav" })}
              >
                {CTA.PRIMARY}
              </Button>
              <Button
                href={CTA_LINKS.demo}
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  track("cta_request_demo", { location: "mobile_nav" });
                  announceIntent("demo");
                }}
              >
                {CTA.DEMO}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
