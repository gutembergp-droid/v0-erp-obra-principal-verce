"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  TrendingUp,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Percent,
  Target,
  BarChart3,
  BarChart3 as BarChartIcon,
  PieChart,
  PieChart as PieChartIcon,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from "recharts"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Estrutura do DRE
interface DRELinha {
  codigo: string
  descricao: string
  realizado: number
  orcado: number
  variacao: number
  percentualReceita: number
  nivel: number
  tipo: "receita" | "custo" | "despesa" | "resultado"
  filhos?: DRELinha[]
}

const dreDados: DRELinha[] = [
  {
    codigo: "1",
    descricao: "RECEITA BRUTA",
    realizado: 45800000,
    orcado: 44000000,
    variacao: 4.09,
    percentualReceita: 100,
    nivel: 0,
    tipo: "receita",
    filhos: [
      {
        codigo: "1.1",
        descricao: "Receita de Medicoes",
        realizado: 42500000,
        orcado: 41000000,
        variacao: 3.66,
        percentualReceita: 92.79,
        nivel: 1,
        tipo: "receita",
      },
      {
        codigo: "1.2",
        descricao: "Receita de Servicos Extras",
        realizado: 2100000,
        orcado: 1800000,
        variacao: 16.67,
        percentualReceita: 4.59,
        nivel: 1,
        tipo: "receita",
      },
      {
        codigo: "1.3",
        descricao: "Outras Receitas",
        realizado: 1200000,
        orcado: 1200000,
        variacao: 0,
        percentualReceita: 2.62,
        nivel: 1,
        tipo: "receita",
      },
    ],
  },
  {
    codigo: "2",
    descricao: "(-) DEDUCOES DA RECEITA",
    realizado: -4580000,
    orcado: -4400000,
    variacao: 4.09,
    percentualReceita: -10,
    nivel: 0,
    tipo: "custo",
    filhos: [
      {
        codigo: "2.1",
        descricao: "Impostos sobre Receita",
        realizado: -3200000,
        orcado: -3080000,
        variacao: 3.9,
        percentualReceita: -6.99,
        nivel: 1,
        tipo: "custo",
      },
      {
        codigo: "2.2",
        descricao: "Retencoes Contratuais",
        realizado: -1380000,
        orcado: -1320000,
        variacao: 4.55,
        percentualReceita: -3.01,
        nivel: 1,
        tipo: "custo",
      },
    ],
  },
  {
    codigo: "3",
    descricao: "RECEITA LIQUIDA",
    realizado: 41220000,
    orcado: 39600000,
    variacao: 4.09,
    percentualReceita: 90,
    nivel: 0,
    tipo: "resultado",
  },
  {
    codigo: "4",
    descricao: "(-) CUSTOS DIRETOS",
    realizado: -28854000,
    orcado: -27720000,
    variacao: 4.09,
    percentualReceita: -63,
    nivel: 0,
    tipo: "custo",
    filhos: [
      {
        codigo: "4.1",
        descricao: "Mao de Obra Direta",
        realizado: -12800000,
        orcado: -12320000,
        variacao: 3.9,
        percentualReceita: -27.95,
        nivel: 1,
        tipo: "custo",
      },
      {
        codigo: "4.2",
        descricao: "Materiais",
        realizado: -9600000,
        orcado: -9240000,
        variacao: 3.9,
        percentualReceita: -20.96,
        nivel: 1,
        tipo: "custo",
      },
      {
        codigo: "4.3",
        descricao: "Equipamentos",
        realizado: -3200000,
        orcado: -3080000,
        variacao: 3.9,
        percentualReceita: -6.99,
        nivel: 1,
        tipo: "custo",
      },
      {
        codigo: "4.4",
        descricao: "Terceiros/Subempreiteiros",
        realizado: -3254000,
        orcado: -3080000,
        variacao: 5.65,
        percentualReceita: -7.1,
        nivel: 1,
        tipo: "custo",
      },
    ],
  },
  {
    codigo: "5",
    descricao: "LUCRO BRUTO",
    realizado: 12366000,
    orcado: 11880000,
    variacao: 4.09,
    percentualReceita: 27,
    nivel: 0,
    tipo: "resultado",
  },
  {
    codigo: "6",
    descricao: "(-) DESPESAS OPERACIONAIS",
    realizado: -5496000,
    orcado: -5280000,
    variacao: 4.09,
    percentualReceita: -12,
    nivel: 0,
    tipo: "despesa",
    filhos: [
      {
        codigo: "6.1",
        descricao: "Despesas Administrativas",
        realizado: -2748000,
        orcado: -2640000,
        variacao: 4.09,
        percentualReceita: -6,
        nivel: 1,
        tipo: "despesa",
      },
      {
        codigo: "6.2",
        descricao: "Despesas Comerciais",
        realizado: -1374000,
        orcado: -1320000,
        variacao: 4.09,
        percentualReceita: -3,
        nivel: 1,
        tipo: "despesa",
      },
      {
        codigo: "6.3",
        descricao: "Despesas com Pessoal Indireto",
        realizado: -916000,
        orcado: -880000,
        variacao: 4.09,
        percentualReceita: -2,
        nivel: 1,
        tipo: "despesa",
      },
      {
        codigo: "6.4",
        descricao: "Outras Despesas",
        realizado: -458000,
        orcado: -440000,
        variacao: 4.09,
        percentualReceita: -1,
        nivel: 1,
        tipo: "despesa",
      },
    ],
  },
  {
    codigo: "7",
    descricao: "EBITDA",
    realizado: 6870000,
    orcado: 6600000,
    variacao: 4.09,
    percentualReceita: 15,
    nivel: 0,
    tipo: "resultado",
  },
  {
    codigo: "8",
    descricao: "(-) DEPRECIACOES E AMORTIZACOES",
    realizado: -916000,
    orcado: -880000,
    variacao: 4.09,
    percentualReceita: -2,
    nivel: 0,
    tipo: "despesa",
  },
  {
    codigo: "9",
    descricao: "LUCRO OPERACIONAL (EBIT)",
    realizado: 5954000,
    orcado: 5720000,
    variacao: 4.09,
    percentualReceita: 13,
    nivel: 0,
    tipo: "resultado",
  },
  {
    codigo: "10",
    descricao: "(+/-) RESULTADO FINANCEIRO",
    realizado: -458000,
    orcado: -440000,
    variacao: 4.09,
    percentualReceita: -1,
    nivel: 0,
    tipo: "despesa",
  },
  {
    codigo: "11",
    descricao: "LUCRO ANTES DO IR/CS",
    realizado: 5496000,
    orcado: 5280000,
    variacao: 4.09,
    percentualReceita: 12,
    nivel: 0,
    tipo: "resultado",
  },
  {
    codigo: "12",
    descricao: "(-) IR/CS",
    realizado: -1374000,
    orcado: -1320000,
    variacao: 4.09,
    percentualReceita: -3,
    nivel: 0,
    tipo: "custo",
  },
  {
    codigo: "13",
    descricao: "LUCRO LIQUIDO",
    realizado: 4122000,
    orcado: 3960000,
    variacao: 4.09,
    percentualReceita: 9,
    nivel: 0,
    tipo: "resultado",
  },
]

