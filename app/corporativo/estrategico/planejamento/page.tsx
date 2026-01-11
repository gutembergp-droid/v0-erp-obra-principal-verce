"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import { EstrategicoNavbar } from "../_components/estrategico-navbar"
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Calendar,
  Activity,
  BarChart3,
  Clock,
  Lock,
  PlayCircle,
  FileText,
  ArrowRight,
} from "lucide-react"
import type { StatusCiclo } from "@/lib/types/planejamento"

export default function DashboardPlanejamento() {
  const router = useRouter()
  const { ciclos, selecionarCiclo } = useCicloEstrategico()

  // Ordenar ciclos: ativos primeiro, depois por data
  const ciclosOrdenados = [...ciclos].sort((a, b) => {
    if (a.status === "em_execucao" && b.status !== "em_execucao") return -1
    if (a.status !== "em_execucao" && b.status === "em_execucao") return 1
    return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
  })

  const getStatusInfo = (status: StatusCiclo) => {
    const statusMap = {
      rascunho: { label: "Rascunho", color: "bg-gray-500", icon: FileText },
      em_revisao: { label: "Em Revisão", color: "bg-blue-500", icon: Activity },
      consolidado: { label: "Consolidado", color: "bg-purple-500", icon: CheckCircle2 },
      homologado: { label: "Homologado", color: "bg-green-600", icon: Lock },
      em_execucao: { label: "Em Execução", color: "bg-emerald-500", icon: PlayCircle },
      encerrado: { label: "Encerrado", color: "bg-gray-700", icon: Lock },
    }
    return statusMap[status] || statusMap.rascunho
  }

  const handleVerDetalhes = (cicloId: string) => {
    selecionarCiclo(cicloId)
    router.push(`/corporativo/estrategico/planejamento/${cicloId}`)
  }

  const handleNovoPlanejamento = () => {
    router.push(`/corporativo/estrategico/planejamento/novo`)
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <EstrategicoNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      <Header
        title="Planejamento Estratégico"
        subtitle="Gestão completa dos ciclos estratégicos da organização"
      />
      <PageContent>
        {/* KPIs Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Ciclos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{ciclos.length}</span>
                <Calendar className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Execução</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">
                  {ciclos.filter((c) => c.status === "em_execucao").length}
                </span>
                <PlayCircle className="h-8 w-8 text-emerald-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Elaboração</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {ciclos.filter((c) => c.status === "rascunho" || c.status === "em_revisao").length}
                </span>
                <Activity className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-gray-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Encerrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-600">
                  {ciclos.filter((c) => c.status === "encerrado").length}
                </span>
                <Lock className="h-8 w-8 text-gray-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Principais */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Ciclos Estratégicos</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie seus planejamentos estratégicos e acompanhe o progresso
            </p>
          </div>
          <Button onClick={handleNovoPlanejamento} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Novo Planejamento Estratégico
          </Button>
        </div>

        {/* Lista de Ciclos */}
        <div className="space-y-4">
          {ciclosOrdenados.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum planejamento estratégico encontrado</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comece criando seu primeiro ciclo estratégico
                </p>
                <Button onClick={handleNovoPlanejamento} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Primeiro Planejamento
                </Button>
              </CardContent>
            </Card>
          ) : (
            ciclosOrdenados.map((ciclo) => {
              const statusInfo = getStatusInfo(ciclo.status)
              const StatusIcon = statusInfo.icon
              const isAtivo = ciclo.status === "em_execucao"
              const isEditavel = ciclo.status === "rascunho" || ciclo.status === "em_revisao"
              
              // Calcular progresso fictício baseado nas etapas
              const progressoEtapas = Math.round((ciclo.etapasConcluidas.length / 7) * 100)

              return (
                <Card
                  key={ciclo.id}
                  className={`transition-colors ${
                    isAtivo ? "border-l-4 border-l-green-600" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{ciclo.nome}</CardTitle>
                          <Badge className={`${statusInfo.color} text-white gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                          {isAtivo && (
                            <Badge variant="outline" className="border-emerald-500 text-emerald-700">
                              Ativo
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(ciclo.periodo.inicio).toLocaleDateString("pt-BR")} até{" "}
                            {new Date(ciclo.periodo.fim).toLocaleDateString("pt-BR")}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {ciclo.governante.nome}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Criado em {new Date(ciclo.criadoEm).toLocaleDateString("pt-BR")}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progresso de Etapas */}
                      {ciclo.status !== "encerrado" && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progresso das Etapas</span>
                            <span className="font-medium">{progressoEtapas}%</span>
                          </div>
                          <Progress value={progressoEtapas} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {ciclo.etapasConcluidas.length} de 7 etapas concluídas
                          </p>
                        </div>
                      )}

                      {/* Informações Específicas por Status */}
                      {isAtivo && (
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                          <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">OKRs Ativos</p>
                              <p className="text-lg font-bold text-emerald-700">42</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Progresso Médio</p>
                              <p className="text-lg font-bold text-emerald-700">68%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Em Risco</p>
                              <p className="text-lg font-bold text-orange-600">5</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {ciclo.status === "encerrado" && ciclo.encerramentoEm && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm">
                          <Lock className="h-4 w-4 text-gray-600" />
                          <span className="text-muted-foreground">
                            Encerrado em {new Date(ciclo.encerramentoEm).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      )}

                      {isEditavel && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm">
                          <Activity className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700">
                            Etapa atual: <strong>{ciclo.etapaAtual.toUpperCase()}</strong>
                          </span>
                        </div>
                      )}

                      {/* Ações */}
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          onClick={() => handleVerDetalhes(ciclo.id)}
                          variant={isAtivo ? "default" : "outline"}
                          className="gap-2"
                        >
                          {isAtivo ? (
                            <>
                              <BarChart3 className="h-4 w-4" />
                              Monitorar
                            </>
                          ) : isEditavel ? (
                            <>
                              <Activity className="h-4 w-4" />
                              Continuar Edição
                            </>
                          ) : ciclo.status === "encerrado" ? (
                            <>
                              <FileText className="h-4 w-4" />
                              Ver Histórico
                            </>
                          ) : (
                            <>
                              <ArrowRight className="h-4 w-4" />
                              Ver Detalhes
                            </>
                          )}
                        </Button>

                        {isAtivo && (
                          <Button variant="outline" className="gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Relatório
                          </Button>
                        )}

                        {(ciclo.status === "consolidado" || ciclo.status === "encerrado") && (
                          <Button variant="outline" className="gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Comparar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </PageContent>
        </div>
      </main>
    </div>
  )
}
