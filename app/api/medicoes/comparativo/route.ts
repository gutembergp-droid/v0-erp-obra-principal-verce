import type { NextRequest } from "next/server"
import { canonicalJson } from "@/app/api/_utils/canonical-response"
import { assertNoObraIdInQuery, extractObraAtivaId, requireJwtAuth } from "@/app/api/_utils/auth-jwt"
import { fetchMedicoesFromUpstream } from "@/app/api/_utils/medicoes-upstream"

export async function GET(req: NextRequest) {
  const noObra = assertNoObraIdInQuery(req)
  if (!noObra.ok) return canonicalJson({ error: noObra.error }, { status: noObra.status })

  const auth = await requireJwtAuth(req)
  if (!auth.ok) return canonicalJson({ error: auth.error }, { status: auth.status })

  const obraAtivaId = extractObraAtivaId(auth.payload)
  if (obraAtivaId === null) {
    return canonicalJson(
      { error: { code: "OBRA_ATIVA_REQUIRED", message: "User has no active obra in context (obra_ativa_id)" } },
      { status: 400 },
    )
  }

  const upstream = await fetchMedicoesFromUpstream({
    kind: "comparativo",
    obraAtivaId,
    token: auth.token,
    searchParams: req.nextUrl.searchParams,
  })

  if (!upstream.ok) return canonicalJson({ error: upstream.error }, { status: upstream.status })

  return canonicalJson(upstream.data)
}

