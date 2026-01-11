"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import { Calendar, ArrowLeft, ArrowRight, CheckCircle2, Copy, Zap } from "lucide-react"
import { EstrategicoNavbar } from "../../../_components/estrategico-navbar"
import { toast } from "sonner"
import type { StatusCiclo } from "@/lib/types/planejamento"

export default function NovoPlanejamento() {
  const router = useRouter()
  const { ciclos, criarCiclo } = useCicloEstrategico()
  
  const anoAtual = new Date().getFullYear()
  
  // Estado do formulário
  const [nome, setNome] = useState(`Planejamento Estratégico ${anoAtual + 1}`)
  const [dataInicio, setDataInicio] = useState(`${anoAtual + 1}-01-01`)
  const [dataFim, setDataFim] = useState(`${anoAtual + 1}-12-31`)
  const [tipoPeriodo, setTipoPeriodo] = useState<"trimestral" | "semestral" | "anual" | "bienal">("anual")
  const [preCarregar, setPreCarregar] = useState(true)
  const [cicloReferencia, setCicloReferencia] = useState<string>("")
  const [etapaInicial, setEtapaInicial] = useState<"pestel" | "swot" | "gut" | "bcg" | "okrs">("pestel")

  // Filtrar ciclos encerrados ou em execução para pré-carga
  const ciclosDisponiveis = ciclos.filter(
    (c) => c.status === "encerrado" || c.status === "em_execucao"
  )

  // Auto-selecionar o ciclo mais recente
  useState(() => {
    if (ciclosDisponiveis.length > 0 && !cicloReferencia) {
      const maisRecente = [...ciclosDisponiveis].sort(
        (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      )[0]
      setCicloReferencia(maisRecente.id)
    }
  })

  const handleCriar = () => {
    if (!nome.trim()) {
      toast.error("Por favor, informe o nome do planejamento")
      return
    }

    if (!dataInicio || !dataFim) {
      toast.error("Por favor, informe o período do planejamento")
      return
    }

    if (new Date(dataInicio) >= new Date(dataFim)) {
      toast.error("A data de início deve ser anterior à data de fim")
      return
    }

    // Criar ciclo
    const novoCicloId = criarCiclo(
      {
        nome,
        periodo: {
          inicio: dataInicio,
          fim: dataFim,
          tipo: tipoPeriodo,
        },
        status: "rascunho" as StatusCiclo,
        governante: {
          id: "gov-001",
          nome: "Carlos Henrique Pontes",
          cargo: "Diretor Executivo",
        },
        etapaAtual: etapaInicial,
        etapasConcluidas: [],
      },
      preCarregar && cicloReferencia ? cicloReferencia : undefined
    )

    toast.success("Planejamento criado com sucesso!", {
      description: preCarregar
        ? "Dados de contexto foram pré-carregados para facilitar a análise"
        : "Você pode começar a construir o planejamento do zero",
    })

    // Redirecionar para a página de construção (PESTEL)
    router.push(`/corporativo/estrategico/planejamento/${novoCicloId}/construcao`)
  }

  const handleVoltar = () => {
    router.back()
  }

  return (
    <>
      <Header
        title="Novo Planejamento Estratégico"
        subtitle="Configure os parâmetros iniciais do seu ciclo estratégico"
      />
      <PageContent>
        <div className="max-w-4xl mx-auto">
          {/* Card Principal */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Defina o nome, período e configurações do planejamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Planejamento *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Planejamento Estratégico 2027"
                />
              </div>

              {/* Período */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início *</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Término *</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </div>
              </div>

              {/* Tipo de Período */}
              <div className="space-y-2">
                <Label>Tipo de Ciclo</Label>
                <RadioGroup value={tipoPeriodo} onValueChange={(value: any) => setTipoPeriodo(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trimestral" id="trimestral" />
                    <Label htmlFor="trimestral" className="font-normal cursor-pointer">
                      Trimestral (3 meses)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semestral" id="semestral" />
                    <Label htmlFor="semestral" className="font-normal cursor-pointer">
                      Semestral (6 meses)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anual" id="anual" />
                    <Label htmlFor="anual" className="font-normal cursor-pointer">
                      Anual (12 meses)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bienal" id="bienal" />
                    <Label htmlFor="bienal" className="font-normal cursor-pointer">
                      Bienal (24 meses)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Card de Pré-Carga */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Análise Contextual (Recomendado)
              </CardTitle>
              <CardDescription>
                Importe dados de um planejamento anterior para facilitar a análise comparativa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Checkbox para ativar pré-carga */}
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-amber-200 bg-amber-50">
                <Checkbox
                  id="preCarregar"
                  checked={preCarregar}
                  onCheckedChange={(checked) => setPreCarregar(checked === true)}
                />
                <div className="flex-1">
                  <Label htmlFor="preCarregar" className="cursor-pointer font-semibold">
                    Pré-carregar dados para análise contextual
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Isso irá importar análises PESTEL, SWOT e outros dados do planejamento selecionado,
                    permitindo comparação e facilitando a construção do novo plano.
                  </p>
                </div>
              </div>

              {/* Seleção de ciclo de referência */}
              {preCarregar && (
                <div className="space-y-2">
                  <Label htmlFor="cicloReferencia">Planejamento de Referência</Label>
                  {ciclosDisponiveis.length > 0 ? (
                    <Select value={cicloReferencia} onValueChange={setCicloReferencia}>
                      <SelectTrigger id="cicloReferencia">
                        <SelectValue placeholder="Selecione um planejamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {ciclosDisponiveis.map((ciclo) => (
                          <SelectItem key={ciclo.id} value={ciclo.id}>
                            {ciclo.nome} ({ciclo.periodo.inicio.substring(0, 4)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-muted-foreground p-3 rounded-lg bg-gray-50 border border-gray-200">
                      Nenhum planejamento anterior disponível para pré-carga. O novo planejamento será
                      criado do zero.
                    </p>
                  )}
                </div>
              )}

              {/* Benefícios */}
              {preCarregar && cicloReferencia && (
                <div className="space-y-2 p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    O que será importado:
                  </p>
                  <ul className="text-sm text-green-800 space-y-1 ml-6 list-disc">
                    <li>Análise PESTEL (fatores externos) como referência</li>
                    <li>Análise SWOT (posicionamento) para comparação</li>
                    <li>Contexto histórico para decisões mais embasadas</li>
                    <li>Economia de tempo na fase de análise</li>
                  </ul>
                  <p className="text-xs text-green-700 mt-2">
                    ℹ️ Você poderá editar todos os dados após a criação.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" onClick={handleVoltar} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={handleCriar} size="lg" className="gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Criar Planejamento
            </Button>
          </div>
        </div>
      </PageContent>
    </>
  )
}
