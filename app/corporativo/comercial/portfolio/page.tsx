"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Search,
  Building2,
  DollarSign,
  TrendingUp,
  MapPin,
  Target,
  Briefcase,
  FolderKanban,
  PieChart,
  LayoutDashboard,
  MoreHorizontal,
  Download,
  ExternalLink,
  Users,
  Clock,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

// Mock data - Obras do Portfolio
const obrasMock = [
  {
    id: 1,
    codigo: "CC-2024-001",
    nome: "BR-101 Duplicação Lote 3",
    cliente: "DNIT",
    local: "SC/RS",
    uf: "SC",
    tipo: "Infraestrutura Rodoviária",
    valorContrato: 450000000,
    valorMedido: 301500000,
    valorAReceber: 85000000,
    avancoFisico: 67,
    avancoFinanceiro: 62,
    status: "execucao",
    dataInicio: "2024-03-15",
    dataTermino: "2027-03-15",
    gerenteContrato: "João Silva",
    equipe: 245,
    indicadores: {
      idc: 1.02,
      idp: 0.98,
      cpi: 1.05,
      spi: 0.96,
    },
    alertas: 1,
  },
  {
    id: 2,
    codigo: "CC-2024-002",
    nome: "SES Metro Sul - Fase 1",
    cliente: "SABESP",
    local: "São Paulo",
    uf: "SP",
    tipo: "Saneamento",
    valorContrato: 180000000,
    valorMedido: 81000000,
    valorAReceber: 22000000,
    avancoFisico: 45,
    avancoFinanceiro: 42,
    status: "execucao",
    dataInicio: "2024-06-01",
    dataTermino: "2026-06-01",
    gerenteContrato: "Pedro Alves",
    equipe: 156,
    indicadores: {
      idc: 0.98,
      idp: 1.01,
      cpi: 0.97,
      spi: 1.02,
    },
    alertas: 0,
  },
  {
    id: 3,
    codigo: "CC-2023-089",
    nome: "UHE Belo Monte - Complementares",
    cliente: "Eletrobras Furnas",
    local: "Altamira",
    uf: "PA",
    tipo: "Energia",
    valorContrato: 890000000,
    valorMedido: 818800000,
    valorAReceber: 45000000,
    avancoFisico: 92,
    avancoFinanceiro: 89,
    status: "finalizacao",
    dataInicio: "2022-01-10",
    dataTermino: "2026-01-10",
    gerenteContrato: "Carlos Lima",
    equipe: 412,
    indicadores: {
      idc: 1.08,
      idp: 1.05,
      cpi: 1.1,
      spi: 1.04,
    },
    alertas: 0,
  },
  {
    id: 4,
    codigo: "CC-2025-001",
    nome: "Restauração SP-330 Trecho Norte",
    cliente: "CCR Rodovias",
    local: "Ribeirão Preto",
    uf: "SP",
    tipo: "Manutenção Rodoviária",
    valorContrato: 95000000,
    valorMedido: 11400000,
    valorAReceber: 8500000,
    avancoFisico: 12,
    avancoFinanceiro: 10,
    status: "mobilizacao",
    dataInicio: "2025-12-01",
    dataTermino: "2026-12-01",
    gerenteContrato: "João Silva",
    equipe: 45,
    indicadores: {
      idc: 1.0,
      idp: 1.0,
      cpi: 1.0,
      spi: 1.0,
    },
    alertas: 0,
  },
  {
    id: 5,
    codigo: "CC-2023-045",
    nome: "Terminal Portuário Fase 2",
    cliente: "Santos Port Authority",
    local: "Santos",
    uf: "SP",
    tipo: "Portuário",
    valorContrato: 320000000,
    valorMedido: 256000000,
    valorAReceber: 32000000,
    avancoFisico: 80,
    avancoFinanceiro: 78,
    status: "execucao",
    dataInicio: "2023-08-15",
    dataTermino: "2026-02-15",
    gerenteContrato: "Maria Santos",
    equipe: 189,
    indicadores: {
      idc: 1.03,
      idp: 0.95,
      cpi: 1.02,
      spi: 0.94,
    },
    alertas: 2,
  },
]

