"use client"

import type React from "react"
import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  Eye,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Building2,
  Package,
  DollarSign,
  Users,
  Briefcase,
  HelpCircle,
  Lightbulb,
  Bug,
  Ticket,
  CheckCircle,
  AlertTriangle,
  Calendar,
  GripVertical,
  ListTodo,
  Zap,
  Target,
  Hourglass,
  ThumbsUp,
  ThumbsDown,
  Reply,
  ChevronRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipos de solicitacao
const tiposSolicitacao = [
  { value: "erro", label: "Erro/Bug", icon: Bug, color: "text-red-600", bgColor: "bg-red-50" },
  { value: "duvida", label: "Dúvida", icon: HelpCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
  { value: "melhoria", label: "Sugestão/Melhoria", icon: Lightbulb, color: "text-amber-600", bgColor: "bg-amber-50" },
]

// Modulos do sistema
const modulos = [
  { value: "suprimentos", label: "Suprimentos", icon: Package },
  { value: "obras", label: "Obras", icon: Building2 },
  { value: "financeiro", label: "Financeiro", icon: DollarSign },
  { value: "rh", label: "Recursos Humanos", icon: Users },
  { value: "comercial", label: "Comercial", icon: Briefcase },
]

// Status possiveis
const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  aberto: { label: "Aberto", color: "text-blue-700", bgColor: "bg-blue-50", icon: Clock },
  em_analise: { label: "Em análise", color: "text-purple-700", bgColor: "bg-purple-50", icon: Eye },
  aguardando_usuario: {
    label: "Aguardando usuário",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    icon: AlertCircle,
  },
  resolvido: { label: "Resolvido", color: "text-green-700", bgColor: "bg-green-50", icon: CheckCircle2 },
  aprovado_tarefa: { label: "Aprovado → Tarefa", color: "text-indigo-700", bgColor: "bg-indigo-50", icon: ListTodo },
  recusado: { label: "Recusado", color: "text-red-700", bgColor: "bg-red-50", icon: XCircle },
}

