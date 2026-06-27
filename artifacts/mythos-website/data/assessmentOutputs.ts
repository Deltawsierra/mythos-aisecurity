export type DeliverableIcon =
  | "report"
  | "findings"
  | "evidence"
  | "riskmap"
  | "backlog"
  | "retest";

export interface Deliverable {
  id: string;
  icon: DeliverableIcon;
  title: string;
  body: string;
  /** Who inside the customer organization uses this deliverable. */
  usefulFor: string;
  /** Concrete contents — shown as tag chips when the card is expanded. */
  includes: string[];
}

export const DELIVERABLES: Deliverable[] = [
  {
    id: "executive-readiness-report",
    icon: "report",
    title: "Executive Readiness Report",
    body: "A leadership-ready summary of the reviewed AI system, readiness posture, major blockers, business impact, and recommended deployment path.",
    usefulFor:
      "Leadership, product owners, security leaders, legal/compliance, and risk owners.",
    includes: [
      "Overall readiness posture",
      "Top findings",
      "Deployment recommendation",
      "Critical blockers",
      "Risk narrative",
      "Retest requirement",
    ],
  },
  {
    id: "technical-findings-appendix",
    icon: "findings",
    title: "Technical Findings Appendix",
    body: "A detailed technical record of what was observed, why it matters, how severe it is, and what needs to be fixed.",
    usefulFor:
      "Engineering, security, AI platform teams, data teams, and technical owners.",
    includes: [
      "Finding ID",
      "Severity",
      "Affected component",
      "Observed behavior",
      "Expected behavior",
      "Business impact",
      "Root cause",
      "Remediation guidance",
      "Retest criteria",
    ],
  },
  {
    id: "evidence-pack",
    icon: "evidence",
    title: "Evidence Pack",
    body: "A structured collection of proof material showing what was tested, what happened, and what supports each finding.",
    usefulFor:
      "Security review, audit, compliance, incident review, procurement, and internal approval.",
    includes: [
      "Redacted prompts",
      "Test traces",
      "Screenshots",
      "Logs",
      "Retrieval examples",
      "Tool-call evidence",
      "Source maps",
      "Role-boundary tests",
      "Before/after retest material",
    ],
  },
  {
    id: "risk-and-control-map",
    icon: "riskmap",
    title: "Risk and Control Map",
    body: "A visual and structured map of what the AI can access, where requests go, what tools it can use, and which controls apply.",
    usefulFor:
      "Security architecture, AI governance, data governance, compliance, and platform teams.",
    includes: [
      "Connected systems",
      "Data sources",
      "Identity paths",
      "Model/provider routes",
      "Tool permissions",
      "Approval gates",
      "Human review points",
      "Control gaps",
    ],
  },
  {
    id: "remediation-backlog",
    icon: "backlog",
    title: "Remediation Backlog",
    body: "A prioritized list of fixes tied directly to findings, owners, acceptance criteria, and retest expectations.",
    usefulFor:
      "Engineering managers, security teams, product owners, and implementation teams.",
    includes: [
      "Priority",
      "Related finding",
      "Suggested owner",
      "Acceptance criteria",
      "Fix guidance",
      "Validation requirement",
      "Retest dependency",
    ],
  },
  {
    id: "retest-proof",
    icon: "retest",
    title: "Retest Proof",
    body: "Evidence that remediation actually changed the system behavior before deployment expands.",
    usefulFor:
      "Release gates, security signoff, compliance review, product leadership, and operational approval.",
    includes: [
      "Fix applied",
      "Scenario retested",
      "Pass / partial / fail status",
      "Residual risk",
      "Evidence links",
      "Updated recommendation",
      "Release decision support",
    ],
  },
];

export interface FlowStep {
  title: string;
  description: string;
}

export const OUTPUT_FLOW: FlowStep[] = [
  {
    title: "Finding",
    description:
      "The assessment identifies a specific behavior, exposure, control gap, or evidence weakness.",
  },
  {
    title: "Impact",
    description:
      "The finding is translated into business, security, operational, compliance, or deployment risk.",
  },
  {
    title: "Remediation",
    description:
      "The customer receives practical guidance and acceptance criteria for fixing the issue.",
  },
  {
    title: "Retest",
    description:
      "The corrected system is tested again to confirm whether the issue is closed.",
  },
  {
    title: "Decision",
    description:
      "The updated evidence supports a release, pilot, restriction, delay, or block recommendation.",
  },
];

export const OUTPUT_FLOW_LABEL =
  "Finding → Impact → Remediation → Retest → Decision";

export interface SnapshotRow {
  label: string;
  value: string;
  /** Optional small severity badge shown next to the label. */
  badge?: string;
}

export interface AssessmentSnapshotData {
  assessment: string;
  readiness: string;
  rows: SnapshotRow[];
}

export const ASSESSMENT_SNAPSHOT: AssessmentSnapshotData = {
  assessment: "AI Agent With Tools and Actions",
  readiness: "Yellow / Conditional",
  rows: [
    {
      label: "Recommendation",
      value:
        "Draft-only pilot may continue. Production write actions remain blocked pending approval-gate remediation and retest.",
    },
    {
      label: "Top finding",
      value:
        "Backend approval enforcement missing for external-send action.",
      badge: "High",
    },
    {
      label: "Evidence",
      value: "Tool call executed without approval token in staging test.",
    },
    {
      label: "Required fix",
      value:
        "Require approval_id, approver_id, exact action binding, expiration, and audit logging before execution.",
    },
    {
      label: "Retest",
      value: "Required before production action-taking.",
    },
  ],
};