export default function PortfolioObrasPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null)
  const [obraSelecionada, setObraSelecionada] = useState<(typeof obrasMock)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

  const obrasFiltradas = obrasMock.filter((o) => {
    const matchSearch =
      o.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filtroStatus ? o.status === filtroStatus : true
    return matchSearch && matchStatus
  })

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(2)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; bg: string }> = {
      mobilizacao: { label: "Mobilização", color: "text-blue-700", bg: "bg-blue-100" },
      execucao: { label: "Execução", color: "text-emerald-700", bg: "bg-emerald-100" },
      finalizacao: { label: "Finalização", color: "text-amber-700", bg: "bg-amber-100" },
      encerrada: { label: "Encerrada", color: "text-slate-700", bg: "bg-slate-100" },
    }
    return configs[status] || { label: status, color: "text-gray-700", bg: "bg-gray-100" }
  }

  // Calculos de metricas
  const valorTotalCarteira = obrasMock.reduce((acc, o) => acc + o.valorContrato, 0)
  const valorTotalMedido = obrasMock.reduce((acc, o) => acc + o.valorMedido, 0)
  const valorTotalAReceber = obrasMock.reduce((acc, o) => acc + o.valorAReceber, 0)
  const totalEquipe = obrasMock.reduce((acc, o) => acc + o.equipe, 0)
  const obrasComAlerta = obrasMock.filter((o) => o.alertas > 0).length

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
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar obras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex gap-1 mr-2">
              {["mobilizacao", "execucao", "finalizacao"].map((status) => (
                <Button
                  key={status}
                  variant={filtroStatus === status ? "default" : "ghost"}
                  size="sm"
                  className="h-6 text-[10px] px-2"
                  onClick={() => setFiltroStatus(filtroStatus === status ? null : status)}
                >
                  {getStatusConfig(status).label}
                </Button>
              ))}
            </div>
            <div className="flex border rounded overflow-hidden mr-2">
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                className="h-6 px-2 rounded-none"
                onClick={() => setViewMode("cards")}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                className="h-6 px-2 rounded-none"
                onClick={() => setViewMode("table")}
              >
                <BarChart3 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Metricas */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{obrasMock.length}</p>
                    <p className="text-[10px] text-muted-foreground">Total Obras</p>
                  </div>
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(valorTotalCarteira)}</p>
                    <p className="text-[10px] text-muted-foreground">Valor Carteira</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(valorTotalMedido)}</p>
                    <p className="text-[10px] text-muted-foreground">Total Medido</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(valorTotalAReceber)}</p>
                    <p className="text-[10px] text-muted-foreground">A Receber</p>
                  </div>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalEquipe.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Colaboradores</p>
                  </div>
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{obrasComAlerta}</p>
                    <p className="text-[10px] text-muted-foreground">Com Alertas</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </Card>
            </div>

            {viewMode === "cards" ? (
              /* Visualizacao em Cards */
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {obrasFiltradas.map((obra) => {
                  const statusConfig = getStatusConfig(obra.status)
                  return (
                    <Card
                      key={obra.id}
                      className={cn(
                        "hover:shadow-lg transition-all cursor-pointer group",
                        obraSelecionada?.id === obra.id && "ring-2 ring-primary",
                      )}
                      onClick={() => setObraSelecionada(obra)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] text-muted-foreground font-mono">{obra.codigo}</span>
                              <Badge className={cn("text-[10px] h-4", statusConfig.bg, statusConfig.color)}>
                                {statusConfig.label}
                              </Badge>
                              {obra.alertas > 0 && (
                                <Badge variant="destructive" className="text-[10px] h-4">
                                  {obra.alertas} alerta{obra.alertas > 1 ? "s" : ""}
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-sm leading-tight">{obra.nome}</h3>
                            <p className="text-xs text-muted-foreground">{obra.cliente}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                Acessar Obra
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="w-3.5 h-3.5 mr-2" />
                                Ver Indicadores
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="w-3.5 h-3.5 mr-2" />
                                Exportar Relatório
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span>{obra.local}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3 h-3 text-muted-foreground" />
                            <span>{formatCurrency(obra.valorContrato)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span>{obra.equipe} pessoas</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-muted-foreground">Avanço Físico</span>
                              <span className="font-medium">{obra.avancoFisico}%</span>
                            </div>
                            <Progress value={obra.avancoFisico} className="h-1.5" />
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-muted-foreground">Avanço Financeiro</span>
                              <span className="font-medium">{obra.avancoFinanceiro}%</span>
                            </div>
                            <Progress value={obra.avancoFinanceiro} className="h-1.5 [&>div]:bg-emerald-500" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center gap-4 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">IDC:</span>
                              <span
                                className={cn(
                                  "font-medium",
                                  obra.indicadores.idc >= 1 ? "text-emerald-600" : "text-red-600",
                                )}
                              >
                                {obra.indicadores.idc.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">IDP:</span>
                              <span
                                className={cn(
                                  "font-medium",
                                  obra.indicadores.idp >= 1 ? "text-emerald-600" : "text-red-600",
                                )}
                              >
                                {obra.indicadores.idp.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                                {obra.gerenteContrato
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-[10px] text-muted-foreground">{obra.gerenteContrato}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              /* Visualizacao em Tabela */
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Código</TableHead>
                        <TableHead className="text-xs">Obra</TableHead>
                        <TableHead className="text-xs">Cliente</TableHead>
                        <TableHead className="text-xs">Local</TableHead>
                        <TableHead className="text-xs text-right">Valor Contrato</TableHead>
                        <TableHead className="text-xs text-center">Avanço</TableHead>
                        <TableHead className="text-xs text-center">IDC</TableHead>
                        <TableHead className="text-xs text-center">IDP</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {obrasFiltradas.map((obra) => {
                        const statusConfig = getStatusConfig(obra.status)
                        return (
                          <TableRow
                            key={obra.id}
                            className={cn("cursor-pointer", obraSelecionada?.id === obra.id && "bg-primary/5")}
                            onClick={() => setObraSelecionada(obra)}
                          >
                            <TableCell className="text-xs font-mono">{obra.codigo}</TableCell>
                            <TableCell>
                              <div>
                                <p className="text-xs font-medium">{obra.nome}</p>
                                <p className="text-[10px] text-muted-foreground">{obra.tipo}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs">{obra.cliente}</TableCell>
                            <TableCell className="text-xs">
                              {obra.local}, {obra.uf}
                            </TableCell>
                            <TableCell className="text-xs text-right font-medium">
                              {formatCurrency(obra.valorContrato)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={obra.avancoFisico} className="h-1.5 w-16" />
                                <span className="text-xs">{obra.avancoFisico}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  obra.indicadores.idc >= 1 ? "text-emerald-600" : "text-red-600",
                                )}
                              >
                                {obra.indicadores.idc.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  obra.indicadores.idp >= 1 ? "text-emerald-600" : "text-red-600",
                                )}
                              >
                                {obra.indicadores.idp.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("text-[10px]", statusConfig.bg, statusConfig.color)}>
                                {statusConfig.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                    Acessar Obra
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-3.5 h-3.5 mr-2" />
                                    Exportar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Painel de Detalhes da Obra Selecionada */}
            {obraSelecionada && (
              <Card className="border-primary/20">
                <CardHeader className="py-3 px-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-sm">{obraSelecionada.nome}</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        {obraSelecionada.codigo}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/obra/${obraSelecionada.codigo}/comercial`}>
                        <Button size="sm" className="h-7 text-xs gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Acessar Obra
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setObraSelecionada(null)}>
                        <span className="sr-only">Fechar</span>×
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Informacoes Gerais */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Informações Gerais
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cliente:</span>
                          <span className="font-medium">{obraSelecionada.cliente}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tipo:</span>
                          <span>{obraSelecionada.tipo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Local:</span>
                          <span>
                            {obraSelecionada.local}, {obraSelecionada.uf}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gerente:</span>
                          <span>{obraSelecionada.gerenteContrato}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equipe:</span>
                          <span>{obraSelecionada.equipe} colaboradores</span>
                        </div>
                      </div>
                    </div>

                    {/* Valores */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valores</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contrato:</span>
                          <span className="font-medium">{formatCurrency(obraSelecionada.valorContrato)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Medido:</span>
                          <span className="text-emerald-600">{formatCurrency(obraSelecionada.valorMedido)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">A Receber:</span>
                          <span className="text-amber-600">{formatCurrency(obraSelecionada.valorAReceber)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saldo:</span>
                          <span>{formatCurrency(obraSelecionada.valorContrato - obraSelecionada.valorMedido)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prazos */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Prazos</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Início:</span>
                          <span>{new Date(obraSelecionada.dataInicio).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Término:</span>
                          <span>{new Date(obraSelecionada.dataTermino).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avanço Físico:</span>
                          <span className="font-medium">{obraSelecionada.avancoFisico}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avanço Financeiro:</span>
                          <span className="font-medium">{obraSelecionada.avancoFinanceiro}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Indicadores */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Indicadores</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/50 rounded text-center">
                          <p className="text-[10px] text-muted-foreground">IDC</p>
                          <p
                            className={cn(
                              "text-lg font-bold",
                              obraSelecionada.indicadores.idc >= 1 ? "text-emerald-600" : "text-red-600",
                            )}
                          >
                            {obraSelecionada.indicadores.idc.toFixed(2)}
                          </p>
                        </div>
                        <div className="p-2 bg-muted/50 rounded text-center">
                          <p className="text-[10px] text-muted-foreground">IDP</p>
                          <p
                            className={cn(
                              "text-lg font-bold",
                              obraSelecionada.indicadores.idp >= 1 ? "text-emerald-600" : "text-red-600",
                            )}
                          >
                            {obraSelecionada.indicadores.idp.toFixed(2)}
                          </p>
                        </div>
                        <div className="p-2 bg-muted/50 rounded text-center">
                          <p className="text-[10px] text-muted-foreground">CPI</p>
                          <p
                            className={cn(
                              "text-lg font-bold",
                              obraSelecionada.indicadores.cpi >= 1 ? "text-emerald-600" : "text-red-600",
                            )}
                          >
                            {obraSelecionada.indicadores.cpi.toFixed(2)}
                          </p>
                        </div>
                        <div className="p-2 bg-muted/50 rounded text-center">
                          <p className="text-[10px] text-muted-foreground">SPI</p>
                          <p
                            className={cn(
                              "text-lg font-bold",
                              obraSelecionada.indicadores.spi >= 1 ? "text-emerald-600" : "text-red-600",
                            )}
                          >
                            {obraSelecionada.indicadores.spi.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
