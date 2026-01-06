"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Filter,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  Shield,
  Package,
  ChevronRight,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

// Dados expandidos com historico
const indicadores = [
  {
    categoria: "Desempenho Fisico",
    icone: Activity,
    items: [
      {
        id: 1,
        nome: "SPI (Schedule Performance Index)",
        valor: 0.96,
        meta: 1.0,
        anterior: 0.94,
        status: "atencao",
        unidade: "",
        tendencia: "subindo",
        historico: [0.91, 0.92, 0.93, 0.94, 0.96],
      },
      {
        id: 2,
        nome: "Avanco Fisico Acumulado",
        valor: 67.4,
        meta: 70,
        anterior: 64.2,
        status: "atencao",
        unidade: "%",
        tendencia: "subindo",
        historico: [55.1, 58.3, 61.0, 64.2, 67.4],
      },
      {
        id: 3,
        nome: "Produtividade Media",
        valor: 92,
        meta: 95,
        anterior: 91,
        status: "atencao",
        unidade: "%",
        tendencia: "estavel",
        historico: [89, 90, 91, 91, 92],
      },
      {
        id: 4,
        nome: "Desvio de Prazo (dias)",
        valor: 12,
        meta: 0,
        anterior: 15,
        status: "atencao",
        unidade: "dias",
        tendencia: "melhorando",
        historico: [22, 20, 18, 15, 12],
      },
      {
        id: 5,
        nome: "Frentes Ativas",
        valor: 8,
        meta: 10,
        anterior: 7,
        status: "ok",
        unidade: "",
        tendencia: "subindo",
        historico: [5, 6, 6, 7, 8],
      },
    ],
  },
  {
    categoria: "Desempenho Financeiro",
    icone: DollarSign,
    items: [
      {
        id: 6,
        nome: "CPI (Cost Performance Index)",
        valor: 1.04,
        meta: 1.0,
        anterior: 1.02,
        status: "ok",
        unidade: "",
        tendencia: "subindo",
        historico: [0.98, 0.99, 1.01, 1.02, 1.04],
      },
      {
        id: 7,
        nome: "Margem Bruta",
        valor: 8.7,
        meta: 9.0,
        anterior: 8.5,
        status: "atencao",
        unidade: "%",
        tendencia: "subindo",
        historico: [8.1, 8.2, 8.4, 8.5, 8.7],
      },
      {
        id: 8,
        nome: "EBITDA Obra",
        valor: 12.3,
        meta: 11.0,
        anterior: 11.8,
        status: "ok",
        unidade: "M",
        tendencia: "subindo",
        historico: [10.2, 10.8, 11.2, 11.8, 12.3],
      },
      {
        id: 9,
        nome: "Receita Acumulada",
        valor: 156.8,
        meta: 165.0,
        anterior: 142.5,
        status: "atencao",
        unidade: "M",
        tendencia: "subindo",
        historico: [98.2, 112.4, 128.1, 142.5, 156.8],
      },
      {
        id: 10,
        nome: "Custo Acumulado",
        valor: 143.1,
        meta: 150.0,
        anterior: 130.2,
        status: "ok",
        unidade: "M",
        tendencia: "controlado",
        historico: [89.8, 102.1, 116.4, 130.2, 143.1],
      },
    ],
  },
  {
    categoria: "Qualidade e Seguranca",
    icone: Shield,
    items: [
      {
        id: 11,
        nome: "Taxa de Retrabalho",
        valor: 2.1,
        meta: 3.0,
        anterior: 2.4,
        status: "ok",
        unidade: "%",
        tendencia: "melhorando",
        historico: [3.2, 2.9, 2.6, 2.4, 2.1],
      },
      {
        id: 12,
        nome: "Acidentes c/ Afastamento",
        valor: 0,
        meta: 0,
        anterior: 0,
        status: "ok",
        unidade: "",
        tendencia: "estavel",
        historico: [0, 1, 0, 0, 0],
      },
      {
        id: 13,
        nome: "NC Abertas",
        valor: 3,
        meta: 5,
        anterior: 4,
        status: "ok",
        unidade: "",
        tendencia: "melhorando",
        historico: [7, 6, 5, 4, 3],
      },
      {
        id: 14,
        nome: "Inspecoes Realizadas",
        valor: 45,
        meta: 40,
        anterior: 42,
        status: "ok",
        unidade: "",
        tendencia: "subindo",
        historico: [35, 38, 40, 42, 45],
      },
      {
        id: 15,
        nome: "Taxa TFCA",
        valor: 0.8,
        meta: 1.0,
        anterior: 0.9,
        status: "ok",
        unidade: "",
        tendencia: "melhorando",
        historico: [1.2, 1.1, 1.0, 0.9, 0.8],
      },
    ],
  },
  {
    categoria: "Suprimentos",
    icone: Package,
    items: [
      {
        id: 16,
        nome: "Aderencia ao Plano 0.9",
        valor: 78,
        meta: 80,
        anterior: 75,
        status: "atencao",
        unidade: "%",
        tendencia: "subindo",
        historico: [68, 71, 73, 75, 78],
      },
      {
        id: 17,
        nome: "Lead Time Medio",
        valor: 12,
        meta: 15,
        anterior: 13,
        status: "ok",
        unidade: "dias",
        tendencia: "melhorando",
        historico: [18, 16, 15, 13, 12],
      },
      {
        id: 18,
        nome: "Fornecedores Homologados",
        valor: 89,
        meta: 85,
        anterior: 87,
        status: "ok",
        unidade: "%",
        tendencia: "subindo",
        historico: [82, 84, 85, 87, 89],
      },
      {
        id: 19,
        nome: "Pedidos em Atraso",
        valor: 3,
        meta: 0,
        anterior: 5,
        status: "atencao",
        unidade: "",
        tendencia: "melhorando",
        historico: [8, 7, 6, 5, 3],
      },
      {
        id: 20,
        nome: "Saving Acumulado",
        valor: 4.2,
        meta: 3.0,
        anterior: 3.8,
        status: "ok",
        unidade: "%",
        tendencia: "subindo",
        historico: [2.1, 2.8, 3.2, 3.8, 4.2],
      },
    ],
  },
]

