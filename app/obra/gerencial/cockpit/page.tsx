"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Gauge,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  Target,
  ArrowUp,
  ArrowDown,
  Users,
  ShieldCheck,
  Building2,
  HardHat,
  ChevronRight,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

// ============================================================================
// DADOS MOCKADOS - GC-01 COCKPIT DE GOVERNANCA DO CONTRATO
// ============================================================================

const cronogramaContratual = {
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
}

const dadosPessoas = {
  efetivoTotal: 847,
  efetivoMesAnterior: 892,
  afastados: 12,
  horasExtras: 2340,
  turnover: 3.2,
}

const dadosQSMS = {
  fvsRealizadas: 234,
  fvsPendentes: 18,
  ncsAbertas: 7,
  ncsFechadas: 45,
  diasSemAcidente: 127,
}

const resultadoContrato = {
  valorOriginal: 245000000,
  aditivos: 12500000,
  supressoes: -3200000,
  valorAtual: 254300000,
}

const resultadoExecucao = {
  medicaoAcumulada: 176000000,
  custoTotal: 160680000,
  margemBruta: 15320000,
  margemPercentual: 8.7,
  fcd: 1.23,
  aReceber: 23500000,
}

const kpisContrato = [
  { id: "fisico", nome: "Avanco Fisico", valor: 67.4, meta: 70, unidade: "%", variacao: -2.6 },
  { id: "financeiro", nome: "Avanco Financeiro", valor: 72.1, meta: 70, unidade: "%", variacao: +2.1 },
  { id: "margem", nome: "Margem", valor: 8.7, meta: 9.0, unidade: "%", variacao: -0.3 },
  { id: "spi", nome: "SPI", valor: 0.95, meta: 1.0, unidade: "", variacao: -0.05 },
  { id: "cpi", nome: "CPI", valor: 1.02, meta: 1.0, unidade: "", variacao: +0.02 },
]

const alertas = [
  {
    id: 1,
    tipo: "critico",
    titulo: "Desvio de custo Frente 3",
    descricao: "Custo 12% acima do previsto",
    data: "04/01",
  },
  {
    id: 2,
    tipo: "atencao",
    titulo: "Medicao #23 pendente",
    descricao: "Aguardando aprovacao ha 5 dias",
    data: "03/01",
  },
  { id: 3, tipo: "info", titulo: "Meta 0.9 atingida", descricao: "Pacote #45 com economia", data: "02/01" },
]

const proximasAcoes = [
  { id: 1, acao: "Reuniao Alinhamento", responsavel: "GC", data: "06/01", status: "agendado" },
  { id: 2, acao: "Relatorio Executivo", responsavel: "CTRL", data: "08/01", status: "pendente" },
  { id: 3, acao: "Auditoria Qualidade", responsavel: "QSMS", data: "10/01", status: "agendado" },
]

// ============================================================================
// FUNCOES UTILITARIAS
// ============================================================================

