"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ObraGerencialNavbar } from "../../../_components/obra-gerencial-navbar"
import { IndicadoresTabsNavbar } from "../../_components/indicadores-tabs-navbar"
import {
  BarChart3,
  FileText,
  DollarSign,
  AlertTriangle,
  Package,
  Calculator,
  Gauge,
  Lightbulb,
  Truck,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const indicadoresSuprimentos = {
  performance: [
    { id: 1, nome: "OTIF (On Time In Full)", valor: 87, meta: 95, unidade: "%", historico: [82, 84, 85, 86, 87] },
    { id: 2, nome: "Lead Time Medio", valor: 12, meta: 10, unidade: "dias", historico: [15, 14, 13, 12, 12] },
    { id: 3, nome: "Pedidos no Prazo", valor: 89, meta: 95, unidade: "%", historico: [84, 85, 87, 88, 89] },
    { id: 4, nome: "Pedidos Completos", valor: 92, meta: 98, unidade: "%", historico: [88, 89, 90, 91, 92] },
  ],
  fornecedores: [
    { id: 5, nome: "Fornecedores Ativos", valor: 42, meta: 40, unidade: "", historico: [38, 39, 40, 41, 42] },
    { id: 6, nome: "Avaliacao Media", valor: 7.8, meta: 8.0, unidade: "", historico: [7.4, 7.5, 7.6, 7.7, 7.8] },
    { id: 7, nome: "Fornecedores Criticos", valor: 3, meta: 0, unidade: "", historico: [5, 4, 4, 3, 3] },
    { id: 8, nome: "Contratos Vigentes", valor: 28, meta: 30, unidade: "", historico: [24, 25, 26, 27, 28] },
  ],
  estoque: [
    { id: 9, nome: "Giro de Estoque", valor: 4.2, meta: 5.0, unidade: "x", historico: [3.8, 3.9, 4.0, 4.1, 4.2] },
    { id: 10, nome: "Cobertura (dias)", valor: 18, meta: 15, unidade: "dias", historico: [22, 21, 20, 19, 18] },
    { id: 11, nome: "Itens Criticos", valor: 5, meta: 0, unidade: "", historico: [8, 7, 6, 5, 5] },
    {
      id: 12,
      nome: "Valor Estoque",
      valor: 2400000,
      meta: 2000000,
      unidade: "R$",
      historico: [2.8, 2.6, 2.5, 2.4, 2.4],
    },
  ],
  custos: [
    {
      id: 13,
      nome: "Saving Acumulado",
      valor: 1200000,
      meta: 1500000,
      unidade: "R$",
      historico: [0.6, 0.8, 0.95, 1.1, 1.2],
    },
    { id: 14, nome: "Variacao Precos", valor: 3.2, meta: 5.0, unidade: "%", historico: [4.8, 4.2, 3.8, 3.5, 3.2] },
    { id: 15, nome: "Custo Logistico", valor: 2.8, meta: 3.0, unidade: "%", historico: [3.2, 3.1, 3.0, 2.9, 2.8] },
    { id: 16, nome: "Compras Emergenciais", valor: 8, meta: 5, unidade: "%", historico: [12, 11, 10, 9, 8] },
  ],
}

function formatarValor(valor: number, unidade: string): string {
  if (unidade === "R$") {
    if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)}M`
    if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(0)}k`
    return `R$ ${valor.toFixed(0)}`
  }
  return `${valor}${unidade}`
}

function AnaliseSuprimentosContent() {
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
            {indicadores.map((ind) => {
              const percentual = (ind.valor / ind.meta) * 100
              const status = percentual >= 95 ? "ok" : percentual >= 80 ? "atencao" : "critico"
              const variacao =
                ind.historico.length > 1
                  ? ((ind.historico[ind.historico.length - 1] - ind.historico[ind.historico.length - 2]) /
                      ind.historico[ind.historico.length - 2]) *
                    100
                  : 0

              return (
                <div key={ind.id} className="p-3 hover:bg-muted/50 cursor-pointer transition-colors">
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
                        {formatarValor(ind.valor, ind.unidade)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${status === "ok" ? "bg-emerald-500" : status === "atencao" ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(percentual, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Meta: {formatarValor(ind.meta, ind.unidade)}
                    </span>
                  </div>
                  <div className="flex items-end gap-0.5 mt-2 h-4">
                    {ind.historico.map((h: number, idx: number) => {
                      const max = Math.max(...ind.historico)
                      const altura = (h / max) * 100
                      return (
                        <div
                          key={idx}
                          className={`flex-1 rounded-sm ${idx === ind.historico.length - 1 ? "bg-primary" : "bg-muted-foreground/30"}`}
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
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0"><ObraGerencialNavbar /></div>
      <div className="flex-shrink-0 z-30 mt-3"><IndicadoresTabsNavbar /></div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Análise de Suprimentos</h1>
                <Badge variant="secondary">Cadeia de Fornecimento</Badge>
              </div>
            </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">OTIF</p>
              <p className="text-xl font-bold text-amber-500">87%</p>
              <p className="text-[10px] text-muted-foreground">Meta: 95%</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Fornecedores</p>
              <p className="text-xl font-bold text-foreground">42</p>
              <p className="text-[10px] text-emerald-500">Ativos</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Saving</p>
              <p className="text-xl font-bold text-emerald-500">R$ 1.2M</p>
              <p className="text-[10px] text-muted-foreground">Acumulado</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Lead Time</p>
              <p className="text-xl font-bold text-amber-500">12 dias</p>
              <p className="text-[10px] text-muted-foreground">Meta: 10</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Itens Criticos</p>
              <p className="text-xl font-bold text-red-500">5</p>
              <p className="text-[10px] text-red-500">Atencao</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Contratos</p>
              <p className="text-xl font-bold text-foreground">28</p>
              <p className="text-[10px] text-muted-foreground">Vigentes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderCardHibrido("Performance de Entrega", indicadoresSuprimentos.performance, Truck)}
          {renderCardHibrido("Gestao de Fornecedores", indicadoresSuprimentos.fornecedores, CheckCircle)}
          {renderCardHibrido("Gestao de Estoque", indicadoresSuprimentos.estoque, Package)}
          {renderCardHibrido("Custos e Economia", indicadoresSuprimentos.custos, DollarSign)}
        </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function AnaliseSuprimentosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <AnaliseSuprimentosContent />
    </Suspense>
  )
}
