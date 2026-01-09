"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  MoreHorizontal,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Wrench,
  Paperclip,
  Send,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Dados de exemplo - Meus Chamados
const meusChamados = [
  {
    id: "SUP-2024-0001",
    tipo: "suporte",
    titulo: "Erro ao gerar relatorio de medicao",
    modulo: "Comercial",
    status: "em_analise",
    abertura: "08/01/2024",
    atualizacao: "09/01/2024",
    descricao: "Ao tentar gerar o relatorio de medicao do periodo 12/2023, o sistema apresenta erro 500.",
    historico: [
      {
        data: "09/01/2024 14:30",
        autor: "Equipe Suporte",
        mensagem: "Estamos analisando o problema. Identificamos que o erro ocorre em medicoes com mais de 100 itens.",
      },
      {
        data: "08/01/2024 10:15",
        autor: "Voce",
        mensagem: "Erro ao gerar relatorio de medicao do periodo 12/2023. Sistema apresenta erro 500.",
      },
    ],
  },
  {
    id: "SUP-2024-0002",
    tipo: "duvida",
    titulo: "Como cadastrar fornecedor internacional?",
    modulo: "Suprimentos",
    status: "aguardando_usuario",
    abertura: "07/01/2024",
    atualizacao: "08/01/2024",
    descricao: "Preciso cadastrar um fornecedor da China mas nao encontro a opcao de CNPJ internacional.",
    historico: [
      {
        data: "08/01/2024 09:00",
        autor: "Equipe Suporte",
        mensagem:
          "Para fornecedores internacionais, voce deve selecionar 'Pessoa Juridica Estrangeira' no campo Tipo. Conseguiu localizar?",
      },
      {
        data: "07/01/2024 16:45",
        autor: "Voce",
        mensagem: "Preciso cadastrar um fornecedor da China mas nao encontro a opcao de CNPJ internacional.",
      },
    ],
  },
  {
    id: "SUP-2024-0003",
    tipo: "sugestao",
    titulo: "Adicionar filtro por periodo no RDO",
    modulo: "Obras",
    status: "em_desenvolvimento",
    abertura: "05/01/2024",
    atualizacao: "09/01/2024",
    descricao: "Seria muito util ter um filtro por periodo na listagem de RDOs para facilitar a busca.",
    historico: [
      {
        data: "09/01/2024 11:00",
        autor: "Equipe Suporte",
        mensagem: "Sua sugestao foi aprovada e esta em desenvolvimento. Previsao de entrega: versao 2.5.0",
      },
      {
        data: "06/01/2024 10:00",
        autor: "Equipe Suporte",
        mensagem: "Excelente sugestao! Vamos avaliar com a equipe de produto.",
      },
      {
        data: "05/01/2024 14:30",
        autor: "Voce",
        mensagem: "Seria muito util ter um filtro por periodo na listagem de RDOs.",
      },
    ],
  },
  {
    id: "SUP-2024-0004",
    tipo: "suporte",
    titulo: "Lentidao no modulo financeiro",
    modulo: "Financeiro",
    status: "concluido",
    abertura: "03/01/2024",
    atualizacao: "04/01/2024",
    descricao: "O modulo financeiro esta muito lento ao carregar a listagem de contas a pagar.",
    historico: [
      {
        data: "04/01/2024 16:00",
        autor: "Equipe Suporte",
        mensagem:
          "Problema resolvido. Otimizamos as consultas do banco de dados. Por favor, verifique se a performance melhorou.",
      },
      {
        data: "03/01/2024 09:00",
        autor: "Voce",
        mensagem: "O modulo financeiro esta muito lento ao carregar a listagem de contas a pagar.",
      },
    ],
  },
  {
    id: "SUP-2024-0005",
    tipo: "duvida",
    titulo: "Duvida sobre calculo de horas extras",
    modulo: "Recursos Humanos",
    status: "concluido",
    abertura: "02/01/2024",
    atualizacao: "02/01/2024",
    descricao: "Como o sistema calcula as horas extras acima de 50%?",
    historico: [
      {
        data: "02/01/2024 15:30",
        autor: "Equipe Suporte",
        mensagem:
          "O calculo segue a CLT: HE 50% para as 2 primeiras horas e HE 100% para horas subsequentes ou domingos/feriados. O sistema aplica automaticamente com base no registro de ponto.",
      },
      { data: "02/01/2024 14:00", autor: "Voce", mensagem: "Como o sistema calcula as horas extras acima de 50%?" },
    ],
  },
]

