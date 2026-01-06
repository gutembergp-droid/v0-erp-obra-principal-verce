"use client"

import { Suspense, useState } from "react"
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
  Users,
  Building2,
  HardHat,
  ChevronRight,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
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
  {
    id: "fisico",
    nome: "Avanco Fisico",
    valor: 67.4,
    meta: 70,
    unidade: "%",
    variacao: -2.6,
    historico: [62, 64, 65, 66, 67.4],
  },
  {
    id: "financeiro",
    nome: "Avanco Financeiro",
    valor: 72.1,
    meta: 70,
    unidade: "%",
    variacao: +2.1,
    historico: [65, 67, 69, 71, 72.1],
  },
  {
    id: "margem",
    nome: "Margem",
    valor: 8.7,
    meta: 9.0,
    unidade: "%",
    variacao: -0.3,
    historico: [9.2, 9.0, 8.8, 8.6, 8.7],
  },
  {
    id: "spi",
    nome: "SPI",
    valor: 0.95,
    meta: 1.0,
    unidade: "",
    variacao: -0.05,
    historico: [0.98, 0.97, 0.96, 0.94, 0.95],
  },
  {
    id: "cpi",
    nome: "CPI",
    valor: 1.02,
    meta: 1.0,
    unidade: "",
    variacao: +0.02,
    historico: [1.01, 1.0, 1.01, 1.03, 1.02],
  },
]

