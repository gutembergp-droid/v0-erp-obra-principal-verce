"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  FileText,
  DollarSign,
  AlertTriangle,
  Package,
  Calculator,
  Gauge,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const dre = {
  receita: { valor: 156800000, anterior: 142500000 },
  custosDiretos: { valor: 128400000, anterior: 118200000 },
  custosIndiretos: { valor: 14800000, anterior: 12600000 },
  margemBruta: { valor: 13600000, anterior: 11700000 },
  despesasAdm: { valor: 2100000, anterior: 1900000 },
  lucroOperacional: { valor: 11500000, anterior: 9800000 },
  ebitda: { valor: 12300000, anterior: 10500000 },
}

const indicadoresEconomicos = [
  { nome: "Margem Bruta", valor: 8.7, meta: 9.0, unidade: "%", historico: [8.1, 8.2, 8.4, 8.5, 8.7] },
  { nome: "Margem Liquida", valor: 7.3, meta: 7.5, unidade: "%", historico: [6.8, 6.9, 7.0, 7.2, 7.3] },
  { nome: "EBITDA Margin", valor: 7.8, meta: 8.0, unidade: "%", historico: [7.2, 7.4, 7.5, 7.6, 7.8] },
  { nome: "ROI", valor: 12.4, meta: 15.0, unidade: "%", historico: [10.2, 10.8, 11.4, 11.9, 12.4] },
  { nome: "ROIC", valor: 14.2, meta: 15.0, unidade: "%", historico: [12.5, 13.0, 13.5, 13.8, 14.2] },
  { nome: "Payback", valor: 18, meta: 24, unidade: "meses", historico: [24, 22, 20, 19, 18] },
]

function formatarMoeda(valor: number): string {
  if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)}M`
  if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(0)}k`
  return `R$ ${valor.toFixed(0)}`
}

function ResultadoEconomicoContent() {
  const router = useRouter()
  const navegarPara = (rota: string) => router.push(rota)

  return (
    <div className="flex-1 overflow-auto h-full">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Resultado Economico</h1>
            <Badge variant="secondary">DRE & Indicadores</Badge>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-financeira")}
            >
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
            <Button variant="default" size="sm">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Receita Acum.</p>
              <p className="text-xl font-bold text-foreground">{formatarMoeda(dre.receita.valor)}</p>
              <div className="flex items-center gap-1 text-emerald-500 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-[10px]">+10%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Custos Diretos</p>
              <p className="text-xl font-bold text-amber-500">{formatarMoeda(dre.custosDiretos.valor)}</p>
              <p className="text-[10px] text-muted-foreground">81.9% da receita</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Margem Bruta</p>
              <p className="text-xl font-bold text-emerald-500">{formatarMoeda(dre.margemBruta.valor)}</p>
              <p className="text-[10px] text-muted-foreground">8.7%</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Lucro Operacional</p>
              <p className="text-xl font-bold text-emerald-500">{formatarMoeda(dre.lucroOperacional.valor)}</p>
              <p className="text-[10px] text-muted-foreground">7.3%</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">EBITDA</p>
              <p className="text-xl font-bold text-foreground">{formatarMoeda(dre.ebitda.valor)}</p>
              <p className="text-[10px] text-muted-foreground">7.8%</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">ROI</p>
              <p className="text-xl font-bold text-emerald-500">12.4%</p>
              <p className="text-[10px] text-muted-foreground">Meta: 15%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* DRE Resumido */}
          <div className="lg:col-span-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">DRE Resumido</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    {
                      label: "Receita Liquida",
                      valor: dre.receita.valor,
                      anterior: dre.receita.anterior,
                      tipo: "receita",
                    },
                    {
                      label: "(-) Custos Diretos",
                      valor: dre.custosDiretos.valor,
                      anterior: dre.custosDiretos.anterior,
                      tipo: "custo",
                    },
                    {
                      label: "(-) Custos Indiretos",
                      valor: dre.custosIndiretos.valor,
                      anterior: dre.custosIndiretos.anterior,
                      tipo: "custo",
                    },
                    {
                      label: "(=) Margem Bruta",
                      valor: dre.margemBruta.valor,
                      anterior: dre.margemBruta.anterior,
                      tipo: "resultado",
                    },
                    {
                      label: "(-) Despesas Adm",
                      valor: dre.despesasAdm.valor,
                      anterior: dre.despesasAdm.anterior,
                      tipo: "custo",
                    },
                    {
                      label: "(=) Lucro Operacional",
                      valor: dre.lucroOperacional.valor,
                      anterior: dre.lucroOperacional.anterior,
                      tipo: "resultado",
                    },
                    { label: "(=) EBITDA", valor: dre.ebitda.valor, anterior: dre.ebitda.anterior, tipo: "destaque" },
                  ].map((item, idx) => {
                    const variacao = ((item.valor - item.anterior) / item.anterior) * 100
                    return (
                      <div
                        key={idx}
                        className={`p-3 flex items-center justify-between ${item.tipo === "destaque" ? "bg-primary/5" : ""}`}
                      >
                        <span
                          className={`text-sm ${item.tipo === "resultado" || item.tipo === "destaque" ? "font-medium" : ""} text-foreground`}
                        >
                          {item.label}
                        </span>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center gap-0.5 ${variacao > 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {variacao > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            <span className="text-[10px]">{Math.abs(variacao).toFixed(1)}%</span>
                          </div>
                          <span
                            className={`text-sm font-bold ${item.tipo === "resultado" || item.tipo === "destaque" ? "text-emerald-500" : item.tipo === "custo" ? "text-amber-500" : "text-foreground"}`}
                          >
                            {formatarMoeda(item.valor)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Indicadores */}
          <div className="lg:col-span-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Indicadores Economicos</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {indicadoresEconomicos.map((ind, idx) => {
                    const percentual = (ind.valor / ind.meta) * 100
                    const status = percentual >= 95 ? "ok" : percentual >= 80 ? "atencao" : "critico"
                    return (
                      <div key={idx} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">{ind.nome}</span>
                          <span
                            className={`text-sm font-bold ${status === "ok" ? "text-emerald-500" : status === "atencao" ? "text-amber-500" : "text-red-500"}`}
                          >
                            {ind.valor}
                            {ind.unidade}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${status === "ok" ? "bg-emerald-500" : status === "atencao" ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${Math.min(percentual, 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            Meta: {ind.meta}
                            {ind.unidade}
                          </span>
                        </div>
                        <div className="flex items-end gap-0.5 mt-2 h-4">
                          {ind.historico.map((h, i) => {
                            const max = Math.max(...ind.historico)
                            const altura = (h / max) * 100
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultadoEconomicoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <ResultadoEconomicoContent />
    </Suspense>
  )
}
