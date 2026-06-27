/**
 * Configuration for the Mythos contact inquiry flow (Phase 10G).
 *
 * The contact form is a single controlled form whose selected `inquiryType`
 * drives the conditional fieldset, submit label, and confirmation copy. All of
 * that per-type content lives here so the form component stays readable.
 *
 * Every field posts to the single /api/inquiries endpoint with
 * `formType: "contact"`; the conditional field names below are accepted as
 * optional fields on the backend contact schema.
 */

export type InquiryValue =
  | "assessment"
  | "demo"
  | "investor"
  | "partnership"
  | "general";

export interface SelectField {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
}

export interface TextField {
  name: string;
  label: string;
  placeholder?: string;
}

export interface CheckboxField {
  name: string;
  /** Value submitted when checked (absent when unchecked). */
  value: string;
  label: string;
}

export interface InquiryDef {
  value: InquiryValue;
  /** Selector title + submit-context label. */
  label: string;
  /** Selector description. */
  description: string;
  /** Conditional fieldset legend. */
  detailsLegend: string;
  /** Submit button label for this inquiry type. */
  submitLabel: string;
  confirmHeading: string;
  confirmBody: string;
  selects: SelectField[];
  texts?: TextField[];
  checkbox?: CheckboxField;
}

/** Maps a ?intent= query value to an inquiry type. */
export const INTENT_MAP: Record<string, InquiryValue> = {
  assessment: "assessment",
  demo: "demo",
  investor: "investor",
  partner: "partnership",
  partnership: "partnership",
  general: "general",
};

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "This month",
  "This quarter",
  "Exploring for later",
  "Not sure yet",
];

