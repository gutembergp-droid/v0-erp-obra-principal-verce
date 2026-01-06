"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Gauge,
  AlertTriangle,
  DollarSign,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Target,
  Activity,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Percent,
  Calculator,
  PieChart,
  Scale,
  ShieldCheck,
  Gavel,
  Users,
  Truck,
  ClipboardCheck,
  Divide,
} from "lucide-react"

// ============================================================================
// DADOS MOCKADOS - 100% PERFORMANCE COM KPIs GNESIS
// ============================================================================

const dreResumo = {
  faturamento: 176000000,
  impostos: 12320000,
  receitaLiquida: 163680000,
  custosDiretos: 142560000,
  custosIndiretos: 18120000,
  dag: 5280000,
  margemBruta: 15320000,
  margemBrutaPercent: 8.7,
  metaMargemPercent: 9.0,
  lucroOperacional: 11120000,
  lucroOperacionalPercent: 6.3,
  ebitda: 13450000,
  ebitdaPercent: 7.6,
}

const kpisGnesis = {
  fcd: {
    codigo: "F/CD",
    nome: "Faturamento / Custo Direto",
    formula: "Faturamento ÷ Custo Direto",
    valor: 1.23,
    meta: 1.25,
    status: "atencao" as const,
    interpretacao: "Cada R$1 de CD gera R$1,23 de faturamento",
    acaoGerencial: "Otimizar produtividade para aumentar faturamento",
    historico: [1.18, 1.2, 1.21, 1.22, 1.23, 1.23],
  },
  crco: {
    codigo: "CR/CO",
    nome: "Custo Real / Custo Orcado",
    formula: "Custo Real ÷ Custo Orçado",
    valor: 0.98,
    meta: 1.0,
    status: "ok" as const,
    interpretacao: "Custo 2% abaixo do orçado - eficiência",
    acaoGerencial: "Manter controles e monitorar tendências",
    historico: [1.02, 1.01, 0.99, 0.98, 0.98, 0.98],
  },
  cicd: {
    codigo: "CI/CD",
    nome: "Custo Indireto / Custo Direto",
    formula: "Custo Indireto ÷ Custo Direto",
    valor: 0.127,
    meta: 0.12,
    status: "atencao" as const,
    interpretacao: "12,7% de overhead sobre custos diretos",
    acaoGerencial: "Revisar estrutura administrativa",
    historico: [0.14, 0.135, 0.13, 0.128, 0.127, 0.127],
  },
  mo: {
    codigo: "MO",
    nome: "Margem Operacional",
    formula: "(Fat - Imp - CD - CI - DAG) ÷ Faturamento",
    valor: 0.063,
    meta: 0.07,
    status: "atencao" as const,
    interpretacao: "Margem de 6,3% sobre faturamento",
    acaoGerencial: "Aumentar receita ou reduzir custos indiretos",
    historico: [0.055, 0.058, 0.06, 0.062, 0.063, 0.063],
  },
}

const composicaoCustos = {
  custoDireto: {
    total: 142560000,
    materiais: 49800000,
    maoDeObra: 59200000,
    equipamentos: 26100000,
    subempreiteiros: 7460000,
  },
  custoIndireto: {
    total: 18120000,
    administracao: 7200000,
    canteiro: 4800000,
    suporte: 3600000,
    seguros: 2520000,
  },
  dag: 5280000,
}

const custosPorCategoria = [
  { categoria: "Mao de Obra", orcado: 58000000, realizado: 59200000, desvio: 1200000, status: "atencao" as const },
  { categoria: "Materiais", orcado: 50400000, realizado: 49800000, desvio: -600000, status: "ok" as const },
  { categoria: "Equipamentos", orcado: 26600000, realizado: 26100000, desvio: -500000, status: "ok" as const },
  { categoria: "Terceiros", orcado: 19600000, realizado: 19580000, desvio: -20000, status: "ok" as const },
  { categoria: "Indiretos", orcado: 6200000, realizado: 6000000, desvio: -200000, status: "ok" as const },
]

