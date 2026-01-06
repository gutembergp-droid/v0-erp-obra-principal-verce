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
  Clock,
  DollarSign,
  Calendar,
  FileText,
  ArrowUp,
  ArrowDown,
  HardHat,
  TrendingUp,
  Target,
  BarChart3,
  Briefcase,
  FileCheck,
  Scale,
  ShieldAlert,
  Activity,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Gavel,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

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

// BLOCO 2: GERENCIAMENTO INTERNO DA OBRA
const gerenciamentoInterno = {
  custo: {
    orcado: 231917000,
    realizado: 160680000,
    percentualRealizado: 69.3,
    previsto: 72.0,
    saldo: 71237000,
    desvio: -2.7,
  },
  resultado: {
    receitaLiquida: 176000000,
    custoTotal: 160680000,
    margemBruta: 15320000,
    margemPercentual: 8.7,
    metaMargem: 9.0,
    dag: 4200000,
    lucroOperacional: 11120000,
  },
  performance: {
    spi: 0.95,
    cpi: 1.02,
    produtividade: 94.2,
    eficiencia: 97.8,
  },
  qualidade: {
    inspecoesRealizadas: 234,
    inspecoesPendentes: 18,
    ncsAbertas: 7,
    ncsFechadas: 45,
    taxaConformidade: 93.5,
  },
  ssma: {
    diasSemAcidente: 127,
    incidentesMes: 2,
    quaseAcidentes: 5,
    taxaFrequencia: 0.8,
  },
  juridico: {
    processosAtivos: 2,
    notificacoesPendentes: 1,
    riscoEstimado: 850000,
  },
}

// Alertas consolidados
const alertasCliente = [
  { id: 1, tipo: "atencao", titulo: "Medicao #23 pendente aprovacao", valor: "R$ 2.1 Mi", dias: 5 },
  { id: 2, tipo: "critico", titulo: "Glosa contestada", valor: "R$ 320 mil", dias: 12 },
  { id: 3, tipo: "info", titulo: "Aditivo #4 em analise", valor: "R$ 1.8 Mi", dias: 8 },
]

