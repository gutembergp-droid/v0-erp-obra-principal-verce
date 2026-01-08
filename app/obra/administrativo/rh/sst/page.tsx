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
  ShieldCheck,
  Search,
  Download,
  AlertTriangle,
  Clock,
  Eye,
  RefreshCw,
  Calendar,
  Stethoscope,
  GraduationCap,
  AlertCircle,
} from "lucide-react"

// ASOs mockados
const asosMock = [
  {
    id: "ASO-001",
    colaborador: "Carlos Silva",
    matricula: "1001",
    tipo: "Admissional",
    data: "2024-01-15",
    vencimento: "2025-01-15",
    status: "valido",
    medico: "Dr. João Santos",
    apto: true,
  },
  {
    id: "ASO-002",
    colaborador: "Maria Santos",
    matricula: "1002",
    tipo: "Periodico",
    data: "2024-06-10",
    vencimento: "2025-06-10",
    status: "valido",
    medico: "Dr. João Santos",
    apto: true,
  },
  {
    id: "ASO-003",
    colaborador: "Jose Oliveira",
    matricula: "1003",
    tipo: "Admissional",
    data: "2024-11-20",
    vencimento: "2025-11-20",
    status: "valido",
    medico: "Dra. Ana Lima",
    apto: true,
  },
  {
    id: "ASO-004",
    colaborador: "Ana Costa",
    matricula: "1004",
    tipo: "Periodico",
    data: "2024-03-15",
    vencimento: "2025-03-15",
    status: "vencendo",
    medico: "Dr. João Santos",
    apto: true,
  },
  {
    id: "ASO-005",
    colaborador: "Pedro Lima",
    matricula: "1005",
    tipo: "Periodico",
    data: "2023-12-01",
    vencimento: "2024-12-01",
    status: "vencido",
    medico: "Dra. Ana Lima",
    apto: true,
  },
  {
    id: "ASO-006",
    colaborador: "Fernanda Souza",
    matricula: "1006",
    tipo: "Admissional",
    data: null,
    vencimento: null,
    status: "pendente",
    medico: null,
    apto: null,
  },
]

// NRs/Treinamentos mockados
const treinamentosMock = [
  {
    id: "TR-001",
    colaborador: "Carlos Silva",
    matricula: "1001",
    nr: "NR-35",
    descricao: "Trabalho em Altura",
    data: "2024-02-10",
    vencimento: "2026-02-10",
    status: "valido",
    cargaHoraria: 8,
  },
  {
    id: "TR-002",
    colaborador: "Carlos Silva",
    matricula: "1001",
    nr: "NR-18",
    descricao: "Segurança Construção",
    data: "2024-02-10",
    vencimento: "2026-02-10",
    status: "valido",
    cargaHoraria: 4,
  },
  {
    id: "TR-003",
    colaborador: "Maria Santos",
    matricula: "1002",
    nr: "NR-35",
    descricao: "Trabalho em Altura",
    data: "2024-03-15",
    vencimento: "2026-03-15",
    status: "valido",
    cargaHoraria: 8,
  },
  {
    id: "TR-004",
    colaborador: "Jose Oliveira",
    matricula: "1003",
    nr: "NR-35",
    descricao: "Trabalho em Altura",
    data: null,
    vencimento: null,
    status: "pendente",
    cargaHoraria: 8,
  },
  {
    id: "TR-005",
    colaborador: "Ana Costa",
    matricula: "1004",
    nr: "NR-10",
    descricao: "Segurança Eletricidade",
    data: "2023-06-20",
    vencimento: "2025-06-20",
    status: "vencendo",
    cargaHoraria: 40,
  },
  {
    id: "TR-006",
    colaborador: "Pedro Lima",
    matricula: "1005",
    nr: "NR-33",
    descricao: "Espaço Confinado",
    data: "2023-01-15",
    vencimento: "2024-01-15",
    status: "vencido",
    cargaHoraria: 16,
  },
  {
    id: "TR-007",
    colaborador: "Fernanda Souza",
    matricula: "1006",
    nr: "NR-18",
    descricao: "Segurança Construção",
    data: "2024-05-10",
    vencimento: "2026-05-10",
    status: "valido",
    cargaHoraria: 4,
  },
]

