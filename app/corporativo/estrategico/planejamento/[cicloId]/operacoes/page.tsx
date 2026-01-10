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
  Settings,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Truck,
  PackageCheck,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function OperacoesDepartamental() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, getOKRsDepartamento } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)

  const okrsMock = [
    {
      id: "okr-op-001",
      objetivo: "Reduzir tempo médio de entrega em 20%",
      previsto: 72,
      realizado: 65,
      status: "ativo",
      keyResults: [
        { descricao: "Lead time < 15 dias", previsto: 70, realizado: 68, meta: "15 dias", atual: "18 dias" },
        { descricao: "On-time delivery > 95%", previsto: 68, realizado: 62, meta: "95%", atual: "90%" },
      ],
    },
    {
      id: "okr-op-002",
      objetivo: "Otimizar custos logísticos em 15%",
      previsto: 65,
      realizado: 58,
      status: "ativo",
      keyResults: [
        { descricao: "Custo/m³ < R$ 120", previsto: 68, realizado: 60, meta: "R$ 120", atual: "R$ 135" },
        { descricao: "Taxa de ocupação > 85%", previsto: 62, realizado: 55, meta: "85%", atual: "78%" },
      ],
    },
    {
      id: "okr-op-003",
      objetivo: "Reduzir avarias e perdas para menos de 1%",
      previsto: 55,
      realizado: 38,
      status: "atrasado",
      keyResults: [
        { descricao: "Avarias < 1%", previsto: 52, realizado: 40, meta: "1%", atual: "1.8%" },
        { descricao: "Reclamações < 5/mês", previsto: 48, realizado: 35, meta: "5", atual: "12" },
      ],
    },
  ]

  const dadosEvolucao = [
    { mes: "Jan", leadTime: 22, meta: 15 },
    { mes: "Fev", leadTime: 21, meta: 15 },
    { mes: "Mar", leadTime: 20, meta: 15 },
    { mes: "Abr", leadTime: 19, meta: 15 },
    { mes: "Mai", leadTime: 18.5, meta: 15 },
    { mes: "Jun", leadTime: 18, meta: 15 },
  ]

  const dadosIndicadores = [
    { indicador: "Lead Time", valor: 18, meta: 15 },
    { indicador: "On-Time", valor: 90, meta: 95 },
    { indicador: "Avarias", valor: 1.8, meta: 1 },
    { indicador: "Ocupação", valor: 78, meta: 85 },
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
        title={`${ciclo.nome} › Operações`}
        subtitle="Estratégia operacional, logística e eficiência"
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
                <CardTitle>Estratégia de Operações (Desdobrada do Corporativo)</CardTitle>
                <CardDescription>Direcionamentos estratégicos para o departamento de operações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Excelência logística</p>
                      <p className="text-sm text-blue-700">
                        Reduzir lead time e melhorar pontualidade de entregas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Otimização de custos</p>
                      <p className="text-sm text-green-700">
                        Reduzir custos operacionais sem comprometer qualidade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <PackageCheck className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-purple-900">Qualidade e conformidade</p>
                      <p className="text-sm text-purple-700">
                        Zero defeitos e conformidade com padrões
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <Settings className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900">Eficiência operacional</p>
                      <p className="text-sm text-amber-700">
                        Automatização e melhoria contínua de processos
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
                <CardTitle>Indicadores Gerenciais de Operações</CardTitle>
                <CardDescription>Métricas em tempo real integradas ao ERP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-muted-foreground">Lead Time (dias)</p>
                    <p className="text-3xl font-bold text-blue-700">18</p>
                    <p className="text-xs text-blue-600 mt-1">Meta: 15</p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm text-muted-foreground">On-Time Delivery (%)</p>
                    <p className="text-3xl font-bold text-green-700">90%</p>
                    <p className="text-xs text-green-600 mt-1">Meta: 95%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm text-muted-foreground">Avarias (%)</p>
                    <p className="text-3xl font-bold text-purple-700">1.8%</p>
                    <p className="text-xs text-purple-600 mt-1">Meta: 1%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-sm text-muted-foreground">Ocupação Veículos (%)</p>
                    <p className="text-3xl font-bold text-amber-700">78%</p>
                    <p className="text-xs text-amber-600 mt-1">Meta: 85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análises */}
          <TabsContent value="analises" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Lead Time Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosEvolucao}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leadTime" stroke="#3b82f6" strokeWidth={2} name="Lead Time" />
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
