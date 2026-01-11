"use client"

import { useState } from "react"
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  Search,
  ChevronRight,
  Mail,
  Plus,
  RefreshCw,
  XCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  User,
  Building2,
  Send,
  Copy,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const convitesData = [
  {
    id: "CONV-001",
    email: "novo.engenheiro@empresa.com",
    nome: "Ricardo Santos",
    tipo: "interno",
    perfil: "Engenheiro de Obra",
    centroCusto: "OBR-2024-001",
    status: "pendente",
    enviadoEm: "09/01/2026 10:30",
    expiraEm: "16/01/2026",
    enviadoPor: "Admin",
  },
  {
    id: "CONV-002",
    email: "consultor@terceiro.com",
    nome: "Marcos Consultor",
    tipo: "externo",
    perfil: "Fiscal - Leitura",
    centroCusto: "OBR-2024-002",
    status: "aguardando_verificacao",
    enviadoEm: "08/01/2026 14:20",
    expiraEm: "15/01/2026",
    enviadoPor: "Admin",
  },
  {
    id: "CONV-003",
    email: "ana.nova@empresa.com",
    nome: "Ana Beatriz",
    tipo: "interno",
    perfil: "Assistente Financeiro",
    centroCusto: "CORP-FIN",
    status: "aceito",
    enviadoEm: "05/01/2026 09:00",
    expiraEm: "-",
    enviadoPor: "Admin",
  },
  {
    id: "CONV-004",
    email: "auditor@auditoria.com",
    nome: "Carlos Auditor",
    tipo: "externo",
    perfil: "Auditor - Leitura",
    centroCusto: "Todos",
    status: "expirado",
    enviadoEm: "20/12/2025 11:00",
    expiraEm: "27/12/2025",
    enviadoPor: "Diretoria",
  },
]

