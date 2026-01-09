"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Building2,
  DollarSign,
  Target,
  Briefcase,
  FolderKanban,
  PieChart,
  LayoutDashboard,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Activity,
  Zap,
} from "lucide-react"

// Navegacao do Comercial Corporativo
const comercialNavigation = [
  { name: "Visao Geral", href: "/corporativo/comercial", icon: LayoutDashboard },
  { name: "Propostas", href: "/corporativo/comercial/propostas", icon: FileText },
  { name: "Clientes & CRM", href: "/corporativo/comercial/clientes", icon: Building2 },
  { name: "Contratos", href: "/corporativo/comercial/contratos", icon: FolderKanban },
  { name: "Portfolio de Obras", href: "/corporativo/comercial/portfolio", icon: Briefcase },
  { name: "Abertura de CC", href: "/corporativo/comercial/abertura-cc", icon: Target },
  { name: "Analytics", href: "/corporativo/comercial/analytics", icon: PieChart },
]

// Mock - KPIs
const kpis = {
  taxaConversao: { valor: 68, variacao: 5.2, meta: 65 },
  tempoMedioCiclo: { valor: 45, variacao: -8, meta: 50, unidade: "dias" },
  valorMedioProposta: { valor: 285000000, variacao: 12.5 },
  propostasNovas: { valor: 12, variacao: 20, periodo: "mês" },
  clientesNovos: { valor: 3, variacao: 50, periodo: "mês" },
  retenacaoClientes: { valor: 94, variacao: 2, meta: 90 },
}

// Mock - Performance por Vendedor
const performanceVendedores = [
  { nome: "João Silva", propostas: 15, ganhas: 12, valor: 1250000000, taxa: 80 },
  { nome: "Maria Santos", propostas: 12, ganhas: 8, valor: 890000000, taxa: 67 },
  { nome: "Carlos Lima", propostas: 10, ganhas: 6, valor: 720000000, taxa: 60 },
  { nome: "Ana Paula", propostas: 8, ganhas: 5, valor: 450000000, taxa: 63 },
]

// Mock - Performance por Segmento
const performanceSegmentos = [
  { nome: "Infraestrutura Rodoviária", propostas: 18, valor: 1800000000, participacao: 42, taxa: 72 },
  { nome: "Saneamento", propostas: 12, valor: 850000000, participacao: 20, taxa: 65 },
  { nome: "Energia", propostas: 8, valor: 1200000000, participacao: 28, taxa: 55 },
  { nome: "Portuário", propostas: 5, valor: 420000000, participacao: 10, taxa: 60 },
]

// Mock - Funil de Vendas
const funilVendas = [
  { estagio: "Prospecção", quantidade: 25, valor: 4500000000, conversao: 100 },
  { estagio: "Qualificação", quantidade: 18, valor: 3200000000, conversao: 72 },
  { estagio: "Proposta", quantidade: 12, valor: 2100000000, conversao: 48 },
  { estagio: "Negociação", quantidade: 8, valor: 1400000000, conversao: 32 },
  { estagio: "Fechamento", quantidade: 5, valor: 850000000, conversao: 20 },
]

// Mock - Tendencia Mensal
const tendenciaMensal = [
  { mes: "Jul", propostas: 8, valor: 650, ganhas: 5 },
  { mes: "Ago", propostas: 10, valor: 820, ganhas: 7 },
  { mes: "Set", propostas: 7, valor: 580, ganhas: 4 },
  { mes: "Out", propostas: 12, valor: 950, ganhas: 8 },
  { mes: "Nov", propostas: 9, valor: 780, ganhas: 6 },
  { mes: "Dez", propostas: 11, valor: 890, ganhas: 7 },
  { mes: "Jan", propostas: 12, valor: 1020, ganhas: 8 },
]

