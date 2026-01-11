"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Wallet,
  PiggyBank,
  CreditCard,
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
  Line,
  ComposedChart,
  Area,
  ReferenceLine,
} from "recharts"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Dados do fluxo de caixa mensal
const fluxoMensal = [
  { mes: "Jan", entradas: 4500000, saidas: 3800000, saldo: 700000, acumulado: 700000 },
  { mes: "Fev", entradas: 5200000, saidas: 4100000, saldo: 1100000, acumulado: 1800000 },
  { mes: "Mar", entradas: 4800000, saidas: 4500000, saldo: 300000, acumulado: 2100000 },
  { mes: "Abr", entradas: 6100000, saidas: 4200000, saldo: 1900000, acumulado: 4000000 },
  { mes: "Mai", entradas: 5500000, saidas: 4800000, saldo: 700000, acumulado: 4700000 },
  { mes: "Jun", entradas: 5800000, saidas: 5100000, saldo: 700000, acumulado: 5400000 },
]

// Projecao futura
const projecaoFutura = [
  { mes: "Jul", previsto: 800000, otimista: 1200000, pessimista: 400000 },
  { mes: "Ago", previsto: 600000, otimista: 1000000, pessimista: 200000 },
  { mes: "Set", previsto: 900000, otimista: 1400000, pessimista: 500000 },
  { mes: "Out", previsto: 1100000, otimista: 1600000, pessimista: 700000 },
  { mes: "Nov", previsto: 700000, otimista: 1100000, pessimista: 300000 },
  { mes: "Dez", previsto: 500000, otimista: 900000, pessimista: 100000 },
]

// Fluxo por obra
const fluxoPorObra = [
  {
    obra: "Torre Mirante",
    codigo: "OBR-001",
    entradas: 2800000,
    saidas: 2200000,
    saldo: 600000,
    percentual: 35,
    status: "positivo",
  },
  {
    obra: "Residencial Aurora",
    codigo: "OBR-002",
    entradas: 1500000,
    saidas: 1800000,
    saldo: -300000,
    percentual: 22,
    status: "negativo",
  },
  {
    obra: "Shopping Center Norte",
    codigo: "OBR-003",
    entradas: 3200000,
    saidas: 2500000,
    saldo: 700000,
    percentual: 28,
    status: "positivo",
  },
  {
    obra: "Hospital Regional",
    codigo: "OBR-004",
    entradas: 900000,
    saidas: 850000,
    saldo: 50000,
    percentual: 15,
    status: "neutro",
  },
]

// Detalhamento diario
const fluxoDiario = [
  { data: "08/01", descricao: "Saldo Inicial", entradas: 0, saidas: 0, saldo: 5400000 },
  { data: "08/01", descricao: "Medicao Torre Mirante - Parcela 12", entradas: 850000, saidas: 0, saldo: 6250000 },
  { data: "08/01", descricao: "Folha de Pagamento - Jan/26", entradas: 0, saidas: 1200000, saldo: 5050000 },
  { data: "09/01", descricao: "Fornecedor Concreteira XYZ", entradas: 0, saidas: 380000, saldo: 4670000 },
  { data: "09/01", descricao: "Medicao Shopping - Parcela 8", entradas: 620000, saidas: 0, saldo: 5290000 },
  { data: "10/01", descricao: "INSS Competencia Dez/25", entradas: 0, saidas: 450000, saldo: 4840000 },
  { data: "10/01", descricao: "FGTS Competencia Dez/25", entradas: 0, saidas: 280000, saldo: 4560000 },
  { data: "11/01", descricao: "Locacao de Equipamentos", entradas: 0, saidas: 95000, saldo: 4465000 },
  { data: "12/01", descricao: "Adiantamento Cliente Aurora", entradas: 300000, saidas: 0, saldo: 4765000 },
]

