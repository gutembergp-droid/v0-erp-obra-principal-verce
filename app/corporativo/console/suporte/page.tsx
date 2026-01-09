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
  ChevronRight,
  FileText,
  ImageIcon,
  X,
  Send,
  Building2,
  Package,
  DollarSign,
  Users,
  Briefcase,
  HelpCircle,
  Lightbulb,
  Bug,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  aberto: { label: "Aberto", color: "bg-blue-100 text-blue-800", icon: Clock },
  em_analise: { label: "Em análise", color: "bg-purple-100 text-purple-800", icon: Loader2 },
  aguardando_usuario: { label: "Aguardando usuário", color: "bg-amber-100 text-amber-800", icon: AlertCircle },
  em_desenvolvimento: { label: "Em desenvolvimento", color: "bg-indigo-100 text-indigo-800", icon: Loader2 },
  em_validacao: { label: "Em validação", color: "bg-cyan-100 text-cyan-800", icon: Eye },
  concluido: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  recusado: { label: "Recusado", color: "bg-red-100 text-red-800", icon: XCircle },
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
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Central de Suporte — ERP-GNESIS</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Utilize este canal para reportar problemas, tirar dúvidas ou sugerir melhorias. Todas as solicitações são
              registradas e acompanhadas até a conclusão.
            </p>
          </div>
          <Button
            onClick={() => {
              setActiveTab("nova")
              setSolicitacaoEnviada(false)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="chamados">Meus Chamados</TabsTrigger>
            <TabsTrigger value="nova">Nova Solicitação</TabsTrigger>
          </TabsList>

          {/* Tab: Meus Chamados */}
          <TabsContent value="chamados" className="space-y-4">
            {/* Resumo */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Card className="p-3">
                <div className="text-2xl font-bold">{contadores.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </Card>
              <Card className="p-3">
                <div className="text-2xl font-bold text-blue-600">{contadores.abertos}</div>
                <div className="text-xs text-muted-foreground">Abertos</div>
              </Card>
              <Card className="p-3">
                <div className="text-2xl font-bold text-purple-600">{contadores.emAndamento}</div>
                <div className="text-xs text-muted-foreground">Em Andamento</div>
              </Card>
              <Card className="p-3">
                <div className="text-2xl font-bold text-amber-600">{contadores.aguardando}</div>
                <div className="text-xs text-muted-foreground">Aguardando Você</div>
              </Card>
              <Card className="p-3">
                <div className="text-2xl font-bold text-green-600">{contadores.concluidos}</div>
                <div className="text-xs text-muted-foreground">Concluídos</div>
              </Card>
            </div>

            {/* Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por ID ou título..."
                        className="pl-9"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-[180px]">
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
                    <SelectTrigger className="w-[180px]">
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
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Chamados */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">ID</TableHead>
                    <TableHead className="w-[100px]">Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead className="w-[120px]">Módulo</TableHead>
                    <TableHead className="w-[140px]">Status</TableHead>
                    <TableHead className="w-[100px]">Abertura</TableHead>
                    <TableHead className="w-[100px]">Atualização</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chamadosFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Nenhum chamado encontrado com os filtros selecionados.
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
                          <TableCell className="font-mono text-xs">{chamado.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <TipoIcon className={`h-3.5 w-3.5 ${tipoInfo?.color}`} />
                              <span className="text-xs">{tipoInfo?.label.split(" ")[0]}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{chamado.titulo}</TableCell>
                          <TableCell className="text-sm">{moduloInfo?.label}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={`text-xs ${statusInfo.color}`}>
                              {statusInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatarDataCurta(chamado.dataAbertura)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatarDataCurta(chamado.ultimaAtualizacao)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
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
            </Card>
          </TabsContent>

          {/* Tab: Nova Solicitação */}
          <TabsContent value="nova">
            {solicitacaoEnviada ? (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Solicitação enviada com sucesso!</h3>
                  <p className="text-muted-foreground mb-6">
                    Um chamado foi aberto e você será notificado sobre cada atualização por e-mail e pelo sistema.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => setActiveTab("chamados")}>
                      Ver meus chamados
                    </Button>
                    <Button onClick={() => setSolicitacaoEnviada(false)}>Abrir nova solicitação</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Nova Solicitação</CardTitle>
                  <CardDescription>
                    Preencha os campos abaixo para abrir um chamado. Quanto mais detalhes, mais rápido poderemos ajudar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de solicitação *</Label>
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
                      <Label>Módulo relacionado *</Label>
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
                  </div>

                  <div className="space-y-2">
                    <Label>Título da solicitação *</Label>
                    <Input
                      placeholder="Descreva em poucas palavras o problema ou dúvida"
                      value={formTitulo}
                      onChange={(e) => setFormTitulo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Descrição detalhada *</Label>
                    <Textarea
                      placeholder="Descreva com detalhes o problema, dúvida ou sugestão. Inclua passos para reproduzir o erro, se aplicável."
                      className="min-h-[150px] resize-y"
                      value={formDescricao}
                      onChange={(e) => setFormDescricao(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Dica: Quanto mais detalhes, mais rápido poderemos ajudar.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Anexos</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Arraste arquivos aqui ou clique para selecionar</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Imagens, PDFs, prints de tela são aceitos (máx. 10MB cada)
                      </p>
                      <input type="file" multiple className="hidden" />
                    </div>
                    {formAnexos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formAnexos.map((file, idx) => (
                          <Badge key={idx} variant="secondary" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {file.name}
                            <button onClick={() => setFormAnexos(formAnexos.filter((_, i) => i !== idx))}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setActiveTab("chamados")}>
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
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Rodape */}
      <div className="border-t bg-muted/30 px-6 py-3">
        <p className="text-xs text-muted-foreground text-center">
          Este canal é exclusivo para usuários do ERP-GNESIS e garante controle, rastreabilidade e evolução do sistema.
        </p>
      </div>

      {/* Modal: Detalhes do Chamado */}
      <Dialog open={modalDetalhes} onOpenChange={setModalDetalhes}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          {chamadoSelecionado && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="flex items-center gap-2">
                      <span className="font-mono text-sm text-muted-foreground">{chamadoSelecionado.id}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <span>{chamadoSelecionado.titulo}</span>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-3 mt-2">
                      <Badge variant="secondary" className={statusConfig[chamadoSelecionado.status].color}>
                        {statusConfig[chamadoSelecionado.status].label}
                      </Badge>
                      <span className="text-xs">Aberto em {formatarData(chamadoSelecionado.dataAbertura)}</span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 py-4">
                  {/* Informacoes */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Informações</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tipo:</span>
                          <p className="font-medium">
                            {tiposSolicitacao.find((t) => t.value === chamadoSelecionado.tipo)?.label}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Módulo:</span>
                          <p className="font-medium">
                            {modulos.find((m) => m.value === chamadoSelecionado.modulo)?.label}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Última atualização:</span>
                          <p className="font-medium">{formatarData(chamadoSelecionado.ultimaAtualizacao)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Descricao original */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Descrição Original</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="text-sm">{chamadoSelecionado.descricao}</p>
                      {chamadoSelecionado.anexos.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <span className="text-xs text-muted-foreground">Anexos:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {chamadoSelecionado.anexos.map((anexo, idx) => (
                              <Badge key={idx} variant="outline" className="gap-1.5 cursor-pointer hover:bg-muted">
                                {anexo.tipo === "image" ? (
                                  <ImageIcon className="h-3 w-3" />
                                ) : (
                                  <FileText className="h-3 w-3" />
                                )}
                                {anexo.nome}
                                <span className="text-muted-foreground">({anexo.tamanho})</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Historico */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Histórico de Comunicação</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="space-y-4">
                        {chamadoSelecionado.historico.map((item, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">{item.autor}</span>
                                <span>•</span>
                                <span>{formatarData(item.data)}</span>
                                {item.tipo === "status" && (
                                  <Badge variant="outline" className="text-[10px] h-4">
                                    Alteração de status
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm mt-1">{item.mensagem}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Campo de resposta */}
                      {chamadoSelecionado.status !== "concluido" && chamadoSelecionado.status !== "recusado" && (
                        <div className="mt-4 pt-4 border-t">
                          <Label className="text-xs">Responder</Label>
                          <div className="flex gap-2 mt-2">
                            <Textarea
                              placeholder="Digite sua resposta..."
                              className="min-h-[60px] resize-none"
                              value={novaResposta}
                              onChange={(e) => setNovaResposta(e.target.value)}
                            />
                            <Button size="icon" className="flex-shrink-0" disabled={!novaResposta}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Toda a comunicação fica registrada neste chamado.
                          </p>
                        </div>
                      )}

                      {/* Mensagem de encerramento */}
                      {chamadoSelecionado.status === "concluido" && (
                        <div className="mt-4 pt-4 border-t bg-green-50 -mx-3 px-3 py-3 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="font-medium text-sm">Chamado encerrado</span>
                          </div>
                          <p className="text-xs text-green-700 mt-1">Caso precise, abra uma nova solicitação.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
