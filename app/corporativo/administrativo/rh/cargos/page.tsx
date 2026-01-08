"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Briefcase,
  Search,
  Download,
  Plus,
  Eye,
  RefreshCw,
  Users,
  TrendingUp,
  Building2,
  Edit,
  GraduationCap,
  DollarSign,
} from "lucide-react"

// Dados mockados - Cargos
const cargosMock = [
  {
    codigo: "ENG-001",
    cargo: "Engenheiro Civil Pleno",
    nivel: "Pleno",
    area: "Engenharia",
    cbo: "2142-05",
    faixaMin: 12000,
    faixaMed: 15000,
    faixaMax: 18000,
    ocupantes: 24,
    status: "ativo",
  },
  {
    codigo: "ENG-002",
    cargo: "Engenheiro Civil Senior",
    nivel: "Senior",
    area: "Engenharia",
    cbo: "2142-05",
    faixaMin: 18000,
    faixaMed: 22000,
    faixaMax: 28000,
    ocupantes: 8,
    status: "ativo",
  },
  {
    codigo: "PRD-001",
    cargo: "Encarregado de Produção",
    nivel: "Pleno",
    area: "Produção",
    cbo: "7102-05",
    faixaMin: 5500,
    faixaMed: 7000,
    faixaMax: 8500,
    ocupantes: 45,
    status: "ativo",
  },
  {
    codigo: "PRD-002",
    cargo: "Operador de Máquinas Pesadas",
    nivel: "Junior",
    area: "Produção",
    cbo: "7151-15",
    faixaMin: 3800,
    faixaMed: 4500,
    faixaMax: 5500,
    ocupantes: 120,
    status: "ativo",
  },
  {
    codigo: "ADM-001",
    cargo: "Analista Administrativo",
    nivel: "Pleno",
    area: "Administrativo",
    cbo: "2521-05",
    faixaMin: 4500,
    faixaMed: 5500,
    faixaMax: 7000,
    ocupantes: 18,
    status: "ativo",
  },
  {
    codigo: "SSM-001",
    cargo: "Técnico de Segurança do Trabalho",
    nivel: "Pleno",
    area: "SSMA",
    cbo: "3516-05",
    faixaMin: 4000,
    faixaMed: 5000,
    faixaMax: 6500,
    ocupantes: 15,
    status: "ativo",
  },
  {
    codigo: "FIN-001",
    cargo: "Analista Financeiro",
    nivel: "Senior",
    area: "Financeiro",
    cbo: "2522-10",
    faixaMin: 7000,
    faixaMed: 9000,
    faixaMax: 12000,
    ocupantes: 6,
    status: "ativo",
  },
  {
    codigo: "PRD-003",
    cargo: "Servente de Obras",
    nivel: "Junior",
    area: "Produção",
    cbo: "7170-20",
    faixaMin: 1800,
    faixaMed: 2200,
    faixaMax: 2800,
    ocupantes: 200,
    status: "ativo",
  },
]

// Tabela salarial resumida
const tabelaSalarial = [
  { nivel: "Junior", minimo: 1800, medio: 3500, maximo: 5500 },
  { nivel: "Pleno", minimo: 4000, medio: 8000, maximo: 15000 },
  { nivel: "Senior", minimo: 7000, medio: 15000, maximo: 28000 },
  { nivel: "Especialista", minimo: 12000, medio: 20000, maximo: 35000 },
  { nivel: "Gestor", minimo: 15000, medio: 25000, maximo: 50000 },
]

function CargosContent() {
  const [abaAtiva, setAbaAtiva] = useState("cargos")
  const [busca, setBusca] = useState("")
  const [filtroArea, setFiltroArea] = useState("todos")
  const [filtroNivel, setFiltroNivel] = useState("todos")

  // Totais
  const totalCargos = cargosMock.length
  const totalOcupantes = cargosMock.reduce((acc, c) => acc + c.ocupantes, 0)
  const areas = [...new Set(cargosMock.map((c) => c.area))]

  const cargosFiltrados = cargosMock.filter((c) => {
    const matchBusca =
      c.cargo.toLowerCase().includes(busca.toLowerCase()) || c.codigo.toLowerCase().includes(busca.toLowerCase())
    const matchArea = filtroArea === "todos" || c.area === filtroArea
    const matchNivel = filtroNivel === "todos" || c.nivel === filtroNivel
    return matchBusca && matchArea && matchNivel
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getNivelBadge = (nivel: string) => {
    switch (nivel) {
      case "Junior":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Junior</Badge>
      case "Pleno":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Pleno</Badge>
      case "Senior":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Senior</Badge>
      case "Especialista":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Especialista</Badge>
      case "Gestor":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Gestor</Badge>
      default:
        return <Badge variant="outline">{nivel}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <RHNav />
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Corporativo</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Cargos e Salários</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Briefcase className="h-6 w-6" />
            Cargos e Salários
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cargo
          </Button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Briefcase className="h-4 w-4" />
              <span className="text-xs">Total Cargos</span>
            </div>
            <p className="text-2xl font-bold">{totalCargos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Ocupantes</span>
            </div>
            <p className="text-2xl font-bold">{totalOcupantes.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building2 className="h-4 w-4" />
              <span className="text-xs">Áreas</span>
            </div>
            <p className="text-2xl font-bold">{areas.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">Níveis</span>
            </div>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Abas */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList>
          <TabsTrigger value="cargos" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Cargos
          </TabsTrigger>
          <TabsTrigger value="tabela" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Tabela Salarial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cargos" className="mt-4 space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cargo ou código..."
                    className="pl-10"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                <Select value={filtroArea} onValueChange={setFiltroArea}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    {areas.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Pleno">Pleno</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBusca("")
                    setFiltroArea("todos")
                    setFiltroNivel("todos")
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Cargos */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Cargos ({cargosFiltrados.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>CBO</TableHead>
                    <TableHead className="text-right">Faixa Mín.</TableHead>
                    <TableHead className="text-right">Faixa Méd.</TableHead>
                    <TableHead className="text-right">Faixa Máx.</TableHead>
                    <TableHead className="text-center">Ocupantes</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cargosFiltrados.map((c) => (
                    <TableRow key={c.codigo}>
                      <TableCell className="font-mono text-xs">{c.codigo}</TableCell>
                      <TableCell className="font-medium">{c.cargo}</TableCell>
                      <TableCell>{c.area}</TableCell>
                      <TableCell>{getNivelBadge(c.nivel)}</TableCell>
                      <TableCell className="text-muted-foreground">{c.cbo}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.faixaMin)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(c.faixaMed)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.faixaMax)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{c.ocupantes}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="tabela" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Tabela Salarial por Nível
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nível</TableHead>
                    <TableHead className="text-right">Mínimo</TableHead>
                    <TableHead className="text-right">Médio</TableHead>
                    <TableHead className="text-right">Máximo</TableHead>
                    <TableHead className="text-center">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tabelaSalarial.map((t) => (
                    <TableRow key={t.nivel}>
                      <TableCell className="font-medium">{getNivelBadge(t.nivel)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(t.minimo)}</TableCell>
                      <TableCell className="text-right font-medium text-green-400">{formatCurrency(t.medio)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(t.maximo)}</TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {Math.round(((t.maximo - t.minimo) / t.minimo) * 100)}%
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

export default function CargosPage() {
  return (
    <Suspense fallback={null}>
      <CargosContent />
    </Suspense>
  )
}
