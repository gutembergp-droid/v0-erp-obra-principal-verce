"use client"

import { useState, Suspense } from "react"
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Calendar,
  Building2,
  DollarSign,
  Receipt,
  History,
  Info,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados mockados
const folhasMock = [
  {
    id: 1,
    periodo: "Jan/2026",
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-001",
    total: 1250000,
    salarios: 850000,
    horasExtras: 120000,
    beneficios: 150000,
    encargos: 130000,
    colaboradores: 210,
    status: "aprovada",
    dataAprovacao: "05/01/2026",
    aprovadoPor: "Carlos Gerente",
    alertas: 0,
  },
  {
    id: 2,
    periodo: "Jan/2026",
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-002",
    total: 450000,
    salarios: 320000,
    horasExtras: 45000,
    beneficios: 50000,
    encargos: 35000,
    colaboradores: 70,
    status: "recebida",
    dataAprovacao: "05/01/2026",
    aprovadoPor: "Carlos Gerente",
    dataRecebimento: "06/01/2026",
    recebidoPor: "Ana Financeiro",
    alertas: 0,
  },
  {
    id: 3,
    periodo: "Dez/2025",
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-001",
    total: 1180000,
    salarios: 800000,
    horasExtras: 110000,
    beneficios: 145000,
    encargos: 125000,
    colaboradores: 205,
    status: "recebida",
    dataAprovacao: "05/12/2025",
    aprovadoPor: "Carlos Gerente",
    dataRecebimento: "06/12/2025",
    recebidoPor: "Ana Financeiro",
    alertas: 2,
  },
]

const historicoMock = [
  { data: "06/01/2026 14:30", usuario: "Ana Financeiro", acao: "Marcou como recebida", obs: "Valores conferidos" },
  { data: "05/01/2026 16:00", usuario: "Carlos Gerente", acao: "Aprovou folha", obs: "Aprovado conforme análise" },
  { data: "04/01/2026 10:15", usuario: "Sistema Custos", acao: "Validou rateios", obs: "" },
  { data: "03/01/2026 09:00", usuario: "Maria RH", acao: "Consolidou folha", obs: "Consolidação mensal" },
]

