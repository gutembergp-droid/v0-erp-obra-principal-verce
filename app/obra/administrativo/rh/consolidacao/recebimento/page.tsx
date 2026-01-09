"use client"

import { useState, Suspense } from "react"
import { RHNav } from "@/components/rh/rh-nav"
import {
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  Eye,
  Calendar,
  DollarSign,
  Receipt,
  History,
  Info,
  ChevronRight,
  Filter,
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
    periodo: "Fev/2026",
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-001",
    total: 1320000,
    salarios: 890000,
    horasExtras: 140000,
    beneficios: 155000,
    encargos: 135000,
    colaboradores: 215,
    status: "pendente",
    dataAprovacao: null,
    aprovadoPor: null,
    alertas: 2,
  },
  {
    id: 3,
    periodo: "Mar/2026",
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-001",
    total: 1180000,
    salarios: 800000,
    horasExtras: 100000,
    beneficios: 145000,
    encargos: 135000,
    colaboradores: 208,
    status: "recebida",
    dataAprovacao: "03/03/2026",
    aprovadoPor: "Carlos Gerente",
    alertas: 0,
  },
]

const historicoMock = [
  { data: "05/03/2026 14:30", usuario: "Sistema", acao: "Folha recebida do fluxo de aprovação" },
  { data: "03/03/2026 10:15", usuario: "Carlos Gerente", acao: "Folha aprovada pela gerência" },
  { data: "02/03/2026 16:45", usuario: "Ana Custos", acao: "Análise de custos concluída" },
  { data: "01/03/2026 09:00", usuario: "João RH", acao: "Folha consolidada e enviada" },
]

