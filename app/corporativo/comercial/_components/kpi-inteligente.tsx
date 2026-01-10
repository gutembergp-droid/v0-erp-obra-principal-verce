"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, TrendingDown, Target, ChevronRight, Clock, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

// ============================================================================
// INTERFACES
// ============================================================================

interface KPIInteligenteProps {
  tipo: "pipeline" | "ganho" | "conversao" | "risco"
  dados: any
}

// ============================================================================
// COMPONENT
// ============================================================================

export function KPIInteligente({ tipo, dados }: KPIInteligenteProps) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // ============================================================================
  // PIPELINE EM DISPUTA
  // ============================================================================
  if (tipo === "pipeline") {
    const metaTrimestre = 530000000
    const percentualMeta = ((dados.valor / metaTrimestre) * 100).toFixed(0)
    const faltaMeta = metaTrimestre - dados.valor
    const vencendo7dias = 120000000

    return (
      <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-all">
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-sm">PIPELINE EM DISPUTA</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Propostas ativas sendo disputadas</p>
            </div>
            <Badge variant={Number.parseInt(percentualMeta) >= 100 ? "default" : "secondary"} className="text-xs">
              {percentualMeta}% da meta
            </Badge>
          </div>

          {/* Valor Principal */}
          <div className="space-y-1">
            <p className="text-3xl font-bold">{formatCurrency(dados.valor)}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Meta trimestre:</span>
              <span className="font-medium">{formatCurrency(metaTrimestre)}</span>
              {faltaMeta > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-amber-600 font-medium">Faltam {formatCurrency(faltaMeta)}</span>
                </>
              )}
            </div>
          </div>

          {/* Alerta Crítico */}
          <div className="p-2 rounded bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-amber-900">
                  {formatCurrency(vencendo7dias)} vencem em 7 dias
                </p>
                <p className="text-[10px] text-amber-700">
                  3 propostas • Ação: Follow-up urgente com decisores
                </p>
              </div>
            </div>
          </div>

          {/* Ação */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs gap-1.5 hover:bg-blue-50"
            onClick={() => router.push("/corporativo/comercial/propostas")}
          >
            Ver propostas críticas
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </Card>
    )
  }

  // ============================================================================
  // CONTRATOS FECHADOS
  // ============================================================================
  if (tipo === "ganho") {
    const margem = 18.5
    const margemSetor = 15.2
    const metaAnual = 800000000
    const projecao = dados.valor + dados.pipelineAtual
    const percentualProjecao = ((projecao / metaAnual) * 100).toFixed(0)

    return (
      <Card className="border-l-4 border-l-emerald-600 hover:shadow-lg transition-all">
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-sm">CONTRATOS FECHADOS</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Valor ganho com margem saudável</p>
            </div>
            <Badge variant="default" className="text-xs bg-emerald-600">
              Margem {margem}%
            </Badge>
          </div>

          {/* Valor Principal */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-emerald-600">{formatCurrency(dados.valor)}</p>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">
                {dados.quantidade} contratos ativos
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-amber-600">2 aguardando assinatura</span>
            </div>
          </div>

          {/* Benchmark */}
          <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-emerald-900">
                  Margem {margem - margemSetor}pp ACIMA do setor
                </p>
                <p className="text-[10px] text-emerald-700">
                  Benchmark infraestrutura: {margemSetor}% • Ranking: Top 3 Brasil
                </p>
              </div>
            </div>
          </div>

          {/* Projeção */}
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-medium uppercase">Projeção Anual:</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{formatCurrency(projecao)}</span>
              <Badge variant="default" className="text-[10px]">
                {percentualProjecao}% da meta
              </Badge>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${Math.min(Number.parseInt(percentualProjecao), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // ============================================================================
  // CONVERSÃO & VELOCIDADE
  // ============================================================================
  if (tipo === "conversao") {
    const tempoMedioFunil = 87
    const metaTempo = 60
    const propostasParadas = 3

    return (
      <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-all">
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-sm">CONVERSÃO & VELOCIDADE</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Performance do funil de vendas</p>
            </div>
            <Badge variant="destructive" className="text-xs">
              CRÍTICO
            </Badge>
          </div>

          {/* Taxa de Conversão */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-red-600">{dados.taxa}%</p>
              <span className="text-xs text-muted-foreground">conversão (meta: 20%)</span>
            </div>
            <p className="text-xs text-red-600 font-medium">
              0 de 12 propostas convertidas neste trimestre
            </p>
          </div>

          {/* Tempo no Funil */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tempo médio no funil:</span>
              <span className="font-bold text-red-600">{tempoMedioFunil} dias</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-red-600" style={{ width: "70%" }} />
            </div>
            <p className="text-[10px] text-red-600">
              {tempoMedioFunil - metaTempo} dias ACIMA da meta • Funil LENTO
            </p>
          </div>

          {/* Proposta Paradas */}
          <div className="p-2 rounded bg-red-50 border border-red-200">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-red-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-red-900">
                  {propostasParadas} propostas PARADAS há 15+ dias
                </p>
                <p className="text-[10px] text-red-700">
                  R$ 280Mi travado • Etapa: Orçamento • Responsável: Pedro Alves
                </p>
              </div>
            </div>
          </div>

          {/* Ação */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs gap-1.5 hover:bg-red-50 text-red-600 border-red-200"
            onClick={() => router.push("/corporativo/comercial/propostas")}
          >
            <Zap className="w-3 h-3" />
            Destravar funil AGORA
          </Button>
        </div>
      </Card>
    )
  }

  // ============================================================================
  // SITUAÇÃO CRÍTICA (RISCO)
  // ============================================================================
  if (tipo === "risco") {
    const riscoTotal = 890000000

    return (
      <Card className="border-l-4 border-l-orange-600 hover:shadow-lg transition-all animate-pulse">
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 animate-pulse" />
                <h3 className="font-semibold text-sm">SITUAÇÃO CRÍTICA</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Ação imediata necessária</p>
            </div>
            <Badge variant="destructive" className="text-xs animate-pulse">
              URGENTE
            </Badge>
          </div>

          {/* Valor em Risco */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-orange-600">{formatCurrency(riscoTotal)}</p>
            <p className="text-xs text-orange-600 font-medium">EM RISCO IMEDIATO</p>
          </div>

          {/* Alertas Críticos */}
          <div className="space-y-2">
            <div className="p-2 rounded bg-red-50 border border-red-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-red-900">UHE Belo Monte vence AMANHÃ</p>
                  <p className="text-[10px] text-red-700 mt-0.5">
                    R$ 890Mi • Cliente sem resposta há 6 dias • Contato: Roberto Fernandes
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2 rounded bg-amber-50 border border-amber-300">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-900">BR-116 sem follow-up</p>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    R$ 450Mi • 6 dias sem contato • Última ação: 04/01
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2 rounded bg-amber-50 border border-amber-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-900">SABESP há 12 dias parada</p>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    R$ 280Mi • Aguardando especificações técnicas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ação */}
          <Button
            variant="destructive"
            size="sm"
            className="w-full text-xs gap-1.5 animate-pulse"
            onClick={() => router.push("/corporativo/comercial/propostas")}
          >
            <Zap className="w-3 h-3" />
            RESOLVER AGORA
          </Button>
        </div>
      </Card>
    )
  }

  return null
}
