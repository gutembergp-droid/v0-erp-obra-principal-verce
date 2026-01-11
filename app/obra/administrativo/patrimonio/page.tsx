"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ObraAdministrativoNavbar } from "../../_components/obra-administrativo-navbar"
import {
  Package,
  Search,
  Filter,
  QrCode,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRightLeft,
  FileText,
  ChevronRight,
  DollarSign,
  TrendingDown,
  ClipboardList,
  Building,
} from "lucide-react"

// Dados mockados
const kpis = {
  totalBens: 248,
  valorTotal: 4850000,
  emUso: 215,
  emManutencao: 18,
  baixados: 15,
  depreciacaoMes: 42500,
}

const bens = [
  {
    id: "PAT-001",
    codigo: "EQP-001",
    descricao: "Escavadeira Hidraulica CAT 320",
    categoria: "Equipamento",
    localizacao: "Frente Terraplanagem",
    status: "Em Uso",
    valorOriginal: 850000,
    valorAtual: 680000,
    depreciacao: 20,
    dataAquisicao: "15/03/2024",
    vidaUtil: "10 anos",
    responsavel: "Jose Silva",
    plaqueta: "PLQ-2024-001",
  },
  {
    id: "PAT-002",
    codigo: "VEI-005",
    descricao: "Caminhao Basculante Volvo",
    categoria: "Veiculo",
    localizacao: "Patio Central",
    status: "Em Manutencao",
    valorOriginal: 450000,
    valorAtual: 382500,
    depreciacao: 15,
    dataAquisicao: "20/06/2024",
    vidaUtil: "8 anos",
    responsavel: "Carlos Santos",
    plaqueta: "PLQ-2024-005",
  },
  {
    id: "PAT-003",
    codigo: "MOB-012",
    descricao: "Container Escritorio 40 pes",
    categoria: "Mobiliario",
    localizacao: "Canteiro Central",
    status: "Em Uso",
    valorOriginal: 85000,
    valorAtual: 76500,
    depreciacao: 10,
    dataAquisicao: "01/01/2025",
    vidaUtil: "15 anos",
    responsavel: "Maria Costa",
    plaqueta: "PLQ-2025-012",
  },
  {
    id: "PAT-004",
    codigo: "FER-028",
    descricao: "Betoneira 400L",
    categoria: "Ferramenta",
    localizacao: "Almoxarifado",
    status: "Baixado",
    valorOriginal: 12000,
    valorAtual: 0,
    depreciacao: 100,
    dataAquisicao: "10/05/2022",
    vidaUtil: "5 anos",
    responsavel: "-",
    plaqueta: "PLQ-2022-028",
  },
  {
    id: "PAT-005",
    codigo: "EQP-015",
    descricao: "Compactador de Solo",
    categoria: "Equipamento",
    localizacao: "Frente Drenagem",
    status: "Em Uso",
    valorOriginal: 180000,
    valorAtual: 153000,
    depreciacao: 15,
    dataAquisicao: "08/08/2024",
    vidaUtil: "10 anos",
    responsavel: "Roberto Lima",
    plaqueta: "PLQ-2024-015",
  },
]

const movimentacoes = [
  {
    data: "05/01/2026",
    bem: "EQP-001",
    tipo: "Transferencia",
    origem: "Patio",
    destino: "Frente Terra",
    responsavel: "Jose Silva",
  },
  {
    data: "04/01/2026",
    bem: "VEI-005",
    tipo: "Manutencao",
    origem: "Frente",
    destino: "Oficina",
    responsavel: "Carlos Santos",
  },
  {
    data: "03/01/2026",
    bem: "FER-028",
    tipo: "Baixa",
    origem: "Almoxarifado",
    destino: "-",
    responsavel: "Administracao",
  },
]

