/**
 * Regenerates public/example-report/ai-deployment-assurance-evidence-pack.pdf
 * from the 12 source page images in public/images/example-report/.
 *
 * Each page is normalized to a common width, compressed to JPEG to keep the
 * download small, and stamped with a persistent footer banner repeating the
 * "Illustrative example only — fictional data" disclaimer so the sample can
 * never be mistaken for a real engagement once it leaves the site.
 *
 * One-off maintenance script (not bundled by Next.js). Run from the repo root:
 *   node artifacts/mythos-website/scripts/generate-example-report-pdf.mjs
 * Depends on `sharp` (workspace node_modules) and ImageMagick (`convert`).
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(ROOT, "..", "..");

// `sharp` lives only in the pnpm virtual store (no root symlink), so resolve it
// from there rather than relying on the artifact's own node_modules.
const require = createRequire(
  pathToFileURL(path.join(REPO_ROOT, "node_modules/.pnpm/node_modules/_.js")),
);
const sharp = require("sharp");
const SRC_DIR = path.join(ROOT, "public", "images", "example-report");
const OUT_DIR = path.join(ROOT, "public", "example-report");
const OUT_PDF = path.join(OUT_DIR, "ai-deployment-assurance-evidence-pack.pdf");

const PAGES = [
  "01-cover.png",
  "02-executive-summary.png",
  "03-system-in-scope.png",
  "04-methodology.png",
  "05-risk-overview-dashboard.png",
  "06-priority-findings.png",
  "07-detailed-finding-register.png",
  "08-scenario-testing-results.png",
  "09-remediation-guidance.png",
  "10-release-readiness-decision.png",
  "11-retest-plan.png",
  "12-appendix-evidence-summary.png",
];

const WIDTH = 1100; // normalized page width in px
const BANNER_H = 64; // disclaimer footer band height in px
const DISCLAIMER = "Illustrative example only — fictional data · Mythos AI Security";

function escapeXml(s) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]);
}

function banner(width) {
  // Obsidian band with a top bronze hairline and centered bronze disclaimer.
  return Buffer.from(
    `<svg width="${width}" height="${BANNER_H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${BANNER_H}" fill="#080808"/>
      <rect width="${width}" height="2" fill="#a66a32"/>
      <text x="50%" y="50%" dy="0.36em" text-anchor="middle"
        font-family="DejaVu Serif, Georgia, serif" font-size="22"
        letter-spacing="1.2" fill="#d6a25f">${escapeXml(DISCLAIMER)}</text>
    </svg>`,
  );
}

async function buildPage(srcFile, destFile) {
  const resized = await sharp(path.join(SRC_DIR, srcFile))
    .resize({ width: WIDTH })
    .toBuffer();
  const meta = await sharp(resized).metadata();
  const canvasH = meta.height + BANNER_H;

  await sharp({
    create: {
      width: WIDTH,
      height: canvasH,
      channels: 3,
      background: "#080808",
    },
  })
    .composite([
      { input: resized, top: 0, left: 0 },
      { input: banner(WIDTH), top: meta.height, left: 0 },
    ])
    .jpeg({ quality: 82, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(destFile);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const tmp = mkdtempSync(path.join(tmpdir(), "report-pdf-"));
  try {
    const jpgs = [];
    for (let i = 0; i < PAGES.length; i++) {
      const dest = path.join(tmp, `page-${String(i + 1).padStart(2, "0")}.jpg`);
      // eslint-disable-next-line no-await-in-loop
      await buildPage(PAGES[i], dest);
      jpgs.push(dest);
      process.stdout.write(`  ✓ ${PAGES[i]}\n`);
    }
    execFileSync("convert", [...jpgs, "-quality", "82", OUT_PDF], {
      stdio: "inherit",
    });
    process.stdout.write(`\nWrote ${OUT_PDF}\n`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