const qualidade = {
  conformidade: 93.5,
  inspecoesRealizadas: 234,
  inspecoesProgramadas: 252,
  ncsAbertas: 7,
  ncsFechadas: 45,
}

const ssma = {
  diasSemAcidente: 127,
  taxaFrequencia: 0.8,
  ddsRealizados: 98,
  ddsProgramados: 100,
}

const juridico = {
  processosAtivos: 2,
  riscoEstimado: 850000,
  contratosVencer: 4,
}

const efetivo = {
  presentes: 342,
  percentualPresenca: 90.0,
  proprios: 257,
  terceiros: 85,
  turnover: 3.2,
}

const equipamentos = {
  emOperacao: 38,
  disponibilidade: 84.4,
  emManutencao: 5,
  parados: 2,
  utilizacao: 89.5,
}

const alertasPerformance = [
  { id: 1, tipo: "critico", titulo: "CI/CD acima da meta (12,7%)", valor: "+0.7%", area: "Custo Indireto", dias: 3 },
  { id: 2, tipo: "atencao", titulo: "F/CD abaixo da meta (1.23)", valor: "-1.6%", area: "Faturamento", dias: 7 },
  { id: 3, tipo: "atencao", titulo: "MO abaixo da meta (6,3%)", valor: "-10%", area: "Margem", dias: 5 },
  { id: 4, tipo: "info", titulo: "CR/CO dentro da meta (0.98)", valor: "-2%", area: "Custo", dias: 0 },
  { id: 5, tipo: "atencao", titulo: "Desvio Mao de Obra +R$ 1.2 Mi", valor: "+2.1%", area: "Custo Direto", dias: 3 },
  { id: 6, tipo: "info", titulo: "127 dias sem acidentes", valor: "SSMA", area: "SSMA", dias: 0 },
]

// ============================================================================
// FUNCOES UTILITARIAS
// ============================================================================