function formatarMoeda(valor: number): string {
  if (Math.abs(valor) >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  }
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

function getStatusKpi(valor: number, meta: number): "ok" | "atencao" | "critico" {
  const percentual = (valor / meta) * 100
  if (percentual >= 98) return "ok"
  if (percentual >= 90) return "atencao"
  return "critico"
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function CockpitPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* ================================================================ */}
        {/* HEADER */}
        {/* ================================================================ */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
              <Gauge className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip
                  title="GC-01 - Cockpit de Governanca"
                  description="Painel executivo consolidado. Visao integrada de cronograma, resultado economico, pessoas e QSMS para tomada de decisao do Gerente de Contrato."
                />
                <Badge variant="outline" className="text-[9px] h-5 border-primary/30 text-primary">
                  GC-01
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" title="Gerar Relatorio">
              <FileText className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" title="Agendar Reuniao">
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* KPIS - FAIXA SUPERIOR */}
        {/* ================================================================ */}
        <div className="grid grid-cols-5 gap-2 mb-3 flex-shrink-0">
          {kpisContrato.map((kpi) => {
            const status = getStatusKpi(kpi.valor, kpi.meta)
            return (
              <div
                key={kpi.id}
                className="p-2.5 rounded-lg border border-border/50 bg-card cursor-pointer hover:border-primary/40 transition-colors"
                title="Clique para detalhes"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
                    {kpi.nome}
                  </span>
                  {status === "ok" ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : status === "atencao" ? (
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold tabular-nums">
                    {kpi.valor}
                    {kpi.unidade}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    / {kpi.meta}
                    {kpi.unidade}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {kpi.variacao >= 0 ? (
                    <ArrowUp className="w-2.5 h-2.5 text-green-500" />
                  ) : (
                    <ArrowDown className="w-2.5 h-2.5 text-red-500" />
                  )}
                  <span className={`text-[10px] tabular-nums ${kpi.variacao >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {kpi.variacao > 0 ? "+" : ""}
                    {kpi.variacao}
                    {kpi.unidade || "%"}
                  </span>
                </div>
                <Progress value={Math.min((kpi.valor / kpi.meta) * 100, 100)} className="h-1 mt-1.5" />
              </div>
            )
          })}
        </div>

        {/* ================================================================ */}
        {/* CRONOGRAMA CONTRATUAL */}
        {/* ================================================================ */}
        <div className="p-3 rounded-lg border border-border/50 bg-card mb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wide">Cronograma Contratual</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span>
                Inicio: <strong className="text-foreground">{cronogramaContratual.dataInicio}</strong>
              </span>
              <span>
                Termino: <strong className="text-foreground">{cronogramaContratual.dataTermino}</strong>
              </span>
              <span>
                Dias:{" "}
                <strong className="text-foreground">
                  {cronogramaContratual.diasDecorridos}/{cronogramaContratual.diasTotais}
                </strong>
              </span>
            </div>
          </div>

          {/* Barra de Progresso Dupla */}
          <div className="relative h-6 bg-muted/20 rounded overflow-hidden mb-1.5">
            {/* Previsto */}
            <div
              className="absolute top-0 left-0 h-3 bg-blue-500/40"
              style={{ width: `${cronogramaContratual.percentualPrevisto}%` }}
            />
            {/* Realizado */}
            <div
              className="absolute top-3 left-0 h-3 bg-primary/70"
              style={{ width: `${cronogramaContratual.percentualRealizado}%` }}
            />
            {/* Marcos */}
            {cronogramaContratual.marcos.map((marco, idx) => (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-px bg-foreground/10"
                style={{ left: `${marco.posicao}%` }}
              >
                <div
                  className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    marco.status === "concluido"
                      ? "bg-green-500"
                      : marco.status === "em_andamento"
                        ? "bg-yellow-500"
                        : "bg-muted-foreground/30"
                  }`}
                />
              </div>
            ))}
            {/* Linha Atual */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-foreground/80"
              style={{ left: `${(cronogramaContratual.diasDecorridos / cronogramaContratual.diasTotais) * 100}%` }}
            />
          </div>

          {/* Legenda */}
          <div className="flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <div className="w-2.5 h-1.5 bg-blue-500/40 rounded-sm" />
                Previsto: {cronogramaContratual.percentualPrevisto}%
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2.5 h-1.5 bg-primary/70 rounded-sm" />
                Realizado: {cronogramaContratual.percentualRealizado}%
              </span>
              <span
                className={`font-semibold ${
                  cronogramaContratual.percentualRealizado >= cronogramaContratual.percentualPrevisto
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Desvio:{" "}
                {(cronogramaContratual.percentualRealizado - cronogramaContratual.percentualPrevisto).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              {cronogramaContratual.marcos.slice(0, 4).map((marco, idx) => (
                <span key={idx} className="flex items-center gap-0.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      marco.status === "concluido"
                        ? "bg-green-500"
                        : marco.status === "em_andamento"
                          ? "bg-yellow-500"
                          : "bg-muted-foreground/30"
                    }`}
                  />
                  {marco.nome}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* GRID PRINCIPAL - 3 BLOCOS */}
        {/* ================================================================ */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2">
          {/* ============================================================ */}
          {/* BLOCO 1: GOVERNANCA CONTRATUAL (CLIENTE) */}
          {/* ============================================================ */}
          <div className="col-span-5 flex flex-col min-h-0">
            <div className="p-3 rounded-lg border border-border/50 bg-card flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Resultado Economico</span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                  DRE <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
              </div>

              <ScrollArea className="flex-1">
                {/* Contrato */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Building2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Contrato
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between py-1 px-2 text-[11px] rounded hover:bg-muted/30 cursor-pointer">
                      <span>Valor Original</span>
                      <span className="tabular-nums">{formatarMoeda(resultadoContrato.valorOriginal)}</span>
                    </div>
                    <div className="flex justify-between py-1 px-2 text-[11px] rounded hover:bg-muted/30 cursor-pointer">
                      <span>Aditivos (+)</span>
                      <span className="tabular-nums text-green-500">{formatarMoeda(resultadoContrato.aditivos)}</span>
                    </div>
                    <div className="flex justify-between py-1 px-2 text-[11px] rounded hover:bg-muted/30 cursor-pointer">
                      <span>Supressoes (-)</span>
                      <span className="tabular-nums text-red-500">{formatarMoeda(resultadoContrato.supressoes)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 px-2 text-[11px] rounded bg-primary/5 font-semibold">
                      <span>Valor Atual</span>
                      <span className="tabular-nums text-primary">{formatarMoeda(resultadoContrato.valorAtual)}</span>
                    </div>
                  </div>
                </div>

                {/* Execucao */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <HardHat className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Execucao
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between py-1 px-2 text-[11px] rounded hover:bg-muted/30 cursor-pointer">
                      <span>Medicao Acumulada</span>
                      <span className="tabular-nums">{formatarMoeda(resultadoExecucao.medicaoAcumulada)}</span>
                    </div>
                    <div className="flex justify-between py-1 px-2 text-[11px] rounded hover:bg-muted/30 cursor-pointer">
                      <span>Custo Total</span>
                      <span className="tabular-nums text-muted-foreground">
                        {formatarMoeda(resultadoExecucao.custoTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 px-2 text-[11px] rounded bg-green-500/5 font-semibold">
                      <span>Margem Bruta</span>
                      <span className="tabular-nums text-green-500">
                        {formatarMoeda(resultadoExecucao.margemBruta)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Indicadores Financeiros */}
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="text-center p-2 rounded bg-muted/30 cursor-pointer hover:bg-muted/50">
                    <p className="text-[8px] text-muted-foreground uppercase">% Exec</p>
                    <p className="text-sm font-bold tabular-nums">69.2%</p>
                  </div>
                  <div className="text-center p-2 rounded bg-yellow-500/10 cursor-pointer hover:bg-yellow-500/20">
                    <p className="text-[8px] text-muted-foreground uppercase">Margem</p>
                    <p className="text-sm font-bold tabular-nums text-yellow-500">
                      {resultadoExecucao.margemPercentual}%
                    </p>
                  </div>
                  <div className="text-center p-2 rounded bg-green-500/10 cursor-pointer hover:bg-green-500/20">
                    <p className="text-[8px] text-muted-foreground uppercase">F/CD</p>
                    <p className="text-sm font-bold tabular-nums text-green-500">{resultadoExecucao.fcd}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-blue-500/10 cursor-pointer hover:bg-blue-500/20">
                    <p className="text-[8px] text-muted-foreground uppercase">A Receber</p>
                    <p className="text-sm font-bold tabular-nums text-blue-500">
                      {formatarMoeda(resultadoExecucao.aReceber)}
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* ============================================================ */}
          {/* BLOCO 2: PESSOAS + QSMS */}
          {/* ============================================================ */}
          <div className="col-span-3 flex flex-col gap-2 min-h-0">
            {/* Pessoas */}
            <div className="p-3 rounded-lg border border-border/50 bg-card cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">Pessoas</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="text-center p-1.5 rounded bg-muted/30">
                  <p className="text-[8px] text-muted-foreground uppercase">Efetivo</p>
                  <p className="text-lg font-bold tabular-nums">{dadosPessoas.efetivoTotal}</p>
                </div>
                <div className="text-center p-1.5 rounded bg-muted/30">
                  <p className="text-[8px] text-muted-foreground uppercase">Mes Ant.</p>
                  <p className="text-lg font-bold tabular-nums text-muted-foreground">
                    {dadosPessoas.efetivoMesAnterior}
                  </p>
                </div>
                <div className="text-center p-1.5 rounded bg-yellow-500/10">
                  <p className="text-[8px] text-muted-foreground uppercase">Afastados</p>
                  <p className="text-sm font-bold tabular-nums text-yellow-500">{dadosPessoas.afastados}</p>
                </div>
                <div className="text-center p-1.5 rounded bg-muted/30">
                  <p className="text-[8px] text-muted-foreground uppercase">HE (h)</p>
                  <p className="text-sm font-bold tabular-nums">{dadosPessoas.horasExtras.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-1.5 text-center p-1 rounded bg-muted/20">
                <span className="text-[9px] text-muted-foreground">Turnover: </span>
                <span className="text-[9px] font-semibold tabular-nums">{dadosPessoas.turnover}%</span>
              </div>
            </div>

            {/* QSMS */}
            <div className="p-3 rounded-lg border border-border/50 bg-card flex-1 cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">QSMS</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                <div className="text-center p-1.5 rounded bg-green-500/10">
                  <p className="text-[8px] text-muted-foreground uppercase">FVS Ok</p>
                  <p className="text-lg font-bold tabular-nums text-green-500">{dadosQSMS.fvsRealizadas}</p>
                </div>
                <div className="text-center p-1.5 rounded bg-yellow-500/10">
                  <p className="text-[8px] text-muted-foreground uppercase">FVS Pend.</p>
                  <p className="text-lg font-bold tabular-nums text-yellow-500">{dadosQSMS.fvsPendentes}</p>
                </div>
                <div className="text-center p-1.5 rounded bg-red-500/10">
                  <p className="text-[8px] text-muted-foreground uppercase">NC Abertas</p>
                  <p className="text-sm font-bold tabular-nums text-red-500">{dadosQSMS.ncsAbertas}</p>
                </div>
                <div className="text-center p-1.5 rounded bg-green-500/10">
                  <p className="text-[8px] text-muted-foreground uppercase">NC Fechadas</p>
                  <p className="text-sm font-bold tabular-nums text-green-500">{dadosQSMS.ncsFechadas}</p>
                </div>
              </div>
              <div className="p-2 rounded bg-green-500/10 text-center">
                <p className="text-[8px] text-muted-foreground uppercase">Dias sem Acidente</p>
                <p className="text-xl font-bold tabular-nums text-green-500">{dadosQSMS.diasSemAcidente}</p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* BLOCO 3: ALERTAS + ACOES */}
          {/* ============================================================ */}
          <div className="col-span-4 flex flex-col gap-2 min-h-0">
            {/* Alertas */}
            <div className="p-3 rounded-lg border border-border/50 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">Alertas</span>
                <Badge variant="destructive" className="text-[9px] h-4 px-1.5 ml-auto">
                  {alertas.length}
                </Badge>
              </div>
              <div className="space-y-1.5">
                {alertas.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      alerta.tipo === "critico"
                        ? "border-red-500/30 bg-red-500/5 hover:bg-red-500/10"
                        : alerta.tipo === "atencao"
                          ? "border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10"
                          : "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {alerta.tipo === "critico" ? (
                        <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : alerta.tipo === "atencao" ? (
                        <Clock className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium truncate">{alerta.titulo}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{alerta.descricao}</p>
                      </div>
                      <span className="text-[9px] text-muted-foreground flex-shrink-0">{alerta.data}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proximas Acoes */}
            <div className="p-3 rounded-lg border border-border/50 bg-card flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">Proximas Acoes</span>
              </div>
              <ScrollArea className="h-[calc(100%-28px)]">
                <div className="space-y-1.5">
                  {proximasAcoes.map((acao) => (
                    <div
                      key={acao.id}
                      className="p-2 rounded border border-border/30 hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-[11px] font-medium truncate flex-1">{acao.acao}</p>
                        <Badge
                          variant={acao.status === "agendado" ? "default" : "secondary"}
                          className="text-[8px] h-4 px-1.5 ml-2"
                        >
                          {acao.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{acao.responsavel}</span>
                        <span>{acao.data}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
