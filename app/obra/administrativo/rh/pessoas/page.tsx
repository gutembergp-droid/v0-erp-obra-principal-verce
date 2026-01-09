"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
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
  TrendingUp,
  DollarSign,
  FileText,
  Activity,
  Target,
  Zap,
  Info,
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
    efetivo: "Direto",
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
    efetivo: "Indireto",
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
    efetivo: "Indireto",
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
    efetivo: "Direto",
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
    efetivo: "Direto",
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
    efetivo: "Indireto",
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
    efetivo: "Direto",
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
    efetivo: "Indireto",
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

const cargosOristaMock = [
  { cargo: "Servente", nivel: "Unico", valorOrcado: 12.5, valorAtual: 13.2, desvio: 5.6 },
  { cargo: "Pedreiro", nivel: "N1", valorOrcado: 18.0, valorAtual: 18.5, desvio: 2.8 },
  { cargo: "Pedreiro", nivel: "N2", valorOrcado: 22.0, valorAtual: 23.8, desvio: 8.2 },
  { cargo: "Carpinteiro", nivel: "N1", valorOrcado: 19.0, valorAtual: 19.0, desvio: 0.0 },
  { cargo: "Carpinteiro", nivel: "N2", valorOrcado: 24.0, valorAtual: 26.5, desvio: 10.4 },
  { cargo: "Armador", nivel: "N1", valorOrcado: 20.0, valorAtual: 21.0, desvio: 5.0 },
  { cargo: "Operador Escavadeira", nivel: "N2", valorOrcado: 35.0, valorAtual: 38.0, desvio: 8.6 },
]

