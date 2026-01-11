"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Search,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Receipt,
  PiggyBank,
  BarChart3,
  FileText,
  ChevronRight,
  LayoutDashboard,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { FinanceiroNavbar } from "./_components/financeiro-navbar"

// Mock data consolidado
const metricas = {
  saldoConsolidado: 12580000,
  disponibilidadeD7: 8500000,
  disponibilidadeD30: 15200000,
  capTotal: 45800000,
  capVencido: 2300000,
  carTotal: 89500000,
  carVencido: 4500000,
  receitaMes: 28600000,
  custoMes: 24310000,
  margemMes: 15,
  obrasAtivas: 4,
}

const fluxoCaixaConsolidado = [
  { mes: "Ago", entradas: 24500000, saidas: 22800000, saldo: 1700000 },
  { mes: "Set", entradas: 26800000, saidas: 25100000, saldo: 1700000 },
  { mes: "Out", entradas: 27200000, saidas: 25800000, saldo: 1400000 },
  { mes: "Nov", entradas: 28100000, saidas: 26500000, saldo: 1600000 },
  { mes: "Dez", entradas: 28600000, saidas: 26900000, saldo: 1700000 },
  { mes: "Jan", entradas: 29500000, saidas: 27800000, saldo: 1700000 },
]

const saldoPorObra = [
  { obra: "BR-101 Lote 3", saldo: 4850000, percentual: 38.5, cor: "hsl(var(--primary))" },
  { obra: "SES Metro Sul", saldo: 3200000, percentual: 25.4, cor: "hsl(210, 100%, 50%)" },
  { obra: "UHE Belo Monte", saldo: 2980000, percentual: 23.7, cor: "hsl(150, 100%, 35%)" },
  { obra: "Restauro SP-330", saldo: 1550000, percentual: 12.4, cor: "hsl(45, 100%, 50%)" },
]

const alertasFinanceiros = [
  { id: 1, tipo: "vencido", mensagem: "2 titulos vencidos - BR-101 (R$ 1.2M)", data: "09/01" },
  { id: 2, tipo: "atencao", mensagem: "Fluxo negativo previsto para 15/01", data: "09/01" },
  { id: 3, tipo: "info", mensagem: "Medicao #14 aprovada para faturamento", data: "08/01" },
  { id: 4, tipo: "sucesso", mensagem: "Conciliacao Dezembro finalizada", data: "08/01" },
]

const proximosVencimentos = [
  { id: 1, tipo: "cap", descricao: "Folha Janeiro - BR-101", valor: 1200000, data: "10/01" },
  { id: 2, tipo: "cap", descricao: "ConstruMat - Cimento", valor: 450000, data: "12/01" },
  { id: 3, tipo: "car", descricao: "Medicao #13 DNIT", valor: 3850000, data: "15/01" },
  { id: 4, tipo: "cap", descricao: "Locacao Equipamentos", valor: 280000, data: "18/01" },
]

const indicadoresDRE = [
  { nome: "Receita Acumulada", valor: 245800000, meta: 250000000, variacao: -1.7 },
  { nome: "Custo Acumulado", valor: 208930000, meta: 212500000, variacao: 1.7 },
  { nome: "Margem Bruta", valor: 36870000, meta: 37500000, variacao: -1.7 },
  { nome: "Margem %", valor: 15, meta: 15, variacao: 0 },
]

