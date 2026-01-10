"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Plus, Star, TrendingUp, AlertCircle, Target } from "lucide-react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageContent } from "@/components/layout/page-content"
import { PlanejamentoTopBar } from "../../_components/planejamento-top-bar"
import { toast } from "sonner"
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell } from "recharts"

const COLORS_BCG = {
  estrela: "#FFD700",
  vaca_leiteira: "#4CAF50",
  oportunidade: "#2196F3",
  abacaxi: "#F44336",
}

export default function BcgPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const resolvedParams = use(params)
  const { cicloId } = resolvedParams
  const router = useRouter()
  const { ciclos, bcg, concluirBCG, avancarEtapa } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const matrizBcg = bcg[cicloId]

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
    const totalItens = matrizBcg?.itens.length || 0

    if (totalItens < 3) {
      toast.error("Análise incompleta", {
        description: "Adicione pelo menos 3 itens ao portfólio",
      })
      return
    }

    concluirBCG(cicloId)
    toast.success("Matriz BCG concluída!")
  }

  const handleAvancar = () => {
    if (!matrizBcg?.concluidaEm) {
      toast.error("Conclua a matriz BCG primeiro")
      return
    }

    const sucesso = avancarEtapa(cicloId)
    if (sucesso) {
      toast.success("Avançando para OKRs...")
      router.push(`/corporativo/estrategico/planejamento/okrs/${cicloId}`)
    }
  }

  const concluida = !!matrizBcg?.concluidaEm
  const itens = matrizBcg?.itens || []

  // Dados para scatter plot
  const dadosScatter = itens.map((item) => ({
    x: item.participacaoMercado,
    y: item.crescimentoMercado,
    nome: item.nome,
    classificacao: item.classificacao,
    receita: item.receitaAnual,
  }))

  return (
    <>
      <PlanejamentoTopBar
        ciclo={ciclo}
        currentPage="bcg"
        pageTitle="Matriz BCG"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Plus className="w-3 h-3 mr-1" />
              Item
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

        {/* Resumo (se concluída) */}
        {concluida && matrizBcg?.analise && (
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <CardTitle className="text-lg">Estrelas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-yellow-600">{matrizBcg.analise.totalEstrelas}</p>
                <p className="text-xs text-muted-foreground mt-1">Alto crescimento + Alta participação</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/30 border-green-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">Vacas Leiteiras</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">{matrizBcg.analise.totalVacas}</p>
                <p className="text-xs text-muted-foreground mt-1">Baixo crescimento + Alta participação</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Oportunidades</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-600">{matrizBcg.analise.totalOportunidades}</p>
                <p className="text-xs text-muted-foreground mt-1">Alto crescimento + Baixa participação</p>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950/30 border-red-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-lg">Abacaxis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-600">{matrizBcg.analise.totalAbacaxis}</p>
                <p className="text-xs text-muted-foreground mt-1">Baixo crescimento + Baixa participação</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instruções */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Como interpretar a Matriz BCG?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong className="text-yellow-600">Estrelas:</strong> Invista! Alto crescimento e alta participação = futuro da empresa
            </p>
            <p>
              <strong className="text-green-600">Vacas Leiteiras:</strong> Explore! Geram caixa para investir nas estrelas
            </p>
            <p>
              <strong className="text-blue-600">Oportunidades:</strong> Desenvolva! Potencial de se tornarem estrelas
            </p>
            <p>
              <strong className="text-red-600">Abacaxis:</strong> Desinvista! Consomem recursos sem retorno adequado
            </p>
          </CardContent>
        </Card>

        {/* Matriz Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle>Matriz BCG - Visualização</CardTitle>
            <CardDescription>Posicionamento estratégico do portfólio</CardDescription>
          </CardHeader>
          <CardContent>
            {itens.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p>Nenhum item no portfólio</p>
                <p className="text-sm mt-1">Adicione obras, serviços ou linhas de negócio para análise</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={500}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Participação de Mercado" unit="%" domain={[0, 100]} label={{ value: "Participação de Mercado (%)", position: "bottom" }} />
                  <YAxis type="number" dataKey="y" name="Crescimento" unit="%" domain={[-20, 30]} label={{ value: "Crescimento (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ payload }) => {
                    if (!payload || payload.length === 0) return null
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border rounded p-3">
                        <p className="font-semibold">{data.nome}</p>
                        <p className="text-sm">Participação: {data.x}%</p>
                        <p className="text-sm">Crescimento: {data.y}%</p>
                        {data.receita && <p className="text-sm">Receita: R$ {data.receita}M</p>}
                        <Badge className="mt-2">{data.classificacao}</Badge>
                      </div>
                    )
                  }} />
                  <ReferenceLine x={50} stroke="#666" strokeDasharray="3 3" />
                  <ReferenceLine y={10} stroke="#666" strokeDasharray="3 3" />
                  <Scatter name="Portfólio" data={dadosScatter} fill="#8884d8">
                    {dadosScatter.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_BCG[entry.classificacao as keyof typeof COLORS_BCG]} />
                    ))}
                  </Scatter>
                  <Legend />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Lista de Itens */}
        <Card>
          <CardHeader>
            <CardTitle>Itens do Portfólio</CardTitle>
          </CardHeader>
          <CardContent>
            {itens.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhum item cadastrado</p>
            ) : (
              <div className="space-y-3">
                {itens.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{item.nome}</h4>
                          <Badge
                            style={{
                              backgroundColor: COLORS_BCG[item.classificacao],
                              color: "#000",
                            }}
                          >
                            {item.classificacao}
                          </Badge>
                          <Badge variant="outline">{item.tipo}</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Participação</p>
                            <p className="font-semibold">{item.participacaoMercado}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Crescimento</p>
                            <p className="font-semibold">{item.crescimentoMercado}%</p>
                          </div>
                          {item.receitaAnual && (
                            <div>
                              <p className="text-muted-foreground">Receita</p>
                              <p className="font-semibold">R$ {item.receitaAnual}M</p>
                            </div>
                          )}
                          {item.margemLucro && (
                            <div>
                              <p className="text-muted-foreground">Margem</p>
                              <p className="font-semibold">{item.margemLucro}%</p>
                            </div>
                          )}
                        </div>
                        {item.recomendacao && <p className="text-sm text-muted-foreground mt-2 italic">{item.recomendacao}</p>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => router.push(`/corporativo/estrategico/planejamento/gut/${cicloId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao GUT
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
