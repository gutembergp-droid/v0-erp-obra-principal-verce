"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Award,
  Plus,
  Download,
  Clock,
  CheckCircle2,
  Scale,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  History,
  FileEdit,
  ChevronRight,
  Info,
  Users,
  DollarSign,
  FileText,
  Building2,
  Banknote,
  CircleDollarSign,
  Gavel,
  Upload,
  ArrowRight,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS
// ============================================

const premiosMock = [
  {
    id: 1,
    colaborador: "Jose Silva Santos",
    grupo: null,
    tipo: "Producao",
    natureza: "Incentivo",
    periodoReferencia: "Jul/2026",
    valor: 1500,
    motivo: "Meta de escavacao atingida - 120% da meta mensal",
    documentoApoio: "relatorio_producao_jul.pdf",
    status: "Aprovado",
    statusPagamento: "Pago",
    impactoJuridico: "OK",
    recorrencia: 1,
    dataRegistro: "2026-07-25",
    dataAprovacao: "2026-07-28",
    dataPagamento: "2026-08-05",
    aprovadores: [
      { nome: "Carlos Gerente", cargo: "Gestor de Producao", data: "2026-07-26", status: "Aprovado" },
      { nome: "Ana RH Corp", cargo: "RH Corporativo", data: "2026-07-28", status: "Aprovado" },
    ],
    historico: [
      {
        data: "2026-07-25 09:30",
        acao: "Registro criado",
        usuario: "Maria RH",
        detalhes: "Premio cadastrado no sistema",
      },
      {
        data: "2026-07-26 14:15",
        acao: "Aprovacao Gestor",
        usuario: "Carlos Gerente",
        detalhes: "Aprovado conforme meta atingida",
      },
      {
        data: "2026-07-28 10:00",
        acao: "Aprovacao RH Corp",
        usuario: "Ana RH Corp",
        detalhes: "Aprovado - dentro da politica",
      },
      {
        data: "2026-08-05 08:00",
        acao: "Pagamento realizado",
        usuario: "Sistema",
        detalhes: "Incluido na folha de pagamento",
      },
    ],
  },
  {
    id: 2,
    colaborador: null,
    grupo: "Equipe Terraplenagem",
    tipo: "Meta",
    natureza: "Campanha",
    periodoReferencia: "Jul/2026",
    valor: 5000,
    motivo: "Meta coletiva atingida - Conclusao antecipada da frente de trabalho",
    documentoApoio: "relatorio_meta_equipe.pdf",
    status: "Em aprovacao",
    statusPagamento: null,
    impactoJuridico: "Atencao",
    recorrencia: 0,
    dataRegistro: "2026-07-30",
    dataAprovacao: null,
    dataPagamento: null,
    aprovadores: [
      { nome: "Carlos Gerente", cargo: "Gestor de Producao", data: "2026-07-31", status: "Aprovado" },
      { nome: "Ana RH Corp", cargo: "RH Corporativo", data: null, status: "Pendente" },
      { nome: "Dr. Paulo", cargo: "Juridico", data: null, status: "Pendente" },
    ],
    historico: [
      {
        data: "2026-07-30 11:00",
        acao: "Registro criado",
        usuario: "Maria RH",
        detalhes: "Premio coletivo cadastrado",
      },
      {
        data: "2026-07-31 09:30",
        acao: "Aprovacao Gestor",
        usuario: "Carlos Gerente",
        detalhes: "Aprovado - equipe superou expectativas",
      },
    ],
  },
  {
    id: 3,
    colaborador: "Maria Aparecida Costa",
    grupo: null,
    tipo: "Desempenho",
    natureza: "Incentivo",
    periodoReferencia: "Jun/2026",
    valor: 800,
    motivo: "Avaliacao de desempenho excepcional - Nota 9.5",
    documentoApoio: null,
    status: "Aprovado",
    statusPagamento: "Pago",
    impactoJuridico: "OK",
    recorrencia: 3,
    dataRegistro: "2026-06-28",
    dataAprovacao: "2026-06-30",
    dataPagamento: "2026-07-05",
    aprovadores: [
      { nome: "Pedro Supervisor", cargo: "Supervisor Administrativo", data: "2026-06-29", status: "Aprovado" },
      { nome: "Ana RH Corp", cargo: "RH Corporativo", data: "2026-06-30", status: "Aprovado" },
    ],
    historico: [
      {
        data: "2026-06-28 10:00",
        acao: "Registro criado",
        usuario: "Joao RH",
        detalhes: "Premio por desempenho cadastrado",
      },
      { data: "2026-06-29 16:00", acao: "Aprovacao Supervisor", usuario: "Pedro Supervisor", detalhes: "Aprovado" },
      { data: "2026-06-30 11:00", acao: "Aprovacao RH Corp", usuario: "Ana RH Corp", detalhes: "Aprovado" },
      { data: "2026-07-05 08:00", acao: "Pagamento realizado", usuario: "Sistema", detalhes: "Incluido na folha" },
    ],
  },
  {
    id: 4,
    colaborador: "Carlos Eduardo Lima",
    grupo: null,
    tipo: "Producao",
    natureza: "Incentivo",
    periodoReferencia: "Jul/2026",
    valor: 2000,
    motivo: "Producao acima da meta - 3o mes consecutivo",
    documentoApoio: "planilha_producao.xlsx",
    status: "Pendente",
    statusPagamento: null,
    impactoJuridico: "Risco",
    recorrencia: 3,
    dataRegistro: "2026-08-01",
    dataAprovacao: null,
    dataPagamento: null,
    aprovadores: [{ nome: "Carlos Gerente", cargo: "Gestor de Producao", data: null, status: "Pendente" }],
    historico: [
      {
        data: "2026-08-01 14:00",
        acao: "Registro criado",
        usuario: "Maria RH",
        detalhes: "Premio cadastrado - ALERTA: 3a recorrencia",
      },
    ],
  },
  {
    id: 5,
    colaborador: "Juliana Santos",
    grupo: null,
    tipo: "Assiduidade",
    natureza: "Desempenho",
    periodoReferencia: "1o Sem/2026",
    valor: 500,
    motivo: "100% de presenca no semestre - Zero faltas e atrasos",
    documentoApoio: null,
    status: "Aprovado",
    statusPagamento: "Aguardando",
    impactoJuridico: "OK",
    recorrencia: 2,
    dataRegistro: "2026-07-02",
    dataAprovacao: "2026-07-05",
    dataPagamento: null,
    aprovadores: [
      { nome: "Maria Coord", cargo: "Coordenadora RH", data: "2026-07-03", status: "Aprovado" },
      { nome: "Ana RH Corp", cargo: "RH Corporativo", data: "2026-07-05", status: "Aprovado" },
    ],
    historico: [
      {
        data: "2026-07-02 09:00",
        acao: "Registro criado",
        usuario: "Sistema",
        detalhes: "Premio automatico por assiduidade",
      },
      {
        data: "2026-07-03 10:30",
        acao: "Aprovacao Coord RH",
        usuario: "Maria Coord",
        detalhes: "Aprovado - politica de assiduidade",
      },
      { data: "2026-07-05 14:00", acao: "Aprovacao RH Corp", usuario: "Ana RH Corp", detalhes: "Aprovado" },
    ],
  },
]

