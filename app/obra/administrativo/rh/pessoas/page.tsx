"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  Ban,
  Download,
  MoreHorizontal,
  Eye,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Scale,
  ChevronRight,
  Edit,
  Lock,
  Unlock,
  UserMinus,
  History,
  Briefcase,
  Gift,
  Shield,
  Calendar,
  Stethoscope,
  FileWarning,
  Award,
  Percent,
  Home,
  UtensilsCrossed,
  Bus,
  Heart,
  Package,
  Check,
  X,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - COLABORADORES
// ============================================

const colaboradoresMock = [
  {
    id: "CLT-001",
    matricula: "CLT-001",
    nome: "Jose Silva Santos",
    cpf: "123.456.789-00",
    funcao: "Operador de Escavadeira",
    setor: "Producao",
    vinculo: "CLT",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: "15/02/2026",
  },
  {
    id: "CLT-002",
    matricula: "CLT-002",
    nome: "Maria Aparecida Costa",
    cpf: "234.567.890-11",
    funcao: "Engenheira Civil",
    setor: "Engenharia",
    vinculo: "CLT",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: "20/03/2026",
    asoVencer: null,
  },
  {
    id: "PJ-001",
    matricula: "PJ-001",
    nome: "Carlos Eduardo Lima",
    cpf: "345.678.901-22",
    funcao: "Consultor de Seguranca",
    setor: "SSMA",
    vinculo: "PJ",
    status: "Ativo",
    docStatus: "Pendente",
    riscoJuridico: true,
    feriasVencer: null,
    asoVencer: null,
  },
  {
    id: "TER-001",
    matricula: "TER-001",
    nome: "Ana Paula Ferreira",
    cpf: "456.789.012-33",
    funcao: "Motorista",
    setor: "Producao",
    vinculo: "Terceiro",
    status: "Afastado",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: "05/02/2026",
  },
  {
    id: "CLT-003",
    matricula: "CLT-003",
    nome: "Roberto Alves Souza",
    cpf: "567.890.123-44",
    funcao: "Pedreiro N2",
    setor: "Producao",
    vinculo: "CLT",
    status: "Bloqueado",
    docStatus: "Pendente",
    riscoJuridico: true,
    feriasVencer: null,
    asoVencer: "Vencido",
  },
  {
    id: "CLT-004",
    matricula: "CLT-004",
    nome: "Fernanda Oliveira",
    cpf: "678.901.234-55",
    funcao: "Analista Administrativo",
    setor: "Administrativo",
    vinculo: "CLT",
    status: "Ferias",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: null,
  },
  {
    id: "TER-002",
    matricula: "TER-002",
    nome: "Paulo Mendes",
    cpf: "789.012.345-66",
    funcao: "Eletricista",
    setor: "Producao",
    vinculo: "Terceiro",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: null,
  },
  {
    id: "CLT-005",
    matricula: "CLT-005",
    nome: "Juliana Santos",
    cpf: "890.123.456-77",
    funcao: "Almoxarife",
    setor: "Suprimentos",
    vinculo: "CLT",
    status: "Pendente",
    docStatus: "Pendente",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: null,
  },
]

// ============================================
// DADOS MOCKADOS - CARGOS & SALARIOS
// ============================================

const cargosMock = [
  {
    id: 1,
    codigo: "CARG-001",
    nome: "Pedreiro",
    classificacao: "Operacional",
    natureza: "Direto",
    niveis: [
      { nivel: "N1", salarioBase: 2200, elegivel: { vt: true, vr: true, cesta: true, premio: false } },
      { nivel: "N2", salarioBase: 2800, elegivel: { vt: true, vr: true, cesta: true, premio: true } },
      { nivel: "N3", salarioBase: 3500, elegivel: { vt: true, vr: true, cesta: true, premio: true } },
    ],
    ocupantes: 45,
    status: "Ativo",
  },
  {
    id: 2,
    codigo: "CARG-002",
    nome: "Operador de Maquinas",
    classificacao: "Operacional",
    natureza: "Direto",
    niveis: [
      { nivel: "N1", salarioBase: 3200, elegivel: { vt: true, vr: true, cesta: true, premio: false } },
      { nivel: "N2", salarioBase: 4000, elegivel: { vt: true, vr: true, cesta: true, premio: true } },
    ],
    ocupantes: 28,
    status: "Ativo",
  },
  {
    id: 3,
    codigo: "CARG-003",
    nome: "Engenheiro Civil",
    classificacao: "Tecnico",
    natureza: "Indireto",
    niveis: [
      { nivel: "Jr", salarioBase: 8500, elegivel: { vt: true, vr: true, cesta: false, premio: true } },
      { nivel: "Pl", salarioBase: 12000, elegivel: { vt: true, vr: true, cesta: false, premio: true } },
      { nivel: "Sr", salarioBase: 16000, elegivel: { vt: true, vr: true, cesta: false, premio: true } },
    ],
    ocupantes: 8,
    status: "Ativo",
  },
  {
    id: 4,
    codigo: "CARG-004",
    nome: "Analista Administrativo",
    classificacao: "Administrativo",
    natureza: "Indireto",
    niveis: [
      { nivel: "Jr", salarioBase: 3500, elegivel: { vt: true, vr: true, cesta: true, premio: false } },
      { nivel: "Pl", salarioBase: 5000, elegivel: { vt: true, vr: true, cesta: true, premio: true } },
    ],
    ocupantes: 12,
    status: "Ativo",
  },
]

