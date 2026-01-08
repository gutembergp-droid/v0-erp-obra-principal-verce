"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RHNav } from "@/components/rh/rh-nav"
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  AlertTriangle,
  FileText,
  ShieldCheck,
  CheckCircle,
  Clock,
  ExternalLink,
  RefreshCw,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Dados mockados de pendencias
const pendenciasMock = [
  {
    id: "PEN-001",
    colaborador: "Joao Silva",
    vinculo: "CLT",
    tipo: "Documentacao",
    descricao: "ASO nao anexado",
    impacto: "Bloqueia Efetivacao",
    responsavel: "RH",
    status: "Pendente",
    diasAberto: 3,
    setor: "Terraplenagem",
    empresa: null,
    critico: true,
  },
  {
    id: "PEN-002",
    colaborador: "Carlos Lima",
    vinculo: "Terceirizado",
    tipo: "SST",
    descricao: "NR-35 vencida",
    impacto: "Bloqueia Operacao",
    responsavel: "SST",
    status: "Em validacao",
    diasAberto: 7,
    setor: "OAE",
    empresa: "Terceira Engenharia",
    critico: true,
  },
  {
    id: "PEN-003",
    colaborador: "Lucas Rocha",
    vinculo: "Terceirizado",
    tipo: "Documentacao",
    descricao: "CNH vencida",
    impacto: "Bloqueia Efetivacao",
    responsavel: "RH",
    status: "Pendente",
    diasAberto: 10,
    setor: "Pavimentacao",
    empresa: "TransLog Servicos",
    critico: true,
  },
  {
    id: "PEN-004",
    colaborador: "Ana Souza",
    vinculo: "CLT",
    tipo: "Aprovacao",
    descricao: "Salario fora do orcado",
    impacto: "Bloqueia Efetivacao",
    responsavel: "Corporativo",
    status: "Em aprovacao",
    diasAberto: 5,
    setor: "Administrativo",
    empresa: null,
    critico: false,
  },
  {
    id: "PEN-005",
    colaborador: "Pedro Alves",
    vinculo: "PJ",
    tipo: "Documentacao",
    descricao: "Contrato PJ nao assinado",
    impacto: "Bloqueia Pagamento",
    responsavel: "RH",
    status: "Pendente",
    diasAberto: 12,
    setor: "Engenharia",
    empresa: null,
    critico: true,
  },
  {
    id: "PEN-006",
    colaborador: "Maria Costa",
    vinculo: "CLT",
    tipo: "SST",
    descricao: "Treinamento NR-18 vencido",
    impacto: "Bloqueia Operacao",
    responsavel: "SST",
    status: "Pendente",
    diasAberto: 2,
    setor: "Drenagem",
    empresa: null,
    critico: false,
  },
  {
    id: "PEN-007",
    colaborador: "Fernando Santos",
    vinculo: "Terceirizado",
    tipo: "Documentacao",
    descricao: "Comprovante de residencia desatualizado",
    impacto: "Informativo",
    responsavel: "RH",
    status: "Pendente",
    diasAberto: 1,
    setor: "Terraplenagem",
    empresa: "Terceira Engenharia",
    critico: false,
  },
  {
    id: "PEN-008",
    colaborador: "Roberto Nunes",
    vinculo: "CLT",
    tipo: "Aprovacao",
    descricao: "Promocao pendente de aprovacao",
    impacto: "Informativo",
    responsavel: "Gestor de Obra",
    status: "Em aprovacao",
    diasAberto: 4,
    setor: "Producao",
    empresa: null,
    critico: false,
  },
  {
    id: "PEN-009",
    colaborador: "Lucia Ferreira",
    vinculo: "CLT",
    tipo: "SST",
    descricao: "ASO periodico vencido",
    impacto: "Bloqueia Ponto",
    responsavel: "SST",
    status: "Pendente",
    diasAberto: 6,
    setor: "Sinalizacao",
    empresa: null,
    critico: true,
  },
  {
    id: "PEN-010",
    colaborador: "Andre Oliveira",
    vinculo: "Terceirizado",
    tipo: "Bloqueio",
    descricao: "Empresa com documentacao irregular",
    impacto: "Bloqueia Operacao",
    responsavel: "Corporativo",
    status: "Pendente",
    diasAberto: 15,
    setor: "Pavimentacao",
    empresa: "Fast Terraplanagem",
    critico: true,
  },
]

function CentralPendenciasContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroImpacto, setFiltroImpacto] = useState<string>("todos")
  const [filtroResponsavel, setFiltroResponsavel] = useState<string>("todos")
  const [filtroVinculo, setFiltroVinculo] = useState<string>("todos")
  const [filtroSetor, setFiltroSetor] = useState<string>("todos")
  const [filtroEmpresa, setFiltroEmpresa] = useState<string>("todos")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")

  // Contadores para chips
  const totalPendencias = pendenciasMock.length
  const documentacao = pendenciasMock.filter((p) => p.tipo === "Documentacao").length
  const sst = pendenciasMock.filter((p) => p.tipo === "SST").length
  const aprovacoes = pendenciasMock.filter((p) => p.tipo === "Aprovacao").length
  const bloqueiosCriticos = pendenciasMock.filter((p) => p.critico).length

  // Aplicar filtros
  const pendenciasFiltradas = pendenciasMock.filter((p) => {
    if (
      searchTerm &&
      !p.colaborador.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    if (filtroTipo !== "todos" && p.tipo !== filtroTipo) return false
    if (filtroImpacto !== "todos" && p.impacto !== filtroImpacto) return false
    if (filtroResponsavel !== "todos" && p.responsavel !== filtroResponsavel) return false
    if (filtroVinculo !== "todos" && p.vinculo !== filtroVinculo) return false
    if (filtroSetor !== "todos" && p.setor !== filtroSetor) return false
    if (filtroEmpresa !== "todos" && p.empresa !== filtroEmpresa) return false
    if (filtroStatus !== "todos" && p.status !== filtroStatus) return false
    return true
  })

  // Setores e empresas unicos
  const setores = [...new Set(pendenciasMock.map((p) => p.setor))]
  const empresas = [...new Set(pendenciasMock.filter((p) => p.empresa).map((p) => p.empresa))]

  const limparFiltros = () => {
    setFiltroTipo("todos")
    setFiltroImpacto("todos")
    setFiltroResponsavel("todos")
    setFiltroVinculo("todos")
    setFiltroSetor("todos")
    setFiltroEmpresa("todos")
    setFiltroStatus("todos")
    setSearchTerm("")
  }

  const aplicarFiltroChip = (tipo: string) => {
    limparFiltros()
    if (tipo === "documentacao") setFiltroTipo("Documentacao")
    else if (tipo === "sst") setFiltroTipo("SST")
    else if (tipo === "aprovacoes") setFiltroTipo("Aprovacao")
    else if (tipo === "criticos") {
      // Para criticos, filtrar por impactos que bloqueiam
      setFiltroImpacto("todos")
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Documentacao":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
            <FileText className="w-3 h-3 mr-1" />
            {tipo}
          </Badge>
        )
      case "SST":
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
            <ShieldCheck className="w-3 h-3 mr-1" />
            {tipo}
          </Badge>
        )
      case "Aprovacao":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            {tipo}
          </Badge>
        )
      case "Bloqueio":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            {tipo}
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  const getImpactoBadge = (impacto: string) => {
    switch (impacto) {
      case "Bloqueia Efetivacao":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">{impacto}</Badge>
      case "Bloqueia Ponto":
        return <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">{impacto}</Badge>
      case "Bloqueia Operacao":
        return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">{impacto}</Badge>
      case "Bloqueia Pagamento":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">{impacto}</Badge>
      case "Informativo":
        return <Badge className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">{impacto}</Badge>
      default:
        return <Badge variant="outline">{impacto}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pendente":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
            {status}
          </Badge>
        )
      case "Em validacao":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
            {status}
          </Badge>
        )
      case "Em aprovacao":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVinculoBadge = (vinculo: string) => {
    switch (vinculo) {
      case "CLT":
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            {vinculo}
          </Badge>
        )
      case "PJ":
        return (
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            {vinculo}
          </Badge>
        )
      case "Terceirizado":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
            {vinculo}
          </Badge>
        )
      default:
        return <Badge variant="outline">{vinculo}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <RHNav />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/obra/administrativo/rh" className="hover:text-foreground">
            RH
          </Link>
          <span>/</span>
          <span>Central de Pendencias</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/obra/administrativo/rh">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Central de Pendencias</h1>
              <p className="text-muted-foreground">RH Obra Alpha — Gestao de pendencias e bloqueios</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Chips indicadores */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filtroTipo === "todos" && filtroImpacto === "todos" ? "default" : "outline"}
            size="sm"
            onClick={limparFiltros}
          >
            Total Pendencias
            <Badge variant="secondary" className="ml-2">
              {totalPendencias}
            </Badge>
          </Button>
          <Button
            variant={filtroTipo === "Documentacao" ? "default" : "outline"}
            size="sm"
            onClick={() => aplicarFiltroChip("documentacao")}
          >
            <FileText className="w-4 h-4 mr-1" />
            Documentos
            <Badge variant="secondary" className="ml-2">
              {documentacao}
            </Badge>
          </Button>
          <Button
            variant={filtroTipo === "SST" ? "default" : "outline"}
            size="sm"
            onClick={() => aplicarFiltroChip("sst")}
          >
            <ShieldCheck className="w-4 h-4 mr-1" />
            SST
            <Badge variant="secondary" className="ml-2">
              {sst}
            </Badge>
          </Button>
          <Button
            variant={filtroTipo === "Aprovacao" ? "default" : "outline"}
            size="sm"
            onClick={() => aplicarFiltroChip("aprovacoes")}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Aprovacoes
            <Badge variant="secondary" className="ml-2">
              {aprovacoes}
            </Badge>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
          >
            <AlertTriangle className="w-4 h-4 mr-1" />
            Bloqueios Criticos
            <Badge className="ml-2 bg-red-500">{bloqueiosCriticos}</Badge>
          </Button>
        </div>
      </div>

      {/* Busca e Filtros */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por colaborador ou descricao..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Collapsible open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform ${filtrosAbertos ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
              <Button variant="ghost" size="sm" onClick={limparFiltros}>
                Limpar
              </Button>
            </div>

            <Collapsible open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
              <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t">
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Tipos</SelectItem>
                      <SelectItem value="Documentacao">Documentacao</SelectItem>
                      <SelectItem value="SST">SST</SelectItem>
                      <SelectItem value="Aprovacao">Aprovacao</SelectItem>
                      <SelectItem value="Bloqueio">Bloqueio</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroImpacto} onValueChange={setFiltroImpacto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Impacto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Impactos</SelectItem>
                      <SelectItem value="Bloqueia Efetivacao">Bloqueia Efetivacao</SelectItem>
                      <SelectItem value="Bloqueia Ponto">Bloqueia Ponto</SelectItem>
                      <SelectItem value="Bloqueia Operacao">Bloqueia Operacao</SelectItem>
                      <SelectItem value="Bloqueia Pagamento">Bloqueia Pagamento</SelectItem>
                      <SelectItem value="Informativo">Informativo</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroResponsavel} onValueChange={setFiltroResponsavel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Responsavel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="SST">SST</SelectItem>
                      <SelectItem value="Gestor de Obra">Gestor de Obra</SelectItem>
                      <SelectItem value="Corporativo">Corporativo</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroVinculo} onValueChange={setFiltroVinculo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vinculo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="PJ">PJ</SelectItem>
                      <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroSetor} onValueChange={setFiltroSetor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Setores</SelectItem>
                      {setores.map((setor) => (
                        <SelectItem key={setor} value={setor}>
                          {setor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filtroEmpresa} onValueChange={setFiltroEmpresa}>
                    <SelectTrigger>
                      <SelectValue placeholder="Empresa Terceirizada" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas as Empresas</SelectItem>
                      {empresas.map((empresa) => (
                        <SelectItem key={empresa} value={empresa!}>
                          {empresa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Em validacao">Em validacao</SelectItem>
                      <SelectItem value="Em aprovacao">Em aprovacao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      {/* Tabela Principal */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Lista de Pendencias</CardTitle>
            <span className="text-sm text-muted-foreground">
              {pendenciasFiltradas.length} pendencia{pendenciasFiltradas.length !== 1 ? "s" : ""} encontrada
              {pendenciasFiltradas.length !== 1 ? "s" : ""}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {pendenciasFiltradas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-lg font-medium">Nenhuma pendencia identificada</h3>
              <p className="text-muted-foreground">Todos os processos estao em dia!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Vinculo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead>Impacto</TableHead>
                    <TableHead>Responsavel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Dias</TableHead>
                    <TableHead className="text-right">Acao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendenciasFiltradas.map((pendencia) => (
                    <TableRow
                      key={pendencia.id}
                      className={pendencia.critico ? "bg-red-500/5 hover:bg-red-500/10" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {pendencia.critico && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          <div>
                            <span className="font-medium">{pendencia.colaborador}</span>
                            {pendencia.empresa && <p className="text-xs text-muted-foreground">{pendencia.empresa}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getVinculoBadge(pendencia.vinculo)}</TableCell>
                      <TableCell>{getTipoBadge(pendencia.tipo)}</TableCell>
                      <TableCell>
                        <span className="text-sm">{pendencia.descricao}</span>
                        <p className="text-xs text-muted-foreground">{pendencia.setor}</p>
                      </TableCell>
                      <TableCell>{getImpactoBadge(pendencia.impacto)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pendencia.responsavel}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(pendencia.status)}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className={pendencia.diasAberto > 7 ? "text-red-400 font-medium" : ""}>
                            {pendencia.diasAberto}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/obra/administrativo/rh/colaborador/1`}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Abrir Prontuario
                              </Link>
                            </DropdownMenuItem>
                            {pendencia.tipo === "Documentacao" && (
                              <DropdownMenuItem asChild>
                                <Link href={`/obra/administrativo/rh/colaborador/1`}>
                                  <FileText className="w-4 h-4 mr-2" />
                                  Ir para Documentacao
                                </Link>
                              </DropdownMenuItem>
                            )}
                            {pendencia.tipo === "SST" && (
                              <DropdownMenuItem asChild>
                                <Link href={`/obra/administrativo/rh/colaborador/1`}>
                                  <ShieldCheck className="w-4 h-4 mr-2" />
                                  Ir para SST
                                </Link>
                              </DropdownMenuItem>
                            )}
                            {pendencia.tipo === "Aprovacao" && (
                              <DropdownMenuItem asChild>
                                <Link href={`/obra/administrativo/rh/colaborador/1`}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Ir para Aprovacoes
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Ver Detalhe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CentralPendenciasPage() {
  return (
    <Suspense fallback={null}>
      <CentralPendenciasContent />
    </Suspense>
  )
}
