"use client"

import { Suspense } from "react"
import { PessoasContent } from "@/app/corporativo/administrativo/rh/_components/pessoas-content"

export function PessoasTab() {
  return (
    <Suspense fallback={<div>Carregando Pessoas...</div>}>
      <PessoasContent />
    </Suspense>
  )
}
