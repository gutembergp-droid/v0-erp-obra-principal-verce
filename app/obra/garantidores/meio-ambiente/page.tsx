"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ObraGarantidoresNavbar } from "../../_components/obra-garantidores-navbar"
import {
  Leaf,
  Search,
  Filter,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronRight,
  Shield,
  Droplets,
  Wind,
  TreeDeciduous,
  AlertOctagon,
  ClipboardCheck,
  Bell,
} from "lucide-react"

// Dados mockados
const kpis = {
  licencasAtivas: 12,
  licencasVencer30Dias: 3,
  condicionantesTotal: 48,
  condicionantesPendentes: 8,
  monitoramentosHoje: 5,
  naoConformidades: 2,
}

const licencas = [
  {
    id: "LIC-001",
    numero: "LP-2024/001",
    tipo: "Licenca Previa",
    orgao: "IBAMA",
    dataEmissao: "15/01/2024",
    dataVencimento: "15/01/2026",
    status: "Vigente",
    condicionantes: 12,
    condicionantesCumpridas: 10,
    responsavel: "Eng. Ambiental Ana",
    observacao: "Renovacao em andamento",
  },
  {
    id: "LIC-002",
    numero: "LI-2024/015",
    tipo: "Licenca Instalacao",
    orgao: "SEMA",
    dataEmissao: "20/03/2024",
    dataVencimento: "20/03/2025",
    status: "A Vencer",
    condicionantes: 18,
    condicionantesCumpridas: 15,
    responsavel: "Eng. Ambiental Ana",
    observacao: "Solicitar renovacao ate 20/02/2025",
  },
  {
    id: "LIC-003",
    numero: "LO-2024/008",
    tipo: "Licenca Operacao",
    orgao: "IBAMA",
    dataEmissao: "01/06/2024",
    dataVencimento: "01/06/2029",
    status: "Vigente",
    condicionantes: 8,
    condicionantesCumpridas: 8,
    responsavel: "Eng. Ambiental Carlos",
    observacao: "Todas condicionantes cumpridas",
  },
  {
    id: "LIC-004",
    numero: "AS-2023/042",
    tipo: "Autorizacao Supressao",
    orgao: "SEMA",
    dataEmissao: "10/08/2023",
    dataVencimento: "10/08/2024",
    status: "Vencida",
    condicionantes: 5,
    condicionantesCumpridas: 5,
    responsavel: "Eng. Ambiental Ana",
    observacao: "Aguardando nova autorizacao",
  },
]

const monitoramentos = [
  {
    tipo: "Qualidade da Agua",
    frequencia: "Semanal",
    ultimaColeta: "05/01/2026",
    proximaColeta: "12/01/2026",
    status: "Em Dia",
  },
  {
    tipo: "Qualidade do Ar",
    frequencia: "Mensal",
    ultimaColeta: "02/01/2026",
    proximaColeta: "02/02/2026",
    status: "Em Dia",
  },
  {
    tipo: "Ruido Ambiental",
    frequencia: "Quinzenal",
    ultimaColeta: "28/12/2025",
    proximaColeta: "11/01/2026",
    status: "Proximo",
  },
  {
    tipo: "Fauna Silvestre",
    frequencia: "Trimestral",
    ultimaColeta: "15/10/2025",
    proximaColeta: "15/01/2026",
    status: "Proximo",
  },
  {
    tipo: "Erosao e Sedimentos",
    frequencia: "Semanal",
    ultimaColeta: "06/01/2026",
    proximaColeta: "13/01/2026",
    status: "Em Dia",
  },
]

const condicionantesDetalhes = [
  { codigo: "COND-001", descricao: "Monitoramento de efluentes", prazo: "Mensal", status: "Cumprida" },
  { codigo: "COND-002", descricao: "Relatorio de fauna", prazo: "15/01/2026", status: "Pendente" },
  { codigo: "COND-003", descricao: "Programa de recuperacao de areas", prazo: "Continuo", status: "Em Andamento" },
  { codigo: "COND-004", descricao: "Controle de emissoes atmosfericas", prazo: "Semestral", status: "Cumprida" },
]

