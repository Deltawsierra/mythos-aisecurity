# Mythos AI Security — Launch Readiness & Deployment Runbook

**App:** `artifacts/mythos-website` (Next.js 15 **static export**) + `artifacts/api-server`
(Express 5 — powers the contact & careers forms via Resend email).
**Canonical domain:** `mythosaisecurity.com` (see §7 for the apex vs. www issue).
**Status:** Code is **ready to ship.** The remaining work is hosting/DNS configuration, not code
defects.
**Last updated:** June 27, 2026.

> Scope note: this file is kept honest with the current codebase. The site includes the
> **`/trust` Trust & Security** page (newest), the `/pricing` page, and Google Analytics 4
> (consent-gated). The routes and counts in §8 reflect the current source tree.

This runbook covers the full path: **download the source → edit it in your own codebase →
build → deploy → point your domain at it.** If you only want to deploy as-is, skip to §3.

---

## 1. What this app actually is (read first — it dictates how you deploy)

There are **two pieces**, and they were designed to live on the **same origin**:

| Piece | Package | What it does | Output |
|---|---|---|---|
| **Website** | `@workspace/mythos-website` | The marketing site. **Static export** — plain HTML/CSS/JS, no Node server at runtime. | `artifacts/mythos-website/dist/public/` |
| **API** | `@workspace/api-server` | Receives the **contact form** (`/api/inquiries`) and **careers form** (`/api/careers/open-talent`) and emails them via Resend. | `artifacts/api-server/dist/index.mjs` (Node) |

**The critical detail:** the website's forms call **relative URLs** — `fetch("/api/inquiries")`
and `fetch("/api/careers/open-talent")`. On Replit, the application router serves the site at `/`
and the API at `/api` on **one domain**, so those relative calls "just work." **Most hosts give each
service its own separate domain**, so a relative `/api/...` from the static site has nowhere to go
unless you keep both behind a single origin. This is the #1 thing to get right (see §4).

**Graceful degradation:** if the API is not reachable, the forms do **not** silently fail — they
show *"We couldn't reach the server… please email info@mythosaisecurity.com directly."* So you can
launch the static site immediately and add live forms later.

---

## 2. Download the source & work in your own codebase

### 2a. Get the files
You have three ways to get the complete, buildable source tree. **The packaged archive is the
easiest.**

1. **Packaged source archive (recommended).** A clean ZIP of the whole monorepo — everything nests
   under one top-level `mythos-aisecurity/` folder — with all source for both the website and the
   API, every image/video, the **optimized 3D models the site actually renders**
   (`public/models/optimized/*.glb`), the lockfile, the GitHub Actions CI workflow, and this runbook.
   The heavy/transient folders are already stripped out: `node_modules`, `.git`, `.next`, `dist`,
   `.cache`, `.local`, `attached_assets`, the internal `.agents/` workspace folder, and the
   multi-hundred-MB **raw** 3D originals in `artifacts/mythos-website/model-sources/` (these are
   *not* needed to build or run — only to regenerate the optimized GLBs, and they remain available in
   the Replit workspace if you ever need them). Unzip it anywhere and it is ready to install. *(This
   file is presented to you in the chat as a download; it is also written to the gitignored
   `dist/mythos-aisecurity-source-<date>.zip` in the workspace.)*
2. **Download from Replit.** In the workspace, use the three-dot menu → **Download as zip**. This
   gives you the entire repl including `node_modules` and history (large, ~2 GB). Delete
   `node_modules`, `.next`, `dist`, and `.local` after unzipping, then reinstall (§2c).
3. **Git.** If the repo is on GitHub (see §3), `git clone` it. This is the cleanest option for
   ongoing work because you keep version history.

### 2b. Why you must keep the whole monorepo together
This is a **pnpm monorepo.** Dependencies use the workspace `catalog:` and `workspace:*` protocols,
which **only resolve when you install from the repo root** with `pnpm-workspace.yaml` present. You
**cannot** copy a single `artifacts/<x>` folder out and build it alone — keep the whole tree.

