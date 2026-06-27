// Cross-platform pre-commit guard (Windows, macOS, Linux).
//
// Blocks commits that include files which must never be committed:
//   1. Build output  — auto-generated and already covered by .gitignore
//      (e.g. **/.next/, dist/, out/, *.tsbuildinfo).
//   2. Secret files  — credentials and private keys that would leak if
//      committed (e.g. .env, .env.local, *.pem, *.key).
//
// Used by the husky pre-commit hook, and runnable directly:
//   node scripts/check-staged-files.mjs
import { execFileSync } from "node:child_process";

function getStagedFiles() {
  try {
    const out = execFileSync(
      "git",
      ["diff", "--cached", "--name-only", "--diff-filter=ACM"],
      { encoding: "utf8" },
    );
    return out.split(/\r?\n/).filter(Boolean);
  } catch {
    // No git available or nothing staged — nothing to check.
    return [];
  }
}

const staged = getStagedFiles();

// - any path under a `.next/`, `dist/` or `out/` directory
// - TypeScript incremental build info files
const buildRe = /(^|\/)(\.next|dist|out)\/|\.tsbuildinfo$/;
// - `.env` and `.env.<anything>` (e.g. .env.local, .env.production)
// - PEM and private key files
const secretRe = /(^|\/)\.env($|\.)|\.pem$|\.key$/;
// - except committed templates (.env.example / .env.sample / .env.template)
const secretAllowRe = /(^|\/)\.env\.(example|sample|template)$/;

const buildViolations = staged.filter((f) => buildRe.test(f));
const secretViolations = staged.filter(
  (f) => secretRe.test(f) && !secretAllowRe.test(f),
);

let status = 0;

if (buildViolations.length > 0) {
  console.error("");
  console.error("\u2716 Commit rejected: build artifacts are staged.");
  console.error("");
  console.error(
    "The following files are auto-generated build output and must never be",
  );
  console.error("committed (they are regenerated on every build):");
  console.error("");
  for (const f of buildViolations) console.error(`    ${f}`);
  console.error("");
  console.error("These paths are already covered by .gitignore. To fix this:");
  console.error("    git restore --staged <file>      # unstage the file(s)");
  console.error("");
  console.error(
    "If a file was force-added with 'git add -f', remove it from tracking:",
  );
  console.error("    git rm --cached -r <path>");
  console.error("");
  status = 1;
}

if (secretViolations.length > 0) {
  console.error("");
  console.error("\u2716 Commit rejected: secret files are staged.");
  console.error("");
  console.error(
    "The following files look like secrets or private keys and must never",
  );
  console.error(
    "be committed (doing so leaks credentials into version control):",
  );
  console.error("");
  for (const f of secretViolations) console.error(`    ${f}`);
  console.error("");
  console.error("To fix this:");
  console.error("    git restore --staged <file>      # unstage the file(s)");
  console.error("");
  console.error(
    "If a file was force-added with 'git add -f', remove it from tracking:",
  );
  console.error("    git rm --cached <path>");
  console.error("");
  console.error(
    "Store secrets via Replit Secrets / environment variables instead.",
  );
  console.error("");
  status = 1;
}

process.exit(status);
