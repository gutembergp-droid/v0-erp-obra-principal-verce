"use client"

import { Suspense } from "react"
import { PontoContent } from "@/app/corporativo/administrativo/rh/_components/ponto-content"

export function PontoTab() {
  return (
    <Suspense fallback={<div>Carregando Ponto...</div>}>
      <PontoContent />
    </Suspense>
  )
}
