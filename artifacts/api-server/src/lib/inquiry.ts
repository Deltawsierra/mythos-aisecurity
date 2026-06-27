import { z } from "zod";

/**
 * Validation, subject-mapping, and email templating for every Mythos website
 * form. All three forms (contact / demo / investor) post to a single endpoint;
 * the `formType` discriminator selects the field set and the subject prefix.
 */

// Honeypot + timing meta fields shared by every form.
const metaFields = {
  /** Honeypot — hidden from real users; bots tend to fill it. */
  company_website_confirm: z.string().max(200).optional(),
  /** Epoch ms captured when the form mounted; powers the submit-time check. */
  renderedAt: z.number().optional(),
};

const shortText = z.string().trim().min(1).max(200);
const optionalText = z.string().trim().max(500).optional();
const longText = z.string().trim().max(5000);
const emailField = z.string().trim().toLowerCase().email().max(320);

export const CONTACT_INQUIRY_TYPES = [
  "platform",
  "demo",
  "investor",
  "partnership",
  "assessment",
  "general",
  "other",
] as const;

const contactSchema = z.object({
  formType: z.literal("contact"),
  ...metaFields,
  inquiryType: z.enum(CONTACT_INQUIRY_TYPES),
  name: shortText,
  email: emailField,
  organization: shortText,
  role: shortText,
  message: longText.min(1),
  phone: optionalText,
  website: optionalText,
  companySize: optionalText,
  industry: optionalText,
  timeline: optionalText,
  // Assessment conditional fields
  aiSystemType: optionalText,
  deploymentStage: optionalText,
  primaryConcern: optionalText,
  assessmentUrgency: optionalText,
  ndaInterest: optionalText,
  // Demo conditional fields
  demoInterest: optionalText,
  demoAttendees: optionalText,
  demoFormat: optionalText,
  // Investor conditional fields
  investorType: optionalText,
  investorInterest: optionalText,
  fundName: optionalText,
  investorAck: optionalText,
  // Partnership conditional fields
  partnershipType: optionalText,
  partnershipStage: optionalText,
  // General conditional field
  topic: optionalText,
});

const demoSchema = z.object({
  formType: z.literal("demo"),
  ...metaFields,
  name: shortText,
  email: emailField,
  organization: shortText,
  role: shortText,
  inquiryType: z.string().trim().min(1).max(100),
  acknowledge: z.literal(true),
  website: optionalText,
  companySize: optionalText,
  industry: optionalText,
  timeline: optionalText,
  aiSystem: longText.optional(),
  riskConcern: longText.optional(),
  message: longText.optional(),
});

const investorSchema = z.object({
  formType: z.literal("investor"),
  ...metaFields,
  name: shortText,
  email: emailField,
  firm: shortText,
  role: shortText,
  investorType: z.string().trim().min(1).max(100),
  acknowledge: z.literal(true),
  website: optionalText,
  checkSize: optionalText,
  areaOfInterest: optionalText,
  referralSource: optionalText,
  message: longText.optional(),
});

export const inquirySchema = z.discriminatedUnion("formType", [
  contactSchema,
  demoSchema,
  investorSchema,
]);

export type InquiryInput = z.infer<typeof inquirySchema>;
type ContactInquiryType = (typeof CONTACT_INQUIRY_TYPES)[number];

// --- Subject prefixes ------------------------------------------------------

const CONTACT_PREFIX: Record<ContactInquiryType, string> = {
  platform: "[Mythos Platform Evaluation]",
  demo: "[Mythos Demo Request]",
  investor: "[Mythos Investor Materials]",
  partnership: "[Mythos Partnership Inquiry]",
  assessment: "[Mythos Assessment Inquiry]",
  general: "[Mythos General Inquiry]",
  other: "[Mythos Other Inquiry]",
};

// The demo form's inquiry select uses human labels rather than slugs.
const DEMO_PREFIX: Record<string, string> = {
  "request demo video": "[Mythos Demo Request]",
  "platform evaluation": "[Mythos Platform Evaluation]",
  "assessment inquiry": "[Mythos Assessment Inquiry]",
  "partnership inquiry": "[Mythos Partnership Inquiry]",
  "investor inquiry": "[Mythos Investor Materials]",
  other: "[Mythos Other Inquiry]",
};

