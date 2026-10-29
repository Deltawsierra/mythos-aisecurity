"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { submitInquiry } from "@/lib/submitInquiry";
import { track } from "@/lib/analytics";
import { INTENT_EVENT } from "@/lib/intent";
import {
  INQUIRIES,
  INTENT_MAP,
  getInquiry,
  isVisible,
  type FormField,
  type FormValues,
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
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted"
      >
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-rule bg-panel px-4 py-2.5 text-sm text-fg placeholder:text-fg-muted/85 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors duration-150";

const legendClass =
  "mb-4 w-full border-b border-rule pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent";

const groupLegendClass = "mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Eases its height to fit its content, so switching inquiry types or revealing
 * a conditional question never snaps the form's size. The inner padding
 * (offset by a negative margin) keeps focus rings clear of the clipping edge.
 */
function AutoHeight({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{ height }}
      className="-m-1 overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
    >
      <div ref={innerRef} className="p-1">
        {children}
      </div>
    </div>
  );
}

/** One configured question, controlled by the shared answers. */
function InquiryField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string | string[] | undefined;
  onChange: (next: string | string[]) => void;
}) {
  const id = `contact-${field.name}`;
  const text = typeof value === "string" ? value : "";
  const list = Array.isArray(value) ? value : [];
  const span = field.wide || field.kind === "textarea" ? "sm:col-span-2" : undefined;

  if (field.kind === "checkboxes" || field.kind === "radio") {
    const multiple = field.kind === "checkboxes";
    return (
      <fieldset className={cn("m-0 min-w-0 border-0 p-0", span)}>
        <legend className={groupLegendClass}>
          {field.label}
          {field.required && (
            <span className="ml-1 text-accent" aria-hidden="true">
              *
            </span>
          )}
        </legend>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const checked = multiple ? list.includes(opt) : text === opt;
            return (
              <label
                key={opt}
                className={cn(
                  "flex cursor-pointer items-center gap-2 border px-3 py-2 text-sm transition-colors duration-150 focus-within:ring-2 focus-within:ring-accent/50",
                  checked ? "border-accent bg-panel text-fg" : "border-rule text-fg/90 hover:border-accent/50",
                )}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={field.name}
                  value={opt}
                  checked={checked}
                  required={!multiple && field.required}
                  onChange={() =>
                    onChange(multiple ? (checked ? list.filter((v) => v !== opt) : [...list, opt]) : opt)
                  }
                  className="h-3.5 w-3.5 accent-bronze"
                />
                {opt}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (field.kind === "checkbox") {
    return (
      <label
        htmlFor={id}
        className={cn("flex cursor-pointer items-center gap-3 text-sm text-fg", span)}
      >
        <input
          id={id}
          type="checkbox"
          name={field.name}
          checked={text === "Yes"}
          onChange={(e) => onChange(e.target.checked ? "Yes" : "")}
          className="h-4 w-4 shrink-0 accent-bronze"
        />
        {field.label}
      </label>
    );
  }

  return (
    <Field label={field.label} id={id} required={field.required} className={span}>
      {field.kind === "select" ? (
        <select
          id={id}
          name={field.name}
          value={text}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, "cursor-pointer")}
        >
          <option value="">Select one</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.kind === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          rows={4}
          maxLength={5000}
          value={text}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={field.kind}
          name={field.name}
          maxLength={500}
          value={text}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </Field>
  );
}

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryValue>("assessment");
  const [values, setValues] = useState<FormValues>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const renderedAtRef = useRef<number | null>(null);

  const def = getInquiry(inquiryType);
  const visibleFields = def.fields.filter((f) => isVisible(f, values));
  const setValue = (name: string, next: string | string[]) => setValues((v) => ({ ...v, [name]: next }));
  const text = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");

  /* Record mount time for the server-side submit-time spam check. Done in an
     effect so nothing time-dependent is rendered during SSR/hydration. */
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  /* Preselect the inquiry type from a ?intent= query parameter. Runs after
     mount so the SSR/initial render stays deterministic (assessment). CTAs
     clicked while this form is already mounted announce their intent instead
     (see lib/intent.ts). */
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search)
      .get("intent")
      ?.toLowerCase();
    if (intent && INTENT_MAP[intent]) {
      setInquiryType(INTENT_MAP[intent]);
    }

    const onIntent = (e: Event) => {
      const next = (e as CustomEvent<string>).detail?.toLowerCase();
      if (next && INTENT_MAP[next]) {
        setInquiryType(INTENT_MAP[next]);
        document
          .getElementById("contact-form")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener(INTENT_EVENT, onIntent);
    return () => window.removeEventListener(INTENT_EVENT, onIntent);
  }, []);

  /* Move focus to the confirmation when the form is submitted. */
  useEffect(() => {
    if (status === "success") statusRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    // Only the questions this inquiry type shows are sent; hidden answers stay
    // in the browser so switching back restores them.
    const details: { label: string; value: string }[] = [];
    const payload: Record<string, unknown> = {
      formType: "contact",
      inquiryType,
      name: text("name").trim(),
      email: text("email").trim(),
      company_website_confirm: String(new FormData(e.currentTarget).get("company_website_confirm") ?? ""),
    };
    if (text("phone").trim()) payload.phone = text("phone").trim();
    for (const field of visibleFields) {
      const raw = values[field.name];
      const answer = (Array.isArray(raw) ? raw.join(", ") : (raw ?? "")).trim();
      if (!answer) continue;
      if (field.name === "organization" || field.name === "message") payload[field.name] = answer;
      else details.push({ label: field.label, value: answer });
    }
    if (details.length) payload.details = details;
    if (renderedAtRef.current != null) {
      payload.renderedAt = renderedAtRef.current;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitInquiry(payload);
    if (result.ok) {
      setStatus("success");
      // GA4 key event; only the inquiry type travels, never form contents.
      track("form_completed", { inquiry_type: inquiryType });
      track("generate_lead", { inquiry_type: inquiryType });
    } else {
      setStatus("error");
      track("form_error", { inquiry_type: inquiryType });
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
        className="border border-rule bg-panel p-8 text-center focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
          {def.label}
        </p>
        <p className="mb-3 font-display text-2xl font-normal leading-tight text-fg">
          {def.confirmHeading}
        </p>
        <p className="mx-auto max-w-md text-base leading-relaxed text-fg-muted">
          {def.confirmBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (startedRef.current) return;
        startedRef.current = true;
        track("form_started", { inquiry_type: inquiryType });
      }}
      className="flex flex-col gap-8"
    >
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
                  "focus-within:ring-2 focus-within:ring-accent/60 focus-within:ring-offset-2",
                  selected
                    ? "border-accent bg-panel shadow-[0_0_0_1px_rgba(184,130,63,0.4)]"
                    : "border-rule hover:border-accent/50",
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
                    selected ? "text-fg" : "text-fg/90",
                  )}
                >
                  {option.label}
                </span>
                <span className="text-xs leading-relaxed text-fg-muted">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Shared details: kept when the inquiry type changes ─── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" id="contact-name" required className="sm:col-span-2">
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Full name"
              maxLength={200}
              required
              value={text("name")}
              onChange={(e) => setValue("name", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Email" id="contact-email" required>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={text("email")}
              onChange={(e) => setValue("email", e.target.value)}
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
              value={text("phone")}
              onChange={(e) => setValue("phone", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      {/* This inquiry type's own questions ────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>About your request</legend>
        <AutoHeight>
          <div className="grid gap-5 sm:grid-cols-2">
            {visibleFields.map((field) => (
              <InquiryField
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={(next) => setValue(field.name, next)}
              />
            ))}
          </div>
        </AutoHeight>
      </fieldset>

      {/* Submit ───────────────────────────────────────────── */}
      <div className="border-t border-rule pt-6">
        <p className="mb-5 border-l-2 border-accent/40 pl-4 text-xs leading-relaxed text-fg-muted">
          Please don’t include passwords, API keys, customer records, or confidential technical details.
        </p>
        {status === "error" && errorMessage && (
          <p
            role="alert"
            className="mb-4 border border-state-contradicted bg-panel px-4 py-3 text-sm leading-relaxed text-state-contradicted-ink"
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
        <p className="mt-3 text-xs text-fg-muted">
          Inquiries are read by the Mythos team.
        </p>
      </div>
    </form>
  );
}
