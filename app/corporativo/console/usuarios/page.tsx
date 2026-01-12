"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  Users,
  Shield,
  Key,
  Network,
  Bot,
  DollarSign,
  FileSearch,
  Headphones,
  Plug,
  Settings,
  LayoutDashboard,
  Search,
  Plus,
  Lock,
  Edit,
  Eye,
  MoreHorizontal,
  Building2,
  Download,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Mail,
  UserPlus,
  ShieldCheck,
  AlertTriangle,
  Clock,
  XCircle,
  Smartphone,
  Send,
} from "lucide-react"

// Mock data - Usuarios
const usuariosMock = [
  {
    id: "1",
    nome: "Ana Paula",
    email: "ana.dp@empresa.com",
    perfil: "DP - Cadastro de Funcionario",
    departamento: "RH",
    tipo: "Interno",
    status: "Ativo",
    mfa: "Ativo",
    ultimoAcesso: "09/01/2026 14:32",
  },
  {
    id: "2",
    nome: "Marcos Pereira",
    email: "marcos.suprimentos@empresa.com",
    perfil: "Suprimentos - Pedido",
    departamento: "Suprimentos",
    tipo: "Interno",
    status: "Ativo",
    mfa: "Ativo",
    ultimoAcesso: "09/01/2026 13:45",
  },
  {
    id: "3",
    nome: "Joao Silva",
    email: "joao.comercial@empresa.com",
    perfil: "Comercial - Governante",
    departamento: "Comercial",
    tipo: "Interno",
    status: "Ativo",
    mfa: "Ativo",
    ultimoAcesso: "09/01/2026 11:20",
  },
  {
    id: "4",
    nome: "Maria Souza",
    email: "maria.suprimentos@empresa.com",
    perfil: "Suprimentos - Governante",
    departamento: "Suprimentos",
    tipo: "Interno",
    status: "Ativo",
    mfa: "Ativo",
    ultimoAcesso: "09/01/2026 10:15",
  },
  {
    id: "5",
    nome: "Carlos Lima",
    email: "carlos.rh@empresa.com",
    perfil: "RH - Governante",
    departamento: "RH",
    tipo: "Interno",
    status: "Inativo",
    mfa: "Ativo",
    ultimoAcesso: "08/01/2026 17:30",
  },
  {
    id: "6",
    nome: "Roberto Engenheiro",
    email: "roberto@terceiro.com",
    perfil: "Engenheiro - Producao",
    departamento: "Producao",
    tipo: "Externo",
    status: "Pendente",
    mfa: "Inativo",
    ultimoAcesso: "-",
  },
  {
    id: "7",
    nome: "Patricia Fiscal",
    email: "patricia@consultoria.com",
    perfil: "Fiscal - Leitura",
    departamento: "Auditoria",
    tipo: "Externo",
    status: "Ativo",
    mfa: "Ativo",
    ultimoAcesso: "07/01/2026 09:00",
  },
  {
    id: "8",
    nome: "Fernando Costa",
    email: "fernando@empresa.com",
    perfil: "Financeiro - Pagamentos",
    departamento: "Financeiro",
    tipo: "Interno",
    status: "Bloqueado",
    mfa: "Ativo",
    ultimoAcesso: "05/01/2026 16:45",
  },
]

// Mock data - Atividades
const atividadesMock = [
  { id: 1, titulo: "Usuario criado", descricao: "Ana Paula (ana.dp@empresa.com)", autor: "Admin", data: "09/01 14:32" },
  {
    id: 2,
    titulo: "Perfil alterado",
    descricao: "Gerente de Obra - novas permissoes",
    autor: "Admin",
    data: "09/01 13:45",
  },
  {
    id: 3,
    titulo: "Usuario bloqueado",
    descricao: "Fernando Costa - tentativas de login",
    autor: "Sistema",
    data: "09/01 11:20",
    alerta: true,
  },
  {
    id: 4,
    titulo: "Alcada aprovada",
    descricao: "R$ 500.000 para Carlos Silva",
    autor: "Diretor",
    data: "09/01 10:15",
  },
  {
    id: 5,
    titulo: "Convite enviado",
    descricao: "roberto@terceiro.com (Externo)",
    autor: "Admin",
    data: "08/01 17:30",
  },
]

// Perfis disponiveis
const perfisDisponiveis = [
  "Super Admin",
  "Diretor Executivo",
  "Gerente de Obra",
  "Gerente de Contratos",
  "Engenheiro de Campo",
  "Analista RH",
  "Coordenador de Compras",
]

