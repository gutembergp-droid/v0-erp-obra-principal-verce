"use client"

import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ObraComercialNavbar } from "../_components/obra-comercial-navbar"

export default function AditivosPage() {
  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
        </div>
      </main>
    </div>
  )
}
