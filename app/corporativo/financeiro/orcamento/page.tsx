"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Calendar,
  Edit,
  History,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie,
} from "recharts"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Dados mockados
const resumoOrcamento = {
  orcadoAnual: 48000000,
  realizadoAcumulado: 38500000,
  previstoAno: 46800000,
  desvio: -1200000,
}

const evolucaoMensal = [
  { mes: "Jan", orcado: 4000000, realizado: 3800000 },
  { mes: "Fev", orcado: 4000000, realizado: 4200000 },
  { mes: "Mar", orcado: 4000000, realizado: 3900000 },
  { mes: "Abr", orcado: 4000000, realizado: 4100000 },
  { mes: "Mai", orcado: 4000000, realizado: 3700000 },
  { mes: "Jun", orcado: 4000000, realizado: 4300000 },
  { mes: "Jul", orcado: 4000000, realizado: 3850000 },
  { mes: "Ago", orcado: 4000000, realizado: 4050000 },
  { mes: "Set", orcado: 4000000, realizado: 3800000 },
  { mes: "Out", orcado: 4000000, realizado: null },
  { mes: "Nov", orcado: 4000000, realizado: null },
  { mes: "Dez", orcado: 4000000, realizado: null },
]

const distribuicaoCategoria = [
  { name: "Pessoal", value: 45, color: "#3b82f6" },
  { name: "Materiais", value: 25, color: "#10b981" },
  { name: "Servicos", value: 18, color: "#f59e0b" },
  { name: "Equipamentos", value: 8, color: "#8b5cf6" },
  { name: "Administrativo", value: 4, color: "#6b7280" },
]

const centrosCusto = [
  {
    id: "1",
    nome: "Obra Edificio Central",
    orcado: 12000000,
    realizado: 9800000,
    previsto: 11500000,
    status: "ok",
    expanded: false,
    subitens: [
      { nome: "Pessoal", orcado: 5400000, realizado: 4500000, previsto: 5200000 },
      { nome: "Materiais", orcado: 3000000, realizado: 2600000, previsto: 3100000 },
      { nome: "Servicos", orcado: 2160000, realizado: 1800000, previsto: 2000000 },
      { nome: "Equipamentos", orcado: 960000, realizado: 700000, previsto: 900000 },
      { nome: "Administrativo", orcado: 480000, realizado: 200000, previsto: 300000 },
    ],
  },
  {
    id: "2",
    nome: "Obra Shopping Norte",
    orcado: 15000000,
    realizado: 12500000,
    previsto: 15800000,
    status: "atencao",
    expanded: false,
    subitens: [],
  },
  {
    id: "3",
    nome: "Obra Residencial Sul",
    orcado: 8000000,
    realizado: 6200000,
    previsto: 7600000,
    status: "ok",
    expanded: false,
    subitens: [],
  },
  {
    id: "4",
    nome: "Corporativo",
    orcado: 5000000,
    realizado: 4000000,
    previsto: 5200000,
    status: "atencao",
    expanded: false,
    subitens: [],
  },
  {
    id: "5",
    nome: "Obra Industrial Leste",
    orcado: 8000000,
    realizado: 6000000,
    previsto: 6700000,
    status: "ok",
    expanded: false,
    subitens: [],
  },
]

