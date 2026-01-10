"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { PilarPESTEL, TipoImpactoPESTEL, PESTELFator } from "@/lib/types/planejamento"

interface FatorPestelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pilar: PilarPESTEL
  fatorExistente?: PESTELFator
  onSave: (dados: {
    id?: string
    pilar: PilarPESTEL
    descricao: string
    tipo: TipoImpactoPESTEL
    impacto: 1 | 2 | 3 | 4 | 5
    observacoes?: string
    criadoPor: string
  }) => void
}

export function FatorPestelDialog({ open, onOpenChange, pilar, fatorExistente, onSave }: FatorPestelDialogProps) {
  const [descricao, setDescricao] = useState("")
  const [tipo, setTipo] = useState<TipoImpactoPESTEL>("risco")
  const [impacto, setImpacto] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [observacoes, setObservacoes] = useState("")

  // Preencher form ao editar
  useEffect(() => {
    if (fatorExistente) {
      setDescricao(fatorExistente.descricao)
      setTipo(fatorExistente.tipo)
      setImpacto(fatorExistente.impacto)
      setObservacoes(fatorExistente.observacoes || "")
    } else {
      // Resetar ao abrir novo
      setDescricao("")
      setTipo("risco")
      setImpacto(3)
      setObservacoes("")
    }
  }, [fatorExistente, open])

  const handleSave = () => {
    if (!descricao.trim()) return

    onSave({
      id: fatorExistente?.id,
      pilar,
      descricao,
      tipo,
      impacto,
      observacoes: observacoes || undefined,
      criadoPor: fatorExistente?.criadoPor || "Usuário Atual",
    })

    // Resetar form
    setDescricao("")
    setTipo("risco")
    setImpacto(3)
    setObservacoes("")
    onOpenChange(false)
  }

  const modoEdicao = !!fatorExistente

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {modoEdicao ? "Editar" : "Adicionar"} Fator PESTEL - {pilar.toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            {modoEdicao ? "Atualize as informações do fator" : "Identifique um fator externo que impacta a estratégia"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição do Fator *</Label>
            <Textarea
              id="descricao"
              placeholder="Ex: Aumento da taxa de juros impactando financiamento de obras"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
            />
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label>Tipo de Impacto *</Label>
            <RadioGroup value={tipo} onValueChange={(value) => setTipo(value as TipoImpactoPESTEL)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="risco" id="risco" />
                <Label htmlFor="risco" className="cursor-pointer">
                  Risco / Ameaça
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oportunidade" id="oportunidade" />
                <Label htmlFor="oportunidade" className="cursor-pointer">
                  Oportunidade
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Impacto */}
          <div className="space-y-2">
            <Label htmlFor="impacto">Impacto Estratégico *</Label>
            <Select value={String(impacto)} onValueChange={(value) => setImpacto(Number(value) as 1 | 2 | 3 | 4 | 5)}>
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

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              placeholder="Informações adicionais relevantes..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!descricao.trim()}>
            {modoEdicao ? "Salvar Alterações" : "Adicionar Fator"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
