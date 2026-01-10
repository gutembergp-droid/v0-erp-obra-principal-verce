"use client"

import { Calendar, Target, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { CicloEstrategico, StatusCiclo } from "@/lib/types/planejamento"
import { cn } from "@/lib/utils"

interface CicloHeaderProps {
  ciclo: CicloEstrategico
}

const STATUS_CONFIG: Record<StatusCiclo, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  rascunho: { label: "Rascunho", variant: "outline" },
  aprovado: { label: "Aprovado", variant: "secondary" },
  em_execucao: { label: "Em Execução", variant: "default" },
  encerrado: { label: "Encerrado", variant: "destructive" },
}

export function CicloHeader({ ciclo }: CicloHeaderProps) {
  const statusConfig = STATUS_CONFIG[ciclo.status]

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className="p-3 border-l-2 border-l-primary">
      <div className="flex items-center justify-between gap-4">
        {/* Informações principais */}
        <div className="flex items-center gap-4 flex-1">
          <Target className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-base font-bold text-foreground">{ciclo.nome}</h1>
            <Badge variant={statusConfig.variant} className="text-xs h-5">
              {statusConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {formatarData(ciclo.periodo.inicio)} - {formatarData(ciclo.periodo.fim)}
            </span>
            <Badge variant="outline" className="text-xs h-5">
              {ciclo.periodo.tipo}
            </Badge>
          </div>
        </div>

        {/* Estatísticas compactas */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-primary">{ciclo.etapasConcluidas.length}</span>
            <span>etapas</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{ciclo.governante.nome}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
