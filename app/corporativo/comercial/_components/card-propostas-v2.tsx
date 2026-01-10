"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { FileText, Clock, Zap, AlertTriangle, ChevronRight } from "lucide-react"
import type { DadosPropostasAndamento } from "@/lib/types/comercial"

// ============================================================================
// COMPONENT
// ============================================================================

export function CardPropostasV2({ dados }: { dados: DadosPropostasAndamento }) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Encontrar etapa travada
  const etapaTravada = dados.statusPorEtapa.find(e => e.status === "atrasado")
  const valorTravado = etapaTravada ? 280000000 : 0

  return (
    <Card className="border hover:border-primary/50 transition-colors h-full flex flex-col">
      <CardHeader className="pb-2 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-sm">PROPOSTAS EM ANDAMENTO</h3>
          </div>
          <Badge variant={dados.percentualRisco > 30 ? "destructive" : "secondary"} className="text-xs">
            {dados.percentualRisco}% em risco
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Disputando agora • Controle de execução</p>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col">
        {/* Indicadores Principais */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Propostas Ativas</p>
            <p className="text-2xl font-bold">{dados.propostasAtivas}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Valor em Disputa</p>
            <p className="text-2xl font-bold text-purple-600">{formatCurrency(dados.valorEmDisputa)}</p>
          </div>
        </div>

        {/* Velocidade do Funil */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Velocidade do Funil</p>
            <Badge variant="outline" className="text-xs">
              {dados.prazoMedio} dias médio
            </Badge>
          </div>
          <div className="p-2 rounded border">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Meta:</span>
              <span className="font-medium">60 dias</span>
            </div>
            <Progress value={70} className="h-1.5 bg-red-100" />
            <p className="text-[10px] text-red-600 mt-1">
              {dados.prazoMedio - 60} dias mais lento que o ideal
            </p>
          </div>
        </div>

        {/* ONDE ESTÁ TRAVADO */}
        {etapaTravada && (
          <div className="p-3 rounded bg-red-50 border border-red-200">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-red-900">
                  TRAVADO EM: {etapaTravada.nome}
                </p>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-red-700">
                    <span className="font-semibold">IMPACTO:</span> {formatCurrency(valorTravado)} parado há 20+ dias
                  </p>
                  <p className="text-[10px] text-red-700">
                    <span className="font-semibold">RESPONSÁVEL:</span> Pedro Alves (Área de Custos)
                  </p>
                  <p className="text-[10px] text-red-700">
                    <span className="font-semibold">AÇÃO:</span> Escalar para Diretoria • Prazo vencendo
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status por Etapa (Compacto) */}
        <div className="space-y-2">
          <p className="text-xs font-medium">Pipeline por Etapa</p>
          {dados.statusPorEtapa.map((etapa, index) => {
            const cor = etapa.status === "ok" ? "bg-green-500" : etapa.status === "atencao" ? "bg-amber-500" : "bg-red-500"
            const percentual = (etapa.quantidade / dados.propostasAtivas) * 100

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={etapa.status === "atrasado" ? "font-bold text-red-600" : ""}>
                    {etapa.nome}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {etapa.quantidade}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={percentual} className="h-1 flex-1" />
                  <span className="text-[10px] text-muted-foreground w-10 text-right">
                    {percentual.toFixed(0)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Alertas */}
        {dados.alertas.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-red-600" />
              <p className="text-xs font-medium text-red-600">Prazos Críticos</p>
            </div>
            {dados.alertas.slice(0, 2).map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-2 p-2 rounded bg-red-50 border border-red-200 text-xs">
                <Clock className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-900 font-medium">{alerta.mensagem}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ação */}
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs gap-1.5 hover:bg-purple-50"
          onClick={() => router.push("/corporativo/comercial/propostas")}
        >
          <Zap className="w-3 h-3" />
          Destravar etapas críticas
        </Button>
      </CardContent>
    </Card>
  )
}
