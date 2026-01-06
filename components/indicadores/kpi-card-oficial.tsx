"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, History, BarChart3 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KPICardOficialProps {
  codigo: string
  nome: string
  valor: number
  meta: number
  previsto?: number
  anterior: number
  formula: string
  historico: number[]
  historicoMeta?: number[]
  historicoPrevisto?: number[]
  periodos?: string[]
  icone: LucideIcon
  formato?: "decimal" | "percentual" | "moeda"
  inverso?: boolean
  onClick?: () => void
}

export function KPICardOficial({
  codigo,
  nome,
  valor,
  meta,
  previsto,
  anterior,
  formula,
  historico,
  historicoMeta,
  historicoPrevisto,
  periodos,
  icone: Icone,
  formato = "decimal",
  inverso = false,
  onClick,
}: KPICardOficialProps) {
  const [modalAberto, setModalAberto] = useState(false)

  // Calcula status baseado em meta
  const getStatus = () => {
    if (inverso) {
      if (valor <= meta)
        return { cor: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500", label: "Na Meta" }
      if (valor <= meta * 1.1)
        return { cor: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500", label: "Atenção" }
      return { cor: "text-red-600 dark:text-red-400", bg: "bg-red-500", label: "Crítico" }
    } else {
      if (valor >= meta)
        return { cor: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500", label: "Na Meta" }
      if (valor >= meta * 0.9)
        return { cor: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500", label: "Atenção" }
      return { cor: "text-red-600 dark:text-red-400", bg: "bg-red-500", label: "Crítico" }
    }
  }

  const status = getStatus()

  // Calcula tendência
  const tendencia = ((valor - anterior) / Math.abs(anterior || 1)) * 100
  const tendenciaPositiva = inverso ? tendencia < 0 : tendencia > 0

  // Formata valor
  const formatarValor = (val: number) => {
    if (formato === "percentual") return `${(val * 100).toFixed(1)}%`
    if (formato === "moeda") return `R$ ${val.toFixed(2)}`
    return val.toFixed(2)
  }

  // Desvio Realizado vs Meta
  const desvioMeta = ((valor - meta) / Math.abs(meta || 1)) * 100
  const desvioPositivo = inverso ? desvioMeta < 0 : desvioMeta > 0

  // Desvio Realizado vs Previsto
  const desvioPrevisto = previsto ? ((valor - previsto) / Math.abs(previsto || 1)) * 100 : 0
  const desvioPrevistoPositivo = inverso ? desvioPrevisto < 0 : desvioPrevisto > 0

  // Historico com defaults
  const hist = historico || []
  const histMeta = historicoMeta || hist.map(() => meta)
  const histPrevisto = historicoPrevisto || hist.map((_, i) => hist[i] * 0.95)
  const labels = periodos || ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]

  // Calcula acumulado
  const calcularAcumulado = (arr: number[]) => {
    let acum = 0
    return arr.map((v) => (acum += v))
  }

  const histAcumulado = calcularAcumulado(hist)
  const histMetaAcumulado = calcularAcumulado(histMeta)
  const histPrevistoAcumulado = calcularAcumulado(histPrevisto)

  // Max para graficos
  const maxHist = Math.max(...hist, ...histMeta, ...histPrevisto, 1)
  const maxAcum = Math.max(...histAcumulado, ...histMetaAcumulado, ...histPrevistoAcumulado, 1)

  const handleCardClick = () => {
    if (onClick) onClick()
    setModalAberto(true)
  }

  return (
    <>
      <div
        className="p-4 rounded-xl border-2 cursor-pointer hover:shadow-md transition-all bg-card hover:border-primary/30"
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-mono font-semibold">
              {codigo}
            </Badge>
            <span className="text-xs text-muted-foreground">{nome}</span>
          </div>
          <Badge
            variant="secondary"
            className={`text-xs ${
              status.label === "Na Meta"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : status.label === "Atenção"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {status.label}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-3">{formula}</p>

        <div className="mb-4">
          <div className={`text-3xl font-bold ${status.cor}`}>{formatarValor(valor)}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 p-2 rounded-lg bg-muted/50">
          {/* Previsto */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Previsto</div>
            <div className="text-sm font-semibold text-muted-foreground">{formatarValor(previsto || valor * 0.95)}</div>
          </div>
          {/* Realizado */}
          <div className="text-center border-x border-border">
            <div className="text-xs text-muted-foreground mb-1">Realizado</div>
            <div className={`text-sm font-bold ${status.cor}`}>{formatarValor(valor)}</div>
          </div>
          {/* Meta */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Meta</div>
            <div className="text-sm font-semibold text-primary">{formatarValor(meta)}</div>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16">Previsto</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-muted-foreground/40"
                style={{ width: `${Math.min(100, ((previsto || valor * 0.95) / maxHist) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16">Realizado</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${status.bg}`}
                style={{ width: `${Math.min(100, (valor / maxHist) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16">Meta</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, (meta / maxHist) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mini Gráfico Histórico */}
        {hist.length > 0 && (
          <div className="flex items-end gap-1 h-10 mb-3">
            {hist.slice(-6).map((val, i) => {
              const altura = (val / maxHist) * 100
              const isUltimo = i === hist.slice(-6).length - 1
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t transition-all ${isUltimo ? status.bg : "bg-muted-foreground/30"}`}
                  style={{ height: `${Math.max(15, altura)}%` }}
                />
              )
            })}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">vs Meta:</span>
            <span
              className={`text-xs font-semibold ${desvioPositivo ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
            >
              {desvioPositivo ? "+" : ""}
              {desvioMeta.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">vs Prev:</span>
            <span
              className={`text-xs font-semibold ${desvioPrevistoPositivo ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
            >
              {desvioPrevistoPositivo ? "+" : ""}
              {desvioPrevisto.toFixed(1)}%
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2"
            onClick={(e) => {
              e.stopPropagation()
              setModalAberto(true)
            }}
          >
            <History className="h-3 w-3 mr-1" />
            <span className="text-xs">Histórico</span>
          </Button>
        </div>
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {codigo}
              </Badge>
              <span>{nome}</span>
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  status.label === "Na Meta"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : status.label === "Atenção"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {status.label}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="periodo" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="periodo" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Por Período
              </TabsTrigger>
              <TabsTrigger value="acumulado" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Acumulado
              </TabsTrigger>
            </TabsList>

            {/* Por Período */}
            <TabsContent value="periodo" className="mt-4">
              <div className="space-y-4">
                {/* Legenda */}
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-muted-foreground/40" />
                    <span className="text-sm">Previsto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${status.bg}`} />
                    <span className="text-sm">Realizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span className="text-sm">Meta</span>
                  </div>
                </div>

                {/* Gráfico de Barras */}
                <div className="h-64 flex items-end gap-2 p-4 bg-muted/30 rounded-lg">
                  {labels.slice(0, hist.length || 6).map((label, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center gap-1 h-48">
                        {/* Previsto */}
                        <div
                          className="w-4 rounded-t bg-muted-foreground/40 transition-all"
                          style={{ height: `${(histPrevisto[i] / maxHist) * 100}%` }}
                          title={`Previsto: ${formatarValor(histPrevisto[i])}`}
                        />
                        {/* Realizado */}
                        <div
                          className={`w-4 rounded-t ${status.bg} transition-all`}
                          style={{ height: `${(hist[i] / maxHist) * 100}%` }}
                          title={`Realizado: ${formatarValor(hist[i])}`}
                        />
                        {/* Meta */}
                        <div
                          className="w-4 rounded-t bg-primary transition-all"
                          style={{ height: `${(histMeta[i] / maxHist) * 100}%` }}
                          title={`Meta: ${formatarValor(histMeta[i])}`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Tabela Resumo */}
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Período</th>
                        <th className="px-3 py-2 text-right font-medium">Previsto</th>
                        <th className="px-3 py-2 text-right font-medium">Realizado</th>
                        <th className="px-3 py-2 text-right font-medium">Meta</th>
                        <th className="px-3 py-2 text-right font-medium">Desvio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labels.slice(0, hist.length || 6).map((label, i) => {
                        const desvio = ((hist[i] - histMeta[i]) / histMeta[i]) * 100
                        const desvioOk = inverso ? desvio <= 0 : desvio >= 0
                        return (
                          <tr key={i} className="border-t">
                            <td className="px-3 py-2 font-medium">{label}</td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {formatarValor(histPrevisto[i])}
                            </td>
                            <td
                              className={`px-3 py-2 text-right font-semibold ${desvioOk ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {formatarValor(hist[i])}
                            </td>
                            <td className="px-3 py-2 text-right text-primary">{formatarValor(histMeta[i])}</td>
                            <td
                              className={`px-3 py-2 text-right font-semibold ${desvioOk ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {desvioOk ? "+" : ""}
                              {desvio.toFixed(1)}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Acumulado */}
            <TabsContent value="acumulado" className="mt-4">
              <div className="space-y-4">
                {/* Legenda */}
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-muted-foreground/40" />
                    <span className="text-sm">Previsto Acum.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-0.5 ${status.bg}`} />
                    <span className="text-sm">Realizado Acum.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-primary border-dashed border-t-2 border-primary" />
                    <span className="text-sm">Meta Acum.</span>
                  </div>
                </div>

                {/* Gráfico de Linhas (simulado com barras conectadas) */}
                <div className="h-64 p-4 bg-muted/30 rounded-lg relative">
                  <div className="absolute inset-4 flex items-end">
                    {labels.slice(0, hist.length || 6).map((_, i) => (
                      <div key={i} className="flex-1 relative h-full">
                        {/* Linha Previsto */}
                        <div
                          className="absolute bottom-0 left-1/2 w-2 bg-muted-foreground/40 rounded-t"
                          style={{
                            height: `${(histPrevistoAcumulado[i] / maxAcum) * 100}%`,
                            transform: "translateX(-150%)",
                          }}
                        />
                        {/* Linha Realizado */}
                        <div
                          className={`absolute bottom-0 left-1/2 w-2 ${status.bg} rounded-t`}
                          style={{ height: `${(histAcumulado[i] / maxAcum) * 100}%`, transform: "translateX(-50%)" }}
                        />
                        {/* Linha Meta */}
                        <div
                          className="absolute bottom-0 left-1/2 w-2 bg-primary rounded-t"
                          style={{ height: `${(histMetaAcumulado[i] / maxAcum) * 100}%`, transform: "translateX(50%)" }}
                        />
                        {/* Label */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                          {labels[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabela Resumo Acumulado */}
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Período</th>
                        <th className="px-3 py-2 text-right font-medium">Previsto Acum.</th>
                        <th className="px-3 py-2 text-right font-medium">Realizado Acum.</th>
                        <th className="px-3 py-2 text-right font-medium">Meta Acum.</th>
                        <th className="px-3 py-2 text-right font-medium">Desvio Acum.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labels.slice(0, hist.length || 6).map((label, i) => {
                        const desvio = ((histAcumulado[i] - histMetaAcumulado[i]) / histMetaAcumulado[i]) * 100
                        const desvioOk = inverso ? desvio <= 0 : desvio >= 0
                        return (
                          <tr key={i} className="border-t">
                            <td className="px-3 py-2 font-medium">{label}</td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {formatarValor(histPrevistoAcumulado[i])}
                            </td>
                            <td
                              className={`px-3 py-2 text-right font-semibold ${desvioOk ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {formatarValor(histAcumulado[i])}
                            </td>
                            <td className="px-3 py-2 text-right text-primary">{formatarValor(histMetaAcumulado[i])}</td>
                            <td
                              className={`px-3 py-2 text-right font-semibold ${desvioOk ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {desvioOk ? "+" : ""}
                              {desvio.toFixed(1)}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
