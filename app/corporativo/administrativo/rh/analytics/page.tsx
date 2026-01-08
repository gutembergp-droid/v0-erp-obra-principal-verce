"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, UserMinus, Briefcase, Building2, TrendingDown, Download } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts"

// Dados mockados - Corporativo
const movimentacaoMensal = [
  { mes: "Jan", admissoes: 22, demissoes: 8 },
  { mes: "Fev", admissoes: 18, demissoes: 5 },
  { mes: "Mar", admissoes: 25, demissoes: 7 },
  { mes: "Abr", admissoes: 15, demissoes: 4 },
  { mes: "Mai", admissoes: 20, demissoes: 6 },
  { mes: "Jun", admissoes: 12, demissoes: 5 },
  { mes: "Jul", admissoes: 16, demissoes: 8 },
  { mes: "Ago", admissoes: 14, demissoes: 4 },
  { mes: "Set", admissoes: 18, demissoes: 6 },
  { mes: "Out", admissoes: 10, demissoes: 3 },
  { mes: "Nov", admissoes: 8, demissoes: 2 },
  { mes: "Dez", admissoes: 2, demissoes: 2 },
]

const distribuicaoSexo = [
  { name: "Masculino", value: 720, percent: 72 },
  { name: "Feminino", value: 280, percent: 28 },
]

const distribuicaoIdade = [
  { faixa: "18-25", quantidade: 180 },
  { faixa: "26-35", quantidade: 350 },
  { faixa: "36-45", quantidade: 280 },
  { faixa: "46-55", quantidade: 140 },
  { faixa: "56+", quantidade: 50 },
]

const distribuicaoContratacao = [
  { name: "CLT", value: 700, percent: 70 },
  { name: "PJ", value: 100, percent: 10 },
  { name: "Terceirizado", value: 200, percent: 20 },
]

const distribuicaoNivel = [
  { nivel: "Operacional", quantidade: 650 },
  { nivel: "Técnico", quantidade: 200 },
  { nivel: "Administrativo", quantidade: 100 },
  { nivel: "Gerencial", quantidade: 40 },
  { nivel: "Diretoria", quantidade: 10 },
]

const distribuicaoEstados = [
  { uf: "SP", quantidade: 320, percent: 32 },
  { uf: "RJ", quantidade: 180, percent: 18 },
  { uf: "MG", quantidade: 150, percent: 15 },
  { uf: "BA", quantidade: 120, percent: 12 },
  { uf: "PR", quantidade: 80, percent: 8 },
  { uf: "SC", quantidade: 60, percent: 6 },
  { uf: "RS", quantidade: 50, percent: 5 },
  { uf: "Outros", quantidade: 40, percent: 4 },
]

const COLORS_DONUT = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
const COLORS_SEXO = ["#3b82f6", "#ec4899"]
const COLORS_CONTRATO = ["#10b981", "#f59e0b", "#6366f1"]

function PeopleAnalyticsCorporativoContent() {
  const [periodo, setPeriodo] = useState("2024")
  const [mes, setMes] = useState("todos")

  const turnover = ((60 / 940) * 100).toFixed(1)

  return (
    <div className="flex-1 space-y-6 p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">RH Corporativo &gt; Analytics</p>
          <h1 className="text-2xl font-bold tracking-tight">People Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Visao estrategica do quadro de colaboradores</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mes} onValueChange={setMes}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os meses</SelectItem>
              <SelectItem value="01">Janeiro</SelectItem>
              <SelectItem value="02">Fevereiro</SelectItem>
              <SelectItem value="03">Marco</SelectItem>
              <SelectItem value="04">Abril</SelectItem>
              <SelectItem value="05">Maio</SelectItem>
              <SelectItem value="06">Junho</SelectItem>
              <SelectItem value="07">Julho</SelectItem>
              <SelectItem value="08">Agosto</SelectItem>
              <SelectItem value="09">Setembro</SelectItem>
              <SelectItem value="10">Outubro</SelectItem>
              <SelectItem value="11">Novembro</SelectItem>
              <SelectItem value="12">Dezembro</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cards Analiticos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Ativos</p>
                <p className="text-2xl font-bold">940</p>
                <p className="text-xs text-muted-foreground">de 1.000 total</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Admissoes</p>
                <p className="text-2xl font-bold text-green-500">+180</p>
                <p className="text-xs text-muted-foreground">no periodo</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Demissoes</p>
                <p className="text-2xl font-bold text-red-500">-60</p>
                <p className="text-xs text-muted-foreground">no periodo</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <UserMinus className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Turnover</p>
                <p className="text-2xl font-bold">{turnover}%</p>
                <p className="text-xs text-muted-foreground">anual</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Ef. Direto</p>
                <p className="text-2xl font-bold">750</p>
                <p className="text-xs text-muted-foreground">75%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Ef. Indireto</p>
                <p className="text-2xl font-bold">250</p>
                <p className="text-xs text-muted-foreground">25%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grafico Movimentacao */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Movimentacao Mensal</CardTitle>
          <p className="text-xs text-muted-foreground">Admissoes vs Demissoes por mes</p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={movimentacaoMensal}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="admissoes" name="Admissoes" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demissoes" name="Demissoes" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Graficos Perfil */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Sexo */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Distribuicao por Sexo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoSexo}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distribuicaoSexo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_SEXO[index % COLORS_SEXO.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {distribuicaoSexo.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS_SEXO[index] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.percent}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Faixa Etaria */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Distribuicao por Idade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribuicaoIdade} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    dataKey="faixa"
                    type="category"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="quantidade" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tipo Contratacao */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tipo de Contratacao</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoContratacao}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distribuicaoContratacao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_CONTRATO[index % COLORS_CONTRATO.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-3 mt-2 flex-wrap">
              {distribuicaoContratacao.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS_CONTRATO[index] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.percent}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nivel Hierarquico */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nivel Hierarquico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribuicaoNivel} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    dataKey="nivel"
                    type="category"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="quantidade" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuicao por Estado */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Distribuicao por Estado</CardTitle>
          <p className="text-xs text-muted-foreground">Quantidade de colaboradores por UF</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribuicaoEstados}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="uf" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="quantidade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {distribuicaoEstados.map((item, index) => (
                <div
                  key={item.uf}
                  className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-10 justify-center text-xs">
                      {item.uf}
                    </Badge>
                    <span className="text-sm">{item.quantidade} pessoas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rodape informativo */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
        <span>Dados atualizados em tempo real</span>
        <span>People Analytics — Visao Corporativa</span>
      </div>
    </div>
  )
}

export default function PeopleAnalyticsCorporativoPage() {
  return (
    <Suspense fallback={null}>
      <PeopleAnalyticsCorporativoContent />
    </Suspense>
  )
}