function RecebimentoFolhaContent() {
  const [periodo, setPeriodo] = useState("jan-2026")
  const [obra, setObra] = useState("todas")
  const [centroCusto, setCentroCusto] = useState("todos")
  const [statusFiltro, setStatusFiltro] = useState("todos")
  const [selectedFolha, setSelectedFolha] = useState<(typeof folhasMock)[0] | null>(null)
  const [showDetalhe, setShowDetalhe] = useState(false)
  const [showReceberDialog, setShowReceberDialog] = useState(false)
  const [showProvisaoDialog, setShowProvisaoDialog] = useState(false)
  const [observacao, setObservacao] = useState("")

  // Cálculos
  const totalAprovada = folhasMock.filter((f) => f.status === "aprovada").reduce((acc, f) => acc + f.total, 0)
  const totalRecebida = folhasMock.filter((f) => f.status === "recebida").reduce((acc, f) => acc + f.total, 0)
  const totalGeral = folhasMock.reduce((acc, f) => acc + f.total, 0)
  const totalSalarios = folhasMock.reduce((acc, f) => acc + f.salarios, 0)
  const totalHE = folhasMock.reduce((acc, f) => acc + f.horasExtras, 0)
  const totalBeneficios = folhasMock.reduce((acc, f) => acc + f.beneficios, 0)
  const totalEncargos = folhasMock.reduce((acc, f) => acc + f.encargos, 0)
  const totalAlertas = folhasMock.reduce((acc, f) => acc + f.alertas, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovada":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Aprovada</Badge>
      case "recebida":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Recebida</Badge>
      case "pendente":
        return <Badge className="bg-zinc-500/20 text-zinc-400 border-zinc-500/30">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleReceber = () => {
    // Lógica de recebimento
    setShowReceberDialog(false)
    setObservacao("")
  }

  const handleGerarProvisao = () => {
    // Lógica de provisão
    setShowProvisaoDialog(false)
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Financeiro</span>
              <ChevronRight className="h-4 w-4" />
              <span>Folha</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Recebimento</span>
            </div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Receipt className="h-6 w-6" />
              Recebimento de Folha
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Receba e controle as folhas aprovadas pelo fluxo RH → Custos → Gerência
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              Histórico
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">Jan/2026</SelectItem>
                  <SelectItem value="dez-2025">Dez/2025</SelectItem>
                  <SelectItem value="nov-2025">Nov/2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={obra} onValueChange={setObra}>
                <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Obras</SelectItem>
                  <SelectItem value="br101">BR-101 LOTE 2</SelectItem>
                </SelectContent>
              </Select>
              <Select value={centroCusto} onValueChange={setCentroCusto}>
                <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Centro de Custo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os CCs</SelectItem>
                  <SelectItem value="cc001">CC-001</SelectItem>
                  <SelectItem value="cc002">CC-002</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                <SelectTrigger className="w-[150px] bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aprovada">Aprovadas</SelectItem>
                  <SelectItem value="recebida">Recebidas</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total da Folha Aprovada */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total da Folha Aprovada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">
                {totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aguardando recebimento:</span>
                  <span className="text-amber-400">
                    {totalAprovada.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Já recebidas:</span>
                  <span className="text-emerald-400">
                    {totalRecebida.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Composição */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Composição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Salários</span>
                  <span>{totalSalarios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Horas Extras</span>
                  <span>{totalHE.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Benefícios</span>
                  <span>{totalBeneficios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Encargos</span>
                  <span>{totalEncargos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status de Aprovação */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Status de Aprovação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Aprovadas</span>
                  </div>
                  <span className="text-lg font-bold">{folhasMock.filter((f) => f.status === "aprovada").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm">Recebidas</span>
                  </div>
                  <span className="text-lg font-bold">{folhasMock.filter((f) => f.status === "recebida").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-500"></div>
                    <span className="text-sm">Pendentes</span>
                  </div>
                  <span className="text-lg font-bold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alertas
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alertas são somente leitura - originam do fluxo anterior</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {totalAlertas > 0 ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-amber-400">{totalAlertas}</div>
                  <p className="text-xs text-muted-foreground">Alertas registrados nas folhas recebidas</p>
                </div>
              ) : (
                <div className="text-center py-2">
                  <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Nenhum alerta</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Aviso somente leitura */}
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            Esta tela é somente leitura. Os valores são definidos pelo fluxo RH → Custos → Gerência. O Financeiro apenas
            recebe, provisiona e controla pagamentos.
          </AlertDescription>
        </Alert>

        {/* Tabela de Folhas */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">Folhas para Recebimento</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead>Período</TableHead>
                  <TableHead>Obra</TableHead>
                  <TableHead>Centro de Custo</TableHead>
                  <TableHead>Colaboradores</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aprovado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {folhasMock.map((folha) => (
                  <TableRow key={folha.id} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell className="font-medium">{folha.periodo}</TableCell>
                    <TableCell>{folha.obra}</TableCell>
                    <TableCell>{folha.centroCusto}</TableCell>
                    <TableCell>{folha.colaboradores}</TableCell>
                    <TableCell className="text-right font-mono">
                      {folha.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </TableCell>
                    <TableCell>{getStatusBadge(folha.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{folha.dataAprovacao}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedFolha(folha)
                            setShowDetalhe(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        {folha.status === "aprovada" && (
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => {
                              setSelectedFolha(folha)
                              setShowReceberDialog(true)
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Receber
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Fluxo Visual */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">RH</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Custos</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Gerência</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">Financeiro (Você está aqui)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sheet de Detalhe */}
        <Sheet open={showDetalhe} onOpenChange={setShowDetalhe}>
          <SheetContent className="w-[600px] sm:max-w-[600px] bg-zinc-900 border-zinc-800">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Detalhe da Folha - {selectedFolha?.periodo}
              </SheetTitle>
            </SheetHeader>

            {selectedFolha && (
              <div className="mt-6 space-y-6">
                <Tabs defaultValue="resumo">
                  <TabsList className="bg-zinc-800">
                    <TabsTrigger value="resumo">Resumo</TabsTrigger>
                    <TabsTrigger value="composicao">Composição</TabsTrigger>
                    <TabsTrigger value="historico">Histórico</TabsTrigger>
                  </TabsList>

                  <TabsContent value="resumo" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-zinc-800">
                        <p className="text-xs text-muted-foreground">Período</p>
                        <p className="font-medium">{selectedFolha.periodo}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800">
                        <p className="text-xs text-muted-foreground">Obra</p>
                        <p className="font-medium">{selectedFolha.obra}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800">
                        <p className="text-xs text-muted-foreground">Centro de Custo</p>
                        <p className="font-medium">{selectedFolha.centroCusto}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800">
                        <p className="text-xs text-muted-foreground">Colaboradores</p>
                        <p className="font-medium">{selectedFolha.colaboradores}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <p className="text-xs text-muted-foreground mb-1">Valor Total</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {selectedFolha.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between p-2 rounded bg-zinc-800">
                        <span className="text-muted-foreground">Aprovado por</span>
                        <span>{selectedFolha.aprovadoPor}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-zinc-800">
                        <span className="text-muted-foreground">Data Aprovação</span>
                        <span>{selectedFolha.dataAprovacao}</span>
                      </div>
                      {selectedFolha.status === "recebida" && (
                        <>
                          <div className="flex justify-between p-2 rounded bg-zinc-800">
                            <span className="text-muted-foreground">Recebido por</span>
                            <span>{selectedFolha.recebidoPor}</span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-zinc-800">
                            <span className="text-muted-foreground">Data Recebimento</span>
                            <span>{selectedFolha.dataRecebimento}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="composicao" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-800">
                        <span>Salários Base</span>
                        <span className="font-mono font-medium">
                          {selectedFolha.salarios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-800">
                        <span>Horas Extras</span>
                        <span className="font-mono font-medium">
                          {selectedFolha.horasExtras.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-800">
                        <span>Benefícios</span>
                        <span className="font-mono font-medium">
                          {selectedFolha.beneficios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-800">
                        <span>Encargos</span>
                        <span className="font-mono font-medium">
                          {selectedFolha.encargos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <span className="font-medium">Total</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {selectedFolha.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="historico" className="mt-4">
                    <div className="space-y-3">
                      {historicoMock.map((h, idx) => (
                        <div key={idx} className="flex gap-3 p-3 rounded-lg bg-zinc-800">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{h.acao}</span>
                              <span className="text-xs text-muted-foreground">{h.data}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{h.usuario}</p>
                            {h.obs && <p className="text-xs text-muted-foreground mt-1">"{h.obs}"</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {selectedFolha.status === "aprovada" && (
                  <div className="flex gap-2 pt-4 border-t border-zinc-800">
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        setShowDetalhe(false)
                        setShowReceberDialog(true)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marcar como Recebida
                    </Button>
                  </div>
                )}

                {selectedFolha.status === "recebida" && (
                  <div className="flex gap-2 pt-4 border-t border-zinc-800">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setShowDetalhe(false)
                        setShowProvisaoDialog(true)
                      }}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Gerar Provisão
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                )}
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Dialog Receber */}
        <Dialog open={showReceberDialog} onOpenChange={setShowReceberDialog}>
          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                Confirmar Recebimento
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Confirma o recebimento da folha de <strong>{selectedFolha?.periodo}</strong> no valor de{" "}
                <strong className="text-emerald-400">
                  {selectedFolha?.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </strong>
                ?
              </p>
              <div className="space-y-2">
                <Label>Observação (opcional)</Label>
                <Textarea
                  placeholder="Registre observações sobre o recebimento..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReceberDialog(false)}>
                Cancelar
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleReceber}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar Recebimento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Provisão */}
        <Dialog open={showProvisaoDialog} onOpenChange={setShowProvisaoDialog}>
          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Gerar Provisão
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert className="bg-amber-500/10 border-amber-500/30">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <AlertDescription className="text-amber-300">
                  Esta ação irá gerar uma provisão contábil para a folha selecionada.
                </AlertDescription>
              </Alert>
              <div className="p-4 rounded-lg bg-zinc-800">
                <p className="text-sm text-muted-foreground mb-1">Valor da Provisão</p>
                <p className="text-xl font-bold">
                  {selectedFolha?.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProvisaoDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleGerarProvisao}>Gerar Provisão</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default function RecebimentoFolhaPage() {
  return (
    <Suspense fallback={null}>
      <RecebimentoFolhaContent />
    </Suspense>
  )
}
