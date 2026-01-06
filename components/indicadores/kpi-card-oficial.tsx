"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KPICardOficialProps {
  codigo: string
  nome: string
  valor: number
  meta: number
  anterior: number
  formula: string
  historico: number[]
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
  anterior,
  formula,
  historico,
  icone: Icone,
  formato = "decimal",
  inverso = false,
  onClick,
}: KPICardOficialProps) {
  // Calcula status baseado em meta
  const getStatus = () => {
    if (inverso) {
      if (valor <= meta) return { cor: "text-emerald-600", bg: "bg-emerald-500", label: "Na Meta" }
      if (valor <= meta * 1.1) return { cor: "text-amber-600", bg: "bg-amber-500", label: "Atenção" }
      return { cor: "text-red-600", bg: "bg-red-500", label: "Crítico" }
    } else {
      if (valor >= meta) return { cor: "text-emerald-600", bg: "bg-emerald-500", label: "Na Meta" }
      if (valor >= meta * 0.9) return { cor: "text-amber-600", bg: "bg-amber-500", label: "Atenção" }
      return { cor: "text-red-600", bg: "bg-red-500", label: "Crítico" }
    }
  }

  const status = getStatus()

  // Calcula tendência
  const tendencia = ((valor - anterior) / Math.abs(anterior || 1)) * 100
  const tendenciaPositiva = inverso ? tendencia < 0 : tendencia > 0

  // Formata valor
  const formatarValor = (val: number) => {
    if (formato === "percentual") return `${(val * 100).toFixed(2)}%`
    if (formato === "moeda") return `R$ ${val.toFixed(2)}`
    return val.toFixed(2)
  }

  // Calcula percentual da barra
  const percentualBarra = inverso ? Math.min(100, (meta / (valor || 1)) * 100) : Math.min(100, (valor / meta) * 100)

  const hist = historico || []
  const maxHistorico = hist.length > 0 ? Math.max(...hist) : 0
  const minHistorico = hist.length > 0 ? Math.min(...hist) : 0
  const range = maxHistorico - minHistorico || 1

  return (
    <div
      className="p-4 rounded-xl border-2 cursor-pointer hover:shadow-md transition-all bg-card hover:border-primary/30"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs font-mono font-semibold">
          {codigo}
        </Badge>
        <div className={`p-1.5 rounded-full ${status.bg}/20`}>
          {Icone && <Icone className={`h-4 w-4 ${status.cor}`} />}
        </div>
      </div>

      {/* Valor Principal */}
      <div className="mb-3">
        <div className={`text-2xl font-bold ${status.cor}`}>{formatarValor(valor)}</div>
        <p className="text-xs text-muted-foreground truncate">{nome}</p>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">Meta: {formatarValor(meta)}</span>
          <span className={status.cor}>{percentualBarra.toFixed(0)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className={`h-full rounded-full transition-all ${status.bg}`} style={{ width: `${percentualBarra}%` }} />
        </div>
      </div>

      {/* Mini Gráfico Histórico */}
      {hist.length > 0 && (
        <div className="flex items-end gap-1 h-8 mb-3">
          {hist.map((val, i) => {
            const altura = ((val - minHistorico) / range) * 100
            const isUltimo = i === hist.length - 1
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

      {/* Tendência */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">vs anterior</span>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${tendenciaPositiva ? "text-emerald-600" : "text-red-600"}`}
        >
          {tendenciaPositiva ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(tendencia).toFixed(1)}%
        </div>
      </div>
    </div>
  )
}
