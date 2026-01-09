"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Search,
  Plus,
  Building2,
  DollarSign,
  Target,
  Briefcase,
  FolderKanban,
  PieChart,
  LayoutDashboard,
  MoreHorizontal,
  Download,
  Upload,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Paperclip,
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

// Mock data - Contratos
const contratosMock = [
  {
    id: "CT-2024-001",
    titulo: "Duplicação BR-101 Lote 3",
    cliente: "DNIT",
    objeto: "Obras de duplicação da BR-101, trecho SC/RS, incluindo obras de arte especiais, drenagem e pavimentação.",
    valorOriginal: 450000000,
    valorAtual: 478000000,
    aditivos: 2,
    valorAditivos: 28000000,
    status: "ativo",
    tipo: "Empreitada Global",
    modalidade: "Concorrência Pública",
    dataAssinatura: "2024-03-15",
    dataVigencia: "2027-03-15",
    prazoMeses: 36,
    garantia: 22500000,
    retencao: 5,
    reajuste: "IPCA",
    centrosCusto: ["CC-2024-001"],
    gerenteContrato: "João Silva",
    documentos: 12,
    ultimaAtualizacao: "2026-01-05",
  },
  {
    id: "CT-2024-002",
    titulo: "SES Região Metropolitana Fase 1",
    cliente: "SABESP",
    objeto: "Implantação de sistema de esgotamento sanitário na região metropolitana de São Paulo.",
    valorOriginal: 180000000,
    valorAtual: 180000000,
    aditivos: 0,
    valorAditivos: 0,
    status: "ativo",
    tipo: "Empreitada por Preço Unitário",
    modalidade: "Pregão Eletrônico",
    dataAssinatura: "2024-06-01",
    dataVigencia: "2026-06-01",
    prazoMeses: 24,
    garantia: 9000000,
    retencao: 5,
    reajuste: "INCC",
    centrosCusto: ["CC-2024-002"],
    gerenteContrato: "Pedro Alves",
    documentos: 8,
    ultimaAtualizacao: "2026-01-07",
  },
  {
    id: "CT-2023-089",
    titulo: "UHE Belo Monte - Obras Complementares",
    cliente: "Eletrobras Furnas",
    objeto: "Execução de obras civis complementares na Usina Hidrelétrica de Belo Monte.",
    valorOriginal: 890000000,
    valorAtual: 945000000,
    aditivos: 3,
    valorAditivos: 55000000,
    status: "ativo",
    tipo: "Empreitada Global",
    modalidade: "Concorrência Internacional",
    dataAssinatura: "2022-01-10",
    dataVigencia: "2026-01-10",
    prazoMeses: 48,
    garantia: 44500000,
    retencao: 5,
    reajuste: "IPCA",
    centrosCusto: ["CC-2023-089"],
    gerenteContrato: "Carlos Lima",
    documentos: 24,
    ultimaAtualizacao: "2026-01-03",
  },
  {
    id: "CT-2025-001",
    titulo: "Restauração SP-330 Trecho Norte",
    cliente: "CCR Rodovias",
    objeto: "Serviços de restauração e manutenção da rodovia SP-330, trecho norte.",
    valorOriginal: 95000000,
    valorAtual: 95000000,
    aditivos: 0,
    valorAditivos: 0,
    status: "em_assinatura",
    tipo: "Empreitada por Preço Unitário",
    modalidade: "Convite",
    dataAssinatura: "2026-01-15",
    dataVigencia: "2026-12-15",
    prazoMeses: 12,
    garantia: 4750000,
    retencao: 3,
    reajuste: "N/A",
    centrosCusto: [],
    gerenteContrato: "João Silva",
    documentos: 3,
    ultimaAtualizacao: "2026-01-09",
  },
  {
    id: "CT-2023-045",
    titulo: "Terminal Portuário Santos Fase 2",
    cliente: "Santos Port Authority",
    objeto: "Construção de terminal de contêineres e obras de infraestrutura portuária.",
    valorOriginal: 320000000,
    valorAtual: 335000000,
    aditivos: 1,
    valorAditivos: 15000000,
    status: "ativo",
    tipo: "Empreitada Global",
    modalidade: "Concorrência Pública",
    dataAssinatura: "2023-08-15",
    dataVigencia: "2026-02-15",
    prazoMeses: 30,
    garantia: 16000000,
    retencao: 5,
    reajuste: "IPCA",
    centrosCusto: ["CC-2023-045"],
    gerenteContrato: "Maria Santos",
    documentos: 15,
    ultimaAtualizacao: "2026-01-06",
  },
  {
    id: "CT-2022-078",
    titulo: "Ponte Rio-Niterói Manutenção",
    cliente: "CCR Ponte",
    objeto: "Serviços de manutenção preventiva e corretiva da Ponte Rio-Niterói.",
    valorOriginal: 45000000,
    valorAtual: 45000000,
    aditivos: 0,
    valorAditivos: 0,
    status: "encerrado",
    tipo: "Empreitada por Preço Unitário",
    modalidade: "Contratação Direta",
    dataAssinatura: "2022-03-01",
    dataVigencia: "2025-03-01",
    prazoMeses: 36,
    garantia: 2250000,
    retencao: 5,
    reajuste: "IPCA",
    centrosCusto: ["CC-2022-078"],
    gerenteContrato: "João Silva",
    documentos: 18,
    ultimaAtualizacao: "2025-03-01",
  },
]

