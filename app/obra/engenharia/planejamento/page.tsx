"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
  ReferenceLine,
} from "recharts"
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowRight,
  Zap,
  Eye,
  Edit,
  ChevronRight,
  ChevronDown,
  TableIcon,
  Layers,
  FileCheck,
  Activity,
  Search,
  Download,
  Settings,
} from "lucide-react"

const pbsPropostaMock = [
  {
    id: "PBS-001",
    descricao: "Escavacao 1a Categoria",
    eapCusto: "1.1",
    quantidade: 850000,
    unidade: "m3",
    peso: 12.5,
    status: "validada",
    responsavel: "Planejamento",
  },
  {
    id: "PBS-002",
    descricao: "Escavacao 2a Categoria",
    eapCusto: "1.2",
    quantidade: 120000,
    unidade: "m3",
    peso: 4.2,
    status: "validada",
    responsavel: "Planejamento",
  },
  {
    id: "PBS-003",
    descricao: "Escavacao 3a Categoria",
    eapCusto: "1.3",
    quantidade: 45000,
    unidade: "m3",
    peso: 2.8,
    status: "validada",
    responsavel: "Planejamento",
  },
  {
    id: "PBS-004",
    descricao: "Compactacao de Aterro",
    eapCusto: "1.4",
    quantidade: 370000,
    unidade: "m3",
    peso: 8.5,
    status: "validada",
    responsavel: "Planejamento",
  },
  {
    id: "PBS-005",
    descricao: "Pavimentacao Asfaltica",
    eapCusto: "2.1",
    quantidade: 280000,
    unidade: "m2",
    peso: 15.3,
    status: "em_proposta",
    responsavel: "Producao",
  },
  {
    id: "PBS-006",
    descricao: "Sub-base Granular",
    eapCusto: "2.2",
    quantidade: 195000,
    unidade: "m3",
    peso: 6.8,
    status: "em_proposta",
    responsavel: "Producao",
  },
  {
    id: "PBS-007",
    descricao: "Fundacoes OAE",
    eapCusto: "3.1",
    quantidade: 48,
    unidade: "un",
    peso: 9.2,
    status: "validada",
    responsavel: "Planejamento",
  },
  {
    id: "PBS-008",
    descricao: "Superestrutura OAE",
    eapCusto: "3.2",
    quantidade: 12,
    unidade: "un",
    peso: 11.5,
    status: "em_proposta",
    responsavel: "Producao",
  },
]

const estruturaPlanejamentoMock = [
  {
    id: "PBS-001",
    descricao: "Escavacao 1a Categoria",
    qtdPrevista: 850000,
    qtdRealizada: 722500,
    saldo: 127500,
    unidade: "m3",
    ritmo: 2800,
    tendencia: "no_prazo",
    status: "em_andamento",
    inicio: "2024-02-01",
    fim: "2026-08-30",
    duracao: 940,
  },
  {
    id: "PBS-002",
    descricao: "Escavacao 2a Categoria",
    qtdPrevista: 120000,
    qtdRealizada: 96000,
    saldo: 24000,
    unidade: "m3",
    ritmo: 450,
    tendencia: "atrasado",
    status: "em_andamento",
    inicio: "2024-03-15",
    fim: "2026-06-15",
    duracao: 820,
  },
  {
    id: "PBS-003",
    descricao: "Escavacao 3a Categoria",
    qtdPrevista: 45000,
    qtdRealizada: 40500,
    saldo: 4500,
    unidade: "m3",
    ritmo: 180,
    tendencia: "adiantado",
    status: "em_andamento",
    inicio: "2024-04-01",
    fim: "2026-03-30",
    duracao: 730,
  },
  {
    id: "PBS-004",
    descricao: "Compactacao de Aterro",
    qtdPrevista: 370000,
    qtdRealizada: 314500,
    saldo: 55500,
    unidade: "m3",
    ritmo: 1850,
    tendencia: "no_prazo",
    status: "em_andamento",
    inicio: "2024-02-15",
    fim: "2026-07-30",
    duracao: 895,
  },
  {
    id: "PBS-005",
    descricao: "Pavimentacao Asfaltica",
    qtdPrevista: 280000,
    qtdRealizada: 70000,
    saldo: 210000,
    unidade: "m2",
    ritmo: 1200,
    tendencia: "atrasado",
    status: "em_andamento",
    inicio: "2025-06-01",
    fim: "2027-09-30",
    duracao: 850,
  },
  {
    id: "PBS-006",
    descricao: "Sub-base Granular",
    qtdPrevista: 195000,
    qtdRealizada: 58500,
    saldo: 136500,
    unidade: "m3",
    ritmo: 650,
    tendencia: "no_prazo",
    status: "em_andamento",
    inicio: "2025-04-01",
    fim: "2027-06-30",
    duracao: 820,
  },
  {
    id: "PBS-007",
    descricao: "Fundacoes OAE",
    qtdPrevista: 48,
    qtdRealizada: 14,
    saldo: 34,
    unidade: "un",
    ritmo: 0.5,
    tendencia: "atrasado",
    status: "em_andamento",
    inicio: "2025-01-01",
    fim: "2027-06-30",
    duracao: 910,
  },
  {
    id: "PBS-008",
    descricao: "Superestrutura OAE",
    qtdPrevista: 12,
    qtdRealizada: 2,
    saldo: 10,
    unidade: "un",
    ritmo: 0.15,
    tendencia: "no_prazo",
    status: "em_andamento",
    inicio: "2025-09-01",
    fim: "2027-10-30",
    duracao: 790,
  },
]

