"use client"

import { Card } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { DollarSign, TrendingUp, Target, AlertTriangle } from "lucide-react"

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
// COMPONENT
// ============================================================================

export function KPIsPrimarios({ pipelineTotal, valorGanho, taxaConversao, totalAlertas }: KPIsPrimariosProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const kpis = [
    {
      titulo: "Pipeline Total",
      valor: formatCurrency(pipelineTotal),
      icone: Target,
      cor: "text-blue-600",
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
      icone: DollarSign,
      cor: "text-emerald-600",
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
      icone: TrendingUp,
      cor: "text-purple-600",
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
      icone: AlertTriangle,
      cor: totalAlertas > 0 ? "text-red-600" : "text-green-600",
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

  return (
    <div className="grid grid-cols-4 gap-3">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icone
        return (
          <Card key={index} className="p-3 border hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">{kpi.titulo}</p>
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
                <p className="text-2xl font-bold">{kpi.valor}</p>
              </div>
              <Icon className={`w-5 h-5 ${kpi.cor}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