const alertasInternos = [
  { id: 1, tipo: "critico", titulo: "Desvio de custo Frente 3", valor: "+12%", dias: 3 },
  { id: 2, tipo: "atencao", titulo: "7 NCs abertas", valor: "Qualidade", dias: 15 },
  { id: 3, tipo: "info", titulo: "127 dias sem acidentes", valor: "SSMA", dias: 0 },
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
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icone}</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{titulo}</span>
        </div>
        <div
          className={`flex items-center gap-0.5 text-[10px] font-semibold ${desvio >= 0 ? "text-primary" : "text-destructive"}`}
        >
          {desvio >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {desvio > 0 ? "+" : ""}
          {desvio.toFixed(1)}%
        </div>
      </div>

      {/* Valor Principal */}
      <div className="mb-2">
        <span className="text-xl font-bold tabular-nums text-foreground">{formatarMoeda(valor)}</span>
        {subtitulo && <span className="text-[10px] text-muted-foreground ml-1.5">{subtitulo}</span>}
      </div>

      {/* Grafico Barras Horizontal: Previsto x Realizado */}
      <div className="space-y-1">
        {/* Barra Previsto */}
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
        {/* Barra Realizado */}
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
// COMPONENTE: CARD KPI HIBRIDO (para indicadores)
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

function CardKpiHibrido({ titulo, valor, meta, unidade = "", icone, status, onClick }: CardKpiProps) {
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
          className={`w-2 h-2 rounded-full ${status === "ok" ? "bg-primary" : status === "atencao" ? "bg-amber-500" : "bg-destructive"}`}
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
  const [painelTipo, setPainelTipo] = useState<"receita" | "custo" | "alerta" | null>(null)
  const [alertaSelecionado, setAlertaSelecionado] = useState<(typeof alertasCliente)[0] | null>(null)

  const abrirPainel = (tipo: "receita" | "custo" | "alerta", alerta?: (typeof alertasCliente)[0]) => {
    setPainelTipo(tipo)
    setAlertaSelecionado(alerta || null)
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
                <Badge variant="outline" className="text-[9px] h-5 border-border text-muted-foreground">
                  GC-01
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

              {/* Barra de Progresso Dupla */}
              <div className="relative h-5 bg-muted/30 rounded overflow-hidden mb-1.5">
                <div
                  className="absolute top-0 left-0 h-2.5 bg-muted-foreground/40"
                  style={{ width: `${gestaoCliente.cronograma.percentualPrevisto}%` }}
                />
                <div
                  className="absolute top-2.5 left-0 h-2.5 bg-primary/70"
                  style={{ width: `${gestaoCliente.cronograma.percentualRealizado}%` }}
                />
                {/* Linha do Hoje */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground"
                  style={{
                    left: `${(gestaoCliente.cronograma.diasDecorridos / gestaoCliente.cronograma.diasTotais) * 100}%`,
                  }}
                />
              </div>

              {/* Legenda */}
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
                        ? "text-primary"
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
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Cliente</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {alertasCliente.map((alerta) => (
                  <div
                    key={alerta.id}
                    className="flex items-center justify-between p-1.5 rounded bg-muted/30 hover:bg-muted/50 cursor-pointer"
                    onClick={() => abrirPainel("alerta", alerta)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-amber-500"
                              : "bg-primary"
                        }`}
                      />
                      <span className="text-[10px] truncate max-w-[120px]">{alerta.titulo}</span>
                    </div>
                    <span className="text-[9px] font-semibold text-muted-foreground">{alerta.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO 2: GERENCIAMENTO INTERNO DA OBRA                             */}
        {/* ================================================================== */}
        <div className="flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <HardHat className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Gerenciamento Interno da Obra
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Cards Financeiros Hibridos - Custo */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <CardFinanceiroHibrido
              titulo="Custo Orcado"
              valor={gerenciamentoInterno.custo.orcado}
              percentual={100}
              previstoPercentual={100}
              icone={<Target className="w-4 h-4" />}
              subtitulo="meta"
              onClick={() => abrirPainel("custo")}
            />
            <CardFinanceiroHibrido
              titulo="Custo Realizado"
              valor={gerenciamentoInterno.custo.realizado}
              percentual={gerenciamentoInterno.custo.percentualRealizado}
              previstoPercentual={gerenciamentoInterno.custo.previsto}
              icone={<DollarSign className="w-4 h-4" />}
              subtitulo="acumulado"
              onClick={() => abrirPainel("custo")}
            />
            <CardFinanceiroHibrido
              titulo="Margem Bruta"
              valor={gerenciamentoInterno.resultado.margemBruta}
              percentual={gerenciamentoInterno.resultado.margemPercentual}
              previstoPercentual={gerenciamentoInterno.resultado.metaMargem}
              icone={<TrendingUp className="w-4 h-4" />}
              subtitulo={`${gerenciamentoInterno.resultado.margemPercentual}%`}
              onClick={() => abrirPainel("custo")}
            />
            <CardFinanceiroHibrido
              titulo="Lucro Operacional"
              valor={gerenciamentoInterno.resultado.lucroOperacional}
              percentual={
                (gerenciamentoInterno.resultado.lucroOperacional / gerenciamentoInterno.resultado.receitaLiquida) * 100
              }
              previstoPercentual={6.5}
              icone={<BarChart3 className="w-4 h-4" />}
              subtitulo="apos DAG"
              onClick={() => abrirPainel("custo")}
            />
          </div>

          {/* Performance + Qualidade + SSMA + Juridico + Alertas */}
          <div className="grid grid-cols-12 gap-2">
            {/* Performance */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Performance</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <CardKpiHibrido
                  titulo="SPI"
                  valor={gerenciamentoInterno.performance.spi}
                  meta={1.0}
                  icone={<Clock className="w-3 h-3" />}
                  status={gerenciamentoInterno.performance.spi >= 0.95 ? "ok" : "atencao"}
                />
                <CardKpiHibrido
                  titulo="CPI"
                  valor={gerenciamentoInterno.performance.cpi}
                  meta={1.0}
                  icone={<DollarSign className="w-3 h-3" />}
                  status={gerenciamentoInterno.performance.cpi >= 1.0 ? "ok" : "atencao"}
                />
                <CardKpiHibrido
                  titulo="Produt."
                  valor={gerenciamentoInterno.performance.produtividade}
                  meta={100}
                  unidade="%"
                  icone={<TrendingUp className="w-3 h-3" />}
                  status={gerenciamentoInterno.performance.produtividade >= 90 ? "ok" : "atencao"}
                />
                <CardKpiHibrido
                  titulo="Eficiencia"
                  valor={gerenciamentoInterno.performance.eficiencia}
                  meta={100}
                  unidade="%"
                  icone={<Target className="w-3 h-3" />}
                  status={gerenciamentoInterno.performance.eficiencia >= 95 ? "ok" : "atencao"}
                />
              </div>
            </div>

            {/* Qualidade */}
            <div className="col-span-2 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Qualidade</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Inspecoes</span>
                  <span className="font-medium">
                    {gerenciamentoInterno.qualidade.inspecoesRealizadas}/
                    {gerenciamentoInterno.qualidade.inspecoesRealizadas +
                      gerenciamentoInterno.qualidade.inspecoesPendentes}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">NCs Abertas</span>
                  <Badge
                    variant={gerenciamentoInterno.qualidade.ncsAbertas > 5 ? "destructive" : "outline"}
                    className="h-5 text-[10px]"
                  >
                    {gerenciamentoInterno.qualidade.ncsAbertas}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Conformidade</span>
                  <span className="font-semibold text-primary">{gerenciamentoInterno.qualidade.taxaConformidade}%</span>
                </div>
              </div>
            </div>

            {/* SSMA */}
            <div className="col-span-2 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">SSMA</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Dias s/ Acidente</span>
                  <span className="font-bold text-primary">{gerenciamentoInterno.ssma.diasSemAcidente}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Incidentes Mes</span>
                  <Badge
                    variant={gerenciamentoInterno.ssma.incidentesMes > 0 ? "outline" : "default"}
                    className="h-5 text-[10px]"
                  >
                    {gerenciamentoInterno.ssma.incidentesMes}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Taxa Freq.</span>
                  <span className="font-medium">{gerenciamentoInterno.ssma.taxaFrequencia}</span>
                </div>
              </div>
            </div>

            {/* Juridico */}
            <div className="col-span-2 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Gavel className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Juridico</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Processos</span>
                  <Badge
                    variant={gerenciamentoInterno.juridico.processosAtivos > 0 ? "outline" : "default"}
                    className="h-5 text-[10px]"
                  >
                    {gerenciamentoInterno.juridico.processosAtivos}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Notificacoes</span>
                  <Badge
                    variant={gerenciamentoInterno.juridico.notificacoesPendentes > 0 ? "destructive" : "outline"}
                    className="h-5 text-[10px]"
                  >
                    {gerenciamentoInterno.juridico.notificacoesPendentes}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Risco Est.</span>
                  <span className="font-medium text-destructive">
                    {formatarMoeda(gerenciamentoInterno.juridico.riscoEstimado)}
                  </span>
                </div>
              </div>
            </div>

            {/* Alertas Internos */}
            <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Internos</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {alertasInternos.map((alerta) => (
                  <div
                    key={alerta.id}
                    className="flex items-center justify-between p-1.5 rounded bg-muted/30 hover:bg-muted/50 cursor-pointer"
                    onClick={() => abrirPainel("alerta", alerta)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-amber-500"
                              : "bg-primary"
                        }`}
                      />
                      <span className="text-[10px] truncate max-w-[140px]">{alerta.titulo}</span>
                    </div>
                    <span className="text-[9px] font-semibold text-muted-foreground">{alerta.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL LATERAL */}
      <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
        <SheetContent className="w-[400px] sm:w-[450px] bg-background border-border">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base font-semibold">
                {painelTipo === "receita" && "Detalhe de Receita"}
                {painelTipo === "custo" && "Detalhe de Custo"}
                {painelTipo === "alerta" && "Detalhe do Alerta"}
              </SheetTitle>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-120px)] mt-4">
            {painelTipo === "receita" && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide">Composicao da Receita</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contrato Original</span>
                      <span className="font-medium">R$ 245.0 Mi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Aditivos (+)</span>
                      <span className="font-medium text-primary">R$ 12.5 Mi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Supressoes (-)</span>
                      <span className="font-medium text-destructive">R$ 3.2 Mi</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-semibold">Valor Atual</span>
                      <span className="font-bold">R$ 254.3 Mi</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide">Fluxo de Receita</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Medido Acumulado</span>
                      <span className="font-medium">R$ 176.0 Mi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Faturado</span>
                      <span className="font-medium">R$ 163.7 Mi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Recebido</span>
                      <span className="font-medium text-primary">R$ 140.2 Mi</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {painelTipo === "custo" && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide">DRE Resumido</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Receita Liquida</span>
                      <span className="font-medium">
                        {formatarMoeda(gerenciamentoInterno.resultado.receitaLiquida)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">(-) Custo Direto</span>
                      <span className="font-medium text-destructive">
                        {formatarMoeda(gerenciamentoInterno.custo.realizado)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-semibold">Margem Bruta</span>
                      <span className="font-bold text-primary">
                        {formatarMoeda(gerenciamentoInterno.resultado.margemBruta)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">(-) DAG</span>
                      <span className="font-medium">{formatarMoeda(gerenciamentoInterno.resultado.dag)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-semibold">Lucro Operacional</span>
                      <span className="font-bold">
                        {formatarMoeda(gerenciamentoInterno.resultado.lucroOperacional)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {painelTipo === "alerta" && alertaSelecionado && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alertaSelecionado.tipo === "critico"
                          ? "bg-destructive"
                          : alertaSelecionado.tipo === "atencao"
                            ? "bg-amber-500"
                            : "bg-primary"
                      }`}
                    />
                    <Badge
                      variant={
                        alertaSelecionado.tipo === "critico"
                          ? "destructive"
                          : alertaSelecionado.tipo === "atencao"
                            ? "outline"
                            : "default"
                      }
                    >
                      {alertaSelecionado.tipo.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold mb-2">{alertaSelecionado.titulo}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Valor/Impacto</span>
                    <span className="font-bold">{alertaSelecionado.valor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Dias em aberto</span>
                    <span className="font-medium">{alertaSelecionado.dias} dias</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Ver Detalhes
                  </Button>
                  <Button size="sm" className="flex-1">
                    Tomar Acao
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function CockpitGovernancaPage() {
  return (
    <Suspense fallback={null}>
      <CockpitContent />
    </Suspense>
  )
}
