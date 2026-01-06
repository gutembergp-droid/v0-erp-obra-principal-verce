"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, BarChart2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KPIData {
  nome: string
  valor: number
  meta: number
  unidade?: string
  prev?: number
  tendencia?: number
  inverso?: boolean
}

interface TemaData {
  nome: string
  icone: LucideIcon
  kpis: KPIData[]
  historico: number[]
}

interface CardConsolidadoProps {
  titulo: string
  temas: Record<string, TemaData>
  onKPIClick?: (kpi: KPIData) => void
}

export function CardConsolidado({ titulo, temas, onKPIClick }: CardConsolidadoProps) {
  const temasKeys = temas ? Object.keys(temas) : []
  const [temaSelecionado, setTemaSelecionado] = useState(temasKeys[0] || "")
  const [visao, setVisao] = useState<"grafico" | "tabela">("grafico")

  if (!temas || temasKeys.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nenhum dado disponivel</p>
        </CardContent>
      </Card>
    )
  }

  const tema = temas[temaSelecionado]

  if (!tema) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Tema nao encontrado</p>
        </CardContent>
      </Card>
    )
  }

  const Icone = tema.icone
  const meses = ["Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const getStatus = (valor: number, meta: number, inverso?: boolean) => {
    const percentual = inverso ? (meta / (valor || 1)) * 100 : (valor / meta) * 100
    if (percentual >= 95) return { cor: "text-emerald-600", bg: "bg-emerald-500" }
    if (percentual >= 80) return { cor: "text-amber-600", bg: "bg-amber-500" }
    return { cor: "text-red-600", bg: "bg-red-500" }
  }

  const formatarValor = (valor: number, unidade?: string) => {
    if (unidade === "M") return `R$ ${valor.toFixed(1)}M`
    if (unidade === "k") return `R$ ${valor.toFixed(0)}k`
    if (unidade === "%") return `${valor.toFixed(1)}%`
    if (unidade === "d") return `${valor}d`
    return valor.toFixed(2)
  }

  const calcularPercentual = (valor: number, meta: number, inverso?: boolean) => {
    if (meta === 0) return inverso ? (valor === 0 ? 100 : 0) : 100
    return Math.min(100, inverso ? (meta / (valor || 1)) * 100 : (valor / meta) * 100)
  }

  const historico = tema.historico || []
  const kpis = tema.kpis || []
  const maxHist = historico.length > 0 ? Math.max(...historico) : 0
  const minHist = historico.length > 0 ? Math.min(...historico) : 0
  const rangeHist = maxHist - minHist || 1

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">{Icone && <Icone className="h-5 w-5 text-primary" />}</div>
            <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Select value={temaSelecionado} onValueChange={setTemaSelecionado}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {temasKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {temas[key]?.nome || key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center border rounded-md">
              <Button
                variant={visao === "grafico" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setVisao("grafico")}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button
                variant={visao === "tabela" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setVisao("tabela")}
              >
                <Table className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {visao === "grafico" ? (
          <div className="space-y-4">
            {/* KPIs principais - 4 primeiros */}
            <div className="grid grid-cols-4 gap-3">
              {kpis.slice(0, 4).map((kpi, i) => {
                const status = getStatus(kpi.valor, kpi.meta, kpi.inverso)
                const percentual = calcularPercentual(kpi.valor, kpi.meta, kpi.inverso)
                const tendencia = kpi.tendencia ?? 0
                const tendenciaPositiva = kpi.inverso ? tendencia < 0 : tendencia > 0

                return (
                  <div
                    key={i}
                    className="p-3 rounded-lg border bg-card hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => onKPIClick?.(kpi)}
                  >
                    <p className="text-xs text-muted-foreground mb-1 truncate">{kpi.nome}</p>
                    <div className="flex items-end justify-between mb-2">
                      <span className={`text-xl font-bold ${status.cor}`}>{formatarValor(kpi.valor, kpi.unidade)}</span>
                      <span className="text-xs text-muted-foreground">/ {formatarValor(kpi.meta, kpi.unidade)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                      <div className={`h-full rounded-full ${status.bg}`} style={{ width: `${percentual}%` }} />
                    </div>
                    {tendencia !== 0 && (
                      <div
                        className={`flex items-center gap-0.5 text-xs ${tendenciaPositiva ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {tendenciaPositiva ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(tendencia).toFixed(1)}%
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Gráfico de evolução */}
            {historico.length > 0 && (
              <div className="p-3 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Evolução (6 meses)</p>
                <div className="flex items-end gap-2 h-16">
                  {historico.map((val, i) => {
                    const altura = ((val - minHist) / rangeHist) * 100
                    const isUltimo = i === historico.length - 1
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full rounded-t transition-all ${isUltimo ? "bg-primary" : "bg-muted-foreground/40"}`}
                          style={{ height: `${Math.max(20, altura)}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">{meses[i]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* KPIs secundários - restantes */}
            {kpis.length > 4 && (
              <div className="grid grid-cols-2 gap-2">
                {kpis.slice(4).map((kpi, i) => {
                  const status = getStatus(kpi.valor, kpi.meta, kpi.inverso)
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded border bg-card cursor-pointer hover:bg-muted/50"
                      onClick={() => onKPIClick?.(kpi)}
                    >
                      <span className="text-xs text-muted-foreground">{kpi.nome}</span>
                      <span className={`text-sm font-semibold ${status.cor}`}>
                        {formatarValor(kpi.valor, kpi.unidade)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          /* Modo Tabela */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">Indicador</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Atual</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Meta</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Anterior</th>
                  <th className="text-center py-2 px-2 font-medium text-muted-foreground">%</th>
                  <th className="text-center py-2 px-2 font-medium text-muted-foreground">Tendência</th>
                  <th className="text-center py-2 px-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((kpi, i) => {
                  const status = getStatus(kpi.valor, kpi.meta, kpi.inverso)
                  const percentual = calcularPercentual(kpi.valor, kpi.meta, kpi.inverso)
                  const tendencia = kpi.tendencia ?? 0
                  const tendenciaPositiva = kpi.inverso ? tendencia < 0 : tendencia > 0

                  return (
                    <tr
                      key={i}
                      className="border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                      onClick={() => onKPIClick?.(kpi)}
                    >
                      <td className="py-2 px-2">{kpi.nome}</td>
                      <td className={`text-right py-2 px-2 font-semibold ${status.cor}`}>
                        {formatarValor(kpi.valor, kpi.unidade)}
                      </td>
                      <td className="text-right py-2 px-2 text-muted-foreground">
                        {formatarValor(kpi.meta, kpi.unidade)}
                      </td>
                      <td className="text-right py-2 px-2 text-muted-foreground">
                        {kpi.prev ? formatarValor(kpi.prev, kpi.unidade) : "-"}
                      </td>
                      <td className="text-center py-2 px-2">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full ${status.bg}`} style={{ width: `${percentual}%` }} />
                          </div>
                          <span className="text-xs">{percentual.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="text-center py-2 px-2">
                        {tendencia !== 0 && (
                          <div
                            className={`flex items-center justify-center gap-0.5 text-xs ${tendenciaPositiva ? "text-emerald-600" : "text-red-600"}`}
                          >
                            {tendenciaPositiva ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(tendencia).toFixed(1)}%
                          </div>
                        )}
                      </td>
                      <td className="text-center py-2 px-2">
                        <Badge variant="outline" className={`text-xs ${status.cor}`}>
                          {percentual >= 95 ? "OK" : percentual >= 80 ? "Atenção" : "Crítico"}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
