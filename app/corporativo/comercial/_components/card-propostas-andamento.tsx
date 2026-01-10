"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { FileText, DollarSign, Clock, AlertTriangle, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import type { DadosPropostasAndamento } from "@/lib/types/comercial"

// ============================================================================
// INTERFACE
// ============================================================================

interface CardPropostasAndamentoProps {
  dados: DadosPropostasAndamento
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CardPropostasAndamento({ dados }: CardPropostasAndamentoProps) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getStatusIcon = (status: "ok" | "atencao" | "atrasado") => {
    if (status === "ok") return <CheckCircle2 className="w-3 h-3 text-green-600" />
    if (status === "atencao") return <Clock className="w-3 h-3 text-amber-600" />
    return <XCircle className="w-3 h-3 text-red-600" />
  }

  const getStatusColor = (status: "ok" | "atencao" | "atrasado") => {
    if (status === "ok") return "bg-green-500"
    if (status === "atencao") return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card className="border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/corporativo/comercial/propostas")}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Propostas em Andamento</CardTitle>
          <FileText className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">Disputando agora • Execução e prazos</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3 text-blue-600" />
              <p className="text-xs text-muted-foreground">Propostas Ativas</p>
            </div>
            <p className="text-xl font-bold">{dados.propostasAtivas}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <p className="text-xs text-muted-foreground">Em Disputa</p>
            </div>
            <p className="text-xl font-bold text-emerald-600">{formatCurrency(dados.valorEmDisputa)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-600" />
              <p className="text-xs text-muted-foreground">Prazo Médio</p>
            </div>
            <p className="text-xl font-bold">{dados.prazoMedio} dias</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-red-600" />
              <p className="text-xs text-muted-foreground">Em Risco</p>
            </div>
            <p className="text-xl font-bold text-red-600">{dados.percentualRisco}%</p>
          </div>
        </div>

        {/* Status por Etapa */}
        <div className="pt-3 border-t space-y-2">
          <p className="text-xs font-medium">Status por Etapa</p>
          {dados.statusPorEtapa.map((etapa, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {getStatusIcon(etapa.status)}
                  <span className="text-xs font-medium">{etapa.nome}</span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {etapa.quantidade}
                </Badge>
              </div>
              <Progress value={(etapa.quantidade / dados.propostasAtivas) * 100} className={`h-1 ${getStatusColor(etapa.status)}`} />
            </div>
          ))}
        </div>

        {/* Alertas */}
        {dados.alertas.length > 0 && (
          <div className="pt-3 border-t space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-red-600" />
              <p className="text-xs font-medium">Alertas Críticos</p>
            </div>
            {dados.alertas.slice(0, 2).map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-2 p-2 rounded bg-red-50 border border-red-200">
                <AlertTriangle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-900">{alerta.mensagem}</p>
              </div>
            ))}
            {dados.alertas.length > 2 && (
              <p className="text-[10px] text-muted-foreground">
                +{dados.alertas.length - 2} alertas adicionais
              </p>
            )}
          </div>
        )}

        {/* Botão de Ação */}
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5" onClick={() => router.push("/corporativo/comercial/propostas")}>
          Ver Todas Propostas
          <ChevronRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