function RecebimentoFolhaContent() {
  const [selectedPeriodo, setSelectedPeriodo] = useState("todos")
  const [selectedStatus, setSelectedStatus] = useState("todos")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedFolha, setSelectedFolha] = useState<(typeof folhasMock)[0] | null>(null)
  const [dialogReceber, setDialogReceber] = useState(false)
  const [dialogProvisao, setDialogProvisao] = useState(false)
  const [observacao, setObservacao] = useState("")

  const totalAprovada = folhasMock.filter((f) => f.status === "aprovada").reduce((acc, f) => acc + f.total, 0)
  const totalPendente = folhasMock.filter((f) => f.status === "pendente").reduce((acc, f) => acc + f.total, 0)
  const totalRecebida = folhasMock.filter((f) => f.status === "recebida").reduce((acc, f) => acc + f.total, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprovada</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>
      case "recebida":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Recebida</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <RHNav modulo="obra" />

        <div className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Recebimento de Folha</h1>
              <p className="text-sm text-muted-foreground">
                Receba as folhas aprovadas pelo fluxo RH → Custos → Gerência
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <History className="w-4 h-4 mr-2" />
                Histórico
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-4">
            <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="jan">Janeiro/2026</SelectItem>
                <SelectItem value="fev">Fevereiro/2026</SelectItem>
                <SelectItem value="mar">Março/2026</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aprovada">Aprovada</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="recebida">Recebida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Aprovada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {totalAprovada.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pronta para recebimento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Composição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salários</span>
                    <span>68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HE</span>
                    <span>10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Benefícios</span>
                    <span>12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Encargos</span>
                    <span>10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Status de Aprovação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Aprovadas</span>
                    <Badge variant="outline" className="bg-green-50">
                      1
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-600">Pendentes</span>
                    <Badge variant="outline" className="bg-yellow-50">
                      1
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Recebidas</span>
                    <Badge variant="outline" className="bg-blue-50">
                      1
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="w-4 h-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800">
                    Financeiro não edita valores. Apenas recebe, provisiona e encaminha para pagamento.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Tabela */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Folhas de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>CC</TableHead>
                    <TableHead className="text-right">Colaboradores</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aprovação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {folhasMock.map((folha) => (
                    <TableRow key={folha.id}>
                      <TableCell className="font-medium">{folha.periodo}</TableCell>
                      <TableCell>{folha.obra}</TableCell>
                      <TableCell>{folha.centroCusto}</TableCell>
                      <TableCell className="text-right">{folha.colaboradores}</TableCell>
                      <TableCell className="text-right font-medium">
                        {folha.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </TableCell>
                      <TableCell>{getStatusBadge(folha.status)}</TableCell>
                      <TableCell>
                        {folha.dataAprovacao ? (
                          <div className="text-sm">
                            <div>{folha.dataAprovacao}</div>
                            <div className="text-xs text-muted-foreground">{folha.aprovadoPor}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedFolha(folha)
                                  setSheetOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Ver Detalhes</TooltipContent>
                          </Tooltip>
                          {folha.status === "aprovada" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => {
                                    setSelectedFolha(folha)
                                    setDialogReceber(true)
                                  }}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Marcar como Recebida</TooltipContent>
                            </Tooltip>
                          )}
                          {folha.status === "recebida" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600"
                                  onClick={() => {
                                    setSelectedFolha(folha)
                                    setDialogProvisao(true)
                                  }}
                                >
                                  <Receipt className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Gerar Provisão</TooltipContent>
                            </Tooltip>
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
          <Card className="bg-muted/30">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  RH Consolida
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Custos Analisa
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  Gerência Aprova
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Badge className="bg-primary text-primary-foreground">Financeiro Recebe</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sheet de Detalhes */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[500px] sm:max-w-[500px]">
            <SheetHeader>
              <SheetTitle>Detalhes da Folha - {selectedFolha?.periodo}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Tabs defaultValue="resumo">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="resumo">Resumo</TabsTrigger>
                  <TabsTrigger value="composicao">Composição</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="resumo" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Obra</Label>
                      <p className="font-medium">{selectedFolha?.obra}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Centro de Custo</Label>
                      <p className="font-medium">{selectedFolha?.centroCusto}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Colaboradores</Label>
                      <p className="font-medium">{selectedFolha?.colaboradores}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <p className="font-medium">{selectedFolha?.status}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Label className="text-muted-foreground">Valor Total</Label>
                    <p className="text-2xl font-bold">
                      {selectedFolha?.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="composicao" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Salários</span>
                      <span className="font-medium">
                        {selectedFolha?.salarios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Horas Extras</span>
                      <span className="font-medium">
                        {selectedFolha?.horasExtras.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Benefícios</span>
                      <span className="font-medium">
                        {selectedFolha?.beneficios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Encargos</span>
                      <span className="font-medium">
                        {selectedFolha?.encargos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="historico" className="mt-4">
                  <div className="space-y-3">
                    {historicoMock.map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <div className="text-muted-foreground whitespace-nowrap">{item.data}</div>
                        <div>
                          <span className="font-medium">{item.usuario}</span>
                          <span className="text-muted-foreground"> - {item.acao}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>

        {/* Dialog Marcar como Recebida */}
        <Dialog open={dialogReceber} onOpenChange={setDialogReceber}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Marcar Folha como Recebida</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-sm text-blue-800">
                  Ao marcar como recebida, a folha estará pronta para provisão e pagamento.
                </AlertDescription>
              </Alert>
              <div>
                <Label>Observação (opcional)</Label>
                <Textarea
                  placeholder="Adicione uma observação se necessário..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogReceber(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogReceber(false)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Recebimento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Gerar Provisão */}
        <Dialog open={dialogProvisao} onOpenChange={setDialogProvisao}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gerar Provisão de Folha</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Valor a Provisionar</div>
                <div className="text-2xl font-bold">
                  {selectedFolha?.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
              </div>
              <div>
                <Label>Observação (opcional)</Label>
                <Textarea
                  placeholder="Adicione uma observação se necessário..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogProvisao(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogProvisao(false)}>
                <Receipt className="w-4 h-4 mr-2" />
                Gerar Provisão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default function RecebimentoFolhaPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando...</div>}>
      <RecebimentoFolhaContent />
    </Suspense>
  )
}
