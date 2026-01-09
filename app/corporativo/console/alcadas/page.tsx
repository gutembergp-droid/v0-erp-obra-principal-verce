"use client"

import { useState } from "react"
import {
  Search,
  ChevronRight,
  GitBranch,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Download,
  Clock,
  MoreHorizontal,
  Users,
  DollarSign,
  FileText,
  ShoppingCart,
  Building2,
  CheckCircle,
  XCircle,
  ArrowRight,
  User,
  Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

// Tipos de evento
const tiposEvento = [
  { id: "pedido-compra", nome: "Pedido de Compra", icon: ShoppingCart, departamento: "Suprimentos" },
  { id: "contrato-comercial", nome: "Contrato Comercial", icon: FileText, departamento: "Comercial" },
  { id: "pagamento", nome: "Pagamento", icon: DollarSign, departamento: "Financeiro" },
  { id: "contratacao", nome: "Contratacao de Pessoal", icon: Users, departamento: "RH" },
  { id: "reembolso", nome: "Reembolso", icon: DollarSign, departamento: "Financeiro" },
  { id: "aditivo", nome: "Aditivo Contratual", icon: FileText, departamento: "Comercial" },
]

// Governantes
const governantes = [
  {
    id: "gov-comercial",
    nome: "Joao Silva",
    cargo: "Governante Comercial",
    departamento: "Comercial",
    email: "joao.comercial@empresa.com",
  },
  {
    id: "gov-suprimentos",
    nome: "Maria Souza",
    cargo: "Governante Suprimentos",
    departamento: "Suprimentos",
    email: "maria.suprimentos@empresa.com",
  },
  {
    id: "gov-rh",
    nome: "Carlos Lima",
    cargo: "Governante RH",
    departamento: "Recursos Humanos",
    email: "carlos.rh@empresa.com",
  },
  {
    id: "gov-financeiro",
    nome: "Diretoria",
    cargo: "Governante Financeiro",
    departamento: "Financeiro",
    email: "diretoria@empresa.com",
  },
]

// Regras de alcada
const regrasData = [
  {
    id: 1,
    tipo: "pedido-compra",
    tipoNome: "Pedido de Compra",
    faixaInicio: 0,
    faixaFim: 5000,
    aprovador: "Gestor Direto",
    aprovadorTipo: "hierarquia",
    status: "ativo",
    criadoEm: "01/01/2026",
  },
  {
    id: 2,
    tipo: "pedido-compra",
    tipoNome: "Pedido de Compra",
    faixaInicio: 5001,
    faixaFim: 50000,
    aprovador: "Maria Souza",
    aprovadorTipo: "governante",
    status: "ativo",
    criadoEm: "01/01/2026",
  },
  {
    id: 3,
    tipo: "pedido-compra",
    tipoNome: "Pedido de Compra",
    faixaInicio: 50001,
    faixaFim: null,
    aprovador: "Diretoria",
    aprovadorTipo: "diretoria",
    status: "ativo",
    criadoEm: "01/01/2026",
  },
  {
    id: 4,
    tipo: "contrato-comercial",
    tipoNome: "Contrato Comercial",
    faixaInicio: 0,
    faixaFim: null,
    aprovador: "Joao Silva",
    aprovadorTipo: "governante",
    status: "ativo",
    criadoEm: "01/01/2026",
  },
  {
    id: 5,
    tipo: "pagamento",
    tipoNome: "Pagamento",
    faixaInicio: 0,
    faixaFim: 10000,
    aprovador: "Gestor Direto",
    aprovadorTipo: "hierarquia",
    status: "ativo",
    criadoEm: "05/01/2026",
  },
  {
    id: 6,
    tipo: "pagamento",
    tipoNome: "Pagamento",
    faixaInicio: 10001,
    faixaFim: null,
    aprovador: "Diretoria",
    aprovadorTipo: "diretoria",
    status: "ativo",
    criadoEm: "05/01/2026",
  },
  {
    id: 7,
    tipo: "contratacao",
    tipoNome: "Contratacao de Pessoal",
    faixaInicio: 0,
    faixaFim: null,
    aprovador: "Carlos Lima",
    aprovadorTipo: "governante",
    status: "ativo",
    criadoEm: "02/01/2026",
  },
  {
    id: 8,
    tipo: "reembolso",
    tipoNome: "Reembolso",
    faixaInicio: 0,
    faixaFim: 1000,
    aprovador: "Gestor Direto",
    aprovadorTipo: "hierarquia",
    status: "ativo",
    criadoEm: "03/01/2026",
  },
]

// Aprovacoes pendentes
const aprovacoesPendentes = [
  {
    id: "APR-001",
    tipo: "Pedido de Compra",
    valor: 25000,
    solicitante: "Marcos Pereira",
    data: "09/01/2026",
    aguardando: "Maria Souza",
  },
  {
    id: "APR-002",
    tipo: "Contrato Comercial",
    valor: 150000,
    solicitante: "Ana Paula",
    data: "08/01/2026",
    aguardando: "Joao Silva",
  },
  {
    id: "APR-003",
    tipo: "Pagamento",
    valor: 45000,
    solicitante: "Fernando Costa",
    data: "08/01/2026",
    aguardando: "Diretoria",
  },
]

export default function AlcadasPage() {
  const [tab, setTab] = useState("regras")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [busca, setBusca] = useState("")
  const [showNovaRegraDialog, setShowNovaRegraDialog] = useState(false)
  const [showEditarRegraDialog, setShowEditarRegraDialog] = useState(false)
  const [regraEditando, setRegraEditando] = useState<(typeof regrasData)[0] | null>(null)

  // Form nova regra
  const [novaRegra, setNovaRegra] = useState({
    tipo: "",
    faixaInicio: "",
    faixaFim: "",
    aprovadorTipo: "",
    aprovador: "",
  })

  const formatarValor = (valor: number | null) => {
    if (valor === null) return "Sem limite"
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor)
  }

  const regrasFiltradas = regrasData.filter((regra) => {
    if (filtroTipo !== "todos" && regra.tipo !== filtroTipo) return false
    if (busca && !regra.tipoNome.toLowerCase().includes(busca.toLowerCase())) return false
    return true
  })

  const atividadeRecente = [
    { acao: "Regra criada", detalhe: "Reembolso ate R$ 1.000", tempo: "1h", usuario: "Admin" },
    { acao: "Alcada alterada", detalhe: "Pedido de Compra: R$ 5.000 → R$ 7.000", tempo: "3h", usuario: "Admin" },
    { acao: "Governante definido", detalhe: "Carlos Lima → RH", tempo: "1d", usuario: "Diretoria" },
    { acao: "Regra desativada", detalhe: "Aditivo < R$ 10.000", tempo: "2d", usuario: "Admin" },
  ]

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Alcadas & Aprovacoes</h1>
            <p className="text-xs text-muted-foreground">Regras de aprovacao por valor e tipo</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar regra..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNovaRegraDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Nova Regra
          </Button>
        </div>
      </div>

      {/* Barra de alertas */}
      {aprovacoesPendentes.length > 0 && (
        <div className="h-9 bg-amber-50 border-b border-amber-200 flex items-center px-4 text-sm">
          <Clock className="h-4 w-4 text-amber-600 mr-2" />
          <span className="text-amber-800">{aprovacoesPendentes.length} aprovacoes pendentes aguardando acao</span>
          <Button
            variant="link"
            size="sm"
            className="text-amber-700 ml-2 h-auto p-0"
            onClick={() => setTab("pendentes")}
          >
            Ver pendentes
          </Button>
        </div>
      )}

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{regrasData.length}</div>
          <div className="text-xs text-muted-foreground">Regras Ativas</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{tiposEvento.length}</div>
          <div className="text-xs text-muted-foreground">Tipos de Evento</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{governantes.length}</div>
          <div className="text-xs text-muted-foreground">Governantes</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">{aprovacoesPendentes.length}</div>
          <div className="text-xs text-muted-foreground">Pendentes</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">47</div>
          <div className="text-xs text-muted-foreground">Aprovados (Mes)</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-xs text-muted-foreground">Rejeitados (Mes)</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-4">
          <TabsList className="h-10">
            <TabsTrigger value="regras" className="text-sm">
              Regras de Alcada
            </TabsTrigger>
            <TabsTrigger value="governantes" className="text-sm">
              Governantes
            </TabsTrigger>
            <TabsTrigger value="pendentes" className="text-sm">
              Pendentes
              {aprovacoesPendentes.length > 0 && (
                <Badge variant="destructive" className="ml-1.5 h-5 px-1.5">
                  {aprovacoesPendentes.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="fluxos" className="text-sm">
              Fluxos Visuais
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Regras */}
        <TabsContent value="regras" className="flex-1 flex overflow-hidden m-0">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filtros */}
            <div className="p-3 border-b flex items-center gap-3">
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-48 h-8">
                  <SelectValue placeholder="Tipo de Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  {tiposEvento.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabela */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Tipo de Evento</TableHead>
                    <TableHead>Faixa de Valor</TableHead>
                    <TableHead>Aprovador</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regrasFiltradas.map((regra) => {
                    const tipoEvento = tiposEvento.find((t) => t.id === regra.tipo)
                    const IconeTipo = tipoEvento?.icon || FileText

                    return (
                      <TableRow key={regra.id}>
                        <TableCell>
                          <IconeTipo className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-sm">{regra.tipoNome}</div>
                          <div className="text-xs text-muted-foreground">{tipoEvento?.departamento}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatarValor(regra.faixaInicio)} ate {formatarValor(regra.faixaFim)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {regra.aprovadorTipo === "governante" && <Crown className="h-4 w-4 text-amber-500" />}
                            {regra.aprovadorTipo === "diretoria" && <Building2 className="h-4 w-4 text-purple-500" />}
                            {regra.aprovadorTipo === "hierarquia" && <User className="h-4 w-4 text-blue-500" />}
                            <span className="text-sm">{regra.aprovador}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {regra.aprovadorTipo === "governante" && "Governante"}
                            {regra.aprovadorTipo === "diretoria" && "Diretoria"}
                            {regra.aprovadorTipo === "hierarquia" && "Hierarquia"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={regra.status === "ativo" ? "bg-emerald-600" : "bg-gray-400"}>
                            {regra.status === "ativo" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{regra.criadoEm}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setRegraEditando(regra)
                                  setShowEditarRegraDialog(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Sidebar Atividade */}
          <div className="w-72 border-l bg-card flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
              <span className="text-sm font-medium">Atividade Recente</span>
            </div>
            <div className="flex-1 overflow-auto p-3 space-y-3">
              {atividadeRecente.map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{item.acao}</div>
                  <div className="text-xs text-muted-foreground">{item.detalhe}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.usuario} • {item.tempo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab Governantes */}
        <TabsContent value="governantes" className="flex-1 overflow-auto m-0 p-4">
          <div className="grid grid-cols-2 gap-4">
            {governantes.map((gov) => (
              <div key={gov.id} className="bg-card rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{gov.nome}</div>
                    <div className="text-sm text-muted-foreground">{gov.cargo}</div>
                    <div className="text-xs text-muted-foreground mt-1">{gov.email}</div>
                    <Badge variant="outline" className="mt-2">
                      {gov.departamento}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Tab Pendentes */}
        <TabsContent value="pendentes" className="flex-1 overflow-auto m-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Aguardando</TableHead>
                <TableHead className="w-24">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aprovacoesPendentes.map((ap) => (
                <TableRow key={ap.id}>
                  <TableCell className="font-mono text-sm">{ap.id}</TableCell>
                  <TableCell>{ap.tipo}</TableCell>
                  <TableCell className="font-medium">{formatarValor(ap.valor)}</TableCell>
                  <TableCell>{ap.solicitante}</TableCell>
                  <TableCell className="text-muted-foreground">{ap.data}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ap.aguardando}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Tab Fluxos Visuais */}
        <TabsContent value="fluxos" className="flex-1 overflow-auto m-0 p-4">
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-semibold mb-4">Fluxo: Pedido de Compra</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm font-medium">Solicitante</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-amber-100 text-amber-800 px-3 py-2 rounded text-sm font-medium">
                  Ate R$ 5.000: Gestor Direto
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded text-sm font-medium">
                  R$ 5.001 - R$ 50.000: Governante (Maria Souza)
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-red-100 text-red-800 px-3 py-2 rounded text-sm font-medium">
                  Acima R$ 50.000: Diretoria
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded text-sm font-medium">Aprovado</div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-semibold mb-4">Fluxo: Contrato Comercial</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm font-medium">Solicitante</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded text-sm font-medium">
                  Qualquer valor: Governante (Joao Silva)
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded text-sm font-medium">Aprovado</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Cards de acao rapida */}
      <div className="border-t p-3 bg-card">
        <div className="grid grid-cols-4 gap-3">
          <button
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left"
            onClick={() => setShowNovaRegraDialog(true)}
          >
            <Plus className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Nova Regra</div>
              <div className="text-xs text-muted-foreground">Criar alcada</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Crown className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Governantes</div>
              <div className="text-xs text-muted-foreground">Gerenciar responsaveis</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Download className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Exportar Regras</div>
              <div className="text-xs text-muted-foreground">Excel ou PDF</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Historico</div>
              <div className="text-xs text-muted-foreground">Aprovacoes anteriores</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>

      {/* Dialog Nova Regra */}
      <Dialog open={showNovaRegraDialog} onOpenChange={setShowNovaRegraDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Regra de Alcada</DialogTitle>
            <DialogDescription>Defina o tipo de evento, faixa de valor e aprovador</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Tipo de Evento</Label>
              <Select value={novaRegra.tipo} onValueChange={(v) => setNovaRegra({ ...novaRegra, tipo: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {tiposEvento.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Valor Minimo (R$)</Label>
                <Input
                  type="number"
                  className="mt-1.5"
                  placeholder="0"
                  value={novaRegra.faixaInicio}
                  onChange={(e) => setNovaRegra({ ...novaRegra, faixaInicio: e.target.value })}
                />
              </div>
              <div>
                <Label>Valor Maximo (R$)</Label>
                <Input
                  type="number"
                  className="mt-1.5"
                  placeholder="Sem limite"
                  value={novaRegra.faixaFim}
                  onChange={(e) => setNovaRegra({ ...novaRegra, faixaFim: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Tipo de Aprovador</Label>
              <Select
                value={novaRegra.aprovadorTipo}
                onValueChange={(v) => setNovaRegra({ ...novaRegra, aprovadorTipo: v })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hierarquia">Gestor Direto (Hierarquia)</SelectItem>
                  <SelectItem value="governante">Governante do Departamento</SelectItem>
                  <SelectItem value="diretoria">Diretoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {novaRegra.aprovadorTipo === "governante" && (
              <div>
                <Label>Governante</Label>
                <Select value={novaRegra.aprovador} onValueChange={(v) => setNovaRegra({ ...novaRegra, aprovador: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {governantes.map((gov) => (
                      <SelectItem key={gov.id} value={gov.nome}>
                        {gov.nome} - {gov.departamento}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovaRegraDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowNovaRegraDialog(false)}>Criar Regra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
