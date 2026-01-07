"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scale,
  FileCheck,
  GitBranch,
  History,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react"

// Mock data - Tipos de Evento
const tiposEventoMock = [
  {
    id: 1,
    codigo: "EVT-COMPRA",
    nome: "Solicitacao de Compra",
    modulo: "Suprimentos",
    descricao: "Compra de materiais e servicos",
    status: "ativo",
    regras: 4,
  },
  {
    id: 2,
    codigo: "EVT-CONTRATO",
    nome: "Contrato",
    modulo: "Comercial",
    descricao: "Assinatura e aditivos de contratos",
    status: "ativo",
    regras: 5,
  },
  {
    id: 3,
    codigo: "EVT-PAGAMENTO",
    nome: "Pagamento",
    modulo: "Financeiro",
    descricao: "Autorizacao de pagamentos",
    status: "ativo",
    regras: 4,
  },
  {
    id: 4,
    codigo: "EVT-MEDICAO",
    nome: "Medicao",
    modulo: "Producao",
    descricao: "Aprovacao de medicoes de servico",
    status: "ativo",
    regras: 3,
  },
  {
    id: 5,
    codigo: "EVT-CHANGE",
    nome: "Change Control",
    modulo: "Planejamento",
    descricao: "Alteracoes de escopo e cronograma",
    status: "ativo",
    regras: 5,
  },
  {
    id: 6,
    codigo: "EVT-RH",
    nome: "Movimentacao RH",
    modulo: "RH",
    descricao: "Admissoes, demissoes e promocoes",
    status: "ativo",
    regras: 3,
  },
  {
    id: 7,
    codigo: "EVT-DESVIO",
    nome: "Desvio de Custo",
    modulo: "Comercial",
    descricao: "Aprovacao de desvios orcamentarios",
    status: "ativo",
    regras: 4,
  },
]

// Mock data - Regras de Alcada
const regrasAlcadaMock = [
  {
    id: 1,
    evento: "Solicitacao de Compra",
    faixaMin: 0,
    faixaMax: 10000,
    perfil: "Coordenador",
    qtdAprovacoes: 1,
    prazoSLA: 24,
  },
  {
    id: 2,
    evento: "Solicitacao de Compra",
    faixaMin: 10001,
    faixaMax: 50000,
    perfil: "Gerente de Obra",
    qtdAprovacoes: 1,
    prazoSLA: 48,
  },
  {
    id: 3,
    evento: "Solicitacao de Compra",
    faixaMin: 50001,
    faixaMax: 200000,
    perfil: "Diretor",
    qtdAprovacoes: 2,
    prazoSLA: 72,
  },
  {
    id: 4,
    evento: "Solicitacao de Compra",
    faixaMin: 200001,
    faixaMax: 999999999,
    perfil: "Superintendente",
    qtdAprovacoes: 2,
    prazoSLA: 96,
  },
  {
    id: 5,
    evento: "Pagamento",
    faixaMin: 0,
    faixaMax: 50000,
    perfil: "Gerente Financeiro",
    qtdAprovacoes: 1,
    prazoSLA: 24,
  },
  { id: 6, evento: "Pagamento", faixaMin: 50001, faixaMax: 500000, perfil: "Diretor", qtdAprovacoes: 2, prazoSLA: 48 },
  {
    id: 7,
    evento: "Pagamento",
    faixaMin: 500001,
    faixaMax: 999999999,
    perfil: "Superintendente",
    qtdAprovacoes: 3,
    prazoSLA: 72,
  },
  {
    id: 8,
    evento: "Contrato",
    faixaMin: 0,
    faixaMax: 100000,
    perfil: "Gerente Comercial",
    qtdAprovacoes: 1,
    prazoSLA: 48,
  },
  { id: 9, evento: "Contrato", faixaMin: 100001, faixaMax: 1000000, perfil: "Diretor", qtdAprovacoes: 2, prazoSLA: 72 },
  {
    id: 10,
    evento: "Contrato",
    faixaMin: 1000001,
    faixaMax: 999999999,
    perfil: "Superintendente + Diretoria",
    qtdAprovacoes: 3,
    prazoSLA: 120,
  },
]

