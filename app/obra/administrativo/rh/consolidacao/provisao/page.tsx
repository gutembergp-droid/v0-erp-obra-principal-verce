"use client"

import { useState, Suspense } from "react"
import { RHNav } from "@/components/rh/rh-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  Download,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Send,
  History,
  Wallet,
  Info,
  Clock,
  Building2,
} from "lucide-react"

// Dados mockados
const componentesMock = [
  {
    id: 1,
    componente: "Salários",
    valor: 892000,
    contaContabil: "3.1.1.01",
    dataPrevista: "05/02/2026",
    status: "pendente",
  },
  {
    id: 2,
    componente: "Horas Extras",
    valor: 78500,
    contaContabil: "3.1.1.02",
    dataPrevista: "05/02/2026",
    status: "pendente",
  },
  {
    id: 3,
    componente: "Benefícios (VR/VA/VT)",
    valor: 145000,
    contaContabil: "3.1.2.01",
    dataPrevista: "01/02/2026",
    status: "provisionado",
  },
  {
    id: 4,
    componente: "FGTS",
    valor: 71360,
    contaContabil: "3.1.3.01",
    dataPrevista: "07/02/2026",
    status: "pendente",
  },
  {
    id: 5,
    componente: "INSS Patronal",
    valor: 178400,
    contaContabil: "3.1.3.02",
    dataPrevista: "20/02/2026",
    status: "pendente",
  },
]

const historicoMock = [
  { data: "01/02/2026 14:30", usuario: "Maria Financeiro", acao: "Provisão de benefícios gerada", versao: "v3" },
  { data: "28/01/2026 10:15", usuario: "Sistema", acao: "Folha recebida do fluxo de aprovação", versao: "v2" },
  { data: "25/01/2026 16:45", usuario: "Carlos Gerente", acao: "Folha aprovada pela gerência", versao: "v1" },
]

function ProvisaoFolhaContent() {
  const [selectedPeriodo, setSelectedPeriodo] = useState("jan2026")
  const [selectedObra, setSelectedObra] = useState("obra1")
  const [dialogProvisao, setDialogProvisao] = useState(false)
  const [dialogAjuste, setDialogAjuste] = useState(false)
  const [dialogPagamento, setDialogPagamento] = useState(false)
  const [sheetHistorico, setSheetHistorico] = useState(false)
  const [observacao, setObservacao] = useState("")
  const [selectedComponente, setSelectedComponente] = useState<(typeof componentesMock)[0] | null>(null)

  const totalProvisionar = componentesMock.reduce((acc, c) => acc + c.valor, 0)
  const totalProvisionado = componentesMock
    .filter((c) => c.status === "provisionado")
    .reduce((acc, c) => acc + c.valor, 0)
  const totalPendente = componentesMock.filter((c) => c.status === "pendente").reduce((acc, c) => acc + c.valor, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "provisionado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Provisionado</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>
      case "pago":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pago</Badge>
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
              <h1 className="text-2xl font-bold text-foreground">Provisão de Folha</h1>
              <p className="text-sm text-muted-foreground">Gerencie as provisões contábeis da folha de pagamento</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSheetHistorico(true)}>
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
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan2026">Janeiro/2026</SelectItem>
                <SelectItem value="fev2026">Fevereiro/2026</SelectItem>
                <SelectItem value="mar2026">Março/2026</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedObra} onValueChange={setSelectedObra}>
              <SelectTrigger className="w-48">
                <Building2 className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Obra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="obra1">BR-101 LOTE 2</SelectItem>
                <SelectItem value="obra2">METRO SP L4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total a Provisionar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {totalProvisionar.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Competência: Janeiro/2026</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Datas-Chave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Benefícios</span>
                    <span className="font-medium">01/02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salários</span>
                    <span className="font-medium">05/02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FGTS</span>
                    <span className="font-medium">07/02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">INSS</span>
                    <span className="font-medium">20/02</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Impacto no Caixa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Provisionado</span>
                    <span className="font-medium text-green-600">
                      {totalProvisionado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-600">Pendente</span>
                    <span className="font-medium text-yellow-600">
                      {totalPendente.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Pendências
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-50">
                    4 componentes
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Aguardando provisão</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Componentes da Folha</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setDialogProvisao(true)}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Gerar Provisão
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDialogAjuste(true)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Ajustar Datas
                </Button>
                <Button size="sm" variant="default" onClick={() => setDialogPagamento(true)}>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar para Pagamento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Componente</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Conta Contábil</TableHead>
                    <TableHead>Data Prevista</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {componentesMock.map((comp) => (
                    <TableRow key={comp.id}>
                      <TableCell className="font-medium">{comp.componente}</TableCell>
                      <TableCell className="text-right">
                        {comp.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{comp.contaContabil}</TableCell>
                      <TableCell>{comp.dataPrevista}</TableCell>
                      <TableCell>{getStatusBadge(comp.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Aviso */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-800">
              As provisões são geradas automaticamente com base nas datas de pagamento configuradas. Ajustes manuais são
              registrados no histórico para auditoria.
            </AlertDescription>
          </Alert>
        </div>

        {/* Dialog Gerar Provisão */}
        <Dialog open={dialogProvisao} onOpenChange={setDialogProvisao}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gerar Provisão</DialogTitle>
              <DialogDescription>Confirme a geração de provisão para os componentes pendentes</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Valor Total a Provisionar</div>
                <div className="text-2xl font-bold">
                  {totalPendente.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
              </div>
              <div>
                <Label>Observação (obrigatória)</Label>
                <Textarea
                  placeholder="Justifique a geração da provisão..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogProvisao(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogProvisao(false)} disabled={!observacao}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirmar Provisão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Ajustar Datas */}
        <Dialog open={dialogAjuste} onOpenChange={setDialogAjuste}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajustar Datas de Pagamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {componentesMock.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between">
                  <span className="text-sm">{comp.componente}</span>
                  <Input type="date" className="w-40" defaultValue="2026-02-05" />
                </div>
              ))}
              <div>
                <Label>Justificativa (obrigatória)</Label>
                <Textarea
                  placeholder="Justifique o ajuste de datas..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAjuste(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogAjuste(false)} disabled={!observacao}>
                Salvar Ajustes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Enviar para Pagamento */}
        <Dialog open={dialogPagamento} onOpenChange={setDialogPagamento}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar para Pagamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <AlertDescription className="text-sm text-yellow-800">
                  Ao enviar para pagamento, os valores serão liberados para a tesouraria.
                </AlertDescription>
              </Alert>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Valor Total</div>
                <div className="text-2xl font-bold">
                  {totalProvisionar.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
              </div>
              <div>
                <Label>Observação</Label>
                <Textarea
                  placeholder="Adicione uma observação se necessário..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogPagamento(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogPagamento(false)}>
                <Send className="w-4 h-4 mr-2" />
                Enviar para Pagamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sheet Histórico */}
        <Sheet open={sheetHistorico} onOpenChange={setSheetHistorico}>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Histórico de Provisões</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {historicoMock.map((item, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.usuario}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.versao}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.acao}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.data}</p>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}

export default function ProvisaoFolhaPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando...</div>}>
      <ProvisaoFolhaContent />
    </Suspense>
  )
}
