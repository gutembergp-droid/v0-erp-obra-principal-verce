"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { usePlanejamento } from "@/contexts/planejamento-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageContent, KPIGrid } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CicloHeader } from "./_components/ciclo-header"
import { WorkflowStepper } from "./_components/workflow-stepper"
import { Target, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Plus, Calendar, Activity } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"

export default function PlanejamentoEstrategico() {
  const router = useRouter()
  const { ciclos, cicloAtual, selecionarCiclo, getDashboard } = useCicloEstrategico()
  const { okrs, obras } = usePlanejamento()
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")

  const dashboard = getDashboard()

  // Filtrar OKRs
  const okrsFiltrados = okrs.filter((okr) => {
    if (filtroStatus === "todos") return true
    if (filtroStatus === "ativo") return okr.status === "em-progresso"
    if (filtroStatus === "concluido") return okr.status === "concluido"
    if (filtroStatus === "atrasado") return okr.status === "atrasado"
    return true
  })

  // Calcular KPIs
  const okrsAtivos = okrs.filter((o) => o.status === "em-progresso").length
  const progressoMedio = okrs.length > 0 ? Math.round(okrs.reduce((acc, o) => acc + o.progresso, 0) / okrs.length) : 0
  const okrsRisco = okrs.filter((o) => o.status === "atrasado").length

  // Dados para gráficos
  const dadosPorTipo = [
    { tipo: "Corporativo", quantidade: okrs.filter((o) => o.tipo === "corporativo").length },
    { tipo: "Departamental", quantidade: okrs.filter((o) => o.tipo === "departamental").length },
    { tipo: "Obra", quantidade: okrs.filter((o) => o.tipo === "obra").length },
  ]

  const COLORS = ["#96110D", "#C8102E", "#E63946"]

  return (
    <>
      <Header title="Planejamento Estratégico" subtitle="Gestão de ciclos estratégicos, OKRs e execução" icon={Target} />

      <PageContent>
        <div className="space-y-6">
          {/* Seletor de Ciclo e Ações */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ciclo Estratégico Ativo</CardTitle>
                  <CardDescription>Selecione o ciclo que deseja visualizar ou gerenciar</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Ciclo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Select
                  value={cicloAtual?.id || ""}
                  onValueChange={(value) => {
                    selecionarCiclo(value)
                  }}
                >
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Selecione um ciclo" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciclos.map((ciclo) => (
                      <SelectItem key={ciclo.id} value={ciclo.id}>
                        {ciclo.nome} ({ciclo.status})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {cicloAtual && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => router.push(`/corporativo/estrategico/planejamento/pestel/${cicloAtual.id}`)}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Ir para PESTEL
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/corporativo/estrategico/planejamento/swot/${cicloAtual.id}`)}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Ir para SWOT
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/corporativo/estrategico/planejamento/gut/${cicloAtual.id}`)}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Ir para GUT
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ciclo Atual - Header e Stepper */}
          {cicloAtual && (
            <>
              <CicloHeader ciclo={cicloAtual} />
              <WorkflowStepper etapaAtual={cicloAtual.etapaAtual} etapasConcluidas={cicloAtual.etapasConcluidas} />
            </>
          )}

          {/* KPIs Principais */}
          <KPIGrid>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>OKRs Ativos</CardDescription>
                  <Activity className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{okrsAtivos}</p>
                <p className="text-xs text-muted-foreground mt-1">Em execução</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Progresso Médio</CardDescription>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{progressoMedio}%</p>
                <Progress value={progressoMedio} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Em Risco</CardDescription>
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">{okrsRisco}</p>
                <p className="text-xs text-muted-foreground mt-1">Requerem atenção</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>Obras Estratégicas</CardDescription>
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{obras.length}</p>
                <p className="text-xs text-muted-foreground mt-1">No portfólio</p>
              </CardContent>
            </Card>
          </KPIGrid>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Distribuição por Tipo */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de OKRs por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={dadosPorTipo} dataKey="quantidade" nameKey="tipo" cx="50%" cy="50%" outerRadius={80} label>
                      {dadosPorTipo.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Progresso por OKR */}
            <Card>
              <CardHeader>
                <CardTitle>Top 5 OKRs por Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={okrs.slice(0, 5).map((okr) => ({ nome: okr.objetivo.substring(0, 30), progresso: okr.progresso }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="progresso" fill="#96110D" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Lista de OKRs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>OKRs Ativos</CardTitle>
                  <CardDescription>Objetivos e Resultados-Chave em execução</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ativo">Em progresso</SelectItem>
                      <SelectItem value="atrasado">Atrasados</SelectItem>
                      <SelectItem value="concluido">Concluídos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo OKR
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {okrsFiltrados.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhum OKR encontrado</p>
                ) : (
                  okrsFiltrados.map((okr) => (
                    <Card key={okr.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{okr.objetivo}</h4>
                            <Badge variant={okr.status === "em-progresso" ? "default" : okr.status === "atrasado" ? "destructive" : "secondary"}>
                              {okr.status}
                            </Badge>
                            <Badge variant="outline">{okr.tipo}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {okr.prazo}
                            </span>
                            <span>{okr.responsavel}</span>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Progresso Geral</span>
                              <span className="text-sm font-semibold">{okr.progresso}%</span>
                            </div>
                            <Progress value={okr.progresso} />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </>
  )
}
