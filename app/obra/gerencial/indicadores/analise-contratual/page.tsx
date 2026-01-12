"use client"

import { useState, Suspense } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { KPICardOficial, AlertasModulo } from "@/components/indicadores"
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
  Calendar,
  FileCheck,
  Receipt,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const kpisOficiais = [
  {
    codigo: "RC/CT",
    nome: "Receita Medida / Contratada",
    valor: 67.4,
    meta: 70,
    formula: "Receita Medida Acumulada / Valor Contratado",
    interpretacao: "Percentual de execucao do contrato em termos de receita",
    acaoGerencial: "Se < meta: Acelerar frentes de medicao",
    tendencia: "subindo" as const,
    historico: [58, 61, 63, 65, 67.4],
  },
  {
    codigo: "AP/MD",
    nome: "Aprovado / Medido",
    valor: 95.8,
    meta: 98,
    formula: "Receita Aprovada Cliente / Receita Medida",
    interpretacao: "Taxa de aprovacao das medicoes pelo cliente",
    acaoGerencial: "Se < meta: Revisar qualidade das medicoes",
    tendencia: "estavel" as const,
    historico: [94, 94.5, 95, 95.5, 95.8],
  },
  {
    codigo: "FT/AP",
    nome: "Faturado / Aprovado",
    valor: 96.4,
    meta: 100,
    formula: "Total Faturado / Receita Aprovada",
    interpretacao: "Eficiencia na conversao de aprovacoes em faturamento",
    acaoGerencial: "Se < meta: Agilizar emissao de NFs",
    tendencia: "subindo" as const,
    historico: [92, 93, 94, 95, 96.4],
  },
  {
    codigo: "RB/FT",
    nome: "Recebido / Faturado",
    valor: 97.0,
    meta: 100,
    formula: "Total Recebido / Total Faturado",
    interpretacao: "Taxa de adimplencia do cliente",
    acaoGerencial: "Se < meta: Acionar cobranca",
    tendencia: "estavel" as const,
    historico: [95, 96, 96.5, 96.8, 97],
  },
]

const indicadoresContrato = {
  receita: [
    {
      nome: "Valor Contratado",
      valor: 245000000,
      meta: 245000000,
      formato: "moeda",
      historico: [180, 200, 220, 235, 245],
    },
    {
      nome: "Medido Acumulado",
      valor: 165200000,
      meta: 171500000,
      formato: "moeda",
      historico: [98, 120, 142, 156, 165.2],
    },
    {
      nome: "Aprovado Cliente",
      valor: 158400000,
      meta: 165200000,
      formato: "moeda",
      historico: [95, 115, 138, 150, 158.4],
    },
    { nome: "Saldo a Medir", valor: 79800000, meta: 73500000, formato: "moeda", historico: [147, 125, 103, 89, 79.8] },
  ],
  faturamento: [
    {
      nome: "Total Faturado",
      valor: 152800000,
      meta: 158400000,
      formato: "moeda",
      historico: [92, 112, 132, 145, 152.8],
    },
    {
      nome: "Total Recebido",
      valor: 148200000,
      meta: 152800000,
      formato: "moeda",
      historico: [88, 108, 128, 140, 148.2],
    },
    { nome: "Prazo Medio (dias)", valor: 32, meta: 30, formato: "numero", historico: [38, 36, 35, 33, 32] },
    { nome: "Inadimplencia", valor: 4600000, meta: 0, formato: "moeda", historico: [2.1, 3.2, 3.8, 4.2, 4.6] },
  ],
  cronograma: [
    { nome: "Avanco Fisico", valor: 67.4, meta: 70, formato: "percent", historico: [45, 52, 58, 64, 67.4] },
    { nome: "SPI Contratual", valor: 0.96, meta: 1.0, formato: "decimal", historico: [0.91, 0.93, 0.94, 0.95, 0.96] },
    { nome: "Desvio Prazo (dias)", valor: 12, meta: 0, formato: "numero", historico: [25, 22, 18, 15, 12] },
    { nome: "Marcos Atrasados", valor: 2, meta: 0, formato: "numero", historico: [4, 3, 3, 2, 2] },
  ],
  changeControl: [
    { nome: "Aditivos Aprovados", valor: 3, meta: 0, formato: "numero", historico: [0, 1, 2, 2, 3] },
    { nome: "Valor Aditivos", valor: 18500000, meta: 0, formato: "moeda", historico: [0, 5, 12, 15, 18.5] },
    { nome: "Pleitos Abertos", valor: 2, meta: 0, formato: "numero", historico: [1, 2, 3, 2, 2] },
    { nome: "Claims Pendentes", valor: 1, meta: 0, formato: "numero", historico: [0, 0, 1, 1, 1] },
  ],
  desvios: [
    { nome: "Glosas Acumuladas", valor: 890000, meta: 500000, formato: "moeda", historico: [320, 480, 620, 780, 890] },
    { nome: "Glosas Revertidas", valor: 420000, meta: 500000, formato: "moeda", historico: [120, 180, 280, 350, 420] },
    { nome: "NC Cliente", valor: 2, meta: 0, formato: "numero", historico: [0, 1, 1, 2, 2] },
    { nome: "Contestacoes", valor: 3, meta: 0, formato: "numero", historico: [1, 2, 2, 3, 3] },
  ],
}

