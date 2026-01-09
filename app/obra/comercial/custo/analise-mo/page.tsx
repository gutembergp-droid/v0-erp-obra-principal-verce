"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  MoreHorizontal,
  Eye,
  FileText,
  Send,
  Download,
  CheckCircle2,
  ArrowLeft,
  Info,
  History,
  Target,
  BarChart3,
} from "lucide-react"

// Dados mockados
const analiseData = [
  {
    id: 1,
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-001 - Terraplenagem",
    funcao: "Operador de Escavadeira",
    orcado: 185000,
    realizado: 198500,
    desvio: 13500,
    desvioPercent: 7.3,
    status: "atencao",
    justificativa: null,
  },
  {
    id: 2,
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-002 - Pavimentacao",
    funcao: "Operador de Rolo",
    orcado: 142000,
    realizado: 138200,
    desvio: -3800,
    desvioPercent: -2.7,
    status: "ok",
    justificativa: null,
  },
  {
    id: 3,
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-001 - Terraplenagem",
    funcao: "Encarregado",
    orcado: 95000,
    realizado: 118000,
    desvio: 23000,
    desvioPercent: 24.2,
    status: "critico",
    justificativa: "Necessidade de contratacao adicional devido ao aumento de frentes de servico",
  },
  {
    id: 4,
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-003 - Drenagem",
    funcao: "Pedreiro",
    orcado: 78000,
    realizado: 82400,
    desvio: 4400,
    desvioPercent: 5.6,
    status: "atencao",
    justificativa: null,
  },
  {
    id: 5,
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-004 - OAE",
    funcao: "Armador",
    orcado: 156000,
    realizado: 148900,
    desvio: -7100,
    desvioPercent: -4.6,
    status: "ok",
    justificativa: null,
  },
  {
    id: 6,
    obra: "BR-101 LOTE 2",
    centroCusto: "CC-002 - Pavimentacao",
    funcao: "Motorista",
    orcado: 112000,
    realizado: 135600,
    desvio: 23600,
    desvioPercent: 21.1,
    status: "critico",
    justificativa: null,
  },
]

const historicoVersoes = [
  {
    versao: "v3",
    data: "08/01/2026 14:30",
    usuario: "Carlos Silva",
    status: "atual",
    obs: "Ajuste pos-aprovacao gerencial",
  },
  {
    versao: "v2",
    data: "05/01/2026 10:15",
    usuario: "Maria Santos",
    status: "aprovada",
    obs: "Inclusao de justificativas",
  },
  { versao: "v1", data: "02/01/2026 09:00", usuario: "Joao Pereira", status: "inicial", obs: "Primeira consolidacao" },
]

