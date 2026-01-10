"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Plus, Edit2, Trash2, AlertTriangle } from "lucide-react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { usePlanejamento } from "@/contexts/planejamento-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageContent } from "@/components/layout/page-content"
import { PlanejamentoTopBar } from "../../_components/planejamento-top-bar"
import { toast } from "sonner"

export default function OkrsPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const resolvedParams = use(params)
  const { cicloId } = resolvedParams
  const router = useRouter()
  const { ciclos, gut, avancarEtapa } = useCicloEstrategico()
  const { okrs, deleteOKR } = usePlanejamento()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const matrizGut = gut[cicloId]

  const [okrSelecionado, setOkrSelecionado] = useState<string | null>(null)

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

  const handleAvancar = () => {
    if (okrs.length < 3) {
      toast.error("Defina pelo menos 3 OKRs", {
        description: "Os OKRs devem estar vinculados aos temas priorizados no GUT",
      })
      return
    }

    const sucesso = avancarEtapa(cicloId)
    if (sucesso) {
      toast.success("Avançando para Monitoramento...")
      router.push(`/corporativo/estrategico/planejamento/monitoramento/${cicloId}`)
    }
  }

  const handleDelete = (id: string) => {
    deleteOKR(id)
    toast.success("OKR excluído")
  }

  // Calcular estatísticas
  const okrsAtivos = okrs.filter((o) => o.status === "em-progresso").length
  const progressoMedio = okrs.length > 0 ? Math.round(okrs.reduce((acc, o) => acc + o.progresso, 0) / okrs.length) : 0
  const okrsAtrasados = okrs.filter((o) => o.status === "atrasado").length

  return (
    <>
      <PlanejamentoTopBar
        ciclo={ciclo}
        currentPage="okrs"
        pageTitle="OKRs"
        actions={
          <div className="flex gap-2">
            <Button size="sm">
              <Plus className="w-3 h-3 mr-1" />
              Novo OKR
            </Button>
            <Button size="sm" onClick={handleAvancar} variant="outline">
              Monitor
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        }
      />

      <PageContent maxWidth="full">
        <div className="space-y-4">

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>OKRs Ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{okrsAtivos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Progresso Médio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{progressoMedio}%</p>
              <Progress value={progressoMedio} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Em Risco</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-600">{okrsAtrasados}</p>
            </CardContent>
          </Card>
        </div>

        {/* Instruções */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Como criar OKRs efetivos?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>1.</strong> Selecione um tema priorizado pela Matriz GUT
            </p>
            <p>
              <strong>2.</strong> Defina um objetivo <strong>qualitativo</strong> e inspirador
            </p>
            <p>
              <strong>3.</strong> Crie 3-5 Key Results <strong>quantitativos</strong> e mensuráveis
            </p>
            <p>
              <strong>4.</strong> Vincule KRs a indicadores reais do ERP quando possível
            </p>
          </CardContent>
        </Card>

        {/* Temas GUT disponíveis */}
        {matrizGut && matrizGut.ranking.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Temas Priorizados (GUT)</CardTitle>
              <CardDescription>Use estes temas como base para criar OKRs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {matrizGut.ranking.slice(0, 6).map((avaliacao, index) => (
                  <Card key={avaliacao.id} className="p-4 bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={avaliacao.score >= 100 ? "destructive" : avaliacao.score >= 60 ? "default" : "secondary"}>#{index + 1}</Badge>
                        <span className="text-lg font-bold text-primary">{avaliacao.score}</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm">{avaliacao.temaNome}</h4>
                    {avaliacao.justificativa && <p className="text-xs text-muted-foreground mt-1">{avaliacao.justificativa}</p>}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de OKRs */}
        <Card>
          <CardHeader>
            <CardTitle>OKRs do Ciclo</CardTitle>
          </CardHeader>
          <CardContent>
            {okrs.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p>Nenhum OKR definido</p>
                <p className="text-sm mt-1">Crie OKRs baseados nos temas priorizados</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro OKR
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {okrs.map((okr) => (
                  <Card key={okr.id} className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Cabeçalho */}
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-lg font-semibold">{okr.objetivo}</h3>
                          <Badge variant={okr.status === "em-progresso" ? "default" : okr.status === "atrasado" ? "destructive" : "secondary"}>
                            {okr.status}
                          </Badge>
                          <Badge variant="outline">{okr.tipo}</Badge>
                        </div>

                        {/* Metadados */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span>{okr.periodo}</span>
                          <span>•</span>
                          <span>{okr.responsavel}</span>
                          <span>•</span>
                          <span>Prazo: {okr.prazo}</span>
                        </div>

                        {/* Progresso Geral */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progresso Geral</span>
                            <span className="text-lg font-bold text-primary">{okr.progresso}%</span>
                          </div>
                          <Progress value={okr.progresso} className="h-3" />
                        </div>

                        {/* Key Results */}
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-muted-foreground">Key Results:</p>
                          {okr.keyResults.map((kr) => (
                            <div key={kr.id} className="bg-muted/50 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium flex-1">{kr.descricao}</p>
                                <Badge variant="outline" className="text-xs ml-2">
                                  {kr.atual}/{kr.meta} {kr.unidade}
                                </Badge>
                              </div>
                              <Progress value={kr.progresso} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline" className="h-9 w-9 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-9 w-9 p-0 text-destructive" onClick={() => handleDelete(okr.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alerta se poucos OKRs */}
        {okrs.length > 0 && okrs.length < 3 && (
          <Card className="border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/30">
            <CardContent className="pt-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 dark:text-orange-100">Poucos OKRs definidos</p>
                <p className="text-sm text-orange-700 dark:text-orange-200 mt-1">
                  Recomendamos ter pelo menos 3 OKRs para um ciclo estratégico efetivo. Você tem {okrs.length}.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navegação */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => router.push(`/corporativo/estrategico/planejamento/bcg/${cicloId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao BCG
          </Button>
          <Button onClick={handleAvancar}>
            Próxima Etapa: Monitoramento
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </PageContent>
    </>
  )
}
