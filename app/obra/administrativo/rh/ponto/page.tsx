"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RHNav } from "@/components/rh/rh-nav"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Clock,
  Search,
  Download,
  AlertTriangle,
  CheckCircle2,
  Eye,
  RefreshCw,
  Timer,
  Scale,
  Gavel,
  FileWarning,
  TrendingUp,
  Wallet,
  Info,
  History,
  ShieldAlert,
  FileText,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - CONTROLE DE JORNADA
// ============================================

const controleJornadaMock = [
  {
    id: 1,
    colaborador: "Carlos Silva Santos",
    matricula: "1001",
    cargo: "Operador de Maquinas",
    jornadaPrevista: "8h",
    horasTrabalhadas: "8h00",
    horasExtras: "0h00",
    bancoHoras: "+12h",
    statusLegal: "ok",
    heRecorrente: false,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
  },
  {
    id: 2,
    colaborador: "Maria Aparecida Costa",
    matricula: "1002",
    cargo: "Engenheira Civil",
    jornadaPrevista: "8h",
    horasTrabalhadas: "10h00",
    horasExtras: "2h00",
    bancoHoras: "+45h",
    statusLegal: "atencao",
    heRecorrente: true,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: true,
  },
  {
    id: 3,
    colaborador: "Roberto Alves Souza",
    matricula: "1003",
    cargo: "Pedreiro",
    jornadaPrevista: "8h",
    horasTrabalhadas: "12h00",
    horasExtras: "4h00",
    bancoHoras: "+8h",
    statusLegal: "risco",
    heRecorrente: true,
    heSemAutorizacao: true,
    excessoJornada: true,
    bancoProximoLimite: false,
  },
  {
    id: 4,
    colaborador: "Ana Paula Lima",
    matricula: "1004",
    cargo: "Tecnica de Seguranca",
    jornadaPrevista: "8h",
    horasTrabalhadas: "8h30",
    horasExtras: "0h30",
    bancoHoras: "+5h",
    statusLegal: "ok",
    heRecorrente: false,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
  },
  {
    id: 5,
    colaborador: "Paulo Mendes Junior",
    matricula: "1005",
    cargo: "Mestre de Obras",
    jornadaPrevista: "8h",
    horasTrabalhadas: "9h00",
    horasExtras: "1h00",
    bancoHoras: "+28h",
    statusLegal: "atencao",
    heRecorrente: true,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
  },
  {
    id: 6,
    colaborador: "Fernanda Oliveira",
    matricula: "1006",
    cargo: "Auxiliar Administrativo",
    jornadaPrevista: "8h",
    horasTrabalhadas: "8h00",
    horasExtras: "0h00",
    bancoHoras: "-2h",
    statusLegal: "ok",
    heRecorrente: false,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
  },
]