function AnaliseMOContent() {
  const [periodo, setPeriodo] = useState("2026-01")
  const [obra, setObra] = useState("all")
  const [centroCusto, setCentroCusto] = useState("all")
  const [selectedItem, setSelectedItem] = useState<(typeof analiseData)[0] | null>(null)
  const [showDetalhe, setShowDetalhe] = useState(false)
  const [showJustificar, setShowJustificar] = useState(false)
  const [showSolicitarAjuste, setShowSolicitarAjuste] = useState(false)
  const [showHistorico, setShowHistorico] = useState(false)
  const [showEnviarAprovacao, setShowEnviarAprovacao] = useState(false)
  const [justificativa, setJustificativa] = useState("")
  const [observacaoAjuste, setObservacaoAjuste] = useState("")
  const [observacaoAprovacao, setObservacaoAprovacao] = useState("")

  // Calculos
  const totalOrcado = analiseData.reduce((acc, item) => acc + item.orcado, 0)
  const totalRealizado = analiseData.reduce((acc, item) => acc + item.realizado, 0)
  const totalDesvio = totalRealizado - totalOrcado
  const totalDesvioPercent = ((totalDesvio / totalOrcado) * 100).toFixed(1)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Conforme</Badge>
      case "atencao":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Atenção</Badge>
      case "critico":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Crítico</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const handleVerDetalhe = (item: (typeof analiseData)[0]) => {
    setSelectedItem(item)
    setShowDetalhe(true)
  }

  const handleJustificar = (item: (typeof analiseData)[0]) => {
    setSelectedItem(item)
    setJustificativa(item.justificativa || "")
    setShowJustificar(true)
  }

  const handleSolicitarAjuste = (item: (typeof analiseData)[0]) => {
    setSelectedItem(item)
    setObservacaoAjuste("")
    setShowSolicitarAjuste(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/obra/comercial/custo" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Custos
            </a>
            <span>/</span>
            <span>Análise de Mão de Obra</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Análise de Mão de Obra</h1>
          <p className="text-sm text-muted-foreground">
            Comparativo Orçado x Realizado a partir da Prévia de Folha enviada pelo RH
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHistorico(true)}>
            <History className="w-4 h-4 mr-2" />
            Histórico
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" onClick={() => setShowEnviarAprovacao(true)}>
            <Send className="w-4 h-4 mr-2" />
            Enviar para Aprovação
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap">Período:</Label>
              <Input type="month" value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="w-40" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap">Obra:</Label>
              <Select value={obra} onValueChange={setObra}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Obras</SelectItem>
                  <SelectItem value="br101">BR-101 LOTE 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap">Centro de Custo:</Label>
              <Select value={centroCusto} onValueChange={setCentroCusto}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="cc001">CC-001 - Terraplenagem</SelectItem>
                  <SelectItem value="cc002">CC-002 - Pavimentação</SelectItem>
                  <SelectItem value="cc003">CC-003 - Drenagem</SelectItem>
                  <SelectItem value="cc004">CC-004 - OAE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards Superiores */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Orçado Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalOrcado)}</p>
            <p className="text-xs text-muted-foreground mt-1">Meta aprovada para o período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Realizado Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{formatCurrency(totalRealizado)}</p>
            <p className="text-xs text-muted-foreground mt-1">Prévia de Folha consolidada</p>
          </CardContent>
        </Card>

        <Card className={totalDesvio > 0 ? "border-red-500/30" : "border-green-500/30"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              {totalDesvio > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              Desvio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className={`text-2xl font-bold ${totalDesvio > 0 ? "text-red-500" : "text-green-500"}`}>
                {formatCurrency(totalDesvio)}
              </p>
              <span className={`text-sm font-medium ${totalDesvio > 0 ? "text-red-500" : "text-green-500"}`}>
                ({totalDesvio > 0 ? "+" : ""}
                {totalDesvioPercent}%)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalDesvio > 0 ? "Acima do orçado" : "Abaixo do orçado"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Impacto no Resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalDesvio > 0 ? "text-red-500" : "text-green-500"}`}>
              {totalDesvio > 0 ? "-" : "+"}
              {Math.abs(Number(totalDesvioPercent) * 0.15).toFixed(2)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Variação na margem do projeto</p>
          </CardContent>
        </Card>
      </div>

      {/* Aviso somente leitura */}
      <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <Info className="w-4 h-4 text-blue-500" />
        <span className="text-sm text-blue-700">
          Dados somente leitura. A edição de valores é feita no RH (Prévia de Folha). Aqui é possível apenas justificar
          desvios ou solicitar ajustes.
        </span>
      </div>

      {/* Tabela Orçado x Realizado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comparativo por Centro de Custo e Função</CardTitle>
          <CardDescription>Análise detalhada Orçado x Realizado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Obra</TableHead>
                <TableHead>Centro de Custo</TableHead>
                <TableHead>Função</TableHead>
                <TableHead className="text-right">Orçado (R$)</TableHead>
                <TableHead className="text-right">Realizado (R$)</TableHead>
                <TableHead className="text-right">Desvio (R$)</TableHead>
                <TableHead className="text-right">Desvio (%)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analiseData.map((item) => (
                <TableRow key={item.id} className={item.status === "critico" ? "bg-red-500/5" : ""}>
                  <TableCell className="font-medium">{item.obra}</TableCell>
                  <TableCell>{item.centroCusto}</TableCell>
                  <TableCell>{item.funcao}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.orcado)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(item.realizado)}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${item.desvio > 0 ? "text-red-500" : "text-green-500"}`}
                  >
                    {item.desvio > 0 ? "+" : ""}
                    {formatCurrency(item.desvio)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${item.desvio > 0 ? "text-red-500" : "text-green-500"}`}
                  >
                    {item.desvio > 0 ? "+" : ""}
                    {item.desvioPercent.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{getStatusBadge(item.status)}</TooltipTrigger>
                        <TooltipContent>
                          {item.status === "ok" && "Dentro do orçado ou abaixo"}
                          {item.status === "atencao" && "Desvio entre 5% e 15%"}
                          {item.status === "critico" && "Desvio acima de 15%"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {item.justificativa && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <FileText className="w-3 h-3 ml-1 text-blue-500 inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Justificado: {item.justificativa}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerDetalhe(item)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhe
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleJustificar(item)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Justificar Desvio
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSolicitarAjuste(item)}>
                          <Send className="w-4 h-4 mr-2" />
                          Solicitar Ajuste ao RH
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totais */}
          <div className="flex justify-end mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-4 gap-8 text-sm">
              <div className="text-right">
                <p className="text-muted-foreground">Total Orçado</p>
                <p className="font-bold">{formatCurrency(totalOrcado)}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Total Realizado</p>
                <p className="font-bold">{formatCurrency(totalRealizado)}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Desvio Total</p>
                <p className={`font-bold ${totalDesvio > 0 ? "text-red-500" : "text-green-500"}`}>
                  {formatCurrency(totalDesvio)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Desvio %</p>
                <p className={`font-bold ${totalDesvio > 0 ? "text-red-500" : "text-green-500"}`}>
                  {totalDesvio > 0 ? "+" : ""}
                  {totalDesvioPercent}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regras e Governança */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Regras de Governança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Desvios acima de 15% exigem justificativa obrigatória antes de enviar para aprovação</li>
            <li>• Todas as justificativas são registradas com data, hora e usuário</li>
            <li>• Solicitações de ajuste ao RH geram notificação automática</li>
            <li>• Histórico versionado mantido para auditoria</li>
          </ul>
        </CardContent>
      </Card>

      {/* Sheet Ver Detalhe */}
      <Sheet open={showDetalhe} onOpenChange={setShowDetalhe}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Detalhe do Item</SheetTitle>
            <SheetDescription>
              {selectedItem?.centroCusto} - {selectedItem?.funcao}
            </SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Obra</p>
                  <p className="font-medium">{selectedItem.obra}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Centro de Custo</p>
                  <p className="font-medium">{selectedItem.centroCusto}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Função</p>
                  <p className="font-medium">{selectedItem.funcao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
              </div>

              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Orçado</span>
                  <span className="font-medium">{formatCurrency(selectedItem.orcado)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Realizado</span>
                  <span className="font-medium">{formatCurrency(selectedItem.realizado)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-sm font-medium">Desvio</span>
                  <span className={`font-bold ${selectedItem.desvio > 0 ? "text-red-500" : "text-green-500"}`}>
                    {formatCurrency(selectedItem.desvio)} ({selectedItem.desvio > 0 ? "+" : ""}
                    {selectedItem.desvioPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>

              {selectedItem.justificativa && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Justificativa Registrada</p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm">{selectedItem.justificativa}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setShowDetalhe(false)
                    handleJustificar(selectedItem)
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Justificar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setShowDetalhe(false)
                    handleSolicitarAjuste(selectedItem)
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Solicitar Ajuste
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog Justificar Desvio */}
      <Dialog open={showJustificar} onOpenChange={setShowJustificar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Justificar Desvio</DialogTitle>
            <DialogDescription>
              {selectedItem?.centroCusto} - {selectedItem?.funcao}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Desvio:</span>
                <span
                  className={`font-medium ${selectedItem?.desvio && selectedItem.desvio > 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {selectedItem && formatCurrency(selectedItem.desvio)} ({selectedItem?.desvioPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Justificativa *</Label>
              <Textarea
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                placeholder="Descreva o motivo do desvio..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />A justificativa será registrada com data, hora e usuário para auditoria.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJustificar(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowJustificar(false)} disabled={!justificativa.trim()}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Registrar Justificativa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Solicitar Ajuste ao RH */}
      <Dialog open={showSolicitarAjuste} onOpenChange={setShowSolicitarAjuste}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Ajuste ao RH</DialogTitle>
            <DialogDescription>Enviar solicitação de revisão para a equipe de RH</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Centro de Custo:</span>
                <span className="font-medium">{selectedItem?.centroCusto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Função:</span>
                <span className="font-medium">{selectedItem?.funcao}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Realizado Atual:</span>
                <span className="font-medium">{selectedItem && formatCurrency(selectedItem.realizado)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Observação / Motivo da Solicitação *</Label>
              <Textarea
                value={observacaoAjuste}
                onChange={(e) => setObservacaoAjuste(e.target.value)}
                placeholder="Descreva o que precisa ser revisado..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-amber-700">
                O RH receberá uma notificação automática para revisar os valores.
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSolicitarAjuste(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowSolicitarAjuste(false)} disabled={!observacaoAjuste.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Enviar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Enviar para Aprovação */}
      <Dialog open={showEnviarAprovacao} onOpenChange={setShowEnviarAprovacao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar para Aprovação Gerencial</DialogTitle>
            <DialogDescription>Consolidar análise e enviar para aprovação da gerência</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Orçado:</span>
                <span className="font-medium">{formatCurrency(totalOrcado)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Realizado:</span>
                <span className="font-medium">{formatCurrency(totalRealizado)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span>Desvio Total:</span>
                <span className={`font-bold ${totalDesvio > 0 ? "text-red-500" : "text-green-500"}`}>
                  {formatCurrency(totalDesvio)} ({totalDesvio > 0 ? "+" : ""}
                  {totalDesvioPercent}%)
                </span>
              </div>
            </div>

            {/* Verificação de justificativas */}
            {analiseData.some((item) => item.status === "critico" && !item.justificativa) && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-700">
                  Existem desvios críticos sem justificativa. Justifique antes de enviar.
                </span>
              </div>
            )}

            <div className="space-y-2">
              <Label>Observação (opcional)</Label>
              <Textarea
                value={observacaoAprovacao}
                onChange={(e) => setObservacaoAprovacao(e.target.value)}
                placeholder="Observações adicionais para a gerência..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEnviarAprovacao(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => setShowEnviarAprovacao(false)}
              disabled={analiseData.some((item) => item.status === "critico" && !item.justificativa)}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar para Aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet Histórico de Versões */}
      <Sheet open={showHistorico} onOpenChange={setShowHistorico}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Histórico de Versões</SheetTitle>
            <SheetDescription>Registro de todas as consolidações</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            {historicoVersoes.map((versao) => (
              <div
                key={versao.versao}
                className={`p-4 rounded-lg border ${versao.status === "atual" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={versao.status === "atual" ? "default" : "outline"}>{versao.versao}</Badge>
                    {versao.status === "atual" && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Atual</Badge>
                    )}
                    {versao.status === "aprovada" && (
                      <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Aprovada</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{versao.data}</span>
                </div>
                <p className="text-sm">{versao.obs}</p>
                <p className="text-xs text-muted-foreground mt-1">Por: {versao.usuario}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function AnaliseMOPage() {
  return (
    <Suspense fallback={null}>
      <AnaliseMOContent />
    </Suspense>
  )
}