// Mock data - Fluxos
const fluxosMock = [
  {
    id: 1,
    nome: "Compra Padrao",
    evento: "Solicitacao de Compra",
    etapas: [
      { ordem: 1, nome: "Solicitacao", responsavel: "Solicitante", acao: "Criar" },
      { ordem: 2, nome: "Validacao Tecnica", responsavel: "Coordenador", acao: "Aprovar/Rejeitar" },
      { ordem: 3, nome: "Aprovacao Alcada", responsavel: "Conforme valor", acao: "Aprovar/Rejeitar" },
      { ordem: 4, nome: "Processamento", responsavel: "Compras", acao: "Executar" },
    ],
    status: "ativo",
  },
  {
    id: 2,
    nome: "Pagamento Padrao",
    evento: "Pagamento",
    etapas: [
      { ordem: 1, nome: "Lancamento NF", responsavel: "Fiscal", acao: "Criar" },
      { ordem: 2, nome: "Validacao Fiscal", responsavel: "Coordenador Fiscal", acao: "Aprovar/Rejeitar" },
      { ordem: 3, nome: "Aprovacao Alcada", responsavel: "Conforme valor", acao: "Aprovar/Rejeitar" },
      { ordem: 4, nome: "Pagamento", responsavel: "Tesouraria", acao: "Executar" },
    ],
    status: "ativo",
  },
  {
    id: 3,
    nome: "Change Control",
    evento: "Change Control",
    etapas: [
      { ordem: 1, nome: "Solicitacao", responsavel: "Engenheiro", acao: "Criar" },
      { ordem: 2, nome: "Analise Tecnica", responsavel: "Planejamento", acao: "Analisar" },
      { ordem: 3, nome: "Analise de Impacto", responsavel: "Comercial", acao: "Analisar" },
      { ordem: 4, nome: "Comite de Aprovacao", responsavel: "Gerencia + Diretoria", acao: "Aprovar/Rejeitar" },
      { ordem: 5, nome: "Implementacao", responsavel: "Producao", acao: "Executar" },
    ],
    status: "ativo",
  },
]

// Mock data - Historico
const historicoMock = [
  {
    id: 1,
    evento: "Solicitacao de Compra",
    documento: "SC-2026-0145",
    valor: 85000,
    solicitante: "Pedro Santos",
    status: "aprovado",
    dataInicio: "05/01/2026 09:00",
    dataFim: "06/01/2026 14:30",
    tempoTotal: "29h 30min",
  },
  {
    id: 2,
    evento: "Pagamento",
    documento: "PAG-2026-0089",
    valor: 250000,
    solicitante: "Maria Oliveira",
    status: "aprovado",
    dataInicio: "04/01/2026 10:00",
    dataFim: "06/01/2026 11:00",
    tempoTotal: "49h",
  },
  {
    id: 3,
    evento: "Contrato",
    documento: "CTR-2026-0012",
    valor: 1500000,
    solicitante: "Ana Souza",
    status: "pendente",
    dataInicio: "06/01/2026 16:00",
    dataFim: "-",
    tempoTotal: "39h (em andamento)",
  },
  {
    id: 4,
    evento: "Change Control",
    documento: "CC-2026-0008",
    valor: 450000,
    solicitante: "Carlos Silva",
    status: "rejeitado",
    dataInicio: "03/01/2026 08:00",
    dataFim: "05/01/2026 17:00",
    tempoTotal: "57h",
  },
  {
    id: 5,
    evento: "Medicao",
    documento: "MED-2026-0034",
    valor: 380000,
    solicitante: "Jose Pereira",
    status: "aprovado",
    dataInicio: "05/01/2026 14:00",
    dataFim: "06/01/2026 09:00",
    tempoTotal: "19h",
  },
]

