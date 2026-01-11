"use client"

import { useState } from "react"
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  Search,
  ChevronRight,
  FileText,
  Download,
  Calendar,
  User,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const logsData = [
  {
    id: "LOG-001",
    dataHora: "09/01/2026 14:52:33",
    usuario: "Ana Paula",
    email: "ana.dp@empresa.com",
    acao: "Login",
    modulo: "Sistema",
    descricao: "Login realizado com sucesso",
    ip: "192.168.1.100",
    dispositivo: "Chrome / Windows",
    status: "sucesso",
  },
  {
    id: "LOG-002",
    dataHora: "09/01/2026 14:45:12",
    usuario: "Marcos Pereira",
    email: "marcos.suprimentos@empresa.com",
    acao: "Criar",
    modulo: "Suprimentos",
    descricao: "Pedido de compra #PC-2024-0892 criado",
    ip: "192.168.1.105",
    dispositivo: "Firefox / macOS",
    status: "sucesso",
  },
  {
    id: "LOG-003",
    dataHora: "09/01/2026 14:32:45",
    usuario: "Fernando Costa",
    email: "fernando@empresa.com",
    acao: "Tentativa de Login",
    modulo: "Sistema",
    descricao: "5 tentativas de login falhas",
    ip: "192.168.1.100",
    dispositivo: "Chrome / Windows",
    status: "falha",
  },
  {
    id: "LOG-004",
    dataHora: "09/01/2026 14:20:00",
    usuario: "Admin",
    email: "admin@empresa.com",
    acao: "Alterar Permissao",
    modulo: "Console",
    descricao: "Permissao 'Aprovar' adicionada ao perfil Gerente Comercial",
    ip: "192.168.1.1",
    dispositivo: "Chrome / Windows",
    status: "sucesso",
  },
  {
    id: "LOG-005",
    dataHora: "09/01/2026 13:55:22",
    usuario: "Joao Silva",
    email: "joao.comercial@empresa.com",
    acao: "Aprovar",
    modulo: "Comercial",
    descricao: "Contrato #CT-2024-0045 aprovado - R$ 150.000,00",
    ip: "192.168.1.110",
    dispositivo: "Safari / iOS",
    status: "sucesso",
  },
  {
    id: "LOG-006",
    dataHora: "09/01/2026 13:40:10",
    usuario: "Sistema",
    email: "sistema@empresa.com",
    acao: "Backup",
    modulo: "Sistema",
    descricao: "Backup automatico realizado",
    ip: "localhost",
    dispositivo: "Servidor",
    status: "sucesso",
  },
  {
    id: "LOG-007",
    dataHora: "09/01/2026 13:30:00",
    usuario: "Patricia Fiscal",
    email: "patricia@consultoria.com",
    acao: "Exportar",
    modulo: "Fiscal",
    descricao: "Relatorio de NFe exportado para Excel",
    ip: "189.45.67.89",
    dispositivo: "Edge / Windows",
    status: "sucesso",
  },
  {
    id: "LOG-008",
    dataHora: "09/01/2026 12:15:33",
    usuario: "Carlos Lima",
    email: "carlos.rh@empresa.com",
    acao: "Excluir",
    modulo: "RH",
    descricao: "Registro de ponto excluido - ID #PT-89234",
    ip: "192.168.1.115",
    dispositivo: "Chrome / Windows",
    status: "alerta",
  },
]