const curvaSFisicaMock = [
  { mes: "Jan/24", planejado: 0.5, realizado: 0.4, acumPlan: 0.5, acumReal: 0.4 },
  { mes: "Fev/24", planejado: 1.2, realizado: 1.0, acumPlan: 1.7, acumReal: 1.4 },
  { mes: "Mar/24", planejado: 2.0, realizado: 1.8, acumPlan: 3.7, acumReal: 3.2 },
  { mes: "Abr/24", planejado: 2.8, realizado: 2.5, acumPlan: 6.5, acumReal: 5.7 },
  { mes: "Mai/24", planejado: 3.5, realizado: 3.2, acumPlan: 10.0, acumReal: 8.9 },
  { mes: "Jun/24", planejado: 4.0, realizado: 3.8, acumPlan: 14.0, acumReal: 12.7 },
  { mes: "Jul/24", planejado: 4.2, realizado: 4.5, acumPlan: 18.2, acumReal: 17.2 },
  { mes: "Ago/24", planejado: 4.5, realizado: 4.8, acumPlan: 22.7, acumReal: 22.0 },
  { mes: "Set/24", planejado: 4.8, realizado: 5.0, acumPlan: 27.5, acumReal: 27.0 },
  { mes: "Out/24", planejado: 5.0, realizado: 5.2, acumPlan: 32.5, acumReal: 32.2 },
  { mes: "Nov/24", planejado: 5.2, realizado: 5.5, acumPlan: 37.7, acumReal: 37.7 },
  { mes: "Dez/24", planejado: 5.3, realizado: 5.8, acumPlan: 43.0, acumReal: 43.5 },
  { mes: "Jan/25", planejado: 5.5, realizado: 5.6, acumPlan: 48.5, acumReal: 49.1 },
  { mes: "Fev/25", planejado: 5.5, realizado: 5.4, acumPlan: 54.0, acumReal: 54.5 },
  { mes: "Mar/25", planejado: 5.3, realizado: 5.2, acumPlan: 59.3, acumReal: 59.7 },
  { mes: "Abr/25", planejado: 5.0, realizado: 4.8, acumPlan: 64.3, acumReal: 64.5 },
  { mes: "Mai/25", planejado: 4.8, realizado: 4.5, acumPlan: 69.1, acumReal: 69.0 },
  { mes: "Jun/25", planejado: 4.5, realizado: null, acumPlan: 73.6, acumReal: null },
]

const curvaSFinanceiraMock = [
  { mes: "Jan/24", planejado: 8.5, realizado: 7.2, acumPlan: 8.5, acumReal: 7.2 },
  { mes: "Fev/24", planejado: 12.3, realizado: 10.8, acumPlan: 20.8, acumReal: 18.0 },
  { mes: "Mar/24", planejado: 15.2, realizado: 14.5, acumPlan: 36.0, acumReal: 32.5 },
  { mes: "Abr/24", planejado: 18.5, realizado: 17.2, acumPlan: 54.5, acumReal: 49.7 },
  { mes: "Mai/24", planejado: 22.0, realizado: 20.8, acumPlan: 76.5, acumReal: 70.5 },
  { mes: "Jun/24", planejado: 24.5, realizado: 23.5, acumPlan: 101.0, acumReal: 94.0 },
  { mes: "Jul/24", planejado: 26.0, realizado: 27.2, acumPlan: 127.0, acumReal: 121.2 },
  { mes: "Ago/24", planejado: 27.5, realizado: 28.8, acumPlan: 154.5, acumReal: 150.0 },
  { mes: "Set/24", planejado: 28.0, realizado: 29.5, acumPlan: 182.5, acumReal: 179.5 },
  { mes: "Out/24", planejado: 28.5, realizado: 30.0, acumPlan: 211.0, acumReal: 209.5 },
  { mes: "Nov/24", planejado: 29.0, realizado: 31.2, acumPlan: 240.0, acumReal: 240.7 },
  { mes: "Dez/24", planejado: 29.5, realizado: 32.5, acumPlan: 269.5, acumReal: 273.2 },
]

