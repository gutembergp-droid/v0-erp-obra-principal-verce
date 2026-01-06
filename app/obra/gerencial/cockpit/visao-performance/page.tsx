"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
  Zap,
  Timer,
  Award,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

// ============================================================================
// DADOS MOCKADOS - 100% PERFORMANCE
// ============================================================================

const dreResumo = {
  receitaLiquida: 176000000,
  custosDiretos: 142560000,
  custosIndiretos: 18120000,
  margemBruta: 15320000,
  margemBrutaPercent: 8.7,
  metaMargemPercent: 9.0,
  despesasOperacionais: 4200000,
  lucroOperacional: 11120000,
  lucroOperacionalPercent: 6.3,
  ebitda: 13450000,
  ebitdaPercent: 7.6,
}

const indicadoresPerformance = {
  spi: { valor: 0.95, meta: 1.0, status: "atencao" as const },
  cpi: { valor: 1.02, meta: 1.0, status: "ok" as const },
  produtividade: { valor: 94.2, meta: 95.0, status: "atencao" as const },
  eficiencia: { valor: 97.8, meta: 95.0, status: "ok" as const },
  idr: { valor: 0.97, meta: 1.0, status: "atencao" as const }, // Indice de Desempenho de Resultado
  ipe: { valor: 1.01, meta: 1.0, status: "ok" as const }, // Indice de Performance Economica
}

const custoMeta = {
  orcadoTotal: 231917000,
  realizadoTotal: 160680000,
  percentualRealizado: 69.3,
  previsto: 72.0,
  desvioTotal: 2340000,
  desvioPercent: 1.5,
  tendenciaFinal: 235800000,
  variacaoTendencia: 1.7,
}

const custosPorCategoria = [
  { categoria: "Mao de Obra", orcado: 85000000, realizado: 59200000, meta: 58000000, status: "atencao" as const },
  { categoria: "Materiais", orcado: 72000000, realizado: 49800000, meta: 50400000, status: "ok" as const },
  { categoria: "Equipamentos", orcado: 38000000, realizado: 26100000, meta: 26600000, status: "ok" as const },
  { categoria: "Terceiros", orcado: 28000000, realizado: 19580000, meta: 19600000, status: "ok" as const },
  { categoria: "Indiretos", orcado: 8917000, realizado: 6000000, meta: 6200000, status: "ok" as const },
]

const qualidade = {
  inspecoesRealizadas: 234,
  inspecoesPendentes: 18,
  inspecoesProgramadas: 252,
  taxaConformidade: 93.5,
  ncsAbertas: 7,
  ncsFechadas: 45,
  ncsTotal: 52,
  acoesCorretivas: 12,
  acoesPendentes: 4,
  tempoMedioFechamento: 8.5, // dias
}

const ssma = {
  diasSemAcidente: 127,
  metaDiasSemAcidente: 180,
  incidentesMes: 2,
  incidentesAno: 14,
  taxaFrequencia: 0.8,
  taxaGravidade: 12.3,
  treinamentosRealizados: 45,
  treinamentosPendentes: 8,
  ddsRealizados: 98,
  ddsProgramados: 100,
  epiConformidade: 97.2,
}

const juridico = {
  processosAtivos: 2,
  processosEncerrados: 5,
  notificacoesPendentes: 1,
  notificacoesRespondidas: 12,
  riscoEstimado: 850000,
  provisaoContabil: 650000,
  contratosTerceiros: 23,
  contratosVencer30d: 4,
  irregularidades: 0,
}

const efetivo = {
  previsto: 380,
  presente: 342,
  ausente: 38,
  percentualPresenca: 90.0,
  turnover: 3.2,
  horasExtras: 1240,
  horasNormais: 58400,
  produtividadeHH: 94.2,
  terceiros: 85,
  proprios: 257,
}

const equipamentos = {
  disponiveis: 45,
  emOperacao: 38,
  emManutencao: 5,
  parados: 2,
  disponibilidade: 84.4,
  utilizacao: 89.5,
  horasProdutivasTotal: 12400,
  horasParadasTotal: 1800,
}