export default function AuditoriaPage() {
  const [filtroAcao, setFiltroAcao] = useState("todos")
  const [filtroModulo, setFiltroModulo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [showDetalhesDialog, setShowDetalhesDialog] = useState(false)
  const [logSelecionado, setLogSelecionado] = useState<(typeof logsData)[0] | null>(null)

  const logsFiltrados = logsData.filter((log) => {
    if (filtroAcao !== "todos" && log.acao !== filtroAcao) return false
    if (filtroModulo !== "todos" && log.modulo !== filtroModulo) return false
    if (filtroStatus !== "todos" && log.status !== filtroStatus) return false
    if (
      busca &&
      !log.usuario.toLowerCase().includes(busca.toLowerCase()) &&
      !log.descricao.toLowerCase().includes(busca.toLowerCase())
    )
      return false
    return true
  })

  const abrirDetalhes = (log: (typeof logsData)[0]) => {
    setLogSelecionado(log)
    setShowDetalhesDialog(true)
  }

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
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Auditoria</h1>
            <p className="text-xs text-muted-foreground">Log completo de acoes do sistema</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por usuario ou acao..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{logsData.length}</div>
          <div className="text-xs text-muted-foreground">Registros Hoje</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">
            {logsData.filter((l) => l.status === "sucesso").length}
          </div>
          <div className="text-xs text-muted-foreground">Sucesso</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-red-600">{logsData.filter((l) => l.status === "falha").length}</div>
          <div className="text-xs text-muted-foreground">Falhas</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">
            {logsData.filter((l) => l.status === "alerta").length}
          </div>
          <div className="text-xs text-muted-foreground">Alertas</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{new Set(logsData.map((l) => l.usuario)).size}</div>
          <div className="text-xs text-muted-foreground">Usuarios Ativos</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{new Set(logsData.map((l) => l.ip)).size}</div>
          <div className="text-xs text-muted-foreground">IPs Unicos</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="p-3 border-b flex items-center gap-3 bg-card">
        <Select value={filtroAcao} onValueChange={setFiltroAcao}>
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="Acao" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas as acoes</SelectItem>
            <SelectItem value="Login">Login</SelectItem>
            <SelectItem value="Criar">Criar</SelectItem>
            <SelectItem value="Editar">Editar</SelectItem>
            <SelectItem value="Excluir">Excluir</SelectItem>
            <SelectItem value="Aprovar">Aprovar</SelectItem>
            <SelectItem value="Exportar">Exportar</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroModulo} onValueChange={setFiltroModulo}>
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="Modulo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os modulos</SelectItem>
            <SelectItem value="Sistema">Sistema</SelectItem>
            <SelectItem value="Console">Console</SelectItem>
            <SelectItem value="Comercial">Comercial</SelectItem>
            <SelectItem value="Suprimentos">Suprimentos</SelectItem>
            <SelectItem value="RH">RH</SelectItem>
            <SelectItem value="Fiscal">Fiscal</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="sucesso">Sucesso</SelectItem>
            <SelectItem value="falha">Falha</SelectItem>
            <SelectItem value="alerta">Alerta</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-8 bg-transparent">
          <Calendar className="h-4 w-4 mr-1" />
          Periodo
        </Button>
      </div>

      {/* Tabela */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Acao</TableHead>
              <TableHead>Modulo</TableHead>
              <TableHead>Descricao</TableHead>
              <TableHead>IP</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsFiltrados.map((log) => (
              <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50" onClick={() => abrirDetalhes(log)}>
                <TableCell>
                  {log.status === "sucesso" && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                  {log.status === "falha" && <XCircle className="h-4 w-4 text-red-500" />}
                  {log.status === "alerta" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground font-mono">{log.dataHora}</TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{log.usuario}</div>
                  <div className="text-xs text-muted-foreground">{log.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{log.acao}</Badge>
                </TableCell>
                <TableCell className="text-sm">{log.modulo}</TableCell>
                <TableCell className="text-sm max-w-xs truncate">{log.descricao}</TableCell>
                <TableCell className="text-sm text-muted-foreground font-mono">{log.ip}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cards de acao rapida */}
      <div className="border-t p-3 bg-card">
        <div className="grid grid-cols-4 gap-3">
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Download className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Exportar Logs</div>
              <div className="text-xs text-muted-foreground">CSV ou Excel</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Alertas de Seguranca</div>
              <div className="text-xs text-muted-foreground">Eventos criticos</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Por Usuario</div>
              <div className="text-xs text-muted-foreground">Historico individual</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Retencao</div>
              <div className="text-xs text-muted-foreground">Configurar periodo</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>

      {/* Dialog Detalhes */}
      <Dialog open={showDetalhesDialog} onOpenChange={setShowDetalhesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Registro</DialogTitle>
            <DialogDescription>ID: {logSelecionado?.id}</DialogDescription>
          </DialogHeader>
          {logSelecionado && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Data/Hora</span>
                  <p className="font-medium">{logSelecionado.dataHora}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <p>
                    <Badge
                      className={
                        logSelecionado.status === "sucesso"
                          ? "bg-emerald-600"
                          : logSelecionado.status === "falha"
                            ? "bg-red-600"
                            : "bg-amber-600"
                      }
                    >
                      {logSelecionado.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Usuario</span>
                  <p className="font-medium">{logSelecionado.usuario}</p>
                  <p className="text-xs text-muted-foreground">{logSelecionado.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Modulo</span>
                  <p className="font-medium">{logSelecionado.modulo}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">IP</span>
                  <p className="font-mono">{logSelecionado.ip}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dispositivo</span>
                  <p className="font-medium">{logSelecionado.dispositivo}</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Descricao</span>
                <p className="font-medium mt-1">{logSelecionado.descricao}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </div>
  )
}
