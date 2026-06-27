import { z } from "zod";

/**
 * Validation and email templating for the Careers / Open Talent application.
 *
 * Privacy note: applicant data is never persisted. The parsed fields exist only
 * for the lifetime of the request to build the notification email; the resume
 * file lives in memory (multer memoryStorage) and is attached, then discarded.
 */

const shortText = z.string().trim().min(1).max(200);
const optionalText = z.string().trim().max(500).optional();
const optionalShort = z.string().trim().max(100).optional();
const longText = z.string().trim().max(5000);
const emailField = z.string().trim().toLowerCase().email().max(320);

export const openTalentSchema = z.object({
  // Honeypot — hidden from real users; bots tend to fill it.
  company_website_confirm: z.string().max(200).optional(),
  // Epoch ms captured when the form mounted; powers the submit-time check.
  renderedAt: z.coerce.number().optional(),

  // Required
  firstName: shortText,
  lastName: shortText,
  email: emailField,
  location: shortText,
  areaOfInterest: z.string().trim().min(1).max(100),
  whyInterested: longText.min(1),

  // Optional
  phone: optionalText,
  currentRole: optionalText,
  yearsExperience: optionalShort,
  linkedin: optionalText,
  portfolio: optionalText,
  preferredWorkType: optionalShort,
  availability: optionalShort,
  workAuthorization: optionalText,
  securityClearance: optionalText,
});

export type OpenTalentInput = z.infer<typeof openTalentSchema>;

// --- Helpers ---------------------------------------------------------------

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rows(d: OpenTalentInput): Array<[string, string]> {
  const out: Array<[string, string | undefined]> = [
    ["First name", d.firstName],
    ["Last name", d.lastName],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Location", d.location],
    ["Current role", d.currentRole],
    ["Years of experience", d.yearsExperience],
    ["LinkedIn", d.linkedin],
    ["Portfolio / GitHub", d.portfolio],
    ["Primary area of interest", d.areaOfInterest],
    ["Preferred work type", d.preferredWorkType],
    ["Availability timeline", d.availability],
    ["Work authorization note", d.workAuthorization],
    ["Security clearance note", d.securityClearance],
    ["Why interested in Mythos", d.whyInterested],
  ];

  return out.filter(
    (entry): entry is [string, string] =>
      entry[1] != null && entry[1].trim() !== "",
  );
}

// --- Public API ------------------------------------------------------------

export interface BuiltOpenTalentEmail {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}

const FOOTER_NOTE =
  "This application was submitted through the Mythos AI Security Careers page. Applicant data should be handled carefully and not forwarded outside approved review channels.";

export function buildOpenTalentEmail(d: OpenTalentInput): BuiltOpenTalentEmail {
  const subject = oneLine(
    `New Open Talent Application — ${d.firstName} ${d.lastName} — ${d.areaOfInterest}`,
  ).slice(0, 200);

  const fieldRows = rows(d);

  const text = [
    "New Open Talent Application",
    "",
    ...fieldRows.map(([key, value]) => `${key}: ${value}`),
    "",
    "Resume attached.",
    "",
    `— ${FOOTER_NOTE}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;background:#0b0b0c;padding:24px;font-family:Inter,Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d6;border-radius:10px;overflow:hidden;">
    <div style="background:#12100E;padding:18px 24px;">
      <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#D6A14A;">Mythos AI Security · Careers</p>
      <p style="margin:6px 0 0;font-size:16px;color:#F3E8D0;">New Open Talent Application</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${fieldRows
        .map(
          ([key, value]) => `<tr>
        <td style="padding:11px 24px;border-bottom:1px solid #f0ece1;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#8a8270;width:34%;vertical-align:top;">${escapeHtml(key)}</td>
        <td style="padding:11px 24px;border-bottom:1px solid #f0ece1;font-size:14px;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
        )
        .join("")}
      <tr>
        <td style="padding:11px 24px;border-bottom:1px solid #f0ece1;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#8a8270;width:34%;vertical-align:top;">Resume</td>
        <td style="padding:11px 24px;border-bottom:1px solid #f0ece1;font-size:14px;color:#1a1a1a;">Attached to this email.</td>
      </tr>
    </table>
    <div style="padding:14px 24px;background:#faf7f0;">
      <p style="margin:0;font-size:12px;color:#8a8270;">${escapeHtml(FOOTER_NOTE)} Reply directly to respond to ${escapeHtml(d.email)}.</p>
    </div>
  </div>
</body>
</html>`;

  return { subject, html, text, replyTo: d.email };
}
