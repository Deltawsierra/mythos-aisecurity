"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { submitOpenTalent } from "@/lib/submitOpenTalent";
import {
  AREA_OF_INTEREST_OPTIONS,
  AVAILABILITY_OPTIONS,
  WORK_TYPE_OPTIONS,
  YEARS_EXPERIENCE_OPTIONS,
} from "@/data/careers";

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

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "doc", "docx"];

function validateResume(file: File | null): string | null {
  if (!file || file.size === 0) {
    return "Please attach your resume (PDF, DOC, or DOCX).";
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.includes(ext)) {
    return "Resume must be a PDF, DOC, or DOCX file.";
  }
  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be 10MB or smaller.";
  }
  return null;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function OpenTalentForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const renderedAtRef = useRef<number | null>(null);

  /* Record mount time for the server-side submit-time spam check. */
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  /* Move focus to the confirmation when the form is submitted. */
  useEffect(() => {
    if (status === "success") statusRef.current?.focus();
  }, [status]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResumeName(file?.name ?? null);
    setResumeError(file ? validateResume(file) : null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Client-side resume validation before sending anything.
    const file = formData.get("resume");
    const resumeFile = file instanceof File && file.size > 0 ? file : null;
    const rErr = validateResume(resumeFile);
    if (rErr) {
      setResumeError(rErr);
      setStatus("error");
      setErrorMessage(null);
      fileInputRef.current?.focus();
      return;
    }
    setResumeError(null);

    if (renderedAtRef.current != null) {
      formData.set("renderedAt", String(renderedAtRef.current));
    }

    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitOpenTalent(formData);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? null);
      if (result.fields?.resume?.length) {
        setResumeError(result.fields.resume[0]);
      }
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
          Application received
        </p>
        <p className="mb-3 font-display text-2xl font-normal leading-tight text-ivory">
          Thank you for introducing yourself.
        </p>
        <p className="mx-auto max-w-md text-base leading-relaxed text-muted-stone">
          Your application has been sent to the Mythos hiring team. If there is a
          fit — now or in the future — someone will reach out directly. We review
          every submission.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {/* Honeypot — visually hidden; bots that fill it are silently dropped. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="ot-cwc">Leave this field empty</label>
        <input
          id="ot-cwc"
          type="text"
          name="company_website_confirm"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* About you ─────────────────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>About you</legend>
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" id="ot-first" required>
              <input
                id="ot-first"
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Last name" id="ot-last" required>
              <input
                id="ot-last"
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
            <Field label="Email" id="ot-email" required>
              <input
                id="ot-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@email.com"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Phone" id="ot-phone">
              <input
                id="ot-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Optional"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Location" id="ot-location" required>
              <input
                id="ot-location"
                type="text"
                name="location"
                autoComplete="address-level2"
                placeholder="City, Country"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Current role" id="ot-role">
              <input
                id="ot-role"
                type="text"
                name="currentRole"
                placeholder="Optional"
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Your interest ─────────────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>Your interest</legend>
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Primary area of interest" id="ot-area" required>
              <select
                id="ot-area"
                name="areaOfInterest"
                defaultValue=""
                required
                className={cn(inputClass, "cursor-pointer")}
              >
                <option value="" disabled>
                  Select an area
                </option>
                {AREA_OF_INTEREST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Years of experience" id="ot-years">
              <select
                id="ot-years"
                name="yearsExperience"
                defaultValue=""
                className={cn(inputClass, "cursor-pointer")}
              >
                <option value="">Prefer not to say</option>
                {YEARS_EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Preferred work type" id="ot-worktype">
              <select
                id="ot-worktype"
                name="preferredWorkType"
                defaultValue=""
                className={cn(inputClass, "cursor-pointer")}
              >
                <option value="">No preference</option>
                {WORK_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Availability" id="ot-availability">
              <select
                id="ot-availability"
                name="availability"
                defaultValue=""
                className={cn(inputClass, "cursor-pointer")}
              >
                <option value="">Select availability</option>
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Links & eligibility ───────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>Links & eligibility</legend>
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="LinkedIn" id="ot-linkedin">
              <input
                id="ot-linkedin"
                type="url"
                name="linkedin"
                autoComplete="url"
                placeholder="https:// (optional)"
                className={inputClass}
              />
            </Field>
            <Field label="Portfolio / GitHub" id="ot-portfolio">
              <input
                id="ot-portfolio"
                type="url"
                name="portfolio"
                placeholder="https:// (optional)"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Work authorization" id="ot-workauth">
              <input
                id="ot-workauth"
                type="text"
                name="workAuthorization"
                placeholder="e.g. Authorized to work in the US (optional)"
                className={inputClass}
              />
            </Field>
            <Field label="Security clearance" id="ot-clearance">
              <input
                id="ot-clearance"
                type="text"
                name="securityClearance"
                placeholder="If applicable (optional)"
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Resume & message ──────────────────────────────────── */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={legendClass}>Resume & message</legend>
        <div className="flex flex-col gap-5">
          <Field label="Resume" id="ot-resume" required>
            <input
              ref={fileInputRef}
              id="ot-resume"
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              required
              onChange={handleFileChange}
              aria-describedby="ot-resume-hint"
              aria-invalid={resumeError ? "true" : undefined}
              className="block w-full cursor-pointer text-sm text-muted-stone file:mr-4 file:cursor-pointer file:border file:border-bronze/40 file:bg-bronze/10 file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.18em] file:text-ivory hover:file:bg-bronze/20"
            />
            <p id="ot-resume-hint" className="mt-1.5 text-xs text-muted-stone/60">
              PDF, DOC, or DOCX · max 10MB
              {resumeName ? ` · selected: ${resumeName}` : ""}
            </p>
            {resumeError && (
              <p role="alert" className="mt-1.5 text-xs leading-relaxed text-red-300">
                {resumeError}
              </p>
            )}
          </Field>

          <Field label="Why are you interested in Mythos?" id="ot-why" required>
            <textarea
              id="ot-why"
              name="whyInterested"
              rows={5}
              required
              placeholder="Tell us what draws you to AI security and the work Mythos does. A few sentences is plenty."
              className={cn(inputClass, "resize-none")}
            />
          </Field>
        </div>
      </fieldset>

      {/* Submit ────────────────────────────────────────────── */}
      <div className="border-t border-ivory/5 pt-6">
        <p className="mb-5 border-l-2 border-bronze/40 pl-4 text-xs leading-relaxed text-muted-stone/80">
          Please do not include passwords, government ID numbers, financial
          details, or other sensitive personal data in your resume or message.
          Share only what is relevant to your candidacy.
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
          {status === "submitting" ? "Sending…" : "Submit application"}
        </Button>
        <p className="mt-3 text-xs text-muted-stone/50">
          Your application is sent directly to the Mythos hiring team by email. We
          do not store applications or resumes on this website.
        </p>
      </div>
    </form>
  );
}
