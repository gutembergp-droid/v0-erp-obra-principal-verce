"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Phone,
  Mail,
  MapPin,
  Users,
  MoreHorizontal,
  Star,
  StarOff,
  MessageSquare,
  Clock,
  TrendingUp,
  Download,
  ArrowUpDown,
  ExternalLink,
  CheckCircle2,
  User,
  Globe,
  FileCheck,
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

// Mock data - Clientes
const clientesMock = [
  {
    id: 1,
    nome: "DNIT",
    nomeCompleto: "Departamento Nacional de Infraestrutura de Transportes",
    tipo: "Publico",
    segmento: "Infraestrutura Rodoviária",
    cnpj: "04.892.707/0001-00",
    endereco: "Brasília, DF",
    site: "www.dnit.gov.br",
    favorito: true,
    status: "Ativo",
    contatos: [
      {
        nome: "Carlos Mendes",
        cargo: "Superintendente",
        email: "carlos.mendes@dnit.gov.br",
        telefone: "(61) 3315-4000",
        principal: true,
      },
      {
        nome: "Ana Lucia",
        cargo: "Coordenadora de Licitações",
        email: "ana.lucia@dnit.gov.br",
        telefone: "(61) 3315-4010",
        principal: false,
      },
    ],
    contratos: 3,
    valorTotal: 1200000000,
    propostasAtivas: 2,
    ultimoContato: "2026-01-08",
    proximaAcao: "Reunião de acompanhamento BR-116",
    proximaAcaoData: "2026-01-15",
    historico: [
      { data: "2026-01-08", tipo: "reuniao", descricao: "Reunião de acompanhamento BR-101", usuario: "João Silva" },
      { data: "2025-12-20", tipo: "proposta", descricao: "Proposta BR-116 enviada", usuario: "Maria Santos" },
      { data: "2025-11-15", tipo: "contrato", descricao: "Assinatura contrato BR-101 Lote 3", usuario: "Diretoria" },
    ],
  },
  {
    id: 2,
    nome: "SABESP",
    nomeCompleto: "Companhia de Saneamento Básico do Estado de São Paulo",
    tipo: "Publico",
    segmento: "Saneamento",
    cnpj: "43.776.517/0001-80",
    endereco: "São Paulo, SP",
    site: "www.sabesp.com.br",
    favorito: true,
    status: "Ativo",
    contatos: [
      {
        nome: "Ana Paula Costa",
        cargo: "Gerente de Projetos",
        email: "ana.costa@sabesp.com.br",
        telefone: "(11) 3388-8000",
        principal: true,
      },
      {
        nome: "Roberto Lima",
        cargo: "Diretor Técnico",
        email: "roberto.lima@sabesp.com.br",
        telefone: "(11) 3388-8100",
        principal: false,
      },
    ],
    contratos: 2,
    valorTotal: 360000000,
    propostasAtivas: 1,
    ultimoContato: "2026-01-07",
    proximaAcao: "Apresentação técnica Expansão Zona Leste",
    proximaAcaoData: "2026-01-11",
    historico: [
      { data: "2026-01-07", tipo: "email", descricao: "Envio de especificações técnicas", usuario: "Carlos Lima" },
      { data: "2026-01-02", tipo: "proposta", descricao: "Proposta Expansão Zona Leste", usuario: "Maria Santos" },
    ],
  },
  {
    id: 3,
    nome: "Eletrobras Furnas",
    nomeCompleto: "Furnas Centrais Elétricas S.A.",
    tipo: "Misto",
    segmento: "Energia",
    cnpj: "23.274.194/0001-19",
    endereco: "Rio de Janeiro, RJ",
    site: "www.furnas.com.br",
    favorito: false,
    status: "Ativo",
    contatos: [
      {
        nome: "Roberto Fernandes",
        cargo: "Gerente de Empreendimentos",
        email: "roberto.fernandes@furnas.com.br",
        telefone: "(21) 2528-5000",
        principal: true,
      },
    ],
    contratos: 4,
    valorTotal: 2100000000,
    propostasAtivas: 1,
    ultimoContato: "2026-01-06",
    proximaAcao: "Visita técnica UHE Rio Verde",
    proximaAcaoData: "2026-01-20",
    historico: [
      { data: "2026-01-06", tipo: "reuniao", descricao: "Discussão consórcio UHE Rio Verde", usuario: "Carlos Lima" },
    ],
  },
  {
    id: 4,
    nome: "CCR Rodovias",
    nomeCompleto: "CCR S.A. - Rodovias",
    tipo: "Privado",
    segmento: "Concessões Rodoviárias",
    cnpj: "02.846.056/0001-97",
    endereco: "São Paulo, SP",
    site: "www.ccr.com.br",
    favorito: true,
    status: "Ativo",
    contatos: [
      {
        nome: "Fernanda Oliveira",
        cargo: "Diretora de Operações",
        email: "fernanda.oliveira@ccr.com.br",
        telefone: "(11) 3048-5000",
        principal: true,
      },
      {
        nome: "Marcelo Santos",
        cargo: "Gerente de Manutenção",
        email: "marcelo.santos@ccr.com.br",
        telefone: "(11) 3048-5100",
        principal: false,
      },
    ],
    contratos: 1,
    valorTotal: 95000000,
    propostasAtivas: 1,
    ultimoContato: "2026-01-09",
    proximaAcao: "Assinatura contrato SP-330",
    proximaAcaoData: "2026-01-12",
    historico: [
      { data: "2026-01-09", tipo: "contrato", descricao: "Contrato SP-330 em revisão final", usuario: "Jurídico" },
      { data: "2026-01-05", tipo: "negociacao", descricao: "Negociação de valores concluída", usuario: "João Silva" },
    ],
  },
  {
    id: 5,
    nome: "CCR Ponte",
    nomeCompleto: "CCR Ponte Rio-Niterói",
    tipo: "Privado",
    segmento: "Concessões Rodoviárias",
    cnpj: "29.222.308/0001-00",
    endereco: "Niterói, RJ",
    site: "www.ccrponte.com.br",
    favorito: false,
    status: "Ativo",
    contatos: [
      {
        nome: "Ricardo Souza",
        cargo: "Gerente de Manutenção",
        email: "ricardo.souza@ccrponte.com.br",
        telefone: "(21) 2620-7070",
        principal: true,
      },
    ],
    contratos: 0,
    valorTotal: 0,
    propostasAtivas: 1,
    ultimoContato: "2026-01-08",
    proximaAcao: "Assinatura contrato Manutenção Ponte",
    proximaAcaoData: "2026-01-15",
    historico: [
      { data: "2026-01-08", tipo: "reuniao", descricao: "Alinhamento final contrato", usuario: "João Silva" },
    ],
  },
  {
    id: 6,
    nome: "Metrô SP",
    nomeCompleto: "Companhia do Metropolitano de São Paulo",
    tipo: "Publico",
    segmento: "Transporte Metroviário",
    cnpj: "62.070.147/0001-00",
    endereco: "São Paulo, SP",
    site: "www.metro.sp.gov.br",
    favorito: false,
    status: "Prospeccao",
    contatos: [
      {
        nome: "Paulo Henrique",
        cargo: "Coordenador de Obras",
        email: "paulo.henrique@metro.sp.gov.br",
        telefone: "(11) 3283-5000",
        principal: true,
      },
    ],
    contratos: 0,
    valorTotal: 0,
    propostasAtivas: 1,
    ultimoContato: "2026-01-05",
    proximaAcao: "Acompanhar publicação edital Linha 6",
    proximaAcaoData: "2026-03-01",
    historico: [
      { data: "2026-01-05", tipo: "prospeccao", descricao: "Proposta Linha 6 registrada", usuario: "Maria Santos" },
    ],
  },
  {
    id: 7,
    nome: "Santos Port Authority",
    nomeCompleto: "Autoridade Portuária de Santos",
    tipo: "Publico",
    segmento: "Portuário",
    cnpj: "44.387.236/0001-00",
    endereco: "Santos, SP",
    site: "www.portodesantos.com.br",
    favorito: false,
    status: "Ativo",
    contatos: [
      {
        nome: "Marcelo Dias",
        cargo: "Superintendente",
        email: "marcelo.dias@portodesantos.com.br",
        telefone: "(13) 3202-6565",
        principal: true,
      },
    ],
    contratos: 0,
    valorTotal: 0,
    propostasAtivas: 1,
    ultimoContato: "2026-01-04",
    proximaAcao: "Acompanhar análise proposta Terminal",
    proximaAcaoData: "2026-02-15",
    historico: [
      { data: "2026-01-04", tipo: "proposta", descricao: "Proposta comercial enviada", usuario: "Carlos Lima" },
    ],
  },
]

