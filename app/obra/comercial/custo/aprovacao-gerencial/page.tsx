"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  ArrowLeft,
  Download,
  History,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  FileText,
  Send,
  RotateCcw,
  MessageSquare,
  Info,
  ExternalLink,
  Scale,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

const statusFluxo = [
  { id: "recebida", label: "Recebida", descricao: "Aguardando analise" },
  { id: "em_analise", label: "Em Analise", descricao: "Gerencia analisando" },
  { id: "aprovada", label: "Aprovada", descricao: "Enviada ao Financeiro" },
  { id: "devolvida", label: "Devolvida", descricao: "Retornou para Custos" },
]

// Dados mockados
const aprovacoesData = [
  {
    id: "APR-001",
    obra: "BR-101 LOTE 2",
    obraId: "obra-001",
    valorOrcado: 1850000,
    valorRealizado: 1920000,
    desvio: 70000,
    desvioPercent: 3.78,
    status: "pendente",
    statusFluxo: "recebida",
    enviadoEm: "2026-01-05",
    enviadoPor: "Maria Silva (Custos)",
    observacoesCustos: "Aumento de HE devido a aceleracao de cronograma",
    centrosCusto: 8,
    colaboradores: 285,
    previaFolhaId: "PF-001",
    analiseMoId: "AM-001",
    riscoJuridico: false,
    alertas: [],
  },
  {
    id: "APR-002",
    obra: "FERROVIA NORTE-SUL",
    obraId: "obra-002",
    valorOrcado: 2100000,
    valorRealizado: 2050000,
    desvio: -50000,
    desvioPercent: -2.38,
    status: "aprovado",
    statusFluxo: "aprovada",
    enviadoEm: "2026-01-03",
    enviadoPor: "Carlos Santos (Custos)",
    aprovadoEm: "2026-01-04",
    aprovadoPor: "Roberto Gerente",
    observacoesCustos: "Economia com reducao de terceirizados",
    centrosCusto: 12,
    colaboradores: 420,
    previaFolhaId: "PF-002",
    analiseMoId: "AM-002",
    riscoJuridico: false,
    alertas: [],
  },
  {
    id: "APR-003",
    obra: "METRO LINHA 6",
    obraId: "obra-003",
    valorOrcado: 3200000,
    valorRealizado: 3650000,
    desvio: 450000,
    desvioPercent: 14.06,
    status: "devolvido",
    statusFluxo: "devolvida",
    enviadoEm: "2026-01-02",
    enviadoPor: "Ana Costa (Custos)",
    devolvidoEm: "2026-01-03",
    devolvidoPor: "Roberto Gerente",
    motivoDevolucao: "Desvio acima de 10% requer justificativa detalhada por centro de custo",
    observacoesCustos: "Contratacao emergencial para atender prazo",
    centrosCusto: 15,
    colaboradores: 580,
    previaFolhaId: "PF-003",
    analiseMoId: "AM-003",
    riscoJuridico: true,
    alertas: ["HE recorrente detectada", "Passivo trabalhista potencial"],
  },
  {
    id: "APR-004",
    obra: "PORTO DE SANTOS",
    obraId: "obra-004",
    valorOrcado: 980000,
    valorRealizado: 1010000,
    desvio: 30000,
    desvioPercent: 3.06,
    status: "pendente",
    statusFluxo: "em_analise",
    enviadoEm: "2026-01-06",
    enviadoPor: "Pedro Lima (Custos)",
    observacoesCustos: "Ajuste de enquadramento salarial",
    centrosCusto: 5,
    colaboradores: 145,
    previaFolhaId: "PF-004",
    analiseMoId: "AM-004",
    riscoJuridico: false,
    alertas: ["Desvio de funcao identificado"],
  },
]

