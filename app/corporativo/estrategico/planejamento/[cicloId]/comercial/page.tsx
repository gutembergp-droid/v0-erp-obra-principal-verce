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
  Handshake,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Users,
  FileText,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function ComercialDepartamental() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, getOKRsDepartamento } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)

  const okrsMock = [
    {
      id: "okr-com-001",
      objetivo: "Aumentar captação de novos clientes em 30%",
      previsto: 75,
      realizado: 72,
      status: "ativo",
      keyResults: [
        { descricao: "Captar 20 novos clientes qualificados", previsto: 75, realizado: 75, meta: "20", atual: "15" },
        { descricao: "Aumentar taxa de conversão para 25%", previsto: 72, realizado: 68, meta: "25%", atual: "19%" },
      ],
    },
    {
      id: "okr-com-002",
      objetivo: "Fechar 8 contratos acima de R$ 10M",
      previsto: 70,
      realizado: 62,
      status: "ativo",
      keyResults: [
        { descricao: "Contratos > R$ 10M", previsto: 65, realizado: 62, meta: "8", atual: "5" },
        { descricao: "Ticket médio > R$ 15M", previsto: 60, realizado: 58, meta: "R$ 15M", atual: "R$ 12M" },
      ],
    },
    {
      id: "okr-com-003",
      objetivo: "Expandir portfólio de obras públicas",
      previsto: 60,
      realizado: 45,
      status: "atrasado",
      keyResults: [
        { descricao: "Participar de 15 licitações", previsto: 60, realizado: 53, meta: "15", atual: "8" },
        { descricao: "Taxa de sucesso > 30%", previsto: 50, realizado: 33, meta: "30%", atual: "25%" },
      ],
    },
  ]

  const dadosEvolucao = [
    { mes: "Jan", captacao: 2, meta: 3 },
    { mes: "Fev", captacao: 3, meta: 3 },
    { mes: "Mar", captacao: 4, meta: 3 },
    { mes: "Abr", captacao: 3, meta: 3 },
    { mes: "Mai", captacao: 5, meta: 3 },
    { mes: "Jun", captacao: 4, meta: 3 },
  ]

  const dadosIndicadores = [
    { indicador: "Clientes", valor: 15, meta: 20 },
    { indicador: "Conversão", valor: 19, meta: 25 },
    { indicador: "Pipeline", valor: 45, meta: 50 },
    { indicador: "Propostas", valor: 32, meta: 40 },
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
        title={`${ciclo.nome} › Comercial`}
        subtitle="Estratégia comercial, OKRs de captação e vendas"
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
                <CardTitle>Estratégia Comercial (Desdobrada do Corporativo)</CardTitle>
                <CardDescription>Direcionamentos estratégicos para o departamento comercial</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Expandir base de clientes qualificados</p>
                      <p className="text-sm text-blue-700">
                        Foco em prospecção ativa e networking estratégico
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Aumentar taxa de conversão</p>
                      <p className="text-sm text-green-700">
                        Melhorar qualificação de leads e processo comercial
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <Handshake className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-purple-900">Fortalecer relacionamento com clientes</p>
                      <p className="text-sm text-purple-700">
                        Pós-venda ativo e upsell de serviços
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <FileText className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900">Participar ativamente de licitações</p>
                      <p className="text-sm text-amber-700">
                        Obras públicas como vetor de crescimento
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
                    {/* Progresso Radial do OKR */}
                    <div className="flex-shrink-0">
                      <RadialProgress previsto={okr.previsto} realizado={okr.realizado} size={140} />
                    </div>

                    {/* Key Results */}
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
                <CardTitle>Indicadores Gerenciais Comerciais</CardTitle>
                <CardDescription>Métricas em tempo real integradas ao ERP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-muted-foreground">Novos Clientes</p>
                    <p className="text-3xl font-bold text-blue-700">15</p>
                    <p className="text-xs text-blue-600 mt-1">Meta: 20</p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                    <p className="text-3xl font-bold text-green-700">19%</p>
                    <p className="text-xs text-green-600 mt-1">Meta: 25%</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm text-muted-foreground">Pipeline (R$ M)</p>
                    <p className="text-3xl font-bold text-purple-700">45</p>
                    <p className="text-xs text-purple-600 mt-1">Meta: 50</p>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-sm text-muted-foreground">Propostas Enviadas</p>
                    <p className="text-3xl font-bold text-amber-700">32</p>
                    <p className="text-xs text-amber-600 mt-1">Meta: 40</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Análises */}
          <TabsContent value="analises" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Captação Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosEvolucao}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="captacao" stroke="#3b82f6" strokeWidth={2} name="Captação Real" />
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