// ============================================
// DADOS MOCKADOS - ENCARGOS & BENEFICIOS
// ============================================

const encargosMock = [
  { nome: "INSS Patronal", percentual: 20.0, base: "Folha Bruta", valor: 156000 },
  { nome: "FGTS", percentual: 8.0, base: "Folha Bruta", valor: 62400 },
  { nome: "RAT/SAT", percentual: 3.0, base: "Folha Bruta", valor: 23400 },
  { nome: "Terceiros (Sistema S)", percentual: 5.8, base: "Folha Bruta", valor: 45240 },
  { nome: "Provisao 13o", percentual: 8.33, base: "Folha Bruta", valor: 65000 },
  { nome: "Provisao Ferias", percentual: 11.11, base: "Folha Bruta", valor: 86700 },
]

const beneficiosMock = [
  { id: 1, nome: "Vale Transporte", icon: Bus, valorUnit: 220, colaboradores: 180, total: 39600, status: "Aplicado" },
  {
    id: 2,
    nome: "Vale Refeicao",
    icon: UtensilsCrossed,
    valorUnit: 35,
    colaboradores: 210,
    total: 154350,
    status: "Aplicado",
  },
  { id: 3, nome: "Cesta Basica", icon: Package, valorUnit: 180, colaboradores: 150, total: 27000, status: "Aplicado" },
  { id: 4, nome: "Alojamento", icon: Home, valorUnit: 450, colaboradores: 45, total: 20250, status: "Aplicado" },
  { id: 5, nome: "Plano Saude", icon: Heart, valorUnit: 380, colaboradores: 85, total: 32300, status: "Parcial" },
]

// ============================================
// DADOS MOCKADOS - PREMIOS & BONIFICACOES
// ============================================

