"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { TrendingUp, DollarSign, Percent, Target, ChevronRight, Building2 } from "lucide-react"
import type { DadosConsolidado } from "@/lib/types/comercial"

// ============================================================================
// INTERFACE
// ============================================================================

interface CardConsolidadoProps {
  dados: DadosConsolidado
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CardConsolidado({ dados }: CardConsolidadoProps) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  return (
    <Card className="border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/corporativo/comercial/analytics")}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Consolidado Gerencial</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">Resultado • Qualidade das decisões</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* KPIs Primários */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <p className="text-xs text-muted-foreground">Valor Ganho</p>
            </div>
            <p className="text-xl font-bold text-emerald-600">{formatCurrency(dados.valorGanho)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-red-600" />
              <p className="text-xs text-muted-foreground">Valor Perdido</p>
            </div>
            <p className="text-xl font-bold text-red-600">{formatCurrency(dados.valorPerdido)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3 text-purple-600" />
              <p className="text-xs text-muted-foreground">Taxa Conversão</p>
            </div>
            <p className="text-xl font-bold">{dados.taxaConversao}%</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Percent className="w-3 h-3 text-blue-600" />
              <p className="text-xs text-muted-foreground">Margem Média</p>
            </div>
            <p className="text-xl font-bold">{formatPercent(dados.margemMedia)}</p>
          </div>
        </div>

        {/* Comparativo Visual Ganho vs Perdido */}
        <div className="pt-3 border-t space-y-2">
          <p className="text-xs font-medium">Ganho vs Perdido</p>
          <div className="flex h-8 rounded overflow-hidden border">
            <div
              className="bg-emerald-500 flex items-center justify-center text-white text-xs font-medium"
              style={{
                width: `${(dados.valorGanho / (dados.valorGanho + dados.valorPerdido)) * 100}%`,
              }}
            >
              {Math.round((dados.valorGanho / (dados.valorGanho + dados.valorPerdido)) * 100)}%
            </div>
            <div
              className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
              style={{
                width: `${(dados.valorPerdido / (dados.valorGanho + dados.valorPerdido)) * 100}%`,
              }}
            >
              {Math.round((dados.valorPerdido / (dados.valorGanho + dados.valorPerdido)) * 100)}%
            </div>
          </div>
        </div>

        {/* Indicadores Secundários */}
        <div className="pt-3 border-t space-y-2">
          <p className="text-xs font-medium">Indicadores de Qualidade</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded bg-muted">
              <p className="text-lg font-bold">{formatPercent(dados.descontoMedio)}</p>
              <p className="text-[10px] text-muted-foreground">Desconto Médio</p>
            </div>
            <div className="p-2 rounded bg-muted">
              <p className="text-lg font-bold">{formatCurrency(dados.ticketMedio)}</p>
              <p className="text-[10px] text-muted-foreground">Ticket Médio</p>
            </div>
            <div className="p-2 rounded bg-muted">
              <div className="flex items-center justify-center gap-1">
                <Building2 className="w-3 h-3 text-blue-600" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {dados.distribuicao.publico}% Público
              </p>
              <p className="text-[10px] text-muted-foreground">
                {dados.distribuicao.privado}% Privado
              </p>
            </div>
          </div>
        </div>

        {/* Avaliação de Margem */}
        <div className="pt-3 border-t">
          {dados.margemMedia >= 18 ? (
            <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
              <p className="text-xs text-emerald-900 font-medium">✓ Margem saudável acima de 18%</p>
            </div>
          ) : dados.margemMedia >= 15 ? (
            <div className="p-2 rounded bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-900 font-medium">⚠ Margem dentro do aceitável (15-18%)</p>
            </div>
          ) : (
            <div className="p-2 rounded bg-red-50 border border-red-200">
              <p className="text-xs text-red-900 font-medium">✕ Margem crítica abaixo de 15%</p>
            </div>
          )}
        </div>

        {/* Botão de Ação */}
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5" onClick={() => router.push("/corporativo/comercial/analytics")}>
          Ver Analytics Completo
          <ChevronRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
