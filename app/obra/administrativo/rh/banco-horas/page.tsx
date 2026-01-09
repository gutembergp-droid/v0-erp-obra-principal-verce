"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Timer,
  Search,
  Download,
  AlertTriangle,
  Plus,
  Eye,
  RefreshCw,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

// Dados mockados
const bancoHorasMock = [
  {
    colaborador: "Carlos Silva",
    matricula: "1001",
    setor: "Producao",
    saldoAnterior: 24,
    creditoMes: 8,
    debitoMes: 4,
    saldoAtual: 28,
    limite: 40,
    vencimento: "2026-06-30",
    tendencia: "estavel",
  },
  {
    colaborador: "Maria Santos",
    matricula: "1002",
    setor: "Engenharia",
    saldoAnterior: 12,
    creditoMes: 15,
    debitoMes: 0,
    saldoAtual: 27,
    limite: 40,
    vencimento: "2026-06-30",
    tendencia: "subindo",
  },
  {
    colaborador: "Jose Oliveira",
    matricula: "1003",
    setor: "Producao",
    saldoAnterior: -8,
    creditoMes: 6,
    debitoMes: 0,
    saldoAtual: -2,
    limite: 40,
    vencimento: null,
    tendencia: "subindo",
  },
  {
    colaborador: "Ana Costa",
    matricula: "1004",
    setor: "Administrativo",
    saldoAnterior: 35,
    creditoMes: 10,
    debitoMes: 8,
    saldoAtual: 37,
    limite: 40,
    vencimento: "2026-03-15",
    tendencia: "critico",
  },
  {
    colaborador: "Pedro Lima",
    matricula: "1005",
    setor: "SSMA",
    saldoAnterior: 0,
    creditoMes: 4,
    debitoMes: 4,
    saldoAtual: 0,
    limite: 40,
    vencimento: null,
    tendencia: "estavel",
  },
  {
    colaborador: "Fernanda Souza",
    matricula: "1006",
    setor: "Engenharia",
    saldoAnterior: 18,
    creditoMes: 6,
    debitoMes: 16,
    saldoAtual: 8,
    limite: 40,
    vencimento: "2026-06-30",
    tendencia: "descendo",
  },
]

function BancoHorasContent() {
  const [busca, setBusca] = useState("")
  const [filtroSetor, setFiltroSetor] = useState("todos")
  const [filtroSituacao, setFiltroSituacao] = useState("todos")

  // Totais
  const totalColaboradores = bancoHorasMock.length
  const saldoPositivo = bancoHorasMock.filter((b) => b.saldoAtual > 0).length
  const saldoNegativo = bancoHorasMock.filter((b) => b.saldoAtual < 0).length
  const saldoZerado = bancoHorasMock.filter((b) => b.saldoAtual === 0).length
  const proximosVencer = bancoHorasMock.filter((b) => b.tendencia === "critico").length
  const totalHoras = bancoHorasMock.reduce((acc, b) => acc + b.saldoAtual, 0)

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case "subindo":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "descendo":
        return <TrendingDown className="h-4 w-4 text-blue-400" />
      case "critico":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getSaldoBadge = (saldo: number) => {
    if (saldo > 0) return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+{saldo}h</Badge>
    if (saldo < 0) return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{saldo}h</Badge>
    return <Badge variant="outline">0h</Badge>
  }

  const bancoFiltrado = bancoHorasMock.filter((b) => {
    const matchBusca = b.colaborador.toLowerCase().includes(busca.toLowerCase()) || b.matricula.includes(busca)
    const matchSetor = filtroSetor === "todos" || b.setor === filtroSetor
    let matchSituacao = true
    if (filtroSituacao === "positivo") matchSituacao = b.saldoAtual > 0
    else if (filtroSituacao === "negativo") matchSituacao = b.saldoAtual < 0
    else if (filtroSituacao === "zerado") matchSituacao = b.saldoAtual === 0
    else if (filtroSituacao === "critico") matchSituacao = b.tendencia === "critico"
    return matchBusca && matchSetor && matchSituacao
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* RH Navigation */}
      <RHNav modulo="obra" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Obra</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Banco de Horas</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Timer className="h-6 w-6" />
            Banco de Horas
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Compensação em Lote
          </Button>
        </div>
      </div>

      {/* Cards Indicadores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Colaboradores</span>
            </div>
            <p className="text-2xl font-bold">{totalColaboradores}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-green-500/50" onClick={() => setFiltroSituacao("positivo")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <ArrowUp className="h-4 w-4" />
              <span className="text-xs">Saldo Positivo</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{saldoPositivo}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-red-500/50" onClick={() => setFiltroSituacao("negativo")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <ArrowDown className="h-4 w-4" />
              <span className="text-xs">Saldo Negativo</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{saldoNegativo}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-gray-500/50" onClick={() => setFiltroSituacao("zerado")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Minus className="h-4 w-4" />
              <span className="text-xs">Zerado</span>
            </div>
            <p className="text-2xl font-bold">{saldoZerado}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-orange-500/50" onClick={() => setFiltroSituacao("critico")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Próx. Vencer</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{proximosVencer}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Total Geral</span>
            </div>
            <p className={`text-2xl font-bold ${totalHoras >= 0 ? "text-green-400" : "text-red-400"}`}>
              {totalHoras >= 0 ? "+" : ""}
              {totalHoras}h
            </p>
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
            <Select value={filtroSetor} onValueChange={setFiltroSetor}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Producao">Produção</SelectItem>
                <SelectItem value="Engenharia">Engenharia</SelectItem>
                <SelectItem value="Administrativo">Administrativo</SelectItem>
                <SelectItem value="SSMA">SSMA</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroSituacao} onValueChange={setFiltroSituacao}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="positivo">Positivo</SelectItem>
                <SelectItem value="negativo">Negativo</SelectItem>
                <SelectItem value="zerado">Zerado</SelectItem>
                <SelectItem value="critico">Crítico</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBusca("")
                setFiltroSetor("todos")
                setFiltroSituacao("todos")
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Banco de Horas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Controle de Banco de Horas ({bancoFiltrado.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead className="text-center">Saldo Ant.</TableHead>
                <TableHead className="text-center">Crédito</TableHead>
                <TableHead className="text-center">Débito</TableHead>
                <TableHead className="text-center">Saldo Atual</TableHead>
                <TableHead>Uso Limite</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-center">Tend.</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bancoFiltrado.map((b, i) => (
                <TableRow key={i} className={b.tendencia === "critico" ? "bg-red-500/5" : ""}>
                  <TableCell className="font-medium">{b.colaborador}</TableCell>
                  <TableCell>{b.matricula}</TableCell>
                  <TableCell>{b.setor}</TableCell>
                  <TableCell className="text-center">{b.saldoAnterior}h</TableCell>
                  <TableCell className="text-center text-green-400">+{b.creditoMes}h</TableCell>
                  <TableCell className="text-center text-red-400">-{b.debitoMes}h</TableCell>
                  <TableCell className="text-center">{getSaldoBadge(b.saldoAtual)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(Math.abs(b.saldoAtual) / b.limite) * 100} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round((Math.abs(b.saldoAtual) / b.limite) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{b.vencimento || "-"}</TableCell>
                  <TableCell className="text-center">{getTendenciaIcon(b.tendencia)}</TableCell>
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

export default function BancoHorasPage() {
  return (
    <Suspense fallback={null}>
      <BancoHorasContent />
    </Suspense>
  )
}
