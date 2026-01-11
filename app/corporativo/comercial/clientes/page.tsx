"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComercialNavbar } from "../_components/comercial-navbar"
import { useComercial } from "@/contexts/comercial-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Cliente, TipoCliente, SegmentoCliente, TipoInteracao } from "@/lib/types/comercial"
import {
  FileText,
  Plus,
  Building2,
  DollarSign,
  Target,
  FolderKanban,
  MoreHorizontal,
  Star,
  StarOff,
  MessageSquare,
  Clock,
  Download,
  ArrowUpDown,
  ExternalLink,
  CheckCircle2,
  User,
  Globe,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Users,
  TrendingUp,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ============================================================================
// COMPONENT
// ============================================================================

export default function ClientesCRMPage() {
  const {
    clientes,
    clienteSelecionado,
    selecionarCliente,
    addCliente,
    toggleFavorito,
    addInteracaoCliente,
  } = useComercial()

  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState<TipoCliente | null>(null)
  const [showNovoClienteDialog, setShowNovoClienteDialog] = useState(false)
  const [showNovaInteracaoDialog, setShowNovaInteracaoDialog] = useState(false)

  // Form states
  const [formCliente, setFormCliente] = useState({
    nome: "",
    nomeCompleto: "",
    cnpj: "",
    tipo: "Publico" as TipoCliente,
    segmento: "Infraestrutura Rodoviária" as SegmentoCliente,
    endereco: "",
    cidade: "",
    uf: "",
    site: "",
    contatoNome: "",
    contatoCargo: "",
    contatoEmail: "",
    contatoTelefone: "",
  })

  const [formInteracao, setFormInteracao] = useState({
    tipo: "reuniao" as TipoInteracao,
    descricao: "",
    proximaAcao: "",
    proximaAcaoData: "",
  })

  // Filtros
  const clientesFiltrados = clientes.filter((c) => {
    const matchSearch =
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.segmento.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo ? c.tipo === filtroTipo : true
    return matchSearch && matchTipo
  })

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getInteracaoIcon = (tipo: TipoInteracao) => {
    const icons: Record<TipoInteracao, React.ReactNode> = {
      reuniao: <Users className="w-3 h-3 text-blue-500" />,
      email: <Mail className="w-3 h-3 text-green-500" />,
      telefone: <Phone className="w-3 h-3 text-purple-500" />,
      proposta: <FileText className="w-3 h-3 text-amber-500" />,
      contrato: <FileCheck className="w-3 h-3 text-emerald-500" />,
      negociacao: <TrendingUp className="w-3 h-3 text-cyan-500" />,
      prospeccao: <Target className="w-3 h-3 text-slate-500" />,
      visita: <MapPin className="w-3 h-3 text-pink-500" />,
    }
    return icons[tipo] || <MessageSquare className="w-3 h-3" />
  }

  // Handlers
  const handleSalvarCliente = () => {
    if (!formCliente.nome || !formCliente.nomeCompleto || !formCliente.cnpj) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    addCliente({
      nome: formCliente.nome,
      nomeCompleto: formCliente.nomeCompleto,
      tipo: formCliente.tipo,
      segmento: formCliente.segmento,
      cnpj: formCliente.cnpj,
      endereco: formCliente.endereco,
      cidade: formCliente.cidade,
      uf: formCliente.uf,
      site: formCliente.site,
      favorito: false,
      status: "Ativo",
      contatos: [
        {
          id: `CONT-${Date.now()}`,
          nome: formCliente.contatoNome,
          cargo: formCliente.contatoCargo,
          email: formCliente.contatoEmail,
          telefone: formCliente.contatoTelefone,
          principal: true,
          ativo: true,
          dataCadastro: new Date().toISOString(),
        },
      ],
      contratos: 0,
      valorTotal: 0,
      propostasAtivas: 0,
      ultimoContato: new Date().toISOString(),
      historico: [],
      responsavel: "João Silva",
    })

    toast.success(`Cliente ${formCliente.nome} cadastrado com sucesso!`)
    setShowNovoClienteDialog(false)
    setFormCliente({
      nome: "",
      nomeCompleto: "",
      cnpj: "",
      tipo: "Publico",
      segmento: "Infraestrutura Rodoviária",
      endereco: "",
      cidade: "",
      uf: "",
      site: "",
      contatoNome: "",
      contatoCargo: "",
      contatoEmail: "",
      contatoTelefone: "",
    })
  }

  const handleSalvarInteracao = () => {
    if (!clienteSelecionado || !formInteracao.descricao) {
      toast.error("Preencha a descrição da interação")
      return
    }

    addInteracaoCliente(clienteSelecionado.id, {
      tipo: formInteracao.tipo,
      descricao: formInteracao.descricao,
      data: new Date().toISOString(),
      usuario: "João Silva",
      proximaAcao: formInteracao.proximaAcao || undefined,
      proximaAcaoData: formInteracao.proximaAcaoData || undefined,
    })

    toast.success("Interação registrada com sucesso!")
    setShowNovaInteracaoDialog(false)
    setFormInteracao({
      tipo: "reuniao",
      descricao: "",
      proximaAcao: "",
      proximaAcaoData: "",
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
            <div className="space-y-4">
            {/* Header com ações */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Clientes & CRM</h1>
                <p className="text-sm text-muted-foreground">Total: {clientes.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 mr-2">
                  {(["Publico", "Privado", "Misto"] as TipoCliente[]).map((tipo) => (
                    <Button
                      key={tipo}
                      variant={filtroTipo === tipo ? "default" : "ghost"}
                      size="sm"
                      className="h-8 text-xs px-3"
                      onClick={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
                    >
                      {tipo}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Exportar
              </Button>
              <Dialog open={showNovoClienteDialog} onOpenChange={setShowNovoClienteDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-7 text-xs gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Novo Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Novo Cliente</DialogTitle>
                    <DialogDescription>Cadastre um novo cliente no CRM.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome*</Label>
                        <Input
                          placeholder="Ex: DNIT"
                          value={formCliente.nome}
                          onChange={(e) => setFormCliente({ ...formCliente, nome: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nome Completo*</Label>
                        <Input
                          placeholder="Nome completo da empresa"
                          value={formCliente.nomeCompleto}
                          onChange={(e) => setFormCliente({ ...formCliente, nomeCompleto: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>CNPJ*</Label>
                        <Input
                          placeholder="00.000.000/0001-00"
                          value={formCliente.cnpj}
                          onChange={(e) => setFormCliente({ ...formCliente, cnpj: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo*</Label>
                        <Select
                          value={formCliente.tipo}
                          onValueChange={(value: TipoCliente) => setFormCliente({ ...formCliente, tipo: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Publico">Público</SelectItem>
                            <SelectItem value="Privado">Privado</SelectItem>
                            <SelectItem value="Misto">Misto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Segmento*</Label>
                        <Select
                          value={formCliente.segmento}
                          onValueChange={(value: SegmentoCliente) =>
                            setFormCliente({ ...formCliente, segmento: value })
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
                            <SelectItem value="Concessões Rodoviárias">Concessões Rodoviárias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label>Endereço</Label>
                        <Input
                          placeholder="Endereço"
                          value={formCliente.endereco}
                          onChange={(e) => setFormCliente({ ...formCliente, endereco: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cidade</Label>
                        <Input
                          placeholder="Cidade"
                          value={formCliente.cidade}
                          onChange={(e) => setFormCliente({ ...formCliente, cidade: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>UF</Label>
                        <Input
                          placeholder="UF"
                          value={formCliente.uf}
                          onChange={(e) => setFormCliente({ ...formCliente, uf: e.target.value })}
                          maxLength={2}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Site</Label>
                      <Input
                        placeholder="www.exemplo.com.br"
                        value={formCliente.site}
                        onChange={(e) => setFormCliente({ ...formCliente, site: e.target.value })}
                      />
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-3">Contato Principal</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome</Label>
                          <Input
                            placeholder="Nome do contato"
                            value={formCliente.contatoNome}
                            onChange={(e) => setFormCliente({ ...formCliente, contatoNome: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cargo</Label>
                          <Input
                            placeholder="Cargo"
                            value={formCliente.contatoCargo}
                            onChange={(e) => setFormCliente({ ...formCliente, contatoCargo: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>E-mail</Label>
                          <Input
                            placeholder="email@empresa.com"
                            type="email"
                            value={formCliente.contatoEmail}
                            onChange={(e) => setFormCliente({ ...formCliente, contatoEmail: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefone</Label>
                          <Input
                            placeholder="(00) 0000-0000"
                            value={formCliente.contatoTelefone}
                            onChange={(e) => setFormCliente({ ...formCliente, contatoTelefone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNovoClienteDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSalvarCliente}>Cadastrar Cliente</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
            {/* Métricas */}
            <div className="grid grid-cols-5 gap-3">
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientes.length}</p>
                    <p className="text-[10px] text-muted-foreground">Total Clientes</p>
                  </div>
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientes.filter((c) => c.status === "Ativo").length}</p>
                    <p className="text-[10px] text-muted-foreground">Clientes Ativos</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientes.filter((c) => c.favorito).length}</p>
                    <p className="text-[10px] text-muted-foreground">Favoritos</p>
                  </div>
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{clientes.reduce((acc, c) => acc + c.contratos, 0)}</p>
                    <p className="text-[10px] text-muted-foreground">Contratos Ativos</p>
                  </div>
                  <FolderKanban className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(clientes.reduce((acc, c) => acc + c.valorTotal, 0))}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Valor Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Lista de Clientes */}
              <Card className="lg:col-span-2 border">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
                        <ArrowUpDown className="w-3 h-3" />
                        Ordenar
                      </Button>
                      <span className="text-xs text-muted-foreground">{clientesFiltrados.length} cliente(s)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-8 pl-4"></TableHead>
                          <TableHead className="text-xs">Cliente</TableHead>
                          <TableHead className="text-xs">Tipo</TableHead>
                          <TableHead className="text-xs">Segmento</TableHead>
                          <TableHead className="text-xs text-center">Contratos</TableHead>
                          <TableHead className="text-xs text-right">Valor</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                          <TableHead className="w-8"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientesFiltrados.map((cliente) => (
                          <TableRow
                            key={cliente.id}
                            className={cn(
                              "text-xs cursor-pointer",
                              clienteSelecionado?.id === cliente.id && "bg-muted/50"
                            )}
                            onClick={() => selecionarCliente(cliente)}
                          >
                            <TableCell className="pl-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorito(cliente.id)
                                }}
                              >
                                {cliente.favorito ? (
                                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                ) : (
                                  <StarOff className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                              </button>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    {cliente.nome.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{cliente.nome}</p>
                                  <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                                    {cliente.nomeCompleto}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  cliente.tipo === "Publico"
                                    ? "default"
                                    : cliente.tipo === "Privado"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-[10px]"
                              >
                                {cliente.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{cliente.segmento}</TableCell>
                            <TableCell className="text-center">
                              <span className="font-medium">{cliente.contratos}</span>
                            </TableCell>
                            <TableCell className="text-right font-medium text-primary">
                              {formatCurrency(cliente.valorTotal)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={cliente.status === "Ativo" ? "default" : "outline"}
                                className={cn(
                                  "text-[10px]",
                                  cliente.status === "Ativo" ? "bg-emerald-500" : "text-amber-600 border-amber-300"
                                )}
                              >
                                {cliente.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <FileText className="w-3.5 h-3.5 mr-2" />
                                    Nova Proposta
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setShowNovaInteracaoDialog(true)}>
                                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                                    Registrar Interação
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Detalhes do Cliente */}
              <Card className="border">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">
                    {clienteSelecionado ? "Detalhes do Cliente" : "Selecione um Cliente"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {clienteSelecionado ? (
                    <ScrollArea className="h-[500px]">
                      <div className="p-4 space-y-4">
                        {/* Info básica */}
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {clienteSelecionado.nome.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{clienteSelecionado.nome}</h3>
                              {clienteSelecionado.favorito && (
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{clienteSelecionado.nomeCompleto}</p>
                          </div>
                        </div>

                        {/* Info adicional */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Building2 className="w-3 h-3" />
                            <span>{clienteSelecionado.tipo}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Target className="w-3 h-3" />
                            <span>{clienteSelecionado.segmento}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {clienteSelecionado.cidade}, {clienteSelecionado.uf}
                            </span>
                          </div>
                          {clienteSelecionado.site && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Globe className="w-3 h-3" />
                              <span>{clienteSelecionado.site}</span>
                            </div>
                          )}
                        </div>

                        {/* Métricas do cliente */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <p className="text-lg font-bold">{clienteSelecionado.contratos}</p>
                            <p className="text-[10px] text-muted-foreground">Contratos</p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <p className="text-lg font-bold">{clienteSelecionado.propostasAtivas}</p>
                            <p className="text-[10px] text-muted-foreground">Propostas</p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <p className="text-sm font-bold text-primary">
                              {formatCurrency(clienteSelecionado.valorTotal)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Valor Total</p>
                          </div>
                        </div>

                        {/* Próxima ação */}
                        {clienteSelecionado.proximaAcao && (
                          <div className="p-2 bg-amber-50 border border-amber-200 rounded">
                            <div className="flex items-start gap-2">
                              <Clock className="w-3.5 h-3.5 text-amber-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-medium text-amber-800">Próxima Ação</p>
                                <p className="text-xs text-amber-700">{clienteSelecionado.proximaAcao}</p>
                                {clienteSelecionado.proximaAcaoData && (
                                  <p className="text-[10px] text-amber-600 mt-0.5">
                                    {new Date(clienteSelecionado.proximaAcaoData).toLocaleDateString("pt-BR")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Contatos */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium">Contatos</p>
                            <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5">
                              <Plus className="w-3 h-3 mr-0.5" />
                              Adicionar
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {clienteSelecionado.contatos.map((contato) => (
                              <div key={contato.id} className="p-2 bg-muted/50 rounded">
                                <div className="flex items-center gap-2">
                                  <User className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs font-medium">{contato.nome}</span>
                                  {contato.principal && (
                                    <Badge variant="outline" className="text-[8px] h-4 px-1">
                                      Principal
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-[10px] text-muted-foreground ml-5">{contato.cargo}</p>
                                <div className="flex items-center gap-3 mt-1 ml-5">
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                    <Mail className="w-2.5 h-2.5" />
                                    {contato.email}
                                  </span>
                                </div>
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 ml-5 mt-0.5">
                                  <Phone className="w-2.5 h-2.5" />
                                  {contato.telefone}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Histórico de interações */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium">Histórico de Interações</p>
                            <Dialog open={showNovaInteracaoDialog} onOpenChange={setShowNovaInteracaoDialog}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1.5">
                                  <Plus className="w-3 h-3 mr-0.5" />
                                  Registrar
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Nova Interação</DialogTitle>
                                  <DialogDescription>
                                    Registre uma nova interação com {clienteSelecionado.nome}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Tipo de Interação</Label>
                                    <Select
                                      value={formInteracao.tipo}
                                      onValueChange={(value: TipoInteracao) =>
                                        setFormInteracao({ ...formInteracao, tipo: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="reuniao">Reunião</SelectItem>
                                        <SelectItem value="email">E-mail</SelectItem>
                                        <SelectItem value="telefone">Telefone</SelectItem>
                                        <SelectItem value="visita">Visita Técnica</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Descrição*</Label>
                                    <Textarea
                                      placeholder="Descreva a interação..."
                                      value={formInteracao.descricao}
                                      onChange={(e) =>
                                        setFormInteracao({ ...formInteracao, descricao: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Próxima Ação</Label>
                                    <Input
                                      placeholder="O que deve ser feito a seguir?"
                                      value={formInteracao.proximaAcao}
                                      onChange={(e) =>
                                        setFormInteracao({ ...formInteracao, proximaAcao: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Data da Próxima Ação</Label>
                                    <Input
                                      type="date"
                                      value={formInteracao.proximaAcaoData}
                                      onChange={(e) =>
                                        setFormInteracao({ ...formInteracao, proximaAcaoData: e.target.value })
                                      }
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowNovaInteracaoDialog(false)}>
                                    Cancelar
                                  </Button>
                                  <Button onClick={handleSalvarInteracao}>Registrar</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="space-y-2">
                            {clienteSelecionado.historico.map((item) => (
                              <div key={item.id} className="flex items-start gap-2">
                                <div className="mt-0.5">{getInteracaoIcon(item.tipo)}</div>
                                <div className="flex-1">
                                  <p className="text-xs">{item.descricao}</p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {new Date(item.data).toLocaleDateString("pt-BR")} - {item.usuario}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex gap-2 pt-2 border-t">
                          <Link href="/corporativo/comercial/propostas" className="flex-1">
                            <Button size="sm" className="w-full text-xs h-8">
                              <FileText className="w-3.5 h-3.5 mr-1" />
                              Nova Proposta
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="text-xs h-8 bg-transparent">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="h-[500px] flex flex-col items-center justify-center text-muted-foreground">
                      <Building2 className="w-12 h-12 mb-3 opacity-30" />
                      <p className="text-sm">Selecione um cliente</p>
                      <p className="text-xs">para ver os detalhes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* CSS Global para esconder scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
