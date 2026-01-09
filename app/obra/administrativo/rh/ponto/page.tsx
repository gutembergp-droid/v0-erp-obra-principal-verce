"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  CalendarClock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - CONTROLE DE JORNADA
// ============================================

const controleJornadaMock = [
  {
    id: 1,
    colaborador: "Carlos Silva Santos",
    matricula: "CLT-1001",
    cargo: "Operador de Maquinas",
    setor: "Producao",
    jornadaPrevista: "220h",
    horasTrabalhadas: "220h",
    horasExtras: "0h",
    valorHE: 0,
    bancoHoras: "+12h",
    limiteConvencao: "60h",
    statusLegal: "ok",
    heRecorrente: false,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
    ultimoFechamento: "2025-12-31",
  },
  {
    id: 2,
    colaborador: "Maria Aparecida Costa",
    matricula: "CLT-1002",
    cargo: "Engenheira Civil",
    setor: "Engenharia",
    jornadaPrevista: "220h",
    horasTrabalhadas: "240h",
    horasExtras: "20h",
    valorHE: 1850.0,
    bancoHoras: "+45h",
    limiteConvencao: "60h",
    statusLegal: "atencao",
    heRecorrente: true,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: true,
    ultimoFechamento: "2025-12-31",
  },
  {
    id: 3,
    colaborador: "Roberto Alves Souza",
    matricula: "CLT-1003",
    cargo: "Pedreiro",
    setor: "Producao",
    jornadaPrevista: "220h",
    horasTrabalhadas: "268h",
    horasExtras: "48h",
    valorHE: 2880.0,
    bancoHoras: "+58h",
    limiteConvencao: "60h",
    statusLegal: "risco",
    heRecorrente: true,
    heSemAutorizacao: true,
    excessoJornada: true,
    bancoProximoLimite: true,
    ultimoFechamento: "2025-12-31",
  },
  {
    id: 4,
    colaborador: "Ana Paula Lima",
    matricula: "CLT-1004",
    cargo: "Tecnica de Seguranca",
    setor: "SSMA",
    jornadaPrevista: "220h",
    horasTrabalhadas: "225h",
    horasExtras: "5h",
    valorHE: 350.0,
    bancoHoras: "+5h",
    limiteConvencao: "60h",
    statusLegal: "ok",
    heRecorrente: false,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
    ultimoFechamento: "2025-12-31",
  },
  {
    id: 5,
    colaborador: "Paulo Mendes Junior",
    matricula: "CLT-1005",
    cargo: "Mestre de Obras",
    setor: "Producao",
    jornadaPrevista: "220h",
    horasTrabalhadas: "235h",
    horasExtras: "15h",
    valorHE: 1500.0,
    bancoHoras: "+28h",
    limiteConvencao: "60h",
    statusLegal: "atencao",
    heRecorrente: true,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
    ultimoFechamento: "2025-12-31",
  },
  {
    id: 6,
    colaborador: "Fernanda Oliveira",
    matricula: "CLT-1006",
    cargo: "Auxiliar Administrativo",
    setor: "Administrativo",
    jornadaPrevista: "220h",
    horasTrabalhadas: "218h",
    horasExtras: "0h",
    valorHE: 0,
    bancoHoras: "-2h",
    limiteConvencao: "60h",
    statusLegal: "ok",
    heRecorrente: false,
    heSemAutorizacao: false,
    excessoJornada: false,
    bancoProximoLimite: false,
    ultimoFechamento: "2025-12-31",
  },
]

// Movimentacoes de banco de horas
const movimentacoesBHMock = [
  { id: 1, data: "2026-01-08", tipo: "credito", horas: "+2h", motivo: "HE autorizada", aprovador: "Joao Gerente" },
  { id: 2, data: "2026-01-05", tipo: "debito", horas: "-4h", motivo: "Folga compensatoria", aprovador: "Sistema" },
  { id: 3, data: "2026-01-02", tipo: "credito", horas: "+3h", motivo: "HE emergencial", aprovador: "Maria Diretora" },
  { id: 4, data: "2025-12-28", tipo: "credito", horas: "+1h30", motivo: "HE autorizada", aprovador: "Joao Gerente" },
]