export default function AnalyticsPage() {
  const pathname = usePathname()
  const [periodo, setPeriodo] = useState("6m")

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(2)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar do Comercial */}
      <aside className="w-56 bg-background border-r flex flex-col">
        <div className="p-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Comercial</h1>
              <p className="text-[10px] text-muted-foreground">Corporativo</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 py-1">
          <nav className="px-2 space-y-0.5">
            {comercialNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-2 border-t">
          <div className="flex items-center gap-2 px-2 py-1">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px]">JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">João Silva</p>
              <p className="text-[10px] text-muted-foreground truncate">Gerente Comercial</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteudo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 bg-background border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded text-xs">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium">Corporativo</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded text-xs">
              <PieChart className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium text-primary">Analytics Comercial</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-32 h-7 text-xs">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último mês</SelectItem>
                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="12m">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* KPIs Principais */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <div
                    className={cn(
                      "flex items-center gap-0.5 text-[10px]",
                      kpis.taxaConversao.variacao >= 0 ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {kpis.taxaConversao.variacao >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(kpis.taxaConversao.variacao)}%
                  </div>
                </div>
                <p className="text-2xl font-bold">{kpis.taxaConversao.valor}%</p>
                <p className="text-[10px] text-muted-foreground">Taxa de Conversão</p>
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground">Meta: {kpis.taxaConversao.meta}%</span>
                  </div>
                  <Progress value={(kpis.taxaConversao.valor / kpis.taxaConversao.meta) * 100} className="h-1" />
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <div
                    className={cn(
                      "flex items-center gap-0.5 text-[10px]",
                      kpis.tempoMedioCiclo.variacao <= 0 ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {kpis.tempoMedioCiclo.variacao <= 0 ? (
                      <ArrowDownRight className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
                    )}
                    {Math.abs(kpis.tempoMedioCiclo.variacao)}%
                  </div>
                </div>
                <p className="text-2xl font-bold">
                  {kpis.tempoMedioCiclo.valor}
                  <span className="text-sm font-normal ml-1">dias</span>
                </p>
                <p className="text-[10px] text-muted-foreground">Tempo Médio de Ciclo</p>
                <p className="text-[10px] text-muted-foreground mt-2">Meta: {kpis.tempoMedioCiclo.meta} dias</p>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <div className="flex items-center gap-0.5 text-[10px] text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpis.valorMedioProposta.variacao}%
                  </div>
                </div>
                <p className="text-lg font-bold">{formatCurrency(kpis.valorMedioProposta.valor)}</p>
                <p className="text-[10px] text-muted-foreground">Valor Médio Proposta</p>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <div className="flex items-center gap-0.5 text-[10px] text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpis.propostasNovas.variacao}%
                  </div>
                </div>
                <p className="text-2xl font-bold">{kpis.propostasNovas.valor}</p>
                <p className="text-[10px] text-muted-foreground">Propostas Novas/Mês</p>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-4 h-4 text-cyan-600" />
                  <div className="flex items-center gap-0.5 text-[10px] text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpis.clientesNovos.variacao}%
                  </div>
                </div>
                <p className="text-2xl font-bold">{kpis.clientesNovos.valor}</p>
                <p className="text-[10px] text-muted-foreground">Clientes Novos/Mês</p>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <div className="flex items-center gap-0.5 text-[10px] text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpis.retenacaoClientes.variacao}%
                  </div>
                </div>
                <p className="text-2xl font-bold">{kpis.retenacaoClientes.valor}%</p>
                <p className="text-[10px] text-muted-foreground">Retenção de Clientes</p>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Funil de Vendas */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Funil de Vendas</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {funilVendas.map((etapa, index) => (
                      <div key={etapa.estagio}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{etapa.estagio}</span>
                            <Badge variant="outline" className="text-[10px] h-4">
                              {etapa.quantidade}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatCurrency(etapa.valor)}</span>
                        </div>
                        <div className="relative">
                          <div className="h-6 bg-muted rounded overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded transition-all",
                                index === 0
                                  ? "bg-slate-500"
                                  : index === 1
                                    ? "bg-blue-500"
                                    : index === 2
                                      ? "bg-amber-500"
                                      : index === 3
                                        ? "bg-purple-500"
                                        : "bg-emerald-500",
                              )}
                              style={{ width: `${etapa.conversao}%` }}
                            />
                          </div>
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium">
                            {etapa.conversao}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tendencia Mensal */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Tendência Mensal</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-end justify-between h-[200px] gap-2">
                    {tendenciaMensal.map((mes) => (
                      <div key={mes.mes} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                          <div
                            className="w-full bg-primary/20 rounded-t"
                            style={{ height: `${(mes.valor / 1200) * 150}px` }}
                          />
                          <div
                            className="w-full bg-primary rounded-t -mt-1"
                            style={{ height: `${(mes.ganhas / 12) * 80}px` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{mes.mes}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-primary/20" />
                      <span className="text-muted-foreground">Valor (Mi)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span className="text-muted-foreground">Ganhas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Performance por Vendedor */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Performance por Vendedor</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {performanceVendedores.map((vendedor, index) => (
                      <div key={vendedor.nome} className="p-3 flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                          {index + 1}
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {vendedor.nome
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-xs font-medium">{vendedor.nome}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {vendedor.ganhas}/{vendedor.propostas} propostas
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">{formatCurrency(vendedor.valor)}</p>
                          <p
                            className={cn(
                              "text-[10px]",
                              vendedor.taxa >= 70
                                ? "text-emerald-600"
                                : vendedor.taxa >= 60
                                  ? "text-amber-600"
                                  : "text-red-600",
                            )}
                          >
                            {vendedor.taxa}% conversão
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance por Segmento */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Performance por Segmento</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {performanceSegmentos.map((segmento) => (
                      <div key={segmento.nome} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium">{segmento.nome}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] h-4">
                              {segmento.propostas} propostas
                            </Badge>
                            <span className="text-xs font-medium">{formatCurrency(segmento.valor)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <Progress value={segmento.participacao} className="h-2" />
                          </div>
                          <span className="text-[10px] text-muted-foreground w-12 text-right">
                            {segmento.participacao}%
                          </span>
                          <span
                            className={cn(
                              "text-[10px] w-16 text-right",
                              segmento.taxa >= 70
                                ? "text-emerald-600"
                                : segmento.taxa >= 60
                                  ? "text-amber-600"
                                  : "text-red-600",
                            )}
                          >
                            {segmento.taxa}% conv.
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
