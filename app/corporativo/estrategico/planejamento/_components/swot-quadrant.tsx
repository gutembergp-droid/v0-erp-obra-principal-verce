"use client"

import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ItemSWOT, QuadranteSWOT } from "@/lib/types/planejamento"
import { cn } from "@/lib/utils"

interface SwotQuadrantProps {
  quadrante: QuadranteSWOT
  itens: ItemSWOT[]
  onAdd: () => void
  onEdit?: (item: ItemSWOT) => void
}

const QUADRANTE_CONFIG: Record<
  QuadranteSWOT,
  {
    nome: string
    cor: string
    bg: string
    borderColor: string
  }
> = {
  forcas: {
    nome: "Forças",
    cor: "text-green-700 dark:text-green-300",
    bg: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-300 dark:border-green-700",
  },
  fraquezas: {
    nome: "Fraquezas",
    cor: "text-red-700 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-300 dark:border-red-700",
  },
  oportunidades: {
    nome: "Oportunidades",
    cor: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-300 dark:border-blue-700",
  },
  ameacas: {
    nome: "Ameaças",
    cor: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-300 dark:border-orange-700",
  },
}

const PRIORIDADE_LABELS = ["Baixa", "Média", "Alta"]

export function SwotQuadrant({ quadrante, itens, onAdd, onEdit }: SwotQuadrantProps) {
  const config = QUADRANTE_CONFIG[quadrante]

  return (
    <Card className={cn("border-2", config.borderColor, config.bg)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={cn("text-lg font-bold uppercase", config.cor)}>{config.nome}</CardTitle>
          <Button size="sm" variant="outline" onClick={onAdd} className="h-8 w-8 p-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {itens.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground italic">Clique em "+" para adicionar</div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
            {itens.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => onEdit?.(item)}
              >
                <p className="text-sm text-foreground mb-2">{item.descricao}</p>
                <div className="flex items-center gap-2">
                  {item.prioridade && (
                    <Badge
                      variant={item.prioridade === 3 ? "destructive" : item.prioridade === 2 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {PRIORIDADE_LABELS[item.prioridade - 1]}
                    </Badge>
                  )}
                  {item.vinculoPESTEL && item.vinculoPESTEL.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {item.vinculoPESTEL.length} vínculo(s) PESTEL
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
