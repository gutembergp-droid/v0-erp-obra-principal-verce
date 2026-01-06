"use client"

import { useState } from "react"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  X,
  FileText,
  Building2,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Package,
  DollarSign,
  MoreHorizontal,
  ShieldCheck,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Dados mockados - Fornecedores
const fornecedoresMock = [
  {
    id: "FOR-001",
    razaoSocial: "Gerdau S.A.",
    nomeFantasia: "Gerdau",
    cnpj: "07.358.761/0001-69",
    categoria: "Material",
    especialidade: "Aco e Derivados",
    status: "Qualificado",
    avaliacao: 4.8,
    pontualidade: 95,
    qualidade: 98,
    pedidosAtivos: 3,
    valorContratado: 1850000,
    ultimoPedido: "2025-01-02",
    cidade: "Porto Alegre",
    uf: "RS",
    telefone: "(51) 3323-2000",
    email: "comercial@gerdau.com.br",
    contato: "Roberto Gomes",
  },
  {
    id: "FOR-002",
    razaoSocial: "Votorantim Cimentos S.A.",
    nomeFantasia: "Votorantim",
    cnpj: "01.637.895/0001-32",
    categoria: "Material",
    especialidade: "Cimento e Concreto",
    status: "Qualificado",
    avaliacao: 4.5,
    pontualidade: 88,
    qualidade: 94,
    pedidosAtivos: 2,
    valorContratado: 2340000,
    ultimoPedido: "2025-01-03",
    cidade: "Sao Paulo",
    uf: "SP",
    telefone: "(11) 4572-4000",
    email: "vendas@votorantim.com.br",
    contato: "Maria Santos",
  },
  {
    id: "FOR-003",
    razaoSocial: "Sotreq S.A.",
    nomeFantasia: "Sotreq",
    cnpj: "33.041.359/0001-87",
    categoria: "Equipamento",
    especialidade: "Locacao de Maquinas",
    status: "Qualificado",
    avaliacao: 4.2,
    pontualidade: 78,
    qualidade: 90,
    pedidosAtivos: 1,
    valorContratado: 890000,
    ultimoPedido: "2025-01-04",
    cidade: "Belo Horizonte",
    uf: "MG",
    telefone: "(31) 3429-8000",
    email: "locacao@sotreq.com.br",
    contato: "Carlos Ferreira",
  },
  {
    id: "FOR-004",
    razaoSocial: "GeoTech Engenharia Ltda.",
    nomeFantasia: "GeoTech",
    cnpj: "12.456.789/0001-00",
    categoria: "Servico",
    especialidade: "Topografia e Geodesia",
    status: "Em Avaliacao",
    avaliacao: 0,
    pontualidade: 0,
    qualidade: 0,
    pedidosAtivos: 1,
    valorContratado: 45000,
    ultimoPedido: "2025-01-05",
    cidade: "Curitiba",
    uf: "PR",
    telefone: "(41) 3333-5000",
    email: "contato@geotech.com.br",
    contato: "Ana Paula",
  },
  {
    id: "FOR-005",
    razaoSocial: "SafeWork Equipamentos de Seguranca",
    nomeFantasia: "SafeWork",
    cnpj: "23.456.789/0001-11",
    categoria: "Material",
    especialidade: "EPI e Seguranca",
    status: "Qualificado",
    avaliacao: 4.0,
    pontualidade: 85,
    qualidade: 92,
    pedidosAtivos: 1,
    valorContratado: 185000,
    ultimoPedido: "2025-01-06",
    cidade: "Joinville",
    uf: "SC",
    telefone: "(47) 3422-1000",
    email: "vendas@safework.com.br",
    contato: "Pedro Lima",
  },
  {
    id: "FOR-006",
    razaoSocial: "Tigre S.A. Tubos e Conexoes",
    nomeFantasia: "Tigre",
    cnpj: "84.684.455/0001-57",
    categoria: "Material",
    especialidade: "Tubos e Conexoes",
    status: "Qualificado",
    avaliacao: 4.7,
    pontualidade: 92,
    qualidade: 96,
    pedidosAtivos: 0,
    valorContratado: 567000,
    ultimoPedido: "2025-01-02",
    cidade: "Joinville",
    uf: "SC",
    telefone: "(47) 3441-5000",
    email: "comercial@tigre.com.br",
    contato: "Lucia Mendes",
  },
  {
    id: "FOR-007",
    razaoSocial: "Construtora Delta Ltda.",
    nomeFantasia: "Delta",
    cnpj: "34.567.890/0001-22",
    categoria: "Mao de Obra",
    especialidade: "Armacao e Concreto",
    status: "Bloqueado",
    avaliacao: 2.8,
    pontualidade: 65,
    qualidade: 70,
    pedidosAtivos: 0,
    valorContratado: 320000,
    ultimoPedido: "2024-12-15",
    cidade: "Salvador",
    uf: "BA",
    telefone: "(71) 3333-2000",
    email: "contato@deltaconstrutora.com.br",
    contato: "Jose Neto",
    motivoBloqueio: "Atrasos recorrentes e problemas de qualidade",
  },
  {
    id: "FOR-008",
    razaoSocial: "Usina de Asfalto Norte Ltda.",
    nomeFantasia: "Asfalto Norte",
    cnpj: "45.678.901/0001-33",
    categoria: "Material",
    especialidade: "CBUQ e Derivados",
    status: "Qualificado",
    avaliacao: 4.3,
    pontualidade: 82,
    qualidade: 88,
    pedidosAtivos: 1,
    valorContratado: 1250000,
    ultimoPedido: "2025-01-06",
    cidade: "Recife",
    uf: "PE",
    telefone: "(81) 3222-4000",
    email: "vendas@asfaltonorte.com.br",
    contato: "Ricardo Costa",
  },
]

