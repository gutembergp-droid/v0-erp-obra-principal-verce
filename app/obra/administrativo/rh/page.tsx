"use client"

import { useState, Suspense } from "react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Users,
  Clock,
  Calendar,
  UserCheck,
  UserX,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Phone,
  Mail,
  Download,
  BarChart3,
  TableIcon,
  Eye,
  Edit,
  Shield,
  GraduationCap,
  HeartPulse,
  AlertCircle,
  XCircle,
  Hourglass,
  ChevronRight,
  MoreHorizontal,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  ClipboardCheck,
  Ban,
  RefreshCw,
  Building2,
  ExternalLink,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend, // Added
} from "recharts"

// Dados mockados de Colaboradores (expandido)
const colaboradoresMock = [
  {
    id: "COL-001",
    nome: "Jose Silva Santos",
    funcao: "Operador de Escavadeira",
    setor: "Producao",
    admissao: "2024-02-15",
    statusRH: "ativo",
    statusSST: "regular",
    turno: "Diurno",
    ctps: "123456",
    telefone: "(21) 99999-1111",
    email: "jose.silva@obra.com",
    salario: 4500,
    asoValidade: "2026-06-15",
    nrPendentes: 0,
    docsPendentes: 0,
  },
  {
    id: "COL-002",
    nome: "Maria Aparecida Costa",
    funcao: "Engenheira Civil",
    setor: "Engenharia",
    admissao: "2024-01-10",
    statusRH: "ativo",
    statusSST: "regular",
    turno: "Comercial",
    ctps: "234567",
    telefone: "(21) 99999-2222",
    email: "maria.costa@obra.com",
    salario: 12000,
    asoValidade: "2026-08-20",
    nrPendentes: 0,
    docsPendentes: 0,
  },
  {
    id: "COL-003",
    nome: "Carlos Eduardo Lima",
    funcao: "Encarregado de Terraplenagem",
    setor: "Producao",
    admissao: "2024-03-01",
    statusRH: "ferias",
    statusSST: "regular",
    turno: "Diurno",
    ctps: "345678",
    telefone: "(21) 99999-3333",
    email: "carlos.lima@obra.com",
    salario: 6500,
    asoValidade: "2026-05-10",
    nrPendentes: 1,
    docsPendentes: 0,
  },
  {
    id: "COL-004",
    nome: "Ana Paula Ferreira",
    funcao: "Tecnica de Seguranca",
    setor: "SSMA",
    admissao: "2024-04-20",
    statusRH: "ativo",
    statusSST: "pendencia",
    turno: "Diurno",
    ctps: "456789",
    telefone: "(21) 99999-4444",
    email: "ana.ferreira@obra.com",
    salario: 5200,
    asoValidade: "2026-02-01",
    nrPendentes: 2,
    docsPendentes: 1,
  },
  {
    id: "COL-005",
    nome: "Roberto Mendes Filho",
    funcao: "Motorista de Caminhao",
    setor: "Producao",
    admissao: "2024-05-15",
    statusRH: "afastado",
    statusSST: "bloqueado",
    turno: "Diurno",
    ctps: "567890",
    telefone: "(21) 99999-5555",
    email: "roberto.mendes@obra.com",
    salario: 3800,
    asoValidade: "2025-12-20",
    nrPendentes: 3,
    docsPendentes: 2,
  },
  {
    id: "COL-006",
    nome: "Fernanda Oliveira",
    funcao: "Almoxarife",
    setor: "Suprimentos",
    admissao: "2024-06-01",
    statusRH: "ativo",
    statusSST: "regular",
    turno: "Comercial",
    ctps: "678901",
    telefone: "(21) 99999-6666",
    email: "fernanda.oliveira@obra.com",
    salario: 3200,
    asoValidade: "2026-09-15",
    nrPendentes: 0,
    docsPendentes: 0,
  },
]

// Dados mockados de Documentos
const documentosMock = [
  { id: "DOC-001", colaborador: "COL-001", tipo: "RG", validade: null, status: "valido", arquivo: "rg_jose.pdf" },
  { id: "DOC-002", colaborador: "COL-001", tipo: "CPF", validade: null, status: "valido", arquivo: "cpf_jose.pdf" },
  {
    id: "DOC-003",
    colaborador: "COL-001",
    tipo: "CNH",
    validade: "2027-05-20",
    status: "valido",
    arquivo: "cnh_jose.pdf",
  },
  {
    id: "DOC-004",
    colaborador: "COL-004",
    tipo: "CNH",
    validade: "2026-01-15",
    status: "vencendo",
    arquivo: "cnh_ana.pdf",
  },
  {
    id: "DOC-005",
    colaborador: "COL-005",
    tipo: "CNH",
    validade: "2025-11-10",
    status: "vencido",
    arquivo: "cnh_roberto.pdf",
  },
  {
    id: "DOC-006",
    colaborador: "COL-005",
    tipo: "MOPP",
    validade: "2025-10-05",
    status: "vencido",
    arquivo: "mopp_roberto.pdf",
  },
]

// Dados mockados de Exames (ASO)
const examesMock = [
  {
    id: "EXA-001",
    colaborador: "COL-001",
    tipo: "Periodico",
    data: "2025-06-15",
    validade: "2026-06-15",
    resultado: "Apto",
    restricao: null,
    status: "valido",
  },
  {
    id: "EXA-002",
    colaborador: "COL-002",
    tipo: "Periodico",
    data: "2025-08-20",
    validade: "2026-08-20",
    resultado: "Apto",
    restricao: null,
    status: "valido",
  },
  {
    id: "EXA-003",
    colaborador: "COL-003",
    tipo: "Periodico",
    data: "2025-05-10",
    validade: "2026-05-10",
    resultado: "Apto",
    restricao: null,
    status: "valido",
  },
  {
    id: "EXA-004",
    colaborador: "COL-004",
    tipo: "Periodico",
    data: "2025-02-01",
    validade: "2026-02-01",
    resultado: "Apto",
    restricao: "Altura",
    status: "vencendo",
  },
  {
    id: "EXA-005",
    colaborador: "COL-005",
    tipo: "Periodico",
    data: "2024-12-20",
    validade: "2025-12-20",
    resultado: "Inapto Temporario",
    restricao: "Afastado",
    status: "vencido",
  },
  {
    id: "EXA-006",
    colaborador: "COL-006",
    tipo: "Admissional",
    data: "2024-06-01",
    validade: "2026-09-15",
    resultado: "Apto",
    restricao: null,
    status: "valido",
  },
]

