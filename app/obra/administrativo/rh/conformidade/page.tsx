"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RHNav } from "@/components/rh/rh-nav"
import {
  ShieldCheck,
  FileText,
  Stethoscope,
  GraduationCap,
  Download,
  CheckCircle2,
  Scale,
  Search,
  RefreshCw,
  AlertTriangle,
  Lock,
  Eye,
  Upload,
  Gavel,
  Info,
  Ban,
  TrendingUp,
  ClipboardList,
  Send,
  Unlock,
  FileWarning,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - CONFORMIDADE UNIFICADA
// ============================================

const conformidadeMock = [
  {
    id: 1,
    colaborador: "Jose Silva Santos",
    matricula: "CLT-1001",
    tipo: "Documento",
    item: "CNH",
    obrigatorio: true,
    validade: "2026-01-15",
    status: "vencendo",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
    tipoRisco: "vencimento_proximo",
    planoAcao: null,
  },
  {
    id: 2,
    colaborador: "Jose Silva Santos",
    matricula: "CLT-1001",
    tipo: "ASO",
    item: "Periodico",
    obrigatorio: true,
    validade: "2026-07-15",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
    tipoRisco: null,
    planoAcao: null,
  },
  {
    id: 3,
    colaborador: "Jose Silva Santos",
    matricula: "CLT-1001",
    tipo: "NR",
    item: "NR-35 Trabalho em Altura",
    obrigatorio: true,
    validade: "2026-06-15",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
    tipoRisco: null,
    planoAcao: null,
  },
  {
    id: 4,
    colaborador: "Maria Aparecida Costa",
    matricula: "CLT-1002",
    tipo: "Documento",
    item: "CREA",
    obrigatorio: true,
    validade: "2027-06-20",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
    tipoRisco: null,
    planoAcao: null,
  },
  {
    id: 5,
    colaborador: "Roberto Alves Souza",
    matricula: "CLT-1003",
    tipo: "ASO",
    item: "Admissional",
    obrigatorio: true,
    validade: null,
    status: "pendente",
    impacto: "bloqueio_efetivacao",
    riscoJuridico: true,
    tipoRisco: "ausencia",
    planoAcao: { id: 1, status: "em_andamento", responsavel: "RH", prazo: "2026-01-20" },
  },
  {
    id: 6,
    colaborador: "Roberto Alves Souza",
    matricula: "CLT-1003",
    tipo: "NR",
    item: "NR-35 Trabalho em Altura",
    obrigatorio: true,
    validade: null,
    status: "pendente",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
    tipoRisco: "ausencia",
    planoAcao: null,
  },
  {
    id: 7,
    colaborador: "Paulo Mendes Junior",
    matricula: "CLT-1005",
    tipo: "ASO",
    item: "Periodico",
    obrigatorio: true,
    validade: "2026-01-10",
    status: "vencendo",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
    tipoRisco: "vencimento_proximo",
    planoAcao: null,
  },
  {
    id: 8,
    colaborador: "Paulo Mendes Junior",
    matricula: "CLT-1005",
    tipo: "NR",
    item: "NR-10 Eletricidade",
    obrigatorio: true,
    validade: "2026-02-01",
    status: "vencendo",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
    tipoRisco: "vencimento_proximo",
    planoAcao: null,
  },
  {
    id: 9,
    colaborador: "Ana Paula Lima",
    matricula: "CLT-1004",
    tipo: "Treinamento",
    item: "Integracao SSMA",
    obrigatorio: true,
    validade: "2027-01-05",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
    tipoRisco: null,
    planoAcao: null,
  },
  {
    id: 10,
    colaborador: "Carlos Eduardo Lima",
    matricula: "PJ-2001",
    tipo: "Documento",
    item: "Contrato PJ",
    obrigatorio: true,
    validade: "2025-12-31",
    status: "vencido",
    impacto: "bloqueio_pagamento",
    riscoJuridico: true,
    tipoRisco: "documento_vencido",
    planoAcao: { id: 2, status: "atrasado", responsavel: "Juridico", prazo: "2026-01-05" },
  },
]

// Historico de conformidade
const historicoConformidadeMock = [
  {
    data: "2026-01-08 14:30",
    evento: "Plano de Acao criado",
    item: "ASO Admissional",
    usuario: "Ana RH",
    detalhes: "Agendamento de exame para 15/01",
  },
  {
    data: "2026-01-05 09:15",
    evento: "Liberacao temporaria",
    item: "Contrato PJ",
    usuario: "Dr. Carlos (Juridico)",
    detalhes: "Liberado por 15 dias para regularizacao",
  },
  {
    data: "2025-12-31 23:59",
    evento: "Documento vencido",
    item: "Contrato PJ",
    usuario: "Sistema",
    detalhes: "Bloqueio de pagamento ativado automaticamente",
  },
  {
    data: "2025-12-20 10:00",
    evento: "Alerta de vencimento",
    item: "CNH",
    usuario: "Sistema",
    detalhes: "Notificacao enviada ao colaborador",
  },
  {
    data: "2025-11-01 08:30",
    evento: "ASO realizado",
    item: "Periodico",
    usuario: "Clinica SESMT",
    detalhes: "Documento anexado ao prontuario",
  },
]

// Planos de acao
const planosAcaoMock = [
  {
    id: 1,
    itemId: 5,
    titulo: "Regularizacao ASO Admissional",
    descricao: "Colaborador Roberto Alves - agendamento de exame admissional",
    responsavel: "Ana Santos (RH)",
    prazo: "2026-01-20",
    status: "em_andamento",
    tratativas: [
      { data: "2026-01-08 14:30", autor: "Ana Santos", mensagem: "Agendei exame para dia 15/01 na clinica SESMT" },
      { data: "2026-01-08 10:00", autor: "Sistema", mensagem: "Plano de acao criado automaticamente" },
    ],
  },
  {
    id: 2,
    itemId: 10,
    titulo: "Renovacao Contrato PJ",
    descricao: "Contrato PJ vencido - Carlos Eduardo Lima",
    responsavel: "Dr. Carlos (Juridico)",
    prazo: "2026-01-05",
    status: "atrasado",
    tratativas: [
      { data: "2026-01-05 09:15", autor: "Dr. Carlos", mensagem: "Liberacao temporaria concedida por 15 dias" },
      { data: "2026-01-03 16:00", autor: "Dr. Carlos", mensagem: "Aguardando retorno do fornecedor com novo contrato" },
      { data: "2025-12-31 08:00", autor: "Sistema", mensagem: "Plano de acao criado - documento vencido" },
    ],
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function ConformidadeContent() {
  const [busca, setBusca] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [detalheAberto, setDetalheAberto] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<(typeof conformidadeMock)[0] | null>(null)
  const [planoAcaoAberto, setPlanoAcaoAberto] = useState(false)
  const [planoSelecionado, setPlanoSelecionado] = useState<(typeof planosAcaoMock)[0] | null>(null)
  const [liberacaoAberta, setLiberacaoAberta] = useState(false)
  const [novoPlanoAberto, setNovoPlanoAberto] = useState(false)
  const [novaTratativa, setNovaTratativa] = useState("")

  // Contadores enriquecidos
  const totalItens = conformidadeMock.length
  const emConformidade = conformidadeMock.filter((c) => c.status === "valido").length
  const percConformidade = Math.round((emConformidade / totalItens) * 100)

  const pendencias = conformidadeMock.filter(
    (c) => c.status === "pendente" || c.status === "vencendo" || c.status === "vencido",
  )
  const pendenciasDoc = pendencias.filter((c) => c.tipo === "Documento").length
  const pendenciasASO = pendencias.filter((c) => c.tipo === "ASO").length
  const pendenciasNR = pendencias.filter((c) => c.tipo === "NR" || c.tipo === "Treinamento").length
  const bloqueiaOperacao = pendencias.filter((c) => c.impacto === "bloqueio_operacao").length
  const bloqueiaEfetivacao = pendencias.filter((c) => c.impacto === "bloqueio_efetivacao").length

  const sstPendente = conformidadeMock.filter((c) => (c.tipo === "ASO" || c.tipo === "NR") && c.status !== "valido")
  const sstVencendo30d = sstPendente.filter((c) => c.status === "vencendo").length
  const colaboradoresSST = new Set(sstPendente.map((c) => c.matricula)).size

  const riscoJuridico = conformidadeMock.filter((c) => c.riscoJuridico)
  const riscoVencido = riscoJuridico.filter((c) => c.tipoRisco === "documento_vencido").length
  const riscoAusencia = riscoJuridico.filter((c) => c.tipoRisco === "ausencia").length
  const riscoRecorrencia = riscoJuridico.filter((c) => c.tipoRisco === "recorrencia").length
  const bloqueiaPagamento = riscoJuridico.filter((c) => c.impacto === "bloqueio_pagamento").length

  const bloqueios = conformidadeMock.filter((c) => c.impacto)
  const bloqueiosOperacao = bloqueios.filter((c) => c.impacto === "bloqueio_operacao").length
  const bloqueiosEfetivacao = bloqueios.filter((c) => c.impacto === "bloqueio_efetivacao").length
  const bloqueiosPagamento = bloqueios.filter((c) => c.impacto === "bloqueio_pagamento").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Valido</Badge>
      case "vencendo":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Vencendo</Badge>
      case "pendente":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Pendente</Badge>
      case "vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getImpactoBadge = (impacto: string | null) => {
    if (!impacto) return null
    switch (impacto) {
      case "bloqueio_efetivacao":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs border-red-500/50 text-red-400 cursor-help">
                  <Lock className="h-3 w-3 mr-1" />
                  Efetivacao
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Colaborador nao pode ser efetivado ate regularizacao</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case "bloqueio_operacao":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-400 cursor-help">
                  <Ban className="h-3 w-3 mr-1" />
                  Operacao
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Colaborador impedido de operar em campo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case "bloqueio_pagamento":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-400 cursor-help">
                  <Lock className="h-3 w-3 mr-1" />
                  Pagamento
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pagamento bloqueado ate regularizacao documental</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      default:
        return null
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Documento":
        return (
          <Badge variant="outline" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            Documento
          </Badge>
        )
      case "ASO":
        return (
          <Badge variant="outline" className="text-xs">
            <Stethoscope className="h-3 w-3 mr-1" />
            ASO
          </Badge>
        )
      case "NR":
        return (
          <Badge variant="outline" className="text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            NR
          </Badge>
        )
      case "Treinamento":
        return (
          <Badge variant="outline" className="text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            Treinamento
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {tipo}
          </Badge>
        )
    }
  }

  const dadosFiltrados = conformidadeMock.filter((c) => {
    const matchBusca =
      c.colaborador.toLowerCase().includes(busca.toLowerCase()) ||
      c.matricula.includes(busca) ||
      c.item.toLowerCase().includes(busca.toLowerCase())
    const matchTipo = filtroTipo === "todos" || c.tipo.toLowerCase() === filtroTipo.toLowerCase()
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus
    return matchBusca && matchTipo && matchStatus
  })

  const abrirDetalhe = (item: (typeof conformidadeMock)[0]) => {
    setItemSelecionado(item)
    setDetalheAberto(true)
  }

  const abrirPlanoAcao = (item: (typeof conformidadeMock)[0]) => {
    const plano = planosAcaoMock.find((p) => p.itemId === item.id)
    if (plano) {
      setPlanoSelecionado(plano)
      setPlanoAcaoAberto(true)
    } else {
      setItemSelecionado(item)
      setNovoPlanoAberto(true)
    }
  }

  const abrirLiberacao = (item: (typeof conformidadeMock)[0]) => {
    setItemSelecionado(item)
    setLiberacaoAberta(true)
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Conformidade</h1>
              <p className="text-sm text-muted-foreground">Controle documental, SST e base para defesa juridica</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Relatorio Diligencia
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Card 1 - Em Conformidade */}
          <Card className="border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <Badge variant="outline" className="text-xs text-green-500 border-green-500/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2%
                </Badge>
              </div>
              <p className="text-2xl font-bold">{emConformidade}</p>
              <p className="text-xs text-muted-foreground">Em Conformidade</p>
              <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">% do efetivo</span>
                  <span className="font-medium text-green-500">{percConformidade}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Ultima verificacao</span>
                  <span>Hoje 08:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Pendencias */}
          <Card
            className="border-yellow-500/30 cursor-pointer hover:bg-yellow-500/5"
            onClick={() => setFiltroStatus("pendente")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <FileWarning className="h-5 w-5 text-yellow-500" />
                <span className="text-xs text-muted-foreground">{pendencias.length} itens</span>
              </div>
              <p className="text-2xl font-bold text-yellow-500">{pendencias.length}</p>
              <p className="text-xs text-muted-foreground">Pendencias</p>
              <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Documentos</span>
                  <span>{pendenciasDoc}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">ASO</span>
                  <span>{pendenciasASO}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">NR/Treinamento</span>
                  <span>{pendenciasNR}</span>
                </div>
                <div className="flex justify-between text-xs mt-2 pt-2 border-t border-border/30">
                  <span className="text-orange-400">Bloq. operacao</span>
                  <span className="text-orange-400 font-medium">{bloqueiaOperacao}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-red-400">Bloq. efetivacao</span>
                  <span className="text-red-400 font-medium">{bloqueiaEfetivacao}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 - SST Pendente */}
          <Card
            className="border-orange-500/30 cursor-pointer hover:bg-orange-500/5"
            onClick={() => setFiltroTipo("aso")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Stethoscope className="h-5 w-5 text-orange-500" />
                <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-500">
                  Risco Alto
                </Badge>
              </div>
              <p className="text-2xl font-bold text-orange-500">{sstPendente.length}</p>
              <p className="text-xs text-muted-foreground">SST Pendente</p>
              <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Colaboradores</span>
                  <span>{colaboradoresSST}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Vence em 30d</span>
                  <span className="text-yellow-500">{sstVencendo30d}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Tipos comuns</span>
                  <span>ASO, NR-35</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 - Risco Juridico */}
          <Card className="border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Scale className="h-5 w-5 text-red-500" />
                <Badge variant="outline" className="text-xs border-red-500/30 text-red-500">
                  Critico
                </Badge>
              </div>
              <p className="text-2xl font-bold text-red-500">{riscoJuridico.length}</p>
              <p className="text-xs text-muted-foreground">Risco Juridico</p>
              <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Doc. vencido</span>
                  <span className="text-red-400">{riscoVencido}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Ausencia</span>
                  <span className="text-red-400">{riscoAusencia}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Recorrencia</span>
                  <span>{riscoRecorrencia}</span>
                </div>
                <div className="flex justify-between text-xs mt-2 pt-2 border-t border-border/30">
                  <span className="text-purple-400">Bloq. pagamento</span>
                  <span className="text-purple-400 font-medium">{bloqueiaPagamento}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 5 - Bloqueios Ativos */}
          <Card className="border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Lock className="h-5 w-5 text-purple-500" />
                <span className="text-xs text-muted-foreground">~3 dias</span>
              </div>
              <p className="text-2xl font-bold text-purple-500">{bloqueios.length}</p>
              <p className="text-xs text-muted-foreground">Bloqueios Ativos</p>
              <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Operacao</span>
                  <span className="text-orange-400">{bloqueiosOperacao}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Efetivacao</span>
                  <span className="text-red-400">{bloqueiosEfetivacao}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Pagamento</span>
                  <span className="text-purple-400">{bloqueiosPagamento}</span>
                </div>
                <div className="flex justify-between text-xs mt-2 pt-2 border-t border-border/30">
                  <span className="text-muted-foreground">Tempo medio</span>
                  <span>3.2 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta Juridico */}
        {riscoJuridico.length > 0 && (
          <Alert className="border-orange-500/50 bg-orange-500/10">
            <Gavel className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-300">
              <strong>{riscoJuridico.length} item(ns)</strong> com risco juridico identificado. Documentos vencidos ou
              ausentes podem gerar passivo trabalhista e multas.
            </AlertDescription>
          </Alert>
        )}

        {/* Tabela Principal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Tabela de Conformidade</CardTitle>
                <CardDescription>Visao unificada de todos os requisitos - base de defesa juridica</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="documento">Documento</SelectItem>
                    <SelectItem value="aso">ASO</SelectItem>
                    <SelectItem value="nr">NR</SelectItem>
                    <SelectItem value="treinamento">Treinamento</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="valido">Valido</SelectItem>
                    <SelectItem value="vencendo">Vencendo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBusca("")
                    setFiltroTipo("todos")
                    setFiltroStatus("todos")
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Obrig.</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impacto</TableHead>
                  <TableHead className="text-center">Jurid.</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosFiltrados.map((c) => (
                  <TableRow
                    key={c.id}
                    className={c.status === "vencido" || c.status === "pendente" ? "bg-red-500/5" : ""}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.colaborador}</span>
                        {c.riscoJuridico && <Scale className="h-4 w-4 text-red-500" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{c.matricula}</span>
                    </TableCell>
                    <TableCell>{getTipoBadge(c.tipo)}</TableCell>
                    <TableCell className="font-medium">{c.item}</TableCell>
                    <TableCell className="text-center">
                      {c.obrigatorio ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{c.validade || <span className="text-muted-foreground">-</span>}</TableCell>
                    <TableCell>{getStatusBadge(c.status)}</TableCell>
                    <TableCell>{getImpactoBadge(c.impacto)}</TableCell>
                    <TableCell className="text-center">
                      {c.riscoJuridico && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertTriangle className="h-4 w-4 text-orange-500 mx-auto cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Risco: {c.tipoRisco?.replace("_", " ")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => abrirDetalhe(c)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Ver detalhes</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {c.status !== "valido" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => abrirPlanoAcao(c)}
                                >
                                  <ClipboardList className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {c.planoAcao ? "Ver Plano de Acao" : "Abrir Plano de Acao"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {c.impacto && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-yellow-500"
                                  onClick={() => abrirLiberacao(c)}
                                >
                                  <Unlock className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Solicitar Liberacao</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {(c.status === "pendente" || c.status === "vencido") && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Anexar documento</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Card Informativo */}
        <Card className="border-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Regras de Bloqueio:</strong> Documento vencido = alerta juridico. Documento obrigatorio
                  ausente = bloqueio automatico.
                </p>
                <p>
                  <strong>Liberacoes:</strong> RH libera efetivacao | SST libera operacao | Juridico libera pagamento
                </p>
                <p>
                  <strong>Rastreabilidade:</strong> Historico nunca e apagado. Tudo e versionado e auditavel para fins
                  de defesa trabalhista.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet de Detalhe */}
      <Sheet open={detalheAberto} onOpenChange={setDetalheAberto}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {itemSelecionado?.item}
              {itemSelecionado?.riscoJuridico && <Scale className="h-5 w-5 text-red-500" />}
            </SheetTitle>
            <SheetDescription>
              {itemSelecionado?.colaborador} - {itemSelecionado?.matricula}
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="detalhes" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="historico">Historico</TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <div className="mt-1">{getTipoBadge(itemSelecionado?.tipo || "")}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(itemSelecionado?.status || "")}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Validade</p>
                    <p className="font-medium mt-1">{itemSelecionado?.validade || "Nao informado"}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Impacto</p>
                    <div className="mt-1">
                      {getImpactoBadge(itemSelecionado?.impacto || null) || (
                        <span className="text-muted-foreground">Nenhum</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {itemSelecionado?.planoAcao && (
                <Card className="border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Plano de Acao</p>
                        <Badge
                          className={
                            itemSelecionado.planoAcao.status === "atrasado"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }
                        >
                          {itemSelecionado.planoAcao.status === "em_andamento" ? "Em Andamento" : "Atrasado"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => abrirPlanoAcao(itemSelecionado)}>
                        <ClipboardList className="h-4 w-4 mr-2" />
                        Ver Plano
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <div className="space-y-3">
                {historicoConformidadeMock.map((h, i) => (
                  <div key={i} className="flex gap-3 text-sm border-l-2 border-muted pl-4 py-2">
                    <div className="flex-1">
                      <p className="font-medium">{h.evento}</p>
                      <p className="text-muted-foreground">{h.item}</p>
                      <p className="text-xs text-muted-foreground mt-1">{h.detalhes}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{h.data}</p>
                      <p>{h.usuario}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <Dialog open={planoAcaoAberto} onOpenChange={setPlanoAcaoAberto}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Plano de Acao
            </DialogTitle>
            <DialogDescription>{planoSelecionado?.titulo}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground">Responsavel</p>
                  <p className="font-medium text-sm">{planoSelecionado?.responsavel}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground">Prazo</p>
                  <p className="font-medium text-sm">{planoSelecionado?.prazo}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge
                    className={
                      planoSelecionado?.status === "atrasado"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }
                  >
                    {planoSelecionado?.status === "em_andamento" ? "Em Andamento" : "Atrasado"}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tratativas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {planoSelecionado?.tratativas.map((t, i) => (
                  <div key={i} className="flex gap-3 text-sm border-l-2 border-primary/50 pl-3 py-1">
                    <div className="flex-1">
                      <p className="font-medium">{t.autor}</p>
                      <p className="text-muted-foreground">{t.mensagem}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{t.data}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Textarea
                placeholder="Adicionar tratativa..."
                value={novaTratativa}
                onChange={(e) => setNovaTratativa(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" disabled={!novaTratativa.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanoAcaoAberto(false)}>
              Fechar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Concluir Plano
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={novoPlanoAberto} onOpenChange={setNovoPlanoAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir Plano de Acao</DialogTitle>
            <DialogDescription>
              Registrar nao conformidade e acoes corretivas para {itemSelecionado?.item}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Descricao da Nao Conformidade</Label>
              <Textarea placeholder="Descreva a situacao e o motivo da pendencia..." className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Responsavel</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rh">Ana Santos (RH)</SelectItem>
                    <SelectItem value="sst">Carlos Lima (SST)</SelectItem>
                    <SelectItem value="juridico">Dr. Pedro (Juridico)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prazo</Label>
                <Input type="date" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Primeira Tratativa</Label>
              <Textarea placeholder="Descreva a acao a ser tomada..." className="mt-1" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNovoPlanoAberto(false)}>
              Cancelar
            </Button>
            <Button>
              <ClipboardList className="h-4 w-4 mr-2" />
              Criar Plano
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={liberacaoAberta} onOpenChange={setLiberacaoAberta}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Unlock className="h-5 w-5 text-yellow-500" />
              Solicitar Liberacao
            </DialogTitle>
            <DialogDescription>
              Liberacao temporaria para {itemSelecionado?.colaborador} - {itemSelecionado?.item}
            </DialogDescription>
          </DialogHeader>

          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-300 text-sm">
              Liberacoes sao registradas no historico e podem ser auditadas. Use apenas em casos excepcionais.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label>Tipo de Bloqueio</Label>
              <p className="text-sm font-medium mt-1">
                {itemSelecionado?.impacto === "bloqueio_operacao" && "Bloqueio de Operacao (requer SST)"}
                {itemSelecionado?.impacto === "bloqueio_efetivacao" && "Bloqueio de Efetivacao (requer RH)"}
                {itemSelecionado?.impacto === "bloqueio_pagamento" && "Bloqueio de Pagamento (requer Juridico)"}
              </p>
            </div>
            <div>
              <Label>Aprovador Necessario</Label>
              <p className="text-sm font-medium mt-1">
                {itemSelecionado?.impacto === "bloqueio_operacao" && "Coordenador SST"}
                {itemSelecionado?.impacto === "bloqueio_efetivacao" && "Gerente RH"}
                {itemSelecionado?.impacto === "bloqueio_pagamento" && "Gerente Juridico"}
              </p>
            </div>
            <div>
              <Label>Prazo da Liberacao</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="15">15 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Justificativa (obrigatorio)</Label>
              <Textarea placeholder="Explique o motivo da liberacao temporaria..." className="mt-1" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLiberacaoAberta(false)}>
              Cancelar
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Send className="h-4 w-4 mr-2" />
              Enviar Solicitacao
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ConformidadePage() {
  return (
    <Suspense fallback={null}>
      <ConformidadeContent />
    </Suspense>
  )
}
