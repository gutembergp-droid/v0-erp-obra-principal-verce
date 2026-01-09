"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Search,
  Plus,
  Building2,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Download,
  Upload,
  Target,
  Briefcase,
  ChevronRight,
  FolderKanban,
  PieChart,
  LayoutDashboard,
  ShieldCheck,
  ClipboardList,
  UserPlus,
  FileCheck,
  Send,
  Clock,
  Eye,
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

// Mock - Propostas ganhas aguardando abertura de CC
const propostasGanhas = [
  {
    id: "PROP-2026-004",
    titulo: "Restauração SP-330 Trecho Norte",
    cliente: "CCR Rodovias",
    valor: 95000000,
    dataAprovacao: "2026-01-09",
    responsavel: "João Silva",
    status: "aguardando_tap",
  },
  {
    id: "PROP-2026-007",
    titulo: "Ponte Rio-Niterói - Manutenção",
    cliente: "CCR Ponte",
    valor: 45000000,
    dataAprovacao: "2026-01-08",
    responsavel: "João Silva",
    status: "tap_em_elaboracao",
  },
]

// Mock - Centros de Custo em abertura
const ccEmAbertura = [
  {
    id: 1,
    codigo: "CC-2026-001",
    proposta: "PROP-2025-089",
    nome: "BR-101 Duplicação Lote 3",
    cliente: "DNIT",
    valor: 450000000,
    etapas: {
      tap: { status: "aprovado", data: "2025-08-20" },
      responsaveis: { status: "em_andamento", data: null },
      planilha: { status: "pendente", data: null },
      baseline: { status: "pendente", data: null },
      gate1: { status: "pendente", data: null },
    },
    progresso: 40,
    responsavelTAP: "Carlos Lima",
    gerenteContrato: "João Silva",
    dataInicio: "2025-08-15",
  },
  {
    id: 2,
    codigo: "CC-2026-002",
    proposta: "PROP-2025-076",
    nome: "SES Região Metropolitana - Fase 1",
    cliente: "SABESP",
    valor: 180000000,
    etapas: {
      tap: { status: "aprovado", data: "2025-07-25" },
      responsaveis: { status: "aprovado", data: "2025-07-28" },
      planilha: { status: "aprovado", data: "2025-08-05" },
      baseline: { status: "em_andamento", data: null },
      gate1: { status: "pendente", data: null },
    },
    progresso: 75,
    responsavelTAP: "Maria Santos",
    gerenteContrato: "Pedro Alves",
    dataInicio: "2025-07-20",
  },
]

// Mock - TAP Template
const tapTemplate = {
  secoes: [
    { id: "escopo", nome: "Escopo do Projeto", obrigatorio: true },
    { id: "objetivos", nome: "Objetivos Estratégicos", obrigatorio: true },
    { id: "premissas", nome: "Premissas e Restrições", obrigatorio: true },
    { id: "riscos", nome: "Riscos Identificados", obrigatorio: true },
    { id: "cronograma", nome: "Cronograma Macro", obrigatorio: true },
    { id: "equipe", nome: "Equipe do Projeto", obrigatorio: true },
    { id: "orcamento", nome: "Orçamento Resumido", obrigatorio: true },
    { id: "stakeholders", nome: "Partes Interessadas", obrigatorio: false },
  ],
}