const historicoData = [
  {
    id: 1,
    data: "2026-01-06 14:30",
    usuario: "Pedro Lima",
    acao: "Enviado para aprovacao",
    detalhes: "Periodo: Janeiro/2026",
  },
  {
    id: 2,
    data: "2026-01-05 16:45",
    usuario: "Maria Silva",
    acao: "Enviado para aprovacao",
    detalhes: "Periodo: Janeiro/2026",
  },
  {
    id: 3,
    data: "2026-01-04 09:15",
    usuario: "Roberto Gerente",
    acao: "Aprovado",
    detalhes: "APR-002 - Ferrovia Norte-Sul",
  },
  {
    id: 4,
    data: "2026-01-03 11:20",
    usuario: "Roberto Gerente",
    acao: "Devolvido",
    detalhes: "APR-003 - Desvio acima do limite",
  },
]

function AprovacaoGerencialContent() {
  const [periodo, setPeriodo] = useState("2026-01")
  const [obraFilter, setObraFilter] = useState("todas")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedAprovacao, setSelectedAprovacao] = useState<(typeof aprovacoesData)[0] | null>(null)
  const [showAprovarDialog, setShowAprovarDialog] = useState(false)
  const [showDevolverDialog, setShowDevolverDialog] = useState(false)
  const [showObservacaoDialog, setShowObservacaoDialog] = useState(false)
  const [showHistoricoSheet, setShowHistoricoSheet] = useState(false)
  const [showDetalheSheet, setShowDetalheSheet] = useState(false)
  const [observacao, setObservacao] = useState("")
  const [motivoDevolucao, setMotivoDevolucao] = useState("")

  const filteredData = aprovacoesData.filter((item) => {
    if (statusFilter !== "todos" && item.status !== statusFilter) return false
    if (obraFilter !== "todas" && item.obraId !== obraFilter) return false
    return true
  })

  const totais = {
    pendentes: aprovacoesData.filter((a) => a.status === "pendente").length,
    aprovados: aprovacoesData.filter((a) => a.status === "aprovado").length,
    devolvidos: aprovacoesData.filter((a) => a.status === "devolvido").length,
    valorTotal: aprovacoesData.reduce((acc, a) => acc + a.valorRealizado, 0),
    desvioTotal: aprovacoesData.reduce((acc, a) => acc + a.desvio, 0),
    comRiscoJuridico: aprovacoesData.filter((a) => a.riscoJuridico).length,
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aprovado
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "devolvido":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Devolvido
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStepper = (currentStatus: string) => {
    const currentIndex = statusFluxo.findIndex((s) => s.id === currentStatus)
    return (
      <div className="flex items-center gap-1">
        {statusFluxo.map((step, index) => {
          const isActive = index === currentIndex
          const isCompleted = index < currentIndex
          const isDevolvida = currentStatus === "devolvida" && step.id === "devolvida"
          return (
            <div key={step.id} className="flex items-center">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      isDevolvida
                        ? "bg-red-500 text-white"
                        : isActive
                          ? "bg-amber-500 text-white"
                          : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.descricao}</p>
                </TooltipContent>
              </Tooltip>
              {index < statusFluxo.length - 1 && (
                <div className={`w-4 h-0.5 ${isCompleted ? "bg-green-500" : "bg-muted"}`} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const handleAprovar = () => {
    console.log("Aprovando:", selectedAprovacao?.id, "Observacao:", observacao)
    setShowAprovarDialog(false)
    setObservacao("")
    setSelectedAprovacao(null)
  }

  const handleDevolver = () => {
    console.log("Devolvendo:", selectedAprovacao?.id, "Motivo:", motivoDevolucao)
    setShowDevolverDialog(false)
    setMotivoDevolucao("")
    setSelectedAprovacao(null)
  }

  const handleRegistrarObservacao = () => {
    console.log("Observacao registrada:", selectedAprovacao?.id, observacao)
    setShowObservacaoDialog(false)
    setObservacao("")
    setSelectedAprovacao(null)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/obra/comercial/custo" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Custos
            </Link>
            <span>/</span>
            <span className="text-foreground">Aprovacao Gerencial</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Aprovacao Gerencial</h1>
              <p className="text-muted-foreground text-sm">
                Aprovacao final dos custos de mao de obra antes do envio ao Financeiro
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/obra/comercial/custo/analise-mo">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Origem: Analise MO
                    </Badge>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Ir para tela de Analise de MO (Custos)</TooltipContent>
              </Tooltip>
              {totais.comRiscoJuridico > 0 && (
                <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                  <Scale className="w-3 h-3 mr-1" />
                  {totais.comRiscoJuridico} com Risco Juridico
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowHistoricoSheet(true)}>
              <History className="w-4 h-4 mr-2" />
              Historico
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Periodo:</Label>
              <Input type="month" value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="w-40 h-9" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Obra:</Label>
              <Select value={obraFilter} onValueChange={setObraFilter}>
                <SelectTrigger className="w-48 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Obras</SelectItem>
                  <SelectItem value="obra-001">BR-101 LOTE 2</SelectItem>
                  <SelectItem value="obra-002">Ferrovia Norte-Sul</SelectItem>
                  <SelectItem value="obra-003">Metro Linha 6</SelectItem>
                  <SelectItem value="obra-004">Porto de Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="aprovado">Aprovados</SelectItem>
                  <SelectItem value="devolvido">Devolvidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>RH Consolida</span>
              </div>
              <div className="w-8 h-px bg-green-500" />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Custos Valida</span>
              </div>
              <div className="w-8 h-px bg-amber-500" />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-medium">Gerencia Aprova</span>
              </div>
              <div className="w-8 h-px bg-muted" />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>Financeiro</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            className="cursor-pointer hover:border-amber-500/50 transition-colors"
            onClick={() => setStatusFilter("pendente")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Pendentes de Aprovacao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">{totais.pendentes}</div>
              <p className="text-xs text-muted-foreground mt-1">Aguardando sua analise</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => setStatusFilter("aprovado")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Aprovados no Periodo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{totais.aprovados}</div>
              <p className="text-xs text-muted-foreground mt-1">Enviados ao Financeiro</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-red-500/50 transition-colors"
            onClick={() => setStatusFilter("devolvido")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Devolvidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{totais.devolvidos}</div>
              <p className="text-xs text-muted-foreground mt-1">Requerem ajustes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                {totais.desvioTotal >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-500" />
                )}
                Desvio Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totais.desvioTotal >= 0 ? "text-red-500" : "text-green-500"}`}>
                {formatCurrency(totais.desvioTotal)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Valor total: {formatCurrency(totais.valorTotal)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Governanca */}
        <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-500">Fluxo de Aprovacao</p>
            <p className="text-muted-foreground mt-1">
              RH Consolida → Custos Valida → <span className="font-medium text-foreground">Gerencia Aprova</span> →
              Financeiro Processa. Somente apos sua aprovacao os valores serao enviados ao Financeiro para pagamento.
            </p>
          </div>
        </div>

        {/* Tabela de Aprovacao */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Solicitacoes de Aprovacao</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Obra</TableHead>
                  <TableHead>Fluxo</TableHead>
                  <TableHead className="text-right">Valor Orcado</TableHead>
                  <TableHead className="text-right">Valor Realizado</TableHead>
                  <TableHead className="text-right">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 ml-auto">
                        Desvio
                        <Info className="w-3 h-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Desvios acima de 10% requerem justificativa detalhada</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead className="text-right">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.id}
                    className={
                      item.status === "devolvido"
                        ? "bg-red-500/5"
                        : item.desvioPercent > 10
                          ? "bg-amber-500/5"
                          : item.riscoJuridico
                            ? "bg-red-500/5"
                            : ""
                    }
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {item.obra}
                          {item.riscoJuridico && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Scale className="w-4 h-4 text-red-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-medium">Risco Juridico</p>
                                <ul className="text-xs mt-1">
                                  {item.alertas.map((a, i) => (
                                    <li key={i}>• {a}</li>
                                  ))}
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.centrosCusto} CC | {item.colaboradores} colab | {item.enviadoPor}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{renderStepper(item.statusFluxo)}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(item.valorOrcado)}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(item.valorRealizado)}</TableCell>
                    <TableCell className="text-right">
                      <div className={`font-mono font-medium ${item.desvio >= 0 ? "text-red-500" : "text-green-500"}`}>
                        {item.desvio >= 0 ? "+" : ""}
                        {formatCurrency(item.desvio)}
                        <span className="text-xs ml-1">
                          ({item.desvioPercent >= 0 ? "+" : ""}
                          {item.desvioPercent.toFixed(1)}%)
                        </span>
                      </div>
                      {Math.abs(item.desvioPercent) > 10 && (
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          <span className="text-xs text-amber-500">Desvio critico</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/obra/comercial/custo/analise-mo?id=${item.analiseMoId}`}
                              className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Analise MO
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>Ver analise de MO em Custos</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/obra/administrativo/rh/previa-folha?id=${item.previaFolhaId}`}
                              className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Previa Folha
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>Ver previa de folha no RH</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAprovacao(item)
                              setShowDetalheSheet(true)
                            }}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          {item.status === "pendente" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAprovacao(item)
                                  setShowAprovarDialog(true)
                                }}
                                className="text-green-500"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Aprovar e Enviar ao Financeiro
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAprovacao(item)
                                  setShowDevolverDialog(true)
                                }}
                                className="text-red-500"
                              >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Devolver para Custos
                              </DropdownMenuItem>
                            </>
                          )}
                          {item.status === "devolvido" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/obra/comercial/custo/analise-mo?id=${item.analiseMoId}`}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Acompanhar em Custos
                              </Link>
                            </DropdownMenuItem>
                          )}
                          {item.status === "aprovado" && (
                            <DropdownMenuItem asChild>
                              <Link href="/obra/administrativo/rh/consolidacao/recebimento">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Ver no Financeiro
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAprovacao(item)
                              setShowObservacaoDialog(true)
                            }}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Registrar Observacao
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

        {/* Dialog Aprovar */}
        <Dialog open={showAprovarDialog} onOpenChange={setShowAprovarDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Aprovar Custos de MO
              </DialogTitle>
              <DialogDescription>
                Ao aprovar, os valores serao enviados ao Financeiro para processamento.
              </DialogDescription>
            </DialogHeader>
            {selectedAprovacao && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Obra:</span>
                    <span className="font-medium">{selectedAprovacao.obra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valor Realizado:</span>
                    <span className="font-mono">{formatCurrency(selectedAprovacao.valorRealizado)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Desvio:</span>
                    <span className={`font-mono ${selectedAprovacao.desvio >= 0 ? "text-red-500" : "text-green-500"}`}>
                      {selectedAprovacao.desvio >= 0 ? "+" : ""}
                      {formatCurrency(selectedAprovacao.desvio)}
                    </span>
                  </div>
                </div>
                {selectedAprovacao.riscoJuridico && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <Scale className="w-4 h-4 text-red-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-red-500">Atencao: Risco Juridico Identificado</p>
                      <ul className="text-xs text-muted-foreground mt-1">
                        {selectedAprovacao.alertas.map((a, i) => (
                          <li key={i}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Observacao (opcional)</Label>
                  <Textarea
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Registre uma observacao sobre esta aprovacao..."
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAprovarDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAprovar} className="bg-green-500 hover:bg-green-600">
                <Send className="w-4 h-4 mr-2" />
                Aprovar e Enviar ao Financeiro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Devolver */}
        <Dialog open={showDevolverDialog} onOpenChange={setShowDevolverDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-500" />
                Devolver para Custos
              </DialogTitle>
              <DialogDescription>
                Informe o motivo da devolucao para que a equipe de Custos possa fazer os ajustes necessarios.
              </DialogDescription>
            </DialogHeader>
            {selectedAprovacao && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Obra:</span>
                    <span className="font-medium">{selectedAprovacao.obra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Desvio:</span>
                    <span className={`font-mono ${selectedAprovacao.desvio >= 0 ? "text-red-500" : "text-green-500"}`}>
                      {selectedAprovacao.desvio >= 0 ? "+" : ""}
                      {formatCurrency(selectedAprovacao.desvio)} ({selectedAprovacao.desvioPercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>
                    Motivo da Devolucao <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={motivoDevolucao}
                    onChange={(e) => setMotivoDevolucao(e.target.value)}
                    placeholder="Descreva o motivo da devolucao e quais ajustes sao necessarios..."
                    rows={4}
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDevolverDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleDevolver} variant="destructive" disabled={!motivoDevolucao.trim()}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Devolver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Observacao */}
        <Dialog open={showObservacaoDialog} onOpenChange={setShowObservacaoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Registrar Observacao
              </DialogTitle>
              <DialogDescription>A observacao sera registrada no historico da solicitacao.</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Observacao</Label>
              <Textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Digite sua observacao..."
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowObservacaoDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleRegistrarObservacao} disabled={!observacao.trim()}>
                Registrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sheet Detalhe */}
        <Sheet open={showDetalheSheet} onOpenChange={setShowDetalheSheet}>
          <SheetContent className="w-[600px] sm:max-w-[600px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Detalhes da Solicitacao
              </SheetTitle>
              <SheetDescription>{selectedAprovacao?.obra}</SheetDescription>
            </SheetHeader>
            {selectedAprovacao && (
              <div className="mt-6 space-y-6">
                {/* Status e Fluxo */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-3">Status do Fluxo</div>
                  <div className="flex justify-center">{renderStepper(selectedAprovacao.statusFluxo)}</div>
                </div>

                {/* Valores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Valor Orcado</div>
                    <div className="text-xl font-bold font-mono">{formatCurrency(selectedAprovacao.valorOrcado)}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Valor Realizado</div>
                    <div className="text-xl font-bold font-mono">
                      {formatCurrency(selectedAprovacao.valorRealizado)}
                    </div>
                  </div>
                </div>

                {/* Desvio */}
                <div
                  className={`p-4 rounded-lg ${selectedAprovacao.desvio >= 0 ? "bg-red-500/10" : "bg-green-500/10"}`}
                >
                  <div className="text-sm text-muted-foreground">Desvio</div>
                  <div
                    className={`text-2xl font-bold font-mono ${selectedAprovacao.desvio >= 0 ? "text-red-500" : "text-green-500"}`}
                  >
                    {selectedAprovacao.desvio >= 0 ? "+" : ""}
                    {formatCurrency(selectedAprovacao.desvio)} ({selectedAprovacao.desvioPercent.toFixed(1)}%)
                  </div>
                </div>

                {/* Risco Juridico */}
                {selectedAprovacao.riscoJuridico && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-red-500 font-medium">
                      <Scale className="w-4 h-4" />
                      Risco Juridico Identificado
                    </div>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      {selectedAprovacao.alertas.map((a, i) => (
                        <li key={i}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Observacoes de Custos */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-2">Observacoes de Custos</div>
                  <p className="text-sm text-muted-foreground">{selectedAprovacao.observacoesCustos}</p>
                </div>

                {/* Links de Origem */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Rastreabilidade</div>
                  <div className="flex gap-2">
                    <Link href={`/obra/comercial/custo/analise-mo?id=${selectedAprovacao.analiseMoId}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Analise MO
                      </Button>
                    </Link>
                    <Link href={`/obra/administrativo/rh/previa-folha?id=${selectedAprovacao.previaFolhaId}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Previa Folha
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Metadados */}
                <div className="text-xs text-muted-foreground border-t pt-4">
                  <div>Enviado por: {selectedAprovacao.enviadoPor}</div>
                  <div>Data: {selectedAprovacao.enviadoEm}</div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Sheet Historico */}
        <Sheet open={showHistoricoSheet} onOpenChange={setShowHistoricoSheet}>
          <SheetContent className="w-[500px] sm:max-w-[500px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Historico de Aprovacoes
              </SheetTitle>
              <SheetDescription>Registro de todas as acoes realizadas</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {historicoData.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.acao}</span>
                      <span className="text-xs text-muted-foreground">{item.data}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.detalhes}</p>
                    <p className="text-xs text-muted-foreground mt-1">Por: {item.usuario}</p>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}

export default function AprovacaoGerencialPage() {
  return (
    <Suspense fallback={null}>
      <AprovacaoGerencialContent />
    </Suspense>
  )
}
