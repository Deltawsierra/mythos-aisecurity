import app from "./app";
import { logger } from "./lib/logger";

const isProduction = process.env.NODE_ENV === "production";
const DEFAULT_DEV_PORT = 8080;

const rawPort = process.env["PORT"];

let port: number;
if (rawPort) {
  port = Number(rawPort);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }
} else if (!isProduction) {
  // Local-development convenience: start on a default port when none is set
  // (e.g. running on Windows without exporting PORT first). Production still
  // fails loudly so a misconfigured deploy never binds an unexpected port.
  port = DEFAULT_DEV_PORT;
  logger.warn({ port }, "PORT not set; using development default");
} else {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
