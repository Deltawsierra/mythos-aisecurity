// Cross-platform preinstall guard (Windows, macOS, Linux).
//
// Replaces the previous `sh -c '...'` one-liner, which failed on Windows where
// no POSIX shell is on PATH. Runs on plain Node (built-ins only, since this
// executes before dependencies are installed). It:
//   1. Removes stray lockfiles left by other package managers.
//   2. Enforces that pnpm is the installer.
import { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const lockfile of ["package-lock.json", "yarn.lock"]) {
  rmSync(path.join(root, lockfile), { force: true });
}

const userAgent = process.env.npm_config_user_agent ?? "";
if (!userAgent.startsWith("pnpm/")) {
  console.error(
    "\nThis project uses pnpm. Install it with `npm install -g pnpm@10`,\n" +
      "then run `pnpm install` (do not use npm or yarn).\n",
  );
  process.exit(1);
}
