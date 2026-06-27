export interface OpenTalentResult {
  ok: boolean;
  error?: string;
  fields?: Record<string, string[]>;
}

const FALLBACK_ERROR =
  "Something went wrong. Please email info@mythosaisecurity.com directly.";

/**
 * POST an Open Talent application (multipart, with resume) to the same-origin
 * api-server.
 *
 * The marketing site is served at the domain root and the API is mounted at
 * `/api` on the same origin, so a relative path needs no base URL. The body is
 * a `FormData` instance — the browser sets the multipart boundary header, so we
 * deliberately do NOT set Content-Type ourselves.
 */
export async function submitOpenTalent(
  formData: FormData,
): Promise<OpenTalentResult> {
  try {
    const res = await fetch("/api/careers/open-talent", {
      method: "POST",
      body: formData,
    });

    type Response = {
      ok?: boolean;
      error?: string;
      fields?: Record<string, string[]>;
    };
    let data: Response | null = null;
    try {
      data = (await res.json()) as Response;
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