// Historico juridico do colaborador
const historicoJuridicoMock = [
  {
    data: "2025-12-15",
    tipo: "Alerta",
    descricao: "HE recorrente identificada - 3o mes consecutivo",
    acao: "Notificacao ao gestor",
  },
  {
    data: "2025-11-20",
    tipo: "Advertencia",
    descricao: "HE sem autorizacao previa",
    acao: "Advertencia verbal aplicada",
  },
  {
    data: "2025-10-10",
    tipo: "Alerta",
    descricao: "Banco de horas proximo do limite",
    acao: "Agendamento de folga compensatoria",
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function PontoContent() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [periodoSelecionado, setPeriodoSelecionado] = useState("janeiro-2026")
  const [detalheAberto, setDetalheAberto] = useState(false)
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<(typeof controleJornadaMock)[0] | null>(null)

  // Contadores
  const totalHorasExtras = controleJornadaMock.reduce((acc, c) => {
    const he = c.horasExtras.replace("h", ":").split(":").map(Number)
    return acc + he[0] * 60 + (he[1] || 0)
  }, 0)
  const colaboradoresComHERecorrente = controleJornadaMock.filter((c) => c.heRecorrente).length
  const totalBancoHoras = controleJornadaMock.reduce((acc, c) => {
    const bh = Number.parseInt(c.bancoHoras.replace("h", "").replace("+", ""))
    return acc + bh
  }, 0)
  const riscoJuridico = controleJornadaMock.filter((c) => c.statusLegal === "risco").length

  const getStatusLegalBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">OK</Badge>
      case "atencao":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Atencao</Badge>
      case "risco":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Risco</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const dadosFiltrados = controleJornadaMock.filter((c) => {
    const matchBusca = c.colaborador.toLowerCase().includes(busca.toLowerCase()) || c.matricula.includes(busca)
    const matchStatus = filtroStatus === "todos" || c.statusLegal === filtroStatus
    return matchBusca && matchStatus
  })

  const abrirDetalhe = (colaborador: (typeof controleJornadaMock)[0]) => {
    setColaboradorSelecionado(colaborador)
    setDetalheAberto(true)
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Ponto & Banco de Horas</h1>
              <p className="text-sm text-muted-foreground">Controle de jornada com indicadores juridicos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="janeiro-2026">Janeiro/2026</SelectItem>
                <SelectItem value="dezembro-2025">Dezembro/2025</SelectItem>
                <SelectItem value="novembro-2025">Novembro/2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relatorio Jornada
            </Button>
          </div>
        </div>

        {/* Cards de Visao */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Timer className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <p className="text-2xl font-bold text-blue-500">
                {Math.floor(totalHorasExtras / 60)}h{totalHorasExtras % 60 > 0 ? totalHorasExtras % 60 : "00"}
              </p>
              <p className="text-xs text-blue-400">Horas Extras no Periodo</p>
            </CardContent>
          </Card>
          <Card
            className="bg-yellow-500/10 border-yellow-500/30 cursor-pointer"
            onClick={() => setFiltroStatus("atencao")}
          >
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{colaboradoresComHERecorrente}</p>
              <p className="text-xs text-yellow-400">HE Recorrente</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-500/10 border-emerald-500/30">
            <CardContent className="p-4 text-center">
              <Wallet className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
              <p className="text-2xl font-bold text-emerald-500">+{totalBancoHoras}h</p>
              <p className="text-xs text-emerald-400">Saldo Banco de Horas</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30 cursor-pointer" onClick={() => setFiltroStatus("risco")}>
            <CardContent className="p-4 text-center">
              <Scale className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{riscoJuridico}</p>
              <p className="text-xs text-red-400">Risco Juridico de Jornada</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerta Juridico */}
        {riscoJuridico > 0 && (
          <Alert className="border-orange-500/50 bg-orange-500/10">
            <Gavel className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-300">
              <strong>{riscoJuridico} colaborador(es)</strong> com risco juridico de jornada identificado. Recomenda-se
              revisao imediata para evitar passivo trabalhista.
            </AlertDescription>
          </Alert>
        )}

        {/* Tabela Principal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Controle de Jornada</CardTitle>
                <CardDescription>Visao consolidada por colaborador</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar colaborador..."
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
                    <SelectItem value="ok">OK</SelectItem>
                    <SelectItem value="atencao">Atencao</SelectItem>
                    <SelectItem value="risco">Risco</SelectItem>
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
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead className="text-center">Jornada Prevista</TableHead>
                  <TableHead className="text-center">Horas Trabalhadas</TableHead>
                  <TableHead className="text-center">Horas Extras</TableHead>
                  <TableHead className="text-center">Banco de Horas</TableHead>
                  <TableHead className="text-center">Status Legal</TableHead>
                  <TableHead className="text-center">Indicadores</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosFiltrados.map((c) => (
                  <TableRow key={c.id} className={c.statusLegal === "risco" ? "bg-red-500/5" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.colaborador}</span>
                        {c.statusLegal === "risco" && <Scale className="h-4 w-4 text-red-500" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{c.matricula}</span>
                    </TableCell>
                    <TableCell>{c.cargo}</TableCell>
                    <TableCell className="text-center">{c.jornadaPrevista}</TableCell>
                    <TableCell className="text-center font-medium">{c.horasTrabalhadas}</TableCell>
                    <TableCell className="text-center">
                      {c.horasExtras !== "0h00" ? (
                        <span className="text-blue-400 font-medium">{c.horasExtras}</span>
                      ) : (
                        <span className="text-muted-foreground">{c.horasExtras}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={c.bancoHoras.startsWith("-") ? "text-red-400" : "text-emerald-400"}>
                        {c.bancoHoras}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{getStatusLegalBadge(c.statusLegal)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {c.heSemAutorizacao && (
                          <Badge
                            variant="outline"
                            className="text-xs border-red-500/50 text-red-400"
                            title="HE sem autorizacao"
                          >
                            <FileWarning className="h-3 w-3 mr-1" />
                            S/Aut
                          </Badge>
                        )}
                        {c.excessoJornada && (
                          <Badge
                            variant="outline"
                            className="text-xs border-orange-500/50 text-orange-400"
                            title="Excesso de jornada"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Exc
                          </Badge>
                        )}
                        {c.bancoProximoLimite && (
                          <Badge
                            variant="outline"
                            className="text-xs border-yellow-500/50 text-yellow-400"
                            title="Banco proximo do limite"
                          >
                            <Wallet className="h-3 w-3 mr-1" />
                            Lim
                          </Badge>
                        )}
                        {!c.heSemAutorizacao && !c.excessoJornada && !c.bancoProximoLimite && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => abrirDetalhe(c)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhe
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Card Informativo - Governanca */}
        <Card className="border-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Governanca:</strong> Hora extra exige autorizacao previa conforme politica. Excecoes sao
                  registradas com justificativa.
                </p>
                <p>
                  <strong>Rastreabilidade:</strong> Todos os alertas juridicos sao informativos e ficam registrados para
                  fins de defesa trabalhista.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet de Detalhe */}
      <Sheet open={detalheAberto} onOpenChange={setDetalheAberto}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {colaboradorSelecionado?.colaborador}
              {colaboradorSelecionado?.statusLegal === "risco" && <Scale className="h-5 w-5 text-red-500" />}
            </SheetTitle>
            <SheetDescription>
              {colaboradorSelecionado?.cargo} - Mat. {colaboradorSelecionado?.matricula}
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="resumo" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="juridico">Status Juridico</TabsTrigger>
              <TabsTrigger value="historico">Historico</TabsTrigger>
            </TabsList>

            <TabsContent value="resumo" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">{colaboradorSelecionado?.horasTrabalhadas}</p>
                    <p className="text-xs text-muted-foreground">Horas Trabalhadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-400">{colaboradorSelecionado?.horasExtras}</p>
                    <p className="text-xs text-muted-foreground">Horas Extras</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">{colaboradorSelecionado?.bancoHoras}</p>
                    <p className="text-xs text-muted-foreground">Banco de Horas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    {getStatusLegalBadge(colaboradorSelecionado?.statusLegal || "")}
                    <p className="text-xs text-muted-foreground mt-1">Status Legal</p>
                  </CardContent>
                </Card>
              </div>

              {colaboradorSelecionado?.heRecorrente && (
                <Alert className="border-yellow-500/50 bg-yellow-500/10">
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-300">
                    Hora extra recorrente identificada. Colaborador com HE em 3+ meses consecutivos.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="juridico" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    Indicadores Juridicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HE sem autorizacao</span>
                    {colaboradorSelecionado?.heSemAutorizacao ? (
                      <Badge className="bg-red-500/20 text-red-400">Sim</Badge>
                    ) : (
                      <Badge className="bg-green-500/20 text-green-400">Nao</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Excesso de jornada</span>
                    {colaboradorSelecionado?.excessoJornada ? (
                      <Badge className="bg-red-500/20 text-red-400">Sim</Badge>
                    ) : (
                      <Badge className="bg-green-500/20 text-green-400">Nao</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HE recorrente (habitualidade)</span>
                    {colaboradorSelecionado?.heRecorrente ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400">Sim</Badge>
                    ) : (
                      <Badge className="bg-green-500/20 text-green-400">Nao</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Banco proximo do limite</span>
                    {colaboradorSelecionado?.bancoProximoLimite ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400">Sim</Badge>
                    ) : (
                      <Badge className="bg-green-500/20 text-green-400">Nao</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatorio de Jornada
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Defesa
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Trilha de Auditoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historicoJuridicoMock.map((h, i) => (
                      <div key={i} className="flex gap-3 pb-3 border-b last:border-0">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{h.data}</span>
                            <Badge variant="outline" className="text-xs">
                              {h.tipo}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{h.descricao}</p>
                          <p className="text-xs text-muted-foreground mt-1">Acao: {h.acao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
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