// Dados mockados de Treinamentos
const treinamentosMock = [
  {
    id: "TRE-001",
    colaborador: "COL-001",
    nr: "NR-11",
    descricao: "Operador de Empilhadeira",
    validade: "2026-08-15",
    status: "valido",
    cargaHoraria: 8,
  },
  {
    id: "TRE-002",
    colaborador: "COL-001",
    nr: "NR-12",
    descricao: "Seguranca em Maquinas",
    validade: "2026-10-20",
    status: "valido",
    cargaHoraria: 16,
  },
  {
    id: "TRE-003",
    colaborador: "COL-003",
    nr: "NR-35",
    descricao: "Trabalho em Altura",
    validade: "2026-01-20",
    status: "vencendo",
    cargaHoraria: 8,
  },
  {
    id: "TRE-004",
    colaborador: "COL-004",
    nr: "NR-10",
    descricao: "Seguranca em Eletricidade",
    validade: "2025-12-15",
    status: "vencido",
    cargaHoraria: 40,
  },
  {
    id: "TRE-005",
    colaborador: "COL-004",
    nr: "NR-33",
    descricao: "Espaco Confinado",
    validade: "2025-11-30",
    status: "vencido",
    cargaHoraria: 16,
  },
  {
    id: "TRE-006",
    colaborador: "COL-005",
    nr: "NR-11",
    descricao: "Operador de Empilhadeira",
    validade: "2025-10-10",
    status: "vencido",
    cargaHoraria: 8,
  },
  {
    id: "TRE-007",
    colaborador: "COL-005",
    nr: "MOPP",
    descricao: "Produtos Perigosos",
    validade: "2025-09-05",
    status: "vencido",
    cargaHoraria: 50,
  },
  {
    id: "TRE-008",
    colaborador: "COL-005",
    nr: "NR-20",
    descricao: "Inflamaveis e Combustiveis",
    validade: "2025-08-20",
    status: "vencido",
    cargaHoraria: 8,
  },
]

// Dados mockados de Ferias
const feriasMock = [
  {
    id: "FER-001",
    colaborador: "COL-003",
    periodoAquisitivo: "2024-03-01 a 2025-02-28",
    saldoDias: 0,
    dataInicio: "2026-01-02",
    dataFim: "2026-01-31",
    status: "em_gozo",
  },
  {
    id: "FER-002",
    colaborador: "COL-001",
    periodoAquisitivo: "2024-02-15 a 2025-02-14",
    saldoDias: 30,
    dataInicio: null,
    dataFim: null,
    status: "pendente",
  },
  {
    id: "FER-003",
    colaborador: "COL-002",
    periodoAquisitivo: "2024-01-10 a 2025-01-09",
    saldoDias: 20,
    dataInicio: "2026-03-01",
    dataFim: "2026-03-20",
    status: "programada",
  },
  {
    id: "FER-004",
    colaborador: "COL-006",
    periodoAquisitivo: "2024-06-01 a 2025-05-31",
    saldoDias: 30,
    dataInicio: null,
    dataFim: null,
    status: "pendente",
  },
]

// Dados mockados de Afastamentos
const afastamentosMock = [
  {
    id: "AFA-001",
    colaborador: "COL-003",
    tipo: "Ferias",
    dataInicio: "2026-01-02",
    dataFim: "2026-01-31",
    dias: 30,
    cid: null,
    status: "ativo",
  },
  {
    id: "AFA-002",
    colaborador: "COL-005",
    tipo: "Atestado Medico",
    dataInicio: "2025-12-15",
    dataFim: "2026-02-15",
    dias: 62,
    cid: "M54.5",
    status: "ativo",
  },
]

// Dados mockados de Ocorrencias
const ocorrenciasMock = [
  {
    id: "OCO-001",
    colaborador: "COL-005",
    tipo: "Advertencia",
    data: "2025-11-10",
    descricao: "Falta injustificada",
    status: "registrada",
    ciencia: true,
  },
  {
    id: "OCO-002",
    colaborador: "COL-005",
    tipo: "Advertencia",
    data: "2025-11-25",
    descricao: "Atraso reincidente",
    status: "registrada",
    ciencia: true,
  },
]

// Dados mockados de Ponto
const pontoMock = [
  {
    colaborador: "Jose Silva Santos",
    data: "2026-01-03",
    entrada: "07:00",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "17:00",
    horasTrabalhadas: 9,
    horasExtras: 1,
    status: "regular",
  },
  {
    colaborador: "Maria Aparecida Costa",
    data: "2026-01-03",
    entrada: "08:00",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "18:00",
    horasTrabalhadas: 9,
    horasExtras: 1,
    status: "regular",
  },
  {
    colaborador: "Ana Paula Ferreira",
    data: "2026-01-03",
    entrada: "07:15",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "17:00",
    horasTrabalhadas: 8.75,
    horasExtras: 0,
    status: "atraso",
  },
  {
    colaborador: "Fernanda Oliveira",
    data: "2026-01-03",
    entrada: "08:00",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "17:00",
    horasTrabalhadas: 8,
    horasExtras: 0,
    status: "regular",
  },
]

// Dados mockados de Banco de Horas
const bancoHorasMock = [
  { colaborador: "COL-001", saldo: 12, creditos: 24, debitos: 12 },
  { colaborador: "COL-002", saldo: 8, creditos: 16, debitos: 8 },
  { colaborador: "COL-004", saldo: -4, creditos: 8, debitos: 12 },
  { colaborador: "COL-006", saldo: 2, creditos: 10, debitos: 8 },
]

// Dados para graficos
const evolucaoQuadroData = [
  { mes: "Ago", ativos: 38, admissoes: 4, demissoes: 1 },
  { mes: "Set", ativos: 40, admissoes: 3, demissoes: 1 },
  { mes: "Out", ativos: 42, admissoes: 4, demissoes: 2 },
  { mes: "Nov", ativos: 44, admissoes: 3, demissoes: 1 },
  { mes: "Dez", ativos: 45, admissoes: 2, demissoes: 1 },
  { mes: "Jan", ativos: 46, admissoes: 2, demissoes: 1 },
]

