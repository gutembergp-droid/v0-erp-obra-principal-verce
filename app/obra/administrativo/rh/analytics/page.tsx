"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Users,
  TrendingDown,
  DollarSign,
  Clock,
  Scale,
  AlertTriangle,
  Download,
  ChevronRight,
  UserMinus,
  UserPlus,
  Info,
  Lightbulb,
  ExternalLink,
} from "lucide-react"
import {
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
  Line,
} from "recharts"

const dadosEfetivo = {
  total: 300,
  clt: 210,
  pj: 20,
  terceiros: 70,
  direto: 230,
  indireto: 70,
  admissoes: 15,
  demissoes: 5,
  turnover: 9.3,
  absenteismo: 3.2,
  afastados: 9,
  ferias: 12,
}

const dadosCusto = {
  custoTotal: 2850000,
  folhaBase: 1890000,
  encargos: 680000,
  beneficios: 180000,
  horasExtras: 95000,
  premios: 45000,
  mediaPerCapita: 9500,
  variacaoMes: 2.3,
}

const dadosJornada = {
  horasNormais: 52800,
  horasExtras: 4200,
  valorHE: 95000,
  colaboradoresAcimaLimite: 8,
  saldoBH: 1250,
  colaboradoresAcimaBH: 5,
  heRecorrente: 3,
}

const dadosJuridico = {
  riscoTotal: 4,
  passivoPotencial: 180000,
  heRecorrente: 3,
  desvioCargo: 2,
  docVencido: 5,
  sstPendente: 8,
  processos: 1,
}

const evolucaoEfetivo = [
  { mes: "Jul", total: 280, admissoes: 12, demissoes: 5 },
  { mes: "Ago", total: 287, admissoes: 10, demissoes: 3 },
  { mes: "Set", total: 292, admissoes: 8, demissoes: 3 },
  { mes: "Out", total: 295, admissoes: 6, demissoes: 3 },
  { mes: "Nov", total: 298, admissoes: 5, demissoes: 2 },
  { mes: "Dez", total: 300, admissoes: 4, demissoes: 2 },
]

const evolucaoCusto = [
  { mes: "Jul", custo: 2650000, folha: 1750000, he: 85000 },
  { mes: "Ago", custo: 2700000, folha: 1800000, he: 88000 },
  { mes: "Set", custo: 2750000, folha: 1840000, he: 90000 },
  { mes: "Out", custo: 2780000, folha: 1860000, he: 92000 },
  { mes: "Nov", custo: 2820000, folha: 1880000, he: 94000 },
  { mes: "Dez", custo: 2850000, folha: 1890000, he: 95000 },
]

const evolucaoJornada = [
  { mes: "Jul", horasNormais: 51000, horasExtras: 3800, limiteLegal: 4400 },
  { mes: "Ago", horasNormais: 51500, horasExtras: 3900, limiteLegal: 4400 },
  { mes: "Set", horasNormais: 52000, horasExtras: 4000, limiteLegal: 4400 },
  { mes: "Out", horasNormais: 52200, horasExtras: 4100, limiteLegal: 4400 },
  { mes: "Nov", horasNormais: 52500, horasExtras: 4150, limiteLegal: 4400 },
  { mes: "Dez", horasNormais: 52800, horasExtras: 4200, limiteLegal: 4400 },
]

const distribuicaoVinculo = [
  { name: "CLT", value: 210, percent: 70 },
  { name: "PJ", value: 20, percent: 7 },
  { name: "Terceiros", value: 70, percent: 23 },
]

const conformidadeData = [
  { categoria: "Em dia", value: 245, percent: 82 },
  { categoria: "Pendencias", value: 42, percent: 14 },
  { categoria: "Bloqueados", value: 13, percent: 4 },
]

const riscoJuridicoData = [
  { tipo: "HE Recorrente", qtd: 3, risco: "alto" },
  { tipo: "Desvio Cargo", qtd: 2, risco: "medio" },
  { tipo: "Doc Vencido", qtd: 5, risco: "medio" },
  { tipo: "SST Pendente", qtd: 8, risco: "alto" },
]

// Rankings
const rankingFuncoes = [
  { funcao: "Operador de Maquinas", qtd: 45, custo: 425000, heMedia: 18 },
  { funcao: "Motorista", qtd: 32, custo: 288000, heMedia: 22 },
  { funcao: "Servente", qtd: 58, custo: 290000, heMedia: 12 },
  { funcao: "Pedreiro", qtd: 28, custo: 252000, heMedia: 15 },
  { funcao: "Encarregado", qtd: 12, custo: 180000, heMedia: 25 },
]

const rankingDesvios = [
  { colaborador: "Jose Silva", tipo: "HE Recorrente", meses: 4, valor: 8500 },
  { colaborador: "Maria Santos", tipo: "Desvio Funcao", meses: 6, valor: 12000 },
  { colaborador: "Pedro Oliveira", tipo: "BH Limite", meses: 3, valor: 4200 },
]

