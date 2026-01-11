"use client"

import { useState } from "react"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileSignature,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  X,
  FileText,
  Building2,
  DollarSign,
  MoreHorizontal,
  AlertCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Percent,
  ClipboardList,
  BarChart3,
  Truck,
  Users,
} from "lucide-react"

// Dados mockados - Contratos de Suprimentos
const contratosMock = [
  {
    id: "CS-2025-001",
    titulo: "Fornecimento de Aco CA-50",
    fornecedor: "Gerdau S.A.",
    tipo: "Fornecimento",
    categoria: "Material",
    pacoteServico: "Fundacoes",
    valorGlobal: 2500000,
    valorMedido: 1850000,
    percentualExecutado: 74,
    dataInicio: "2024-10-01",
    dataFim: "2025-06-30",
    status: "Vigente",
    proximaMedicao: "2025-01-15",
    diasParaVencer: 175,
    medicoesPendentes: 0,
  },
  {
    id: "CS-2025-002",
    titulo: "Concreto Usinado - Obra Completa",
    fornecedor: "Votorantim Cimentos",
    tipo: "Fornecimento",
    categoria: "Material",
    pacoteServico: "Pavimentacao",
    valorGlobal: 4200000,
    valorMedido: 2340000,
    percentualExecutado: 55.7,
    dataInicio: "2024-09-15",
    dataFim: "2025-08-31",
    status: "Vigente",
    proximaMedicao: "2025-01-20",
    diasParaVencer: 237,
    medicoesPendentes: 1,
  },
  {
    id: "CS-2025-003",
    titulo: "Locacao de Equipamentos Pesados",
    fornecedor: "Sotreq S.A.",
    tipo: "Locacao",
    categoria: "Equipamento",
    pacoteServico: "Terraplanagem",
    valorGlobal: 1800000,
    valorMedido: 890000,
    percentualExecutado: 49.4,
    dataInicio: "2024-11-01",
    dataFim: "2025-04-30",
    status: "Vigente",
    proximaMedicao: "2025-01-10",
    diasParaVencer: 114,
    medicoesPendentes: 0,
  },
  {
    id: "CS-2024-015",
    titulo: "Servicos de Terraplanagem",
    fornecedor: "TerraMax Construcoes",
    tipo: "Servico",
    categoria: "Servico",
    pacoteServico: "Terraplanagem",
    valorGlobal: 3500000,
    valorMedido: 3150000,
    percentualExecutado: 90,
    dataInicio: "2024-06-01",
    dataFim: "2025-01-31",
    status: "A Vencer",
    proximaMedicao: "2025-01-08",
    diasParaVencer: 25,
    medicoesPendentes: 2,
  },
  {
    id: "CS-2024-008",
    titulo: "Tubos PEAD para Drenagem",
    fornecedor: "Tigre S.A.",
    tipo: "Fornecimento",
    categoria: "Material",
    pacoteServico: "Drenagem",
    valorGlobal: 680000,
    valorMedido: 567000,
    percentualExecutado: 83.4,
    dataInicio: "2024-07-01",
    dataFim: "2024-12-31",
    status: "Vencido",
    proximaMedicao: null,
    diasParaVencer: -6,
    medicoesPendentes: 1,
  },
  {
    id: "CS-2025-004",
    titulo: "Mao de Obra Especializada - Armacao",
    fornecedor: "Construtora Delta",
    tipo: "Servico",
    categoria: "Mao de Obra",
    pacoteServico: "OAE - Pontes",
    valorGlobal: 950000,
    valorMedido: 320000,
    percentualExecutado: 33.7,
    dataInicio: "2024-12-01",
    dataFim: "2025-05-31",
    status: "Suspenso",
    proximaMedicao: null,
    diasParaVencer: 145,
    medicoesPendentes: 0,
    motivoSuspensao: "Fornecedor bloqueado por problemas de desempenho",
  },
  {
    id: "CS-2025-005",
    titulo: "CBUQ - Pavimentacao Asfaltica",
    fornecedor: "Usina Asfalto Norte",
    tipo: "Fornecimento",
    categoria: "Material",
    pacoteServico: "Pavimentacao",
    valorGlobal: 2800000,
    valorMedido: 1250000,
    percentualExecutado: 44.6,
    dataInicio: "2024-10-15",
    dataFim: "2025-07-31",
    status: "Vigente",
    proximaMedicao: "2025-01-25",
    diasParaVencer: 206,
    medicoesPendentes: 0,
  },
]

const medicoesMock = [
  {
    numero: 6,
    periodo: "Dez/2024",
    valor: 485000,
    status: "Aprovada",
    dataAprovacao: "2025-01-02",
  },
  {
    numero: 5,
    periodo: "Nov/2024",
    valor: 520000,
    status: "Aprovada",
    dataAprovacao: "2024-12-05",
  },
  {
    numero: 4,
    periodo: "Out/2024",
    valor: 445000,
    status: "Aprovada",
    dataAprovacao: "2024-11-04",
  },
  {
    numero: 3,
    periodo: "Set/2024",
    valor: 400000,
    status: "Aprovada",
    dataAprovacao: "2024-10-03",
  },
]

