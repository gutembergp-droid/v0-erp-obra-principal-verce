"use client"

import { useState, Suspense } from "react"
import { RHNav } from "@/components/rh/rh-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DollarSign,
  Users,
  AlertTriangle,
  Ban,
  Download,
  History,
  CheckCircle2,
  ArrowRight,
  Info,
  Calculator,
  Lock,
  Clock,
  Send,
  RefreshCw,
  Eye,
  Scale,
  GitCompare,
  ExternalLink,
  User,
  ClipboardList,
  ShieldAlert,
} from "lucide-react"

const statusFluxo = [
  { id: 1, nome: "Rascunho", descricao: "RH" },
  { id: 2, nome: "Consolidada", descricao: "RH" },
  { id: 3, nome: "Em Analise", descricao: "Custos" },
  { id: 4, nome: "Aprovada Custos", descricao: "Custos" },
  { id: 5, nome: "Aprovada Gerente", descricao: "Gerencia" },
  { id: 6, nome: "Recebida", descricao: "Financeiro" },
  { id: 7, nome: "Provisionada", descricao: "Financeiro" },
  { id: 8, nome: "Paga", descricao: "Financeiro" },
  { id: 9, nome: "Conciliada", descricao: "Encerrada" },
]

const statusAtual = {
  etapa: 2, // Consolidada
  dataUltimoAvanco: "08/01/2026 14:30",
  responsavelUltimoAvanco: "Ana Costa",
  pontoFechado: true, // Ponto do periodo fechado
}

// Dados mockados
const previaFolhaMock = [
  {
    id: 1,
    matricula: "CLT-001",
    nome: "Carlos Silva",
    vinculo: "CLT",
    centroCusto: "Terraplenagem",
    salarioBase: 4500,
    horasNormais: 220,
    he50: 20,
    he100: 8,
    beneficios: 850,
    premios: 0,
    encargos: 2025,
    total: 8125,
    status: "ok",
    motivoBloqueio: null,
  },
  {
    id: 2,
    matricula: "CLT-002",
    nome: "Ana Santos",
    vinculo: "CLT",
    centroCusto: "Engenharia",
    salarioBase: 8500,
    horasNormais: 220,
    he50: 10,
    he100: 0,
    beneficios: 1200,
    premios: 500,
    encargos: 3825,
    total: 14525,
    status: "ok",
    motivoBloqueio: null,
  },
  {
    id: 3,
    matricula: "CLT-003",
    nome: "Pedro Oliveira",
    vinculo: "CLT",
    centroCusto: "Producao",
    salarioBase: 3200,
    horasNormais: 220,
    he50: 30,
    he100: 12,
    beneficios: 650,
    premios: 0,
    encargos: 1440,
    total: 6190,
    status: "bloqueado",
    motivoBloqueio: "ASO vencido",
  },
  {
    id: 4,
    matricula: "PJ-001",
    nome: "Consultoria Tech",
    vinculo: "PJ",
    centroCusto: "TI",
    salarioBase: 15000,
    horasNormais: 160,
    he50: 0,
    he100: 0,
    beneficios: 0,
    premios: 0,
    encargos: 0,
    total: 15000,
    status: "ok",
    motivoBloqueio: null,
  },
  {
    id: 5,
    matricula: "CLT-004",
    nome: "Maria Costa",
    vinculo: "CLT",
    centroCusto: "Administrativo",
    salarioBase: 5200,
    horasNormais: 220,
    he50: 5,
    he100: 0,
    beneficios: 950,
    premios: 200,
    encargos: 2340,
    total: 9015,
    status: "alerta",
    motivoBloqueio: "Documentacao pendente",
  },
  {
    id: 6,
    matricula: "TER-001",
    nome: "Seguranca Patrimonial Ltda",
    vinculo: "Terceiro",
    centroCusto: "Seguranca",
    salarioBase: 12000,
    horasNormais: 0,
    he50: 0,
    he100: 0,
    beneficios: 0,
    premios: 0,
    encargos: 0,
    total: 12000,
    status: "ok",
    motivoBloqueio: null,
  },
  {
    id: 7,
    matricula: "CLT-005",
    nome: "Jose Ferreira",
    vinculo: "CLT",
    centroCusto: "Terraplenagem",
    salarioBase: 3800,
    horasNormais: 220,
    he50: 25,
    he100: 10,
    beneficios: 750,
    premios: 0,
    encargos: 1710,
    total: 7085,
    status: "ok",
    motivoBloqueio: null,
  },
  {
    id: 8,
    matricula: "CLT-006",
    nome: "Lucia Mendes",
    vinculo: "CLT",
    centroCusto: "QSMS",
    salarioBase: 6200,
    horasNormais: 220,
    he50: 8,
    he100: 0,
    beneficios: 1100,
    premios: 0,
    encargos: 2790,
    total: 10398,
    status: "bloqueado",
    motivoBloqueio: "Afastado - Licenca medica",
  },
]

