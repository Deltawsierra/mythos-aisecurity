import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const config: NextConfig = {
    // Dev server and the static export must not share a distDir: the export
    // output lacks the dev-server manifests, which makes `next dev` 500 after a
    // build. Keep production export at dist/public (served per artifact.toml);
    // let dev use the default .next dir.
    distDir: isDev ? ".next" : "dist/public",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  };

  if (isDev) {
    // The user views the dev server through Replit's proxy (a *.replit.dev
    // host), so requests for /_next/* assets arrive with a cross-origin Origin
    // header. Next must be told to allow that exact origin or it blocks those
    // requests, which can leave the page unstyled. A literal "*" is NOT honored,
    // so read the current Replit domain(s) from the environment (re-evaluated on
    // each dev start) and add a wildcard fallback. This is a dev-only option.
    config.allowedDevOrigins = Array.from(
      new Set(
        [
          process.env.REPLIT_DEV_DOMAIN,
          ...(process.env.REPLIT_DOMAINS?.split(",") ?? []),
          "*.replit.dev",
          "*.repl.co",
        ]
          .map((origin) => origin?.trim())
          .filter((origin): origin is string => Boolean(origin)),
      ),
    );
  } else {
    // `output: "export"` is a build-time concern only. Enabling it for
    // `next dev` triggers a Next 15 dev-server bug where the App Router CSS
    // chunk (/_next/static/css/app/layout.css) intermittently 404s after a
    // recompile, leaving the page completely unstyled until `.next` is cleared.
    // Scope it to the build phase so dev stays a standard server; the production
    // build still exports a fully static site to dist/public.
    config.output = "export";
  }

  return config;
};

export default nextConfig;
