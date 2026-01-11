"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ObraAdministrativoNavbar } from "../../_components/obra-administrativo-navbar"
import {
  Plus,
  DollarSign,
  Wallet,
  CreditCard,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Download,
  FileText,
  Receipt,
  PiggyBank,
  Target,
  BarChart3,
  PieChartIcon,
  Table,
  Eye,
  Send,
  FileCheck,
  Ban,
  Upload,
  Link,
  RefreshCw,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Landmark,
  ArrowLeftRight,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  BarChart,
  LabelList,
} from "recharts"

const resumoFinanceiro = {
  saldoCaixa: 125000,
  disponibilidadeD7: 85000,
  disponibilidadeD30: 250000,
  disponibilidadeD90: 580000,
  entradas: 3995000,
  saidas: 3870000,
  saldoProjetado: 250000,
  fundoFixoTotal: 5000,
  fundoFixoUtilizado: 1350,
  fundoFixoDisponivel: 3650,
  // CAP e CAR
  capTotal: 12500,
  capVencido: 1500,
  capAVencer7d: 5700,
  capAVencer30d: 5300,
  carTotal: 8500000,
  carVencido: 150000,
  carAVencer: 8350000,
  // Metricas DRE
  receitaAcumulada: 183486000,
  custoAcumulado: 156863100,
  margemBruta: 26622900,
  margemPercentual: 14.51,
  orcamentoMensal: 4200000,
  realizadoMensal: 3870000,
  saldoOrcamento: 330000,
  previsaoProximoMes: 4100000,
  // Conciliacao
  pendenteConciliacao: 23,
  conciliadoMes: 156,
}

const fluxoCaixa = [
  { mes: "Ago", entradas: 2950000, saidas: 2850000, saldo: 100000, acumulado: 100000, projetado: 100000 },
  { mes: "Set", entradas: 3200000, saidas: 3100000, saldo: 100000, acumulado: 200000, projetado: 180000 },
  { mes: "Out", entradas: 3450000, saidas: 3350000, saldo: 100000, acumulado: 300000, projetado: 280000 },
  { mes: "Nov", entradas: 3800000, saidas: 3650000, saldo: 150000, acumulado: 450000, projetado: 400000 },
  { mes: "Dez", entradas: 3995000, saidas: 3870000, saldo: 125000, acumulado: 575000, projetado: 520000 },
  { mes: "Jan", entradas: 2894730, saidas: 2700000, saldo: 194730, acumulado: 769730, projetado: 650000 },
  { mes: "Fev", entradas: null, saidas: null, saldo: null, acumulado: null, projetado: 780000 },
  { mes: "Mar", entradas: null, saidas: null, saldo: null, acumulado: null, projetado: 920000 },
]

const despesasPorCategoria = [
  { categoria: "Mao de Obra", valor: 1548000, percentual: 40, cor: "hsl(var(--primary))" },
  { categoria: "Materiais", valor: 1161000, percentual: 30, cor: "hsl(var(--info))" },
  { categoria: "Equipamentos", valor: 580500, percentual: 15, cor: "hsl(var(--warning))" },
  { categoria: "Subcontratos", valor: 387000, percentual: 10, cor: "hsl(var(--success))" },
  { categoria: "Indiretos", valor: 193500, percentual: 5, cor: "hsl(var(--muted-foreground))" },
]

const saidasPorNatureza = [
  { natureza: "Fornecedores", valor: 2100000 },
  { natureza: "Folha", valor: 1200000 },
  { natureza: "Impostos", valor: 350000 },
  { natureza: "Servicos", valor: 180000 },
  { natureza: "Outros", valor: 40000 },
]

const posicaoBancaria = [
  { banco: "Banco do Brasil", conta: "12345-6", saldo: 85000, cor: "hsl(var(--primary))" },
  { banco: "Itau", conta: "78901-2", saldo: 25000, cor: "hsl(var(--info))" },
  { banco: "Bradesco", conta: "34567-8", saldo: 15000, cor: "hsl(var(--warning))" },
]

const dreMensal = [
  { mes: "Set", receita: 3200000, custo: 2720000, margem: 480000 },
  { mes: "Out", receita: 3450000, custo: 2932500, margem: 517500 },
  { mes: "Nov", receita: 3800000, custo: 3230000, margem: 570000 },
  { mes: "Dez", receita: 3995000, custo: 3395750, margem: 599250 },
  { mes: "Jan", receita: 2894730, custo: 2460521, margem: 434209 },
]

const contasAPagarCompleto = [
  {
    id: "CAP-001",
    fornecedor: "Energia Eletrica SA",
    descricao: "Conta de Luz - Jan/2026",
    valor: 1500,
    vencimento: "2026-01-05",
    diasAtraso: 2,
    status: "vencido",
    natureza: "Utilidades",
    centroCusto: "Administrativo",
    aprovador: null,
    nf: "NF-001234",
  },
  {
    id: "CAP-002",
    fornecedor: "ConstruMat Ltda",
    descricao: "Cimento Portland CP-II",
    valor: 45000,
    vencimento: "2026-01-10",
    diasParaVencer: 3,
    status: "aprovado",
    natureza: "Materiais",
    centroCusto: "Producao",
    aprovador: "Gerente Obra",
    nf: "NF-005678",
  },
  {
    id: "CAP-003",
    fornecedor: "Terraplan Alpha",
    descricao: "Locacao Escavadeira - Jan",
    valor: 28000,
    vencimento: "2026-01-12",
    diasParaVencer: 5,
    status: "pendente_aprovacao",
    natureza: "Equipamentos",
    centroCusto: "Producao",
    aprovador: null,
    nf: "NF-009012",
  },
  {
    id: "CAP-004",
    fornecedor: "Agua Azul SA",
    descricao: "Conta de Agua - Jan/2026",
    valor: 850,
    vencimento: "2026-01-15",
    diasParaVencer: 8,
    status: "rascunho",
    natureza: "Utilidades",
    centroCusto: "Administrativo",
    aprovador: null,
    nf: null,
  },
  {
    id: "CAP-005",
    fornecedor: "Seguradora Confianca",
    descricao: "Seguro Obra - Parcela 3/12",
    valor: 12500,
    vencimento: "2026-01-20",
    diasParaVencer: 13,
    status: "aprovado",
    natureza: "Seguros",
    centroCusto: "Administrativo",
    aprovador: "Diretor",
    nf: "NF-003456",
  },
  {
    id: "CAP-006",
    fornecedor: "AcoForte Industria",
    descricao: "Vergalhoes CA-50",
    valor: 67000,
    vencimento: "2026-01-25",
    diasParaVencer: 18,
    status: "pendente_aprovacao",
    natureza: "Materiais",
    centroCusto: "Producao",
    aprovador: null,
    nf: "NF-007890",
  },
]

const contasAReceberCompleto = [
  {
    id: "CAR-001",
    cliente: "DNIT",
    descricao: "Medicao #12 - Dezembro/2025",
    valor: 4500000,
    vencimento: "2026-01-05",
    diasAtraso: 2,
    status: "vencido",
    medicao: "MED-012",
    nf: "NF-E-001234",
  },
  {
    id: "CAR-002",
    cliente: "DNIT",
    descricao: "Medicao #13 - Janeiro/2026",
    valor: 3850000,
    vencimento: "2026-01-20",
    diasParaVencer: 13,
    status: "faturado",
    medicao: "MED-013",
    nf: "NF-E-001235",
  },
  {
    id: "CAR-003",
    cliente: "DNIT",
    descricao: "Reajuste Contratual - 2025",
    valor: 150000,
    vencimento: "2026-01-15",
    diasParaVencer: 8,
    status: "em_cobranca",
    medicao: null,
    nf: "NF-E-001230",
  },
]

