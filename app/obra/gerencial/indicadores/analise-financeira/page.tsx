"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { KPICardOficial, AlertasModulo } from "@/components/indicadores"
import {
  BarChart3,
  FileText,
  DollarSign,
  AlertTriangle,
  Package,
  Calculator,
  Gauge,
  Lightbulb,
  Wallet,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  TrendingUp,
} from "lucide-react"

const kpisOficiais = [
  {
    codigo: "LC",
    nome: "Liquidez Corrente",
    valor: 1.85,
    meta: 1.5,
    formula: "Ativo Circulante / Passivo Circulante",
    interpretacao: "Capacidade de pagar obrigacoes de curto prazo",
    acaoGerencial: "Se < 1.0: Risco de insolvencia",
    tendencia: "subindo" as const,
    historico: [1.62, 1.68, 1.74, 1.8, 1.85],
  },
  {
    codigo: "CC",
    nome: "Cobertura de Caixa",
    valor: 0.76,
    meta: 1.0,
    formula: "Disponivel / Contas a Pagar",
    interpretacao: "Capacidade de honrar compromissos imediatos",
    acaoGerencial: "Se < 1.0: Acelerar recebimentos",
    tendencia: "subindo" as const,
    historico: [0.65, 0.68, 0.72, 0.74, 0.76],
  },
  {
    codigo: "CF",
    nome: "Ciclo Financeiro",
    valor: 4,
    meta: 0,
    formula: "PMR - PMP",
    interpretacao: "Dias de financiamento proprio da operacao",
    acaoGerencial: "Se > 0: Negociar prazos",
    tendencia: "estavel" as const,
    historico: [6, 5, 4, 4, 4],
  },
  {
    codigo: "BR",
    nome: "Burn Rate",
    valor: 540,
    meta: 500,
    formula: "Saidas / Dias Uteis",
    interpretacao: "Taxa diaria de consumo de caixa (R$ mil)",
    acaoGerencial: "Se > meta: Revisar despesas",
    tendencia: "subindo" as const,
    historico: [480, 500, 520, 530, 540],
  },
]

const indicadoresFinanceiro = {
  liquidez: [
    { nome: "Liquidez Corrente", valor: 1.85, meta: 1.5, formato: "decimal", historico: [1.62, 1.68, 1.74, 1.8, 1.85] },
    { nome: "Liquidez Imediata", valor: 0.42, meta: 0.5, formato: "decimal", historico: [0.38, 0.4, 0.41, 0.41, 0.42] },
    { nome: "Liquidez Seca", valor: 1.45, meta: 1.2, formato: "decimal", historico: [1.28, 1.32, 1.38, 1.42, 1.45] },
    { nome: "Capital de Giro", valor: 8200000, meta: 7000000, formato: "moeda", historico: [6.8, 7.2, 7.6, 7.9, 8.2] },
  ],
  fluxoCaixa: [
    {
      nome: "Saldo Disponivel",
      valor: 12400000,
      meta: 10000000,
      formato: "moeda",
      historico: [9.2, 10.1, 11.0, 11.8, 12.4],
    },
    {
      nome: "Entradas Mes",
      valor: 18500000,
      meta: 16000000,
      formato: "moeda",
      historico: [14.2, 15.1, 16.8, 17.4, 18.5],
    },
    {
      nome: "Saidas Mes",
      valor: 16200000,
      meta: 15000000,
      formato: "moeda",
      historico: [13.8, 14.5, 15.2, 15.8, 16.2],
    },
    { nome: "Saldo Mes", valor: 2300000, meta: 1000000, formato: "moeda", historico: [0.4, 0.6, 1.6, 1.6, 2.3] },
  ],
  contasPagar: [
    { nome: "Total a Pagar", valor: 8900000, meta: 10000000, formato: "moeda", historico: [7.2, 7.8, 8.2, 8.6, 8.9] },
    { nome: "Vencidos", valor: 420000, meta: 0, formato: "moeda", historico: [180, 220, 280, 350, 420] },
    { nome: "A Vencer 30d", valor: 4200000, meta: 5000000, formato: "moeda", historico: [3.8, 4.0, 4.1, 4.1, 4.2] },
    { nome: "PMP (dias)", valor: 28, meta: 30, formato: "numero", historico: [32, 31, 30, 29, 28] },
  ],
  contasReceber: [
    {
      nome: "Total a Receber",
      valor: 11200000,
      meta: 10000000,
      formato: "moeda",
      historico: [8.5, 9.2, 9.8, 10.5, 11.2],
    },
    { nome: "Vencidos", valor: 4600000, meta: 0, formato: "moeda", historico: [2.1, 2.8, 3.4, 4.0, 4.6] },
    { nome: "A Vencer 30d", valor: 6600000, meta: 8000000, formato: "moeda", historico: [5.8, 6.0, 6.2, 6.4, 6.6] },
    { nome: "PMR (dias)", valor: 32, meta: 30, formato: "numero", historico: [38, 36, 34, 33, 32] },
  ],
}

