# Mythos — Forms Backend, Email, and Privacy

How the three website forms reach a human, and how cookie consent works.

## Overview

- The marketing site (`artifacts/mythos-website`) is a **static export**. It has
  no server of its own, so forms POST to the Express **api-server**
  (`artifacts/api-server`).
- The site and API are **same-origin**: the site is served at `/`, the API at
  `/api`. The browser posts to the relative path `/api/inquiries` — there is no
  public API-URL env var to configure.
- Every submission is emailed to a single inbox. Contact, demo, and investor
  forms all hit one endpoint; a `formType` discriminator selects the field set,
  validation, and the subject prefix.

```
ContactForm / DemoRequestForm / InvestorForm
        │  fetch POST /api/inquiries (JSON)
        ▼
api-server  ──►  rate-limit ──► validate (zod) ──► spam checks ──► sendEmail()
        │                                                              │
        │                                              Resend connection / API key
        ▼                                                              ▼
   200 { ok: true }  /  4xx-5xx { ok:false, error }              info@mythosaisecurity.com
```

## Endpoint: `POST /api/inquiries`

Request body (JSON), by `formType`:

- `contact`: `inquiryType` (enum: platform, demo, investor, partnership,
  assessment, general, other), `name`, `email`, `organization`, `role`,
  `message`; optional `website`, `companySize`, `industry`, `timeline`.
- `demo`: `name`, `email`, `organization`, `role`, `inquiryType` (label),
  `acknowledge` (must be `true`); optional `website`, `companySize`, `industry`,
  `timeline`, `aiSystem`, `riskConcern`, `message`.
- `investor`: `name`, `email`, `firm`, `role`, `investorType`, `acknowledge`
  (must be `true`); optional `website`, `checkSize`, `areaOfInterest`,
  `referralSource`, `message`.

Shared anti-spam fields (added by the client, invisible to users):

- `company_website_confirm` — honeypot. If non-empty, the server returns
  `200 { ok: true }` but sends nothing.
- `renderedAt` — epoch ms captured on form mount. Submissions faster than
  2.5s are dropped the same silent way.

Responses:

| Status | Meaning |
| ------ | ------- |
| `200 { ok: true }` | Accepted (delivered, or simulated in dev, or silently dropped as spam). |
| `400 { ok:false, error, fields }` | Validation failed; `fields` maps field → messages. |
| `429 { ok:false, error }` | Per-IP rate limit (5 / 10 min) exceeded. |
| `503 { ok:false, error }` | Email provider not configured / send failed **in production**. |
| `500 { ok:false, error }` | Unexpected server error. |

### Subject prefixes

`[Mythos Contact]`, `[Mythos Demo Request]`, `[Mythos Investor Deck Request]`,
`[Mythos Platform Access]`, `[Mythos Partnership Inquiry]`,
`[Mythos Assessment Inquiry]`, `[Mythos General Inquiry]`,
`[Mythos Other Inquiry]` — chosen from the form's intent.

## Email delivery

`sendEmail()` resolves a provider in this order:

1. `RESEND_API_KEY` set → call the Resend REST API directly.
2. else `REPLIT_CONNECTORS_HOSTNAME` present → send via the **Resend Replit
   connection** (`@replit/connectors-sdk`), which manages the token. **Primary
   path on Replit.**
3. else → no provider.

Honesty rules:

- **Production**, no provider or send fails → the form shows an honest error and
  asks the visitor to email `info@mythosaisecurity.com` directly. Never faked.
- **Development**, no provider → the send is logged and simulated as success so
  local flows work without credentials.

`reply_to` is set to the submitter's email, so replying from the inbox reaches
them. Submission payloads are **not** logged in production.

### Going live (real delivery)

1. Add the **Resend** integration/connection in Replit.
2. Verify the `mythosaisecurity.com` domain in Resend so `no-reply@…` can send.
3. Confirm `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` (defaults are correct).
4. Submit a test inquiry from the live site and confirm it arrives.

See `artifacts/api-server/.env.example` for all variables.

## Cookie consent & privacy

- Categories: **Necessary** (always on), **Analytics** (opt-in), **Marketing**
  (opt-in). Analytics/Marketing default **off**.
- Choice is stored in `localStorage` (`mythos.cookie-consent.v1`). The banner
  reappears only if no decision is stored.
- **GPC**: if `navigator.globalPrivacyControl` is true and no choice is stored,
  analytics/marketing are recorded as denied and the banner is skipped.
- **Script gating** lives in `lib/consentScripts.ts`. GA4 / LinkedIn loaders are
  scaffolded but inert until IDs are added — nothing third-party loads without
  opt-in.
- Reopen anytime via **Cookie Settings** in the footer (and on `/privacy`).
- `/privacy` documents the above and is marked **pending legal review**.

## Testing checklist

Backend (curl `https://$REPLIT_DEV_DOMAIN/api/inquiries`):

- [ ] `GET /api/healthz` → 200.
- [ ] Valid `contact` / `demo` / `investor` payloads (with `renderedAt` > 2.5s
      ago) → `200 { ok: true }`.
- [ ] Missing required field → `400` with `fields`.
- [ ] `demo`/`investor` without `acknowledge:true` → `400`.
- [ ] Honeypot (`company_website_confirm` filled) → `200`, no email.
- [ ] `renderedAt` = now (too fast) → `200`, no email.
- [ ] 6+ rapid posts from one IP → `429`.
- [ ] Disallowed `Origin` → no `Access-Control-Allow-Origin` header.

Forms (browser):

- [ ] Each form submits, shows a loading state, then the success panel.
- [ ] Forced failure shows the honest error message (not a fake success).
- [ ] Required-field/email validation blocks empty/invalid submits.

Consent (browser):

- [ ] First visit shows the banner; no layout flash on load.
- [ ] Accept all / Reject all / Save preferences persist across reload.
- [ ] Footer & `/privacy` "Cookie Settings" reopen the modal.
- [ ] With GPC enabled and storage cleared, the banner is skipped and optional
      categories stay off.

Email (once Resend is connected):

- [ ] A real submission arrives at `info@mythosaisecurity.com` with the correct
      subject prefix and a working reply-to.
