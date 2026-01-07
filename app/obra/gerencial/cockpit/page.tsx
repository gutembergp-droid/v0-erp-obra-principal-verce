"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Gauge,
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  ArrowUp,
  ArrowDown,
  HardHat,
  TrendingUp,
  Target,
  Briefcase,
  FileCheck,
  Scale,
  ShieldAlert,
  Activity,
  Receipt,
  AlertCircle,
  Calculator,
  Landmark,
  Shield,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { DRECard } from "@/components/indicadores"

// ============================================================================
// DADOS MOCKADOS - GC-01 COCKPIT DE GOVERNANCA
// ============================================================================

// BLOCO 1: GESTAO DO CONTRATO COM CLIENTE
const gestaoCliente = {
  receita: {
    contratada: 254300000,
    medidaAcumulada: 176000000,
    percentualMedido: 69.2,
    previsto: 72.0,
    saldo: 78300000,
    ultimaMedicao: 8500000,
    aFaturar: 12300000,
    aReceber: 23500000,
  },
  cronograma: {
    dataInicio: "01/03/2024",
    dataTermino: "30/06/2027",
    diasTotais: 1218,
    diasDecorridos: 676,
    percentualPrevisto: 55.5,
    percentualRealizado: 52.8,
    marcos: [
      { nome: "Mobilizacao", posicao: 5, status: "concluido" },
      { nome: "Terraplenagem", posicao: 25, status: "concluido" },
      { nome: "Drenagem", posicao: 45, status: "em_andamento" },
      { nome: "Pavimentacao", posicao: 70, status: "pendente" },
      { nome: "Sinalizacao", posicao: 90, status: "pendente" },
      { nome: "Entrega", posicao: 100, status: "pendente" },
    ],
  },
  changeControl: {
    smesAbertas: 3,
    aditivosPendentes: 2,
    pleitosAtivos: 1,
    valorEmNegociacao: 4500000,
  },
  desvios: {
    glosas: 320000,
    contestacoes: 2,
    naoConformidadesCliente: 1,
  },
}

// BLOCO 2: GERENCIAMENTO INTERNO DA OBRA - KPIs GNESIS
const gerenciamentoInterno = {
  // Dados base para calculos
  faturamento: 176000000,
  impostos: 8800000, // 5% do faturamento
  custoDireto: 142560000,
  custoIndireto: 18120000,
  dag: 4200000, // Despesas Administrativas Gerais

  // KPIs GNESIS calculados
  kpis: {
    fcd: {
      // F/CD - Faturamento sobre Custo Direto
      valor: 1.23,
      meta: 1.2,
      formula: "Faturamento / Custo Direto",
      interpretacao: "Cada R$1 de CD gera R$1,23 de faturamento",
      status: "ok" as const,
    },
    crco: {
      // CR/CO - Custo Real sobre Custo Orcado
      valor: 0.97,
      meta: 1.0,
      formula: "Custo Real / Custo Orcado",
      interpretacao: "Gastando 3% menos que o orcado",
      status: "ok" as const,
    },
    cicd: {
      // CI/CD - Custo Indireto sobre Custo Direto
      valor: 0.127,
      meta: 0.15,
      formula: "Custo Indireto / Custo Direto",
      interpretacao: "Estrutura de gestao eficiente",
      status: "ok" as const,
    },
    mo: {
      // MO - Margem Operacional
      valor: 8.7,
      meta: 9.0,
      formula: "(Fat - Imp - CD - CI - DAG) / Fat",
      interpretacao: "Margem operacional de 8,7%",
      status: "atencao" as const,
    },
  },

  // Composicao de custos
  composicaoCustoDireto: {
    maoDeObra: { valor: 59200000, percentual: 41.5 },
    materiais: { valor: 49800000, percentual: 34.9 },
    equipamentos: { valor: 26100000, percentual: 18.3 },
    subempreiteiros: { valor: 7460000, percentual: 5.3 },
  },
  composicaoCustoIndireto: {
    administracao: { valor: 7248000, percentual: 40.0 },
    canteiro: { valor: 5436000, percentual: 30.0 },
    suporte: { valor: 3624000, percentual: 20.0 },
    seguros: { valor: 1812000, percentual: 10.0 },
  },

  // Resultado
  resultado: {
    receitaLiquida: 167200000, // Fat - Impostos
    margemBruta: 24640000, // Rec Liq - CD
    lucroOperacional: 2320000, // Margem - CI - DAG
  },

  // Performance fisica
  performance: {
    spi: 0.95,
    cpi: 1.02,
  },

  // Qualidade, SSMA, Juridico (resumidos)
  qualidade: { taxaConformidade: 93.5, ncsAbertas: 7 },
  ssma: { diasSemAcidente: 127, taxaFrequencia: 0.8 },
  juridico: { processosAtivos: 2, riscoEstimado: 850000 },
}

