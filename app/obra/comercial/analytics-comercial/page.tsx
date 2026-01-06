"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  DollarSign,
  Activity,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  X,
  Minus,
} from "lucide-react"

// Dados mockados
const previstoRealizadoData = {
  fisico: { previsto: 45.0, realizado: 42.3, variacao: -2.7, tendencia: "atencao" },
  financeiro: { previsto: 48.5, realizado: 51.2, variacao: +2.7, tendencia: "critico" },
}

const curvaSData = [
  { mes: "Jul/24", fisicoPlj: 5, fisicoReal: 4.8, finPlj: 6, finReal: 5.5 },
  { mes: "Ago/24", fisicoPlj: 12, fisicoReal: 11.2, finPlj: 14, finReal: 13.8 },
  { mes: "Set/24", fisicoPlj: 20, fisicoReal: 18.5, finPlj: 22, finReal: 24.1 },
  { mes: "Out/24", fisicoPlj: 28, fisicoReal: 26.0, finPlj: 30, finReal: 33.5 },
  { mes: "Nov/24", fisicoPlj: 36, fisicoReal: 34.2, finPlj: 38, finReal: 42.0 },
  { mes: "Dez/24", fisicoPlj: 45, fisicoReal: 42.3, finPlj: 48.5, finReal: 51.2 },
  { mes: "Jan/25", fisicoPlj: 55, fisicoReal: null, finPlj: 58, finReal: null },
  { mes: "Fev/25", fisicoPlj: 65, fisicoReal: null, finPlj: 68, finReal: null },
  { mes: "Mar/25", fisicoPlj: 75, fisicoReal: null, finPlj: 78, finReal: null },
  { mes: "Abr/25", fisicoPlj: 85, fisicoReal: null, finPlj: 88, finReal: null },
  { mes: "Mai/25", fisicoPlj: 95, fisicoReal: null, finPlj: 96, finReal: null },
  { mes: "Jun/25", fisicoPlj: 100, fisicoReal: null, finPlj: 100, finReal: null },
]

const margemEficiencia = {
  margemBruta: { valor: 18.5, meta: 22.0, status: "atencao" },
  margemOperacional: { valor: 12.3, meta: 15.0, status: "atencao" },
  fcd: { valor: 94.0, meta: 100.0, status: "ok" },
  cpi: { valor: 0.92, meta: 1.0, status: "atencao" },
  spi: { valor: 0.94, meta: 1.0, status: "atencao" },
}

const impactosMudanca = {
  aprovado: { qtd: 8, valor: 2450000 },
  negociacao: { qtd: 5, valor: 1870000 },
  rejeitado: { qtd: 3, valor: 680000 },
  impactoEstimado: { receita: 4320000, custo: 3150000, margem: 1170000 },
}

const detalhamentoServicos = [
  { servico: "Terraplanagem", fisicoPlj: 85, fisicoReal: 82, finPlj: 8500000, finReal: 8750000, variacao: "+2.9%" },
  { servico: "Drenagem", fisicoPlj: 60, fisicoReal: 55, finPlj: 6200000, finReal: 5980000, variacao: "-3.5%" },
  { servico: "Pavimentacao", fisicoPlj: 25, fisicoReal: 22, finPlj: 12500000, finReal: 13200000, variacao: "+5.6%" },
  { servico: "OAE - Pontes", fisicoPlj: 40, fisicoReal: 38, finPlj: 9800000, finReal: 10100000, variacao: "+3.1%" },
  { servico: "Sinalizacao", fisicoPlj: 15, fisicoReal: 12, finPlj: 3200000, finReal: 3150000, variacao: "-1.6%" },
]

