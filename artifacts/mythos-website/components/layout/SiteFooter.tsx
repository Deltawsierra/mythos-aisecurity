import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { FOOTER_NAV } from "@/content/navigation";
import { SITE_FULL_NAME } from "@/lib/constants";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ivory/5 bg-obsidian" role="contentinfo">
      {/* Subtle top glow */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(166,106,50,0.2) 30%, rgba(166,106,50,0.2) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-1">
              {/* Footer crest */}
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                aria-label="Mythos — home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/footer-logo.png"
                  alt=""
                  width={44}
                  height={44}
                  style={{ display: "block" }}
                  className="opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-ivory group-hover:text-antique-gold transition-colors duration-200">
                  Mythos
                </span>
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-stone/80">
                AI Deployment Assurance for high-risk AI systems — independent
                validation and evidence, before release and whenever they change.
              </p>
            </div>

            {/* Nav columns */}
            {Object.values(FOOTER_NAV).map((group) => (
              <div key={group.label}>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-stone/60">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-3.5" role="list">
                  {group.items.map((item) => (
                    <li key={`${group.label}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-stone hover:text-ivory transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ivory/5 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-xs text-muted-stone/50">
              &copy; {currentYear} {SITE_FULL_NAME}. All rights reserved.
            </p>
            <nav
              className="flex items-center gap-5"
              aria-label="Legal"
            >
              <Link
                href="/privacy"
                className="text-xs text-muted-stone/60 hover:text-ivory transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              >
                Privacy
              </Link>
              <CookieSettingsButton className="text-xs text-muted-stone/60 hover:text-ivory transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 cursor-pointer" />
            </nav>
          </div>
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-muted-stone/30"
            aria-hidden="true"
          >
            Evidence over assumption.
          </p>
        </div>
      </Container>
    </footer>
  );
}
