"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  FileText,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Card Hibrido Financeiro COMPACTO (menor)
function FinanceCardCompact({
  title,
  value,
  previsto,
  realizado,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string
  value: string
  previsto: number
  realizado: number
  icon: any
  trend: "up" | "down" | "neutral"
  trendValue: string
}) {
  const percent = Math.round((realizado / previsto) * 100)

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-1">
          <span className="text-xs text-muted-foreground">{title}</span>
          <Icon className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="text-lg font-bold text-foreground mb-1">{value}</div>
        <div className="space-y-1">
          <div className="flex gap-1 h-1.5">
            <div className="flex-1 bg-muted rounded-sm overflow-hidden">
              <div className="h-full bg-primary/60" style={{ width: "100%" }} />
            </div>
            <div className="flex-1 bg-muted rounded-sm overflow-hidden">
              <div
                className={`h-full ${percent >= 100 ? "bg-primary" : "bg-amber-500"}`}
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{percent}%</span>
            <div
              className={`flex items-center gap-0.5 text-xs ${
                trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {trendValue}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Grafico de Barras Fluxo de Caixa
function FluxoCaixaGrafico() {
  const meses = [
    { mes: "Out", entrada: 2200, saida: 2000, saldo: 200 },
    { mes: "Nov", entrada: 2500, saida: 2300, saldo: 200 },
    { mes: "Dez", entrada: 2400, saida: 2600, saldo: -200 },
    { mes: "Jan", entrada: 2800, saida: 2400, saldo: 400 },
    { mes: "Fev", entrada: 3000, saida: 2700, saldo: 300 },
    { mes: "Mar", entrada: 3200, saida: 2800, saldo: 400 },
  ]

  const maxValor = Math.max(...meses.flatMap((m) => [m.entrada, m.saida]))

  return (
    <div className="space-y-3">
      {/* Legenda */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Entrada</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-red-500" />
          <span className="text-xs text-muted-foreground">Saida</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Saldo</span>
        </div>
      </div>

      {/* Grafico */}
      <div className="flex items-end justify-between gap-2 h-24">
        {meses.map((m, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-0.5 h-20 w-full">
              {/* Entrada */}
              <div
                className="flex-1 bg-emerald-500 rounded-t-sm transition-all"
                style={{ height: `${(m.entrada / maxValor) * 100}%` }}
              />
              {/* Saida */}
              <div
                className="flex-1 bg-red-500 rounded-t-sm transition-all"
                style={{ height: `${(m.saida / maxValor) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{m.mes}</span>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <ArrowUpRight className="h-3 w-3 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-600">R$ 2.8M</span>
          </div>
          <span className="text-xs text-muted-foreground">Entrada Mes</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <ArrowDownRight className="h-3 w-3 text-red-600" />
            <span className="text-sm font-bold text-red-600">R$ 2.4M</span>
          </div>
          <span className="text-xs text-muted-foreground">Saida Mes</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Wallet className="h-3 w-3 text-primary" />
            <span className="text-sm font-bold text-primary">R$ 400K</span>
          </div>
          <span className="text-xs text-muted-foreground">Saldo</span>
        </div>
      </div>
    </div>
  )
}

function CockpitOpcaoCContent() {
  const router = useRouter()

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="p-6 space-y-5">
        {/* Header com navegacao entre opcoes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Cockpit de Governança</h1>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                  OPCAO C
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Sub-bloco Financeiro com grafico de Fluxo de Caixa</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.push("/obra/gerencial/cockpit/opcao-a")}>
                Opcao A
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/obra/gerencial/cockpit/opcao-b")}>
                Opcao B
              </Button>
              <Button variant="default" size="sm" onClick={() => router.push("/obra/gerencial/cockpit/opcao-c")}>
                Opcao C
              </Button>
            </div>
          </div>
        </div>

        {/* BLOCO 1: GESTAO DO CONTRATO COM CLIENTE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 bg-primary rounded-full" />
            <h2 className="text-base font-semibold text-foreground">Gestão do Contrato com Cliente</h2>
          </div>

          {/* KPIs Cliente */}
          <div className="grid grid-cols-4 gap-3">
            <FinanceCardCompact
              title="Receita Contratada"
              value="R$ 45.2M"
              previsto={45200000}
              realizado={38500000}
              icon={DollarSign}
              trend="up"
              trendValue="+2.3%"
            />
            <FinanceCardCompact
              title="Receita Realizada"
              value="R$ 38.5M"
              previsto={40000000}
              realizado={38500000}
              icon={Target}
              trend="up"
              trendValue="+1.8%"
            />
            <FinanceCardCompact
              title="Medicao Aprovada"
              value="R$ 5.2M"
              previsto={5500000}
              realizado={5200000}
              icon={FileText}
              trend="down"
              trendValue="-5.5%"
            />
            <FinanceCardCompact
              title="A Faturar"
              value="R$ 2.8M"
              previsto={3000000}
              realizado={2800000}
              icon={Calendar}
              trend="neutral"
              trendValue="0%"
            />
          </div>

          {/* Cronograma e Change Control */}
          <div className="grid grid-cols-12 gap-3">
            <Card className="col-span-8 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-4">
                <CardTitle className="text-sm font-medium">Cronograma Contratual</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <div className="space-y-2">
                  {[
                    { marco: "Fundacoes", prev: 100, real: 100, data: "15/10/2024" },
                    { marco: "Estrutura", prev: 100, real: 85, data: "15/01/2025" },
                    { marco: "Vedacoes", prev: 60, real: 45, data: "15/04/2025" },
                    { marco: "Acabamentos", prev: 20, real: 10, data: "15/08/2025" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20">{item.marco}</span>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/30" style={{ width: `${item.prev}%` }} />
                        <div className="absolute inset-0 bg-primary" style={{ width: `${item.real}%` }} />
                      </div>
                      <span className="text-xs font-medium w-10">{item.real}%</span>
                      <span className="text-xs text-muted-foreground w-16">{item.data}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-4">
                <CardTitle className="text-sm font-medium">Change Control</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <div className="space-y-1.5">
                  {[
                    { tipo: "Claims", qtd: 3, valor: "R$ 1.2M", status: "warning" },
                    { tipo: "Aditivos", qtd: 2, valor: "R$ 2.8M", status: "success" },
                    { tipo: "Pleitos", qtd: 1, valor: "R$ 0.5M", status: "danger" },
                    { tipo: "SMEs", qtd: 5, valor: "R$ 0.3M", status: "info" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs px-1.5 py-0 ${
                            item.status === "success"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                              : item.status === "warning"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                : item.status === "danger"
                                  ? "bg-red-500/10 text-red-600 border-red-500/30"
                                  : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                          }`}
                        >
                          {item.qtd}
                        </Badge>
                        <span className="text-xs">{item.tipo}</span>
                      </div>
                      <span className="text-xs font-medium">{item.valor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BLOCO 2: GERENCIAMENTO INTERNO DA OBRA */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 bg-emerald-500 rounded-full" />
            <h2 className="text-base font-semibold text-foreground">Gerenciamento Interno da Obra</h2>
          </div>

          {/* SUB-BLOCO FINANCEIRO - OPCAO C */}
          <div className="grid grid-cols-12 gap-3">
            {/* Cards Financeiros Compactos - 2 linhas de 2 */}
            <div className="col-span-4 grid grid-cols-2 gap-3">
              <FinanceCardCompact
                title="Custo Orcado"
                value="R$ 32.5M"
                previsto={32500000}
                realizado={28000000}
                icon={Target}
                trend="neutral"
                trendValue="0%"
              />
              <FinanceCardCompact
                title="Custo Realizado"
                value="R$ 28.0M"
                previsto={28500000}
                realizado={28000000}
                icon={DollarSign}
                trend="up"
                trendValue="+1.8%"
              />
              <FinanceCardCompact
                title="Margem Projetada"
                value="23.5%"
                previsto={100}
                realizado={94}
                icon={TrendingUp}
                trend="down"
                trendValue="-1.2%"
              />
              <FinanceCardCompact
                title="Lucro Projetado"
                value="R$ 7.6M"
                previsto={8500000}
                realizado={7600000}
                icon={TrendingUp}
                trend="down"
                trendValue="-10.6%"
              />
            </div>

            {/* Grafico Fluxo de Caixa */}
            <Card className="col-span-8 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Ultimos 6 meses
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <FluxoCaixaGrafico />
              </CardContent>
            </Card>
          </div>

          {/* Performance, Qualidade, SSMA, Juridico, Alertas */}
          <div className="grid grid-cols-12 gap-3">
            {/* Performance */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-3">
                <CardTitle className="text-xs font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">0.95</div>
                  <div className="text-xs text-muted-foreground">SPI</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">1.02</div>
                  <div className="text-xs text-muted-foreground">CPI</div>
                </div>
              </CardContent>
            </Card>

            {/* Qualidade */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-3">
                <CardTitle className="text-xs font-medium">Qualidade</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Inspecoes</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0 bg-emerald-500/10 text-emerald-600">
                    45
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">NCs</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0 bg-amber-500/10 text-amber-600">
                    3
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Indice</span>
                  <span className="text-xs font-medium">94.2%</span>
                </div>
              </CardContent>
            </Card>

            {/* SSMA */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-3">
                <CardTitle className="text-xs font-medium">SSMA</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Dias s/ Acid.</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0 bg-emerald-500/10 text-emerald-600">
                    127
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Incidentes</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0 bg-amber-500/10 text-amber-600">
                    2
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Efetivo</span>
                  <span className="text-xs font-medium">234</span>
                </div>
              </CardContent>
            </Card>

            {/* Juridico */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-3">
                <CardTitle className="text-xs font-medium">Juridico</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Processos</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0 bg-red-500/10 text-red-600">
                    2
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Notificacoes</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0 bg-amber-500/10 text-amber-600">
                    4
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Risco</span>
                  <span className="text-xs font-medium text-amber-600">Medio</span>
                </div>
              </CardContent>
            </Card>

            {/* Alertas Internos */}
            <Card className="col-span-4 bg-card border-border">
              <CardHeader className="pb-1 pt-3 px-4">
                <CardTitle className="text-xs font-medium">Alertas Gerenciais</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <div className="space-y-1.5">
                  {[
                    { msg: "Desvio de custo acima de 5% no pacote Estrutura", tipo: "critico" },
                    { msg: "3 fornecedores com pagamento atrasado", tipo: "atencao" },
                    { msg: "Prazo de entrega comprimido em 15 dias", tipo: "atencao" },
                  ].map((alerta, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 p-1.5 rounded-lg ${
                        alerta.tipo === "critico" ? "bg-red-500/10" : "bg-amber-500/10"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-3 w-3 flex-shrink-0 ${
                          alerta.tipo === "critico" ? "text-red-600" : "text-amber-600"
                        }`}
                      />
                      <span className="text-xs">{alerta.msg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CockpitOpcaoCPage() {
  return (
    <Suspense fallback={null}>
      <CockpitOpcaoCContent />
    </Suspense>
  )
}