const alertasPerformance = [
  { id: 1, tipo: "critico", titulo: "Desvio de custo Mao de Obra", valor: "+2.1%", area: "Custo", dias: 3 },
  { id: 2, tipo: "atencao", titulo: "SPI abaixo da meta (0.95)", valor: "-5%", area: "Cronograma", dias: 7 },
  { id: 3, tipo: "atencao", titulo: "7 NCs abertas", valor: "Qualidade", area: "Qualidade", dias: 15 },
  { id: 4, tipo: "info", titulo: "127 dias sem acidentes", valor: "SSMA", area: "SSMA", dias: 0 },
  { id: 5, tipo: "atencao", titulo: "4 contratos vencem em 30 dias", valor: "Juridico", area: "Juridico", dias: 5 },
  { id: 6, tipo: "info", titulo: "CPI acima da meta (1.02)", valor: "+2%", area: "Custo", dias: 0 },
]

// ============================================================================
// FUNCOES UTILITARIAS
// ============================================================================

function formatarMoeda(valor: number): string {
  if (Math.abs(valor) >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  if (Math.abs(valor) >= 1000) return `R$ ${(valor / 1000).toFixed(0)} mil`
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

// ============================================================================
// COMPONENTES
// ============================================================================

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
                  ? "text-primary"
                  : "text-destructive"
                : desvio >= 0
                  ? "text-primary"
                  : "text-destructive"
            }`}
          >
            {desvio >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {desvio > 0 ? "+" : ""}
            {desvio.toFixed(1)}%
          </div>
        )}
      </div>
      <div className="mb-1">
        <span className="text-xl font-bold tabular-nums text-foreground">{formatarMoeda(valor)}</span>
      </div>
      {percentual !== undefined && (
        <div className="flex items-center gap-2">
          <Progress value={Math.min(percentual * 10, 100)} className="h-1.5 flex-1" />
          <span className="text-[10px] tabular-nums font-medium text-foreground">{percentual}%</span>
          {meta && <span className="text-[9px] text-muted-foreground">meta: {meta}%</span>}
        </div>
      )}
    </div>
  )
}

interface CardKpiProps {
  titulo: string
  valor: number | string
  meta?: number | string
  unidade?: string
  icone: React.ReactNode
  status: "ok" | "atencao" | "critico"
  invertido?: boolean
}

function CardKpi({ titulo, valor, meta, unidade = "", icone, status, invertido = false }: CardKpiProps) {
  const numValor = typeof valor === "number" ? valor : Number.parseFloat(valor)
  const numMeta = typeof meta === "number" ? meta : meta ? Number.parseFloat(meta) : numValor
  const percentualMeta = invertido ? (numMeta / numValor) * 100 : (numValor / numMeta) * 100

  return (
    <div className="p-2.5 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <div className="text-muted-foreground">{icone}</div>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{titulo}</span>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${
            status === "ok" ? "bg-primary" : status === "atencao" ? "bg-amber-500" : "bg-destructive"
          }`}
        />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold tabular-nums text-foreground">
          {valor}
          {unidade}
        </span>
        {meta && (
          <span className="text-[10px] text-muted-foreground">
            / {meta}
            {unidade}
          </span>
        )}
      </div>
      {meta && <Progress value={Math.min(percentualMeta, 100)} className="h-1 mt-1.5" />}
    </div>
  )
}

