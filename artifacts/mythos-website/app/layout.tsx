import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { GA_MEASUREMENT_ID } from "@/lib/consentScripts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});



/**
 * Google Analytics 4 bootstrap with Consent Mode v2. Runs on every page load and
 * loads the gtag.js tag immediately, but every consent signal defaults to
 * "denied": GA sets no cookies and sends only cookieless, aggregated pings until
 * the visitor opts in. CookieConsent then flips the signals with
 * gtag('consent','update',...). Loading the tag up front (rather than only after
 * opt-in) is what lets Google verify the tag and gives cookieless traffic data.
 */
const GA_BOOTSTRAP_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';document.head.appendChild(s);})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mythosaisecurity.com"),
  title: {
    template: "%s | Mythos AI Security",
    default: "Mythos AI Security | AI Deployment Assurance",
  },
  description:
    "Mythos is an AI Deployment Assurance company. We validate high-risk AI workflows across data, routing, agents, controls, and evidence — and produce proof teams can use for security, compliance, and executive review.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Mythos AI Security",
    type: "website",
    images: [
      {
        url: "/assets/social/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Mythos AI Security — AI Deployment Assurance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/social/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
                {/* Google Analytics 4 (Consent Mode v2). Loads on every page with all
            consent signals denied by default; CookieConsent upgrades them on
            opt-in. See GA_BOOTSTRAP_SCRIPT above. */}
        <script dangerouslySetInnerHTML={{ __html: GA_BOOTSTRAP_SCRIPT }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-bronze focus:px-4 focus:py-2 focus:text-ivory focus:text-sm"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="pt-16 lg:pt-20" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
