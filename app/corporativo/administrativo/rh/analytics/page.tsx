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
  Building2,
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
  total: 1000,
  clt: 700,
  pj: 100,
  terceiros: 200,
  direto: 750,
  indireto: 250,
  admissoes: 45,
  demissoes: 18,
  turnover: 6.8,
  absenteismo: 2.8,
  afastados: 32,
  ferias: 48,
}

const dadosCusto = {
  custoTotal: 9500000,
  folhaBase: 6200000,
  encargos: 2100000,
  beneficios: 680000,
  horasExtras: 380000,
  premios: 140000,
  mediaPerCapita: 9500,
  variacaoMes: 1.8,
}

const dadosJornada = {
  horasNormais: 176000,
  horasExtras: 14200,
  valorHE: 380000,
  colaboradoresAcimaLimite: 28,
  saldoBH: 4800,
  colaboradoresAcimaBH: 18,
  heRecorrente: 12,
}

const dadosJuridico = {
  riscoTotal: 15,
  passivoPotencial: 620000,
  heRecorrente: 12,
  desvioCargo: 8,
  docVencido: 22,
  sstPendente: 35,
  processos: 4,
}

const evolucaoEfetivo = [
  { mes: "Jul", total: 920, admissoes: 38, demissoes: 15 },
  { mes: "Ago", total: 943, admissoes: 35, demissoes: 12 },
  { mes: "Set", total: 960, admissoes: 28, demissoes: 11 },
  { mes: "Out", total: 975, admissoes: 22, demissoes: 7 },
  { mes: "Nov", total: 988, admissoes: 18, demissoes: 5 },
  { mes: "Dez", total: 1000, admissoes: 15, demissoes: 3 },
]

const evolucaoCusto = [
  { mes: "Jul", custo: 8800000, folha: 5800000, he: 340000 },
  { mes: "Ago", custo: 9000000, folha: 5950000, he: 350000 },
  { mes: "Set", custo: 9150000, folha: 6050000, he: 360000 },
  { mes: "Out", custo: 9280000, folha: 6100000, he: 365000 },
  { mes: "Nov", custo: 9400000, folha: 6150000, he: 375000 },
  { mes: "Dez", custo: 9500000, folha: 6200000, he: 380000 },
]

const distribuicaoVinculo = [
  { name: "CLT", value: 700, percent: 70 },
  { name: "PJ", value: 100, percent: 10 },
  { name: "Terceiros", value: 200, percent: 20 },
]

const conformidadeData = [
  { categoria: "Em dia", value: 820, percent: 82 },
  { categoria: "Pendencias", value: 140, percent: 14 },
  { categoria: "Bloqueados", value: 40, percent: 4 },
]

const rankingObras = [
  { obra: "BR-101 LOTE 2", efetivo: 300, custo: 2850000, risco: 4 },
  { obra: "BR-116 LOTE 5", efetivo: 250, custo: 2400000, risco: 3 },
  { obra: "BR-040 LOTE 1", efetivo: 180, custo: 1700000, risco: 2 },
  { obra: "BR-381 LOTE 3", efetivo: 150, custo: 1450000, risco: 3 },
  { obra: "Sede Corporativa", efetivo: 120, custo: 1100000, risco: 1 },
]

const rankingDesvios = [
  { obra: "BR-101 LOTE 2", tipo: "HE Recorrente", qtd: 3, passivo: 45000 },
  { obra: "BR-116 LOTE 5", tipo: "Desvio Funcao", qtd: 4, passivo: 65000 },
  { obra: "BR-381 LOTE 3", tipo: "SST Pendente", qtd: 8, passivo: 28000 },
]

const alertasInteligentes = [
  {
    id: 1,
    tipo: "critico",
    titulo: "12 colaboradores com HE recorrente",
    desc: "Padrao de HE acima de 3 meses consecutivos em 4 obras",
    acao: "Ver detalhes",
  },
  {
    id: 2,
    tipo: "critico",
    titulo: "35 pendencias SST",
    desc: "ASO e NRs vencendo nos proximos 15 dias",
    acao: "Ver pendencias",
  },
  {
    id: 3,
    tipo: "atencao",
    titulo: "Custo MO +1.8% no mes",
    desc: "Aumento acima da inflacao prevista",
    acao: "Analisar",
  },
  {
    id: 4,
    tipo: "info",
    titulo: "4 processos trabalhistas ativos",
    desc: "Passivo potencial de R$ 180.000",
    acao: "Ver processos",
  },
]

