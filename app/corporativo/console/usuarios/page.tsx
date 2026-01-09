"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
  Unlock,
  Edit,
  Eye,
  MoreHorizontal,
  Building2,
  RefreshCw,
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Smartphone,
  Monitor,
  Globe,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  Briefcase,
  Building,
  X,
} from "lucide-react"
import Link from "next/link"

// Navegacao do Console
const consoleNavigation = [
  { name: "Visao Geral", href: "/corporativo/console", icon: LayoutDashboard },
  { name: "Usuarios", href: "/corporativo/console/usuarios", icon: Users, active: true },
  { name: "Perfis de Acesso", href: "/corporativo/console/perfis", icon: Shield },
  { name: "Permissoes", href: "/corporativo/console/permissoes", icon: Key },
  { name: "Hierarquia & Aprovacoes", href: "/corporativo/console/hierarquia", icon: Network },
  { name: "IAs & Agentes", href: "/corporativo/console/ias", icon: Bot },
  { name: "Limites & Custos", href: "/corporativo/console/limites", icon: DollarSign },
  { name: "Auditoria", href: "/corporativo/console/auditoria", icon: FileSearch },
  { name: "Suporte", href: "/corporativo/console/suporte", icon: Headphones },
  { name: "Integracoes", href: "/corporativo/console/integracoes", icon: Plug },
  { name: "Parametros", href: "/corporativo/console/parametros", icon: Settings },
]

// Mock data - Usuarios
const usuariosMock = [
  {
    id: "1",
    nome: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    telefone: "(11) 98765-4321",
    status: "ativo",
    perfis: ["Gerente de Obra", "Aprovador Nivel 2"],
    escopo: "Multiobras",
    escopoDetalhe: ["Obra Alpha", "Obra Beta", "Obra Gamma"],
    departamento: "Engenharia",
    ultimoAcesso: "09/01/2026 14:32",
    mfa: true,
    criadoEm: "15/03/2024",
    sessoesAtivas: 2,
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@empresa.com",
    telefone: "(11) 91234-5678",
    status: "ativo",
    perfis: ["Diretor Financeiro"],
    escopo: "Corporativo",
    escopoDetalhe: [],
    departamento: "Financeiro",
    ultimoAcesso: "09/01/2026 13:45",
    mfa: true,
    criadoEm: "10/01/2024",
    sessoesAtivas: 1,
  },
  {
    id: "3",
    nome: "Jose Pereira",
    email: "jose.pereira@empresa.com",
    telefone: "(21) 99876-5432",
    status: "bloqueado",
    perfis: ["Engenheiro de Campo"],
    escopo: "Obra",
    escopoDetalhe: ["Obra Delta"],
    departamento: "Engenharia",
    ultimoAcesso: "09/01/2026 11:20",
    mfa: false,
    criadoEm: "20/06/2024",
    sessoesAtivas: 0,
  },
  {
    id: "4",
    nome: "Ana Costa",
    email: "ana.costa@empresa.com",
    telefone: "(31) 98765-1234",
    status: "pendente",
    perfis: ["Analista RH"],
    escopo: "Corporativo",
    escopoDetalhe: [],
    departamento: "RH",
    ultimoAcesso: "Nunca",
    mfa: false,
    criadoEm: "08/01/2026",
    sessoesAtivas: 0,
  },
  {
    id: "5",
    nome: "Pedro Lima",
    email: "pedro.lima@empresa.com",
    telefone: "(41) 99123-4567",
    status: "ativo",
    perfis: ["Tecnico de Seguranca", "Auditor"],
    escopo: "Multiobras",
    escopoDetalhe: ["Obra Alpha", "Obra Epsilon"],
    departamento: "QSMS",
    ultimoAcesso: "09/01/2026 10:15",
    mfa: true,
    criadoEm: "05/09/2024",
    sessoesAtivas: 1,
  },
  {
    id: "6",
    nome: "Lucia Ferreira",
    email: "lucia.ferreira@empresa.com",
    telefone: "(51) 98234-5678",
    status: "ativo",
    perfis: ["Coordenador de Compras"],
    escopo: "Corporativo",
    escopoDetalhe: [],
    departamento: "Suprimentos",
    ultimoAcesso: "08/01/2026 17:45",
    mfa: true,
    criadoEm: "12/04/2024",
    sessoesAtivas: 1,
  },
  {
    id: "7",
    nome: "Roberto Alves",
    email: "roberto.alves@empresa.com",
    telefone: "(61) 99345-6789",
    status: "ativo",
    perfis: ["Mestre de Obras"],
    escopo: "Obra",
    escopoDetalhe: ["Obra Beta"],
    departamento: "Producao",
    ultimoAcesso: "09/01/2026 08:30",
    mfa: false,
    criadoEm: "28/07/2024",
    sessoesAtivas: 1,
  },
  {
    id: "8",
    nome: "Fernanda Oliveira",
    email: "fernanda.oliveira@empresa.com",
    telefone: "(71) 98456-7890",
    status: "ativo",
    perfis: ["Gerente de Contratos"],
    escopo: "Multiobras",
    escopoDetalhe: ["Obra Alpha", "Obra Beta", "Obra Gamma", "Obra Delta"],
    departamento: "Comercial",
    ultimoAcesso: "09/01/2026 14:00",
    mfa: true,
    criadoEm: "03/02/2024",
    sessoesAtivas: 3,
  },
]

