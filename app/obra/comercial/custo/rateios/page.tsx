"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Settings2,
  History,
  AlertTriangle,
  PieChart,
  DollarSign,
  Building2,
  Filter,
  MoreHorizontal,
  FileText,
  User,
  Info,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Dados mockados
const rateiosMock = [
  {
    id: "RAT-001",
    centroCusto: "CC-001 Terraplenagem",
    criterio: "Horas Trabalhadas",
    valorTotal: 285000,
    valorRateado: 142500,
    percentual: 50,
    status: "validado",
    responsavel: "João Silva",
    dataValidacao: "08/01/2026",
    atividades: [
      { nome: "Escavação", valor: 85500, percentual: 60 },
      { nome: "Compactação", valor: 42750, percentual: 30 },
      { nome: "Transporte", valor: 14250, percentual: 10 },
    ],
  },
  {
    id: "RAT-002",
    centroCusto: "CC-002 Pavimentação",
    criterio: "Produção Física",
    valorTotal: 285000,
    valorRateado: 85500,
    percentual: 30,
    status: "pendente",
    responsavel: null,
    dataValidacao: null,
    atividades: [
      { nome: "Base", valor: 42750, percentual: 50 },
      { nome: "Revestimento", valor: 34200, percentual: 40 },
      { nome: "Sinalização", valor: 8550, percentual: 10 },
    ],
  },
  {
    id: "RAT-003",
    centroCusto: "CC-003 Drenagem",
    criterio: "Custo Direto",
    valorTotal: 285000,
    valorRateado: 42750,
    percentual: 15,
    status: "validado",
    responsavel: "Maria Santos",
    dataValidacao: "07/01/2026",
    atividades: [
      { nome: "Tubulação", valor: 25650, percentual: 60 },
      { nome: "Bueiros", valor: 12825, percentual: 30 },
      { nome: "Caixas", valor: 4275, percentual: 10 },
    ],
  },
  {
    id: "RAT-004",
    centroCusto: "CC-004 OAE",
    criterio: "Horas Trabalhadas",
    valorTotal: 285000,
    valorRateado: 14250,
    percentual: 5,
    status: "ajuste_necessario",
    responsavel: null,
    dataValidacao: null,
    atividades: [
      { nome: "Fundação", valor: 7125, percentual: 50 },
      { nome: "Estrutura", valor: 5700, percentual: 40 },
      { nome: "Acabamento", valor: 1425, percentual: 10 },
    ],
  },
]

const historicoMock = [
  {
    versao: "v3",
    data: "08/01/2026 14:30",
    usuario: "João Silva",
    acao: "Validação de rateio CC-001",
    detalhes: "Rateio validado após conferência com produção",
  },
  {
    versao: "v2",
    data: "07/01/2026 16:45",
    usuario: "Maria Santos",
    acao: "Ajuste de critério CC-003",
    detalhes: "Alterado de Horas Trabalhadas para Custo Direto",
  },
  {
    versao: "v1",
    data: "05/01/2026 09:00",
    usuario: "Sistema",
    acao: "Geração automática de rateios",
    detalhes: "Rateios gerados com base nos critérios padrão",
  },
]