const alertas = [
  {
    id: 1,
    tipo: "critico",
    titulo: "Desvio de custo Frente 3",
    descricao: "Custo 12% acima do previsto",
    data: "04/01",
    valor: "R$ 450 mil",
  },
  {
    id: 2,
    tipo: "atencao",
    titulo: "Medicao #23 pendente",
    descricao: "Aguardando aprovacao ha 5 dias",
    data: "03/01",
    valor: "R$ 2.1 Mi",
  },
  {
    id: 3,
    tipo: "info",
    titulo: "Meta 0.9 atingida",
    descricao: "Pacote #45 com economia",
    data: "02/01",
    valor: "R$ 180 mil",
  },
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

function CockpitContent() {
  const [painelAberto, setPainelAberto] = useState(false)
  const [kpiSelecionado, setKpiSelecionado] = useState<(typeof kpisContrato)[0] | null>(null)
  const [alertaSelecionado, setAlertaSelecionado] = useState<(typeof alertas)[0] | null>(null)

  const abrirPainelKpi = (kpi: (typeof kpisContrato)[0]) => {
    setKpiSelecionado(kpi)
    setAlertaSelecionado(null)
    setPainelAberto(true)
  }

  const abrirPainelAlerta = (alerta: (typeof alertas)[0]) => {
    setAlertaSelecionado(alerta)
    setKpiSelecionado(null)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full p-4 overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border">
              <Gauge className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip
                  title="GC-01 - Cockpit de Governanca"
                  description="Painel executivo consolidado. Visao integrada de cronograma, resultado economico, pessoas e QSMS para tomada de decisao do Gerente de Contrato."
                />
                <Badge variant="outline" className="text-[9px] h-5 border-border text-muted-foreground">
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

        {/* KPIS - FAIXA SUPERIOR */}
        <div className="grid grid-cols-5 gap-2 mb-3 flex-shrink-0">
          {kpisContrato.map((kpi) => {
            const status = getStatusKpi(kpi.valor, kpi.meta)
            return (
              <div
                key={kpi.id}
                className="p-2.5 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
                title="Clique para detalhes"
                onClick={() => abrirPainelKpi(kpi)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
                    {kpi.nome}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status === "ok" ? "bg-primary" : status === "atencao" ? "bg-accent-foreground" : "bg-destructive"
                    }`}
                  />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold tabular-nums text-foreground">
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
                    <ArrowUp className="w-2.5 h-2.5 text-muted-foreground" />
                  ) : (
                    <ArrowDown className="w-2.5 h-2.5 text-muted-foreground" />
                  )}
                  <span
                    className={`text-[10px] tabular-nums ${kpi.variacao >= 0 ? "text-primary" : "text-destructive"}`}
                  >
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

        {/* CRONOGRAMA CONTRATUAL */}
        <div className="p-3 rounded-lg border border-border bg-card mb-3 flex-shrink-0">
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
          <div className="relative h-6 bg-muted/30 rounded overflow-hidden mb-1.5">
            <div
              className="absolute top-0 left-0 h-3 bg-muted-foreground/30"
              style={{ width: `${cronogramaContratual.percentualPrevisto}%` }}
            />
            <div
              className="absolute top-3 left-0 h-3 bg-primary/60"
              style={{ width: `${cronogramaContratual.percentualRealizado}%` }}
            />
            {cronogramaContratual.marcos.map((marco, idx) => (
              <div key={idx} className="absolute top-0 bottom-0 w-px bg-border" style={{ left: `${marco.posicao}%` }}>
                <div
                  className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    marco.status === "concluido"
                      ? "bg-primary"
                      : marco.status === "em_andamento"
                        ? "bg-muted-foreground"
                        : "bg-border"
                  }`}
                />
              </div>
            ))}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-foreground"
              style={{ left: `${(cronogramaContratual.diasDecorridos / cronogramaContratual.diasTotais) * 100}%` }}
            />
          </div>

          {/* Legenda */}
          <div className="flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <div className="w-2.5 h-1.5 bg-muted-foreground/30 rounded-sm" />
                Previsto: {cronogramaContratual.percentualPrevisto}%
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2.5 h-1.5 bg-primary/60 rounded-sm" />
                Realizado: {cronogramaContratual.percentualRealizado}%
              </span>
              <span
                className={`font-semibold ${
                  cronogramaContratual.percentualRealizado >= cronogramaContratual.percentualPrevisto
                    ? "text-foreground"
                    : "text-muted-foreground"
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
                        ? "bg-primary"
                        : marco.status === "em_andamento"
                          ? "bg-muted-foreground"
                          : "bg-border"
                    }`}
                  />
                  {marco.nome}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* GRID PRINCIPAL - 3 BLOCOS */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2">
          {/* BLOCO 1: RESULTADO ECONOMICO */}
          <div className="col-span-5 flex flex-col min-h-0">
            <div className="p-3 rounded-lg border border-border bg-card flex-1 flex flex-col">
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
                      <span className="tabular-nums text-foreground">{formatarMoeda(resultadoContrato.aditivos)}</span>
                    </div>
                    <div className="flex justify-between py-1 px-2 text-[11px] rounded hover:bg-muted/30 cursor-pointer">
                      <span>Supressoes (-)</span>
                      <span className="tabular-nums text-muted-foreground">
                        {formatarMoeda(resultadoContrato.supressoes)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 px-2 text-[11px] rounded bg-muted/50 font-semibold">
                      <span>Valor Atual</span>
                      <span className="tabular-nums text-foreground">
                        {formatarMoeda(resultadoContrato.valorAtual)}
                      </span>
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
                    <div className="flex justify-between py-1.5 px-2 text-[11px] rounded bg-muted/50 font-semibold">
                      <span>Margem Bruta</span>
                      <span className="tabular-nums text-foreground">
                        {formatarMoeda(resultadoExecucao.margemBruta)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Indicadores Financeiros */}
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="text-center p-2 rounded bg-muted/30 border border-border cursor-pointer hover:bg-muted/50">
                    <p className="text-[8px] text-muted-foreground uppercase">% Exec</p>
                    <p className="text-sm font-bold tabular-nums">69.2%</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30 border border-border cursor-pointer hover:bg-muted/50">
                    <p className="text-[8px] text-muted-foreground uppercase">Margem</p>
                    <p className="text-sm font-bold tabular-nums">{resultadoExecucao.margemPercentual}%</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30 border border-border cursor-pointer hover:bg-muted/50">
                    <p className="text-[8px] text-muted-foreground uppercase">F/CD</p>
                    <p className="text-sm font-bold tabular-nums">{resultadoExecucao.fcd}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30 border border-border cursor-pointer hover:bg-muted/50">
                    <p className="text-[8px] text-muted-foreground uppercase">A Receber</p>
                    <p className="text-sm font-bold tabular-nums">{formatarMoeda(resultadoExecucao.aReceber)}</p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* BLOCO 2: PESSOAS + QSMS */}
          <div className="col-span-3 flex flex-col gap-2 min-h-0">
            {/* Pessoas */}
            <div className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">Pessoas</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="text-center p-1.5 rounded bg-muted/30 border border-border">
                  <p className="text-[8px] text-muted-foreground uppercase">Efetivo</p>
                  <p className="text-lg font-bold tabular-nums">{dadosPessoas.efetivoTotal}</p>
                </div>
                <div className="text-center p-1.5 rounded bg-muted/30 border border-border">
                  <p className="text-[8px] text-muted-foreground uppercase">Afastados</p>
                  <p className="text-lg font-bold tabular-nums">{dadosPessoas.afastados}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-[9px] text-muted-foreground">
                <span>Turnover: {dadosPessoas.turnover}%</span>
                <span>HE: {dadosPessoas.horasExtras.toLocaleString()}h</span>
              </div>
            </div>

            {/* QSMS */}
            <div className="p-3 rounded-lg border border-border bg-card flex-1 cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">QSMS</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-1.5 rounded bg-muted/30 border border-border">
                  <span className="text-[9px] text-muted-foreground uppercase">Dias s/ Acidente</span>
                  <span className="text-lg font-bold tabular-nums text-primary">{dadosQSMS.diasSemAcidente}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="text-center p-1 rounded bg-muted/30 border border-border">
                    <p className="text-[8px] text-muted-foreground">FVs Realizadas</p>
                    <p className="text-sm font-bold tabular-nums">{dadosQSMS.fvsRealizadas}</p>
                  </div>
                  <div className="text-center p-1 rounded bg-muted/30 border border-border">
                    <p className="text-[8px] text-muted-foreground">FVs Pendentes</p>
                    <p className="text-sm font-bold tabular-nums">{dadosQSMS.fvsPendentes}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-muted-foreground">
                    NCs Abertas: <strong className="text-foreground">{dadosQSMS.ncsAbertas}</strong>
                  </span>
                  <span className="text-muted-foreground">
                    Fechadas: <strong className="text-foreground">{dadosQSMS.ncsFechadas}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCO 3: ALERTAS + ACOES */}
          <div className="col-span-4 flex flex-col gap-2 min-h-0">
            {/* Alertas */}
            <div className="p-3 rounded-lg border border-border bg-card flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Alertas</span>
                </div>
                <Badge variant="outline" className="text-[9px]">
                  {alertas.length}
                </Badge>
              </div>
              <ScrollArea className="h-[120px]">
                <div className="space-y-1.5">
                  {alertas.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="flex items-start gap-2 p-2 rounded border border-border hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => abrirPainelAlerta(alerta)}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-accent-foreground"
                              : "bg-primary"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium truncate">{alerta.titulo}</span>
                          <span className="text-[9px] text-muted-foreground">{alerta.data}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{alerta.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Proximas Acoes */}
            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wide">Proximas Acoes</span>
              </div>
              <div className="space-y-1">
                {proximasAcoes.map((acao) => (
                  <div
                    key={acao.id}
                    className="flex items-center justify-between p-1.5 rounded hover:bg-muted/30 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium">{acao.acao}</span>
                      <Badge variant="outline" className="text-[8px] h-4">
                        {acao.responsavel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-muted-foreground">{acao.data}</span>
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          acao.status === "agendado" ? "bg-primary" : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL LATERAL */}
      <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
        <SheetContent className="w-[400px] sm:w-[450px] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">
                {kpiSelecionado ? kpiSelecionado.nome : alertaSelecionado?.titulo}
              </SheetTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setPainelAberto(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-4 space-y-4">
              {kpiSelecionado && (
                <>
                  {/* Valor Atual */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Valor Atual</span>
                      <Target className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        {kpiSelecionado.valor}
                        {kpiSelecionado.unidade}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {kpiSelecionado.meta}
                        {kpiSelecionado.unidade}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {kpiSelecionado.variacao >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-primary" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm ${kpiSelecionado.variacao >= 0 ? "text-primary" : "text-destructive"}`}>
                        {kpiSelecionado.variacao > 0 ? "+" : ""}
                        {kpiSelecionado.variacao}
                        {kpiSelecionado.unidade || "%"} vs mes anterior
                      </span>
                    </div>
                    <Progress value={(kpiSelecionado.valor / kpiSelecionado.meta) * 100} className="h-2 mt-3" />
                  </div>

                  {/* Historico */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Historico (5 meses)</span>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {kpiSelecionado.historico.map((valor, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-primary/60 rounded-t"
                            style={{ height: `${(valor / kpiSelecionado.meta) * 80}%` }}
                          />
                          <span className="text-[9px] text-muted-foreground">{valor}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] text-muted-foreground">
                      <span>Set</span>
                      <span>Out</span>
                      <span>Nov</span>
                      <span>Dez</span>
                      <span>Jan</span>
                    </div>
                  </div>

                  {/* Projecao */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <span className="text-sm font-semibold">Projecao</span>
                    <p className="text-xs text-muted-foreground mt-2">
                      Mantendo a tendencia atual, o indicador deve atingir{" "}
                      <strong className="text-foreground">
                        {(kpiSelecionado.valor + kpiSelecionado.variacao * 2).toFixed(1)}
                        {kpiSelecionado.unidade}
                      </strong>{" "}
                      em 2 meses.
                    </p>
                  </div>
                </>
              )}

              {alertaSelecionado && (
                <>
                  {/* Detalhes do Alerta */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          alertaSelecionado.tipo === "critico"
                            ? "bg-destructive"
                            : alertaSelecionado.tipo === "atencao"
                              ? "bg-accent-foreground"
                              : "bg-primary"
                        }`}
                      />
                      <Badge variant="outline" className="text-[10px]">
                        {alertaSelecionado.tipo.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alertaSelecionado.descricao}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">Impacto</span>
                      <span className="text-sm font-bold">{alertaSelecionado.valor}</span>
                    </div>
                  </div>

                  {/* Acoes */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <span className="text-sm font-semibold">Acoes Recomendadas</span>
                    <div className="space-y-2 mt-3">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        Atribuir Responsavel
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Reuniao
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function CockpitPage() {
  return (
    <Suspense fallback={null}>
      <CockpitContent />
    </Suspense>
  )
}