function SSTContent() {
  const [abaAtiva, setAbaAtiva] = useState("aso")
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")

  // Contadores ASO
  const asoValidos = asosMock.filter((a) => a.status === "valido").length
  const asoPendentes = asosMock.filter((a) => a.status === "pendente").length
  const asoVencendo = asosMock.filter((a) => a.status === "vencendo").length
  const asoVencidos = asosMock.filter((a) => a.status === "vencido").length

  // Contadores NR
  const nrValidos = treinamentosMock.filter((t) => t.status === "valido").length
  const nrPendentes = treinamentosMock.filter((t) => t.status === "pendente").length
  const nrVencendo = treinamentosMock.filter((t) => t.status === "vencendo").length
  const nrVencidos = treinamentosMock.filter((t) => t.status === "vencido").length

  const totalAlertas = asoPendentes + asoVencendo + asoVencidos + nrPendentes + nrVencendo + nrVencidos

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Válido</Badge>
      case "pendente":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
      case "vencendo":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Vencendo</Badge>
      case "vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filtros
  const asosFiltrados = asosMock.filter((aso) => {
    const matchBusca = aso.colaborador.toLowerCase().includes(busca.toLowerCase()) || aso.matricula.includes(busca)
    const matchStatus = filtroStatus === "todos" || aso.status === filtroStatus
    return matchBusca && matchStatus
  })

  const treinamentosFiltrados = treinamentosMock.filter((tr) => {
    const matchBusca =
      tr.colaborador.toLowerCase().includes(busca.toLowerCase()) ||
      tr.matricula.includes(busca) ||
      tr.nr.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || tr.status === filtroStatus
    return matchBusca && matchStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <RHNav />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Obra</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">SST</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            Saúde e Segurança do Trabalho
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Exame
          </Button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Stethoscope className="h-4 w-4" />
              <span className="text-xs">ASO Válidos</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{asoValidos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">ASO Pendente</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{asoPendentes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">ASO Vencendo</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{asoVencendo + asoVencidos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">NR Válidas</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{nrValidos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">NR Pendente</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{nrPendentes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">NR Vencendo</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{nrVencendo + nrVencidos}</p>
          </CardContent>
        </Card>
        <Card className={totalAlertas > 0 ? "border-red-500/50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs">Alertas Totais</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{totalAlertas}</p>
          </CardContent>
        </Card>
      </div>

      {/* Abas */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList>
          <TabsTrigger value="aso" className="gap-2">
            <Stethoscope className="h-4 w-4" />
            Exames/ASO
          </TabsTrigger>
          <TabsTrigger value="nr" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Treinamentos/NRs
          </TabsTrigger>
        </TabsList>

        {/* Barra de Busca */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por colaborador, matrícula ou NR..."
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
                  <SelectItem value="valido">Válidos</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="vencendo">Vencendo</SelectItem>
                  <SelectItem value="vencido">Vencidos</SelectItem>
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

        <TabsContent value="aso" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">
                Atestados de Saúde Ocupacional ({asosFiltrados.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data Exame</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Apto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asosFiltrados.map((aso) => (
                    <TableRow key={aso.id} className={aso.status === "vencido" ? "bg-red-500/5" : ""}>
                      <TableCell className="font-medium">{aso.colaborador}</TableCell>
                      <TableCell>{aso.matricula}</TableCell>
                      <TableCell>{aso.tipo}</TableCell>
                      <TableCell>{aso.data || "-"}</TableCell>
                      <TableCell>{aso.vencimento || "-"}</TableCell>
                      <TableCell>{aso.medico || "-"}</TableCell>
                      <TableCell>
                        {aso.apto === null ? (
                          "-"
                        ) : aso.apto ? (
                          <Badge className="bg-green-500/20 text-green-400">Apto</Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400">Inapto</Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(aso.status)}</TableCell>
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
        </TabsContent>

        <TabsContent value="nr" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">
                Treinamentos e NRs ({treinamentosFiltrados.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>NR</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Carga H.</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treinamentosFiltrados.map((tr) => (
                    <TableRow key={tr.id} className={tr.status === "vencido" ? "bg-red-500/5" : ""}>
                      <TableCell className="font-medium">{tr.colaborador}</TableCell>
                      <TableCell>{tr.matricula}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tr.nr}</Badge>
                      </TableCell>
                      <TableCell>{tr.descricao}</TableCell>
                      <TableCell>{tr.data || "-"}</TableCell>
                      <TableCell>{tr.vencimento || "-"}</TableCell>
                      <TableCell>{tr.cargaHoraria}h</TableCell>
                      <TableCell>{getStatusBadge(tr.status)}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SSTPage() {
  return (
    <Suspense fallback={null}>
      <SSTContent />
    </Suspense>
  )
}