const histogramaMOMock = [
  { mes: "Jan/24", planejado: 180, realizado: 165 },
  { mes: "Fev/24", planejado: 220, realizado: 205 },
  { mes: "Mar/24", planejado: 280, realizado: 265 },
  { mes: "Abr/24", planejado: 320, realizado: 310 },
  { mes: "Mai/24", planejado: 350, realizado: 345 },
  { mes: "Jun/24", planejado: 380, realizado: 375 },
  { mes: "Jul/24", planejado: 400, realizado: 395 },
  { mes: "Ago/24", planejado: 420, realizado: 410 },
  { mes: "Set/24", planejado: 430, realizado: 425 },
  { mes: "Out/24", planejado: 440, realizado: 435 },
  { mes: "Nov/24", planejado: 445, realizado: 440 },
  { mes: "Dez/24", planejado: 450, realizado: 448 },
]

const histogramaEquipMock = [
  { mes: "Jan/24", planejado: 45, realizado: 42 },
  { mes: "Fev/24", planejado: 58, realizado: 55 },
  { mes: "Mar/24", planejado: 72, realizado: 68 },
  { mes: "Abr/24", planejado: 85, realizado: 82 },
  { mes: "Mai/24", planejado: 95, realizado: 92 },
  { mes: "Jun/24", planejado: 105, realizado: 100 },
  { mes: "Jul/24", planejado: 112, realizado: 108 },
  { mes: "Ago/24", planejado: 118, realizado: 115 },
  { mes: "Set/24", planejado: 122, realizado: 120 },
  { mes: "Out/24", planejado: 125, realizado: 123 },
  { mes: "Nov/24", planejado: 128, realizado: 126 },
  { mes: "Dez/24", planejado: 130, realizado: 128 },
]

const ganttMock = [
  { id: "FASE-01", nome: "Mobilizacao", inicio: 0, duracao: 30, status: "concluido", critico: false },
  { id: "FASE-02", nome: "Terraplenagem", inicio: 30, duracao: 880, status: "em_andamento", critico: true },
  { id: "FASE-03", nome: "Pavimentacao", inicio: 500, duracao: 940, status: "em_andamento", critico: false },
  { id: "FASE-04", nome: "OAE - Fundacoes", inicio: 365, duracao: 450, status: "em_andamento", critico: true },
  { id: "FASE-05", nome: "OAE - Superestrutura", inicio: 815, duracao: 400, status: "nao_iniciado", critico: true },
  { id: "FASE-06", nome: "Sinalizacao", inicio: 1200, duracao: 210, status: "nao_iniciado", critico: false },
  { id: "FASE-07", nome: "Desmobilizacao", inicio: 1380, duracao: 30, status: "nao_iniciado", critico: false },
]

const eapCustoMock = [
  { codigo: "1", descricao: "TERRAPLENAGEM", valor: 183486000, peso: 45.2 },
  { codigo: "1.1", descricao: "Escavacao 1a Categoria", valor: 38250000, peso: 9.4, pai: "1" },
  { codigo: "1.2", descricao: "Escavacao 2a Categoria", valor: 12600000, peso: 3.1, pai: "1" },
  { codigo: "1.3", descricao: "Escavacao 3a Categoria", valor: 8550000, peso: 2.1, pai: "1" },
  { codigo: "1.4", descricao: "Compactacao de Aterro", valor: 66600000, peso: 16.4, pai: "1" },
  { codigo: "2", descricao: "PAVIMENTACAO", valor: 82970000, peso: 20.5 },
  { codigo: "2.1", descricao: "Pavimentacao Asfaltica", valor: 56000000, peso: 13.8, pai: "2" },
  { codigo: "2.2", descricao: "Sub-base Granular", valor: 26970000, peso: 6.7, pai: "2" },
  { codigo: "3", descricao: "OBRAS DE ARTE ESPECIAIS", valor: 58560000, peso: 14.4 },
  { codigo: "3.1", descricao: "Fundacoes", valor: 24000000, peso: 5.9, pai: "3" },
  { codigo: "3.2", descricao: "Superestrutura", valor: 34560000, peso: 8.5, pai: "3" },
]

