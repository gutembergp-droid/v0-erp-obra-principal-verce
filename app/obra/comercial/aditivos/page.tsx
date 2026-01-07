"use client"

import { InfoTooltip } from "@/components/ui/info-tooltip"

export default function AditivosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Aditivos Contratuais</h1>
        <InfoTooltip
          title="Gestao de Aditivos"
          description="Controle de aditivos contratuais, reequilibrios e termos de ajuste."
        />
      </div>
      <p className="text-muted-foreground">Pagina em construcao</p>
    </div>
  )
}