// Alertas consolidados
const alertasCliente = [
  { id: 1, tipo: "atencao", titulo: "Medicao #23 pendente aprovacao", valor: "R$ 2.1 Mi", dias: 5 },
  { id: 2, tipo: "critico", titulo: "Glosa contestada", valor: "R$ 320 mil", dias: 12 },
  { id: 3, tipo: "info", titulo: "Aditivo #4 em analise", valor: "R$ 1.8 Mi", dias: 8 },
]

const alertasInternos = [
  { id: 1, tipo: "atencao", titulo: "MO abaixo da meta (8.7% vs 9.0%)", valor: "-0.3%", dias: 0 },
  { id: 2, tipo: "critico", titulo: "SPI abaixo de 1.0", valor: "0.95", dias: 7 },
  { id: 3, tipo: "info", titulo: "F/CD acima da meta", valor: "1.23", dias: 0 },
  { id: 4, tipo: "info", titulo: "127 dias sem acidentes", valor: "SSMA", dias: 0 },
]

// ============================================================================
// FUNCOES UTILITARIAS
// ============================================================================

function formatarMoeda(valor: number): string {
  if (Math.abs(valor) >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  }
  if (Math.abs(valor) >= 1000) {
    return `R$ ${(valor / 1000).toFixed(0)} mil`
  }
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

// ============================================================================
// COMPONENTE: CARD FINANCEIRO HIBRIDO
// ============================================================================

interface CardFinanceiroProps {
  titulo: string
  valor: number
  percentual: number
  previstoPercentual: number
  icone: React.ReactNode
  subtitulo?: string
  onClick?: () => void
}

function CardFinanceiroHibrido({
  titulo,
  valor,
  percentual,
  previstoPercentual,
  icone,
  subtitulo,
  onClick,
}: CardFinanceiroProps) {
  const desvio = percentual - previstoPercentual
  const maxPercentual = Math.max(percentual, previstoPercentual, 100)

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
        <div
          className={`flex items-center gap-0.5 text-[10px] font-semibold ${desvio >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
        >
          {desvio >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {desvio > 0 ? "+" : ""}
          {desvio.toFixed(1)}%
        </div>
      </div>

      <div className="mb-2">
        <span className="text-xl font-bold tabular-nums text-foreground">{formatarMoeda(valor)}</span>
        {subtitulo && <span className="text-[10px] text-muted-foreground ml-1.5">{subtitulo}</span>}
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground w-14">Previsto</span>
          <div className="flex-1 h-2 bg-muted/30 rounded overflow-hidden">
            <div
              className="h-full bg-muted-foreground/40 rounded"
              style={{ width: `${(previstoPercentual / maxPercentual) * 100}%` }}
            />
          </div>
          <span className="text-[9px] tabular-nums text-muted-foreground w-10 text-right">{previstoPercentual}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground w-14">Realizado</span>
          <div className="flex-1 h-2 bg-muted/30 rounded overflow-hidden">
            <div
              className={`h-full rounded ${percentual >= previstoPercentual ? "bg-primary" : "bg-destructive/70"}`}
              style={{ width: `${(percentual / maxPercentual) * 100}%` }}
            />
          </div>
          <span className="text-[9px] tabular-nums font-medium text-foreground w-10 text-right">{percentual}%</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// ============================================================================

interface CardKpiGnesisProps {
  codigo: string
  nome: string
  valor: number
  meta: number
  formula: string
  interpretacao: string
  status: "ok" | "atencao" | "critico"
  unidade?: string
  invertido?: boolean
  onClick?: () => void
}

function CardKpiGnesis({
  codigo,
  nome,
  valor,
  meta,
  formula,
  interpretacao,
  status,
  unidade = "",
  invertido = false,
  onClick,
}: CardKpiGnesisProps) {
  const desvio = invertido ? meta - valor : valor - meta
  const percentualMeta = invertido ? (meta / valor) * 100 : (valor / meta) * 100

  return (
    <div
      className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[9px] h-5 px-1.5 font-mono">
            {codigo}
          </Badge>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{nome}</span>
        </div>
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            status === "ok" ? "bg-emerald-500" : status === "atencao" ? "bg-amber-500" : "bg-destructive"
          }`}
        />
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold tabular-nums text-foreground">
          {valor.toFixed(unidade === "%" ? 1 : 2)}
          {unidade}
        </span>
        <span className="text-[11px] text-muted-foreground">
          meta: {meta.toFixed(unidade === "%" ? 1 : 2)}
          {unidade}
        </span>
        <span
          className={`text-[10px] font-semibold ${
            (invertido ? desvio <= 0 : desvio >= 0) ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
          }`}
        >
          {desvio >= 0 ? "+" : ""}
          {desvio.toFixed(2)}
        </span>
      </div>

      <Progress value={Math.min(percentualMeta, 120)} className="h-1.5 mb-2" />

      <div className="space-y-1">
        <p className="text-[9px] text-muted-foreground font-mono">{formula}</p>
        <p className="text-[10px] text-foreground">{interpretacao}</p>
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENTE: CARD KPI SIMPLES
// ============================================================================

interface CardKpiProps {
  titulo: string
  valor: number | string
  meta?: number | string
  unidade?: string
  icone: React.ReactNode
  status: "ok" | "atencao" | "critico"
  onClick?: () => void
}

function CardKpiSimples({ titulo, valor, meta, unidade = "", icone, status, onClick }: CardKpiProps) {
  const numValor = typeof valor === "number" ? valor : Number.parseFloat(valor)
  const numMeta = typeof meta === "number" ? meta : meta ? Number.parseFloat(meta) : numValor
  const percentualMeta = (numValor / numMeta) * 100

  return (
    <div
      className="p-2.5 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <div className="text-muted-foreground">{icone}</div>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{titulo}</span>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${status === "ok" ? "bg-emerald-500" : status === "atencao" ? "bg-amber-500" : "bg-destructive"}`}
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

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

function CockpitContent() {
  const router = useRouter()
  const [painelAberto, setPainelAberto] = useState(false)
  const [painelTipo, setPainelTipo] = useState<"receita" | "kpi" | "alerta" | null>(null)
  const [itemSelecionado, setItemSelecionado] = useState<any>(null)

  const abrirPainel = (tipo: "receita" | "kpi" | "alerta", item?: any) => {
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
                  title="GC-01 - Cockpit de Governanca"
                  description="Painel executivo com visao integrada: Gestao do Contrato com Cliente e Gerenciamento Interno da Obra."
                />
                <Badge variant="outline" className="text-[9px] h-5 border-primary/50 text-primary bg-primary/10">
                  GERAL
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
                className="h-7 px-3 text-xs bg-muted/50 border border-primary/30"
                disabled
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
                className="h-7 px-3 text-xs hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-performance")}
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
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs gap-1 border-violet-500/50 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950 bg-transparent"
              onClick={() => router.push("/obra/gerencial/cockpit/prism-demo")}
              title="Analise Prismatica (Demo)"
            >
              <Shield className="w-3 h-3" />
              Prisma
            </Button>
            <Badge variant="outline" className="text-[10px] h-6 px-2">
              Janeiro 2025
            </Badge>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" title="Gerar Relatorio">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 1: GESTAO DO CONTRATO COM CLIENTE                            */}
        {/* ================================================================== */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Gestao do Contrato com Cliente
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Cards Financeiros Hibridos - Receita */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <CardFinanceiroHibrido
              titulo="Receita Contratada"
              valor={gestaoCliente.receita.contratada}
              percentual={100}
              previstoPercentual={100}
              icone={<DollarSign className="w-4 h-4" />}
              subtitulo="valor atual"
              onClick={() => abrirPainel("receita")}
            />
            <CardFinanceiroHibrido
              titulo="Receita Medida"
              valor={gestaoCliente.receita.medidaAcumulada}
              percentual={gestaoCliente.receita.percentualMedido}
              previstoPercentual={gestaoCliente.receita.previsto}
              icone={<FileCheck className="w-4 h-4" />}
              subtitulo="acumulado"
              onClick={() => abrirPainel("receita")}
            />
            <CardFinanceiroHibrido
              titulo="A Faturar"
              valor={gestaoCliente.receita.aFaturar}
              percentual={(gestaoCliente.receita.aFaturar / gestaoCliente.receita.medidaAcumulada) * 100}
              previstoPercentual={5}
              icone={<Receipt className="w-4 h-4" />}
              subtitulo="medido nao faturado"
              onClick={() => abrirPainel("receita")}
            />
            <CardFinanceiroHibrido
              titulo="A Receber"
              valor={gestaoCliente.receita.aReceber}
              percentual={(gestaoCliente.receita.aReceber / gestaoCliente.receita.medidaAcumulada) * 100}
              previstoPercentual={10}
              icone={<Clock className="w-4 h-4" />}
              subtitulo="faturado nao pago"
              onClick={() => abrirPainel("receita")}
            />
          </div>

          {/* Cronograma + Change Control + Alertas Cliente */}
          <div className="grid grid-cols-12 gap-2">
            {/* Cronograma Contratual */}
            <div className="col-span-6 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Cronograma Contratual</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
                  <span>
                    Inicio: <strong className="text-foreground">{gestaoCliente.cronograma.dataInicio}</strong>
                  </span>
                  <span>
                    Termino: <strong className="text-foreground">{gestaoCliente.cronograma.dataTermino}</strong>
                  </span>
                </div>
              </div>

              <div className="relative h-5 bg-muted/30 rounded overflow-hidden mb-1.5">
                <div
                  className="absolute top-0 left-0 h-2.5 bg-muted-foreground/40"
                  style={{ width: `${gestaoCliente.cronograma.percentualPrevisto}%` }}
                />
                <div
                  className="absolute top-2.5 left-0 h-2.5 bg-primary/70"
                  style={{ width: `${gestaoCliente.cronograma.percentualRealizado}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground"
                  style={{
                    left: `${(gestaoCliente.cronograma.diasDecorridos / gestaoCliente.cronograma.diasTotais) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-1.5 bg-muted-foreground/40 rounded-sm" />
                    Previsto: {gestaoCliente.cronograma.percentualPrevisto}%
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-1.5 bg-primary/70 rounded-sm" />
                    Realizado: {gestaoCliente.cronograma.percentualRealizado}%
                  </span>
                  <span
                    className={`font-semibold ${
                      gestaoCliente.cronograma.percentualRealizado >= gestaoCliente.cronograma.percentualPrevisto
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-destructive"
                    }`}
                  >
                    Desvio:{" "}
                    {(
                      gestaoCliente.cronograma.percentualRealizado - gestaoCliente.cronograma.percentualPrevisto
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {gestaoCliente.cronograma.diasDecorridos}/{gestaoCliente.cronograma.diasTotais} dias
                </span>
              </div>
            </div>

            {/* Change Control */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Change Control</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">SMEs Abertas</span>
                  <Badge variant="outline" className="h-5 text-[10px]">
                    {gestaoCliente.changeControl.smesAbertas}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Aditivos Pendentes</span>
                  <Badge variant="outline" className="h-5 text-[10px]">
                    {gestaoCliente.changeControl.aditivosPendentes}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Pleitos Ativos</span>
                  <Badge variant="outline" className="h-5 text-[10px]">
                    {gestaoCliente.changeControl.pleitosAtivos}
                  </Badge>
                </div>
                <div className="pt-1.5 border-t border-border">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Em Negociacao</span>
                    <span className="font-semibold text-foreground">
                      {formatarMoeda(gestaoCliente.changeControl.valorEmNegociacao)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas Cliente */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Cliente</span>
              </div>
              <ScrollArea className="h-[80px]">
                <div className="space-y-1.5">
                  {alertasCliente.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="flex items-center gap-2 p-1.5 rounded bg-muted/30 cursor-pointer hover:bg-muted/50"
                      onClick={() => abrirPainel("alerta", alerta)}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-amber-500"
                              : "bg-primary"
                        }`}
                      />
                      <span className="text-[10px] flex-1 truncate">{alerta.titulo}</span>
                      <span className="text-[9px] text-muted-foreground">{alerta.valor}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 2: GERENCIAMENTO INTERNO DA OBRA - KPIs GNESIS               */}
        {/* ================================================================== */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <HardHat className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Gerenciamento Interno da Obra
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            <CardKpiGnesis
              codigo="F/CD"
              nome="Faturamento / Custo Direto"
              valor={gerenciamentoInterno.kpis.fcd.valor}
              meta={gerenciamentoInterno.kpis.fcd.meta}
              formula={gerenciamentoInterno.kpis.fcd.formula}
              interpretacao={gerenciamentoInterno.kpis.fcd.interpretacao}
              status={gerenciamentoInterno.kpis.fcd.status}
              onClick={() => abrirPainel("kpi", gerenciamentoInterno.kpis.fcd)}
            />
            <CardKpiGnesis
              codigo="CR/CO"
              nome="Custo Real / Custo Orcado"
              valor={gerenciamentoInterno.kpis.crco.valor}
              meta={gerenciamentoInterno.kpis.crco.meta}
              formula={gerenciamentoInterno.kpis.crco.formula}
              interpretacao={gerenciamentoInterno.kpis.crco.interpretacao}
              status={gerenciamentoInterno.kpis.crco.status}
              invertido
              onClick={() => abrirPainel("kpi", gerenciamentoInterno.kpis.crco)}
            />
            <CardKpiGnesis
              codigo="CI/CD"
              nome="Custo Indireto / Custo Direto"
              valor={gerenciamentoInterno.kpis.cicd.valor}
              meta={gerenciamentoInterno.kpis.cicd.meta}
              formula={gerenciamentoInterno.kpis.cicd.formula}
              interpretacao={gerenciamentoInterno.kpis.cicd.interpretacao}
              status={gerenciamentoInterno.kpis.cicd.status}
              invertido
              onClick={() => abrirPainel("kpi", gerenciamentoInterno.kpis.cicd)}
            />
            <CardKpiGnesis
              codigo="MO"
              nome="Margem Operacional"
              valor={gerenciamentoInterno.kpis.mo.valor}
              meta={gerenciamentoInterno.kpis.mo.meta}
              formula={gerenciamentoInterno.kpis.mo.formula}
              interpretacao={gerenciamentoInterno.kpis.mo.interpretacao}
              status={gerenciamentoInterno.kpis.mo.status}
              unidade="%"
              onClick={() => abrirPainel("kpi", gerenciamentoInterno.kpis.mo)}
            />
          </div>

          {/* Indicadores Complementares + Alertas */}
          <div className="grid grid-cols-12 gap-2">
            {/* Performance Fisica */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Performance Fisica</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CardKpiSimples
                  titulo="SPI"
                  valor={gerenciamentoInterno.performance.spi}
                  meta={1.0}
                  icone={<TrendingUp className="w-3.5 h-3.5" />}
                  status={gerenciamentoInterno.performance.spi >= 1.0 ? "ok" : "atencao"}
                />
                <CardKpiSimples
                  titulo="CPI"
                  valor={gerenciamentoInterno.performance.cpi}
                  meta={1.0}
                  icone={<Target className="w-3.5 h-3.5" />}
                  status={gerenciamentoInterno.performance.cpi >= 1.0 ? "ok" : "atencao"}
                />
              </div>
            </div>

            {/* Qualidade / SSMA / Juridico */}
            <div className="col-span-6 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Garantidores</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase">Qualidade</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gerenciamentoInterno.qualidade.taxaConformidade}%</span>
                    <Badge variant="outline" className="text-[9px] h-4">
                      {gerenciamentoInterno.qualidade.ncsAbertas} NCs
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase">SSMA</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gerenciamentoInterno.ssma.diasSemAcidente}</span>
                    <span className="text-[10px] text-muted-foreground">dias s/ acidente</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase">Juridico</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gerenciamentoInterno.juridico.processosAtivos}</span>
                    <span className="text-[10px] text-muted-foreground">processos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas Internos */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Internos</span>
              </div>
              <ScrollArea className="h-[80px]">
                <div className="space-y-1.5">
                  {alertasInternos.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="flex items-center gap-2 p-1.5 rounded bg-muted/30 cursor-pointer hover:bg-muted/50"
                      onClick={() => abrirPainel("alerta", alerta)}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      <span className="text-[10px] flex-1 truncate">{alerta.titulo}</span>
                      <span className="text-[9px] text-muted-foreground">{alerta.valor}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* PAINEL LATERAL */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[400px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle>
                {painelTipo === "receita" && "Detalhes da Receita"}
                {painelTipo === "kpi" && `KPI: ${itemSelecionado?.codigo || "Detalhe"}`}
                {painelTipo === "alerta" && "Detalhes do Alerta"}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              {painelTipo === "kpi" && itemSelecionado && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <h4 className="text-sm font-semibold mb-2">{itemSelecionado.nome || itemSelecionado.codigo}</h4>
                    <p className="text-2xl font-bold mb-2">
                      {itemSelecionado.valor?.toFixed(2)}
                      <span className="text-sm text-muted-foreground ml-2">
                        meta: {itemSelecionado.meta?.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{itemSelecionado.formula}</p>
                    <p className="text-sm">{itemSelecionado.interpretacao}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-3">Historico (6 meses)</h4>
                    <div className="flex items-end justify-between gap-2 h-24">
                      {[1.18, 1.2, 1.19, 1.22, 1.21, 1.23].map((v, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full bg-primary rounded-t" style={{ height: `${(v / 1.3) * 100}%` }} />
                          <span className="text-[9px] text-muted-foreground">
                            {["Ago", "Set", "Out", "Nov", "Dez", "Jan"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-2">Acao Gerencial</h4>
                    <p className="text-sm text-muted-foreground">
                      {itemSelecionado.status === "ok"
                        ? "Indicador dentro da meta. Manter monitoramento."
                        : "Indicador requer atencao. Avaliar acoes corretivas."}
                    </p>
                  </div>
                </div>
              )}

              {painelTipo === "alerta" && itemSelecionado && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      itemSelecionado.tipo === "critico"
                        ? "border-destructive bg-destructive/10"
                        : itemSelecionado.tipo === "atencao"
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-primary bg-primary/10"
                    }`}
                  >
                    <h4 className="text-sm font-semibold mb-2">{itemSelecionado.titulo}</h4>
                    <p className="text-lg font-bold">{itemSelecionado.valor}</p>
                    {itemSelecionado.dias > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">Ha {itemSelecionado.dias} dias</p>
                    )}
                  </div>
                </div>
              )}

              {painelTipo === "receita" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <h4 className="text-sm font-semibold mb-3">Composicao da Receita</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Receita Contratada</span>
                        <span className="font-semibold">{formatarMoeda(gestaoCliente.receita.contratada)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medido Acumulado</span>
                        <span className="font-semibold">{formatarMoeda(gestaoCliente.receita.medidaAcumulada)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Saldo a Medir</span>
                        <span className="font-semibold">{formatarMoeda(gestaoCliente.receita.saldo)}</span>
                      </div>
                    </div>
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

export default function CockpitGovernanca() {
  const router = useRouter()
  const [painelAberto, setPainelAberto] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<string | null>(null)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null)

  const dreItens = [
    {
      codigo: "FAT",
      nome: "FATURAMENTO",
      valor: 176000000,
      previsto: 180000000,
      icone: DollarSign,
      cor: "#10b981",
      tipo: "receita" as const,
    },
    {
      codigo: "CD",
      nome: "CUSTO DIRETO",
      valor: 142600000,
      previsto: 145000000,
      icone: Calculator,
      cor: "#f59e0b",
      tipo: "custo" as const,
    },
    {
      codigo: "CI",
      nome: "CUSTO INDIRETO",
      valor: 18100000,
      previsto: 19000000,
      icone: Landmark,
      cor: "#8b5cf6",
      tipo: "custo" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header com navegacao */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip content="Visao consolidada dos indicadores de governanca da obra" />
                <Badge variant="outline" className="ml-2">
                  GERAL
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-muted rounded-lg p-1">
              <Button variant="default" size="sm" className="rounded-md">
                Geral
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-contrato")}
              >
                Contrato
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-performance")}
              >
                Performance
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-financeiro")}
              >
                Financeiro
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs gap-1 border-violet-500/50 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950 bg-transparent"
              onClick={() => router.push("/obra/gerencial/cockpit/prism-demo")}
              title="Analise Prismatica (Demo)"
            >
              <Shield className="w-3 h-3" />
              Prisma
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Janeiro 2025
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* BLOCO 1: GESTAO DO CONTRATO COM CLIENTE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">GESTAO DO CONTRATO COM CLIENTE</h2>
          </div>

          {/* Cards Financeiros Hibridos - Receita */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <CardFinanceiroHibrido
              titulo="Receita Contratada"
              valor={gestaoCliente.receita.contratada}
              percentual={100}
              previstoPercentual={100}
              icone={<DollarSign className="w-4 h-4" />}
              subtitulo="valor atual"
            />
            <CardFinanceiroHibrido
              titulo="Receita Medida"
              valor={gestaoCliente.receita.medidaAcumulada}
              percentual={gestaoCliente.receita.percentualMedido}
              previstoPercentual={gestaoCliente.receita.previsto}
              icone={<FileCheck className="w-4 h-4" />}
              subtitulo="acumulado"
            />
            <CardFinanceiroHibrido
              titulo="A Faturar"
              valor={gestaoCliente.receita.aFaturar}
              percentual={(gestaoCliente.receita.aFaturar / gestaoCliente.receita.medidaAcumulada) * 100}
              previstoPercentual={5}
              icone={<Receipt className="w-4 h-4" />}
              subtitulo="medido nao faturado"
            />
            <CardFinanceiroHibrido
              titulo="A Receber"
              valor={gestaoCliente.receita.aReceber}
              percentual={(gestaoCliente.receita.aReceber / gestaoCliente.receita.medidaAcumulada) * 100}
              previstoPercentual={10}
              icone={<Clock className="w-4 h-4" />}
              subtitulo="faturado nao pago"
            />
          </div>

          {/* Cronograma + Change Control + Alertas Cliente */}
          <div className="grid grid-cols-12 gap-2">
            {/* Cronograma Contratual */}
            <div className="col-span-6 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Cronograma Contratual</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
                  <span>
                    Inicio: <strong className="text-foreground">{gestaoCliente.cronograma.dataInicio}</strong>
                  </span>
                  <span>
                    Termino: <strong className="text-foreground">{gestaoCliente.cronograma.dataTermino}</strong>
                  </span>
                </div>
              </div>

              <div className="relative h-5 bg-muted/30 rounded overflow-hidden mb-1.5">
                <div
                  className="absolute top-0 left-0 h-2.5 bg-muted-foreground/40"
                  style={{ width: `${gestaoCliente.cronograma.percentualPrevisto}%` }}
                />
                <div
                  className="absolute top-2.5 left-0 h-2.5 bg-primary/70"
                  style={{ width: `${gestaoCliente.cronograma.percentualRealizado}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground"
                  style={{
                    left: `${(gestaoCliente.cronograma.diasDecorridos / gestaoCliente.cronograma.diasTotais) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-1.5 bg-muted-foreground/40 rounded-sm" />
                    Previsto: {gestaoCliente.cronograma.percentualPrevisto}%
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-1.5 bg-primary/70 rounded-sm" />
                    Realizado: {gestaoCliente.cronograma.percentualRealizado}%
                  </span>
                  <span
                    className={`font-semibold ${
                      gestaoCliente.cronograma.percentualRealizado >= gestaoCliente.cronograma.percentualPrevisto
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-destructive"
                    }`}
                  >
                    Desvio:{" "}
                    {(
                      gestaoCliente.cronograma.percentualRealizado - gestaoCliente.cronograma.percentualPrevisto
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {gestaoCliente.cronograma.diasDecorridos}/{gestaoCliente.cronograma.diasTotais} dias
                </span>
              </div>
            </div>

            {/* Change Control */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Change Control</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">SMEs Abertas</span>
                  <Badge variant="outline" className="h-5 text-[10px]">
                    {gestaoCliente.changeControl.smesAbertas}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Aditivos Pendentes</span>
                  <Badge variant="outline" className="h-5 text-[10px]">
                    {gestaoCliente.changeControl.aditivosPendentes}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Pleitos Ativos</span>
                  <Badge variant="outline" className="h-5 text-[10px]">
                    {gestaoCliente.changeControl.pleitosAtivos}
                  </Badge>
                </div>
                <div className="pt-1.5 border-t border-border">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Em Negociacao</span>
                    <span className="font-semibold text-foreground">
                      {formatarMoeda(gestaoCliente.changeControl.valorEmNegociacao)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas Cliente */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Cliente</span>
              </div>
              <ScrollArea className="h-[80px]">
                <div className="space-y-1.5">
                  {alertasCliente.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="flex items-center gap-2 p-1.5 rounded bg-muted/30 cursor-pointer hover:bg-muted/50"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-amber-500"
                              : "bg-primary"
                        }`}
                      />
                      <span className="text-[10px] flex-1 truncate">{alerta.titulo}</span>
                      <span className="text-[9px] text-muted-foreground">{alerta.valor}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 2: GERENCIAMENTO INTERNO DA OBRA - KPIs GNESIS               */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">GERENCIAMENTO INTERNO DA OBRA</h2>
          </div>

          <DRECard titulo="RESULTADO ECONOMICO (DRE)" itens={dreItens} />

          {/* Indicadores Complementares + Alertas */}
          <div className="grid grid-cols-12 gap-2">
            {/* Performance Fisica */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Performance Fisica</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CardKpiSimples
                  titulo="SPI"
                  valor={gerenciamentoInterno.performance.spi}
                  meta={1.0}
                  icone={<TrendingUp className="w-3.5 h-3.5" />}
                  status={gerenciamentoInterno.performance.spi >= 1.0 ? "ok" : "atencao"}
                />
                <CardKpiSimples
                  titulo="CPI"
                  valor={gerenciamentoInterno.performance.cpi}
                  meta={1.0}
                  icone={<Target className="w-3.5 h-3.5" />}
                  status={gerenciamentoInterno.performance.cpi >= 1.0 ? "ok" : "atencao"}
                />
              </div>
            </div>

            {/* Qualidade / SSMA / Juridico */}
            <div className="col-span-6 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Garantidores</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase">Qualidade</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gerenciamentoInterno.qualidade.taxaConformidade}%</span>
                    <Badge variant="outline" className="text-[9px] h-4">
                      {gerenciamentoInterno.qualidade.ncsAbertas} NCs
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase">SSMA</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gerenciamentoInterno.ssma.diasSemAcidente}</span>
                    <span className="text-[10px] text-muted-foreground">dias s/ acidente</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase">Juridico</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gerenciamentoInterno.juridico.processosAtivos}</span>
                    <span className="text-[10px] text-muted-foreground">processos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas Internos */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Internos</span>
              </div>
              <ScrollArea className="h-[80px]">
                <div className="space-y-1.5">
                  {alertasInternos.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="flex items-center gap-2 p-1.5 rounded bg-muted/30 cursor-pointer hover:bg-muted/50"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      <span className="text-[10px] flex-1 truncate">{alerta.titulo}</span>
                      <span className="text-[9px] text-muted-foreground">{alerta.valor}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
