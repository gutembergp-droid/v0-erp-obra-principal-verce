"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  AlertTriangle,
  Users,
  FileText,
  Send,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

// Status do fluxo
type StatusFluxo = "consolidado" | "aguardando" | "em_analise" | "validado" | "aprovado" | "em_pagamento" | "pago"

// Mock dados do período
const periodoMock = {
  competencia: "Julho/2026",
  obra: "OBRA ALPHA",
  statusRH: "consolidado" as StatusFluxo,
  statusCustos: "aguardando" as StatusFluxo,
  statusGerencia: "aguardando" as StatusFluxo,
  statusFinanceiro: "aguardando" as StatusFluxo,
  bloqueado: true,
  versao: 1,
  consolidadoEm: "2026-07-25T14:30:00",
  consolidadoPor: "Maria Santos",
}

// Mock resumo executivo
const resumoMock = {
  totalColaboradores: 294,
  clt: 205,
  pj: 19,
  terceirizados: 70,
  valorTotal: 320000,
  valorCLT: 240000,
  valorPJ: 30000,
  valorTerceirizados: 50000,
  eventosHE: 47,
  eventosFerias: 12,
  eventosAfastamentos: 9,
  eventosRescisoes: 3,
}

// Mock eventos consolidados
const eventosMock = [
  {
    id: 1,
    colaborador: "João Silva",
    vinculo: "CLT",
    cargo: "Armador",
    tipoEvento: "Salário",
    referencia: "30 dias",
    valor: 3200,
    status: "ok",
    obs: "",
  },
  {
    id: 2,
    colaborador: "João Silva",
    vinculo: "CLT",
    cargo: "Armador",
    tipoEvento: "Hora Extra",
    referencia: "12h",
    valor: 420,
    status: "ok",
    obs: "",
  },
  {
    id: 3,
    colaborador: "Maria Oliveira",
    vinculo: "CLT",
    cargo: "Engenheira",
    tipoEvento: "Salário",
    referencia: "30 dias",
    valor: 12500,
    status: "ok",
    obs: "",
  },
  {
    id: 4,
    colaborador: "Carlos Lima",
    vinculo: "Terceirizado",
    cargo: "Carpinteiro",
    tipoEvento: "Fatura",
    referencia: "Mensal",
    valor: 4500,
    status: "ok",
    obs: "Empresa: Constru Mais Ltda",
  },
  {
    id: 5,
    colaborador: "Ana Souza",
    vinculo: "CLT",
    cargo: "Adm Obra",
    tipoEvento: "Férias",
    referencia: "10 dias",
    valor: 1300,
    status: "ok",
    obs: "",
  },
  {
    id: 6,
    colaborador: "Pedro Costa",
    vinculo: "CLT",
    cargo: "Pedreiro",
    tipoEvento: "Salário",
    referencia: "30 dias",
    valor: 2800,
    status: "ok",
    obs: "",
  },
  {
    id: 7,
    colaborador: "Pedro Costa",
    vinculo: "CLT",
    cargo: "Pedreiro",
    tipoEvento: "Hora Extra",
    referencia: "8h",
    valor: 280,
    status: "ok",
    obs: "",
  },
  {
    id: 8,
    colaborador: "Lucas Ferreira",
    vinculo: "PJ",
    cargo: "Topógrafo",
    tipoEvento: "NF Serviço",
    referencia: "Mensal",
    valor: 8500,
    status: "ok",
    obs: "NF 2024-0892",
  },
  {
    id: 9,
    colaborador: "Roberto Alves",
    vinculo: "CLT",
    cargo: "Motorista",
    tipoEvento: "Rescisão",
    referencia: "Completa",
    valor: 15200,
    status: "ok",
    obs: "Pedido de demissão",
  },
  {
    id: 10,
    colaborador: "Fernanda Lima",
    vinculo: "CLT",
    cargo: "Almoxarife",
    tipoEvento: "Afastamento",
    referencia: "15 dias",
    valor: 0,
    status: "ok",
    obs: "INSS - Doença",
  },
  {
    id: 11,
    colaborador: "Marcos Santos",
    vinculo: "Terceirizado",
    cargo: "Eletricista",
    tipoEvento: "Fatura",
    referencia: "Mensal",
    valor: 6200,
    status: "ok",
    obs: "Empresa: Elétrica Pro",
  },
  {
    id: 12,
    colaborador: "Julia Mendes",
    vinculo: "CLT",
    cargo: "Técnica Segurança",
    tipoEvento: "Salário",
    referencia: "30 dias",
    valor: 4200,
    status: "ok",
    obs: "",
  },
]

