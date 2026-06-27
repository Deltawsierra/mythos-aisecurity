import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app: Express = express();

// Behind the Replit proxy (dev) and the autoscale "application" router (prod),
// the real client IP arrives via X-Forwarded-For. Trust it so req.ip — and the
// per-IP rate limiter — reflect the caller rather than the proxy hop.
app.set("trust proxy", true);

// Restrict browser cross-origin access to the inquiry endpoint. The marketing
// site calls /api from the SAME origin, so it never triggers CORS; this
// allowlist simply prevents the endpoint from acting as an open browser-submit
// relay for arbitrary third-party sites.
const extraOrigins = new Set(
  (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const siteHost = (() => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
})();

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true; // same-origin requests and non-browser clients
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    if (
      hostname.endsWith(".replit.dev") ||
      hostname.endsWith(".replit.app") ||
      hostname.endsWith(".repl.co")
    ) {
      return true;
    }
    if (siteHost && hostname === siteHost) return true;
    if (extraOrigins.has(origin)) return true;
    return false;
  } catch {
    return false;
  }
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(
  cors({
    origin: (origin, cb) => cb(null, isAllowedOrigin(origin ?? undefined)),
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));

app.use("/api", router);


// Serve the exported website (Option A: one combined service).
const here = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(here, "../../mythos-website/dist/public");

app.use(express.static(siteDir));

// Anything that isn't an API route or a real file falls back to the
// exported 404 page.
app.use((req, res) => {
  // Unknown API path -> clean JSON, matching the app's { ok, error } shape.
  if (req.path.startsWith("/api")) {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  // Unknown page -> the exported 404 page.
  res.status(404).sendFile(path.join(siteDir, "404.html"));
});

export default app;