const historicoFornecedor = [
  { data: "2025-01-02", pedido: "PC-2025-001", valor: 485000, status: "Em Entrega", avaliacao: null },
  { data: "2024-12-15", pedido: "PC-2024-089", valor: 320000, status: "Concluido", avaliacao: 5 },
  { data: "2024-11-20", pedido: "PC-2024-072", valor: 567000, status: "Concluido", avaliacao: 4 },
  { data: "2024-10-10", pedido: "PC-2024-058", valor: 478000, status: "Concluido", avaliacao: 5 },
]

function SuprimentosFornecedoresContent() {
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [busca, setBusca] = useState("")
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<(typeof fornecedoresMock)[0] | null>(null)

  // Calculos para KPIs
  const totalFornecedores = fornecedoresMock.length
  const fornecedoresQualificados = fornecedoresMock.filter((f) => f.status === "Qualificado").length
  const fornecedoresEmAvaliacao = fornecedoresMock.filter((f) => f.status === "Em Avaliacao").length
  const fornecedoresBloqueados = fornecedoresMock.filter((f) => f.status === "Bloqueado").length
  const fornecedoresAtivos = fornecedoresMock.filter((f) => f.pedidosAtivos > 0).length
  const valorTotalContratado = fornecedoresMock.reduce((acc, f) => acc + f.valorContratado, 0)

  // Filtrar fornecedores
  const fornecedoresFiltrados = fornecedoresMock.filter((f) => {
    const matchStatus = filtroStatus === "todos" || f.status === filtroStatus
    const matchCategoria = filtroCategoria === "todos" || f.categoria === filtroCategoria
    const matchBusca =
      busca === "" ||
      f.razaoSocial.toLowerCase().includes(busca.toLowerCase()) ||
      f.nomeFantasia.toLowerCase().includes(busca.toLowerCase()) ||
      f.cnpj.includes(busca)
    return matchStatus && matchCategoria && matchBusca
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Qualificado":
        return (
          <Badge className="bg-primary/10 text-primary">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Qualificado
          </Badge>
        )
      case "Em Avaliacao":
        return (
          <Badge className="bg-accent/10 text-accent-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Em Avaliacao
          </Badge>
        )
      case "Bloqueado":
        return (
          <Badge className="bg-destructive/10 text-destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Bloqueado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAvaliacaoStars = (avaliacao: number) => {
    if (avaliacao === 0) return <span className="text-muted-foreground text-sm">Sem avaliacao</span>
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-primary text-primary" />
        <span className="font-medium">{avaliacao.toFixed(1)}</span>
      </div>
    )
  }

  const getDesempenhoColor = (valor: number) => {
    if (valor >= 90) return "text-primary"
    if (valor >= 75) return "text-accent-foreground"
    return "text-destructive"
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Fornecedores</h1>
              <Badge variant="outline" className="text-xs">
                SP-03
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Cadastro e avaliacao de fornecedores da obra</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Novo Fornecedor
            </Button>
          </div>
        </div>

        {/* Alerta de Governanca - Fornecedores bloqueados */}
        {fornecedoresBloqueados > 0 && (
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <div className="flex-1">
                  <p className="font-medium text-destructive">Atencao - Fornecedores Bloqueados</p>
                  <p className="text-sm text-muted-foreground">
                    {fornecedoresBloqueados} fornecedor(es) bloqueado(s) por problemas de desempenho. Novos pedidos para
                    estes fornecedores requerem aprovacao especial.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                >
                  Ver Detalhes
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
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{totalFornecedores}</p>
                <p className="text-xs text-muted-foreground">Total Cadastrados</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{fornecedoresQualificados}</p>
                <p className="text-xs text-muted-foreground">Qualificados</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{fornecedoresEmAvaliacao}</p>
                <p className="text-xs text-muted-foreground">Em Avaliacao</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-destructive">{fornecedoresBloqueados}</p>
                <p className="text-xs text-muted-foreground">Bloqueados</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{fornecedoresAtivos}</p>
                <p className="text-xs text-muted-foreground">Com Pedidos Ativos</p>
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
                <p className="text-xs text-muted-foreground">Valor Contratado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Cadastro de Fornecedores</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar fornecedor..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                    <SelectItem value="Em Avaliacao">Em Avaliacao</SelectItem>
                    <SelectItem value="Bloqueado">Bloqueado</SelectItem>
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
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead className="text-center">Avaliacao</TableHead>
                  <TableHead className="text-center">Pontualidade</TableHead>
                  <TableHead className="text-center">Qualidade</TableHead>
                  <TableHead className="text-center">Pedidos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fornecedoresFiltrados.map((fornecedor) => (
                  <TableRow
                    key={fornecedor.id}
                    className={`cursor-pointer hover:bg-muted/50 ${fornecedor.status === "Bloqueado" ? "bg-destructive/5" : ""}`}
                    onClick={() => setFornecedorSelecionado(fornecedor)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{fornecedor.nomeFantasia}</p>
                        <p className="text-xs text-muted-foreground">{fornecedor.cnpj}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {fornecedor.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{fornecedor.especialidade}</TableCell>
                    <TableCell className="text-center">{getAvaliacaoStars(fornecedor.avaliacao)}</TableCell>
                    <TableCell className="text-center">
                      {fornecedor.pontualidade > 0 ? (
                        <span className={`font-medium ${getDesempenhoColor(fornecedor.pontualidade)}`}>
                          {fornecedor.pontualidade}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {fornecedor.qualidade > 0 ? (
                        <span className={`font-medium ${getDesempenhoColor(fornecedor.qualidade)}`}>
                          {fornecedor.qualidade}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {fornecedor.pedidosAtivos > 0 ? (
                        <Badge className="bg-primary/10 text-primary">{fornecedor.pedidosAtivos}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(fornecedor.status)}</TableCell>
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

        {/* Painel Lateral - Ficha do Fornecedor */}
        {fornecedorSelecionado && (
          <div className="fixed inset-y-0 right-0 w-[480px] bg-background border-l border-border shadow-xl z-50 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Header do Painel */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{fornecedorSelecionado.nomeFantasia}</h2>
                    {fornecedorSelecionado.status === "Bloqueado" && (
                      <Badge className="bg-destructive/10 text-destructive">Bloqueado</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{fornecedorSelecionado.razaoSocial}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFornecedorSelecionado(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Alerta se bloqueado */}
              {fornecedorSelecionado.status === "Bloqueado" && (
                <Card className="border-destructive bg-destructive/5">
                  <CardContent className="py-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Fornecedor Bloqueado</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(fornecedorSelecionado as typeof fornecedorSelecionado & { motivoBloqueio?: string })
                            .motivoBloqueio || "Motivo nao informado"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info de Contato */}
              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">CNPJ</p>
                      <p className="text-sm font-medium">{fornecedorSelecionado.cnpj}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Localizacao</p>
                      <p className="text-sm font-medium">
                        {fornecedorSelecionado.cidade}/{fornecedorSelecionado.uf}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Telefone</p>
                      <p className="text-sm font-medium">{fornecedorSelecionado.telefone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{fornecedorSelecionado.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contato Principal</p>
                      <p className="text-sm font-medium">{fornecedorSelecionado.contato}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Avaliacao de Desempenho */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Avaliacao de Desempenho</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-card">
                    <CardContent className="p-3 text-center">
                      <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xl font-bold text-foreground">
                        {fornecedorSelecionado.avaliacao > 0 ? fornecedorSelecionado.avaliacao.toFixed(1) : "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">Geral</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-3 text-center">
                      <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p
                        className={`text-xl font-bold ${fornecedorSelecionado.pontualidade > 0 ? getDesempenhoColor(fornecedorSelecionado.pontualidade) : "text-muted-foreground"}`}
                      >
                        {fornecedorSelecionado.pontualidade > 0 ? `${fornecedorSelecionado.pontualidade}%` : "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">Pontualidade</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-3 text-center">
                      <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p
                        className={`text-xl font-bold ${fornecedorSelecionado.qualidade > 0 ? getDesempenhoColor(fornecedorSelecionado.qualidade) : "text-muted-foreground"}`}
                      >
                        {fornecedorSelecionado.qualidade > 0 ? `${fornecedorSelecionado.qualidade}%` : "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">Qualidade</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Resumo Financeiro */}
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Total Contratado</p>
                      <p className="text-2xl font-bold text-foreground">
                        R$ {fornecedorSelecionado.valorContratado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Pedidos Ativos</p>
                      <p className="text-lg font-semibold text-primary">{fornecedorSelecionado.pedidosAtivos}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historico de Pedidos */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Historico de Pedidos
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Data</TableHead>
                      <TableHead>Pedido</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicoFornecedor.map((hist, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-sm">{new Date(hist.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-sm font-mono">{hist.pedido}</TableCell>
                        <TableCell className="text-right text-sm">R$ {hist.valor.toLocaleString("pt-BR")}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              hist.status === "Concluido"
                                ? "bg-muted text-muted-foreground"
                                : "bg-primary/10 text-primary"
                            }
                          >
                            {hist.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Acoes */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button className="flex-1 bg-primary text-primary-foreground">
                  <Package className="w-4 h-4 mr-2" />
                  Novo Pedido
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Editar Cadastro
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuprimentosFornecedoresPage() {
  return (
    <Suspense fallback={null}>
      <SuprimentosFornecedoresContent />
    </Suspense>
  )
}
