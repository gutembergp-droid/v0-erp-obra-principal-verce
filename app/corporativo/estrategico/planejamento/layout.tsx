"use client"

import type React from "react"
import { PlanejamentoProvider } from "@/contexts/planejamento-context"
import { CicloEstrategicoProvider } from "@/contexts/ciclo-estrategico-context"

export default function PlanejamentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CicloEstrategicoProvider>
      <PlanejamentoProvider>{children}</PlanejamentoProvider>
    </CicloEstrategicoProvider>
  )
}