// Resumo geral
const resumo = {
  total: 20,
  naMeta: 14,
  atencao: 6,
  criticos: 0,
  tendenciaMelhorando: 12,
  tendenciaPiorando: 0,
}

function IndicadoresContent() {
  const [selectedIndicador, setSelectedIndicador] = useState<any>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos")

  const handleSelectIndicador = (item: any, categoria: string) => {
    setSelectedIndicador({ ...item, categoria })
    setSheetOpen(true)
  }

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case "subindo":
      case "melhorando":
        return <TrendingUp className="w-4 h-4 text-primary" />
      case "descendo":
      case "piorando":
        return <TrendingDown className="w-4 h-4 text-destructive" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Na Meta
          </Badge>
        )
      case "atencao":
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
            Atencao
          </Badge>
        )
      case "critico":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            Critico
          </Badge>
        )
      default:
        return null
    }
  }

  const getVariacao = (atual: number, anterior: number) => {
    const diff = atual - anterior
    const percentual = anterior !== 0 ? ((diff / anterior) * 100).toFixed(1) : "0"
    return { diff, percentual }
  }

  const formatarValor = (valor: number, unidade: string) => {
    if (unidade === "M") return `R$ ${valor}M`
    if (unidade === "%") return `${valor}%`
    if (unidade === "dias") return `${valor} dias`
    return valor.toString()
  }

  // Filtrar indicadores
  const indicadoresFiltrados =
    categoriaAtiva === "todos"
      ? indicadores
      : indicadores.filter((cat) => cat.categoria.toLowerCase().includes(categoriaAtiva.toLowerCase()))

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Indicadores & KPIs</h1>
                <Badge variant="outline" className="text-xs">
                  GC-04
                </Badge>
                <InfoTooltip
                  title="Indicadores & KPIs"
                  description="Painel consolidado de indicadores. Clique em qualquer indicador para ver historico e detalhes."
                />
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Periodo
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-6 gap-3 mb-4 flex-shrink-0">
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-muted/50">
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{resumo.total}</p>
              <p className="text-xs text-muted-foreground">Total KPIs</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{resumo.naMeta}</p>
              <p className="text-xs text-muted-foreground">Na Meta</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-accent/10">
                <AlertTriangle className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-2xl font-bold text-accent-foreground">{resumo.atencao}</p>
              <p className="text-xs text-muted-foreground">Atencao</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">{resumo.criticos}</p>
              <p className="text-xs text-muted-foreground">Criticos</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{resumo.tendenciaMelhorando}</p>
              <p className="text-xs text-muted-foreground">Melhorando</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-muted/50">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{resumo.tendenciaPiorando}</p>
              <p className="text-xs text-muted-foreground">Piorando</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Categorias */}
        <Tabs defaultValue="todos" className="flex-1 flex flex-col min-h-0" onValueChange={setCategoriaAtiva}>
          <TabsList className="w-fit mb-3 flex-shrink-0">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="fisico">Fisico</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="qualidade">Qualidade</TabsTrigger>
            <TabsTrigger value="suprimentos">Suprimentos</TabsTrigger>
          </TabsList>

          <TabsContent value={categoriaAtiva} className="flex-1 min-h-0 mt-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4">
                {indicadoresFiltrados.map((categoria) => {
                  const IconeCategoria = categoria.icone
                  return (
                    <Card key={categoria.categoria} className="border-border/50">
                      <CardHeader className="py-3 pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <IconeCategoria className="w-4 h-4 text-primary" />
                          {categoria.categoria}
                          <Badge variant="outline" className="ml-auto text-xs">
                            {categoria.items.filter((i) => i.status === "ok").length}/{categoria.items.length} na meta
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {/* Tabela de Indicadores */}
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/30 border-b">
                                <th className="text-left p-2 font-medium text-muted-foreground">Indicador</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-24">Atual</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-24">Meta</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-24">Anterior</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-20">Var.</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-24">Status</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-20">Tend.</th>
                                <th className="text-center p-2 font-medium text-muted-foreground w-10"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {categoria.items.map((item) => {
                                const variacao = getVariacao(item.valor, item.anterior)
                                return (
                                  <tr
                                    key={item.id}
                                    className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                                    onClick={() => handleSelectIndicador(item, categoria.categoria)}
                                  >
                                    <td className="p-2 font-medium">{item.nome}</td>
                                    <td className="p-2 text-center font-bold">
                                      {formatarValor(item.valor, item.unidade)}
                                    </td>
                                    <td className="p-2 text-center text-muted-foreground">
                                      {formatarValor(item.meta, item.unidade)}
                                    </td>
                                    <td className="p-2 text-center text-muted-foreground">
                                      {formatarValor(item.anterior, item.unidade)}
                                    </td>
                                    <td className="p-2 text-center">
                                      <span
                                        className={`flex items-center justify-center gap-1 text-xs ${
                                          Number.parseFloat(variacao.percentual) > 0
                                            ? "text-primary"
                                            : Number.parseFloat(variacao.percentual) < 0
                                              ? "text-destructive"
                                              : "text-muted-foreground"
                                        }`}
                                      >
                                        {Number.parseFloat(variacao.percentual) > 0 ? (
                                          <ArrowUpRight className="w-3 h-3" />
                                        ) : Number.parseFloat(variacao.percentual) < 0 ? (
                                          <ArrowDownRight className="w-3 h-3" />
                                        ) : null}
                                        {variacao.percentual}%
                                      </span>
                                    </td>
                                    <td className="p-2 text-center">{getStatusBadge(item.status)}</td>
                                    <td className="p-2 text-center">{getTendenciaIcon(item.tendencia)}</td>
                                    <td className="p-2 text-center">
                                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Painel Lateral - Detalhe do Indicador */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
            {selectedIndicador && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Detalhe do Indicador
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Info Principal */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{selectedIndicador.categoria}</p>
                    <h3 className="text-lg font-bold">{selectedIndicador.nome}</h3>
                  </div>

                  {/* Valor Atual */}
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Valor Atual</p>
                          <p className="text-3xl font-bold text-primary">
                            {formatarValor(selectedIndicador.valor, selectedIndicador.unidade)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Meta</p>
                          <p className="text-xl font-bold">
                            {formatarValor(selectedIndicador.meta, selectedIndicador.unidade)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-primary/20">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status:</span>
                          {getStatusBadge(selectedIndicador.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comparativo */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Comparativo com Mes Anterior</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-1">Mes Anterior</p>
                          <p className="text-xl font-bold">
                            {formatarValor(selectedIndicador.anterior, selectedIndicador.unidade)}
                          </p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-1">Variacao</p>
                          <p
                            className={`text-xl font-bold flex items-center justify-center gap-1 ${
                              selectedIndicador.valor > selectedIndicador.anterior
                                ? "text-primary"
                                : selectedIndicador.valor < selectedIndicador.anterior
                                  ? "text-destructive"
                                  : ""
                            }`}
                          >
                            {selectedIndicador.valor > selectedIndicador.anterior ? (
                              <ArrowUpRight className="w-5 h-5" />
                            ) : selectedIndicador.valor < selectedIndicador.anterior ? (
                              <ArrowDownRight className="w-5 h-5" />
                            ) : null}
                            {getVariacao(selectedIndicador.valor, selectedIndicador.anterior).percentual}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Historico (Ultimos 5 meses) */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Evolucao (Ultimos 5 Meses)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {["Set", "Out", "Nov", "Dez", "Jan"].map((mes, index) => {
                          const valor = selectedIndicador.historico[index]
                          const percentual = (valor / selectedIndicador.meta) * 100
                          const isAtual = index === 4
                          return (
                            <div key={mes} className="flex items-center gap-3">
                              <span className={`text-xs w-8 ${isAtual ? "font-bold" : "text-muted-foreground"}`}>
                                {mes}
                              </span>
                              <div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    percentual >= 100 ? "bg-primary" : percentual >= 80 ? "bg-primary/70" : "bg-accent"
                                  }`}
                                  style={{ width: `${Math.min(percentual, 100)}%` }}
                                />
                              </div>
                              <span className={`text-xs w-16 text-right ${isAtual ? "font-bold" : ""}`}>
                                {formatarValor(valor, selectedIndicador.unidade)}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tendencia:</span>
                        <div className="flex items-center gap-2">
                          {getTendenciaIcon(selectedIndicador.tendencia)}
                          <span className="text-sm capitalize">{selectedIndicador.tendencia}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Projecao */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Projecao</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Projecao para Fev/2026:</span>
                          <span className="font-bold">
                            {formatarValor(selectedIndicador.valor * 1.02, selectedIndicador.unidade)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Probabilidade de atingir meta:</span>
                          <Badge
                            variant="outline"
                            className={
                              selectedIndicador.status === "ok"
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-accent/10 text-accent-foreground border-accent/30"
                            }
                          >
                            {selectedIndicador.status === "ok" ? "Alta" : "Media"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Acoes */}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                    <Button className="flex-1">Ver Origem</Button>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function IndicadoresPage() {
  return (
    <Suspense fallback={null}>
      <IndicadoresContent />
    </Suspense>
  )
}
