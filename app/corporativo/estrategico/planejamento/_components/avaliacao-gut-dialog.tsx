"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface AvaliacaoGutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  temaId: string
  temaNome: string
  onSave: (dados: { temaId: string; temaNome: string; gravidade: 1 | 2 | 3 | 4 | 5; urgencia: 1 | 2 | 3 | 4 | 5; tendencia: 1 | 2 | 3 | 4 | 5; justificativa?: string; criadoPor: string }) => void
}

export function AvaliacaoGutDialog({ open, onOpenChange, temaId, temaNome, onSave }: AvaliacaoGutDialogProps) {
  const [gravidade, setGravidade] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [urgencia, setUrgencia] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [tendencia, setTendencia] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [justificativa, setJustificativa] = useState("")

  const score = gravidade * urgencia * tendencia

  const handleSave = () => {
    onSave({
      temaId,
      temaNome,
      gravidade,
      urgencia,
      tendencia,
      justificativa: justificativa || undefined,
      criadoPor: "Usuário Atual",
    })

    // Resetar
    setGravidade(3)
    setUrgencia(3)
    setTendencia(3)
    setJustificativa("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Avaliar pela Matriz GUT</DialogTitle>
          <DialogDescription>Avalie a Gravidade, Urgência e Tendência do tema</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Tema */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">{temaNome}</p>
          </div>

          {/* Gravidade */}
          <div className="space-y-2">
            <Label htmlFor="gravidade">Gravidade - Qual o impacto se não for resolvido?</Label>
            <Select value={String(gravidade)} onValueChange={(value) => setGravidade(Number(value) as 1 | 2 | 3 | 4 | 5)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Muito Baixo</SelectItem>
                <SelectItem value="2">2 - Baixo</SelectItem>
                <SelectItem value="3">3 - Médio</SelectItem>
                <SelectItem value="4">4 - Alto</SelectItem>
                <SelectItem value="5">5 - Muito Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Urgência */}
          <div className="space-y-2">
            <Label htmlFor="urgencia">Urgência - Quanto tempo temos para resolver?</Label>
            <Select value={String(urgencia)} onValueChange={(value) => setUrgencia(Number(value) as 1 | 2 | 3 | 4 | 5)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Muito Tempo</SelectItem>
                <SelectItem value="2">2 - Pode Esperar</SelectItem>
                <SelectItem value="3">3 - Médio Prazo</SelectItem>
                <SelectItem value="4">4 - Urgente</SelectItem>
                <SelectItem value="5">5 - Imediato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tendência */}
          <div className="space-y-2">
            <Label htmlFor="tendencia">Tendência - Vai piorar com o tempo?</Label>
            <Select value={String(tendencia)} onValueChange={(value) => setTendencia(Number(value) as 1 | 2 | 3 | 4 | 5)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Melhora</SelectItem>
                <SelectItem value="2">2 - Estável</SelectItem>
                <SelectItem value="3">3 - Piora Leve</SelectItem>
                <SelectItem value="4">4 - Piora Rápido</SelectItem>
                <SelectItem value="5">5 - Piora Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Score Calculado */}
          <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Score GUT Calculado</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {gravidade} × {urgencia} × {tendencia}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">{score}</p>
                <Badge variant={score >= 100 ? "destructive" : score >= 60 ? "default" : "secondary"}>{score >= 100 ? "CRÍTICA" : score >= 60 ? "ALTA" : score >= 30 ? "MÉDIA" : "BAIXA"}</Badge>
              </div>
            </div>
          </div>

          {/* Justificativa */}
          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa (opcional)</Label>
            <Textarea id="justificativa" placeholder="Explique o racional da avaliação..." value={justificativa} onChange={(e) => setJustificativa(e.target.value)} rows={2} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Avaliação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
