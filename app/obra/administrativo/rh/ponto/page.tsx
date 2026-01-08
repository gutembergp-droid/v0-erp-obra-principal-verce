"use client"

import { Suspense, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Clock,
  Search,
  Download,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Eye,
  RefreshCw,
  Users,
  Timer,
  ArrowUpRight,
  ArrowDownLeft,
  Coffee,
  Moon,
  Fingerprint,
  Scale,
} from "lucide-react"

// Dados mockados - Resumo diário
const resumoDiario = [
  {
    colaborador: "Carlos Silva",
    matricula: "1001",
    entrada: "07:00",
    saidaAlmoco: "12:00",
    retornoAlmoco: "13:00",
    saida: "17:00",
    trabalhadas: "8h00",
    extras: "0h00",
    status: "regular",
    riscoJuridico: false,
  },
  {
    colaborador: "Maria Santos",
    matricula: "1002",
    entrada: "07:15",
    saidaAlmoco: "12:00",
    retornoAlmoco: "13:00",
    saida: "17:30",
    trabalhadas: "8h15",
    extras: "0h15",
    status: "extra",
    riscoJuridico: false,
  },
  {
    colaborador: "Jose Oliveira",
    matricula: "1003",
    entrada: "07:30",
    saidaAlmoco: "12:00",
    retornoAlmoco: "13:00",
    saida: "17:00",
    trabalhadas: "7h30",
    extras: "0h00",
    status: "atraso",
    riscoJuridico: false,
  },
  {
    colaborador: "Ana Costa",
    matricula: "1004",
    entrada: "07:00",
    saidaAlmoco: "12:00",
    retornoAlmoco: "13:00",
    saida: "19:00",
    trabalhadas: "10h00",
    extras: "2h00",
    status: "extra",
    riscoJuridico: true,
  },
  {
    colaborador: "Pedro Lima",
    matricula: "1005",
    entrada: null,
    saidaAlmoco: null,
    retornoAlmoco: null,
    saida: null,
    trabalhadas: "0h00",
    extras: "0h00",
    status: "falta",
    riscoJuridico: false,
  },
  {
    colaborador: "Fernanda Souza",
    matricula: "1006",
    entrada: "07:00",
    saidaAlmoco: "12:00",
    retornoAlmoco: "13:00",
    saida: "17:00",
    trabalhadas: "8h00",
    extras: "0h00",
    status: "regular",
    riscoJuridico: false,
  },
]

// Batidas do dia (log)
const batidasHoje = [
  { colaborador: "Carlos Silva", matricula: "1001", hora: "07:00", tipo: "entrada", dispositivo: "Catraca Principal" },
  { colaborador: "Maria Santos", matricula: "1002", hora: "07:15", tipo: "entrada", dispositivo: "Catraca Principal" },
  { colaborador: "Jose Oliveira", matricula: "1003", hora: "07:30", tipo: "entrada", dispositivo: "Catraca Principal" },
  { colaborador: "Ana Costa", matricula: "1004", hora: "07:00", tipo: "entrada", dispositivo: "Biometrico Canteiro" },
  {
    colaborador: "Fernanda Souza",
    matricula: "1006",
    hora: "07:00",
    tipo: "entrada",
    dispositivo: "Catraca Principal",
  },
  {
    colaborador: "Carlos Silva",
    matricula: "1001",
    hora: "12:00",
    tipo: "saida_almoco",
    dispositivo: "Catraca Principal",
  },
]

