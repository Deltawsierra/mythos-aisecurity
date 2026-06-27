import { Router, type IRouter, type Request, type Response } from "express";
import multer from "multer";
import { logger } from "../lib/logger";
import { openTalentSchema, buildOpenTalentEmail } from "../lib/openTalent";
import { sendEmail } from "../lib/email";
import { rateLimit } from "../lib/rateLimit";

const router: IRouter = Router();

// Minimum time (ms) a real human takes to fill and submit. Faster => bot.
const MIN_SUBMIT_MS = 2500;
// Resume size ceiling. Resend caps a message at ~40MB; 10MB raw (~13MB base64)
// stays well under that.
const MAX_RESUME_BYTES = 10 * 1024 * 1024;

const TO =
  process.env.CAREERS_EMAIL_TO ??
  process.env.CONTACT_EMAIL_TO ??
  "info@mythosaisecurity.com";
const FROM =
  process.env.CONTACT_EMAIL_FROM ??
  "Mythos AI Security <no-reply@mythosaisecurity.com>";

// Allowed resume types. We accept either a known MIME type or a known
// extension — browsers are inconsistent about the MIME they report for .doc(x).
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream", // some browsers send this for .docx; ext-checked below
]);
const ALLOWED_EXT = new Set(["pdf", "doc", "docx"]);

function fileExt(name: string): string {
  const parts = name.split(".");
  return parts.length > 1 ? (parts.pop() ?? "").toLowerCase() : "";
}

function isAllowedResume(mimetype: string, originalname: string): boolean {
  const ext = fileExt(originalname);
  if (ALLOWED_EXT.has(ext)) return true;
  // Only trust MIME when there's no usable extension signal.
  return ALLOWED_MIME.has(mimetype) && mimetype !== "application/octet-stream";
}

/**
 * Defence in depth: confirm the file's leading bytes match a real PDF/DOC/DOCX
 * before we attach it to an email. This rejects type-spoofed uploads (e.g. an
 * executable or script renamed with a friendly .pdf/.doc(x) extension).
 */
function hasValidResumeMagic(
  buffer: Buffer,
  ext: string,
  mimetype: string,
): boolean {
  if (buffer.length < 5) return false;
  const isPdf = buffer.subarray(0, 5).toString("latin1") === "%PDF-";
  // DOCX / OOXML is a ZIP container: "PK\x03\x04".
  const isZip =
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04;
  // Legacy .doc is an OLE2 compound file: D0 CF 11 E0.
  const isOle =
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0;

  if (ext === "pdf" || mimetype === "application/pdf") return isPdf;
  if (ext === "docx" || mimetype.includes("openxmlformats")) return isZip;
  if (ext === "doc" || mimetype === "application/msword") return isOle;
  // No reliable signal from ext/mime: accept only known-good signatures.
  return isPdf || isZip || isOle;
}

/**
 * A safe attachment filename derived from the applicant's name + the original
 * extension. Avoids forwarding arbitrary client-supplied filenames.
 */