const historicoVersoes = [
  {
    versao: "v3",
    data: "08/01/2026 14:30",
    usuario: "Ana Costa",
    status: "atual",
    observacao: "Versao consolidada",
    totalFolha: 82338,
    totalColaboradores: 8,
    bloqueados: 2,
  },
  {
    versao: "v2",
    data: "05/01/2026 10:15",
    usuario: "Carlos Lima",
    status: "devolvida",
    observacao: "Devolvida por Custos - Ajustar rateio de HE",
    totalFolha: 85420,
    totalColaboradores: 8,
    bloqueados: 1,
  },
  {
    versao: "v1",
    data: "02/01/2026 09:00",
    usuario: "Maria Santos",
    status: "arquivada",
    observacao: "Primeira versao",
    totalFolha: 78900,
    totalColaboradores: 7,
    bloqueados: 0,
  },
]

const pendenciasConformidade = 3
const alertasJuridicos = 1

function PreviaFolhaContent() {
  const [periodo, setPeriodo] = useState("jan-2026")
  const [centroCusto, setCentroCusto] = useState("todos")
  const [showConsolidarDialog, setShowConsolidarDialog] = useState(false)
  const [showHistoricoSheet, setShowHistoricoSheet] = useState(false)
  const [showCompararDialog, setShowCompararDialog] = useState(false)
  const [showOrigemSheet, setShowOrigemSheet] = useState(false)
  const [colaboradorOrigem, setColaboradorOrigem] = useState<(typeof previaFolhaMock)[0] | null>(null)
  const [observacao, setObservacao] = useState("")

  // Filtrar dados
  const dadosFiltrados = previaFolhaMock.filter((item) => {
    if (centroCusto !== "todos" && item.centroCusto !== centroCusto) return false
    return true
  })

  // Calculos
  const totalFolha = dadosFiltrados.reduce((acc, item) => acc + item.total, 0)
  const totalSalarios = dadosFiltrados.reduce((acc, item) => acc + item.salarioBase, 0)
  const totalHE = dadosFiltrados.reduce(
    (acc, item) => acc + item.he50 * (item.salarioBase / 220) * 1.5 + item.he100 * (item.salarioBase / 220) * 2,
    0,
  )
  const totalBeneficios = dadosFiltrados.reduce((acc, item) => acc + item.beneficios, 0)
  const totalPremios = dadosFiltrados.reduce((acc, item) => acc + item.premios, 0)
  const totalEncargos = dadosFiltrados.reduce((acc, item) => acc + item.encargos, 0)

  const totalCLT = dadosFiltrados.filter((i) => i.vinculo === "CLT").reduce((acc, item) => acc + item.total, 0)
  const totalPJ = dadosFiltrados.filter((i) => i.vinculo === "PJ").reduce((acc, item) => acc + item.total, 0)
  const totalTerceiros = dadosFiltrados
    .filter((i) => i.vinculo === "Terceiro")
    .reduce((acc, item) => acc + item.total, 0)

  const bloqueados = dadosFiltrados.filter((i) => i.status === "bloqueado").length
  const alertas = dadosFiltrados.filter((i) => i.status === "alerta").length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const podeConsolidar = () => {
    return statusAtual.etapa === 1 && statusAtual.pontoFechado
  }

  const podeEnviarParaCustos = () => {
    return statusAtual.etapa === 2
  }

  const podeReabrir = () => {
    return statusAtual.etapa === 3 // Devolvida por Custos
  }

  const handleVerOrigem = (colaborador: (typeof previaFolhaMock)[0]) => {
    setColaboradorOrigem(colaborador)
    setShowOrigemSheet(true)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <RHNav modulo="obra" />

        <div className="flex-1 p-6 space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Status do Fluxo</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Ultimo avanco: {statusAtual.dataUltimoAvanco} por {statusAtual.responsavelUltimoAvanco}
                </div>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {statusFluxo.map((etapa, index) => (
                  <div key={etapa.id} className="flex items-center">
                    <div
                      className={`flex flex-col items-center min-w-[80px] ${
                        etapa.id === statusAtual.etapa
                          ? "text-primary"
                          : etapa.id < statusAtual.etapa
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          etapa.id === statusAtual.etapa
                            ? "bg-primary text-primary-foreground"
                            : etapa.id < statusAtual.etapa
                              ? "bg-emerald-500 text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {etapa.id < statusAtual.etapa ? <CheckCircle2 className="h-4 w-4" /> : etapa.id}
                      </div>
                      <span className="text-[10px] mt-1 text-center leading-tight">{etapa.nome}</span>
                      <span className="text-[9px] text-muted-foreground">{etapa.descricao}</span>
                    </div>
                    {index < statusFluxo.length - 1 && (
                      <div
                        className={`h-0.5 w-4 mx-1 ${etapa.id < statusAtual.etapa ? "bg-emerald-500" : "bg-muted"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Header com Badges de Bloqueio */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>Obra</span>
                <span>/</span>
                <span>RH</span>
                <span>/</span>
                <span>Consolidacao</span>
                <span>/</span>
                <span className="text-foreground">Previa de Folha</span>
              </div>
              <h1 className="text-2xl font-bold">Previa de Folha</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Versao atual: <Badge variant="outline">v3</Badge> - Consolidacao de custos de mao de obra
              </p>

              <div className="flex items-center gap-2 mt-3">
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="destructive" className="cursor-pointer hover:bg-destructive/80">
                      <Ban className="h-3 w-3 mr-1" />
                      Bloqueios ({bloqueados})
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Clique para filtrar bloqueados</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-amber-500 text-amber-600 hover:bg-amber-500/10"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Pendencias Conformidade ({pendenciasConformidade})
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Clique para ver pendencias</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="cursor-pointer border-red-500 text-red-600 hover:bg-red-500/10">
                      <Scale className="h-3 w-3 mr-1" />
                      Alertas Juridicos ({alertasJuridicos})
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Clique para ver alertas juridicos</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Filtros */}
              <div className="flex items-center gap-2">
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                    <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
                    <SelectItem value="nov-2025">Novembro/2025</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={centroCusto} onValueChange={setCentroCusto}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Centro de Custo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Terraplenagem">Terraplenagem</SelectItem>
                    <SelectItem value="Engenharia">Engenharia</SelectItem>
                    <SelectItem value="Producao">Producao</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                    <SelectItem value="QSMS">QSMS</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="Seguranca">Seguranca</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>

                {podeReabrir() && (
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reabrir como Nova Versao
                  </Button>
                )}

                {podeConsolidar() ? (
                  <Button size="sm" onClick={() => setShowConsolidarDialog(true)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Consolidar Previa
                  </Button>
                ) : statusAtual.etapa === 1 && !statusAtual.pontoFechado ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size="sm" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        Consolidar Previa
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ponto do periodo nao esta fechado</p>
                    </TooltipContent>
                  </Tooltip>
                ) : null}

                {podeEnviarParaCustos() && (
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar para Custos
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Cards Superiores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Valor Total */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total da Folha</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalFolha)}</div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Colaboradores</span>
                    <span className="font-medium">{dadosFiltrados.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Excluidos (bloqueados)</span>
                    <span className="font-medium text-destructive">{bloqueados}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Composicao */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Composicao da Folha</CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salarios</span>
                    <span className="font-medium">{formatCurrency(totalSalarios)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horas Extras</span>
                    <span className="font-medium">{formatCurrency(totalHE)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beneficios</span>
                    <span className="font-medium">{formatCurrency(totalBeneficios)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Premios</span>
                    <span className="font-medium">{formatCurrency(totalPremios)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Encargos</span>
                    <span className="font-medium">{formatCurrency(totalEncargos)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Distribuicao */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Distribuicao por Vinculo</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">CLT</span>
                      <span className="font-medium">{formatCurrency(totalCLT)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(totalCLT / totalFolha) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">PJ</span>
                      <span className="font-medium">{formatCurrency(totalPJ)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(totalPJ / totalFolha) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Terceiros</span>
                      <span className="font-medium">{formatCurrency(totalTerceiros)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(totalTerceiros / totalFolha) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Bloqueios */}
            <Card className={bloqueados > 0 ? "border-destructive/50" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Bloqueios & Alertas</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ban className="h-4 w-4 text-destructive" />
                      <span className="text-sm">Bloqueados</span>
                    </div>
                    <Badge variant="destructive">{bloqueados}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Alertas</span>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      {alertas}
                    </Badge>
                  </div>
                  {bloqueados > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <Info className="h-3 w-3 inline mr-1" />
                        Bloqueados serao excluidos automaticamente da consolidacao
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Versoes & Historico</CardTitle>
                  <CardDescription>Versao atual: v3 - Criada em 08/01/2026 por Ana Costa</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowHistoricoSheet(true)}>
                    <History className="h-4 w-4 mr-2" />
                    Ver Todas
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowCompararDialog(true)}>
                    <GitCompare className="h-4 w-4 mr-2" />
                    Comparar Versoes
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tabela */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Previa de Folha - {periodo === "jan-2026" ? "Janeiro/2026" : periodo}</CardTitle>
                  <CardDescription>{dadosFiltrados.length} registros</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Matricula</TableHead>
                      <TableHead className="font-semibold">Nome</TableHead>
                      <TableHead className="font-semibold">Vinculo</TableHead>
                      <TableHead className="font-semibold">Centro de Custo</TableHead>
                      <TableHead className="font-semibold text-right">Salario Base</TableHead>
                      <TableHead className="font-semibold text-right">Hrs Normais</TableHead>
                      <TableHead className="font-semibold text-right">HE 50%</TableHead>
                      <TableHead className="font-semibold text-right">HE 100%</TableHead>
                      <TableHead className="font-semibold text-right">Beneficios</TableHead>
                      <TableHead className="font-semibold text-right">Premios</TableHead>
                      <TableHead className="font-semibold text-right">Encargos</TableHead>
                      <TableHead className="font-semibold text-right">Total</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadosFiltrados.map((item) => (
                      <TableRow
                        key={item.id}
                        className={
                          item.status === "bloqueado"
                            ? "bg-destructive/5 text-muted-foreground line-through"
                            : item.status === "alerta"
                              ? "bg-amber-500/5"
                              : ""
                        }
                      >
                        <TableCell className="font-mono text-sm">{item.matricula}</TableCell>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {item.vinculo}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.centroCusto}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(item.salarioBase)}</TableCell>
                        <TableCell className="text-right font-mono">{item.horasNormais}h</TableCell>
                        <TableCell className="text-right font-mono">{item.he50}h</TableCell>
                        <TableCell className="text-right font-mono">{item.he100}h</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(item.beneficios)}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(item.premios)}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(item.encargos)}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          {formatCurrency(item.total)}
                        </TableCell>
                        <TableCell>
                          {item.status === "ok" && (
                            <Badge
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              OK
                            </Badge>
                          )}
                          {item.status === "bloqueado" && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="destructive">
                                  <Ban className="h-3 w-3 mr-1" />
                                  Bloqueado
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.motivoBloqueio}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {item.status === "alerta" && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Alerta
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.motivoBloqueio}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleVerOrigem(item)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Origem
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Rodape com Totais */}
              <div className="border-t bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Total ({dadosFiltrados.filter((i) => i.status !== "bloqueado").length} colaboradores validos)
                  </div>
                  <div className="text-xl font-bold">
                    {formatCurrency(
                      dadosFiltrados.filter((i) => i.status !== "bloqueado").reduce((acc, item) => acc + item.total, 0),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info de Fluxo */}
          <Card className="bg-muted/30">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-medium">RH</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">Custos</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">Gerente</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">Financeiro</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dialog Consolidar */}
        <Dialog open={showConsolidarDialog} onOpenChange={setShowConsolidarDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Consolidar Previa de Folha</DialogTitle>
              <DialogDescription>
                Ao consolidar, uma nova versao sera criada e a previa sera enviada para o departamento de Custos.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Colaboradores validos</span>
                  <span className="font-medium">{dadosFiltrados.filter((i) => i.status !== "bloqueado").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Colaboradores excluidos</span>
                  <span className="font-medium text-destructive">{bloqueados}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
                  <span>Valor Total</span>
                  <span>
                    {formatCurrency(
                      dadosFiltrados.filter((i) => i.status !== "bloqueado").reduce((acc, item) => acc + item.total, 0),
                    )}
                  </span>
                </div>
              </div>

              {bloqueados > 0 && (
                <div className="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-600">Atencao</p>
                    <p className="text-muted-foreground">
                      {bloqueados} colaborador(es) bloqueado(s) serao excluidos automaticamente.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Observacao (obrigatoria)</label>
                <Textarea
                  placeholder="Descreva as observacoes desta consolidacao..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConsolidarDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowConsolidarDialog(false)} disabled={!observacao.trim()}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Consolidar e Enviar para Custos
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showCompararDialog} onOpenChange={setShowCompararDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Comparar Versoes</DialogTitle>
              <DialogDescription>Compare as diferencas entre versoes da previa de folha</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Versao Base</label>
                <Select defaultValue="v2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v2">v2 - 05/01/2026</SelectItem>
                    <SelectItem value="v1">v1 - 02/01/2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Versao Comparada</label>
                <Select defaultValue="v3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v3">v3 - 08/01/2026 (Atual)</SelectItem>
                    <SelectItem value="v2">v2 - 05/01/2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Diferencas Encontradas</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-red-500/10 rounded">
                  <span>Total da Folha</span>
                  <span className="text-red-600">-R$ 3.082,00 (-3,6%)</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Colaboradores</span>
                  <span>8 → 8 (sem alteracao)</span>
                </div>
                <div className="flex justify-between p-2 bg-emerald-500/10 rounded">
                  <span>Bloqueados</span>
                  <span className="text-emerald-600">1 → 2 (+1)</span>
                </div>
                <div className="flex justify-between p-2 bg-amber-500/10 rounded">
                  <span>Horas Extras</span>
                  <span className="text-amber-600">Ajustado rateio</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCompararDialog(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sheet Historico */}
        <Sheet open={showHistoricoSheet} onOpenChange={setShowHistoricoSheet}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Historico de Versoes</SheetTitle>
              <SheetDescription>Registro de todas as versoes da previa de folha</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              {historicoVersoes.map((versao) => (
                <div
                  key={versao.versao}
                  className={`p-4 rounded-lg border ${versao.status === "atual" ? "bg-primary/5 border-primary/30" : "bg-muted/30"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={versao.status === "atual" ? "default" : "outline"}>{versao.versao}</Badge>
                      {versao.status === "atual" && (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">
                          Atual
                        </Badge>
                      )}
                      {versao.status === "devolvida" && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                          Devolvida
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{versao.data}</span>
                  </div>
                  <p className="text-sm">{versao.observacao}</p>
                  <div className="mt-2 pt-2 border-t text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-medium">{formatCurrency(versao.totalFolha)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Colaboradores:</span>
                      <span>{versao.totalColaboradores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bloqueados:</span>
                      <span>{versao.bloqueados}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Por: {versao.usuario}</p>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={showOrigemSheet} onOpenChange={setShowOrigemSheet}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Origem dos Dados</SheetTitle>
              <SheetDescription>
                {colaboradorOrigem?.nome} - {colaboradorOrigem?.matricula}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Informacoes do Colaborador</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vinculo:</span>
                    <span>{colaboradorOrigem?.vinculo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Centro de Custo:</span>
                    <span>{colaboradorOrigem?.centroCusto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">{formatCurrency(colaboradorOrigem?.total || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Links para Origem</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={`/obra/administrativo/rh/colaborador/${colaboradorOrigem?.id}`}>
                      <User className="h-4 w-4 mr-2" />
                      Pessoas - Prontuario
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="/obra/administrativo/rh/ponto">
                      <Clock className="h-4 w-4 mr-2" />
                      Ponto - Registros do Periodo
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="/obra/administrativo/rh/conformidade">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Conformidade - Pendencias
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={`/obra/administrativo/rh/colaborador/${colaboradorOrigem?.id}?tab=juridico`}>
                      <ShieldAlert className="h-4 w-4 mr-2" />
                      Juridico - Bloqueios/Risco
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}

export default function PreviaFolhaPage() {
  return (
    <Suspense fallback={null}>
      <PreviaFolhaContent />
    </Suspense>
  )
}
