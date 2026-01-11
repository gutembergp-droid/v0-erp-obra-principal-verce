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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ComercialNavbar } from "../_components/comercial-navbar"
import { useComercial } from "@/contexts/comercial-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { StatusContrato, TipoContrato, ModalidadeContrato } from "@/lib/types/comercial"
import {
  FileText,
  Plus,
  Building2,
  DollarSign,
  Calendar,
  Download,
  Upload,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Paperclip,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react"

// ============================================================================
// COMPONENT
// ============================================================================

export default function ContratosPage() {
  const { contratos, clientes, contratoSelecionado, selecionarContrato, addContrato, addAditivo } = useComercial()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusContrato | "todos">("todos")
  const [showNovoContratoDialog, setShowNovoContratoDialog] = useState(false)
  const [showDetalhesDialog, setShowDetalhesDialog] = useState(false)
  const [showAditivoDialog, setShowAditivoDialog] = useState(false)

  // Form states
  const [formContrato, setFormContrato] = useState({
    titulo: "",
    clienteId: "",
    objeto: "",
    valorOriginal: "",
    tipo: "Empreitada Global" as TipoContrato,
    modalidade: "Concorrência Pública" as ModalidadeContrato,
    dataAssinatura: "",
    dataVigencia: "",
    prazoMeses: "",
    garantia: "",
    retencao: "5",
    reajuste: "IPCA",
    gerenteContrato: "João Silva",
  })

  const [formAditivo, setFormAditivo] = useState({
    numero: "",
    tipo: "Prazo",
    valor: "",
    prazoMeses: "",
    justificativa: "",
    dataAssinatura: "",
  })

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getStatusConfig = (status: StatusContrato) => {
    const configs = {
      ativo: { label: "Ativo", variant: "default" as const, icon: CheckCircle2, color: "text-emerald-600" },
      em_assinatura: { label: "Em Assinatura", variant: "secondary" as const, icon: Clock, color: "text-amber-600" },
      suspenso: { label: "Suspenso", variant: "destructive" as const, icon: AlertTriangle, color: "text-orange-600" },
      encerrado: { label: "Encerrado", variant: "outline" as const, icon: XCircle, color: "text-slate-600" },
      rescindido: { label: "Rescindido", variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    }
    return configs[status] || configs.ativo
  }

  // Filtrar contratos
  const contratosFiltrados = contratos.filter((c) => {
    const matchSearch =
      c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "todos" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  // KPIs
  const totalContratos = contratos.length
  const contratosAtivos = contratos.filter((c) => c.status === "ativo").length
  const valorTotal = contratos.reduce((acc, c) => acc + c.valorAtual, 0)
  const totalAditivos = contratos.reduce((acc, c) => acc + (c.aditivos?.length || 0), 0) || 0

  // Handlers
  const handleSalvarContrato = () => {
    if (!formContrato.titulo || !formContrato.clienteId || !formContrato.valorOriginal) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const cliente = clientes.find((c) => c.id === formContrato.clienteId)
    if (!cliente) {
      toast.error("Cliente não encontrado")
      return
    }

    addContrato({
      titulo: formContrato.titulo,
      clienteId: formContrato.clienteId,
      clienteNome: cliente.nome,
      objeto: formContrato.objeto,
      valorOriginal: Number.parseFloat(formContrato.valorOriginal),
      tipo: formContrato.tipo,
      modalidade: formContrato.modalidade,
      dataAssinatura: formContrato.dataAssinatura,
      dataVigencia: formContrato.dataVigencia,
      prazoMeses: Number.parseInt(formContrato.prazoMeses),
      garantia: Number.parseFloat(formContrato.garantia),
      retencao: Number.parseFloat(formContrato.retencao),
      reajuste: formContrato.reajuste,
      gerenteContrato: formContrato.gerenteContrato,
    })

    toast.success(`Contrato ${formContrato.titulo} criado com sucesso!`)
    setShowNovoContratoDialog(false)
    setFormContrato({
      titulo: "",
      clienteId: "",
      objeto: "",
      valorOriginal: "",
      tipo: "Empreitada Global",
      modalidade: "Concorrência Pública",
      dataAssinatura: "",
      dataVigencia: "",
      prazoMeses: "",
      garantia: "",
      retencao: "5",
      reajuste: "IPCA",
      gerenteContrato: "João Silva",
    })
  }

  const handleSalvarAditivo = () => {
    if (!contratoSelecionado || !formAditivo.numero || !formAditivo.justificativa) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    addAditivo(contratoSelecionado.id, {
      numero: Number.parseInt(formAditivo.numero),
      tipo: formAditivo.tipo as "Prazo" | "Valor" | "Escopo",
      valor: formAditivo.valor ? Number.parseFloat(formAditivo.valor) : 0,
      prazoMeses: formAditivo.prazoMeses ? Number.parseInt(formAditivo.prazoMeses) : 0,
      justificativa: formAditivo.justificativa,
      dataAssinatura: formAditivo.dataAssinatura,
    })

    toast.success(`Aditivo ${formAditivo.numero} adicionado com sucesso!`)
    setShowAditivoDialog(false)
    setFormAditivo({
      numero: "",
      tipo: "Prazo",
      valor: "",
      prazoMeses: "",
      justificativa: "",
      dataAssinatura: "",
    })
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* TOPBAR SECUNDÁRIO */}
      <div className="flex-shrink-0 z-50">
        <ComercialNavbar />
      </div>

      {/* Conteúdo Principal - SEM SCROLL (scroll fica na moldura) */}
      <main className="flex-1 overflow-hidden bg-background mt-3 p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', padding: '25px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Contratos</h1>
              <p className="text-sm text-muted-foreground">
                Total: {totalContratos} | Ativos: {contratosAtivos} | Aditivos: {totalAditivos}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusContrato | "todos")}>
                <SelectTrigger className="h-7 w-[140px] text-xs bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Status</SelectItem>
                  <SelectItem value="ativo">Ativos</SelectItem>
                  <SelectItem value="em_assinatura">Em Assinatura</SelectItem>
                  <SelectItem value="suspenso">Suspensos</SelectItem>
                  <SelectItem value="encerrado">Encerrados</SelectItem>
                  <SelectItem value="rescindido">Rescindidos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
                <Download className="w-3.5 h-3.5" />
                Exportar
              </Button>
              <Dialog open={showNovoContratoDialog} onOpenChange={setShowNovoContratoDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-7 text-xs gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Novo Contrato
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Novo Contrato</DialogTitle>
                    <DialogDescription>Cadastre um novo contrato no sistema.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[500px] overflow-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Título*</Label>
                        <Input
                          placeholder="Ex: Duplicação BR-101"
                          value={formContrato.titulo}
                          onChange={(e) => setFormContrato({ ...formContrato, titulo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cliente*</Label>
                        <Select
                          value={formContrato.clienteId}
                          onValueChange={(value) => setFormContrato({ ...formContrato, clienteId: value })}
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
                    <div className="space-y-2">
                      <Label>Objeto do Contrato*</Label>
                      <Textarea
                        placeholder="Descrição detalhada do objeto do contrato..."
                        value={formContrato.objeto}
                        onChange={(e) => setFormContrato({ ...formContrato, objeto: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Valor Original (R$)*</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={formContrato.valorOriginal}
                          onChange={(e) => setFormContrato({ ...formContrato, valorOriginal: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select
                          value={formContrato.tipo}
                          onValueChange={(value: TipoContrato) => setFormContrato({ ...formContrato, tipo: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Empreitada Global">Empreitada Global</SelectItem>
                            <SelectItem value="Empreitada por Preço Unitário">
                              Empreitada por Preço Unitário
                            </SelectItem>
                            <SelectItem value="Fornecimento">Fornecimento</SelectItem>
                            <SelectItem value="Prestação de Serviços">Prestação de Serviços</SelectItem>
                            <SelectItem value="Administração">Administração</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Modalidade</Label>
                        <Select
                          value={formContrato.modalidade}
                          onValueChange={(value: ModalidadeContrato) =>
                            setFormContrato({ ...formContrato, modalidade: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Concorrência Pública">Concorrência Pública</SelectItem>
                            <SelectItem value="Tomada de Preços">Tomada de Preços</SelectItem>
                            <SelectItem value="Convite">Convite</SelectItem>
                            <SelectItem value="Pregão Eletrônico">Pregão Eletrônico</SelectItem>
                            <SelectItem value="Dispensa">Dispensa</SelectItem>
                            <SelectItem value="Inexigibilidade">Inexigibilidade</SelectItem>
                            <SelectItem value="Direta">Direta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Data Assinatura*</Label>
                        <Input
                          type="date"
                          value={formContrato.dataAssinatura}
                          onChange={(e) => setFormContrato({ ...formContrato, dataAssinatura: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Data Vigência*</Label>
                        <Input
                          type="date"
                          value={formContrato.dataVigencia}
                          onChange={(e) => setFormContrato({ ...formContrato, dataVigencia: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Prazo (meses)*</Label>
                        <Input
                          type="number"
                          placeholder="12"
                          value={formContrato.prazoMeses}
                          onChange={(e) => setFormContrato({ ...formContrato, prazoMeses: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Garantia (R$)</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={formContrato.garantia}
                          onChange={(e) => setFormContrato({ ...formContrato, garantia: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Retenção (%)</Label>
                        <Input
                          type="number"
                          placeholder="5"
                          value={formContrato.retencao}
                          onChange={(e) => setFormContrato({ ...formContrato, retencao: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Índice Reajuste</Label>
                        <Select
                          value={formContrato.reajuste}
                          onValueChange={(value) => setFormContrato({ ...formContrato, reajuste: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IPCA">IPCA</SelectItem>
                            <SelectItem value="INCC">INCC</SelectItem>
                            <SelectItem value="IGP-M">IGP-M</SelectItem>
                            <SelectItem value="IGPM">IGPM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNovoContratoDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSalvarContrato}>Criar Contrato</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-4 gap-3">
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalContratos}</p>
                    <p className="text-[10px] text-muted-foreground">Total Contratos</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(valorTotal)}</p>
                    <p className="text-[10px] text-muted-foreground">Valor Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{contratosAtivos}</p>
                    <p className="text-[10px] text-muted-foreground">Contratos Ativos</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalAditivos}</p>
                    <p className="text-[10px] text-muted-foreground">Aditivos</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Tabela */}
            <Card className="border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Título / Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor Original</TableHead>
                      <TableHead>Valor Atual</TableHead>
                      <TableHead>Aditivos</TableHead>
                      <TableHead>Vigência</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contratosFiltrados.map((contrato) => {
                      const statusConfig = getStatusConfig(contrato.status)
                      const StatusIcon = statusConfig.icon

                      return (
                        <TableRow key={contrato.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-mono text-xs">{contrato.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{contrato.titulo}</p>
                              <p className="text-xs text-muted-foreground">{contrato.clienteNome}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusConfig.variant} className="text-xs gap-1">
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(contrato.valorOriginal)}</TableCell>
                          <TableCell className="font-bold text-emerald-600">
                            {formatCurrency(contrato.valorAtual)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {contrato.aditivos.length}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs">{formatDate(contrato.dataVigencia)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    selecionarContrato(contrato)
                                    setShowDetalhesDialog(true)
                                  }}
                                >
                                  <Eye className="w-3.5 h-3.5 mr-2" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    selecionarContrato(contrato)
                                    setShowAditivoDialog(true)
                                    setFormAditivo({
                                      ...formAditivo,
                                      numero: String(contrato.aditivos.length + 1),
                                    })
                                  }}
                                >
                                  <Plus className="w-3.5 h-3.5 mr-2" />
                                  Novo Aditivo
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Upload className="w-3.5 h-3.5 mr-2" />
                                  Upload Documento
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-3.5 h-3.5 mr-2" />
                                  Baixar Documentos
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialog de Detalhes */}
      <Dialog open={showDetalhesDialog} onOpenChange={setShowDetalhesDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Contrato</DialogTitle>
            <DialogDescription>{contratoSelecionado?.id}</DialogDescription>
          </DialogHeader>
          {contratoSelecionado && (
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="aditivos">
                  Aditivos ({contratoSelecionado.aditivos.length})
                </TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{contratoSelecionado.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{contratoSelecionado.clienteNome}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Valor Original</p>
                    <p className="font-bold text-lg">{formatCurrency(contratoSelecionado.valorOriginal)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valor Atual</p>
                    <p className="font-bold text-lg text-emerald-600">
                      {formatCurrency(contratoSelecionado.valorAtual)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tipo</p>
                    <p className="font-medium">{contratoSelecionado.tipo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Modalidade</p>
                    <p className="font-medium">{contratoSelecionado.modalidade}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Data Assinatura</p>
                    <p className="font-medium">{formatDate(contratoSelecionado.dataAssinatura)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Vigência</p>
                    <p className="font-medium">{formatDate(contratoSelecionado.dataVigencia)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Objeto</p>
                  <p className="text-sm">{contratoSelecionado.objeto}</p>
                </div>
              </TabsContent>
              <TabsContent value="aditivos" className="space-y-2">
                {contratoSelecionado.aditivos.length > 0 ? (
                  contratoSelecionado.aditivos.map((aditivo) => (
                    <Card key={aditivo.numero} className="p-3 border">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Aditivo {aditivo.numero}</Badge>
                            <span className="text-xs text-muted-foreground">{aditivo.tipo}</span>
                          </div>
                          <p className="text-sm">{aditivo.justificativa}</p>
                          {aditivo.valor > 0 && (
                            <p className="text-sm font-medium text-emerald-600">{formatCurrency(aditivo.valor)}</p>
                          )}
                          {aditivo.prazoMeses > 0 && (
                            <p className="text-xs text-muted-foreground">+{aditivo.prazoMeses} meses</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(aditivo.dataAssinatura)}</span>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Nenhum aditivo registrado.
                  </div>
                )}
              </TabsContent>
              <TabsContent value="documentos" className="space-y-2">
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Paperclip className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Funcionalidade de documentos será implementada em breve.</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Aditivo */}
      <Dialog open={showAditivoDialog} onOpenChange={setShowAditivoDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Aditivo</DialogTitle>
            <DialogDescription>
              {contratoSelecionado?.titulo} - {contratoSelecionado?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número*</Label>
                <Input
                  type="number"
                  value={formAditivo.numero}
                  onChange={(e) => setFormAditivo({ ...formAditivo, numero: e.target.value })}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo*</Label>
                <Select
                  value={formAditivo.tipo}
                  onValueChange={(value) => setFormAditivo({ ...formAditivo, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prazo">Prazo</SelectItem>
                    <SelectItem value="Valor">Valor</SelectItem>
                    <SelectItem value="Escopo">Escopo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formAditivo.valor}
                  onChange={(e) => setFormAditivo({ ...formAditivo, valor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Prazo Adicional (meses)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formAditivo.prazoMeses}
                  onChange={(e) => setFormAditivo({ ...formAditivo, prazoMeses: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Data Assinatura*</Label>
              <Input
                type="date"
                value={formAditivo.dataAssinatura}
                onChange={(e) => setFormAditivo({ ...formAditivo, dataAssinatura: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Justificativa*</Label>
              <Textarea
                placeholder="Justificativa detalhada para o aditivo..."
                value={formAditivo.justificativa}
                onChange={(e) => setFormAditivo({ ...formAditivo, justificativa: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAditivoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarAditivo}>Adicionar Aditivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSS Global para esconder scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
