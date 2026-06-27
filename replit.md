# Mythos AI Security Website

A multi-page cinematic enterprise website for Mythos AI Security — an AI validation platform for high-stakes organizations. The site is built to convert qualified clients toward platform subscription while attracting investors and strategic partners.

## Run & Operate

- `pnpm --filter @workspace/mythos-website run dev` — run the Mythos website dev server (port 18497, preview at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, at `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Frontend**: Next.js 15 App Router, React 19, Tailwind CSS v4, DM Serif Display + Inter fonts
- **API**: Express 5 (artifacts/api-server)
- **DB**: PostgreSQL + Drizzle ORM (not provisioned yet — not needed for Phase 0)
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/mythos-website/` — Next.js App Router frontend
  - `app/` — Route pages and root layout
  - `components/layout/` — SiteHeader, SiteFooter
  - `components/ui/` — Button, Container, Section
  - `components/sections/` — PlaceholderPageHero (Phase 0)
  - `components/three/README.md` — Rules for future 3D/WebGL components
  - `lib/utils.ts` — cn() helper (clsx + tailwind-merge)
  - `lib/constants.ts` — Site name, CTA strings, product names
  - `content/navigation.ts` — Nav items, footer nav groups
  - `content/site.ts` — Per-page SEO metadata and hero copy
  - `app/globals.css` — Mythos brand tokens (Tailwind v4 @theme)
- `artifacts/api-server/` — Express 5 API backend
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)

## Architecture decisions

- **Next.js App Router over Vite React**: The user's spec explicitly requires Next.js App Router for SSG metadata, per-page SEO, and future server components.
- **Tailwind v4 via PostCSS**: Uses `@tailwindcss/postcss` with `@theme` blocks in CSS — no `tailwind.config.ts` needed. Brand tokens defined as CSS custom properties accessible everywhere.
- **Static export (`output: "export"`)**: Enables zero-server deployment for the marketing site. Each route generates its own `index.html` under `dist/public/`.
- **`@/*` path alias maps to project root** (not `src/`): Next.js App Router convention — `@/app/`, `@/components/`, `@/lib/`.
- **Font variables via `next/font/google`**: Inter (`--font-inter`) and DM Serif Display (`--font-dm-serif`) injected as CSS variables on `<html>`, consumed by Tailwind theme tokens.

## Product

Mythos is an AI security validation platform. The site presents:
- **Athena** — validates systems
- **Achilles** — validates AI workflows
- **Together** — two engines, one assurance loop

## Current Build Phase

**Phase 0 (complete)**: Foundation only — routing shell, design tokens, placeholder heroes on all 7 pages, sticky header with mobile nav, footer.

**Phase 1 (next)**: Cinematic homepage design — visuals, copy, sections.

**Future phases**: Platform page depth, Solutions use cases, Demo request form, 3D/WebGL cinematic scenes, GSAP scroll animations.

## User preferences

- Do not add fake claims, fake client logos, fake metrics, or fabricated testimonials
- All primary copy and CTAs must remain accessible DOM/HTML text — never inside canvas
- Use "Mythos" most of the time; "Mythos AI Security" for SEO, first mention on important pages, footer/legal
- Do not publicly display fundraising amounts, runway, or use of funds
- Investor CTAs: "Request Investor Deck", "Investor Overview", "Partner With Mythos"
- Avoid generic cyber blue as brand palette — use Obsidian/Bronze/Gold/Ivory system

## Gotchas

- Always run `pnpm --filter @workspace/mythos-website install` after changing `package.json`
- After each OpenAPI spec change, run codegen before touching frontend hooks
- `@/*` resolves to `artifacts/mythos-website/` root — not `src/`
- Next.js auto-modifies `tsconfig.json` on first `dev` — this is expected; the additions are safe
- 3D components must be lazy-loaded with `dynamic(..., { ssr: false })` — see `components/three/README.md`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Brand color reference: Obsidian `#050505`, Graphite `#12100E`, Bronze `#A66A32`, Antique Gold `#D6A14A`, Ivory `#F3E8D0`, Ember `#FF9D3B`
