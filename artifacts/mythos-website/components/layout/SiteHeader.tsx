"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { PRIMARY_NAV } from "@/content/navigation";
import { CTA, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";

const CTA_HREF = "/contact";

function isNodeActive(pathname: string, match?: string[]): boolean {
  return (match ?? []).some((m) => pathname === m || pathname === `${m}/`);
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Auto-expand the mobile accordion group that contains the active route.
  useEffect(() => {
    const active = PRIMARY_NAV.filter(
      (n) => n.items && isNodeActive(pathname, n.match),
    ).map((n) => n.label);
    setOpenGroups(active);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleGroup = (label: string) =>
    setOpenGroups((groups) =>
      groups.includes(label)
        ? groups.filter((g) => g !== label)
        : [...groups, label],
    );

  return (
    <>
      {/* ── Primary header ─────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-ivory/8 bg-obsidian/96 backdrop-blur-md"
            : "border-transparent bg-obsidian/75 backdrop-blur-sm",
        )}
        role="banner"
      >
        <Container>
          <nav
            ref={navRef}
            className="flex h-16 items-center justify-between lg:h-20"
            aria-label="Main navigation"
          >
            {/* Wordmark + crest icon */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              aria-label="Mythos — home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-icon-small.png"
                alt=""
                width={30}
                height={30}
                className="block h-7 w-7 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity duration-200 lg:h-[30px] lg:w-[30px]"
                aria-hidden="true"
              />
              <span className="text-[13px] font-semibold uppercase leading-none tracking-[0.22em] text-ivory whitespace-nowrap group-hover:text-antique-gold transition-colors duration-200 sm:text-sm">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul
              className="hidden items-center gap-8 lg:flex"
              role="list"
              aria-label="Site pages"
            >
              {PRIMARY_NAV.map((node) =>
                node.items ? (
                  <NavDropdown
                    key={node.label}
                    node={node}
                    pathname={pathname}
                  />
                ) : (
                  <li key={node.label}>
                    <Link
                      href={node.href ?? "/"}
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                        pathname === node.href || pathname === `${node.href}/`
                          ? "text-antique-gold"
                          : "text-muted-stone hover:text-ivory",
                      )}
                      aria-current={
                        pathname === node.href || pathname === `${node.href}/`
                          ? "page"
                          : undefined
                      }
                    >
                      {node.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                href={CTA_HREF}
                variant="primary"
                size="sm"
                className="bronze-glow"
              >
                {CTA.PRIMARY}
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-muted-stone hover:text-ivory transition-colors duration-150 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
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
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
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
            "absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-charcoal border-l border-ivory/5 transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Drawer header */}
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
              className="flex h-8 w-8 items-center justify-center text-muted-stone hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col overflow-y-auto p-6"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col" role="list">
              {PRIMARY_NAV.map((node) => {
                if (!node.items) {
                  const active =
                    pathname === node.href || pathname === `${node.href}/`;
                  return (
                    <li key={node.label} className="border-b border-ivory/5">
                      <Link
                        href={node.href ?? "/"}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                          active
                            ? "text-antique-gold"
                            : "text-muted-stone hover:text-ivory",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {node.label}
                      </Link>
                    </li>
                  );
                }

                const groupActive = isNodeActive(pathname, node.match);
                const isOpen = openGroups.includes(node.label);
                return (
                  <li key={node.label} className="border-b border-ivory/5">
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                        groupActive
                          ? "text-antique-gold"
                          : "text-muted-stone hover:text-ivory",
                      )}
                      aria-expanded={isOpen}
                      onClick={() => toggleGroup(node.label)}
                    >
                      {node.label}
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={cn(
                          "transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <ul
                        role="list"
                        className="mb-3 ml-1 flex flex-col border-l border-bronze/25 pl-4"
                      >
                        {node.items.map((it) => {
                          const active =
                            pathname === it.href || pathname === `${it.href}/`;
                          return (
                            <li key={it.href}>
                              <Link
                                href={it.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  "block py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60",
                                  active
                                    ? "text-antique-gold"
                                    : "text-muted-stone hover:text-ivory",
                                )}
                                aria-current={active ? "page" : undefined}
                              >
                                {it.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-ivory/5 pt-6">
              <Button
                href={CTA_HREF}
                variant="primary"
                size="md"
                className="w-full justify-center"
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
