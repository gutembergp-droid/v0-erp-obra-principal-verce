"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Briefcase,
  Search,
  TrendingUp,
  AlertTriangle,
  Scale,
  Plus,
  Download,
  MoreHorizontal,
  Eye,
  History,
  FileEdit,
  Layers,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Info,
  ArrowUpRight,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - ESTRUTURA DE CARGOS
// ============================================

const cargosMock = [
  {
    id: 1,
    cargo: "Pedreiro",
    classificacao: "Direto",
    natureza: "Operacional",
    vinculos: ["CLT"],
    qtdNiveis: 4,
    valorOrcado: 2900,
    valorMedioPraticado: 3100,
    status: "desvio",
    niveis: [
      {
        nivel: "N1",
        descricao: "Inicial",
        salarioBase: 2700,
        custoHora: 12.27,
        refOrcada: 2600,
        elegBeneficios: true,
        elegPremios: false,
        status: "ok",
      },
      {
        nivel: "N2",
        descricao: "Pleno",
        salarioBase: 2900,
        custoHora: 13.18,
        refOrcada: 2900,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "N3",
        descricao: "Senior",
        salarioBase: 3200,
        custoHora: 14.55,
        refOrcada: 2900,
        elegBeneficios: true,
        elegPremios: true,
        status: "desvio",
      },
      {
        nivel: "Bivalente",
        descricao: "Multifuncional",
        salarioBase: 3500,
        custoHora: 15.9,
        refOrcada: 3100,
        elegBeneficios: true,
        elegPremios: true,
        status: "desvio",
      },
    ],
    historico: [
      {
        data: "2025-01-15",
        tipo: "Criacao de Nivel",
        valorAnterior: "-",
        valorNovo: "N4 - Bivalente",
        motivo: "Demanda operacional",
        aprovador: "Carlos Silva",
      },
      {
        data: "2024-11-01",
        tipo: "Reajuste Salarial",
        valorAnterior: "R$ 2.800",
        valorNovo: "R$ 2.900",
        motivo: "Acordo coletivo 2024",
        aprovador: "Maria Santos",
      },
    ],
  },
  {
    id: 2,
    cargo: "Armador",
    classificacao: "Direto",
    natureza: "Operacional",
    vinculos: ["CLT"],
    qtdNiveis: 3,
    valorOrcado: 3200,
    valorMedioPraticado: 3200,
    status: "ok",
    niveis: [
      {
        nivel: "N1",
        descricao: "Inicial",
        salarioBase: 2900,
        custoHora: 13.18,
        refOrcada: 2900,
        elegBeneficios: true,
        elegPremios: false,
        status: "ok",
      },
      {
        nivel: "N2",
        descricao: "Pleno",
        salarioBase: 3200,
        custoHora: 14.55,
        refOrcada: 3200,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "N3",
        descricao: "Senior",
        salarioBase: 3500,
        custoHora: 15.9,
        refOrcada: 3500,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
    ],
    historico: [
      {
        data: "2024-11-01",
        tipo: "Reajuste Salarial",
        valorAnterior: "R$ 3.000",
        valorNovo: "R$ 3.200",
        motivo: "Acordo coletivo 2024",
        aprovador: "Maria Santos",
      },
    ],
  },
  {
    id: 3,
    cargo: "Mestre de Obras",
    classificacao: "Indireto",
    natureza: "Tecnica",
    vinculos: ["CLT", "PJ"],
    qtdNiveis: 2,
    valorOrcado: 6500,
    valorMedioPraticado: 6800,
    status: "desvio",
    niveis: [
      {
        nivel: "N1",
        descricao: "Pleno",
        salarioBase: 6500,
        custoHora: 29.55,
        refOrcada: 6500,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "N2",
        descricao: "Senior",
        salarioBase: 7200,
        custoHora: 32.73,
        refOrcada: 6500,
        elegBeneficios: true,
        elegPremios: true,
        status: "desvio",
      },
    ],
    historico: [
      {
        data: "2025-01-10",
        tipo: "Ajuste de Faixa",
        valorAnterior: "R$ 6.500",
        valorNovo: "R$ 7.200",
        motivo: "Retencao de talentos",
        aprovador: "Diretor RH",
      },
    ],
  },
  {
    id: 4,
    cargo: "Operador de Escavadeira",
    classificacao: "Direto",
    natureza: "Operacional",
    vinculos: ["CLT", "Terceiro"],
    qtdNiveis: 3,
    valorOrcado: 4500,
    valorMedioPraticado: 4500,
    status: "ok",
    niveis: [
      {
        nivel: "N1",
        descricao: "Inicial",
        salarioBase: 4000,
        custoHora: 18.18,
        refOrcada: 4000,
        elegBeneficios: true,
        elegPremios: false,
        status: "ok",
      },
      {
        nivel: "N2",
        descricao: "Pleno",
        salarioBase: 4500,
        custoHora: 20.45,
        refOrcada: 4500,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "N3",
        descricao: "Senior",
        salarioBase: 5200,
        custoHora: 23.64,
        refOrcada: 5200,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
    ],
    historico: [],
  },
  {
    id: 5,
    cargo: "Engenheiro Civil",
    classificacao: "Indireto",
    natureza: "Tecnica",
    vinculos: ["CLT", "PJ"],
    qtdNiveis: 3,
    valorOrcado: 15000,
    valorMedioPraticado: 15000,
    status: "ok",
    niveis: [
      {
        nivel: "Jr",
        descricao: "Junior",
        salarioBase: 10000,
        custoHora: 45.45,
        refOrcada: 10000,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "Pl",
        descricao: "Pleno",
        salarioBase: 15000,
        custoHora: 68.18,
        refOrcada: 15000,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "Sr",
        descricao: "Senior",
        salarioBase: 20000,
        custoHora: 90.91,
        refOrcada: 20000,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
    ],
    historico: [],
  },
  {
    id: 6,
    cargo: "Tecnico de Seguranca",
    classificacao: "Indireto",
    natureza: "Tecnica",
    vinculos: ["CLT"],
    qtdNiveis: 2,
    valorOrcado: 5500,
    valorMedioPraticado: 5500,
    status: "ok",
    niveis: [
      {
        nivel: "N1",
        descricao: "Pleno",
        salarioBase: 5000,
        custoHora: 22.73,
        refOrcada: 5000,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
      {
        nivel: "N2",
        descricao: "Senior",
        salarioBase: 6000,
        custoHora: 27.27,
        refOrcada: 6000,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
    ],
    historico: [],
  },
  {
    id: 7,
    cargo: "Almoxarife",
    classificacao: "Indireto",
    natureza: "Administrativa",
    vinculos: ["CLT"],
    qtdNiveis: 2,
    valorOrcado: 3000,
    valorMedioPraticado: 3000,
    status: "ok",
    niveis: [
      {
        nivel: "N1",
        descricao: "Inicial",
        salarioBase: 2800,
        custoHora: 12.73,
        refOrcada: 2800,
        elegBeneficios: true,
        elegPremios: false,
        status: "ok",
      },
      {
        nivel: "N2",
        descricao: "Pleno",
        salarioBase: 3200,
        custoHora: 14.55,
        refOrcada: 3200,
        elegBeneficios: true,
        elegPremios: true,
        status: "ok",
      },
    ],
    historico: [],
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function CargosSalariosContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroClassificacao, setFiltroClassificacao] = useState("todos")
  const [filtroNatureza, setFiltroNatureza] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")

  // Drawer de niveis
  const [cargoSelecionado, setCargoSelecionado] = useState<(typeof cargosMock)[0] | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [abaDrawer, setAbaDrawer] = useState("niveis")

  // Dialog de solicitacao de ajuste
  const [dialogAjusteOpen, setDialogAjusteOpen] = useState(false)
  const [justificativaAjuste, setJustificativaAjuste] = useState("")

  // Calculos
  const totalCargos = cargosMock.length
  const totalNiveis = cargosMock.reduce((acc, c) => acc + c.qtdNiveis, 0)
  const cargosComDesvio = cargosMock.filter((c) => c.status === "desvio").length
  const promocoesPeriodo = 5 // mock

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  // Filtros
  const cargosFiltrados = cargosMock.filter((c) => {
    const matchSearch = c.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchClassificacao = filtroClassificacao === "todos" || c.classificacao === filtroClassificacao
    const matchNatureza = filtroNatureza === "todos" || c.natureza === filtroNatureza
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus
    return matchSearch && matchClassificacao && matchNatureza && matchStatus
  })

  const abrirNiveis = (cargo: (typeof cargosMock)[0]) => {
    setCargoSelecionado(cargo)
    setAbaDrawer("niveis")
    setDrawerOpen(true)
  }

  const abrirHistorico = (cargo: (typeof cargosMock)[0]) => {
    setCargoSelecionado(cargo)
    setAbaDrawer("historico")
    setDrawerOpen(true)
  }

  const solicitarAjuste = (cargo: (typeof cargosMock)[0]) => {
    setCargoSelecionado(cargo)
    setDialogAjusteOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>RH</span>
              <ChevronRight className="h-4 w-4" />
              <span>Cargos & Salarios</span>
            </div>
            <h1 className="text-2xl font-bold">Cargos & Salarios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Estrutura de cargos e faixas salariais - Referencia Custos, Gestao RH
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cargo
            </Button>
          </div>
        </div>

        {/* Cards de Visao */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCargos}</p>
                  <p className="text-xs text-muted-foreground">Total de Cargos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Layers className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalNiveis}</p>
                  <p className="text-xs text-muted-foreground">Total de Niveis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cargosComDesvio > 0 ? "border-red-500/30 bg-red-500/5" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${cargosComDesvio > 0 ? "bg-red-500/10" : "bg-muted"}`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 ${cargosComDesvio > 0 ? "text-red-500" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${cargosComDesvio > 0 ? "text-red-500" : ""}`}>{cargosComDesvio}</p>
                  <p className="text-xs text-muted-foreground">Cargos com Desvio</p>
                </div>
              </div>
              {cargosComDesvio > 0 && (
                <div className="mt-2 flex items-center gap-1 text-xs text-orange-500">
                  <Scale className="h-3 w-3" />
                  <span>Alerta juridico</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-500">{promocoesPeriodo}</p>
                  <p className="text-xs text-muted-foreground">Promocoes/Evolucoes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aviso Governanca */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Governanca:</strong> Custos define o baseline orcado. RH define o real praticado. Desvios sao
            permitidos, mas devem ser registrados, justificados e aprovados quando exigido.
          </AlertDescription>
        </Alert>

        {/* Tabela Principal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-base font-medium">Estrutura de Cargos</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cargo..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-2">
                <Select value={filtroClassificacao} onValueChange={setFiltroClassificacao}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Classificacao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="Direto">Direto</SelectItem>
                    <SelectItem value="Indireto">Indireto</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroNatureza} onValueChange={setFiltroNatureza}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Natureza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="Operacional">Operacional</SelectItem>
                    <SelectItem value="Administrativa">Administrativa</SelectItem>
                    <SelectItem value="Tecnica">Tecnica</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ok">Dentro do Orcado</SelectItem>
                    <SelectItem value="desvio">Com Desvio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Classificacao</TableHead>
                  <TableHead>Natureza</TableHead>
                  <TableHead>Vinculos</TableHead>
                  <TableHead className="text-center">Niveis</TableHead>
                  <TableHead className="text-right">Valor Orcado</TableHead>
                  <TableHead className="text-right">Medio Praticado</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargosFiltrados.map((cargo) => (
                  <TableRow key={cargo.id} className={cargo.status === "desvio" ? "bg-red-500/5" : ""}>
                    <TableCell className="font-medium">{cargo.cargo}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          cargo.classificacao === "Direto"
                            ? "border-blue-500/50 text-blue-400"
                            : "border-purple-500/50 text-purple-400"
                        }
                      >
                        {cargo.classificacao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {cargo.natureza}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {cargo.vinculos.map((v, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {v}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{cargo.qtdNiveis}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(cargo.valorOrcado)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(cargo.valorMedioPraticado)}
                    </TableCell>
                    <TableCell className="text-center">
                      {cargo.status === "desvio" ? (
                        <div className="flex items-center justify-center gap-1">
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Desvio</Badge>
                          <Scale className="h-4 w-4 text-orange-500" title="Alerta juridico" />
                        </div>
                      ) : (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">OK</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => abrirNiveis(cargo)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Niveis
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => abrirHistorico(cargo)}>
                            <History className="mr-2 h-4 w-4" />
                            Historico
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => solicitarAjuste(cargo)}>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Solicitar Ajuste
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {cargosFiltrados.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum cargo encontrado com os filtros aplicados.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informativo de Integracoes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Integracoes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                Impacta Beneficios
              </Badge>
              <Badge variant="outline" className="text-xs">
                Impacta Premios
              </Badge>
              <Badge variant="outline" className="text-xs">
                Impacta Consolidacao RH
              </Badge>
              <Badge variant="outline" className="text-xs">
                Referencia para Custos
              </Badge>
              <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-400">
                Base para Juridico (piso, enquadramento)
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drawer de Niveis e Historico */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {cargoSelecionado && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {cargoSelecionado.cargo}
                </SheetTitle>
                <SheetDescription>
                  {cargoSelecionado.classificacao} | {cargoSelecionado.natureza} |{" "}
                  {cargoSelecionado.vinculos.join(", ")}
                </SheetDescription>
              </SheetHeader>

              <Tabs value={abaDrawer} onValueChange={setAbaDrawer} className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="niveis">Niveis</TabsTrigger>
                  <TabsTrigger value="historico">Historico</TabsTrigger>
                </TabsList>

                {/* Aba Niveis */}
                <TabsContent value="niveis" className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {cargoSelecionado.qtdNiveis} nivel(is) configurado(s)
                    </p>
                    <Button size="sm" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Nivel
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nivel</TableHead>
                        <TableHead>Descricao</TableHead>
                        <TableHead className="text-right">Salario Base</TableHead>
                        <TableHead className="text-right">Custo/Hora</TableHead>
                        <TableHead className="text-right">Ref. Orcada</TableHead>
                        <TableHead className="text-center">Benef.</TableHead>
                        <TableHead className="text-center">Premios</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cargoSelecionado.niveis.map((nivel, idx) => (
                        <TableRow key={idx} className={nivel.status === "desvio" ? "bg-red-500/5" : ""}>
                          <TableCell className="font-medium">{nivel.nivel}</TableCell>
                          <TableCell>{nivel.descricao}</TableCell>
                          <TableCell className="text-right">{formatCurrency(nivel.salarioBase)}</TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatCurrency(nivel.custoHora)}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatCurrency(nivel.refOrcada)}
                          </TableCell>
                          <TableCell className="text-center">
                            {nivel.elegBeneficios ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {nivel.elegPremios ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {nivel.status === "desvio" ? (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Desvio</Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">OK</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* Aba Historico */}
                <TabsContent value="historico" className="mt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">Historico de evolucao - Registros imutaveis</p>

                  {cargoSelecionado.historico.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Valor Anterior</TableHead>
                          <TableHead>Valor Novo</TableHead>
                          <TableHead>Motivo</TableHead>
                          <TableHead>Aprovador</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cargoSelecionado.historico.map((h, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-muted-foreground">{h.data}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {h.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell>{h.valorAnterior}</TableCell>
                            <TableCell className="font-medium">{h.valorNovo}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={h.motivo}>
                              {h.motivo}
                            </TableCell>
                            <TableCell>{h.aprovador}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum historico registrado</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog Solicitacao de Ajuste */}
      <Dialog open={dialogAjusteOpen} onOpenChange={setDialogAjusteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Ajuste de Cargo</DialogTitle>
            <DialogDescription>
              {cargoSelecionado?.cargo} - Esta solicitacao entrara no workflow de aprovacao.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Ajuste</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reajuste">Reajuste Salarial</SelectItem>
                  <SelectItem value="novo_nivel">Criacao de Nivel</SelectItem>
                  <SelectItem value="alteracao_faixa">Alteracao de Faixa</SelectItem>
                  <SelectItem value="reclassificacao">Reclassificacao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Justificativa *</Label>
              <Textarea
                placeholder="Descreva o motivo do ajuste solicitado..."
                value={justificativaAjuste}
                onChange={(e) => setJustificativaAjuste(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">Obrigatorio para prosseguir com a solicitacao.</p>
            </div>

            <Alert>
              <Scale className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Ajustes que geram desvio do orcado exigem aprovacao da gerencia e podem gerar alerta juridico.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAjusteOpen(false)}>
              Cancelar
            </Button>
            <Button disabled={!justificativaAjuste.trim()}>Enviar Solicitacao</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function CargosSalariosPage() {
  return (
    <Suspense fallback={null}>
      <CargosSalariosContent />
    </Suspense>
  )
}
