"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  GitCompare,
  TrendingDown,
  Target,
  ChevronRight,
  X,
  Calculator,
  FileText,
  Layers,
  BarChart3,
  Plus,
  Save,
  Eye,
} from "lucide-react"

// Dados mockados - Cenarios de Custo
const cenariosMock = [
  {
    id: "CEN-001",
    nome: "Cenario Base (Orcamento)",
    tipo: "baseline",
    dataGeracao: "2024-12-01",
    valorTotal: 45680000,
    status: "ativo",
    servicos: 156,
    insumos: 2340,
  },
  {
    id: "CEN-002",
    nome: "Cenario Meta Economica",
    tipo: "meta",
    dataGeracao: "2024-12-15",
    valorTotal: 43896000,
    status: "ativo",
    servicos: 156,
    insumos: 2340,
  },
  {
    id: "CEN-003",
    nome: "Cenario Otimizado (Suprimentos)",
    tipo: "otimizado",
    dataGeracao: "2025-01-05",
    valorTotal: 42150000,
    status: "simulacao",
    servicos: 156,
    insumos: 2340,
  },
]

// Servicos para comparativo
const servicosComparativo = [
  {
    id: 1,
    codigo: "01.01.001",
    descricao: "Escavacao mecanizada em solo de 1a categoria",
    unidade: "m3",
    quantidade: 45000,
    cenarios: {
      baseline: { preco: 18.5, total: 832500 },
      meta: { preco: 17.2, total: 774000 },
      otimizado: { preco: 16.8, total: 756000 },
    },
  },
  {
    id: 2,
    codigo: "02.01.003",
    descricao: "Concreto usinado FCK 30 MPa",
    unidade: "m3",
    quantidade: 12500,
    cenarios: {
      baseline: { preco: 520.0, total: 6500000 },
      meta: { preco: 495.0, total: 6187500 },
      otimizado: { preco: 480.0, total: 6000000 },
    },
  },
  {
    id: 3,
    codigo: "02.02.001",
    descricao: "Aco CA-50 - Fornecimento e montagem",
    unidade: "kg",
    quantidade: 850000,
    cenarios: {
      baseline: { preco: 9.8, total: 8330000 },
      meta: { preco: 9.2, total: 7820000 },
      otimizado: { preco: 8.9, total: 7565000 },
    },
  },
  {
    id: 4,
    codigo: "03.01.002",
    descricao: "CBUQ - Faixa C - Aplicado",
    unidade: "ton",
    quantidade: 28000,
    cenarios: {
      baseline: { preco: 380.0, total: 10640000 },
      meta: { preco: 365.0, total: 10220000 },
      otimizado: { preco: 355.0, total: 9940000 },
    },
  },
  {
    id: 5,
    codigo: "04.01.001",
    descricao: "Tubo PEAD DN 600mm - Instalado",
    unidade: "m",
    quantidade: 3500,
    cenarios: {
      baseline: { preco: 890.0, total: 3115000 },
      meta: { preco: 850.0, total: 2975000 },
      otimizado: { preco: 820.0, total: 2870000 },
    },
  },
]

// Indicadores de cenario
const indicadoresCenario = {
  baseline: { fcd: 1.0, economia: 0, status: "referencia" },
  meta: { fcd: 0.96, economia: 1784000, status: "dentro" },
  otimizado: { fcd: 0.92, economia: 3530000, status: "otimo" },
}

