import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { FOOTER_NAV } from "@/content/navigation";
import { CANONICAL } from "@/content/platform";
import { SITE_FULL_NAME } from "@/lib/constants";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      role="contentinfo"
      style={{ background: "linear-gradient(180deg, #0b1f33 0%, #08121c 38%, #050505 100%)" }}
    >
      {/* Stone texture, barely there, so the footer reads as the ground the
          site stands on rather than a flat bar. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] mix-blend-luminosity"
        style={{ backgroundImage: "url(/assets/textures/footer-stone.webp)" }}
      />
      <div className="mythos-rule relative" aria-hidden="true" />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-20">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="group mb-5 inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              aria-label="Mythos — home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/footer-logo.png"
                alt=""
                width={44}
                height={44}
                style={{ display: "block" }}
                className="opacity-85 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-ivory transition-colors duration-200 group-hover:text-antique-gold">
                Mythos
              </span>
            </Link>
            <p className="max-w-xs font-display text-lg leading-snug text-ivory/90">
              {CANONICAL.category} for AI systems with real data, real authority
              and real consequences.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-stone">
              {CANONICAL.decisionAuthority}
            </p>
          </div>

          {FOOTER_NAV.map((group) => (
            <div key={group.label}>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-bronze">
                {group.label}
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {group.items.map((item) => (
                  <li key={`${group.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-stone transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-xs text-muted-stone/60">
              &copy; {currentYear} {SITE_FULL_NAME}. All rights reserved.
            </p>
            <nav className="flex items-center gap-5" aria-label="Legal">
              <Link
                href="/privacy"
                className="text-xs text-muted-stone/70 transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              >
                Privacy
              </Link>
              <CookieSettingsButton className="cursor-pointer text-xs text-muted-stone/70 transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60" />
            </nav>
          </div>
          <p className="font-display text-sm italic text-antique-gold/70">
            {CANONICAL.evidencePhilosophy}
          </p>
        </div>
      </Container>
    </footer>
  );
}
