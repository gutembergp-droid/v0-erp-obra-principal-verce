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
  Activity,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const indicadoresPerformance = {
  fisico: [
    { nome: "SPI", valor: 0.96, meta: 1.0, unidade: "", historico: [0.91, 0.93, 0.94, 0.95, 0.96] },
    { nome: "Avanco Fisico", valor: 67.4, meta: 70, unidade: "%", historico: [55, 58, 61, 64, 67.4] },
    { nome: "Desvio Prazo", valor: 12, meta: 0, unidade: "dias", historico: [22, 18, 15, 13, 12] },
    { nome: "Frentes Ativas", valor: 8, meta: 10, unidade: "", historico: [5, 6, 7, 7, 8] },
  ],
  custo: [
    { nome: "CPI", valor: 1.04, meta: 1.0, unidade: "", historico: [0.98, 1.0, 1.02, 1.03, 1.04] },
    { nome: "Desvio Custo", valor: -2.1, meta: 0, unidade: "%", historico: [-0.5, -1.0, -1.5, -1.8, -2.1] },
    { nome: "Custo/m2", valor: 2850, meta: 3000, unidade: "R$", historico: [2920, 2900, 2880, 2865, 2850] },
    { nome: "Burn Rate", valor: 540, meta: 500, unidade: "k/dia", historico: [480, 500, 520, 530, 540] },
  ],
  produtividade: [
    { nome: "HH/m2", valor: 2.4, meta: 2.2, unidade: "", historico: [2.8, 2.7, 2.6, 2.5, 2.4] },
    { nome: "Produtividade Geral", valor: 92, meta: 95, unidade: "%", historico: [88, 89, 90, 91, 92] },
    { nome: "Eficiencia MO", valor: 85, meta: 90, unidade: "%", historico: [80, 82, 83, 84, 85] },
    { nome: "Retrabalho", valor: 2.1, meta: 3.0, unidade: "%", historico: [3.5, 3.0, 2.6, 2.3, 2.1] },
  ],
  recursos: [
    { nome: "Efetivo Total", valor: 342, meta: 350, unidade: "", historico: [320, 328, 335, 340, 342] },
    { nome: "Presenca", valor: 94, meta: 95, unidade: "%", historico: [92, 93, 93, 94, 94] },
    { nome: "Turnover", valor: 4.2, meta: 5.0, unidade: "%", historico: [6.5, 5.8, 5.2, 4.6, 4.2] },
    { nome: "Equipamentos Op.", valor: 28, meta: 30, unidade: "", historico: [24, 25, 26, 27, 28] },
  ],
}

function PerformanceContent() {
  const router = useRouter()
  const navegarPara = (rota: string) => router.push(rota)

  const renderCardHibrido = (titulo: string, indicadores: any[], icone: any) => {
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
                      Math.abs(ind.historico[ind.historico.length - 2])) *
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
                        className={`text-sm font-bold ${status === "ok" ? "text-emerald-500" : status === "atencao" ? "text-amber-500" : "text-red-500"}`}
                      >
                        {ind.valor}
                        {ind.unidade}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${status === "ok" ? "bg-emerald-500" : status === "atencao" ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(Math.abs(percentual), 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Meta: {ind.meta}
                      {ind.unidade}
                    </span>
                  </div>
                  <div className="flex items-end gap-0.5 mt-2 h-4">
                    {ind.historico.map((h: number, i: number) => {
                      const max = Math.max(...ind.historico.map(Math.abs))
                      const altura = (Math.abs(h) / max) * 100
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Performance</h1>
            <Badge variant="secondary">KPIs Operacionais</Badge>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/resultado-economico")}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Economico
            </Button>
            <Button variant="default" size="sm">
              <Gauge className="h-4 w-4 mr-1" />
              Performance
            </Button>
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/indicadores/cenarios")}>
              <Lightbulb className="h-4 w-4 mr-1" />
              Cenarios
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">SPI</p>
              <p className="text-xl font-bold text-amber-500">0.96</p>
              <p className="text-[10px] text-muted-foreground">Meta: 1.0</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">CPI</p>
              <p className="text-xl font-bold text-emerald-500">1.04</p>
              <p className="text-[10px] text-muted-foreground">Meta: 1.0</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Avanco</p>
              <p className="text-xl font-bold text-amber-500">67.4%</p>
              <p className="text-[10px] text-muted-foreground">Meta: 70%</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Produtividade</p>
              <p className="text-xl font-bold text-amber-500">92%</p>
              <p className="text-[10px] text-muted-foreground">Meta: 95%</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Efetivo</p>
              <p className="text-xl font-bold text-foreground">342</p>
              <p className="text-[10px] text-muted-foreground">Meta: 350</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Retrabalho</p>
              <p className="text-xl font-bold text-emerald-500">2.1%</p>
              <p className="text-[10px] text-muted-foreground">Meta: {"<"}3%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderCardHibrido("Desempenho Fisico", indicadoresPerformance.fisico, Target)}
          {renderCardHibrido("Desempenho de Custo", indicadoresPerformance.custo, DollarSign)}
          {renderCardHibrido("Produtividade", indicadoresPerformance.produtividade, Activity)}
          {renderCardHibrido("Recursos", indicadoresPerformance.recursos, Users)}
        </div>
      </div>
    </div>
  )
}

export default function PerformancePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <PerformanceContent />
    </Suspense>
  )
}
