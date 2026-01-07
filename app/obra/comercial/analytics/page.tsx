"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  RadialBarChart,
  RadialBar,
} from "recharts"

// Dados da Curva S
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

// Dados de Desvio Mensal
const desvioMensal = [
  { mes: "Jul", fisico: -0.2, financeiro: -0.5 },
  { mes: "Ago", fisico: -0.8, financeiro: -0.2 },
  { mes: "Set", fisico: -1.5, financeiro: 2.1 },
  { mes: "Out", fisico: -2.0, financeiro: 3.5 },
  { mes: "Nov", fisico: -1.8, financeiro: 4.0 },
  { mes: "Dez", fisico: -2.7, financeiro: 2.7 },
]

// Dados de Indicadores
const indicadores = {
  idp: { valor: 0.94, meta: 1.0, status: "atencao" },
  idc: { valor: 0.91, meta: 1.0, status: "critico" },
  avancoFisico: { valor: 42.3, previsto: 45.0, desvio: -2.7 },
  avancoFinanceiro: { valor: 51.2, previsto: 48.5, desvio: 2.7 },
}

// Dados para Gauge
const gaugeData = [
  { name: "IDP", value: 94, fill: "hsl(var(--warning))" },
  { name: "IDC", value: 91, fill: "hsl(var(--destructive))" },
]

export default function AnalyticsObraPage() {
  const [periodo, setPeriodo] = useState("acumulado")

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics da Obra</h1>
            <p className="text-sm text-muted-foreground">Dashboard de indicadores e performance</p>
          </div>
          <InfoTooltip
            title="Analytics da Obra"
            description="Painel consolidado com Curva S, IDP, IDC e analise de desvios."
          />
        </div>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mensal">Mensal</SelectItem>
            <SelectItem value="acumulado">Acumulado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs em Cards com Gauge */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          className={
            indicadores.idp.status === "critico"
              ? "border-destructive/50"
              : indicadores.idp.status === "atencao"
                ? "border-warning/50"
                : ""
          }
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">IDP (Prazo)</p>
              {indicadores.idp.valor >= 1 ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-warning" />
              )}
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">{indicadores.idp.valor.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mb-1">/ {indicadores.idp.meta}</p>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${indicadores.idp.valor >= 1 ? "bg-success" : indicadores.idp.valor >= 0.95 ? "bg-warning" : "bg-destructive"}`}
                style={{ width: `${indicadores.idp.valor * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className={
            indicadores.idc.status === "critico"
              ? "border-destructive/50"
              : indicadores.idc.status === "atencao"
                ? "border-warning/50"
                : ""
          }
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">IDC (Custo)</p>
              {indicadores.idc.valor >= 1 ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-destructive" />
              )}
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">{indicadores.idc.valor.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mb-1">/ {indicadores.idc.meta}</p>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${indicadores.idc.valor >= 1 ? "bg-success" : indicadores.idc.valor >= 0.95 ? "bg-warning" : "bg-destructive"}`}
                style={{ width: `${indicadores.idc.valor * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Avanco Fisico</p>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">{indicadores.avancoFisico.valor}%</p>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <ArrowDownRight className="w-3 h-3" />
              <span>{indicadores.avancoFisico.desvio}% vs previsto</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Avanco Financeiro</p>
              <DollarSign className="w-4 h-4 text-warning" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">{indicadores.avancoFinanceiro.valor}%</p>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{indicadores.avancoFinanceiro.desvio}% vs previsto</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Curva S Principal */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Curva S - Fisico x Financeiro
            </CardTitle>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary" />
                <span className="text-muted-foreground">Fisico Plj</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary/50 border-dashed border-b border-primary" />
                <span className="text-muted-foreground">Fisico Real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-info" />
                <span className="text-muted-foreground">Fin Plj</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-info/50 border-dashed border-b border-info" />
                <span className="text-muted-foreground">Fin Real</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={curvaSData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={100} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />

                {/* Fisico Planejado */}
                <Line
                  type="monotone"
                  dataKey="fisicoPlj"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  name="Fisico Planejado"
                />
                {/* Fisico Realizado */}
                <Line
                  type="monotone"
                  dataKey="fisicoReal"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  name="Fisico Realizado"
                  connectNulls={false}
                />
                {/* Financeiro Planejado */}
                <Line
                  type="monotone"
                  dataKey="finPlj"
                  stroke="hsl(var(--info))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--info))", r: 4 }}
                  name="Financeiro Planejado"
                />
                {/* Financeiro Realizado */}
                <Line
                  type="monotone"
                  dataKey="finReal"
                  stroke="hsl(var(--info))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--info))", r: 4 }}
                  name="Financeiro Realizado"
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Analise de Desvios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Grafico de Desvio */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-destructive" />
              Desvio Mensal (Realizado - Previsto)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={desvioMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
                  <Area
                    type="monotone"
                    dataKey="fisico"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.3)"
                    name="Desvio Fisico"
                  />
                  <Area
                    type="monotone"
                    dataKey="financeiro"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive) / 0.3)"
                    name="Desvio Financeiro"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gauge IDP/IDC */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Indices de Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="40%"
                  outerRadius="100%"
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                  <Tooltip formatter={(value) => `${value}%`} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-2xl font-bold text-foreground">0.94</span>
                </div>
                <p className="text-xs text-muted-foreground">IDP (Prazo)</p>
                <Badge variant="outline" className="mt-1 bg-warning/10 text-warning border-warning/20 text-xs">
                  Atencao
                </Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-2xl font-bold text-foreground">0.91</span>
                </div>
                <p className="text-xs text-muted-foreground">IDC (Custo)</p>
                <Badge
                  variant="outline"
                  className="mt-1 bg-destructive/10 text-destructive border-destructive/20 text-xs"
                >
                  Critico
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analise Textual */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Analise de Riscos</p>
              <p className="text-sm text-muted-foreground mt-1">
                O projeto apresenta desvio negativo no avanco fisico (-2.7%) e positivo no financeiro (+2.7%), indicando
                que o custo esta avancando mais rapido que a producao. O IDC de 0.91 requer atencao imediata para evitar
                estouro de orcamento. Recomenda-se revisar a produtividade das frentes e negociar medicoes pendentes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