const premiosMock = [
  {
    id: 1,
    codigo: "PREM-001",
    nome: "Hora-Premio Producao",
    tipo: "Variavel",
    natureza: "Por Desempenho",
    valorBase: 25,
    aplicacao: "Por Colaborador",
    status: "Ativo",
    ultimaAplicacao: "Jan/2026",
    colaboradores: 85,
    valorTotal: 42500,
  },
  {
    id: 2,
    codigo: "PREM-002",
    nome: "Bonus Assiduidade",
    tipo: "Fixo",
    natureza: "Por Meta",
    valorBase: 350,
    aplicacao: "Por Colaborador",
    status: "Ativo",
    ultimaAplicacao: "Jan/2026",
    colaboradores: 120,
    valorTotal: 42000,
  },
  {
    id: 3,
    codigo: "PREM-003",
    nome: "PLR Trimestral",
    tipo: "Variavel",
    natureza: "Por Resultado",
    valorBase: 0,
    aplicacao: "Por Obra",
    status: "Pendente",
    ultimaAplicacao: null,
    colaboradores: 0,
    valorTotal: 0,
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function PessoasContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVinculo, setFilterVinculo] = useState("todos")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [selectedColabs, setSelectedColabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("colaboradores")

  // Dialogs
  const [showDesligamento, setShowDesligamento] = useState(false)
  const [showDesligamentoLote, setShowDesligamentoLote] = useState(false)
  const [showNovoCargo, setShowNovoCargo] = useState(false)
  const [showNovoPremio, setShowNovoPremio] = useState(false)
  const [selectedColab, setSelectedColab] = useState<(typeof colaboradoresMock)[0] | null>(null)

  // Sheets
  const [showCargoSheet, setShowCargoSheet] = useState(false)
  const [selectedCargo, setSelectedCargo] = useState<(typeof cargosMock)[0] | null>(null)

  // Contadores
  const resumo = {
    total: 300,
    ativos: 265,
    afastados: 12,
    bloqueados: 6,
    pendentes: 8,
    docsPendentes: 15,
    asoVencer: 9,
    feriasVencer: 7,
  }

  // Filtrar colaboradores
  const colaboradoresFiltrados = colaboradoresMock.filter((c) => {
    if (
      searchTerm &&
      !c.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    if (filterVinculo !== "todos" && c.vinculo !== filterVinculo) return false
    if (filterStatus !== "todos" && c.status !== filterStatus) return false
    return true
  })

  // Selecao
  const toggleSelect = (id: string) => {
    setSelectedColabs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  const toggleSelectAll = () => {
    if (selectedColabs.length === colaboradoresFiltrados.length) {
      setSelectedColabs([])
    } else {
      setSelectedColabs(colaboradoresFiltrados.map((c) => c.id))
    }
  }

  // Helpers
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Ativo: "bg-green-500/20 text-green-400 border-green-500/30",
      Afastado: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Bloqueado: "bg-red-500/20 text-red-400 border-red-500/30",
      Ferias: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Pendente: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    }
    return <Badge className={styles[status] || ""}>{status}</Badge>
  }

  const getVinculoBadge = (vinculo: string) => {
    const styles: Record<string, string> = {
      CLT: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      PJ: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      Terceiro: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    }
    return (
      <Badge variant="outline" className={styles[vinculo] || ""}>
        {vinculo}
      </Badge>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  // Card click handler
  const handleCardClick = (filter: string) => {
    setActiveTab("colaboradores")
    switch (filter) {
      case "afastados":
        setFilterStatus("Afastado")
        break
      case "bloqueados":
        setFilterStatus("Bloqueado")
        break
      case "pendentes":
        setFilterStatus("Pendente")
        break
      default:
        setFilterStatus("todos")
    }
  }

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col">
        <RHNav modulo="obra" />

        <div className="flex-1 space-y-6 p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>RH</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Pessoas</span>
              </div>
              <h1 className="text-2xl font-bold">Pessoas</h1>
              <p className="text-sm text-muted-foreground">Gestao de colaboradores, cargos, beneficios e premios</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              {selectedColabs.length > 0 && (
                <Button variant="destructive" size="sm" onClick={() => setShowDesligamentoLote(true)}>
                  <UserMinus className="mr-2 h-4 w-4" />
                  Desligar Selecionados ({selectedColabs.length})
                </Button>
              )}
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Colaborador
              </Button>
            </div>
          </div>

          {/* Cards Resumo Operacional */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <Card
              className="bg-card/50 cursor-pointer hover:bg-card/80 transition-colors"
              onClick={() => handleCardClick("total")}
            >
              <CardContent className="p-3 text-center">
                <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xl font-bold">{resumo.total}</p>
                <p className="text-[10px] text-muted-foreground">Total Efetivo</p>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 cursor-pointer hover:bg-card/80 transition-colors"
              onClick={() => handleCardClick("ativos")}
            >
              <CardContent className="p-3 text-center">
                <UserCheck className="h-4 w-4 mx-auto mb-1 text-green-500" />
                <p className="text-xl font-bold text-green-500">{resumo.ativos}</p>
                <p className="text-[10px] text-muted-foreground">Ativos</p>
              </CardContent>
            </Card>
            <Card
              className="bg-yellow-500/10 border-yellow-500/30 cursor-pointer hover:bg-yellow-500/20 transition-colors"
              onClick={() => handleCardClick("afastados")}
            >
              <CardContent className="p-3 text-center">
                <UserX className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                <p className="text-xl font-bold text-yellow-500">{resumo.afastados}</p>
                <p className="text-[10px] text-yellow-400">Afastados</p>
              </CardContent>
            </Card>
            <Card
              className="bg-red-500/10 border-red-500/30 cursor-pointer hover:bg-red-500/20 transition-colors"
              onClick={() => handleCardClick("bloqueados")}
            >
              <CardContent className="p-3 text-center">
                <Ban className="h-4 w-4 mx-auto mb-1 text-red-500" />
                <p className="text-xl font-bold text-red-500">{resumo.bloqueados}</p>
                <p className="text-[10px] text-red-400">Bloqueados</p>
              </CardContent>
            </Card>
            <Card
              className="bg-orange-500/10 border-orange-500/30 cursor-pointer hover:bg-orange-500/20 transition-colors"
              onClick={() => handleCardClick("pendentes")}
            >
              <CardContent className="p-3 text-center">
                <Clock className="h-4 w-4 mx-auto mb-1 text-orange-500" />
                <p className="text-xl font-bold text-orange-500">{resumo.pendentes}</p>
                <p className="text-[10px] text-orange-400">Pend. Efetivacao</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 cursor-pointer hover:bg-card/80 transition-colors">
              <CardContent className="p-3 text-center">
                <FileWarning className="h-4 w-4 mx-auto mb-1 text-amber-500" />
                <p className="text-xl font-bold">{resumo.docsPendentes}</p>
                <p className="text-[10px] text-muted-foreground">Docs Pendentes</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 cursor-pointer hover:bg-card/80 transition-colors">
              <CardContent className="p-3 text-center">
                <Stethoscope className="h-4 w-4 mx-auto mb-1 text-pink-500" />
                <p className="text-xl font-bold">{resumo.asoVencer}</p>
                <p className="text-[10px] text-muted-foreground">ASO a Vencer</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 cursor-pointer hover:bg-card/80 transition-colors">
              <CardContent className="p-3 text-center">
                <Calendar className="h-4 w-4 mx-auto mb-1 text-cyan-500" />
                <p className="text-xl font-bold">{resumo.feriasVencer}</p>
                <p className="text-[10px] text-muted-foreground">Ferias a Vencer</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Subnavegacao */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="colaboradores" className="gap-2">
                <Users className="h-4 w-4" />
                Colaboradores
              </TabsTrigger>
              <TabsTrigger value="cargos" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Cargos & Salarios
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="gap-2">
                <Shield className="h-4 w-4" />
                Encargos & Beneficios
              </TabsTrigger>
              <TabsTrigger value="premios" className="gap-2">
                <Award className="h-4 w-4" />
                Premios & Bonificacoes
              </TabsTrigger>
            </TabsList>

            {/* TAB COLABORADORES */}
            <TabsContent value="colaboradores" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-base font-medium">Lista de Colaboradores</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar nome ou matricula..."
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select value={filterVinculo} onValueChange={setFilterVinculo}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Vinculo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="CLT">CLT</SelectItem>
                          <SelectItem value="PJ">PJ</SelectItem>
                          <SelectItem value="Terceiro">Terceiro</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Afastado">Afastado</SelectItem>
                          <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                          <SelectItem value="Ferias">Ferias</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              selectedColabs.length === colaboradoresFiltrados.length &&
                              colaboradoresFiltrados.length > 0
                            }
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Matricula</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Funcao</TableHead>
                        <TableHead>Setor</TableHead>
                        <TableHead>Vinculo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Docs</TableHead>
                        <TableHead className="text-center">Juridico</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {colaboradoresFiltrados.map((colab) => (
                        <TableRow key={colab.id} className={selectedColabs.includes(colab.id) ? "bg-primary/5" : ""}>
                          <TableCell>
                            <Checkbox
                              checked={selectedColabs.includes(colab.id)}
                              onCheckedChange={() => toggleSelect(colab.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-xs">{colab.matricula}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{colab.nome}</p>
                              <p className="text-xs text-muted-foreground">{colab.cpf}</p>
                            </div>
                          </TableCell>
                          <TableCell>{colab.funcao}</TableCell>
                          <TableCell>{colab.setor}</TableCell>
                          <TableCell>{getVinculoBadge(colab.vinculo)}</TableCell>
                          <TableCell>{getStatusBadge(colab.status)}</TableCell>
                          <TableCell className="text-center">
                            <Tooltip>
                              <TooltipTrigger>
                                {colab.docStatus === "OK" ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-red-500 mx-auto" />
                                )}
                              </TooltipTrigger>
                              <TooltipContent>
                                {colab.docStatus === "OK" ? "Documentacao OK" : "Documentos pendentes"}
                                {colab.asoVencer && <p className="text-yellow-400">ASO: {colab.asoVencer}</p>}
                                {colab.feriasVencer && <p className="text-cyan-400">Ferias: {colab.feriasVencer}</p>}
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="text-center">
                            {colab.riscoJuridico && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Scale className="h-4 w-4 text-orange-500 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent>Risco juridico identificado</TooltipContent>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/obra/administrativo/rh/colaborador/${colab.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Ver Prontuario
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {colab.status === "Bloqueado" ? (
                                  <DropdownMenuItem>
                                    <Unlock className="mr-2 h-4 w-4" />
                                    Desbloquear
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Bloquear
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-red-500"
                                  onClick={() => {
                                    setSelectedColab(colab)
                                    setShowDesligamento(true)
                                  }}
                                >
                                  <UserMinus className="mr-2 h-4 w-4" />
                                  Iniciar Desligamento
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <History className="mr-2 h-4 w-4" />
                                  Historico
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB CARGOS & SALARIOS */}
            <TabsContent value="cargos" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">Estrutura de Cargos</CardTitle>
                      <CardDescription>Cargos, niveis e faixas salariais</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setShowNovoCargo(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Cargo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Codigo</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Classificacao</TableHead>
                        <TableHead>Natureza</TableHead>
                        <TableHead>Niveis</TableHead>
                        <TableHead className="text-right">Faixa Salarial</TableHead>
                        <TableHead className="text-center">Ocupantes</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cargosMock.map((cargo) => (
                        <TableRow key={cargo.id}>
                          <TableCell className="font-mono text-xs">{cargo.codigo}</TableCell>
                          <TableCell className="font-medium">{cargo.nome}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{cargo.classificacao}</Badge>
                          </TableCell>
                          <TableCell>{cargo.natureza}</TableCell>
                          <TableCell>{cargo.niveis.length} niveis</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(cargo.niveis[0].salarioBase)} -{" "}
                            {formatCurrency(cargo.niveis[cargo.niveis.length - 1].salarioBase)}
                          </TableCell>
                          <TableCell className="text-center">{cargo.ocupantes}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500/20 text-green-400">{cargo.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedCargo(cargo)
                                setShowCargoSheet(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB ENCARGOS & BENEFICIOS */}
            <TabsContent value="beneficios" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Encargos */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Composicao de Encargos
                    </CardTitle>
                    <CardDescription>Encargos trabalhistas sobre a folha</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Encargo</TableHead>
                          <TableHead className="text-right">%</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {encargosMock.map((enc, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{enc.nome}</TableCell>
                            <TableCell className="text-right">{enc.percentual}%</TableCell>
                            <TableCell className="text-right">{formatCurrency(enc.valor)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>TOTAL ENCARGOS</TableCell>
                          <TableCell className="text-right">56.24%</TableCell>
                          <TableCell className="text-right">{formatCurrency(438740)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Beneficios */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      Beneficios da Obra
                    </CardTitle>
                    <CardDescription>Beneficios aplicados aos colaboradores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Beneficio</TableHead>
                          <TableHead className="text-right">Valor Unit.</TableHead>
                          <TableHead className="text-center">Colabs</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {beneficiosMock.map((ben) => (
                          <TableRow key={ben.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <ben.icon className="h-4 w-4 text-muted-foreground" />
                                {ben.nome}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(ben.valorUnit)}</TableCell>
                            <TableCell className="text-center">{ben.colaboradores}</TableCell>
                            <TableCell className="text-right">{formatCurrency(ben.total)}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  ben.status === "Aplicado"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                }
                              >
                                {ben.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell colSpan={3}>TOTAL BENEFICIOS</TableCell>
                          <TableCell className="text-right">{formatCurrency(273500)}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB PREMIOS & BONIFICACOES */}
            <TabsContent value="premios" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">Premios & Bonificacoes</CardTitle>
                      <CardDescription>Regras de premios e aplicacoes</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setShowNovoPremio(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Premio
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Codigo</TableHead>
                        <TableHead>Premio</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Natureza</TableHead>
                        <TableHead className="text-right">Valor Base</TableHead>
                        <TableHead>Aplicacao</TableHead>
                        <TableHead className="text-center">Colabs</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {premiosMock.map((premio) => (
                        <TableRow key={premio.id}>
                          <TableCell className="font-mono text-xs">{premio.codigo}</TableCell>
                          <TableCell className="font-medium">{premio.nome}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{premio.tipo}</Badge>
                          </TableCell>
                          <TableCell>{premio.natureza}</TableCell>
                          <TableCell className="text-right">
                            {premio.valorBase > 0 ? formatCurrency(premio.valorBase) : "-"}
                          </TableCell>
                          <TableCell>{premio.aplicacao}</TableCell>
                          <TableCell className="text-center">{premio.colaboradores || "-"}</TableCell>
                          <TableCell className="text-right">
                            {premio.valorTotal > 0 ? formatCurrency(premio.valorTotal) : "-"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                premio.status === "Ativo"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            >
                              {premio.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* DIALOG DESLIGAMENTO PONTUAL */}
        <Dialog open={showDesligamento} onOpenChange={setShowDesligamento}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <UserMinus className="h-5 w-5" />
                Iniciar Desligamento
              </DialogTitle>
              <DialogDescription>
                {selectedColab && `Colaborador: ${selectedColab.nome} (${selectedColab.matricula})`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Motivo do Desligamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pedido">Pedido de Demissao</SelectItem>
                    <SelectItem value="sem_justa">Demissao sem Justa Causa</SelectItem>
                    <SelectItem value="justa">Demissao por Justa Causa</SelectItem>
                    <SelectItem value="fim_contrato">Fim de Contrato</SelectItem>
                    <SelectItem value="fim_obra">Fim de Obra</SelectItem>
                    <SelectItem value="acordo">Acordo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data do Desligamento</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Observacoes</Label>
                <Textarea placeholder="Informacoes adicionais..." />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Checklist de Desligamento</Label>
                <div className="space-y-2 rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="check1" />
                    <label htmlFor="check1" className="text-sm">
                      Documentacao entregue
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check2" />
                    <label htmlFor="check2" className="text-sm">
                      EPIs devolvidos
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check3" />
                    <label htmlFor="check3" className="text-sm">
                      Pendencias financeiras verificadas
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check4" />
                    <label htmlFor="check4" className="text-sm">
                      Exame demissional agendado
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDesligamento(false)}>
                Cancelar
              </Button>
              <Button variant="destructive">Iniciar Workflow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* DIALOG DESLIGAMENTO EM LOTE */}
        <Dialog open={showDesligamentoLote} onOpenChange={setShowDesligamentoLote}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <UserMinus className="h-5 w-5" />
                Desligamento em Lote
              </DialogTitle>
              <DialogDescription>{selectedColabs.length} colaboradores selecionados</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="max-h-40 overflow-y-auto rounded-lg border p-3">
                {selectedColabs.map((id) => {
                  const colab = colaboradoresMock.find((c) => c.id === id)
                  return (
                    colab && (
                      <div key={id} className="flex items-center justify-between py-1 text-sm">
                        <span>{colab.nome}</span>
                        <Badge variant="outline">{colab.matricula}</Badge>
                      </div>
                    )
                  )
                })}
              </div>
              <div className="space-y-2">
                <Label>Motivo Padrao</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fim_obra">Fim de Obra</SelectItem>
                    <SelectItem value="reducao">Reducao de Quadro</SelectItem>
                    <SelectItem value="sem_justa">Demissao sem Justa Causa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data Padrao</Label>
                <Input type="date" />
              </div>
              <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3">
                <p className="text-sm text-yellow-400">
                  <AlertTriangle className="inline h-4 w-4 mr-1" />
                  Acao em massa. Cada colaborador entrara no workflow individual de desligamento.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDesligamentoLote(false)}>
                Cancelar
              </Button>
              <Button variant="destructive">Iniciar Desligamentos</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* SHEET DETALHE CARGO */}
        <Sheet open={showCargoSheet} onOpenChange={setShowCargoSheet}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>{selectedCargo?.nome}</SheetTitle>
              <SheetDescription>{selectedCargo?.codigo}</SheetDescription>
            </SheetHeader>
            {selectedCargo && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Classificacao</p>
                    <p className="font-medium">{selectedCargo.classificacao}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Natureza</p>
                    <p className="font-medium">{selectedCargo.natureza}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ocupantes</p>
                    <p className="font-medium">{selectedCargo.ocupantes}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge className="bg-green-500/20 text-green-400">{selectedCargo.status}</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Niveis e Faixas Salariais</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nivel</TableHead>
                        <TableHead className="text-right">Salario</TableHead>
                        <TableHead className="text-center">VT</TableHead>
                        <TableHead className="text-center">VR</TableHead>
                        <TableHead className="text-center">Cesta</TableHead>
                        <TableHead className="text-center">Premio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedCargo.niveis.map((nivel, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{nivel.nivel}</TableCell>
                          <TableCell className="text-right">{formatCurrency(nivel.salarioBase)}</TableCell>
                          <TableCell className="text-center">
                            {nivel.elegivel.vt ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {nivel.elegivel.vr ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {nivel.elegivel.cesta ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {nivel.elegivel.premio ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <History className="mr-2 h-4 w-4" />
                    Historico
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}

export default function PessoasPage() {
  return (
    <Suspense fallback={null}>
      <PessoasContent />
    </Suspense>
  )
}