export default function ConvitesPage() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [showNovoConviteDialog, setShowNovoConviteDialog] = useState(false)

  const convitesFiltrados = convitesData.filter((convite) => {
    if (filtroTipo !== "todos" && convite.tipo !== filtroTipo) return false
    if (filtroStatus !== "todos" && convite.status !== filtroStatus) return false
    if (
      busca &&
      !convite.email.toLowerCase().includes(busca.toLowerCase()) &&
      !convite.nome.toLowerCase().includes(busca.toLowerCase())
    )
      return false
    return true
  })

  const pendentes = convitesData.filter((c) => c.status === "pendente" || c.status === "aguardando_verificacao").length
  const aceitos = convitesData.filter((c) => c.status === "aceito").length
  const expirados = convitesData.filter((c) => c.status === "expirado").length

  const atividadeRecente = [
    { acao: "Convite aceito", detalhe: "Ana Beatriz aceitou o convite", tempo: "4d", tipo: "sucesso" },
    { acao: "Convite expirado", detalhe: "Carlos Auditor - 7 dias sem resposta", tempo: "13d", tipo: "alerta" },
    { acao: "Convite reenviado", detalhe: "consultor@terceiro.com", tempo: "1d", tipo: "info" },
  ]

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
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card mb-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Convites Pendentes</h1>
            <p className="text-xs text-muted-foreground">Gerenciamento de convites de acesso</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por email ou nome..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNovoConviteDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Novo Convite
          </Button>
        </div>
      </div>

      {/* Barra de alertas */}
      {expirados > 0 && (
        <div className="h-9 bg-amber-50 border-b border-amber-200 flex items-center px-4 text-sm">
          <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
          <span className="text-amber-800">{expirados} convite(s) expirado(s) - considere reenviar</span>
        </div>
      )}

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{convitesData.length}</div>
          <div className="text-xs text-muted-foreground">Total de Convites</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">{pendentes}</div>
          <div className="text-xs text-muted-foreground">Pendentes</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">{aceitos}</div>
          <div className="text-xs text-muted-foreground">Aceitos</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-red-600">{expirados}</div>
          <div className="text-xs text-muted-foreground">Expirados</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-blue-600">
            {convitesData.filter((c) => c.tipo === "interno").length}
          </div>
          <div className="text-xs text-muted-foreground">Internos</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-purple-600">
            {convitesData.filter((c) => c.tipo === "externo").length}
          </div>
          <div className="text-xs text-muted-foreground">Externos</div>
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
                <SelectItem value="interno">Interno</SelectItem>
                <SelectItem value="externo">Externo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aguardando_verificacao">Aguardando Verificacao</SelectItem>
                <SelectItem value="aceito">Aceito</SelectItem>
                <SelectItem value="expirado">Expirado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Convidado</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Centro de Custo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enviado em</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {convitesFiltrados.map((convite) => (
                  <TableRow key={convite.id}>
                    <TableCell>
                      {convite.tipo === "interno" ? (
                        <User className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Building2 className="h-4 w-4 text-purple-600" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{convite.nome}</div>
                      <div className="text-xs text-muted-foreground">{convite.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          convite.tipo === "interno"
                            ? "border-blue-300 text-blue-700"
                            : "border-purple-300 text-purple-700"
                        }
                      >
                        {convite.tipo === "interno" ? "Interno" : "Externo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{convite.perfil}</TableCell>
                    <TableCell className="text-sm font-mono">{convite.centroCusto}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          convite.status === "pendente"
                            ? "bg-amber-600"
                            : convite.status === "aguardando_verificacao"
                              ? "bg-blue-600"
                              : convite.status === "aceito"
                                ? "bg-emerald-600"
                                : "bg-gray-400"
                        }
                      >
                        {convite.status === "pendente" && "Pendente"}
                        {convite.status === "aguardando_verificacao" && "Verificando"}
                        {convite.status === "aceito" && "Aceito"}
                        {convite.status === "expirado" && "Expirado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{convite.enviadoEm}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reenviar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Revogar
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
          <div className="p-3 border-b">
            <span className="text-sm font-medium">Atividade Recente</span>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {atividadeRecente.map((item, index) => (
              <div key={index} className="text-sm">
                <div className="flex items-center gap-2">
                  {item.tipo === "sucesso" && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                  {item.tipo === "alerta" && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                  {item.tipo === "info" && <RefreshCw className="h-3 w-3 text-blue-500" />}
                  <span className="font-medium">{item.acao}</span>
                </div>
                <div className="text-xs text-muted-foreground ml-5">{item.detalhe}</div>
                <div className="text-xs text-muted-foreground ml-5">{item.tempo}</div>
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
            onClick={() => setShowNovoConviteDialog(true)}
          >
            <Send className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Novo Convite</div>
              <div className="text-xs text-muted-foreground">Convidar usuario</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Reenviar Pendentes</div>
              <div className="text-xs text-muted-foreground">Lembrar convidados</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <XCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Limpar Expirados</div>
              <div className="text-xs text-muted-foreground">Remover antigos</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Config. Expiracao</div>
              <div className="text-xs text-muted-foreground">Tempo de validade</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>

      {/* Dialog Novo Convite */}
      <Dialog open={showNovoConviteDialog} onOpenChange={setShowNovoConviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Convite</DialogTitle>
            <DialogDescription>Convide um usuario para acessar o sistema</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Email</Label>
              <Input className="mt-1.5" type="email" placeholder="email@exemplo.com" />
            </div>
            <div>
              <Label>Nome</Label>
              <Input className="mt-1.5" placeholder="Nome completo" />
            </div>
            <div>
              <Label>Perfil de Acesso</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eng">Engenheiro de Obra</SelectItem>
                  <SelectItem value="fiscal">Fiscal - Leitura</SelectItem>
                  <SelectItem value="assist">Assistente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Centro de Custo</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="obr1">OBR-2024-001 - Edificio Aurora</SelectItem>
                  <SelectItem value="obr2">OBR-2024-002 - Shopping Plaza</SelectItem>
                  <SelectItem value="corp">CORP-ADM - Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovoConviteDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowNovoConviteDialog(false)}>
              <Send className="h-4 w-4 mr-1" />
              Enviar Convite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </div>
  )
}
