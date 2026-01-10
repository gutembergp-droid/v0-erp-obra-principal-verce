"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Save, Check, BarChart3, AlertTriangle, TrendingUp } from "lucide-react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContent } from "@/components/layout/page-content"
import { PlanejamentoTopBar } from "../../_components/planejamento-top-bar"
import { PestelCard } from "../../_components/pestel-card"
import { FatorPestelDialog } from "../../_components/fator-pestel-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { toast } from "sonner"
import type { PilarPESTEL, FatorPESTEL } from "@/lib/types/planejamento"

const PILARES: PilarPESTEL[] = ["politico", "economico", "social", "tecnologico", "ambiental", "legal"]

export default function PestelPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const resolvedParams = use(params)
  const { cicloId } = resolvedParams
  const router = useRouter()
  const { ciclos, pestel, adicionarFatorPESTEL, atualizarFatorPESTEL, concluirPESTEL, avancarEtapa } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const analisePestel = pestel[cicloId]

  const [dialogAberto, setDialogAberto] = useState(false)
  const [pilarSelecionado, setPilarSelecionado] = useState<PilarPESTEL | null>(null)
  const [fatorEmEdicao, setFatorEmEdicao] = useState<FatorPESTEL | undefined>(undefined)

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

  const handleAdicionarFator = (pilar: PilarPESTEL) => {
    setPilarSelecionado(pilar)
    setFatorEmEdicao(undefined)
    setDialogAberto(true)
  }

  const handleEditarFator = (fator: FatorPESTEL) => {
    setPilarSelecionado(fator.pilar)
    setFatorEmEdicao(fator)
    setDialogAberto(true)
  }

  const handleSalvarFator = (dados: any) => {
    if (dados.id) {
      // Modo edição
      atualizarFatorPESTEL(cicloId, dados.id, dados)
      toast.success("Fator atualizado!")
    } else {
      // Modo criação
      adicionarFatorPESTEL(cicloId, dados)
      toast.success("Fator adicionado!")
    }
  }

  const handleConcluir = () => {
    const totalFatores = analisePestel?.fatores.length || 0

    if (totalFatores < 3) {
      toast.error("Análise incompleta", {
        description: "Adicione pelo menos 3 fatores antes de concluir",
      })
      return
    }

    concluirPESTEL(cicloId)
    toast.success("Análise PESTEL concluída!", {
      description: "Você pode avançar para a próxima etapa",
    })
  }

  const handleAvancar = () => {
    if (!analisePestel?.concluidaEm) {
      toast.error("Conclua a análise primeiro", {
        description: "Clique em 'Concluir Análise' antes de avançar",
      })
      return
    }

    const sucesso = avancarEtapa(cicloId)
    if (sucesso) {
      toast.success("Avançando para SWOT...")
      router.push(`/corporativo/estrategico/planejamento/swot/${cicloId}`)
    }
  }

  const concluida = !!analisePestel?.concluidaEm

  // Calcular métricas
  const totalFatores = analisePestel?.fatores.length || 0
  const riscos = analisePestel?.fatores.filter((f) => f.tipo === "risco") || []
  const oportunidades = analisePestel?.fatores.filter((f) => f.tipo === "oportunidade") || []
  
  // Dados para gráficos
  const dadosPorPilar = PILARES.map((pilar) => ({
    pilar: pilar.charAt(0).toUpperCase() + pilar.slice(1),
    total: analisePestel?.fatores.filter((f) => f.pilar === pilar).length || 0,
    riscos: analisePestel?.fatores.filter((f) => f.pilar === pilar && f.tipo === "risco").length || 0,
    oportunidades: analisePestel?.fatores.filter((f) => f.pilar === pilar && f.tipo === "oportunidade").length || 0,
  }))

  const dadosTipos = [
    { name: "Riscos", value: riscos.length, color: "#ef4444" },
    { name: "Oportunidades", value: oportunidades.length, color: "#10b981" },
  ]

  const impactoMedio = totalFatores > 0 
    ? (analisePestel?.fatores.reduce((acc, f) => acc + f.impacto, 0) || 0) / totalFatores 
    : 0

  return (
    <>
      <PlanejamentoTopBar
        ciclo={ciclo}
        currentPage="pestel"
        pageTitle="Análise PESTEL"
        actions={
          <div className="flex gap-2">
            {!concluida && (
              <Button size="sm" onClick={handleConcluir} variant="outline">
                <Check className="w-3 h-3 mr-1" />
                Concluir
              </Button>
            )}
            {concluida && (
              <Button size="sm" onClick={handleAvancar}>
                SWOT
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        }
      />

      <PageContent maxWidth="full">
        <Tabs defaultValue="analise" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analise">Análise</TabsTrigger>
            <TabsTrigger value="metricas">Métricas & Dashboards</TabsTrigger>
          </TabsList>

          {/* TAB 1: Análise */}
          <TabsContent value="analise" className="space-y-4">

        {/* Resumo (se concluída) */}
        {concluida && analisePestel?.resumo && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Resumo da Análise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">{analisePestel.resumo.totalRiscos}</p>
                  <p className="text-sm text-muted-foreground">Riscos Identificados</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{analisePestel.resumo.totalOportunidades}</p>
                  <p className="text-sm text-muted-foreground">Oportunidades</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-primary uppercase">{analisePestel.resumo.pilarMaisCritico}</p>
                  <p className="text-sm text-muted-foreground">Pilar Mais Crítico</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instruções */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Como fazer a análise PESTEL?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>1.</strong> Para cada pilar, identifique fatores externos que podem impactar o negócio
            </p>
            <p>
              <strong>2.</strong> Classifique cada fator como <strong>Risco</strong> (ameaça) ou <strong>Oportunidade</strong>
            </p>
            <p>
              <strong>3.</strong> Avalie o impacto estratégico de 1 (muito baixo) a 5 (muito alto)
            </p>
            <p>
              <strong>4.</strong> Adicione pelo menos 3 fatores antes de concluir
            </p>
          </CardContent>
        </Card>

        {/* Grid de Pilares PESTEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILARES.map((pilar) => {
            const fatoresDoPilar = analisePestel?.fatores.filter((f) => f.pilar === pilar) || []

            return (
              <PestelCard
                key={pilar}
                pilar={pilar}
                fatores={fatoresDoPilar}
                onAdd={() => handleAdicionarFator(pilar)}
                onEdit={handleEditarFator}
              />
            )
          })}
        </div>

          {/* Navegação */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={() => router.push("/corporativo/estrategico/planejamento")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Planejamento
            </Button>
            {concluida && (
              <Button onClick={handleAvancar}>
                Próxima Etapa: SWOT
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </TabsContent>

        {/* TAB 2: Métricas & Dashboards */}
        <TabsContent value="metricas" className="space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Fatores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{totalFatores}</span>
                  <BarChart3 className="h-8 w-8 text-blue-500/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Riscos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-red-600">{riscos.length}</span>
                  <AlertTriangle className="h-8 w-8 text-red-500/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Oportunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-600">{oportunidades.length}</span>
                  <TrendingUp className="h-8 w-8 text-green-500/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Impacto Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-purple-600">{impactoMedio.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">/5.0</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Gráfico de Barras por Pilar */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Pilar</CardTitle>
                <CardDescription>Quantidade de fatores identificados em cada pilar</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosPorPilar}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pilar" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="riscos" fill="#ef4444" name="Riscos" />
                    <Bar dataKey="oportunidades" fill="#10b981" name="Oportunidades" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Pizza - Riscos vs Oportunidades */}
            <Card>
              <CardHeader>
                <CardTitle>Riscos vs Oportunidades</CardTitle>
                <CardDescription>Proporção entre riscos e oportunidades identificados</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dadosTipos}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosTipos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Fatores de Alto Impacto */}
          <Card>
            <CardHeader>
              <CardTitle>Fatores de Alto Impacto (4-5)</CardTitle>
              <CardDescription>Fatores que requerem atenção prioritária</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analisePestel?.fatores
                  .filter((f) => f.impacto >= 4)
                  .map((fator) => (
                    <div key={fator.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          fator.tipo === "risco" ? "bg-red-500" : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">
                            {fator.pilar}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              fator.tipo === "risco" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                            }`}
                          >
                            {fator.tipo}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                            Impacto: {fator.impacto}/5
                          </span>
                        </div>
                        <p className="text-sm">{fator.descricao}</p>
                      </div>
                    </div>
                  ))}
                {(!analisePestel?.fatores || analisePestel.fatores.filter((f) => f.impacto >= 4).length === 0) && (
                  <p className="text-center text-muted-foreground py-8">Nenhum fator de alto impacto identificado</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de Adicionar/Editar Fator */}
      {pilarSelecionado && (
        <FatorPestelDialog
          open={dialogAberto}
          onOpenChange={setDialogAberto}
          pilar={pilarSelecionado}
          fatorExistente={fatorEmEdicao}
          onSave={handleSalvarFator}
        />
      )}
    </PageContent>
    </>
  )
}
