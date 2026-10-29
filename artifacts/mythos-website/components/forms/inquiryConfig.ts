/**
 * Configuration for the Mythos contact inquiry flow (owner spec, 28 Oct).
 *
 * Each inquiry type loads its own short form: the questions, which are
 * required, the main message prompt, the submit label and the confirmation.
 * Name, email and optional phone are shared. A question with `showIf` appears
 * only when another answer matches; a hidden question is neither required
 * nor submitted. Answers are kept by field name, so switching types keeps
 * whatever the visitor already typed (organization and message included).
 *
 * Everything posts to /api/inquiries with `formType: "contact"`:
 * `organization` and `message` travel as top-level fields and every other
 * visible answer as a `details` question/answer pair.
 */

export type InquiryValue =
  | "assessment"
  | "demo"
  | "investor"
  | "partnership"
  | "press"
  | "careers"
  | "general";

export interface FormField {
  /** State key and, for `organization`/`message`, the API field. */
  name: string;
  label: string;
  kind: "text" | "url" | "textarea" | "select" | "radio" | "checkboxes" | "checkbox" | "date" | "time";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  /** Spans both columns (selects and short text sit two to a row otherwise). */
  wide?: boolean;
  /** Shown only when another field's answer is (anyOf) or is not (noneOf) one of these. */
  showIf?: { field: string; anyOf?: string[]; noneOf?: string[] };
}

export interface InquiryDef {
  value: InquiryValue;
  /** Selector title. */
  label: string;
  /** Selector description. */
  description: string;
  fields: FormField[];
  submitLabel: string;
  confirmHeading: string;
  confirmBody: string;
}

/** Maps a ?intent= query value to an inquiry type. */
export const INTENT_MAP: Record<string, InquiryValue> = {
  assessment: "assessment",
  demo: "demo",
  investor: "investor",
  partner: "partnership",
  partnership: "partnership",
  press: "press",
  media: "press",
  careers: "careers",
  jobs: "careers",
  general: "general",
};

const TIMEFRAME = ["As soon as possible", "Within a month", "Within a quarter", "Later this year", "Not sure"];

const organization = (required: boolean): FormField => ({
  name: "organization",
  label: "Company / organization",
  kind: "text",
  required,
  placeholder: required ? "Organization name" : "Optional",
});

const message = (label: string, required = true, placeholder?: string): FormField => ({
  name: "message",
  label,
  kind: "textarea",
  required,
  wide: true,
  placeholder,
});

