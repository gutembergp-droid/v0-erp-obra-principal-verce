"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  Shield,
  Key,
  Search,
  Plus,
  AlertTriangle,
  Clock,
  Lock,
  Unlock,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Download,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  Activity,
  ChevronRight,
  FileSearch,
  Network,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConsoleNavbar } from "./_components/console-navbar"

// Mock data - Usuarios recentes
const usuariosRecentes = [
  {
    id: 1,
    nome: "Ana Paula",
    email: "ana.dp@empresa.com",
    perfil: "DP - Cadastro de Funcionario",
    departamento: "RH",
    status: "ativo",
    mfa: true,
    tipo: "interno",
    ultimoAcesso: "09/01/2026 14:32",
  },
  {
    id: 2,
    nome: "Marcos Pereira",
    email: "marcos.suprimentos@empresa.com",
    perfil: "Suprimentos - Pedido",
    departamento: "Suprimentos",
    status: "ativo",
    mfa: true,
    tipo: "interno",
    ultimoAcesso: "09/01/2026 13:45",
  },
  {
    id: 3,
    nome: "Joao Silva",
    email: "joao.comercial@empresa.com",
    perfil: "Comercial - Governante",
    departamento: "Comercial",
    status: "ativo",
    mfa: true,
    tipo: "interno",
    ultimoAcesso: "09/01/2026 11:20",
  },
  {
    id: 4,
    nome: "Maria Souza",
    email: "maria.suprimentos@empresa.com",
    perfil: "Suprimentos - Governante",
    departamento: "Suprimentos",
    status: "ativo",
    mfa: true,
    tipo: "interno",
    ultimoAcesso: "09/01/2026 10:15",
  },
  {
    id: 5,
    nome: "Carlos Lima",
    email: "carlos.rh@empresa.com",
    perfil: "RH - Governante",
    departamento: "RH",
    status: "ativo",
    mfa: false,
    tipo: "interno",
    ultimoAcesso: "08/01/2026 17:30",
  },
  {
    id: 6,
    nome: "Roberto Engenheiro",
    email: "roberto@terceiro.com",
    perfil: "Engenheiro - Producao",
    departamento: "Producao",
    status: "pendente",
    mfa: false,
    tipo: "externo",
    ultimoAcesso: "-",
  },
  {
    id: 7,
    nome: "Patricia Fiscal",
    email: "patricia@consultoria.com",
    perfil: "Fiscal - Leitura",
    departamento: "Auditoria",
    status: "ativo",
    mfa: true,
    tipo: "externo",
    ultimoAcesso: "07/01/2026 09:00",
  },
  {
    id: 8,
    nome: "Fernando Costa",
    email: "fernando@empresa.com",
    perfil: "Financeiro - Pagamentos",
    departamento: "Financeiro",
    status: "bloqueado",
    mfa: true,
    tipo: "interno",
    ultimoAcesso: "05/01/2026 16:45",
  },
]

// Mock data - Alertas
const alertas = [
  {
    id: 1,
    tipo: "critico",
    titulo: "5 tentativas de login falhas",
    descricao: "IP 192.168.1.100 - Usuario: fernando@empresa.com",
    acao: "Bloquear IP",
  },
  {
    id: 2,
    tipo: "atencao",
    titulo: "3 usuarios sem MFA",
    descricao: "Usuarios com acesso a dados sensiveis sem autenticacao dupla",
    acao: "Notificar",
  },
  {
    id: 3,
    tipo: "info",
    titulo: "12 convites pendentes",
    descricao: "Usuarios externos aguardando ativacao ha mais de 7 dias",
    acao: "Reenviar",
  },
]

// Mock data - Atividade
const atividadeRecente = [
  { id: 1, acao: "Usuario criado", detalhes: "Ana Paula (ana.dp@empresa.com)", usuario: "Admin", data: "09/01 14:32" },
  {
    id: 2,
    acao: "Perfil alterado",
    detalhes: "Gerente de Obra - novas permissoes",
    usuario: "Admin",
    data: "09/01 13:45",
  },
  {
    id: 3,
    acao: "Usuario bloqueado",
    detalhes: "Fernando Costa - tentativas de login",
    usuario: "Sistema",
    data: "09/01 11:20",
  },
  { id: 4, acao: "Alcada aprovada", detalhes: "R$ 500.000 para Carlos Silva", usuario: "Diretor", data: "09/01 10:15" },
  { id: 5, acao: "Convite enviado", detalhes: "roberto@terceiro.com (Externo)", usuario: "Admin", data: "08/01 17:30" },
]

