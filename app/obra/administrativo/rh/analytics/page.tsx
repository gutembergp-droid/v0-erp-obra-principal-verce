"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RHNav } from "@/components/rh/rh-nav"
import { Users, UserPlus, UserMinus, Briefcase, TrendingDown, Download, BarChart3, Scale } from "lucide-react"
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

// Dados mockados - Obra
const movimentacaoMensal = [
  { mes: "Jan", admissoes: 12, demissoes: 3 },
  { mes: "Fev", admissoes: 8, demissoes: 2 },
  { mes: "Mar", admissoes: 15, demissoes: 4 },
  { mes: "Abr", admissoes: 6, demissoes: 2 },
  { mes: "Mai", admissoes: 10, demissoes: 3 },
  { mes: "Jun", admissoes: 5, demissoes: 2 },
  { mes: "Jul", admissoes: 8, demissoes: 4 },
  { mes: "Ago", admissoes: 7, demissoes: 2 },
  { mes: "Set", admissoes: 9, demissoes: 3 },
  { mes: "Out", admissoes: 4, demissoes: 1 },
  { mes: "Nov", admissoes: 3, demissoes: 1 },
  { mes: "Dez", admissoes: 1, demissoes: 1 },
]

const distribuicaoSexo = [
  { name: "Masculino", value: 252, percent: 84 },
  { name: "Feminino", value: 48, percent: 16 },
]

const distribuicaoIdade = [
  { faixa: "18-25", quantidade: 60 },
  { faixa: "26-35", quantidade: 105 },
  { faixa: "36-45", quantidade: 80 },
  { faixa: "46-55", quantidade: 40 },
  { faixa: "56+", quantidade: 15 },
]

const distribuicaoContratacao = [
  { name: "CLT", value: 210, percent: 70 },
  { name: "PJ", value: 20, percent: 7 },
  { name: "Terceirizado", value: 70, percent: 23 },
]

const distribuicaoNivel = [
  { nivel: "Operacional", quantidade: 210 },
  { nivel: "Técnico", quantidade: 50 },
  { nivel: "Administrativo", quantidade: 25 },
  { nivel: "Gerencial", quantidade: 12 },
  { nivel: "Diretoria", quantidade: 3 },
]

const distribuicaoSetor = [
  { setor: "Terraplenagem", quantidade: 85, percent: 28 },
  { setor: "Pavimentacao", quantidade: 65, percent: 22 },
  { setor: "Drenagem", quantidade: 45, percent: 15 },
  { setor: "OAE", quantidade: 40, percent: 13 },
  { setor: "Sinalizacao", quantidade: 25, percent: 8 },
  { setor: "Administrativo", quantidade: 25, percent: 8 },
  { setor: "Apoio", quantidade: 15, percent: 5 },
]

const COLORS_SEXO = ["#3b82f6", "#ec4899"]
const COLORS_CONTRATO = ["#10b981", "#f59e0b", "#6366f1"]
const COLORS_SETOR = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6366f1", "#64748b"]

function PeopleAnalyticsObraContent() {
  const [periodo, setPeriodo] = useState("2024")
  const [mes, setMes] = useState("todos")

  const turnover = ((28 / 300) * 100).toFixed(1)
  const riscoJuridicoAgregado = 3

  return (
    <div className="flex-1 space-y-6 p-6 bg-background min-h-screen">
      {/* Header */}
      <RHNav modulo="obra" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">People Analytics</h1>
            <p className="text-sm text-muted-foreground">Visao analitica do quadro da obra (somente leitura)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cards Analiticos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Pessoas</p>
                <p className="text-2xl font-bold">300</p>
              </div>
              <Users className="h-8 w-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-400 uppercase">Admissoes</p>
                <p className="text-2xl font-bold text-green-500">+88</p>
              </div>
              <UserPlus className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-400 uppercase">Demissoes</p>
                <p className="text-2xl font-bold text-red-500">-28</p>
              </div>
              <UserMinus className="h-8 w-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-yellow-400 uppercase">Rotatividade</p>
                <p className="text-2xl font-bold text-yellow-500">{turnover}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Absenteismo</p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
              <Briefcase className="h-8 w-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-400 uppercase">Risco Juridico</p>
                <p className="text-2xl font-bold text-orange-500">{riscoJuridicoAgregado}</p>
              </div>
              <Scale className="h-8 w-8 text-orange-500 opacity-50" />
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

      {/* Distribuicao por Setor/Frente */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Distribuicao por Setor / Frente de Trabalho</CardTitle>
          <p className="text-xs text-muted-foreground">Alocacao de pessoas por area da obra</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoSetor}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="quantidade"
                    label={({ setor, percent }) => `${setor} ${percent}%`}
                    labelLine={false}
                  >
                    {distribuicaoSetor.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_SETOR[index % COLORS_SETOR.length]} />
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
            <div className="space-y-2">
              {distribuicaoSetor.map((item, index) => (
                <div
                  key={item.setor}
                  className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS_SETOR[index] }} />
                    <span className="text-sm">{item.setor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.quantidade}</span>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.percent}%`, backgroundColor: COLORS_SETOR[index] }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aviso Analytics */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>
        <span className="text-sm text-muted-foreground">
          Esta tela e somente leitura. Para editar dados, acesse os menus operacionais (Pessoas, Conformidade, Ponto).
        </span>
      </div>
    </div>
  )
}

export default function PeopleAnalyticsObraPage() {
  return (
    <Suspense fallback={null}>
      <PeopleAnalyticsObraContent />
    </Suspense>
  )
}
