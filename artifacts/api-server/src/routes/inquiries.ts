import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import { inquirySchema, buildEmail } from "../lib/inquiry";
import { sendEmail } from "../lib/email";
import { rateLimit } from "../lib/rateLimit";

const router: IRouter = Router();

// Minimum time (ms) a real human takes to fill and submit a form. Anything
// faster is treated as a bot and silently dropped.
const MIN_SUBMIT_MS = 2500;

const TO = process.env.CONTACT_EMAIL_TO ?? "info@mythosaisecurity.com";
const FROM =
  process.env.CONTACT_EMAIL_FROM ??
  "Mythos AI Security <no-reply@mythosaisecurity.com>";

router.post("/inquiries", async (req, res) => {
  const ip = req.ip ?? "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    res.setHeader("Retry-After", String(Math.ceil(limit.retryAfterMs / 1000)));
    res.status(429).json({
      ok: false,
      error: "Too many submissions. Please try again in a few minutes.",
    });
    return;
  }

  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Some fields are missing or invalid. Please review and try again.",
      fields: parsed.error.flatten().fieldErrors,
    });
    return;
  }
  const data = parsed.data;

  // Spam: honeypot. Real users never see this hidden field. Pretend success so
  // the bot gets no signal.
  if (data.company_website_confirm && data.company_website_confirm.trim() !== "") {
    logger.info({ ip }, "inquiry dropped (honeypot)");
    res.status(200).json({ ok: true });
    return;
  }

  // Spam: submit-time. Bots submit near-instantly. Pretend success.
  if (typeof data.renderedAt === "number" && Number.isFinite(data.renderedAt)) {
    const elapsed = Date.now() - data.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
      logger.info({ ip, elapsed }, "inquiry dropped (submitted too fast)");
      res.status(200).json({ ok: true });
      return;
    }
  }

  try {
    const { subject, html, text, replyTo } = buildEmail(data);
    const result = await sendEmail({ to: TO, from: FROM, subject, html, text, replyTo });

    if (result.delivered || result.simulated) {
      res.status(200).json({ ok: true });
      return;
    }

    res.status(503).json({
      ok: false,
      error:
        "We couldn't send your message right now. Please email info@mythosaisecurity.com directly.",
    });
  } catch (err) {
    logger.error(
      { err: err instanceof Error ? err.message : String(err) },
      "inquiry handler failed",
    );
    res.status(500).json({
      ok: false,
      error:
        "Something went wrong on our end. Please email info@mythosaisecurity.com directly.",
    });
  }
});

export default router;
