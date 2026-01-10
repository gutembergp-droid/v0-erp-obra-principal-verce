"use client"

import { useParams, useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Target,
  DollarSign,
} from "lucide-react"
import type { ComparacaoMetrica } from "@/lib/types/planejamento"

export default function RevisaoPeriodica() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, getRevisoesParaCiclo } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const revisoes = getRevisoesParaCiclo(cicloId)

  // Mock de comparações
  const comparacoes: ComparacaoMetrica[] = [
    {
      metrica: "Receita Total",
      projetado: 150000000,
      real: 142000000,
      desvio: -5.3,
      status: "parcial",
      impacto: "negativo",
      observacao: "Meta não atingida devido a atrasos em 2 obras",
    },
    {
      metrica: "Margem Bruta (%)",
      projetado: 12,
      real: 10.5,
      desvio: -12.5,
      status: "parcial",
      impacto: "negativo",
      observacao: "Aumento de custos com materiais",
    },
    {
      metrica: "Obras Entregues",
      projetado: 15,
      real: 13,
      desvio: -13.3,
      status: "parcial",
      impacto: "negativo",
    },
    {
      metrica: "Novos Contratos",
      projetado: 8,
      real: 10,
      desvio: 25,
      status: "superado",
      impacto: "positivo",
      observacao: "Expansão comercial bem-sucedida",
    },
    {
      metrica: "EBITDA (%)",
      projetado: 10,
      real: 8.2,
      desvio: -18,
      status: "parcial",
      impacto: "negativo",
    },
    {
      metrica: "Fluxo de Caixa (R$ M)",
      projetado: 15,
      real: 12.5,
      desvio: -16.7,
      status: "parcial",
      impacto: "negativo",
    },
  ]

  const licoesAprendidas = [
    "Necessidade de melhor gestão de prazos em obras de grande porte",
    "Controle de custos de materiais precisa ser fortalecido",
    "Estratégia comercial agressiva gerou resultados positivos",
    "Processos de aprovação de projetos precisam ser otimizados",
  ]

  const ajustesSugeridos = [
    {
      area: "Obras",
      tipo: "Meta",
      descricao: "Ajustar meta de obras entregues considerando complexidade",
      justificativa: "Obras de infraestrutura têm prazo médio 20% maior que o estimado",
      prioridade: "alta" as const,
    },
    {
      area: "Financeiro",
      tipo: "Recurso",
      descricao: "Implementar hedge para materiais estratégicos",
      justificativa: "Volatilidade de preços impactou margem em 2025",
      prioridade: "alta" as const,
    },
    {
      area: "Comercial",
      tipo: "Processo",
      descricao: "Manter estratégia agressiva de captação",
      justificativa: "Resultados superaram expectativas",
      prioridade: "media" as const,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      superado: { label: "Superado", variant: "default" as const, color: "text-emerald-700 bg-emerald-100" },
      atingido: { label: "Atingido", variant: "default" as const, color: "text-green-700 bg-green-100" },
      parcial: { label: "Parcial", variant: "secondary" as const, color: "text-amber-700 bg-amber-100" },
      nao_atingido: { label: "Não Atingido", variant: "destructive" as const, color: "text-red-700 bg-red-100" },
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.parcial
  }

  const getImpactoIcon = (impacto: string) => {
    if (impacto === "positivo") return <TrendingUp className="h-5 w-5 text-emerald-600" />
    if (impacto === "negativo") return <TrendingDown className="h-5 w-5 text-red-600" />
    return <Target className="h-5 w-5 text-gray-600" />
  }

  const getPrioridadeBadge = (prioridade: string) => {
    const prioridadeMap = {
      alta: "destructive" as const,
      media: "secondary" as const,
      baixa: "outline" as const,
    }
    return prioridadeMap[prioridade as keyof typeof prioridadeMap] || "outline"
  }

  if (!ciclo) {
    return (
      <>
        <Header title="Planejamento não encontrado" subtitle="" />
        <PageContent>
          <Button onClick={() => router.back()}>Voltar</Button>
        </PageContent>
      </>
    )
  }

  return (
    <>
      <Header
        title={`${ciclo.nome} › Revisão Periódica`}
        subtitle="Comparação entre projeções e resultados consolidados"
      />
      <PageContent>
        {/* Alerta de Revisão */}
        <Card className="mb-6 border-2 border-amber-200 bg-amber-50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
              <div className="flex-1">
                <CardTitle className="text-amber-900">Revisão Periódica Disponível</CardTitle>
                <CardDescription className="text-amber-700 mt-1">
                  Analise os desvios entre o projetado e o realizado para ajustar o planejamento de {new Date().getFullYear()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Resumo Consolidado */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Metas Superadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">
                  {comparacoes.filter((c) => c.status === "superado").length}
                </span>
                <CheckCircle2 className="h-8 w-8 text-emerald-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Parcialmente Atingidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-600">
                  {comparacoes.filter((c) => c.status === "parcial").length}
                </span>
                <Target className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Não Atingidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {comparacoes.filter((c) => c.status === "nao_atingido").length}
                </span>
                <TrendingDown className="h-8 w-8 text-red-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ajustes Sugeridos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{ajustesSugeridos.length}</span>
                <FileText className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparações Detalhadas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comparação: Projetado vs. Real (2025)</CardTitle>
            <CardDescription>Análise detalhada dos principais indicadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparacoes.map((comp, idx) => {
                const statusInfo = getStatusBadge(comp.status)
                const isValorMonetario = comp.metrica.includes("Receita") || comp.metrica.includes("Fluxo")

                return (
                  <div key={idx} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getImpactoIcon(comp.impacto)}
                        <div>
                          <h4 className="font-semibold">{comp.metrica}</h4>
                          {comp.observacao && (
                            <p className="text-sm text-muted-foreground mt-1">{comp.observacao}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-xs text-blue-700 mb-1">Projetado</p>
                        <p className="text-lg font-bold text-blue-900">
                          {isValorMonetario
                            ? `R$ ${(comp.projetado / 1000000).toFixed(1)}M`
                            : comp.projetado.toLocaleString("pt-BR")}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                        <p className="text-xs text-emerald-700 mb-1">Realizado</p>
                        <p className="text-lg font-bold text-emerald-900">
                          {isValorMonetario
                            ? `R$ ${(comp.real / 1000000).toFixed(1)}M`
                            : comp.real.toLocaleString("pt-BR")}
                        </p>
                      </div>

                      <div
                        className={`p-3 rounded-lg border ${
                          comp.desvio >= 0
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <p
                          className={`text-xs mb-1 ${
                            comp.desvio >= 0 ? "text-emerald-700" : "text-red-700"
                          }`}
                        >
                          Desvio
                        </p>
                        <p
                          className={`text-lg font-bold ${
                            comp.desvio >= 0 ? "text-emerald-900" : "text-red-900"
                          }`}
                        >
                          {comp.desvio > 0 ? "+" : ""}
                          {comp.desvio.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Lições Aprendidas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lições Aprendidas</CardTitle>
            <CardDescription>Insights para o próximo ciclo</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {licoesAprendidas.map((licao, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-900">{licao}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Ajustes Sugeridos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ajustes Sugeridos para {new Date().getFullYear()}</CardTitle>
            <CardDescription>Recomendações baseadas na análise comparativa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ajustesSugeridos.map((ajuste, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{ajuste.area}</Badge>
                        <Badge variant="secondary">{ajuste.tipo}</Badge>
                        <Badge variant={getPrioridadeBadge(ajuste.prioridade)}>
                          {ajuste.prioridade.charAt(0).toUpperCase() + ajuste.prioridade.slice(1)}
                        </Badge>
                      </div>
                      <h4 className="font-semibold">{ajuste.descricao}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Justificativa:</strong> {ajuste.justificativa}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Aplicar Ajustes ao Planejamento Atual
          </Button>
        </div>
      </PageContent>
    </>
  )
}