const distribuicaoSetorData = [
  { name: "Producao", value: 28, color: "hsl(var(--chart-1))" },
  { name: "Engenharia", value: 8, color: "hsl(var(--chart-2))" },
  { name: "SSMA", value: 4, color: "hsl(var(--chart-3))" },
  { name: "Administrativo", value: 4, color: "hsl(var(--chart-4))" },
  { name: "Suprimentos", value: 2, color: "hsl(var(--chart-5))" },
]

const horasExtrasData = [
  { mes: "Ago", horas: 180 },
  { mes: "Set", horas: 220 },
  { mes: "Out", horas: 195 },
  { mes: "Nov", horas: 240 },
  { mes: "Dez", horas: 160 },
  { mes: "Jan", horas: 85 },
]

const conformidadeData = [
  { categoria: "ASO", conformes: 42, pendentes: 3, vencidos: 1 },
  { categoria: "NRs", conformes: 38, pendentes: 5, vencidos: 3 },
  { categoria: "Documentos", conformes: 44, pendentes: 1, vencidos: 1 },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(value)
}

function getColaboradorNome(id: string) {
  const col = colaboradoresMock.find((c) => c.id === id)
  return col?.nome || id
}

// Tooltip customizado para graficos
function CustomTooltip({
  active,
  payload,
  label,
}: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const colaboradoresObraMock = [
  {
    id: "COL-001",
    nome: "Joao Silva",
    tipoVinculo: "CLT",
    classificacao: "Direto",
    funcao: "Armador",
    setor: "Setor 1",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "ASO OK",
  },
  {
    id: "COL-002",
    nome: "Carlos Lima",
    tipoVinculo: "Terceirizado",
    classificacao: "Direto",
    funcao: "Carpinteiro",
    setor: "Setor 2",
    statusGeral: "Ativo",
    statusDocumental: "Pendente",
    statusSST: "NR Vencida",
  },
  {
    id: "COL-003",
    nome: "Ana Souza",
    tipoVinculo: "CLT",
    classificacao: "Indireto",
    funcao: "Adm Obra",
    setor: "Administrativo",
    statusGeral: "Afastado",
    statusDocumental: "OK",
    statusSST: "ASO OK",
  },
  {
    id: "COL-004",
    nome: "Pedro Oliveira",
    tipoVinculo: "CLT",
    classificacao: "Direto",
    funcao: "Pedreiro",
    setor: "Setor 1",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "ASO OK",
  },
  {
    id: "COL-005",
    nome: "Marcos Santos",
    tipoVinculo: "PJ",
    classificacao: "Indireto",
    funcao: "Engenheiro Civil",
    setor: "Engenharia",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "ASO OK",
  },
  {
    id: "COL-006",
    nome: "Roberto Mendes",
    tipoVinculo: "CLT",
    classificacao: "Direto",
    funcao: "Operador Escavadeira",
    setor: "Setor 3",
    statusGeral: "Bloqueado",
    statusDocumental: "Vencido",
    statusSST: "ASO Vencido",
  },
  {
    id: "COL-007",
    nome: "Fernanda Costa",
    tipoVinculo: "Terceirizado",
    classificacao: "Direto",
    funcao: "Eletricista",
    setor: "Setor 2",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "NR Vencendo",
  },
  {
    id: "COL-008",
    nome: "Lucas Ferreira",
    tipoVinculo: "CLT",
    classificacao: "Direto",
    funcao: "Servente",
    setor: "Setor 1",
    statusGeral: "Ativo",
    statusDocumental: "Pendente",
    statusSST: "ASO OK",
  },
  {
    id: "COL-009",
    nome: "Julia Almeida",
    tipoVinculo: "CLT",
    classificacao: "Indireto",
    funcao: "Tecnica Seguranca",
    setor: "SSMA",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "ASO OK",
  },
  {
    id: "COL-010",
    nome: "Ricardo Nunes",
    tipoVinculo: "Terceirizado",
    classificacao: "Direto",
    funcao: "Soldador",
    setor: "Setor 3",
    statusGeral: "Afastado",
    statusDocumental: "OK",
    statusSST: "ASO OK",
  },
]

const composicaoEfetivoData = [
  { name: "CLT", value: 210, color: "#3b82f6" },
  { name: "PJ", value: 20, color: "#8b5cf6" },
  { name: "Terceirizados", value: 70, color: "#f59e0b" },
]

const acessosRapidos = [
  { label: "Colaboradores", icon: Users, href: "/obra/administrativo/rh/colaboradores" },
  { label: "Documentos", icon: FileText, href: "/obra/administrativo/rh/documentos" },
  { label: "SST (ASO/NRs)", icon: Shield, href: "/obra/administrativo/rh/sst" },
  { label: "Ferias", icon: Calendar, href: "/obra/administrativo/rh/ferias" },
  { label: "Afastamentos", icon: UserX, href: "/obra/administrativo/rh/afastamentos" },
  { label: "Ocorrencias", icon: AlertTriangle, href: "/obra/administrativo/rh/ocorrencias" },
  { label: "Ponto", icon: Clock, href: "/obra/administrativo/rh/ponto" },
  { label: "Banco de Horas", icon: Clock, href: "/obra/administrativo/rh/banco-horas" },
]

function RHContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("visao-geral")
  const [selectedColab, setSelectedColab] = useState<(typeof colaboradoresMock)[0] | null>(null)
  const [viewMode, setViewMode] = useState<Record<string, "grafico" | "tabela">>({
    quadro: "grafico",
    setor: "grafico",
    horas: "grafico",
    conformidade: "grafico",
  })

  // Calculos
  const totalColaboradores = colaboradoresMock.length
  const colaboradoresAtivos = colaboradoresMock.filter((c) => c.statusRH === "ativo").length
  const colaboradoresFerias = colaboradoresMock.filter((c) => c.statusRH === "ferias").length
  const colaboradoresAfastados = colaboradoresMock.filter((c) => c.statusRH === "afastado").length
  const horasExtrasMes = pontoMock.reduce((acc, p) => acc + p.horasExtras, 0)
  const docsPendentes = documentosMock.filter((d) => d.status === "vencendo" || d.status === "vencido").length
  const asosPendentes = examesMock.filter((e) => e.status === "vencendo" || e.status === "vencido").length
  const nrsPendentes = treinamentosMock.filter((t) => t.status === "vencendo" || t.status === "vencido").length
  const colaboradoresBloqueados = colaboradoresMock.filter((c) => c.statusSST === "bloqueado").length

  const toggleView = (card: string) => {
    setViewMode((prev) => ({ ...prev, [card]: prev[card] === "grafico" ? "tabela" : "grafico" }))
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">RH - Recursos Humanos</h1>
                <Badge variant="outline" className="font-mono text-xs">
                  AD-03
                </Badge>
                <InfoTooltip
                  title="Setor de RH"
                  description="Gestao completa de pessoal, documentos, exames ocupacionais, treinamentos, ferias, afastamentos, ponto e conformidade SST."
                />
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo Colaborador
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">Total</span>
              </div>
              <p className="text-2xl font-bold">{totalColaboradores}</p>
              <p className="text-xs text-muted-foreground">colaboradores</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-primary mb-1">
                <UserCheck className="w-4 h-4" />
                <span className="text-xs">Ativos</span>
              </div>
              <p className="text-2xl font-bold text-primary">{colaboradoresAtivos}</p>
              <p className="text-xs text-muted-foreground">
                {((colaboradoresAtivos / totalColaboradores) * 100).toFixed(0)}% do quadro
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-chart-1 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Ferias</span>
              </div>
              <p className="text-2xl font-bold text-chart-1">{colaboradoresFerias}</p>
              <p className="text-xs text-muted-foreground">em gozo</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-chart-4 mb-1">
                <UserX className="w-4 h-4" />
                <span className="text-xs">Afastados</span>
              </div>
              <p className="text-2xl font-bold text-chart-4">{colaboradoresAfastados}</p>
              <p className="text-xs text-muted-foreground">atestados</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-chart-3 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Horas Extras</span>
              </div>
              <p className="text-2xl font-bold text-chart-3">{horasExtrasMes}h</p>
              <p className="text-xs text-muted-foreground">no mes</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-destructive mb-1">
                <HeartPulse className="w-4 h-4" />
                <span className="text-xs">ASO Pend.</span>
              </div>
              <p className="text-2xl font-bold text-destructive">{asosPendentes}</p>
              <p className="text-xs text-muted-foreground">vencendo/vencidos</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-chart-4 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs">NRs Pend.</span>
              </div>
              <p className="text-2xl font-bold text-chart-4">{nrsPendentes}</p>
              <p className="text-xs text-muted-foreground">treinamentos</p>
            </CardContent>
          </Card>
          <Card className={colaboradoresBloqueados > 0 ? "bg-destructive/10 border-destructive/30" : "bg-card"}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-destructive mb-1">
                <Ban className="w-4 h-4" />
                <span className="text-xs">Bloqueados</span>
              </div>
              <p className="text-2xl font-bold text-destructive">{colaboradoresBloqueados}</p>
              <p className="text-xs text-muted-foreground">SST irregular</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="visao-geral" className="text-xs">
              Visao Geral
            </TabsTrigger>
            <TabsTrigger value="colaboradores" className="text-xs">
              Colaboradores
            </TabsTrigger>
            <TabsTrigger value="documentos" className="text-xs">
              Documentos
            </TabsTrigger>
            <TabsTrigger value="exames" className="text-xs">
              Exames/ASO
            </TabsTrigger>
            <TabsTrigger value="treinamentos" className="text-xs">
              Treinamentos/NRs
            </TabsTrigger>
            <TabsTrigger value="ferias" className="text-xs">
              Ferias
            </TabsTrigger>
            <TabsTrigger value="afastamentos" className="text-xs">
              Afastamentos
            </TabsTrigger>
            <TabsTrigger value="ocorrencias" className="text-xs">
              Ocorrencias
            </TabsTrigger>
            <TabsTrigger value="ponto" className="text-xs">
              Ponto
            </TabsTrigger>
            <TabsTrigger value="banco-horas" className="text-xs">
              Banco Horas
            </TabsTrigger>
            <TabsTrigger value="conformidade" className="text-xs">
              Conformidade
            </TabsTrigger>
          </TabsList>

          {/* VISAO GERAL */}
          <TabsContent value="visao-geral" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Evolucao do Quadro */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Evolucao do Quadro</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant={viewMode.quadro === "grafico" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("quadro")}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode.quadro === "tabela" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("quadro")}
                      >
                        <TableIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode.quadro === "grafico" ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={evolucaoQuadroData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="ativos"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Ativos"
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="admissoes"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          name="Admissoes"
                          dot={{ fill: "hsl(var(--chart-1))" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="demissoes"
                          stroke="hsl(var(--destructive))"
                          strokeWidth={2}
                          name="Demissoes"
                          dot={{ fill: "hsl(var(--destructive))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mes</TableHead>
                          <TableHead className="text-center">Ativos</TableHead>
                          <TableHead className="text-center">Admissoes</TableHead>
                          <TableHead className="text-center">Demissoes</TableHead>
                          <TableHead>Tendencia</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evolucaoQuadroData.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{row.mes}</TableCell>
                            <TableCell className="text-center">{row.ativos}</TableCell>
                            <TableCell className="text-center text-chart-1">+{row.admissoes}</TableCell>
                            <TableCell className="text-center text-destructive">-{row.demissoes}</TableCell>
                            <TableCell>
                              {row.admissoes > row.demissoes ? (
                                <TrendingUp className="w-4 h-4 text-chart-1" />
                              ) : row.admissoes < row.demissoes ? (
                                <TrendingDown className="w-4 h-4 text-destructive" />
                              ) : (
                                <Minus className="w-4 h-4 text-muted-foreground" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Distribuicao por Setor */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Distribuicao por Setor</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant={viewMode.setor === "grafico" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("setor")}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode.setor === "tabela" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("setor")}
                      >
                        <TableIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode.setor === "grafico" ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={distribuicaoSetorData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {distribuicaoSetorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Setor</TableHead>
                          <TableHead className="text-center">Qtd</TableHead>
                          <TableHead className="text-center">%</TableHead>
                          <TableHead>Acoes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distribuicaoSetorData.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }} />
                                {row.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">{row.value}</TableCell>
                            <TableCell className="text-center">
                              {((row.value / totalColaboradores) * 100).toFixed(0)}%
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Horas Extras */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Horas Extras por Mes</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant={viewMode.horas === "grafico" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("horas")}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode.horas === "tabela" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("horas")}
                      >
                        <TableIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode.horas === "grafico" ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={horasExtrasData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="horas" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Horas" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mes</TableHead>
                          <TableHead className="text-center">Horas</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Acoes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {horasExtrasData.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{row.mes}</TableCell>
                            <TableCell className="text-center font-mono">{row.horas}h</TableCell>
                            <TableCell>
                              <Badge
                                variant={row.horas > 200 ? "destructive" : "outline"}
                                className={row.horas > 200 ? "" : "text-primary"}
                              >
                                {row.horas > 200 ? "Alto" : "Normal"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Conformidade SST */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Conformidade SST</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant={viewMode.conformidade === "grafico" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("conformidade")}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode.conformidade === "tabela" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => toggleView("conformidade")}
                      >
                        <TableIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode.conformidade === "grafico" ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={conformidadeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          dataKey="categoria"
                          type="category"
                          tick={{ fontSize: 12 }}
                          stroke="hsl(var(--muted-foreground))"
                          width={80}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="conformes" stackId="a" fill="hsl(var(--primary))" name="Conformes" />
                        <Bar dataKey="pendentes" stackId="a" fill="hsl(var(--chart-4))" name="Pendentes" />
                        <Bar dataKey="vencidos" stackId="a" fill="hsl(var(--destructive))" name="Vencidos" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categoria</TableHead>
                          <TableHead className="text-center">Conformes</TableHead>
                          <TableHead className="text-center">Pendentes</TableHead>
                          <TableHead className="text-center">Vencidos</TableHead>
                          <TableHead>Acoes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {conformidadeData.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{row.categoria}</TableCell>
                            <TableCell className="text-center text-primary">{row.conformes}</TableCell>
                            <TableCell className="text-center text-chart-4">{row.pendentes}</TableCell>
                            <TableCell className="text-center text-destructive">{row.vencidos}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Alertas */}
            {(asosPendentes > 0 || nrsPendentes > 0 || colaboradoresBloqueados > 0) && (
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Alertas de Conformidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {asosPendentes > 0 && (
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <HeartPulse className="w-5 h-5 text-destructive" />
                          <div>
                            <p className="font-medium">ASO Vencendo/Vencido</p>
                            <p className="text-sm text-muted-foreground">{asosPendentes} colaborador(es)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setTab("exames")}>
                          Ver <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    )}
                    {nrsPendentes > 0 && (
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-5 h-5 text-chart-4" />
                          <div>
                            <p className="font-medium">NRs Vencendo/Vencido</p>
                            <p className="text-sm text-muted-foreground">{nrsPendentes} treinamento(s)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setTab("treinamentos")}>
                          Ver <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    )}
                    {colaboradoresBloqueados > 0 && (
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Ban className="w-5 h-5 text-destructive" />
                          <div>
                            <p className="font-medium">Colaboradores Bloqueados</p>
                            <p className="text-sm text-muted-foreground">{colaboradoresBloqueados} pessoa(s)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setTab("colaboradores")}>
                          Ver <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* COLABORADORES */}
          <TabsContent value="colaboradores" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao de Pessoal</CardTitle>
                    <CardDescription>Colaboradores mobilizados na obra</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ativo">Ativos</SelectItem>
                        <SelectItem value="ferias">Ferias</SelectItem>
                        <SelectItem value="afastado">Afastados</SelectItem>
                        <SelectItem value="bloqueado">Bloqueados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Funcao</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Status RH</TableHead>
                      <TableHead>Status SST</TableHead>
                      <TableHead>ASO</TableHead>
                      <TableHead>NRs</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {colaboradoresMock
                      .filter((c) => c.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((col) => (
                        <TableRow key={col.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {col.nome
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{col.nome}</p>
                                <p className="text-xs text-muted-foreground font-mono">{col.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{col.funcao}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{col.setor}</Badge>
                          </TableCell>
                          <TableCell>
                            {col.statusRH === "ativo" && (
                              <Badge className="bg-primary/20 text-primary">
                                <UserCheck className="w-3 h-3 mr-1" />
                                Ativo
                              </Badge>
                            )}
                            {col.statusRH === "ferias" && (
                              <Badge variant="outline" className="text-chart-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                Ferias
                              </Badge>
                            )}
                            {col.statusRH === "afastado" && (
                              <Badge variant="outline" className="text-chart-4">
                                <UserX className="w-3 h-3 mr-1" />
                                Afastado
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {col.statusSST === "regular" && (
                              <Badge className="bg-primary/20 text-primary">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Regular
                              </Badge>
                            )}
                            {col.statusSST === "pendencia" && (
                              <Badge variant="outline" className="text-chart-4">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Pendencia
                              </Badge>
                            )}
                            {col.statusSST === "bloqueado" && (
                              <Badge variant="destructive">
                                <Ban className="w-3 h-3 mr-1" />
                                Bloqueado
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(col.asoValidade) < new Date() ? (
                              <Badge variant="destructive">Vencido</Badge>
                            ) : new Date(col.asoValidade) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
                              <Badge variant="outline" className="text-chart-4">
                                Vencendo
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-primary">
                                OK
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {col.nrPendentes > 0 ? (
                              <Badge variant="outline" className="text-destructive">
                                {col.nrPendentes} pend.
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-primary">
                                OK
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => setSelectedColab(col)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOCUMENTOS */}
          <TabsContent value="documentos" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Controle Documental</CardTitle>
                    <CardDescription>Documentos dos colaboradores (RG, CPF, CNH, MOPP, etc.)</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="valido">Validos</SelectItem>
                        <SelectItem value="vencendo">Vencendo</SelectItem>
                        <SelectItem value="vencido">Vencidos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Documento
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Arquivo</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosMock.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{getColaboradorNome(doc.colaborador)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doc.tipo}</Badge>
                        </TableCell>
                        <TableCell>
                          {doc.validade ? new Date(doc.validade).toLocaleDateString("pt-BR") : "N/A"}
                        </TableCell>
                        <TableCell>
                          {doc.status === "valido" && (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Valido
                            </Badge>
                          )}
                          {doc.status === "vencendo" && (
                            <Badge variant="outline" className="text-chart-4">
                              <Hourglass className="w-3 h-3 mr-1" />
                              Vencendo
                            </Badge>
                          )}
                          {doc.status === "vencido" && (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Vencido
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-mono text-muted-foreground">{doc.arquivo}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EXAMES/ASO */}
          <TabsContent value="exames" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Exames Ocupacionais (ASO)</CardTitle>
                    <CardDescription>Controle de exames admissionais, periodicos, demissionais</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="valido">Validos</SelectItem>
                        <SelectItem value="vencendo">Vencendo</SelectItem>
                        <SelectItem value="vencido">Vencidos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Exame
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Resultado</TableHead>
                      <TableHead>Restricao</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examesMock.map((exame) => (
                      <TableRow key={exame.id}>
                        <TableCell className="font-medium">{getColaboradorNome(exame.colaborador)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{exame.tipo}</Badge>
                        </TableCell>
                        <TableCell>{new Date(exame.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{new Date(exame.validade).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {exame.resultado === "Apto" && <Badge className="bg-primary/20 text-primary">Apto</Badge>}
                          {exame.resultado === "Inapto Temporario" && <Badge variant="destructive">Inapto Temp.</Badge>}
                        </TableCell>
                        <TableCell>{exame.restricao || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell>
                          {exame.status === "valido" && (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Valido
                            </Badge>
                          )}
                          {exame.status === "vencendo" && (
                            <Badge variant="outline" className="text-chart-4">
                              <Hourglass className="w-3 h-3 mr-1" />
                              Vencendo
                            </Badge>
                          )}
                          {exame.status === "vencido" && (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Vencido
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TREINAMENTOS/NRs */}
          <TabsContent value="treinamentos" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Treinamentos e NRs</CardTitle>
                    <CardDescription>
                      Controle de treinamentos obrigatorios (NR-10, NR-11, NR-33, NR-35, etc.)
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="valido">Validos</SelectItem>
                        <SelectItem value="vencendo">Vencendo</SelectItem>
                        <SelectItem value="vencido">Vencidos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Treinamento
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>NR/Curso</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Carga Horaria</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treinamentosMock.map((tre) => (
                      <TableRow key={tre.id}>
                        <TableCell className="font-medium">{getColaboradorNome(tre.colaborador)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{tre.nr}</Badge>
                        </TableCell>
                        <TableCell>{tre.descricao}</TableCell>
                        <TableCell>{tre.cargaHoraria}h</TableCell>
                        <TableCell>{new Date(tre.validade).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {tre.status === "valido" && (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Valido
                            </Badge>
                          )}
                          {tre.status === "vencendo" && (
                            <Badge variant="outline" className="text-chart-4">
                              <Hourglass className="w-3 h-3 mr-1" />
                              Vencendo
                            </Badge>
                          )}
                          {tre.status === "vencido" && (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Vencido
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FERIAS */}
          <TabsContent value="ferias" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao de Ferias</CardTitle>
                    <CardDescription>Periodos aquisitivos, saldos e programacao de ferias</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="pendente">Pendentes</SelectItem>
                        <SelectItem value="programada">Programadas</SelectItem>
                        <SelectItem value="em_gozo">Em Gozo</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Programar Ferias
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Periodo Aquisitivo</TableHead>
                      <TableHead className="text-center">Saldo (dias)</TableHead>
                      <TableHead>Inicio</TableHead>
                      <TableHead>Fim</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feriasMock.map((fer) => (
                      <TableRow key={fer.id}>
                        <TableCell className="font-medium">{getColaboradorNome(fer.colaborador)}</TableCell>
                        <TableCell className="text-xs">{fer.periodoAquisitivo}</TableCell>
                        <TableCell className="text-center font-mono">{fer.saldoDias}</TableCell>
                        <TableCell>
                          {fer.dataInicio ? new Date(fer.dataInicio).toLocaleDateString("pt-BR") : "-"}
                        </TableCell>
                        <TableCell>{fer.dataFim ? new Date(fer.dataFim).toLocaleDateString("pt-BR") : "-"}</TableCell>
                        <TableCell>
                          {fer.status === "pendente" && (
                            <Badge variant="outline">
                              <Hourglass className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                          {fer.status === "programada" && (
                            <Badge className="bg-chart-1/20 text-chart-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              Programada
                            </Badge>
                          )}
                          {fer.status === "em_gozo" && (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Em Gozo
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AFASTAMENTOS */}
          <TabsContent value="afastamentos" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Afastamentos</CardTitle>
                    <CardDescription>Ferias, licencas, atestados e afastamentos INSS</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Afastamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Inicio</TableHead>
                      <TableHead>Fim</TableHead>
                      <TableHead className="text-center">Dias</TableHead>
                      <TableHead>CID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {afastamentosMock.map((af) => (
                      <TableRow key={af.id}>
                        <TableCell className="font-medium">{getColaboradorNome(af.colaborador)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{af.tipo}</Badge>
                        </TableCell>
                        <TableCell>{new Date(af.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{new Date(af.dataFim).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-center font-mono">{af.dias}</TableCell>
                        <TableCell>{af.cid || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell>
                          <Badge className="bg-chart-4/20 text-chart-4">
                            <Clock className="w-3 h-3 mr-1" />
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OCORRENCIAS */}
          <TabsContent value="ocorrencias" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Ocorrencias</CardTitle>
                    <CardDescription>Advertencias, suspensoes e incidentes</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Ocorrencia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Ciencia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ocorrenciasMock.map((oco) => (
                      <TableRow key={oco.id}>
                        <TableCell className="font-medium">{getColaboradorNome(oco.colaborador)}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{oco.tipo}</Badge>
                        </TableCell>
                        <TableCell>{new Date(oco.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{oco.descricao}</TableCell>
                        <TableCell>
                          {oco.ciencia ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Sim
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Registrada</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PONTO */}
          <TabsContent value="ponto" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Controle de Ponto</CardTitle>
                    <CardDescription>Registros de entrada e saida do dia</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Espelho de Ponto
                    </Button>
                    <Button size="sm">
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      Fechar Periodo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead className="text-center">Entrada</TableHead>
                      <TableHead className="text-center">Intervalo</TableHead>
                      <TableHead className="text-center">Saida</TableHead>
                      <TableHead className="text-center">Trabalhadas</TableHead>
                      <TableHead className="text-center">Extras</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pontoMock.map((ponto, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{ponto.colaborador}</TableCell>
                        <TableCell className="text-center font-mono">{ponto.entrada}</TableCell>
                        <TableCell className="text-center font-mono">
                          {ponto.intervaloInicio} - {ponto.intervaloFim}
                        </TableCell>
                        <TableCell className="text-center font-mono">{ponto.saida}</TableCell>
                        <TableCell className="text-center font-mono">{ponto.horasTrabalhadas}h</TableCell>
                        <TableCell className="text-center">
                          {ponto.horasExtras > 0 ? (
                            <Badge className="bg-chart-3/20 text-chart-3">{ponto.horasExtras}h</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {ponto.status === "regular" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Regular
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Atraso
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BANCO DE HORAS */}
          <TabsContent value="banco-horas" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Banco de Horas</CardTitle>
                    <CardDescription>Saldos, creditos e debitos de horas</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead className="text-center">Creditos</TableHead>
                      <TableHead className="text-center">Debitos</TableHead>
                      <TableHead className="text-center">Saldo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bancoHorasMock.map((bh, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{getColaboradorNome(bh.colaborador)}</TableCell>
                        <TableCell className="text-center font-mono text-chart-1">+{bh.creditos}h</TableCell>
                        <TableCell className="text-center font-mono text-destructive">-{bh.debitos}h</TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`font-mono font-bold ${bh.saldo >= 0 ? "text-primary" : "text-destructive"}`}
                          >
                            {bh.saldo >= 0 ? "+" : ""}
                            {bh.saldo}h
                          </span>
                        </TableCell>
                        <TableCell>
                          {bh.saldo >= 0 ? (
                            <Badge className="bg-primary/20 text-primary">Credito</Badge>
                          ) : (
                            <Badge variant="destructive">Debito</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONFORMIDADE */}
          <TabsContent value="conformidade" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conformidade RH + SST</CardTitle>
                <CardDescription>Visao unificada de habilitacao operacional dos colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Funcao</TableHead>
                      <TableHead>ASO</TableHead>
                      <TableHead>NRs</TableHead>
                      <TableHead>Documentos</TableHead>
                      <TableHead>Status Geral</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {colaboradoresMock.map((col) => {
                      const asoOk = new Date(col.asoValidade) > new Date()
                      const nrsOk = col.nrPendentes === 0
                      const docsOk = col.docsPendentes === 0
                      const geralOk = asoOk && nrsOk && docsOk
                      return (
                        <TableRow key={col.id}>
                          <TableCell className="font-medium">{col.nome}</TableCell>
                          <TableCell>{col.funcao}</TableCell>
                          <TableCell>
                            {asoOk ? (
                              <Badge className="bg-primary/20 text-primary">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                OK
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="w-3 h-3 mr-1" />
                                Pendente
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {nrsOk ? (
                              <Badge className="bg-primary/20 text-primary">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                OK
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="w-3 h-3 mr-1" />
                                {col.nrPendentes} pend.
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {docsOk ? (
                              <Badge className="bg-primary/20 text-primary">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                OK
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="w-3 h-3 mr-1" />
                                {col.docsPendentes} pend.
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {geralOk ? (
                              <Badge className="bg-primary/20 text-primary">
                                <Shield className="w-3 h-3 mr-1" />
                                Habilitado
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <Ban className="w-3 h-3 mr-1" />
                                Bloqueado
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
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
      </div>

      {/* Painel lateral para colaborador selecionado */}
      <Sheet open={!!selectedColab} onOpenChange={() => setSelectedColab(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-auto">
          {selectedColab && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedColab.nome
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{selectedColab.nome}</span>
                    <p className="text-sm font-normal text-muted-foreground">{selectedColab.id}</p>
                  </div>
                </SheetTitle>
                <SheetDescription>{selectedColab.funcao}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Setor</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedColab.setor}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status RH</p>
                    <div className="mt-1">
                      {selectedColab.statusRH === "ativo" && (
                        <Badge className="bg-primary/20 text-primary">Ativo</Badge>
                      )}
                      {selectedColab.statusRH === "ferias" && (
                        <Badge variant="outline" className="text-chart-1">
                          Ferias
                        </Badge>
                      )}
                      {selectedColab.statusRH === "afastado" && (
                        <Badge variant="outline" className="text-chart-4">
                          Afastado
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status SST</p>
                    <div className="mt-1">
                      {selectedColab.statusSST === "regular" && (
                        <Badge className="bg-primary/20 text-primary">Regular</Badge>
                      )}
                      {selectedColab.statusSST === "pendencia" && (
                        <Badge variant="outline" className="text-chart-4">
                          Pendencia
                        </Badge>
                      )}
                      {selectedColab.statusSST === "bloqueado" && <Badge variant="destructive">Bloqueado</Badge>}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Turno</p>
                    <p className="text-sm font-medium mt-1">{selectedColab.turno}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Admissao</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedColab.admissao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ASO Validade</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedColab.asoValidade).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedColab.telefone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedColab.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">CTPS: {selectedColab.ctps}</span>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Salario Base</span>
                      <span className="text-xl font-bold">{formatCurrency(selectedColab.salario)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentos
                  </Button>
                  <Button className="flex-1">Editar Cadastro</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function RHObraContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroVinculo, setFiltroVinculo] = useState("todos")
  const [filtroClassificacao, setFiltroClassificacao] = useState("todos")
  const [filtroFuncao, setFiltroFuncao] = useState("todos")
  const [filtroSetor, setFiltroSetor] = useState("todos")
  const [filtroStatusGeral, setFiltroStatusGeral] = useState("todos")
  const [filtroStatusDoc, setFiltroStatusDoc] = useState("todos")

  // Filtrar colaboradores
  const colaboradoresFiltrados = colaboradoresObraMock.filter((col) => {
    const matchSearch =
      col.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      col.funcao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchVinculo = filtroVinculo === "todos" || col.tipoVinculo === filtroVinculo
    const matchClassificacao = filtroClassificacao === "todos" || col.classificacao === filtroClassificacao
    const matchFuncao = filtroFuncao === "todos" || col.funcao === filtroFuncao
    const matchSetor = filtroSetor === "todos" || col.setor === filtroSetor
    const matchStatusGeral = filtroStatusGeral === "todos" || col.statusGeral === filtroStatusGeral
    const matchStatusDoc = filtroStatusDoc === "todos" || col.statusDocumental === filtroStatusDoc
    return (
      matchSearch &&
      matchVinculo &&
      matchClassificacao &&
      matchFuncao &&
      matchSetor &&
      matchStatusGeral &&
      matchStatusDoc
    )
  })

  // Listas unicas para filtros
  const funcoes = [...new Set(colaboradoresObraMock.map((c) => c.funcao))]
  const setores = [...new Set(colaboradoresObraMock.map((c) => c.setor))]

  const getStatusGeralBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Ativo</Badge>
      case "Afastado":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Afastado</Badge>
      case "Bloqueado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Bloqueado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusDocBadge = (status: string) => {
    switch (status) {
      case "OK":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">OK</Badge>
      case "Pendente":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pendente</Badge>
      case "Vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusSSTBadge = (status: string) => {
    if (status.includes("OK")) {
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{status}</Badge>
    } else if (status.includes("Vencendo")) {
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">{status}</Badge>
    } else if (status.includes("Vencid")) {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{status}</Badge>
    }
    return <Badge variant="outline">{status}</Badge>
  }

  const limparFiltros = () => {
    setSearchTerm("")
    setFiltroVinculo("todos")
    setFiltroClassificacao("todos")
    setFiltroFuncao("todos")
    setFiltroSetor("todos")
    setFiltroStatusGeral("todos")
    setFiltroStatusDoc("todos")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">RH da Obra</h1>
          <p className="text-muted-foreground">OBRA ALPHA - Gestao de Pessoas</p>
        </div>
      </div>

      {/* SECAO 1: Cards de Visao da Obra */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
        <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-foreground">300</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-blue-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <Briefcase className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <p className="text-xs text-muted-foreground">CLT</p>
            <p className="text-xl font-bold text-blue-500">210</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-violet-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <Building2 className="h-5 w-5 mx-auto mb-1 text-violet-500" />
            <p className="text-xs text-muted-foreground">PJ</p>
            <p className="text-xl font-bold text-violet-500">20</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-amber-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <p className="text-xs text-muted-foreground">Terceirizados</p>
            <p className="text-xl font-bold text-amber-500">70</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-emerald-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <UserCheck className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
            <p className="text-xs text-muted-foreground">Ef. Direto</p>
            <p className="text-xl font-bold text-emerald-500">230</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-cyan-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-cyan-500" />
            <p className="text-xs text-muted-foreground">Ef. Indireto</p>
            <p className="text-xl font-bold text-cyan-500">70</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-amber-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <UserX className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <p className="text-xs text-muted-foreground">Afastados</p>
            <p className="text-xl font-bold text-amber-500">9</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-red-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <Ban className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <p className="text-xs text-muted-foreground">Bloqueados</p>
            <p className="text-xl font-bold text-red-500">6</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-red-500/50 transition-colors cursor-pointer">
          <CardContent className="p-3 text-center">
            <AlertCircle className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <p className="text-xs text-muted-foreground">Alertas</p>
            <p className="text-xl font-bold text-red-500">2</p>
          </CardContent>
        </Card>
      </div>

      {/* SECAO 2: Grafico Pizza + Acessos Rapidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafico Pizza */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Composicao do Efetivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={composicaoEfetivoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={true}
                  >
                    {composicaoEfetivoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} pessoas`, ""]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Acessos Rapidos */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Acessos Rapidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {acessosRapidos.map((acesso) => (
              <Button key={acesso.label} variant="ghost" className="w-full justify-between h-10 hover:bg-muted">
                <div className="flex items-center gap-2">
                  <acesso.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{acesso.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* SECAO 3: Tabela Principal de Colaboradores */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Colaboradores da Obra</CardTitle>
            <Badge variant="outline" className="text-xs">
              {colaboradoresFiltrados.length} de {colaboradoresObraMock.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou funcao..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>

            <Select value={filtroVinculo} onValueChange={setFiltroVinculo}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Vinculo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Vinculos</SelectItem>
                <SelectItem value="CLT">CLT</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
                <SelectItem value="Terceirizado">Terceirizado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroClassificacao} onValueChange={setFiltroClassificacao}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Classificacao" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="Direto">Direto</SelectItem>
                <SelectItem value="Indireto">Indireto</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroSetor} onValueChange={setFiltroSetor}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Setores</SelectItem>
                {setores.map((setor) => (
                  <SelectItem key={setor} value={setor}>
                    {setor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroStatusGeral} onValueChange={setFiltroStatusGeral}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Status Geral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Afastado">Afastado</SelectItem>
                <SelectItem value="Bloqueado">Bloqueado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroStatusDoc} onValueChange={setFiltroStatusDoc}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Status Doc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Docs</SelectItem>
                <SelectItem value="OK">OK</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={limparFiltros}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabela */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-medium">Nome</TableHead>
                  <TableHead className="font-medium">Vinculo</TableHead>
                  <TableHead className="font-medium">Classif.</TableHead>
                  <TableHead className="font-medium">Funcao</TableHead>
                  <TableHead className="font-medium">Setor</TableHead>
                  <TableHead className="font-medium">Status Geral</TableHead>
                  <TableHead className="font-medium">Status Doc</TableHead>
                  <TableHead className="font-medium">SST</TableHead>
                  <TableHead className="font-medium text-right">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colaboradoresFiltrados.map((col) => (
                  <TableRow key={col.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{col.nome}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {col.tipoVinculo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{col.classificacao}</TableCell>
                    <TableCell className="text-sm">{col.funcao}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{col.setor}</TableCell>
                    <TableCell>{getStatusGeralBadge(col.statusGeral)}</TableCell>
                    <TableCell>{getStatusDocBadge(col.statusDocumental)}</TableCell>
                    <TableCell>{getStatusSSTBadge(col.statusSST)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Acessar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {colaboradoresFiltrados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Nenhum colaborador encontrado com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RHPage() {
  return (
    <Suspense fallback={null}>
      <RHContent />
    </Suspense>
  )
}

export function RHObraPage() {
  return (
    <Suspense fallback={null}>
      <RHObraContent />
    </Suspense>
  )
}