export default function AnalyticsComercialPage() {
  const [competencia, setCompetencia] = useState("dez-2024")
  const [periodo, setPeriodo] = useState("acumulado")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [panelType, setPanelType] = useState<string>("")

  const openPanel = (item: any, type: string) => {
    setSelectedItem(item)
    setPanelType(type)
  }

  const closePanel = () => {
    setSelectedItem(null)
    setPanelType("")
  }

  const getTendenciaIcon = (tendencia: string) => {
    if (tendencia === "ok") return <TrendingUp className="w-4 h-4 text-primary" />
    if (tendencia === "atencao") return <Minus className="w-4 h-4 text-accent-foreground" />
    return <TrendingDown className="w-4 h-4 text-destructive" />
  }

  const getStatusBadge = (status: string) => {
    if (status === "ok")
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          OK
        </Badge>
      )
    if (status === "atencao")
      return (
        <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
          Atencao
        </Badge>
      )
    return (
      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
        Critico
      </Badge>
    )
  }

  // Calculo para grafico simplificado (barras)
  const maxValue = 100
  const getBarWidth = (value: number | null) => (value ? `${(value / maxValue) * 100}%` : "0%")

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Analytics Comercial</h1>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                AC-01
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Desempenho comercial consolidado do contrato</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="acumulado">Acumulado</SelectItem>
                <SelectItem value="projecao">Projecao</SelectItem>
              </SelectContent>
            </Select>
            <Select value={competencia} onValueChange={setCompetencia}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dez-2024">Dez/2024</SelectItem>
                <SelectItem value="nov-2024">Nov/2024</SelectItem>
                <SelectItem value="out-2024">Out/2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bloco 1: Previsto x Realizado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => openPanel(previstoRealizadoData.fisico, "fisico")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Avanco Fisico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">{previstoRealizadoData.fisico.realizado}%</div>
                  <div className="text-sm text-muted-foreground">
                    Previsto: {previstoRealizadoData.fisico.previsto}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${previstoRealizadoData.fisico.variacao < 0 ? "text-destructive" : "text-primary"}`}
                  >
                    {previstoRealizadoData.fisico.variacao > 0 ? "+" : ""}
                    {previstoRealizadoData.fisico.variacao}%
                  </span>
                  {getTendenciaIcon(previstoRealizadoData.fisico.tendencia)}
                </div>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/30 rounded-full"
                  style={{ width: `${previstoRealizadoData.fisico.previsto}%` }}
                >
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(previstoRealizadoData.fisico.realizado / previstoRealizadoData.fisico.previsto) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => openPanel(previstoRealizadoData.financeiro, "financeiro")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Avanco Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {previstoRealizadoData.financeiro.realizado}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Previsto: {previstoRealizadoData.financeiro.previsto}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${previstoRealizadoData.financeiro.variacao > 0 ? "text-destructive" : "text-primary"}`}
                  >
                    {previstoRealizadoData.financeiro.variacao > 0 ? "+" : ""}
                    {previstoRealizadoData.financeiro.variacao}%
                  </span>
                  {getTendenciaIcon(previstoRealizadoData.financeiro.tendencia)}
                </div>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive/30 rounded-full"
                  style={{ width: `${previstoRealizadoData.financeiro.realizado}%` }}
                >
                  <div
                    className="h-full bg-destructive rounded-full"
                    style={{
                      width: `${(previstoRealizadoData.financeiro.previsto / previstoRealizadoData.financeiro.realizado) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bloco 2: Curva S Integrada */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Curva S Integrada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Legenda */}
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span>Fisico Planejado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary/50" />
                  <span>Fisico Realizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-foreground" />
                  <span>Financeiro Planejado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-foreground/50" />
                  <span>Financeiro Realizado</span>
                </div>
              </div>

              {/* Grafico simplificado em barras */}
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-12 gap-1 text-xs">
                    {curvaSData.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="h-24 flex flex-col justify-end gap-0.5">
                          <div
                            className="bg-primary rounded-t"
                            style={{ height: `${item.fisicoPlj}%` }}
                            title={`Fisico Plj: ${item.fisicoPlj}%`}
                          />
                          {item.fisicoReal && (
                            <div
                              className="bg-primary/50 rounded-t -mt-1 ml-1"
                              style={{ height: `${item.fisicoReal}%` }}
                              title={`Fisico Real: ${item.fisicoReal}%`}
                            />
                          )}
                        </div>
                        <div className="text-center text-muted-foreground truncate">{item.mes.slice(0, 3)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabela resumo */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">Mes</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Fisico Plj</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Fisico Real</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Fin Plj</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Fin Real</th>
                    </tr>
                  </thead>
                  <tbody>
                    {curvaSData.slice(0, 6).map((item, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="py-2 text-foreground">{item.mes}</td>
                        <td className="py-2 text-right text-foreground">{item.fisicoPlj}%</td>
                        <td className="py-2 text-right text-foreground">{item.fisicoReal ?? "-"}%</td>
                        <td className="py-2 text-right text-foreground">{item.finPlj}%</td>
                        <td className="py-2 text-right text-foreground">{item.finReal ?? "-"}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bloco 3: Margem e Eficiencia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Margem e Eficiencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openPanel(margemEficiencia.margemBruta, "margem-bruta")}
                >
                  <div>
                    <div className="text-sm text-muted-foreground">Margem Bruta</div>
                    <div className="text-xl font-bold text-foreground">{margemEficiencia.margemBruta.valor}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.margemBruta.meta}%</div>
                    {getStatusBadge(margemEficiencia.margemBruta.status)}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openPanel(margemEficiencia.margemOperacional, "margem-operacional")}
                >
                  <div>
                    <div className="text-sm text-muted-foreground">Margem Operacional</div>
                    <div className="text-xl font-bold text-foreground">{margemEficiencia.margemOperacional.valor}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      Meta: {margemEficiencia.margemOperacional.meta}%
                    </div>
                    {getStatusBadge(margemEficiencia.margemOperacional.status)}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openPanel(margemEficiencia.fcd, "fcd")}
                >
                  <div>
                    <div className="text-sm text-muted-foreground">F/CD (Faturado/Custo Direto)</div>
                    <div className="text-xl font-bold text-foreground">{margemEficiencia.fcd.valor}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.fcd.meta}%</div>
                    {getStatusBadge(margemEficiencia.fcd.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => openPanel(margemEficiencia.cpi, "cpi")}
                  >
                    <div className="text-sm text-muted-foreground">CPI</div>
                    <div className="text-xl font-bold text-foreground">{margemEficiencia.cpi.valor}</div>
                    <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.cpi.meta}</div>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => openPanel(margemEficiencia.spi, "spi")}
                  >
                    <div className="text-sm text-muted-foreground">SPI</div>
                    <div className="text-xl font-bold text-foreground">{margemEficiencia.spi.valor}</div>
                    <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.spi.meta}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bloco 4: Impactos de Mudanca */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Impactos de Mudanca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors text-center"
                    onClick={() => openPanel({ tipo: "aprovado", ...impactosMudanca.aprovado }, "mudanca")}
                  >
                    <CheckCircle className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Aprovados</div>
                    <div className="text-lg font-bold text-foreground">{impactosMudanca.aprovado.qtd}</div>
                    <div className="text-xs text-muted-foreground">
                      R$ {(impactosMudanca.aprovado.valor / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors text-center"
                    onClick={() => openPanel({ tipo: "negociacao", ...impactosMudanca.negociacao }, "mudanca")}
                  >
                    <Clock className="w-5 h-5 text-accent-foreground mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Em Negociacao</div>
                    <div className="text-lg font-bold text-foreground">{impactosMudanca.negociacao.qtd}</div>
                    <div className="text-xs text-muted-foreground">
                      R$ {(impactosMudanca.negociacao.valor / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors text-center"
                    onClick={() => openPanel({ tipo: "rejeitado", ...impactosMudanca.rejeitado }, "mudanca")}
                  >
                    <XCircle className="w-5 h-5 text-destructive mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Rejeitados</div>
                    <div className="text-lg font-bold text-foreground">{impactosMudanca.rejeitado.qtd}</div>
                    <div className="text-xs text-muted-foreground">
                      R$ {(impactosMudanca.rejeitado.valor / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="text-sm font-medium text-foreground mb-3">Impacto Estimado no Contrato</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Receita Adicional</span>
                      <span className="text-sm font-medium text-primary">
                        +R$ {(impactosMudanca.impactoEstimado.receita / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Custo Adicional</span>
                      <span className="text-sm font-medium text-destructive">
                        -R$ {(impactosMudanca.impactoEstimado.custo / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-sm font-medium text-foreground">Margem Estimada</span>
                      <span className="text-sm font-bold text-primary">
                        +R$ {(impactosMudanca.impactoEstimado.margem / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Change Control (RM-05)
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bloco 5: Detalhamento por Servico */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Detalhamento por Servico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-muted-foreground">Servico</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Fisico Plj</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Fisico Real</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Fin Planejado</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Fin Realizado</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Variacao</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {detalhamentoServicos.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 text-foreground font-medium">{item.servico}</td>
                      <td className="py-3 text-right text-foreground">{item.fisicoPlj}%</td>
                      <td className="py-3 text-right text-foreground">{item.fisicoReal}%</td>
                      <td className="py-3 text-right text-foreground">R$ {(item.finPlj / 1000000).toFixed(1)}M</td>
                      <td className="py-3 text-right text-foreground">R$ {(item.finReal / 1000000).toFixed(1)}M</td>
                      <td
                        className={`py-3 text-right font-medium ${item.variacao.startsWith("+") ? "text-destructive" : "text-primary"}`}
                      >
                        {item.variacao}
                      </td>
                      <td className="py-3 text-center">
                        <Button variant="ghost" size="sm" onClick={() => openPanel(item, "servico")}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Navegacao */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                RM-01 Receita & Medicao
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="sm">
                CM-01 Custo & Meta
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="sm">
                RM-05 Change Control
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel Lateral */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={closePanel} />
          <div className="relative w-full max-w-md bg-background border-l border-border shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {panelType === "fisico" && "Detalhe Avanco Fisico"}
                {panelType === "financeiro" && "Detalhe Avanco Financeiro"}
                {panelType === "servico" && `Detalhe: ${selectedItem.servico}`}
                {panelType === "mudanca" &&
                  `Mudancas ${selectedItem.tipo === "aprovado" ? "Aprovadas" : selectedItem.tipo === "negociacao" ? "Em Negociacao" : "Rejeitadas"}`}
                {panelType.startsWith("margem") && "Analise de Margem"}
                {panelType === "cpi" && "Cost Performance Index"}
                {panelType === "spi" && "Schedule Performance Index"}
                {panelType === "fcd" && "Faturado / Custo Direto"}
              </h3>
              <Button variant="ghost" size="icon" onClick={closePanel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {panelType === "servico" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-xs text-muted-foreground">Fisico Planejado</div>
                      <div className="text-lg font-bold text-foreground">{selectedItem.fisicoPlj}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-xs text-muted-foreground">Fisico Realizado</div>
                      <div className="text-lg font-bold text-foreground">{selectedItem.fisicoReal}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-xs text-muted-foreground">Financeiro Planejado</div>
                      <div className="text-lg font-bold text-foreground">
                        R$ {(selectedItem.finPlj / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-xs text-muted-foreground">Financeiro Realizado</div>
                      <div className="text-lg font-bold text-foreground">
                        R$ {(selectedItem.finReal / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground mb-2">Analise</div>
                    <p className="text-sm text-muted-foreground">
                      O servico {selectedItem.servico} apresenta variacao de {selectedItem.variacao} no custo realizado.
                      {selectedItem.variacao.startsWith("+")
                        ? " E necessario avaliar os motivos do estouro e definir acoes corretivas."
                        : " O desempenho esta dentro do esperado ou abaixo do orcado."}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Ver CM-02
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Ver RM-02
                    </Button>
                  </div>
                </>
              )}

              {(panelType === "fisico" || panelType === "financeiro") && (
                <>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="text-sm text-muted-foreground mb-1">
                      {panelType === "fisico" ? "Avanco Fisico" : "Avanco Financeiro"}
                    </div>
                    <div className="text-3xl font-bold text-foreground">{selectedItem.realizado}%</div>
                    <div className="text-sm text-muted-foreground">Previsto: {selectedItem.previsto}%</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground mb-2">Interpretacao</div>
                    <p className="text-sm text-muted-foreground">
                      {panelType === "fisico"
                        ? "O avanco fisico esta 2.7% abaixo do previsto. Recomenda-se avaliar gargalos de producao e recursos."
                        : "O avanco financeiro esta 2.7% acima do previsto. Ha indicios de custo acima do planejado que precisam ser investigados."}
                    </p>
                  </div>
                </>
              )}

              {panelType === "mudanca" && (
                <>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="text-sm text-muted-foreground">Quantidade</div>
                    <div className="text-3xl font-bold text-foreground">{selectedItem.qtd}</div>
                    <div className="text-sm text-muted-foreground">
                      Valor Total: R$ {(selectedItem.valor / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground mb-2">Acoes</div>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.tipo === "aprovado" &&
                        "Mudancas aprovadas devem ser refletidas na medicao e faturamento."}
                      {selectedItem.tipo === "negociacao" && "Acompanhar negociacao com cliente para definicao."}
                      {selectedItem.tipo === "rejeitado" &&
                        "Registrar como licao aprendida e avaliar impacto no resultado."}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Ver Change Control (RM-05)
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
