"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CicloEstrategico, EtapaCiclo } from "@/lib/types/planejamento"

interface PlanejamentoTopBarProps {
  ciclo?: CicloEstrategico
  currentPage: string
  pageTitle?: string
  actions?: React.ReactNode
}

const ETAPAS_CONFIG = [
  { id: "pestel", label: "PESTEL", path: "pestel" },
  { id: "swot", label: "SWOT", path: "swot" },
  { id: "gut", label: "GUT", path: "gut" },
  { id: "bcg", label: "BCG", path: "bcg" },
  { id: "okrs", label: "OKRs", path: "okrs" },
  { id: "monitoramento", label: "Monitor", path: "monitoramento" },
]

export function PlanejamentoTopBar({ ciclo, currentPage, pageTitle, actions }: PlanejamentoTopBarProps) {
  const router = useRouter()

  const etapaIndex = ETAPAS_CONFIG.findIndex((e) => e.id === ciclo?.etapaAtual)
  const etapasCompletas = ciclo?.etapasConcluidas.length || 0

  return (
    <div className="sticky top-0 z-50 bg-background border-b h-16">
      <div className="h-full px-4 flex items-center gap-4">
        {/* Breadcrumb e Título */}
        <div className="flex items-center gap-2 text-sm min-w-0">
          <Target className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-semibold text-foreground whitespace-nowrap">Planejamento Estratégico</span>
          {pageTitle && (
            <>
              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground font-medium truncate">{pageTitle}</span>
            </>
          )}
        </div>

        {/* Info do Ciclo (se existir) */}
        {ciclo && (
          <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground min-w-0">
            <span>•</span>
            <span className="font-medium text-foreground truncate">{ciclo.nome}</span>
            <span>•</span>
            <Badge variant="default" className="h-5 text-xs flex-shrink-0">
              {etapasCompletas + 1}/{ETAPAS_CONFIG.length}
            </Badge>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 min-w-0" />

        {/* Navegação por Etapas (se ciclo existir) */}
        {ciclo && (
          <div className="hidden xl:flex items-center gap-1">
            {ETAPAS_CONFIG.map((etapa, index) => {
              const isCompleted = ciclo.etapasConcluidas.includes(etapa.id as EtapaCiclo)
              const isCurrent = etapa.id === ciclo.etapaAtual
              const isActive = currentPage.includes(etapa.path)

              return (
                <Button
                  key={etapa.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 px-2 text-xs font-medium",
                    isCompleted && "text-green-600",
                    isCurrent && !isActive && "ring-1 ring-primary/30"
                  )}
                  onClick={() => router.push(`/corporativo/estrategico/planejamento/${etapa.path}/${ciclo.id}`)}
                >
                  {isCompleted ? "✓" : isCurrent ? "●" : "○"}
                  <span className="ml-1">{etapa.label}</span>
                </Button>
              )
            })}
          </div>
        )}

        {/* Actions */}
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  )
}