export default function CustoComparativoPage() {
  const router = useRouter()
  const [cenariosSelecionados, setCenariosSelecionados] = useState<string[]>(["baseline", "meta", "otimizado"])
  const [servicoSelecionado, setServicoSelecionado] = useState<(typeof servicosComparativo)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"servicos" | "insumos">("servicos")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  const getVariacao = (valor1: number, valor2: number) => {
    const variacao = ((valor2 - valor1) / valor1) * 100
    return variacao
  }

  const getCenarioColor = (tipo: string) => {
    switch (tipo) {
      case "baseline":
        return "text-muted-foreground"
      case "meta":
        return "text-primary"
      case "otimizado":
        return "text-emerald-500"
      default:
        return "text-foreground"
    }
  }

  const getCenarioBadge = (tipo: string) => {
    switch (tipo) {
      case "baseline":
        return (
          <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
            Baseline
          </Badge>
        )
      case "meta":
        return (
          <Badge variant="outline" className="border-primary/30 text-primary">
            Meta
          </Badge>
        )
      case "otimizado":
        return (
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
            Otimizado
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Quadro Comparativo de Servico</h1>
                <Badge variant="outline" className="text-xs">
                  CM-03
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">
                Compare cenarios de custo lado a lado com indicadores de economia
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cenario
              </Button>
              <Button className="bg-primary text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Aprovar Cenario
              </Button>
            </div>
          </div>

          {/* Navegacao do Setor */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/custo-meta")}
            >
              <Target className="w-3 h-3 mr-2" />
              CM-01 Custo & Meta
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/custo-detalhe")}
            >
              <FileText className="w-3 h-3 mr-2" />
              CM-02 Detalhe
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-muted/50"
              onClick={() => router.push("/obra/comercial/custo-comparativo")}
            >
              <GitCompare className="w-3 h-3 mr-2" />
              CM-03 Comparativo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/custo/analise-mo")}
            >
              <BarChart3 className="w-3 h-3 mr-2" />
              CM-04 Analise MO
            </Button>
          </div>
        </div>

        {/* Cards de Cenarios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cenariosMock.map((cenario) => {
            const indicador = indicadoresCenario[cenario.tipo as keyof typeof indicadoresCenario]
            return (
              <Card
                key={cenario.id}
                className={`bg-card border ${cenario.tipo === "otimizado" ? "border-emerald-500/30" : "border-border"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{cenario.nome}</CardTitle>
                    {getCenarioBadge(cenario.tipo)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className={`text-2xl font-bold ${getCenarioColor(cenario.tipo)}`}>
                      {formatCurrency(cenario.valorTotal)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cenario.servicos} servicos | {formatNumber(cenario.insumos)} insumos
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">F/CD</p>
                      <p
                        className={`text-lg font-bold ${indicador.fcd < 1 ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {indicador.fcd.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Economia</p>
                      <p
                        className={`text-lg font-bold ${indicador.economia > 0 ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {indicador.economia > 0 ? formatCurrency(indicador.economia) : "-"}
                      </p>
                    </div>
                  </div>

                  {cenario.tipo === "otimizado" && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-500/10 rounded-lg">
                      <TrendingDown className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs text-emerald-500 font-medium">Economia de 7.7% vs Baseline</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Grafico de Barras Comparativo Visual */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              Comparativo Visual de Cenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cenariosMock.map((cenario) => {
                const percentual = (cenario.valorTotal / cenariosMock[0].valorTotal) * 100
                return (
                  <div key={cenario.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cenario.nome}</span>
                      <span className={getCenarioColor(cenario.tipo)}>{formatCurrency(cenario.valorTotal)}</span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={percentual}
                        className={`h-6 ${cenario.tipo === "otimizado" ? "[&>div]:bg-emerald-500" : cenario.tipo === "meta" ? "[&>div]:bg-primary" : "[&>div]:bg-muted-foreground"}`}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {percentual.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tabela Comparativa de Servicos */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                Comparativo por Servico
              </CardTitle>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "servicos" | "insumos")}>
                <TabsList className="h-8">
                  <TabsTrigger value="servicos" className="text-xs">
                    Servicos
                  </TabsTrigger>
                  <TabsTrigger value="insumos" className="text-xs">
                    Insumos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Codigo</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Descricao</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Qtd</th>
                    <th className="text-right p-3 font-medium text-muted-foreground bg-muted/50">
                      <div className="flex flex-col items-end">
                        <span>Baseline</span>
                        <span className="text-xs font-normal">Preco | Total</span>
                      </div>
                    </th>
                    <th className="text-right p-3 font-medium text-primary bg-primary/5">
                      <div className="flex flex-col items-end">
                        <span>Meta</span>
                        <span className="text-xs font-normal">Preco | Total</span>
                      </div>
                    </th>
                    <th className="text-right p-3 font-medium text-emerald-500 bg-emerald-500/5">
                      <div className="flex flex-col items-end">
                        <span>Otimizado</span>
                        <span className="text-xs font-normal">Preco | Total</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Economia</th>
                  </tr>
                </thead>
                <tbody>
                  {servicosComparativo.map((servico) => {
                    const economiaTotal = servico.cenarios.baseline.total - servico.cenarios.otimizado.total
                    const economiaPercent = getVariacao(
                      servico.cenarios.baseline.total,
                      servico.cenarios.otimizado.total,
                    )
                    return (
                      <tr
                        key={servico.id}
                        className="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setServicoSelecionado(servico)}
                      >
                        <td className="p-3 font-mono text-xs">{servico.codigo}</td>
                        <td className="p-3">
                          <p className="font-medium text-foreground line-clamp-1">{servico.descricao}</p>
                        </td>
                        <td className="p-3 text-center text-muted-foreground">
                          {formatNumber(servico.quantidade)} {servico.unidade}
                        </td>
                        <td className="p-3 text-right bg-muted/20">
                          <div className="flex flex-col items-end">
                            <span className="text-muted-foreground">
                              {formatCurrency(servico.cenarios.baseline.preco)}
                            </span>
                            <span className="font-medium">{formatCurrency(servico.cenarios.baseline.total)}</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-primary/5">
                          <div className="flex flex-col items-end">
                            <span className="text-primary">{formatCurrency(servico.cenarios.meta.preco)}</span>
                            <span className="font-medium text-primary">
                              {formatCurrency(servico.cenarios.meta.total)}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-emerald-500/5">
                          <div className="flex flex-col items-end">
                            <span className="text-emerald-500">{formatCurrency(servico.cenarios.otimizado.preco)}</span>
                            <span className="font-medium text-emerald-500">
                              {formatCurrency(servico.cenarios.otimizado.total)}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium text-primary">{formatCurrency(economiaTotal)}</span>
                            <span className="text-xs text-primary">{economiaPercent.toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 font-semibold">
                    <td colSpan={3} className="p-3 text-foreground">
                      TOTAL
                    </td>
                    <td className="p-3 text-right text-foreground bg-muted/30">
                      {formatCurrency(servicosComparativo.reduce((acc, s) => acc + s.cenarios.baseline.total, 0))}
                    </td>
                    <td className="p-3 text-right text-primary bg-primary/10">
                      {formatCurrency(servicosComparativo.reduce((acc, s) => acc + s.cenarios.meta.total, 0))}
                    </td>
                    <td className="p-3 text-right text-emerald-500 bg-emerald-500/10">
                      {formatCurrency(servicosComparativo.reduce((acc, s) => acc + s.cenarios.otimizado.total, 0))}
                    </td>
                    <td className="p-3 text-center text-primary">
                      {formatCurrency(
                        servicosComparativo.reduce((acc, s) => acc + s.cenarios.baseline.total, 0) -
                          servicosComparativo.reduce((acc, s) => acc + s.cenarios.otimizado.total, 0),
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Acoes */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar Composicoes
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <Calculator className="w-4 h-4 mr-2" />
                Simular Novo Cenario
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Exportar Relatorio
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel Lateral - Detalhe do Servico */}
      {servicoSelecionado && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setServicoSelecionado(null)} />
          <div className="relative w-full max-w-lg bg-card border-l border-border shadow-lg overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-foreground">Detalhe do Servico</h3>
                <p className="text-xs text-muted-foreground font-mono">{servicoSelecionado.codigo}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setServicoSelecionado(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Descricao</p>
                <p className="font-medium text-foreground">{servicoSelecionado.descricao}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Quantidade</p>
                  <p className="font-medium text-foreground">
                    {formatNumber(servicoSelecionado.quantidade)} {servicoSelecionado.unidade}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Economia Total</p>
                  <p className="font-medium text-primary">
                    {formatCurrency(
                      servicoSelecionado.cenarios.baseline.total - servicoSelecionado.cenarios.otimizado.total,
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Comparativo de Precos</p>

                {/* Baseline */}
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Baseline (Orcamento)</span>
                    <Badge variant="outline" className="text-xs">
                      Referencia
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Preco Unitario</p>
                      <p className="font-medium">{formatCurrency(servicoSelecionado.cenarios.baseline.preco)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="font-medium">{formatCurrency(servicoSelecionado.cenarios.baseline.total)}</p>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary">Meta Economica</span>
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      -
                      {getVariacao(
                        servicoSelecionado.cenarios.baseline.total,
                        servicoSelecionado.cenarios.meta.total,
                      ).toFixed(1)}
                      %
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Preco Unitario</p>
                      <p className="font-medium text-primary">
                        {formatCurrency(servicoSelecionado.cenarios.meta.preco)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="font-medium text-primary">
                        {formatCurrency(servicoSelecionado.cenarios.meta.total)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Otimizado */}
                <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-emerald-500">Cenario Otimizado</span>
                    <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-500">
                      -
                      {getVariacao(
                        servicoSelecionado.cenarios.baseline.total,
                        servicoSelecionado.cenarios.otimizado.total,
                      ).toFixed(1)}
                      %
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Preco Unitario</p>
                      <p className="font-medium text-emerald-500">
                        {formatCurrency(servicoSelecionado.cenarios.otimizado.preco)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="font-medium text-emerald-500">
                        {formatCurrency(servicoSelecionado.cenarios.otimizado.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button className="w-full bg-primary text-primary-foreground">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Composicao Completa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