// Prioridades do Kanban
const prioridadesKanban = [
  { value: "imediato", label: "Imediato", icon: Zap, color: "text-red-600", bgColor: "bg-red-50" },
  { value: "curto", label: "Curto Prazo", icon: Target, color: "text-orange-600", bgColor: "bg-orange-50" },
  { value: "medio", label: "Médio Prazo", icon: Hourglass, color: "text-blue-600", bgColor: "bg-blue-50" },
  { value: "longo", label: "Longo Prazo", icon: Calendar, color: "text-gray-600", bgColor: "bg-gray-50" },
  { value: "concluido", label: "Concluído", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
]

// Dados de exemplo - Chamados de TODOS os usuarios
const chamadosExemplo = [
  {
    id: "SUP-2024-0001",
    tipo: "erro",
    titulo: "Erro ao gerar relatório de medição",
    modulo: "comercial",
    status: "em_analise",
    usuario: { nome: "João Silva", email: "joao.comercial@empresa.com", avatar: "JS" },
    dataAbertura: "2024-01-08",
    ultimaAtualizacao: "2024-01-09",
    descricao: "Ao tentar gerar o relatório de medição do contrato CT-2024-015, o sistema apresenta erro 500.",
    historico: [
      { data: "2024-01-08 10:30", autor: "João Silva", tipo: "abertura", mensagem: "Chamado aberto." },
      { data: "2024-01-08 11:45", autor: "Suporte", tipo: "resposta", mensagem: "Estamos analisando o problema." },
    ],
  },
  {
    id: "SUP-2024-0002",
    tipo: "duvida",
    titulo: "Como cadastrar fornecedor internacional?",
    modulo: "suprimentos",
    status: "aguardando_usuario",
    usuario: { nome: "Maria Souza", email: "maria.suprimentos@empresa.com", avatar: "MS" },
    dataAbertura: "2024-01-07",
    ultimaAtualizacao: "2024-01-08",
    descricao: "Preciso cadastrar um fornecedor da China mas não sei como preencher os campos.",
    historico: [
      { data: "2024-01-07 15:00", autor: "Maria Souza", tipo: "abertura", mensagem: "Chamado aberto." },
      {
        data: "2024-01-07 16:30",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Use o campo Documento Estrangeiro. Tem filial no Brasil?",
      },
    ],
  },
  {
    id: "SUP-2024-0003",
    tipo: "melhoria",
    titulo: "Adicionar filtro por período no RDO",
    modulo: "obras",
    status: "aberto",
    usuario: { nome: "Carlos Lima", email: "carlos.rh@empresa.com", avatar: "CL" },
    dataAbertura: "2024-01-05",
    ultimaAtualizacao: "2024-01-05",
    descricao: "Seria útil ter um filtro por período no relatório diário de obra.",
    historico: [{ data: "2024-01-05 09:00", autor: "Carlos Lima", tipo: "abertura", mensagem: "Sugestão enviada." }],
  },
  {
    id: "SUP-2024-0004",
    tipo: "erro",
    titulo: "Lentidão no módulo financeiro",
    modulo: "financeiro",
    status: "resolvido",
    usuario: { nome: "Ana Paula", email: "ana.dp@empresa.com", avatar: "AP" },
    dataAbertura: "2024-01-03",
    ultimaAtualizacao: "2024-01-04",
    descricao: "O módulo financeiro está muito lento, principalmente na tela de contas a pagar.",
    historico: [
      { data: "2024-01-03 08:00", autor: "Ana Paula", tipo: "abertura", mensagem: "Chamado aberto." },
      {
        data: "2024-01-04 14:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Problema corrigido - índice do banco.",
      },
    ],
  },
  {
    id: "SUP-2024-0005",
    tipo: "melhoria",
    titulo: "Exportar RDO em Excel",
    modulo: "obras",
    status: "aprovado_tarefa",
    usuario: { nome: "Roberto Engenheiro", email: "roberto@terceiro.com", avatar: "RE" },
    dataAbertura: "2024-01-02",
    ultimaAtualizacao: "2024-01-06",
    descricao: "Permitir exportar o RDO em formato Excel além do PDF.",
    historico: [
      { data: "2024-01-02 11:00", autor: "Roberto Engenheiro", tipo: "abertura", mensagem: "Sugestão enviada." },
      {
        data: "2024-01-06 10:00",
        autor: "Suporte",
        tipo: "aprovacao",
        mensagem: "Aprovado como tarefa de médio prazo.",
      },
    ],
  },
  {
    id: "SUP-2024-0006",
    tipo: "duvida",
    titulo: "Dúvida sobre cálculo de horas extras",
    modulo: "rh",
    status: "resolvido",
    usuario: { nome: "Marcos Pereira", email: "marcos.suprimentos@empresa.com", avatar: "MP" },
    dataAbertura: "2024-01-02",
    ultimaAtualizacao: "2024-01-02",
    descricao: "Como o sistema calcula as horas extras?",
    historico: [
      { data: "2024-01-02 11:00", autor: "Marcos Pereira", tipo: "abertura", mensagem: "Chamado aberto." },
      {
        data: "2024-01-02 14:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "O cálculo considera o banco de horas primeiro.",
      },
    ],
  },
]

// Tarefas do Kanban (sugestoes aprovadas)
const tarefasKanban = [
  { id: "TRF-001", titulo: "Filtro por período no RDO", origem: "SUP-2024-0003", prioridade: "curto", modulo: "obras" },
  { id: "TRF-002", titulo: "Exportar RDO em Excel", origem: "SUP-2024-0005", prioridade: "medio", modulo: "obras" },
  { id: "TRF-003", titulo: "Dashboard de produtividade", origem: "SUP-2024-0010", prioridade: "longo", modulo: "rh" },
  {
    id: "TRF-004",
    titulo: "Notificação de vencimento ASO",
    origem: "SUP-2024-0012",
    prioridade: "imediato",
    modulo: "rh",
  },
  {
    id: "TRF-005",
    titulo: "Integração com banco digital",
    origem: "SUP-2024-0015",
    prioridade: "concluido",
    modulo: "financeiro",
  },
]

// Atividades recentes
const atividadesRecentes = [
  {
    tipo: "analise",
    titulo: "Chamado analisado",
    descricao: "SUP-2024-0001 - João Silva",
    autor: "Admin",
    data: "09/01 14:20",
  },
  {
    tipo: "resposta",
    titulo: "Resposta enviada",
    descricao: "SUP-2024-0002 - Aguardando info",
    autor: "Admin",
    data: "08/01 16:30",
  },
  {
    tipo: "aprovacao",
    titulo: "Sugestão aprovada",
    descricao: "SUP-2024-0005 → Tarefa",
    autor: "Admin",
    data: "06/01 10:00",
  },
  {
    tipo: "resolucao",
    titulo: "Erro corrigido",
    descricao: "SUP-2024-0004 - Lentidão",
    autor: "Admin",
    data: "04/01 16:00",
  },
  {
    tipo: "tarefa",
    titulo: "Tarefa concluída",
    descricao: "TRF-005 - Integração banco",
    autor: "Dev",
    data: "03/01 18:00",
  },
]

export default function SuporteGerencialPage() {
  const [activeTab, setActiveTab] = useState("chamados")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroModulo, setFiltroModulo] = useState("todos")
  const [busca, setBusca] = useState("")
  const [chamadoSelecionado, setChamadoSelecionado] = useState<(typeof chamadosExemplo)[0] | null>(null)
  const [modalAnalise, setModalAnalise] = useState(false)
  const [resposta, setResposta] = useState("")
  const [prioridadeTarefa, setPrioridadeTarefa] = useState("")

  // Filtragem de chamados
  const chamadosFiltrados = chamadosExemplo.filter((chamado) => {
    if (filtroStatus !== "todos" && chamado.status !== filtroStatus) return false
    if (filtroTipo !== "todos" && chamado.tipo !== filtroTipo) return false
    if (filtroModulo !== "todos" && chamado.modulo !== filtroModulo) return false
    if (
      busca &&
      !chamado.titulo.toLowerCase().includes(busca.toLowerCase()) &&
      !chamado.id.toLowerCase().includes(busca.toLowerCase()) &&
      !chamado.usuario.nome.toLowerCase().includes(busca.toLowerCase())
    )
      return false
    return true
  })

  // Contadores
  const contadores = {
    total: chamadosExemplo.length,
    abertos: chamadosExemplo.filter((c) => c.status === "aberto").length,
    emAnalise: chamadosExemplo.filter((c) => c.status === "em_analise").length,
    aguardando: chamadosExemplo.filter((c) => c.status === "aguardando_usuario").length,
    resolvidos: chamadosExemplo.filter((c) => c.status === "resolvido").length,
    tarefas: tarefasKanban.filter((t) => t.prioridade !== "concluido").length,
  }

  // Abrir analise do chamado
  const handleAnalisar = (chamado: (typeof chamadosExemplo)[0]) => {
    setChamadoSelecionado(chamado)
    setModalAnalise(true)
    setResposta("")
    setPrioridadeTarefa("")
  }

  // Acoes do chamado
  const handleResolver = () => {
    // Marcar como resolvido e enviar resposta
    setModalAnalise(false)
  }

  const handleAprovarTarefa = () => {
    // Aprovar como tarefa e mover para Kanban
    setModalAnalise(false)
  }

  const handleRejeitar = () => {
    // Rejeitar sugestao
    setModalAnalise(false)
  }

  const handleResponder = () => {
    // Enviar resposta e aguardar usuario
    setModalAnalise(false)
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-muted/30">
      {/* Header compacto */}
      <div className="h-12 border-b bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold">Central de Suporte</h1>
          <span className="text-xs text-muted-foreground">Gestão de chamados e tarefas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar chamados, usuários..."
              className="h-8 pl-8 text-xs"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Barra de alertas - chamados pendentes */}
      {contadores.abertos > 0 && (
        <div className="h-9 bg-red-50 border-b border-red-200 px-4 flex items-center gap-6 text-xs shrink-0">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span className="font-medium">{contadores.abertos} chamado(s) aguardando análise</span>
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-red-800 underline"
              onClick={() => setFiltroStatus("aberto")}
            >
              Analisar agora
            </Button>
          </div>
          {contadores.aguardando > 0 && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-amber-800">
                <Clock className="h-3.5 w-3.5" />
                <span>{contadores.aguardando} aguardando resposta do usuário</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Metricas compactas */}
      <div className="px-4 py-2 border-b bg-card shrink-0">
        <div className="grid grid-cols-6 gap-2">
          <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
            <div>
              <div className="text-xl font-bold">{contadores.total}</div>
              <div className="text-[10px] text-muted-foreground">Total</div>
            </div>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
            <div>
              <div className="text-xl font-bold text-blue-600">{contadores.abertos}</div>
              <div className="text-[10px] text-muted-foreground">Abertos</div>
            </div>
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
            <div>
              <div className="text-xl font-bold text-purple-600">{contadores.emAnalise}</div>
              <div className="text-[10px] text-muted-foreground">Em Análise</div>
            </div>
            <Eye className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
            <div>
              <div className="text-xl font-bold text-amber-600">{contadores.aguardando}</div>
              <div className="text-[10px] text-muted-foreground">Aguardando</div>
            </div>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
            <div>
              <div className="text-xl font-bold text-green-600">{contadores.resolvidos}</div>
              <div className="text-[10px] text-muted-foreground">Resolvidos</div>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
            <div>
              <div className="text-xl font-bold text-indigo-600">{contadores.tarefas}</div>
              <div className="text-[10px] text-muted-foreground">Tarefas</div>
            </div>
            <ListTodo className="h-4 w-4 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Tabs: Chamados / Kanban de Tarefas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 border-b bg-card shrink-0">
          <TabsList className="h-9 bg-transparent p-0 gap-4">
            <TabsTrigger
              value="chamados"
              className="h-9 px-0 pb-2 pt-1 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Chamados ({chamadosExemplo.length})
            </TabsTrigger>
            <TabsTrigger
              value="tarefas"
              className="h-9 px-0 pb-2 pt-1 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Kanban de Tarefas ({tarefasKanban.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Chamados */}
        <TabsContent value="chamados" className="flex-1 flex overflow-hidden m-0">
          {/* Tabela de chamados - 75% */}
          <div className="flex-1 flex flex-col border-r" style={{ width: "75%" }}>
            {/* Filtros inline */}
            <div className="h-10 border-b bg-card px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Ticket className="h-3.5 w-3.5" />
                Todos os Chamados
              </div>
              <div className="flex items-center gap-2">
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="h-7 w-[120px] text-[10px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="h-7 w-[110px] text-[10px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {tiposSolicitacao.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroModulo} onValueChange={setFiltroModulo}>
                  <SelectTrigger className="h-7 w-[110px] text-[10px]">
                    <SelectValue placeholder="Módulo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {modulos.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabela */}
            <ScrollArea className="flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px] text-[10px]">ID</TableHead>
                    <TableHead className="w-[80px] text-[10px]">Tipo</TableHead>
                    <TableHead className="text-[10px]">Título</TableHead>
                    <TableHead className="w-[140px] text-[10px]">Usuário</TableHead>
                    <TableHead className="w-[90px] text-[10px]">Módulo</TableHead>
                    <TableHead className="w-[110px] text-[10px]">Status</TableHead>
                    <TableHead className="w-[75px] text-[10px]">Abertura</TableHead>
                    <TableHead className="w-[40px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chamadosFiltrados.map((chamado) => {
                    const tipoInfo = tiposSolicitacao.find((t) => t.value === chamado.tipo)
                    const moduloInfo = modulos.find((m) => m.value === chamado.modulo)
                    const statusInfo = statusConfig[chamado.status]
                    const TipoIcon = tipoInfo?.icon || HelpCircle

                    return (
                      <TableRow
                        key={chamado.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleAnalisar(chamado)}
                      >
                        <TableCell className="text-[10px] font-mono text-muted-foreground">{chamado.id}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${tipoInfo?.bgColor} ${tipoInfo?.color}`}
                          >
                            <TipoIcon className="h-3 w-3" />
                            {tipoInfo?.label.split("/")[0]}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium">{chamado.titulo}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium">
                              {chamado.usuario.avatar}
                            </div>
                            <span className="text-[10px] truncate max-w-[90px]">{chamado.usuario.nome}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[10px]">{moduloInfo?.label}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-[9px] px-1.5 py-0 ${statusInfo?.bgColor} ${statusInfo?.color} border-0`}
                          >
                            {statusInfo?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[10px] text-muted-foreground">{chamado.dataAbertura}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAnalisar(chamado)}>
                                <Eye className="h-3.5 w-3.5 mr-2" />
                                Analisar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="h-3.5 w-3.5 mr-2" />
                                Responder
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="h-3.5 w-3.5 mr-2" />
                                Marcar Resolvido
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Timeline de atividade - 25% */}
          <div className="w-72 flex flex-col bg-card shrink-0">
            <div className="h-10 border-b px-3 flex items-center justify-between shrink-0">
              <span className="text-xs font-medium flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Atividade
              </span>
              <Button variant="link" className="h-auto p-0 text-[10px]">
                Ver mais
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-3">
                {atividadesRecentes.map((atividade, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                        atividade.tipo === "resolucao"
                          ? "bg-green-100 text-green-600"
                          : atividade.tipo === "aprovacao"
                            ? "bg-indigo-100 text-indigo-600"
                            : atividade.tipo === "analise"
                              ? "bg-purple-100 text-purple-600"
                              : atividade.tipo === "tarefa"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {atividade.tipo === "resolucao" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : atividade.tipo === "aprovacao" ? (
                        <ThumbsUp className="h-3 w-3" />
                      ) : atividade.tipo === "analise" ? (
                        <Eye className="h-3 w-3" />
                      ) : atividade.tipo === "tarefa" ? (
                        <ListTodo className="h-3 w-3" />
                      ) : (
                        <MessageSquare className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium">{atividade.titulo}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{atividade.descricao}</div>
                      <div className="text-[9px] text-muted-foreground">
                        {atividade.autor} • {atividade.data}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        {/* Tab Kanban de Tarefas */}
        <TabsContent value="tarefas" className="flex-1 overflow-hidden m-0">
          <div className="flex h-full gap-3 p-4 overflow-x-auto">
            {prioridadesKanban.map((prioridade) => {
              const tarefasDaColuna = tarefasKanban.filter((t) => t.prioridade === prioridade.value)
              const PrioridadeIcon = prioridade.icon

              return (
                <div key={prioridade.value} className="w-64 shrink-0 flex flex-col bg-muted/50 rounded-lg">
                  {/* Header da coluna */}
                  <div className={`h-10 px-3 flex items-center justify-between rounded-t-lg ${prioridade.bgColor}`}>
                    <div className="flex items-center gap-2">
                      <PrioridadeIcon className={`h-3.5 w-3.5 ${prioridade.color}`} />
                      <span className={`text-xs font-medium ${prioridade.color}`}>{prioridade.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] h-5">
                      {tarefasDaColuna.length}
                    </Badge>
                  </div>

                  {/* Cards da coluna */}
                  <ScrollArea className="flex-1 p-2">
                    <div className="space-y-2">
                      {tarefasDaColuna.map((tarefa) => {
                        const moduloInfo = modulos.find((m) => m.value === tarefa.modulo)
                        return (
                          <Card key={tarefa.id} className="p-2.5 cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-2">
                              <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-mono text-muted-foreground">{tarefa.id}</div>
                                <div className="text-xs font-medium mt-0.5">{tarefa.titulo}</div>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <Badge variant="outline" className="text-[9px] px-1 py-0">
                                    {moduloInfo?.label}
                                  </Badge>
                                  <span className="text-[9px] text-muted-foreground">← {tarefa.origem}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                      {tarefasDaColuna.length === 0 && (
                        <div className="text-center py-6 text-[10px] text-muted-foreground">Nenhuma tarefa</div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Cards de acao rapida */}
      <div className="px-4 py-2 border-t bg-card shrink-0">
        <div className="grid grid-cols-4 gap-2">
          <Card
            className="p-2.5 flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setFiltroStatus("aberto")}
          >
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium">Analisar Abertos</div>
              <div className="text-[10px] text-muted-foreground">{contadores.abertos} pendentes</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
          <Card
            className="p-2.5 flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setFiltroTipo("erro")}
          >
            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
              <Bug className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium">Erros/Bugs</div>
              <div className="text-[10px] text-muted-foreground">Correções urgentes</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
          <Card
            className="p-2.5 flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setFiltroTipo("melhoria")}
          >
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium">Sugestões</div>
              <div className="text-[10px] text-muted-foreground">Avaliar melhorias</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
          <Card
            className="p-2.5 flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setActiveTab("tarefas")}
          >
            <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <ListTodo className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium">Kanban</div>
              <div className="text-[10px] text-muted-foreground">{contadores.tarefas} tarefas</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
        </div>
      </div>

      {/* Modal de Analise do Chamado */}
      <Dialog open={modalAnalise} onOpenChange={setModalAnalise}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Eye className="h-4 w-4" />
              Analisar Chamado
            </DialogTitle>
            <DialogDescription className="text-xs">
              {chamadoSelecionado?.id} • Aberto por {chamadoSelecionado?.usuario.nome}
            </DialogDescription>
          </DialogHeader>

          {chamadoSelecionado && (
            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Info do chamado */}
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label className="text-[10px] text-muted-foreground">Tipo</Label>
                  <div className="mt-1">
                    {(() => {
                      const tipoInfo = tiposSolicitacao.find((t) => t.value === chamadoSelecionado.tipo)
                      const TipoIcon = tipoInfo?.icon || HelpCircle
                      return (
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${tipoInfo?.bgColor} ${tipoInfo?.color}`}
                        >
                          <TipoIcon className="h-3 w-3" />
                          {tipoInfo?.label}
                        </div>
                      )
                    })()}
                  </div>
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Módulo</Label>
                  <div className="text-xs mt-1">
                    {modulos.find((m) => m.value === chamadoSelecionado.modulo)?.label}
                  </div>
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${statusConfig[chamadoSelecionado.status]?.bgColor} ${statusConfig[chamadoSelecionado.status]?.color} border-0`}
                    >
                      {statusConfig[chamadoSelecionado.status]?.label}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Data Abertura</Label>
                  <div className="text-xs mt-1">{chamadoSelecionado.dataAbertura}</div>
                </div>
              </div>

              <Separator />

              {/* Titulo e descricao */}
              <div>
                <Label className="text-[10px] text-muted-foreground">Título</Label>
                <div className="text-sm font-medium mt-1">{chamadoSelecionado.titulo}</div>
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">Descrição</Label>
                <div className="text-xs mt-1 p-3 bg-muted/50 rounded-lg">{chamadoSelecionado.descricao}</div>
              </div>

              {/* Historico */}
              <div>
                <Label className="text-[10px] text-muted-foreground">Histórico de Comunicação</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {chamadoSelecionado.historico.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded text-xs ${item.autor === "Suporte" ? "bg-blue-50 ml-4" : "bg-gray-50 mr-4"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.autor}</span>
                        <span className="text-[10px] text-muted-foreground">{item.data}</span>
                      </div>
                      <div>{item.mensagem}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Campo de resposta */}
              <div>
                <Label className="text-xs">Resposta / Ação</Label>
                <Textarea
                  placeholder="Digite sua resposta ou justificativa..."
                  className="mt-1.5 text-xs min-h-[80px]"
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                />
              </div>

              {/* Se for sugestao, mostrar opcao de prioridade */}
              {chamadoSelecionado.tipo === "melhoria" && (
                <div>
                  <Label className="text-xs">Prioridade da Tarefa (se aprovar)</Label>
                  <Select value={prioridadeTarefa} onValueChange={setPrioridadeTarefa}>
                    <SelectTrigger className="mt-1.5 h-8 text-xs">
                      <SelectValue placeholder="Selecione a prioridade..." />
                    </SelectTrigger>
                    <SelectContent>
                      {prioridadesKanban
                        .filter((p) => p.value !== "concluido")
                        .map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            {chamadoSelecionado?.tipo === "melhoria" ? (
              <>
                <Button variant="outline" size="sm" onClick={handleRejeitar}>
                  <ThumbsDown className="h-3.5 w-3.5 mr-1.5" />
                  Rejeitar
                </Button>
                <Button variant="outline" size="sm" onClick={handleResponder}>
                  <Reply className="h-3.5 w-3.5 mr-1.5" />
                  Responder
                </Button>
                <Button size="sm" onClick={handleAprovarTarefa} disabled={!prioridadeTarefa}>
                  <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                  Aprovar → Tarefa
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleResponder}>
                  <Reply className="h-3.5 w-3.5 mr-1.5" />
                  Responder
                </Button>
                <Button size="sm" onClick={handleResolver}>
                  <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                  Marcar Resolvido
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
