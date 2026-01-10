"use client"

import { ArrowUp, Edit2, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AvaliacaoGUT } from "@/lib/types/planejamento"
import { cn } from "@/lib/utils"

interface GutTableProps {
  avaliacoes: AvaliacaoGUT[]
  onEdit?: (avaliacao: AvaliacaoGUT) => void
  onDelete?: (id: string) => void
}

export function GutTable({ avaliacoes, onEdit, onDelete }: GutTableProps) {
  const getCorScore = (score: number) => {
    if (score >= 100) return "text-red-600 dark:text-red-400 font-bold"
    if (score >= 60) return "text-orange-600 dark:text-orange-400 font-semibold"
    if (score >= 30) return "text-yellow-600 dark:text-yellow-400"
    return "text-muted-foreground"
  }

  const getPrioridadeBadge = (score: number) => {
    if (score >= 100) return { label: "CRÍTICA", variant: "destructive" as const }
    if (score >= 60) return { label: "ALTA", variant: "default" as const }
    if (score >= 30) return { label: "MÉDIA", variant: "secondary" as const }
    return { label: "BAIXA", variant: "outline" as const }
  }

  if (avaliacoes.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Nenhuma avaliação GUT cadastrada</p>
        <p className="text-sm text-muted-foreground mt-1">Adicione temas estratégicos e avalie-os</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Tema Estratégico</TableHead>
            <TableHead className="w-[80px] text-center">G</TableHead>
            <TableHead className="w-[80px] text-center">U</TableHead>
            <TableHead className="w-[80px] text-center">T</TableHead>
            <TableHead className="w-[100px] text-center">Score</TableHead>
            <TableHead className="w-[120px]">Prioridade</TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {avaliacoes.map((avaliacao, index) => {
            const { label, variant } = getPrioridadeBadge(avaliacao.score)

            return (
              <TableRow key={avaliacao.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{avaliacao.temaNome}</p>
                    {avaliacao.justificativa && <p className="text-xs text-muted-foreground mt-1">{avaliacao.justificativa}</p>}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-semibold">{avaliacao.gravidade}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-semibold">{avaliacao.urgencia}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-semibold">{avaliacao.tendencia}</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {avaliacao.score >= 100 && <ArrowUp className="w-4 h-4 text-red-500" />}
                    <span className={cn("text-xl font-bold", getCorScore(avaliacao.score))}>{avaliacao.score}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={variant} className="text-xs">
                    {label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {onEdit && (
                      <Button size="sm" variant="ghost" onClick={() => onEdit(avaliacao)} className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button size="sm" variant="ghost" onClick={() => onDelete(avaliacao.id)} className="h-8 w-8 p-0 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