const cargosMensalistaMock = [
  { cargo: "Engenheiro Civil", nivel: "Jr", valorOrcado: 8500, valorAtual: 8800, desvio: 3.5 },
  { cargo: "Engenheiro Civil", nivel: "Pl", valorOrcado: 12000, valorAtual: 12500, desvio: 4.2 },
  { cargo: "Engenheiro Civil", nivel: "Sr", valorOrcado: 16000, valorAtual: 17200, desvio: 7.5 },
  { cargo: "Tecnico Seguranca", nivel: "Unico", valorOrcado: 5500, valorAtual: 5800, desvio: 5.5 },
  { cargo: "Analista Administrativo", nivel: "Jr", valorOrcado: 3500, valorAtual: 3600, desvio: 2.9 },
  { cargo: "Analista Administrativo", nivel: "Pl", valorOrcado: 5000, valorAtual: 5200, desvio: 4.0 },
  { cargo: "Almoxarife", nivel: "Unico", valorOrcado: 3200, valorAtual: 3400, desvio: 6.3 },
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
  {
    id: 1,
    nome: "Vale Transporte",
    icon: Bus,
    valorUnit: 220,
    colaboradores: 180,
    total: 39600,
    aplicacao: "Todos CLT",
    elegibilidade: "Todos",
  },
  {
    id: 2,
    nome: "Vale Refeicao",
    icon: UtensilsCrossed,
    valorUnit: 35,
    colaboradores: 210,
    total: 154350,
    aplicacao: "Todos",
    elegibilidade: "Direto + Indireto",
  },
  {
    id: 3,
    nome: "Cesta Basica",
    icon: Package,
    valorUnit: 180,
    colaboradores: 150,
    total: 27000,
    aplicacao: "Oristas",
    elegibilidade: "Direto",
  },
  {
    id: 4,
    nome: "Alojamento",
    icon: Home,
    valorUnit: 450,
    colaboradores: 45,
    total: 20250,
    aplicacao: "Por Cargo",
    elegibilidade: "Producao",
  },
  {
    id: 5,
    nome: "Plano Saude",
    icon: Heart,
    valorUnit: 380,
    colaboradores: 85,
    total: 32300,
    aplicacao: "Mensalistas",
    elegibilidade: "Indireto",
  },
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
  const [filterEfetivo, setFilterEfetivo] = useState("todos")
  const [selectedColabs, setSelectedColabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("colaboradores")

  // Dialogs
  const [showDesligamento, setShowDesligamento] = useState(false)
  const [showDesligamentoLote, setShowDesligamentoLote] = useState(false)
  const [showNovoBeneficio, setShowNovoBeneficio] = useState(false)
  const [showNovoPremio, setShowNovoPremio] = useState(false)
  const [selectedColab, setSelectedColab] = useState<(typeof colaboradoresMock)[0] | null>(null)

  // Sheets
  const [showCargoSheet, setShowCargoSheet] = useState(false)

  // Contadores
  const resumo = {
    total: 300,
    diretos: 240,
    indiretos: 60,
    ativos: 265,
    afastados: 12,
    afastadosMedico: 8,
    afastadosAcidente: 4,
    bloqueados: 6,
    bloqueadosDocs: 4,
    bloqueadosJuridico: 2,
    pendentes: 8,
    docsPendentes: 15,
    asoVencer: 9,
    feriasVencer: 7,
    capacidade: 85,
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
    if (filterEfetivo !== "todos" && c.efetivo !== filterEfetivo) return false
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
    setFilterStatus("todos")
    setFilterVinculo("todos")
    setFilterEfetivo("todos")
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
      case "diretos":
        setFilterEfetivo("Direto")
        break
      case "indiretos":
        setFilterEfetivo("Indireto")
        break
      default:
        break
    }
  }

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col">
        <RHNav modulo="obra" />

        <div className="flex-1 space-y-6 p-6">
          {/* Header com Titulo e Subnavegacao alinhados */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="inline-flex h-10 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-auto">
                <TabsTrigger value="colaboradores" className="gap-2 px-4">
                  <Users className="h-4 w-4" />
                  Colaboradores
                </TabsTrigger>
                <TabsTrigger value="cargos" className="gap-2 px-4">
                  <Briefcase className="h-4 w-4" />
                  Cargos & Salarios
                </TabsTrigger>
                <TabsTrigger value="beneficios" className="gap-2 px-4">
                  <Shield className="h-4 w-4" />
                  Encargos & Beneficios
                </TabsTrigger>
                <TabsTrigger value="premios" className="gap-2 px-4">
                  <Award className="h-4 w-4" />
                  Premios & Bonificacoes
                </TabsTrigger>
              </TabsList>

              {/* TAB COLABORADORES */}
              <TabsContent value="colaboradores" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1 - Total de Efetivo */}
                  <Card
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleCardClick("total")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Total de Efetivo
                          </p>
                          <p className="text-3xl font-bold mt-1">{resumo.total}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCardClick("diretos")
                            }}
                            className="hover:text-primary"
                          >
                            <span className="text-muted-foreground">Diretos:</span>{" "}
                            <span className="font-medium">{resumo.diretos}</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCardClick("indiretos")
                            }}
                            className="hover:text-primary"
                          >
                            <span className="text-muted-foreground">Indiretos:</span>{" "}
                            <span className="font-medium">{resumo.indiretos}</span>
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Capacidade</span>
                            <span>{resumo.capacidade}%</span>
                          </div>
                          <Progress value={resumo.capacidade} className="h-1.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 2 - Status Operacional */}
                  <Card
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleCardClick("ativos")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Status Operacional
                          </p>
                          <p className="text-3xl font-bold mt-1 text-green-500">{resumo.ativos}</p>
                          <p className="text-xs text-muted-foreground">ativos</p>
                        </div>
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <UserCheck className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCardClick("afastados")
                          }}
                          className="flex justify-between w-full text-sm hover:text-yellow-500"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            Afastados
                          </span>
                          <span className="font-medium">{resumo.afastados}</span>
                        </button>
                        <div className="pl-4 text-xs text-muted-foreground space-y-0.5">
                          <div className="flex justify-between">
                            <span>Medico</span>
                            <span>{resumo.afastadosMedico}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Acidente</span>
                            <span>{resumo.afastadosAcidente}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCardClick("bloqueados")
                          }}
                          className="flex justify-between w-full text-sm hover:text-red-500"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Bloqueados
                          </span>
                          <span className="font-medium">{resumo.bloqueados}</span>
                        </button>
                        <div className="pl-4 text-xs text-muted-foreground space-y-0.5">
                          <div className="flex justify-between">
                            <span>Docs</span>
                            <span>{resumo.bloqueadosDocs}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Juridico</span>
                            <span>{resumo.bloqueadosJuridico}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 3 - Pendencias */}
                  <Card
                    className="cursor-pointer hover:bg-muted/50 transition-colors border-orange-500/30"
                    onClick={() => handleCardClick("pendentes")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Pendencias
                          </p>
                          <p className="text-3xl font-bold mt-1 text-orange-500">
                            {resumo.pendentes + resumo.docsPendentes}
                          </p>
                          <p className="text-xs text-muted-foreground">itens pendentes</p>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500/10">
                          <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            <UserX className="h-3.5 w-3.5 text-orange-500" />
                            Pend. Efetivacao
                          </span>
                          <span className="font-medium text-orange-500">{resumo.pendentes}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            <FileWarning className="h-3.5 w-3.5 text-amber-500" />
                            Docs Pendentes
                          </span>
                          <span className="font-medium text-amber-500">{resumo.docsPendentes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-orange-400 mt-2">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Requer acao imediata</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 4 - Vencimentos Proximos */}
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Vencimentos Proximos
                          </p>
                          <p className="text-3xl font-bold mt-1">{resumo.asoVencer + resumo.feriasVencer}</p>
                          <p className="text-xs text-muted-foreground">nos proximos 30 dias</p>
                        </div>
                        <div className="p-2 rounded-lg bg-pink-500/10">
                          <Calendar className="h-5 w-5 text-pink-500" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            <Stethoscope className="h-3.5 w-3.5 text-pink-500" />
                            ASO a Vencer
                          </span>
                          <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/30">
                            {resumo.asoVencer}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                            Ferias a Vencer
                          </span>
                          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                            {resumo.feriasVencer}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <Info className="h-3 w-3" />
                          <span>Clique para ver detalhes</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela de Colaboradores */}
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
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Vinculo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="CLT">CLT</SelectItem>
                            <SelectItem value="PJ">PJ</SelectItem>
                            <SelectItem value="Terceiro">Terceiro</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={filterEfetivo} onValueChange={setFilterEfetivo}>
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Efetivo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="Direto">Direto</SelectItem>
                            <SelectItem value="Indireto">Indireto</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-28">
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
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead className="w-10">
                            <Checkbox
                              checked={
                                selectedColabs.length === colaboradoresFiltrados.length &&
                                colaboradoresFiltrados.length > 0
                              }
                              onCheckedChange={toggleSelectAll}
                            />
                          </TableHead>
                          <TableHead className="w-28">Matricula</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Funcao</TableHead>
                          <TableHead>Setor</TableHead>
                          <TableHead className="text-center">Vinculo</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-center">Docs</TableHead>
                          <TableHead className="text-center">Juridico</TableHead>
                          <TableHead className="text-right">Acoes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {colaboradoresFiltrados.map((colab) => (
                          <TableRow key={colab.id} className={selectedColabs.includes(colab.id) ? "bg-muted/50" : ""}>
                            <TableCell>
                              <Checkbox
                                checked={selectedColabs.includes(colab.id)}
                                onCheckedChange={() => toggleSelect(colab.id)}
                              />
                            </TableCell>
                            <TableCell className="font-mono text-xs">{colab.matricula}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{colab.nome}</span>
                                {/* Tooltips para vencimentos */}
                                {colab.feriasVencer && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Ferias vencem em {colab.feriasVencer}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                {colab.asoVencer && colab.asoVencer !== "Vencido" && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Stethoscope className="h-3.5 w-3.5 text-pink-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>ASO vence em {colab.asoVencer}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                {colab.asoVencer === "Vencido" && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-red-500">ASO VENCIDO</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{colab.funcao}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{colab.setor}</TableCell>
                            <TableCell className="text-center">{getVinculoBadge(colab.vinculo)}</TableCell>
                            <TableCell className="text-center">{getStatusBadge(colab.status)}</TableCell>
                            <TableCell className="text-center">
                              {colab.docStatus === "OK" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-500 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {colab.riscoJuridico ? (
                                <Scale className="h-4 w-4 text-red-500 mx-auto" />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/obra/administrativo/rh/colaborador/${colab.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Prontuario
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    {colab.status === "Bloqueado" ? (
                                      <>
                                        <Unlock className="mr-2 h-4 w-4" />
                                        Desbloquear
                                      </>
                                    ) : (
                                      <>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Bloquear
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() => {
                                      setSelectedColab(colab)
                                      setShowDesligamento(true)
                                    }}
                                  >
                                    <UserMinus className="mr-2 h-4 w-4" />
                                    Desligamento
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
                  <CardFooter className="border-t py-3">
                    <p className="text-sm text-muted-foreground">
                      Exibindo {colaboradoresFiltrados.length} de {colaboradoresMock.length} colaboradores
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* TAB CARGOS & SALARIOS */}
              <TabsContent value="cargos" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Media Salarial</p>
                          <p className="text-2xl font-bold mt-1">R$ 4.850</p>
                          <p className="text-xs text-muted-foreground">orcado: R$ 4.650</p>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <DollarSign className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-amber-500">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>4.3% acima</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Desvio Medio</p>
                          <p className="text-2xl font-bold mt-1 text-amber-500">5.2%</p>
                          <p className="text-xs text-muted-foreground">da tabela orcada</p>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-500/10">
                          <Percent className="h-5 w-5 text-amber-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-amber-500">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Atencao</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Maior Distorcao</p>
                          <p className="text-2xl font-bold mt-1 text-red-500">10.4%</p>
                          <p className="text-xs text-muted-foreground">Carpinteiro N2</p>
                        </div>
                        <div className="p-2 rounded-lg bg-red-500/10">
                          <Target className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-500">
                        <Scale className="h-3.5 w-3.5" />
                        <span>Risco juridico</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Impacto Financeiro</p>
                          <p className="text-2xl font-bold mt-1">R$ 45.8k</p>
                          <p className="text-xs text-muted-foreground">mensal sobre orcado</p>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <Activity className="h-5 w-5 text-purple-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>+2.1% vs mes anterior</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela Oristas */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">Oristas (Producao)</CardTitle>
                        <CardDescription>Valores por hora trabalhada</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Manual de Cargos
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>Cargo</TableHead>
                          <TableHead>Nivel</TableHead>
                          <TableHead className="text-right">Valor Orcado (R$/h)</TableHead>
                          <TableHead className="text-right">Valor Atual (R$/h)</TableHead>
                          <TableHead className="text-right">Desvio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cargosOristaMock.map((cargo, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{cargo.cargo}</TableCell>
                            <TableCell>{cargo.nivel}</TableCell>
                            <TableCell className="text-right font-mono">{cargo.valorOrcado.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-mono">{cargo.valorAtual.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="outline"
                                className={
                                  cargo.desvio === 0
                                    ? "bg-green-500/10 text-green-500"
                                    : cargo.desvio <= 5
                                      ? "bg-yellow-500/10 text-yellow-500"
                                      : "bg-red-500/10 text-red-500"
                                }
                              >
                                {cargo.desvio > 0 ? "+" : ""}
                                {cargo.desvio.toFixed(1)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Tabela Mensalistas */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium">Mensalistas (Administrativo/Tecnico)</CardTitle>
                    <CardDescription>Valores mensais</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>Cargo</TableHead>
                          <TableHead>Nivel</TableHead>
                          <TableHead className="text-right">Valor Orcado</TableHead>
                          <TableHead className="text-right">Valor Atual</TableHead>
                          <TableHead className="text-right">Desvio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cargosMensalistaMock.map((cargo, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{cargo.cargo}</TableCell>
                            <TableCell>{cargo.nivel}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(cargo.valorOrcado)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(cargo.valorAtual)}</TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="outline"
                                className={
                                  cargo.desvio === 0
                                    ? "bg-green-500/10 text-green-500"
                                    : cargo.desvio <= 5
                                      ? "bg-yellow-500/10 text-yellow-500"
                                      : "bg-red-500/10 text-red-500"
                                }
                              >
                                {cargo.desvio > 0 ? "+" : ""}
                                {cargo.desvio.toFixed(1)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB ENCARGOS & BENEFICIOS */}
              <TabsContent value="beneficios" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Encargos sobre Folha</p>
                          <p className="text-2xl font-bold mt-1">56.2%</p>
                          <p className="text-xs text-muted-foreground">{formatCurrency(438740)}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Percent className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Beneficios</p>
                          <p className="text-2xl font-bold mt-1">12.8%</p>
                          <p className="text-xs text-muted-foreground">{formatCurrency(273500)}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Gift className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Impacto no Custo Total</p>
                          <p className="text-2xl font-bold mt-1">69.0%</p>
                          <p className="text-xs text-muted-foreground">sobre folha bruta</p>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <Activity className="h-5 w-5 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela Encargos */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium">Encargos Trabalhistas</CardTitle>
                    <CardDescription>Composicao dos encargos sobre a folha</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>Encargo</TableHead>
                          <TableHead className="text-center">Percentual</TableHead>
                          <TableHead>Base</TableHead>
                          <TableHead className="text-right">Valor Mensal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {encargosMock.map((enc, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{enc.nome}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{enc.percentual.toFixed(2)}%</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{enc.base}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(enc.valor)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-medium">
                          <TableCell colSpan={3}>Total Encargos</TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(encargosMock.reduce((acc, e) => acc + e.valor, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Tabela Beneficios */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">Beneficios da Obra</CardTitle>
                        <CardDescription>Beneficios concedidos aos colaboradores</CardDescription>
                      </div>
                      <Button size="sm" onClick={() => setShowNovoBeneficio(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Beneficio
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>Beneficio</TableHead>
                          <TableHead className="text-right">Valor Unit.</TableHead>
                          <TableHead className="text-center">Colaboradores</TableHead>
                          <TableHead>Aplicacao</TableHead>
                          <TableHead>Elegibilidade</TableHead>
                          <TableHead className="text-right">Total Mensal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {beneficiosMock.map((ben) => (
                          <TableRow key={ben.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <ben.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{ben.nome}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(ben.valorUnit)}</TableCell>
                            <TableCell className="text-center">{ben.colaboradores}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{ben.aplicacao}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{ben.elegibilidade}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(ben.total)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-medium">
                          <TableCell colSpan={5}>Total Beneficios</TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(beneficiosMock.reduce((acc, b) => acc + b.total, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB PREMIOS & BONIFICACOES */}
              <TabsContent value="premios" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Total Pago no Periodo</p>
                          <p className="text-2xl font-bold mt-1">{formatCurrency(84500)}</p>
                          <p className="text-xs text-muted-foreground">Jan/2026</p>
                        </div>
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Award className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">% da Folha</p>
                          <p className="text-2xl font-bold mt-1">10.8%</p>
                          <p className="text-xs text-muted-foreground">sobre folha bruta</p>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Percent className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Acumulado no Ano</p>
                          <p className="text-2xl font-bold mt-1">{formatCurrency(84500)}</p>
                          <p className="text-xs text-muted-foreground">1 mes</p>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <TrendingUp className="h-5 w-5 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alerta */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
                  <Scale className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-500">Atencao: Premio ≠ Reajuste Salarial</p>
                    <p className="text-sm text-muted-foreground">
                      Premios sao pagamentos extraordinarios e nao incorporam ao salario base. Pagamentos recorrentes
                      podem caracterizar natureza salarial.
                    </p>
                  </div>
                </div>

                {/* Tabela Premios */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">Regras de Premios</CardTitle>
                        <CardDescription>Premios e bonificacoes configurados para esta obra</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Zap className="mr-2 h-4 w-4" />
                          Simular Impacto
                        </Button>
                        <Button size="sm" onClick={() => setShowNovoPremio(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Novo Premio
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>Codigo</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Natureza</TableHead>
                          <TableHead className="text-right">Valor Base</TableHead>
                          <TableHead className="text-center">Colaboradores</TableHead>
                          <TableHead className="text-right">Valor Total</TableHead>
                          <TableHead className="text-center">Status</TableHead>
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
                            <TableCell className="text-muted-foreground">{premio.natureza}</TableCell>
                            <TableCell className="text-right font-mono">
                              {premio.valorBase > 0 ? formatCurrency(premio.valorBase) : "-"}
                            </TableCell>
                            <TableCell className="text-center">{premio.colaboradores || "-"}</TableCell>
                            <TableCell className="text-right font-mono">
                              {premio.valorTotal > 0 ? formatCurrency(premio.valorTotal) : "-"}
                            </TableCell>
                            <TableCell className="text-center">
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
        </div>

        {/* Dialog Desligamento Individual */}
        <Dialog open={showDesligamento} onOpenChange={setShowDesligamento}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Desligamento</DialogTitle>
              <DialogDescription>
                Voce esta prestes a iniciar o processo de desligamento de {selectedColab?.nome}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Motivo do Desligamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pedido">Pedido de demissao</SelectItem>
                    <SelectItem value="sem_justa_causa">Demissao sem justa causa</SelectItem>
                    <SelectItem value="justa_causa">Demissao por justa causa</SelectItem>
                    <SelectItem value="acordo">Acordo entre partes</SelectItem>
                    <SelectItem value="termino_contrato">Termino de contrato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Observacoes</Label>
                <Textarea placeholder="Informacoes adicionais sobre o desligamento..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDesligamento(false)}>
                Cancelar
              </Button>
              <Button variant="destructive">Confirmar Desligamento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Desligamento em Lote */}
        <Dialog open={showDesligamentoLote} onOpenChange={setShowDesligamentoLote}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Desligamento em Lote</DialogTitle>
              <DialogDescription>
                Voce esta prestes a iniciar o processo de desligamento de {selectedColabs.length} colaboradores.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-400">
                  <AlertTriangle className="inline h-4 w-4 mr-1" />
                  Esta acao ira iniciar o processo de desligamento para todos os colaboradores selecionados.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Motivo do Desligamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="termino_contrato">Termino de contrato</SelectItem>
                    <SelectItem value="reducao_quadro">Reducao de quadro</SelectItem>
                    <SelectItem value="encerramento_obra">Encerramento da obra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Observacoes</Label>
                <Textarea placeholder="Informacoes adicionais..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDesligamentoLote(false)}>
                Cancelar
              </Button>
              <Button variant="destructive">Confirmar Desligamentos</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Novo Beneficio */}
        <Dialog open={showNovoBeneficio} onOpenChange={setShowNovoBeneficio}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Beneficio</DialogTitle>
              <DialogDescription>Adicione um novo beneficio para os colaboradores da obra.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Beneficio</Label>
                <Input placeholder="Ex: Vale Gas, Auxilio Creche..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor Unitario</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label>Aplicacao</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="clt">Apenas CLT</SelectItem>
                      <SelectItem value="orista">Oristas</SelectItem>
                      <SelectItem value="mensalista">Mensalistas</SelectItem>
                      <SelectItem value="cargo">Por Cargo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Elegibilidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Quem tem direito?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="direto">Direto</SelectItem>
                    <SelectItem value="indireto">Indireto</SelectItem>
                    <SelectItem value="producao">Producao</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNovoBeneficio(false)}>
                Cancelar
              </Button>
              <Button>Adicionar Beneficio</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Novo Premio */}
        <Dialog open={showNovoPremio} onOpenChange={setShowNovoPremio}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Regra de Premio</DialogTitle>
              <DialogDescription>Configure uma nova regra de premio ou bonificacao.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Premio</Label>
                <Input placeholder="Ex: Bonus de Produtividade, Premio por Meta..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixo">Fixo</SelectItem>
                      <SelectItem value="variavel">Variavel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Natureza</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desempenho">Por Desempenho</SelectItem>
                      <SelectItem value="meta">Por Meta</SelectItem>
                      <SelectItem value="resultado">Por Resultado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor Base</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label>Aplicacao</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Por Colaborador</SelectItem>
                      <SelectItem value="equipe">Por Equipe</SelectItem>
                      <SelectItem value="obra">Por Obra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-xs text-amber-400">
                  <Scale className="inline h-3 w-3 mr-1" />
                  Premios recorrentes podem caracterizar natureza salarial. Consulte o juridico antes de aprovar.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNovoPremio(false)}>
                Cancelar
              </Button>
              <Button>Criar Regra</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
