"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadialProgress } from "@/components/ui/radial-progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import {
  DollarSign,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowLeft,
  BarChart3,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function FinanceiroDepartamental() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, getOKRsDepartamento } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const okrsFinanceiro = getOKRsDepartamento(cicloId, "financeiro")

  // Mock de OKRs (em produção, viriam do context)
  const okrsMock = [
    {
      id: "okr-fin-001",
      objetivo: "Aumentar margem bruta média para 12%",
      previsto: 90,
      realizado: 88,
      status: "ativo",
      keyResults: [
        { descricao: "Margem > 12% em obras estratégicas", previsto: 90, realizado: 88, meta: "12%", atual: "10.5%" },
        { descricao: "Reduzir custos indiretos em 8%", previsto: 50, realizado: 40, meta: "8%", atual: "3.2%" },
        { descricao: "Otimizar 5 obras de baixa margem", previsto: 48, realizado: 40, meta: "5", atual: "2" },
      ],
    },
    {
      id: "okr-fin-002",
      objetivo: "Otimizar fluxo de caixa operacional",
      previsto: 75,
      realizado: 65,
      status: "ativo",
      keyResults: [
        { descricao: "Reduzir PMR para 45 dias", previsto: 70, realizado: 65, meta: "45 dias", atual: "52 dias" },
        { descricao: "Aumentar giro de estoque em 20%", previsto: 75, realizado: 72, meta: "20%", atual: "14.4%" },
      ],
    },
    {
      id: "okr-fin-003",
      objetivo: "Reduzir inadimplência para menos de 2%",
      previsto: 50,
      realizado: 30,
      status: "atrasado",
      keyResults: [
        { descricao: "Inadimplência < 2%", previsto: 45, realizado: 30, meta: "2%", atual: "3.2%" },
        { descricao: "Recuperar R$ 5M de créditos", previsto: 35, realizado: 20, meta: "R$ 5M", atual: "R$ 1M" },
      ],
    },
  ]

  // Dados para gráficos
  const dadosEvolucao = [
    { mes: "Jan", margem: 9.5, meta: 12 },
    { mes: "Fev", margem: 9.8, meta: 12 },
    { mes: "Mar", margem: 10.2, meta: 12 },
    { mes: "Abr", margem: 10.5, meta: 12 },
    { mes: "Mai", margem: 10.8, meta: 12 },
    { mes: "Jun", margem: 11.2, meta: 12 },
  ]

  const dadosIndicadores = [
    { indicador: "Receita", valor: 142, meta: 150 },
    { indicador: "Margem", valor: 10.5, meta: 12 },
    { indicador: "EBITDA", valor: 8.2, meta: 10 },
    { indicador: "Fluxo Caixa", valor: 12.5, meta: 15 },
  ]

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
        title={`${ciclo.nome} › Financeiro`}
        subtitle="Estratégia financeira, OKRs e indicadores gerenciais"
      />
      <PageContent>
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">OKRs Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{okrsMock.length}</span>
                <Target className="h-8 w-8 text-emerald-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Realizado Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {Math.round(okrsMock.reduce((acc, o) => acc + o.realizado, 0) / okrsMock.length)}%
                </span>
                <TrendingUp className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">No Prazo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  {okrsMock.filter((o) => o.status === "ativo").length}
                </span>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-600">
                  {okrsMock.filter((o) => o.status === "atrasado").length}
                </span>
                <AlertTriangle className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="estrategia" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="estrategia">Estratégia</TabsTrigger>
            <TabsTrigger value="okrs">OKRs</TabsTrigger>
            <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
            <TabsTrigger value="analises">Análises</TabsTrigger>
          </TabsList>

          {/* Tab: Estratégia */}
          <TabsContent value="estrategia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Estratégia Financeira (Desdobrada do Corporativo)</CardTitle>
                <CardDescription>Direcionamentos estratégicos para o departamento financeiro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900">Reduzir custos indiretos em 8%</p>
                      <p className="text-sm text-emerald-700">
                        Otimizar despesas administrativas e overhead operacional
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Aumentar margem bruta para 12%</p>
                      <p className="text-sm text-blue-700">
                        Foco em obras de alta margem e renegociação de contratos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <DollarSign className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-purple-900">Otimizar fluxo de caixa</p>
                      <p className="text-sm text-purple-700">
                        Reduzir prazos de recebimento e melhorar gestão de pagamentos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900">Renegociar dívidas prioritárias</p>
                      <p className="text-sm text-amber-700">
                        Buscar melhores condições de financiamento e reduzir custo de capital
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: OKRs */}
          <TabsContent value="okrs" className="space-y-4">
            {okrsMock.map((okr) => (
              <Card key={okr.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{okr.objetivo}</CardTitle>
                      <CardDescription className="mt-1">
                        {okr.keyResults.length} Key Results
                      </CardDescription>
                    </div>
                    <Badge
                      variant={okr.status === "ativo" ? "default" : "destructive"}
                      className="ml-4"
                    >
                      {okr.status === "ativo" ? "Ativo" : "Atrasado"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <RadialProgress previsto={okr.previsto} realizado={okr.realizado} size={140} />
                    </div>
                    <div className="flex-1 space-y-3">
                      {okr.keyResults.map((kr, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border">
                          <RadialProgress
                            previsto={kr.previsto}
                            realizado={kr.realizado}
                            size={80}
                            strokeWidth={8}
                            showLabels={false}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">{kr.descricao}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Atual: <span className="font-semibold text-foreground">{kr.atual}</span></span>
                              <span>Meta: <span className="font-semibold text-foreground">{kr.meta}</span></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tab: Indicadores */}
          <TabsContent value="indicadores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores Gerenciais Financeiros</CardTitle>
                <CardDescription>Métricas em tempo real integradas ao ERP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <p className="text-sm text-muted-foreground">Margem Bruta Atual</p>
                    <p className="text-3xl font-bold text-emerald-700">10.5%</p>
                    <p className="text-xs text-emerald-600 mt-1">Meta: 12%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-muted-foreground">EBITDA</p>
                    <p className="text-3xl font-bold text-blue-700">8.2%</p>
                    <p className="text-xs text-blue-600 mt-1">Meta: 10%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm text-muted-foreground">Fluxo de Caixa</p>
                    <p className="text-3xl font-bold text-purple-700">R$ 12.5M</p>
                    <p className="text-xs text-purple-600 mt-1">Meta: R$ 15M</p>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-sm text-muted-foreground">Inadimplência</p>
                    <p className="text-3xl font-bold text-amber-700">3.2%</p>
                    <p className="text-xs text-amber-600 mt-1">Meta: 2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análises */}
          <TabsContent value="analises" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Margem Bruta</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosEvolucao}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="margem" stroke="#10b981" strokeWidth={2} name="Margem Real" />
                    <Line type="monotone" dataKey="meta" stroke="#96110D" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicadores vs. Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosIndicadores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="indicador" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill="#10b981" name="Valor Atual" />
                    <Bar dataKey="meta" fill="#96110D" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botão Voltar */}
        <div className="mt-6">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </PageContent>
    </>
  )
}