// Mock data - Perfis disponiveis
const perfisDisponiveis = [
  "Super Admin",
  "Diretor Executivo",
  "Diretor Financeiro",
  "Gerente de Obra",
  "Gerente de Contratos",
  "Engenheiro de Campo",
  "Tecnico de Seguranca",
  "Analista RH",
  "Coordenador de Compras",
  "Mestre de Obras",
  "Aprovador Nivel 1",
  "Aprovador Nivel 2",
  "Aprovador Nivel 3",
  "Auditor",
  "Visualizador",
]

// Mock data - Obras disponiveis
const obrasDisponiveis = [
  { id: "1", nome: "Obra Alpha", cidade: "Sao Paulo, SP" },
  { id: "2", nome: "Obra Beta", cidade: "Rio de Janeiro, RJ" },
  { id: "3", nome: "Obra Gamma", cidade: "Belo Horizonte, MG" },
  { id: "4", nome: "Obra Delta", cidade: "Curitiba, PR" },
  { id: "5", nome: "Obra Epsilon", cidade: "Porto Alegre, RS" },
  { id: "6", nome: "Obra Zeta", cidade: "Salvador, BA" },
]

// Mock data - Auditoria do usuario
const auditoriaUsuario = [
  { id: 1, evento: "Login realizado", ip: "192.168.1.100", data: "09/01/2026 14:32", dispositivo: "Chrome/Windows" },
  {
    id: 2,
    evento: "Permissao alterada",
    detalhes: "Adicionado perfil 'Aprovador Nivel 2'",
    data: "08/01/2026 10:15",
    por: "Admin",
  },
  { id: 3, evento: "MFA ativado", data: "05/01/2026 09:00", por: "Proprio usuario" },
  { id: 4, evento: "Senha alterada", data: "02/01/2026 14:20", por: "Proprio usuario" },
  { id: 5, evento: "Login realizado", ip: "192.168.1.105", data: "02/01/2026 08:45", dispositivo: "Safari/MacOS" },
  {
    id: 6,
    evento: "Escopo alterado",
    detalhes: "Adicionado acesso a Obra Gamma",
    data: "28/12/2025 16:30",
    por: "Admin",
  },
  { id: 7, evento: "Usuario criado", data: "15/03/2024 10:00", por: "Admin" },
]