const alertasContrato = [
  {
    id: "1",
    tipo: "critico" as const,
    titulo: "Glosas Acima do Limite",
    descricao: "R$ 890k vs R$ 500k limite",
    acao: "Reuniao com cliente",
  },
  {
    id: "2",
    tipo: "atencao" as const,
    titulo: "SPI Abaixo da Meta",
    descricao: "0.96 vs 1.0 meta",
    acao: "Revisar cronograma",
  },
  {
    id: "3",
    tipo: "atencao" as const,
    titulo: "Inadimplencia Pendente",
    descricao: "R$ 4.6M a receber vencido",
    acao: "Acionar financeiro",
  },
  {
    id: "4",
    tipo: "info" as const,
    titulo: "Aditivos Aprovados",
    descricao: "3 aditivos = R$ 18.5M",
    acao: "Atualizar baseline",
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

function AnaliseContratualContent() {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedKPI, setSelectedKPI] = useState<(typeof kpisOficiais)[0] | null>(null)

  const navegarPara = (rota: string) => router.push(rota)

  const isAtivo = (rota: string) => pathname === rota

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
                <h1 className="text-2xl font-bold text-foreground">Análise Contratual</h1>
                <Badge variant="secondary">100% Cliente</Badge>
              </div>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  KPIs Oficiais do Contrato (Manual GNESIS)
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

            {/* Grid de indicadores detalhados */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderCardCategoria("Receita Contratual", indicadoresContrato.receita, DollarSign)}
                  {renderCardCategoria("Faturamento e Recebimento", indicadoresContrato.faturamento, Receipt)}
                  {renderCardCategoria("Cronograma Contratual", indicadoresContrato.cronograma, Calendar)}
                  {renderCardCategoria("Change Control", indicadoresContrato.changeControl, FileCheck)}
                </div>
                {renderCardCategoria("Desvios Contratuais", indicadoresContrato.desvios, Scale)}
              </div>

              {/* Painel lateral */}
              <div className="lg:col-span-4">
                <AlertasModulo
                  alertas={alertasContrato}
                  titulo="Alertas Contratuais"
                  onAlertaClick={(alerta) => console.log("Alerta clicado:", alerta)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

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
                <p className="text-4xl font-bold text-foreground">{selectedKPI.valor}%</p>
                <p className="text-sm text-muted-foreground mt-1">Meta: {selectedKPI.meta}%</p>
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
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Historico (5 meses)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 h-24">
                    {selectedKPI.historico.map((h, idx) => {
                      const max = Math.max(...selectedKPI.historico)
                      const altura = (h / max) * 100
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-t ${idx === selectedKPI.historico.length - 1 ? "bg-primary" : "bg-muted-foreground/30"}`}
                            style={{ height: `${altura}%` }}
                          />
                          <span className="text-[10px] text-muted-foreground">{h}%</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div >
  )
}

export default function AnaliseContratualPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <AnaliseContratualContent />
    </Suspense>
  )
}
