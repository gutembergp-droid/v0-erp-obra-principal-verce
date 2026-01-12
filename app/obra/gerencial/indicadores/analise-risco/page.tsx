"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
  Shield,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react"

const riscos = [
  {
    id: 1,
    nome: "Atraso Cronograma",
    categoria: "Prazo",
    probabilidade: 4,
    impacto: 5,
    score: 20,
    status: "critico",
    tendencia: "estavel",
    mitigacao: "Aceleracao de frentes",
  },
  {
    id: 2,
    nome: "Estouro de Custo",
    categoria: "Custo",
    probabilidade: 3,
    impacto: 4,
    score: 12,
    status: "alto",
    tendencia: "melhorando",
    mitigacao: "Controle rigoroso",
  },
  {
    id: 3,
    nome: "Glosas Recorrentes",
    categoria: "Contrato",
    probabilidade: 4,
    impacto: 3,
    score: 12,
    status: "alto",
    tendencia: "piorando",
    mitigacao: "Reuniao com cliente",
  },
  {
    id: 4,
    nome: "Inadimplencia Cliente",
    categoria: "Financeiro",
    probabilidade: 3,
    impacto: 4,
    score: 12,
    status: "alto",
    tendencia: "estavel",
    mitigacao: "Negociacao ativa",
  },
  {
    id: 5,
    nome: "Acidente de Trabalho",
    categoria: "SSMA",
    probabilidade: 2,
    impacto: 5,
    score: 10,
    status: "medio",
    tendencia: "melhorando",
    mitigacao: "DDS reforçado",
  },
  {
    id: 6,
    nome: "Falta de Material",
    categoria: "Suprimentos",
    probabilidade: 3,
    impacto: 3,
    score: 9,
    status: "medio",
    tendencia: "estavel",
    mitigacao: "Estoque minimo",
  },
  {
    id: 7,
    nome: "Rotatividade MO",
    categoria: "RH",
    probabilidade: 3,
    impacto: 2,
    score: 6,
    status: "baixo",
    tendencia: "melhorando",
    mitigacao: "Programa retencao",
  },
  {
    id: 8,
    nome: "Chuvas Intensas",
    categoria: "Clima",
    probabilidade: 4,
    impacto: 2,
    score: 8,
    status: "medio",
    tendencia: "estavel",
    mitigacao: "Plano contingencia",
  },
]

const matrizRisco = {
  criticos: riscos.filter((r) => r.score >= 15).length,
  altos: riscos.filter((r) => r.score >= 10 && r.score < 15).length,
  medios: riscos.filter((r) => r.score >= 5 && r.score < 10).length,
  baixos: riscos.filter((r) => r.score < 5).length,
}

const indicadoresRisco = [
  { nome: "Indice Geral de Risco", valor: 2.4, meta: 2.0, status: "atencao" },
  { nome: "Riscos Mitigados", valor: 12, meta: 15, status: "atencao" },
  { nome: "Planos de Acao", valor: 18, meta: 20, status: "ok" },
  { nome: "Eficacia Mitigacao", valor: 78, meta: 85, status: "atencao" },
]