function RateiosContent() {
  const [periodo, setPeriodo] = useState("01/2026")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRateio, setSelectedRateio] = useState<(typeof rateiosMock)[0] | null>(null)
  const [showAjusteDialog, setShowAjusteDialog] = useState(false)
  const [showValidarDialog, setShowValidarDialog] = useState(false)
  const [showHistorico, setShowHistorico] = useState(false)
  const [rateioParaAjuste, setRateioParaAjuste] = useState<(typeof rateiosMock)[0] | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validado":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Validado</Badge>
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pendente</Badge>
        )
      case "ajuste_necessario":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Ajuste Necessário</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalRateado = rateiosMock.reduce((acc, r) => acc + r.valorRateado, 0)
  const validados = rateiosMock.filter((r) => r.status === "validado").length
  const pendentes = rateiosMock.filter((r) => r.status === "pendente").length
  const comAjuste = rateiosMock.filter((r) => r.status === "ajuste_necessario").length

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/obra/comercial" className="hover:text-foreground">
              Comercial
            </Link>
            <span>/</span>
            <Link href="/obra/comercial/custo" className="hover:text-foreground">
              Custos
            </Link>
            <span>/</span>
            <span className="text-foreground">Rateios & Apropriação</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/obra/comercial/custo">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold">Rateios & Apropriação</h1>
                <p className="text-sm text-muted-foreground">
                  Distribuição de custos de MO por centro de custo e atividade
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowHistorico(true)}>
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Período:</Label>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01/2026">Jan/2026</SelectItem>
                  <SelectItem value="12/2025">Dez/2025</SelectItem>
                  <SelectItem value="11/2025">Nov/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Obra:</Label>
              <Select defaultValue="br101">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br101">BR-101 LOTE 2</SelectItem>
                  <SelectItem value="br116">BR-116 LOTE 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </div>

        {/* Cards Resumo */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Valor Total MO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 285.000</div>
              <p className="text-xs text-muted-foreground mt-1">Período: {periodo}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Total Rateado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalRateado.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-muted-foreground mt-1">100% distribuído</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Status Validação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-600">{validados}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-lg text-yellow-600">{pendentes}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-lg text-red-600">{comAjuste}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Validados / Pendentes / Ajustes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Centros de Custo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rateiosMock.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Com rateio no período</p>
            </CardContent>
          </Card>
        </div>

        {/* Aviso informativo */}
        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-blue-700 dark:text-blue-300">
            Os rateios são gerados automaticamente com base nos critérios configurados. Ajustes manuais requerem
            justificativa e ficam registrados no histórico.
          </span>
        </div>

        {/* Tabela de Rateios */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Centro de Custo</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Centro de Custo</TableHead>
                  <TableHead>Critério de Rateio</TableHead>
                  <TableHead className="text-right">Valor Rateado</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Validação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rateiosMock.map((rateio) => (
                  <TableRow
                    key={rateio.id}
                    className={rateio.status === "ajuste_necessario" ? "bg-red-50/50 dark:bg-red-900/10" : ""}
                  >
                    <TableCell>
                      <button
                        onClick={() => setSelectedRateio(rateio)}
                        className="font-medium text-left hover:text-primary hover:underline"
                      >
                        {rateio.centroCusto}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1">
                          {rateio.criterio}
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Critério utilizado para distribuir o custo</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {rateio.valorRateado.toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${rateio.percentual}%` }} />
                        </div>
                        <span className="text-sm">{rateio.percentual}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(rateio.status)}</TableCell>
                    <TableCell>
                      {rateio.dataValidacao ? (
                        <div className="text-sm">
                          <p>{rateio.responsavel}</p>
                          <p className="text-xs text-muted-foreground">{rateio.dataValidacao}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedRateio(rateio)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Detalhe
                          </DropdownMenuItem>
                          {rateio.status !== "validado" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setRateioParaAjuste(rateio)
                                setShowValidarDialog(true)
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Validar Rateio
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              setRateioParaAjuste(rateio)
                              setShowAjusteDialog(true)
                            }}
                          >
                            <Settings2 className="h-4 w-4 mr-2" />
                            Ajustar Critério
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sheet de Detalhe */}
        <Sheet open={!!selectedRateio} onOpenChange={() => setSelectedRateio(null)}>
          <SheetContent className="w-[500px] sm:max-w-[500px]">
            <SheetHeader>
              <SheetTitle>Detalhe do Rateio</SheetTitle>
            </SheetHeader>
            {selectedRateio && (
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Centro de Custo</span>
                    <span className="font-medium">{selectedRateio.centroCusto}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Critério</span>
                    <span className="font-medium">{selectedRateio.criterio}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Valor Rateado</span>
                    <span className="font-medium">R$ {selectedRateio.valorRateado.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Percentual</span>
                    <span className="font-medium">{selectedRateio.percentual}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {getStatusBadge(selectedRateio.status)}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Distribuição por Atividade</h4>
                  <div className="space-y-3">
                    {selectedRateio.atividades.map((ativ, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{ativ.nome}</p>
                          <p className="text-xs text-muted-foreground">{ativ.percentual}% do CC</p>
                        </div>
                        <span className="font-medium">R$ {ativ.valor.toLocaleString("pt-BR")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedRateio.status !== "validado" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setRateioParaAjuste(selectedRateio)
                        setShowValidarDialog(true)
                        setSelectedRateio(null)
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Validar Rateio
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRateioParaAjuste(selectedRateio)
                        setShowAjusteDialog(true)
                        setSelectedRateio(null)
                      }}
                    >
                      <Settings2 className="h-4 w-4 mr-2" />
                      Ajustar
                    </Button>
                  </div>
                )}
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Dialog Validar Rateio */}
        <Dialog open={showValidarDialog} onOpenChange={setShowValidarDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Validar Rateio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{rateioParaAjuste?.centroCusto}</p>
                <p className="text-sm text-muted-foreground">
                  R$ {rateioParaAjuste?.valorRateado.toLocaleString("pt-BR")} ({rateioParaAjuste?.percentual}%)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Observação (opcional)</Label>
                <Textarea placeholder="Adicione uma observação sobre a validação..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowValidarDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowValidarDialog(false)}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirmar Validação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Ajustar Critério */}
        <Dialog open={showAjusteDialog} onOpenChange={setShowAjusteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajustar Critério de Rateio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{rateioParaAjuste?.centroCusto}</p>
                <p className="text-sm text-muted-foreground">Critério atual: {rateioParaAjuste?.criterio}</p>
              </div>
              <div className="space-y-2">
                <Label>Novo Critério</Label>
                <Select defaultValue={rateioParaAjuste?.criterio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Horas Trabalhadas">Horas Trabalhadas</SelectItem>
                    <SelectItem value="Produção Física">Produção Física</SelectItem>
                    <SelectItem value="Custo Direto">Custo Direto</SelectItem>
                    <SelectItem value="Proporcional">Proporcional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Justificativa *</Label>
                <Textarea placeholder="Descreva o motivo do ajuste..." required />
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-xs text-yellow-700 dark:text-yellow-300">
                  Ajustes de critério ficam registrados no histórico e requerem nova validação.
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAjusteDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowAjusteDialog(false)}>
                <Settings2 className="h-4 w-4 mr-2" />
                Confirmar Ajuste
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sheet Histórico */}
        <Sheet open={showHistorico} onOpenChange={setShowHistorico}>
          <SheetContent className="w-[500px] sm:max-w-[500px]">
            <SheetHeader>
              <SheetTitle>Histórico de Alterações</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <div className="space-y-4">
                {historicoMock.map((item, idx) => (
                  <div key={idx} className="relative pl-6 pb-4 border-l-2 border-muted last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.versao}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.data}</span>
                      </div>
                      <p className="font-medium text-sm">{item.acao}</p>
                      <p className="text-sm text-muted-foreground">{item.detalhes}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {item.usuario}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}

export default function RateiosPage() {
  return (
    <Suspense fallback={null}>
      <RateiosContent />
    </Suspense>
  )
}
