import { NextResponse } from "next/server";
import { investmentBands, marketingConsent, privacyPolicyUrl } from "@/lib/config";
import { createRateLimiter } from "@/lib/rateLimit";
import { MAX_BODY_BYTES, coerceLeadInput, validateLead } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 5 invii ogni 10 minuti per IP (vedi i limiti documentati in lib/rateLimit.ts). */
const rateLimit = createRateLimiter(5, 10 * 60 * 1000);

export type LeadApiResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "not_configured" | "rate_limited" | "too_large" | "bad_request" | "upstream_error";
      message: string;
      errors?: Record<string, string>;
    };

function reply(body: LeadApiResponse, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

export async function POST(req: Request) {
  // Nota: nessun dato personale viene mai scritto nei log.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return reply({ ok: false, code: "bad_request", message: "Richiesta non valida." }, 415);
  }

  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return reply({ ok: false, code: "too_large", message: "La richiesta è troppo lunga." }, 413);
  }

  const limit = rateLimit(clientKey(req));
  if (!limit.allowed) {
    return reply(
      { ok: false, code: "rate_limited", message: "Troppi invii ravvicinati. Riprova tra qualche minuto." },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  let raw: unknown;
  try {
    const text = await req.text();
    if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
      return reply({ ok: false, code: "too_large", message: "La richiesta è troppo lunga." }, 413);
    }
    raw = JSON.parse(text);
  } catch {
    return reply({ ok: false, code: "bad_request", message: "Richiesta non valida." }, 400);
  }

  const result = validateLead(
    coerceLeadInput(raw),
    investmentBands.map((b) => b.value),
    marketingConsent !== null,
  );

  if (!result.ok) {
    if (result.spam) {
      return reply({ ok: false, code: "bad_request", message: "Richiesta non valida." }, 400);
    }
    return reply(
      { ok: false, code: "invalid", message: "Controlla i campi evidenziati.", errors: result.errors },
      422,
    );
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl || !privacyPolicyUrl) {
    // Modalità dimostrativa: il payload valido viene scartato, nulla viene trasmesso o salvato.
    return reply(
      {
        ok: false,
        code: "not_configured",
        message: "Modulo dimostrativo: nessun dato è stato inviato.",
      },
      503,
    );
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const secret = process.env.LEAD_WEBHOOK_SECRET?.trim();
    if (secret) headers.Authorization = `Bearer ${secret}`;

    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "landing-franchising-bj-pub",
        submittedAt: new Date().toISOString(),
        lead: result.payload,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error(`[leads] webhook ha risposto ${upstream.status}`);
      return reply(
        { ok: false, code: "upstream_error", message: "Non è stato possibile inviare la richiesta. Riprova più tardi." },
        502,
      );
    }
  } catch (err) {
    console.error(`[leads] errore di rete verso il webhook: ${err instanceof Error ? err.name : "sconosciuto"}`);
    return reply(
      { ok: false, code: "upstream_error", message: "Non è stato possibile inviare la richiesta. Riprova più tardi." },
      502,
    );
  }

  return reply({ ok: true }, 200);
}