const tiposPremio = ["Producao", "Meta", "Desempenho", "Assiduidade", "Seguranca", "Inovacao", "Outro"]
const naturezas = ["Incentivo", "Campanha", "Desempenho", "Producao"]
const statusList = ["Pendente", "Em aprovacao", "Aprovado", "Rejeitado"]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function PremiosContent() {
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroNatureza, setFiltroNatureza] = useState<string>("todos")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [busca, setBusca] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedPremio, setSelectedPremio] = useState<(typeof premiosMock)[0] | null>(null)
  const [dialogNovoOpen, setDialogNovoOpen] = useState(false)

  // Metricas
  const premiosConcedidos = premiosMock.filter((p) => p.status === "Aprovado").length
  const valorTotal = premiosMock.filter((p) => p.status === "Aprovado").reduce((acc, p) => acc + p.valor, 0)
  const pendentesAprovacao = premiosMock.filter((p) => p.status === "Pendente" || p.status === "Em aprovacao").length
  const alertasJuridicos = premiosMock.filter(
    (p) => p.impactoJuridico === "Risco" || p.impactoJuridico === "Atencao",
  ).length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  // Filtros
  const premiosFiltrados = premiosMock.filter((premio) => {
    const matchTipo = filtroTipo === "todos" || premio.tipo === filtroTipo
    const matchNatureza = filtroNatureza === "todos" || premio.natureza === filtroNatureza
    const matchStatus = filtroStatus === "todos" || premio.status === filtroStatus
    const matchBusca =
      busca === "" ||
      premio.colaborador?.toLowerCase().includes(busca.toLowerCase()) ||
      premio.grupo?.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchNatureza && matchStatus && matchBusca
  })

  const openDetalhe = (premio: (typeof premiosMock)[0]) => {
    setSelectedPremio(premio)
    setSheetOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>
      case "Em aprovacao":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Em aprovacao</Badge>
      case "Pendente":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
      case "Rejeitado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Rejeitado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getImpactoJuridicoBadge = (impacto: string) => {
    switch (impacto) {
      case "OK":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            OK
          </Badge>
        )
      case "Atencao":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Atencao</Badge>
      case "Risco":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Risco</Badge>
      default:
        return <Badge variant="outline">{impacto}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Breadcrumb e Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>RH</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Premios & Bonificacoes</span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Premios & Bonificacoes</h1>
                <p className="text-sm text-muted-foreground">Pagamentos extraordinarios - Nao alteram salario base</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Dialog open={dialogNovoOpen} onOpenChange={setDialogNovoOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Premio
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Registrar Premio / Bonificacao
                    </DialogTitle>
                    <DialogDescription>Preencha os dados do premio. Justificativa e obrigatoria.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="beneficiario">Colaborador ou Grupo *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Colaborador Individual</SelectItem>
                            <SelectItem value="grupo">Grupo/Equipe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="colaborador">Nome *</Label>
                        <Input id="colaborador" placeholder="Buscar colaborador ou grupo..." />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo de Premio *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposPremio.map((tipo) => (
                              <SelectItem key={tipo} value={tipo.toLowerCase()}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="natureza">Natureza Juridica *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {naturezas.map((nat) => (
                              <SelectItem key={nat} value={nat.toLowerCase()}>
                                {nat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor (R$) *</Label>
                        <Input id="valor" type="number" placeholder="0,00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="periodo">Periodo de Referencia *</Label>
                        <Input id="periodo" placeholder="Ex: Jul/2026" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivo">Motivo Detalhado *</Label>
                      <Textarea
                        id="motivo"
                        placeholder="Descreva o motivo do premio com detalhes suficientes para justificar a concessao..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documento">Documento de Apoio (opcional)</Label>
                      <div className="flex gap-2">
                        <Input id="documento" type="file" className="flex-1" />
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-500">Aviso Juridico</p>
                      <p className="text-muted-foreground">
                        Premios recorrentes podem caracterizar habitualidade e integrar ao salario. Certifique-se de que
                        a natureza juridica esta correta.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogNovoOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setDialogNovoOpen(false)}>Registrar Premio</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Cards de Visao */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Premios Concedidos</p>
                  <p className="text-2xl font-bold mt-1">{premiosConcedidos}</p>
                  <p className="text-xs text-muted-foreground">no periodo</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Valor Total</p>
                  <p className="text-2xl font-bold mt-1 text-green-500">{formatCurrency(valorTotal)}</p>
                  <p className="text-xs text-muted-foreground">concedido</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CircleDollarSign className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Pend. Aprovacao</p>
                  <p className="text-2xl font-bold mt-1 text-yellow-500">{pendentesAprovacao}</p>
                  <p className="text-xs text-muted-foreground">aguardando</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={alertasJuridicos > 0 ? "bg-red-500/5 border-red-500/30" : "bg-card/50"}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Alertas Juridicos</p>
                  <p className={`text-2xl font-bold mt-1 ${alertasJuridicos > 0 ? "text-red-500" : ""}`}>
                    {alertasJuridicos}
                  </p>
                  <p className="text-xs text-muted-foreground">requer atencao</p>
                </div>
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${alertasJuridicos > 0 ? "bg-red-500/10" : "bg-muted/50"}`}
                >
                  <Scale className={`h-5 w-5 ${alertasJuridicos > 0 ? "text-red-500" : "text-muted-foreground"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-base font-medium">Registro de Premios</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Input
                  placeholder="Buscar colaborador ou grupo..."
                  className="w-[200px]"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    {tiposPremio.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroNatureza} onValueChange={setFiltroNatureza}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Natureza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    {naturezas.map((nat) => (
                      <SelectItem key={nat} value={nat}>
                        {nat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {statusList.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador / Grupo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Natureza</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Impacto Jur.</TableHead>
                  <TableHead className="text-center">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {premiosFiltrados.map((premio) => (
                  <TableRow key={premio.id} className={premio.impactoJuridico === "Risco" ? "bg-red-500/5" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {premio.grupo ? <Users className="h-4 w-4 text-muted-foreground" /> : null}
                        {premio.colaborador || premio.grupo}
                        {premio.recorrencia >= 3 && (
                          <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-xs">
                            {premio.recorrencia}x
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{premio.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{premio.natureza}</TableCell>
                    <TableCell className="text-muted-foreground">{premio.periodoReferencia}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(premio.valor)}</TableCell>
                    <TableCell>{getStatusBadge(premio.status)}</TableCell>
                    <TableCell className="text-center">{getImpactoJuridicoBadge(premio.impactoJuridico)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetalhe(premio)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhe
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDetalhe(premio)}>
                            <History className="mr-2 h-4 w-4" />
                            Historico
                          </DropdownMenuItem>
                          {premio.status !== "Aprovado" && premio.status !== "Rejeitado" && (
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Solicitar Ajuste
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Card Informativo - Integracoes */}
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="space-y-2">
                <p className="font-medium text-blue-500">Fluxo de Integracao</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" /> Registro RH
                  </span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Aprovacoes
                  </span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" /> Consolidacao RH
                  </span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> Custos
                  </span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="flex items-center gap-1">
                    <Banknote className="h-4 w-4" /> Financeiro
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Juridico avalia risco de equiparacao salarial quando aplicavel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Regras Importantes */}
        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Gavel className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="font-medium text-yellow-500">Regras Importantes</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Premios NAO alteram salario base</li>
                  <li>• Premios recorrentes geram risco juridico de integracao salarial</li>
                  <li>• Historico e imutavel - todas as alteracoes sao registradas</li>
                  <li>• Justificativa e obrigatoria para todos os premios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet de Detalhe */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedPremio && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Detalhe do Premio
                </SheetTitle>
                <SheetDescription>
                  {selectedPremio.colaborador || selectedPremio.grupo} - {selectedPremio.tipo}
                </SheetDescription>
              </SheetHeader>

              <Tabs defaultValue="dados" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dados">Dados</TabsTrigger>
                  <TabsTrigger value="aprovacoes">Aprovacoes</TabsTrigger>
                  <TabsTrigger value="historico">Historico</TabsTrigger>
                </TabsList>

                <TabsContent value="dados" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Beneficiario</p>
                      <p className="font-medium">{selectedPremio.colaborador || selectedPremio.grupo}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Tipo</p>
                      <Badge variant="outline">{selectedPremio.tipo}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Natureza Juridica</p>
                      <p className="font-medium">{selectedPremio.natureza}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Periodo</p>
                      <p className="font-medium">{selectedPremio.periodoReferencia}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Valor</p>
                      <p className="font-medium text-lg text-green-500">{formatCurrency(selectedPremio.valor)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Status</p>
                      {getStatusBadge(selectedPremio.status)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Impacto Juridico</p>
                      {getImpactoJuridicoBadge(selectedPremio.impactoJuridico)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Recorrencia</p>
                      <p className={`font-medium ${selectedPremio.recorrencia >= 3 ? "text-orange-500" : ""}`}>
                        {selectedPremio.recorrencia}x concedido
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Motivo Detalhado</p>
                    <p className="text-sm">{selectedPremio.motivo}</p>
                  </div>

                  {selectedPremio.documentoApoio && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Documento de Apoio</p>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <FileText className="h-4 w-4" />
                        {selectedPremio.documentoApoio}
                      </Button>
                    </div>
                  )}

                  {selectedPremio.impactoJuridico !== "OK" && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-yellow-500">Alerta Juridico</p>
                          <p className="text-muted-foreground">
                            {selectedPremio.recorrencia >= 3
                              ? "Premio concedido 3+ vezes - Risco de habitualidade e integracao ao salario."
                              : "Premio coletivo relevante requer aprovacao do Juridico."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="aprovacoes" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {selectedPremio.aprovadores.map((aprovador, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          aprovador.status === "Aprovado" ? "bg-green-500/5 border-green-500/20" : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              aprovador.status === "Aprovado" ? "bg-green-500/20" : "bg-muted"
                            }`}
                          >
                            {aprovador.status === "Aprovado" ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{aprovador.nome}</p>
                            <p className="text-xs text-muted-foreground">{aprovador.cargo}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {aprovador.status === "Aprovado" ? (
                            <>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>
                              <p className="text-xs text-muted-foreground mt-1">{aprovador.data}</p>
                            </>
                          ) : (
                            <Badge variant="outline">Pendente</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="historico" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {selectedPremio.historico.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                            {idx < selectedPremio.historico.length - 1 && (
                              <div className="w-px flex-1 bg-border mt-1" />
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-xs text-muted-foreground">{item.data}</p>
                            <p className="font-medium text-sm">{item.acao}</p>
                            <p className="text-sm text-muted-foreground">{item.usuario}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.detalhes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      Historico imutavel - Registros nao podem ser alterados ou excluidos
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function PremiosPage() {
  return (
    <Suspense fallback={null}>
      <PremiosContent />
    </Suspense>
  )
}
