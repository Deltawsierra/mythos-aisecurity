/**
 * "How to Red-Team an AI Agent" - the first Mythos guide, by David Smith
 * (owner-supplied draft, 27 Oct 2026). Converted from the approved .docx with
 * the review fixes applied: product links point at each product page, the
 * Mythos section leads with what each part does, "plus six cross-channel
 * chains", and planted-case scores read as floors for those cases. The
 * "protection capabilities being added" paragraph stands on the owner's
 * ruling (claim article.protections-in-progress). Inline links use [text](href).
 */
import type { Article } from "@/components/articles/types";

export const RED_TEAM_AI_AGENTS: Article = {
  "slug": "how-to-red-team-ai-agents",
  "href": "/resources/how-to-red-team-ai-agents",
  "title": "How to Red-Team an AI Agent: What to Test Before It Touches Real Systems",
  "seoTitle": "How to Red-Team an AI Agent",
  "metaDescription": "A guide to red-teaming AI agents: what to test, how to scope it, how to judge results and what evidence to keep before an agent acts on real systems.",
  "eyebrow": "Guide · AI agent red teaming",
  "published": "2026-10-27",
  "researchChecked": "2026-10-27",
  "readingMinutes": 13,
  "author": {
    "name": "David Smith",
    "role": "Co-founder and Chief Operating Officer, Mythos AI Security",
    "bio": "David Smith is Co-founder and Chief Operating Officer of Mythos AI Security, where he leads product direction, software architecture, development and AI research."
  },
  "checklist": {
    "href": "/assets/downloads/mythos-ai-agent-red-teaming-checklist.pdf",
    "label": "Download the one-page agent red-teaming checklist (PDF)"
  },
  "intro": [
    "Red-teaming an AI agent means testing, within an authorized scope, whether adversarial inputs can push its decisions or actions beyond approved boundaries. Examine the model alongside its tools, data access, permissions and approval controls. Compare expected decisions with independently observed outcomes, preserve the evidence, and retest repairs before expanding access.",
    "An agent that can issue refunds, send messages or change records needs a test plan for those consequences. A convincing refusal is useful evidence about a response. It does not establish that a backend action was prevented.",
    "This guide explains how to red-team an AI agent around one consequential workflow. It covers eight useful failure families, responsible scoping, outcome verification and retesting. The refund example is entirely synthetic: its policy, amounts and illustrated outcomes are teaching material, not customer findings or measured Mythos AI Security results."
  ],
  "sections": [
    {
      "id": "what-is-ai-red-teaming-and-how-does-it-differ-from-penetrati",
      "heading": "What is AI red teaming, and how does it differ from penetration testing or a benchmark?",
      "blocks": [
        {
          "type": "p",
          "text": "AI red teaming deliberately challenges an AI system to expose unwanted behavior. For an agent, the assessment includes its surrounding application and the authority available through tools. It complements software security testing and model evaluation."
        },
        {
          "type": "table",
          "head": [
            "Method",
            "Main question",
            "Typical evidence"
          ],
          "rows": [
            [
              "Penetration test",
              "Can an attacker exploit the application, identity or infrastructure?",
              "Validated vulnerabilities and attack paths within scope."
            ],
            [
              "Model or system evaluation",
              "How does this configuration perform against defined criteria?",
              "Scored outcomes, task results and limitations."
            ],
            [
              "Agent red team",
              "Can an adversary induce an unauthorized decision, disclosure or action?",
              "Adversarial trajectories tied to observed consequences."
            ]
          ]
        },
        {
          "type": "p",
          "text": "These categories overlap. Benchmarks can be dynamic and tool-based: [AgentDojo](https://arxiv.org/abs/2406.13352) evaluates agents working with tools and untrusted data. NIST's [2026 ARIA planning manual](https://www.nist.gov/publications/aria-evaluation-planning-manual-elements-aria-style-ai-evaluations) combines model testing, red teaming and user testing. A benchmark score and an adversarial assessment answer related questions; neither covers an entire deployment by itself."
        }
      ]
    },
    {
      "id": "why-do-ai-agents-change-the-risk",
      "heading": "Why do AI agents change the risk?",
      "blocks": [
        {
          "type": "p",
          "text": "Chatbots can already cause serious disclosure and content harms. Tools add direct operational effects. Delegated credentials determine which records an agent reaches; approvals determine when it may act."
        },
        {
          "type": "p",
          "text": "Our synthetic refund agent may refund up to $50 for the authenticated customer's eligible order. Larger refunds require a supervisor's approval for the exact transaction. A change to the customer, order or amount invalidates that approval. Customer ownership must hold at every amount."
        },
        {
          "type": "p",
          "text": "The assessment asks whether those rules survive adversarial input and execution. [OWASP Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) identifies excessive functionality, permissions and autonomy as related risks. Test backend authorization as well as model behavior."
        },
        {
          "type": "fits",
          "text": "[Athena's system mapping](/platform/athena) helps establish what the workflow can reach before testing or granting it more authority."
        }
      ]
    },
    {
      "id": "what-can-go-wrong-with-an-ai-agent",
      "heading": "What can go wrong with an AI agent?",
      "blocks": [
        {
          "type": "p",
          "text": "Use these eight families to organize a starter assessment. They overlap and are not a complete taxonomy."
        },
        {
          "type": "h3",
          "text": "1. Goal hijack and prompt injection"
        },
        {
          "type": "p",
          "text": "Can a user or external source redirect the task? Direct injection arrives through the request; indirect injection arrives through material the agent reads. Test whether an email, document or page can acquire authority over the user's instructions. [OWASP LLM01](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) describes this trust-boundary problem."
        },
        {
          "type": "h3",
          "text": "2. RAG data leakage"
        },
        {
          "type": "p",
          "text": "Retrieval-augmented generation, or RAG, supplies retrieved material to a model. Can it retrieve, quote or infer another customer's restricted information? Relevance is different from authorization. Test source access and returned content; [OWASP LLM08](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/) addresses retrieval and embedding risks."
        },
        {
          "type": "h3",
          "text": "3. Tool misuse"
        },
        {
          "type": "p",
          "text": "Can an otherwise permitted tool be used with an unauthorized destination, record or sequence? Include read tools that transmit parameters externally. Availability in a tool registry does not authorize every invocation."
        },
        {
          "type": "h3",
          "text": "4. Permission boundaries"
        },
        {
          "type": "p",
          "text": "Does the backend enforce the requesting user's tenant, object and action scope? Test narrower and revoked access, not only an administrator account. Prompt instructions cannot replace downstream checks."
        },
        {
          "type": "h3",
          "text": "5. Jailbreak resistance"
        },
        {
          "type": "p",
          "text": "Can sustained pressure bypass content or behavior restrictions? Jailbreaks concern policy bypass; prompt injection concerns instruction authority. They can overlap, but a harmful answer and an unauthorized transaction need different evidence."
        },
        {
          "type": "h3",
          "text": "6. Insecure output"
        },
        {
          "type": "p",
          "text": "Could generated text become executable code, a query or unsafe rendered content downstream? Test the receiving boundary. [OWASP Improper Output Handling](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/) treats insufficient validation and sanitization as a distinct risk."
        },
        {
          "type": "h3",
          "text": "7. MCP and tool integrity"
        },
        {
          "type": "p",
          "text": "Model Context Protocol connects AI applications with tools and resources. Assess changed descriptions, schemas, results, server identity and credentials. Its [security guidance](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices) covers implementation failures beyond prompt wording, including confused-deputy and token-handling risks."
        },
        {
          "type": "h3",
          "text": "8. Action and approval authority"
        },
        {
          "type": "p",
          "text": "Does approval authorize the actual transaction dispatched? Test changes after approval, expired permission, retries and duplicate submissions. A conversational yes must not become reusable authority for a different effect."
        },
        {
          "type": "fits",
          "text": "[Achilles](/platform/achilles) is the behavior-validation part of an agreed assessment. Coverage and available execution evidence belong in the scope."
        }
      ]
    },
    {
      "id": "why-is-one-prompt-not-enough",
      "heading": "Why is one prompt not enough?",
      "blocks": [
        {
          "type": "p",
          "text": "A single refusal tests one interaction. Include sustained requests, conflicting instructions, context changes and attempts after a refusal. Preserve earlier turns and tool results so reviewers can reconstruct the sequence."
        },
        {
          "type": "p",
          "text": "Vary the entry point across email, documents, web pages, MCP results and messages from other agents. Also test combined inputs: individually ordinary content can become consequential when composed. Persistent memory and handoffs deserve separate cases."
        },
        {
          "type": "p",
          "text": "For the refund workflow, check whether repeated small refunds exceed an aggregate policy limit, whether a retry duplicates a transaction, and whether revoked access remains usable. Define that aggregate limit in the test policy; do not invent it after observing a result."
        },
        {
          "type": "p",
          "text": "Use harmless markers and synthetic records. Record attempts, accepted requests and completed effects separately, including observable exits such as generated messages, files and tool arguments."
        }
      ]
    },
    {
      "id": "how-do-you-scope-an-ai-red-team-test-responsibly",
      "heading": "How do you scope an AI red-team test responsibly?",
      "blocks": [
        {
          "type": "p",
          "text": "Obtain written authorization from the responsible system owner. Owning an agent does not authorize testing every third-party service its credentials can reach. [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final) provides established assessment-planning and rules-of-engagement guidance."
        },
        {
          "type": "p",
          "text": "Agree on targets and exclusions, accounts and data, permitted techniques, test windows, contacts, work and spending limits, evidence handling, and stop conditions. Prefer an isolated test copy with payment simulators and synthetic customers. Record how it differs from production."
        },
        {
          "type": "p",
          "text": "Place stop and egress controls outside the tested agent's authority. Exercise the stop path before adversarial work. Do not give the agent permission to approve scope expansion. Destructive or production testing needs separate explicit authorization and operational safeguards."
        },
        {
          "type": "p",
          "text": "[Request an agent assessment](/contact) to define one workflow and the evidence needed for its next deployment decision."
        }
      ]
    },
    {
      "id": "how-do-you-judge-results-without-trusting-the-ai-s-explanati",
      "heading": "How do you judge results without trusting the AI's explanation?",
      "blocks": [
        {
          "type": "p",
          "text": "Write the expected decision before execution: permit the approved action, escalate for an authorized reviewer, hold while a prerequisite is unresolved, or deny the prohibited request. These are test-policy states, not universal framework labels."
        },
        {
          "type": "p",
          "text": "Compare that decision with the proposal, authorization result, dispatched call and provider outcome. Use a witness outside the tested model, such as a controlled ledger or validated provider audit record. A tool returning success may be misleading; check the authoritative state change."
        },
        {
          "type": "figure",
          "src": "/assets/articles/expected-vs-observed.webp",
          "width": 2200,
          "height": 1070,
          "alt": "Synthetic refund example comparing the expected decision with the observed outcome for four requests: an eligible $40 refund permitted (match), another customer's $40 refund that should be denied but changed their record (violation), a $150 refund escalated for review (match), and an approved $150 refund changed to $450 that should be held but was committed (violation).",
          "caption": "Synthetic refund example. Illustrative outcomes only; no test was executed."
        },
        {
          "type": "p",
          "text": "A refusal followed by an executed refund is a failure. An unsafe proposal blocked by a backend is a model-behavior finding with successful effect containment. Missing provider evidence makes the consequential outcome inconclusive. [CaMeL research](https://arxiv.org/abs/2503.18813) illustrates architectural separation of model processing from enforced tool policy; its research results do not validate another implementation."
        }
      ]
    },
    {
      "id": "how-do-you-avoid-false-confidence",
      "heading": "How do you avoid false confidence?",
      "blocks": [
        {
          "type": "p",
          "text": "Pair adversarial cases with legitimate requests. A defense that blocks every refund may prevent the tested abuse while making the service unusable. Measure legitimate completion, false blocks, escalation quality, latency and cost alongside security outcomes."
        },
        {
          "type": "p",
          "text": "State run counts, versions, available sampling settings and seeds, scorer criteria, retries and missing observations. Repeat consequential cases under a declared budget; disclose when hosted providers cannot reproduce a seed. Inspect individual failures as well as aggregate rates."
        },
        {
          "type": "p",
          "text": "Calibrate the harness with known-answer cases. Keep evaluation cases separate from examples used to construct the fix. [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) supports evaluation across the AI lifecycle and attention to measurement limitations."
        },
        {
          "type": "p",
          "text": "A pass rate describes the selected cases and configuration. Scores on planted test cases are floors for those cases, not a lower bound on how the deployed system behaves, and never proof of safety. Missing exits, skipped cases and failed runs must remain visible."
        },
        {
          "type": "fits",
          "text": "[Minotaur](/platform/validation) supports Mythos AI Security's internal adversarial validation. It is not a separate customer-facing red-team service."
        }
      ]
    },
    {
      "id": "what-evidence-should-you-keep",
      "heading": "What evidence should you keep?",
      "blocks": [
        {
          "type": "p",
          "text": "Keep the authorization and scope, tested deployment identity, policy version, inputs and source labels, relevant context boundaries, expected decision, proposed arguments, observed tool activity, provider outcome, scorer, reviewer and retest linkage. Record changed files, unavailable tool results and telemetry gaps. Minimize sensitive content and control evidence access."
        },
        {
          "type": "p",
          "text": "Signed records help detect changes to covered bytes and verify them under an accepted signing key. They do not prove the collector saw everything, the signer was authorized, or the conclusion is correct. [HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html) documents related coverage and verifier-policy concerns; it is not a claim that Mythos AI Security receipts implement that protocol."
        },
        {
          "type": "p",
          "text": "Keep response-only findings distinct from verified effects. Where offline verification is provided, retain the necessary verification material and scope. A receipt cannot turn an unobserved action into an observed one."
        }
      ]
    },
    {
      "id": "when-should-you-retest-an-ai-agent",
      "heading": "When should you retest an AI agent?",
      "blocks": [
        {
          "type": "p",
          "text": "Retest after a fix and review every change for its effect on existing conclusions. Model or provider changes, prompts, tools, schemas, permissions, approvals, retrieval sources, memory and serving routes can all affect prior evidence. Run targeted regressions for affected claims and broader tests when dependencies or uncertainty justify them."
        },
        {
          "type": "p",
          "text": "Close a finding as fixed only after the agreed security retest and legitimate-use checks support closure. Keep accepted residual risk, temporary restrictions and unverified repair separate from a validated fix. Reproduction of the original failure alone is not enough: check a relevant variant too."
        }
      ]
    },
    {
      "id": "how-does-agent-red-teaming-map-to-owasp-and-nist",
      "heading": "How does agent red teaming map to OWASP and NIST?",
      "blocks": [
        {
          "type": "p",
          "text": "The [OWASP LLM Top 10 for 2025](https://genai.owasp.org/llm-top-10/) is a risk taxonomy. This illustrative crosswalk groups the article's tests; it does not claim complete coverage."
        },
        {
          "type": "table",
          "head": [
            "Test focus",
            "Relevant OWASP 2025 risks"
          ],
          "rows": [
            [
              "Injection and goal hijack",
              "LLM01 Prompt Injection"
            ],
            [
              "RAG leakage and permissions",
              "LLM02 Sensitive Information Disclosure; LLM08 Vector and Embedding Weaknesses; LLM06 Excessive Agency"
            ],
            [
              "Tool use and approvals",
              "LLM06 Excessive Agency"
            ],
            [
              "Generated output",
              "LLM05 Improper Output Handling"
            ],
            [
              "Tool provenance and compromised components",
              "LLM03 Supply Chain; LLM01 and LLM06 where applicable"
            ]
          ]
        },
        {
          "type": "p",
          "text": "Expand the scope for system-prompt leakage, misinformation, unbounded consumption, poisoning and other relevant risks. For [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), illustrative references include AC-3 Access Enforcement, AC-6 Least Privilege, AU-3 Content of Audit Records, SA-11 Developer Testing and Evaluation, CM-3 Configuration Change Control, and SI-2 Flaw Remediation."
        },
        {
          "type": "p",
          "text": "A mapping helps organize evidence. It does not demonstrate that a control is implemented or confer OWASP certification, NIST certification, compliance or endorsement."
        }
      ]
    },
    {
      "id": "how-do-you-start-with-one-consequential-workflow",
      "heading": "How do you start with one consequential workflow?",
      "blocks": [
        {
          "type": "p",
          "text": "Choose one business action with a clear owner and observable outcome. Write the policy first, then use this checklist to make the scope reviewable."
        },
        {
          "type": "table",
          "head": [
            "Step",
            "Keep this evidence"
          ],
          "rows": [
            [
              "1. Choose the workflow",
              "Owner, business action and expected outcome."
            ],
            [
              "2. Map access",
              "Identity, tools, records, approvals and model route."
            ],
            [
              "3. Authorize the scope",
              "Targets, exclusions, limits and tested stop path."
            ],
            [
              "4. Select cases",
              "Relevant families, multiple turns and source channels."
            ],
            [
              "5. Define expected decisions",
              "Permit, escalate, hold or deny before execution."
            ],
            [
              "6. Verify outcomes",
              "Independent action and state-change witnesses."
            ],
            [
              "7. Check legitimate use",
              "Benign counterparts, false blocks and incomplete cases."
            ],
            [
              "8. Repair and retest",
              "Changed deployment, security regression, utility and release owner."
            ]
          ]
        },
        {
          "type": "download",
          "label": "Download the one-page agent red-teaming checklist",
          "href": "/assets/downloads/mythos-ai-agent-red-teaming-checklist.pdf"
        }
      ]
    },
    {
      "id": "how-does-mythos-help-you-do-this",
      "heading": "How does Mythos AI Security help you do this?",
      "blocks": [
        {
          "type": "p",
          "text": "Mythos AI Security combines system context with agent behavior testing so security, engineering and release owners can review the same evidence. The starting point is an agreed workflow, its intended authority and the decision the customer needs to make. Scope determines which integrations and effects can be examined."
        },
        {
          "type": "p",
          "text": "[Athena](/platform/athena) maps the system: identities, data, tools, model routes, permissions and findings within the supplied scope, so you know what the workflow can reach before anyone grants it more. Access is modelled from the configuration you supply; live verification and unchecked areas are identified separately. This mapping does not currently test a customer's identity provider or end-user entitlements."
        },
        {
          "type": "p",
          "text": "[Achilles](/platform/achilles) tests behavior and boundaries. Its catalog covers eight capabilities across 32 scenarios, plus six cross-channel chains with inert markers and benign counterparts, selected and tailored to the agreed workflow. The current HTTP scan observes the target's reply text and scores detectable response signals, not its explanation. It does not independently establish what happened inside customer tools or validate a customer's identity provider or end-user entitlements."
        },
        {
          "type": "p",
          "text": "[Minotaur](/platform/validation) checks Mythos AI Security's own testing: adversarial scenarios and known-answer cases challenge detection, scoring and remediation checks, so weaknesses in the assessment process surface before they reach your results. Passing its cases does not establish that every customer failure mode is covered."
        },
        {
          "type": "p",
          "text": "[SPINE](/platform/spine) connects the evidence to the decision. It records claims, supporting observations, deployment context, remediation and retest status, and issues signed deployment [Assurance Receipts](/platform/evidence) that verify offline. Signed Achilles scan-result intake remains planned. The reference Action Gate can record a provider's successful response to a permitted action; that response alone does not prove a business-state change. A verified-effect claim requires an independent witness."
        },
        {
          "type": "p",
          "text": "When inputs change, SPINE fingerprints the affected claims and plans [targeted revalidation](/platform/continuous-assurance). A release recommendation names restrictions, remediation needs and incomplete evidence, and your release owner decides. A remediation verdict alone does not establish that legitimate use still works; request that additional evidence where needed."
        },
        {
          "type": "p",
          "text": "Protection capabilities being added. Mythos AI Security is extending this work with action-bound permits; credential brokers; data, recipient and visible-exit controls; document and download intake; whole-agent containment; workflow and record authorization; cumulative work and spending budgets; connector admission and change control; verified-agent access lanes; persistent-memory and multi-agent provenance; verified revocation; and continuous authorized adversarial validation. These are additions in progress, not a claim that the complete bundle is available or validated today. Availability and enforcement depend on the integration and its acceptance evidence."
        },
        {
          "type": "p",
          "text": "Keep three engagements distinct:"
        },
        {
          "type": "list",
          "items": [
            "Agent assessment: scoped testing and reporting on a selected workflow.",
            "Release assurance: evidence and recommendations bound to an identified deployment.",
            "Runtime enforcement: a separate Action Gate engagement on explicitly supported execution paths, subject to integration review. An assessment alone installs no runtime protection."
          ]
        },
        {
          "type": "p",
          "text": "Agree on boundaries, evidence deliverables and retest criteria before work begins. Read the [platform overview](/platform) and [trust and scope principles](/trust). The synthetic refund example shows the questions to ask; it is not a performance claim. For a complete synthetic output, see the [example report](/example-report)."
        },
        {
          "type": "cta",
          "label": "Start with one consequential workflow: request an agent assessment",
          "href": "/contact"
        }
      ]
    }
  ],
  "faqHeading": "What else should you know before commissioning an assessment?",
  "faq": [
    {
      "q": "How often should you test?",
      "a": "Test before expanding access or releasing consequential actions. Retest repairs and material changes, and set a recurring review cadence based on impact and change frequency. There is no universal interval that replaces change review."
    },
    {
      "q": "Can your team do this in-house?",
      "a": "Yes, with authorized scope, suitable engineering access, independent outcome checks and a calibrated harness. Independent review is useful where another team must rely on the conclusions or where specialist coverage is missing."
    },
    {
      "q": "Is red teaming the same as prompt injection testing?",
      "a": "Prompt injection testing is one part. Agent security testing also examines authorization, outputs, tool integrity, approvals, consequences and recovery."
    },
    {
      "q": "Does red teaming certify an AI system?",
      "a": "No. It produces bounded evidence for a deployment decision. It does not establish universal safety or award framework certification."
    },
    {
      "q": "How long does an assessment take?",
      "a": "It depends on workflow complexity, access, integrations, evidence quality and retesting. Agree on a schedule after scoping; include customer setup and repair dependencies."
    },
    {
      "q": "What does it cost?",
      "a": "Mythos AI Security quotes after scoping. Identify the workflow, consequential actions, environment, evidence deliverables and retest expectations so the quote describes comparable work."
    }
  ],
  "sources": [
    {
      "title": "NIST ARIA Evaluation Planning Manual",
      "href": "https://www.nist.gov/publications/aria-evaluation-planning-manual-elements-aria-style-ai-evaluations",
      "note": "September 18, 2026"
    },
    {
      "title": "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents",
      "href": "https://arxiv.org/abs/2406.13352",
      "note": "v3 November 24, 2024"
    },
    {
      "title": "OWASP LLM06:2025 Excessive Agency",
      "href": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
      "note": "2025 edition"
    },
    {
      "title": "OWASP LLM01:2025 Prompt Injection",
      "href": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
      "note": "2025 edition"
    },
    {
      "title": "OWASP LLM08:2025 Vector and Embedding Weaknesses",
      "href": "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/",
      "note": "2025 edition"
    },
    {
      "title": "OWASP LLM05:2025 Improper Output Handling",
      "href": "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/",
      "note": "2025 edition"
    },
    {
      "title": "MCP Security Best Practices",
      "href": "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices",
      "note": "Specification documentation checked October 27, 2026"
    },
    {
      "title": "NIST SP 800-115 Technical Guide to Information Security Testing and Assessment",
      "href": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "September 2008"
    },
    {
      "title": "Defeating Prompt Injections by Design",
      "href": "https://arxiv.org/abs/2503.18813",
      "note": "v2 June 24, 2025"
    },
    {
      "title": "NIST AI 600-1 Generative Artificial Intelligence Profile",
      "href": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
      "note": "July 2024"
    },
    {
      "title": "RFC 9421 HTTP Message Signatures",
      "href": "https://www.rfc-editor.org/rfc/rfc9421.html",
      "note": "February 2024"
    },
    {
      "title": "OWASP Top 10 for LLM and GenAI Applications",
      "href": "https://genai.owasp.org/llm-top-10/",
      "note": "2025 edition"
    },
    {
      "title": "NIST SP 800-53 Revision 5",
      "href": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      "note": "Revision 5; release 5.2.0 August 27, 2025"
    }
  ]
};
