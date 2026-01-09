"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  BarChart3,
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Download,
} from "lucide-react"

// Dados mockados
const kpis = {
  receitaAcumulada: { valor: 27450000, meta: 30000000, variacao: -8.5 },
  receitaMes: { valor: 3825000, meta: 4000000, variacao: -4.4 },
  avancoFisico: { valor: 67.8, meta: 70.0, variacao: -2.2 },
  avancoFinanceiro: { valor: 62.3, meta: 65.0, variacao: -2.7 },
  taxaConversao: { valor: 90.0, meta: 95.0, variacao: -5.0 },
  diasMedioRecebimento: { valor: 32, meta: 30, variacao: 6.7 },
}

const evolucaoMensal = [
  { mes: "Ago/25", receitaPrevista: 3200000, receitaRealizada: 3100000, avancoFisico: 45.2, avancoFinanceiro: 42.1 },
  { mes: "Set/25", receitaPrevista: 3500000, receitaRealizada: 3450000, avancoFisico: 50.8, avancoFinanceiro: 48.5 },
  { mes: "Out/25", receitaPrevista: 3800000, receitaRealizada: 3650000, avancoFisico: 55.2, avancoFinanceiro: 52.8 },
  { mes: "Nov/25", receitaPrevista: 4000000, receitaRealizada: 3800000, avancoFisico: 60.5, avancoFinanceiro: 57.2 },
  { mes: "Dez/25", receitaPrevista: 4200000, receitaRealizada: 4050000, avancoFisico: 65.2, avancoFinanceiro: 60.8 },
  { mes: "Jan/26", receitaPrevista: 4000000, receitaRealizada: 3825000, avancoFisico: 67.8, avancoFinanceiro: 62.3 },
]

const performancePorEAP = [
  { eap: "Terraplenagem", previsto: 12500000, realizado: 11800000, percentual: 94.4, status: "ok" },
  { eap: "Pavimentacao", previsto: 8500000, realizado: 5100000, percentual: 60.0, status: "atencao" },
  { eap: "Drenagem", previsto: 4200000, realizado: 3950000, percentual: 94.0, status: "ok" },
  { eap: "OAE", previsto: 6800000, realizado: 2040000, percentual: 30.0, status: "atencao" },
  { eap: "Sinalizacao", previsto: 3500000, realizado: 1050000, percentual: 30.0, status: "atencao" },
]

const alertasReceita = [
  {
    tipo: "critico",
    titulo: "Receita abaixo da meta",
    descricao: "Receita acumulada 8.5% abaixo do planejado",
    impacto: "R$ 2.55 Mi",
  },
  {
    tipo: "atencao",
    titulo: "Taxa de conversao baixa",
    descricao: "10% dos servicos executados nao estao sendo remunerados",
    impacto: "R$ 425 mil",
  },
  {
    tipo: "info",
    titulo: "Prazo medio de recebimento",
    descricao: "2 dias acima da meta de 30 dias",
    impacto: "+6.7%",
  },
]

const comparativoMPxMC = [
  { mes: "Ago/25", mp: 3200000, mc: 3100000, diferenca: 100000 },
  { mes: "Set/25", mp: 3600000, mc: 3450000, diferenca: 150000 },
  { mes: "Out/25", mp: 3800000, mc: 3650000, diferenca: 150000 },
  { mes: "Nov/25", mp: 4100000, mc: 3800000, diferenca: 300000 },
  { mes: "Dez/25", mp: 4350000, mc: 4050000, diferenca: 300000 },
  { mes: "Jan/26", mp: 4250000, mc: 3825000, diferenca: 425000 },
]

