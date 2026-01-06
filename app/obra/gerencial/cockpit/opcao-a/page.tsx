"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Target, Calendar, FileText, AlertTriangle, Wallet } from "lucide-react"

// Card Hibrido Financeiro
function FinanceCard({
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
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-muted-foreground">{title}</span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-xl font-bold text-foreground mb-2">{value}</div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Previsto</span>
            <span className="text-muted-foreground">Realizado</span>
          </div>
          <div className="flex gap-1 h-2">
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
              className={`flex items-center gap-1 text-xs ${
                trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trendValue}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Card Fluxo de Caixa COMPACTO (substitui 1 card)
function FluxoCaixaCompactoCard() {
  const entrada = 2800000
  const saida = 2400000
  const saldo = entrada - saida

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-muted-foreground">Fluxo de Caixa</span>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-xl font-bold text-foreground mb-2">R$ {(saldo / 1000000).toFixed(1)}M</div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-emerald-600">+{(entrada / 1000000).toFixed(1)}M</span>
            <span className="text-red-600">-{(saida / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex gap-1 h-2">
            <div className="flex-1 bg-emerald-500/30 rounded-sm overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: "100%" }} />
            </div>
            <div className="flex-1 bg-red-500/30 rounded-sm overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: `${(saida / entrada) * 100}%` }} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Saldo</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +14.3%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CockpitOpcaoAContent() {
  const router = useRouter()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetData, setSheetData] = useState<any>(null)

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header com navegacao entre opcoes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Cockpit de Governança</h1>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                  OPCAO A
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Fluxo de Caixa compacto substituindo 1 card</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" onClick={() => router.push("/obra/gerencial/cockpit/opcao-a")}>
                Opcao A
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/obra/gerencial/cockpit/opcao-b")}>
                Opcao B
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/obra/gerencial/cockpit/opcao-c")}>
                Opcao C
              </Button>
            </div>
          </div>
        </div>

        {/* BLOCO 1: GESTAO DO CONTRATO COM CLIENTE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Gestão do Contrato com Cliente</h2>
          </div>

          {/* KPIs Cliente */}
          <div className="grid grid-cols-4 gap-4">
            <FinanceCard
              title="Receita Contratada"
              value="R$ 45.2M"
              previsto={45200000}
              realizado={38500000}
              icon={DollarSign}
              trend="up"
              trendValue="+2.3%"
            />
            <FinanceCard
              title="Receita Realizada"
              value="R$ 38.5M"
              previsto={40000000}
              realizado={38500000}
              icon={Target}
              trend="up"
              trendValue="+1.8%"
            />
            <FinanceCard
              title="Medicao Aprovada"
              value="R$ 5.2M"
              previsto={5500000}
              realizado={5200000}
              icon={FileText}
              trend="down"
              trendValue="-5.5%"
            />
            <FinanceCard
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
          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-8 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cronograma Contratual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { marco: "Fundacoes", prev: 100, real: 100, data: "15/10/2024" },
                    { marco: "Estrutura", prev: 100, real: 85, data: "15/01/2025" },
                    { marco: "Vedacoes", prev: 60, real: 45, data: "15/04/2025" },
                    { marco: "Acabamentos", prev: 20, real: 10, data: "15/08/2025" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-24">{item.marco}</span>
                      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/30" style={{ width: `${item.prev}%` }} />
                        <div className="absolute inset-0 bg-primary" style={{ width: `${item.real}%` }} />
                      </div>
                      <span className="text-xs font-medium w-12">{item.real}%</span>
                      <span className="text-xs text-muted-foreground w-20">{item.data}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Change Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { tipo: "Claims", qtd: 3, valor: "R$ 1.2M", status: "warning" },
                    { tipo: "Aditivos", qtd: 2, valor: "R$ 2.8M", status: "success" },
                    { tipo: "Pleitos", qtd: 1, valor: "R$ 0.5M", status: "danger" },
                    { tipo: "SMEs", qtd: 5, valor: "R$ 0.3M", status: "info" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            item.status === "success"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                              : item.status === "warning"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                : item.status === "danger"
                                  ? "bg-red-500/10 text-red-600 border-red-500/30"
                                  : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                          }
                        >
                          {item.qtd}
                        </Badge>
                        <span className="text-sm">{item.tipo}</span>
                      </div>
                      <span className="text-sm font-medium">{item.valor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BLOCO 2: GERENCIAMENTO INTERNO DA OBRA */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-emerald-500 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Gerenciamento Interno da Obra</h2>
          </div>

          {/* KPIs Internos - OPCAO A: 3 cards + 1 Fluxo Caixa Compacto */}
          <div className="grid grid-cols-4 gap-4">
            <FinanceCard
              title="Custo Orcado"
              value="R$ 32.5M"
              previsto={32500000}
              realizado={28000000}
              icon={Target}
              trend="neutral"
              trendValue="0%"
            />
            <FinanceCard
              title="Custo Realizado"
              value="R$ 28.0M"
              previsto={28500000}
              realizado={28000000}
              icon={DollarSign}
              trend="up"
              trendValue="+1.8%"
            />
            <FinanceCard
              title="Margem Projetada"
              value="23.5%"
              previsto={100}
              realizado={94}
              icon={TrendingUp}
              trend="down"
              trendValue="-1.2%"
            />
            {/* Card Fluxo de Caixa Compacto */}
            <FluxoCaixaCompactoCard />
          </div>

          {/* Performance, Qualidade, SSMA, Juridico, Alertas */}
          <div className="grid grid-cols-12 gap-4">
            {/* Performance */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">0.95</div>
                  <div className="text-xs text-muted-foreground">SPI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1.02</div>
                  <div className="text-xs text-muted-foreground">CPI</div>
                </div>
              </CardContent>
            </Card>

            {/* Qualidade */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Qualidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Inspecoes</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">
                    45
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">NCs Abertas</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                    3
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Indice</span>
                  <span className="text-sm font-medium">94.2%</span>
                </div>
              </CardContent>
            </Card>

            {/* SSMA */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">SSMA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Dias s/ Acidente</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">
                    127
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Incidentes</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                    2
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Efetivo</span>
                  <span className="text-sm font-medium">234</span>
                </div>
              </CardContent>
            </Card>

            {/* Juridico */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Juridico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Processos</span>
                  <Badge variant="outline" className="bg-red-500/10 text-red-600">
                    2
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Notificacoes</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                    4
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Risco</span>
                  <span className="text-sm font-medium text-amber-600">Medio</span>
                </div>
              </CardContent>
            </Card>

            {/* Alertas Internos */}
            <Card className="col-span-4 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Alertas Gerenciais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { msg: "Desvio de custo acima de 5% no pacote Estrutura", tipo: "critico" },
                    { msg: "3 fornecedores com pagamento atrasado", tipo: "atencao" },
                    { msg: "Prazo de entrega comprimido em 15 dias", tipo: "atencao" },
                  ].map((alerta, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        alerta.tipo === "critico" ? "bg-red-500/10" : "bg-amber-500/10"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${alerta.tipo === "critico" ? "text-red-600" : "text-amber-600"}`}
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

export default function CockpitOpcaoAPage() {
  return (
    <Suspense fallback={null}>
      <CockpitOpcaoAContent />
    </Suspense>
  )
}