function MeioAmbienteContent() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [busca, setBusca] = useState("")
  const [licencaSelecionada, setLicencaSelecionada] = useState<(typeof licencas)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const licencasFiltradas = licencas.filter((lic) => {
    const matchStatus = filtroStatus === "todos" || lic.status === filtroStatus
    const matchTipo = filtroTipo === "todos" || lic.tipo === filtroTipo
    const matchBusca =
      busca === "" ||
      lic.numero.toLowerCase().includes(busca.toLowerCase()) ||
      lic.tipo.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchTipo && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Vigente":
        return "bg-primary/10 text-primary"
      case "A Vencer":
        return "bg-accent/20 text-accent-foreground"
      case "Vencida":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Vigente":
        return <CheckCircle className="w-4 h-4" />
      case "A Vencer":
        return <AlertTriangle className="w-4 h-4" />
      case "Vencida":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getMonitoramentoColor = (status: string) => {
    switch (status) {
      case "Em Dia":
        return "bg-primary/10 text-primary"
      case "Proximo":
        return "bg-accent/20 text-accent-foreground"
      case "Atrasado":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const abrirDetalhe = (lic: (typeof licencas)[0]) => {
    setLicencaSelecionada(lic)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Meio Ambiente</h1>
              <Badge variant="outline" className="text-xs">
                GA-03
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Licencas ambientais e monitoramentos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Relatorio
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Nova Licenca
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-6 gap-4">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Licencas Ativas</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.licencasAtivas}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">A Vencer (30d)</p>
                  <p className="text-2xl font-bold text-accent-foreground">{kpis.licencasVencer30Dias}</p>
                </div>
                <div className="p-2 rounded-lg bg-accent/20">
                  <Bell className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Condicionantes</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.condicionantesTotal}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Cond. Pendentes</p>
                  <p className="text-2xl font-bold text-destructive">{kpis.condicionantesPendentes}</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertOctagon className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Monit. Hoje</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.monitoramentosHoje}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Nao Conformidades</p>
                  <p className="text-2xl font-bold text-destructive">{kpis.naoConformidades}</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas de Governanca */}
        {kpis.licencasVencer30Dias > 0 && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Licencas proximas do vencimento</p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.licencasVencer30Dias} licenca(s) vencem nos proximos 30 dias. Providenciar renovacao.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {kpis.condicionantesPendentes > 5 && (
          <Card className="border-l-4 border-l-accent bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertOctagon className="w-5 h-5 text-accent-foreground" />
                <div>
                  <p className="font-medium text-foreground">Condicionantes pendentes</p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.condicionantesPendentes} condicionantes aguardando cumprimento. Risco de autuacao.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Tabela de Licencas */}
          <div className="col-span-2 space-y-4">
            {/* Filtros */}
            <Card className="bg-card border">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros:</span>
                  </div>

                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Vigente">Vigente</SelectItem>
                      <SelectItem value="A Vencer">A Vencer</SelectItem>
                      <SelectItem value="Vencida">Vencida</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Licenca Previa">Licenca Previa</SelectItem>
                      <SelectItem value="Licenca Instalacao">Licenca Instalacao</SelectItem>
                      <SelectItem value="Licenca Operacao">Licenca Operacao</SelectItem>
                      <SelectItem value="Autorizacao Supressao">Autorizacao Supressao</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por numero ou tipo..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela */}
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Licencas Ambientais
                  <Badge variant="secondary" className="ml-2">
                    {licencasFiltradas.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="p-3 font-medium">Numero</th>
                        <th className="p-3 font-medium">Tipo</th>
                        <th className="p-3 font-medium">Orgao</th>
                        <th className="p-3 font-medium">Vencimento</th>
                        <th className="p-3 font-medium">Status</th>
                        <th className="p-3 font-medium">Condicionantes</th>
                        <th className="p-3 font-medium">Acoes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {licencasFiltradas.map((lic) => (
                        <tr
                          key={lic.id}
                          className="hover:bg-muted/30 cursor-pointer transition-colors"
                          onClick={() => abrirDetalhe(lic)}
                        >
                          <td className="p-3">
                            <span className="font-mono text-sm text-foreground">{lic.numero}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-foreground">{lic.tipo}</span>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {lic.orgao}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-foreground">{lic.dataVencimento}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={`text-xs ${getStatusColor(lic.status)}`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(lic.status)}
                                {lic.status}
                              </span>
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-foreground">
                                {lic.condicionantesCumpridas}/{lic.condicionantes}
                              </span>
                              <Progress
                                value={(lic.condicionantesCumpridas / lic.condicionantes) * 100}
                                className="w-16 h-2"
                              />
                            </div>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monitoramentos */}
          <div className="space-y-4">
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Monitoramentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {monitoramentos.map((mon, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {mon.tipo.includes("Agua") && <Droplets className="w-4 h-4 text-primary" />}
                          {mon.tipo.includes("Ar") && <Wind className="w-4 h-4 text-primary" />}
                          {mon.tipo.includes("Fauna") && <TreeDeciduous className="w-4 h-4 text-primary" />}
                          {!mon.tipo.includes("Agua") && !mon.tipo.includes("Ar") && !mon.tipo.includes("Fauna") && (
                            <Leaf className="w-4 h-4 text-primary" />
                          )}
                          <span className="text-sm font-medium text-foreground">{mon.tipo}</span>
                        </div>
                        <Badge className={`text-xs ${getMonitoramentoColor(mon.status)}`}>{mon.status}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex justify-between">
                          <span>Frequencia:</span>
                          <span>{mon.frequencia}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Proxima coleta:</span>
                          <span className="font-medium">{mon.proximaColeta}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Painel Lateral */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Detalhe da Licenca
              </SheetTitle>
            </SheetHeader>

            {licencaSelecionada && (
              <div className="mt-6 space-y-6">
                {/* Info Principal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {licencaSelecionada.numero}
                    </Badge>
                    <Badge className={getStatusColor(licencaSelecionada.status)}>
                      {getStatusIcon(licencaSelecionada.status)}
                      <span className="ml-1">{licencaSelecionada.status}</span>
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{licencaSelecionada.tipo}</h3>

                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Condicionantes Cumpridas</p>
                        <p className="text-2xl font-bold text-foreground">
                          {licencaSelecionada.condicionantesCumpridas} / {licencaSelecionada.condicionantes}
                        </p>
                        <Progress
                          value={(licencaSelecionada.condicionantesCumpridas / licencaSelecionada.condicionantes) * 100}
                          className="h-2 mt-3"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Detalhes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Informacoes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Orgao Emissor</span>
                      <Badge variant="outline">{licencaSelecionada.orgao}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Emissao</span>
                      <span className="text-foreground">{licencaSelecionada.dataEmissao}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Vencimento</span>
                      <span className="text-foreground">{licencaSelecionada.dataVencimento}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Responsavel</span>
                      <span className="text-foreground">{licencaSelecionada.responsavel}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Condicionantes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-primary" />
                    Condicionantes
                  </h4>
                  <div className="space-y-2">
                    {condicionantesDetalhes.map((cond, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline" className="text-xs font-mono">
                              {cond.codigo}
                            </Badge>
                            <Badge
                              className={
                                cond.status === "Cumprida"
                                  ? "bg-primary/10 text-primary"
                                  : cond.status === "Pendente"
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-accent/20 text-accent-foreground"
                              }
                            >
                              {cond.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{cond.descricao}</p>
                          <p className="text-xs text-muted-foreground mt-1">Prazo: {cond.prazo}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Observacao */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Observacao</h4>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <p className="text-sm text-foreground">{licencaSelecionada.observacao}</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Acoes */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <FileText className="w-4 h-4 mr-2" />
                    Renovar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Condicionantes
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function MeioAmbientePage() {
  return (
    <Suspense fallback={null}>
      <MeioAmbienteContent />
    </Suspense>
  )
}