const CONTACT_LABELS: Record<ContactInquiryType, string> = {
  platform: "Platform evaluation",
  demo: "Request Demo",
  investor: "Investor inquiry",
  partnership: "Partnership inquiry",
  assessment: "Request Assessment",
  general: "General inquiry",
  other: "Other",
};

function subjectPrefix(data: InquiryInput): string {
  switch (data.formType) {
    case "investor":
      return "[Mythos Investor Materials]";
    case "contact":
      return CONTACT_PREFIX[data.inquiryType] ?? "[Mythos Contact]";
    case "demo":
      return DEMO_PREFIX[data.inquiryType.trim().toLowerCase()] ?? "[Mythos Demo Request]";
    default:
      return "[Mythos Contact]";
  }
}

function formLabel(formType: InquiryInput["formType"]): string {
  switch (formType) {
    case "contact":
      return "Contact";
    case "demo":
      return "Demo Request";
    case "investor":
      return "Investor Materials";
    default:
      return "Contact";
  }
}

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

function rows(data: InquiryInput): Array<[string, string]> {
  const out: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Email", data.email],
  ];

  if (data.formType === "investor") {
    out.push(
      ["Firm / organization", data.firm],
      ["Role / title", data.role],
      ["Investor type", data.investorType],
      ["Website", data.website],
      ["Check size / range", data.checkSize],
      ["Area of interest", data.areaOfInterest],
      ["How they heard about Mythos", data.referralSource],
      ["Message", data.message],
    );
  } else if (data.formType === "demo") {
    out.push(
      ["Organization", data.organization],
      ["Role / title", data.role],
      ["Inquiry type", data.inquiryType],
      ["Website", data.website],
      ["Company size", data.companySize],
      ["Industry", data.industry],
      ["Timeline", data.timeline],
      ["AI system / workflow", data.aiSystem],
      ["Primary risk concern", data.riskConcern],
      ["Message", data.message],
    );
  } else {
    out.push(
      ["Inquiry type", CONTACT_LABELS[data.inquiryType] ?? data.inquiryType],
      ["Organization", data.organization],
      ["Role / title", data.role],
      ["Phone", data.phone],
      ["Website", data.website],
      ["Preferred timeline", data.timeline],
      // Assessment
      ["AI system type", data.aiSystemType],
      ["Deployment stage", data.deploymentStage],
      ["Primary concern", data.primaryConcern],
      ["Assessment urgency", data.assessmentUrgency],
      ["NDA / scoped detail", data.ndaInterest],
      // Demo
      ["Demo interest", data.demoInterest],
      ["Who should attend", data.demoAttendees],
      ["Preferred demo format", data.demoFormat],
      // Investor
      ["Investor type", data.investorType],
      ["Interest", data.investorInterest],
      ["Fund / firm name", data.fundName],
      ["Investor acknowledgement", data.investorAck],
      // Partnership
      ["Partnership type", data.partnershipType],
      ["Partnership stage", data.partnershipStage],
      // General
      ["Topic", data.topic],
      ["Message", data.message],
    );
  }

  return out.filter(
    (entry): entry is [string, string] =>
      entry[1] != null && entry[1].trim() !== "",
  );
}

// --- Public API ------------------------------------------------------------

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}

export function buildEmail(data: InquiryInput): BuiltEmail {
  const prefix = subjectPrefix(data);
  const org = data.formType === "investor" ? data.firm : data.organization;
  const subject = oneLine(`${prefix} ${data.name} — ${org}`).slice(0, 200);
  const fieldRows = rows(data);
  const label = formLabel(data.formType);

  const text = [
    prefix,
    "",
    ...fieldRows.map(([key, value]) => `${key}: ${value}`),
    "",
    `— Submitted via the ${label} form on mythosaisecurity.com`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;background:#0b0b0c;padding:24px;font-family:Inter,Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d6;border-radius:10px;overflow:hidden;">
    <div style="background:#12100E;padding:18px 24px;">
      <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#D6A14A;">Mythos AI Security</p>
      <p style="margin:6px 0 0;font-size:16px;color:#F3E8D0;">${escapeHtml(prefix)}</p>
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
    </table>
    <div style="padding:14px 24px;background:#faf7f0;">
      <p style="margin:0;font-size:12px;color:#8a8270;">Submitted via the ${escapeHtml(label)} form on mythosaisecurity.com. Reply directly to respond to ${escapeHtml(data.email)}.</p>
    </div>
  </div>
</body>
</html>`;

  return { subject, html, text, replyTo: data.email };
}
