"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertTriangle,
  Calendar,
  ArrowLeft,
  Download,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import type { FiltroTemporal } from "@/lib/types/planejamento"

export default function AnalyticsGlobal() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, filtroTemporal, setFiltroTemporal, getDadosTrimestre, getDadosSemestre } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear())
  const [periodoSelecionado, setPeriodoSelecionado] = useState<"mensal" | "trimestral" | "semestral">("trimestral")

  // Dados mock para gráficos
  const dadosPorDepartamento = [
    { departamento: "Financeiro", progresso: 72, okrs: 8, emRisco: 1 },
    { departamento: "Comercial", progresso: 68, okrs: 12, emRisco: 2 },
    { departamento: "Obras", progresso: 55, okrs: 15, emRisco: 3 },
    { departamento: "RH", progresso: 85, okrs: 7, emRisco: 0 },
    { departamento: "Operações", progresso: 62, okrs: 5, emRisco: 1 },
  ]

  const dadosEvolucaoTrimestral = [
    { trimestre: "Q1", progresso: 45, meta: 25 },
    { trimestre: "Q2", progresso: 68, meta: 50 },
    { trimestre: "Q3", progresso: 0, meta: 75 },
    { trimestre: "Q4", progresso: 0, meta: 100 },
  ]

  const dadosStatusOKRs = [
    { status: "No Prazo", quantidade: 35, color: "#10b981" },
    { status: "Atenção", quantidade: 7, color: "#f59e0b" },
    { status: "Atrasado", quantidade: 5, color: "#ef4444" },
  ]

  const dadosRadar = [
    { area: "Financeiro", valor: 72 },
    { area: "Comercial", valor: 68 },
    { area: "Obras", valor: 55 },
    { area: "RH", valor: 85 },
    { area: "Operações", valor: 62 },
  ]

  const handleFiltroAno = (ano: string) => {
    setAnoSelecionado(parseInt(ano))
    setFiltroTemporal({ ano: parseInt(ano) })
  }

  const handleFiltroPeriodo = (periodo: "mensal" | "trimestral" | "semestral") => {
    setPeriodoSelecionado(periodo)
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
        title={`${ciclo.nome} › Analytics`}
        subtitle="Visão consolidada global de todos os departamentos"
      />
      <PageContent>
        {/* Filtros Temporais - Compacto */}
        <div className="flex items-center justify-between gap-4 mb-6 p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Select value={anoSelecionado.toString()} onValueChange={handleFiltroAno}>
                <SelectTrigger className="h-9 w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>

              <Select value={periodoSelecionado} onValueChange={(v: any) => handleFiltroPeriodo(v)}>
                <SelectTrigger className="h-9 w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                </SelectContent>
              </Select>

              {periodoSelecionado === "trimestral" && (
                <Select defaultValue="Q2">
                  <SelectTrigger className="h-9 w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1">Q1 (Jan-Mar)</SelectItem>
                    <SelectItem value="Q2">Q2 (Abr-Jun)</SelectItem>
                    <SelectItem value="Q3">Q3 (Jul-Set)</SelectItem>
                    <SelectItem value="Q4">Q4 (Out-Dez)</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {periodoSelecionado === "semestral" && (
                <Select defaultValue="S1">
                  <SelectTrigger className="h-9 w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S1">S1 (Jan-Jun)</SelectItem>
                    <SelectItem value="S2">S2 (Jul-Dez)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>

        {/* KPIs Consolidados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">OKRs Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">47</span>
                <Target className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progresso Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">68%</span>
                <TrendingUp className="h-8 w-8 text-emerald-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">No Prazo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">35</span>
                <BarChart3 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-600">5</span>
                <AlertTriangle className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="departamentos">Por Departamento</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Evolução Trimestral */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução do Progresso (Trimestral)</CardTitle>
                  <CardDescription>Comparação entre progresso real e meta esperada</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dadosEvolucaoTrimestral}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="trimestre" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="progresso" stroke="#10b981" strokeWidth={2} name="Progresso Real" />
                      <Line type="monotone" dataKey="meta" stroke="#96110D" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status dos OKRs */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos OKRs</CardTitle>
                  <CardDescription>Distribuição por situação</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dadosStatusOKRs}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.status}: ${entry.quantidade}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="quantidade"
                      >
                        {dadosStatusOKRs.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Por Departamento */}
          <TabsContent value="departamentos" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progresso por Departamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Progresso por Departamento</CardTitle>
                  <CardDescription>Comparação entre áreas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dadosPorDepartamento}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="departamento" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="progresso" fill="#10b981" name="Progresso (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar */}
              <Card>
                <CardHeader>
                  <CardTitle>Radar de Desempenho</CardTitle>
                  <CardDescription>Visão multidimensional</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={dadosRadar}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="area" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Progresso" dataKey="valor" stroke="#96110D" fill="#96110D" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Tabela Detalhada */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhamento por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dadosPorDepartamento.map((dept) => (
                    <div key={dept.departamento} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-semibold">{dept.departamento}</p>
                        <p className="text-sm text-muted-foreground">{dept.okrs} OKRs ativos</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Progresso</p>
                          <p className="text-lg font-bold text-emerald-600">{dept.progresso}%</p>
                        </div>
                        {dept.emRisco > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {dept.emRisco} em risco
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Timeline */}
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Timeline do Ciclo</CardTitle>
                <CardDescription>Marcos e eventos importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Timeline em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Relatórios */}
          <TabsContent value="relatorios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Disponíveis</CardTitle>
                <CardDescription>Exporte dados para análise externa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Relatório Executivo (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Dados Consolidados (Excel)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Dashboard Interativo (PowerBI)
                </Button>
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
