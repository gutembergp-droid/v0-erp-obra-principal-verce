"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock, Activity, TrendingUp, Target, FileText } from "lucide-react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { usePlanejamento } from "@/contexts/planejamento-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContent, KPIGrid } from "@/components/layout/page-content"
import { PlanejamentoTopBar } from "../../_components/planejamento-top-bar"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function MonitoramentoPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const resolvedParams = use(params)
  const { cicloId } = resolvedParams
  const router = useRouter()
  const { ciclos, alertas, decisoes } = useCicloEstrategico()
  const { okrs } = usePlanejamento()

  const ciclo = ciclos.find((c) => c.id === cicloId)

  if (!ciclo) {
    return (
      <PageContent>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Ciclo não encontrado</p>
          <Button onClick={() => router.push("/corporativo/estrategico/planejamento")} className="mt-4">
            Voltar
          </Button>
        </div>
      </PageContent>
    )
  }

  // Filtrar alertas e decisões do ciclo
  const alertasCiclo = alertas.filter((a) => a.cicloId === cicloId)
  const decisoesCiclo = decisoes.filter((d) => d.cicloId === cicloId)

  // Alertas não resolvidos
  const alertasAtivos = alertasCiclo.filter((a) => !a.resolvidoEm)
  const alertasCriticos = alertasAtivos.filter((a) => a.nivel === "critico")

  // Estatísticas OKRs
  const okrsAtivos = okrs.filter((o) => o.status === "em-progresso").length
  const progressoMedio = okrs.length > 0 ? Math.round(okrs.reduce((acc, o) => acc + o.progresso, 0) / okrs.length) : 0
  const okrsRisco = okrs.filter((o) => o.status === "atrasado").length

  // Dados simulados para gráficos
  const dadosEvolucao = [
    { mes: "Jan", progresso: 15 },
    { mes: "Fev", progresso: 28 },
    { mes: "Mar", progresso: 42 },
    { mes: "Abr", progresso: 58 },
    { mes: "Mai", progresso: 65 },
    { mes: "Jun", progresso: progressoMedio },
  ]

  return (
    <>
      <PlanejamentoTopBar
        ciclo={ciclo}
        currentPage="monitoramento"
        pageTitle="Monitoramento"
        actions={
          <Button size="sm" variant="outline">
            <Activity className="w-3 h-3 mr-1" />
            Atualizar
          </Button>
        }
      />

      <PageContent maxWidth="full">
        <div className="space-y-4">

        {/* Tabs de Monitoramento */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="dashboard" className="gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="alertas" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alertas
              {alertasCriticos.length > 0 && <Badge variant="destructive" className="ml-1">{alertasCriticos.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="decisoes" className="gap-2">
              <FileText className="w-4 h-4" />
              Decisões
            </TabsTrigger>
            <TabsTrigger value="okrs" className="gap-2">
              <Target className="w-4 h-4" />
              OKRs
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: DASHBOARD */}
          <TabsContent value="dashboard" className="space-y-4 mt-4">
            {/* KPIs */}
            <KPIGrid>
              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">OKRs Ativos</p>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold">{okrsAtivos}</p>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">Progresso Geral</p>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{progressoMedio}%</p>
                  <Progress value={progressoMedio} className="flex-1 h-1.5" />
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">Alertas Críticos</p>
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">{alertasCriticos.length}</p>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">Decisões Tomadas</p>
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <p className="text-2xl font-bold">{decisoesCiclo.length}</p>
              </Card>
            </KPIGrid>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Evolução do Progresso */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução do Progresso</CardTitle>
                  <CardDescription>Progresso médio dos OKRs ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dadosEvolucao}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="progresso" stroke="#96110D" strokeWidth={2} name="Progresso (%)" />
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
                    <BarChart
                      data={[
                        { status: "No prazo", quantidade: okrsAtivos - okrsRisco },
                        { status: "Atrasado", quantidade: okrsRisco },
                        { status: "Concluído", quantidade: okrs.filter((o) => o.status === "concluido").length },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="quantidade" fill="#96110D" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 2: ALERTAS */}
          <TabsContent value="alertas" className="space-y-4 mt-4">
            {alertasAtivos.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 mb-4" />
                  <p className="text-xl font-semibold text-foreground">Nenhum alerta ativo</p>
                  <p className="text-muted-foreground mt-2">Tudo está sob controle no momento</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Alertas Críticos */}
                {alertasCriticos.length > 0 && (
                  <Card className="border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/30">
                    <CardHeader>
                      <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Alertas Críticos ({alertasCriticos.length})
                      </CardTitle>
                      <CardDescription>Ações urgentes necessárias</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {alertasCriticos.map((alerta) => (
                        <div key={alerta.id} className="bg-background rounded-lg p-4 border border-red-200 dark:border-red-800">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{alerta.titulo}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{alerta.descricao}</p>
                              <p className="text-xs text-muted-foreground mt-2">Gerado em: {new Date(alerta.geradoEm).toLocaleString("pt-BR")}</p>
                            </div>
                            <Button size="sm" variant="destructive">
                              Resolver
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Outros Alertas */}
                {alertasAtivos.filter((a) => a.nivel !== "critico").length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Outros Alertas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {alertasAtivos
                        .filter((a) => a.nivel !== "critico")
                        .map((alerta) => (
                          <div key={alerta.id} className="bg-muted/50 rounded-lg p-4 border">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant={alerta.nivel === "atencao" ? "default" : "secondary"}>{alerta.nivel}</Badge>
                                  <h4 className="font-semibold text-sm">{alerta.titulo}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">{alerta.descricao}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                Resolver
                              </Button>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* TAB 3: DECISÕES */}
          <TabsContent value="decisoes" className="space-y-4 mt-4">
            {decisoesCiclo.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-xl font-semibold text-foreground">Nenhuma decisão registrada</p>
                  <p className="text-muted-foreground mt-2">As decisões estratégicas aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Decisões Estratégicas ({decisoesCiclo.length})</CardTitle>
                  <CardDescription>Histórico de ações tomadas pela governança</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {decisoesCiclo.map((decisao) => (
                      <div key={decisao.id} className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{decisao.tipo}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(decisao.dataHora).toLocaleString("pt-BR")}</span>
                            </div>
                            <p className="font-semibold text-sm">{decisao.descricao}</p>
                            <p className="text-sm text-muted-foreground mt-1">{decisao.justificativa}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Decisão por: <strong>{decisao.tomadaPor.nome}</strong> ({decisao.tomadaPor.cargo})
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* TAB 4: OKRs */}
          <TabsContent value="okrs" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>OKRs em Monitoramento ({okrs.length})</CardTitle>
                <CardDescription>Status atual de todos os objetivos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {okrs.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum OKR em monitoramento</p>
                  ) : (
                    okrs.map((okr) => (
                      <div key={okr.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-sm">{okr.objetivo}</h4>
                            <Badge variant={okr.status === "em-progresso" ? "default" : okr.status === "atrasado" ? "destructive" : "secondary"}>{okr.status}</Badge>
                          </div>
                          <div className="space-y-1">
                            <Progress value={okr.progresso} className="h-2" />
                            <p className="text-xs text-muted-foreground">{okr.responsavel} • {okr.prazo}</p>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-2xl font-bold text-primary">{okr.progresso}%</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navegação */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => router.push(`/corporativo/estrategico/planejamento/okrs/${cicloId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos OKRs
          </Button>
          <Button onClick={() => router.push("/corporativo/estrategico/planejamento")}>Voltar ao Dashboard</Button>
        </div>
      </div>
    </PageContent>
    </>
  )
}