export const INQUIRIES: InquiryDef[] = [
  {
    value: "assessment",
    label: "Request Assessment",
    description: "A scoped review of an AI assistant, agent, workflow or the system it runs in.",
    fields: [
      organization(true),
      {
        name: "assessTarget",
        label: "What would you like assessed?",
        kind: "select",
        required: true,
        options: ["AI assistant", "AI agent", "AI workflow / integration", "Business application / system", "Multiple systems", "Not sure"],
      },
      {
        name: "stage",
        label: "Current stage",
        kind: "select",
        required: true,
        options: ["Planning", "Development", "Pilot", "Production", "Not sure"],
      },
      {
        name: "agentAccess",
        label: "What can it access or do?",
        kind: "checkboxes",
        wide: true,
        options: ["Read data", "Change records", "Send messages", "Run code", "Not sure"],
        showIf: { field: "assessTarget", anyOf: ["AI agent", "AI workflow / integration"] },
      },
      {
        name: "testEnvironment",
        label: "Is a separate testing environment available?",
        kind: "radio",
        wide: true,
        options: ["Yes", "No", "Not sure"],
        showIf: { field: "stage", anyOf: ["Production"] },
      },
      message("What does it do, and what would you like tested?", true, "A sentence or two is enough. Detailed inventory and scope come in the follow-up conversation."),
      {
        name: "concerns",
        label: "Main concerns",
        kind: "checkboxes",
        wide: true,
        options: ["Unauthorized access", "Data exposure", "Misuse of tools or actions", "Prompt injection", "Release readiness", "Other"],
      },
      {
        name: "systemCount",
        label: "Approximate number of systems or agents",
        kind: "select",
        options: ["1", "2–5", "6–20", "More than 20", "Not sure"],
      },
      { name: "timeframe", label: "Desired timeframe", kind: "select", options: TIMEFRAME },
    ],
    submitLabel: "Request an assessment",
    confirmHeading: "Assessment request received.",
    confirmBody:
      "Mythos AI Security will review what you sent and suggest a scoping conversation. Detailed systems, access and pricing scope are covered there, under an agreement where needed.",
  },
  {
    value: "demo",
    label: "Request Demo",
    description: "A private walkthrough of how an assessment runs and what it produces.",
    fields: [
      organization(true),
      {
        name: "demoFocus",
        label: "What would you like to see?",
        kind: "select",
        required: true,
        options: ["General overview", "Assessment process", "Findings and reports", "Remediation and retesting", "Other"],
      },
      { name: "jobTitle", label: "Job title", kind: "text", placeholder: "Optional" },
      message("What are you hoping to learn?", false, "Optional"),
    ],
    submitLabel: "Request a demo",
    confirmHeading: "Demo request received.",
    confirmBody: "Mythos AI Security will reply to arrange a walkthrough that covers what you asked to see.",
  },
  {
    value: "investor",
    label: "Investor Inquiry",
    description: "Start a conversation about the Mythos AI Security thesis.",
    fields: [
      {
        name: "investorType",
        label: "Investor type",
        kind: "select",
        required: true,
        options: ["Individual / angel", "Venture fund", "Corporate investor", "Family office", "Other"],
      },
      message("What would you like to discuss?"),
      {
        name: "firmName",
        label: "Firm or fund name",
        kind: "text",
        placeholder: "Optional",
        showIf: { field: "investorType", anyOf: ["Venture fund", "Corporate investor", "Family office", "Other"] },
      },
      {
        name: "firmWebsite",
        label: "Firm website",
        kind: "url",
        placeholder: "https://",
        showIf: { field: "investorType", anyOf: ["Venture fund", "Corporate investor", "Family office", "Other"] },
      },
      { name: "investmentFocus", label: "Investment focus or stage", kind: "text", placeholder: "Optional" },
      { name: "introducedBy", label: "Who introduced you to Mythos AI Security?", kind: "text", placeholder: "Optional" },
    ],
    submitLabel: "Send investor inquiry",
    confirmHeading: "Investor inquiry received.",
    confirmBody:
      "Mythos AI Security will review your note and reply about an introductory conversation. Please don’t send financial documents through this form.",
  },
  {
    value: "partnership",
    label: "Partnership Inquiry",
    description: "Technology, channel, research or strategic partnerships.",
    fields: [
      {
        name: "partnershipType",
        label: "Partnership type",
        kind: "select",
        required: true,
        options: ["Technology / integration", "Channel / referral", "Research", "Strategic", "Other"],
      },
      {
        name: "platform",
        label: "Relevant platform or product",
        kind: "text",
        placeholder: "Optional",
        showIf: { field: "partnershipType", anyOf: ["Technology / integration"] },
      },
      {
        name: "marketsServed",
        label: "Customer types or markets served",
        kind: "text",
        placeholder: "Optional",
        showIf: { field: "partnershipType", anyOf: ["Channel / referral"] },
      },
      {
        name: "researchTopic",
        label: "Research topic",
        kind: "text",
        placeholder: "Optional",
        showIf: { field: "partnershipType", anyOf: ["Research"] },
      },
      {
        name: "institution",
        label: "Institution, if applicable",
        kind: "text",
        placeholder: "Optional",
        showIf: { field: "partnershipType", anyOf: ["Research"] },
      },
      message("What partnership are you proposing?"),
      organization(false),
      { name: "orgWebsite", label: "Organization website", kind: "url", placeholder: "https://" },
      { name: "projectLink", label: "Relevant product or project link", kind: "url", placeholder: "https://" },
      { name: "timeframe", label: "Desired timeframe", kind: "select", options: TIMEFRAME },
    ],
    submitLabel: "Discuss a partnership",
    confirmHeading: "Partnership inquiry received.",
    confirmBody: "Mythos AI Security will review the proposal and reply about the right next step.",
  },
  {
    value: "press",
    label: "Press Inquiry",
    description: "Interviews, comment, company information or media assets.",
    fields: [
      { name: "independentJournalist", label: "I’m an independent journalist", kind: "checkbox", wide: true },
      {
        name: "outlet",
        label: "Publication / outlet",
        kind: "text",
        required: true,
        placeholder: "Publication or outlet",
        showIf: { field: "independentJournalist", noneOf: ["Yes"] },
      },
      {
        name: "requestType",
        label: "Request type",
        kind: "select",
        required: true,
        options: ["Interview", "Comment or quote", "Company information", "Media assets", "Other"],
      },
      message("What is your story or request about?"),
      { name: "profileLink", label: "Publication or professional profile link", kind: "url", placeholder: "https://" },
      { name: "spokesperson", label: "Requested spokesperson", kind: "text", placeholder: "Optional" },
      { name: "hasDeadline", label: "Do you have a deadline?", kind: "radio", wide: true, options: ["Yes", "No"] },
      { name: "deadlineDate", label: "Deadline date", kind: "date", required: true, showIf: { field: "hasDeadline", anyOf: ["Yes"] } },
      { name: "deadlineTime", label: "Time", kind: "time", showIf: { field: "hasDeadline", anyOf: ["Yes"] } },
      {
        name: "deadlineTimeZone",
        label: "Time zone",
        kind: "text",
        placeholder: "e.g. ET, GMT+1",
        showIf: { field: "hasDeadline", anyOf: ["Yes"] },
      },
    ],
    submitLabel: "Send press inquiry",
    confirmHeading: "Press inquiry received.",
    confirmBody: "Mythos AI Security will reply to the address you gave, with your deadline in mind if you shared one.",
  },
  {
    value: "careers",
    label: "Careers",
    description: "No roles are open right now. Tell us what you would like to work on.",
    fields: [
      {
        name: "careersArea",
        label: "Area of interest",
        kind: "select",
        required: true,
        options: ["Engineering", "AI / security research", "Product / design", "Operations", "Business development", "Other"],
      },
      message("What would you like to work on, and what relevant experience would you bring?"),
      { name: "profileLink", label: "LinkedIn, portfolio or GitHub link", kind: "url", placeholder: "https://" },
      { name: "location", label: "Location or time zone", kind: "text", placeholder: "Optional" },
    ],
    submitLabel: "Express interest",
    confirmHeading: "Thanks for your interest.",
    confirmBody:
      "There are no current openings, and this is not an application for a specific role. When a role opens, it will be listed on the Careers page with how to apply.",
  },
  {
    value: "general",
    label: "General Inquiry",
    description: "Anything else.",
    fields: [
      organization(false),
      { name: "subject", label: "Subject", kind: "text", placeholder: "Optional" },
      message("How can we help?"),
    ],
    submitLabel: "Send message",
    confirmHeading: "Message received.",
    confirmBody: "Mythos AI Security will read your message and reply if a response is needed.",
  },
];

export function getInquiry(value: InquiryValue): InquiryDef {
  return INQUIRIES.find((i) => i.value === value) ?? INQUIRIES[0];
}

export type FormValues = Record<string, string | string[]>;

/** Whether a field is shown for the current answers. */
export function isVisible(field: FormField, values: FormValues): boolean {
  if (!field.showIf) return true;
  const raw = values[field.showIf.field];
  const answers = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const { anyOf, noneOf } = field.showIf;
  if (anyOf && !answers.some((a) => anyOf.includes(a))) return false;
  if (noneOf && answers.some((a) => noneOf.includes(a))) return false;
  return true;
}
