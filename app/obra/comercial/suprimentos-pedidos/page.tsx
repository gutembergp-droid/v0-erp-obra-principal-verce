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
import {
  Package,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Truck,
  X,
  FileText,
  Calendar,
  DollarSign,
  Building2,
  ClipboardList,
  Eye,
  MoreHorizontal,
  AlertCircle,
  XCircle,
  BarChart3,
  Users,
  FileSignature,
} from "lucide-react"

// Dados mockados - Pedidos de Compra
const pedidosMock = [
  {
    id: "PC-2025-001",
    titulo: "Aco CA-50 - Fundacoes",
    fornecedor: "Gerdau S.A.",
    categoria: "Material",
    pacoteServico: "Fundacoes",
    valorTotal: 485000.0,
    dataCriacao: "2025-01-02",
    dataEntrega: "2025-01-15",
    status: "Em Entrega",
    itens: 12,
    entregue: 8,
    dentroEstrutura: true,
    urgencia: "Normal",
  },
  {
    id: "PC-2025-002",
    titulo: "Concreto Usinado FCK 30",
    fornecedor: "Votorantim Cimentos",
    categoria: "Material",
    pacoteServico: "Pavimentacao",
    valorTotal: 892000.0,
    dataCriacao: "2025-01-03",
    dataEntrega: "2025-01-20",
    status: "Aprovado",
    itens: 5,
    entregue: 0,
    dentroEstrutura: true,
    urgencia: "Alta",
  },
  {
    id: "PC-2025-003",
    titulo: "Locacao Escavadeira Hidraulica",
    fornecedor: "Sotreq Equipamentos",
    categoria: "Equipamento",
    pacoteServico: "Terraplanagem",
    valorTotal: 156000.0,
    dataCriacao: "2025-01-04",
    dataEntrega: "2025-01-10",
    status: "Atrasado",
    itens: 2,
    entregue: 0,
    dentroEstrutura: true,
    urgencia: "Urgente",
  },
  {
    id: "PC-2025-004",
    titulo: "Servico de Topografia",
    fornecedor: "GeoTech Engenharia",
    categoria: "Servico",
    pacoteServico: "Terraplanagem",
    valorTotal: 45000.0,
    dataCriacao: "2025-01-05",
    dataEntrega: "2025-01-25",
    status: "Pendente Aprovacao",
    itens: 1,
    entregue: 0,
    dentroEstrutura: true,
    urgencia: "Normal",
  },
  {
    id: "PC-2025-005",
    titulo: "EPI - Lote Janeiro",
    fornecedor: "SafeWork Brasil",
    categoria: "Material",
    pacoteServico: null,
    valorTotal: 28500.0,
    dataCriacao: "2025-01-06",
    dataEntrega: "2025-01-12",
    status: "Pendente Aprovacao",
    itens: 35,
    entregue: 0,
    dentroEstrutura: false,
    urgencia: "Alta",
  },
  {
    id: "PC-2025-006",
    titulo: "Tubos PEAD DN 600",
    fornecedor: "Tigre S.A.",
    categoria: "Material",
    pacoteServico: "Drenagem",
    valorTotal: 234000.0,
    dataCriacao: "2025-01-02",
    dataEntrega: "2025-01-08",
    status: "Concluido",
    itens: 8,
    entregue: 8,
    dentroEstrutura: true,
    urgencia: "Normal",
  },
  {
    id: "PC-2025-007",
    titulo: "Mao de Obra Terceirizada - Armacao",
    fornecedor: "Construtora Delta",
    categoria: "Mao de Obra",
    pacoteServico: "OAE - Pontes",
    valorTotal: 320000.0,
    dataCriacao: "2025-01-04",
    dataEntrega: "2025-02-01",
    status: "Em Entrega",
    itens: 1,
    entregue: 0,
    dentroEstrutura: true,
    urgencia: "Normal",
  },
  {
    id: "PC-2025-008",
    titulo: "CBUQ - Lote Emergencial",
    fornecedor: "Usina Asfalto Norte",
    categoria: "Material",
    pacoteServico: null,
    valorTotal: 175000.0,
    dataCriacao: "2025-01-06",
    dataEntrega: "2025-01-08",
    status: "Pendente Aprovacao",
    itens: 3,
    entregue: 0,
    dentroEstrutura: false,
    urgencia: "Urgente",
  },
]

const itensPedidoMock = [
  {
    id: 1,
    descricao: "Aco CA-50 10mm",
    unidade: "Kg",
    quantidade: 15000,
    valorUnit: 8.5,
    valorTotal: 127500,
    entregue: 10000,
    status: "Parcial",
  },
  {
    id: 2,
    descricao: "Aco CA-50 12.5mm",
    unidade: "Kg",
    quantidade: 20000,
    valorUnit: 8.8,
    valorTotal: 176000,
    entregue: 20000,
    status: "Concluido",
  },
  {
    id: 3,
    descricao: "Aco CA-50 16mm",
    unidade: "Kg",
    quantidade: 12000,
    valorUnit: 9.2,
    valorTotal: 110400,
    entregue: 8000,
    status: "Parcial",
  },
  {
    id: 4,
    descricao: "Aco CA-50 20mm",
    unidade: "Kg",
    quantidade: 8000,
    valorUnit: 8.9,
    valorTotal: 71200,
    entregue: 0,
    status: "Pendente",
  },
]