// Mock data - Sessoes ativas
const sessoesAtivas = [
  {
    id: 1,
    dispositivo: "Chrome / Windows 11",
    ip: "192.168.1.100",
    localizacao: "Sao Paulo, SP",
    inicio: "09/01/2026 08:00",
    atual: true,
  },
  {
    id: 2,
    dispositivo: "App Mobile / Android",
    ip: "189.45.67.89",
    localizacao: "Campinas, SP",
    inicio: "09/01/2026 10:30",
    atual: false,
  },
]

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [perfilFilter, setPerfilFilter] = useState("todos")
  const [escopoFilter, setEscopoFilter] = useState("todos")
  const [mfaFilter, setMfaFilter] = useState("todos")
  const [selectedUser, setSelectedUser] = useState<(typeof usuariosMock)[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [activeNav, setActiveNav] = useState("Usuarios")

  // Estado do wizard
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

  // Filtrar usuarios
  const usuariosFiltrados = usuariosMock.filter((usuario) => {
    const matchSearch =
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "todos" || usuario.status === statusFilter
    const matchPerfil = perfilFilter === "todos" || usuario.perfis.includes(perfilFilter)
    const matchEscopo = escopoFilter === "todos" || usuario.escopo.toLowerCase() === escopoFilter.toLowerCase()
    const matchMfa = mfaFilter === "todos" || (mfaFilter === "sim" ? usuario.mfa : !usuario.mfa)
    return matchSearch && matchStatus && matchPerfil && matchEscopo && matchMfa
  })

  const openUserDetails = (usuario: (typeof usuariosMock)[0]) => {
    setSelectedUser(usuario)
    setIsDrawerOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Ativo</Badge>
      case "bloqueado":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Bloqueado</Badge>
      case "pendente":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
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

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar do Console */}
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Console Administrativo</h1>
              <p className="text-xs text-muted-foreground">ERP Construcao Civil</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="px-2 space-y-1">
            {consoleNavigation.map((item) => {
              const Icon = item.icon
              const isActive = item.name === activeNav
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveNav(item.name)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Administrador</p>
              <p className="text-xs text-muted-foreground truncate">admin@empresa.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteudo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-background border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Corporativo</span>
              <Badge variant="secondary" className="text-[10px] px-1.5">
                Unico
              </Badge>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-9 h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Importar
            </Button>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => {
                resetWizard()
                setIsWizardOpen(true)
              }}
            >
              <Plus className="w-4 h-4" />
              Criar Usuario
            </Button>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Titulo */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <p className="text-muted-foreground">Gerencie usuarios, perfis e acessos do sistema</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </Button>
            </div>

            {/* Cards de resumo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{usuariosMock.length}</p>
                      <p className="text-xs text-muted-foreground">Total de Usuarios</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{usuariosMock.filter((u) => u.status === "ativo").length}</p>
                      <p className="text-xs text-muted-foreground">Ativos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {usuariosMock.filter((u) => u.status === "bloqueado").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Bloqueados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{usuariosMock.filter((u) => u.status === "pendente").length}</p>
                      <p className="text-xs text-muted-foreground">Pendentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filtros:</span>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Status</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="bloqueado">Bloqueado</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={perfilFilter} onValueChange={setPerfilFilter}>
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Perfis</SelectItem>
                      {perfisDisponiveis.map((perfil) => (
                        <SelectItem key={perfil} value={perfil}>
                          {perfil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={escopoFilter} onValueChange={setEscopoFilter}>
                    <SelectTrigger className="w-[150px] h-9">
                      <SelectValue placeholder="Escopo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Escopos</SelectItem>
                      <SelectItem value="corporativo">Corporativo</SelectItem>
                      <SelectItem value="obra">Obra</SelectItem>
                      <SelectItem value="multiobras">Multiobras</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={mfaFilter} onValueChange={setMfaFilter}>
                    <SelectTrigger className="w-[120px] h-9">
                      <SelectValue placeholder="MFA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos MFA</SelectItem>
                      <SelectItem value="sim">Com MFA</SelectItem>
                      <SelectItem value="nao">Sem MFA</SelectItem>
                    </SelectContent>
                  </Select>
                  {(statusFilter !== "todos" ||
                    perfilFilter !== "todos" ||
                    escopoFilter !== "todos" ||
                    mfaFilter !== "todos") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setStatusFilter("todos")
                        setPerfilFilter("todos")
                        setEscopoFilter("todos")
                        setMfaFilter("todos")
                      }}
                      className="text-xs"
                    >
                      Limpar filtros
                    </Button>
                  )}
                  <div className="flex-1" />
                  <span className="text-sm text-muted-foreground">
                    {usuariosFiltrados.length} usuario(s) encontrado(s)
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Usuarios */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Usuario</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[200px]">Perfis</TableHead>
                      <TableHead className="w-[120px]">Escopo</TableHead>
                      <TableHead className="w-[150px]">Ultimo Acesso</TableHead>
                      <TableHead className="w-[80px] text-center">MFA</TableHead>
                      <TableHead className="w-[100px] text-right">Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuariosFiltrados.map((usuario) => (
                      <TableRow
                        key={usuario.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => openUserDetails(usuario)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {usuario.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{usuario.nome}</p>
                              <p className="text-xs text-muted-foreground">{usuario.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(usuario.status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {usuario.perfis.slice(0, 2).map((perfil) => (
                              <Badge key={perfil} variant="outline" className="text-[10px] px-1.5">
                                {perfil}
                              </Badge>
                            ))}
                            {usuario.perfis.length > 2 && (
                              <Badge variant="secondary" className="text-[10px] px-1.5">
                                +{usuario.perfis.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px]">
                            {usuario.escopo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{usuario.ultimoAcesso}</TableCell>
                        <TableCell className="text-center">
                          {usuario.mfa ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openUserDetails(usuario)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {usuario.status === "bloqueado" ? (
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Unlock className="w-4 h-4 mr-2" />
                                  Desbloquear
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600">
                                  <Lock className="w-4 h-4 mr-2" />
                                  Bloquear
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset senha
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <FileSearch className="w-4 h-4 mr-2" />
                                Ver auditoria
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Drawer Detalhes do Usuario */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[500px] sm:max-w-[500px] p-0">
          {selectedUser && (
            <>
              <SheetHeader className="p-6 pb-4 border-b">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {selectedUser.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <SheetTitle className="text-lg">{selectedUser.nome}</SheetTitle>
                    <SheetDescription>{selectedUser.email}</SheetDescription>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(selectedUser.status)}
                      {selectedUser.mfa && (
                        <Badge variant="outline" className="text-[10px] gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          MFA
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="dados" className="flex-1">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="dados"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                  >
                    Dados
                  </TabsTrigger>
                  <TabsTrigger
                    value="perfis"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                  >
                    Perfis
                  </TabsTrigger>
                  <TabsTrigger
                    value="escopo"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                  >
                    Escopo
                  </TabsTrigger>
                  <TabsTrigger
                    value="seguranca"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                  >
                    Seguranca
                  </TabsTrigger>
                  <TabsTrigger
                    value="auditoria"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                  >
                    Auditoria
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-220px)]">
                  <TabsContent value="dados" className="p-6 space-y-4 mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Nome completo</p>
                          <p className="text-sm font-medium">{selectedUser.nome}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium">{selectedUser.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Telefone</p>
                          <p className="text-sm font-medium">{selectedUser.telefone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Departamento</p>
                          <p className="text-sm font-medium">{selectedUser.departamento}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Criado em</p>
                          <p className="text-sm font-medium">{selectedUser.criadoEm}</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                        <Edit className="w-4 h-4" />
                        Editar dados
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="perfis" className="p-6 space-y-4 mt-0">
                    <div>
                      <p className="text-sm font-medium mb-3">Perfis atribuidos</p>
                      <div className="space-y-2">
                        {selectedUser.perfis.map((perfil) => (
                          <div key={perfil} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-primary" />
                              <span className="text-sm">{perfil}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-3">Adicionar perfil</p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um perfil..." />
                        </SelectTrigger>
                        <SelectContent>
                          {perfisDisponiveis
                            .filter((p) => !selectedUser.perfis.includes(p))
                            .map((perfil) => (
                              <SelectItem key={perfil} value={perfil}>
                                {perfil}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="escopo" className="p-6 space-y-4 mt-0">
                    <div>
                      <p className="text-sm font-medium mb-3">Tipo de escopo</p>
                      <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <Building className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{selectedUser.escopo}</span>
                      </div>
                    </div>
                    {selectedUser.escopoDetalhe.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium mb-3">Obras com acesso</p>
                          <div className="space-y-2">
                            {selectedUser.escopoDetalhe.map((obra) => (
                              <div key={obra} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{obra}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-3">Adicionar obra</p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma obra..." />
                        </SelectTrigger>
                        <SelectContent>
                          {obrasDisponiveis
                            .filter((o) => !selectedUser.escopoDetalhe.includes(o.nome))
                            .map((obra) => (
                              <SelectItem key={obra.id} value={obra.id}>
                                {obra.nome} - {obra.cidade}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="seguranca" className="p-6 space-y-4 mt-0">
                    <div>
                      <p className="text-sm font-medium mb-3">Autenticacao</p>
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg ${selectedUser.mfa ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck
                            className={`w-4 h-4 ${selectedUser.mfa ? "text-emerald-600" : "text-amber-600"}`}
                          />
                          <div>
                            <p className="text-sm font-medium">MFA {selectedUser.mfa ? "Ativado" : "Desativado"}</p>
                            <p className="text-xs text-muted-foreground">Autenticacao em dois fatores</p>
                          </div>
                        </div>
                        <Button variant={selectedUser.mfa ? "outline" : "default"} size="sm">
                          {selectedUser.mfa ? "Desativar" : "Ativar"}
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium">Sessoes ativas ({selectedUser.sessoesAtivas})</p>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          Revogar todas
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {sessoesAtivas.map((sessao) => (
                          <div key={sessao.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {sessao.dispositivo.includes("Mobile") ? (
                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Monitor className="w-4 h-4 text-muted-foreground" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm">{sessao.dispositivo}</p>
                                  {sessao.atual && (
                                    <Badge className="text-[10px] bg-emerald-100 text-emerald-700">Atual</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Globe className="w-3 h-3" />
                                  <span>{sessao.ip}</span>
                                  <span>•</span>
                                  <span>{sessao.localizacao}</span>
                                </div>
                              </div>
                            </div>
                            {!sessao.atual && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                        <RotateCcw className="w-4 h-4" />
                        Reset senha
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        <Lock className="w-4 h-4" />
                        Bloquear
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="auditoria" className="p-6 space-y-4 mt-0">
                    <div className="space-y-3">
                      {auditoriaUsuario.map((evento) => (
                        <div key={evento.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                            <FileSearch className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{evento.evento}</p>
                            {evento.detalhes && <p className="text-xs text-muted-foreground">{evento.detalhes}</p>}
                            {evento.ip && (
                              <p className="text-xs text-muted-foreground">
                                IP: {evento.ip} • {evento.dispositivo}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{evento.data}</span>
                              {evento.por && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">Por: {evento.por}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <FileSearch className="w-4 h-4" />
                      Ver auditoria completa
                    </Button>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog Wizard Criar Usuario */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuario</DialogTitle>
            <DialogDescription>
              Passo {wizardStep} de 4 -{" "}
              {wizardStep === 1
                ? "Dados do usuario"
                : wizardStep === 2
                  ? "Perfis de acesso"
                  : wizardStep === 3
                    ? "Escopo"
                    : "Revisao"}
            </DialogDescription>
          </DialogHeader>

          {/* Progress */}
          <div className="flex items-center gap-2 py-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step < wizardStep
                      ? "bg-primary text-primary-foreground"
                      : step === wizardStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < wizardStep ? <CheckCircle2 className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${step < wizardStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 - Dados */}
          {wizardStep === 1 && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Maria Silva"
                  value={novoUsuario.nome}
                  onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email corporativo *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: maria.silva@empresa.com"
                  value={novoUsuario.email}
                  onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="Ex: (11) 98765-4321"
                  value={novoUsuario.telefone}
                  onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento *</Label>
                <Select
                  value={novoUsuario.departamento}
                  onValueChange={(v) => setNovoUsuario({ ...novoUsuario, departamento: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engenharia">Engenharia</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                    <SelectItem value="Suprimentos">Suprimentos</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="QSMS">QSMS</SelectItem>
                    <SelectItem value="Producao">Producao</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2 - Perfis */}
          {wizardStep === 2 && (
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">Selecione um ou mais perfis de acesso para o usuario</p>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {perfisDisponiveis.map((perfil) => (
                    <div key={perfil} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Checkbox
                        id={perfil}
                        checked={novoUsuario.perfis.includes(perfil)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNovoUsuario({ ...novoUsuario, perfis: [...novoUsuario.perfis, perfil] })
                          } else {
                            setNovoUsuario({ ...novoUsuario, perfis: novoUsuario.perfis.filter((p) => p !== perfil) })
                          }
                        }}
                      />
                      <Label htmlFor={perfil} className="flex-1 cursor-pointer">
                        {perfil}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {novoUsuario.perfis.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Selecionados:</span>
                  {novoUsuario.perfis.map((perfil) => (
                    <Badge key={perfil} variant="secondary" className="gap-1">
                      {perfil}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          setNovoUsuario({ ...novoUsuario, perfis: novoUsuario.perfis.filter((p) => p !== perfil) })
                        }
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3 - Escopo */}
          {wizardStep === 3 && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de escopo</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "corporativo", label: "Corporativo", desc: "Acesso ao modulo corporativo" },
                    { value: "obra", label: "Obra", desc: "Acesso a obra especifica" },
                    { value: "multiobras", label: "Multiobras", desc: "Acesso a multiplas obras" },
                  ].map((opcao) => (
                    <div
                      key={opcao.value}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        novoUsuario.escopoTipo === opcao.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setNovoUsuario({ ...novoUsuario, escopoTipo: opcao.value, obras: [] })}
                    >
                      <p className="text-sm font-medium">{opcao.label}</p>
                      <p className="text-xs text-muted-foreground">{opcao.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {(novoUsuario.escopoTipo === "obra" || novoUsuario.escopoTipo === "multiobras") && (
                <div className="space-y-2">
                  <Label>Selecione as obras</Label>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-2">
                      {obrasDisponiveis.map((obra) => (
                        <div key={obra.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Checkbox
                            id={obra.id}
                            checked={novoUsuario.obras.includes(obra.id)}
                            disabled={
                              novoUsuario.escopoTipo === "obra" &&
                              novoUsuario.obras.length > 0 &&
                              !novoUsuario.obras.includes(obra.id)
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                if (novoUsuario.escopoTipo === "obra") {
                                  setNovoUsuario({ ...novoUsuario, obras: [obra.id] })
                                } else {
                                  setNovoUsuario({ ...novoUsuario, obras: [...novoUsuario.obras, obra.id] })
                                }
                              } else {
                                setNovoUsuario({
                                  ...novoUsuario,
                                  obras: novoUsuario.obras.filter((o) => o !== obra.id),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={obra.id} className="flex-1 cursor-pointer">
                            <p className="text-sm">{obra.nome}</p>
                            <p className="text-xs text-muted-foreground">{obra.cidade}</p>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
              <Separator />
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Checkbox
                  id="mfa"
                  checked={novoUsuario.mfaObrigatorio}
                  onCheckedChange={(checked) => setNovoUsuario({ ...novoUsuario, mfaObrigatorio: !!checked })}
                />
                <Label htmlFor="mfa" className="flex-1 cursor-pointer">
                  <p className="text-sm font-medium">MFA obrigatorio</p>
                  <p className="text-xs text-muted-foreground">
                    Exigir autenticacao em dois fatores no primeiro acesso
                  </p>
                </Label>
              </div>
            </div>
          )}

          {/* Step 4 - Revisao */}
          {wizardStep === 4 && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nome:</span>
                  <span className="text-sm font-medium">{novoUsuario.nome || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm font-medium">{novoUsuario.email || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Telefone:</span>
                  <span className="text-sm font-medium">{novoUsuario.telefone || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Departamento:</span>
                  <span className="text-sm font-medium">{novoUsuario.departamento || "-"}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-sm text-muted-foreground">Perfis:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {novoUsuario.perfis.length > 0 ? (
                      novoUsuario.perfis.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">
                          {p}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">Nenhum selecionado</span>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Escopo:</span>
                  <Badge variant="outline">{novoUsuario.escopoTipo}</Badge>
                </div>
                {novoUsuario.obras.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Obras:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {novoUsuario.obras.map((obraId) => {
                        const obra = obrasDisponiveis.find((o) => o.id === obraId)
                        return obra ? (
                          <Badge key={obraId} variant="secondary" className="text-xs">
                            {obra.nome}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">MFA obrigatorio:</span>
                  <Badge variant={novoUsuario.mfaObrigatorio ? "default" : "secondary"}>
                    {novoUsuario.mfaObrigatorio ? "Sim" : "Nao"}
                  </Badge>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Atencao</p>
                  <p className="text-xs text-amber-700">
                    O usuario recebera um email para definir a senha e ativar a conta.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {wizardStep > 1 && (
              <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            {wizardStep < 4 ? (
              <Button onClick={() => setWizardStep(wizardStep + 1)} className="gap-2">
                Proximo
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsWizardOpen(false)
                  resetWizard()
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Criar Usuario
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