// Historico juridico do colaborador
const historicoJuridicoMock = [
  {
    data: "2025-12-15",
    tipo: "Alerta",
    descricao: "HE recorrente identificada - 3o mes consecutivo",
    acao: "Notificacao ao gestor",
    registradoPor: "Sistema",
  },
  {
    data: "2025-11-20",
    tipo: "Advertencia",
    descricao: "HE sem autorizacao previa",
    acao: "Advertencia verbal aplicada",
    registradoPor: "RH - Ana Costa",
  },
  {
    data: "2025-10-10",
    tipo: "Alerta",
    descricao: "Banco de horas proximo do limite",
    acao: "Agendamento de folga compensatoria",
    registradoPor: "Sistema",
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function PontoContent() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroSetor, setFiltroSetor] = useState("todos")
  const [periodoSelecionado, setPeriodoSelecionado] = useState("janeiro-2026")
  const [detalheAberto, setDetalheAberto] = useState(false)
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<(typeof controleJornadaMock)[0] | null>(null)
  const [dialogHEAberto, setDialogHEAberto] = useState(false)
  const [dialogCompensacaoAberto, setDialogCompensacaoAberto] = useState(false)

  // Contadores enriquecidos
  const totalHorasExtras = controleJornadaMock.reduce((acc, c) => acc + Number.parseInt(c.horasExtras), 0)
  const valorTotalHE = controleJornadaMock.reduce((acc, c) => acc + c.valorHE, 0)
  const colaboradoresComHERecorrente = controleJornadaMock.filter((c) => c.heRecorrente).length
  const totalBancoHoras = controleJornadaMock.reduce((acc, c) => {
    const bh = Number.parseInt(c.bancoHoras.replace("h", "").replace("+", ""))
    return acc + bh
  }, 0)
  const riscoJuridico = controleJornadaMock.filter((c) => c.statusLegal === "risco").length
  const colaboradoresAcimaLimite = controleJornadaMock.filter((c) => Number.parseInt(c.bancoHoras) > 50).length
  const heSemAutorizacao = controleJornadaMock.filter((c) => c.heSemAutorizacao).length

  const setores = [...new Set(controleJornadaMock.map((c) => c.setor))]

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
    const matchBusca =
      c.colaborador.toLowerCase().includes(busca.toLowerCase()) ||
      c.matricula.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || c.statusLegal === filtroStatus
    const matchSetor = filtroSetor === "todos" || c.setor === filtroSetor
    return matchBusca && matchStatus && matchSetor
  })

  const abrirDetalhe = (colaborador: (typeof controleJornadaMock)[0]) => {
    setColaboradorSelecionado(colaborador)
    setDetalheAberto(true)
  }

  return (
    <TooltipProvider>
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
                <p className="text-sm text-muted-foreground">Controle de jornada com camada juridica transversal</p>
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
                Espelho de Ponto
              </Button>
            </div>
          </div>

          {/* Faixa 1: Cards Enriquecidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1: HE no Periodo */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Timer className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    Periodo
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{totalHorasExtras}h</p>
                <p className="text-xs text-muted-foreground mb-2">Horas Extras</p>
                <div className="pt-2 border-t border-border space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Valor Total HE</span>
                    <span className="font-medium">R$ {valorTotalHE.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Sem Autorizacao</span>
                    <span className={heSemAutorizacao > 0 ? "text-red-400 font-medium" : ""}>{heSemAutorizacao}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: HE Recorrente */}
            <Card
              className="border-l-4 border-l-yellow-500 cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => setFiltroStatus("atencao")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-yellow-500" />
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Colaboradores com HE em 3+ meses consecutivos. Risco de caracterizacao como salario.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-2xl font-bold text-yellow-500">{colaboradoresComHERecorrente}</p>
                <p className="text-xs text-muted-foreground mb-2">HE Recorrente</p>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Risco trabalhista</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Banco de Horas */}
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="h-5 w-5 text-emerald-500" />
                  <Badge variant="outline" className="text-xs">
                    Acumulado
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-emerald-500">+{totalBancoHoras}h</p>
                <p className="text-xs text-muted-foreground mb-2">Saldo Total BH</p>
                <div className="pt-2 border-t border-border space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Limite Convencao</span>
                    <span>60h/pessoa</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Acima do Limite</span>
                    <span className={colaboradoresAcimaLimite > 0 ? "text-orange-400 font-medium" : ""}>
                      {colaboradoresAcimaLimite}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Risco Juridico */}
            <Card
              className={`border-l-4 ${riscoJuridico > 0 ? "border-l-red-500 bg-red-500/5" : "border-l-green-500"} cursor-pointer hover:bg-accent/50 transition-colors`}
              onClick={() => riscoJuridico > 0 && setFiltroStatus("risco")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Scale className="h-5 w-5 text-red-500" />
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Colaboradores com irregularidades que podem gerar passivo trabalhista.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className={`text-2xl font-bold ${riscoJuridico > 0 ? "text-red-500" : "text-green-500"}`}>
                  {riscoJuridico}
                </p>
                <p className="text-xs text-muted-foreground mb-2">Risco Juridico</p>
                <div className="pt-2 border-t border-border space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Excesso Jornada</span>
                    <span className="text-red-400">{controleJornadaMock.filter((c) => c.excessoJornada).length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">BH no Limite</span>
                    <span className="text-orange-400">
                      {controleJornadaMock.filter((c) => c.bancoProximoLimite).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerta Juridico */}
          {riscoJuridico > 0 && (
            <Alert className="border-orange-500/50 bg-orange-500/10">
              <Gavel className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-300">
                <strong>{riscoJuridico} colaborador(es)</strong> com risco juridico de jornada identificado. HE
                recorrente pode caracterizar natureza salarial (Sumula 291 TST). Recomenda-se revisao imediata.
              </AlertDescription>
            </Alert>
          )}

          {/* Tabela Principal */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Controle de Jornada</CardTitle>
                  <CardDescription>Visao consolidada por colaborador com indicadores juridicos</CardDescription>
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
                  <Select value={filtroSetor} onValueChange={setFiltroSetor}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Setores</SelectItem>
                      {setores.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
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
                      setFiltroSetor("todos")
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
                    <TableHead>Setor</TableHead>
                    <TableHead className="text-center">
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1 mx-auto">
                          Previsto
                          <Info className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent>Jornada mensal prevista conforme contrato</TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead className="text-center">Trabalhado</TableHead>
                    <TableHead className="text-center">HE</TableHead>
                    <TableHead className="text-center">Valor HE</TableHead>
                    <TableHead className="text-center">
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1 mx-auto">
                          Banco
                          <Info className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent>Saldo acumulado de banco de horas (limite: 60h)</TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead className="text-center">
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1 mx-auto">
                          Status
                          <Info className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p>
                              <strong>OK:</strong> Sem irregularidades
                            </p>
                            <p>
                              <strong>Atencao:</strong> HE recorrente ou BH alto
                            </p>
                            <p>
                              <strong>Risco:</strong> Excesso de jornada ou HE sem autorizacao
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead className="text-center">Alertas</TableHead>
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
                        <span className="text-xs text-muted-foreground">
                          {c.matricula} - {c.cargo}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {c.setor}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">{c.jornadaPrevista}</TableCell>
                      <TableCell className="text-center font-medium">{c.horasTrabalhadas}</TableCell>
                      <TableCell className="text-center">
                        {c.horasExtras !== "0h" ? (
                          <span className="text-blue-400 font-medium">{c.horasExtras}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {c.valorHE > 0 ? (
                          <span className="text-blue-400">R$ {c.valorHE.toLocaleString("pt-BR")}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
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
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="text-xs border-red-500/50 text-red-400 px-1">
                                  <FileWarning className="h-3 w-3" />
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>HE sem autorizacao previa</TooltipContent>
                            </Tooltip>
                          )}
                          {c.excessoJornada && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-400 px-1">
                                  <AlertTriangle className="h-3 w-3" />
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>Excesso de jornada (acima de 10h/dia)</TooltipContent>
                            </Tooltip>
                          )}
                          {c.bancoProximoLimite && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-400 px-1">
                                  <Wallet className="h-3 w-3" />
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>Banco de horas proximo do limite (60h)</TooltipContent>
                            </Tooltip>
                          )}
                          {c.heRecorrente && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-400 px-1">
                                  <TrendingUp className="h-3 w-3" />
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>HE recorrente (3+ meses)</TooltipContent>
                            </Tooltip>
                          )}
                          {!c.heSemAutorizacao && !c.excessoJornada && !c.bancoProximoLimite && !c.heRecorrente && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => abrirDetalhe(c)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
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
                    <strong>Governanca:</strong> Hora extra exige autorizacao previa. Excecoes sao registradas com
                    justificativa obrigatoria.
                  </p>
                  <p>
                    <strong>Juridico:</strong> HE recorrente (3+ meses) pode caracterizar natureza salarial (Sumula 291
                    TST). Banco de horas tem limite de 60h conforme convencao coletiva.
                  </p>
                  <p>
                    <strong>Rastreabilidade:</strong> Todos os alertas e acoes ficam registrados para fins de defesa
                    trabalhista.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sheet de Detalhe do Colaborador */}
        <Sheet open={detalheAberto} onOpenChange={setDetalheAberto}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {colaboradorSelecionado?.colaborador}
                {colaboradorSelecionado?.statusLegal === "risco" && <Scale className="h-5 w-5 text-red-500" />}
              </SheetTitle>
              <SheetDescription>
                {colaboradorSelecionado?.cargo} - {colaboradorSelecionado?.matricula} - {colaboradorSelecionado?.setor}
              </SheetDescription>
            </SheetHeader>

            <Tabs defaultValue="resumo" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                <TabsTrigger value="banco">Banco de Horas</TabsTrigger>
                <TabsTrigger value="juridico">Juridico</TabsTrigger>
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
                      <p className="text-lg font-bold text-blue-400">
                        R$ {colaboradorSelecionado?.valorHE.toLocaleString("pt-BR")}
                      </p>
                      <p className="text-xs text-muted-foreground">Valor HE</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setDialogHEAberto(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Autorizar HE
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setDialogCompensacaoAberto(true)}
                  >
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Agendar Compensacao
                  </Button>
                </div>

                {colaboradorSelecionado?.heRecorrente && (
                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <TrendingUp className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-300">
                      Hora extra recorrente identificada. Colaborador com HE em 3+ meses consecutivos. Risco de
                      caracterizacao como natureza salarial.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="banco" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Movimentacoes</CardTitle>
                      <Badge variant="outline">Limite: {colaboradorSelecionado?.limiteConvencao}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Horas</TableHead>
                          <TableHead>Motivo</TableHead>
                          <TableHead>Aprovador</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {movimentacoesBHMock.map((m) => (
                          <TableRow key={m.id}>
                            <TableCell>{new Date(m.data).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={m.tipo === "credito" ? "text-green-400" : "text-red-400"}
                              >
                                {m.tipo === "credito" ? (
                                  <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 mr-1" />
                                )}
                                {m.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell className={m.tipo === "credito" ? "text-green-400" : "text-red-400"}>
                              {m.horas}
                            </TableCell>
                            <TableCell>{m.motivo}</TableCell>
                            <TableCell className="text-muted-foreground">{m.aprovador}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="juridico" className="space-y-4 mt-4">
                <Card
                  className={colaboradorSelecionado?.statusLegal === "risco" ? "border-red-500/50 bg-red-500/5" : ""}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Gavel className="h-4 w-4" />
                      Status Juridico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status Atual</span>
                      {getStatusLegalBadge(colaboradorSelecionado?.statusLegal || "")}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Indicadores de Risco:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`p-2 rounded border ${colaboradorSelecionado?.heSemAutorizacao ? "border-red-500/50 bg-red-500/10" : "border-muted"}`}
                        >
                          <p className="text-xs text-muted-foreground">HE sem Autorizacao</p>
                          <p className="text-sm font-medium">
                            {colaboradorSelecionado?.heSemAutorizacao ? "Sim" : "Nao"}
                          </p>
                        </div>
                        <div
                          className={`p-2 rounded border ${colaboradorSelecionado?.excessoJornada ? "border-red-500/50 bg-red-500/10" : "border-muted"}`}
                        >
                          <p className="text-xs text-muted-foreground">Excesso Jornada</p>
                          <p className="text-sm font-medium">
                            {colaboradorSelecionado?.excessoJornada ? "Sim" : "Nao"}
                          </p>
                        </div>
                        <div
                          className={`p-2 rounded border ${colaboradorSelecionado?.heRecorrente ? "border-yellow-500/50 bg-yellow-500/10" : "border-muted"}`}
                        >
                          <p className="text-xs text-muted-foreground">HE Recorrente</p>
                          <p className="text-sm font-medium">{colaboradorSelecionado?.heRecorrente ? "Sim" : "Nao"}</p>
                        </div>
                        <div
                          className={`p-2 rounded border ${colaboradorSelecionado?.bancoProximoLimite ? "border-yellow-500/50 bg-yellow-500/10" : "border-muted"}`}
                        >
                          <p className="text-xs text-muted-foreground">BH no Limite</p>
                          <p className="text-sm font-medium">
                            {colaboradorSelecionado?.bancoProximoLimite ? "Sim" : "Nao"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {colaboradorSelecionado?.statusLegal === "risco" && (
                      <Alert className="border-red-500/50 bg-red-500/10">
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-300 text-xs">
                          Colaborador com risco juridico elevado. Acoes corretivas recomendadas para evitar passivo
                          trabalhista.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Historico Juridico (Auditoria)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descricao</TableHead>
                          <TableHead>Acao</TableHead>
                          <TableHead>Registrado Por</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historicoJuridicoMock.map((h, i) => (
                          <TableRow key={i}>
                            <TableCell>{new Date(h.data).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={h.tipo === "Alerta" ? "text-yellow-400" : "text-red-400"}
                              >
                                {h.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell>{h.descricao}</TableCell>
                            <TableCell>{h.acao}</TableCell>
                            <TableCell className="text-muted-foreground">{h.registradoPor}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground text-center">
                  Historico imutavel para fins de auditoria e defesa trabalhista
                </p>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>

        {/* Dialog: Autorizar HE */}
        <Dialog open={dialogHEAberto} onOpenChange={setDialogHEAberto}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Autorizar Hora Extra</DialogTitle>
              <DialogDescription>
                Registre a autorizacao previa de hora extra para {colaboradorSelecionado?.colaborador}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade de Horas</Label>
                  <Input type="number" placeholder="Ex: 2" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Motivo/Justificativa</Label>
                <Textarea placeholder="Descreva o motivo da necessidade de hora extra..." />
              </div>
              <Alert className="border-blue-500/50 bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-300 text-xs">
                  A autorizacao previa e obrigatoria para evitar irregularidades. O registro sera vinculado ao seu
                  usuario.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogHEAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogHEAberto(false)}>Autorizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog: Agendar Compensacao */}
        <Dialog open={dialogCompensacaoAberto} onOpenChange={setDialogCompensacaoAberto}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Compensacao de Banco de Horas</DialogTitle>
              <DialogDescription>
                Agende folga compensatoria para {colaboradorSelecionado?.colaborador}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-3 rounded bg-muted">
                <p className="text-sm">
                  Saldo atual: <strong className="text-emerald-400">{colaboradorSelecionado?.bancoHoras}</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data da Folga</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Horas a Compensar</Label>
                  <Input type="number" placeholder="Ex: 8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Observacao</Label>
                <Textarea placeholder="Observacoes adicionais..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogCompensacaoAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogCompensacaoAberto(false)}>Agendar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default function PontoPage() {
  return (
    <Suspense fallback={null}>
      <PontoContent />
    </Suspense>
  )
}
