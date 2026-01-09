"use client"

import { useState } from "react"
import {
  Search,
  ChevronRight,
  Building2,
  Plus,
  Pencil,
  Trash2,
  Users,
  MapPin,
  MoreHorizontal,
  Eye,
  UserPlus,
  FolderOpen,
  XCircle,
  Clock,
  TrendingUp,
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo
const centrosCustoData = [
  {
    id: "CC-001",
    codigo: "OBR-2024-001",
    nome: "Edificio Residencial Aurora",
    tipo: "obra",
    cliente: "Construtora ABC",
    localizacao: "Sao Paulo, SP",
    gestor: "Roberto Engenheiro",
    gestorEmail: "roberto@terceiro.com",
    status: "ativo",
    usuarios: 12,
    orcamento: 15000000,
    dataInicio: "15/03/2024",
    previsaoTermino: "30/12/2025",
  },
  {
    id: "CC-002",
    codigo: "OBR-2024-002",
    nome: "Shopping Center Plaza",
    tipo: "obra",
    cliente: "Incorporadora XYZ",
    localizacao: "Rio de Janeiro, RJ",
    gestor: "Carlos Mendes",
    gestorEmail: "carlos.mendes@empresa.com",
    status: "ativo",
    usuarios: 18,
    orcamento: 45000000,
    dataInicio: "01/06/2024",
    previsaoTermino: "30/06/2026",
  },
  {
    id: "CC-003",
    codigo: "OBR-2023-015",
    nome: "Condominio Jardins",
    tipo: "obra",
    cliente: "Grupo Delta",
    localizacao: "Belo Horizonte, MG",
    gestor: "Ana Ferreira",
    gestorEmail: "ana.ferreira@empresa.com",
    status: "concluido",
    usuarios: 5,
    orcamento: 8000000,
    dataInicio: "10/01/2023",
    previsaoTermino: "20/11/2024",
  },
  {
    id: "CC-004",
    codigo: "CORP-ADM",
    nome: "Administrativo Corporativo",
    tipo: "corporativo",
    cliente: "-",
    localizacao: "Sede - Sao Paulo",
    gestor: "Diretoria",
    gestorEmail: "diretoria@empresa.com",
    status: "ativo",
    usuarios: 25,
    orcamento: 2400000,
    dataInicio: "-",
    previsaoTermino: "-",
  },
  {
    id: "CC-005",
    codigo: "CORP-COM",
    nome: "Comercial Corporativo",
    tipo: "corporativo",
    cliente: "-",
    localizacao: "Sede - Sao Paulo",
    gestor: "Joao Silva",
    gestorEmail: "joao.comercial@empresa.com",
    status: "ativo",
    usuarios: 8,
    orcamento: 960000,
    dataInicio: "-",
    previsaoTermino: "-",
  },
]

// Usuarios para vinculacao
const usuariosDisponiveis = [
  { id: "u1", nome: "Ana Paula", email: "ana.dp@empresa.com", perfil: "DP - Cadastro" },
  { id: "u2", nome: "Marcos Pereira", email: "marcos.suprimentos@empresa.com", perfil: "Suprimentos" },
  { id: "u3", nome: "Fernando Costa", email: "fernando@empresa.com", perfil: "Financeiro" },
  { id: "u4", nome: "Patricia Fiscal", email: "patricia@consultoria.com", perfil: "Fiscal - Leitura" },
]

export default function CentrosCustoPage() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [showNovoCCDialog, setShowNovoCCDialog] = useState(false)
  const [showDetalhesSheet, setShowDetalhesSheet] = useState(false)
  const [ccSelecionado, setCCSelecionado] = useState<(typeof centrosCustoData)[0] | null>(null)
  const [showVincularUsuarioDialog, setShowVincularUsuarioDialog] = useState(false)

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor)
  }

  const ccsFiltrados = centrosCustoData.filter((cc) => {
    if (filtroTipo !== "todos" && cc.tipo !== filtroTipo) return false
    if (filtroStatus !== "todos" && cc.status !== filtroStatus) return false
    if (
      busca &&
      !cc.nome.toLowerCase().includes(busca.toLowerCase()) &&
      !cc.codigo.toLowerCase().includes(busca.toLowerCase())
    )
      return false
    return true
  })

  const totalObras = centrosCustoData.filter((cc) => cc.tipo === "obra").length
  const obrasAtivas = centrosCustoData.filter((cc) => cc.tipo === "obra" && cc.status === "ativo").length
  const totalUsuariosVinculados = centrosCustoData.reduce((acc, cc) => acc + cc.usuarios, 0)
  const orcamentoTotal = centrosCustoData.reduce((acc, cc) => acc + cc.orcamento, 0)

  const abrirDetalhes = (cc: (typeof centrosCustoData)[0]) => {
    setCCSelecionado(cc)
    setShowDetalhesSheet(true)
  }

  const atividadeRecente = [
    { acao: "Usuario vinculado", detalhe: "Ana Paula → Edificio Aurora", tempo: "30 min", usuario: "Admin" },
    { acao: "CC criado", detalhe: "OBR-2024-003 - Hospital Central", tempo: "2h", usuario: "Admin" },
    { acao: "Gestor alterado", detalhe: "Shopping Plaza: Carlos → Roberto", tempo: "1d", usuario: "Admin" },
    { acao: "CC concluido", detalhe: "Condominio Jardins", tempo: "3d", usuario: "Sistema" },
  ]

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Centros de Custo</h1>
            <p className="text-xs text-muted-foreground">Obras e departamentos corporativos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou codigo..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNovoCCDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Novo CC
          </Button>
        </div>
      </div>

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{centrosCustoData.length}</div>
          <div className="text-xs text-muted-foreground">Total de CCs</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{totalObras}</div>
          <div className="text-xs text-muted-foreground">Obras</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">{obrasAtivas}</div>
          <div className="text-xs text-muted-foreground">Obras Ativas</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-blue-600">{totalUsuariosVinculados}</div>
          <div className="text-xs text-muted-foreground">Usuarios Vinculados</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-purple-600">
            {centrosCustoData.filter((cc) => cc.tipo === "corporativo").length}
          </div>
          <div className="text-xs text-muted-foreground">CCs Corporativos</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-lg font-bold text-amber-600">{formatarValor(orcamentoTotal)}</div>
          <div className="text-xs text-muted-foreground">Orcamento Total</div>
        </div>
      </div>

      {/* Conteudo principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tabela */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filtros */}
          <div className="p-3 border-b flex items-center gap-3">
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="obra">Obras</SelectItem>
                <SelectItem value="corporativo">Corporativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="concluido">Concluido</SelectItem>
                <SelectItem value="suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Codigo</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Gestor</TableHead>
                  <TableHead>Usuarios</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ccsFiltrados.map((cc) => (
                  <TableRow key={cc.id} className="cursor-pointer hover:bg-muted/50" onClick={() => abrirDetalhes(cc)}>
                    <TableCell>
                      {cc.tipo === "obra" ? (
                        <Building2 className="h-4 w-4 text-amber-600" />
                      ) : (
                        <FolderOpen className="h-4 w-4 text-blue-600" />
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{cc.codigo}</TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{cc.nome}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {cc.localizacao}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          cc.tipo === "obra" ? "border-amber-300 text-amber-700" : "border-blue-300 text-blue-700"
                        }
                      >
                        {cc.tipo === "obra" ? "Obra" : "Corporativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{cc.gestor}</div>
                      <div className="text-xs text-muted-foreground">{cc.gestorEmail}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{cc.usuarios}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          cc.status === "ativo"
                            ? "bg-emerald-600"
                            : cc.status === "concluido"
                              ? "bg-blue-600"
                              : "bg-gray-400"
                        }
                      >
                        {cc.status === "ativo" ? "Ativo" : cc.status === "concluido" ? "Concluido" : "Suspenso"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              abrirDetalhes(cc)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setCCSelecionado(cc)
                              setShowVincularUsuarioDialog(true)
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Vincular usuario
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
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
                ))}
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
      </div>

      {/* Cards de acao rapida */}
      <div className="border-t p-3 bg-card">
        <div className="grid grid-cols-4 gap-3">
          <button
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left"
            onClick={() => setShowNovoCCDialog(true)}
          >
            <Plus className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Novo Centro de Custo</div>
              <div className="text-xs text-muted-foreground">Criar obra ou CC</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <UserPlus className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Vincular Usuarios</div>
              <div className="text-xs text-muted-foreground">Atribuir acessos</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Relatorio de CCs</div>
              <div className="text-xs text-muted-foreground">Visao consolidada</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">CCs Inativos</div>
              <div className="text-xs text-muted-foreground">Revisar encerrados</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>

      {/* Sheet Detalhes do CC */}
      <Sheet open={showDetalhesSheet} onOpenChange={setShowDetalhesSheet}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>{ccSelecionado?.nome}</SheetTitle>
            <SheetDescription>{ccSelecionado?.codigo}</SheetDescription>
          </SheetHeader>
          {ccSelecionado && (
            <Tabs defaultValue="info" className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="info" className="flex-1">
                  Informacoes
                </TabsTrigger>
                <TabsTrigger value="usuarios" className="flex-1">
                  Usuarios
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Tipo</Label>
                    <p className="font-medium">{ccSelecionado.tipo === "obra" ? "Obra" : "Corporativo"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    <p>
                      <Badge className={ccSelecionado.status === "ativo" ? "bg-emerald-600" : "bg-blue-600"}>
                        {ccSelecionado.status}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Cliente</Label>
                    <p className="font-medium">{ccSelecionado.cliente}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Localizacao</Label>
                    <p className="font-medium">{ccSelecionado.localizacao}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Gestor</Label>
                    <p className="font-medium">{ccSelecionado.gestor}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Orcamento</Label>
                    <p className="font-medium">{formatarValor(ccSelecionado.orcamento)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Inicio</Label>
                    <p className="font-medium">{ccSelecionado.dataInicio}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Previsao Termino</Label>
                    <p className="font-medium">{ccSelecionado.previsaoTermino}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="usuarios" className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">{ccSelecionado.usuarios} usuarios vinculados</span>
                  <Button size="sm" variant="outline" onClick={() => setShowVincularUsuarioDialog(true)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Vincular
                  </Button>
                </div>
                <div className="space-y-2">
                  {usuariosDisponiveis.slice(0, 4).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="text-sm font-medium">{user.nome}</div>
                        <div className="text-xs text-muted-foreground">{user.perfil}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog Novo CC */}
      <Dialog open={showNovoCCDialog} onOpenChange={setShowNovoCCDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Centro de Custo</DialogTitle>
            <DialogDescription>Crie uma nova obra ou departamento corporativo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Tipo</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="obra">Obra</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Codigo</Label>
              <Input className="mt-1.5" placeholder="OBR-2024-XXX" />
            </div>
            <div>
              <Label>Nome</Label>
              <Input className="mt-1.5" placeholder="Nome do centro de custo" />
            </div>
            <div>
              <Label>Gestor Responsavel</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {usuariosDisponiveis.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovoCCDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowNovoCCDialog(false)}>Criar CC</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Vincular Usuario */}
      <Dialog open={showVincularUsuarioDialog} onOpenChange={setShowVincularUsuarioDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vincular Usuario</DialogTitle>
            <DialogDescription>Selecione usuarios para vincular a {ccSelecionado?.nome}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            {usuariosDisponiveis.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 border rounded hover:bg-muted">
                <Checkbox id={user.id} />
                <label htmlFor={user.id} className="flex-1 cursor-pointer">
                  <div className="text-sm font-medium">{user.nome}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.email} • {user.perfil}
                  </div>
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVincularUsuarioDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowVincularUsuarioDialog(false)}>Vincular Selecionados</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