function AlcadasContent() {
  const [abaAtiva, setAbaAtiva] = useState("eventos")
  const [filtroEvento, setFiltroEvento] = useState("todos")

  const totalEventos = tiposEventoMock.length
  const totalRegras = regrasAlcadaMock.length
  const totalFluxos = fluxosMock.length
  const aprovacoesPendentes = historicoMock.filter((h) => h.status === "pendente").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Ativo</Badge>
      case "aprovado":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aprovado
          </Badge>
        )
      case "rejeitado":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejeitado
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 999999999) return "Sem limite"
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alcadas & Governanca</h1>
            <p className="text-sm text-muted-foreground">CO-EST-03 - Regras de aprovacao e fluxos de trabalho</p>
          </div>
          <InfoTooltip
            title="Alcadas & Governanca"
            description="Configuracao de alcadas de aprovacao, fluxos de trabalho e regras de governanca corporativa."
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tipos de Evento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{totalEventos}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Regras de Alcada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{totalRegras}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fluxos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">{totalFluxos}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aprovacoes Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold">{aprovacoesPendentes}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="eventos" className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" /> Tipos de Evento
          </TabsTrigger>
          <TabsTrigger value="regras" className="flex items-center gap-2">
            <Scale className="w-4 h-4" /> Regras de Alcada
          </TabsTrigger>
          <TabsTrigger value="fluxos" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" /> Fluxos
          </TabsTrigger>
          <TabsTrigger value="historico" className="flex items-center gap-2">
            <History className="w-4 h-4" /> Historico
          </TabsTrigger>
        </TabsList>

        {/* Tab Eventos */}
        <TabsContent value="eventos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tipos de Evento</CardTitle>
                  <CardDescription>Eventos que requerem aprovacao por alcada</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Novo Evento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Modulo</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead className="text-center">Regras</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiposEventoMock.map((evento) => (
                    <TableRow key={evento.id}>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{evento.codigo}</code>
                      </TableCell>
                      <TableCell className="font-medium">{evento.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{evento.modulo}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{evento.descricao}</TableCell>
                      <TableCell className="text-center">{evento.regras}</TableCell>
                      <TableCell>{getStatusBadge(evento.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Regras */}
        <TabsContent value="regras" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Regras de Alcada</CardTitle>
                  <CardDescription>Faixas de valor e perfis aprovadores</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={filtroEvento} onValueChange={setFiltroEvento}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os eventos</SelectItem>
                      {tiposEventoMock.map((e) => (
                        <SelectItem key={e.id} value={e.nome}>
                          {e.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> Nova Regra
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Faixa Minima</TableHead>
                    <TableHead>Faixa Maxima</TableHead>
                    <TableHead>Perfil Aprovador</TableHead>
                    <TableHead className="text-center">Qtd. Aprovacoes</TableHead>
                    <TableHead className="text-center">SLA (horas)</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regrasAlcadaMock
                    .filter((r) => filtroEvento === "todos" || r.evento === filtroEvento)
                    .map((regra) => (
                      <TableRow key={regra.id}>
                        <TableCell className="font-medium">{regra.evento}</TableCell>
                        <TableCell>{formatCurrency(regra.faixaMin)}</TableCell>
                        <TableCell>{formatCurrency(regra.faixaMax)}</TableCell>
                        <TableCell>{regra.perfil}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{regra.qtdAprovacoes}x</Badge>
                        </TableCell>
                        <TableCell className="text-center">{regra.prazoSLA}h</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Fluxos */}
        <TabsContent value="fluxos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fluxos de Trabalho</CardTitle>
                  <CardDescription>Sequencia de etapas para cada tipo de evento</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Novo Fluxo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {fluxosMock.map((fluxo) => (
                <Card key={fluxo.id} className="bg-muted/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{fluxo.nome}</CardTitle>
                        <Badge variant="outline">{fluxo.evento}</Badge>
                        {getStatusBadge(fluxo.status)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {fluxo.etapas.map((etapa, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex flex-col items-center min-w-[140px] p-3 bg-background rounded-lg border">
                            <Badge variant="secondary" className="mb-2">
                              {etapa.ordem}
                            </Badge>
                            <span className="font-medium text-sm text-center">{etapa.nome}</span>
                            <span className="text-xs text-muted-foreground text-center">{etapa.responsavel}</span>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {etapa.acao}
                            </Badge>
                          </div>
                          {i < fluxo.etapas.length - 1 && (
                            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Historico */}
        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historico de Aprovacoes</CardTitle>
                  <CardDescription>Registro de eventos submetidos a aprovacao</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Buscar documento..." className="pl-9 w-64" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Inicio</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>Tempo Total</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoMock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.evento}</TableCell>
                      <TableCell className="font-medium">{item.documento}</TableCell>
                      <TableCell>{formatCurrency(item.valor)}</TableCell>
                      <TableCell>{item.solicitante}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.dataInicio}</TableCell>
                      <TableCell>{item.dataFim}</TableCell>
                      <TableCell>{item.tempoTotal}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AlcadasPage() {
  return (
    <Suspense fallback={null}>
      <AlcadasContent />
    </Suspense>
  )
}
