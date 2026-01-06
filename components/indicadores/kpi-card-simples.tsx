"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KPICardSimplesProps {
  nome: string
  valor: number
  meta: number
  unidade?: string
  anterior?: number
  tendencia?: number
  inverso?: boolean
  icone?: LucideIcon
  onClick?: () => void
}

export function KPICardSimples({
  nome,
  valor,
  meta,
  unidade = "",
  anterior,
  tendencia,
  inverso = false,
  icone: Icone,
  onClick,
}: KPICardSimplesProps) {
  // Calcula status
  const percentual = inverso ? (meta / (valor || 1)) * 100 : (valor / meta) * 100
  const getStatus = () => {
    if (percentual >= 95) return { cor: "text-emerald-600", bg: "bg-emerald-500" }
    if (percentual >= 80) return { cor: "text-amber-600", bg: "bg-amber-500" }
    return { cor: "text-red-600", bg: "bg-red-500" }
  }
  const status = getStatus()

  // Calcula tendência se não fornecida
  const tendenciaCalc = tendencia ?? (anterior ? ((valor - anterior) / Math.abs(anterior || 1)) * 100 : 0)
  const tendenciaPositiva = inverso ? tendenciaCalc < 0 : tendenciaCalc > 0

  // Formata valor
  const formatarValor = (val: number) => {
    if (unidade === "M") return `R$ ${val.toFixed(1)}M`
    if (unidade === "k") return `R$ ${val.toFixed(0)}k`
    if (unidade === "%") return `${val.toFixed(1)}%`
    if (unidade === "d") return `${val}d`
    return val.toFixed(2)
  }

  return (
    <div className="p-3 rounded-lg border bg-card hover:shadow-sm transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground truncate flex-1">{nome}</span>
        {Icone && <Icone className={`h-3.5 w-3.5 ${status.cor}`} />}
      </div>

      <div className="flex items-end justify-between mb-2">
        <span className={`text-lg font-bold ${status.cor}`}>{formatarValor(valor)}</span>
        <span className="text-xs text-muted-foreground">/ {formatarValor(meta)}</span>
      </div>

      {/* Barra */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
        <div className={`h-full rounded-full ${status.bg}`} style={{ width: `${Math.min(100, percentual)}%` }} />
      </div>

      {/* Tendência */}
      {tendenciaCalc !== 0 && (
        <div className={`flex items-center gap-0.5 text-xs ${tendenciaPositiva ? "text-emerald-600" : "text-red-600"}`}>
          {tendenciaPositiva ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(tendenciaCalc).toFixed(1)}%
        </div>
      )}
    </div>
  )
}
