"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Users, TrendingDown, AlertTriangle, Target, ChevronRight } from "lucide-react"
import type { DadosProspeccao } from "@/lib/types/comercial"

// ============================================================================
// COMPONENT
// ============================================================================

export function CardProspeccaoV2({ dados }: { dados: DadosProspeccao }) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Cálculos de inteligência
  const metaMensal = 20
  const percentualMeta = ((dados.prospeccoesAtivas / metaMensal) * 100).toFixed(0)
  const deficit = metaMensal - dados.prospeccoesAtivas
  const impactoPipeline60dias = deficit * 25000000 // Estimativa de valor por prospecção

  return (
    <Card className="border hover:border-primary/50 transition-colors h-full flex flex-col">
      <CardHeader className="pb-2 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-sm">PROSPECÇÃO</h3>
          </div>
          <Badge variant={Number.parseInt(percentualMeta) >= 100 ? "default" : "destructive"} className="text-xs">
            {percentualMeta}% da meta
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Futuro da receita • Geração de pipeline</p>
      </CardHeader>

      <CardContent className="space-y-2.5 flex-1 flex flex-col">
        {/* Indicador Principal com Contexto */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-bold">{dados.prospeccoesAtivas}</p>
              <p className="text-xs text-muted-foreground">Prospecções ativas</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-muted-foreground">Meta: {metaMensal}/mês</p>
              <p className="text-xs text-red-600 font-medium">Faltam {deficit}</p>
            </div>
          </div>

          {/* Progress da Meta */}
          <div className="space-y-1">
            <Progress value={Number.parseInt(percentualMeta)} className="h-2" />
            <p className="text-[10px] text-muted-foreground">
              Performance mensal • Atualizado hoje
            </p>
          </div>
        </div>

        {/* CAUSA e EFEITO */}
        <div className="p-3 rounded bg-red-50 border border-red-200">
          <div className="flex items-start gap-2">
            <TrendingDown className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-red-900">
                IMPACTO: Pipeline cairá {formatCurrency(impactoPipeline60dias)} em 60 dias
              </p>
              <div className="space-y-0.5">
                <p className="text-[10px] text-red-700">
                  <span className="font-semibold">CAUSA:</span> Prospecção {deficit * 5}% abaixo da meta
                </p>
                <p className="text-[10px] text-red-700">
                  <span className="font-semibold">AÇÃO:</span> Captar 8 clientes/mês para manter ritmo comercial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Secundários */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded border">
            <p className="text-xs text-muted-foreground">Valor Potencial</p>
            <p className="text-lg font-bold text-emerald-600">{formatCurrency(dados.valorPotencial)}</p>
          </div>
          <div className="p-2 rounded border">
            <p className="text-xs text-muted-foreground">Clientes Novos</p>
            <div className="flex items-baseline gap-1">
              <p className="text-lg font-bold">{dados.clientesNovos}</p>
              <span className="text-[10px] text-muted-foreground">últimos 30d</span>
            </div>
          </div>
        </div>

        {/* Distribuição com Insight */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Distribuição por Tipo</p>
            <p className="text-xs text-muted-foreground">Público {dados.distribuicao.publico}% • Privado {dados.distribuicao.privado}%</p>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500" style={{ width: `${dados.distribuicao.publico}%` }} />
            <div className="bg-purple-500" style={{ width: `${dados.distribuicao.privado}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground">
            💡 Insight: Diversificar para privado reduz dependência de licitações
          </p>
        </div>

        {/* Alertas Acionáveis */}
        {dados.alertas.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <p className="text-xs font-medium">Requer Atenção</p>
            </div>
            {dados.alertas.slice(0, 2).map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-2 p-2 rounded bg-amber-50 border border-amber-200 text-xs">
                <Target className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-amber-900">{alerta.mensagem}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ação */}
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs gap-1.5 hover:bg-blue-50"
          onClick={() => router.push("/corporativo/comercial/clientes")}
        >
          Ativar prospecções paradas
          <ChevronRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
