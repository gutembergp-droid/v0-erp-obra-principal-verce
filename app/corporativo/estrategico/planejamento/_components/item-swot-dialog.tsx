"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { QuadranteSWOT, SWOTItem } from "@/lib/types/planejamento"

interface ItemSwotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quadrante: QuadranteSWOT
  itemExistente?: SWOTItem
  onSave: (dados: { id?: string; quadrante: QuadranteSWOT; descricao: string; prioridade?: 1 | 2 | 3 }) => void
}

const QUADRANTE_LABELS: Record<QuadranteSWOT, string> = {
  forcas: "Força",
  fraquezas: "Fraqueza",
  oportunidades: "Oportunidade",
  ameacas: "Ameaça",
}

export function ItemSwotDialog({ open, onOpenChange, quadrante, itemExistente, onSave }: ItemSwotDialogProps) {
  const [descricao, setDescricao] = useState("")
  const [prioridade, setPrioridade] = useState<1 | 2 | 3>(2)

  // Preencher form ao editar
  useEffect(() => {
    if (itemExistente) {
      setDescricao(itemExistente.descricao)
      setPrioridade(itemExistente.prioridade || 2)
    } else {
      setDescricao("")
      setPrioridade(2)
    }
  }, [itemExistente, open])

  const handleSave = () => {
    if (!descricao.trim()) return

    onSave({
      id: itemExistente?.id,
      quadrante,
      descricao,
      prioridade,
    })

    // Resetar
    setDescricao("")
    setPrioridade(2)
    onOpenChange(false)
  }

  const modoEdicao = !!itemExistente

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{modoEdicao ? "Editar" : "Adicionar"} {QUADRANTE_LABELS[quadrante]}</DialogTitle>
          <DialogDescription>
            {modoEdicao ? "Atualize as informações do item" : `Descreva um fator ${quadrante === "forcas" || quadrante === "fraquezas" ? "interno" : "externo"}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea id="descricao" placeholder={`Ex: ${getPlaceholder(quadrante)}`} value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select value={String(prioridade)} onValueChange={(value) => setPrioridade(Number(value) as 1 | 2 | 3)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Baixa</SelectItem>
                <SelectItem value="2">Média</SelectItem>
                <SelectItem value="3">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!descricao.trim()}>
            {modoEdicao ? "Salvar Alterações" : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function getPlaceholder(quadrante: QuadranteSWOT): string {
  const examples = {
    forcas: "Equipe técnica altamente qualificada",
    fraquezas: "Processos operacionais pouco padronizados",
    oportunidades: "Expansão do PAC com R$ 120 bilhões em infraestrutura",
    ameacas: "Aumento do custo de capital devido à alta de juros",
  }
  return examples[quadrante]
}