const COLORS = ["#10b981", "#f59e0b", "#6366f1"]
const COLORS_CONFORMIDADE = ["#10b981", "#f59e0b", "#ef4444"]

function PeopleAnalyticsCorporativoContent() {
  const [periodo, setPeriodo] = useState("6m")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-background min-h-screen">
      {/* RHNav */}
      <RHNav modulo="corporativo" />

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">RH Corporativo &gt; People Analytics</p>
          <h1 className="text-2xl font-bold tracking-tight">People Analytics — Visao Corporativa</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visao estrategica global, somente leitura — analise gerencial e risco juridico
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
              <span className="text-3xl font-bold">{dadosEfetivo.total.toLocaleString()}</span>
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
              <div className="flex justify-between text-amber-500">
                <span>Horas Extras</span>
                <span>{formatCurrency(dadosCusto.horasExtras)}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <span className="text-muted-foreground">Variacao mensal</span>
              <span className="font-medium text-amber-500">+{dadosCusto.variacaoMes}%</span>
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
              <div className="flex justify-between text-red-500">
                <span>Acima limite HE</span>
                <span>{dadosJornada.colaboradoresAcimaLimite} pessoas</span>
              </div>
              <div className="flex justify-between text-orange-500">
                <span>HE Recorrente</span>
                <span>{dadosJornada.heRecorrente} colaboradores</span>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <span className="text-muted-foreground">Saldo BH Total</span>
              <span className="font-medium">{dadosJornada.saldoBH.toLocaleString()}h</span>
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
                <span className="text-muted-foreground">Processos Ativos</span>
                <span>{dadosJuridico.processos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SST Pendente</span>
                <span>{dadosJuridico.sstPendente}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-border">
              <span className="text-muted-foreground">Doc Vencido</span>
              <Badge variant="outline" className="text-red-500 border-red-500/30 text-[10px]">
                {dadosJuridico.docVencido}
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
          <TabsTrigger value="conformidade">Conformidade</TabsTrigger>
        </TabsList>

        <TabsContent value="efetivo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Evolucao do Efetivo Global</CardTitle>
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

        <TabsContent value="conformidade" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status de Conformidade Global</CardTitle>
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

            <Card className="bg-card border-border border-orange-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Desvios por Obra</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rankingDesvios.map((item) => (
                    <div
                      key={item.obra}
                      className="flex items-center justify-between p-2 rounded bg-orange-500/5 hover:bg-orange-500/10 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <div>
                          <span className="text-sm font-medium">{item.obra}</span>
                          <p className="text-xs text-muted-foreground">
                            {item.tipo} — {item.qtd} ocorrencias
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-orange-500 border-orange-500/30">
                        {formatCurrency(item.passivo)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Ranking por Obra */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Ranking por Obra</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              Ver todas <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rankingObras.map((item, index) => (
              <div
                key={item.obra}
                className="flex items-center justify-between p-3 rounded hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-5">{index + 1}.</span>
                  <Building2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{item.obra}</span>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <div className="text-center">
                    <p className="font-medium">{item.efetivo}</p>
                    <p className="text-muted-foreground">pessoas</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{formatCurrency(item.custo)}</p>
                    <p className="text-muted-foreground">custo</p>
                  </div>
                  <div className="text-center">
                    <Badge variant={item.risco > 2 ? "destructive" : "outline"} className="text-xs">
                      {item.risco} riscos
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas Inteligentes */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <CardTitle className="text-sm font-medium">Alertas Inteligentes — Visao Global</CardTitle>
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
          Esta tela e somente leitura. Para editar dados, acesse as obras individualmente ou os menus operacionais.
        </span>
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
