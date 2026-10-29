import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { AnalyticsBridge } from "@/components/seo/AnalyticsBridge";
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
 * loads the gtag.js tag once the page has loaded (so it never competes with the
 * hero art), but every consent signal defaults to "denied": GA sets no cookies
 * and sends only cookieless, aggregated pings until the visitor opts in.
 * CookieConsent then flips the signals with gtag('consent','update',...).
 * Loading the tag on every page (rather than only after opt-in) is what lets
 * Google verify the tag and gives cookieless traffic data; commands queued in
 * dataLayer before it arrives are replayed.
 */
const GA_BOOTSTRAP_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');function l(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';document.head.appendChild(s);}if(document.readyState==='complete')l();else window.addEventListener('load',l,{once:true});})();`;

/**
 * Organization + WebSite structured data (Launch Guide §17). Only verifiable
 * facts: no address, social profiles or ratings; founders as the owner named them.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.mythosaisecurity.com/#organization",
      name: "Mythos AI Security",
      alternateName: "Mythos",
      url: "https://www.mythosaisecurity.com/",
      logo: "https://www.mythosaisecurity.com/assets/brand/crest-512.png",
      email: "info@mythosaisecurity.com",
      founder: [
        { "@type": "Person", name: "Brendan Flanigan", jobTitle: "Co-founder and Chief Executive Officer" },
        { "@type": "Person", name: "David Smith", jobTitle: "Co-founder and Chief Operations Officer" },
      ],
      description: "AI deployment assurance: mapping, testing and evidence for AI systems with real access and authority.",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mythosaisecurity.com/#website",
      url: "https://www.mythosaisecurity.com/",
      name: "Mythos AI Security",
      publisher: { "@id": "https://www.mythosaisecurity.com/#organization" },
      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mythosaisecurity.com"),
  title: {
    template: "%s | Mythos AI Security",
    default: "Mythos AI Security | AI Deployment Assurance",
  },
  description:
    "Mythos AI Security maps what AI systems can reach, tests what they do under pressure and keeps signed evidence current as they change.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Mythos AI Security",
    type: "website",
    images: [
      {
        url: "/assets/social/pages/home.jpg",
        width: 1200,
        height: 630,
        alt: "Human Ambition Deserves a Stronger Guardian — Mythos AI Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/social/pages/home.jpg"],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory focus:text-sm focus:ring-2 focus:ring-antique-gold"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="pt-16 lg:pt-20" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
        <AnalyticsBridge />
      </body>
    </html>
  );
}
