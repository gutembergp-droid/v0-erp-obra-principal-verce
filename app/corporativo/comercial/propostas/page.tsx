"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ComercialSidebar } from "../_components/comercial-sidebar"
import { ComercialTopBar } from "../_components/comercial-top-bar"
import { useComercial } from "@/contexts/comercial-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { EstagioFunil, OrigemProposta, SegmentoCliente } from "@/lib/types/comercial"
import {
  FileText,
  Plus,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  Download,
  Eye,
  ChevronRight,
  Target,
} from "lucide-react"

// ============================================================================
// ESTÁGIOS DO FUNIL
// ============================================================================

const ESTAGIOS_CONFIG = {
  prospeccao: { nome: "Prospecção", cor: "bg-slate-100 border-slate-300", icon: Target },
  qualificacao: { nome: "Qualificação", cor: "bg-blue-100 border-blue-300", icon: FileText },
  proposta: { nome: "Proposta", cor: "bg-amber-100 border-amber-300", icon: FileText },
  negociacao: { nome: "Negociação", cor: "bg-purple-100 border-purple-300", icon: TrendingUp },
  fechamento: { nome: "Fechamento", cor: "bg-emerald-100 border-emerald-300", icon: DollarSign },
  perda: { nome: "Perdida", cor: "bg-red-100 border-red-300", icon: Clock },
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function PropostasPage() {
  const {
    propostas,
    clientes,
    propostaSelecionada,
    selecionarProposta,
    addProposta,
    moverPropostaEstagio,
    addHistoricoProposta,
  } = useComercial()

  const [searchTerm, setSearchTerm] = useState("")
  const [showNovaPropostaDialog, setShowNovaPropostaDialog] = useState(false)
  const [showDetalhesDialog, setShowDetalhesDialog] = useState(false)

  // Form state
  const [formProposta, setFormProposta] = useState({
    titulo: "",
    clienteId: "",
    valor: "",
    probabilidade: "50",
    estagio: "prospeccao" as EstagioFunil,
    dataLimite: "",
    responsavel: "João Silva",
    origem: "Licitação" as OrigemProposta,
    tipo: "Infraestrutura Rodoviária" as SegmentoCliente,
    uf: "",
    prazoExecucao: "",
    observacoes: "",
  })

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Filtrar propostas
  const propostasFiltradas = propostas.filter(
    (p) =>
      p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clienteNome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Agrupar por estágio
  const propostasPorEstagio = Object.keys(ESTAGIOS_CONFIG).reduce(
    (acc, estagio) => {
      acc[estagio as EstagioFunil] = propostasFiltradas.filter((p) => p.estagio === estagio)
      return acc
    },
    {} as Record<EstagioFunil, typeof propostas>
  )

  // KPIs
  const totalPropostas = propostas.length
  const pipelineTotal = propostas.reduce((acc, p) => acc + p.valor, 0)
  const propostasAtivas = propostas.filter((p) => p.estagio !== "perda").length
  const taxaConversao =
    propostas.length > 0 ? ((propostas.filter((p) => p.estagio === "fechamento").length / propostas.length) * 100).toFixed(0) : 0

  // Handlers
  const handleSalvarProposta = () => {
    if (!formProposta.titulo || !formProposta.clienteId || !formProposta.valor) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const cliente = clientes.find((c) => c.id === formProposta.clienteId)
    if (!cliente) {
      toast.error("Cliente não encontrado")
      return
    }

    const contatoPrincipal = cliente.contatos.find((c) => c.principal) || cliente.contatos[0]

    addProposta({
      titulo: formProposta.titulo,
      clienteId: formProposta.clienteId,
      clienteNome: cliente.nome,
      clienteContato: contatoPrincipal?.nome || "",
      clienteEmail: contatoPrincipal?.email || "",
      clienteTelefone: contatoPrincipal?.telefone || "",
      valor: Number.parseFloat(formProposta.valor),
      probabilidade: Number.parseInt(formProposta.probabilidade),
      estagio: formProposta.estagio,
      dataLimite: formProposta.dataLimite,
      responsavel: formProposta.responsavel,
      responsavelAvatar: formProposta.responsavel
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      origem: formProposta.origem,
      tipo: formProposta.tipo,
      uf: formProposta.uf,
      prazoExecucao: formProposta.prazoExecucao,
      observacoes: formProposta.observacoes,
    })

    toast.success(`Proposta ${formProposta.titulo} criada com sucesso!`)
    setShowNovaPropostaDialog(false)
    setFormProposta({
      titulo: "",
      clienteId: "",
      valor: "",
      probabilidade: "50",
      estagio: "prospeccao",
      dataLimite: "",
      responsavel: "João Silva",
      origem: "Licitação",
      tipo: "Infraestrutura Rodoviária",
      uf: "",
      prazoExecucao: "",
      observacoes: "",
    })
  }

  const handleMoverProposta = (propostaId: string, novoEstagio: EstagioFunil) => {
    moverPropostaEstagio(propostaId, novoEstagio)
    toast.success(`Proposta movida para ${ESTAGIOS_CONFIG[novoEstagio].nome}`)
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <ComercialSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <ComercialTopBar
          titulo="Propostas & Funil de Vendas"
          searchPlaceholder="Buscar propostas..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          badges={[
            { label: "Total", value: totalPropostas },
            { label: "Ativas", value: propostasAtivas, variant: "default" },
          ]}
          actions={
            <>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
                <Download className="w-3.5 h-3.5" />
                Exportar
              </Button>
              <Dialog open={showNovaPropostaDialog} onOpenChange={setShowNovaPropostaDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-7 text-xs gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Nova Proposta
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Nova Proposta</DialogTitle>
                    <DialogDescription>Crie uma nova proposta no funil de vendas.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[500px] overflow-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Título*</Label>
                        <Input
                          placeholder="Ex: BR-116 Duplicação"
                          value={formProposta.titulo}
                          onChange={(e) => setFormProposta({ ...formProposta, titulo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cliente*</Label>
                        <Select
                          value={formProposta.clienteId}
                          onValueChange={(value) => setFormProposta({ ...formProposta, clienteId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {clientes.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Valor (R$)*</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={formProposta.valor}
                          onChange={(e) => setFormProposta({ ...formProposta, valor: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Probabilidade (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={formProposta.probabilidade}
                          onChange={(e) => setFormProposta({ ...formProposta, probabilidade: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Estágio Inicial</Label>
                        <Select
                          value={formProposta.estagio}
                          onValueChange={(value: EstagioFunil) =>
                            setFormProposta({ ...formProposta, estagio: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(ESTAGIOS_CONFIG).map(([key, config]) => (
                              <SelectItem key={key} value={key}>
                                {config.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Data Limite</Label>
                        <Input
                          type="date"
                          value={formProposta.dataLimite}
                          onChange={(e) => setFormProposta({ ...formProposta, dataLimite: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Origem</Label>
                        <Select
                          value={formProposta.origem}
                          onValueChange={(value: OrigemProposta) =>
                            setFormProposta({ ...formProposta, origem: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Licitação">Licitação</SelectItem>
                            <SelectItem value="Convite">Convite</SelectItem>
                            <SelectItem value="Indicação">Indicação</SelectItem>
                            <SelectItem value="Prospecção Ativa">Prospecção Ativa</SelectItem>
                            <SelectItem value="RFP">RFP</SelectItem>
                            <SelectItem value="Parceria">Parceria</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>UF</Label>
                        <Input
                          placeholder="SP"
                          maxLength={2}
                          value={formProposta.uf}
                          onChange={(e) => setFormProposta({ ...formProposta, uf: e.target.value.toUpperCase() })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select
                          value={formProposta.tipo}
                          onValueChange={(value: SegmentoCliente) =>
                            setFormProposta({ ...formProposta, tipo: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Infraestrutura Rodoviária">Infraestrutura Rodoviária</SelectItem>
                            <SelectItem value="Saneamento">Saneamento</SelectItem>
                            <SelectItem value="Energia">Energia</SelectItem>
                            <SelectItem value="Portuário">Portuário</SelectItem>
                            <SelectItem value="Transporte Metroviário">Transporte Metroviário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Prazo de Execução</Label>
                        <Input
                          placeholder="Ex: 24 meses"
                          value={formProposta.prazoExecucao}
                          onChange={(e) => setFormProposta({ ...formProposta, prazoExecucao: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Observações</Label>
                      <Textarea
                        placeholder="Observações sobre a proposta..."
                        value={formProposta.observacoes}
                        onChange={(e) => setFormProposta({ ...formProposta, observacoes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNovaPropostaDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSalvarProposta}>Criar Proposta</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          }
        />

        {/* Conteúdo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1800px] mx-auto space-y-4">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-3">
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalPropostas}</p>
                    <p className="text-[10px] text-muted-foreground">Total Propostas</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(pipelineTotal)}</p>
                    <p className="text-[10px] text-muted-foreground">Pipeline Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{taxaConversao}%</p>
                    <p className="text-[10px] text-muted-foreground">Taxa Conversão</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{propostasAtivas}</p>
                    <p className="text-[10px] text-muted-foreground">Propostas Ativas</p>
                  </div>
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
            </div>

            {/* Kanban */}
            <div className="grid grid-cols-6 gap-3">
              {Object.entries(ESTAGIOS_CONFIG).map(([estagio, config]) => {
                const propostasDoEstagio = propostasPorEstagio[estagio as EstagioFunil] || []
                const valorTotal = propostasDoEstagio.reduce((acc, p) => acc + p.valor, 0)

                return (
                  <div key={estagio} className="space-y-2">
                    {/* Header da Coluna */}
                    <Card className={cn("p-2 border-2", config.cor)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <config.icon className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{config.nome}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {propostasDoEstagio.length}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{formatCurrency(valorTotal)}</p>
                    </Card>

                    {/* Cards das Propostas */}
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-2 pr-2">
                        {propostasDoEstagio.map((proposta) => (
                          <Card
                            key={proposta.id}
                            className="p-3 border cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => {
                              selecionarProposta(proposta)
                              setShowDetalhesDialog(true)
                            }}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-1">
                                <p className="text-xs font-medium line-clamp-2">{proposta.titulo}</p>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <Building2 className="w-3 h-3 text-muted-foreground" />
                                <span className="text-[10px] text-muted-foreground">{proposta.clienteNome}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3 text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-600">
                                  {formatCurrency(proposta.valor)}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                  <span>Probabilidade</span>
                                  <span className="font-medium">{proposta.probabilidade}%</span>
                                </div>
                                <Progress value={proposta.probabilidade} className="h-1" />
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center gap-1">
                                  <Avatar className="w-4 h-4">
                                    <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                                      {proposta.responsavelAvatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-[10px] text-muted-foreground">{proposta.responsavel}</span>
                                </div>
                                {estagio !== "perda" && estagio !== "fechamento" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const estagios = Object.keys(ESTAGIOS_CONFIG)
                                      const currentIndex = estagios.indexOf(estagio)
                                      const nextEstagio = estagios[currentIndex + 1] as EstagioFunil
                                      if (nextEstagio) {
                                        handleMoverProposta(proposta.id, nextEstagio)
                                      }
                                    }}
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Dialog de Detalhes */}
      <Dialog open={showDetalhesDialog} onOpenChange={setShowDetalhesDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Proposta</DialogTitle>
            <DialogDescription>
              {propostaSelecionada?.id} - {propostaSelecionada?.clienteNome}
            </DialogDescription>
          </DialogHeader>
          {propostaSelecionada && (
            <div className="space-y-4 py-4 max-h-[500px] overflow-auto">
              <div>
                <h3 className="text-lg font-semibold">{propostaSelecionada.titulo}</h3>
                <p className="text-sm text-muted-foreground">{propostaSelecionada.tipo}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Cliente</p>
                  <p className="font-medium">{propostaSelecionada.clienteNome}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contato</p>
                  <p className="font-medium">{propostaSelecionada.clienteContato}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Valor</p>
                  <p className="font-bold text-emerald-600">{formatCurrency(propostaSelecionada.valor)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Probabilidade</p>
                  <p className="font-medium">{propostaSelecionada.probabilidade}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Responsável</p>
                  <p className="font-medium">{propostaSelecionada.responsavel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Origem</p>
                  <p className="font-medium">{propostaSelecionada.origem}</p>
                </div>
              </div>

              {propostaSelecionada.observacoes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Observações</p>
                  <p className="text-sm">{propostaSelecionada.observacoes}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Histórico</p>
                <div className="space-y-2">
                  {propostaSelecionada.historico.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Clock className="w-3 h-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{item.acao}</p>
                        <p className="text-muted-foreground">
                          {new Date(item.data).toLocaleDateString("pt-BR")} - {item.usuario}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetalhesDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
