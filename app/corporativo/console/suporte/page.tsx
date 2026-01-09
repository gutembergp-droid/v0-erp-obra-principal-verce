"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
  FileText,
  ImageIcon,
  Send,
  Building2,
  Package,
  DollarSign,
  Users,
  Briefcase,
  HelpCircle,
  Lightbulb,
  Bug,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Ticket,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Tipos de solicitacao
const tiposSolicitacao = [
  { value: "suporte", label: "Suporte técnico", icon: Bug, color: "text-red-600" },
  { value: "duvida", label: "Dúvida operacional", icon: HelpCircle, color: "text-blue-600" },
  { value: "melhoria", label: "Sugestão de melhoria", icon: Lightbulb, color: "text-amber-600" },
]

// Modulos do sistema
const modulos = [
  { value: "suprimentos", label: "Suprimentos", icon: Package },
  { value: "obras", label: "Obras", icon: Building2 },
  { value: "financeiro", label: "Financeiro", icon: DollarSign },
  { value: "rh", label: "Recursos Humanos", icon: Users },
  { value: "comercial", label: "Comercial", icon: Briefcase },
  { value: "outro", label: "Outro", icon: HelpCircle },
]

// Status possiveis
const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  aberto: { label: "Aberto", color: "text-blue-700", bgColor: "bg-blue-50", icon: Clock },
  em_analise: { label: "Em análise", color: "text-purple-700", bgColor: "bg-purple-50", icon: Loader2 },
  aguardando_usuario: {
    label: "Aguardando usuário",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    icon: AlertCircle,
  },
  em_desenvolvimento: { label: "Em desenvolvimento", color: "text-indigo-700", bgColor: "bg-indigo-50", icon: Loader2 },
  em_validacao: { label: "Em validação", color: "text-cyan-700", bgColor: "bg-cyan-50", icon: Eye },
  concluido: { label: "Concluído", color: "text-green-700", bgColor: "bg-green-50", icon: CheckCircle2 },
  recusado: { label: "Recusado", color: "text-red-700", bgColor: "bg-red-50", icon: XCircle },
}