const historicoAprovacoes = [
  {
    data: "2025-01-02 09:15",
    usuario: "Carlos Mendes",
    acao: "Criou pedido",
    observacao: "Pedido criado conforme requisicao REQ-001",
  },
  {
    data: "2025-01-02 14:30",
    usuario: "Ana Costa",
    acao: "Aprovou - Comercial",
    observacao: "Valores dentro do orcamento",
  },
  {
    data: "2025-01-03 10:00",
    usuario: "Roberto Silva",
    acao: "Aprovou - Suprimentos",
    observacao: "Fornecedor qualificado",
  },
  {
    data: "2025-01-04 08:45",
    usuario: "Sistema",
    acao: "Enviado ao fornecedor",
    observacao: "Pedido transmitido via EDI",
  },
]

function SuprimentosPedidosContent() {
  const router = useRouter()
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [busca, setBusca] = useState("")
  const [pedidoSelecionado, setPedidoSelecionado] = useState<(typeof pedidosMock)[0] | null>(null)

  // Calculos para KPIs
  const totalPedidos = pedidosMock.length
  const pedidosPendentes = pedidosMock.filter((p) => p.status === "Pendente Aprovacao").length
  const pedidosAtrasados = pedidosMock.filter((p) => p.status === "Atrasado").length
  const pedidosEmEntrega = pedidosMock.filter((p) => p.status === "Em Entrega" || p.status === "Aprovado").length
  const valorComprometido = pedidosMock
    .filter((p) => p.status !== "Concluido")
    .reduce((acc, p) => acc + p.valorTotal, 0)
  const pedidosForaEstrutura = pedidosMock.filter((p) => !p.dentroEstrutura).length

  // Filtrar pedidos
  const pedidosFiltrados = pedidosMock.filter((p) => {
    const matchStatus = filtroStatus === "todos" || p.status === filtroStatus
    const matchCategoria = filtroCategoria === "todos" || p.categoria === filtroCategoria
    const matchBusca =
      busca === "" ||
      p.id.toLowerCase().includes(busca.toLowerCase()) ||
      p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      p.fornecedor.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchCategoria && matchBusca
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Concluido":
        return (
          <Badge className="bg-muted text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Concluido
          </Badge>
        )
      case "Em Entrega":
        return (
          <Badge className="bg-primary/10 text-primary">
            <Truck className="w-3 h-3 mr-1" />
            Em Entrega
          </Badge>
        )
      case "Aprovado":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aprovado
          </Badge>
        )
      case "Pendente Aprovacao":
        return (
          <Badge className="bg-accent/10 text-accent-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "Atrasado":
        return (
          <Badge className="bg-destructive/10 text-destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Atrasado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgenciaBadge = (urgencia: string) => {
    switch (urgencia) {
      case "Urgente":
        return <Badge className="bg-destructive/10 text-destructive">Urgente</Badge>
      case "Alta":
        return <Badge className="bg-primary/10 text-primary">Alta</Badge>
      default:
        return null
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
                <h1 className="text-2xl font-bold text-foreground">Pedidos de Compra</h1>
                <Badge variant="outline" className="text-xs">
                  SP-02
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Gestao do ciclo de vida dos pedidos de compra</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="jan-2025">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2025">Janeiro 2025</SelectItem>
                  <SelectItem value="dez-2024">Dezembro 2024</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Novo Pedido
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
              className="text-xs bg-muted/50"
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
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-contratos")}
            >
              <FileSignature className="w-3 h-3 mr-2" />
              SP-04 Contratos
            </Button>
          </div>
        </div>

        {/* Alerta de Governanca - Pedidos fora da estrutura */}
        {pedidosForaEstrutura > 0 && (
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <div className="flex-1">
                  <p className="font-medium text-destructive">Alerta de Governanca</p>
                  <p className="text-sm text-muted-foreground">
                    {pedidosForaEstrutura} pedido(s) com itens FORA DA ESTRUTURA aguardando aprovacao especial. Compras
                    fora da estrutura exigem justificativa e aprovacao do GC.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                >
                  Ver Pedidos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{totalPedidos}</p>
                <p className="text-xs text-muted-foreground">Total Pedidos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{pedidosPendentes}</p>
                <p className="text-xs text-muted-foreground">Pendentes Aprovacao</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{pedidosEmEntrega}</p>
                <p className="text-xs text-muted-foreground">Em Entrega</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-destructive">{pedidosAtrasados}</p>
                <p className="text-xs text-muted-foreground">Atrasados</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{(valorComprometido / 1000000).toFixed(2)}M</p>
                <p className="text-xs text-muted-foreground">Valor Comprometido</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-destructive">{pedidosForaEstrutura}</p>
                <p className="text-xs text-muted-foreground">Fora Estrutura</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Lista de Pedidos</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar pedido..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-44">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="Pendente Aprovacao">Pendente Aprovacao</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Em Entrega">Em Entrega</SelectItem>
                    <SelectItem value="Atrasado">Atrasado</SelectItem>
                    <SelectItem value="Concluido">Concluido</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Equipamento">Equipamento</SelectItem>
                    <SelectItem value="Servico">Servico</SelectItem>
                    <SelectItem value="Mao de Obra">Mao de Obra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-28">Pedido</TableHead>
                  <TableHead>Descricao</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Pacote Servico</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Entrega</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidosFiltrados.map((pedido) => (
                  <TableRow
                    key={pedido.id}
                    className={`cursor-pointer hover:bg-muted/50 ${!pedido.dentroEstrutura ? "bg-destructive/5" : ""}`}
                    onClick={() => setPedidoSelecionado(pedido)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{pedido.id}</span>
                        {!pedido.dentroEstrutura && (
                          <AlertTriangle className="w-4 h-4 text-destructive" title="Fora da estrutura" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{pedido.titulo}</p>
                        <p className="text-xs text-muted-foreground">{pedido.itens} itens</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{pedido.fornecedor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {pedido.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {pedido.pacoteServico ? (
                        <span className="text-sm">{pedido.pacoteServico}</span>
                      ) : (
                        <span className="text-sm text-destructive font-medium">NAO VINCULADO</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {pedido.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{new Date(pedido.dataEntrega).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(pedido.status)}
                        {getUrgenciaBadge(pedido.urgencia)}
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

        {/* Painel Lateral - Detalhe do Pedido */}
        {pedidoSelecionado && (
          <div className="fixed inset-y-0 right-0 w-[480px] bg-background border-l border-border shadow-xl z-50 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Header do Painel */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{pedidoSelecionado.id}</h2>
                    {!pedidoSelecionado.dentroEstrutura && (
                      <Badge className="bg-destructive/10 text-destructive">Fora Estrutura</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{pedidoSelecionado.titulo}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setPedidoSelecionado(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Alerta se fora da estrutura */}
              {!pedidoSelecionado.dentroEstrutura && (
                <Card className="border-destructive bg-destructive/5">
                  <CardContent className="py-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Compra Fora da Estrutura</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Este pedido contem itens que NAO pertencem a estrutura de custos homologada. Requer
                          justificativa e aprovacao especial do Gerente de Contrato.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Principal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Fornecedor</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">{pedidoSelecionado.fornecedor}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Categoria</p>
                  <Badge variant="outline">{pedidoSelecionado.categoria}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Pacote de Servico</p>
                  <p className="text-sm font-medium">
                    {pedidoSelecionado.pacoteServico || <span className="text-destructive">Nao vinculado</span>}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  {getStatusBadge(pedidoSelecionado.status)}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Data Criacao</p>
                  <p className="text-sm">{new Date(pedidoSelecionado.dataCriacao).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Previsao Entrega</p>
                  <p className="text-sm">{new Date(pedidoSelecionado.dataEntrega).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              {/* Valor */}
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Total do Pedido</p>
                      <p className="text-2xl font-bold text-foreground">
                        R$ {pedidoSelecionado.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Progresso Entrega</p>
                      <p className="text-lg font-semibold text-primary">
                        {pedidoSelecionado.entregue}/{pedidoSelecionado.itens} itens
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itens do Pedido */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Itens do Pedido
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensPedidoMock.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-sm">{item.descricao}</TableCell>
                        <TableCell className="text-right text-sm">
                          {item.entregue}/{item.quantidade} {item.unidade}
                        </TableCell>
                        <TableCell className="text-right text-sm font-medium">
                          R$ {item.valorTotal.toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "Concluido"
                                ? "bg-muted text-muted-foreground"
                                : item.status === "Parcial"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-accent/10 text-accent-foreground"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Historico de Aprovacoes */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Historico de Aprovacoes
                </h3>
                <div className="space-y-3">
                  {historicoAprovacoes.map((hist, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{hist.acao}</p>
                          <p className="text-xs text-muted-foreground">{hist.data}</p>
                        </div>
                        <p className="text-muted-foreground">{hist.usuario}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{hist.observacao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acoes */}
              <div className="flex gap-2 pt-4 border-t border-border">
                {pedidoSelecionado.status === "Pendente Aprovacao" && (
                  <>
                    <Button className="flex-1 bg-primary text-primary-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar
                    </Button>
                  </>
                )}
                {pedidoSelecionado.status === "Em Entrega" && (
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <Truck className="w-4 h-4 mr-2" />
                    Registrar Entrega
                  </Button>
                )}
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Completo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuprimentosPedidosPage() {
  return (
    <Suspense fallback={null}>
      <SuprimentosPedidosContent />
    </Suspense>
  )
}