export default function OrcamentoPage() {
  const [ano, setAno] = useState("2025")
  const [expandedRows, setExpandedRows] = useState<string[]>([])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const formatCompact = (value: number) => {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`
    return formatCurrency(value)
  }

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const calcularDesvio = (orcado: number, previsto: number) => {
    return ((previsto - orcado) / orcado) * 100
  }

  const getStatusBadge = (status: string, desvio: number) => {
    if (desvio > 5) {
      return (
        <Badge className="bg-red-100 text-red-700">
          <TrendingUp className="h-3 w-3 mr-1" />+{desvio.toFixed(1)}%
        </Badge>
      )
    } else if (desvio < -5) {
      return (
        <Badge className="bg-green-100 text-green-700">
          <TrendingDown className="h-3 w-3 mr-1" />
          {desvio.toFixed(1)}%
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-blue-100 text-blue-700">
          <Target className="h-3 w-3 mr-1" />
          {desvio.toFixed(1)}%
        </Badge>
      )
    }
  }

  const percentualExecutado = (resumoOrcamento.realizadoAcumulado / resumoOrcamento.orcadoAnual) * 100

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
          <h1 className="text-2xl font-bold text-slate-900">Orcamento x Realizado</h1>
          <p className="text-slate-500">Acompanhamento orcamentario consolidado</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={ano} onValueChange={setAno}>
            <SelectTrigger className="w-28">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            Historico
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Orcado Anual</p>
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xl font-bold text-slate-900">{formatCompact(resumoOrcamento.orcadoAnual)}</p>
            <p className="text-xs text-slate-500 mt-1">Meta {ano}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Realizado</p>
              <BarChart3 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-xl font-bold text-emerald-600">{formatCompact(resumoOrcamento.realizadoAcumulado)}</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={percentualExecutado} className="flex-1 h-1.5" />
              <span className="text-xs text-slate-500">{percentualExecutado.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Previsto Ano</p>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-xl font-bold text-slate-900">{formatCompact(resumoOrcamento.previstoAno)}</p>
            <p className="text-xs text-amber-600 mt-1">Projecao ate Dez/{ano}</p>
          </CardContent>
        </Card>

        <Card
          className={resumoOrcamento.desvio < 0 ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Desvio Previsto</p>
              {resumoOrcamento.desvio < 0 ? (
                <TrendingDown className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-500" />
              )}
            </div>
            <p className={`text-xl font-bold ${resumoOrcamento.desvio < 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCompact(Math.abs(resumoOrcamento.desvio))}
            </p>
            <p className={`text-xs mt-1 ${resumoOrcamento.desvio < 0 ? "text-green-600" : "text-red-600"}`}>
              {resumoOrcamento.desvio < 0 ? "Economia prevista" : "Estouro previsto"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graficos */}
      <div className="grid grid-cols-3 gap-4">
        {/* Evolucao Mensal */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Evolucao Mensal</CardTitle>
            <CardDescription>Orcado vs Realizado por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evolucaoMensal} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="orcado" name="Orcado" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="realizado" name="Realizado" radius={[4, 4, 0, 0]}>
                    {evolucaoMensal.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.realizado === null ? "#e2e8f0" : entry.realizado > entry.orcado ? "#ef4444" : "#10b981"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribuicao por Categoria */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Distribuicao por Categoria</CardTitle>
            <CardDescription>% do orcamento total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={distribuicaoCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {distribuicaoCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {distribuicaoCategoria.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[10px] text-slate-600">{cat.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela por Centro de Custo */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Orcamento por Centro de Custo</CardTitle>
              <CardDescription>Detalhamento por obra e corporativo</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar Orcamento
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Centro de Custo</TableHead>
                <TableHead className="text-right">Orcado</TableHead>
                <TableHead className="text-right">Realizado</TableHead>
                <TableHead className="text-right">Previsto</TableHead>
                <TableHead className="text-right">Desvio</TableHead>
                <TableHead className="w-32">Execucao</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centrosCusto.map((cc) => {
                const desvio = calcularDesvio(cc.orcado, cc.previsto)
                const execucao = (cc.realizado / cc.orcado) * 100
                const isExpanded = expandedRows.includes(cc.id)

                return (
                  <>
                    <TableRow
                      key={cc.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => toggleExpand(cc.id)}
                    >
                      <TableCell>
                        {cc.subitens.length > 0 &&
                          (isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                          ))}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${cc.status === "ok" ? "bg-green-500" : "bg-amber-500"}`}
                          />
                          <span className="font-medium text-slate-900">{cc.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCompact(cc.orcado)}</TableCell>
                      <TableCell className="text-right">{formatCompact(cc.realizado)}</TableCell>
                      <TableCell className="text-right">{formatCompact(cc.previsto)}</TableCell>
                      <TableCell className="text-right">{getStatusBadge(cc.status, desvio)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={execucao} className="flex-1 h-2" />
                          <span className="text-xs text-slate-500 w-10">{execucao.toFixed(0)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Subitens expandidos */}
                    {isExpanded &&
                      cc.subitens.map((sub, idx) => {
                        const subDesvio = calcularDesvio(sub.orcado, sub.previsto)
                        const subExecucao = (sub.realizado / sub.orcado) * 100

                        return (
                          <TableRow key={`${cc.id}-${idx}`} className="bg-slate-50/50">
                            <TableCell></TableCell>
                            <TableCell className="pl-8">
                              <span className="text-sm text-slate-600">{sub.nome}</span>
                            </TableCell>
                            <TableCell className="text-right text-sm">{formatCompact(sub.orcado)}</TableCell>
                            <TableCell className="text-right text-sm">{formatCompact(sub.realizado)}</TableCell>
                            <TableCell className="text-right text-sm">{formatCompact(sub.previsto)}</TableCell>
                            <TableCell className="text-right">
                              <span className={`text-xs ${subDesvio > 0 ? "text-red-600" : "text-green-600"}`}>
                                {subDesvio > 0 ? "+" : ""}
                                {subDesvio.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={subExecucao} className="flex-1 h-1.5" />
                                <span className="text-xs text-slate-400 w-10">{subExecucao.toFixed(0)}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </div>
      </main>
    </div>
  )
}