// Evolucao mensal
const evolucaoMensal = [
  { mes: "Jan", receita: 7200000, lucro: 648000, margem: 9.0 },
  { mes: "Fev", receita: 7500000, lucro: 675000, margem: 9.0 },
  { mes: "Mar", receita: 7100000, lucro: 639000, margem: 9.0 },
  { mes: "Abr", receita: 7800000, lucro: 741000, margem: 9.5 },
  { mes: "Mai", receita: 8000000, lucro: 760000, margem: 9.5 },
  { mes: "Jun", receita: 8200000, lucro: 820000, margem: 10.0 },
]

// DRE por obra
const drePorObra = [
  {
    obra: "Torre Mirante",
    codigo: "OBR-001",
    receita: 15200000,
    custos: 10640000,
    despesas: 1824000,
    lucro: 2736000,
    margem: 18.0,
  },
  {
    obra: "Residencial Aurora",
    codigo: "OBR-002",
    receita: 9800000,
    custos: 7350000,
    despesas: 1176000,
    lucro: 1274000,
    margem: 13.0,
  },
  {
    obra: "Shopping Center Norte",
    codigo: "OBR-003",
    receita: 14500000,
    custos: 10150000,
    despesas: 1740000,
    lucro: 2610000,
    margem: 18.0,
  },
  {
    obra: "Hospital Regional",
    codigo: "OBR-004",
    receita: 6300000,
    custos: 4725000,
    despesas: 756000,
    lucro: 819000,
    margem: 13.0,
  },
]

