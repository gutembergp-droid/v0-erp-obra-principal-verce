"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  efetivoMes: 892,
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
  incidentesMes: 2,
}

const tabelaFinanceira = {
  contrato: [
    { item: "Valor Original", valor: 245000000, tipo: "neutro" },
    { item: "Aditivos (+)", valor: 12500000, tipo: "positivo" },
    { item: "Supressoes (-)", valor: -3200000, tipo: "negativo" },
    { item: "Valor Atual", valor: 254300000, tipo: "destaque" },
  ],
  execucao: [
    { item: "Medicao Acumulada", valor: 176000000, tipo: "neutro" },
    { item: "Custo Direto", valor: 142800000, tipo: "negativo" },
    { item: "Custo Indireto", valor: 17880000, tipo: "negativo" },
    { item: "Margem Bruta", valor: 15320000, tipo: "positivo" },
  ],
  indicadores: [
    { item: "% Execucao", valor: "69.2%", tipo: "neutro" },
    { item: "Margem %", valor: "8.7%", tipo: "atencao" },
    { item: "F/CD", valor: "1.23", tipo: "positivo" },
    { item: "A Receber", valor: 23500000, tipo: "destaque" },
  ],
}

const kpisContrato = [
  {
    id: "avanco-fisico",
    nome: "Avanco Fisico",
    valor: 67.4,
    meta: 70,
    unidade: "%",
    status: "atencao",
    variacao: -2.6,
  },
  {
    id: "avanco-financeiro",
    nome: "Avanco Financeiro",
    valor: 72.1,
    meta: 70,
    unidade: "%",
    status: "ok",
    variacao: +2.1,
  },
  {
    id: "margem",
    nome: "Margem Acumulada",
    valor: 8.7,
    meta: 9.0,
    unidade: "%",
    status: "atencao",
    variacao: -0.3,
  },
  {
    id: "prazo",
    nome: "SPI (Indice Prazo)",
    valor: 0.95,
    meta: 1.0,
    unidade: "",
    status: "atencao",
    variacao: -0.02,
  },
  {
    id: "custo",
    nome: "CPI (Indice Custo)",
    valor: 1.02,
    meta: 1.0,
    unidade: "",
    status: "ok",
    variacao: +0.01,
  },
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
  {
    id: 3,
    tipo: "info",
    titulo: "Meta 0.9 atingida",
    descricao: "Pacote #45 com economia",
    data: "02/01",
  },
]

const proximasAcoes = [
  { id: 1, acao: "Reuniao Alinhamento", responsavel: "GC", data: "06/01", status: "agendado" },
  { id: 2, acao: "Relatorio Executivo", responsavel: "CTRL", data: "08/01", status: "pendente" },
  { id: 3, acao: "Auditoria Qualidade", responsavel: "QSMS", data: "10/01", status: "agendado" },
]

