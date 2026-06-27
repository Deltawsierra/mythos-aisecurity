export interface InquiryResult {
  ok: boolean;
  error?: string;
  fields?: Record<string, string[]>;
}

const FALLBACK_ERROR =
  "Something went wrong. Please email info@mythosaisecurity.com directly.";

/**
 * POST a form submission to the same-origin api-server.
 *
 * The marketing site is served at the domain root and the API is mounted at
 * `/api` on the same origin (confirmed in dev and via the autoscale router in
 * production), so a relative path needs no base URL or public env var.
 */
export async function submitInquiry(
  payload: Record<string, unknown>,
): Promise<InquiryResult> {
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    type InquiryResponse = {
      ok?: boolean;
      error?: string;
      fields?: Record<string, string[]>;
    };
    let data: InquiryResponse | null = null;
    try {
      data = (await res.json()) as InquiryResponse;
    } catch {
      data = null;
    }

    if (res.ok && data?.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data?.error ?? FALLBACK_ERROR,
      fields: data?.fields,
    };
  } catch {
    return {
      ok: false,
      error:
        "We couldn't reach the server. Please check your connection, or email info@mythosaisecurity.com directly.",
    };
  }
}
