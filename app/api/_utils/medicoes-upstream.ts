import type { ReadonlyURLSearchParams } from "next/navigation"

export type MedicoesKind = "producao" | "cliente" | "comparativo"

type UpstreamResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number; error: { code: string; message: string; upstream_status?: number } }

function getUpstreamBaseUrl(): string | null {
  return process.env.ERP_UPSTREAM_BASE_URL ?? process.env.GNESIS_UPSTREAM_BASE_URL ?? process.env.API_BASE_URL ?? null
}

function getUpstreamPath(kind: MedicoesKind): string {
  const envKey =
    kind === "producao"
      ? "ERP_MEDICOES_PRODUCAO_PATH"
      : kind === "cliente"
        ? "ERP_MEDICOES_CLIENTE_PATH"
        : "ERP_MEDICOES_COMPARATIVO_PATH"

  const fromEnv = process.env[envKey]
  if (fromEnv && typeof fromEnv === "string") return fromEnv

  // Default to a conventional legacy path (expected to exist on the upstream backend).
  return `/api/medicoes/${kind}`
}

export async function fetchMedicoesFromUpstream(params: {
  kind: MedicoesKind
  obraAtivaId: string | number
  token: string
  searchParams: ReadonlyURLSearchParams
}): Promise<UpstreamResult> {
  const base = getUpstreamBaseUrl()
  if (!base) {
    return {
      ok: false,
      status: 501,
      error: {
        code: "UPSTREAM_NOT_CONFIGURED",
        message:
          "Upstream backend base URL not configured (set ERP_UPSTREAM_BASE_URL or GNESIS_UPSTREAM_BASE_URL)",
      },
    }
  }

  const url = new URL(getUpstreamPath(params.kind), base)

  // This new endpoint does NOT accept obra_id from caller; we always inject it from obra ativa.
  url.searchParams.set("obra_id", String(params.obraAtivaId))

  // Forward other query params (except obra_id variants) to upstream for compatibility (competencia, filtros, etc.)
  for (const [k, v] of params.searchParams.entries()) {
    const lk = k.toLowerCase()
    if (lk === "obra_id" || lk === "obraid" || lk === "obra") continue
    url.searchParams.append(k, v)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  })

  const contentType = res.headers.get("content-type") ?? ""
  const isJson = contentType.includes("application/json")

  let body: unknown
  try {
    body = isJson ? await res.json() : await res.text()
  } catch {
    body = null
  }

  if (!res.ok) {
    return {
      ok: false,
      status: 502,
      error: {
        code: "UPSTREAM_ERROR",
        message: "Upstream backend responded with an error",
        upstream_status: res.status,
      },
    }
  }

  return { ok: true, data: body }
}

