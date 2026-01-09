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
  Palmtree,
  Search,
  Download,
  AlertTriangle,
  CalendarIcon,
  Plus,
  Eye,
  RefreshCw,
  Users,
  ArrowRight,
  Ban,
  Edit,
} from "lucide-react"

// Dados mockados
const feriasMock = [
  {
    id: "FER-001",
    colaborador: "Carlos Silva",
    matricula: "1001",
    setor: "Producao",
    admissao: "2022-03-15",
    periodoAquisitivo: "2024-03-15 a 2025-03-14",
    diasDireito: 30,
    diasGozados: 0,
    saldo: 30,
    status: "vencendo",
    inicioProgr: "2026-02-01",
    fimProgr: "2026-03-02",
  },
  {
    id: "FER-002",
    colaborador: "Maria Santos",
    matricula: "1002",
    setor: "Engenharia",
    admissao: "2023-06-10",
    periodoAquisitivo: "2024-06-10 a 2025-06-09",
    diasDireito: 30,
    diasGozados: 15,
    saldo: 15,
    status: "parcial",
    inicioProgr: null,
    fimProgr: null,
  },
  {
    id: "FER-003",
    colaborador: "Jose Oliveira",
    matricula: "1003",
    setor: "Producao",
    admissao: "2024-01-20",
    periodoAquisitivo: "2025-01-20 a 2026-01-19",
    diasDireito: 30,
    diasGozados: 0,
    saldo: 30,
    status: "aguardando",
    inicioProgr: null,
    fimProgr: null,
  },
  {
    id: "FER-004",
    colaborador: "Ana Costa",
    matricula: "1004",
    setor: "Administrativo",
    admissao: "2021-08-05",
    periodoAquisitivo: "2024-08-05 a 2025-08-04",
    diasDireito: 30,
    diasGozados: 30,
    saldo: 0,
    status: "gozadas",
    inicioProgr: null,
    fimProgr: null,
  },
  {
    id: "FER-005",
    colaborador: "Pedro Lima",
    matricula: "1005",
    setor: "SSMA",
    admissao: "2020-02-10",
    periodoAquisitivo: "2024-02-10 a 2025-02-09",
    diasDireito: 30,
    diasGozados: 0,
    saldo: 30,
    status: "vencido",
    inicioProgr: null,
    fimProgr: null,
  },
  {
    id: "FER-006",
    colaborador: "Fernanda Souza",
    matricula: "1006",
    setor: "Engenharia",
    admissao: "2023-11-01",
    periodoAquisitivo: "2024-11-01 a 2025-10-31",
    diasDireito: 30,
    diasGozados: 0,
    saldo: 30,
    status: "programadas",
    inicioProgr: "2026-04-01",
    fimProgr: "2026-04-30",
  },
]

const emGozo = [
  {
    id: "G-001",
    colaborador: "Ricardo Mendes",
    matricula: "1010",
    setor: "Producao",
    inicio: "2026-01-02",
    fim: "2026-01-16",
    diasRestantes: 8,
  },
]

function FeriasContent() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [dialogProgramar, setDialogProgramar] = useState(false)

  // Contadores
  const totalColaboradores = feriasMock.length
  const vencendo = feriasMock.filter((f) => f.status === "vencendo").length
  const vencidas = feriasMock.filter((f) => f.status === "vencido").length
  const programadas = feriasMock.filter((f) => f.status === "programadas").length
  const emGozoCount = emGozo.length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "gozadas":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Gozadas</Badge>
      case "programadas":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Programadas</Badge>
      case "parcial":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Parcial</Badge>
      case "aguardando":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Aguardando</Badge>
      case "vencendo":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Vencendo</Badge>
      case "vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const feriasFiltradas = feriasMock.filter((f) => {
    const matchBusca = f.colaborador.toLowerCase().includes(busca.toLowerCase()) || f.matricula.includes(busca)
    const matchStatus = filtroStatus === "todos" || f.status === filtroStatus
    return matchBusca && matchStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* RHNav */}
      <RHNav modulo="obra" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Obra</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Férias</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Palmtree className="h-6 w-6" />
            Programação de Férias
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" onClick={() => setDialogProgramar(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Programar Férias
          </Button>
        </div>
      </div>

      {/* Em Gozo Atual */}
      {emGozo.length > 0 && (
        <Card className="border-blue-500/50 bg-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2 text-blue-400">
              <Palmtree className="h-4 w-4" />
              Em Gozo de Férias Atualmente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {emGozo.map((g) => (
                <div key={g.id} className="flex items-center gap-3 bg-background/50 rounded-lg p-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{g.colaborador}</p>
                    <p className="text-xs text-muted-foreground">
                      {g.setor} • {g.inicio} a {g.fim}
                    </p>
                  </div>
                  <Badge className="ml-4 bg-blue-500/20 text-blue-400">{g.diasRestantes} dias restantes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards Indicadores */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:border-primary/50" onClick={() => setFiltroStatus("todos")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Total</span>
            </div>
            <p className="text-2xl font-bold">{totalColaboradores}</p>
            <p className="text-xs text-muted-foreground">colaboradores</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-blue-500/50" onClick={() => setFiltroStatus("programadas")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-xs">Programadas</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{programadas}</p>
            <p className="text-xs text-muted-foreground">agendadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Palmtree className="h-4 w-4" />
              <span className="text-xs">Em Gozo</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{emGozoCount}</p>
            <p className="text-xs text-muted-foreground">atualmente</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-orange-500/50" onClick={() => setFiltroStatus("vencendo")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Vencendo</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{vencendo}</p>
            <p className="text-xs text-muted-foreground">próx. 60 dias</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-red-500/50" onClick={() => setFiltroStatus("vencido")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <Ban className="h-4 w-4" />
              <span className="text-xs">Vencidas</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{vencidas}</p>
            <p className="text-xs text-muted-foreground">irregulares</p>
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
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="programadas">Programadas</SelectItem>
                <SelectItem value="parcial">Parcial</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="vencendo">Vencendo</SelectItem>
                <SelectItem value="vencido">Vencidas</SelectItem>
                <SelectItem value="gozadas">Gozadas</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBusca("")
                setFiltroStatus("todos")
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Férias */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Controle de Férias ({feriasFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Período Aquisitivo</TableHead>
                <TableHead className="text-center">Direito</TableHead>
                <TableHead className="text-center">Gozados</TableHead>
                <TableHead className="text-center">Saldo</TableHead>
                <TableHead>Programação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feriasFiltradas.map((f) => (
                <TableRow key={f.id} className={f.status === "vencido" ? "bg-red-500/5" : ""}>
                  <TableCell className="font-medium">{f.colaborador}</TableCell>
                  <TableCell>{f.matricula}</TableCell>
                  <TableCell>{f.setor}</TableCell>
                  <TableCell className="text-xs">{f.periodoAquisitivo}</TableCell>
                  <TableCell className="text-center">{f.diasDireito}</TableCell>
                  <TableCell className="text-center">{f.diasGozados}</TableCell>
                  <TableCell className="text-center font-medium">{f.saldo}</TableCell>
                  <TableCell>
                    {f.inicioProgr ? (
                      <span className="text-xs">
                        {f.inicioProgr} <ArrowRight className="inline h-3 w-3" /> {f.fimProgr}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">Não programada</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(f.status)}</TableCell>
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
    </div>
  )
}

export default function FeriasPage() {
  return (
    <Suspense fallback={null}>
      <FeriasContent />
    </Suspense>
  )
}
