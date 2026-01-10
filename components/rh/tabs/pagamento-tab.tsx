"use client"

import { Suspense } from "react"
import { PagamentoContent } from "@/app/corporativo/administrativo/rh/_components/pagamento-content"

export function PagamentoTab() {
  return (
    <Suspense fallback={<div>Carregando Pagamento...</div>}>
      <PagamentoContent />
    </Suspense>
  )
}