// Dados Desvio Fisico x Financeiro
const desvioFisicoFinanceiroMock = [
  { mes: "Jan/24", desvioFisico: -0.1, desvioFinanceiro: -1.3 },
  { mes: "Fev/24", desvioFisico: -0.3, desvioFinanceiro: -2.8 },
  { mes: "Mar/24", desvioFisico: -0.5, desvioFinanceiro: -3.5 },
  { mes: "Abr/24", desvioFisico: -0.8, desvioFinanceiro: -4.8 },
  { mes: "Mai/24", desvioFisico: -1.1, desvioFinanceiro: -6.0 },
  { mes: "Jun/24", desvioFisico: -1.3, desvioFinanceiro: -7.0 },
  { mes: "Jul/24", desvioFisico: -1.0, desvioFinanceiro: -5.8 },
  { mes: "Ago/24", desvioFisico: -0.7, desvioFinanceiro: -4.5 },
  { mes: "Set/24", desvioFisico: -0.5, desvioFinanceiro: -3.0 },
  { mes: "Out/24", desvioFisico: -0.3, desvioFinanceiro: -1.5 },
  { mes: "Nov/24", desvioFisico: 0.0, desvioFinanceiro: 0.7 },
  { mes: "Dez/24", desvioFisico: 0.5, desvioFinanceiro: 3.7 },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-mono font-medium">
              {typeof entry.value === "number" ? entry.value.toFixed(1) : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function PlanejamentoContent() {
  const [tab, setTab] = useState("cenario")
  const [viewMode, setViewMode] = useState<"grafico" | "tabela">("grafico")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [expandedEAP, setExpandedEAP] = useState<string[]>(["1", "2", "3"])

  // Metricas calculadas
  const avancoGeral = 69.0
  const avancoPlanejado = 69.1
  const spi = (avancoGeral / avancoPlanejado).toFixed(2)
  const cpi = 1.02
  const atividadesCriticas = ganttMock.filter((g) => g.critico).length
  const pbsValidadas = pbsPropostaMock.filter((p) => p.status === "validada").length
  const pbsEmProposta = pbsPropostaMock.filter((p) => p.status === "em_proposta").length
  const itensAtrasados = estruturaPlanejamentoMock.filter((e) => e.tendencia === "atrasado").length

  const toggleEAP = (codigo: string) => {
    setExpandedEAP((prev) => (prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]))
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Planejamento e Controle</h1>
            <Badge variant="outline">PL-01</Badge>
            <InfoTooltip
              title="Setor de Planejamento"
              description="Gestao do cronograma, PBS, Curvas S, Histogramas e analise de desvios conforme documento de especificacao."
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Cenario Atual, PBS, Estrutura, Gantt, Curvas S, Histogramas e Desvios
        </p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Target className="w-3 h-3" />
                Avanco Real
              </div>
              <div className="text-xl font-bold text-primary">{avancoGeral}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <BarChart3 className="w-3 h-3" />
                Avanco Plan.
              </div>
              <div className="text-xl font-bold">{avancoPlanejado}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <TrendingUp className="w-3 h-3" />
                SPI
              </div>
              <div className={`text-xl font-bold ${Number(spi) >= 1 ? "text-primary" : "text-destructive"}`}>{spi}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Activity className="w-3 h-3" />
                CPI
              </div>
              <div className={`text-xl font-bold ${cpi >= 1 ? "text-primary" : "text-destructive"}`}>
                {cpi.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className={atividadesCriticas > 0 ? "border-destructive/50" : ""}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Zap className="w-3 h-3" />
                Criticas
              </div>
              <div className={`text-xl font-bold ${atividadesCriticas > 0 ? "text-destructive" : "text-primary"}`}>
                {atividadesCriticas}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <FileCheck className="w-3 h-3" />
                PBS Validadas
              </div>
              <div className="text-xl font-bold text-primary">{pbsValidadas}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Clock className="w-3 h-3" />
                PBS Proposta
              </div>
              <div className="text-xl font-bold text-chart-4">{pbsEmProposta}</div>
            </CardContent>
          </Card>
          <Card className={itensAtrasados > 0 ? "border-destructive/50" : ""}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <AlertTriangle className="w-3 h-3" />
                Atrasados
              </div>
              <div className={`text-xl font-bold ${itensAtrasados > 0 ? "text-destructive" : "text-primary"}`}>
                {itensAtrasados}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="cenario" className="text-xs">
              Cenario Atual
            </TabsTrigger>
            <TabsTrigger value="eap" className="text-xs">
              EAP Custo
            </TabsTrigger>
            <TabsTrigger value="pbs" className="text-xs">
              PBS
            </TabsTrigger>
            <TabsTrigger value="estrutura" className="text-xs">
              Estrutura
            </TabsTrigger>
            <TabsTrigger value="gantt" className="text-xs">
              Gantt
            </TabsTrigger>
            <TabsTrigger value="curvas" className="text-xs">
              Curvas S
            </TabsTrigger>
            <TabsTrigger value="histogramas" className="text-xs">
              Histogramas
            </TabsTrigger>
            <TabsTrigger value="desvios" className="text-xs">
              Desvios
            </TabsTrigger>
          </TabsList>

          {/* TAB: Cenario Atual */}
          <TabsContent value="cenario" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Card Curva S Resumo */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Curva S Fisica (Acumulado)</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant={viewMode === "grafico" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("grafico")}
                      >
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={viewMode === "tabela" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("tabela")}
                      >
                        <TableIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "grafico" ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={curvaSFisicaMock}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="acumPlan"
                          name="Planejado"
                          stroke="hsl(var(--muted-foreground))"
                          strokeDasharray="5 5"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="acumReal"
                          name="Realizado"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="max-h-[200px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Mes</TableHead>
                            <TableHead className="text-xs text-right">Plan. Acum.</TableHead>
                            <TableHead className="text-xs text-right">Real Acum.</TableHead>
                            <TableHead className="text-xs text-right">Desvio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {curvaSFisicaMock.slice(-6).map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-xs">{item.mes}</TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                {item.acumPlan.toFixed(1)}%
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                {item.acumReal?.toFixed(1) || "-"}%
                              </TableCell>
                              <TableCell
                                className={`text-xs text-right font-mono ${(item.acumReal || 0) - item.acumPlan >= 0 ? "text-primary" : "text-destructive"}`}
                              >
                                {item.acumReal ? (item.acumReal - item.acumPlan).toFixed(1) + "%" : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Card Alertas e Riscos */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Alertas e Riscos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {itensAtrasados > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-destructive">{itensAtrasados} itens atrasados</p>
                        <p className="text-xs text-muted-foreground">
                          PBS-002, PBS-005 e PBS-007 requerem acao corretiva
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-chart-4/10 rounded-lg border border-chart-4/20">
                    <Clock className="w-4 h-4 text-chart-4 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-chart-4">{pbsEmProposta} PBS aguardando validacao</p>
                      <p className="text-xs text-muted-foreground">
                        Producao precisa submeter para aprovacao do Planejamento
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary">Tendencia positiva</p>
                      <p className="text-xs text-muted-foreground">SPI e CPI acima de 1.0 nos ultimos 3 meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela resumo PBS */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Resumo PBS - Principais Desvios</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setTab("estrutura")}>
                    Ver Estrutura Completa
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">PBS</TableHead>
                      <TableHead className="text-xs">Descricao</TableHead>
                      <TableHead className="text-xs text-right">Previsto</TableHead>
                      <TableHead className="text-xs text-right">Realizado</TableHead>
                      <TableHead className="text-xs text-center">Progresso</TableHead>
                      <TableHead className="text-xs">Tendencia</TableHead>
                      <TableHead className="text-xs">Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estruturaPlanejamentoMock
                      .filter((e) => e.tendencia === "atrasado" || e.tendencia === "adiantado")
                      .map((item) => {
                        const progresso = (item.qtdRealizada / item.qtdPrevista) * 100
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="text-xs font-mono font-bold">{item.id}</TableCell>
                            <TableCell className="text-xs">{item.descricao}</TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatNumber(item.qtdPrevista)} {item.unidade}
                            </TableCell>
                            <TableCell className="text-xs text-right font-mono">
                              {formatNumber(item.qtdRealizada)} {item.unidade}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center gap-2 justify-center">
                                <Progress value={progresso} className="w-12 h-2" />
                                <span className="text-xs font-mono">{progresso.toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {item.tendencia === "atrasado" && (
                                <Badge variant="destructive" className="text-xs">
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                  Atrasado
                                </Badge>
                              )}
                              {item.tendencia === "adiantado" && (
                                <Badge className="bg-primary/20 text-primary text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Adiantado
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2"
                                onClick={() => setSelectedItem(item)}
                              >
                                <Eye className="w-3 h-3" />
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

          {/* TAB: EAP Custo (Somente Leitura) */}
          <TabsContent value="eap">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">EAP de Custo (Somente Leitura)</CardTitle>
                    <CardDescription>Estrutura definida pelo Comercial - base para criacao de PBS</CardDescription>
                  </div>
                  <Badge variant="secondary">Fonte: Comercial</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Valor Contratual</TableHead>
                      <TableHead className="text-right">Peso %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eapCustoMock.map((item) => {
                      const isParent = !item.pai
                      const isExpanded = expandedEAP.includes(item.codigo)
                      const shouldShow = isParent || expandedEAP.includes(item.pai!)

                      if (!shouldShow) return null

                      return (
                        <TableRow key={item.codigo} className={isParent ? "bg-muted/50 font-semibold" : ""}>
                          <TableCell>
                            {isParent && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => toggleEAP(item.codigo)}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className={`font-mono ${!isParent ? "pl-8" : ""}`}>{item.codigo}</TableCell>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right font-mono">{formatCurrency(item.valor)}</TableCell>
                          <TableCell className="text-right font-mono">{item.peso.toFixed(1)}%</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: PBS Proposta e Validacao */}
          <TabsContent value="pbs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">PBS - Proposta e Validacao</CardTitle>
                    <CardDescription>Producao propoe, Planejamento valida</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger className="w-[150px] h-8">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="em_proposta">Em Proposta</SelectItem>
                        <SelectItem value="validada">Validada</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova PBS
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PBS</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>EAP Custo</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-right">Peso %</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pbsPropostaMock
                      .filter((p) => filtroStatus === "todos" || p.status === filtroStatus)
                      .map((pbs) => (
                        <TableRow key={pbs.id}>
                          <TableCell className="font-mono font-bold">{pbs.id}</TableCell>
                          <TableCell>{pbs.descricao}</TableCell>
                          <TableCell className="font-mono text-muted-foreground">{pbs.eapCusto}</TableCell>
                          <TableCell className="text-right font-mono">{formatNumber(pbs.quantidade)}</TableCell>
                          <TableCell>{pbs.unidade}</TableCell>
                          <TableCell className="text-right font-mono">{pbs.peso.toFixed(1)}%</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{pbs.responsavel}</Badge>
                          </TableCell>
                          <TableCell>
                            {pbs.status === "validada" ? (
                              <Badge className="bg-primary/20 text-primary">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Validada
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-chart-4">
                                <Clock className="w-3 h-3 mr-1" />
                                Em Proposta
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Eye className="w-3 h-3" />
                              </Button>
                              {pbs.status === "em_proposta" && (
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-primary">
                                  <CheckCircle2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Estrutura Planejamento */}
          <TabsContent value="estrutura">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Estrutura de Planejamento</CardTitle>
                    <CardDescription>Qtd Prevista, Realizada, Saldo, Ritmo e Tendencia</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-2.5 top-2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="pl-8 h-8 w-[200px]"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PBS</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Previsto</TableHead>
                      <TableHead className="text-right">Realizado</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead>Un</TableHead>
                      <TableHead className="text-right">Ritmo/dia</TableHead>
                      <TableHead>Tendencia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estruturaPlanejamentoMock
                      .filter((e) => !busca || e.descricao.toLowerCase().includes(busca.toLowerCase()))
                      .map((item) => {
                        const progresso = (item.qtdRealizada / item.qtdPrevista) * 100
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-mono font-bold">{item.id}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell className="text-right font-mono">{formatNumber(item.qtdPrevista)}</TableCell>
                            <TableCell className="text-right font-mono">{formatNumber(item.qtdRealizada)}</TableCell>
                            <TableCell className="text-right font-mono text-muted-foreground">
                              {formatNumber(item.saldo)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{item.unidade}</TableCell>
                            <TableCell className="text-right font-mono">{formatNumber(item.ritmo)}</TableCell>
                            <TableCell>
                              {item.tendencia === "atrasado" && (
                                <Badge variant="destructive" className="text-xs">
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                  Atrasado
                                </Badge>
                              )}
                              {item.tendencia === "no_prazo" && (
                                <Badge variant="outline" className="text-xs">
                                  <ArrowRight className="w-3 h-3 mr-1" />
                                  No Prazo
                                </Badge>
                              )}
                              {item.tendencia === "adiantado" && (
                                <Badge className="bg-primary/20 text-primary text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Adiantado
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={progresso} className="w-12 h-2" />
                                <span className="text-xs font-mono">{progresso.toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2"
                                  onClick={() => setSelectedItem(item)}
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Gantt */}
          <TabsContent value="gantt">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Cronograma Gantt</CardTitle>
                    <CardDescription>Visualizacao das fases com caminho critico</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      Caminho Critico
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Outras Atividades
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ganttMock.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-[180px] text-sm truncate">
                        <span className="font-mono text-muted-foreground mr-2">{item.id}</span>
                        {item.nome}
                      </div>
                      <div className="flex-1 h-8 bg-muted rounded relative">
                        <div
                          className={`absolute h-full rounded ${
                            item.status === "concluido"
                              ? "bg-primary"
                              : item.status === "em_andamento"
                                ? (item.critico ? "bg-destructive" : "bg-chart-1")
                                : "bg-muted-foreground/30"
                          }`}
                          style={{
                            left: `${(item.inicio / 1440) * 100}%`,
                            width: `${(item.duracao / 1440) * 100}%`,
                          }}
                        />
                        {item.critico && item.status !== "concluido" && (
                          <div
                            className="absolute h-full border-2 border-destructive rounded"
                            style={{
                              left: `${(item.inicio / 1440) * 100}%`,
                              width: `${(item.duracao / 1440) * 100}%`,
                            }}
                          />
                        )}
                      </div>
                      <div className="w-[100px] text-right">
                        {item.status === "concluido" && (
                          <Badge className="bg-primary/20 text-primary text-xs">Concluido</Badge>
                        )}
                        {item.status === "em_andamento" && (
                          <Badge variant="outline" className="text-xs">
                            Em Andamento
                          </Badge>
                        )}
                        {item.status === "nao_iniciado" && (
                          <Badge variant="secondary" className="text-xs">
                            Nao Iniciado
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground border-t pt-2">
                  <span>Jan/2024</span>
                  <span>Jan/2025</span>
                  <span>Jan/2026</span>
                  <span>Jan/2027</span>
                  <span>Dez/2027</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Curvas S */}
          <TabsContent value="curvas" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Curva S Fisica */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Curva S Fisica (%)</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant={viewMode === "grafico" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("grafico")}
                      >
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={viewMode === "tabela" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("tabela")}
                      >
                        <TableIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "grafico" ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={curvaSFisicaMock}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Area
                          type="monotone"
                          dataKey="acumPlan"
                          name="Plan. Acum."
                          fill="hsl(var(--muted))"
                          stroke="hsl(var(--muted-foreground))"
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="acumReal"
                          name="Real Acum."
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="max-h-[250px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Mes</TableHead>
                            <TableHead className="text-xs text-right">Plan.</TableHead>
                            <TableHead className="text-xs text-right">Real</TableHead>
                            <TableHead className="text-xs text-right">Plan. Acum.</TableHead>
                            <TableHead className="text-xs text-right">Real Acum.</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {curvaSFisicaMock.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-xs">{item.mes}</TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                {item.planejado.toFixed(1)}%
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                {item.realizado?.toFixed(1) || "-"}%
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                {item.acumPlan.toFixed(1)}%
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                {item.acumReal?.toFixed(1) || "-"}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Curva S Financeira */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Curva S Financeira (R$ Mi)</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant={viewMode === "grafico" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("grafico")}
                      >
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={viewMode === "tabela" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("tabela")}
                      >
                        <TableIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "grafico" ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={curvaSFinanceiraMock}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Area
                          type="monotone"
                          dataKey="acumPlan"
                          name="Plan. Acum."
                          fill="hsl(var(--muted))"
                          stroke="hsl(var(--muted-foreground))"
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="acumReal"
                          name="Real Acum."
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="max-h-[250px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Mes</TableHead>
                            <TableHead className="text-xs text-right">Plan.</TableHead>
                            <TableHead className="text-xs text-right">Real</TableHead>
                            <TableHead className="text-xs text-right">Plan. Acum.</TableHead>
                            <TableHead className="text-xs text-right">Real Acum.</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {curvaSFinanceiraMock.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-xs">{item.mes}</TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                R$ {item.planejado.toFixed(1)}M
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                R$ {item.realizado.toFixed(1)}M
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                R$ {item.acumPlan.toFixed(1)}M
                              </TableCell>
                              <TableCell className="text-xs text-right font-mono">
                                R$ {item.acumReal.toFixed(1)}M
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Curva S Integrada */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Curva S Integrada (Fisica + Financeira)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart
                    data={curvaSFisicaMock.map((f, i) => ({
                      mes: f.mes,
                      fisicoAcum: f.acumReal,
                      fisicoPlan: f.acumPlan,
                      financeiroAcum: curvaSFinanceiraMock[i]?.acumReal,
                      financeiroPlan: curvaSFinanceiraMock[i]?.acumPlan,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 10 }}
                      domain={[0, 100]}
                      label={{ value: "Fisico %", angle: -90, position: "insideLeft", fontSize: 10 }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 10 }}
                      label={{ value: "R$ Mi", angle: 90, position: "insideRight", fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="fisicoAcum"
                      name="Fisico Real"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="fisicoPlan"
                      name="Fisico Plan."
                      stroke="hsl(var(--primary))"
                      strokeDasharray="5 5"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="financeiroAcum"
                      name="Financeiro Real"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="financeiroPlan"
                      name="Financeiro Plan."
                      stroke="hsl(var(--chart-1))"
                      strokeDasharray="5 5"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Histogramas */}
          <TabsContent value="histogramas" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Histograma Mao de Obra */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Histograma - Mao de Obra</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant={viewMode === "grafico" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("grafico")}
                      >
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={viewMode === "tabela" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("tabela")}
                      >
                        <TableIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "grafico" ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={histogramaMOMock}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Bar dataKey="planejado" name="Planejado" fill="hsl(var(--muted-foreground))" opacity={0.5} />
                        <Bar dataKey="realizado" name="Realizado" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="max-h-[250px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Mes</TableHead>
                            <TableHead className="text-xs text-right">Planejado</TableHead>
                            <TableHead className="text-xs text-right">Realizado</TableHead>
                            <TableHead className="text-xs text-right">Desvio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {histogramaMOMock.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-xs">{item.mes}</TableCell>
                              <TableCell className="text-xs text-right font-mono">{item.planejado}</TableCell>
                              <TableCell className="text-xs text-right font-mono">{item.realizado}</TableCell>
                              <TableCell
                                className={`text-xs text-right font-mono ${item.realizado - item.planejado >= 0 ? "text-primary" : "text-destructive"}`}
                              >
                                {item.realizado - item.planejado >= 0 ? "+" : ""}
                                {item.realizado - item.planejado}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Histograma Equipamentos */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Histograma - Equipamentos</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant={viewMode === "grafico" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("grafico")}
                      >
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={viewMode === "tabela" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setViewMode("tabela")}
                      >
                        <TableIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "grafico" ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={histogramaEquipMock}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Bar dataKey="planejado" name="Planejado" fill="hsl(var(--muted-foreground))" opacity={0.5} />
                        <Bar dataKey="realizado" name="Realizado" fill="hsl(var(--chart-1))" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="max-h-[250px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Mes</TableHead>
                            <TableHead className="text-xs text-right">Planejado</TableHead>
                            <TableHead className="text-xs text-right">Realizado</TableHead>
                            <TableHead className="text-xs text-right">Desvio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {histogramaEquipMock.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="text-xs">{item.mes}</TableCell>
                              <TableCell className="text-xs text-right font-mono">{item.planejado}</TableCell>
                              <TableCell className="text-xs text-right font-mono">{item.realizado}</TableCell>
                              <TableCell
                                className={`text-xs text-right font-mono ${item.realizado - item.planejado >= 0 ? "text-primary" : "text-destructive"}`}
                              >
                                {item.realizado - item.planejado >= 0 ? "+" : ""}
                                {item.realizado - item.planejado}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: Desvios */}
          <TabsContent value="desvios" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">Desvio Fisico x Financeiro</CardTitle>
                    <CardDescription>Comparativo mensal de desvios acumulados</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant={viewMode === "grafico" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => setViewMode("grafico")}
                    >
                      <BarChart3 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={viewMode === "tabela" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => setViewMode("tabela")}
                    >
                      <TableIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grafico" ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={desvioFisicoFinanceiroMock}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
                      <Bar dataKey="desvioFisico" name="Desvio Fisico %" fill="hsl(var(--primary))" />
                      <Bar dataKey="desvioFinanceiro" name="Desvio Financeiro %" fill="hsl(var(--chart-1))" />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mes</TableHead>
                        <TableHead className="text-right">Desvio Fisico %</TableHead>
                        <TableHead className="text-right">Desvio Financeiro %</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {desvioFisicoFinanceiroMock.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.mes}</TableCell>
                          <TableCell
                            className={`text-right font-mono ${item.desvioFisico >= 0 ? "text-primary" : "text-destructive"}`}
                          >
                            {item.desvioFisico >= 0 ? "+" : ""}
                            {item.desvioFisico.toFixed(1)}%
                          </TableCell>
                          <TableCell
                            className={`text-right font-mono ${item.desvioFinanceiro >= 0 ? "text-primary" : "text-destructive"}`}
                          >
                            {item.desvioFinanceiro >= 0 ? "+" : ""}
                            {item.desvioFinanceiro.toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            {item.desvioFisico >= 0 && item.desvioFinanceiro >= 0 ? (
                              <Badge className="bg-primary/20 text-primary">OK</Badge>
                            ) : item.desvioFisico < -1 || item.desvioFinanceiro < -5 ? (
                              <Badge variant="destructive">Critico</Badge>
                            ) : (
                              <Badge variant="outline" className="text-chart-4">
                                Atencao
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Sheet Detalhes */}
      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedItem && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  {selectedItem.id} - {selectedItem.descricao}
                </SheetTitle>
                <SheetDescription>Detalhes do item de planejamento</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Qtd Prevista</p>
                    <p className="text-lg font-bold">
                      {formatNumber(selectedItem.qtdPrevista)} {selectedItem.unidade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Qtd Realizada</p>
                    <p className="text-lg font-bold text-primary">
                      {formatNumber(selectedItem.qtdRealizada)} {selectedItem.unidade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Saldo</p>
                    <p className="text-lg font-bold">
                      {formatNumber(selectedItem.saldo)} {selectedItem.unidade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ritmo/dia</p>
                    <p className="text-lg font-bold">
                      {formatNumber(selectedItem.ritmo)} {selectedItem.unidade}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Progresso</p>
                  <Progress value={(selectedItem.qtdRealizada / selectedItem.qtdPrevista) * 100} className="h-3" />
                  <p className="text-right text-sm font-mono mt-1">
                    {((selectedItem.qtdRealizada / selectedItem.qtdPrevista) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Inicio</p>
                    <p className="text-sm font-medium">{new Date(selectedItem.inicio).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fim Previsto</p>
                    <p className="text-sm font-medium">{new Date(selectedItem.fim).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tendencia</p>
                  {selectedItem.tendencia === "atrasado" && (
                    <Badge variant="destructive">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Atrasado - Acao corretiva necessaria
                    </Badge>
                  )}
                  {selectedItem.tendencia === "no_prazo" && (
                    <Badge variant="outline">
                      <ArrowRight className="w-3 h-3 mr-1" />
                      No Prazo - Manter ritmo atual
                    </Badge>
                  )}
                  {selectedItem.tendencia === "adiantado" && (
                    <Badge className="bg-primary/20 text-primary">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Adiantado - Desempenho acima do esperado
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function PlanejamentoPage() {
  return (
    <Suspense fallback={null}>
      <PlanejamentoContent />
    </Suspense>
  )
}
