"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Plus,
  Search,
  Users,
  UserCheck,
  FileText,
  Download,
  BarChart3,
  TableIcon,
  Eye,
  AlertTriangle,
  AlertCircle,
  Ban,
  Building2,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronRight,
  Filter,
  ClipboardCheck,
  Shield,
  GraduationCap,
  HeartPulse,
  Hourglass,
  CheckCircle2,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

// ============================================
// DADOS MOCKADOS
// ============================================

const colaboradoresMock = [
  {
    id: "COL-001",
    nome: "Jose Silva Santos",
    cpf: "123.456.789-00",
    funcao: "Operador de Escavadeira",
    setor: "Producao",
    vinculo: "CLT",
    classificacao: "Direto",
    admissao: "2024-02-15",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "OK",
  },
  {
    id: "COL-002",
    nome: "Maria Aparecida Costa",
    cpf: "234.567.890-11",
    funcao: "Engenheira Civil",
    setor: "Engenharia",
    vinculo: "CLT",
    classificacao: "Indireto",
    admissao: "2024-01-10",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "OK",
  },
  {
    id: "COL-003",
    nome: "Carlos Eduardo Lima",
    cpf: "345.678.901-22",
    funcao: "Consultor de Seguranca",
    setor: "SSMA",
    vinculo: "PJ",
    classificacao: "Indireto",
    admissao: "2024-03-01",
    statusGeral: "Ativo",
    statusDocumental: "Pendente",
    statusSST: "OK",
  },
  {
    id: "COL-004",
    nome: "Ana Paula Ferreira",
    cpf: "456.789.012-33",
    funcao: "Motorista",
    setor: "Producao",
    vinculo: "Terceirizado",
    classificacao: "Direto",
    admissao: "2024-04-15",
    statusGeral: "Afastado",
    statusDocumental: "OK",
    statusSST: "Pendente",
  },
  {
    id: "COL-005",
    nome: "Roberto Alves Souza",
    cpf: "567.890.123-44",
    funcao: "Pedreiro",
    setor: "Producao",
    vinculo: "CLT",
    classificacao: "Direto",
    admissao: "2024-05-20",
    statusGeral: "Bloqueado",
    statusDocumental: "Pendente",
    statusSST: "Pendente",
  },
  {
    id: "COL-006",
    nome: "Fernanda Oliveira",
    cpf: "678.901.234-55",
    funcao: "Analista Administrativo",
    setor: "Administrativo",
    vinculo: "CLT",
    classificacao: "Indireto",
    admissao: "2024-06-01",
    statusGeral: "Ferias",
    statusDocumental: "OK",
    statusSST: "OK",
  },
  {
    id: "COL-007",
    nome: "Paulo Mendes",
    cpf: "789.012.345-66",
    funcao: "Eletricista",
    setor: "Producao",
    vinculo: "Terceirizado",
    classificacao: "Direto",
    admissao: "2024-07-10",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "OK",
  },
  {
    id: "COL-008",
    nome: "Juliana Santos",
    cpf: "890.123.456-77",
    funcao: "Almoxarife",
    setor: "Suprimentos",
    vinculo: "CLT",
    classificacao: "Indireto",
    admissao: "2024-08-15",
    statusGeral: "Ativo",
    statusDocumental: "OK",
    statusSST: "OK",
  },
]

const distribuicaoSetor = [
  { name: "Producao", value: 180, color: "#3b82f6" },
  { name: "Engenharia", value: 50, color: "#10b981" },
  { name: "Administrativo", value: 30, color: "#f59e0b" },
  { name: "SSMA", value: 25, color: "#ef4444" },
  { name: "Suprimentos", value: 15, color: "#8b5cf6" },
]