const borderos = [
  {
    id: "BRD-001",
    data: "2026-01-05",
    qtdTitulos: 8,
    valorTotal: 125000,
    banco: "Banco do Brasil",
    status: "executado",
    arquivoBancario: "CNAB240_001.txt",
  },
  {
    id: "BRD-002",
    data: "2026-01-06",
    qtdTitulos: 5,
    valorTotal: 87500,
    banco: "Itau",
    status: "aprovado",
    arquivoBancario: null,
  },
  {
    id: "BRD-003",
    data: "2026-01-07",
    qtdTitulos: 12,
    valorTotal: 156000,
    banco: "Banco do Brasil",
    status: "pendente",
    arquivoBancario: null,
  },
]

const movimentosConciliacao = [
  {
    id: 1,
    data: "2026-01-05",
    descricaoExtrato: "TED RECEB 001234",
    valorExtrato: 45000,
    descricaoSistema: "CAP-002 ConstruMat",
    valorSistema: 45000,
    status: "conciliado",
  },
  {
    id: 2,
    data: "2026-01-05",
    descricaoExtrato: "PAG FORN 005678",
    valorExtrato: -28000,
    descricaoSistema: null,
    valorSistema: null,
    status: "pendente",
  },
  {
    id: 3,
    data: "2026-01-06",
    descricaoExtrato: "TARIFA BANCARIA",
    valorExtrato: -150,
    descricaoSistema: null,
    valorSistema: null,
    status: "pendente",
  },
  {
    id: 4,
    data: "2026-01-06",
    descricaoExtrato: "TED RECEB 001235",
    valorExtrato: 125000,
    descricaoSistema: "BRD-001 Pagamento Lote",
    valorSistema: 125000,
    status: "conciliado",
  },
]

