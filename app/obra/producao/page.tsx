"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
} from "recharts"
import {
  HardHat,
  TrendingUp,
  BarChart3,
  TableIcon,
  ChevronRight,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Link2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Layers,
  Target,
  Activity,
  Gauge,
  ArrowRight,
  Settings,
  MoreHorizontal,
  ShieldAlert,
  Ban,
  Lock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// ==================== DADOS MOCKADOS ====================

// PBS - Estrutura Operacional de Producao
const pbsMock = [
  {
    id: "PBS-001",
    codigo: "1",
    descricao: "TERRAPLENAGEM",
    nivel: 1,
    unidade: "-",
    qtdPrevista: null,
    qtdRealizada: null,
    avanco: 68,
    status: "em_andamento",
    vinculoEAP: ["ESC-001", "ESC-002"],
    statusValidacao: "validada", // validada | em_proposta | rejeitada
    temPrazo: true,
    temMetrica: true,
    bloqueado: false,
    motivoBloqueio: null,
    filhos: [
      {
        id: "PBS-001.1",
        codigo: "1.1",
        descricao: "Escavacao Material 1a Categoria",
        nivel: 2,
        unidade: "m³",
        qtdPrevista: 850000,
        qtdRealizada: 612000,
        avanco: 72,
        status: "em_andamento",
        vinculoEAP: ["ESC-001"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-001.2",
        codigo: "1.2",
        descricao: "Escavacao Material 3a Categoria",
        nivel: 2,
        unidade: "m³",
        qtdPrevista: 120000,
        qtdRealizada: 78000,
        avanco: 65,
        status: "em_andamento",
        vinculoEAP: ["ESC-001"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-001.3",
        codigo: "1.3",
        descricao: "Compactacao de Aterro",
        nivel: 2,
        unidade: "m³",
        qtdPrevista: 370000,
        qtdRealizada: 244200,
        avanco: 66,
        status: "em_andamento",
        vinculoEAP: ["ESC-002"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
    ],
  },
  {
    id: "PBS-002",
    codigo: "2",
    descricao: "PAVIMENTACAO",
    nivel: 1,
    unidade: "-",
    qtdPrevista: null,
    qtdRealizada: null,
    avanco: 42,
    status: "em_andamento",
    vinculoEAP: ["ESC-003", "ESC-004"],
    statusValidacao: "validada",
    temPrazo: true,
    temMetrica: true,
    bloqueado: false,
    motivoBloqueio: null,
    filhos: [
      {
        id: "PBS-002.1",
        codigo: "2.1",
        descricao: "Sub-base Granular",
        nivel: 2,
        unidade: "m²",
        qtdPrevista: 280000,
        qtdRealizada: 140000,
        avanco: 50,
        status: "em_andamento",
        vinculoEAP: ["ESC-003"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-002.2",
        codigo: "2.2",
        descricao: "Base Estabilizada",
        nivel: 2,
        unidade: "m²",
        qtdPrevista: 280000,
        qtdRealizada: 112000,
        avanco: 40,
        status: "em_andamento",
        vinculoEAP: ["ESC-003"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-002.3",
        codigo: "2.3",
        descricao: "Revestimento Asfaltico",
        nivel: 2,
        unidade: "m²",
        qtdPrevista: 280000,
        qtdRealizada: 100800,
        avanco: 36,
        status: "em_andamento",
        vinculoEAP: ["ESC-004"],
        statusValidacao: "em_proposta",
        temPrazo: true,
        temMetrica: true,
        bloqueado: true,
        motivoBloqueio: "PBS aguardando validacao do Planejamento",
      },
    ],
  },
  {
    id: "PBS-003",
    codigo: "3",
    descricao: "OBRAS DE ARTE ESPECIAIS",
    nivel: 1,
    unidade: "-",
    qtdPrevista: null,
    qtdRealizada: null,
    avanco: 35,
    status: "em_andamento",
    vinculoEAP: ["ESC-005"],
    statusValidacao: "validada",
    temPrazo: true,
    temMetrica: true,
    bloqueado: false,
    motivoBloqueio: null,
    filhos: [
      {
        id: "PBS-003.1",
        codigo: "3.1",
        descricao: "Fundacoes Profundas",
        nivel: 2,
        unidade: "un",
        qtdPrevista: 120,
        qtdRealizada: 54,
        avanco: 45,
        status: "em_andamento",
        vinculoEAP: ["ESC-005"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-003.2",
        codigo: "3.2",
        descricao: "Estrutura de Concreto",
        nivel: 2,
        unidade: "m³",
        qtdPrevista: 4500,
        qtdRealizada: 1350,
        avanco: 30,
        status: "em_andamento",
        vinculoEAP: ["ESC-005"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-003.3",
        codigo: "3.3",
        descricao: "Superestrutura Metalica",
        nivel: 2,
        unidade: "ton",
        qtdPrevista: 800,
        qtdRealizada: 240,
        avanco: 30,
        status: "em_andamento",
        vinculoEAP: ["ESC-005"],
        statusValidacao: "validada",
        temPrazo: false,
        temMetrica: true,
        bloqueado: true,
        motivoBloqueio: "PBS sem prazo definido pelo Planejamento",
      },
    ],
  },
  {
    id: "PBS-004",
    codigo: "4",
    descricao: "DRENAGEM",
    nivel: 1,
    unidade: "-",
    qtdPrevista: null,
    qtdRealizada: null,
    avanco: 58,
    status: "em_andamento",
    vinculoEAP: ["ESC-006"],
    statusValidacao: "validada",
    temPrazo: true,
    temMetrica: true,
    bloqueado: false,
    motivoBloqueio: null,
    filhos: [
      {
        id: "PBS-004.1",
        codigo: "4.1",
        descricao: "Drenagem Profunda",
        nivel: 2,
        unidade: "m",
        qtdPrevista: 28500,
        qtdRealizada: 18525,
        avanco: 65,
        status: "em_andamento",
        vinculoEAP: ["ESC-006"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: true,
        bloqueado: false,
        motivoBloqueio: null,
      },
      {
        id: "PBS-004.2",
        codigo: "4.2",
        descricao: "Drenagem Superficial",
        nivel: 2,
        unidade: "m",
        qtdPrevista: 45000,
        qtdRealizada: 22500,
        avanco: 50,
        status: "em_andamento",
        vinculoEAP: ["ESC-006"],
        statusValidacao: "validada",
        temPrazo: true,
        temMetrica: false,
        bloqueado: true,
        motivoBloqueio: "PBS sem regra de calculo/metrica definida",
      },
    ],
  },
  {
    id: "PBS-005",
    codigo: "5",
    descricao: "SINALIZACAO",
    nivel: 1,
    unidade: "-",
    qtdPrevista: null,
    qtdRealizada: null,
    avanco: 12,
    status: "em_andamento",
    vinculoEAP: ["ESC-007"],
    statusValidacao: "em_proposta",
    temPrazo: false,
    temMetrica: false,
    bloqueado: true,
    motivoBloqueio: "PBS aguardando validacao, prazo e metrica",
    filhos: [
      {
        id: "PBS-005.1",
        codigo: "5.1",
        descricao: "Sinalizacao Horizontal",
        nivel: 2,
        unidade: "m²",
        qtdPrevista: 45000,
        qtdRealizada: 5400,
        avanco: 12,
        status: "em_andamento",
        vinculoEAP: ["ESC-007"],
        statusValidacao: "em_proposta",
        temPrazo: false,
        temMetrica: false,
        bloqueado: true,
        motivoBloqueio: "PBS aguardando validacao, prazo e metrica",
      },
      {
        id: "PBS-005.2",
        codigo: "5.2",
        descricao: "Sinalizacao Vertical",
        nivel: 2,
        unidade: "un",
        qtdPrevista: 580,
        qtdRealizada: 70,
        avanco: 12,
        status: "em_andamento",
        vinculoEAP: ["ESC-007"],
        statusValidacao: "em_proposta",
        temPrazo: false,
        temMetrica: false,
        bloqueado: true,
        motivoBloqueio: "PBS aguardando validacao, prazo e metrica",
      },
    ],
  },
]

// Mapa Producao -> Custo
const mapaCustoMock = [
  {
    pbsCodigo: "1.1",
    pbsDescricao: "Escavacao Material 1a Categoria",
    eapCusto: "ESC-001",
    eapDescricao: "Escavacao e Carga",
    regraRateio: "100%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "1.2",
    pbsDescricao: "Escavacao Material 3a Categoria",
    eapCusto: "ESC-001",
    eapDescricao: "Escavacao e Carga",
    regraRateio: "100%",
    fatorConversao: 1.2,
    status: "ativo",
  },
  {
    pbsCodigo: "1.3",
    pbsDescricao: "Compactacao de Aterro",
    eapCusto: "ESC-002",
    eapDescricao: "Compactacao",
    regraRateio: "100%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "2.1",
    pbsDescricao: "Sub-base Granular",
    eapCusto: "ESC-003",
    eapDescricao: "Pavimentacao Base",
    regraRateio: "60%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "2.2",
    pbsDescricao: "Base Estabilizada",
    eapCusto: "ESC-003",
    eapDescricao: "Pavimentacao Base",
    regraRateio: "40%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "2.3",
    pbsDescricao: "Revestimento Asfaltico",
    eapCusto: "ESC-004",
    eapDescricao: "Revestimento",
    regraRateio: "100%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "3.1",
    pbsDescricao: "Fundacoes Profundas",
    eapCusto: "ESC-005",
    eapDescricao: "OAE",
    regraRateio: "30%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "3.2",
    pbsDescricao: "Estrutura de Concreto",
    eapCusto: "ESC-005",
    eapDescricao: "OAE",
    regraRateio: "50%",
    fatorConversao: 1.0,
    status: "ativo",
  },
  {
    pbsCodigo: "3.3",
    pbsDescricao: "Superestrutura Metalica",
    eapCusto: "ESC-005",
    eapDescricao: "OAE",
    regraRateio: "20%",
    fatorConversao: 1.0,
    status: "ativo",
  },
]

// Dados de Curva S e producao mensal
const curvaSData = [
  { mes: "Jul/25", previsto: 5, realizado: 4, acumPrev: 5, acumReal: 4 },
  { mes: "Ago/25", previsto: 8, realizado: 9, acumPrev: 13, acumReal: 13 },
  { mes: "Set/25", previsto: 10, realizado: 11, acumPrev: 23, accumReal: 24 },
  { mes: "Out/25", previsto: 12, realizado: 10, acumPrev: 35, accumReal: 34 },
  { mes: "Nov/25", previsto: 14, realizado: 12, accumPrev: 49, acumReal: 46 },
  { mes: "Dez/25", previsto: 12, realizado: 11, accumPrev: 61, acumReal: 57 },
  { mes: "Jan/26", previsto: 10, realizado: 8, acumPrev: 71, acumReal: 65 },
  { mes: "Fev/26", previsto: 8, realizado: null, acumPrev: 79, acumReal: null },
  { mes: "Mar/26", previsto: 7, realizado: null, acumPrev: 86, acumReal: null },
  { mes: "Abr/26", previsto: 6, realizado: null, acumPrev: 92, acumReal: null },
  { mes: "Mai/26", previsto: 5, realizado: null, accumPrev: 97, acumReal: null },
  { mes: "Jun/26", previsto: 3, realizado: null, acumPrev: 100, acumReal: null },
]

// Produtividade por frente
const produtividadeData = [
  { frente: "Terraplenagem", planejado: 12000, realizado: 10500, unidade: "m³/dia", desvio: -12.5 },
  { frente: "Pavimentacao", planejado: 3500, realizado: 3200, unidade: "m²/dia", desvio: -8.6 },
  { frente: "OAE", planejado: 45, realizado: 42, unidade: "m³/dia", desvio: -6.7 },
  { frente: "Drenagem", planejado: 450, realizado: 480, unidade: "m/dia", desvio: 6.7 },
  { frente: "Sinalizacao", planejado: 200, realizado: 180, unidade: "m²/dia", desvio: -10.0 },
]

// Desvios de producao
const desviosMock = [
  {
    id: "DV-001",
    pbs: "1.1",
    descricao: "Escavacao Material 1a Cat",
    previsto: 85000,
    realizado: 72000,
    desvio: -15.3,
    impactoFisico: -2.1,
    impactoCusto: 450000,
    causa: "Chuvas acima da media",
    acao: "Mobilizar equipe adicional",
    status: "aberto",
    responsavel: "Eng. Carlos",
  },
  {
    id: "DV-002",
    pbs: "2.3",
    descricao: "Revestimento Asfaltico",
    previsto: 35000,
    realizado: 28000,
    desvio: -20.0,
    impactoFisico: -1.8,
    impactoCusto: 380000,
    causa: "Atraso usina asfalto",
    acao: "Antecipar turno noturno",
    status: "em_tratamento",
    responsavel: "Eng. Ana",
  },
  {
    id: "DV-003",
    pbs: "3.2",
    descricao: "Estrutura de Concreto",
    previsto: 450,
    realizado: 380,
    desvio: -15.6,
    impactoFisico: -1.2,
    impactoCusto: 220000,
    causa: "Falta de aco CA-50",
    acao: "Fornecedor alternativo",
    status: "resolvido",
    responsavel: "Eng. Pedro",
  },
  {
    id: "DV-004",
    pbs: "4.1",
    descricao: "Drenagem Profunda",
    previsto: 2800,
    realizado: 3100,
    desvio: 10.7,
    impactoFisico: 0.5,
    impactoCusto: -45000,
    causa: "Otimizacao de processo",
    acao: "-",
    status: "positivo",
    responsavel: "Eng. Maria",
  },
]

// Medicoes de producao
const medicoesMock = [
  {
    id: "MED-001",
    periodo: "Janeiro/2026",
    valorBruto: 12450000,
    retencoes: 622500,
    valorLiquido: 11827500,
    status: "aprovada",
    dataAprovacao: "2026-01-25",
  },
  {
    id: "MED-002",
    periodo: "Dezembro/2025",
    valorBruto: 11800000,
    retencoes: 590000,
    valorLiquido: 11210000,
    status: "aprovada",
    dataAprovacao: "2025-12-28",
  },
  {
    id: "MED-003",
    periodo: "Novembro/2025",
    valorBruto: 10950000,
    retencoes: 547500,
    valorLiquido: 10402500,
    status: "aprovada",
    dataAprovacao: "2025-11-27",
  },
]

// Parametrizacao PBS
const parametrizacaoPBS = [
  {
    id: "PBS-001.1",
    descricao: "Escavacao Material 1a Categoria",
    unidade: "m³",
    regraCalculo: "Volume = L x A x H",
    fonteRDO: "Apontamento diario",
    tolerancia: 5,
    status: "configurado",
  },
  {
    id: "PBS-001.2",
    descricao: "Escavacao Material 3a Categoria",
    unidade: "m³",
    regraCalculo: "Volume = L x A x H",
    fonteRDO: "Apontamento diario",
    tolerancia: 5,
    status: "configurado",
  },
  {
    id: "PBS-001.3",
    descricao: "Compactacao de Aterro",
    unidade: "m³",
    regraCalculo: "Volume compactado",
    fonteRDO: "Apontamento diario",
    tolerancia: 3,
    status: "configurado",
  },
  {
    id: "PBS-002.1",
    descricao: "Sub-base Granular",
    unidade: "m²",
    regraCalculo: "Area = L x C",
    fonteRDO: "Medicao topografica",
    tolerancia: 2,
    status: "configurado",
  },
  {
    id: "PBS-002.2",
    descricao: "Base Estabilizada",
    unidade: "m²",
    regraCalculo: "Area = L x C",
    fonteRDO: "Medicao topografica",
    tolerancia: 2,
    status: "pendente",
  },
  {
    id: "PBS-002.3",
    descricao: "Revestimento Asfaltico",
    unidade: "m²",
    regraCalculo: "Area = L x C",
    fonteRDO: "Controle usina",
    tolerancia: 1,
    status: "pendente",
  },
]

const canReceiveAvanco = (pbs: any) => {
  return pbs.statusValidacao === "validada" && pbs.temPrazo && pbs.temMetrica && !pbs.bloqueado
}

const getPBSConformidade = (pbs: any) => {
  const pendencias = []
  if (pbs.statusValidacao !== "validada") pendencias.push("Validacao")
  if (!pbs.temPrazo) pendencias.push("Prazo")
  if (!pbs.temMetrica) pendencias.push("Metrica")
  return {
    conforme: pendencias.length === 0,
    pendencias,
  }
}

const bloqueioStats = {
  semValidacao: pbsMock.flatMap((p) => [p, ...(p.filhos || [])]).filter((p) => p.statusValidacao !== "validada").length,
  semPrazo: pbsMock.flatMap((p) => [p, ...(p.filhos || [])]).filter((p) => !p.temPrazo).length,
  semMetrica: pbsMock.flatMap((p) => [p, ...(p.filhos || [])]).filter((p) => !p.temMetrica).length,
  totalBloqueados: pbsMock.flatMap((p) => [p, ...(p.filhos || [])]).filter((p) => p.bloqueado).length,
}

function formatNumber(value: number | null) {
  if (value === null) return "-"
  return new Intl.NumberFormat("pt-BR").format(value)
}

function formatCurrency(value: number | null) {
  if (value === null) return "-"
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

// Componente CircularProgress para graficos de progresso
function CircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  color = "hsl(var(--primary))",
}: { value: number | null; size?: number; strokeWidth?: number; color?: string }) {
  if (value === null) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold">-</span>
        </div>
      </div>
    )
  }

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold">{value}%</span>
      </div>
    </div>
  )
}

// Custom Tooltip para graficos
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {typeof entry.value === "number" ? formatNumber(entry.value) : entry.value}
              {entry.unit || "%"}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function ProducaoContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [viewMode, setViewMode] = useState<{ [key: string]: "grafico" | "tabela" }>({
    curvaS: "grafico",
    produtividade: "grafico",
    avancoPBS: "grafico",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPBS, setSelectedPBS] = useState<any>(null)
  const [expandedPBS, setExpandedPBS] = useState<string[]>(["PBS-001", "PBS-002"])
  const [periodoSelecionado, setPeriodoSelecionado] = useState("Jan/2026")

  // Toggle view mode
  const toggleView = (card: string) => {
    setViewMode((prev) => ({
      ...prev,
      [card]: prev[card] === "grafico" ? "tabela" : "grafico",
    }))
  }

  // Calcular KPIs
  const avancoGeral = 65 // A ser calculado dinamicamente
  const idp = 0.92 // A ser calculado dinamicamente
  const produtividadeMedia = 94 // A ser calculado dinamicamente
  const desviosAbertos = desviosMock.filter((d) => d.status === "aberto" || d.status === "em_tratamento").length
  const blockedPBSCount = pbsMock.reduce(
    (acc, p) =>
      acc + (p.bloqueado ? 1 : 0) + p.filhos.reduce((childAcc, child) => childAcc + (child.bloqueado ? 1 : 0), 0),
    0,
  )

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-4/10">
              <HardHat className="w-6 h-6 text-chart-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">Producao</h1>
                <Badge variant="outline" className="font-mono">
                  PR-01
                </Badge>
                <InfoTooltip
                  title="Modulo de Producao"
                  description="Gerenciamento da producao fisica da obra: PBS, RDO, mapa de custos, analise de desvios e medicoes de producao."
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
              Novo Apontamento
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avanco Geral</span>
            </div>
            <p className="text-xl font-bold text-primary mt-1">{avancoGeral}%</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">IDP</span>
            </div>
            <p
              className={`text-xl font-bold mt-1 ${idp >= 1 ? "text-primary" : idp >= 0.9 ? "text-chart-4" : "text-destructive"}`}
            >
              {idp.toFixed(2)}
            </p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Produtividade</span>
            </div>
            <p className="text-xl font-bold mt-1">{produtividadeMedia}%</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Itens PBS</span>
            </div>
            <p className="text-xl font-bold mt-1">{pbsMock.reduce((acc, p) => acc + (p.filhos?.length || 0) + 1, 0)}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Mapeamentos</span>
            </div>
            <p className="text-xl font-bold mt-1">{mapaCustoMock.length}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Medicoes</span>
            </div>
            <p className="text-xl font-bold mt-1">{medicoesMock.length}</p>
          </Card>
          <Card className={`p-3 ${desviosAbertos > 0 ? "border-chart-4/50" : ""}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Desvios</span>
            </div>
            <p className={`text-xl font-bold mt-1 ${desviosAbertos > 0 ? "text-chart-4" : "text-primary"}`}>
              {desviosAbertos}
            </p>
          </Card>
          <Card className={`p-3 ${blockedPBSCount > 0 ? "border-red-500/50" : ""}`}>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">PBS Bloqueados</span>
            </div>
            <p className={`text-xl font-bold mt-1 ${blockedPBSCount > 0 ? "text-destructive" : "text-primary"}`}>
              {blockedPBSCount}
            </p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tendencia</span>
            </div>
            <p className="text-xl font-bold text-chart-4 mt-1">-6%</p>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-6 pt-4 border-b">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="pbs">PBS</TabsTrigger>
            <TabsTrigger value="parametrizacao">Parametrizacao</TabsTrigger>
            <TabsTrigger value="mapa-custo">Mapa Custo</TabsTrigger>
            <TabsTrigger value="desvios">Desvios</TabsTrigger>
            <TabsTrigger value="medicoes">Medicoes</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          <TabsContent value="dashboard" className="mt-0 space-y-6">
            {/* Curva S */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Curva S - Avanco Fisico</CardTitle>
                    <CardDescription>Comparativo previsto x realizado acumulado</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode.curvaS === "grafico" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => toggleView("curvaS")}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode.curvaS === "tabela" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => toggleView("curvaS")}
                    >
                      <TableIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode.curvaS === "grafico" ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={curvaSData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="acumPrev"
                        name="Previsto Acum."
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--muted-foreground))"
                        strokeDasharray="5 5"
                      />
                      <Area
                        type="monotone"
                        dataKey="acumReal"
                        name="Realizado Acum."
                        fill="hsl(var(--primary)/0.3)"
                        stroke="hsl(var(--primary))"
                      />
                      <Line
                        type="monotone"
                        dataKey="previsto"
                        name="Previsto Mensal"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="realizado"
                        name="Realizado Mensal"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <ReferenceLine
                        y={65}
                        stroke="hsl(var(--destructive))"
                        strokeDasharray="3 3"
                        label={{ value: "Atual", position: "right", fontSize: 10 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mes</TableHead>
                        <TableHead className="text-right">Prev. Mensal</TableHead>
                        <TableHead className="text-right">Real. Mensal</TableHead>
                        <TableHead className="text-right">Prev. Acum.</TableHead>
                        <TableHead className="text-right">Real. Acum.</TableHead>
                        <TableHead className="text-right">Desvio</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {curvaSData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{row.mes}</TableCell>
                          <TableCell className="text-right font-mono">{row.previsto}%</TableCell>
                          <TableCell className="text-right font-mono">
                            {row.realizado !== null ? `${row.realizado}%` : "-"}
                          </TableCell>
                          <TableCell className="text-right font-mono">{row.acumPrev}%</TableCell>
                          <TableCell className="text-right font-mono">
                            {row.acumReal !== null ? `${row.acumReal}%` : "-"}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {row.acumReal !== null ? (
                              <span className={row.acumReal >= row.acumPrev ? "text-primary" : "text-destructive"}>
                                {row.acumReal - row.acumPrev > 0 ? "+" : ""}
                                {row.acumReal - row.acumPrev}%
                              </span>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            {row.realizado === null ? (
                              <Badge variant="outline">Projetado</Badge>
                            ) : row.acumReal! >= row.acumPrev ? (
                              <Badge className="bg-primary/20 text-primary">No prazo</Badge>
                            ) : (
                              <Badge variant="outline" className="text-chart-4">
                                Atrasado
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Produtividade por Frente */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Produtividade por Frente</CardTitle>
                      <CardDescription>Planejado x Realizado</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode.produtividade === "grafico" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => toggleView("produtividade")}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode.produtividade === "tabela" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => toggleView("produtividade")}
                      >
                        <TableIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode.produtividade === "grafico" ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={produtividadeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          dataKey="frente"
                          type="category"
                          tick={{ fontSize: 11 }}
                          stroke="hsl(var(--muted-foreground))"
                          width={100}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="planejado" name="Planejado" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="realizado" name="Realizado" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Frente</TableHead>
                          <TableHead className="text-right">Planejado</TableHead>
                          <TableHead className="text-right">Realizado</TableHead>
                          <TableHead className="text-right">Desvio</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {produtividadeData.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{row.frente}</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatNumber(row.planejado)} {row.unidade}
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              {formatNumber(row.realizado)} {row.unidade}
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              <span className={row.desvio >= 0 ? "text-primary" : "text-destructive"}>
                                {row.desvio > 0 ? "+" : ""}
                                {row.desvio.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell>
                              {row.desvio >= 0 ? (
                                <Badge className="bg-primary/20 text-primary">OK</Badge>
                              ) : row.desvio >= -10 ? (
                                <Badge variant="outline" className="text-chart-4">
                                  Atencao
                                </Badge>
                              ) : (
                                <Badge variant="destructive">Critico</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Avanco por PBS */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Avanco por Disciplina</CardTitle>
                      <CardDescription>Progresso por categoria PBS</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode.avancoPBS === "grafico" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => toggleView("avancoPBS")}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode.avancoPBS === "tabela" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => toggleView("avancoPBS")}
                      >
                        <TableIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode.avancoPBS === "grafico" ? (
                    <div className="space-y-4">
                      {pbsMock.map((pbs) => (
                        <div key={pbs.id} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{pbs.descricao}</span>
                            <span className="font-mono">{pbs.avanco}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                pbs.avanco >= 80
                                  ? "bg-primary"
                                  : pbs.avanco >= 50
                                    ? "bg-chart-1"
                                    : pbs.avanco >= 30
                                      ? "bg-chart-4"
                                      : "bg-destructive"
                              }`}
                              style={{ width: `${pbs.avanco}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Disciplina</TableHead>
                          <TableHead className="text-right">Avanco</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Acoes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pbsMock.map((pbs) => (
                          <TableRow key={pbs.id}>
                            <TableCell className="font-medium">{pbs.descricao}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <CircularProgress value={pbs.avanco} size={32} strokeWidth={3} />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  pbs.avanco >= 80
                                    ? "bg-primary/20 text-primary"
                                    : pbs.avanco >= 50
                                      ? "bg-chart-1/20 text-chart-1"
                                      : pbs.avanco >= 30
                                        ? "bg-chart-4/20 text-chart-4"
                                        : "bg-destructive/20 text-destructive"
                                }
                              >
                                {pbs.status === "em_andamento" ? "Em Andamento" : "Nao Iniciado"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
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

            {/* Alertas de Desvio */}
            {desviosMock.filter((d) => d.status === "aberto" || d.status === "em_tratamento").length > 0 && (
              <Card className="border-chart-4/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-chart-4" />
                    <CardTitle className="text-base">Alertas de Desvio</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {desviosMock
                      .filter((d) => d.status === "aberto" || d.status === "em_tratamento")
                      .map((desvio) => (
                        <div
                          key={desvio.id}
                          className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              {desvio.pbs}
                            </Badge>
                            <div>
                              <p className="font-medium text-sm">{desvio.descricao}</p>
                              <p className="text-xs text-muted-foreground">{desvio.causa}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-mono text-destructive">{desvio.desvio.toFixed(1)}%</p>
                              <p className="text-xs text-muted-foreground">
                                Impacto: {formatCurrency(desvio.impactoCusto)}
                              </p>
                            </div>
                            <Badge
                              variant={desvio.status === "aberto" ? "destructive" : "outline"}
                              className={desvio.status === "em_tratamento" ? "text-chart-4" : ""}
                            >
                              {desvio.status === "aberto" ? "Aberto" : "Em Tratamento"}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alertas de PBS Bloqueado */}
            {blockedPBSCount > 0 && (
              <Card className="border-destructive/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-destructive" />
                    <CardTitle className="text-base">Alertas de PBS Bloqueado</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pbsMock
                      .filter((p) => p.bloqueado)
                      .map((pbs) => (
                        <Alert key={pbs.id} variant="destructive">
                          <ShieldAlert className="h-4 w-4" />
                          <AlertTitle>
                            PBS Bloqueado: {pbs.codigo} - {pbs.descricao}
                          </AlertTitle>
                          <AlertDescription>
                            Motivo: {pbs.motivoBloqueio}. Por favor, regularize a situação.
                            {pbs.filhos.some((f) => f.bloqueado) && (
                              <>
                                <br />
                                Itens filhos bloqueados:
                                <ul className="list-disc list-inside">
                                  {pbs.filhos
                                    .filter((f) => f.bloqueado)
                                    .map((filho) => (
                                      <li key={filho.id}>
                                        {filho.codigo} - {filho.descricao} ({filho.motivoBloqueio})
                                      </li>
                                    ))}
                                </ul>
                              </>
                            )}
                          </AlertDescription>
                        </Alert>
                      ))}
                    {pbsMock
                      .flatMap((p) => p.filhos.filter((f) => f.bloqueado && !p.bloqueado))
                      .map((filho) => (
                        <Alert key={filho.id} variant="destructive">
                          <ShieldAlert className="h-4 w-4" />
                          <AlertTitle>
                            PBS Bloqueado: {filho.codigo} - {filho.descricao}
                          </AlertTitle>
                          <AlertDescription>
                            Motivo: {filho.motivoBloqueio}. Por favor, regularize a situação.
                          </AlertDescription>
                        </Alert>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PBS - Estrutura Operacional */}
          <TabsContent value="pbs" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Estrutura PBS</h3>
                <p className="text-sm text-muted-foreground">Production Breakdown Structure - Estrutura Operacional</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Item
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Liberado</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Sem Validacao</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Sem Prazo</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Sem Metrica</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-red-500" />
                <span>Bloqueado</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Qtd Prevista</TableHead>
                      <TableHead className="text-right">Qtd Realizada</TableHead>
                      <TableHead className="text-center">Avanco</TableHead>
                      <TableHead className="text-center">Conformidade</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pbsMock.map((pbs) => {
                      const conformidade = getPBSConformidade(pbs)
                      return (
                        <>
                          <TableRow key={pbs.id} className={`font-medium ${pbs.bloqueado ? "bg-red-50/50" : ""}`}>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  if (expandedPBS.includes(pbs.id)) {
                                    setExpandedPBS(expandedPBS.filter((id) => id !== pbs.id))
                                  } else {
                                    setExpandedPBS([...expandedPBS, pbs.id])
                                  }
                                }}
                              >
                                <ChevronRight
                                  className={`h-4 w-4 transition-transform ${
                                    expandedPBS.includes(pbs.id) ? "rotate-90" : ""
                                  }`}
                                />
                              </Button>
                            </TableCell>
                            <TableCell className="font-mono">{pbs.codigo}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {pbs.descricao}
                                {pbs.bloqueado && <Lock className="h-4 w-4 text-red-500" />}
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">-</TableCell>
                            <TableCell className="text-right text-muted-foreground">-</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={pbs.avanco >= 60 ? "default" : "secondary"}>{pbs.avanco}%</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {conformidade.conforme ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  OK
                                </Badge>
                              ) : (
                                <div className="flex items-center justify-center gap-1">
                                  {!pbs.statusValidacao ||
                                    (pbs.statusValidacao !== "validada" && (
                                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 text-xs">
                                        Val
                                      </Badge>
                                    ))}
                                  {!pbs.temPrazo && (
                                    <Badge variant="outline" className="bg-orange-100 text-orange-700 text-xs">
                                      Pz
                                    </Badge>
                                  )}
                                  {!pbs.temMetrica && (
                                    <Badge variant="outline" className="bg-red-100 text-red-700 text-xs">
                                      Mt
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="bg-blue-50">
                                {pbs.status === "em_andamento" ? "Em andamento" : pbs.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  {pbs.bloqueado ? (
                                    <DropdownMenuItem disabled className="text-red-500">
                                      <Ban className="h-4 w-4 mr-2" />
                                      Apontamento Bloqueado
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem>
                                      <Plus className="h-4 w-4 mr-2" />
                                      Novo Apontamento
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Link2 className="h-4 w-4 mr-2" />
                                    Ver Vinculo EAP
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          {/* Filhos */}
                          {expandedPBS.includes(pbs.id) &&
                            pbs.filhos?.map((filho) => {
                              const filhoConformidade = getPBSConformidade(filho)
                              return (
                                <TableRow
                                  key={filho.id}
                                  className={`text-sm ${filho.bloqueado ? "bg-red-50/30" : "bg-muted/30"}`}
                                >
                                  <TableCell></TableCell>
                                  <TableCell className="font-mono pl-8">{filho.codigo}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      {filho.descricao}
                                      {filho.bloqueado && <Lock className="h-3 w-3 text-red-500" />}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {filho.qtdPrevista?.toLocaleString("pt-BR")} {filho.unidade}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {filho.qtdRealizada?.toLocaleString("pt-BR")} {filho.unidade}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant={filho.avanco >= 60 ? "default" : "secondary"}>
                                      {filho.avanco}%
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {filhoConformidade.conforme ? (
                                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        OK
                                      </Badge>
                                    ) : (
                                      <div className="flex items-center justify-center gap-1">
                                        {filho.statusValidacao !== "validada" && (
                                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 text-xs">
                                            Val
                                          </Badge>
                                        )}
                                        {!filho.temPrazo && (
                                          <Badge variant="outline" className="bg-orange-100 text-orange-700 text-xs">
                                            Pz
                                          </Badge>
                                        )}
                                        {!filho.temMetrica && (
                                          <Badge variant="outline" className="bg-red-100 text-red-700 text-xs">
                                            Mt
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline">
                                      {filho.status === "em_andamento" ? "Em andamento" : filho.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="h-4 w-4 mr-2" />
                                          Ver Detalhes
                                        </DropdownMenuItem>
                                        {filho.bloqueado ? (
                                          <DropdownMenuItem disabled className="text-red-500">
                                            <Ban className="h-4 w-4 mr-2" />
                                            Apontamento Bloqueado
                                          </DropdownMenuItem>
                                        ) : (
                                          <DropdownMenuItem>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Novo Apontamento
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem>
                                          <Link2 className="h-4 w-4 mr-2" />
                                          Ver Vinculo EAP
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
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
          </TabsContent>

          {/* Parametrizacao PBS */}
          <TabsContent value="parametrizacao" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Parametrizacao PBS</h3>
                <p className="text-sm text-muted-foreground">
                  Defina regras de calculo, fonte de dados e tolerancias para cada item da PBS
                </p>
              </div>
              <Button size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurar em Lote
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Regra de Calculo</TableHead>
                      <TableHead>Fonte RDO</TableHead>
                      <TableHead className="text-center">Tolerancia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parametrizacaoPBS.map((param) => (
                      <TableRow key={param.id}>
                        <TableCell className="font-mono">{param.id.replace("PBS-", "")}</TableCell>
                        <TableCell className="font-medium">{param.descricao}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{param.unidade}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{param.regraCalculo}</TableCell>
                        <TableCell className="text-sm">{param.fonteRDO}</TableCell>
                        <TableCell className="text-center font-mono">±{param.tolerancia}%</TableCell>
                        <TableCell>
                          {param.status === "configurado" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Configurado
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
                              <Clock className="w-3 h-3 mr-1" /> Pendente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MAPA Producao -> Custo */}
          <TabsContent value="mapa-custo" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Mapa Producao → Custo</h3>
                <p className="text-sm text-muted-foreground">
                  Vinculacao entre itens da PBS e EAP de Custo com regras de rateio
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Vinculo
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PBS Codigo</TableHead>
                      <TableHead>PBS Descricao</TableHead>
                      <TableHead>
                        <ArrowRight className="w-4 h-4" />
                      </TableHead>
                      <TableHead>EAP Custo</TableHead>
                      <TableHead>EAP Descricao</TableHead>
                      <TableHead className="text-center">Regra Rateio</TableHead>
                      <TableHead className="text-center">Fator Conv.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mapaCustoMock.map((mapa, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-mono font-bold">{mapa.pbsCodigo}</TableCell>
                        <TableCell className="font-medium">{mapa.pbsDescricao}</TableCell>
                        <TableCell>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell className="font-mono">{mapa.eapCusto}</TableCell>
                        <TableCell>{mapa.eapDescricao}</TableCell>
                        <TableCell className="text-center font-mono">{mapa.regraRateio}</TableCell>
                        <TableCell className="text-center font-mono">{mapa.fatorConversao.toFixed(1)}x</TableCell>
                        <TableCell>
                          <Badge className="bg-primary/20 text-primary">Ativo</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-destructive" />
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

          {/* Desvios */}
          <TabsContent value="desvios" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Select defaultValue="todos">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="em_tratamento">Em Tratamento</SelectItem>
                    <SelectItem value="resolvido">Resolvido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Desvio
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>PBS</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Previsto</TableHead>
                      <TableHead className="text-right">Realizado</TableHead>
                      <TableHead className="text-right">Desvio</TableHead>
                      <TableHead className="text-right">Impacto Custo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {desviosMock.map((desvio) => (
                      <TableRow key={desvio.id}>
                        <TableCell className="font-mono">{desvio.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {desvio.pbs}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{desvio.descricao}</TableCell>
                        <TableCell className="text-right font-mono">{formatNumber(desvio.previsto)}</TableCell>
                        <TableCell className="text-right font-mono">{formatNumber(desvio.realizado)}</TableCell>
                        <TableCell className="text-right font-mono">
                          <span className={desvio.desvio >= 0 ? "text-primary" : "text-destructive"}>
                            {desvio.desvio > 0 ? "+" : ""}
                            {desvio.desvio.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          <span className={desvio.impactoCusto < 0 ? "text-primary" : "text-destructive"}>
                            {formatCurrency(Math.abs(desvio.impactoCusto))}
                          </span>
                        </TableCell>
                        <TableCell>
                          {desvio.status === "aberto" ? (
                            <Badge variant="destructive">Aberto</Badge>
                          ) : desvio.status === "em_tratamento" ? (
                            <Badge variant="outline" className="text-chart-4">
                              Em Tratamento
                            </Badge>
                          ) : desvio.status === "positivo" ? (
                            <Badge className="bg-primary/20 text-primary">Positivo</Badge>
                          ) : (
                            <Badge className="bg-primary/20 text-primary">Resolvido</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{desvio.responsavel}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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

          {/* Medicoes */}
          <TabsContent value="medicoes" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Medicoes de Producao</h3>
                <p className="text-sm text-muted-foreground">Medicoes geradas a partir da producao registrada</p>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Medicao
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Periodo</TableHead>
                      <TableHead className="text-right">Valor Bruto</TableHead>
                      <TableHead className="text-right">Retencoes</TableHead>
                      <TableHead className="text-right">Valor Liquido</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Aprovacao</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicoesMock.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell className="font-mono">{med.id}</TableCell>
                        <TableCell className="font-medium">{med.periodo}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(med.valorBruto)}</TableCell>
                        <TableCell className="text-right font-mono text-destructive">
                          {formatCurrency(med.retencoes)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold">
                          {formatCurrency(med.valorLiquido)}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-primary/20 text-primary">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Aprovada
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(med.dataAprovacao).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
        </div>
      </Tabs>
    </div>
  )
}

export default function ProducaoPage() {
  return (
    <Suspense fallback={null}>
      <ProducaoContent />
    </Suspense>
  )
}
