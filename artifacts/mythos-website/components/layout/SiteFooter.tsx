import Link from "next/link";
import { IntentLink } from "@/components/ui/IntentLink";
import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { FOOTER_NAV } from "@/content/navigation";
import { CANONICAL } from "@/content/platform";
import { SITE_FULL_NAME } from "@/lib/constants";

/**
 * The stable ground the world stands on (Launch Guide: footer clusters
 * Platform, Products, Industries, Resources, Company, Commercial, plus
 * trust and legal). Charcoal stone with a single bronze rule; no motion.
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-surface="charcoal"
      className="relative overflow-hidden"
      role="contentinfo"
      style={{ background: "linear-gradient(180deg, #1a1d1f 0%, #161a1c 45%, #121517 100%)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-luminosity"
        style={{ backgroundImage: "url(/assets/textures/footer-stone.webp)" }}
      />
      <div className="mythos-rule relative" aria-hidden="true" />

      <Container className="relative">
        <div className="flex flex-col gap-8 border-b border-ivory/10 py-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Link href="/" className="group mb-5 inline-flex items-center gap-3" aria-label="Mythos — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand/crest-flat.webp"
                loading="lazy"
                alt=""
                width={48}
                height={48}
                style={{ display: "block" }}
                className="opacity-90 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="font-display text-2xl font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-200 group-hover:text-champagne">
                Mythos
              </span>
            </Link>
            <p className="font-display text-xl leading-snug text-ivory/90">
              {CANONICAL.category} for AI systems with real data, real authority and real consequences.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-muted lg:text-right">{CANONICAL.decisionAuthority}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-6">
          {FOOTER_NAV.map((group) => (
            <div key={group.label}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne/85">{group.label}</p>
              <ul className="flex flex-col gap-1" role="list">
                {group.items.map((item) => (
                  <li key={`${group.label}-${item.href}`}>
                    <IntentLink
                      href={item.href}
                      className="inline-flex min-h-8 items-center text-sm text-fg-muted transition-colors duration-200 hover:text-ivory"
                    >
                      {item.label}
                    </IntentLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-xs text-fg-muted">
              &copy; {currentYear} {SITE_FULL_NAME}. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Trust and legal">
              <IntentLink href="/trust" className="text-xs text-fg-muted transition-colors duration-200 hover:text-ivory">
                Trust & Security
              </IntentLink>
              <IntentLink href="/privacy" className="text-xs text-fg-muted transition-colors duration-200 hover:text-ivory">
                Privacy
              </IntentLink>
              <CookieSettingsButton className="cursor-pointer text-xs text-fg-muted transition-colors duration-200 hover:text-ivory" />
            </nav>
          </div>
          <p className="font-display text-base italic text-champagne/80">{CANONICAL.evidencePhilosophy}</p>
        </div>
      </Container>
    </footer>
  );
}
