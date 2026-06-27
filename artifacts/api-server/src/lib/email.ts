import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger";

/**
 * Email delivery for website form submissions.
 *
 * Primary provider: the Resend Replit connection (integration: resend) via
 * @replit/connectors-sdk — the SDK handles identity + token refresh, so no API
 * key is stored. Fallback: a plain RESEND_API_KEY hitting Resend's REST API
 * directly (for portability outside Replit).
 *
 * Honesty matrix:
 *   - provider configured  -> attempt real send; success => delivered, failure
 *     => surfaced (caller returns an honest error). Never fake success in prod.
 *   - provider missing      -> dev: log + simulate success so local flows work;
 *     prod: return not-delivered so the caller shows an honest error.
 */

const isProduction = process.env.NODE_ENV === "production";

export interface EmailAttachment {
  /** Filename shown to the recipient. */
  filename: string;
  /** Base64-encoded file contents (Resend accepts a base64 string). */
  content: string;
  /** Optional MIME type; Resend infers from the filename when omitted. */
  contentType?: string;
}

export interface SendEmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

type Provider = "resend-api" | "resend-connection" | "none";

export interface SendEmailResult {
  delivered: boolean;
  simulated: boolean;
  provider: Provider;
  error?: string;
}

function resolveProvider(): Provider {
  if (process.env.RESEND_API_KEY) return "resend-api";
  if (process.env.REPLIT_CONNECTORS_HOSTNAME) return "resend-connection";
  return "none";
}

function resendPayload(p: SendEmailParams) {
  return {
    from: p.from,
    to: [p.to],
    subject: p.subject,
    html: p.html,
    text: p.text,
    ...(p.replyTo ? { reply_to: p.replyTo } : {}),
    ...(p.attachments && p.attachments.length > 0
      ? {
          attachments: p.attachments.map((a) => ({
            filename: a.filename,
            content: a.content,
            ...(a.contentType ? { content_type: a.contentType } : {}),
          })),
        }
      : {}),
  };
}

// Resend's REST base URL. Overridable via RESEND_API_BASE_URL purely so CI can
// point the real send path at a local stub server — this exercises the full
// route -> validate -> build -> send flow without a secret or a real email.
// Defaults to the real API, so production behaviour is unchanged.
const RESEND_API_BASE_URL = (
  process.env.RESEND_API_BASE_URL ?? "https://api.resend.com"
).replace(/\/+$/, "");

async function sendViaResendApi(p: SendEmailParams): Promise<void> {
  const res = await fetch(`${RESEND_API_BASE_URL}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resendPayload(p)),
  });
  if (!res.ok) {
    // Status only — never propagate the response body, which could echo request
    // content (e.g. the applicant's reply-to address).
    throw new Error(`Resend API responded ${res.status}`);
  }
}

async function sendViaResendConnection(p: SendEmailParams): Promise<void> {
  // integration: resend — calls Resend's REST API through the Replit connector.
  const connectors = new ReplitConnectors();
  const res = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resendPayload(p)),
  });
  if (!res.ok) {
    throw new Error(`Resend connection responded ${res.status}`);
  }
}

export async function sendEmail(p: SendEmailParams): Promise<SendEmailResult> {
  const provider = resolveProvider();

  try {
    if (provider === "resend-api") {
      await sendViaResendApi(p);
      return { delivered: true, simulated: false, provider };
    }
    if (provider === "resend-connection") {
      await sendViaResendConnection(p);
      return { delivered: true, simulated: false, provider };
    }

    // No provider configured.
    if (!isProduction) {
      logger.warn(
        { provider: "none" },
        "EMAIL not configured — simulating success (dev only). Bind the Resend connection or set RESEND_API_KEY for real delivery.",
      );
      return { delivered: false, simulated: true, provider: "none" };
    }
    return {
      delivered: false,
      simulated: false,
      provider: "none",
      error: "email_not_configured",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!isProduction) {
      logger.warn(
        { provider, err: message },
        "EMAIL send failed — simulating success (dev only).",
      );
      return { delivered: false, simulated: true, provider, error: message };
    }
    logger.error({ provider, err: message }, "EMAIL send failed");
    return { delivered: false, simulated: false, provider, error: message };
  }
}
