"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  DollarSign, 
  Wrench, 
  Truck, 
  AlertTriangle, 
  CheckCircle2,
  TrendingUp,
  Calculator,
  Save,
  Send
} from "lucide-react"
import { ComercialSidebar } from "../../../_components/comercial-sidebar"
import { ComercialTopBar } from "../../../_components/comercial-top-bar"
import { toast } from "sonner"

// ============================================================================
// COMPONENT
// ============================================================================

export default function PropostaElaboracaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  // ============================================================================
  // ESTADO - CENÁRIO ECONÔMICO
  // ============================================================================
  
  // Custos Diretos
  const [material, setMaterial] = useState("0")
  const [maoObra, setMaoObra] = useState("0")
  const [equipamentos, setEquipamentos] = useState("0")
  const [servTerceiros, setServTerceiros] = useState("0")

  // Custos Indiretos
  const [administracaoObra, setAdministracaoObra] = useState("0")
  const [mobilizacao, setMobilizacao] = useState("0")
  const [canteiro, setCanteiro] = useState("0")
  const [engenharia, setEngenharia] = useState("0")

  // Impostos e Despesas
  const [impostos, setImpostos] = useState("5.93") // % típico
  const [dag, setDag] = useState("3") // % Despesas Administrativas Gerais
  const [margem, setMargem] = useState("12") // % Margem desejada

  // ============================================================================
  // CÁLCULOS AUTOMÁTICOS
  // ============================================================================

  const parseNumber = (value: string) => parseFloat(value.replace(/[^\d.-]/g, '')) || 0

  const custoDireto = parseNumber(material) + parseNumber(maoObra) + parseNumber(equipamentos) + parseNumber(servTerceiros)
  const custoIndireto = parseNumber(administracaoObra) + parseNumber(mobilizacao) + parseNumber(canteiro) + parseNumber(engenharia)
  const custoTotal = custoDireto + custoIndireto
  
  const valorImpostos = custoTotal * (parseNumber(impostos) / 100)
  const valorDAG = custoTotal * (parseNumber(dag) / 100)
  const valorMargem = custoTotal * (parseNumber(margem) / 100)
  
  const valorProposta = custoTotal + valorImpostos + valorDAG + valorMargem
  const bdi = ((valorImpostos + valorDAG + valorMargem) / custoTotal) * 100

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const salvarRascunho = () => {
    toast.success("Elaboração salva como rascunho")
  }

  const finalizarElaboracao = () => {
    toast.success("Elaboração finalizada! Proposta pronta para decisão.")
    router.push(`/corporativo/comercial/propostas/${id}`)
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <ComercialSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ComercialTopBar titulo={`Elaboração - ${id}`} hideNovaPropostaButton={true} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <div className="h-6 w-px bg-border" />
                <div>
                  <h1 className="text-2xl font-bold">Elaboração e Análise de Proposta</h1>
                  <p className="text-sm text-muted-foreground">{id} • Construtora ABC - Ponte Rio Grande</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={salvarRascunho}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button onClick={finalizarElaboracao}>
                  <Send className="w-4 h-4 mr-2" />
                  Finalizar Elaboração
                </Button>
              </div>
            </div>

            {/* Tabs Principais */}
            <Tabs defaultValue="economico" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="economico">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Cenário Econômico
                </TabsTrigger>
                <TabsTrigger value="tecnico">
                  <Wrench className="w-4 h-4 mr-2" />
                  Análise Técnica
                </TabsTrigger>
                <TabsTrigger value="operacional">
                  <Truck className="w-4 h-4 mr-2" />
                  Análise Operacional
                </TabsTrigger>
                <TabsTrigger value="riscos">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Análise de Riscos
                </TabsTrigger>
                <TabsTrigger value="sintese">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Síntese & Decisão
                </TabsTrigger>
              </TabsList>

              {/* ================================================================
                  TAB 1: CENÁRIO ECONÔMICO
              ================================================================ */}
              <TabsContent value="economico" className="space-y-6 mt-6">
                {/* Resumo Rápido */}
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Resumo Econômico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-blue-700 mb-1">Custo Total</p>
                        <p className="text-lg font-bold text-blue-900">{formatCurrency(custoTotal)}</p>
                      </div>
                      <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded">
                        <p className="text-xs text-amber-700 mb-1">Impostos</p>
                        <p className="text-lg font-bold text-amber-900">{formatCurrency(valorImpostos)}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded">
                        <p className="text-xs text-purple-700 mb-1">DAG</p>
                        <p className="text-lg font-bold text-purple-900">{formatCurrency(valorDAG)}</p>
                      </div>
                      <div className="text-center p-3 bg-emerald-50 border border-emerald-200 rounded">
                        <p className="text-xs text-emerald-700 mb-1">Margem</p>
                        <p className="text-lg font-bold text-emerald-900">{formatCurrency(valorMargem)}</p>
                      </div>
                      <div className="text-center p-3 bg-primary/10 border-2 border-primary rounded">
                        <p className="text-xs text-primary mb-1">Valor Proposta</p>
                        <p className="text-xl font-black text-primary">{formatCurrency(valorProposta)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">BDI Calculado: </span>
                        <span className="font-bold text-lg">{formatPercent(bdi)}</span>
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div>
                        <span className="text-muted-foreground">Margem Líquida: </span>
                        <span className="font-bold text-lg text-emerald-600">{margem}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  {/* Custos Diretos */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Custos Diretos</CardTitle>
                      <CardDescription>Custos diretamente relacionados à execução</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="material">Material</Label>
                        <Input
                          id="material"
                          type="text"
                          placeholder="R$ 0,00"
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="mao-obra">Mão de Obra</Label>
                        <Input
                          id="mao-obra"
                          type="text"
                          placeholder="R$ 0,00"
                          value={maoObra}
                          onChange={(e) => setMaoObra(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipamentos">Equipamentos</Label>
                        <Input
                          id="equipamentos"
                          type="text"
                          placeholder="R$ 0,00"
                          value={equipamentos}
                          onChange={(e) => setEquipamentos(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="terceiros">Serviços de Terceiros</Label>
                        <Input
                          id="terceiros"
                          type="text"
                          placeholder="R$ 0,00"
                          value={servTerceiros}
                          onChange={(e) => setServTerceiros(e.target.value)}
                        />
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Subtotal Direto:</span>
                          <span className="text-xl font-bold text-blue-600">{formatCurrency(custoDireto)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Custos Indiretos */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Custos Indiretos</CardTitle>
                      <CardDescription>Custos de apoio e estrutura</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="adm-obra">Administração da Obra</Label>
                        <Input
                          id="adm-obra"
                          type="text"
                          placeholder="R$ 0,00"
                          value={administracaoObra}
                          onChange={(e) => setAdministracaoObra(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobilizacao">Mobilização/Desmobilização</Label>
                        <Input
                          id="mobilizacao"
                          type="text"
                          placeholder="R$ 0,00"
                          value={mobilizacao}
                          onChange={(e) => setMobilizacao(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="canteiro">Canteiro de Obras</Label>
                        <Input
                          id="canteiro"
                          type="text"
                          placeholder="R$ 0,00"
                          value={canteiro}
                          onChange={(e) => setCanteiro(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="engenharia">Engenharia/Gestão</Label>
                        <Input
                          id="engenharia"
                          type="text"
                          placeholder="R$ 0,00"
                          value={engenharia}
                          onChange={(e) => setEngenharia(e.target.value)}
                        />
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Subtotal Indireto:</span>
                          <span className="text-xl font-bold text-amber-600">{formatCurrency(custoIndireto)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Impostos e Margem */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Impostos, DAG e Margem</CardTitle>
                    <CardDescription>Percentuais aplicados sobre o custo total</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="impostos">Impostos (%)</Label>
                        <Input
                          id="impostos"
                          type="text"
                          placeholder="5.93"
                          value={impostos}
                          onChange={(e) => setImpostos(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Valor: {formatCurrency(valorImpostos)}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="dag">DAG - Despesas Administrativas (%)</Label>
                        <Input
                          id="dag"
                          type="text"
                          placeholder="3"
                          value={dag}
                          onChange={(e) => setDag(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Valor: {formatCurrency(valorDAG)}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="margem">Margem Desejada (%)</Label>
                        <Input
                          id="margem"
                          type="text"
                          placeholder="12"
                          value={margem}
                          onChange={(e) => setMargem(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Valor: {formatCurrency(valorMargem)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indicadores de Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Indicadores de Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">% Custo Direto</p>
                        <p className="text-2xl font-bold">{custoTotal > 0 ? formatPercent((custoDireto / custoTotal) * 100) : '0%'}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">% Custo Indireto</p>
                        <p className="text-2xl font-bold">{custoTotal > 0 ? formatPercent((custoIndireto / custoTotal) * 100) : '0%'}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">BDI Total</p>
                        <p className="text-2xl font-bold text-primary">{formatPercent(bdi)}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Margem Líquida</p>
                        <p className="text-2xl font-bold text-emerald-600">{margem}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 2: ANÁLISE TÉCNICA
              ================================================================ */}
              <TabsContent value="tecnico" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Técnica</CardTitle>
                    <CardDescription>Capacidade técnica e recursos necessários</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Capacidade Técnica</h4>
                        <div>
                          <Label>Equipe Técnica Necessária</Label>
                          <Input placeholder="Ex: 2 Engenheiros, 5 Técnicos..." />
                        </div>
                        <div>
                          <Label>Tecnologia/Metodologia</Label>
                          <Input placeholder="Ex: Concreto protendido, Método executivo..." />
                        </div>
                        <div>
                          <Label>Equipamentos Especiais</Label>
                          <Input placeholder="Ex: Guindaste 100t, Bate-estaca..." />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Prazo e Cronograma</h4>
                        <div>
                          <Label>Prazo Técnico Estimado</Label>
                          <Input type="number" placeholder="Meses" />
                        </div>
                        <div>
                          <Label>Prazo Contratual</Label>
                          <Input type="number" placeholder="Meses" />
                        </div>
                        <div>
                          <Label>Folga/Contingência</Label>
                          <Input type="number" placeholder="%" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 3: ANÁLISE OPERACIONAL
              ================================================================ */}
              <TabsContent value="operacional" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Operacional</CardTitle>
                    <CardDescription>Logística, fornecedores e execução</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Logística</h4>
                        <div>
                          <Label>Acesso ao Local</Label>
                          <Input placeholder="Condições de acesso..." />
                        </div>
                        <div>
                          <Label>Transporte de Materiais</Label>
                          <Input placeholder="Distância, modalidade..." />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Fornecedores</h4>
                        <div>
                          <Label>Fornecedores Principais</Label>
                          <Input placeholder="Principais fornecedores..." />
                        </div>
                        <div>
                          <Label>Alternativas</Label>
                          <Input placeholder="Fornecedores alternativos..." />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 4: ANÁLISE DE RISCOS
              ================================================================ */}
              <TabsContent value="riscos" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Riscos</CardTitle>
                    <CardDescription>Identificação e mitigação de riscos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Sistema de gestão de riscos</p>
                      <p className="text-sm mt-1">Cadastro e análise de riscos será implementado aqui</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 5: SÍNTESE & DECISÃO
              ================================================================ */}
              <TabsContent value="sintese" className="space-y-6 mt-6">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-xl">Síntese da Proposta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Dashboard Consolidado */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                        <p className="text-sm text-blue-700 mb-2">Valor da Proposta</p>
                        <p className="text-3xl font-black text-blue-900">{formatCurrency(valorProposta)}</p>
                      </div>
                      <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-lg text-center">
                        <p className="text-sm text-emerald-700 mb-2">Margem Líquida</p>
                        <p className="text-3xl font-black text-emerald-900">{margem}%</p>
                      </div>
                      <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
                        <p className="text-sm text-amber-700 mb-2">BDI</p>
                        <p className="text-3xl font-black text-amber-900">{formatPercent(bdi)}</p>
                      </div>
                    </div>

                    {/* Recomendação */}
                    <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-emerald-900 mb-2">Recomendação</h4>
                          <p className="text-sm text-emerald-800">
                            Com base na análise econômica, técnica e operacional, a proposta apresenta 
                            viabilidade positiva com margem adequada e riscos gerenciáveis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decisão Final */}
                    <div className="pt-6 border-t">
                      <h4 className="font-bold mb-4 text-center text-lg">Decisão Final</h4>
                      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <Button 
                          size="lg" 
                          className="h-20 text-lg"
                          onClick={() => {
                            toast.success("Decisão registrada: IR para a proposta!")
                            router.push(`/corporativo/comercial/propostas/${id}`)
                          }}
                        >
                          <CheckCircle2 className="w-6 h-6 mr-2" />
                          IR - Participar da Proposta
                        </Button>
                        <Button 
                          size="lg" 
                          variant="destructive"
                          className="h-20 text-lg"
                          onClick={() => {
                            toast.info("Decisão registrada: NÃO IR")
                            router.push("/corporativo/comercial/propostas")
                          }}
                        >
                          <AlertTriangle className="w-6 h-6 mr-2" />
                          NÃO IR - Declinar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
