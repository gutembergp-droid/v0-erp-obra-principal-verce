"use client"

import { Card } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { DollarSign, TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react"

// ============================================================================
// INTERFACE
// ============================================================================

interface KPIsPrimariosProps {
  pipelineTotal: number
  valorGanho: number
  taxaConversao: number
  totalAlertas: number
}

// ============================================================================
// SPARKLINE COMPONENT
// ============================================================================

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  return (
    <div className="flex items-end gap-0.5 h-6">
      {data.map((value, index) => {
        const height = ((value - min) / range) * 100
        return (
          <div
            key={index}
            className={`w-1 rounded-t transition-all duration-300 ${color}`}
            style={{ height: `${height}%` }}
          />
        )
      })}
    </div>
  )
}

// ============================================================================
// COMPONENT
// ============================================================================

export function KPIsPrimariosV2({ pipelineTotal, valorGanho, taxaConversao, totalAlertas }: KPIsPrimariosProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Dados simulados de sparkline (últimos 8 períodos)
  const sparklineData = {
    pipeline: [380, 395, 410, 425, 440, 435, 445, 450],
    ganho: [420, 435, 445, 455, 465, 470, 475, 478],
    conversao: [18, 16, 14, 12, 10, 8, 5, 0],
    alertas: [12, 10, 8, 6, 5, 3, 1, 0],
  }

  const kpis = [
    {
      titulo: "Pipeline Total",
      valor: formatCurrency(pipelineTotal),
      variacao: { valor: 12, tipo: "positivo" as const },
      sparkline: sparklineData.pipeline,
      sparklineColor: "bg-blue-500",
      icone: Target,
      cor: "text-blue-600",
      corFundo: "from-blue-50 to-blue-100/50",
      tooltip: {
        titulo: "Pipeline Total",
        descricao: "Valor total de todas as propostas ativas em disputa",
        itens: [
          "Escopo: Todas as propostas em andamento",
          "Período: Tempo real",
          "Filtros: Nenhum aplicado",
          "Exclui: Propostas fechadas e perdidas",
        ],
      },
    },
    {
      titulo: "Valor Ganho",
      valor: formatCurrency(valorGanho),
      variacao: { valor: 8, tipo: "positivo" as const },
      sparkline: sparklineData.ganho,
      sparklineColor: "bg-emerald-500",
      icone: DollarSign,
      cor: "text-emerald-600",
      corFundo: "from-emerald-50 to-emerald-100/50",
      tooltip: {
        titulo: "Valor Ganho",
        descricao: "Soma dos contratos fechados e ativos",
        itens: [
          "Escopo: Contratos ativos e em assinatura",
          "Período: Este ano (2026)",
          "Filtros: Nenhum aplicado",
          "Inclui: Valor com aditivos",
        ],
      },
    },
    {
      titulo: "Taxa de Conversão",
      valor: `${taxaConversao}%`,
      variacao: { valor: 5, tipo: "negativo" as const },
      sparkline: sparklineData.conversao,
      sparklineColor: "bg-purple-500",
      icone: TrendingUp,
      cor: "text-purple-600",
      corFundo: "from-purple-50 to-purple-100/50",
      tooltip: {
        titulo: "Taxa de Conversão",
        descricao: "Percentual de propostas ganhas sobre o total",
        itens: [
          "Cálculo: (Propostas Ganhas ÷ Total Propostas) × 100",
          "Período: Histórico completo",
          "Meta: Acima de 30%",
          "Benchmark: Setor médio 25%",
        ],
      },
    },
    {
      titulo: "Alertas Críticos",
      valor: totalAlertas.toString(),
      variacao: { valor: 100, tipo: "positivo" as const },
      sparkline: sparklineData.alertas,
      sparklineColor: totalAlertas > 0 ? "bg-red-500" : "bg-green-500",
      icone: AlertTriangle,
      cor: totalAlertas > 0 ? "text-red-600" : "text-green-600",
      corFundo: totalAlertas > 0 ? "from-red-50 to-red-100/50" : "from-green-50 to-green-100/50",
      tooltip: {
        titulo: "Alertas Críticos",
        descricao: "Total de alertas que requerem atenção imediata",
        itens: [
          "Crítico: Prazos < 3 dias",
          "Atenção: Follow-ups atrasados",
          "Escopo: Todas as entidades ativas",
          "Atualização: Tempo real",
        ],
      },
    },
  ]

  // Calcular tempo desde última atualização (simulado)
  const ultimaAtualizacao = "há 2 horas"

  return (
    <div className="grid grid-cols-4 gap-3">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icone
        const IconVariacao = kpi.variacao.tipo === "positivo" ? TrendingUp : TrendingDown
        const corVariacao = kpi.variacao.tipo === "positivo" ? "text-emerald-600" : "text-red-600"

        return (
          <Card
            key={index}
            className={`
              relative overflow-hidden border
              hover:border-primary/70 hover:shadow-lg
              transition-all duration-300 ease-in-out
              hover:scale-[1.02]
              group
              bg-gradient-to-br ${kpi.corFundo}
            `}
          >
            {/* Brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-3 space-y-2">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                    {kpi.titulo}
                  </p>
                  <InfoTooltip title={kpi.tooltip.titulo} description={kpi.tooltip.descricao}>
                    <ul className="text-xs space-y-1 mt-2">
                      {kpi.tooltip.itens.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </InfoTooltip>
                </div>
                <Icon className={`w-4 h-4 ${kpi.cor} opacity-70 group-hover:opacity-100 transition-opacity`} />
              </div>

              {/* Valor Principal */}
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold tracking-tight">{kpi.valor}</p>
                
                {/* Indicador de Variação */}
                <div className={`flex items-center gap-0.5 ${corVariacao} text-xs font-medium`}>
                  <IconVariacao className="w-3 h-3" />
                  <span>{kpi.variacao.valor}%</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="pt-1">
                <Sparkline data={kpi.sparkline} color={kpi.sparklineColor} />
              </div>

              {/* Última Atualização */}
              <div className="pt-1 border-t border-border/50">
                <p className="text-[9px] text-muted-foreground/70">
                  Atualizado {ultimaAtualizacao}
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