export default function ClientesCRMPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [clienteSelecionado, setClienteSelecionado] = useState<(typeof clientesMock)[0] | null>(null)
  const [showNovoClienteDialog, setShowNovoClienteDialog] = useState(false)
  const [showNovaInteracaoDialog, setShowNovaInteracaoDialog] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null)

  const clientesFiltrados = clientesMock.filter((c) => {
    const matchSearch =
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.segmento.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo ? c.tipo === filtroTipo : true
    return matchSearch && matchTipo
  })

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getInteracaoIcon = (tipo: string) => {
    const icons: Record<string, React.ReactNode> = {
      reuniao: <Users className="w-3 h-3 text-blue-500" />,
      email: <Mail className="w-3 h-3 text-green-500" />,
      telefone: <Phone className="w-3 h-3 text-purple-500" />,
      proposta: <FileText className="w-3 h-3 text-amber-500" />,
      contrato: <FileCheck className="w-3 h-3 text-emerald-500" />,
      negociacao: <TrendingUp className="w-3 h-3 text-cyan-500" />,
      prospeccao: <Target className="w-3 h-3 text-slate-500" />,
    }
    return icons[tipo] || <MessageSquare className="w-3 h-3" />
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
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex gap-1 mr-2">
              {["Publico", "Privado", "Misto"].map((tipo) => (
                <Button
                  key={tipo}
                  variant={filtroTipo === tipo ? "default" : "ghost"}
                  size="sm"
                  className="h-6 text-[10px] px-2"
                  onClick={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
                >
                  {tipo}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
            <Dialog open={showNovoClienteDialog} onOpenChange={setShowNovoClienteDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 text-xs gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Novo Cliente</DialogTitle>
                  <DialogDescription>Cadastre um novo cliente no CRM.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome</Label>
                      <Input placeholder="Ex: DNIT" />
                    </div>
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input placeholder="Nome completo da empresa" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>CNPJ</Label>
                      <Input placeholder="00.000.000/0001-00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publico">Público</SelectItem>
                          <SelectItem value="privado">Privado</SelectItem>
                          <SelectItem value="misto">Misto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Segmento</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rodovias">Infraestrutura Rodoviária</SelectItem>
                          <SelectItem value="saneamento">Saneamento</SelectItem>
                          <SelectItem value="energia">Energia</SelectItem>
                          <SelectItem value="portuario">Portuário</SelectItem>
                          <SelectItem value="metro">Transporte Metroviário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Endereço</Label>
                      <Input placeholder="Cidade, UF" />
                    </div>
                    <div className="space-y-2">
                      <Label>Site</Label>
                      <Input placeholder="www.exemplo.com.br" />
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Contato Principal</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input placeholder="Nome do contato" />
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input placeholder="Cargo" />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input placeholder="email@empresa.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input placeholder="(00) 0000-0000" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNovoClienteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowNovoClienteDialog(false)}>Cadastrar Cliente</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                    <p className="text-2xl font-bold">{clientesMock.length}</p>
                    <p className="text-[10px] text-muted-foreground">Total Clientes</p>
                  </div>
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientesMock.filter((c) => c.status === "Ativo").length}</p>
                    <p className="text-[10px] text-muted-foreground">Clientes Ativos</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientesMock.filter((c) => c.favorito).length}</p>
                    <p className="text-[10px] text-muted-foreground">Favoritos</p>
                  </div>
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientesMock.reduce((acc, c) => acc + c.contratos, 0)}</p>
                    <p className="text-[10px] text-muted-foreground">Contratos Ativos</p>
                  </div>
                  <FolderKanban className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(clientesMock.reduce((acc, c) => acc + c.valorTotal, 0))}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Valor Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Lista de Clientes */}
              <Card className="lg:col-span-2">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
                        <ArrowUpDown className="w-3 h-3" />
                        Ordenar
                      </Button>
                      <span className="text-xs text-muted-foreground">{clientesFiltrados.length} cliente(s)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-8 pl-4"></TableHead>
                          <TableHead className="text-xs">Cliente</TableHead>
                          <TableHead className="text-xs">Tipo</TableHead>
                          <TableHead className="text-xs">Segmento</TableHead>
                          <TableHead className="text-xs text-center">Contratos</TableHead>
                          <TableHead className="text-xs text-right">Valor</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                          <TableHead className="w-8"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientesFiltrados.map((cliente) => (
                          <TableRow
                            key={cliente.id}
                            className={cn(
                              "text-xs cursor-pointer",
                              clienteSelecionado?.id === cliente.id && "bg-muted/50",
                            )}
                            onClick={() => setClienteSelecionado(cliente)}
                          >
                            <TableCell className="pl-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Toggle favorito
                                }}
                              >
                                {cliente.favorito ? (
                                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                ) : (
                                  <StarOff className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                              </button>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    {cliente.nome.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{cliente.nome}</p>
                                  <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                                    {cliente.nomeCompleto}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  cliente.tipo === "Publico"
                                    ? "default"
                                    : cliente.tipo === "Privado"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-[10px]"
                              >
                                {cliente.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{cliente.segmento}</TableCell>
                            <TableCell className="text-center">
                              <span className="font-medium">{cliente.contratos}</span>
                            </TableCell>
                            <TableCell className="text-right font-medium text-primary">
                              {formatCurrency(cliente.valorTotal)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={cliente.status === "Ativo" ? "default" : "outline"}
                                className={cn(
                                  "text-[10px]",
                                  cliente.status === "Ativo" ? "bg-emerald-500" : "text-amber-600 border-amber-300",
                                )}
                              >
                                {cliente.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <FileText className="w-3.5 h-3.5 mr-2" />
                                    Nova Proposta
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                                    Registrar Interação
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Detalhes do Cliente */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">
                    {clienteSelecionado ? "Detalhes do Cliente" : "Selecione um Cliente"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {clienteSelecionado ? (
                    <ScrollArea className="h-[500px]">
                      <div className="p-4 space-y-4">
                        {/* Info basica */}
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {clienteSelecionado.nome.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{clienteSelecionado.nome}</h3>
                              {clienteSelecionado.favorito && (
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{clienteSelecionado.nomeCompleto}</p>
                          </div>
                        </div>

                        {/* Info adicional */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Building2 className="w-3 h-3" />
                            <span>{clienteSelecionado.tipo}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Target className="w-3 h-3" />
                            <span>{clienteSelecionado.segmento}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{clienteSelecionado.endereco}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Globe className="w-3 h-3" />
                            <span>{clienteSelecionado.site}</span>
                          </div>
                        </div>

                        {/* Metricas do cliente */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <p className="text-lg font-bold">{clienteSelecionado.contratos}</p>
                            <p className="text-[10px] text-muted-foreground">Contratos</p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <p className="text-lg font-bold">{clienteSelecionado.propostasAtivas}</p>
                            <p className="text-[10px] text-muted-foreground">Propostas</p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <p className="text-sm font-bold text-primary">
                              {formatCurrency(clienteSelecionado.valorTotal)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Valor Total</p>
                          </div>
                        </div>

                        {/* Proxima acao */}
                        {clienteSelecionado.proximaAcao && (
                          <div className="p-2 bg-amber-50 border border-amber-200 rounded">
                            <div className="flex items-start gap-2">
                              <Clock className="w-3.5 h-3.5 text-amber-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-medium text-amber-800">Próxima Ação</p>
                                <p className="text-xs text-amber-700">{clienteSelecionado.proximaAcao}</p>
                                <p className="text-[10px] text-amber-600 mt-0.5">
                                  {new Date(clienteSelecionado.proximaAcaoData).toLocaleDateString("pt-BR")}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Contatos */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium">Contatos</p>
                            <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5">
                              <Plus className="w-3 h-3 mr-0.5" />
                              Adicionar
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {clienteSelecionado.contatos.map((contato, index) => (
                              <div key={index} className="p-2 bg-muted/50 rounded">
                                <div className="flex items-center gap-2">
                                  <User className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs font-medium">{contato.nome}</span>
                                  {contato.principal && (
                                    <Badge variant="outline" className="text-[8px] h-4 px-1">
                                      Principal
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-[10px] text-muted-foreground ml-5">{contato.cargo}</p>
                                <div className="flex items-center gap-3 mt-1 ml-5">
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                    <Mail className="w-2.5 h-2.5" />
                                    {contato.email}
                                  </span>
                                </div>
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 ml-5 mt-0.5">
                                  <Phone className="w-2.5 h-2.5" />
                                  {contato.telefone}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Historico de interacoes */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium">Histórico de Interações</p>
                            <Dialog open={showNovaInteracaoDialog} onOpenChange={setShowNovaInteracaoDialog}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5">
                                  <Plus className="w-3 h-3 mr-0.5" />
                                  Registrar
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Nova Interação</DialogTitle>
                                  <DialogDescription>
                                    Registre uma nova interação com {clienteSelecionado.nome}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Tipo de Interação</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="reuniao">Reunião</SelectItem>
                                        <SelectItem value="email">E-mail</SelectItem>
                                        <SelectItem value="telefone">Telefone</SelectItem>
                                        <SelectItem value="visita">Visita Técnica</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Descrição</Label>
                                    <Textarea placeholder="Descreva a interação..." />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Próxima Ação</Label>
                                    <Input placeholder="O que deve ser feito a seguir?" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Data da Próxima Ação</Label>
                                    <Input type="date" />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowNovaInteracaoDialog(false)}>
                                    Cancelar
                                  </Button>
                                  <Button onClick={() => setShowNovaInteracaoDialog(false)}>Registrar</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="space-y-2">
                            {clienteSelecionado.historico.map((item, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="mt-0.5">{getInteracaoIcon(item.tipo)}</div>
                                <div className="flex-1">
                                  <p className="text-xs">{item.descricao}</p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {new Date(item.data).toLocaleDateString("pt-BR")} - {item.usuario}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Acoes */}
                        <div className="flex gap-2 pt-2 border-t">
                          <Link href="/corporativo/comercial/propostas" className="flex-1">
                            <Button size="sm" className="w-full text-xs h-8">
                              <FileText className="w-3.5 h-3.5 mr-1" />
                              Nova Proposta
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="text-xs h-8 bg-transparent">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="h-[500px] flex flex-col items-center justify-center text-muted-foreground">
                      <Building2 className="w-12 h-12 mb-3 opacity-30" />
                      <p className="text-sm">Selecione um cliente</p>
                      <p className="text-xs">para ver os detalhes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