const tipoIcons: Record<string, any> = {
  suporte: Wrench,
  duvida: HelpCircle,
  sugestao: Lightbulb,
}

const tipoLabels: Record<string, string> = {
  suporte: "Suporte",
  duvida: "Duvida",
  sugestao: "Sugestao",
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  aberto: { label: "Aberto", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  em_analise: { label: "Em analise", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  aguardando_usuario: { label: "Aguardando voce", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  em_desenvolvimento: { label: "Em desenvolvimento", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  concluido: { label: "Concluido", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
}

export default function SuporteUsuarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [showNovoDialog, setShowNovoDialog] = useState(false)
  const [showDetalheDialog, setShowDetalheDialog] = useState(false)
  const [chamadoSelecionado, setChamadoSelecionado] = useState<(typeof meusChamados)[0] | null>(null)
  const [novaResposta, setNovaResposta] = useState("")
  const [novoChamado, setNovoChamado] = useState({
    tipo: "",
    modulo: "",
    titulo: "",
    descricao: "",
  })

  const chamadosFiltrados = meusChamados.filter((chamado) => {
    const matchSearch =
      chamado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chamado.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "todos" || chamado.status === statusFilter
    const matchTipo = tipoFilter === "todos" || chamado.tipo === tipoFilter
    return matchSearch && matchStatus && matchTipo
  })

  const metricas = {
    total: meusChamados.length,
    abertos: meusChamados.filter((c) => ["aberto", "em_analise", "em_desenvolvimento"].includes(c.status)).length,
    aguardando: meusChamados.filter((c) => c.status === "aguardando_usuario").length,
    concluidos: meusChamados.filter((c) => c.status === "concluido").length,
  }

  const abrirDetalhe = (chamado: (typeof meusChamados)[0]) => {
    setChamadoSelecionado(chamado)
    setShowDetalheDialog(true)
  }

  const enviarResposta = () => {
    if (novaResposta.trim() && chamadoSelecionado) {
      // Aqui enviaria a resposta
      setNovaResposta("")
    }
  }

  const criarChamado = () => {
    // Aqui criaria o chamado
    setShowNovoDialog(false)
    setNovoChamado({ tipo: "", modulo: "", titulo: "", descricao: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-8" />
              <div>
                <h1 className="text-xl font-semibold">Central de Suporte</h1>
                <p className="text-sm text-muted-foreground">Acompanhe suas solicitacoes e abra novos chamados</p>
              </div>
            </div>
            <Button onClick={() => setShowNovoDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Solicitacao
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{metricas.total}</p>
                <p className="text-sm text-muted-foreground">Total de Chamados</p>
              </div>
              <MessageSquare className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{metricas.abertos}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{metricas.aguardando}</p>
                <p className="text-sm text-muted-foreground">Aguardando Voce</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-600">{metricas.concluidos}</p>
                <p className="text-sm text-muted-foreground">Concluidos</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-200" />
            </div>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID ou titulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="aberto">Aberto</SelectItem>
                <SelectItem value="em_analise">Em analise</SelectItem>
                <SelectItem value="aguardando_usuario">Aguardando voce</SelectItem>
                <SelectItem value="em_desenvolvimento">Em desenvolvimento</SelectItem>
                <SelectItem value="concluido">Concluido</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="suporte">Suporte</SelectItem>
                <SelectItem value="duvida">Duvida</SelectItem>
                <SelectItem value="sugestao">Sugestao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Tabela de Chamados */}
        <Card>
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-base font-medium">Meus Chamados</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-32">ID</TableHead>
                  <TableHead className="w-28">Tipo</TableHead>
                  <TableHead>Titulo</TableHead>
                  <TableHead className="w-36">Modulo</TableHead>
                  <TableHead className="w-40">Status</TableHead>
                  <TableHead className="w-28">Abertura</TableHead>
                  <TableHead className="w-32">Atualizacao</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chamadosFiltrados.map((chamado) => {
                  const TipoIcon = tipoIcons[chamado.tipo]
                  const status = statusConfig[chamado.status]
                  return (
                    <TableRow
                      key={chamado.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => abrirDetalhe(chamado)}
                    >
                      <TableCell className="font-mono text-xs text-primary">{chamado.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TipoIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{tipoLabels[chamado.tipo]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{chamado.titulo}</TableCell>
                      <TableCell className="text-muted-foreground">{chamado.modulo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${status.bg} ${status.color} border`}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{chamado.abertura}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{chamado.atualizacao}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => abrirDetalhe(chamado)}>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Responder</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Rodape */}
        <div className="text-center text-xs text-muted-foreground py-4">
          Equipe de Suporte ERP-GNESIS • Horario de atendimento: Segunda a Sexta, 08h as 18h
        </div>
      </div>

      {/* Dialog Nova Solicitacao */}
      <Dialog open={showNovoDialog} onOpenChange={setShowNovoDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Solicitacao</DialogTitle>
            <DialogDescription>Preencha os dados abaixo para abrir um novo chamado</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={novoChamado.tipo} onValueChange={(v) => setNovoChamado({ ...novoChamado, tipo: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suporte">Suporte Tecnico</SelectItem>
                    <SelectItem value="duvida">Duvida</SelectItem>
                    <SelectItem value="sugestao">Sugestao de Melhoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Modulo</Label>
                <Select value={novoChamado.modulo} onValueChange={(v) => setNovoChamado({ ...novoChamado, modulo: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="suprimentos">Suprimentos</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                    <SelectItem value="obras">Obras</SelectItem>
                    <SelectItem value="producao">Producao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Titulo</Label>
              <Input
                placeholder="Descreva brevemente o problema ou duvida"
                value={novoChamado.titulo}
                onChange={(e) => setNovoChamado({ ...novoChamado, titulo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descricao detalhada</Label>
              <Textarea
                placeholder="Descreva com detalhes o que esta acontecendo, passos para reproduzir o problema, etc."
                value={novoChamado.descricao}
                onChange={(e) => setNovoChamado({ ...novoChamado, descricao: e.target.value })}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label>Anexos (opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Paperclip className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Arraste arquivos ou clique para selecionar</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF ate 10MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={criarChamado} disabled={!novoChamado.tipo || !novoChamado.modulo || !novoChamado.titulo}>
              Enviar Solicitacao
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Detalhe do Chamado */}
      <Dialog open={showDetalheDialog} onOpenChange={setShowDetalheDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          {chamadoSelecionado && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {chamadoSelecionado.id}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${statusConfig[chamadoSelecionado.status].bg} ${statusConfig[chamadoSelecionado.status].color}`}
                  >
                    {statusConfig[chamadoSelecionado.status].label}
                  </Badge>
                </div>
                <DialogTitle className="text-lg mt-2">{chamadoSelecionado.titulo}</DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-xs">
                  <span>Modulo: {chamadoSelecionado.modulo}</span>
                  <span>•</span>
                  <span>Aberto em: {chamadoSelecionado.abertura}</span>
                  <span>•</span>
                  <span>Atualizado: {chamadoSelecionado.atualizacao}</span>
                </DialogDescription>
              </DialogHeader>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Descricao Original</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {chamadoSelecionado.descricao}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Historico de Comunicacao</h4>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      {chamadoSelecionado.historico.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.autor === "Voce" ? "flex-row-reverse" : ""}`}>
                          <div className={`flex-1 ${msg.autor === "Voce" ? "text-right" : ""}`}>
                            <div
                              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                                msg.autor === "Voce" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.mensagem}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {msg.autor} • {msg.data}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {chamadoSelecionado.status !== "concluido" && (
                  <div className="space-y-2">
                    <Label>Sua Resposta</Label>
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={novaResposta}
                        onChange={(e) => setNovaResposta(e.target.value)}
                        rows={2}
                        className="flex-1"
                      />
                      <Button onClick={enviarResposta} disabled={!novaResposta.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
