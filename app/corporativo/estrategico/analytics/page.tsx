"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Users,
  Building,
  DollarSign,
  Target,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
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
  Legend,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts"

// Dados mockados
const obrasData = [
  { nome: "BR-101 Lote 2", avanco: 67, idp: 0.98, idc: 1.02, valor: 405, status: "normal" },
  { nome: "BR-116 Lote 5", avanco: 45, idp: 0.92, idc: 0.95, valor: 280, status: "atencao" },
  { nome: "BR-040 Lote 1", avanco: 82, idp: 1.05, idc: 1.08, valor: 520, status: "otimo" },
  { nome: "BR-153 Lote 3", avanco: 23, idp: 0.88, idc: 0.91, valor: 180, status: "critico" },
  { nome: "BR-381 Lote 4", avanco: 55, idp: 1.0, idc: 0.98, valor: 320, status: "normal" },
]

const evolucaoMensal = [
  { mes: "Jul", receita: 45, custo: 42, margem: 3 },
  { mes: "Ago", receita: 52, custo: 48, margem: 4 },
  { mes: "Set", receita: 61, custo: 55, margem: 6 },
  { mes: "Out", receita: 58, custo: 54, margem: 4 },
  { mes: "Nov", receita: 72, custo: 65, margem: 7 },
  { mes: "Dez", receita: 68, custo: 62, margem: 6 },
]

const distribuicaoStatus = [
  { name: "No Prazo", value: 3, color: "hsl(var(--success))" },
  { name: "Atencao", value: 1, color: "hsl(var(--warning))" },
  { name: "Critico", value: 1, color: "hsl(var(--destructive))" },
]

const performanceGeral = [
  { name: "IDP Medio", value: 0.97, fill: "hsl(var(--primary))" },
  { name: "IDC Medio", value: 0.99, fill: "hsl(var(--info))" },
]

const colaboradoresPorObra = [
  { obra: "BR-101", efetivo: 245 },
  { obra: "BR-116", efetivo: 180 },
  { obra: "BR-040", efetivo: 320 },
  { obra: "BR-153", efetivo: 95 },
  { obra: "BR-381", efetivo: 210 },
]

export default function AnalyticsCorporativoPage() {
  const [periodo, setPeriodo] = useState("2024")

  const totalReceita = evolucaoMensal.reduce((acc, item) => acc + item.receita, 0)
  const totalCusto = evolucaoMensal.reduce((acc, item) => acc + item.custo, 0)
  const totalMargem = totalReceita - totalCusto
  const margemPercent = ((totalMargem / totalReceita) * 100).toFixed(1)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: R$ {entry.value}M
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics Corporativo</h1>
              <p className="text-sm text-muted-foreground">Visao consolidada de todas as operacoes</p>
            </div>
            <InfoTooltip
              title="Analytics Corporativo"
              description="Dashboard executivo com KPIs consolidados de todas as obras."
            />
          </div>
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Obras Ativas</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight className="w-3 h-3" />
                <span>+2 vs 2023</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Colaboradores</p>
                  <p className="text-2xl font-bold text-foreground">1.050</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-info" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight className="w-3 h-3" />
                <span>+15% vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold text-foreground">R$ {totalReceita}M</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight className="w-3 h-3" />
                <span>+8% vs meta</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Margem Global</p>
                  <p className="text-2xl font-bold text-foreground">{margemPercent}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-warning" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                <ArrowDownRight className="w-3 h-3" />
                <span>-1.2% vs meta</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Evolucao Receita x Custo */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Evolucao Receita x Custo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={evolucaoMensal}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="margem"
                      fill="hsl(var(--success) / 0.2)"
                      stroke="hsl(var(--success))"
                      name="Margem"
                    />
                    <Bar dataKey="receita" fill="hsl(var(--primary))" name="Receita" radius={[4, 4, 0, 0]} />
                    <Line
                      type="monotone"
                      dataKey="custo"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--destructive))" }}
                      name="Custo"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribuicao por Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Status das Obras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribuicaoStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distribuicaoStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {distribuicaoStatus.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance e Efetivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Efetivo por Obra */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Efetivo por Obra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={colaboradoresPorObra} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis
                      dataKey="obra"
                      type="category"
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      width={60}
                    />
                    <Tooltip />
                    <Bar dataKey="efetivo" fill="hsl(var(--info))" radius={[0, 4, 4, 0]} name="Colaboradores" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Indicadores de Performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Performance Media (IDP/IDC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="90%"
                    data={performanceGeral}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                    <Tooltip />
                    <Legend />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">0.97</p>
                  <p className="text-xs text-muted-foreground">IDP Medio</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-info">0.99</p>
                  <p className="text-xs text-muted-foreground">IDC Medio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking de Obras */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Ranking de Performance das Obras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-muted-foreground">Obra</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">Avanco</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">IDP</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">IDC</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Valor (M)</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 font-medium text-muted-foreground">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {obrasData
                    .sort((a, b) => b.idp * b.idc - a.idp * a.idc)
                    .map((obra, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 text-foreground font-medium">{obra.nome}</td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${obra.avanco}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{obra.avanco}%</span>
                          </div>
                        </td>
                        <td
                          className={`py-3 text-center font-medium ${obra.idp >= 1 ? "text-success" : obra.idp >= 0.95 ? "text-warning" : "text-destructive"}`}
                        >
                          {obra.idp.toFixed(2)}
                        </td>
                        <td
                          className={`py-3 text-center font-medium ${obra.idc >= 1 ? "text-success" : obra.idc >= 0.95 ? "text-warning" : "text-destructive"}`}
                        >
                          {obra.idc.toFixed(2)}
                        </td>
                        <td className="py-3 text-right text-foreground">R$ {obra.valor}</td>
                        <td className="py-3 text-center">
                          <Badge
                            variant="outline"
                            className={
                              obra.status === "otimo"
                                ? "bg-success/10 text-success border-success/20"
                                : obra.status === "normal"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : obra.status === "atencao"
                                    ? "bg-warning/10 text-warning border-warning/20"
                                    : "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {obra.status === "otimo"
                              ? "Otimo"
                              : obra.status === "normal"
                                ? "Normal"
                                : obra.status === "atencao"
                                  ? "Atencao"
                                  : "Critico"}
                          </Badge>
                        </td>
                        <td className="py-3 text-center">
                          <Button variant="ghost" size="sm">
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
      </div>
    </AppLayout>
  )
}
