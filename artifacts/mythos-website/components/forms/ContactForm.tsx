"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { submitInquiry } from "@/lib/submitInquiry";
import {
  INQUIRIES,
  INTENT_MAP,
  TIMELINE_OPTIONS,
  getInquiry,
  type InquiryValue,
} from "@/components/forms/inquiryConfig";

interface FieldProps {
  label: string;
  id: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, id, required, className, children }: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-stone"
      >
        {label}
        {required && (
          <span className="ml-1 text-bronze" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-ivory/10 bg-charcoal px-4 py-2.5 text-sm text-ivory placeholder:text-muted-stone/40 focus:outline-none focus:border-bronze/50 focus:ring-1 focus:ring-bronze/30 transition-colors duration-150";

const legendClass =
  "mb-4 w-full border-b border-ivory/5 pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryValue>("assessment");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const renderedAtRef = useRef<number | null>(null);

  const def = getInquiry(inquiryType);

  /* Record mount time for the server-side submit-time spam check. Done in an
     effect so nothing time-dependent is rendered during SSR/hydration. */
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  /* Preselect the inquiry type from a ?intent= query parameter. Runs after
     mount so the SSR/initial render stays deterministic (assessment). */
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search)
      .get("intent")
      ?.toLowerCase();
    if (intent && INTENT_MAP[intent]) {
      setInquiryType(INTENT_MAP[intent]);
    }
  }, []);

  /* Move focus to the confirmation when the form is submitted. */
  useEffect(() => {
    if (status === "success") statusRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );

    // Combine first/last name into the backend `name` field.
    const first = String(payload.firstName ?? "").trim();
    const last = String(payload.lastName ?? "").trim();
    payload.name = [first, last].filter(Boolean).join(" ");
    delete payload.firstName;
    delete payload.lastName;

    payload.formType = "contact";
    payload.inquiryType = inquiryType;
    if (renderedAtRef.current != null) {
      payload.renderedAt = renderedAtRef.current;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitInquiry(payload);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? null);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="border border-bronze/30 bg-charcoal p-8 text-center focus:outline-none focus:ring-2 focus:ring-bronze/40"
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-bronze">
          {def.label}
        </p>
        <p className="mb-3 font-display text-2xl font-normal leading-tight text-ivory">
          {def.confirmHeading}
        </p>
        <p className="mx-auto max-w-md text-base leading-relaxed text-muted-stone">
          {def.confirmBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Honeypot — visually hidden; bots that fill it are silently dropped. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-cwc">Leave this field empty</label>
        <input
          id="contact-cwc"
          type="text"
          name="company_website_confirm"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Inquiry type selector ────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>How can Mythos help?</legend>
        <div
          role="radiogroup"
          aria-label="Inquiry type"
          className="grid gap-3 sm:grid-cols-2"
        >
          {INQUIRIES.map((option) => {
            const selected = inquiryType === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "group flex cursor-pointer flex-col gap-1.5 border p-4 transition-colors duration-150",
                  "focus-within:ring-2 focus-within:ring-bronze/60 focus-within:ring-offset-2 focus-within:ring-offset-obsidian",
                  selected
                    ? "border-bronze bg-bronze/10 shadow-[0_0_0_1px_rgba(166,106,50,0.4)]"
                    : "border-ivory/10 bg-charcoal hover:border-ivory/25",
                )}
              >
                <input
                  type="radio"
                  name="inquiryType"
                  value={option.value}
                  checked={selected}
                  onChange={() => setInquiryType(option.value)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "text-sm font-semibold",
                    selected ? "text-ivory" : "text-ivory/90",
                  )}
                >
                  {option.label}
                </span>
                <span className="text-xs leading-relaxed text-muted-stone">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Shared required fields ────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>Your details</legend>
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" id="contact-first" required>
              <input
                id="contact-first"
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Last name" id="contact-last" required>
              <input
                id="contact-last"
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last name"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Work email" id="contact-email" required>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@organization.com"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Phone" id="contact-phone">
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Optional"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company / organization" id="contact-org" required>
              <input
                id="contact-org"
                type="text"
                name="organization"
                autoComplete="organization"
                placeholder="Organization name"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Role / title" id="contact-role" required>
              <input
                id="contact-role"
                type="text"
                name="role"
                autoComplete="organization-title"
                placeholder="Your role or title"
                required
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Conditional fields ────────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>{def.detailsLegend}</legend>
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {def.selects.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                id={`contact-${field.name}`}
              >
                <select
                  id={`contact-${field.name}`}
                  name={field.name}
                  defaultValue=""
                  className={cn(inputClass, "cursor-pointer")}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
            ))}

            {def.texts?.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                id={`contact-${field.name}`}
              >
                <input
                  id={`contact-${field.name}`}
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              </Field>
            ))}
          </div>

          {def.checkbox && (
            <label
              htmlFor={`contact-${def.checkbox.name}`}
              className="flex cursor-pointer items-start gap-3 border border-ivory/10 bg-charcoal p-4 focus-within:ring-2 focus-within:ring-bronze/50 focus-within:ring-offset-2 focus-within:ring-offset-obsidian"
            >
              <input
                id={`contact-${def.checkbox.name}`}
                type="checkbox"
                name={def.checkbox.name}
                value={def.checkbox.value}
                className="mt-0.5 h-4 w-4 shrink-0 accent-bronze"
              />
              <span className="text-sm leading-relaxed text-muted-stone">
                {def.checkbox.label}
              </span>
            </label>
          )}
        </div>
      </fieldset>

      {/* Message + optional context ────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>Message</legend>
        <div className="flex flex-col gap-5">
          <Field label="Message" id="contact-message" required>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Tell Mythos what you are building, connecting, preparing to deploy, or evaluating."
              className={cn(inputClass, "resize-none")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company website" id="contact-website">
              <input
                id="contact-website"
                type="url"
                name="website"
                autoComplete="url"
                placeholder="https://"
                className={inputClass}
              />
            </Field>
            <Field label="Preferred timeline" id="contact-timeline">
              <select
                id="contact-timeline"
                name="timeline"
                defaultValue=""
                className={cn(inputClass, "cursor-pointer")}
              >
                <option value="">Select a timeline</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Submit ───────────────────────────────────────────── */}
      <div className="border-t border-ivory/5 pt-6">
        <p className="mb-5 border-l-2 border-bronze/40 pl-4 text-xs leading-relaxed text-muted-stone/80">
          Do not submit secrets, credentials, regulated records, private customer
          data, or sensitive production material through this form.
        </p>
        {status === "error" && errorMessage && (
          <p
            role="alert"
            className="mb-4 border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm leading-relaxed text-red-200"
          >
            {errorMessage}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : def.submitLabel}
        </Button>
        <p className="mt-3 text-xs text-muted-stone/50">
          All inquiries are reviewed confidentially.
        </p>
      </div>
    </form>
  );
}
