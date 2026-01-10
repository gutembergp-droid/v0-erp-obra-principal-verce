"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, AlertCircle, HelpCircle, Lightbulb } from "lucide-react"
import { usePlanejamento, type OKR, type KeyResult } from "@/contexts/planejamento-context"
import { toast } from "sonner"
import { HelpTooltip } from "@/components/ui/help-tooltip"
import { Card, CardContent } from "@/components/ui/card"

interface OKRFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  okrToEdit?: OKR | null
  onOpenHelp?: () => void
}

export function OKRFormDialog({ open, onOpenChange, okrToEdit, onOpenHelp }: OKRFormDialogProps) {
  const { addOKR, updateOKR } = usePlanejamento()
  const isEditMode = !!okrToEdit

  // Estados do formulário
  const [objetivo, setObjetivo] = useState("")
  const [periodo, setPeriodo] = useState("")
  const [tipo, setTipo] = useState<"corporativo" | "departamental" | "obra">("corporativo")
  const [responsavel, setResponsavel] = useState("")
  const [prazo, setPrazo] = useState("")
  const [status, setStatus] = useState<OKR["status"]>("em-progresso")
  const [keyResults, setKeyResults] = useState<Omit<KeyResult, "progresso">[]>([])

  // Estados de validação
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Preencher formulário quando editar
  useEffect(() => {
    if (okrToEdit) {
      setObjetivo(okrToEdit.objetivo)
      setPeriodo(okrToEdit.periodo)
      setTipo(okrToEdit.tipo)
      setResponsavel(okrToEdit.responsavel)
      setPrazo(okrToEdit.prazo)
      setStatus(okrToEdit.status)
      setKeyResults(okrToEdit.keyResults)
    }
  }, [okrToEdit])

  // Resetar formulário ao fechar
  const resetForm = () => {
    setObjetivo("")
    setPeriodo("")
    setTipo("corporativo")
    setResponsavel("")
    setPrazo("")
    setStatus("em-progresso")
    setKeyResults([])
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  // Adicionar Key Result
  const addKeyResult = () => {
    setKeyResults([
      ...keyResults,
      {
        id: `kr-${Date.now()}`,
        descricao: "",
        meta: 0,
        atual: 0,
        unidade: "",
      },
    ])
  }

  // Remover Key Result
  const removeKeyResult = (id: string) => {
    setKeyResults(keyResults.filter((kr) => kr.id !== id))
  }

  // Atualizar Key Result
  const updateKeyResult = (id: string, field: keyof Omit<KeyResult, "id" | "progresso">, value: any) => {
    setKeyResults(
      keyResults.map((kr) =>
        kr.id === id
          ? {
              ...kr,
              [field]: value,
            }
          : kr
      )
    )
  }

  // Validação
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!objetivo.trim()) {
      newErrors.objetivo = "Objetivo é obrigatório"
    }
    if (!periodo.trim()) {
      newErrors.periodo = "Período é obrigatório"
    }
    if (!responsavel.trim()) {
      newErrors.responsavel = "Responsável é obrigatório"
    }
    if (!prazo) {
      newErrors.prazo = "Prazo é obrigatório"
    }
    if (keyResults.length === 0) {
      newErrors.keyResults = "Adicione pelo menos 1 Key Result"
    }

    // Validar Key Results
    keyResults.forEach((kr, index) => {
      if (!kr.descricao.trim()) {
        newErrors[`kr-${index}-descricao`] = "Descrição obrigatória"
      }
      if (kr.meta <= 0) {
        newErrors[`kr-${index}-meta`] = "Meta deve ser maior que 0"
      }
      if (!kr.unidade.trim()) {
        newErrors[`kr-${index}-unidade`] = "Unidade obrigatória"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Calcular progresso dos Key Results
  const calculateProgress = (kr: Omit<KeyResult, "progresso">): number => {
    if (kr.meta === 0) return 0
    return Math.min(Math.round((kr.atual / kr.meta) * 100), 100)
  }

  // Calcular progresso geral do OKR
  const calculateOKRProgress = (): number => {
    if (keyResults.length === 0) return 0
    const totalProgress = keyResults.reduce((sum, kr) => sum + calculateProgress(kr), 0)
    return Math.round(totalProgress / keyResults.length)
  }

  // Submit
  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const keyResultsWithProgress: KeyResult[] = keyResults.map((kr) => ({
      ...kr,
      progresso: calculateProgress(kr),
    }))

    const okrData = {
      objetivo,
      periodo,
      tipo,
      responsavel,
      prazo,
      status,
      keyResults: keyResultsWithProgress,
      progresso: calculateOKRProgress(),
    }

    if (isEditMode && okrToEdit) {
      updateOKR(okrToEdit.id, okrData)
      toast.success("OKR atualizado com sucesso!")
    } else {
      addOKR(okrData)
      toast.success("OKR criado com sucesso!")
    }

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{isEditMode ? "Editar OKR" : "Novo OKR"}</DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Atualize os dados do OKR e seus Key Results"
                  : "Defina um objetivo e seus resultados-chave mensuráveis"}
              </DialogDescription>
            </div>
            {onOpenHelp && (
              <Button type="button" variant="ghost" size="sm" onClick={onOpenHelp} className="gap-2">
                <HelpCircle className="w-4 h-4" />
                Ajuda Completa
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Dicas Rápidas */}
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-semibold text-foreground">Dica: Use o método SMART</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>S</strong>pecífico • <strong>M</strong>ensurável • <strong>A</strong>tingível • <strong>R</strong>elevante • <strong>T</strong>emporal
                  </p>
                  <p className="text-xs text-muted-foreground">
                    70-80% de conclusão já é sucesso! Se atingir 100% sempre, não está sendo ambicioso o suficiente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objetivo */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="objetivo">
                Objetivo <span className="text-destructive">*</span>
              </Label>
              <HelpTooltip
                title="O que é o Objetivo?"
                description="O objetivo é a meta que você quer atingir. Deve ser claro, inspirador e ambicioso."
                goodExample="Aumentar receita consolidada em 25% até Q2/2026"
                badExample="Melhorar as coisas"
                tip="Use verbos de ação: Aumentar, Melhorar, Reduzir, Expandir, Criar"
              />
            </div>
            <Textarea
              id="objetivo"
              placeholder="Ex: Aumentar receita consolidada em 25% até Q2/2026"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className={errors.objetivo ? "border-destructive" : ""}
              rows={2}
            />
            {errors.objetivo && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.objetivo}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Defina uma meta clara e inspiradora que você deseja alcançar neste período
            </p>
          </div>

          {/* Linha 1: Período, Tipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="periodo">
                  Período <span className="text-destructive">*</span>
                </Label>
                <HelpTooltip
                  title="Como definir o período?"
                  description="O período define quando este OKR deve ser alcançado. Normalmente trimestral ou anual."
                  example="Q1 2026, Q1-Q2 2026, 2026"
                  tip="Períodos trimestrais (Q1, Q2, Q3, Q4) são mais eficazes que anuais para manter o foco"
                />
              </div>
              <Input
                id="periodo"
                placeholder="Ex: Q1-Q2 2026 ou 2026"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className={errors.periodo ? "border-destructive" : ""}
              />
              {errors.periodo && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.periodo}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="tipo">
                  Tipo <span className="text-destructive">*</span>
                </Label>
                <HelpTooltip
                  title="Qual tipo de OKR?"
                  description="O tipo define o escopo e abrangência do OKR."
                  tip="Corporativo = toda empresa | Departamental = uma área específica | Obra = projeto/contrato específico"
                />
              </div>
              <Select value={tipo} onValueChange={(value: any) => setTipo(value)}>
                <SelectTrigger id="tipo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporativo">Corporativo (toda empresa)</SelectItem>
                  <SelectItem value="departamental">Departamental (área específica)</SelectItem>
                  <SelectItem value="obra">Obra (projeto/contrato)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Linha 2: Responsável, Prazo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="responsavel">
                  Responsável <span className="text-destructive">*</span>
                </Label>
                <HelpTooltip
                  title="Quem é o responsável?"
                  description="O responsável é quem vai liderar o alcance deste OKR. Pode ser uma pessoa, departamento ou time."
                  example="Diretoria Executiva, Gerente Comercial, Time de Engenharia"
                  tip="Apenas um responsável principal. Evite responsabilidade compartilhada para manter accountability"
                />
              </div>
              <Input
                id="responsavel"
                placeholder="Ex: Diretoria Executiva"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className={errors.responsavel ? "border-destructive" : ""}
              />
              {errors.responsavel && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.responsavel}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo">
                Prazo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prazo"
                type="date"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                className={errors.prazo ? "border-destructive" : ""}
              />
              {errors.prazo && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.prazo}
                </p>
              )}
            </div>
          </div>

          {/* Status (apenas em modo edição) */}
          {isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em-progresso">Em Progresso</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Key Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <Label>
                    Key Results <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">Resultados-chave mensuráveis (mínimo 1)</p>
                </div>
                <HelpTooltip
                  title="O que são Key Results?"
                  description="São resultados mensuráveis que indicam se você atingiu o objetivo. Devem ter meta, valor atual e unidade."
                  goodExample="Fechar 3 novos contratos acima de R$ 500M"
                  badExample="Melhorar vendas"
                  tip="Recomendação: 2 a 5 KRs por OKR. Cada um deve responder: Como vou medir se atingi o objetivo?"
                />
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addKeyResult}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar KR
              </Button>
            </div>

            {errors.keyResults && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.keyResults}
              </p>
            )}

            {keyResults.map((kr, index) => (
              <div key={kr.id} className="p-4 border border-border rounded-lg space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">KR {index + 1}</Badge>
                  {keyResults.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeKeyResult(kr.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`kr-${index}-descricao`}>Descrição</Label>
                  <Input
                    id={`kr-${index}-descricao`}
                    placeholder="Ex: Fechar 3 novos contratos acima de R$ 500M"
                    value={kr.descricao}
                    onChange={(e) => updateKeyResult(kr.id, "descricao", e.target.value)}
                    className={errors[`kr-${index}-descricao`] ? "border-destructive" : ""}
                  />
                  {errors[`kr-${index}-descricao`] && (
                    <p className="text-sm text-destructive">{errors[`kr-${index}-descricao`]}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`kr-${index}-meta`}>Meta</Label>
                    <Input
                      id={`kr-${index}-meta`}
                      type="number"
                      placeholder="100"
                      value={kr.meta || ""}
                      onChange={(e) => updateKeyResult(kr.id, "meta", parseFloat(e.target.value) || 0)}
                      className={errors[`kr-${index}-meta`] ? "border-destructive" : ""}
                    />
                    {errors[`kr-${index}-meta`] && (
                      <p className="text-sm text-destructive">{errors[`kr-${index}-meta`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`kr-${index}-atual`}>Atual</Label>
                    <Input
                      id={`kr-${index}-atual`}
                      type="number"
                      placeholder="0"
                      value={kr.atual || ""}
                      onChange={(e) => updateKeyResult(kr.id, "atual", parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`kr-${index}-unidade`}>Unidade</Label>
                    <Input
                      id={`kr-${index}-unidade`}
                      placeholder="contratos"
                      value={kr.unidade}
                      onChange={(e) => updateKeyResult(kr.id, "unidade", e.target.value)}
                      className={errors[`kr-${index}-unidade`] ? "border-destructive" : ""}
                    />
                    {errors[`kr-${index}-unidade`] && (
                      <p className="text-sm text-destructive">{errors[`kr-${index}-unidade`]}</p>
                    )}
                  </div>
                </div>

                {/* Preview do progresso */}
                {kr.meta > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Progresso: {calculateProgress(kr)}% ({kr.atual} / {kr.meta} {kr.unidade})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {isEditMode ? "Salvar Alterações" : "Criar OKR"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