### 2c. Prerequisites & first run (local)

The install and run scripts are **cross-platform** — the exact same commands work in **Windows
PowerShell, macOS, and Linux** (no bash-only syntax, no POSIX `sh` required). See §2e for a
Windows-specific quick reference.

- **Node 24.x** and **pnpm 10.x.** Get pnpm with either:
  - **npm (recommended — no admin rights needed):**
    ```
    npm install -g pnpm@10
    ```
  - **Corepack** (ships with Node): `corepack enable`. ⚠️ On **Windows** this writes shims into
    `C:\Program Files\nodejs` and fails with `EPERM: operation not permitted` unless you launch the
    terminal **as Administrator**. The `npm install -g pnpm@10` route above avoids this entirely.
- Install everything from the **repo root** (identical on every OS):
  ```
  pnpm install --frozen-lockfile
  ```
  No `HUSKY=0` or other prefix is needed: the git hooks auto-skip when there is no `.git` (e.g. the
  downloaded ZIP), and the install runs on Windows without a POSIX shell.
- Run the website dev server (hot reload) — serves on **port 3000** by default:
  ```
  pnpm --filter @workspace/mythos-website dev
  # open http://localhost:3000
  ```
  To use a different port, set `PORT` first (Next.js reads it automatically):
  - **Windows PowerShell:** `$env:PORT=4000; pnpm --filter @workspace/mythos-website dev`
  - **macOS / Linux:** `PORT=4000 pnpm --filter @workspace/mythos-website dev`
- Run the API (only needed to test the forms locally) — defaults to **port 8080** in development:
  ```
  pnpm --filter @workspace/api-server dev
  ```
  The forms post to a **relative** `/api/...`, so to exercise them end-to-end locally you need both
  behind one origin (or just rely on the "email us" fallback during local dev).
- Type-check (the quality gate — there is no ESLint configured for the website):
  ```
  pnpm --filter @workspace/mythos-website typecheck   # tsc --noEmit
  ```

### 2e. Windows / PowerShell quick reference

Everything above runs natively on Windows; this is the condensed checklist plus the few
PowerShell-specific gotchas.

1. **Install Node 24.x** (from nodejs.org or `winget install OpenJS.NodeJS`).
2. **Install pnpm** (no Administrator needed):
   ```powershell
   npm install -g pnpm@10
   ```
   Avoid `corepack enable` on Windows unless you run PowerShell **as Administrator** — it otherwise
   throws `EPERM: operation not permitted` writing into `C:\Program Files\nodejs`.
3. **Install dependencies** from the repo root:
   ```powershell
   pnpm install --frozen-lockfile
   ```
4. **Run the site / API / type-check** (same commands as §2c):
   ```powershell
   pnpm --filter @workspace/mythos-website dev        # http://localhost:3000
   pnpm --filter @workspace/api-server dev            # API on http://localhost:8080
   pnpm --filter @workspace/mythos-website typecheck
   ```
5. **Setting an env var inline** differs from bash. In PowerShell set it first, or join with `;`
   (PowerShell has no `VAR=value command` prefix and uses `;` rather than `&&`):
   ```powershell
   $env:PORT=4000; pnpm --filter @workspace/mythos-website dev
   ```
   (bash / macOS / Linux equivalent: `PORT=4000 pnpm --filter @workspace/mythos-website dev`.)

