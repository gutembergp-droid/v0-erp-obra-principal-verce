"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RHNav } from "@/components/rh/rh-nav"
import {
  UserX,
  Search,
  Download,
  CheckCircle2,
  Plus,
  Eye,
  RefreshCw,
  Stethoscope,
  Baby,
  Briefcase,
  HeartPulse,
  Shield,
} from "lucide-react"

// Dados mockados
const afastamentosMock = [
  {
    id: "AF-001",
    colaborador: "Ricardo Mendes",
    matricula: "1010",
    tipo: "Doenca",
    cid: "M54.5",
    inicio: "2026-01-02",
    previsaoRetorno: "2026-01-20",
    diasAfastado: 18,
    status: "ativo",
    inss: true,
    atestado: true,
  },
  {
    id: "AF-002",
    colaborador: "Lucia Ferreira",
    matricula: "1011",
    tipo: "Maternidade",
    cid: null,
    inicio: "2025-11-15",
    previsaoRetorno: "2026-03-15",
    diasAfastado: 120,
    status: "ativo",
    inss: true,
    atestado: true,
  },
  {
    id: "AF-003",
    colaborador: "Marcos Almeida",
    matricula: "1012",
    tipo: "Acidente Trabalho",
    cid: "S62.0",
    inicio: "2025-12-10",
    previsaoRetorno: "2026-02-10",
    diasAfastado: 62,
    status: "ativo",
    inss: true,
    atestado: true,
  },
  {
    id: "AF-004",
    colaborador: "Patricia Gomes",
    matricula: "1013",
    tipo: "Doenca",
    cid: "J11",
    inicio: "2026-01-05",
    previsaoRetorno: "2026-01-10",
    diasAfastado: 5,
    status: "encerrado",
    inss: false,
    atestado: true,
  },
  {
    id: "AF-005",
    colaborador: "Roberto Silva",
    matricula: "1014",
    tipo: "Acidente Trajeto",
    cid: "S93.4",
    inicio: "2025-12-20",
    previsaoRetorno: "2026-01-15",
    diasAfastado: 26,
    status: "ativo",
    inss: true,
    atestado: true,
  },
]

const tiposAfastamento = [
  { tipo: "Doenca", icone: Stethoscope, cor: "text-yellow-400" },
  { tipo: "Acidente Trabalho", icone: Shield, cor: "text-red-400" },
  { tipo: "Acidente Trajeto", icone: Briefcase, cor: "text-orange-400" },
  { tipo: "Maternidade", icone: Baby, cor: "text-pink-400" },
  { tipo: "Paternidade", icone: Baby, cor: "text-blue-400" },
]

function AfastamentosContent() {
  const [busca, setBusca] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")

  // Contadores
  const ativos = afastamentosMock.filter((a) => a.status === "ativo").length
  const encerrados = afastamentosMock.filter((a) => a.status === "encerrado").length
  const doencas = afastamentosMock.filter((a) => a.tipo === "Doenca").length
  const acidentes = afastamentosMock.filter((a) => a.tipo.includes("Acidente")).length
  const licencas = afastamentosMock.filter((a) => a.tipo.includes("nidade")).length
  const comINSS = afastamentosMock.filter((a) => a.inss && a.status === "ativo").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Ativo</Badge>
      case "encerrado":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Encerrado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    const config = tiposAfastamento.find((t) => t.tipo === tipo)
    if (!config) return <Badge variant="outline">{tipo}</Badge>
    const Icon = config.icone
    return (
      <Badge variant="outline" className="gap-1">
        <Icon className={`h-3 w-3 ${config.cor}`} />
        {tipo}
      </Badge>
    )
  }

  const afastamentosFiltrados = afastamentosMock.filter((a) => {
    const matchBusca = a.colaborador.toLowerCase().includes(busca.toLowerCase()) || a.matricula.includes(busca)
    const matchTipo = filtroTipo === "todos" || a.tipo === filtroTipo
    const matchStatus = filtroStatus === "todos" || a.status === filtroStatus
    return matchBusca && matchTipo && matchStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Navigation */}
      <RHNav modulo="obra" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Obra</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Afastamentos</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <UserX className="h-6 w-6" />
            Controle de Afastamentos
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Afastamento
          </Button>
        </div>
      </div>

      {/* Cards Indicadores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="cursor-pointer hover:border-orange-500/50" onClick={() => setFiltroStatus("ativo")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <UserX className="h-4 w-4" />
              <span className="text-xs">Afastados Ativos</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{ativos}</p>
            <p className="text-xs text-muted-foreground">atualmente</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-yellow-500/50" onClick={() => setFiltroTipo("Doenca")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Stethoscope className="h-4 w-4" />
              <span className="text-xs">Doença</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{doencas}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-red-500/50" onClick={() => setFiltroTipo("Acidente Trabalho")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Acidente</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{acidentes}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-pink-500/50" onClick={() => setFiltroTipo("Maternidade")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-pink-400 mb-1">
              <Baby className="h-4 w-4" />
              <span className="text-xs">Licenças</span>
            </div>
            <p className="text-2xl font-bold text-pink-400">{licencas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <HeartPulse className="h-4 w-4" />
              <span className="text-xs">Com INSS</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{comINSS}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-green-500/50" onClick={() => setFiltroStatus("encerrado")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Encerrados</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{encerrados}</p>
            <p className="text-xs text-muted-foreground">no período</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por colaborador ou matrícula..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                {tiposAfastamento.map((t) => (
                  <SelectItem key={t.tipo} value={t.tipo}>
                    {t.tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="encerrado">Encerrados</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBusca("")
                setFiltroTipo("todos")
                setFiltroStatus("todos")
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Afastamentos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Afastamentos ({afastamentosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>CID</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Prev. Retorno</TableHead>
                <TableHead className="text-center">Dias</TableHead>
                <TableHead>INSS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {afastamentosFiltrados.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.colaborador}</TableCell>
                  <TableCell>{a.matricula}</TableCell>
                  <TableCell>{getTipoBadge(a.tipo)}</TableCell>
                  <TableCell>{a.cid || "-"}</TableCell>
                  <TableCell>{a.inicio}</TableCell>
                  <TableCell>{a.previsaoRetorno}</TableCell>
                  <TableCell className="text-center font-medium">{a.diasAfastado}</TableCell>
                  <TableCell>
                    {a.inss ? (
                      <Badge className="bg-blue-500/20 text-blue-400">Sim</Badge>
                    ) : (
                      <Badge variant="outline">Não</Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(a.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AfastamentosPage() {
  return (
    <Suspense fallback={null}>
      <AfastamentosContent />
    </Suspense>
  )
}