export default function AberturaCC() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [showNovoTAPDialog, setShowNovoTAPDialog] = useState(false)
  const [selectedProposta, setSelectedProposta] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("aguardando")

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      aprovado: "bg-emerald-500",
      em_andamento: "bg-amber-500",
      pendente: "bg-slate-300",
      rejeitado: "bg-red-500",
    }
    return colors[status] || "bg-gray-500"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      aprovado: "Aprovado",
      em_andamento: "Em Andamento",
      pendente: "Pendente",
      rejeitado: "Rejeitado",
      aguardando_tap: "Aguardando TAP",
      tap_em_elaboracao: "TAP em Elaboração",
    }
    return labels[status] || status
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
                placeholder="Buscar centro de custo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
            <Dialog open={showNovoTAPDialog} onOpenChange={setShowNovoTAPDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 text-xs gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Novo TAP
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    Termo de Abertura do Projeto (TAP)
                  </DialogTitle>
                  <DialogDescription>
                    Crie o TAP para iniciar a abertura do Centro de Custo. Este documento formaliza o início do projeto.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-6 py-4">
                    {/* Selecao de Proposta */}
                    <div className="space-y-2">
                      <Label>Proposta de Origem</Label>
                      <Select value={selectedProposta || ""} onValueChange={setSelectedProposta}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a proposta ganha" />
                        </SelectTrigger>
                        <SelectContent>
                          {propostasGanhas.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.id} - {p.titulo} ({p.cliente})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dados basicos */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Código do Centro de Custo</Label>
                        <Input placeholder="CC-2026-XXX" disabled value="CC-2026-003" />
                        <p className="text-[10px] text-muted-foreground">Gerado automaticamente</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Nome do Projeto</Label>
                        <Input placeholder="Nome do projeto/obra" />
                      </div>
                    </div>

                    {/* Secoes do TAP */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-primary" />
                        <h3 className="font-medium text-sm">Seções do TAP</h3>
                      </div>

                      {tapTemplate.secoes.map((secao) => (
                        <div key={secao.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>{secao.nome}</Label>
                            {secao.obrigatorio && (
                              <Badge variant="outline" className="text-[10px] h-4">
                                Obrigatório
                              </Badge>
                            )}
                          </div>
                          <Textarea placeholder={`Descreva ${secao.nome.toLowerCase()}...`} className="min-h-[80px]" />
                        </div>
                      ))}
                    </div>

                    {/* Equipe inicial */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <h3 className="font-medium text-sm">Equipe Responsável</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Gerente de Contrato</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="joao">João Silva</SelectItem>
                              <SelectItem value="pedro">Pedro Alves</SelectItem>
                              <SelectItem value="carlos">Carlos Lima</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Coordenador Comercial</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maria">Maria Santos</SelectItem>
                              <SelectItem value="ana">Ana Paula</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Aprovadores */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <h3 className="font-medium text-sm">Fluxo de Aprovação</h3>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <Checkbox id="diretor" />
                          <Label htmlFor="diretor" className="text-sm">
                            Diretor Comercial (obrigatório)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <Checkbox id="financeiro" />
                          <Label htmlFor="financeiro" className="text-sm">
                            Diretor Financeiro (valores acima de R$ 50Mi)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <Checkbox id="presidencia" />
                          <Label htmlFor="presidencia" className="text-sm">
                            Presidência (valores acima de R$ 200Mi)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter className="border-t pt-4">
                  <Button variant="outline" onClick={() => setShowNovoTAPDialog(false)}>
                    Cancelar
                  </Button>
                  <Button variant="outline" className="gap-1.5 bg-transparent">
                    <FileText className="w-3.5 h-3.5" />
                    Salvar Rascunho
                  </Button>
                  <Button className="gap-1.5" onClick={() => setShowNovoTAPDialog(false)}>
                    <Send className="w-3.5 h-3.5" />
                    Enviar para Aprovação
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Explicacao do Fluxo */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-sm">Abertura de Centro de Custo</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fluxo completo: TAP aprovado → Cadastro de Responsáveis → Upload Planilha → Homologação Baseline →
                      Gate 1 → Passagem de Bastão para Obra
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Aprovado</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Em Andamento</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span>Pendente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metricas */}
            <div className="grid grid-cols-5 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{propostasGanhas.length}</p>
                    <p className="text-[10px] text-muted-foreground">Propostas Ganhas</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{ccEmAbertura.length}</p>
                    <p className="text-[10px] text-muted-foreground">CCs em Abertura</p>
                  </div>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {ccEmAbertura.filter((cc) => cc.etapas.tap.status === "aprovado").length}
                    </p>
                    <p className="text-[10px] text-muted-foreground">TAPs Aprovados</p>
                  </div>
                  <FileCheck className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {ccEmAbertura.filter((cc) => cc.etapas.baseline.status === "aprovado").length}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Baselines Homologadas</p>
                  </div>
                  <ClipboardList className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-[10px] text-muted-foreground">Prontos Gate 1</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-8">
                <TabsTrigger value="aguardando" className="text-xs h-6 px-3">
                  Aguardando TAP ({propostasGanhas.length})
                </TabsTrigger>
                <TabsTrigger value="em_abertura" className="text-xs h-6 px-3">
                  Em Abertura ({ccEmAbertura.length})
                </TabsTrigger>
                <TabsTrigger value="historico" className="text-xs h-6 px-3">
                  Histórico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="aguardando" className="mt-4">
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium">Propostas Ganhas - Aguardando TAP</CardTitle>
                    <CardDescription className="text-xs">
                      Propostas aprovadas que precisam de TAP para iniciar abertura de Centro de Custo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {propostasGanhas.map((proposta) => (
                        <div key={proposta.id} className="p-4 hover:bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-emerald-500/10">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs text-muted-foreground">{proposta.id}</span>
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-[10px]",
                                      proposta.status === "aguardando_tap"
                                        ? "text-amber-600 border-amber-300"
                                        : "text-blue-600 border-blue-300",
                                    )}
                                  >
                                    {getStatusLabel(proposta.status)}
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-sm mt-0.5">{proposta.titulo}</h4>
                                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Building2 className="w-3 h-3" />
                                    {proposta.cliente}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Aprovada em {new Date(proposta.dataAprovacao).toLocaleDateString("pt-BR")}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {proposta.responsavel}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="font-bold text-primary">{formatCurrency(proposta.valor)}</p>
                              </div>
                              <Button
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={() => {
                                  setSelectedProposta(proposta.id)
                                  setShowNovoTAPDialog(true)
                                }}
                              >
                                <ClipboardList className="w-3.5 h-3.5" />
                                Criar TAP
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="em_abertura" className="mt-4 space-y-4">
                {ccEmAbertura.map((cc) => (
                  <Card key={cc.id}>
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{cc.codigo}</span>
                            <Badge variant="outline" className="text-[10px]">
                              {cc.proposta}
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-medium mt-0.5">{cc.nome}</CardTitle>
                          <CardDescription className="text-xs flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {cc.cliente}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {formatCurrency(cc.valor)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Início: {new Date(cc.dataInicio).toLocaleDateString("pt-BR")}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-lg font-bold">{cc.progresso}%</p>
                            <p className="text-[10px] text-muted-foreground">Progresso</p>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
                            <Eye className="w-3.5 h-3.5" />
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4 px-4">
                      <Progress value={cc.progresso} className="h-2 mb-4" />

                      {/* Etapas */}
                      <div className="flex items-center justify-between">
                        {/* TAP */}
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              getStatusColor(cc.etapas.tap.status),
                            )}
                          >
                            <ClipboardList className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-medium">TAP</span>
                          <span className="text-[10px] text-muted-foreground">
                            {cc.etapas.tap.status === "aprovado" && cc.etapas.tap.data
                              ? new Date(cc.etapas.tap.data).toLocaleDateString("pt-BR")
                              : getStatusLabel(cc.etapas.tap.status)}
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-muted-foreground" />

                        {/* Responsaveis */}
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              getStatusColor(cc.etapas.responsaveis.status),
                            )}
                          >
                            <UserPlus className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-medium">Responsáveis</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getStatusLabel(cc.etapas.responsaveis.status)}
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-muted-foreground" />

                        {/* Planilha */}
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              getStatusColor(cc.etapas.planilha.status),
                            )}
                          >
                            <Upload className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-medium">Planilha</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getStatusLabel(cc.etapas.planilha.status)}
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-muted-foreground" />

                        {/* Baseline */}
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              getStatusColor(cc.etapas.baseline.status),
                            )}
                          >
                            <FileCheck className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-medium">Baseline</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getStatusLabel(cc.etapas.baseline.status)}
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-muted-foreground" />

                        {/* Gate 1 */}
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              getStatusColor(cc.etapas.gate1.status),
                            )}
                          >
                            <ShieldCheck className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-medium">Gate 1</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getStatusLabel(cc.etapas.gate1.status)}
                          </span>
                        </div>
                      </div>

                      {/* Info adicional */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>TAP: {cc.responsavelTAP}</span>
                          <span>Gerente: {cc.gerenteContrato}</span>
                        </div>
                        <div className="flex gap-2">
                          {cc.etapas.gate1.status === "pendente" && cc.etapas.baseline.status === "aprovado" && (
                            <Link href="/corporativo/gate1">
                              <Button size="sm" className="h-7 text-xs gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Solicitar Gate 1
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="historico" className="mt-4">
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium">Histórico de Aberturas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Histórico de Centros de Custo abertos anteriormente
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