export default function FinanceiroCorporativoPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)} Mi`
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)} K`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <FinanceiroNavbar />
      </div>

      {/* Conteúdo com moldura */}
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Metricas principais */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-emerald-600">{formatCurrency(metricas.saldoConsolidado)}</p>
                    <p className="text-[10px] text-muted-foreground">Saldo Consolidado</p>
                  </div>
                  <Wallet className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(metricas.disponibilidadeD30)}</p>
                    <p className="text-[10px] text-muted-foreground">Disponibilidade D+30</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-amber-600">{formatCurrency(metricas.capTotal)}</p>
                    <p className="text-[10px] text-muted-foreground">Contas a Pagar</p>
                  </div>
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(metricas.carTotal)}</p>
                    <p className="text-[10px] text-muted-foreground">Contas a Receber</p>
                  </div>
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(metricas.receitaMes)}</p>
                    <p className="text-[10px] text-muted-foreground">Receita do Mes</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{metricas.margemMes}%</p>
                    <p className="text-[10px] text-muted-foreground">Margem do Mes</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Alertas */}
            {(metricas.capVencido > 0 || metricas.carVencido > 0) && (
              <div className="flex gap-3">
                {metricas.capVencido > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-xs text-red-700">
                      CAP Vencido: <span className="font-bold">{formatCurrency(metricas.capVencido)}</span>
                    </span>
                  </div>
                )}
                {metricas.carVencido > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs text-amber-700">
                      CAR Vencido: <span className="font-bold">{formatCurrency(metricas.carVencido)}</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Fluxo de Caixa Consolidado */}
              <Card className="lg:col-span-2">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Fluxo de Caixa Consolidado</CardTitle>
                    <Link href="/corporativo/financeiro/fluxo-caixa">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1">
                        Ver detalhes
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={fluxoCaixaConsolidado} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip contentStyle={{ fontSize: 11 }} formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="entradas" fill="hsl(150, 100%, 35%)" radius={[4, 4, 0, 0]} name="Entradas" />
                        <Bar dataKey="saidas" fill="hsl(0, 70%, 50%)" radius={[4, 4, 0, 0]} name="Saidas" />
                        <Line
                          type="monotone"
                          dataKey="saldo"
                          stroke="hsl(210, 100%, 50%)"
                          strokeWidth={2}
                          name="Saldo"
                          dot={{ r: 3 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Saldo por Obra */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Saldo por Obra</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[140px] mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={saldoPorObra}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={60}
                          dataKey="saldo"
                          nameKey="obra"
                        >
                          {saldoPorObra.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cor} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {saldoPorObra.map((obra, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: obra.cor }} />
                          <span className="text-xs truncate max-w-[120px]">{obra.obra}</span>
                        </div>
                        <span className="text-xs font-medium">{obra.percentual}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Alertas Financeiros */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {alertasFinanceiros.length} ativos
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[180px]">
                    <div className="divide-y">
                      {alertasFinanceiros.map((alerta) => (
                        <div key={alerta.id} className="p-3 flex items-start gap-2">
                          {alerta.tipo === "vencido" && <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5" />}
                          {alerta.tipo === "atencao" && <Clock className="w-3.5 h-3.5 text-amber-500 mt-0.5" />}
                          {alerta.tipo === "info" && <Receipt className="w-3.5 h-3.5 text-blue-500 mt-0.5" />}
                          {alerta.tipo === "sucesso" && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5" />}
                          <div className="flex-1">
                            <p className="text-xs">{alerta.mensagem}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{alerta.data}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Proximos Vencimentos */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Proximos Vencimentos</CardTitle>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                      Ver todos
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[180px]">
                    <div className="divide-y">
                      {proximosVencimentos.map((item) => (
                        <div key={item.id} className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <Badge
                                variant={item.tipo === "cap" ? "destructive" : "default"}
                                className="text-[9px] h-4"
                              >
                                {item.tipo.toUpperCase()}
                              </Badge>
                              <span className="text-xs truncate max-w-[140px]">{item.descricao}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">{item.data}</span>
                            <span className="text-xs font-bold">{formatCurrency(item.valor)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Indicadores DRE */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Indicadores DRE</CardTitle>
                    <Link href="/corporativo/financeiro/dre">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1">
                        Ver DRE
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {indicadoresDRE.map((ind, idx) => (
                      <div key={idx} className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{ind.nome}</span>
                          <div className="flex items-center gap-1">
                            {ind.variacao !== 0 &&
                              (ind.variacao > 0 ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                              ))}
                            <span
                              className={cn(
                                "text-[10px]",
                                ind.variacao > 0
                                  ? "text-green-600"
                                  : ind.variacao < 0
                                    ? "text-red-600"
                                    : "text-muted-foreground",
                              )}
                            >
                              {ind.variacao > 0 ? "+" : ""}
                              {ind.variacao}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-bold">
                            {ind.nome.includes("%") ? `${ind.valor}%` : formatCurrency(ind.valor)}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            Meta: {ind.nome.includes("%") ? `${ind.meta}%` : formatCurrency(ind.meta)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acesso rapido */}
            <div className="grid grid-cols-5 gap-3">
              <Link href="/corporativo/financeiro/tesouraria">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <Landmark className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tesouraria</p>
                      <p className="text-[10px] text-muted-foreground">Gestao de caixa</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/financeiro/cap">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                      <CreditCard className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contas a Pagar</p>
                      <p className="text-[10px] text-muted-foreground">Consolidado CAP</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/financeiro/car">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <Receipt className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contas a Receber</p>
                      <p className="text-[10px] text-muted-foreground">Consolidado CAR</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/financeiro/fluxo-caixa">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                      <ArrowLeftRight className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fluxo de Caixa</p>
                      <p className="text-[10px] text-muted-foreground">Projecao consolidada</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/financeiro/dre">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                      <BarChart3 className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">DRE</p>
                      <p className="text-[10px] text-muted-foreground">Demonstrativo consolidado</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