export const INQUIRIES: InquiryDef[] = [
  {
    value: "assessment",
    label: "Request Assessment",
    description:
      "Start a scoped Mythos review for an AI assistant, agent, copilot, integration, workflow, or strategic scenario.",
    detailsLegend: "Assessment details",
    submitLabel: "Request Assessment",
    confirmHeading: "Assessment request received.",
    confirmBody:
      "Mythos will review your inquiry and identify the appropriate assessment path based on the system, deployment stage, and risk concerns you provided.",
    selects: [
      {
        name: "aiSystemType",
        label: "AI system type",
        placeholder: "Select AI system type",
        options: [
          "Customer support AI agent",
          "Internal knowledge / RAG assistant",
          "AI agent with tools/actions",
          "Regulated workflow assistant",
          "Partner/vendor AI integration",
          "Executive/employee copilot",
          "Developer AI assistant",
          "AI-powered decision support",
          "Public sector / mission workflow",
          "Data platform / cloud AI integration",
          "AI-driven vehicle / Hermes-related scenario",
          "Quantum-adjacent / strategic R&D scenario",
          "Other / not sure",
        ],
      },
      {
        name: "deploymentStage",
        label: "Deployment stage",
        placeholder: "Select deployment stage",
        options: [
          "Idea / planning",
          "Prototype",
          "Internal sandbox",
          "Staging",
          "Limited pilot",
          "Production",
          "Expanding access",
          "Post-incident / retest",
          "Not sure",
        ],
      },
      {
        name: "primaryConcern",
        label: "Primary concern",
        placeholder: "Select primary concern",
        options: [
          "Data exposure",
          "Prompt injection",
          "Tool/action risk",
          "RAG/retrieval boundaries",
          "Model/provider route risk",
          "Compliance / audit evidence",
          "Vendor risk",
          "Cloud/data platform access",
          "Human approval / decision support",
          "Vehicle/autonomy/fleet risk",
          "Post-quantum / cryptographic readiness",
          "Not sure yet",
        ],
      },
      {
        name: "assessmentUrgency",
        label: "Assessment urgency",
        placeholder: "Select urgency",
        options: [
          "Immediate blocker",
          "Before pilot",
          "Before production",
          "Before expanding access",
          "After remediation",
          "Exploratory",
        ],
      },
    ],
    checkbox: {
      name: "ndaInterest",
      value: "Can share more technical detail under NDA / scoped conversation",
      label:
        "I can share more technical detail under an appropriate NDA or scoped conversation.",
    },
  },
  {
    value: "demo",
    label: "Request Demo",
    description:
      "Request a private walkthrough of the Mythos assessment workflow, evidence outputs, and deployment decision path.",
    detailsLegend: "Demo details",
    submitLabel: "Request Demo",
    confirmHeading: "Demo request received.",
    confirmBody:
      "Mythos will review your request and follow up about the appropriate walkthrough format.",
    selects: [
      {
        name: "demoInterest",
        label: "Demo interest",
        placeholder: "Select demo interest",
        options: [
          "Athena assessment workflow",
          "Achilles behavior validation",
          "Use case walkthrough",
          "Evidence pack / report outputs",
          "Assessment process",
          "Investor/product overview",
          "Not sure",
        ],
      },
      {
        name: "demoAttendees",
        label: "Who should attend",
        placeholder: "Select attendees",
        options: [
          "Founder / executive",
          "Security team",
          "AI/product team",
          "Engineering team",
          "Compliance / risk team",
          "Investor / partner team",
          "Mixed group",
        ],
      },
      {
        name: "demoFormat",
        label: "Preferred demo format",
        placeholder: "Select format",
        options: [
          "Short intro walkthrough",
          "Technical walkthrough",
          "Executive overview",
          "Investor overview",
          "Not sure",
        ],
      },
    ],
  },
  {
    value: "investor",
    label: "Investor Inquiry",
    description:
      "Request investor materials or start a conversation about the Mythos investment thesis and roadmap.",
    detailsLegend: "Investor details",
    submitLabel: "Request Investor Materials",
    confirmHeading: "Investor inquiry received.",
    confirmBody:
      "Mythos will review your request for investor materials or an introductory conversation.",
    selects: [
      {
        name: "investorType",
        label: "Investor type",
        placeholder: "Select investor type",
        options: [
          "VC / institutional investor",
          "Angel investor",
          "Strategic investor",
          "Corporate venture",
          "Family office",
          "Other",
        ],
      },
      {
        name: "investorInterest",
        label: "Interest",
        placeholder: "Select interest",
        options: [
          "Investor deck",
          "Intro call",
          "Product roadmap",
          "Market thesis",
          "Strategic partnership",
          "Other",
        ],
      },
    ],
    texts: [
      {
        name: "fundName",
        label: "Fund / firm name",
        placeholder: "Fund or firm name",
      },
    ],
    checkbox: {
      name: "investorAck",
      value: "Acknowledged — some information may be shared only after review",
      label:
        "I am requesting investor materials and understand some information may be shared only after appropriate review.",
    },
  },
  {
    value: "partnership",
    label: "Partnership Inquiry",
    description:
      "Explore technical, channel, research, integration, or strategic partnership opportunities.",
    detailsLegend: "Partnership details",
    submitLabel: "Submit Partnership Inquiry",
    confirmHeading: "Partnership inquiry received.",
    confirmBody:
      "Mythos will review the opportunity and determine the appropriate follow-up path.",
    selects: [
      {
        name: "partnershipType",
        label: "Partnership type",
        placeholder: "Select partnership type",
        options: [
          "Technology integration",
          "Cloud/data platform partnership",
          "Compliance/GRC partnership",
          "MSSP / consultancy channel",
          "Research collaboration",
          "Quantum / advanced computing exploration",
          "Vehicle / autonomy / Hermes-related exploration",
          "Investor / strategic partnership",
          "Other",
        ],
      },
      {
        name: "partnershipStage",
        label: "Partnership stage",
        placeholder: "Select partnership stage",
        options: [
          "Exploring",
          "Specific opportunity",
          "Existing customer need",
          "Technical integration idea",
          "Research concept",
          "Other",
        ],
      },
    ],
  },
  {
    value: "general",
    label: "General Inquiry",
    description: "Contact Mythos about another topic.",
    detailsLegend: "General details",
    submitLabel: "Submit Inquiry",
    confirmHeading: "Inquiry received.",
    confirmBody: "Mythos will review your message and follow up if appropriate.",
    selects: [
      {
        name: "topic",
        label: "Topic",
        placeholder: "Select a topic",
        options: [
          "General question",
          "Press / media",
          "Recruiting / careers",
          "Website issue",
          "Other",
        ],
      },
    ],
  },
];

export function getInquiry(value: InquiryValue): InquiryDef {
  return INQUIRIES.find((i) => i.value === value) ?? INQUIRIES[0];
}