// Obras disponiveis
const obrasDisponiveis = [
  { id: "1", nome: "Obra Alpha", cidade: "Sao Paulo, SP" },
  { id: "2", nome: "Obra Beta", cidade: "Rio de Janeiro, RJ" },
  { id: "3", nome: "Obra Gamma", cidade: "Belo Horizonte, MG" },
]

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof usuariosMock)[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    departamento: "",
    perfis: [] as string[],
    escopoTipo: "corporativo",
    obras: [] as string[],
    mfaObrigatorio: true,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{status}</Badge>
      case "Bloqueado":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">{status}</Badge>
      case "Pendente":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">{status}</Badge>
      case "Inativo":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">{status}</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getTipoBadge = (tipo: string) => {
    return tipo === "Interno" ? (
      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
        {tipo}
      </Badge>
    ) : (
      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
        {tipo}
      </Badge>
    )
  }

  const getMfaBadge = (mfa: string) => {
    return mfa === "Ativo" ? (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{mfa}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">{mfa}</Badge>
    )
  }

  const resetWizard = () => {
    setWizardStep(1)
    setNovoUsuario({
      nome: "",
      email: "",
      telefone: "",
      departamento: "",
      perfis: [],
      escopoTipo: "corporativo",
      obras: [],
      mfaObrigatorio: true,
    })
  }

  const usuariosFiltrados = usuariosMock.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ConsoleNavbar />
      </div>
        <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1 text-xs">
              <Building2 className="w-3 h-3" />
              Corporativo
            </Badge>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios, perfis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 pl-8 h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => {
                resetWizard()
                setIsWizardOpen(true)
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              Novo Usuario
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Alert Bar */}
        <div className="h-9 bg-muted/30 rounded border flex items-center gap-4 px-4 overflow-x-auto mb-4">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="text-muted-foreground">5 tentativas de login falhas</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">IP 192.168.1.100 - Usuario: fernando@empresa.com</span>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-red-600">
              Bloquear IP
            </Button>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-muted-foreground">3 usuarios sem MFA</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Usuarios com acesso a dados sensiveis sem autenticacao dupla</span>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-amber-600">
              Notificar
            </Button>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-xs text-emerald-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <Clock className="w-3.5 h-3.5" />
            <span>12 convites pendentes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Content */}
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Metrics */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">347</p>
                    <p className="text-[10px] text-muted-foreground">Usuarios Ativos</p>
                  </div>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-600">8</p>
                    <p className="text-[10px] text-muted-foreground">Bloqueados</p>
                  </div>
                  <XCircle className="w-5 h-5 text-red-200" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-amber-600">12</p>
                    <p className="text-[10px] text-muted-foreground">Pendentes</p>
                  </div>
                  <Clock className="w-5 h-5 text-amber-200" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-[10px] text-muted-foreground">Perfis</p>
                  </div>
                  <Shield className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-[10px] text-muted-foreground">Permissoes</p>
                  </div>
                  <Key className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-[10px] text-muted-foreground">Aprovacoes</p>
                  </div>
                  <Network className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            </div>

            {/* Main Grid: Table + Activity */}
            <div className="grid grid-cols-[1fr_280px] gap-4">
              {/* Table Section */}
              <Card>
                <div className="p-3 border-b flex items-center justify-between">
                  <h3 className="font-medium text-sm">Usuarios Recentes</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Filter className="w-3 h-3" />
                      Filtros
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <ArrowUpDown className="w-3 h-3" />
                      Ordenar
                    </Button>
                    <Button variant="link" size="sm" className="h-7 text-xs">
                      Ver todos
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-10">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="text-xs">Usuario</TableHead>
                      <TableHead className="text-xs">Perfil</TableHead>
                      <TableHead className="text-xs">Departamento</TableHead>
                      <TableHead className="text-xs">Tipo</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">MFA</TableHead>
                      <TableHead className="text-xs">Ultimo Acesso</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuariosFiltrados.map((usuario) => (
                      <TableRow
                        key={usuario.id}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedUser(usuario)
                          setIsDrawerOpen(true)
                        }}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7">
                              <AvatarFallback className="text-[10px] bg-muted">
                                {usuario.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-medium">{usuario.nome}</p>
                              <p className="text-[10px] text-muted-foreground">{usuario.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{usuario.perfil}</TableCell>
                        <TableCell className="text-xs">{usuario.departamento}</TableCell>
                        <TableCell>{getTipoBadge(usuario.tipo)}</TableCell>
                        <TableCell>{getStatusBadge(usuario.status)}</TableCell>
                        <TableCell>{getMfaBadge(usuario.mfa)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{usuario.ultimoAcesso}</TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-7 h-7">
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(usuario)
                                  setIsDrawerOpen(true)
                                }}
                              >
                                <Eye className="w-3.5 h-3.5 mr-2" />
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-3.5 h-3.5 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Lock className="w-3.5 h-3.5 mr-2" />
                                Bloquear
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <div className="p-3 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium text-sm">Atividade</h3>
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Ver mais
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="p-3 space-y-3">
                    {atividadesMock.map((atividade) => (
                      <div
                        key={atividade.id}
                        className={`p-2 rounded border-l-2 ${atividade.alerta ? "border-l-amber-500 bg-amber-50" : "border-l-muted bg-muted/30"}`}
                      >
                        <p className="text-xs font-medium">{atividade.titulo}</p>
                        <p className="text-[10px] text-muted-foreground">{atividade.descricao}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {atividade.autor} · {atividade.data}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-4 gap-3">
              <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Gerenciar Usuarios</p>
                      <p className="text-[10px] text-muted-foreground">Cadastro, edicao e remocao</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
              <Link href="/corporativo/console/perfis">
                <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Perfis & Permissoes</p>
                        <p className="text-[10px] text-muted-foreground">Matriz de acesso granular</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Card>
              </Link>
              <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Network className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Alcadas & Aprovacoes</p>
                      <p className="text-[10px] text-muted-foreground">Regras por valor e tipo</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSearch className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Auditoria</p>
                      <p className="text-[10px] text-muted-foreground">Log completo de acoes</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* User Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[480px] sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedUser?.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedUser?.nome}</p>
                <p className="text-sm text-muted-foreground font-normal">{selectedUser?.email}</p>
              </div>
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="dados" className="mt-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dados" className="text-xs">
                Dados
              </TabsTrigger>
              <TabsTrigger value="perfis" className="text-xs">
                Perfis
              </TabsTrigger>
              <TabsTrigger value="escopo" className="text-xs">
                Escopo
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="text-xs">
                Seguranca
              </TabsTrigger>
              <TabsTrigger value="auditoria" className="text-xs">
                Auditoria
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs">Nome completo</Label>
                  <Input value={selectedUser?.nome || ""} readOnly className="h-9 text-sm" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Email</Label>
                  <Input value={selectedUser?.email || ""} readOnly className="h-9 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs">Departamento</Label>
                    <Input value={selectedUser?.departamento || ""} readOnly className="h-9 text-sm" />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs">Status</Label>
                    <div className="flex items-center h-9">{selectedUser && getStatusBadge(selectedUser.status)}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="perfis" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-xs">Perfis atribuidos</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedUser?.perfil}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Plus className="w-3.5 h-3.5 mr-2" />
                Adicionar Perfil
              </Button>
            </TabsContent>

            <TabsContent value="escopo" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-xs">Tipo de acesso</Label>
                <div className="flex items-center gap-2">
                  {selectedUser && getTipoBadge(selectedUser.tipo)}
                  <span className="text-sm text-muted-foreground">
                    {selectedUser?.tipo === "Interno" ? "Dominio @empresa.com" : "Dominio externo"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Obras com acesso</Label>
                <div className="text-sm text-muted-foreground">
                  {selectedUser?.departamento === "Producao" ? "Obra Alpha, Obra Beta" : "Todas (Corporativo)"}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seguranca" className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Autenticacao MFA</p>
                    <p className="text-xs text-muted-foreground">Verificacao em duas etapas</p>
                  </div>
                </div>
                {selectedUser && getMfaBadge(selectedUser.mfa)}
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Sessoes ativas</Label>
                <div className="p-3 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Chrome / Windows 11</div>
                    <Badge variant="outline" className="text-xs">
                      Atual
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">192.168.1.100 · Sao Paulo, SP</div>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="w-full">
                Revogar todas as sessoes
              </Button>
            </TabsContent>

            <TabsContent value="auditoria" className="space-y-4 mt-4">
              <div className="space-y-2">
                {[
                  { evento: "Login realizado", data: "09/01/2026 14:32", ip: "192.168.1.100" },
                  { evento: "Perfil alterado", data: "08/01/2026 10:15", por: "Admin" },
                  { evento: "MFA ativado", data: "05/01/2026 09:00", por: "Usuario" },
                ].map((log, i) => (
                  <div key={i} className="p-2 border rounded text-xs">
                    <p className="font-medium">{log.evento}</p>
                    <p className="text-muted-foreground">
                      {log.data} {log.ip ? `· ${log.ip}` : ""} {log.por ? `· ${log.por}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* Create User Wizard */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuario</DialogTitle>
            <DialogDescription>
              Passo {wizardStep} de 4 -{" "}
              {wizardStep === 1
                ? "Dados basicos"
                : wizardStep === 2
                  ? "Perfis"
                  : wizardStep === 3
                    ? "Escopo"
                    : "Revisao"}
            </DialogDescription>
          </DialogHeader>

          {wizardStep === 1 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Nome completo</Label>
                <Input
                  value={novoUsuario.nome}
                  onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                  placeholder="Digite o nome completo"
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={novoUsuario.email}
                  onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                  placeholder="usuario@empresa.com"
                />
                <p className="text-xs text-muted-foreground">
                  Emails @empresa.com = acesso direto. Outros = verificacao dupla.
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Departamento</Label>
                <Select
                  value={novoUsuario.departamento}
                  onValueChange={(v) => setNovoUsuario({ ...novoUsuario, departamento: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="suprimentos">Suprimentos</SelectItem>
                    <SelectItem value="producao">Producao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4">
              <Label>Selecione os perfis de acesso</Label>
              <div className="grid gap-2 max-h-60 overflow-auto">
                {perfisDisponiveis.map((perfil) => (
                  <div key={perfil} className="flex items-center space-x-2 p-2 border rounded">
                    <Checkbox
                      checked={novoUsuario.perfis.includes(perfil)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNovoUsuario({ ...novoUsuario, perfis: [...novoUsuario.perfis, perfil] })
                        } else {
                          setNovoUsuario({ ...novoUsuario, perfis: novoUsuario.perfis.filter((p) => p !== perfil) })
                        }
                      }}
                    />
                    <Label className="text-sm cursor-pointer flex-1">{perfil}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de escopo</Label>
                <Select
                  value={novoUsuario.escopoTipo}
                  onValueChange={(v) => setNovoUsuario({ ...novoUsuario, escopoTipo: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporativo">Corporativo (todas as obras)</SelectItem>
                    <SelectItem value="obra">Obra especifica</SelectItem>
                    <SelectItem value="multiobras">Multiobras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {novoUsuario.escopoTipo !== "corporativo" && (
                <div className="space-y-2">
                  <Label>Selecione as obras</Label>
                  <div className="grid gap-2">
                    {obrasDisponiveis.map((obra) => (
                      <div key={obra.id} className="flex items-center space-x-2 p-2 border rounded">
                        <Checkbox
                          checked={novoUsuario.obras.includes(obra.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNovoUsuario({ ...novoUsuario, obras: [...novoUsuario.obras, obra.id] })
                            } else {
                              setNovoUsuario({ ...novoUsuario, obras: novoUsuario.obras.filter((o) => o !== obra.id) })
                            }
                          }}
                        />
                        <div>
                          <Label className="text-sm cursor-pointer">{obra.nome}</Label>
                          <p className="text-xs text-muted-foreground">{obra.cidade}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {wizardStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome:</span>
                  <span className="text-sm font-medium">{novoUsuario.nome || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm font-medium">{novoUsuario.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Departamento:</span>
                  <span className="text-sm font-medium">{novoUsuario.departamento || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Perfis:</span>
                  <span className="text-sm font-medium">{novoUsuario.perfis.length} selecionado(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Escopo:</span>
                  <span className="text-sm font-medium">{novoUsuario.escopoTipo}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded bg-blue-50 text-blue-800">
                <Send className="w-4 h-4" />
                <p className="text-sm">
                  {novoUsuario.email?.includes("@empresa.com")
                    ? "Usuario recebera email com link de acesso direto."
                    : "Usuario externo recebera email com codigo de verificacao."}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {wizardStep > 1 && (
              <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)}>
                Voltar
              </Button>
            )}
            {wizardStep < 4 ? (
              <Button onClick={() => setWizardStep(wizardStep + 1)}>Proximo</Button>
            ) : (
              <Button
                onClick={() => {
                  setIsWizardOpen(false)
                  resetWizard()
                }}
              >
                Criar Usuario
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