// Mock checklist
const checklistMock = [
  { id: 1, descricao: "Todos os colaboradores efetivados", status: true, pendencia: null },
  { id: 2, descricao: "Nenhuma pendência documental ativa", status: true, pendencia: null },
  { id: 3, descricao: "SST em conformidade", status: true, pendencia: null },
  { id: 4, descricao: "Eventos de ponto fechados", status: true, pendencia: null },
  { id: 5, descricao: "Aprovações de exceção concluídas", status: true, pendencia: null },
]

// Mock linha do tempo
const timelineMock = [
  { etapa: "RH Consolidou", status: "concluido", data: "25/07/2026 14:30", usuario: "Maria Santos" },
  { etapa: "Custos Analisando", status: "aguardando", data: null, usuario: null },
  { etapa: "Custos Validado", status: "pendente", data: null, usuario: null },
  { etapa: "Gerente Contratual Aprovado", status: "pendente", data: null, usuario: null },
  { etapa: "Financeiro em Pagamento", status: "pendente", data: null, usuario: null },
  { etapa: "Financeiro Pago", status: "pendente", data: null, usuario: null },
]

function getStatusBadge(status: StatusFluxo) {
  switch (status) {
    case "consolidado":
      return <Badge className="bg-green-600 text-white">CONSOLIDADO</Badge>
    case "aguardando":
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          AGUARDANDO
        </Badge>
      )
    case "em_analise":
      return <Badge className="bg-blue-600 text-white">EM ANÁLISE</Badge>
    case "validado":
      return <Badge className="bg-green-600 text-white">VALIDADO</Badge>
    case "aprovado":
      return <Badge className="bg-green-600 text-white">APROVADO</Badge>
    case "em_pagamento":
      return <Badge className="bg-purple-600 text-white">EM PAGAMENTO</Badge>
    case "pago":
      return <Badge className="bg-emerald-600 text-white">PAGO</Badge>
    default:
      return <Badge variant="outline">-</Badge>
  }
}