function AnaliseRiscoContent() {
  const router = useRouter()
  const [selectedRisco, setSelectedRisco] = useState<(typeof riscos)[0] | null>(null)

  const navegarPara = (rota: string) => router.push(rota)

  const getScoreColor = (score: number) => {
    if (score >= 15) return "bg-red-500"
    if (score >= 10) return "bg-amber-500"
    if (score >= 5) return "bg-yellow-500"
    return "bg-emerald-500"
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraGerencialNavbar />
      </div>

      {/* Topbar Terciário */}
      <div className="flex-shrink-0 z-30 mt-3">
        <IndicadoresTabsNavbar />
      </div>

      {/* Conteúdo com moldura */}
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6"
          style={{
            borderRadius: '25px',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="space-y-6">
            {/* Header sem navegação duplicada */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Análise de Risco</h1>
                <Badge variant="secondary">Matriz de Riscos</Badge>
              </div>
            </div>

        {/* Cards resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Riscos Criticos</p>
              <p className="text-2xl font-bold text-red-500">{matrizRisco.criticos}</p>
              <div className="mt-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(matrizRisco.criticos / riscos.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Riscos Altos</p>
              <p className="text-2xl font-bold text-amber-500">{matrizRisco.altos}</p>
              <div className="mt-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(matrizRisco.altos / riscos.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Riscos Medios</p>
              <p className="text-2xl font-bold text-yellow-500">{matrizRisco.medios}</p>
              <div className="mt-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${(matrizRisco.medios / riscos.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Riscos Baixos</p>
              <p className="text-2xl font-bold text-emerald-500">{matrizRisco.baixos}</p>
              <div className="mt-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(matrizRisco.baixos / riscos.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Riscos</p>
              <p className="text-2xl font-bold text-foreground">{riscos.length}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Indice Geral</p>
              <p className="text-2xl font-bold text-amber-500">2.4</p>
              <p className="text-[10px] text-muted-foreground">Meta: 2.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            {/* Matriz visual */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Matriz de Riscos (Probabilidade x Impacto)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-1">
                  <div className="col-span-1" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-center text-[10px] text-muted-foreground font-medium">
                      I{i}
                    </div>
                  ))}
                  {[5, 4, 3, 2, 1].map((p) => (
                    <>
                      <div
                        key={`p${p}`}
                        className="text-center text-[10px] text-muted-foreground font-medium flex items-center justify-center"
                      >
                        P{p}
                      </div>
                      {[1, 2, 3, 4, 5].map((i) => {
                        const score = p * i
                        const riscosNaCelula = riscos.filter((r) => r.probabilidade === p && r.impacto === i)
                        return (
                          <div
                            key={`${p}-${i}`}
                            className={`h-12 rounded flex items-center justify-center text-xs font-bold text-white ${
                              score >= 15
                                ? "bg-red-500"
                                : score >= 10
                                  ? "bg-amber-500"
                                  : score >= 5
                                    ? "bg-yellow-500"
                                    : "bg-emerald-500"
                            } ${riscosNaCelula.length > 0 ? "ring-2 ring-foreground" : ""}`}
                          >
                            {riscosNaCelula.length > 0 ? riscosNaCelula.length : ""}
                          </div>
                        )
                      })}
                    </>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-[10px]">Critico (15-25)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-amber-500" />
                    <span className="text-[10px]">Alto (10-14)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-yellow-500" />
                    <span className="text-[10px]">Medio (5-9)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-emerald-500" />
                    <span className="text-[10px]">Baixo (1-4)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de riscos */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Riscos Identificados</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {riscos.map((risco) => (
                    <div
                      key={risco.id}
                      className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedRisco(risco)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getScoreColor(risco.score)}`} />
                          <span className="text-sm font-medium text-foreground">{risco.nome}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {risco.categoria}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {risco.tendencia === "melhorando" && <TrendingDown className="h-3 w-3 text-emerald-500" />}
                          {risco.tendencia === "piorando" && <TrendingUp className="h-3 w-3 text-red-500" />}
                          <Badge className={`${getScoreColor(risco.score)} text-white`}>{risco.score}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>P: {risco.probabilidade}</span>
                        <span>I: {risco.impacto}</span>
                        <span className="truncate">Mitigacao: {risco.mitigacao}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel lateral */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Indicadores de Risco</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {indicadoresRisco.map((ind, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{ind.nome}</span>
                      <span
                        className={`text-sm font-bold ${ind.status === "ok" ? "text-emerald-500" : "text-amber-500"}`}
                      >
                        {ind.valor}
                        {typeof ind.valor === "number" && ind.valor > 10 ? "%" : ""}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div
                        className={`h-full rounded-full ${ind.status === "ok" ? "bg-emerald-500" : "bg-amber-500"}`}
                        style={{ width: `${Math.min((ind.valor / ind.meta) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Acoes Urgentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {riscos
                  .filter((r) => r.score >= 15)
                  .map((risco) => (
                    <div key={risco.id} className="p-2 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <p className="text-xs font-medium text-foreground">{risco.nome}</p>
                      <p className="text-[10px] text-muted-foreground">{risco.mitigacao}</p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Sheet open={!!selectedRisco} onOpenChange={() => setSelectedRisco(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{selectedRisco?.nome}</SheetTitle>
          </SheetHeader>
          {selectedRisco && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="text-2xl font-bold">{selectedRisco.probabilidade}</p>
                  <p className="text-xs text-muted-foreground">Probabilidade</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="text-2xl font-bold">{selectedRisco.impacto}</p>
                  <p className="text-xs text-muted-foreground">Impacto</p>
                </div>
                <div className={`p-3 rounded-lg text-center text-white ${getScoreColor(selectedRisco.score)}`}>
                  <p className="text-2xl font-bold">{selectedRisco.score}</p>
                  <p className="text-xs">Score</p>
                </div>
              </div>
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">Plano de Mitigacao</h4>
                  <p className="text-sm text-muted-foreground">{selectedRisco.mitigacao}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
        </div>
      </main>
    </div>
  )
}

export default function AnaliseRiscoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <AnaliseRiscoContent />
    </Suspense>
  )
}
