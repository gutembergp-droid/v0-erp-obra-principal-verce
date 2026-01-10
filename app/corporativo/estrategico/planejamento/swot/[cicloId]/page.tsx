"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Plus, BarChart3, TrendingUp, AlertTriangle, Layers } from "lucide-react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContent } from "@/components/layout/page-content"
import { PlanejamentoTopBar } from "../../_components/planejamento-top-bar"
import { SwotQuadrant } from "../../_components/swot-quadrant"
import { ItemSwotDialog } from "../../_components/item-swot-dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { toast } from "sonner"
import type { QuadranteSWOT, SWOTItem } from "@/lib/types/planejamento"

export default function SwotPage({ params }: { params: Promise<{ cicloId: string }> }) {
  const resolvedParams = use(params)
  const { cicloId } = resolvedParams
  const router = useRouter()
  const { ciclos, swot, adicionarItemSWOT, atualizarItemSWOT, concluirSWOT, avancarEtapa } = useCicloEstrategico()

  const [dialogAberto, setDialogAberto] = useState(false)
  const [quadranteSelecionado, setQuadranteSelecionado] = useState<QuadranteSWOT | null>(null)
  const [itemEmEdicao, setItemEmEdicao] = useState<SWOTItem | undefined>(undefined)

  const ciclo = ciclos.find((c) => c.id === cicloId)
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
    const totalItens =
      (analiseSwot?.forcas.length || 0) +
      (analiseSwot?.fraquezas.length || 0) +
      (analiseSwot?.oportunidades.length || 0) +
      (analiseSwot?.ameacas.length || 0)

    if (totalItens < 8) {
      toast.error("Análise incompleta", {
        description: "Adicione pelo menos 2 itens em cada quadrante",
      })
      return
    }

    if (!analiseSwot?.temas || analiseSwot.temas.length < 2) {
      toast.error("Temas estratégicos necessários", {
        description: "Defina pelo menos 2 temas estratégicos antes de concluir",
      })
      return
    }

    concluirSWOT(cicloId)
    toast.success("Análise SWOT concluída!")
  }

  const handleAvancar = () => {
    if (!analiseSwot?.concluidaEm) {
      toast.error("Conclua a análise primeiro")
      return
    }

    const sucesso = avancarEtapa(cicloId)
    if (sucesso) {
      toast.success("Avançando para GUT...")
      router.push(`/corporativo/estrategico/planejamento/gut/${cicloId}`)
    }
  }

  const handleAdicionarItem = (quadrante: QuadranteSWOT) => {
    setQuadranteSelecionado(quadrante)
    setItemEmEdicao(undefined)
    setDialogAberto(true)
  }

  const handleEditarItem = (item: SWOTItem) => {
    setQuadranteSelecionado(item.quadrante)
    setItemEmEdicao(item)
    setDialogAberto(true)
  }

  const handleSalvarItem = (dados: any) => {
    if (dados.id) {
      atualizarItemSWOT(cicloId, dados.id, dados)
      toast.success("Item atualizado!")
    } else {
      adicionarItemSWOT(cicloId, dados)
      toast.success("Item adicionado!")
    }
  }

  const concluida = !!analiseSwot?.concluidaEm

  // Métricas
  const totalItens =
    (analiseSwot?.forcas.length || 0) +
    (analiseSwot?.fraquezas.length || 0) +
    (analiseSwot?.oportunidades.length || 0) +
    (analiseSwot?.ameacas.length || 0)

  const dadosQuadrantes = [
    { name: "Forças", value: analiseSwot?.forcas.length || 0, color: "#10b981" },
    { name: "Fraquezas", value: analiseSwot?.fraquezas.length || 0, color: "#f59e0b" },
    { name: "Oportunidades", value: analiseSwot?.oportunidades.length || 0, color: "#3b82f6" },
    { name: "Ameaças", value: analiseSwot?.ameacas.length || 0, color: "#ef4444" },
  ]

  const dadosInternos = [
    { quadrante: "Forças", itens: analiseSwot?.forcas.length || 0 },
    { quadrante: "Fraquezas", itens: analiseSwot?.fraquezas.length || 0 },
  ]

  const dadosExternos = [
    { quadrante: "Oportunidades", itens: analiseSwot?.oportunidades.length || 0 },
    { quadrante: "Ameaças", itens: analiseSwot?.ameacas.length || 0 },
  ]

  return (
    <>
      <PlanejamentoTopBar
        ciclo={ciclo}
        currentPage="swot"
        pageTitle="Análise SWOT"
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
                GUT
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
          <CardContent className="pt-6 text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Forças:</strong> Fatores internos positivos | <strong>Fraquezas:</strong> Fatores internos negativos
            </p>
            <p>
              <strong>Oportunidades:</strong> Fatores externos favoráveis | <strong>Ameaças:</strong> Fatores externos desfavoráveis
            </p>
          </CardContent>
        </Card>

        {/* Matriz SWOT 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwotQuadrant
            quadrante="forcas"
            itens={analiseSwot?.forcas || []}
            onAdd={() => handleAdicionarItem("forcas")}
            onEdit={handleEditarItem}
          />
          <SwotQuadrant
            quadrante="fraquezas"
            itens={analiseSwot?.fraquezas || []}
            onAdd={() => handleAdicionarItem("fraquezas")}
            onEdit={handleEditarItem}
          />
          <SwotQuadrant
            quadrante="oportunidades"
            itens={analiseSwot?.oportunidades || []}
            onAdd={() => handleAdicionarItem("oportunidades")}
            onEdit={handleEditarItem}
          />
          <SwotQuadrant
            quadrante="ameacas"
            itens={analiseSwot?.ameacas || []}
            onAdd={() => handleAdicionarItem("ameacas")}
            onEdit={handleEditarItem}
          />
        </div>

        {/* Temas Estratégicos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Temas Estratégicos</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Defina os temas que serão priorizados na matriz GUT</p>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Tema
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!analiseSwot?.temas || analiseSwot.temas.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhum tema estratégico definido</p>
            ) : (
              <div className="space-y-3">
                {analiseSwot.temas.map((tema) => (
                  <Card key={tema.id} className="p-4 bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{tema.nome}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{tema.descricao}</p>
                        <div className="flex gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {tema.origemSWOT.length} vínculos SWOT
                          </Badge>
                        </div>
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
          <Button variant="outline" onClick={() => router.push(`/corporativo/estrategico/planejamento/pestel/${cicloId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao PESTEL
          </Button>
          {concluida && (
            <Button onClick={handleAvancar}>
              Próxima Etapa: GUT
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Dialog de Adicionar/Editar Item SWOT */}
      {quadranteSelecionado && (
        <ItemSwotDialog
          open={dialogAberto}
          onOpenChange={setDialogAberto}
          quadrante={quadranteSelecionado}
          itemExistente={itemEmEdicao}
          onSave={handleSalvarItem}
        />
      )}
    </PageContent>
    </>
  )
}