const formatCurrency = (value: number) => {
  const absValue = Math.abs(value)
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(absValue)
}

export default function DREPage() {
  const [periodo, setPeriodo] = useState("2026")
  const [expandedRows, setExpandedRows] = useState<string[]>(["1", "4", "6"])

  const toggleRow = (codigo: string) => {
    setExpandedRows((prev) => (prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]))
  }

  const renderDRERow = (linha: DRELinha, isChild = false) => {
    const hasChildren = linha.filhos && linha.filhos.length > 0
    const isExpanded = expandedRows.includes(linha.codigo)
    const isResultado = linha.tipo === "resultado"

    return (
      <>
        <TableRow
          key={linha.codigo}
          className={`
            ${isResultado ? "bg-muted/50 font-medium" : ""}
            ${isChild ? "text-sm" : ""}
            cursor-pointer hover:bg-muted/30
          `}
          onClick={() => hasChildren && toggleRow(linha.codigo)}
        >
          <TableCell className={isChild ? "pl-8" : ""}>
            <div className="flex items-center gap-2">
              {hasChildren && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              {!hasChildren && isChild && <span className="w-4" />}
              <span className="text-muted-foreground">{linha.codigo}</span>
              <span>{linha.descricao}</span>
            </div>
          </TableCell>
          <TableCell className={`text-right ${linha.realizado < 0 ? "text-red-600" : "text-emerald-600"}`}>
            {linha.realizado < 0 ? "-" : ""}
            {formatCurrency(linha.realizado)}
          </TableCell>
          <TableCell className={`text-right ${linha.orcado < 0 ? "text-red-600" : "text-blue-600"}`}>
            {linha.orcado < 0 ? "-" : ""}
            {formatCurrency(linha.orcado)}
          </TableCell>
          <TableCell className="text-right">
            <Badge
              variant={linha.variacao >= 0 ? "default" : "destructive"}
              className={linha.variacao >= 0 ? "bg-emerald-500" : ""}
            >
              {linha.variacao >= 0 ? "+" : ""}
              {linha.variacao.toFixed(2)}%
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <span className={linha.percentualReceita < 0 ? "text-red-600" : ""}>
              {linha.percentualReceita.toFixed(1)}%
            </span>
          </TableCell>
        </TableRow>
        {hasChildren && isExpanded && linha.filhos?.map((filho) => renderDRERow(filho, true))}
      </>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <FinanceiroNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6 space-y-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">DRE Consolidado</h1>
          <p className="text-muted-foreground">Demonstrativo do Resultado do Exercicio - Todas as Obras</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Bruta</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(45800000)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-600">+4.09%</span> vs orcado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Bruto</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(12366000)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Percent className="h-3 w-3" />
              Margem: 27%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EBITDA</CardTitle>
            <Target className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600">{formatCurrency(6870000)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Percent className="h-3 w-3" />
              Margem: 15%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Liquido</CardTitle>
            <PieChart className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(4122000)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Percent className="h-3 w-3" />
              Margem: 9%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variacao Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+4.09%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">Realizado vs Orcado</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dre" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dre">DRE Completo</TabsTrigger>
          <TabsTrigger value="evolucao">Evolucao Mensal</TabsTrigger>
          <TabsTrigger value="por-obra">Por Obra</TabsTrigger>
          <TabsTrigger value="analise">Analise Vertical</TabsTrigger>
        </TabsList>

        {/* Tab DRE Completo */}
        <TabsContent value="dre" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Demonstrativo do Resultado - Acumulado {periodo}</CardTitle>
              <CardDescription>Clique nas linhas para expandir detalhes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Descricao</TableHead>
                    <TableHead className="text-right">Realizado</TableHead>
                    <TableHead className="text-right">Orcado</TableHead>
                    <TableHead className="text-right">Variacao</TableHead>
                    <TableHead className="text-right">% Receita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{dreDados.map((linha) => renderDRERow(linha))}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Evolucao Mensal */}
        <TabsContent value="evolucao" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Receita vs Lucro Liquido</CardTitle>
                <CardDescription>Evolucao mensal comparativa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={evolucaoMensal}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="mes" className="text-xs" />
                      <YAxis
                        yAxisId="left"
                        className="text-xs"
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        className="text-xs"
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        labelStyle={{ color: "var(--foreground)" }}
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="receita" name="Receita" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="lucro"
                        name="Lucro"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: "#10b981" }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evolucao da Margem</CardTitle>
                <CardDescription>Margem liquida percentual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolucaoMensal}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="mes" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(value) => `${value}%`} domain={[0, 15]} />
                      <Tooltip
                        formatter={(value: number) => `${value}%`}
                        labelStyle={{ color: "var(--foreground)" }}
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="margem"
                        name="Margem Liquida"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Por Obra */}
        <TabsContent value="por-obra" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">DRE por Obra</CardTitle>
              <CardDescription>Resultado por centro de custo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Custos</TableHead>
                    <TableHead className="text-right">Despesas</TableHead>
                    <TableHead className="text-right">Lucro</TableHead>
                    <TableHead className="text-right">Margem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drePorObra.map((obra) => (
                    <TableRow key={obra.codigo} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{obra.obra}</p>
                          <p className="text-xs text-muted-foreground">{obra.codigo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-medium">
                        {formatCurrency(obra.receita)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">-{formatCurrency(obra.custos)}</TableCell>
                      <TableCell className="text-right text-amber-600">-{formatCurrency(obra.despesas)}</TableCell>
                      <TableCell className="text-right text-emerald-600 font-medium">
                        {formatCurrency(obra.lucro)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={obra.margem >= 15 ? "bg-emerald-500" : "bg-amber-500"}>{obra.margem}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totalizadores */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-end gap-8">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total Receita</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(45800000)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total Custos</p>
                    <p className="text-lg font-bold text-red-600">-{formatCurrency(32865000)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total Lucro</p>
                    <p className="text-lg font-bold text-emerald-600">{formatCurrency(7439000)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Margem Media</p>
                    <p className="text-lg font-bold">16.2%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grafico Comparativo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comparativo de Margem por Obra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={drePorObra} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} domain={[0, 25]} />
                    <YAxis type="category" dataKey="obra" width={150} className="text-xs" />
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      labelStyle={{ color: "var(--foreground)" }}
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="margem" name="Margem" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Analise Vertical */}
        <TabsContent value="analise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Analise Vertical - Composicao do Resultado</CardTitle>
              <CardDescription>Percentual sobre a Receita Bruta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Receita */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Receita Bruta</span>
                    <span className="font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-6" />
                </div>

                {/* Deducoes */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-red-600">(-) Deducoes</span>
                    <span className="text-red-600">-10%</span>
                  </div>
                  <div className="h-6 bg-red-100 rounded-md overflow-hidden">
                    <div className="h-full bg-red-500 rounded-md" style={{ width: "10%" }} />
                  </div>
                </div>

                {/* Receita Liquida */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Receita Liquida</span>
                    <span className="font-bold text-blue-600">90%</span>
                  </div>
                  <div className="h-6 bg-blue-100 rounded-md overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-md" style={{ width: "90%" }} />
                  </div>
                </div>

                {/* Custos Diretos */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-red-600">(-) Custos Diretos</span>
                    <span className="text-red-600">-63%</span>
                  </div>
                  <div className="h-6 bg-red-100 rounded-md overflow-hidden">
                    <div className="h-full bg-red-500 rounded-md" style={{ width: "63%" }} />
                  </div>
                </div>

                {/* Lucro Bruto */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Lucro Bruto</span>
                    <span className="font-bold text-emerald-600">27%</span>
                  </div>
                  <div className="h-6 bg-emerald-100 rounded-md overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-md" style={{ width: "27%" }} />
                  </div>
                </div>

                {/* Despesas Operacionais */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600">(-) Despesas Operacionais</span>
                    <span className="text-amber-600">-12%</span>
                  </div>
                  <div className="h-6 bg-amber-100 rounded-md overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-md" style={{ width: "12%" }} />
                  </div>
                </div>

                {/* EBITDA */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">EBITDA</span>
                    <span className="font-bold text-violet-600">15%</span>
                  </div>
                  <div className="h-6 bg-violet-100 rounded-md overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-md" style={{ width: "15%" }} />
                  </div>
                </div>

                {/* Lucro Liquido */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Lucro Liquido</span>
                    <span className="font-bold text-emerald-600">9%</span>
                  </div>
                  <div className="h-6 bg-emerald-100 rounded-md overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-md" style={{ width: "9%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </main>
    </div>
  )
}