const alertasInteligentes = [
  {
    id: 1,
    tipo: "critico",
    titulo: "HE acima do limite legal",
    desc: "8 colaboradores com HE acima de 44h/mes",
    acao: "Ver lista",
    rota: "/obra/administrativo/rh/ponto",
  },
  {
    id: 2,
    tipo: "critico",
    titulo: "ASO vencendo em 7 dias",
    desc: "12 colaboradores com ASO proximo do vencimento",
    acao: "Ver pendencias",
    rota: "/obra/administrativo/rh/conformidade",
  },
  {
    id: 3,
    tipo: "atencao",
    titulo: "Turnover acima da meta",
    desc: "Turnover de 9.3% vs meta de 8%",
    acao: "Analisar",
    rota: "/obra/administrativo/rh/pessoas",
  },
  {
    id: 4,
    tipo: "info",
    titulo: "Banco de horas alto",
    desc: "5 colaboradores com saldo BH acima de 40h",
    acao: "Ver BH",
    rota: "/obra/administrativo/rh/ponto",
  },
]

const COLORS = ["#10b981", "#f59e0b", "#6366f1"]
const COLORS_CONFORMIDADE = ["#10b981", "#f59e0b", "#ef4444"]

function PeopleAnalyticsObraContent() {
  const [periodo, setPeriodo] = useState("6m")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-background min-h-screen">
      {/* RHNav */}
      <RHNav modulo="obra" />

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">RH Obra &gt; People Analytics</p>
          <h1 className="text-2xl font-bold tracking-tight">People Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visao estrategica, somente leitura — analise gerencial e risco juridico
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Ultimo mes</SelectItem>
              <SelectItem value="3m">Ultimos 3 meses</SelectItem>
              <SelectItem value="6m">Ultimos 6 meses</SelectItem>
              <SelectItem value="12m">Ultimo ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Superiores - 4 Cards Densos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Efetivo & Movimentacao */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Efetivo & Movimentacao</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{dadosEfetivo.total}</span>
              <span className="text-sm text-muted-foreground">pessoas</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-1.5 rounded bg-emerald-500/10">
                <p className="font-semibold text-emerald-500">{dadosEfetivo.clt}</p>
                <p className="text-muted-foreground">CLT</p>
              </div>
              <div className="text-center p-1.5 rounded bg-amber-500/10">
                <p className="font-semibold text-amber-500">{dadosEfetivo.pj}</p>
                <p className="text-muted-foreground">PJ</p>
              </div>
              <div className="text-center p-1.5 rounded bg-violet-500/10">
                <p className="font-semibold text-violet-500">{dadosEfetivo.terceiros}</p>
                <p className="text-muted-foreground">Terc.</p>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <div className="flex items-center gap-1 text-green-500">
                <UserPlus className="h-3 w-3" />
                <span>+{dadosEfetivo.admissoes}</span>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <UserMinus className="h-3 w-3" />
                <span>-{dadosEfetivo.demissoes}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-amber-500" />
                <span>{dadosEfetivo.turnover}% turn.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Custo de Mao de Obra */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Custo de Mao de Obra</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatCurrency(dadosCusto.custoTotal)}</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Folha Base</span>
                <span>{formatCurrency(dadosCusto.folhaBase)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Encargos</span>
                <span>{formatCurrency(dadosCusto.encargos)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Beneficios</span>
                <span>{formatCurrency(dadosCusto.beneficios)}</span>
              </div>
              <div className="flex justify-between text-amber-500">
                <span>Horas Extras</span>
                <span>{formatCurrency(dadosCusto.horasExtras)}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <span className="text-muted-foreground">Media/pessoa</span>
              <span className="font-medium">{formatCurrency(dadosCusto.mediaPerCapita)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Jornada & Banco de Horas */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Jornada & Banco de Horas</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{dadosJornada.horasExtras.toLocaleString()}h</span>
              <span className="text-sm text-muted-foreground">HE no periodo</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor HE</span>
                <span className="text-amber-500">{formatCurrency(dadosJornada.valorHE)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saldo BH Total</span>
                <span>{dadosJornada.saldoBH.toLocaleString()}h</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Acima limite HE</span>
                <span>{dadosJornada.colaboradoresAcimaLimite} pessoas</span>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <span className="text-muted-foreground">HE Recorrente</span>
              <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-[10px]">
                {dadosJornada.heRecorrente} alertas
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Conformidade & Juridico */}
        <Card className="bg-card border-border border-orange-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conformidade & Juridico</CardTitle>
              <Scale className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-500">{dadosJuridico.riscoTotal}</span>
              <span className="text-sm text-muted-foreground">riscos ativos</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Passivo Potencial</span>
                <span className="text-red-500 font-medium">{formatCurrency(dadosJuridico.passivoPotencial)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">HE Recorrente</span>
                <span>{dadosJuridico.heRecorrente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desvio Cargo</span>
                <span>{dadosJuridico.desvioCargo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SST Pendente</span>
                <span>{dadosJuridico.sstPendente}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <span className="text-muted-foreground">Processos Ativos</span>
              <Badge variant="outline" className="text-red-500 border-red-500/30 text-[10px]">
                {dadosJuridico.processos}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graficos Analiticos */}
      <Tabs defaultValue="efetivo" className="space-y-4">
        <TabsList>
          <TabsTrigger value="efetivo">Efetivo</TabsTrigger>
          <TabsTrigger value="custo">Custo MO</TabsTrigger>
          <TabsTrigger value="jornada">Jornada & HE</TabsTrigger>
          <TabsTrigger value="conformidade">Conformidade</TabsTrigger>
        </TabsList>

        <TabsContent value="efetivo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Evolucao do Efetivo */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Evolucao do Efetivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={evolucaoEfetivo}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
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
                      <Line
                        type="monotone"
                        dataKey="total"
                        name="Total"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Efetivo por Tipo */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Efetivo por Tipo de Vinculo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] flex items-center">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={distribuicaoVinculo}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {distribuicaoVinculo.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  <div className="w-1/2 space-y-3">
                    {distribuicaoVinculo.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[index] }} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{item.value}</span>
                          <span className="text-xs text-muted-foreground ml-1">({item.percent}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custo" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Evolucao do Custo de Mao de Obra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={evolucaoCusto}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Bar dataKey="folha" name="Folha" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="he" name="Horas Extras" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line
                      type="monotone"
                      dataKey="custo"
                      name="Custo Total"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jornada" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jornada e Horas Extras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={evolucaoJornada}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="horasExtras" name="Horas Extras" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line
                      type="monotone"
                      dataKey="limiteLegal"
                      name="Limite Legal"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conformidade" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status de Conformidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] flex items-center">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={conformidadeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {conformidadeData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS_CONFORMIDADE[index % COLORS_CONFORMIDADE.length]}
                            />
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
                  <div className="w-1/2 space-y-3">
                    {conformidadeData.map((item, index) => (
                      <div key={item.categoria} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS_CONFORMIDADE[index] }} />
                          <span className="text-sm">{item.categoria}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{item.value}</span>
                          <span className="text-xs text-muted-foreground ml-1">({item.percent}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Riscos Juridicos por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riscoJuridicoData.map((item) => (
                    <div key={item.tipo} className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-4 w-4 ${item.risco === "alto" ? "text-red-500" : "text-amber-500"}`}
                        />
                        <span className="text-sm">{item.tipo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.risco === "alto" ? "destructive" : "outline"} className="text-xs">
                          {item.qtd}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Rankings */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Ranking por Funcao */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Ranking por Funcao</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                Ver todas <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rankingFuncoes.slice(0, 5).map((item, index) => (
                <div
                  key={item.funcao}
                  className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-5">{index + 1}.</span>
                    <span className="text-sm">{item.funcao}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span>{item.qtd} pessoas</span>
                    <span className="text-muted-foreground">{formatCurrency(item.custo)}</span>
                    <span className="text-amber-500">{item.heMedia}h HE</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ranking Desvios */}
        <Card className="bg-card border-border border-orange-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Desvios com Maior Risco</CardTitle>
              <Scale className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rankingDesvios.map((item, index) => (
                <div
                  key={item.colaborador}
                  className="flex items-center justify-between p-2 rounded bg-orange-500/5 hover:bg-orange-500/10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <div>
                      <span className="text-sm font-medium">{item.colaborador}</span>
                      <p className="text-xs text-muted-foreground">
                        {item.tipo} — {item.meses} meses
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-500 border-orange-500/30">
                    {formatCurrency(item.valor)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Inteligentes */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <CardTitle className="text-sm font-medium">Alertas Inteligentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {alertasInteligentes.map((alerta) => (
              <div
                key={alerta.id}
                className={`p-3 rounded-lg border ${
                  alerta.tipo === "critico"
                    ? "bg-red-500/5 border-red-500/30"
                    : alerta.tipo === "atencao"
                      ? "bg-amber-500/5 border-amber-500/30"
                      : "bg-blue-500/5 border-blue-500/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    {alerta.tipo === "critico" && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                    {alerta.tipo === "atencao" && <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />}
                    {alerta.tipo === "info" && <Info className="h-4 w-4 text-blue-500 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium">{alerta.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alerta.desc}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    {alerta.acao} <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aviso Somente Leitura */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <Info className="h-4 w-4 text-blue-500" />
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
