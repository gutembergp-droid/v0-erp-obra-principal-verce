"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
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
  AlertTriangle,
} from "lucide-react"
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

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
  { servico: "Terraplanagem", fisicoPlj: 85, fisicoReal: 82, finPlj: 8500000, finReal: 8750000, variacao: 2.9 },
  { servico: "Drenagem", fisicoPlj: 60, fisicoReal: 55, finPlj: 6200000, finReal: 5980000, variacao: -3.5 },
  { servico: "Pavimentacao", fisicoPlj: 25, fisicoReal: 22, finPlj: 12500000, finReal: 13200000, variacao: 5.6 },
  { servico: "OAE - Pontes", fisicoPlj: 40, fisicoReal: 38, finPlj: 9800000, finReal: 10100000, variacao: 3.1 },
  { servico: "Sinalizacao", fisicoPlj: 15, fisicoReal: 12, finPlj: 3200000, finReal: 3150000, variacao: -1.6 },
]

const distribuicaoMudancas = [
  { name: "Aprovados", value: 8, color: "hsl(var(--success))" },
  { name: "Em Negociacao", value: 5, color: "hsl(var(--warning))" },
  { name: "Rejeitados", value: 3, color: "hsl(var(--destructive))" },
]

const margemPorServico = detalhamentoServicos.map((s) => ({
  servico: s.servico.slice(0, 8),
  planejado: s.finPlj / 1000000,
  realizado: s.finReal / 1000000,
  variacao: s.variacao,
}))

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === "number" ? entry.value.toFixed(1) : entry.value}
              {entry.name.includes("%") || entry.dataKey?.includes("Plj") || entry.dataKey?.includes("Real")
                ? "%"
                : "M"}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Componente CircularProgress para indicadores
  const CircularProgress = ({
    value,
    max,
    label,
    status,
  }: { value: number; max: number; label: string; status: string }) => {
    const percentage = (value / max) * 100
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    const color =
      status === "ok" ? "hsl(var(--success))" : status === "atencao" ? "hsl(var(--warning))" : "hsl(var(--destructive))"

    return (
      <div className="flex flex-col items-center">
        <svg width="100" height="100" className="-rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center" style={{ marginTop: "25px" }}>
          <span className="text-xl font-bold text-foreground">{value}%</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{label}</span>
      </div>
    )
  }

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

        {/* KPIs Principais com Graficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Avanco Fisico com Grafico */}
          <Card
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => openPanel(previstoRealizadoData.fisico, "fisico")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Avanco Fisico</span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    previstoRealizadoData.fisico.variacao < 0
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-success/10 text-success border-success/20"
                  }
                >
                  {previstoRealizadoData.fisico.variacao > 0 ? "+" : ""}
                  {previstoRealizadoData.fisico.variacao}%
                </Badge>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg width="80" height="80" className="-rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - previstoRealizadoData.fisico.realizado / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{previstoRealizadoData.fisico.realizado}%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Previsto</span>
                    <span className="font-medium text-foreground">{previstoRealizadoData.fisico.previsto}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Realizado</span>
                    <span className="font-medium text-foreground">{previstoRealizadoData.fisico.realizado}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(previstoRealizadoData.fisico.realizado / previstoRealizadoData.fisico.previsto) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Avanco Financeiro com Grafico */}
          <Card
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => openPanel(previstoRealizadoData.financeiro, "financeiro")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-muted-foreground">Avanco Financeiro</span>
                </div>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                  +{previstoRealizadoData.financeiro.variacao}%
                </Badge>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg width="80" height="80" className="-rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - previstoRealizadoData.financeiro.realizado / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">
                      {previstoRealizadoData.financeiro.realizado}%
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Previsto</span>
                    <span className="font-medium text-foreground">{previstoRealizadoData.financeiro.previsto}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Realizado</span>
                    <span className="font-medium text-foreground">{previstoRealizadoData.financeiro.realizado}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full"
                      style={{
                        width: `${Math.min((previstoRealizadoData.financeiro.realizado / previstoRealizadoData.financeiro.previsto) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curva S com Recharts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Curva S Integrada
              </CardTitle>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-primary" />
                  <span className="text-muted-foreground">Fisico Plj</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-primary/50" style={{ borderBottom: "2px dashed" }} />
                  <span className="text-muted-foreground">Fisico Real</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-info" />
                  <span className="text-muted-foreground">Fin Plj</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-info/50" style={{ borderBottom: "2px dashed" }} />
                  <span className="text-muted-foreground">Fin Real</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={curvaSData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="fisicoPlj"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Fisico Planejado"
                  />
                  <Line
                    type="monotone"
                    dataKey="fisicoReal"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    name="Fisico Realizado"
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="finPlj"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Financeiro Planejado"
                  />
                  <Line
                    type="monotone"
                    dataKey="finReal"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    name="Financeiro Realizado"
                    connectNulls={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Margem por Servico - Grafico de Barras */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Custo por Servico (R$ Milhoes)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={margemPorServico} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis
                      dataKey="servico"
                      type="category"
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      width={70}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="planejado" fill="hsl(var(--primary) / 0.5)" name="Planejado" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="realizado" fill="hsl(var(--primary))" name="Realizado" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Impactos de Mudanca - Grafico Pizza */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Impactos de Mudanca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-[180px] w-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distribuicaoMudancas}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {distribuicaoMudancas.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between p-2 rounded bg-success/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground">Aprovados</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-foreground">{impactosMudanca.aprovado.qtd}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        R$ {(impactosMudanca.aprovado.valor / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-warning/10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-warning" />
                      <span className="text-sm text-foreground">Negociacao</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-foreground">{impactosMudanca.negociacao.qtd}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        R$ {(impactosMudanca.negociacao.valor / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-destructive/10">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-foreground">Rejeitados</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-foreground">{impactosMudanca.rejeitado.qtd}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        R$ {(impactosMudanca.rejeitado.valor / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Indicadores de Eficiencia */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Indicadores de Margem e Eficiencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div
                className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => openPanel(margemEficiencia.margemBruta, "margem-bruta")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Margem Bruta</span>
                  {margemEficiencia.margemBruta.status === "ok" ? (
                    <CheckCircle className="w-3 h-3 text-success" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-warning" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground">{margemEficiencia.margemBruta.valor}%</div>
                <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.margemBruta.meta}%</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${margemEficiencia.margemBruta.valor >= margemEficiencia.margemBruta.meta ? "bg-success" : "bg-warning"}`}
                    style={{
                      width: `${(margemEficiencia.margemBruta.valor / margemEficiencia.margemBruta.meta) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => openPanel(margemEficiencia.margemOperacional, "margem-operacional")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Margem Operac.</span>
                  {margemEficiencia.margemOperacional.status === "ok" ? (
                    <CheckCircle className="w-3 h-3 text-success" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-warning" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground">{margemEficiencia.margemOperacional.valor}%</div>
                <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.margemOperacional.meta}%</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${margemEficiencia.margemOperacional.valor >= margemEficiencia.margemOperacional.meta ? "bg-success" : "bg-warning"}`}
                    style={{
                      width: `${(margemEficiencia.margemOperacional.valor / margemEficiencia.margemOperacional.meta) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => openPanel(margemEficiencia.fcd, "fcd")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">F/CD</span>
                  <CheckCircle className="w-3 h-3 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">{margemEficiencia.fcd.valor}%</div>
                <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.fcd.meta}%</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full"
                    style={{ width: `${(margemEficiencia.fcd.valor / margemEficiencia.fcd.meta) * 100}%` }}
                  />
                </div>
              </div>

              <div
                className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => openPanel(margemEficiencia.cpi, "cpi")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">CPI</span>
                  <AlertTriangle className="w-3 h-3 text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground">{margemEficiencia.cpi.valor}</div>
                <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.cpi.meta}</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: `${margemEficiencia.cpi.valor * 100}%` }}
                  />
                </div>
              </div>

              <div
                className="p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => openPanel(margemEficiencia.spi, "spi")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">SPI</span>
                  <AlertTriangle className="w-3 h-3 text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground">{margemEficiencia.spi.valor}</div>
                <div className="text-xs text-muted-foreground">Meta: {margemEficiencia.spi.meta}</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: `${margemEficiencia.spi.valor * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Servicos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
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
                    <th className="text-center py-3 font-medium text-muted-foreground">Fisico</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Fin Plj</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Fin Real</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Variacao</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {detalhamentoServicos.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 text-foreground font-medium">{item.servico}</td>
                      <td className="py-3">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${item.fisicoReal}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{item.fisicoReal}%</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-foreground">R$ {(item.finPlj / 1000000).toFixed(1)}M</td>
                      <td className="py-3 text-right text-foreground">R$ {(item.finReal / 1000000).toFixed(1)}M</td>
                      <td
                        className={`py-3 text-right font-medium ${item.variacao > 0 ? "text-destructive" : "text-success"}`}
                      >
                        {item.variacao > 0 ? "+" : ""}
                        {item.variacao}%
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
                      O servico {selectedItem.servico} apresenta variacao de {selectedItem.variacao > 0 ? "+" : ""}
                      {selectedItem.variacao}% no custo realizado.
                      {selectedItem.variacao > 0
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