function CardCustoCategoria({
  categoria,
  orcado,
  realizado,
  meta,
  status,
}: {
  categoria: string
  orcado: number
  realizado: number
  meta: number
  status: "ok" | "atencao" | "critico"
}) {
  const percentualRealizado = (realizado / orcado) * 100
  const percentualMeta = (meta / orcado) * 100
  const desvio = realizado - meta

  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-0">
      <div className="w-24 text-[11px] font-medium text-foreground">{categoria}</div>
      <div className="flex-1">
        <div className="relative h-4 bg-muted/30 rounded overflow-hidden">
          <div
            className="absolute top-0 left-0 h-2 bg-muted-foreground/40 rounded-t"
            style={{ width: `${percentualMeta}%` }}
          />
          <div
            className={`absolute top-2 left-0 h-2 rounded-b ${status === "ok" ? "bg-primary" : status === "atencao" ? "bg-amber-500" : "bg-destructive"}`}
            style={{ width: `${percentualRealizado}%` }}
          />
        </div>
      </div>
      <div className="w-20 text-right">
        <span className="text-[10px] font-medium text-foreground">{formatarMoeda(realizado)}</span>
      </div>
      <div className={`w-16 text-right text-[10px] font-semibold ${desvio <= 0 ? "text-primary" : "text-destructive"}`}>
        {desvio > 0 ? "+" : ""}
        {formatarMoeda(desvio)}
      </div>
      <div
        className={`w-2 h-2 rounded-full ${status === "ok" ? "bg-primary" : status === "atencao" ? "bg-amber-500" : "bg-destructive"}`}
      />
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL - VISAO PERFORMANCE
// ============================================================================

function VisaoPerformanceContent() {
  const router = useRouter()
  const [painelAberto, setPainelAberto] = useState(false)
  const [painelTipo, setPainelTipo] = useState<"dre" | "custo" | "qualidade" | "ssma" | "juridico" | "alerta" | null>(
    null,
  )
  const [itemSelecionado, setItemSelecionado] = useState<any>(null)

  const abrirPainel = (tipo: "dre" | "custo" | "qualidade" | "ssma" | "juridico" | "alerta", item?: any) => {
    setPainelTipo(tipo)
    setItemSelecionado(item)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full p-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border">
              <Gauge className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip
                  title="Visao Performance"
                  description="Indicadores de performance, resultado e eficiencia da obra"
                />
                <Badge variant="outline" className="text-[9px] h-5 border-primary/50 text-primary bg-primary/10">
                  PERFORMANCE
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-muted/30">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-xs hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit")}
              >
                Geral
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-xs hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-contrato")}
              >
                Contrato
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-xs bg-muted/50 border border-primary/30"
                disabled
              >
                Performance
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-xs hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-financeiro")}
              >
                Financeiro
              </Button>
            </div>
            <Badge variant="outline" className="text-[10px] h-6 px-2">
              Janeiro 2025
            </Badge>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 1: DRE RESUMIDO E INDICADORES PRINCIPAIS                     */}
        {/* ================================================================== */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">Resultado Economico (DRE)</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-6 gap-2 mb-3">
            <CardDRE
              titulo="Receita Liquida"
              valor={dreResumo.receitaLiquida}
              icone={<DollarSign className="w-4 h-4" />}
              tipo="receita"
              onClick={() => abrirPainel("dre")}
            />
            <CardDRE
              titulo="Custos Diretos"
              valor={dreResumo.custosDiretos}
              icone={<Calculator className="w-4 h-4" />}
              tipo="custo"
              onClick={() => abrirPainel("dre")}
            />
            <CardDRE
              titulo="Custos Indiretos"
              valor={dreResumo.custosIndiretos}
              icone={<Calculator className="w-4 h-4" />}
              tipo="custo"
              onClick={() => abrirPainel("dre")}
            />
            <CardDRE
              titulo="Margem Bruta"
              valor={dreResumo.margemBruta}
              percentual={dreResumo.margemBrutaPercent}
              meta={dreResumo.metaMargemPercent}
              icone={<Percent className="w-4 h-4" />}
              tipo="resultado"
              onClick={() => abrirPainel("dre")}
            />
            <CardDRE
              titulo="Lucro Operacional"
              valor={dreResumo.lucroOperacional}
              percentual={dreResumo.lucroOperacionalPercent}
              meta={7.0}
              icone={<TrendingUp className="w-4 h-4" />}
              tipo="resultado"
              onClick={() => abrirPainel("dre")}
            />
            <CardDRE
              titulo="EBITDA"
              valor={dreResumo.ebitda}
              percentual={dreResumo.ebitdaPercent}
              meta={8.0}
              icone={<BarChart3 className="w-4 h-4" />}
              tipo="resultado"
              onClick={() => abrirPainel("dre")}
            />
          </div>

          {/* INDICADORES DE PERFORMANCE */}
          <div className="grid grid-cols-6 gap-2">
            <CardKpi
              titulo="SPI"
              valor={indicadoresPerformance.spi.valor}
              meta={indicadoresPerformance.spi.meta}
              icone={<Timer className="w-3.5 h-3.5" />}
              status={indicadoresPerformance.spi.status}
            />
            <CardKpi
              titulo="CPI"
              valor={indicadoresPerformance.cpi.valor}
              meta={indicadoresPerformance.cpi.meta}
              icone={<DollarSign className="w-3.5 h-3.5" />}
              status={indicadoresPerformance.cpi.status}
            />
            <CardKpi
              titulo="Produtividade"
              valor={indicadoresPerformance.produtividade.valor}
              meta={indicadoresPerformance.produtividade.meta}
              unidade="%"
              icone={<Zap className="w-3.5 h-3.5" />}
              status={indicadoresPerformance.produtividade.status}
            />
            <CardKpi
              titulo="Eficiencia"
              valor={indicadoresPerformance.eficiencia.valor}
              meta={indicadoresPerformance.eficiencia.meta}
              unidade="%"
              icone={<Target className="w-3.5 h-3.5" />}
              status={indicadoresPerformance.eficiencia.status}
            />
            <CardKpi
              titulo="IDR"
              valor={indicadoresPerformance.idr.valor}
              meta={indicadoresPerformance.idr.meta}
              icone={<Activity className="w-3.5 h-3.5" />}
              status={indicadoresPerformance.idr.status}
            />
            <CardKpi
              titulo="IPE"
              valor={indicadoresPerformance.ipe.valor}
              meta={indicadoresPerformance.ipe.meta}
              icone={<Award className="w-3.5 h-3.5" />}
              status={indicadoresPerformance.ipe.status}
            />
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 2: CUSTO META E RECURSOS                                     */}
        {/* ================================================================== */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">Custo Meta e Recursos</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-12 gap-3">
            {/* CUSTO META POR CATEGORIA */}
            <div className="col-span-6 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wide">Custo por Categoria</span>
                <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-1.5 bg-muted-foreground/40 rounded-sm" />
                    Meta
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-1.5 bg-primary rounded-sm" />
                    Real
                  </span>
                </div>
              </div>
              <div className="space-y-0">
                {custosPorCategoria.map((cat) => (
                  <CardCustoCategoria key={cat.categoria} {...cat} />
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-semibold text-foreground">TOTAL</span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold text-foreground">
                    {formatarMoeda(custoMeta.realizadoTotal)}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${custoMeta.desvioTotal <= 0 ? "text-primary" : "text-destructive"}`}
                  >
                    {custoMeta.desvioTotal > 0 ? "+" : ""}
                    {formatarMoeda(custoMeta.desvioTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* EFETIVO E EQUIPAMENTOS */}
            <div className="col-span-3 space-y-3">
              {/* EFETIVO */}
              <div className="p-3 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Efetivo</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-lg font-bold text-foreground">{efetivo.presente}</div>
                    <div className="text-[9px] text-muted-foreground">Presentes</div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-lg font-bold text-foreground">{efetivo.percentualPresenca}%</div>
                    <div className="text-[9px] text-muted-foreground">Presenca</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Proprios</span>
                    <span className="font-medium text-foreground">{efetivo.proprios}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Terceiros</span>
                    <span className="font-medium text-foreground">{efetivo.terceiros}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Turnover</span>
                    <span className="font-medium text-foreground">{efetivo.turnover}%</span>
                  </div>
                </div>
              </div>

              {/* EQUIPAMENTOS */}
              <div className="p-3 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Equipamentos</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-lg font-bold text-foreground">{equipamentos.emOperacao}</div>
                    <div className="text-[9px] text-muted-foreground">Operando</div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-lg font-bold text-foreground">{equipamentos.disponibilidade}%</div>
                    <div className="text-[9px] text-muted-foreground">Disponib.</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Em Manutencao</span>
                    <span className="font-medium text-foreground">{equipamentos.emManutencao}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Parados</span>
                    <span className="font-medium text-destructive">{equipamentos.parados}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Utilizacao</span>
                    <span className="font-medium text-foreground">{equipamentos.utilizacao}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUALIDADE, SSMA, JURIDICO */}
            <div className="col-span-3 space-y-3">
              {/* QUALIDADE */}
              <div
                className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40"
                onClick={() => abrirPainel("qualidade")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide">Qualidade</span>
                  </div>
                  <Badge variant={qualidade.ncsAbertas > 5 ? "destructive" : "outline"} className="text-[9px] h-5">
                    {qualidade.ncsAbertas} NCs
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Conformidade</span>
                    <span className="font-semibold text-foreground">{qualidade.taxaConformidade}%</span>
                  </div>
                  <Progress value={qualidade.taxaConformidade} className="h-1.5" />
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Inspecoes</span>
                    <span className="font-medium text-foreground">
                      {qualidade.inspecoesRealizadas}/{qualidade.inspecoesProgramadas}
                    </span>
                  </div>
                </div>
              </div>

              {/* SSMA */}
              <div
                className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40"
                onClick={() => abrirPainel("ssma")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide">SSMA</span>
                  </div>
                  <Badge variant="outline" className="text-[9px] h-5 border-primary/50 text-primary">
                    {ssma.diasSemAcidente} dias s/ acid.
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Taxa Frequencia</span>
                    <span className="font-semibold text-foreground">{ssma.taxaFrequencia}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">DDS Realizados</span>
                    <span className="font-medium text-foreground">
                      {ssma.ddsRealizados}/{ssma.ddsProgramados}
                    </span>
                  </div>
                </div>
              </div>

              {/* JURIDICO */}
              <div
                className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40"
                onClick={() => abrirPainel("juridico")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide">Juridico</span>
                  </div>
                  <Badge variant={juridico.processosAtivos > 0 ? "outline" : "secondary"} className="text-[9px] h-5">
                    {juridico.processosAtivos} ativos
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Risco Estimado</span>
                    <span className="font-semibold text-foreground">{formatarMoeda(juridico.riscoEstimado)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Contratos a Vencer</span>
                    <span className="font-medium text-foreground">{juridico.contratosVencer30d}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 3: ALERTAS DE PERFORMANCE                                    */}
        {/* ================================================================== */}
        <div className="flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">Alertas de Performance</h2>
            <Badge variant="outline" className="text-[9px] h-5">
              {alertasPerformance.length}
            </Badge>
            <div className="flex-1 h-px bg-border" />
          </div>

          <ScrollArea className="h-[140px]">
            <div className="grid grid-cols-3 gap-2">
              {alertasPerformance.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-2.5 rounded-lg border cursor-pointer hover:border-primary/40 transition-colors ${
                    alerta.tipo === "critico"
                      ? "border-destructive/50 bg-destructive/5"
                      : alerta.tipo === "atencao"
                        ? "border-amber-500/50 bg-amber-500/5"
                        : "border-border bg-card"
                  }`}
                  onClick={() => abrirPainel("alerta", alerta)}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`mt-0.5 ${
                        alerta.tipo === "critico"
                          ? "text-destructive"
                          : alerta.tipo === "atencao"
                            ? "text-amber-500"
                            : "text-primary"
                      }`}
                    >
                      {alerta.tipo === "critico" ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : alerta.tipo === "atencao" ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate">{alerta.titulo}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-[9px] h-4 px-1.5">
                          {alerta.area}
                        </Badge>
                        <span className="text-[10px] font-semibold text-muted-foreground">{alerta.valor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* ================================================================== */}
        {/* PAINEL LATERAL - DRILL DOWN                                        */}
        {/* ================================================================== */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[400px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {painelTipo === "dre" && (
                  <>
                    <PieChart className="w-5 h-5" /> Detalhes DRE
                  </>
                )}
                {painelTipo === "custo" && (
                  <>
                    <Calculator className="w-5 h-5" /> Analise de Custo
                  </>
                )}
                {painelTipo === "qualidade" && (
                  <>
                    <ClipboardCheck className="w-5 h-5" /> Qualidade
                  </>
                )}
                {painelTipo === "ssma" && (
                  <>
                    <ShieldCheck className="w-5 h-5" /> SSMA
                  </>
                )}
                {painelTipo === "juridico" && (
                  <>
                    <Gavel className="w-5 h-5" /> Juridico
                  </>
                )}
                {painelTipo === "alerta" && (
                  <>
                    <AlertTriangle className="w-5 h-5" /> Detalhe do Alerta
                  </>
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              {painelTipo === "dre" && (
                <>
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <h4 className="text-sm font-semibold mb-3">Demonstrativo de Resultado</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Receita Liquida</span>
                        <span className="font-medium">{formatarMoeda(dreResumo.receitaLiquida)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-destructive">
                        <span>(-) Custos Diretos</span>
                        <span>{formatarMoeda(-dreResumo.custosDiretos)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-destructive">
                        <span>(-) Custos Indiretos</span>
                        <span>{formatarMoeda(-dreResumo.custosIndiretos)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t pt-2">
                        <span>= Margem Bruta</span>
                        <span className="text-primary">
                          {formatarMoeda(dreResumo.margemBruta)} ({dreResumo.margemBrutaPercent}%)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-destructive">
                        <span>(-) Despesas Operacionais</span>
                        <span>{formatarMoeda(-dreResumo.despesasOperacionais)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t pt-2">
                        <span>= Lucro Operacional</span>
                        <span className="text-primary">
                          {formatarMoeda(dreResumo.lucroOperacional)} ({dreResumo.lucroOperacionalPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-2">Comparativo com Meta</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Margem Bruta Real</span>
                        <span>{dreResumo.margemBrutaPercent}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Margem Bruta Meta</span>
                        <span>{dreResumo.metaMargemPercent}%</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Desvio</span>
                        <span
                          className={
                            dreResumo.margemBrutaPercent >= dreResumo.metaMargemPercent
                              ? "text-primary"
                              : "text-destructive"
                          }
                        >
                          {(dreResumo.margemBrutaPercent - dreResumo.metaMargemPercent).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {painelTipo === "qualidade" && (
                <>
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <h4 className="text-sm font-semibold mb-3">Indicadores de Qualidade</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 rounded bg-card border">
                        <div className="text-2xl font-bold text-foreground">{qualidade.taxaConformidade}%</div>
                        <div className="text-xs text-muted-foreground">Conformidade</div>
                      </div>
                      <div className="text-center p-3 rounded bg-card border">
                        <div className="text-2xl font-bold text-foreground">{qualidade.ncsAbertas}</div>
                        <div className="text-xs text-muted-foreground">NCs Abertas</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-2">Detalhamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Inspecoes Realizadas</span>
                        <span>{qualidade.inspecoesRealizadas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inspecoes Pendentes</span>
                        <span>{qualidade.inspecoesPendentes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NCs Fechadas</span>
                        <span>{qualidade.ncsFechadas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acoes Corretivas</span>
                        <span>{qualidade.acoesCorretivas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tempo Medio Fechamento</span>
                        <span>{qualidade.tempoMedioFechamento} dias</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {painelTipo === "ssma" && (
                <>
                  <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{ssma.diasSemAcidente}</div>
                      <div className="text-sm text-muted-foreground">Dias sem acidentes</div>
                      <Progress value={(ssma.diasSemAcidente / ssma.metaDiasSemAcidente) * 100} className="h-2 mt-2" />
                      <div className="text-xs text-muted-foreground mt-1">Meta: {ssma.metaDiasSemAcidente} dias</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-2">Indicadores SSMA</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Taxa de Frequencia</span>
                        <span>{ssma.taxaFrequencia}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de Gravidade</span>
                        <span>{ssma.taxaGravidade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incidentes no Mes</span>
                        <span>{ssma.incidentesMes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incidentes no Ano</span>
                        <span>{ssma.incidentesAno}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DDS Realizados</span>
                        <span>
                          {ssma.ddsRealizados}/{ssma.ddsProgramados}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conformidade EPI</span>
                        <span>{ssma.epiConformidade}%</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {painelTipo === "juridico" && (
                <>
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <h4 className="text-sm font-semibold mb-3">Situacao Juridica</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 rounded bg-card border">
                        <div className="text-2xl font-bold text-foreground">{juridico.processosAtivos}</div>
                        <div className="text-xs text-muted-foreground">Processos Ativos</div>
                      </div>
                      <div className="text-center p-3 rounded bg-card border">
                        <div className="text-2xl font-bold text-foreground">
                          {formatarMoeda(juridico.riscoEstimado)}
                        </div>
                        <div className="text-xs text-muted-foreground">Risco Estimado</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-2">Detalhamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Processos Encerrados</span>
                        <span>{juridico.processosEncerrados}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Notificacoes Pendentes</span>
                        <span>{juridico.notificacoesPendentes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Provisao Contabil</span>
                        <span>{formatarMoeda(juridico.provisaoContabil)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contratos Terceiros</span>
                        <span>{juridico.contratosTerceiros}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contratos a Vencer (30d)</span>
                        <span className="text-amber-500">{juridico.contratosVencer30d}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {painelTipo === "alerta" && itemSelecionado && (
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    {itemSelecionado.tipo === "critico" ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : itemSelecionado.tipo === "atencao" ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                    <Badge
                      variant={
                        itemSelecionado.tipo === "critico"
                          ? "destructive"
                          : itemSelecionado.tipo === "atencao"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {itemSelecionado.tipo.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold mb-2">{itemSelecionado.titulo}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Area</span>
                      <span>{itemSelecionado.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor/Impacto</span>
                      <span className="font-medium">{itemSelecionado.valor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dias em Aberto</span>
                      <span>{itemSelecionado.dias}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full" size="sm">
                      Ver Detalhes Completos
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
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