function ConsolidacaoContent() {
  const [periodo] = useState(periodoMock)
  const [resumo] = useState(resumoMock)
  const [eventos] = useState(eventosMock)
  const [checklist] = useState(checklistMock)
  const [timeline] = useState(timelineMock)

  const [searchTerm, setSearchTerm] = useState("")
  const [filtroVinculo, setFiltroVinculo] = useState("todos")
  const [filtroEvento, setFiltroEvento] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [showFilters, setShowFilters] = useState(false)

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [observacaoRH, setObservacaoRH] = useState("")

  // Filtrar eventos
  const eventosFiltrados = eventos.filter((e) => {
    const matchSearch =
      e.colaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchVinculo = filtroVinculo === "todos" || e.vinculo.toLowerCase() === filtroVinculo.toLowerCase()
    const matchEvento = filtroEvento === "todos" || e.tipoEvento.toLowerCase().includes(filtroEvento.toLowerCase())
    const matchStatus = filtroStatus === "todos" || e.status === filtroStatus
    return matchSearch && matchVinculo && matchEvento && matchStatus
  })

  // Verificar se pode consolidar
  const podeConsolidar = checklist.every((c) => c.status) && !periodo.bloqueado
  const todosCheckOk = checklist.every((c) => c.status)

  const handleConsolidar = () => {
    if (!observacaoRH.trim()) {
      alert("Observação do RH é obrigatória")
      return
    }
    // Aqui faria a consolidação
    setShowConfirmDialog(false)
    alert("Consolidação realizada com sucesso!")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/obra/administrativo/rh" className="hover:text-foreground">
            RH
          </Link>
          <span>/</span>
          <span>Consolidação</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/obra/administrativo/rh">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Consolidação da Mão de Obra — {periodo.competencia}</h1>
              <p className="text-muted-foreground">{periodo.obra}</p>
            </div>
            {periodo.bloqueado && (
              <Badge variant="outline" className="border-amber-500 text-amber-500 ml-2">
                <Lock className="h-3 w-3 mr-1" />
                PERÍODO BLOQUEADO
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              Histórico
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Badges de Status do Fluxo */}
        <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">RH:</span>
            {getStatusBadge(periodo.statusRH)}
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Custos:</span>
            {getStatusBadge(periodo.statusCustos)}
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Gerência Contratual:</span>
            {getStatusBadge(periodo.statusGerencia)}
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Financeiro:</span>
            {getStatusBadge(periodo.statusFinanceiro)}
          </div>
        </div>
      </div>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Resumo Executivo (Visão RH)
          </CardTitle>
          <CardDescription>Dados consolidados do período - somente leitura</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Colaboradores */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Colaboradores</p>
              <p className="text-2xl font-bold">{resumo.totalColaboradores}</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-600">CLT</p>
              <p className="text-2xl font-bold text-blue-600">{resumo.clt}</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="text-sm text-purple-600">PJ</p>
              <p className="text-2xl font-bold text-purple-600">{resumo.pj}</p>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-lg">
              <p className="text-sm text-amber-600">Terceirizados</p>
              <p className="text-2xl font-bold text-amber-600">{resumo.terceirizados}</p>
            </div>

            {/* Valores */}
            <div className="p-4 bg-green-500/10 rounded-lg col-span-2">
              <p className="text-sm text-green-600">Valor Total Consolidado</p>
              <p className="text-2xl font-bold text-green-600">R$ {resumo.valorTotal.toLocaleString("pt-BR")}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border rounded-lg">
              <p className="text-xs text-muted-foreground">Valor CLT</p>
              <p className="text-lg font-semibold">R$ {resumo.valorCLT.toLocaleString("pt-BR")}</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-xs text-muted-foreground">Valor PJ</p>
              <p className="text-lg font-semibold">R$ {resumo.valorPJ.toLocaleString("pt-BR")}</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-xs text-muted-foreground">Valor Terceirizados</p>
              <p className="text-lg font-semibold">R$ {resumo.valorTerceirizados.toLocaleString("pt-BR")}</p>
            </div>
            <div className="p-3 border rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground">Eventos no Período</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline">HE: {resumo.eventosHE}</Badge>
                <Badge variant="outline">Férias: {resumo.eventosFerias}</Badge>
                <Badge variant="outline">Afast: {resumo.eventosAfastamentos}</Badge>
                <Badge variant="outline">Resc: {resumo.eventosRescisoes}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Consolidação */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Tabela de Consolidação (Detalhe)</CardTitle>
              <CardDescription>Todos os eventos de mão de obra do período</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar colaborador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 pt-4 border-t mt-4">
              <div className="w-40">
                <Label className="text-xs">Vínculo</Label>
                <Select value={filtroVinculo} onValueChange={setFiltroVinculo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="clt">CLT</SelectItem>
                    <SelectItem value="pj">PJ</SelectItem>
                    <SelectItem value="terceirizado">Terceirizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label className="text-xs">Tipo de Evento</Label>
                <Select value={filtroEvento} onValueChange={setFiltroEvento}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="salário">Salário</SelectItem>
                    <SelectItem value="hora extra">Hora Extra</SelectItem>
                    <SelectItem value="férias">Férias</SelectItem>
                    <SelectItem value="afastamento">Afastamento</SelectItem>
                    <SelectItem value="rescisão">Rescisão</SelectItem>
                    <SelectItem value="fatura">Fatura</SelectItem>
                    <SelectItem value="nf">NF Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label className="text-xs">Status</Label>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ok">OK</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="erro">Erro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFiltroVinculo("todos")
                    setFiltroEvento("todos")
                    setFiltroStatus("todos")
                    setSearchTerm("")
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Vínculo</TableHead>
                  <TableHead>Cargo / Função</TableHead>
                  <TableHead>Tipo de Evento</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead className="text-right">Valor (R$)</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventosFiltrados.map((evento) => (
                  <TableRow key={evento.id}>
                    <TableCell className="font-medium">{evento.colaborador}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          evento.vinculo === "CLT"
                            ? "border-blue-500 text-blue-500"
                            : evento.vinculo === "PJ"
                              ? "border-purple-500 text-purple-500"
                              : "border-amber-500 text-amber-500"
                        }
                      >
                        {evento.vinculo}
                      </Badge>
                    </TableCell>
                    <TableCell>{evento.cargo}</TableCell>
                    <TableCell>{evento.tipoEvento}</TableCell>
                    <TableCell>{evento.referencia}</TableCell>
                    <TableCell className="text-right font-mono">
                      {evento.valor > 0 ? evento.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {evento.status === "ok" ? (
                        <Badge className="bg-green-600 text-white">OK</Badge>
                      ) : evento.status === "pendente" ? (
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          PENDENTE
                        </Badge>
                      ) : (
                        <Badge variant="destructive">ERRO</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {evento.obs || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>
              Exibindo {eventosFiltrados.length} de {eventos.length} eventos
            </span>
            <span className="font-medium">
              Total filtrado: R${" "}
              {eventosFiltrados
                .reduce((acc, e) => acc + e.valor, 0)
                .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Checklist e Ação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Verificações Obrigatórias (Checklist RH)
            </CardTitle>
            <CardDescription>Todos os itens devem estar OK para consolidar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.status ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.status ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={item.status ? "text-green-700" : "text-red-700"}>{item.descricao}</span>
                  </div>
                  {!item.status && item.pendencia && (
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                      Ver Pendência
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {!todosCheckOk && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Consolidação bloqueada</span>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  Existem pendências que impedem a consolidação. Resolva os itens acima.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ação Principal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Ação Principal
            </CardTitle>
            <CardDescription>Consolidar e enviar para Custos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {periodo.bloqueado ? (
              <div className="p-6 bg-muted/50 rounded-lg text-center">
                <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-semibold text-lg">Período já consolidado</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Consolidado em {new Date(periodo.consolidadoEm).toLocaleString("pt-BR")}
                </p>
                <p className="text-sm text-muted-foreground">Por: {periodo.consolidadoPor}</p>
                <p className="text-sm text-muted-foreground mt-2">Versão: {periodo.versao}</p>
                <Button variant="outline" className="mt-4 bg-transparent" disabled>
                  <Lock className="h-4 w-4 mr-2" />
                  Solicitar Reabertura
                </Button>
              </div>
            ) : (
              <>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Importante:</strong> Ao consolidar, os dados serão enviados para o setor de Custos e o
                    período ficará bloqueado para edição.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-muted-foreground">Competência</p>
                      <p className="font-medium">{periodo.competencia}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-muted-foreground">Valor Total</p>
                      <p className="font-medium text-green-600">R$ {resumo.valorTotal.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!podeConsolidar}
                    onClick={() => setShowConfirmDialog(true)}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    CONSOLIDAR MÃO DE OBRA (RH)
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Linha do Tempo do Fluxo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Acompanhamento do Fluxo (Pós-RH)
          </CardTitle>
          <CardDescription>Status de cada etapa do processo de pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Linha conectora */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-muted-foreground/20" />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4 relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      item.status === "concluido"
                        ? "bg-green-600 text-white"
                        : item.status === "aguardando"
                          ? "bg-amber-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.status === "concluido" ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : item.status === "aguardando" ? (
                      <Clock className="h-6 w-6" />
                    ) : (
                      <span className="text-lg font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-medium ${
                          item.status === "concluido"
                            ? "text-green-600"
                            : item.status === "aguardando"
                              ? "text-amber-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {item.etapa}
                      </span>
                      {item.status === "concluido" && <Badge className="bg-green-600 text-white">CONCLUÍDO</Badge>}
                      {item.status === "aguardando" && (
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          AGUARDANDO
                        </Badge>
                      )}
                    </div>
                    {item.data && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.data} — {item.usuario}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auditoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Auditoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Versão</p>
              <p className="font-medium">{periodo.versao}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Usuário RH</p>
              <p className="font-medium">{periodo.consolidadoPor}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data/Hora</p>
              <p className="font-medium">{new Date(periodo.consolidadoEm).toLocaleString("pt-BR")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Obra</p>
              <p className="font-medium">{periodo.obra}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Consolidado</p>
              <p className="font-medium">R$ {resumo.valorTotal.toLocaleString("pt-BR")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Eventos Incluídos</p>
              <p className="font-medium">{eventos.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aviso importante */}
      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-700">Regras Importantes</h4>
              <ul className="text-sm text-amber-700 mt-2 space-y-1">
                <li>
                  • RH <strong>NÃO</strong> paga — apenas consolida eventos de pessoas.
                </li>
                <li>
                  • RH <strong>NÃO</strong> faz rateio financeiro — isso é responsabilidade de Custos.
                </li>
                <li>• Qualquer reabertura exige permissão especial e justificativa.</li>
                <li>• Histórico nunca é apagado.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Consolidação</DialogTitle>
            <DialogDescription>
              Ao consolidar, os dados serão enviados para o setor de Custos e o período ficará{" "}
              <strong>bloqueado para edição</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Competência</p>
                <p className="font-medium">{periodo.competencia}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="font-medium text-green-600">R$ {resumo.valorTotal.toLocaleString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Colaboradores</p>
                <p className="font-medium">{resumo.totalColaboradores}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Eventos</p>
                <p className="font-medium">{eventos.length}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="obs-rh" className="text-sm font-medium">
                Observação do RH <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="obs-rh"
                placeholder="Digite uma observação sobre esta consolidação..."
                value={observacaoRH}
                onChange={(e) => setObservacaoRH(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleConsolidar}
              disabled={!observacaoRH.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Confirmar Consolidação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ConsolidacaoMOPage() {
  return (
    <Suspense fallback={null}>
      <ConsolidacaoContent />
    </Suspense>
  )
}