**Why it works on Windows:** the repo has no bash-only lifecycle scripts. `preinstall` and the
pre-commit hook run on Node (`node scripts/*.mjs`), `cross-env` sets `NODE_ENV` portably in the API
dev script, the website and API read `PORT` from the environment (no `${PORT:-3000}` shell
expansion), and `.gitattributes` forces LF on `*.sh` / git-hook files so checkouts never corrupt
them. Just as important, the committed `pnpm-lock.yaml` records the **prebuilt native binaries for
every desktop OS**: `lightningcss`, `@tailwindcss/oxide`, `esbuild`, and `rollup` each ship
per-platform `.node` add-ons, and the lockfile keeps the **Windows x64, macOS, and Linux** variants
so `pnpm install --frozen-lockfile` resolves the correct one for your machine. (pnpm downloads only
*your* platform's binary, so carrying all three in the lockfile costs nothing per install.) Without
this, a Windows build fails in `next build` with
`Cannot find module '../lightningcss.win32-x64-msvc.node'` — the `pnpm-workspace.yaml` `overrides`
block is deliberately commented to warn against re-adding the platform strips that would re-break it.

### 2d. Where to make changes (project map)
```
artifacts/mythos-website/
├─ app/                      # Routes (one folder per URL). Each page.tsx is a route.
│  ├─ page.tsx               #  /            (homepage)
│  ├─ platform/ solutions/ use-cases/ pricing/
│  ├─ example-report/ demo/ investors/ company/
│  ├─ contact/ careers/ trust/ privacy/
│  ├─ use-cases/[slug]/      #  /use-cases/<slug>  (the 12 deep-dive pages)
│  ├─ layout.tsx             #  Root layout + <metadataBase> canonical host
│  ├─ template.tsx           #  Per-route wrapper — opacity-only page fade on navigation
│  ├─ sitemap.ts             #  Generates /sitemap.xml — ADD NEW ROUTES HERE
│  └─ icon.png               #  Favicon/app icon
├─ components/               # UI building blocks, grouped by area
│  ├─ layout/ (SiteHeader, SiteFooter)  ui/  hero/  home/  platform/
│  ├─ pricing/ use-cases/ example-report/ careers/ forms/ assessment/
│  ├─ consent/ (cookie banner + GA4 gating)  motion/  three/ (3D)  shared/  sections/
├─ content/
│  ├─ navigation.ts          #  Header nav + footer groups — EDIT TO ADD NAV LINKS
│  └─ site.ts                #  Per-page SEO metadata + hero copy
├─ data/                     # Page content as typed data (edit copy here, not in JSX)
│  ├─ useCaseDeepDives.ts / useCaseSlugs.ts / useCases.ts
│  └─ pricing.ts  careers.ts  exampleReport.ts  assessmentOutputs.ts  engagementSteps.ts
├─ lib/
│  ├─ constants.ts           #  Site name, CTA strings ("Request Assessment"), product names
│  ├─ consent.ts / consentScripts.ts   #  GA4 consent logic
│  ├─ submitInquiry.ts / submitOpenTalent.ts  #  Form POST helpers (relative /api/...)
│  └─ utils.ts (cn helper)  motion.ts  gsap.ts  three.ts
├─ public/                   # Static assets served at the site root
│  ├─ images/ (incl. images/heroes/*-Hero-Background.png)
│  ├─ video/   models/ (GLB 3D)   example-report/
│  ├─ favicon.svg  opengraph.jpg  robots.txt
├─ app/globals.css           # Brand tokens (Obsidian/Bronze/Gold/Ivory) — Tailwind v4 @theme
└─ next.config.ts            # Static-export config (see §8)
```

**Common edits:**
- **Change copy on a page** → edit the matching file in `data/` (preferred) or the page's
  `app/<route>/page.tsx`.
- **Add a new page** → create `app/<route>/page.tsx`, add the link in `content/navigation.ts`, and
  add the path to `app/sitemap.ts` (this is exactly how `/trust` was added).
- **Add/replace an image** → drop it in `public/images/...` and reference it by its root-relative
  path (e.g. `/images/heroes/Trust-Hero-Background.png`). Compress hero images before committing
  (see §9).
- **Change the nav CTA / product names** → `lib/constants.ts`. (Keep the nav CTA as
  **"Request Assessment"**.)
- **Brand colors / fonts** → `app/globals.css`.

---

## 3. Repository prep (one-time, before any host)

- Push the **whole repo** to GitHub (not just the website folder — see §2b).
- Toolchain the repo is built with: **Node 24.x**, **pnpm 10.26.x**. Pin these on your host
  (most hosts read `engines`, a Nixpacks Node version, or honor Corepack).
- `pnpm-lock.yaml` is committed at the root → use `--frozen-lockfile` for reproducible installs.
- `.env` files are **not** committed. Real env values get set in your host's dashboard (§6).
- The repo ships a **GitHub Actions CI workflow** (`.github/workflows/ci.yml`) that runs on every
  push to `main` and every pull request, and needs **no secrets**. It installs and type-checks on
  **both Windows and Linux**, runs the required production `next build` and the API bundle, boots the
  API and smoke-tests the contact/careers form endpoints — valid sends *plus* rejection of
  malformed, oversized, and spam submissions. A green check means the project still installs and
  builds cleanly on a fresh machine; this is what locks in the cross-platform setup (§2e).

---

## 4. Deploy on Railway

You have two viable shapes. **Phase 1** gets the site live fast; **Phase 2** turns the forms on.
(Railway is the worked example here; any host that can run a build command and a start command works
the same way — the static export can also be dropped onto Netlify, Vercel, Cloudflare Pages, S3 +
CloudFront, or any static host by uploading `artifacts/mythos-website/dist/public/`.)

### Phase 1 — Static site only (fastest; forms fall back to "email us")

- **Root directory:** repo root.
- **Install + build command:**
  ```bash
  corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/mythos-website build
  ```
- **Start command (serve the static export on the host's port):**
  ```bash
  npx serve artifacts/mythos-website/dist/public -l $PORT
  ```
  - Railway injects `$PORT` automatically — `serve` must bind to it.
  - `serve` returns the correct per-route HTML and the exported `404.html` for unknown paths.
  - ⚠️ **Do NOT use `next start`.** It does not work with `output: "export"` — there is no Node
    server build, only static files. `next start` will fail.

Result: the whole marketing site (including `/trust` and `/pricing`) is live. Contact/careers forms
display the honest "email us directly" message until you complete Phase 2.

### Phase 2 — Turn the forms on (live email)

Pick ONE. **Option A is recommended** because it preserves the same-origin design and needs **zero
frontend changes.**

**Option A — One combined service (recommended): Express serves BOTH the API and the static site.**
- Requires a small code change to `api-server`: after its `/api` routes, serve
  `artifacts/mythos-website/dist/public` as static files (`express.static`) with a fallback to the
  exported HTML / `404.html`.
- Build both, then run `node artifacts/api-server/dist/index.mjs` as the single service.
- Because everything is one origin again, the relative `/api/...` calls keep working as-is and there
  is no CORS to configure.
- *(This change isn't in the repo yet — request it when you're ready and it can be added.)*

**Option B — Two separate services (web + api).**
- Requires a frontend change: replace the relative `fetch("/api/...")` (in
  `lib/submitInquiry.ts` / `lib/submitOpenTalent.ts`) with a configurable absolute base URL (e.g. a
  `NEXT_PUBLIC_API_BASE_URL` baked in at build time, since static export inlines `NEXT_PUBLIC_*` at
  build), pointing at the API service's public URL.
- Then set `ALLOWED_ORIGINS` (or `SITE_URL`) on the API to your site domain so CORS permits it.
- More moving parts than Option A; only choose this if you specifically want the API on its own
  service/scaling.

### API service build/run (for Option A or B)

- **Build:** `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server build`
- **Start:** `node --enable-source-maps artifacts/api-server/dist/index.mjs`
- The API **requires** a `PORT` env var **in production** — with `NODE_ENV=production` it throws if
  `PORT` is missing, so a misconfigured deploy fails loudly instead of binding a surprise port.
  Railway provides `$PORT` automatically. (In local development it falls back to port 8080 — see
  §2c.) Health check path: `GET /api/healthz`.

---

## 5. Custom domain on Railway

In the Railway service → **Settings → Networking → Custom Domains**, add **both**
`www.mythosaisecurity.com` and `mythosaisecurity.com`. Railway shows the exact DNS target for each.
The `www` target is already in your DNS (`sb2kmmws.up.railway.app`). The apex is the problem — see §7.

---

## 6. Environment variables (set on your host, on the API service)

Every variable is optional for the server to *boot*, but email is only **delivered** once a provider
is configured. Off Replit, the Replit Resend connection does not exist, so you must use an API key.

| Variable | Needed? | Value / Notes |
|---|---|---|
| `PORT` | Auto | Provided by the host — do not hardcode. |
| `NODE_ENV` | Yes | `production`. In production the server **never fakes** email success — a misconfig returns an honest error instead of a silent drop. |
| `RESEND_API_KEY` | **Yes (for live forms)** | `re_...` from Resend. Without it, forms return the honest "email us directly" message. Takes precedence over the Replit connection. |
| `CONTACT_EMAIL_TO` | Optional | Inquiry recipient. Defaults to `info@mythosaisecurity.com`. |
| `CONTACT_EMAIL_FROM` | Optional | Defaults to `Mythos AI Security <no-reply@mythosaisecurity.com>`. **The sending domain must be verified in Resend** for delivery (your DNS already has `resend._domainkey` + the `send` subdomain). |
| `SITE_URL` / `ALLOWED_ORIGINS` | Option B only | Set to `https://www.mythosaisecurity.com` so CORS allows the site when web and API are on different origins. Not needed for the same-origin Option A. |

Google Analytics needs **no** env var — the GA4 Measurement ID is already wired in and only loads
after a visitor opts in via the cookie banner.

---

## 7. DNS on GoDaddy — the apex ("naked domain") problem and the fix

### The symptom
`mythosaisecurity.com` triggers a browser warning ("this site may be trying to steal your data")
and is **blocked on many corporate networks**, while `www.mythosaisecurity.com` works perfectly.

### The cause (visible in your DNS records)
- `www` → **CNAME** → `sb2kmmws.up.railway.app`. This points at **Railway**, which serves your site
  with a valid TLS/SSL certificate → loads fine, passes security filters. ✅
- `mythosaisecurity.com` (the apex `@`) → two **A records** → `15.197.225.128` and `3.33.251.168`.
  **These are GoDaddy's domain-forwarding / parking servers — not Railway.** So the bare domain
  never reaches your site. It hits GoDaddy's forwarding service, which does **not** present a valid
  HTTPS certificate for `mythosaisecurity.com`. Browsers see a certificate mismatch → the "steal
  your data" warning, and corporate web filters routinely **block** domains that resolve to
  parking/forwarding IPs or fail certificate validation.

That's the whole asymmetry: **www points at a real, certificate-valid host; the apex points at
GoDaddy forwarding with no valid cert.**

### The fix — choose one

**Option A (recommended, durable): move DNS to Cloudflare and put the apex on Railway.**
GoDaddy cannot point an apex domain at a hostname (no "CNAME flattening"), which is why it falls back
to forwarding. Cloudflare can.
1. In Railway, add both `mythosaisecurity.com` and `www.mythosaisecurity.com` as custom domains (§5).
2. Create a free Cloudflare account, add `mythosaisecurity.com`, and let it import your existing
   records. **Copy over all the email records** (the Google MX, the `send` subdomain, and the SPF /
   DKIM / DMARC TXT records) exactly — see the "Email DNS" subsection below.
3. At GoDaddy, change the **nameservers** to the two Cloudflare gives you.
4. In Cloudflare create: `CNAME @ → sb2kmmws.up.railway.app` (Cloudflare auto-flattens the apex) and
   `CNAME www → sb2kmmws.up.railway.app`. Set **SSL/TLS mode to "Full."**
5. Delete the old GoDaddy forwarding A records (`15.197.225.128`, `3.33.251.168`).

Result: both the apex and www reach Railway over valid HTTPS, the warning disappears, and Cloudflare's
CDN/reputation layer further reduces corporate-filter blocks.

**Option B (stay on GoDaddy): redirect the apex to www over HTTPS.**
1. Keep `www` CNAME → Railway (unchanged).
2. GoDaddy → your domain → **Forwarding → Domain**: forward `mythosaisecurity.com` →
   `https://www.mythosaisecurity.com`, type **Permanent (301)**, **"Forward only" (NOT "with
   masking")**, with the **HTTPS/secure** option enabled.
3. ⚠️ Turn **off** "Forward with masking" — masking loads your site inside a hidden frame, which
   breaks SEO and can itself trip security warnings.
4. GoDaddy needs to provision an SSL cert for the forward; this can take up to ~24–48h and is
   historically flaky. If the warning persists past that window, use Option A.

### Email DNS — healthy, and unrelated to the website block
For completeness (do **not** change these when fixing the web issue; carry them over verbatim if you
migrate DNS): your mail is on **Google Workspace** (the `aspmx.l.google.com` MX set) plus a `send`
subdomain on Amazon SES (used by Resend), with a single valid root **SPF** record, **DKIM**
(`google._domainkey`, `resend._domainkey`), and a **DMARC** policy (`p=quarantine`). These look
correctly configured and have nothing to do with the apex web-certificate problem.

### One related code note (canonical URL)
`metadataBase` (in `app/layout.tsx`) and the sitemap base (`app/sitemap.ts`) are **hardcoded to the
apex** `https://mythosaisecurity.com`. Decide on a single canonical host and keep it consistent:
- If you make **www** the public host (e.g. Option B), update those two values to
  `https://www.mythosaisecurity.com` and rebuild, so canonical/OG/sitemap URLs match where visitors
  actually land.
- If the **apex** serves the site directly (Option A), no change is needed.

---

## 8. Build verification & route inventory

**Quality gate (run before every deploy):**
```bash
pnpm --filter @workspace/mythos-website typecheck   # tsc --noEmit  → exit 0
pnpm --filter @workspace/mythos-website build        # next build (static export) → dist/public/
```
- `tsc --noEmit` currently passes (exit 0). There is no ESLint configured for this artifact.
- `next build` writes the static site to `artifacts/mythos-website/dist/public/`. Static-export
  safety holds: `images.unoptimized: true`, `output:"export"` scoped to the **build phase only**,
  isolated `distDir` (`.next` for dev, `dist/public` for the export). No export-incompatible
  features (no route handlers, middleware, server actions, `next/image`, or dynamic `searchParams`).
- ⚠️ A real `next build` recompresses `public/opengraph.jpg`; restore it after building if you want
  the change set to stay scoped.

**Public routes that must load after any change (currently 13 top-level pages + 12 deep-dives):**
```
/            /platform     /solutions    /use-cases    /pricing
/example-report   /demo     /investors    /company      /contact
/careers     /trust        /privacy
```
**Use-case deep-dive routes (`/use-cases/<slug>`):**
```
customer-support-ai-agent          internal-knowledge-rag-assistant
ai-agent-tools-actions             regulated-workflow-assistant
partner-vendor-ai-integration      executive-employee-copilot
developer-ai-assistant             ai-powered-decision-support
public-sector-mission-workflow     data-platform-cloud-ai-integration
ai-driven-vehicle-systems-hermes   quantum-adjacent-ai-integration
```
**Anchor links that must still land correctly:**
```
/use-cases#what-mythos-produces    /use-cases#how-engagement-starts
/careers#current-openings          /careers#open-talent
```
Plus the generated `/sitemap.xml`, `/robots.txt`, and the `/icon.png` favicon. The export produces
one `index.html` per route above (the previous full `next build` reported 28 entries; the added
`/trust` page makes it 29 — re-run the build to confirm).

> **Sitemap note:** `app/sitemap.ts` lists **indexable routes only** — all 13 top-level pages above
> **except `/example-report`**, plus the 12 use-case deep-dives (24 entries total). `/example-report`
> is a live, publicly linked route that is *intentionally* not in the sitemap. If you want search
> engines to index it, add `"/example-report"` to `STATIC_ROUTES` in `app/sitemap.ts` and rebuild.

---

## 9. Pre-launch optimization checklist (optional, reference)

The site is launch-ready as-is. If you want a final performance/polish pass before going live, this
is a safe, high-value checklist (do **not** redesign, do **not** remove pages, keep the nav CTA as
**"Request Assessment"**):

> **Status — final optimization pass completed (June 27, 2026).** This pass has already been run; the
> checklist below is retained for reference and for future edits. What it changed:
> - **Example Report images compressed −62%** (`public/images/example-report/`, 27.85 MB → ~10.7 MB)
>   with `pngquant --quality=80-95` in place — filenames unchanged (zero code/PDF churn), text
>   verified crisp on the densest pages.
> - **Opacity-only route transition added** (`app/template.tsx` + `.route-fade-in` in `globals.css`):
>   a subtle ~0.18s page fade on navigation, disabled under `prefers-reduced-motion`. It uses no
>   `transform`, so it cannot disturb sticky sections or GSAP scroll animations.
> - **Two unused placeholder components removed** (confirmed unreferenced). No active pages, logos,
>   report images, videos, or GLBs were touched.
> - **Background videos evaluated and intentionally left as-is** — they were already efficiently
>   encoded, so re-encoding saved only single-digit MB at the cost of quality; not worth it.
> - 3D/GLB assets, hero images, below-the-fold lazy-loading, and consent-gated scripts were already
>   optimized in earlier passes. `typecheck` passes and every route in §8 was verified rendering.

- **Images** — compress hero backgrounds (`public/images/heroes/*`) and large section images; keep
  visual quality. Mark only above-the-fold hero images as priority; lazy-load below-the-fold and the
  Example Report images. Define dimensions to avoid layout shift. (The `/trust` hero was already
  compressed from 2.08 MB → 459 KB with `pngquant` to match its siblings.)
- **Video** (`public/video/`) — keep muted/looped/`playsInline`, add poster images, use
  `preload="metadata"`/`"none"`, lazy-load below-the-fold, never autoplay audio.
- **3D / GLB** (`public/models/`, `components/three/`) — keep lazy-loaded with
  `dynamic(..., { ssr: false })`; don't render offscreen; provide a fallback image; verify mobile
  perf. Do not delete GLB files without confirming they're unreferenced.
- **Code & bundle** — remove unused imports/components/`console.log`s; import only the icons you use
  (lucide-react); load animation/3D libs only where used; prefer server components where safe.
- **Transitions & scroll** — keep transitions subtle/fast; `html { scroll-behavior: smooth }` with a
  `prefers-reduced-motion: reduce` override; ensure anchor links (above) still land.
- **Dead files** — before deleting anything, search the codebase for references; if unsure, leave it
  and document it. Never delete active heroes, logos, report images, used videos/GLBs, or config.

After any optimization pass, re-run §8 (typecheck + build) and click through every route in §8.

---

## 10. Launch checklist

- [ ] (If editing locally) Download the source (§2a), `pnpm install --frozen-lockfile`, make changes,
      `typecheck`, then push the **whole monorepo** to GitHub.
- [ ] Host: build with the monorepo-root command; serve the static export on `$PORT` (Phase 1, §4).
      Confirm the site loads on the host URL.
- [ ] Click through all routes in §8 — including the new **`/trust`** page, all 12 use-case
      deep-dives, and the four anchor links.
- [ ] Fix the apex domain (§7, Option A or B). Verify **both** `https://mythosaisecurity.com` and
      `https://www.mythosaisecurity.com` load with a valid padlock and no warning.
- [ ] (When you want live forms) Phase 2 — combined service + `RESEND_API_KEY`; verify the sending
      domain is verified in Resend; submit a test inquiry and confirm the email arrives.
- [ ] Decide the canonical host and make `metadataBase` / sitemap consistent (§7 code note).
- [ ] Re-check `/privacy` cookie copy still matches what actually loads (GA4 is consent-gated).

### Alternative: one-click publish on Replit
If you publish from Replit instead, a single deploy builds and serves **both** services under the
application router (web at `/`, API at `/api`) on one origin — no per-service setup, and the Resend
**connection** (not an API key) powers email. The Railway path above exists for self-hosting off
Replit.
