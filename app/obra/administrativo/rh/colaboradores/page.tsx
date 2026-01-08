"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  Upload,
  Download,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  User,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Eye,
  AlertCircle,
  UserX,
  ArrowRight,
  Layers,
} from "lucide-react"
import Link from "next/link"

// Dados mockados
const colaboradoresMock = [
  {
    id: "1",
    nome: "João Silva",
    matricula: null,
    vinculo: "CLT",
    efetivo: "Direto",
    funcao: "Armador",
    setor: "Setor 1",
    empresa: "Empresa Própria",
    statusGlobal: "Ativo",
    workflow: "Docs",
    documentos: "Pendente",
    sst: "Pendente",
    ultimaAtualizacao: "2026-01-06",
  },
  {
    id: "2",
    nome: "Maria Santos",
    matricula: "000123",
    vinculo: "CLT",
    efetivo: "Indireto",
    funcao: "Adm Obra",
    setor: "Administrativo",
    empresa: "Empresa Própria",
    statusGlobal: "Ativo",
    workflow: "Efetivado",
    documentos: "OK",
    sst: "OK",
    ultimaAtualizacao: "2026-01-05",
  },
  {
    id: "3",
    nome: "Carlos Lima",
    matricula: null,
    vinculo: "Terceirizado",
    efetivo: "Direto",
    funcao: "Carpinteiro",
    setor: "Setor 2",
    empresa: "Beta Montagens",
    statusGlobal: "Ativo",
    workflow: "SST",
    documentos: "OK",
    sst: "Pendente",
    ultimaAtualizacao: "2026-01-04",
  },
  {
    id: "4",
    nome: "Pedro Alves",
    matricula: "000099",
    vinculo: "PJ",
    efetivo: "Direto",
    funcao: "Encarregado",
    setor: "Setor 3",
    empresa: "Empresa Própria",
    statusGlobal: "Afastado",
    workflow: "Efetivado",
    documentos: "OK",
    sst: "OK",
    ultimaAtualizacao: "2026-01-03",
  },
  {
    id: "5",
    nome: "Lucas Rocha",
    matricula: null,
    vinculo: "Terceirizado",
    efetivo: "Indireto",
    funcao: "Vigia",
    setor: "Portaria",
    empresa: "Alpha Serviços Ltda",
    statusGlobal: "Bloqueado",
    workflow: "Aprovação",
    documentos: "Vencido",
    sst: "OK",
    ultimaAtualizacao: "2026-01-02",
  },
  {
    id: "6",
    nome: "Ana Oliveira",
    matricula: "000145",
    vinculo: "CLT",
    efetivo: "Direto",
    funcao: "Servente",
    setor: "Setor 1",
    empresa: "Empresa Própria",
    statusGlobal: "Ativo",
    workflow: "Efetivado",
    documentos: "OK",
    sst: "OK",
    ultimaAtualizacao: "2026-01-07",
  },
  {
    id: "7",
    nome: "Roberto Souza",
    matricula: null,
    vinculo: "CLT",
    efetivo: "Direto",
    funcao: "Pedreiro",
    setor: "Setor 2",
    empresa: "Empresa Própria",
    statusGlobal: "Ativo",
    workflow: "Rascunho",
    documentos: "Pendente",
    sst: "Pendente",
    ultimaAtualizacao: "2026-01-08",
  },
  {
    id: "8",
    nome: "Fernanda Costa",
    matricula: "000167",
    vinculo: "CLT",
    efetivo: "Indireto",
    funcao: "Almoxarife",
    setor: "Administrativo",
    empresa: "Empresa Própria",
    statusGlobal: "Ativo",
    workflow: "Efetivado",
    documentos: "OK",
    sst: "OK",
    ultimaAtualizacao: "2026-01-06",
  },
  {
    id: "9",
    nome: "Marcos Pereira",
    matricula: null,
    vinculo: "Terceirizado",
    efetivo: "Direto",
    funcao: "Eletricista",
    setor: "Setor 3",
    empresa: "Gama Elétrica",
    statusGlobal: "Ativo",
    workflow: "Docs",
    documentos: "Pendente",
    sst: "OK",
    ultimaAtualizacao: "2026-01-05",
  },
  {
    id: "10",
    nome: "Patricia Dias",
    matricula: "000189",
    vinculo: "PJ",
    efetivo: "Indireto",
    funcao: "Eng. Segurança",
    setor: "QSMS",
    empresa: "Empresa Própria",
    statusGlobal: "Ativo",
    workflow: "Efetivado",
    documentos: "OK",
    sst: "OK",
    ultimaAtualizacao: "2026-01-04",
  },
]

const indicadores = {
  total: 300,
  clt: 210,
  pj: 20,
  terceiros: 70,
  direto: 230,
  indireto: 70,
  afastados: 9,
  bloqueados: 6,
}

function ColaboradoresContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [filtroVinculo, setFiltroVinculo] = useState("todos")
  const [filtroEfetivo, setFiltroEfetivo] = useState("todos")
  const [filtroStatusGlobal, setFiltroStatusGlobal] = useState("todos")
  const [filtroWorkflow, setFiltroWorkflow] = useState("todos")
  const [filtroSetor, setFiltroSetor] = useState("todos")
  const [filtroDocs, setFiltroDocs] = useState("todos")
  const [filtroSST, setFiltroSST] = useState("todos")
  const [agruparPor, setAgruparPor] = useState("nenhum")
  const [pendenciasAberta, setPendenciasAberta] = useState(false)
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<(typeof colaboradoresMock)[0] | null>(null)
  const [chipAtivo, setChipAtivo] = useState<string | null>(null)

  // Aplicar filtro do chip
  const aplicarFiltroChip = (tipo: string) => {
    // Reset todos os filtros primeiro
    setFiltroVinculo("todos")
    setFiltroEfetivo("todos")
    setFiltroStatusGlobal("todos")

    if (chipAtivo === tipo) {
      setChipAtivo(null)
      return
    }

    setChipAtivo(tipo)

    switch (tipo) {
      case "clt":
        setFiltroVinculo("CLT")
        break
      case "pj":
        setFiltroVinculo("PJ")
        break
      case "terceiros":
        setFiltroVinculo("Terceirizado")
        break
      case "direto":
        setFiltroEfetivo("Direto")
        break
      case "indireto":
        setFiltroEfetivo("Indireto")
        break
      case "afastados":
        setFiltroStatusGlobal("Afastado")
        break
      case "bloqueados":
        setFiltroStatusGlobal("Bloqueado")
        break
    }
  }

  // Filtrar colaboradores
  const colaboradoresFiltrados = colaboradoresMock.filter((c) => {
    if (
      searchTerm &&
      !c.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.funcao.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(c.matricula && c.matricula.includes(searchTerm))
    ) {
      return false
    }
    if (filtroVinculo !== "todos" && c.vinculo !== filtroVinculo) return false
    if (filtroEfetivo !== "todos" && c.efetivo !== filtroEfetivo) return false
    if (filtroStatusGlobal !== "todos" && c.statusGlobal !== filtroStatusGlobal) return false
    if (filtroWorkflow !== "todos" && c.workflow !== filtroWorkflow) return false
    if (filtroSetor !== "todos" && c.setor !== filtroSetor) return false
    if (filtroDocs !== "todos" && c.documentos !== filtroDocs) return false
    if (filtroSST !== "todos" && c.sst !== filtroSST) return false
    return true
  })

  // Agrupar colaboradores
  const colaboradoresAgrupados = () => {
    if (agruparPor === "nenhum") return { "": colaboradoresFiltrados }

    const grupos: Record<string, typeof colaboradoresMock> = {}
    colaboradoresFiltrados.forEach((c) => {
      const chave =
        agruparPor === "setor"
          ? c.setor
          : agruparPor === "vinculo"
            ? c.vinculo
            : agruparPor === "efetivo"
              ? c.efetivo
              : ""
      if (!grupos[chave]) grupos[chave] = []
      grupos[chave].push(c)
    })
    return grupos
  }

  const getVinculoBadge = (vinculo: string) => {
    switch (vinculo) {
      case "CLT":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">CLT</Badge>
      case "PJ":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">PJ</Badge>
      case "Terceirizado":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Terceirizado</Badge>
      default:
        return <Badge variant="outline">{vinculo}</Badge>
    }
  }

  const getEfetivoBadge = (efetivo: string) => {
    switch (efetivo) {
      case "Direto":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Direto</Badge>
      case "Indireto":
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Indireto</Badge>
      default:
        return <Badge variant="outline">{efetivo}</Badge>
    }
  }

  const getStatusGlobalBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativo</Badge>
      case "Afastado":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Afastado</Badge>
      case "Bloqueado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Bloqueado</Badge>
      case "Desligado":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Desligado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getWorkflowBadge = (workflow: string) => {
    switch (workflow) {
      case "Rascunho":
        return (
          <Badge variant="outline" className="text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            Rascunho
          </Badge>
        )
      case "Docs":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <FileText className="h-3 w-3 mr-1" />
            Docs
          </Badge>
        )
      case "SST":
        return (
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            <Shield className="h-3 w-3 mr-1" />
            SST
          </Badge>
        )
      case "Aprovação":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Aprovação
          </Badge>
        )
      case "Efetivado":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Efetivado
          </Badge>
        )
      default:
        return <Badge variant="outline">{workflow}</Badge>
    }
  }

  const getDocsBadge = (docs: string) => {
    switch (docs) {
      case "OK":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">OK</Badge>
      case "Pendente":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
      case "Vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{docs}</Badge>
    }
  }

  const getSSTBadge = (sst: string) => {
    switch (sst) {
      case "OK":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">OK</Badge>
      case "Pendente":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
      default:
        return <Badge variant="outline">{sst}</Badge>
    }
  }

  const abrirPendencias = (colaborador: (typeof colaboradoresMock)[0]) => {
    setColaboradorSelecionado(colaborador)
    setPendenciasAberta(true)
  }

  const grupos = colaboradoresAgrupados()

  return (
    <div className="flex-1 space-y-4 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">RH &gt; Pessoas &gt; Colaboradores</p>
            <h1 className="text-2xl font-bold tracking-tight">Colaboradores — Obra Alpha</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar Lista
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Link href="/obra/administrativo/rh/colaborador/novo">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Colaborador
              </Button>
            </Link>
          </div>
        </div>

        {/* Chips indicadores clicáveis */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChipAtivo(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === null ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            Total {indicadores.total}
          </button>
          <button
            onClick={() => aplicarFiltroChip("clt")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "clt" ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
          >
            CLT {indicadores.clt}
          </button>
          <button
            onClick={() => aplicarFiltroChip("pj")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "pj"
                ? "bg-purple-500 text-white"
                : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
            }`}
          >
            PJ {indicadores.pj}
          </button>
          <button
            onClick={() => aplicarFiltroChip("terceiros")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "terceiros"
                ? "bg-orange-500 text-white"
                : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
            }`}
          >
            Terceiros {indicadores.terceiros}
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={() => aplicarFiltroChip("direto")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "direto"
                ? "bg-emerald-500 text-white"
                : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
            }`}
          >
            Direto {indicadores.direto}
          </button>
          <button
            onClick={() => aplicarFiltroChip("indireto")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "indireto"
                ? "bg-slate-500 text-white"
                : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
            }`}
          >
            Indireto {indicadores.indireto}
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={() => aplicarFiltroChip("afastados")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "afastados"
                ? "bg-yellow-500 text-white"
                : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
            }`}
          >
            Afastados {indicadores.afastados}
          </button>
          <button
            onClick={() => aplicarFiltroChip("bloqueados")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              chipAtivo === "bloqueados" ? "bg-red-500 text-white" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            }`}
          >
            Bloqueados {indicadores.bloqueados}
          </button>
        </div>
      </div>

      {/* Barra de Busca e Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, CPF, matrícula, função..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Collapsible open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  {filtrosAbertos ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
            <Select value={agruparPor} onValueChange={setAgruparPor}>
              <SelectTrigger className="w-[180px]">
                <Layers className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Agrupar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nenhum">Sem agrupamento</SelectItem>
                <SelectItem value="setor">Setor/Frente</SelectItem>
                <SelectItem value="vinculo">Vínculo</SelectItem>
                <SelectItem value="efetivo">Efetivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Collapsible open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <Select value={filtroVinculo} onValueChange={setFiltroVinculo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vínculo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Vínculos</SelectItem>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroEfetivo} onValueChange={setFiltroEfetivo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Efetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Direto">Direto</SelectItem>
                    <SelectItem value="Indireto">Indireto</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroStatusGlobal} onValueChange={setFiltroStatusGlobal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Afastado">Afastado</SelectItem>
                    <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                    <SelectItem value="Desligado">Desligado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroWorkflow} onValueChange={setFiltroWorkflow}>
                  <SelectTrigger>
                    <SelectValue placeholder="Workflow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Rascunho">Rascunho</SelectItem>
                    <SelectItem value="Docs">Docs pendente</SelectItem>
                    <SelectItem value="SST">SST pendente</SelectItem>
                    <SelectItem value="Aprovação">Em aprovação</SelectItem>
                    <SelectItem value="Efetivado">Efetivado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroSetor} onValueChange={setFiltroSetor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Setores</SelectItem>
                    <SelectItem value="Setor 1">Setor 1</SelectItem>
                    <SelectItem value="Setor 2">Setor 2</SelectItem>
                    <SelectItem value="Setor 3">Setor 3</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                    <SelectItem value="QSMS">QSMS</SelectItem>
                    <SelectItem value="Portaria">Portaria</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroDocs} onValueChange={setFiltroDocs}>
                  <SelectTrigger>
                    <SelectValue placeholder="Documentos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="OK">OK</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroSST} onValueChange={setFiltroSST}>
                  <SelectTrigger>
                    <SelectValue placeholder="SST" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="OK">OK</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFiltroVinculo("todos")
                    setFiltroEfetivo("todos")
                    setFiltroStatusGlobal("todos")
                    setFiltroWorkflow("todos")
                    setFiltroSetor("todos")
                    setFiltroDocs("todos")
                    setFiltroSST("todos")
                    setChipAtivo(null)
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Tabela Principal */}
      <Card>
        <CardContent className="p-0">
          {colaboradoresFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum colaborador encontrado</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Ajuste os filtros ou cadastre um novo colaborador.
              </p>
              <Link href="/obra/administrativo/rh/colaborador/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Colaborador
                </Button>
              </Link>
            </div>
          ) : (
            Object.entries(grupos).map(([grupo, colaboradores]) => (
              <div key={grupo || "todos"}>
                {grupo && agruparPor !== "nenhum" && (
                  <div className="bg-muted/50 px-4 py-2 border-b">
                    <span className="font-medium text-sm">{grupo}</span>
                    <Badge variant="outline" className="ml-2">
                      {colaboradores.length}
                    </Badge>
                  </div>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Nome</TableHead>
                      <TableHead className="w-[100px]">Matrícula</TableHead>
                      <TableHead className="w-[100px]">Vínculo</TableHead>
                      <TableHead className="w-[80px]">Efetivo</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead className="w-[90px]">Status</TableHead>
                      <TableHead className="w-[110px]">Workflow</TableHead>
                      <TableHead className="w-[80px]">Docs</TableHead>
                      <TableHead className="w-[80px]">SST</TableHead>
                      <TableHead className="w-[100px]">Atualizado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {colaboradores.map((colaborador) => (
                      <TableRow key={colaborador.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {colaborador.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{colaborador.nome}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{colaborador.matricula || "—"}</TableCell>
                        <TableCell>{getVinculoBadge(colaborador.vinculo)}</TableCell>
                        <TableCell>{getEfetivoBadge(colaborador.efetivo)}</TableCell>
                        <TableCell>{colaborador.funcao}</TableCell>
                        <TableCell>{colaborador.setor}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{colaborador.empresa}</TableCell>
                        <TableCell>{getStatusGlobalBadge(colaborador.statusGlobal)}</TableCell>
                        <TableCell>{getWorkflowBadge(colaborador.workflow)}</TableCell>
                        <TableCell>{getDocsBadge(colaborador.documentos)}</TableCell>
                        <TableCell>{getSSTBadge(colaborador.sst)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(colaborador.ultimaAtualizacao).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/obra/administrativo/rh/colaborador/${colaborador.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Abrir Prontuário
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => abrirPendencias(colaborador)}>
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Ver Pendências
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Solicitar Ajuste
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserX className="h-4 w-4 mr-2" />
                                Registrar Afastamento
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <XCircle className="h-4 w-4 mr-2" />
                                Desligar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Drawer Pendências */}
      <Sheet open={pendenciasAberta} onOpenChange={setPendenciasAberta}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Pendências do Colaborador</SheetTitle>
            <SheetDescription>{colaboradorSelecionado?.nome}</SheetDescription>
          </SheetHeader>

          {colaboradorSelecionado && (
            <div className="mt-6 space-y-6">
              {/* Resumo de Pendências */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Resumo</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Documentos</p>
                        <p className="text-sm text-muted-foreground">
                          {colaboradorSelecionado.documentos === "OK"
                            ? "Todos entregues"
                            : colaboradorSelecionado.documentos === "Pendente"
                              ? "2 documentos pendentes"
                              : "1 documento vencido"}
                        </p>
                      </div>
                    </div>
                    {getDocsBadge(colaboradorSelecionado.documentos)}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SST</p>
                        <p className="text-sm text-muted-foreground">
                          {colaboradorSelecionado.sst === "OK" ? "ASO e NRs OK" : "ASO ou NR pendente"}
                        </p>
                      </div>
                    </div>
                    {getSSTBadge(colaboradorSelecionado.sst)}
                  </div>

                  {colaboradorSelecionado.workflow === "Aprovação" && (
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Aprovação</p>
                          <p className="text-sm text-muted-foreground">Aguardando aprovação do RH</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400">Pendente</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Ações</h4>

                <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
                  <Link href={`/obra/administrativo/rh/colaborador/${colaboradorSelecionado.id}?tab=documentacao`}>
                    Ir para Documentação
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
                  <Link href={`/obra/administrativo/rh/colaborador/${colaboradorSelecionado.id}?tab=sst`}>
                    Ir para SST
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
                  <Link href={`/obra/administrativo/rh/colaborador/${colaboradorSelecionado.id}?tab=aprovacoes`}>
                    Ir para Aprovações
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button className="w-full" asChild>
                  <Link href={`/obra/administrativo/rh/colaborador/${colaboradorSelecionado.id}`}>
                    Abrir Prontuário Completo
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ColaboradoresPage() {
  return (
    <Suspense fallback={null}>
      <ColaboradoresContent />
    </Suspense>
  )
}