function PatrimonioContent() {
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [bemSelecionado, setBemSelecionado] = useState<(typeof bens)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const bensFiltrados = bens.filter((bem) => {
    const matchCategoria = filtroCategoria === "todos" || bem.categoria === filtroCategoria
    const matchStatus = filtroStatus === "todos" || bem.status === filtroStatus
    const matchBusca =
      busca === "" ||
      bem.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      bem.codigo.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchStatus && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Uso":
        return "bg-primary/10 text-primary"
      case "Em Manutencao":
        return "bg-accent/20 text-accent-foreground"
      case "Baixado":
        return "bg-destructive/10 text-destructive"
      case "Disponivel":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em Uso":
        return <CheckCircle className="w-4 h-4" />
      case "Em Manutencao":
        return <AlertTriangle className="w-4 h-4" />
      case "Baixado":
        return <XCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const abrirDetalhe = (bem: (typeof bens)[0]) => {
    setBemSelecionado(bem)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Patrimonio</h1>
              <Badge variant="outline" className="text-xs">
                AD-03
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Controle de bens e ativos da obra</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ClipboardList className="w-4 h-4 mr-2" />
              Inventario
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <Package className="w-4 h-4 mr-2" />
              Novo Bem
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-6 gap-4">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total de Bens</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.totalBens}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Valor Total</p>
                  <p className="text-xl font-bold text-foreground">R$ 4,85M</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Em Uso</p>
                  <p className="text-2xl font-bold text-primary">{kpis.emUso}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Em Manutencao</p>
                  <p className="text-2xl font-bold text-accent-foreground">{kpis.emManutencao}</p>
                </div>
                <div className="p-2 rounded-lg bg-accent/20">
                  <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Baixados</p>
                  <p className="text-2xl font-bold text-destructive">{kpis.baixados}</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Depreciacao/Mes</p>
                  <p className="text-xl font-bold text-foreground">R$ 42,5K</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <TrendingDown className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Governanca */}
        {kpis.emManutencao > 15 && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Bens em manutencao acima do esperado</p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.emManutencao} bens em manutencao. Verificar plano de manutencao preventiva.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Tabela de Bens */}
          <div className="col-span-2 space-y-4">
            {/* Filtros */}
            <Card className="bg-card border">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros:</span>
                  </div>

                  <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="Equipamento">Equipamento</SelectItem>
                      <SelectItem value="Veiculo">Veiculo</SelectItem>
                      <SelectItem value="Mobiliario">Mobiliario</SelectItem>
                      <SelectItem value="Ferramenta">Ferramenta</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Em Uso">Em Uso</SelectItem>
                      <SelectItem value="Em Manutencao">Em Manutencao</SelectItem>
                      <SelectItem value="Disponivel">Disponivel</SelectItem>
                      <SelectItem value="Baixado">Baixado</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por descricao ou codigo..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela */}
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  Cadastro de Bens
                  <Badge variant="secondary" className="ml-2">
                    {bensFiltrados.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="p-3 font-medium">Codigo</th>
                        <th className="p-3 font-medium">Descricao</th>
                        <th className="p-3 font-medium">Categoria</th>
                        <th className="p-3 font-medium">Localizacao</th>
                        <th className="p-3 font-medium">Status</th>
                        <th className="p-3 font-medium">Valor Atual</th>
                        <th className="p-3 font-medium">Acoes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {bensFiltrados.map((bem) => (
                        <tr
                          key={bem.id}
                          className="hover:bg-muted/30 cursor-pointer transition-colors"
                          onClick={() => abrirDetalhe(bem)}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <QrCode className="w-4 h-4 text-muted-foreground" />
                              <span className="font-mono text-sm text-foreground">{bem.codigo}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-foreground">{bem.descricao}</span>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {bem.categoria}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {bem.localizacao}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={`text-xs ${getStatusColor(bem.status)}`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(bem.status)}
                                {bem.status}
                              </span>
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-foreground">{formatCurrency(bem.valorAtual)}</span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Movimentacoes Recentes */}
          <div className="space-y-4">
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-primary" />
                  Movimentacoes Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {movimentacoes.map((mov, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {mov.bem}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{mov.data}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            mov.tipo === "Transferencia"
                              ? "bg-primary/10 text-primary"
                              : mov.tipo === "Manutencao"
                                ? "bg-accent/20 text-accent-foreground"
                                : "bg-destructive/10 text-destructive"
                          }
                        >
                          {mov.tipo}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {mov.origem} → {mov.destino}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Resumo por Categoria */}
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  Por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Equipamentos</span>
                  <span className="text-sm font-medium text-foreground">85</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Veiculos</span>
                  <span className="text-sm font-medium text-foreground">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mobiliario</span>
                  <span className="text-sm font-medium text-foreground">78</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ferramentas</span>
                  <span className="text-sm font-medium text-foreground">53</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Painel Lateral */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Detalhe do Bem
              </SheetTitle>
            </SheetHeader>

            {bemSelecionado && (
              <div className="mt-6 space-y-6">
                {/* Info Principal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {bemSelecionado.codigo}
                    </Badge>
                    <Badge className={getStatusColor(bemSelecionado.status)}>
                      {getStatusIcon(bemSelecionado.status)}
                      <span className="ml-1">{bemSelecionado.status}</span>
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{bemSelecionado.descricao}</h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <QrCode className="w-4 h-4" />
                    <span>Plaqueta: {bemSelecionado.plaqueta}</span>
                  </div>
                </div>

                <Separator />

                {/* Valores */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Valores</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Valor Original</p>
                        <p className="text-lg font-bold text-foreground">
                          {formatCurrency(bemSelecionado.valorOriginal)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Valor Atual</p>
                        <p className="text-lg font-bold text-foreground">{formatCurrency(bemSelecionado.valorAtual)}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Depreciacao Acumulada</span>
                        <span className="text-sm font-medium text-destructive">{bemSelecionado.depreciacao}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Detalhes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Detalhes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Categoria</span>
                      <Badge variant="outline">{bemSelecionado.categoria}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Localizacao</span>
                      <span className="text-foreground">{bemSelecionado.localizacao}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Responsavel</span>
                      <span className="text-foreground">{bemSelecionado.responsavel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Aquisicao</span>
                      <span className="text-foreground">{bemSelecionado.dataAquisicao}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Vida Util</span>
                      <span className="text-foreground">{bemSelecionado.vidaUtil}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Acoes */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Transferir
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Historico
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function PatrimonioPage() {
  return (
    <Suspense fallback={null}>
      <PatrimonioContent />
    </Suspense>
  )
}