// Categorias de entradas e saidas
const categorias = {
  entradas: [
    { categoria: "Medicoes de Clientes", valor: 6800000, percentual: 75 },
    { categoria: "Adiantamentos", valor: 1200000, percentual: 13 },
    { categoria: "Reembolsos", valor: 450000, percentual: 5 },
    { categoria: "Aplicacoes Financeiras", valor: 350000, percentual: 4 },
    { categoria: "Outros", valor: 280000, percentual: 3 },
  ],
  saidas: [
    { categoria: "Fornecedores", valor: 3200000, percentual: 38 },
    { categoria: "Folha de Pagamento", valor: 2100000, percentual: 25 },
    { categoria: "Encargos Sociais", valor: 1400000, percentual: 17 },
    { categoria: "Impostos", valor: 850000, percentual: 10 },
    { categoria: "Despesas Administrativas", valor: 450000, percentual: 5 },
    { categoria: "Outros", valor: 400000, percentual: 5 },
  ],
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

export default function FluxoCaixaPage() {
  const [periodo, setPeriodo] = useState("mensal")
  const [obraFiltro, setObraFiltro] = useState("todas")
  const [expandedCategoria, setExpandedCategoria] = useState<string | null>(null)

  const saldoAtual = 5400000
  const entradasMes = 8400000
  const saidasMes = 7200000
  const saldoProjetado = 6600000

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
          <h1 className="text-2xl font-bold tracking-tight">Fluxo de Caixa Consolidado</h1>
          <p className="text-muted-foreground">Visao integrada de entradas, saidas e projecoes de todas as obras</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={obraFiltro} onValueChange={setObraFiltro}>
            <SelectTrigger className="w-[180px]">
              <Building2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Obras</SelectItem>
              <SelectItem value="OBR-001">Torre Mirante</SelectItem>
              <SelectItem value="OBR-002">Residencial Aurora</SelectItem>
              <SelectItem value="OBR-003">Shopping Center Norte</SelectItem>
              <SelectItem value="OBR-004">Hospital Regional</SelectItem>
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
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(saldoAtual)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-600">+12.5%</span> vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas (Mes)</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(entradasMes)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-600">+8.2%</span> vs previsto
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saidas (Mes)</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(saidasMes)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-600">+3.1%</span> vs previsto
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Projetado</CardTitle>
            <PiggyBank className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600">{formatCurrency(saldoProjetado)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Projecao para 30 dias
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visao-geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visao-geral">Visao Geral</TabsTrigger>
          <TabsTrigger value="projecao">Projecao</TabsTrigger>
          <TabsTrigger value="por-obra">Por Obra</TabsTrigger>
          <TabsTrigger value="detalhado">Detalhado</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
        </TabsList>

        {/* Tab Visao Geral */}
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Grafico de Barras - Entradas vs Saidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Entradas vs Saidas</CardTitle>
                <CardDescription>Comparativo mensal do fluxo de caixa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fluxoMensal}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="mes" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
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
                      <Bar dataKey="entradas" name="Entradas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="saidas" name="Saidas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Grafico de Linha - Saldo Acumulado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Saldo Acumulado</CardTitle>
                <CardDescription>Evolucao do saldo ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={fluxoMensal}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="mes" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
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
                      <Area
                        type="monotone"
                        dataKey="acumulado"
                        name="Acumulado"
                        fill="#10b981"
                        fillOpacity={0.2}
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                      <Bar dataKey="saldo" name="Saldo Mensal" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alertas e Avisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Residencial Aurora com saldo negativo</p>
                    <p className="text-xs text-muted-foreground">Deficit de R$ 300.000 no fluxo do mes</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Analisar
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Vencimentos proximos 7 dias</p>
                    <p className="text-xs text-muted-foreground">12 titulos totalizando R$ 1.850.000</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver CAP
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medicoes a receber</p>
                    <p className="text-xs text-muted-foreground">3 medicoes aprovadas totalizando R$ 2.100.000</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver CAR
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Projecao */}
        <TabsContent value="projecao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Projecao de Fluxo - Proximos 6 Meses</CardTitle>
              <CardDescription>Cenarios otimista, realista e pessimista</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={projecaoFutura}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
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
                    <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                    <Area
                      type="monotone"
                      dataKey="otimista"
                      name="Otimista"
                      fill="#10b981"
                      fillOpacity={0.1}
                      stroke="#10b981"
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="pessimista"
                      name="Pessimista"
                      fill="#ef4444"
                      fillOpacity={0.1}
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="previsto"
                      name="Previsto"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Premissas da Projecao */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-emerald-600">Cenario Otimista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>- Todas medicoes aprovadas no prazo</p>
                <p>- Antecipacao de recebiveis</p>
                <p>- Reducao de 5% nos custos</p>
                <p className="font-medium pt-2">Saldo em Dez: {formatCurrency(7200000)}</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-600">Cenario Realista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>- 90% das medicoes no prazo</p>
                <p>- Custos conforme orcado</p>
                <p>- Sem antecipacoes</p>
                <p className="font-medium pt-2">Saldo em Dez: {formatCurrency(5400000)}</p>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-600">Cenario Pessimista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>- Atrasos em medicoes</p>
                <p>- Aumento de 10% nos custos</p>
                <p>- Glosas em contratos</p>
                <p className="font-medium pt-2">Saldo em Dez: {formatCurrency(2200000)}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Por Obra */}
        <TabsContent value="por-obra" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fluxo de Caixa por Obra</CardTitle>
              <CardDescription>Detalhamento de entradas e saidas por centro de custo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-right">Entradas</TableHead>
                    <TableHead className="text-right">Saidas</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                    <TableHead>Representatividade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fluxoPorObra.map((obra) => (
                    <TableRow key={obra.codigo} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{obra.obra}</p>
                          <p className="text-xs text-muted-foreground">{obra.codigo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-blue-600">{formatCurrency(obra.entradas)}</TableCell>
                      <TableCell className="text-right text-red-600">{formatCurrency(obra.saidas)}</TableCell>
                      <TableCell
                        className={`text-right font-medium ${obra.saldo >= 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {formatCurrency(obra.saldo)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={obra.percentual} className="h-2 w-20" />
                          <span className="text-xs text-muted-foreground">{obra.percentual}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            obra.status === "positivo"
                              ? "default"
                              : obra.status === "negativo"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            obra.status === "positivo" ? "bg-emerald-500" : obra.status === "negativo" ? "" : ""
                          }
                        >
                          {obra.status === "positivo" ? "Positivo" : obra.status === "negativo" ? "Negativo" : "Neutro"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totalizadores */}
              <div className="mt-4 pt-4 border-t flex justify-end gap-8">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total Entradas</p>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(8400000)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total Saidas</p>
                  <p className="text-lg font-bold text-red-600">{formatCurrency(7350000)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Saldo Consolidado</p>
                  <p className="text-lg font-bold text-emerald-600">{formatCurrency(1050000)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Detalhado */}
        <TabsContent value="detalhado" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Movimentacao Detalhada</CardTitle>
                <CardDescription>Registro diario de entradas e saidas</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="7dias">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="7dias">Ultimos 7 dias</SelectItem>
                    <SelectItem value="15dias">Ultimos 15 dias</SelectItem>
                    <SelectItem value="30dias">Ultimos 30 dias</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Data</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead className="text-right">Entradas</TableHead>
                    <TableHead className="text-right">Saidas</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fluxoDiario.map((mov, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-muted-foreground">{mov.data}</TableCell>
                      <TableCell>{mov.descricao}</TableCell>
                      <TableCell className="text-right">
                        {mov.entradas > 0 && <span className="text-blue-600">{formatCurrency(mov.entradas)}</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        {mov.saidas > 0 && <span className="text-red-600">{formatCurrency(mov.saidas)}</span>}
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(mov.saldo)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Categorias */}
        <TabsContent value="categorias" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Categorias de Entradas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowDownCircle className="h-5 w-5 text-blue-600" />
                  Entradas por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorias.entradas.map((cat) => (
                    <div key={cat.categoria} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{cat.categoria}</span>
                        <span className="font-medium text-blue-600">{formatCurrency(cat.valor)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={cat.percentual} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-10">{cat.percentual}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="font-medium">Total Entradas</span>
                  <span className="text-lg font-bold text-blue-600">{formatCurrency(9080000)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Categorias de Saidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowUpCircle className="h-5 w-5 text-red-600" />
                  Saidas por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorias.saidas.map((cat) => (
                    <div key={cat.categoria} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{cat.categoria}</span>
                        <span className="font-medium text-red-600">{formatCurrency(cat.valor)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={cat.percentual} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-10">{cat.percentual}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="font-medium">Total Saidas</span>
                  <span className="text-lg font-bold text-red-600">{formatCurrency(8400000)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
        </div>
      </main>
    </div>
  )
}
