"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Plus, TrendingUp } from "lucide-react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContent } from "@/components/layout/page-content"
import { PlanejamentoTopBar } from "../../_components/planejamento-top-bar"
import { GutTable } from "../../_components/gut-table"
import { toast } from "sonner"

export default function GutPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const resolvedParams = use(params)
  const { cicloId } = resolvedParams
  const router = useRouter()
  const { ciclos, gut, swot, concluirGUT, avancarEtapa } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const matrizGut = gut[cicloId]
  const analiseSwot = swot[cicloId]

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

  const handleConcluir = () => {
    const totalAvaliacoes = matrizGut?.avaliacoes.length || 0
    const totalTemas = analiseSwot?.temas.length || 0

    if (totalAvaliacoes < totalTemas) {
      toast.error("Avalie todos os temas", {
        description: `Você tem ${totalTemas} temas mas só ${totalAvaliacoes} avaliações`,
      })
      return
    }

    concluirGUT(cicloId)
    toast.success("Matriz GUT concluída!", {
      description: "Ranking de prioridades definido",
    })
  }

  const handleAvancar = () => {
    if (!matrizGut?.concluidaEm) {
      toast.error("Conclua a matriz GUT primeiro")
      return
    }

    const sucesso = avancarEtapa(cicloId)
    if (sucesso) {
      toast.success("Avançando para OKRs...")
      router.push(`/corporativo/estrategico/planejamento/okrs/${cicloId}`)
    }
  }

  const concluida = !!matrizGut?.concluidaEm
  const ranking = matrizGut?.ranking || []

  return (
    <>
      <PlanejamentoTopBar
        ciclo={ciclo}
        currentPage="gut"
        pageTitle="Matriz GUT"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Plus className="w-3 h-3 mr-1" />
              Avaliar
            </Button>
            {!concluida && (
              <Button size="sm" onClick={handleConcluir} variant="outline">
                <Check className="w-3 h-3 mr-1" />
                Concluir
              </Button>
            )}
            {concluida && (
              <Button size="sm" onClick={handleAvancar}>
                OKRs
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        }
      />

      <PageContent maxWidth="full">
        <div className="space-y-4">

        {/* Instruções */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Como avaliar pela Matriz GUT?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Gravidade (G):</strong> Qual o impacto se não for resolvido? (1=muito baixo, 5=muito alto)
            </p>
            <p>
              <strong>Urgência (U):</strong> Quanto tempo temos para resolver? (1=muito tempo, 5=imediato)
            </p>
            <p>
              <strong>Tendência (T):</strong> Vai piorar com o tempo? (1=melhora, 5=piora muito)
            </p>
            <p className="pt-2 text-primary font-semibold">Score = G × U × T (máximo 125)</p>
          </CardContent>
        </Card>

        {/* Top 3 Prioridades */}
        {ranking.length >= 3 && (
          <div className="grid grid-cols-3 gap-4">
            {ranking.slice(0, 3).map((avaliacao, index) => (
              <Card key={avaliacao.id} className={index === 0 ? "border-2 border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardDescription>#{index + 1} Prioridade</CardDescription>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={index === 0 ? "w-5 h-5 text-red-500" : "w-4 h-4 text-orange-500"} />
                      <span className="text-2xl font-bold text-primary">{avaliacao.score}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base mt-2">{avaliacao.temaNome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-center text-sm">
                    <div>
                      <p className="text-xl font-bold">{avaliacao.gravidade}</p>
                      <p className="text-xs text-muted-foreground">Gravidade</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{avaliacao.urgencia}</p>
                      <p className="text-xs text-muted-foreground">Urgência</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{avaliacao.tendencia}</p>
                      <p className="text-xs text-muted-foreground">Tendência</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tabela Completa */}
        <Card>
          <CardHeader>
            <CardTitle>Todas as Avaliações</CardTitle>
            <CardDescription>Ranking completo de priorização estratégica</CardDescription>
          </CardHeader>
          <CardContent>
            <GutTable avaliacoes={ranking} />
          </CardContent>
        </Card>

        {/* Temas não avaliados */}
        {analiseSwot?.temas && analiseSwot.temas.length > (matrizGut?.avaliacoes.length || 0) && (
          <Card className="border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/30">
            <CardHeader>
              <CardTitle className="text-orange-700 dark:text-orange-300">Atenção: Temas Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Você ainda tem {analiseSwot.temas.length - (matrizGut?.avaliacoes.length || 0)} temas estratégicos não avaliados.
                Avalie todos antes de concluir a matriz.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navegação */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => router.push(`/corporativo/estrategico/planejamento/swot/${cicloId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao SWOT
          </Button>
          {concluida && (
            <Button onClick={handleAvancar}>
              Próxima Etapa: OKRs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </PageContent>
    </>
  )
}