export default function ConsolePage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleAllUsers = () => {
    setSelectedUsers((prev) => (prev.length === usuariosRecentes.length ? [] : usuariosRecentes.map((u) => u.id)))
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <ConsoleNavbar />
      </div>

      {/* Conteúdo com moldura */}
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
          {/* Busca */}
          <div className="mb-4 flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios, perfis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
                <Plus className="w-3.5 h-3.5" />
                Novo Usuario
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
                <Download className="w-3.5 h-3.5" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Alertas - Barra superior */}
            {alertas.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {alertas.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap",
                      alerta.tipo === "critico"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : alerta.tipo === "atencao"
                          ? "bg-amber-50 border-amber-200 text-amber-700"
                          : "bg-blue-50 border-blue-200 text-blue-700",
                    )}
                  >
                    {alerta.tipo === "critico" ? (
                      <ShieldAlert className="w-3.5 h-3.5" />
                    ) : alerta.tipo === "atencao" ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    <span className="font-medium">{alerta.titulo}</span>
                    <span className="text-muted-foreground">-</span>
                    <span>{alerta.descricao}</span>
                    <Button variant="ghost" size="sm" className="h-5 px-2 text-[10px] ml-2">
                      {alerta.acao}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Metricas compactas */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">347</p>
                    <p className="text-[10px] text-muted-foreground">Usuarios Ativos</p>
                  </div>
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-[10px] text-muted-foreground">Bloqueados</p>
                  </div>
                  <UserX className="w-5 h-5 text-red-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-[10px] text-muted-foreground">Pendentes</p>
                  </div>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-[10px] text-muted-foreground">Perfis</p>
                  </div>
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-[10px] text-muted-foreground">Permissoes</p>
                  </div>
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-[10px] text-muted-foreground">Aprovacoes</p>
                  </div>
                  <Network className="w-5 h-5 text-cyan-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Tabela de Usuarios - Principal */}
              <Card className="lg:col-span-3">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Usuarios Recentes</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                        <Filter className="w-3 h-3" />
                        Filtros
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                        <ArrowUpDown className="w-3 h-3" />
                        Ordenar
                      </Button>
                      <Link href="/corporativo/console/usuarios">
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                          Ver todos
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-8 pl-4">
                          <Checkbox
                            checked={selectedUsers.length === usuariosRecentes.length}
                            onCheckedChange={toggleAllUsers}
                          />
                        </TableHead>
                        <TableHead className="text-xs">Usuario</TableHead>
                        <TableHead className="text-xs">Perfil</TableHead>
                        <TableHead className="text-xs">Departamento</TableHead>
                        <TableHead className="text-xs">Tipo</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">MFA</TableHead>
                        <TableHead className="text-xs">Ultimo Acesso</TableHead>
                        <TableHead className="w-8"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuariosRecentes.map((usuario) => (
                        <TableRow key={usuario.id} className="text-xs">
                          <TableCell className="pl-4">
                            <Checkbox
                              checked={selectedUsers.includes(usuario.id)}
                              onCheckedChange={() => toggleUserSelection(usuario.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-[10px] bg-muted">
                                  {usuario.nome
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{usuario.nome}</p>
                                <p className="text-[10px] text-muted-foreground">{usuario.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{usuario.perfil}</TableCell>
                          <TableCell>{usuario.departamento}</TableCell>
                          <TableCell>
                            <Badge
                              variant={usuario.tipo === "interno" ? "secondary" : "outline"}
                              className="text-[10px]"
                            >
                              {usuario.tipo === "interno" ? "Interno" : "Externo"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                usuario.status === "ativo"
                                  ? "default"
                                  : usuario.status === "pendente"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="text-[10px]"
                            >
                              {usuario.status === "ativo"
                                ? "Ativo"
                                : usuario.status === "pendente"
                                  ? "Pendente"
                                  : "Bloqueado"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {usuario.mfa ? (
                              <Badge
                                variant="outline"
                                className="text-[10px] text-emerald-600 border-emerald-200 bg-emerald-50"
                              >
                                Ativo
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-[10px] text-amber-600 border-amber-200 bg-amber-50"
                              >
                                Inativo
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{usuario.ultimoAcesso}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="text-xs">
                                <DropdownMenuItem className="text-xs">
                                  <ExternalLink className="w-3 h-3 mr-2" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs">
                                  <Shield className="w-3 h-3 mr-2" />
                                  Editar permissoes
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs">
                                  <Key className="w-3 h-3 mr-2" />
                                  Reset senha
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {usuario.status === "bloqueado" ? (
                                  <DropdownMenuItem className="text-xs text-emerald-600">
                                    <Unlock className="w-3 h-3 mr-2" />
                                    Desbloquear
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-xs text-red-600">
                                    <Lock className="w-3 h-3 mr-2" />
                                    Bloquear
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Atividade Recente - Lateral */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Atividade
                    </CardTitle>
                    <Link href="/corporativo/console/auditoria">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
                        Ver mais
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[340px]">
                    <div className="px-4 pb-4 space-y-3">
                      {atividadeRecente.map((item) => (
                        <div key={item.id} className="flex gap-2 text-xs">
                          <div className="w-1 rounded-full bg-primary/20 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{item.acao}</p>
                            <p className="text-muted-foreground truncate">{item.detalhes}</p>
                            <div className="flex items-center gap-1 mt-0.5 text-[10px] text-muted-foreground">
                              <span>{item.usuario}</span>
                              <span>•</span>
                              <span>{item.data}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Acesso Rapido */}
            <div className="grid grid-cols-4 gap-3">
              <Link href="/corporativo/console/usuarios">
                <Card className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gerenciar Usuarios</p>
                      <p className="text-[10px] text-muted-foreground">Cadastro, edicao e remocao</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                </Card>
              </Link>
              <Link href="/corporativo/console/perfis">
                <Card className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Perfis & Permissoes</p>
                      <p className="text-[10px] text-muted-foreground">Matriz de acesso granular</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                </Card>
              </Link>
              <Link href="/corporativo/console/alcadas">
                <Card className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center">
                      <Network className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alcadas & Aprovacoes</p>
                      <p className="text-[10px] text-muted-foreground">Regras por valor e tipo</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                </Card>
              </Link>
              <Link href="/corporativo/console/auditoria">
                <Card className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center">
                      <FileSearch className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Auditoria</p>
                      <p className="text-[10px] text-muted-foreground">Log completo de acoes</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
