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
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

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
    nome: "Aderencia ao Prazo",
    valor: 94.2,
    meta: 95,
    unidade: "%",
    status: "ok",
    variacao: -0.8,
  },
]

const alertas = [
  {
    id: 1,
    tipo: "critico",
    titulo: "Desvio de custo Frente 3",
    descricao: "Custo 12% acima do previsto na frente de terraplenagem",
    data: "04/01/2026",
  },
  {
    id: 2,
    tipo: "atencao",
    titulo: "Medicao pendente aprovacao",
    descricao: "Medicao #23 aguardando aprovacao ha 5 dias",
    data: "03/01/2026",
  },
  {
    id: 3,
    tipo: "info",
    titulo: "Meta 0.9 atingida",
    descricao: "Pacote de suprimentos #45 atingiu meta de economia",
    data: "02/01/2026",
  },
]

const proximasAcoes = [
  { id: 1, acao: "Reuniao de Alinhamento Mensal", responsavel: "Ger. Obra", data: "06/01/2026", status: "agendado" },
  { id: 2, acao: "Entrega Relatorio Executivo", responsavel: "Controladoria", data: "08/01/2026", status: "pendente" },
  { id: 3, acao: "Auditoria de Qualidade", responsavel: "QSMS", data: "10/01/2026", status: "agendado" },
  { id: 4, acao: "Fechamento Medicao #24", responsavel: "Comercial", data: "15/01/2026", status: "pendente" },
]

const resumoFinanceiro = {
  valorContrato: "R$ 245.000.000,00",
  medicaoAcumulada: "R$ 176.000.000,00",
  custoAcumulado: "R$ 160.680.000,00",
  margemBruta: "R$ 15.320.000,00",
  aReceber: "R$ 23.500.000,00",
}

export default function CockpitPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <Gauge className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip
                  title="Cockpit de Governanca"
                  description="Painel executivo de governanca do contrato. Visao consolidada de KPIs, alertas criticos e acoes pendentes para tomada de decisao."
                />
              </div>
              <p className="text-sm text-muted-foreground">Visao executiva do contrato BR-101 LOTE 2</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Relatorio Executivo
            </Button>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Reuniao de Alinhamento
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
          {kpisContrato.map((kpi) => (
            <Card key={kpi.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{kpi.nome}</p>
                  {kpi.status === "ok" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl font-bold">
                    {kpi.valor}
                    {kpi.unidade}
                  </span>
                  <span className="text-sm text-muted-foreground mb-0.5">/ {kpi.meta}%</span>
                </div>
                <div className="flex items-center gap-1">
                  {kpi.variacao >= 0 ? (
                    <ArrowUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs ${kpi.variacao >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {kpi.variacao > 0 ? "+" : ""}
                    {kpi.variacao}%
                  </span>
                </div>
                <Progress value={(kpi.valor / kpi.meta) * 100} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo Principal */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">
          {/* Coluna Esquerda */}
          <div className="col-span-2 flex flex-col gap-4 min-h-0">
            {/* Resumo Financeiro */}
            <Card className="border-border/50">
              <CardHeader className="py-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Valor Contrato</p>
                    <p className="text-sm font-bold">{resumoFinanceiro.valorContrato}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Medicao Acum.</p>
                    <p className="text-sm font-bold">{resumoFinanceiro.medicaoAcumulada}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Custo Acum.</p>
                    <p className="text-sm font-bold">{resumoFinanceiro.custoAcumulado}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <p className="text-xs text-muted-foreground mb-1">Margem Bruta</p>
                    <p className="text-sm font-bold text-green-500">{resumoFinanceiro.margemBruta}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-500/10">
                    <p className="text-xs text-muted-foreground mb-1">A Receber</p>
                    <p className="text-sm font-bold text-blue-500">{resumoFinanceiro.aReceber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            <Card className="flex-1 flex flex-col border-border/50 min-h-0">
              <CardHeader className="py-3 flex-shrink-0">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alertas e Pendencias
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {alertas.map((alerta) => (
                      <div
                        key={alerta.id}
                        className={`p-3 rounded-lg border ${
                          alerta.tipo === "critico"
                            ? "border-red-500/30 bg-red-500/5"
                            : alerta.tipo === "atencao"
                              ? "border-yellow-500/30 bg-yellow-500/5"
                              : "border-blue-500/30 bg-blue-500/5"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            {alerta.tipo === "critico" ? (
                              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                            ) : alerta.tipo === "atencao" ? (
                              <Clock className="w-4 h-4 text-yellow-500 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{alerta.titulo}</p>
                              <p className="text-xs text-muted-foreground">{alerta.descricao}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{alerta.data}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Proximas Acoes */}
          <div className="flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col border-border/50">
              <CardHeader className="py-3 flex-shrink-0">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Proximas Acoes
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {proximasAcoes.map((acao) => (
                      <div
                        key={acao.id}
                        className="p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium">{acao.acao}</p>
                          <Badge variant={acao.status === "agendado" ? "default" : "secondary"} className="text-xs">
                            {acao.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
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
