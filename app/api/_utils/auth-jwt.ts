import type { NextRequest } from "next/server"
import { jwtVerify, type JWTPayload } from "jose"

function getBearerToken(req: NextRequest): string | null {
  const header = req.headers.get("authorization") ?? req.headers.get("Authorization")
  if (!header) return null
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match?.[1]?.trim() || null
}

function getJwtSecret(): string | null {
  return (
    process.env.JWT_SECRET ??
    process.env.GNESIS_JWT_SECRET ??
    process.env.ERP_JWT_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    null
  )
}

export type JwtAuthResult =
  | { ok: true; token: string; payload: JWTPayload }
  | { ok: false; status: number; error: { code: string; message: string } }

export async function requireJwtAuth(req: NextRequest): Promise<JwtAuthResult> {
  const token = getBearerToken(req)
  if (!token) {
    return {
      ok: false,
      status: 401,
      error: { code: "AUTH_MISSING", message: "Missing Authorization: Bearer <token>" },
    }
  }

  const secret = getJwtSecret()
  if (!secret) {
    return {
      ok: false,
      status: 500,
      error: { code: "AUTH_NOT_CONFIGURED", message: "JWT secret not configured on server" },
    }
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return { ok: true, token, payload }
  } catch {
    return {
      ok: false,
      status: 401,
      error: { code: "AUTH_INVALID", message: "Invalid JWT" },
    }
  }
}

export function extractObraAtivaId(payload: JWTPayload): string | number | null {
  // Canonical claim requested
  const direct = payload["obra_ativa_id"]
  if (typeof direct === "string" || typeof direct === "number") return direct

  // Common alternates
  const camel = payload["obraAtivaId"]
  if (typeof camel === "string" || typeof camel === "number") return camel

  const ctx = payload["context"]
  if (ctx && typeof ctx === "object") {
    const ctxObra = (ctx as Record<string, unknown>)["obra_ativa_id"]
    if (typeof ctxObra === "string" || typeof ctxObra === "number") return ctxObra
  }

  return null
}

export function assertNoObraIdInQuery(req: NextRequest):
  | { ok: true }
  | { ok: false; status: 400; error: { code: string; message: string } } {
  const sp = req.nextUrl.searchParams
  const forbiddenKeys = ["obra_id", "obraId", "obra", "obraId[]", "obra_id[]"]
  for (const key of forbiddenKeys) {
    if (sp.has(key)) {
      return {
        ok: false,
        status: 400,
        error: { code: "OBRA_ID_NOT_ALLOWED", message: `Query param '${key}' is not allowed on this endpoint` },
      }
    }
  }
  return { ok: true }
}