function formatCurrency(value: number) {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)} Mi`
  }
  return `R$ ${(value / 1000).toFixed(0)} mil`
}

function formatCurrencyFull(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function ReceitaAnalyticsPage() {
  const [periodo, setPeriodo] = useState("6m")

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Analytics de Receita/Medicao</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  RM-06
                </Badge>
                <InfoTooltip content="Analise de performance e tendencias de receita e medicao" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Indicadores, tendencias e analises de performance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-32 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="12m">12 meses</SelectItem>
                <SelectItem value="total">Total</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* KPIs Principais */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Indicadores Principais
              </h2>
              <InfoTooltip content="KPIs de receita e medicao comparados com as metas" />
            </div>

            <div className="grid grid-cols-6 gap-3">
              {/* Receita Acumulada */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    {kpis.receitaAcumulada.variacao < 0 ? (
                      <Badge variant="destructive" className="text-[9px]">
                        <ArrowDownRight className="w-3 h-3" />
                        {kpis.receitaAcumulada.variacao}%
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary text-[9px]">
                        <ArrowUpRight className="w-3 h-3" />+{kpis.receitaAcumulada.variacao}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(kpis.receitaAcumulada.valor)}</p>
                  <p className="text-[10px] text-muted-foreground">Receita Acumulada</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Meta: {formatCurrency(kpis.receitaAcumulada.meta)}
                  </p>
                </CardContent>
              </Card>

              {/* Receita Mes */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    {kpis.receitaMes.variacao < 0 ? (
                      <Badge variant="destructive" className="text-[9px]">
                        <ArrowDownRight className="w-3 h-3" />
                        {kpis.receitaMes.variacao}%
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary text-[9px]">
                        <ArrowUpRight className="w-3 h-3" />+{kpis.receitaMes.variacao}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(kpis.receitaMes.valor)}</p>
                  <p className="text-[10px] text-muted-foreground">Receita Mes</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Meta: {formatCurrency(kpis.receitaMes.meta)}</p>
                </CardContent>
              </Card>

              {/* Avanco Fisico */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    {kpis.avancoFisico.variacao < 0 ? (
                      <Badge variant="destructive" className="text-[9px]">
                        <ArrowDownRight className="w-3 h-3" />
                        {kpis.avancoFisico.variacao}%
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary text-[9px]">
                        <ArrowUpRight className="w-3 h-3" />+{kpis.avancoFisico.variacao}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold tabular-nums">{kpis.avancoFisico.valor}%</p>
                  <p className="text-[10px] text-muted-foreground">Avanco Fisico</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Meta: {kpis.avancoFisico.meta}%</p>
                </CardContent>
              </Card>

              {/* Avanco Financeiro */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    {kpis.avancoFinanceiro.variacao < 0 ? (
                      <Badge variant="destructive" className="text-[9px]">
                        <ArrowDownRight className="w-3 h-3" />
                        {kpis.avancoFinanceiro.variacao}%
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary text-[9px]">
                        <ArrowUpRight className="w-3 h-3" />+{kpis.avancoFinanceiro.variacao}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold tabular-nums">{kpis.avancoFinanceiro.valor}%</p>
                  <p className="text-[10px] text-muted-foreground">Avanco Financeiro</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Meta: {kpis.avancoFinanceiro.meta}%</p>
                </CardContent>
              </Card>

              {/* Taxa de Conversao */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    {kpis.taxaConversao.variacao < 0 ? (
                      <Badge variant="destructive" className="text-[9px]">
                        <ArrowDownRight className="w-3 h-3" />
                        {kpis.taxaConversao.variacao}%
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary text-[9px]">
                        <ArrowUpRight className="w-3 h-3" />+{kpis.taxaConversao.variacao}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold tabular-nums">{kpis.taxaConversao.valor}%</p>
                  <p className="text-[10px] text-muted-foreground">Taxa Conversao MP→MC</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Meta: {kpis.taxaConversao.meta}%</p>
                </CardContent>
              </Card>

              {/* Dias Medio Recebimento */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {kpis.diasMedioRecebimento.variacao > 0 ? (
                      <Badge variant="destructive" className="text-[9px]">
                        <ArrowUpRight className="w-3 h-3" />+{kpis.diasMedioRecebimento.variacao}%
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary text-[9px]">
                        <ArrowDownRight className="w-3 h-3" />
                        {kpis.diasMedioRecebimento.variacao}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold tabular-nums">{kpis.diasMedioRecebimento.valor} dias</p>
                  <p className="text-[10px] text-muted-foreground">Prazo Medio Recebimento</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Meta: {kpis.diasMedioRecebimento.meta} dias</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Alertas */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Alertas de Performance
              </h2>
              <Badge variant="destructive" className="text-[10px]">
                {alertasReceita.filter((a) => a.tipo === "critico").length} criticos
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {alertasReceita.map((alerta, idx) => (
                <Card
                  key={idx}
                  className={`border-border/50 ${
                    alerta.tipo === "critico" ? "border-destructive/30 bg-destructive/5" : ""
                  } ${alerta.tipo === "atencao" ? "border-accent/30 bg-accent/5" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          alerta.tipo === "critico"
                            ? "bg-destructive/10"
                            : alerta.tipo === "atencao"
                              ? "bg-accent/10"
                              : "bg-muted/50"
                        }`}
                      >
                        <AlertTriangle
                          className={`w-4 h-4 ${
                            alerta.tipo === "critico"
                              ? "text-destructive"
                              : alerta.tipo === "atencao"
                                ? "text-accent-foreground"
                                : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{alerta.titulo}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{alerta.descricao}</p>
                        <Badge
                          variant="outline"
                          className={`mt-2 text-[10px] ${
                            alerta.tipo === "critico"
                              ? "border-destructive/30 text-destructive"
                              : alerta.tipo === "atencao"
                                ? "border-accent/30 text-accent-foreground"
                                : ""
                          }`}
                        >
                          Impacto: {alerta.impacto}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Evolucao Mensal */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Evolucao Mensal</h2>
              <InfoTooltip content="Evolucao da receita e avanco ao longo do tempo" />
            </div>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {evolucaoMensal.map((mes) => (
                    <div key={mes.mes} className="text-center">
                      <p className="text-[10px] text-muted-foreground mb-2">{mes.mes}</p>
                      <div className="space-y-1">
                        <div className="h-24 bg-muted/30 rounded relative flex flex-col justify-end">
                          <div
                            className="bg-primary/20 rounded-t"
                            style={{ height: `${(mes.receitaPrevista / 5000000) * 100}%` }}
                          />
                          <div
                            className="bg-primary absolute bottom-0 left-0 right-0 rounded-t"
                            style={{ height: `${(mes.receitaRealizada / 5000000) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] font-mono">{formatCurrency(mes.receitaRealizada)}</p>
                        <p className="text-[9px] text-muted-foreground">{mes.avancoFinanceiro}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary/20" />
                    <span className="text-[10px] text-muted-foreground">Previsto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span className="text-[10px] text-muted-foreground">Realizado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Performance por EAP e Comparativo MP x MC */}
          <div className="grid grid-cols-2 gap-6">
            {/* Performance por EAP */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Performance por EAP
                </h2>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-4 space-y-3">
                  {performancePorEAP.map((eap) => (
                    <div key={eap.eap} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{eap.eap}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatCurrency(eap.realizado)} / {formatCurrency(eap.previsto)}
                          </span>
                          {eap.status === "ok" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-accent-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full">
                          <div
                            className={`h-2 rounded-full ${eap.status === "ok" ? "bg-primary" : "bg-accent"}`}
                            style={{ width: `${eap.percentual}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono tabular-nums w-12 text-right">{eap.percentual}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Comparativo MP x MC */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Evolucao MP x MC
                </h2>
                <InfoTooltip content="Diferenca entre Medicao de Producao e Medicao do Cliente ao longo do tempo" />
              </div>

              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {comparativoMPxMC.map((mes) => (
                      <div key={mes.mes} className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground w-14">{mes.mes}</span>
                        <div className="flex-1 flex items-center gap-1">
                          <div className="flex-1 h-4 bg-muted/30 rounded relative">
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-primary/30 rounded"
                              style={{ width: `${(mes.mp / 5000000) * 100}%` }}
                            />
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-primary rounded"
                              style={{ width: `${(mes.mc / 5000000) * 100}%` }}
                            />
                          </div>
                        </div>
                        <Badge variant="destructive" className="text-[9px] w-20 justify-center">
                          -{formatCurrency(mes.diferenca)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 pt-3 mt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-primary/30" />
                      <span className="text-[10px] text-muted-foreground">MP (Producao)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span className="text-[10px] text-muted-foreground">MC (Cliente)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Totalizador */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Diferenca Acumulada (MP - MC)</p>
                    <p className="text-xs text-muted-foreground">
                      Total de receita executada nao remunerada pelo cliente
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent-foreground tabular-nums">
                    {formatCurrencyFull(comparativoMPxMC.reduce((acc, m) => acc + m.diferenca, 0))}
                  </p>
                  <Badge variant="destructive" className="text-[10px]">
                    Impacto: 4.8% da receita prevista
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