const alertasFinanceiro = [
  {
    id: "1",
    tipo: "critico" as const,
    titulo: "Contas a Receber Vencidas",
    descricao: "R$ 4.6M pendente",
    acao: "Cobranca urgente",
  },
  {
    id: "2",
    tipo: "atencao" as const,
    titulo: "Liquidez Imediata Baixa",
    descricao: "0.42 vs 0.5 meta",
    acao: "Revisar fluxo",
  },
  {
    id: "3",
    tipo: "atencao" as const,
    titulo: "Contas a Pagar Vencidas",
    descricao: "R$ 420k pendente",
    acao: "Priorizar pagamentos",
  },
  {
    id: "4",
    tipo: "info" as const,
    titulo: "Capital de Giro Positivo",
    descricao: "R$ 8.2M disponivel",
    acao: "Manter monitoramento",
  },
]

function formatarValor(valor: number, formato: string): string {
  switch (formato) {
    case "moeda":
      if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)}M`
      if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(0)}k`
      return `R$ ${valor.toFixed(0)}`
    case "percent":
      return `${valor.toFixed(1)}%`
    case "decimal":
      return valor.toFixed(2)
    default:
      return valor.toString()
  }
}

function AnaliseFinanceiraContent() {
  const router = useRouter()
  const [selectedKPI, setSelectedKPI] = useState<(typeof kpisOficiais)[0] | null>(null)

  const navegarPara = (rota: string) => router.push(rota)

  const renderCardCategoria = (titulo: string, indicadores: any[], icone: any) => {
    const Icone = icone
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Icone className="h-4 w-4 text-primary" />
            {titulo}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {indicadores.map((ind, idx) => {
              const percentual = ind.meta !== 0 ? (ind.valor / ind.meta) * 100 : 100
              const status = percentual >= 95 ? "ok" : percentual >= 80 ? "atencao" : "critico"
              const variacao =
                ind.historico.length > 1
                  ? ((ind.historico[ind.historico.length - 1] - ind.historico[ind.historico.length - 2]) /
                      Math.abs(ind.historico[ind.historico.length - 2] || 1)) *
                    100
                  : 0

              return (
                <div key={idx} className="p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{ind.nome}</span>
                    <div className="flex items-center gap-2">
                      {variacao !== 0 && (
                        <div
                          className={`flex items-center gap-0.5 ${variacao > 0 ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {variacao > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          <span className="text-[10px]">{Math.abs(variacao).toFixed(1)}%</span>
                        </div>
                      )}
                      <span
                        className={`text-sm font-bold ${status === "ok" ? "text-emerald-600 dark:text-emerald-400" : status === "atencao" ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {formatarValor(ind.valor, ind.formato)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${status === "ok" ? "bg-emerald-500" : status === "atencao" ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(percentual, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-20 text-right">
                      Meta: {formatarValor(ind.meta || ind.valor, ind.formato)}
                    </span>
                  </div>
                  <div className="flex items-end gap-0.5 mt-2 h-4">
                    {ind.historico.map((h: number, i: number) => {
                      const max = Math.max(...ind.historico)
                      const altura = max > 0 ? (h / max) * 100 : 0
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${i === ind.historico.length - 1 ? "bg-primary" : "bg-muted-foreground/30"}`}
                          style={{ height: `${altura}%` }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex-1 overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Analise Financeira</h1>
            <Badge variant="secondary">100% Financeiro</Badge>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/indicadores")}>
              <BarChart3 className="h-4 w-4 mr-1" />
              Geral
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-contratual")}
            >
              <FileText className="h-4 w-4 mr-1" />
              Contratual
            </Button>
            <Button variant="default" size="sm">
              <DollarSign className="h-4 w-4 mr-1" />
              Financeira
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-risco")}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Risco
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-suprimentos")}
            >
              <Package className="h-4 w-4 mr-1" />
              Suprimentos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/resultado-economico")}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Economico
            </Button>
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/indicadores/performance")}>
              <Gauge className="h-4 w-4 mr-1" />
              Performance
            </Button>
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/indicadores/cenarios")}>
              <Lightbulb className="h-4 w-4 mr-1" />
              Cenarios
            </Button>
          </div>
        </div>

        {/* KPIs Oficiais */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              KPIs Oficiais Financeiros (Manual GNESIS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpisOficiais.map((kpi) => (
                <KPICardOficial
                  key={kpi.codigo}
                  codigo={kpi.codigo}
                  nome={kpi.nome}
                  valor={kpi.valor}
                  meta={kpi.meta}
                  formula={kpi.formula}
                  interpretacao={kpi.interpretacao}
                  acaoGerencial={kpi.acaoGerencial}
                  tendencia={kpi.tendencia}
                  historico={kpi.historico}
                  onClick={() => setSelectedKPI(kpi)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grid de indicadores */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderCardCategoria("Indicadores de Liquidez", indicadoresFinanceiro.liquidez, PiggyBank)}
              {renderCardCategoria("Fluxo de Caixa", indicadoresFinanceiro.fluxoCaixa, Wallet)}
              {renderCardCategoria("Contas a Pagar", indicadoresFinanceiro.contasPagar, CreditCard)}
              {renderCardCategoria("Contas a Receber", indicadoresFinanceiro.contasReceber, Building)}
            </div>

            {/* Grafico Fluxo Caixa */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Fluxo de Caixa - Ultimos 6 Meses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((mes, idx) => {
                    const entrada = [14.2, 15.1, 16.8, 17.4, 18.5, 19.2][idx]
                    const saida = [13.8, 14.5, 15.2, 15.8, 16.2, 17.0][idx]
                    return (
                      <div key={mes} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{mes}</span>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            +{(entrada - saida).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex gap-1 h-3">
                          <div className="bg-emerald-500 rounded-sm" style={{ width: `${(entrada / 20) * 100}%` }} />
                          <div className="bg-red-400 rounded-sm" style={{ width: `${(saida / 20) * 100}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-emerald-500" />
                    <span className="text-[10px] text-muted-foreground">Entradas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-red-400" />
                    <span className="text-[10px] text-muted-foreground">Saidas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel lateral */}
          <div className="lg:col-span-4">
            <AlertasModulo
              alertas={alertasFinanceiro}
              titulo="Alertas Financeiros"
              onAlertaClick={(alerta) => console.log("Alerta clicado:", alerta)}
            />
          </div>
        </div>
      </div>

      {/* Sheet de detalhes do KPI */}
      <Sheet open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Badge variant="outline">{selectedKPI?.codigo}</Badge>
              {selectedKPI?.nome}
            </SheetTitle>
          </SheetHeader>
          {selectedKPI && (
            <div className="mt-6 space-y-6">
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <p className="text-4xl font-bold text-foreground">{selectedKPI.valor}</p>
                <p className="text-sm text-muted-foreground mt-1">Meta: {selectedKPI.meta}</p>
              </div>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Formula</p>
                    <p className="text-sm font-medium">{selectedKPI.formula}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interpretacao</p>
                    <p className="text-sm">{selectedKPI.interpretacao}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Acao Gerencial</p>
                    <p className="text-sm">{selectedKPI.acaoGerencial}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function AnaliseFinanceiraPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <AnaliseFinanceiraContent />
    </Suspense>
  )
}