function safeResumeName(
  firstName: string,
  lastName: string,
  originalname: string,
): string {
  const ext = fileExt(originalname) || "pdf";
  const base = `${firstName}-${lastName}-Resume`
    .replace(/[^A-Za-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "Open-Talent-Resume"}.${ext}`;
}

// In-memory upload only: the resume buffer never touches disk or any public
// folder. limits enforce a single small file with a bounded field count.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES, files: 1, fields: 40, fieldSize: 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (isAllowedResume(file.mimetype, file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("INVALID_RESUME_TYPE"));
    }
  },
});

const uploadResume = upload.single("resume");

function jsonError(
  res: Response,
  status: number,
  error: string,
  fields?: Record<string, string[]>,
) {
  res.status(status).json({ ok: false, error, ...(fields ? { fields } : {}) });
}

// Run multer and translate its errors into honest JSON 400s instead of 500s.
function handleUpload(req: Request, res: Response, next: () => void) {
  uploadResume(req, res, (err: unknown) => {
    if (!err) {
      next();
      return;
    }
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        jsonError(
          res,
          400,
          "Your resume is larger than the 10MB limit. Please upload a smaller file.",
          { resume: ["Maximum file size is 10MB."] },
        );
        return;
      }
      jsonError(res, 400, "There was a problem with your file upload. Please try again.", {
        resume: ["Upload error."],
      });
      return;
    }
    // Custom fileFilter rejection (unsupported type).
    jsonError(res, 400, "Please upload your resume as a PDF, DOC, or DOCX file.", {
      resume: ["Unsupported file type. Use PDF, DOC, or DOCX."],
    });
  });
}

// Rate-limit BEFORE multer parses the body, so an abusive caller can't force a
// 10MB in-memory buffer on every request before being rejected.
function enforceRateLimit(req: Request, res: Response, next: () => void) {
  const limit = rateLimit(req.ip ?? "unknown");
  if (!limit.ok) {
    res.setHeader("Retry-After", String(Math.ceil(limit.retryAfterMs / 1000)));
    jsonError(res, 429, "Too many submissions. Please try again in a few minutes.");
    return;
  }
  next();
}

router.post("/careers/open-talent", enforceRateLimit, handleUpload, async (req, res) => {
  const parsed = openTalentSchema.safeParse(req.body);
  if (!parsed.success) {
    jsonError(
      res,
      400,
      "Some fields are missing or invalid. Please review and try again.",
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
    return;
  }
  const data = parsed.data;

  // Spam: honeypot. Pretend success so the bot gets no signal.
  if (data.company_website_confirm && data.company_website_confirm.trim() !== "") {
    logger.info("open-talent dropped (honeypot)");
    res.status(200).json({ ok: true });
    return;
  }

  // Spam: submit-time. Bots submit near-instantly. Pretend success.
  if (typeof data.renderedAt === "number" && Number.isFinite(data.renderedAt)) {
    const elapsed = Date.now() - data.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
      logger.info({ elapsed }, "open-talent dropped (submitted too fast)");
      res.status(200).json({ ok: true });
      return;
    }
  }

  // Resume is required.
  const file = req.file;
  if (!file || !file.buffer || file.size === 0) {
    jsonError(res, 400, "A resume is required. Please upload a PDF, DOC, or DOCX file.", {
      resume: ["Resume is required."],
    });
    return;
  }

  // Server-side type + size re-validation (defence in depth).
  if (!isAllowedResume(file.mimetype, file.originalname)) {
    jsonError(res, 400, "Please upload your resume as a PDF, DOC, or DOCX file.", {
      resume: ["Unsupported file type. Use PDF, DOC, or DOCX."],
    });
    return;
  }
  if (file.size > MAX_RESUME_BYTES) {
    jsonError(res, 400, "Your resume is larger than the 10MB limit. Please upload a smaller file.", {
      resume: ["Maximum file size is 10MB."],
    });
    return;
  }

  // Content sniffing: the bytes must actually be a PDF/DOC/DOCX, not a spoofed
  // file with a friendly extension.
  if (!hasValidResumeMagic(file.buffer, fileExt(file.originalname), file.mimetype)) {
    jsonError(res, 400, "Please upload a valid PDF, DOC, or DOCX file.", {
      resume: ["File contents don't match a PDF, DOC, or DOCX."],
    });
    return;
  }

  try {
    const { subject, html, text, replyTo } = buildOpenTalentEmail(data);
    const result = await sendEmail({
      to: TO,
      from: FROM,
      subject,
      html,
      text,
      replyTo,
      attachments: [
        {
          filename: safeResumeName(data.firstName, data.lastName, file.originalname),
          content: file.buffer.toString("base64"),
          contentType: file.mimetype || "application/octet-stream",
        },
      ],
    });

    // The resume buffer is intentionally not referenced again; it is discarded
    // with the request scope and never written to disk or storage.
    if (result.delivered || result.simulated) {
      res.status(200).json({ ok: true });
      return;
    }

    jsonError(
      res,
      503,
      "We couldn't send your application right now. Please email info@mythosaisecurity.com directly.",
    );
  } catch (err) {
    // Log the failure reason only — never applicant data or resume contents.
    logger.error(
      { err: err instanceof Error ? err.message : String(err) },
      "open-talent handler failed",
    );
    jsonError(
      res,
      500,
      "Something went wrong on our end. Please email info@mythosaisecurity.com directly.",
    );
  }
});

export default router;