// Dados de exemplo - Chamados
const chamadosExemplo = [
  {
    id: "SUP-2024-0001",
    tipo: "suporte",
    titulo: "Erro ao gerar relatório de medição",
    modulo: "comercial",
    status: "em_analise",
    dataAbertura: "2024-01-08T10:30:00",
    ultimaAtualizacao: "2024-01-09T14:20:00",
    descricao:
      "Ao tentar gerar o relatório de medição do contrato CT-2024-015, o sistema apresenta erro 500 e não permite a exportação em PDF.",
    anexos: [
      { nome: "erro_tela.png", tipo: "image", tamanho: "245 KB" },
      { nome: "log_erro.txt", tipo: "file", tamanho: "12 KB" },
    ],
    historico: [
      { data: "2024-01-08T10:30:00", autor: "João Silva", tipo: "abertura", mensagem: "Chamado aberto pelo usuário." },
      {
        data: "2024-01-08T11:45:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Chamado recebido. Estamos analisando o problema.",
      },
      {
        data: "2024-01-09T09:00:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Identificamos o problema. Está relacionado ao tamanho do contrato. Estamos trabalhando na correção.",
      },
      { data: "2024-01-09T14:20:00", autor: "Suporte", tipo: "status", mensagem: "Status alterado para: Em análise" },
    ],
  },
  {
    id: "SUP-2024-0002",
    tipo: "duvida",
    titulo: "Como cadastrar fornecedor internacional?",
    modulo: "suprimentos",
    status: "aguardando_usuario",
    dataAbertura: "2024-01-07T15:00:00",
    ultimaAtualizacao: "2024-01-08T10:00:00",
    descricao:
      "Preciso cadastrar um fornecedor da China mas não sei como preencher os campos de CNPJ e Inscrição Estadual.",
    anexos: [],
    historico: [
      { data: "2024-01-07T15:00:00", autor: "Maria Souza", tipo: "abertura", mensagem: "Chamado aberto pelo usuário." },
      {
        data: "2024-01-07T16:30:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem:
          "Para fornecedores internacionais, utilize o campo 'Documento Estrangeiro'. Poderia informar se o fornecedor possui filial no Brasil?",
      },
    ],
  },
  {
    id: "SUP-2024-0003",
    tipo: "melhoria",
    titulo: "Adicionar filtro por período no RDO",
    modulo: "obras",
    status: "em_desenvolvimento",
    dataAbertura: "2024-01-05T09:00:00",
    ultimaAtualizacao: "2024-01-09T11:00:00",
    descricao:
      "Seria muito útil ter um filtro por período no relatório diário de obra, para facilitar a busca de registros antigos.",
    anexos: [],
    historico: [
      {
        data: "2024-01-05T09:00:00",
        autor: "Carlos Lima",
        tipo: "abertura",
        mensagem: "Sugestão enviada pelo usuário.",
      },
      {
        data: "2024-01-05T14:00:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Excelente sugestão! Vamos encaminhar para a equipe de desenvolvimento.",
      },
      {
        data: "2024-01-06T10:00:00",
        autor: "Suporte",
        tipo: "status",
        mensagem: "Sugestão aprovada e incluída no backlog.",
      },
      {
        data: "2024-01-09T11:00:00",
        autor: "Suporte",
        tipo: "status",
        mensagem: "Desenvolvimento iniciado. Previsão de entrega: 15/01/2024.",
      },
    ],
  },
  {
    id: "SUP-2024-0004",
    tipo: "suporte",
    titulo: "Lentidão no módulo financeiro",
    modulo: "financeiro",
    status: "concluido",
    dataAbertura: "2024-01-03T08:00:00",
    ultimaAtualizacao: "2024-01-04T16:00:00",
    descricao: "O módulo financeiro está muito lento, principalmente na tela de contas a pagar.",
    anexos: [],
    historico: [
      { data: "2024-01-03T08:00:00", autor: "Ana Paula", tipo: "abertura", mensagem: "Chamado aberto pelo usuário." },
      {
        data: "2024-01-03T09:30:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Estamos verificando. Pode informar em qual obra está acessando?",
      },
      {
        data: "2024-01-03T10:00:00",
        autor: "Ana Paula",
        tipo: "resposta",
        mensagem: "Obra Residencial Park - CT-2023-089",
      },
      {
        data: "2024-01-04T14:00:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem: "Identificamos e corrigimos o problema. Era um índice do banco de dados. Por favor, teste novamente.",
      },
      {
        data: "2024-01-04T15:30:00",
        autor: "Ana Paula",
        tipo: "resposta",
        mensagem: "Testei e está funcionando normalmente agora. Obrigada!",
      },
      { data: "2024-01-04T16:00:00", autor: "Suporte", tipo: "status", mensagem: "Chamado encerrado com sucesso." },
    ],
  },
  {
    id: "SUP-2024-0005",
    tipo: "duvida",
    titulo: "Dúvida sobre cálculo de horas extras",
    modulo: "rh",
    status: "concluido",
    dataAbertura: "2024-01-02T11:00:00",
    ultimaAtualizacao: "2024-01-02T15:00:00",
    descricao: "Como o sistema calcula as horas extras? Está considerando o banco de horas?",
    anexos: [],
    historico: [
      {
        data: "2024-01-02T11:00:00",
        autor: "Marcos Pereira",
        tipo: "abertura",
        mensagem: "Chamado aberto pelo usuário.",
      },
      {
        data: "2024-01-02T14:00:00",
        autor: "Suporte",
        tipo: "resposta",
        mensagem:
          "O cálculo de HE considera primeiro o saldo de banco de horas. Se houver saldo positivo, as horas são compensadas. Caso contrário, são pagas como HE. Veja o manual em anexo.",
      },
      { data: "2024-01-02T15:00:00", autor: "Marcos Pereira", tipo: "resposta", mensagem: "Entendi, obrigado!" },
    ],
  },
]

// Atividades recentes para timeline
const atividadesRecentes = [
  {
    tipo: "resposta",
    titulo: "Resposta do suporte",
    descricao: "SUP-2024-0001 - Correção identificada",
    data: "09/01 14:20",
  },
  { tipo: "status", titulo: "Status alterado", descricao: "SUP-2024-0003 - Em desenvolvimento", data: "09/01 11:00" },
  { tipo: "abertura", titulo: "Novo chamado", descricao: "SUP-2024-0001 - Erro relatório", data: "08/01 10:30" },
  {
    tipo: "resposta",
    titulo: "Resposta do usuário",
    descricao: "SUP-2024-0002 - Aguardando info",
    data: "08/01 10:00",
  },
  {
    tipo: "concluido",
    titulo: "Chamado concluído",
    descricao: "SUP-2024-0004 - Lentidão corrigida",
    data: "04/01 16:00",
  },
  {
    tipo: "concluido",
    titulo: "Chamado concluído",
    descricao: "SUP-2024-0005 - Dúvida esclarecida",
    data: "02/01 15:00",
  },
]