function formatarMoeda(valor: number): string {
  if (Math.abs(valor) >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  if (Math.abs(valor) >= 1000) return `R$ ${(valor / 1000).toFixed(0)} mil`
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

// Nova função para formatar percentual de KPIs GNESIS
function formatarPercentual(valor: number): string {
  return `${(valor * 100).toFixed(1)}%`
}

// ============================================================================
// COMPONENTES
// ============================================================================

interface KPIGnesisCardProps {
  kpi: {
    codigo: string
    nome: string
    formula: string
    valor: number
    meta: number
    status: "ok" | "atencao" | "critico"
    interpretacao: string
    historico: number[]
  }
  onClick?: () => void
}

function KPIGnesisCard({ kpi, onClick }: KPIGnesisCardProps) {
  const desvio = ((kpi.valor - kpi.meta) / kpi.meta) * 100
  const isPercentual = kpi.codigo === "MO" || kpi.codigo === "CI/CD"
  const valorFormatado = isPercentual ? formatarPercentual(kpi.valor) : kpi.valor.toFixed(2)
  const metaFormatada = isPercentual ? formatarPercentual(kpi.meta) : kpi.meta.toFixed(2)

  return (
    <div
      className="p-4 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Divide className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-bold text-primary">{kpi.codigo}</span>
        </div>
        <Badge
          variant="outline"
          className={
            kpi.status === "ok"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : kpi.status === "atencao"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                : "bg-destructive/10 text-destructive border-destructive/30"
          }
        >
          {kpi.status === "ok" ? "Na Meta" : kpi.status === "atencao" ? "Atenção" : "Crítico"}
        </Badge>
      </div>

      <p className="text-[10px] text-muted-foreground mb-2 truncate">{kpi.nome}</p>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-foreground">{valorFormatado}</span>
        <span className="text-xs text-muted-foreground">/ {metaFormatada}</span>
        <span
          className={`text-xs font-medium flex items-center gap-0.5 ${
            desvio >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
          }`}
        >
          {desvio >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(desvio).toFixed(1)}%
        </span>
      </div>

      {/* Mini grafico de barras do historico */}
      <div className="flex items-end gap-1 h-8 mb-2">
        {kpi.historico.map((valor, i) => {
          const maxVal = Math.max(...kpi.historico)
          const minVal = Math.min(...kpi.historico) * 0.9
          const altura = ((valor - minVal) / (maxVal - minVal)) * 100
          return (
            <div
              key={i}
              className={`flex-1 rounded-t transition-all ${
                i === kpi.historico.length - 1
                  ? kpi.status === "ok"
                    ? "bg-emerald-500"
                    : kpi.status === "atencao"
                      ? "bg-amber-500"
                      : "bg-destructive"
                  : "bg-muted-foreground/30"
              }`}
              style={{ height: `${Math.max(altura, 10)}%` }}
            />
          )
        })}
      </div>

      <p className="text-[9px] text-muted-foreground truncate">{kpi.formula}</p>
    </div>
  )
}

interface CardDREProps {
  titulo: string
  valor: number
  percentual?: number
  meta?: number
  icone: React.ReactNode
  tipo?: "receita" | "custo" | "resultado"
  onClick?: () => void
}

function CardDRE({ titulo, valor, percentual, meta, icone, tipo = "resultado", onClick }: CardDREProps) {
  const desvio = percentual && meta ? percentual - meta : 0

  return (
    <div
      className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icone}</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{titulo}</span>
        </div>
        {percentual !== undefined && meta !== undefined && (
          <div
            className={`flex items-center gap-0.5 text-[10px] font-semibold ${
              tipo === "custo"
                ? desvio <= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-destructive"
                : desvio >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-destructive"
            }`}
          >
            {desvio >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(desvio).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="text-xl font-bold text-foreground">{formatarMoeda(valor)}</div>
      {percentual !== undefined && (
        <div className="mt-2">
          <Progress value={(percentual / (meta || 100)) * 100} className="h-1.5" />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">{percentual.toFixed(1)}%</span>
            <span className="text-[10px] text-muted-foreground">meta: {meta}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

function VisaoPerformanceContent() {
  const router = useRouter()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState<{
    tipo: "kpi" | "custo" | "alerta"
    dados: any
  } | null>(null)

  const navegarPara = (rota: string) => router.push(rota)

  const abrirSheet = (tipo: "kpi" | "custo" | "alerta", dados: any) => {
    setSheetContent({ tipo, dados })
    setSheetOpen(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gauge className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Cockpit de Governanca</h1>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  PERFORMANCE
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>

          {/* Navegacao entre visoes */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/cockpit")}>
              Geral
            </Button>
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/cockpit/visao-contrato")}>
              Contrato
            </Button>
            <Button variant="default" size="sm">
              Performance
            </Button>
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/cockpit/visao-financeiro")}>
              Financeiro
            </Button>
            <Button variant="outline" size="sm" className="ml-2 bg-transparent">
              Janeiro 2025
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">INDICADORES GNESIS (KPIs Oficiais)</h2>
            <InfoTooltip content="KPIs oficiais do manual ERP-GNESIS para gestão de contratos" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(kpisGnesis).map((kpi) => (
              <KPIGnesisCard key={kpi.codigo} kpi={kpi} onClick={() => abrirSheet("kpi", kpi)} />
            ))}
          </div>
        </div>

        {/* RESULTADO ECONOMICO (DRE) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">RESULTADO ECONOMICO (DRE)</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <CardDRE
              titulo="Faturamento"
              valor={dreResumo.faturamento}
              icone={<DollarSign className="h-4 w-4" />}
              tipo="receita"
            />
            <CardDRE
              titulo="Custo Direto"
              valor={dreResumo.custosDiretos}
              icone={<Calculator className="h-4 w-4" />}
              tipo="custo"
            />
            <CardDRE
              titulo="Custo Indireto"
              valor={dreResumo.custosIndiretos}
              icone={<BarChart3 className="h-4 w-4" />}
              tipo="custo"
            />
            <CardDRE titulo="DAG" valor={dreResumo.dag} icone={<Activity className="h-4 w-4" />} tipo="custo" />
            <CardDRE
              titulo="Margem Bruta"
              valor={dreResumo.margemBruta}
              percentual={dreResumo.margemBrutaPercent}
              meta={dreResumo.metaMargemPercent}
              icone={<Percent className="h-4 w-4" />}
              tipo="resultado"
            />
            <CardDRE
              titulo="Lucro Operacional"
              valor={dreResumo.lucroOperacional}
              percentual={dreResumo.lucroOperacionalPercent}
              meta={7.0}
              icone={<TrendingUp className="h-4 w-4" />}
              tipo="resultado"
            />
          </div>
        </div>

        {/* CUSTO META E RECURSOS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">CUSTO META E RECURSOS</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Tabela de custos por categoria */}
            <div className="lg:col-span-1 p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-foreground">CUSTO POR CATEGORIA</h3>
                <div className="flex gap-2 text-[9px]">
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary" /> Meta
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-destructive" /> Real
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {custosPorCategoria.map((cat) => (
                  <div key={cat.categoria} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{cat.categoria}</span>
                      <div className="flex gap-2">
                        <span className="text-foreground font-medium">{formatarMoeda(cat.realizado)}</span>
                        <span
                          className={`font-medium ${cat.desvio <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
                        >
                          {cat.desvio >= 0 ? "+" : ""}
                          {formatarMoeda(cat.desvio)}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-primary/40 rounded-full"
                        style={{ width: `${(cat.orcado / 60000000) * 100}%` }}
                      />
                      <div
                        className={`absolute h-full rounded-full ${cat.status === "ok" ? "bg-primary" : "bg-destructive"}`}
                        style={{ width: `${(cat.realizado / 60000000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">TOTAL</span>
                    <div className="flex gap-2">
                      <span className="text-foreground">{formatarMoeda(160680000)}</span>
                      <span className="text-destructive">+R$ 2.3 Mi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efetivo e Equipamentos */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">EFETIVO</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{efetivo.presentes}</div>
                    <div className="text-[10px] text-muted-foreground">Presentes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{efetivo.percentualPresenca}%</div>
                    <div className="text-[10px] text-muted-foreground">Presenca</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{efetivo.proprios}</div>
                    <div className="text-[9px] text-muted-foreground">Proprios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{efetivo.terceiros}</div>
                    <div className="text-[9px] text-muted-foreground">Terceiros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{efetivo.turnover}%</div>
                    <div className="text-[9px] text-muted-foreground">Turnover</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">EQUIPAMENTOS</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{equipamentos.emOperacao}</div>
                    <div className="text-[10px] text-muted-foreground">Operando</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{equipamentos.disponibilidade}%</div>
                    <div className="text-[10px] text-muted-foreground">Disponib.</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{equipamentos.emManutencao}</div>
                    <div className="text-[9px] text-muted-foreground">Em Manutencao</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{equipamentos.parados}</div>
                    <div className="text-[9px] text-muted-foreground">Parados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{equipamentos.utilizacao}%</div>
                    <div className="text-[9px] text-muted-foreground">Utilizacao</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualidade, SSMA, Juridico */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">QUALIDADE</h3>
                  </div>
                  <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {qualidade.ncsAbertas} NCs
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Conformidade</span>
                    <span className="font-semibold text-foreground">{qualidade.conformidade}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Inspecoes</span>
                    <span className="font-semibold text-foreground">
                      {qualidade.inspecoesRealizadas}/{qualidade.inspecoesProgramadas}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">SSMA</h3>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  >
                    {ssma.diasSemAcidente} dias s/ acid.
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Taxa Frequencia</span>
                    <span className="font-semibold text-foreground">{ssma.taxaFrequencia}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">DDS Realizados</span>
                    <span className="font-semibold text-foreground">
                      {ssma.ddsRealizados}/{ssma.ddsProgramados}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Gavel className="h-4 w-4 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">JURIDICO</h3>
                  </div>
                  <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {juridico.processosAtivos} ativos
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Risco Estimado</span>
                    <span className="font-semibold text-foreground">{formatarMoeda(juridico.riscoEstimado)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Contratos a Vencer</span>
                    <span className="font-semibold text-foreground">{juridico.contratosVencer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ALERTAS DE PERFORMANCE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">ALERTAS DE PERFORMANCE</h2>
            <Badge variant="outline">{alertasPerformance.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {alertasPerformance.map((alerta) => (
              <div
                key={alerta.id}
                className={`p-3 rounded-lg border cursor-pointer hover:border-primary/40 transition-colors ${
                  alerta.tipo === "critico"
                    ? "bg-destructive/5 border-destructive/30"
                    : alerta.tipo === "atencao"
                      ? "bg-amber-500/5 border-amber-500/30"
                      : "bg-emerald-500/5 border-emerald-500/30"
                }`}
                onClick={() => abrirSheet("alerta", alerta)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-full ${
                      alerta.tipo === "critico"
                        ? "bg-destructive/20"
                        : alerta.tipo === "atencao"
                          ? "bg-amber-500/20"
                          : "bg-emerald-500/20"
                    }`}
                  >
                    {alerta.tipo === "critico" ? (
                      <AlertCircle className="h-3 w-3 text-destructive" />
                    ) : alerta.tipo === "atencao" ? (
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{alerta.titulo}</p>
                    <p className="text-[10px] text-muted-foreground">{alerta.area}</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{alerta.valor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sheet para detalhes */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {sheetContent?.tipo === "kpi"
                ? `KPI: ${sheetContent.dados.codigo}`
                : sheetContent?.tipo === "custo"
                  ? "Detalhe de Custo"
                  : "Detalhe do Alerta"}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)] mt-4">
            {sheetContent?.tipo === "kpi" && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm font-semibold text-foreground">{sheetContent.dados.nome}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sheetContent.dados.formula}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">Valor Atual</p>
                    <p className="text-xl font-bold text-foreground">
                      {sheetContent.dados.codigo === "MO" || sheetContent.dados.codigo === "CI/CD"
                        ? formatarPercentual(sheetContent.dados.valor)
                        : sheetContent.dados.valor.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">Meta</p>
                    <p className="text-xl font-bold text-foreground">
                      {sheetContent.dados.codigo === "MO" || sheetContent.dados.codigo === "CI/CD"
                        ? formatarPercentual(sheetContent.dados.meta)
                        : sheetContent.dados.meta.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">Interpretacao</p>
                  <p className="text-sm text-muted-foreground">{sheetContent.dados.interpretacao}</p>
                </div>
                <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="text-xs font-semibold text-primary mb-2">Acao Gerencial</p>
                  <p className="text-sm text-foreground">{sheetContent.dados.acaoGerencial}</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-3">Historico (6 meses)</p>
                  <div className="flex items-end gap-2 h-24">
                    {sheetContent.dados.historico.map((valor: number, i: number) => {
                      const maxVal = Math.max(...sheetContent.dados.historico)
                      const minVal = Math.min(...sheetContent.dados.historico) * 0.9
                      const altura = ((valor - minVal) / (maxVal - minVal)) * 100
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-t transition-all ${
                              i === sheetContent.dados.historico.length - 1 ? "bg-primary" : "bg-muted-foreground/30"
                            }`}
                            style={{ height: `${Math.max(altura, 10)}%` }}
                          />
                          <span className="text-[9px] text-muted-foreground">
                            {sheetContent.dados.codigo === "MO" || sheetContent.dados.codigo === "CI/CD"
                              ? `${(valor * 100).toFixed(1)}%`
                              : valor.toFixed(2)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
            {sheetContent?.tipo === "alerta" && (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${
                    sheetContent.dados.tipo === "critico"
                      ? "bg-destructive/10"
                      : sheetContent.dados.tipo === "atencao"
                        ? "bg-amber-500/10"
                        : "bg-emerald-500/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{sheetContent.dados.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-1">Area: {sheetContent.dados.area}</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">Valor do Desvio</p>
                  <p className="text-2xl font-bold text-foreground">{sheetContent.dados.valor}</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">Dias em Alerta</p>
                  <p className="text-xl font-bold text-foreground">{sheetContent.dados.dias} dias</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ============================================================================
// EXPORT
// ============================================================================

export default function VisaoPerformancePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <VisaoPerformanceContent />
    </Suspense>
  )
}
