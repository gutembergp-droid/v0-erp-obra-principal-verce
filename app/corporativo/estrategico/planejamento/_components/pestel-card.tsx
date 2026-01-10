"use client"

import { AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FatorPESTEL, PilarPESTEL } from "@/lib/types/planejamento"
import { cn } from "@/lib/utils"

interface PestelCardProps {
  pilar: PilarPESTEL
  fatores: FatorPESTEL[]
  onAdd: () => void
  onEdit?: (fator: FatorPESTEL) => void
}

const PILAR_CONFIG: Record<
  PilarPESTEL,
  {
    nome: string
    cor: string
    bgLight: string
    bgDark: string
  }
> = {
  politico: {
    nome: "Político",
    cor: "text-blue-600 dark:text-blue-400",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    bgDark: "bg-blue-100 dark:bg-blue-900/50",
  },
  economico: {
    nome: "Econômico",
    cor: "text-green-600 dark:text-green-400",
    bgLight: "bg-green-50 dark:bg-green-950/30",
    bgDark: "bg-green-100 dark:bg-green-900/50",
  },
  social: {
    nome: "Social",
    cor: "text-purple-600 dark:text-purple-400",
    bgLight: "bg-purple-50 dark:bg-purple-950/30",
    bgDark: "bg-purple-100 dark:bg-purple-900/50",
  },
  tecnologico: {
    nome: "Tecnológico",
    cor: "text-orange-600 dark:text-orange-400",
    bgLight: "bg-orange-50 dark:bg-orange-950/30",
    bgDark: "bg-orange-100 dark:bg-orange-900/50",
  },
  ambiental: {
    nome: "Ambiental",
    cor: "text-teal-600 dark:text-teal-400",
    bgLight: "bg-teal-50 dark:bg-teal-950/30",
    bgDark: "bg-teal-100 dark:bg-teal-900/50",
  },
  legal: {
    nome: "Legal",
    cor: "text-red-600 dark:text-red-400",
    bgLight: "bg-red-50 dark:bg-red-950/30",
    bgDark: "bg-red-100 dark:bg-red-900/50",
  },
}

const IMPACTO_LABELS = ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"]

export function PestelCard({ pilar, fatores, onAdd, onEdit }: PestelCardProps) {
  const config = PILAR_CONFIG[pilar]

  return (
    <Card className={cn("border hover:border-primary/50 transition-colors", config.bgLight)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={cn("text-lg font-bold", config.cor)}>{config.nome}</CardTitle>
          <Button size="sm" variant="outline" onClick={onAdd} className="h-8 px-3 text-xs">
            + Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {fatores.length === 0 ? (
          <p className="text-sm text-muted-foreground italic py-4 text-center">Nenhum fator identificado</p>
        ) : (
          fatores.map((fator) => (
            <div
              key={fator.id}
              className={cn("p-3 rounded-lg border cursor-pointer hover:border-primary/50 transition-colors", config.bgDark)}
              onClick={() => onEdit?.(fator)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-foreground flex-1">{fator.descricao}</p>
                <div className="flex items-center gap-1">
                  {fator.tipo === "risco" ? (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={fator.tipo === "risco" ? "destructive" : "default"} className="text-xs">
                  {fator.tipo === "risco" ? "Risco" : "Oportunidade"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Impacto: {IMPACTO_LABELS[fator.impacto - 1]}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