export default function SuportePage() {
  const [activeTab, setActiveTab] = useState("chamados")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [busca, setBusca] = useState("")
  const [chamadoSelecionado, setChamadoSelecionado] = useState<(typeof chamadosExemplo)[0] | null>(null)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [novaResposta, setNovaResposta] = useState("")
  const [enviandoSolicitacao, setEnviandoSolicitacao] = useState(false)
  const [solicitacaoEnviada, setSolicitacaoEnviada] = useState(false)
  const [modalNovaSolicitacao, setModalNovaSolicitacao] = useState(false)

  // Form nova solicitacao
  const [formTipo, setFormTipo] = useState("")
  const [formModulo, setFormModulo] = useState("")
  const [formTitulo, setFormTitulo] = useState("")
  const [formDescricao, setFormDescricao] = useState("")
  const [formAnexos, setFormAnexos] = useState<File[]>([])

  // Filtragem de chamados
  const chamadosFiltrados = chamadosExemplo.filter((chamado) => {
    if (filtroStatus !== "todos" && chamado.status !== filtroStatus) return false
    if (filtroTipo !== "todos" && chamado.tipo !== filtroTipo) return false
    if (
      busca &&
      !chamado.titulo.toLowerCase().includes(busca.toLowerCase()) &&
      !chamado.id.toLowerCase().includes(busca.toLowerCase())
    )
      return false
    return true
  })

  // Contadores
  const contadores = {
    total: chamadosExemplo.length,
    abertos: chamadosExemplo.filter((c) => c.status === "aberto").length,
    emAndamento: chamadosExemplo.filter((c) => ["em_analise", "em_desenvolvimento", "em_validacao"].includes(c.status))
      .length,
    aguardando: chamadosExemplo.filter((c) => c.status === "aguardando_usuario").length,
    concluidos: chamadosExemplo.filter((c) => c.status === "concluido").length,
  }

  // Enviar nova solicitacao
  const handleEnviarSolicitacao = () => {
    setEnviandoSolicitacao(true)
    setTimeout(() => {
      setEnviandoSolicitacao(false)
      setSolicitacaoEnviada(true)
      setModalNovaSolicitacao(false)
      // Reset form
      setFormTipo("")
      setFormModulo("")
      setFormTitulo("")
      setFormDescricao("")
      setFormAnexos([])
    }, 1500)
  }

  // Abrir detalhes do chamado
  const handleVerDetalhes = (chamado: (typeof chamadosExemplo)[0]) => {
    setChamadoSelecionado(chamado)
    setModalDetalhes(true)
  }

  // Formatar data
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatarDataCurta = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-muted/30">
      {/* Header compacto */}
      <div className="h-14 border-b bg-card px-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-base font-semibold">Central de Suporte</h1>
          <p className="text-xs text-muted-foreground">Chamados, dúvidas e sugestões</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar chamados..."
              className="h-8 pl-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button size="sm" className="h-8" onClick={() => setModalNovaSolicitacao(true)}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Nova Solicitação
          </Button>
        </div>
      </div>

      {/* Barra de alertas - chamados aguardando */}
      {contadores.aguardando > 0 && (
        <div className="h-9 bg-amber-50 border-b border-amber-200 px-4 flex items-center gap-6 text-xs shrink-0">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span className="font-medium">{contadores.aguardando} chamado(s) aguardando sua resposta</span>
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-amber-800 underline"
              onClick={() => setFiltroStatus("aguardando_usuario")}
            >
              Ver chamados
            </Button>
          </div>
        </div>
      )}

      {/* Metricas compactas */}
      <div className="px-4 py-3 border-b bg-card shrink-0">
        <div className="grid grid-cols-5 gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
            <div>
              <div className="text-2xl font-bold">{contadores.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <Ticket className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
            <div>
              <div className="text-2xl font-bold text-blue-600">{contadores.abertos}</div>
              <div className="text-xs text-muted-foreground">Abertos</div>
            </div>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
            <div>
              <div className="text-2xl font-bold text-purple-600">{contadores.emAndamento}</div>
              <div className="text-xs text-muted-foreground">Em Andamento</div>
            </div>
            <Loader2 className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
            <div>
              <div className="text-2xl font-bold text-amber-600">{contadores.aguardando}</div>
              <div className="text-xs text-muted-foreground">Aguardando Você</div>
            </div>
            <AlertCircle className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
            <div>
              <div className="text-2xl font-bold text-green-600">{contadores.concluidos}</div>
              <div className="text-xs text-muted-foreground">Concluídos</div>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Area principal - 75% tabela / 25% timeline */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tabela de chamados - 75% */}
        <div className="flex-1 flex flex-col border-r">
          {/* Filtros inline */}
          <div className="h-12 border-b bg-card px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Ticket className="h-4 w-4" />
              Meus Chamados
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5">
                <Filter className="h-3 w-3" />
                Filtros
              </Button>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="h-7 w-[140px] text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="h-7 w-[140px] text-xs">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  {tiposSolicitacao.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5">
                <ArrowUpDown className="h-3 w-3" />
                Ordenar
              </Button>
            </div>
          </div>

          {/* Tabela */}
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[110px] text-xs">ID</TableHead>
                  <TableHead className="w-[90px] text-xs">Tipo</TableHead>
                  <TableHead className="text-xs">Título</TableHead>
                  <TableHead className="w-[110px] text-xs">Módulo</TableHead>
                  <TableHead className="w-[130px] text-xs">Status</TableHead>
                  <TableHead className="w-[90px] text-xs">Abertura</TableHead>
                  <TableHead className="w-[90px] text-xs">Atualização</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chamadosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum chamado encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  chamadosFiltrados.map((chamado) => {
                    const tipoInfo = tiposSolicitacao.find((t) => t.value === chamado.tipo)
                    const moduloInfo = modulos.find((m) => m.value === chamado.modulo)
                    const statusInfo = statusConfig[chamado.status]
                    const TipoIcon = tipoInfo?.icon || HelpCircle

                    return (
                      <TableRow
                        key={chamado.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleVerDetalhes(chamado)}
                      >
                        <TableCell className="font-mono text-xs py-2">{chamado.id}</TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1.5">
                            <TipoIcon className={`h-3.5 w-3.5 ${tipoInfo?.color}`} />
                            <span className="text-xs">{tipoInfo?.label.split(" ")[0]}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-sm py-2">{chamado.titulo}</TableCell>
                        <TableCell className="text-xs py-2">{moduloInfo?.label}</TableCell>
                        <TableCell className="py-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${statusInfo.color} ${statusInfo.bgColor} border-0`}
                          >
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-2">
                          {formatarDataCurta(chamado.dataAbertura)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-2">
                          {formatarDataCurta(chamado.ultimaAtualizacao)}
                        </TableCell>
                        <TableCell className="py-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleVerDetalhes(chamado)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Responder
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Timeline de atividade - 25% */}
        <div className="w-72 flex flex-col bg-card shrink-0">
          <div className="h-12 border-b px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MessageCircle className="h-4 w-4" />
              Atividade
            </div>
            <Button variant="link" className="h-auto p-0 text-xs">
              Ver mais <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-3">
              {atividadesRecentes.map((atividade, index) => (
                <div key={index} className="flex gap-3 text-xs">
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                      atividade.tipo === "concluido"
                        ? "bg-green-500"
                        : atividade.tipo === "resposta"
                          ? "bg-blue-500"
                          : atividade.tipo === "status"
                            ? "bg-purple-500"
                            : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{atividade.titulo}</div>
                    <div className="text-muted-foreground truncate">{atividade.descricao}</div>
                    <div className="text-muted-foreground/70 mt-0.5">{atividade.data}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Cards de acao rapida no rodape */}
      <div className="h-16 border-t bg-card px-4 flex items-center gap-3 shrink-0">
        <Card
          className="flex-1 h-12 flex items-center px-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setModalNovaSolicitacao(true)}
        >
          <Plus className="h-4 w-4 text-primary mr-3" />
          <div className="flex-1">
            <div className="text-sm font-medium">Nova Solicitação</div>
            <div className="text-xs text-muted-foreground">Abrir chamado</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Card>
        <Card
          className="flex-1 h-12 flex items-center px-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setFiltroStatus("aguardando_usuario")}
        >
          <AlertCircle className="h-4 w-4 text-amber-600 mr-3" />
          <div className="flex-1">
            <div className="text-sm font-medium">Aguardando Resposta</div>
            <div className="text-xs text-muted-foreground">{contadores.aguardando} chamado(s)</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Card>
        <Card
          className="flex-1 h-12 flex items-center px-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setFiltroStatus("em_analise")}
        >
          <Loader2 className="h-4 w-4 text-purple-600 mr-3" />
          <div className="flex-1">
            <div className="text-sm font-medium">Em Andamento</div>
            <div className="text-xs text-muted-foreground">{contadores.emAndamento} chamado(s)</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Card>
        <Card
          className="flex-1 h-12 flex items-center px-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setFiltroStatus("concluido")}
        >
          <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
          <div className="flex-1">
            <div className="text-sm font-medium">Concluídos</div>
            <div className="text-xs text-muted-foreground">{contadores.concluidos} chamado(s)</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Card>
      </div>

      {/* Modal Nova Solicitacao */}
      <Dialog open={modalNovaSolicitacao} onOpenChange={setModalNovaSolicitacao}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Solicitação</DialogTitle>
            <DialogDescription>Preencha os campos abaixo para abrir um novo chamado.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm">Tipo de solicitação *</Label>
              <Select value={formTipo} onValueChange={setFormTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposSolicitacao.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      <div className="flex items-center gap-2">
                        <tipo.icon className={`h-4 w-4 ${tipo.color}`} />
                        {tipo.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Módulo relacionado *</Label>
              <Select value={formModulo} onValueChange={setFormModulo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o módulo" />
                </SelectTrigger>
                <SelectContent>
                  {modulos.map((modulo) => (
                    <SelectItem key={modulo.value} value={modulo.value}>
                      <div className="flex items-center gap-2">
                        <modulo.icon className="h-4 w-4" />
                        {modulo.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Título *</Label>
              <Input
                placeholder="Descreva brevemente o problema ou dúvida"
                value={formTitulo}
                onChange={(e) => setFormTitulo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Descrição detalhada *</Label>
              <Textarea
                placeholder="Descreva com detalhes o problema, passos para reproduzir, etc."
                rows={4}
                value={formDescricao}
                onChange={(e) => setFormDescricao(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Anexos (opcional)</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <div className="text-sm text-muted-foreground">Arraste arquivos ou clique para selecionar</div>
                <div className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF até 10MB</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalNovaSolicitacao(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEnviarSolicitacao}
              disabled={!formTipo || !formModulo || !formTitulo || !formDescricao || enviandoSolicitacao}
            >
              {enviandoSolicitacao ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Solicitação
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Detalhes do Chamado */}
      <Dialog open={modalDetalhes} onOpenChange={setModalDetalhes}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          {chamadoSelecionado && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-muted-foreground">{chamadoSelecionado.id}</span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${statusConfig[chamadoSelecionado.status].color} ${statusConfig[chamadoSelecionado.status].bgColor} border-0`}
                      >
                        {statusConfig[chamadoSelecionado.status].label}
                      </Badge>
                    </div>
                    <DialogTitle className="text-lg">{chamadoSelecionado.titulo}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex-1 overflow-auto">
                <div className="space-y-4">
                  {/* Informacoes */}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Tipo</div>
                      <div className="font-medium">
                        {tiposSolicitacao.find((t) => t.value === chamadoSelecionado.tipo)?.label}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Módulo</div>
                      <div className="font-medium">
                        {modulos.find((m) => m.value === chamadoSelecionado.modulo)?.label}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Abertura</div>
                      <div className="font-medium">{formatarData(chamadoSelecionado.dataAbertura)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Última atualização</div>
                      <div className="font-medium">{formatarData(chamadoSelecionado.ultimaAtualizacao)}</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Descricao */}
                  <div>
                    <div className="text-sm font-medium mb-2">Descrição</div>
                    <p className="text-sm text-muted-foreground">{chamadoSelecionado.descricao}</p>
                  </div>

                  {/* Anexos */}
                  {chamadoSelecionado.anexos.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Anexos</div>
                      <div className="flex flex-wrap gap-2">
                        {chamadoSelecionado.anexos.map((anexo, index) => (
                          <div key={index} className="flex items-center gap-2 bg-muted rounded px-2 py-1 text-xs">
                            {anexo.tipo === "image" ? (
                              <ImageIcon className="h-3 w-3" />
                            ) : (
                              <FileText className="h-3 w-3" />
                            )}
                            {anexo.nome}
                            <span className="text-muted-foreground">({anexo.tamanho})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Historico */}
                  <div>
                    <div className="text-sm font-medium mb-3">Histórico de comunicação</div>
                    <div className="space-y-3">
                      {chamadoSelecionado.historico.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div
                            className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                              item.tipo === "abertura"
                                ? "bg-blue-500"
                                : item.tipo === "status"
                                  ? "bg-purple-500"
                                  : item.autor === "Suporte"
                                    ? "bg-green-500"
                                    : "bg-amber-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-medium">{item.autor}</span>
                              <span className="text-muted-foreground">{formatarData(item.data)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{item.mensagem}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Campo de resposta */}
                  {chamadoSelecionado.status !== "concluido" && chamadoSelecionado.status !== "recusado" && (
                    <>
                      <Separator />
                      <div>
                        <div className="text-sm font-medium mb-2">Adicionar resposta</div>
                        <Textarea
                          placeholder="Digite sua mensagem..."
                          rows={3}
                          value={novaResposta}
                          onChange={(e) => setNovaResposta(e.target.value)}
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm" disabled={!novaResposta.trim()}>
                            <Send className="h-3.5 w-3.5 mr-1.5" />
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