const acessosRapidos = [
  { label: "Colaboradores", icon: Users, href: "/obra/administrativo/rh/colaboradores", desc: "Lista operacional" },
  {
    label: "Pendencias",
    icon: AlertTriangle,
    href: "/obra/administrativo/rh/pendencias",
    desc: "Central de pendencias",
  },
  {
    label: "Consolidacao",
    icon: ClipboardCheck,
    href: "/obra/administrativo/rh/consolidacao",
    desc: "Consolidacao MO",
  },
  { label: "Analytics", icon: BarChart3, href: "/obra/administrativo/rh/analytics", desc: "People Analytics" },
  { label: "Documentos", icon: FileText, href: "/obra/administrativo/rh/documentos", desc: "Gestao documental" },
  { label: "Exames/ASO", icon: HeartPulse, href: "/obra/administrativo/rh/exames", desc: "Saude ocupacional" },
  {
    label: "Treinamentos",
    icon: GraduationCap,
    href: "/obra/administrativo/rh/treinamentos",
    desc: "NRs e capacitacoes",
  },
  { label: "Ponto", icon: Clock, href: "/obra/administrativo/rh/ponto", desc: "Controle de ponto" },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function RHObraContent() {
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVinculo, setFilterVinculo] = useState("todos")
  const [filterClassificacao, setFilterClassificacao] = useState("todos")
  const [filterFuncao, setFilterFuncao] = useState("todos")
  const [filterSetor, setFilterSetor] = useState("todos")
  const [filterStatusGeral, setFilterStatusGeral] = useState("todos")
  const [filterStatusDoc, setFilterStatusDoc] = useState("todos")

  // Contadores
  const total = 300
  const clt = 210
  const pj = 20
  const terceirizados = 70
  const efetivoDireto = 230
  const efetivoIndireto = 70
  const afastados = 9
  const bloqueados = 6
  const alertas = 2

  // Filtrar colaboradores
  const colaboradoresFiltrados = colaboradoresMock.filter((c) => {
    if (searchTerm && !c.nome.toLowerCase().includes(searchTerm.toLowerCase()) && !c.cpf.includes(searchTerm))
      return false
    if (filterVinculo !== "todos" && c.vinculo !== filterVinculo) return false
    if (filterClassificacao !== "todos" && c.classificacao !== filterClassificacao) return false
    if (filterSetor !== "todos" && c.setor !== filterSetor) return false
    if (filterStatusGeral !== "todos" && c.statusGeral !== filterStatusGeral) return false
    if (filterStatusDoc !== "todos" && c.statusDocumental !== filterStatusDoc) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativo</Badge>
      case "Afastado":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Afastado</Badge>
      case "Bloqueado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Bloqueado</Badge>
      case "Ferias":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Ferias</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDocStatusBadge = (status: string) => {
    if (status === "OK") {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          OK
        </Badge>
      )
    }
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        <AlertCircle className="h-3 w-3 mr-1" />
        Pendente
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">RH - Recursos Humanos</h1>
              <Badge variant="outline" className="text-xs">
                AD-01
              </Badge>
              <InfoTooltip content="Gestao de Recursos Humanos da Obra - Dashboard com visao consolidada do efetivo" />
            </div>
            <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Link href="/obra/administrativo/rh/colaborador/novo">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Colaborador
            </Button>
          </Link>
        </div>
      </div>

      {/* Cards de Visao */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <UserCheck className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <p className="text-2xl font-bold">{clt}</p>
            <p className="text-xs text-muted-foreground">CLT</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Briefcase className="h-5 w-5 mx-auto mb-1 text-purple-500" />
            <p className="text-2xl font-bold">{pj}</p>
            <p className="text-xs text-muted-foreground">PJ</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Building2 className="h-5 w-5 mx-auto mb-1 text-orange-500" />
            <p className="text-2xl font-bold">{terceirizados}</p>
            <p className="text-xs text-muted-foreground">Terceirizados</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Shield className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <p className="text-2xl font-bold">{efetivoDireto}</p>
            <p className="text-xs text-muted-foreground">Ef. Direto</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Shield className="h-5 w-5 mx-auto mb-1 text-teal-500" />
            <p className="text-2xl font-bold">{efetivoIndireto}</p>
            <p className="text-xs text-muted-foreground">Ef. Indireto</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Hourglass className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
            <p className="text-2xl font-bold">{afastados}</p>
            <p className="text-xs text-muted-foreground">Afastados</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 text-center">
            <Ban className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <p className="text-2xl font-bold">{bloqueados}</p>
            <p className="text-xs text-muted-foreground">Bloqueados</p>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-3 text-center">
            <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <p className="text-2xl font-bold text-red-500">{alertas}</p>
            <p className="text-xs text-red-400">Alertas</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafico + Acessos Rapidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafico de Composicao */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Composicao do Efetivo por Setor</CardTitle>
            <div className="flex gap-1">
              <Button
                variant={viewMode === "chart" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("chart")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "chart" ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribuicaoSetor}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {distribuicaoSetor.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} pessoas`, "Quantidade"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Setor</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distribuicaoSetor.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </TableCell>
                      <TableCell className="text-right">{item.value}</TableCell>
                      <TableCell className="text-right">{((item.value / total) * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Acessos Rapidos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Acessos Rapidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {acessosRapidos.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tabela Principal */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base font-medium">Colaboradores</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CPF..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
          <Collapsible open={filtersOpen}>
            <CollapsibleContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-3 border-t mt-3">
                <Select value={filterVinculo} onValueChange={setFilterVinculo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vinculo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Vinculos</SelectItem>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterClassificacao} onValueChange={setFilterClassificacao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Classificacao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="Direto">Direto</SelectItem>
                    <SelectItem value="Indireto">Indireto</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterFuncao} onValueChange={setFilterFuncao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Funcao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas Funcoes</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                    <SelectItem value="engenheiro">Engenheiro</SelectItem>
                    <SelectItem value="tecnico">Tecnico</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSetor} onValueChange={setFilterSetor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Setores</SelectItem>
                    <SelectItem value="Producao">Producao</SelectItem>
                    <SelectItem value="Engenharia">Engenharia</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                    <SelectItem value="SSMA">SSMA</SelectItem>
                    <SelectItem value="Suprimentos">Suprimentos</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatusGeral} onValueChange={setFilterStatusGeral}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Afastado">Afastado</SelectItem>
                    <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                    <SelectItem value="Ferias">Ferias</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatusDoc} onValueChange={setFilterStatusDoc}>
                  <SelectTrigger>
                    <SelectValue placeholder="Docs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="OK">OK</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Funcao</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Vinculo</TableHead>
                  <TableHead>Class.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Docs</TableHead>
                  <TableHead>SST</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colaboradoresFiltrados.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.nome}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.cpf}</TableCell>
                    <TableCell>{c.funcao}</TableCell>
                    <TableCell>{c.setor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{c.vinculo}</Badge>
                    </TableCell>
                    <TableCell>{c.classificacao}</TableCell>
                    <TableCell>{getStatusBadge(c.statusGeral)}</TableCell>
                    <TableCell>{getDocStatusBadge(c.statusDocumental)}</TableCell>
                    <TableCell>{getDocStatusBadge(c.statusSST)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/obra/administrativo/rh/colaborador/${c.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Exibindo {colaboradoresFiltrados.length} de {colaboradoresMock.length} colaboradores
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Proximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RHObraPage() {
  return (
    <Suspense fallback={null}>
      <RHObraContent />
    </Suspense>
  )
}
