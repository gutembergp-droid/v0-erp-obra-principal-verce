"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { TrendingUp, Award, Target, ChevronRight, DollarSign } from "lucide-react"
import type { DadosConsolidado } from "@/lib/types/comercial"

// ============================================================================
// COMPONENT
// ============================================================================

export function CardConsolidadoV2({ dados }: { dados: DadosConsolidado }) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Cálculos de inteligência
  const margemSetor = 15.2
  const diferencaMargem = dados.margemMedia - margemSetor
  const metaAnual = 800000000
  const pipelineAtual = 450000000
  const projecaoAnual = dados.valorGanho + pipelineAtual
  const percentualMeta = ((projecaoAnual / metaAnual) * 100).toFixed(0)

  return (
    <Card className="border hover:border-primary/50 transition-colors h-full flex flex-col">
      <CardHeader className="pb-2 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-sm">CONSOLIDADO GERENCIAL</h3>
          </div>
          <Badge variant="default" className="text-xs bg-emerald-600">
            Margem {dados.margemMedia.toFixed(1)}%
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Resultado • Qualidade comercial</p>
      </CardHeader>

      <CardContent className="space-y-2.5 flex-1 flex flex-col">
        {/* Ganho vs Perdido */}
        <div className="space-y-2">
          <p className="text-xs font-medium">Performance Competitiva</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 rounded bg-emerald-50 border border-emerald-200">
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(dados.valorGanho)}</p>
              <p className="text-[10px] text-emerald-700">Ganho</p>
            </div>
            <div className="text-center p-2 rounded bg-red-50 border border-red-200">
              <p className="text-lg font-bold text-red-600">{formatCurrency(dados.valorPerdido)}</p>
              <p className="text-[10px] text-red-700">Perdido</p>
            </div>
          </div>

          {/* Comparativo Visual */}
          <div className="flex h-6 rounded overflow-hidden border">
            <div
              className="bg-emerald-500 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(dados.valorGanho / (dados.valorGanho + dados.valorPerdido)) * 100}%` }}
            >
              {Math.round((dados.valorGanho / (dados.valorGanho + dados.valorPerdido)) * 100)}%
            </div>
            <div
              className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(dados.valorPerdido / (dados.valorGanho + dados.valorPerdido)) * 100}%` }}
            >
              {Math.round((dados.valorPerdido / (dados.valorGanho + dados.valorPerdido)) * 100)}%
            </div>
          </div>
        </div>

        {/* BENCHMARK SETORIAL */}
        <div className="p-3 rounded bg-emerald-50 border border-emerald-200">
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-emerald-900">
                MARGEM {diferencaMargem.toFixed(1)}pp ACIMA DO SETOR
              </p>
              <div className="space-y-0.5">
                <p className="text-[10px] text-emerald-700">
                  <span className="font-semibold">BENCHMARK:</span> Setor infraestrutura {margemSetor}% • Nós: {dados.margemMedia.toFixed(1)}%
                </p>
                <p className="text-[10px] text-emerald-700">
                  <span className="font-semibold">RANKING:</span> Top 3 Brasil em obras de infraestrutura
                </p>
                <p className="text-[10px] text-emerald-700">
                  <span className="font-semibold">VANTAGEM:</span> Custo {diferencaMargem.toFixed(1)}% mais eficiente que concorrentes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROJEÇÃO ANUAL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Projeção Anual (Ganho + Pipeline)</p>
            <Badge variant={Number.parseInt(percentualMeta) >= 100 ? "default" : "secondary"} className="text-xs">
              {percentualMeta}% da meta
            </Badge>
          </div>

          <div className="p-2 rounded border bg-muted/30">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-muted-foreground">Fechando pipeline atual:</span>
              <span className="text-lg font-bold">{formatCurrency(projecaoAnual)}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${Math.min(Number.parseInt(percentualMeta), 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">Meta: {formatCurrency(metaAnual)}</span>
              {Number.parseInt(percentualMeta) >= 100 && (
                <span className="text-[10px] text-emerald-600 font-bold">
                  ULTRAPASSAR {percentualMeta}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Indicadores de Qualidade */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded border bg-muted/30">
            <p className="text-sm font-bold">{dados.descontoMedio.toFixed(1)}%</p>
            <p className="text-[9px] text-muted-foreground">Desconto Médio</p>
          </div>
          <div className="text-center p-2 rounded border bg-muted/30">
            <p className="text-sm font-bold">{formatCurrency(dados.ticketMedio)}</p>
            <p className="text-[9px] text-muted-foreground">Ticket Médio</p>
          </div>
          <div className="text-center p-2 rounded border bg-muted/30">
            <p className="text-sm font-bold">{dados.taxaConversao}%</p>
            <p className="text-[9px] text-muted-foreground">Taxa Conv.</p>
          </div>
        </div>

        {/* Avaliação Final */}
        <div className="p-2 rounded border-2 border-emerald-300 bg-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <p className="text-xs font-bold text-emerald-900">
                Performance Excelente
              </p>
            </div>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] text-emerald-700 mt-1">
            Margem saudável • Pipeline robusto • Meta projetada para superar
          </p>
        </div>

        {/* Ação */}
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs gap-1.5 hover:bg-emerald-50"
          onClick={() => router.push("/corporativo/comercial/analytics")}
        >
          Ver análise completa
          <ChevronRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