function PontoContent() {
  const [abaAtiva, setAbaAtiva] = useState("resumo")
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [dataSelecionada, setDataSelecionada] = useState("2026-01-08")

  // Contadores
  const totalColaboradores = resumoDiario.length
  const presentes = resumoDiario.filter((r) => r.status !== "falta").length
  const ausentes = resumoDiario.filter((r) => r.status === "falta").length
  const atrasos = resumoDiario.filter((r) => r.status === "atraso").length
  const comExtra = resumoDiario.filter((r) => r.status === "extra").length
  const alertasJuridicos = resumoDiario.filter((r) => r.riscoJuridico).length
  const totalExtras = resumoDiario.reduce((acc, r) => {
    const [h, m] = r.extras.replace("h", ":").split(":").map(Number)
    return acc + h * 60 + m
  }, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "regular":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Regular</Badge>
      case "extra":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Extra</Badge>
      case "atraso":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Atraso</Badge>
      case "falta":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Falta</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoBatidaIcon = (tipo: string) => {
    switch (tipo) {
      case "entrada":
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />
      case "saida":
        return <ArrowUpRight className="h-4 w-4 text-red-400" />
      case "saida_almoco":
        return <Coffee className="h-4 w-4 text-orange-400" />
      case "retorno_almoco":
        return <Coffee className="h-4 w-4 text-blue-400" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const resumoFiltrado = resumoDiario.filter((r) => {
    const matchBusca = r.colaborador.toLowerCase().includes(busca.toLowerCase()) || r.matricula.includes(busca)
    const matchStatus = filtroStatus === "todos" || r.status === filtroStatus
    return matchBusca && matchStatus
  })

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Fingerprint className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Ponto</h1>
              <p className="text-sm text-muted-foreground">Controle de ponto e banco de horas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
              className="w-40"
            />
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajuste Manual
            </Button>
          </div>
        </div>

        {/* Cards Indicadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{totalColaboradores}</p>
              <p className="text-xs text-muted-foreground">Efetivo</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{presentes}</p>
              <p className="text-xs text-green-400">Presentes</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30 cursor-pointer" onClick={() => setFiltroStatus("falta")}>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{ausentes}</p>
              <p className="text-xs text-red-400">Ausentes</p>
            </CardContent>
          </Card>
          <Card
            className="bg-yellow-500/10 border-yellow-500/30 cursor-pointer"
            onClick={() => setFiltroStatus("atraso")}
          >
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{atrasos}</p>
              <p className="text-xs text-yellow-400">Atrasos</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/10 border-blue-500/30 cursor-pointer" onClick={() => setFiltroStatus("extra")}>
            <CardContent className="p-4 text-center">
              <Timer className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <p className="text-2xl font-bold text-blue-500">{comExtra}</p>
              <p className="text-xs text-blue-400">Com Extra</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <Moon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {Math.floor(totalExtras / 60)}h{totalExtras % 60 > 0 ? `${totalExtras % 60}` : "00"}
              </p>
              <p className="text-xs text-muted-foreground">Total Extras</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Scale className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-2xl font-bold text-orange-500">{alertasJuridicos}</p>
              <p className="text-xs text-orange-400">Alertas Juridicos</p>
            </CardContent>
          </Card>
        </div>

        {/* Abas */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
              <div className="border-b px-4">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger value="resumo" className="gap-2">
                    <Users className="h-4 w-4" />
                    Resumo Diário
                  </TabsTrigger>
                  <TabsTrigger value="batidas" className="gap-2">
                    <Fingerprint className="h-4 w-4" />
                    Log de Batidas
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Busca */}
              <div className="p-4 border-b">
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
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="extra">Extra</SelectItem>
                      <SelectItem value="atraso">Atraso</SelectItem>
                      <SelectItem value="falta">Falta</SelectItem>
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
              </div>

              <TabsContent value="resumo" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead className="text-center">Entrada</TableHead>
                      <TableHead className="text-center">Saída Almoço</TableHead>
                      <TableHead className="text-center">Retorno</TableHead>
                      <TableHead className="text-center">Saída</TableHead>
                      <TableHead className="text-center">Trabalhadas</TableHead>
                      <TableHead className="text-center">Extras</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Juridico</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resumoFiltrado.map((r, i) => (
                      <TableRow key={i} className={r.status === "falta" ? "bg-red-500/5" : ""}>
                        <TableCell className="font-medium">{r.colaborador}</TableCell>
                        <TableCell>{r.matricula}</TableCell>
                        <TableCell className="text-center">{r.entrada || "-"}</TableCell>
                        <TableCell className="text-center">{r.saidaAlmoco || "-"}</TableCell>
                        <TableCell className="text-center">{r.retornoAlmoco || "-"}</TableCell>
                        <TableCell className="text-center">{r.saida || "-"}</TableCell>
                        <TableCell className="text-center font-medium">{r.trabalhadas}</TableCell>
                        <TableCell className="text-center">
                          {r.extras !== "0h00" ? (
                            <span className="text-blue-400 font-medium">{r.extras}</span>
                          ) : (
                            <span className="text-muted-foreground">{r.extras}</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(r.status)}</TableCell>
                        <TableCell className="text-center">
                          {r.riscoJuridico && <Scale className="h-4 w-4 text-orange-500 mx-auto" />}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="batidas" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Dispositivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batidasHoje.map((b, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono font-medium">{b.hora}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTipoBatidaIcon(b.tipo)}
                            <span className="capitalize">{b.tipo.replace("_", " ")}</span>
                          </div>
                        </TableCell>
                        <TableCell>{b.colaborador}</TableCell>
                        <TableCell>{b.matricula}</TableCell>
                        <TableCell className="text-muted-foreground">{b.dispositivo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PontoPage() {
  return (
    <Suspense fallback={null}>
      <PontoContent />
    </Suspense>
  )
}
