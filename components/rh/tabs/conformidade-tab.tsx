"use client"

import { Suspense } from "react"
import { ConformidadeContent } from "@/app/corporativo/administrativo/rh/_components/conformidade-content"

export function ConformidadeTab() {
  return (
    <Suspense fallback={<div>Carregando Conformidade...</div>}>
      <ConformidadeContent />
    </Suspense>
  )
}