const aditivosMock = [
  {
    numero: 1,
    tipo: "Acrescimo",
    descricao: "Inclusao de novos itens de aco",
    valorOriginal: 2200000,
    valorAditivo: 300000,
    valorAtual: 2500000,
    data: "2024-11-15",
    status: "Aprovado",
  },
]

function SuprimentosContratosContent() {
  const router = useRouter()
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [busca, setBusca] = useState("")
  const [contratoSelecionado, setContratoSelecionado] = useState<(typeof contratosMock)[0] | null>(null)

  // Calculos para KPIs
  const totalContratos = contratosMock.length
  const contratosVigentes = contratosMock.filter((c) => c.status === "Vigente").length
  const contratosAVencer = contratosMock.filter((c) => c.status === "A Vencer").length
  const contratosVencidos = contratosMock.filter((c) => c.status === "Vencido").length
  const contratosSuspensos = contratosMock.filter((c) => c.status === "Suspenso").length
  const valorTotalContratado = contratosMock.reduce((acc, c) => acc + c.valorGlobal, 0)
  const valorTotalMedido = contratosMock.reduce((acc, c) => acc + c.valorMedido, 0)
  const medicoesPendentes = contratosMock.reduce((acc, c) => acc + c.medicoesPendentes, 0)

  // Filtrar contratos
  const contratosFiltrados = contratosMock.filter((c) => {
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus
    const matchTipo = filtroTipo === "todos" || c.tipo === filtroTipo
    const matchBusca =
      busca === "" ||
      c.id.toLowerCase().includes(busca.toLowerCase()) ||
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.fornecedor.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchTipo && matchBusca
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Vigente":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Vigente
          </Badge>
        )
      case "A Vencer":
        return (
          <Badge className="bg-accent/10 text-accent-foreground">
            <Clock className="w-3 h-3 mr-1" />A Vencer
          </Badge>
        )
      case "Vencido":
        return (
          <Badge className="bg-destructive/10 text-destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Vencido
          </Badge>
        )
      case "Suspenso":
        return (
          <Badge className="bg-muted text-muted-foreground">
            <AlertCircle className="w-3 h-3 mr-1" />
            Suspenso
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Contratos de Suprimentos</h1>
                <Badge variant="outline" className="text-xs">
                  SP-04
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Gestao de contratos com fornecedores</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Novo Contrato
              </Button>
            </div>
          </div>

          {/* Navegacao do Setor */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-visao")}
            >
              <BarChart3 className="w-3 h-3 mr-2" />
              SP-01 Visao Geral
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-pedidos")}
            >
              <Truck className="w-3 h-3 mr-2" />
              SP-02 Pedidos
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-fornecedores")}
            >
              <Users className="w-3 h-3 mr-2" />
              SP-03 Fornecedores
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-muted/50"
              onClick={() => router.push("/obra/comercial/suprimentos-contratos")}
            >
              <FileSignature className="w-3 h-3 mr-2" />
              SP-04 Contratos
            </Button>
          </div>
        </div>

        {/* Alertas de Governanca */}
        {(contratosVencidos > 0 || contratosAVencer > 0 || medicoesPendentes > 0) && (
          <div className="space-y-2">
            {contratosVencidos > 0 && (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="py-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div className="flex-1">
                      <p className="font-medium text-destructive">Contratos Vencidos</p>
                      <p className="text-sm text-muted-foreground">
                        {contratosVencidos} contrato(s) com vigencia expirada. Necessario renovacao ou encerramento
                        formal.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      Ver Contratos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {contratosAVencer > 0 && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="py-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-primary">Contratos Proximos do Vencimento</p>
                      <p className="text-sm text-muted-foreground">
                        {contratosAVencer} contrato(s) vencem nos proximos 30 dias. Avaliar necessidade de aditivo.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Ver Contratos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {medicoesPendentes > 0 && (
              <Card className="border-accent bg-accent/5">
                <CardContent className="py-3">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-accent-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-accent-foreground">Medicoes Pendentes</p>
                      <p className="text-sm text-muted-foreground">
                        {medicoesPendentes} medicao(oes) aguardando aprovacao.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Ver Medicoes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <FileSignature className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{totalContratos}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{contratosVigentes}</p>
                <p className="text-xs text-muted-foreground">Vigentes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{contratosAVencer}</p>
                <p className="text-xs text-muted-foreground">A Vencer</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-destructive">{contratosVencidos}</p>
                <p className="text-xs text-muted-foreground">Vencidos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-muted-foreground">{contratosSuspensos}</p>
                <p className="text-xs text-muted-foreground">Suspensos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{(valorTotalContratado / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Contratado</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{(valorTotalMedido / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Medido</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Percent className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">
                  {((valorTotalMedido / valorTotalContratado) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">Executado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Lista de Contratos</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contrato..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-36">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Vigente">Vigente</SelectItem>
                    <SelectItem value="A Vencer">A Vencer</SelectItem>
                    <SelectItem value="Vencido">Vencido</SelectItem>
                    <SelectItem value="Suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Fornecimento">Fornecimento</SelectItem>
                    <SelectItem value="Servico">Servico</SelectItem>
                    <SelectItem value="Locacao">Locacao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-28">Contrato</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor Global</TableHead>
                  <TableHead className="text-center">Executado</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratosFiltrados.map((contrato) => (
                  <TableRow
                    key={contrato.id}
                    className={`cursor-pointer hover:bg-muted/50 ${contrato.status === "Vencido" || contrato.status === "Suspenso" ? "bg-destructive/5" : ""}`}
                    onClick={() => setContratoSelecionado(contrato)}
                  >
                    <TableCell>
                      <span className="font-mono text-sm">{contrato.id}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{contrato.titulo}</p>
                        <p className="text-xs text-muted-foreground">{contrato.pacoteServico}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{contrato.fornecedor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {contrato.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {(contrato.valorGlobal / 1000000).toFixed(2)}M
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${contrato.percentualExecutado}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{contrato.percentualExecutado.toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(contrato.dataFim).toLocaleDateString("pt-BR")}</p>
                        {contrato.diasParaVencer > 0 && contrato.diasParaVencer <= 30 && (
                          <p className="text-xs text-primary">{contrato.diasParaVencer} dias</p>
                        )}
                        {contrato.diasParaVencer < 0 && (
                          <p className="text-xs text-destructive">{Math.abs(contrato.diasParaVencer)} dias vencido</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusBadge(contrato.status)}
                        {contrato.medicoesPendentes > 0 && (
                          <Badge className="bg-accent/10 text-accent-foreground text-xs">
                            {contrato.medicoesPendentes} med
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Painel Lateral - Detalhe do Contrato */}
        {contratoSelecionado && (
          <div className="fixed inset-y-0 right-0 w-[500px] bg-background border-l border-border shadow-xl z-50 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Header do Painel */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{contratoSelecionado.id}</h2>
                    {getStatusBadge(contratoSelecionado.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{contratoSelecionado.titulo}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setContratoSelecionado(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Alerta se suspenso */}
              {contratoSelecionado.status === "Suspenso" && (
                <Card className="border-destructive bg-destructive/5">
                  <CardContent className="py-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Contrato Suspenso</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(contratoSelecionado as typeof contratoSelecionado & { motivoSuspensao?: string })
                            .motivoSuspensao || "Motivo nao informado"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info do Contrato */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Fornecedor</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">{contratoSelecionado.fornecedor}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tipo</p>
                  <Badge variant="outline">{contratoSelecionado.tipo}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Categoria</p>
                  <p className="text-sm font-medium">{contratoSelecionado.categoria}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Pacote de Servico</p>
                  <p className="text-sm font-medium">{contratoSelecionado.pacoteServico}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Inicio</p>
                  <p className="text-sm">{new Date(contratoSelecionado.dataInicio).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Termino</p>
                  <p className="text-sm">{new Date(contratoSelecionado.dataFim).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              {/* Valores */}
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Global</p>
                      <p className="text-xl font-bold text-foreground">
                        R$ {(contratoSelecionado.valorGlobal / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Medido</p>
                      <p className="text-xl font-bold text-primary">
                        R$ {(contratoSelecionado.valorMedido / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Saldo</p>
                      <p className="text-xl font-bold text-foreground">
                        R$ {((contratoSelecionado.valorGlobal - contratoSelecionado.valorMedido) / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Percentual Executado</p>
                      <p className="text-sm font-medium">{contratoSelecionado.percentualExecutado.toFixed(1)}%</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${contratoSelecionado.percentualExecutado}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historico de Medicoes */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Historico de Medicoes
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>#</TableHead>
                      <TableHead>Periodo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicoesMock.map((med) => (
                      <TableRow key={med.numero}>
                        <TableCell className="font-medium">{med.numero}</TableCell>
                        <TableCell className="text-sm">{med.periodo}</TableCell>
                        <TableCell className="text-right text-sm">R$ {med.valor.toLocaleString("pt-BR")}</TableCell>
                        <TableCell>
                          <Badge className="bg-muted text-muted-foreground">{med.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Aditivos */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Aditivos
                </h3>
                {aditivosMock.length > 0 ? (
                  <div className="space-y-2">
                    {aditivosMock.map((aditivo) => (
                      <Card key={aditivo.numero} className="bg-card">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                Aditivo {aditivo.numero} - {aditivo.tipo}
                              </p>
                              <p className="text-xs text-muted-foreground">{aditivo.descricao}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-primary">
                                +R$ {aditivo.valorAditivo.toLocaleString("pt-BR")}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(aditivo.data).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum aditivo registrado</p>
                )}
              </div>

              {/* Acoes */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button className="flex-1 bg-primary text-primary-foreground">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Nova Medicao
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Aditivo
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuprimentosContratosPage() {
  return (
    <Suspense fallback={null}>
      <SuprimentosContratosContent />
    </Suspense>
  )
}