const fundoFixoMock = [
  {
    id: "FF-001",
    descricao: "Compra de Material A",
    categoria: "Materiais",
    valor: 500,
    data: "2024-01-15",
    responsavel: "Joao Silva",
    status: "pago",
    comprovante: "NF12345.pdf",
    observacao: "Material urgente para a fundacao",
  },
  {
    id: "FF-002",
    descricao: "Manutencao Equipamento X",
    categoria: "Equipamentos",
    valor: 750,
    data: "2024-01-16",
    responsavel: "Maria Souza",
    status: "pendente",
    comprovante: null,
    observacao: "Preventiva solicitada pelo operador",
  },
  {
    id: "FF-003",
    descricao: "Aluguel Ferramenta Y",
    categoria: "Equipamentos",
    valor: 100,
    data: "2024-01-17",
    responsavel: "Pedro Alves",
    status: "pago",
    comprovante: "REC67890.pdf",
    observacao: null,
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatCurrencyCompact(value: number) {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`
  return formatCurrency(value)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR")
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatCurrency(entry.value || 0)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function FinanceiroContent() {
  const [tab, setTab] = useState("visao")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetType, setSheetType] = useState<string>("fundo")

  const [fluxoChartType, setFluxoChartType] = useState<"barras" | "cascata">("barras")
  const [fluxoPeriodo, setFluxoPeriodo] = useState({ mes: 0, ano: 2026 }) // 0 = Janeiro
  const [showCalendario, setShowCalendario] = useState(false)
  const [viewModeFluxo, setViewModeFluxo] = useState<"grafico" | "tabela">("grafico")
  const [viewModeDespesas, setViewModeDespesas] = useState<"grafico" | "tabela">("grafico")
  const [viewModeBancos, setViewModeBancos] = useState<"grafico" | "tabela">("grafico")
  const [viewModeDRE, setViewModeDRE] = useState<"grafico" | "tabela">("grafico")

  const handleOpenSheet = (item: any, type: string) => {
    setSelectedItem(item)
    setSheetType(type)
    setSheetOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; icon: any; label: string }> = {
      pago: { bg: "bg-success/10", text: "text-success", icon: CheckCircle, label: "Pago" },
      executado: { bg: "bg-success/10", text: "text-success", icon: CheckCircle, label: "Executado" },
      conciliado: { bg: "bg-success/10", text: "text-success", icon: CheckCircle2, label: "Conciliado" },
      aprovado: { bg: "bg-info/10", text: "text-info", icon: FileCheck, label: "Aprovado" },
      faturado: { bg: "bg-info/10", text: "text-info", icon: FileText, label: "Faturado" },
      pendente: { bg: "bg-warning/10", text: "text-warning", icon: Clock, label: "Pendente" },
      pendente_aprovacao: { bg: "bg-warning/10", text: "text-warning", icon: Clock, label: "Aguard. Aprovacao" },
      rascunho: { bg: "bg-muted/30", text: "text-muted-foreground", icon: FileText, label: "Rascunho" },
      vencido: { bg: "bg-destructive/10", text: "text-destructive", icon: AlertTriangle, label: "Vencido" },
      em_cobranca: { bg: "bg-warning/10", text: "text-warning", icon: Send, label: "Em Cobranca" },
      a_vencer: { bg: "bg-warning/10", text: "text-warning", icon: Clock, label: "A Vencer" },
    }
    const config = statusConfig[status] || { bg: "bg-muted/30", text: "", icon: Clock, label: status }
    const Icon = config.icon
    return (
      <Badge variant="outline" className={`${config.bg} ${config.text} border-transparent`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const ViewToggle = ({
    mode,
    setMode,
  }: { mode: "grafico" | "tabela"; setMode: (v: "grafico" | "tabela") => void }) => (
    <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-0.5">
      <Button
        variant={mode === "grafico" ? "default" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => setMode("grafico")}
      >
        <BarChart3 className="w-3 h-3 mr-1" /> Grafico
      </Button>
      <Button
        variant={mode === "tabela" ? "default" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => setMode("tabela")}
      >
        <Table className="w-3 h-3 mr-1" /> Tabela
      </Button>
    </div>
  )

  const totalVencidosCAP = contasAPagarCompleto
    .filter((c) => c.status === "vencido")
    .reduce((acc, c) => acc + c.valor, 0)

  const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const navegarPeriodo = (direcao: "anterior" | "proximo") => {
    setFluxoPeriodo((prev) => {
      if (direcao === "anterior") {
        if (prev.mes === 0) {
          return { mes: 11, ano: prev.ano - 1 }
        }
        return { ...prev, mes: prev.mes - 1 }
      } else {
        if (prev.mes === 11) {
          return { mes: 0, ano: prev.ano + 1 }
        }
        return { ...prev, mes: prev.mes + 1 }
      }
    })
  }

  const dadosCascata = [
    { name: "Saldo Inicial", valor: 450000, tipo: "inicial", fill: "hsl(var(--info))" },
    { name: "Medicoes", valor: 2500000, tipo: "entrada", fill: "hsl(var(--success))" },
    { name: "Recebiveis", valor: 895000, tipo: "entrada", fill: "hsl(var(--success))" },
    { name: "Outros", valor: 600000, tipo: "entrada", fill: "hsl(var(--success))" },
    { name: "Folha", valor: -1200000, tipo: "saida", fill: "hsl(var(--destructive))" },
    { name: "Fornecedores", valor: -1450000, tipo: "saida", fill: "hsl(var(--destructive))" },
    { name: "Impostos", valor: -580000, tipo: "saida", fill: "hsl(var(--destructive))" },
    { name: "Equipamentos", valor: -340000, tipo: "saida", fill: "hsl(var(--destructive))" },
    { name: "Outros", valor: -300000, tipo: "saida", fill: "hsl(var(--destructive))" },
    { name: "Saldo Final", valor: 575000, tipo: "final", fill: "hsl(var(--primary))" },
  ]

  // Preparar dados cascata com acumulado para posicionamento
  const dadosCascataProcessados = dadosCascata.reduce((acc: any[], item, index) => {
    if (index === 0) {
      acc.push({ ...item, start: 0, end: item.valor, displayValue: item.valor })
    } else if (item.tipo === "final") {
      acc.push({ ...item, start: 0, end: item.valor, displayValue: item.valor })
    } else {
      const prevEnd = acc[index - 1].end
      const newEnd = prevEnd + item.valor
      acc.push({
        ...item,
        start: Math.min(prevEnd, newEnd),
        end: Math.max(prevEnd, newEnd),
        displayValue: item.valor,
        base: item.valor >= 0 ? prevEnd : newEnd,
      })
    }
    return acc
  }, [])

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraAdministrativoNavbar />
      </div>

      {/* Topbar Terciário - Tabs FORA da moldura */}
      <div className="flex-shrink-0 z-30 mt-3">
        <div className="flex items-end relative pb-0 border-b border-border/40 bg-gradient-to-b from-muted/20 to-transparent px-[10px] overflow-hidden border-0">
          <div className="w-[calc(100%-32px)] ml-4 px-[10px] overflow-hidden border-0">
            <nav 
              className="flex items-center gap-0 overflow-x-hidden border-0" 
              style={{ border: 'none', boxShadow: 'none' }}
            >
              {[
                { value: "visao", label: "Visão Geral" },
                { value: "fluxo", label: "Fluxo de Caixa" },
                { value: "cap", label: "Contas a Pagar" },
                { value: "car", label: "Contas a Receber" },
                { value: "borderos", label: "Borderos" },
                { value: "conciliacao", label: "Conciliação" },
                { value: "dre", label: "DRE" },
                { value: "fundofixo", label: "Fundo Fixo" },
              ].map((tabItem) => {
                const isActive = tab === tabItem.value
                
                return (
                  <button
                    key={tabItem.value}
                    onClick={() => setTab(tabItem.value)}
                    className={`group relative px-4 py-3 text-sm font-bold whitespace-nowrap transition-all duration-200 ease-in-out flex items-center gap-2 ${
                      isActive
                        ? "bg-background text-primary font-bold z-30 pb-3 scale-105 py-3 border-0 outline-none"
                        : "bg-muted/20 text-muted-foreground/50 font-bold hover:bg-background hover:text-foreground hover:shadow-[0_6px_20px_rgba(0,0,0,0.25),0_3px_10px_rgba(0,0,0,0.15),0_1px_4px_rgba(0,0,0,0.1)] hover:scale-[1.03] hover:-translate-y-[2px] border-0 outline-none"
                    }`}
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                      boxShadow: isActive
                        ? "0 8px 24px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.1)"
                        : undefined,
                    }}
                  >
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-t-[8px]"
                      style={{
                        border: isActive ? '3px solid hsl(var(--primary))' : '1px solid rgba(0, 0, 0, 0.1)',
                        borderBottom: 'none',
                        opacity: isActive ? '1' : '0',
                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                      }}
                    />
                    {isActive && (
                      <div 
                        className="absolute left-0 right-0 h-[4px] bg-background"
                        style={{ bottom: '-2px' }}
                      />
                    )}
                    {tabItem.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Conteúdo com moldura - APENAS CONTEÚDO */}
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Financeiro da Obra</h1>
                <Badge variant="outline" className="text-xs">
                  AD-02
                </Badge>
                <InfoTooltip
                  title="Financeiro da Obra"
                  description="Gestao completa: CAP, CAR, Fluxo de Caixa, Conciliacao, Borderos e DRE."
                />
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Calendar className="w-4 h-4 mr-2" /> Periodo
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" /> Exportar
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> Nova Despesa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-2 mb-4 flex-shrink-0">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-2 text-center">
              <Wallet className="w-4 h-4 mx-auto mb-1 text-primary" />
              <p className="text-base font-bold text-primary">{formatCurrencyCompact(resumoFinanceiro.saldoCaixa)}</p>
              <p className="text-[9px] text-muted-foreground">Saldo Caixa</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <Clock className="w-4 h-4 mx-auto mb-1 text-info" />
              <p className="text-base font-bold text-info">
                {formatCurrencyCompact(resumoFinanceiro.disponibilidadeD7)}
              </p>
              <p className="text-[9px] text-muted-foreground">Disp. D+7</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <Target className="w-4 h-4 mx-auto mb-1 text-info" />
              <p className="text-base font-bold text-info">
                {formatCurrencyCompact(resumoFinanceiro.disponibilidadeD30)}
              </p>
              <p className="text-[9px] text-muted-foreground">Disp. D+30</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <ArrowUpRight className="w-4 h-4 mx-auto mb-1 text-success" />
              <p className="text-base font-bold text-success">{formatCurrencyCompact(resumoFinanceiro.entradas)}</p>
              <p className="text-[9px] text-muted-foreground">Entradas</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <ArrowDownRight className="w-4 h-4 mx-auto mb-1 text-destructive" />
              <p className="text-base font-bold text-destructive">{formatCurrencyCompact(resumoFinanceiro.saidas)}</p>
              <p className="text-[9px] text-muted-foreground">Saidas</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <CreditCard className="w-4 h-4 mx-auto mb-1 text-warning" />
              <p className="text-base font-bold text-warning">{formatCurrencyCompact(resumoFinanceiro.capTotal)}</p>
              <p className="text-[9px] text-muted-foreground">CAP Total</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <Receipt className="w-4 h-4 mx-auto mb-1 text-success" />
              <p className="text-base font-bold text-success">{formatCurrencyCompact(resumoFinanceiro.carTotal)}</p>
              <p className="text-[9px] text-muted-foreground">CAR Total</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <PiggyBank className="w-4 h-4 mx-auto mb-1 text-success" />
              <p className="text-base font-bold text-success">{resumoFinanceiro.margemPercentual.toFixed(1)}%</p>
              <p className="text-[9px] text-muted-foreground">Margem</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-2 text-center">
              <RefreshCw className="w-4 h-4 mx-auto mb-1 text-info" />
              <p className="text-base font-bold text-info">{resumoFinanceiro.pendenteConciliacao}</p>
              <p className="text-[9px] text-muted-foreground">Pend. Concil.</p>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-2 text-center">
              <AlertTriangle className="w-4 h-4 mx-auto mb-1 text-destructive" />
              <p className="text-base font-bold text-destructive">{formatCurrencyCompact(totalVencidosCAP)}</p>
              <p className="text-[9px] text-muted-foreground">Vencidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="space-y-4 mt-4">
                {/* VISAO GERAL */}
                {tab === "visao" && (
                  <div className="space-y-4">
                  {totalVencidosCAP > 0 && (
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <span className="text-sm font-medium text-destructive">
                            {formatCurrency(totalVencidosCAP)} em contas vencidas - Regularizar imediatamente
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto h-7 text-xs bg-transparent"
                            onClick={() => setTab("cap")}
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {/* Fluxo de Caixa com Toggle */}
                    <Card className="border-border/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-primary" /> Fluxo de Caixa (Realizado x Projetado)
                          </span>
                          <ViewToggle mode={viewModeFluxo} setMode={setViewModeFluxo} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {viewModeFluxo === "grafico" ? (
                          <ResponsiveContainer width="100%" height={220}>
                            <ComposedChart data={fluxoCaixa}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                              <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                              <YAxis
                                tick={{ fontSize: 10 }}
                                stroke="hsl(var(--muted-foreground))"
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                              />
                              <Tooltip content={<CustomTooltip />} />
                              <Legend wrapperStyle={{ fontSize: 11 }} />
                              <Bar
                                dataKey="entradas"
                                name="Entradas"
                                fill="hsl(var(--success))"
                                radius={[4, 4, 0, 0]}
                              />
                              <Bar
                                dataKey="saidas"
                                name="Saidas"
                                fill="hsl(var(--destructive))"
                                radius={[4, 4, 0, 0]}
                              />
                              <Line
                                type="monotone"
                                dataKey="acumulado"
                                name="Realizado Acum."
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="projetado"
                                name="Projetado"
                                stroke="hsl(var(--info))"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ r: 3 }}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="border rounded-lg overflow-hidden max-h-[220px] overflow-y-auto">
                            <table className="w-full text-xs">
                              <thead className="bg-muted/30 sticky top-0">
                                <tr>
                                  <th className="text-left p-2 font-medium">Mes</th>
                                  <th className="text-right p-2 font-medium">Entradas</th>
                                  <th className="text-right p-2 font-medium">Saidas</th>
                                  <th className="text-right p-2 font-medium">Saldo</th>
                                  <th className="text-right p-2 font-medium">Acumulado</th>
                                  <th className="text-right p-2 font-medium">Projetado</th>
                                  <th className="text-center p-2 font-medium">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fluxoCaixa.map((row, i) => (
                                  <tr key={i} className="border-t">
                                    <td className="p-2 font-medium">{row.mes}</td>
                                    <td className="p-2 text-right text-success">
                                      {row.entradas ? formatCurrencyCompact(row.entradas) : "-"}
                                    </td>
                                    <td className="p-2 text-right text-destructive">
                                      {row.saidas ? formatCurrencyCompact(row.saidas) : "-"}
                                    </td>
                                    <td className="p-2 text-right">
                                      {row.saldo ? formatCurrencyCompact(row.saldo) : "-"}
                                    </td>
                                    <td className="p-2 text-right font-medium">
                                      {row.acumulado ? formatCurrencyCompact(row.acumulado) : "-"}
                                    </td>
                                    <td className="p-2 text-right text-info">{formatCurrencyCompact(row.projetado)}</td>
                                    <td className="p-2 text-center">
                                      {row.acumulado ? (
                                        row.acumulado >= row.projetado ? (
                                          <Badge variant="outline" className="bg-success/10 text-success text-[10px]">
                                            Acima
                                          </Badge>
                                        ) : (
                                          <Badge variant="outline" className="bg-warning/10 text-warning text-[10px]">
                                            Abaixo
                                          </Badge>
                                        )
                                      ) : (
                                        <Badge variant="outline" className="text-[10px]">
                                          Futuro
                                        </Badge>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Despesas por Categoria com Toggle */}
                    <Card className="border-border/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <PieChartIcon className="w-4 h-4 text-primary" /> Saidas por Natureza
                          </span>
                          <ViewToggle mode={viewModeDespesas} setMode={setViewModeDespesas} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {viewModeDespesas === "grafico" ? (
                          <div className="flex items-center">
                            <ResponsiveContainer width="50%" height={200}>
                              <PieChart>
                                <Pie
                                  data={despesasPorCategoria}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={50}
                                  outerRadius={80}
                                  paddingAngle={2}
                                  dataKey="valor"
                                >
                                  {despesasPorCategoria.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.cor} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="flex-1 space-y-2">
                              {despesasPorCategoria.map((cat, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.cor }} />
                                  <span className="flex-1 text-muted-foreground">{cat.categoria}</span>
                                  <span className="font-medium">{cat.percentual}%</span>
                                  <span className="text-muted-foreground">{formatCurrencyCompact(cat.valor)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-xs">
                              <thead className="bg-muted/30">
                                <tr>
                                  <th className="text-left p-2 font-medium">Categoria</th>
                                  <th className="text-right p-2 font-medium">Valor</th>
                                  <th className="text-right p-2 font-medium">%</th>
                                  <th className="text-left p-2 font-medium">Barra</th>
                                </tr>
                              </thead>
                              <tbody>
                                {despesasPorCategoria.map((cat, i) => (
                                  <tr key={i} className="border-t">
                                    <td className="p-2 flex items-center gap-2">
                                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.cor }} />
                                      {cat.categoria}
                                    </td>
                                    <td className="p-2 text-right font-mono">{formatCurrencyCompact(cat.valor)}</td>
                                    <td className="p-2 text-right font-medium">{cat.percentual}%</td>
                                    <td className="p-2">
                                      <div className="h-2 bg-muted/30 rounded-full w-24">
                                        <div
                                          className="h-full rounded-full"
                                          style={{ width: `${cat.percentual}%`, backgroundColor: cat.cor }}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Posicao Bancaria com Toggle */}
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-primary" /> Posicao Bancaria
                        </span>
                        <ViewToggle mode={viewModeBancos} setMode={setViewModeBancos} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {viewModeBancos === "grafico" ? (
                        <div className="flex items-center gap-8">
                          <ResponsiveContainer width="40%" height={150}>
                            <PieChart>
                              <Pie
                                data={posicaoBancaria}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={2}
                                dataKey="saldo"
                              >
                                {posicaoBancaria.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.cor} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="flex-1 grid grid-cols-3 gap-4">
                            {posicaoBancaria.map((banco, i) => (
                              <Card key={i} className="border-border/50">
                                <CardContent className="p-3 text-center">
                                  <div
                                    className="w-3 h-3 rounded-full mx-auto mb-2"
                                    style={{ backgroundColor: banco.cor }}
                                  />
                                  <p className="text-xs text-muted-foreground">{banco.banco}</p>
                                  <p className="text-sm font-bold">{formatCurrencyCompact(banco.saldo)}</p>
                                  <p className="text-[10px] text-muted-foreground">Conta: {banco.conta}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-2 font-medium">Banco</th>
                                <th className="text-left p-2 font-medium">Conta</th>
                                <th className="text-right p-2 font-medium">Saldo</th>
                                <th className="text-center p-2 font-medium">Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {posicaoBancaria.map((banco, i) => (
                                <tr key={i} className="border-t hover:bg-muted/20">
                                  <td className="p-2 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: banco.cor }} />
                                    {banco.banco}
                                  </td>
                                  <td className="p-2 font-mono text-xs">{banco.conta}</td>
                                  <td className="p-2 text-right font-bold">{formatCurrency(banco.saldo)}</td>
                                  <td className="p-2 text-center">
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      <Eye className="w-3 h-3 mr-1" /> Extrato
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                )}

                {/* FLUXO DE CAIXA */}
                {tab === "fluxo" && (
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => navegarPeriodo("anterior")}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => setShowCalendario(true)}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {mesesNomes[fluxoPeriodo.mes]} / {fluxoPeriodo.ano}
                      </Button>
                      {showCalendario && (
                        <div className="absolute z-50 mt-12 border rounded-lg shadow-lg bg-background p-3 w-64">
                          <div className="flex items-center justify-between mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => setFluxoPeriodo((p) => ({ ...p, ano: p.ano - 1 }))}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="font-medium">{fluxoPeriodo.ano}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => setFluxoPeriodo((p) => ({ ...p, ano: p.ano + 1 }))}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {mesesNomes.map((mes, idx) => (
                              <Button
                                key={mes}
                                variant={fluxoPeriodo.mes === idx ? "default" : "ghost"}
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => {
                                  setFluxoPeriodo((p) => ({ ...p, mes: idx }))
                                  setShowCalendario(false)
                                }}
                              >
                                {mes}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={fluxoChartType === "barras" ? "default" : "ghost"}
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => setFluxoChartType("barras")}
                      >
                        <BarChart3 className="w-3 h-3 mr-1" /> Barras
                      </Button>
                      <Button
                        variant={fluxoChartType === "cascata" ? "default" : "ghost"}
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => setFluxoChartType("cascata")}
                      >
                        <GitBranch className="w-3 h-3 mr-1" /> Cascata
                      </Button>
                      <ViewToggle mode={viewModeFluxo} setMode={setViewModeFluxo} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Receita Acumulada</p>
                        <p className="text-xl font-bold text-success">
                          {formatCurrencyCompact(resumoFinanceiro.receitaAcumulada)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Custo Acumulado</p>
                        <p className="text-xl font-bold text-destructive">
                          {formatCurrencyCompact(resumoFinanceiro.custoAcumulado)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Margem Bruta</p>
                        <p className="text-xl font-bold text-primary">
                          {formatCurrencyCompact(resumoFinanceiro.margemBruta)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-info/30 bg-info/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Projecao Prox. Mes</p>
                        <p className="text-xl font-bold text-info">
                          {formatCurrencyCompact(resumoFinanceiro.previsaoProximoMes)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Fluxo de Caixa Detalhado</span>
                        <div className="flex items-center gap-2">
                          {/* Seletor de Periodo */}
                          <div className="flex items-center gap-1 border rounded-md px-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => navegarPeriodo("anterior")}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs font-medium min-w-[90px]"
                              onClick={() => setShowCalendario(!showCalendario)}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {mesesNomes[fluxoPeriodo.mes]} / {fluxoPeriodo.ano}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => navegarPeriodo("proximo")}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Toggle Tipo Grafico */}
                          {viewModeFluxo === "grafico" && (
                            <div className="flex border rounded-md overflow-hidden">
                              <Button
                                variant={fluxoChartType === "barras" ? "default" : "ghost"}
                                size="sm"
                                className="h-7 px-2 text-xs rounded-none"
                                onClick={() => setFluxoChartType("barras")}
                              >
                                <BarChart3 className="w-3 h-3 mr-1" />
                                Barras
                              </Button>
                              <Button
                                variant={fluxoChartType === "cascata" ? "default" : "ghost"}
                                size="sm"
                                className="h-7 px-2 text-xs rounded-none"
                                onClick={() => setFluxoChartType("cascata")}
                              >
                                <GitBranch className="w-3 h-3 mr-1" />
                                Cascata
                              </Button>
                            </div>
                          )}

                          {/* Toggle Grafico/Tabela */}
                          <ViewToggle mode={viewModeFluxo} setMode={setViewModeFluxo} />
                        </div>
                      </CardTitle>

                      {showCalendario && (
                        <div className="absolute right-4 top-14 z-50 bg-background border rounded-lg shadow-lg p-3 w-64">
                          <div className="flex items-center justify-between mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => setFluxoPeriodo((p) => ({ ...p, ano: p.ano - 1 }))}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="font-medium">{fluxoPeriodo.ano}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => setFluxoPeriodo((p) => ({ ...p, ano: p.ano + 1 }))}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {mesesNomes.map((mes, idx) => (
                              <Button
                                key={mes}
                                variant={fluxoPeriodo.mes === idx ? "default" : "ghost"}
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => {
                                  setFluxoPeriodo((p) => ({ ...p, mes: idx }))
                                  setShowCalendario(false)
                                }}
                              >
                                {mes}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      {viewModeFluxo === "grafico" ? (
                        fluxoChartType === "barras" ? (
                          /* Grafico de Barras original */
                          <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={fluxoCaixa}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                              <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                              <YAxis
                                yAxisId="left"
                                tick={{ fontSize: 10 }}
                                stroke="hsl(var(--muted-foreground))"
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                              />
                              <YAxis
                                yAxisId="right"
                                orientation="right"
                                tick={{ fontSize: 10 }}
                                stroke="hsl(var(--muted-foreground))"
                                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                              />
                              <Tooltip content={<CustomTooltip />} />
                              <Legend wrapperStyle={{ fontSize: 11 }} />
                              <ReferenceLine yAxisId="left" y={0} stroke="hsl(var(--border))" />
                              <Bar
                                yAxisId="left"
                                dataKey="entradas"
                                name="Entradas"
                                fill="hsl(var(--success))"
                                radius={[4, 4, 0, 0]}
                              />
                              <Bar
                                yAxisId="left"
                                dataKey="saidas"
                                name="Saidas"
                                fill="hsl(var(--destructive))"
                                radius={[4, 4, 0, 0]}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="saldo"
                                name="Saldo Mes"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="acumulado"
                                name="Acumulado"
                                stroke="hsl(var(--info))"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        ) : (
                          /* Grafico Cascata (Waterfall) */
                          <div>
                            <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                              <span>
                                Composicao do Fluxo - {mesesNomes[fluxoPeriodo.mes]}/{fluxoPeriodo.ano}
                              </span>
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded bg-success"></span> Entradas
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded bg-destructive"></span> Saidas
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded bg-info"></span> Saldo Inicial
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded bg-primary"></span> Saldo Final
                                </span>
                              </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={dadosCascataProcessados} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                                <XAxis
                                  dataKey="name"
                                  tick={{ fontSize: 10 }}
                                  stroke="hsl(var(--muted-foreground))"
                                  angle={-45}
                                  textAnchor="end"
                                  height={60}
                                />
                                <YAxis
                                  tick={{ fontSize: 10 }}
                                  stroke="hsl(var(--muted-foreground))"
                                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                                />
                                <Tooltip
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      const data = payload[0].payload
                                      return (
                                        <div className="bg-background border rounded-lg shadow-lg p-3">
                                          <p className="font-medium mb-1">{data.name}</p>
                                          <p
                                            className={`text-sm ${data.displayValue >= 0 ? "text-success" : "text-destructive"}`}
                                          >
                                            {data.displayValue >= 0 ? "+" : ""}
                                            {formatCurrency(data.displayValue)}
                                          </p>
                                          {data.tipo !== "inicial" && data.tipo !== "final" && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {data.tipo === "entrada" ? "Entrada" : "Saida"} de recursos
                                            </p>
                                          )}
                                        </div>
                                      )
                                    }
                                    return null
                                  }}
                                />
                                {/* Barra invisivel para criar efeito cascata */}
                                <Bar dataKey="start" stackId="a" fill="transparent" />
                                {/* Barra visivel com valores */}
                                <Bar dataKey={(d: any) => d.end - d.start} stackId="a" radius={[4, 4, 0, 0]}>
                                  {dadosCascataProcessados.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                  <LabelList
                                    dataKey="displayValue"
                                    position="top"
                                    fill="hsl(var(--foreground))"
                                    fontSize={9}
                                    formatter={(v: number) => {
                                      if (Math.abs(v) >= 1000000) return `${(v / 1000000).toFixed(1)}M`
                                      if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(0)}K`
                                      return v.toString()
                                    }}
                                  />
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                              <div className="p-2 rounded-lg bg-info/10 border border-info/30 text-center">
                                <p className="text-xs text-muted-foreground">Saldo Inicial</p>
                                <p className="font-bold text-info">{formatCurrencyCompact(450000)}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-success/10 border border-success/30 text-center">
                                <p className="text-xs text-muted-foreground">Total Entradas</p>
                                <p className="font-bold text-success">+{formatCurrencyCompact(3995000)}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                                <p className="text-xs text-muted-foreground">Total Saidas</p>
                                <p className="font-bold text-destructive">-{formatCurrencyCompact(3870000)}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 text-center">
                                <p className="text-xs text-muted-foreground">Saldo Final</p>
                                <p className="font-bold text-primary">{formatCurrencyCompact(575000)}</p>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-2 font-medium">Mes</th>
                                <th className="text-right p-2 font-medium">Entradas</th>
                                <th className="text-right p-2 font-medium">Saidas</th>
                                <th className="text-right p-2 font-medium">Saldo</th>
                                <th className="text-right p-2 font-medium">Acumulado</th>
                                <th className="text-center p-2 font-medium">Variacao</th>
                                <th className="text-center p-2 font-medium">Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fluxoCaixa
                                .filter((m) => m.entradas)
                                .map((mes, index) => {
                                  const anterior = index > 0 ? fluxoCaixa[index - 1].acumulado || 0 : 0
                                  const variacao =
                                    anterior > 0 ? (((mes.acumulado || 0) - anterior) / anterior) * 100 : 0
                                  return (
                                    <tr key={mes.mes} className="border-t hover:bg-muted/20">
                                      <td className="p-2 font-medium">{mes.mes}</td>
                                      <td className="p-2 text-right font-mono text-success">
                                        {formatCurrency(mes.entradas || 0)}
                                      </td>
                                      <td className="p-2 text-right font-mono text-destructive">
                                        {formatCurrency(mes.saidas || 0)}
                                      </td>
                                      <td className="p-2 text-right font-mono">{formatCurrency(mes.saldo || 0)}</td>
                                      <td className="p-2 text-right font-mono font-bold">
                                        {formatCurrency(mes.acumulado || 0)}
                                      </td>
                                      <td className="p-2 text-center">
                                        {variacao > 0 ? (
                                          <span className="flex items-center justify-center gap-1 text-xs text-success">
                                            <TrendingUp className="w-3 h-3" />+{variacao.toFixed(0)}%
                                          </span>
                                        ) : variacao < 0 ? (
                                          <span className="flex items-center justify-center gap-1 text-xs text-destructive">
                                            <TrendingDown className="w-3 h-3" />
                                            {variacao.toFixed(0)}%
                                          </span>
                                        ) : (
                                          <span className="text-xs text-muted-foreground">-</span>
                                        )}
                                      </td>
                                      <td className="p-2 text-center">
                                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                                          <Eye className="w-3 h-3" />
                                        </Button>
                                      </td>
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                )}

                {tab === "cap" && (
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar por fornecedor, NF..." className="pl-8 w-64 h-8 text-sm" />
                      </div>
                      <Select defaultValue="todos">
                        <SelectTrigger className="w-36 h-8 text-sm">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="vencido">Vencidos</SelectItem>
                          <SelectItem value="pendente_aprovacao">Aguard. Aprovacao</SelectItem>
                          <SelectItem value="aprovado">Aprovados</SelectItem>
                          <SelectItem value="rascunho">Rascunho</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="h-8 bg-transparent">
                        <Filter className="w-3 h-3 mr-1" /> Filtros
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 bg-transparent">
                        <Download className="w-3 h-3 mr-1" /> Exportar
                      </Button>
                      <Button size="sm" className="h-8">
                        <Plus className="w-3 h-3 mr-1" /> Nova Conta
                      </Button>
                    </div>
                  </div>

                  <Card className="border-border/50">
                    <CardContent className="p-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="text-left p-3 font-medium">ID</th>
                              <th className="text-left p-3 font-medium">Fornecedor</th>
                              <th className="text-left p-3 font-medium">Descricao</th>
                              <th className="text-left p-3 font-medium">Natureza</th>
                              <th className="text-right p-3 font-medium">Valor</th>
                              <th className="text-left p-3 font-medium">Vencimento</th>
                              <th className="text-center p-3 font-medium">Status</th>
                              <th className="text-center p-3 font-medium">Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contasAPagarCompleto.map((conta) => (
                              <tr
                                key={conta.id}
                                className={`border-t hover:bg-muted/20 cursor-pointer ${conta.status === "vencido" ? "bg-destructive/5" : ""}`}
                                onClick={() => handleOpenSheet(conta, "cap")}
                              >
                                <td className="p-3 font-mono font-medium text-xs">{conta.id}</td>
                                <td className="p-3">{conta.fornecedor}</td>
                                <td className="p-3 text-muted-foreground text-xs">{conta.descricao}</td>
                                <td className="p-3">
                                  <Badge variant="outline" className="text-xs">
                                    {conta.natureza}
                                  </Badge>
                                </td>
                                <td className="p-3 text-right font-mono font-bold">{formatCurrency(conta.valor)}</td>
                                <td className="p-3">
                                  <div className="flex flex-col">
                                    <span>{formatDate(conta.vencimento)}</span>
                                    {conta.status === "vencido" ? (
                                      <span className="text-[10px] text-destructive">{conta.diasAtraso}d atraso</span>
                                    ) : conta.diasParaVencer !== undefined ? (
                                      <span className="text-[10px] text-muted-foreground">{conta.diasParaVencer}d</span>
                                    ) : null}
                                  </div>
                                </td>
                                <td className="p-3 text-center">{getStatusBadge(conta.status)}</td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {conta.status === "pendente_aprovacao" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-success"
                                        title="Aprovar"
                                      >
                                        <CheckCircle className="w-4 h-4" />
                                      </Button>
                                    )}
                                    {conta.status === "aprovado" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-primary"
                                        title="Pagar"
                                      >
                                        <Send className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Ver Detalhes">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Mais Opcoes">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                {tab === "car" && (
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar por cliente, medicao..." className="pl-8 w-64 h-8 text-sm" />
                      </div>
                      <Select defaultValue="todos">
                        <SelectTrigger className="w-36 h-8 text-sm">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="vencido">Vencidos</SelectItem>
                          <SelectItem value="faturado">Faturados</SelectItem>
                          <SelectItem value="em_cobranca">Em Cobranca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 bg-transparent">
                      <Download className="w-3 h-3 mr-1" /> Exportar
                    </Button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Total a Receber</p>
                        <p className="text-xl font-bold text-success">
                          {formatCurrencyCompact(resumoFinanceiro.carTotal)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-info/30 bg-info/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">A Vencer</p>
                        <p className="text-xl font-bold text-info">
                          {formatCurrencyCompact(resumoFinanceiro.carAVencer)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Vencido</p>
                        <p className="text-xl font-bold text-destructive">
                          {formatCurrencyCompact(resumoFinanceiro.carVencido)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-warning/30 bg-warning/5">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Inadimplencia</p>
                        <p className="text-xl font-bold text-warning">
                          {((resumoFinanceiro.carVencido / resumoFinanceiro.carTotal) * 100).toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-border/50">
                    <CardContent className="p-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="text-left p-3 font-medium">ID</th>
                              <th className="text-left p-3 font-medium">Cliente</th>
                              <th className="text-left p-3 font-medium">Descricao</th>
                              <th className="text-left p-3 font-medium">Medicao</th>
                              <th className="text-right p-3 font-medium">Valor</th>
                              <th className="text-left p-3 font-medium">Vencimento</th>
                              <th className="text-center p-3 font-medium">Status</th>
                              <th className="text-center p-3 font-medium">Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contasAReceberCompleto.map((conta) => (
                              <tr
                                key={conta.id}
                                className={`border-t hover:bg-muted/20 cursor-pointer ${conta.status === "vencido" ? "bg-destructive/5" : ""}`}
                                onClick={() => handleOpenSheet(conta, "car")}
                              >
                                <td className="p-3 font-mono font-medium text-xs">{conta.id}</td>
                                <td className="p-3">{conta.cliente}</td>
                                <td className="p-3 text-muted-foreground text-xs">{conta.descricao}</td>
                                <td className="p-3">
                                  <Badge variant="outline" className="text-xs">
                                    {conta.medicao || "-"}
                                  </Badge>
                                </td>
                                <td className="p-3 text-right font-mono font-bold text-success">
                                  {formatCurrency(conta.valor)}
                                </td>
                                <td className="p-3">
                                  <div className="flex flex-col">
                                    <span>{formatDate(conta.vencimento)}</span>
                                    {conta.status === "vencido" ? (
                                      <span className="text-[10px] text-destructive">{conta.diasAtraso}d atraso</span>
                                    ) : conta.diasParaVencer !== undefined ? (
                                      <span className="text-[10px] text-muted-foreground">{conta.diasParaVencer}d</span>
                                    ) : null}
                                  </div>
                                </td>
                                <td className="p-3 text-center">{getStatusBadge(conta.status)}</td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {conta.status === "vencido" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-warning"
                                        title="Cobrar"
                                      >
                                        <Send className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 text-success"
                                      title="Baixar"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Ver">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                {tab === "borderos" && (
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="todos">
                        <SelectTrigger className="w-36 h-8 text-sm">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="pendente">Pendentes</SelectItem>
                          <SelectItem value="aprovado">Aprovados</SelectItem>
                          <SelectItem value="executado">Executados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm" className="h-8">
                      <Plus className="w-3 h-3 mr-1" /> Gerar Bordero
                    </Button>
                  </div>

                  <Card className="border-border/50">
                    <CardContent className="p-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="text-left p-3 font-medium">ID</th>
                              <th className="text-left p-3 font-medium">Data</th>
                              <th className="text-center p-3 font-medium">Qtd Titulos</th>
                              <th className="text-right p-3 font-medium">Valor Total</th>
                              <th className="text-left p-3 font-medium">Banco</th>
                              <th className="text-center p-3 font-medium">Status</th>
                              <th className="text-center p-3 font-medium">Arquivo</th>
                              <th className="text-center p-3 font-medium">Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {borderos.map((brd) => (
                              <tr
                                key={brd.id}
                                className="border-t hover:bg-muted/20 cursor-pointer"
                                onClick={() => handleOpenSheet(brd, "bordero")}
                              >
                                <td className="p-3 font-mono font-medium text-xs">{brd.id}</td>
                                <td className="p-3">{formatDate(brd.data)}</td>
                                <td className="p-3 text-center">{brd.qtdTitulos}</td>
                                <td className="p-3 text-right font-mono font-bold">{formatCurrency(brd.valorTotal)}</td>
                                <td className="p-3">{brd.banco}</td>
                                <td className="p-3 text-center">{getStatusBadge(brd.status)}</td>
                                <td className="p-3 text-center">
                                  {brd.arquivoBancario ? (
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      <Download className="w-3 h-3 mr-1" /> CNAB
                                    </Button>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">-</span>
                                  )}
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {brd.status === "pendente" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-success"
                                        title="Aprovar"
                                      >
                                        <CheckCircle className="w-4 h-4" />
                                      </Button>
                                    )}
                                    {brd.status === "aprovado" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-primary"
                                        title="Executar"
                                      >
                                        <Send className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Ver">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                {tab === "conciliacao" && (
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Select defaultValue="bb">
                        <SelectTrigger className="w-48 h-8 text-sm">
                          <SelectValue placeholder="Selecione o Banco" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bb">Banco do Brasil - 12345-6</SelectItem>
                          <SelectItem value="itau">Itau - 78901-2</SelectItem>
                          <SelectItem value="bradesco">Bradesco - 34567-8</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge variant="outline" className="bg-warning/10 text-warning">
                        {resumoFinanceiro.pendenteConciliacao} pendentes
                      </Badge>
                      <Badge variant="outline" className="bg-success/10 text-success">
                        {resumoFinanceiro.conciliadoMes} conciliados no mes
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 bg-transparent">
                        <Upload className="w-3 h-3 mr-1" /> Importar Extrato
                      </Button>
                      <Button size="sm" className="h-8">
                        <RefreshCw className="w-3 h-3 mr-1" /> Conciliar Automatico
                      </Button>
                    </div>
                  </div>

                  <Card className="border-border/50">
                    <CardContent className="p-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="text-left p-3 font-medium">Data</th>
                              <th className="text-left p-3 font-medium">Extrato Bancario</th>
                              <th className="text-right p-3 font-medium">Valor Extrato</th>
                              <th className="text-center p-3 font-medium w-10">
                                <ArrowLeftRight className="w-4 h-4 mx-auto" />
                              </th>
                              <th className="text-left p-3 font-medium">Lancamento Sistema</th>
                              <th className="text-right p-3 font-medium">Valor Sistema</th>
                              <th className="text-center p-3 font-medium">Status</th>
                              <th className="text-center p-3 font-medium">Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {movimentosConciliacao.map((mov) => (
                              <tr
                                key={mov.id}
                                className={`border-t hover:bg-muted/20 ${mov.status === "pendente" ? "bg-warning/5" : ""}`}
                              >
                                <td className="p-3">{formatDate(mov.data)}</td>
                                <td className="p-3 text-xs">{mov.descricaoExtrato}</td>
                                <td
                                  className={`p-3 text-right font-mono ${mov.valorExtrato >= 0 ? "text-success" : "text-destructive"}`}
                                >
                                  {formatCurrency(Math.abs(mov.valorExtrato))}
                                </td>
                                <td className="p-3 text-center">
                                  {mov.status === "conciliado" ? (
                                    <Link className="w-4 h-4 text-success mx-auto" />
                                  ) : (
                                    <span className="text-muted-foreground">?</span>
                                  )}
                                </td>
                                <td className="p-3 text-xs">
                                  {mov.descricaoSistema || (
                                    <span className="text-muted-foreground italic">Nao vinculado</span>
                                  )}
                                </td>
                                <td className="p-3 text-right font-mono">
                                  {mov.valorSistema ? formatCurrency(mov.valorSistema) : "-"}
                                </td>
                                <td className="p-3 text-center">{getStatusBadge(mov.status)}</td>
                                <td className="p-3 text-center">
                                  {mov.status === "pendente" ? (
                                    <div className="flex items-center justify-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-primary"
                                        title="Vincular"
                                      >
                                        <Link className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-muted-foreground"
                                        title="Ignorar"
                                      >
                                        <Ban className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Desvincular">
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                {/* DRE */}
                {tab === "dre" && (
                  <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Receita Total</p>
                        <p className="text-2xl font-bold text-success">
                          {formatCurrencyCompact(resumoFinanceiro.receitaAcumulada)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Custo Total</p>
                        <p className="text-2xl font-bold text-destructive">
                          {formatCurrencyCompact(resumoFinanceiro.custoAcumulado)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Margem Bruta</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrencyCompact(resumoFinanceiro.margemBruta)}
                        </p>
                        <p className="text-xs text-primary">{resumoFinanceiro.margemPercentual.toFixed(1)}%</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Evolucao Receita x Custo x Margem</span>
                        <ViewToggle mode={viewModeDRE} setMode={setViewModeDRE} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {viewModeDRE === "grafico" ? (
                        <ResponsiveContainer width="100%" height={280}>
                          <ComposedChart data={dreMensal}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                            <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis
                              yAxisId="left"
                              tick={{ fontSize: 10 }}
                              stroke="hsl(var(--muted-foreground))"
                              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              tick={{ fontSize: 10 }}
                              stroke="hsl(var(--muted-foreground))"
                              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar
                              yAxisId="left"
                              dataKey="receita"
                              name="Receita"
                              fill="hsl(var(--success))"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              yAxisId="left"
                              dataKey="custo"
                              name="Custo"
                              fill="hsl(var(--destructive))"
                              radius={[4, 4, 0, 0]}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="margem"
                              name="Margem"
                              stroke="hsl(var(--primary))"
                              strokeWidth={3}
                              dot={{ r: 5 }}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-3 font-medium">Mes</th>
                                <th className="text-right p-3 font-medium">Receita</th>
                                <th className="text-right p-3 font-medium">Custo</th>
                                <th className="text-right p-3 font-medium">Margem</th>
                                <th className="text-right p-3 font-medium">% Margem</th>
                                <th className="text-center p-3 font-medium">Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dreMensal.map((mes) => (
                                <tr key={mes.mes} className="border-t hover:bg-muted/20">
                                  <td className="p-3 font-medium">{mes.mes}</td>
                                  <td className="p-3 text-right font-mono text-success">
                                    {formatCurrency(mes.receita)}
                                  </td>
                                  <td className="p-3 text-right font-mono text-destructive">
                                    {formatCurrency(mes.custo)}
                                  </td>
                                  <td className="p-3 text-right font-mono font-bold text-primary">
                                    {formatCurrency(mes.margem)}
                                  </td>
                                  <td className="p-3 text-right">{((mes.margem / mes.receita) * 100).toFixed(1)}%</td>
                                  <td className="p-3 text-center">
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      <Eye className="w-3 h-3" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                )}

                {/* FUNDO FIXO */}
                {tab === "fundofixo" && (
                  <div className="space-y-4">
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Lancamentos Fundo Fixo</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {fundoFixoMock.filter((f) => f.status === "pendente").length} pendentes
                          </Badge>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" /> Nova Despesa
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="text-left p-2 font-medium">ID</th>
                              <th className="text-left p-2 font-medium">Descricao</th>
                              <th className="text-left p-2 font-medium">Categoria</th>
                              <th className="text-right p-2 font-medium">Valor</th>
                              <th className="text-left p-2 font-medium">Data</th>
                              <th className="text-left p-2 font-medium">Responsavel</th>
                              <th className="text-center p-2 font-medium">Status</th>
                              <th className="text-center p-2 font-medium">Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fundoFixoMock.map((ff) => (
                              <tr
                                key={ff.id}
                                className="border-t hover:bg-muted/20 cursor-pointer"
                                onClick={() => handleOpenSheet(ff, "fundo")}
                              >
                                <td className="p-2 font-mono font-medium">{ff.id}</td>
                                <td className="p-2">{ff.descricao}</td>
                                <td className="p-2">
                                  <Badge variant="outline" className="text-xs">
                                    {ff.categoria}
                                  </Badge>
                                </td>
                                <td className="p-2 text-right font-mono">{formatCurrency(ff.valor)}</td>
                                <td className="p-2">{formatDate(ff.data)}</td>
                                <td className="p-2">{ff.responsavel}</td>
                                <td className="p-2 text-center">{getStatusBadge(ff.status)}</td>
                                <td className="p-2 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {ff.status === "pendente" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-success"
                                        title="Prestar Contas"
                                      >
                                        <CheckCircle className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Ver">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Governanca */}
                  <Card className="border-warning/30 bg-warning/5">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Regras de Governanca</p>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            <li>Fundo fixo deve ser prestado em ate 48h</li>
                            <li>Pagamentos acima de R$ 5.000 exigem aprovacao do gerente</li>
                            <li>Borderos devem ser aprovados antes de execucao</li>
                            <li>Conciliacao bancaria deve ser feita diariamente</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}
        </div>
        </div>
      </main>

        {/* Painel Lateral - Mantido igual */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Detalhe{" "}
                {sheetType === "cap"
                  ? "Conta a Pagar"
                  : sheetType === "car"
                    ? "Conta a Receber"
                    : sheetType === "bordero"
                      ? "Bordero"
                      : sheetType === "fundo"
                        ? "Fundo Fixo"
                        : "Lancamento"}
              </SheetTitle>
            </SheetHeader>
            {selectedItem && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold font-mono">{selectedItem.id}</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(selectedItem.valor || selectedItem.valorTotal || 0)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Informacoes</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2 text-sm">
                    {selectedItem.fornecedor && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fornecedor</span>
                        <span>{selectedItem.fornecedor}</span>
                      </div>
                    )}
                    {selectedItem.cliente && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cliente</span>
                        <span>{selectedItem.cliente}</span>
                      </div>
                    )}
                    {selectedItem.descricao && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Descricao</span>
                        <span className="text-right max-w-[200px]">{selectedItem.descricao}</span>
                      </div>
                    )}
                    {selectedItem.vencimento && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vencimento</span>
                        <span>{formatDate(selectedItem.vencimento)}</span>
                      </div>
                    )}
                    {selectedItem.natureza && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Natureza</span>
                        <Badge variant="outline">{selectedItem.natureza}</Badge>
                      </div>
                    )}
                    {selectedItem.nf && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NF</span>
                        <span className="font-mono">{selectedItem.nf}</span>
                      </div>
                    )}
                    {selectedItem.medicao && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medicao</span>
                        <span className="font-mono">{selectedItem.medicao}</span>
                      </div>
                    )}
                    {selectedItem.centroCusto && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Centro de Custo</span>
                        <span>{selectedItem.centroCusto}</span>
                      </div>
                    )}
                    {selectedItem.aprovador && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Aprovador</span>
                        <span>{selectedItem.aprovador}</span>
                      </div>
                    )}
                    {selectedItem.responsavel && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Responsavel</span>
                        <span>{selectedItem.responsavel}</span>
                      </div>
                    )}
                    {selectedItem.comprovante && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Comprovante</span>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs font-mono"
                          onClick={() => alert("Abrir comprovante")}
                        >
                          {selectedItem.comprovante}
                        </Button>
                      </div>
                    )}
                    {selectedItem.observacao && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Observacao</span>
                        <span className="mt-1 text-xs">{selectedItem.observacao}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="flex gap-2">
                  {selectedItem.status === "pendente_aprovacao" && <Button className="flex-1">Aprovar</Button>}
                  {selectedItem.status === "aprovado" && <Button className="flex-1">Pagar</Button>}
                  {selectedItem.status === "vencido" && (
                    <Button className="flex-1" variant="destructive">
                      Regularizar
                    </Button>
                  )}
                  {selectedItem.status === "pendente" && (
                    <Button className="flex-1" variant="destructive">
                      Aguardando Prestar Contas
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" /> Documentos
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default function FinanceiroPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <FinanceiroContent />
    </Suspense>
  )
}
