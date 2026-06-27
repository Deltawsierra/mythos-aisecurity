import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/consent/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

/**
 * Pre-paint guard for the "Opening the Black Vault" loader. Runs synchronously
 * before the body paints: on non-3D environments (mobile / tablet < 1024px,
 * reduced-motion, or no-WebGL) it tags <html> with `vault-skip` so CSS hides
 * the loader and those visitors see the hero immediately — with no flash. On
 * the desktop 3D path it does nothing, so the loader (rendered in the initial
 * HTML) covers the hero from the very first frame. Must mirror the detection in
 * HeroPreloadProvider / lib/three.ts.
 */
const VAULT_PREPAINT_SCRIPT = `(function(){try{var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var d=window.innerWidth>=1024;var g=false;try{var c=document.createElement('canvas');g=!!(c.getContext('webgl2')||c.getContext('webgl')||c.getContext('experimental-webgl'));}catch(e){}if(!(d&&!m&&g)){document.documentElement.classList.add('vault-skip');}}catch(e){document.documentElement.classList.add('vault-skip');}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://mythosaisecurity.com"),
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
        url: "/opengraph.jpg",
        width: 1280,
        height: 720,
        alt: "Mythos AI Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
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
      className={`${inter.variable} ${dmSerifDisplay.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {/* Pre-paint guard: runs before the rest of <body> paints, so the vault
            loader never flashes for non-3D visitors. */}
        <script dangerouslySetInnerHTML={{ __html: VAULT_PREPAINT_SCRIPT }} />
        <noscript>
          {/* No JS → never trap the hero behind a loader that can't dismiss. */}
          <style>{`.vault-overlay{display:none !important}`}</style>
        </noscript>
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