function formatarValor(valor: number | string): string {
  if (typeof valor === "string") return valor
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export default function CockpitPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header Compacto */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Gauge className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip
                  title="Cockpit de Governanca"
                  description="Painel executivo de governanca do contrato. Visao consolidada de KPIs, cronograma, resultado economico e indicadores para tomada de decisao."
                />
              </div>
              <p className="text-xs text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Relatorio
            </Button>
            <Button size="sm">
              <Calendar className="w-4 h-4 mr-1" />
              Reuniao
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-4 flex-shrink-0">
          {kpisContrato.map((kpi) => (
            <Card
              key={kpi.id}
              className="border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
              title="Clique para detalhes"
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{kpi.nome}</p>
                  {kpi.status === "ok" ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">
                    {kpi.valor}
                    {kpi.unidade}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    / {kpi.meta}
                    {kpi.unidade}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.variacao >= 0 ? (
                    <ArrowUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-[10px] ${kpi.variacao >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {kpi.variacao > 0 ? "+" : ""}
                    {kpi.variacao}
                    {kpi.unidade || "%"}
                  </span>
                </div>
                <Progress value={(kpi.valor / kpi.meta) * 100} className="h-1 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/50 mb-4 flex-shrink-0">
          <CardHeader className="py-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Cronograma Contratual
              </CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-muted-foreground">
                  Inicio: <strong>{cronogramaContratual.dataInicio}</strong>
                </span>
                <span className="text-muted-foreground">
                  Termino: <strong>{cronogramaContratual.dataTermino}</strong>
                </span>
                <span className="text-muted-foreground">
                  Dias:{" "}
                  <strong>
                    {cronogramaContratual.diasDecorridos}/{cronogramaContratual.diasTotais}
                  </strong>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            {/* Barra de Progresso Dupla */}
            <div className="relative h-8 bg-muted/30 rounded-lg overflow-hidden mb-2">
              {/* Previsto */}
              <div
                className="absolute top-0 left-0 h-4 bg-blue-500/30 rounded-t-lg"
                style={{ width: `${cronogramaContratual.percentualPrevisto}%` }}
              />
              {/* Realizado */}
              <div
                className="absolute top-4 left-0 h-4 bg-primary/60 rounded-b-lg"
                style={{ width: `${cronogramaContratual.percentualRealizado}%` }}
              />
              {/* Marcos */}
              {cronogramaContratual.marcos.map((marco, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-px bg-foreground/20"
                  style={{ left: `${marco.posicao}%` }}
                  title={marco.nome}
                >
                  <div
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-background ${
                      marco.status === "concluido"
                        ? "bg-green-500"
                        : marco.status === "em_andamento"
                          ? "bg-yellow-500"
                          : "bg-muted-foreground/30"
                    }`}
                  />
                </div>
              ))}
              {/* Linha do tempo atual */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-foreground"
                style={{ left: `${(cronogramaContratual.diasDecorridos / cronogramaContratual.diasTotais) * 100}%` }}
              />
            </div>
            {/* Legenda */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px]">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-blue-500/30 rounded" />
                  Previsto: {cronogramaContratual.percentualPrevisto}%
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-primary/60 rounded" />
                  Realizado: {cronogramaContratual.percentualRealizado}%
                </span>
                <span
                  className={`font-medium ${
                    cronogramaContratual.percentualRealizado >= cronogramaContratual.percentualPrevisto
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Desvio:{" "}
                  {(cronogramaContratual.percentualRealizado - cronogramaContratual.percentualPrevisto).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                {cronogramaContratual.marcos.map((marco, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
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
          </CardContent>
        </Card>

        {/* Conteudo Principal - Grid 3 colunas */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-3">
          <div className="col-span-5 flex flex-col gap-3 min-h-0">
            <Card className="border-border/50 flex-1">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Resultado Economico
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    Ver DRE <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <ScrollArea className="h-[calc(100%-10px)]">
                  {/* Secao Contrato */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                        Contrato
                      </span>
                    </div>
                    <div className="space-y-1">
                      {tabelaFinanceira.contrato.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between py-1.5 px-2 rounded text-xs cursor-pointer hover:bg-muted/50 ${
                            item.tipo === "destaque" ? "bg-primary/5 font-medium" : ""
                          }`}
                        >
                          <span>{item.item}</span>
                          <span
                            className={
                              item.tipo === "positivo"
                                ? "text-green-500"
                                : item.tipo === "negativo"
                                  ? "text-red-500"
                                  : item.tipo === "destaque"
                                    ? "text-primary font-bold"
                                    : ""
                            }
                          >
                            {formatarValor(item.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Secao Execucao */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <HardHat className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                        Execucao
                      </span>
                    </div>
                    <div className="space-y-1">
                      {tabelaFinanceira.execucao.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between py-1.5 px-2 rounded text-xs cursor-pointer hover:bg-muted/50 ${
                            item.tipo === "destaque" ? "bg-green-500/5 font-medium" : ""
                          }`}
                        >
                          <span>{item.item}</span>
                          <span
                            className={
                              item.tipo === "positivo"
                                ? "text-green-500 font-medium"
                                : item.tipo === "negativo"
                                  ? "text-muted-foreground"
                                  : ""
                            }
                          >
                            {formatarValor(item.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Indicadores */}
                  <div className="grid grid-cols-4 gap-2">
                    {tabelaFinanceira.indicadores.map((item, idx) => (
                      <div
                        key={idx}
                        className={`text-center p-2 rounded cursor-pointer hover:bg-muted/70 ${
                          item.tipo === "destaque"
                            ? "bg-blue-500/10"
                            : item.tipo === "atencao"
                              ? "bg-yellow-500/10"
                              : item.tipo === "positivo"
                                ? "bg-green-500/10"
                                : "bg-muted/50"
                        }`}
                      >
                        <p className="text-[9px] text-muted-foreground mb-0.5">{item.item}</p>
                        <p
                          className={`text-sm font-bold ${
                            item.tipo === "destaque"
                              ? "text-blue-500"
                              : item.tipo === "atencao"
                                ? "text-yellow-500"
                                : item.tipo === "positivo"
                                  ? "text-green-500"
                                  : ""
                          }`}
                        >
                          {typeof item.valor === "number" ? formatarValor(item.valor) : item.valor}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-3 flex flex-col gap-3 min-h-0">
            {/* Card Pessoas */}
            <Card className="border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Pessoas
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="text-[9px] text-muted-foreground">Efetivo</p>
                    <p className="text-lg font-bold">{dadosPessoas.efetivoTotal}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="text-[9px] text-muted-foreground">Mes Ant.</p>
                    <p className="text-lg font-bold text-muted-foreground">{dadosPessoas.efetivoMes}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-yellow-500/10">
                    <p className="text-[9px] text-muted-foreground">Afastados</p>
                    <p className="text-sm font-bold text-yellow-500">{dadosPessoas.afastados}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="text-[9px] text-muted-foreground">HE (h)</p>
                    <p className="text-sm font-bold">{dadosPessoas.horasExtras.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2 text-center p-1.5 rounded bg-muted/30">
                  <span className="text-[10px] text-muted-foreground">Turnover: </span>
                  <span className="text-[10px] font-medium">{dadosPessoas.turnover}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Card QSMS */}
            <Card className="border-border/50 flex-1 cursor-pointer hover:border-primary/50 transition-colors">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  QSMS
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="text-[9px] text-muted-foreground">FVS Real.</p>
                    <p className="text-lg font-bold text-green-500">{dadosQSMS.fvsRealizadas}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-yellow-500/10">
                    <p className="text-[9px] text-muted-foreground">FVS Pend.</p>
                    <p className="text-lg font-bold text-yellow-500">{dadosQSMS.fvsPendentes}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-red-500/10">
                    <p className="text-[9px] text-muted-foreground">NC Abertas</p>
                    <p className="text-sm font-bold text-red-500">{dadosQSMS.ncsAbertas}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-green-500/10">
                    <p className="text-[9px] text-muted-foreground">NC Fechadas</p>
                    <p className="text-sm font-bold text-green-500">{dadosQSMS.ncsFechadas}</p>
                  </div>
                </div>
                <div className="p-2 rounded bg-green-500/10 text-center">
                  <p className="text-[9px] text-muted-foreground">Dias sem Acidente</p>
                  <p className="text-xl font-bold text-green-500">{dadosQSMS.diasSemAcidente}</p>
                </div>
                {dadosQSMS.incidentesMes > 0 && (
                  <div className="mt-2 text-center">
                    <Badge variant="outline" className="text-[10px] border-yellow-500/50 text-yellow-500">
                      {dadosQSMS.incidentesMes} incidente(s) no mes
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-4 flex flex-col gap-3 min-h-0">
            {/* Alertas Compactos */}
            <Card className="border-border/50">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alertas
                  <Badge variant="destructive" className="text-[10px] h-4 px-1.5">
                    {alertas.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-2">
                  {alertas.map((alerta) => (
                    <div
                      key={alerta.id}
                      className={`p-2 rounded border cursor-pointer hover:bg-muted/50 ${
                        alerta.tipo === "critico"
                          ? "border-red-500/30 bg-red-500/5"
                          : alerta.tipo === "atencao"
                            ? "border-yellow-500/30 bg-yellow-500/5"
                            : "border-blue-500/30 bg-blue-500/5"
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
                          <p className="text-xs font-medium truncate">{alerta.titulo}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{alerta.descricao}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0">{alerta.data}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Proximas Acoes Compactas */}
            <Card className="border-border/50 flex-1">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Proximas Acoes
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <ScrollArea className="h-[calc(100%-10px)]">
                  <div className="space-y-2">
                    {proximasAcoes.map((acao) => (
                      <div
                        key={acao.id}
                        className="p-2 rounded border border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium truncate flex-1">{acao.acao}</p>
                          <Badge
                            variant={acao.status === "agendado" ? "default" : "secondary"}
                            className="text-[9px] h-4 px-1.5 ml-2"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
