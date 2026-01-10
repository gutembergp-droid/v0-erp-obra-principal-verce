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
  Building2,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Wrench,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function ObrasDepartamental() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, getOKRsDepartamento } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)

  const okrsMock = [
    {
      id: "okr-obr-001",
      objetivo: "Reduzir atrasos em cronogramas para menos de 5%",
      previsto: 75,
      realizado: 68,
      status: "ativo",
      keyResults: [
        { descricao: "Obras no prazo > 95%", previsto: 70, realizado: 68, meta: "95%", atual: "88%" },
        { descricao: "Tempo médio de atraso < 10 dias", previsto: 75, realizado: 72, meta: "10 dias", atual: "13 dias" },
      ],
    },
    {
      id: "okr-obr-002",
      objetivo: "Aumentar produtividade em 15%",
      previsto: 65,
      realizado: 55,
      status: "ativo",
      keyResults: [
        { descricao: "Produtividade m²/mês > 1500", previsto: 65, realizado: 60, meta: "1500", atual: "1380" },
        { descricao: "Índice de retrabalho < 2%", previsto: 60, realizado: 48, meta: "2%", atual: "3.1%" },
      ],
    },
    {
      id: "okr-obr-003",
      objetivo: "Reduzir desperdícios de material em 20%",
      previsto: 60,
      realizado: 40,
      status: "atrasado",
      keyResults: [
        { descricao: "Desperdício < 3% do total", previsto: 55, realizado: 42, meta: "3%", atual: "4.2%" },
        { descricao: "Implementar gestão em 12 obras", previsto: 50, realizado: 37, meta: "12", atual: "4" },
      ],
    },
  ]

  const dadosEvolucao = [
    { mes: "Jan", produtividade: 1280, meta: 1500 },
    { mes: "Fev", produtividade: 1320, meta: 1500 },
    { mes: "Mar", produtividade: 1350, meta: 1500 },
    { mes: "Abr", produtividade: 1380, meta: 1500 },
    { mes: "Mai", produtividade: 1420, meta: 1500 },
    { mes: "Jun", produtividade: 1450, meta: 1500 },
  ]

  const dadosIndicadores = [
    { indicador: "No Prazo", valor: 88, meta: 95 },
    { indicador: "Produtividade", valor: 1380, meta: 1500 },
    { indicador: "Retrabalho", valor: 3.1, meta: 2 },
    { indicador: "Desperdício", valor: 4.2, meta: 3 },
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
        title={`${ciclo.nome} › Obras`}
        subtitle="Estratégia de execução, cronogramas e produtividade"
      />
      <PageContent>
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">OKRs Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{okrsMock.length}</span>
                <Target className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Realizado Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  {Math.round(okrsMock.reduce((acc, o) => acc + o.realizado, 0) / okrsMock.length)}%
                </span>
                <TrendingUp className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">No Prazo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">
                  {okrsMock.filter((o) => o.status === "ativo").length}
                </span>
                <CheckCircle2 className="h-8 w-8 text-emerald-500/50" />
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
                <CardTitle>Estratégia de Obras (Desdobrada do Corporativo)</CardTitle>
                <CardDescription>Direcionamentos estratégicos para o departamento de obras</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Cumprimento rigoroso de cronogramas</p>
                      <p className="text-sm text-blue-700">
                        Reduzir atrasos e garantir entregas no prazo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Aumentar produtividade operacional</p>
                      <p className="text-sm text-green-700">
                        Otimizar processos e uso de mão de obra
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <Building2 className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-purple-900">Qualidade nas entregas</p>
                      <p className="text-sm text-purple-700">
                        Reduzir retrabalho e garantir conformidade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <Wrench className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900">Gestão eficiente de materiais</p>
                      <p className="text-sm text-amber-700">
                        Reduzir desperdícios e otimizar estoques
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
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tab: Indicadores */}
          <TabsContent value="indicadores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores Gerenciais de Obras</CardTitle>
                <CardDescription>Métricas em tempo real integradas ao ERP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-muted-foreground">Obras no Prazo (%)</p>
                    <p className="text-3xl font-bold text-blue-700">88%</p>
                    <p className="text-xs text-blue-600 mt-1">Meta: 95%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm text-muted-foreground">Produtividade (m²/mês)</p>
                    <p className="text-3xl font-bold text-green-700">1380</p>
                    <p className="text-xs text-green-600 mt-1">Meta: 1500</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm text-muted-foreground">Retrabalho (%)</p>
                    <p className="text-3xl font-bold text-purple-700">3.1%</p>
                    <p className="text-xs text-purple-600 mt-1">Meta: 2%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-sm text-muted-foreground">Desperdício (%)</p>
                    <p className="text-3xl font-bold text-amber-700">4.2%</p>
                    <p className="text-xs text-amber-600 mt-1">Meta: 3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análises */}
          <TabsContent value="analises" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Produtividade Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosEvolucao}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="produtividade" stroke="#3b82f6" strokeWidth={2} name="Produtividade" />
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
                    <Bar dataKey="valor" fill="#3b82f6" name="Valor Atual" />
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