// Mock - Aditivos
const aditivosMock = [
  {
    id: "AD-2025-003",
    contrato: "CT-2023-089",
    tipo: "Acréscimo de Serviço",
    valor: 25000000,
    percentual: 2.8,
    motivo: "Obras adicionais de contenção não previstas em projeto.",
    status: "aprovado",
    dataAprovacao: "2025-11-15",
  },
  {
    id: "AD-2025-002",
    contrato: "CT-2024-001",
    tipo: "Reequilíbrio",
    valor: 15000000,
    percentual: 3.3,
    motivo: "Reequilíbrio econômico-financeiro devido à variação cambial.",
    status: "aprovado",
    dataAprovacao: "2025-08-20",
  },
  {
    id: "AD-2025-001",
    contrato: "CT-2024-001",
    tipo: "Acréscimo de Prazo",
    valor: 13000000,
    percentual: 2.9,
    motivo: "Extensão de prazo de 6 meses por atraso em licenciamento.",
    status: "aprovado",
    dataAprovacao: "2025-06-10",
  },
]

export default function ContratosPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null)
  const [contratoSelecionado, setContratoSelecionado] = useState<(typeof contratosMock)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("todos")
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const contratosFiltrados = contratosMock.filter((c) => {
    const matchSearch =
      c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filtroStatus ? c.status === filtroStatus : true
    const matchTab =
      activeTab === "todos" ||
      (activeTab === "ativos" && c.status === "ativo") ||
      (activeTab === "pendentes" && c.status === "em_assinatura") ||
      (activeTab === "encerrados" && c.status === "encerrado")
    return matchSearch && matchStatus && matchTab
  })

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(2)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
      ativo: {
        label: "Ativo",
        color: "text-emerald-700",
        bg: "bg-emerald-100",
        icon: <CheckCircle2 className="w-3 h-3" />,
      },
      em_assinatura: {
        label: "Em Assinatura",
        color: "text-amber-700",
        bg: "bg-amber-100",
        icon: <Clock className="w-3 h-3" />,
      },
      encerrado: {
        label: "Encerrado",
        color: "text-slate-700",
        bg: "bg-slate-100",
        icon: <XCircle className="w-3 h-3" />,
      },
      suspenso: {
        label: "Suspenso",
        color: "text-red-700",
        bg: "bg-red-100",
        icon: <AlertTriangle className="w-3 h-3" />,
      },
    }
    return configs[status] || { label: status, color: "text-gray-700", bg: "bg-gray-100", icon: null }
  }

  // Calculos
  const valorTotalContratos = contratosMock
    .filter((c) => c.status === "ativo")
    .reduce((acc, c) => acc + c.valorAtual, 0)
  const totalAditivos = contratosMock.reduce((acc, c) => acc + c.valorAditivos, 0)
  const contratosAtivos = contratosMock.filter((c) => c.status === "ativo").length
  const contratosPendentes = contratosMock.filter((c) => c.status === "em_assinatura").length

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
                placeholder="Buscar contratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
                  <Upload className="w-3.5 h-3.5" />
                  Import Compor 90
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importar Planilha Compor 90</DialogTitle>
                  <DialogDescription>
                    Faça o upload da planilha Compor 90 para criar ou atualizar um contrato.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Contrato</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione ou crie novo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">+ Criar Novo Contrato</SelectItem>
                        {contratosMock.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.id} - {c.titulo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Arraste o arquivo ou clique para selecionar</p>
                    <p className="text-xs text-muted-foreground mt-1">.xlsx, .xls (máx. 10MB)</p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowUploadDialog(false)}>Importar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
            <Button size="sm" className="h-7 text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Novo Contrato
            </Button>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Metricas */}
            <div className="grid grid-cols-5 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{contratosMock.length}</p>
                    <p className="text-[10px] text-muted-foreground">Total Contratos</p>
                  </div>
                  <FolderKanban className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(valorTotalContratos)}</p>
                    <p className="text-[10px] text-muted-foreground">Valor Ativos</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{contratosAtivos}</p>
                    <p className="text-[10px] text-muted-foreground">Ativos</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{contratosPendentes}</p>
                    <p className="text-[10px] text-muted-foreground">Em Assinatura</p>
                  </div>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(totalAditivos)}</p>
                    <p className="text-[10px] text-muted-foreground">Total Aditivos</p>
                  </div>
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Tabs e Tabela */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-8">
                <TabsTrigger value="todos" className="text-xs h-6">
                  Todos ({contratosMock.length})
                </TabsTrigger>
                <TabsTrigger value="ativos" className="text-xs h-6">
                  Ativos ({contratosAtivos})
                </TabsTrigger>
                <TabsTrigger value="pendentes" className="text-xs h-6">
                  Pendentes ({contratosPendentes})
                </TabsTrigger>
                <TabsTrigger value="encerrados" className="text-xs h-6">
                  Encerrados ({contratosMock.filter((c) => c.status === "encerrado").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Número</TableHead>
                          <TableHead className="text-xs">Contrato</TableHead>
                          <TableHead className="text-xs">Cliente</TableHead>
                          <TableHead className="text-xs text-right">Valor Original</TableHead>
                          <TableHead className="text-xs text-right">Valor Atual</TableHead>
                          <TableHead className="text-xs text-center">Aditivos</TableHead>
                          <TableHead className="text-xs">Vigência</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                          <TableHead className="text-xs w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contratosFiltrados.map((contrato) => {
                          const statusConfig = getStatusConfig(contrato.status)
                          return (
                            <TableRow
                              key={contrato.id}
                              className={cn(
                                "cursor-pointer",
                                contratoSelecionado?.id === contrato.id && "bg-primary/5",
                              )}
                              onClick={() => setContratoSelecionado(contrato)}
                            >
                              <TableCell className="text-xs font-mono">{contrato.id}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="text-xs font-medium">{contrato.titulo}</p>
                                  <p className="text-[10px] text-muted-foreground">{contrato.tipo}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-xs">{contrato.cliente}</TableCell>
                              <TableCell className="text-xs text-right">
                                {formatCurrency(contrato.valorOriginal)}
                              </TableCell>
                              <TableCell className="text-xs text-right font-medium">
                                {formatCurrency(contrato.valorAtual)}
                                {contrato.valorAditivos > 0 && (
                                  <span className="text-[10px] text-emerald-600 ml-1">
                                    (+{formatCurrency(contrato.valorAditivos)})
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                {contrato.aditivos > 0 ? (
                                  <Badge variant="outline" className="text-[10px]">
                                    {contrato.aditivos}
                                  </Badge>
                                ) : (
                                  <span className="text-xs text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell className="text-xs">
                                {new Date(contrato.dataVigencia).toLocaleDateString("pt-BR")}
                              </TableCell>
                              <TableCell>
                                <Badge className={cn("text-[10px] gap-1", statusConfig.bg, statusConfig.color)}>
                                  {statusConfig.icon}
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
                                      <Eye className="w-3.5 h-3.5 mr-2" />
                                      Ver Detalhes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Paperclip className="w-3.5 h-3.5 mr-2" />
                                      Documentos ({contrato.documentos})
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <RefreshCw className="w-3.5 h-3.5 mr-2" />
                                      Novo Aditivo
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
              </TabsContent>
            </Tabs>

            {/* Painel de Detalhes do Contrato Selecionado */}
            {contratoSelecionado && (
              <Card className="border-primary/20">
                <CardHeader className="py-3 px-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-sm">{contratoSelecionado.titulo}</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        {contratoSelecionado.id}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
                        <Paperclip className="w-3.5 h-3.5" />
                        Documentos ({contratoSelecionado.documentos})
                      </Button>
                      <Button size="sm" className="h-7 text-xs gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Novo Aditivo
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setContratoSelecionado(null)}
                      >
                        <span className="sr-only">Fechar</span>×
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Informacoes do Contrato */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Informações do Contrato
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cliente:</span>
                          <span className="font-medium">{contratoSelecionado.cliente}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tipo:</span>
                          <span>{contratoSelecionado.tipo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Modalidade:</span>
                          <span>{contratoSelecionado.modalidade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gerente:</span>
                          <span>{contratoSelecionado.gerenteContrato}</span>
                        </div>
                      </div>
                    </div>

                    {/* Valores */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valores</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Original:</span>
                          <span>{formatCurrency(contratoSelecionado.valorOriginal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Aditivos:</span>
                          <span className="text-emerald-600">+{formatCurrency(contratoSelecionado.valorAditivos)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Atual:</span>
                          <span className="font-medium">{formatCurrency(contratoSelecionado.valorAtual)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Garantia:</span>
                          <span>{formatCurrency(contratoSelecionado.garantia)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prazos */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Prazos e Condições
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assinatura:</span>
                          <span>{new Date(contratoSelecionado.dataAssinatura).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vigência:</span>
                          <span>{new Date(contratoSelecionado.dataVigencia).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Prazo:</span>
                          <span>{contratoSelecionado.prazoMeses} meses</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reajuste:</span>
                          <span>{contratoSelecionado.reajuste}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Retenção:</span>
                          <span>{contratoSelecionado.retencao}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Aditivos Recentes */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Aditivos Recentes
                      </h4>
                      {aditivosMock
                        .filter((a) => a.contrato === contratoSelecionado.id)
                        .slice(0, 3)
                        .map((aditivo) => (
                          <div key={aditivo.id} className="p-2 bg-muted/50 rounded text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px]">{aditivo.id}</span>
                              <Badge variant="outline" className="text-[10px] h-4">
                                {aditivo.tipo}
                              </Badge>
                            </div>
                            <p className="text-emerald-600 font-medium">+{formatCurrency(aditivo.valor)}</p>
                          </div>
                        ))}
                      {aditivosMock.filter((a) => a.contrato === contratoSelecionado.id).length === 0 && (
                        <p className="text-xs text-muted-foreground">Nenhum aditivo registrado</p>
                      )}
                    </div>
                  </div>

                  {/* Objeto do Contrato */}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Objeto do Contrato
                    </h4>
                    <p className="text-xs text-muted-foreground">{contratoSelecionado.objeto}</p>
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
